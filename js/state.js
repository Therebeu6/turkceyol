/* ═══════════════════════════════════════════════
   TürkçeYol — state.js
   Gestionnaire de l'état global et du localStorage
   ═══════════════════════════════════════════════ */

const State = {
  // ── Données par défaut ──
  defaultData: {
    streak: 0,
    totalXP: 0,
    dailyXP: 0,
    dailyGoal: 50,
    lastSessionDate: null,
    level: 1,
    
    currentUnit: 'u1',
    currentChapter: 'u1_c1',
    
    completedChapters: [],
    masteredWords: [],
    weakVerbs: [],
    reviewQueue: [],
    achievementIds: [],
    readDialogueIds: [],

    perfectLessons: 0,
    dialoguesRead: 0,
    maxCombo: 0,
    streakFreezes: 0,

    heatmap: {},
    tenseStats: {},
    settings: {
      soundEffects: true,
      dailyReminder: true,
      theme: 'dark'
    }
  },

  // ── Données en mémoire ──
  data: {},

  // ── Initialisation ──
  init() {
    this.load();
    this.checkNewDay();
    console.log("State initialized:", this.data);
  },

  // ── Chargement depuis localStorage ──
  load() {
    const saved = localStorage.getItem('turkceyol_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Fusion (merge) pour assurer que les nouvelles clés de defaultData existent
        this.data = { ...this.defaultData, ...parsed };
        
        // Assurer que les sous-objets/tableaux existent aussi
        this.data.settings = { ...this.defaultData.settings, ...(parsed.settings || {}) };
        this.data.completedChapters = parsed.completedChapters || [];
        this.data.masteredWords = parsed.masteredWords || [];
        this.data.weakVerbs = parsed.weakVerbs || [];
        this.data.reviewQueue = parsed.reviewQueue || [];
        this.data.achievementIds = parsed.achievementIds || [];
        this.data.readDialogueIds = parsed.readDialogueIds || [];
        this.data.heatmap = parsed.heatmap || {};
        this.data.perfectLessons = parsed.perfectLessons || 0;
        this.data.dialoguesRead = parsed.dialoguesRead || 0;
        this.data.maxCombo = parsed.maxCombo || 0;
        this.data.streakFreezes = parsed.streakFreezes || 0;
      } catch (e) {
        console.error("Error parsing saved data, resetting to default.", e);
        this.data = JSON.parse(JSON.stringify(this.defaultData));
      }
    } else {
      // Première visite
      this.data = JSON.parse(JSON.stringify(this.defaultData));
    }
  },

  // ── Sauvegarde dans localStorage ──
  save() {
    localStorage.setItem('turkceyol_data', JSON.stringify(this.data));
  },

  // ── Vérification journalière (streak & dailyXP) ──
  checkNewDay() {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const lastSession = this.data.lastSessionDate;
    // Normalise : "2026-05-23_goal_met" → "2026-05-23"
    const lastDateStr = lastSession ? lastSession.split('_')[0] : null;

    if (!lastDateStr) {
      // Pas de session précédente
      this.data.lastSessionDate = today;
      this.save();
      return;
    }

    if (lastDateStr !== today) {
      // Nouveau jour
      const lastDate = new Date(lastDateStr);
      const currDate = new Date(today);
      const diffTime = Math.abs(currDate - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Streak maintenue (pas d'incrément ici, on incrémente lors de la première action du jour si on veut, ou à la fin d'une leçon)
        // Pour simplifier, on incrémente le streak dès qu'ils font une action (géré par addXP)
      } else if (diffDays > 1) {
        // Streak brisée
        this.data.streak = 0;
      }

      // Reset daily XP
      this.data.dailyXP = 0;
      this.data.lastSessionDate = today;
      this.save();
    }
  },

  // ── Actions principales ──
  
  addXP(amount) {
    this.data.totalXP += amount;
    this.data.dailyXP += amount;
    
    // Check level up (simpliste : 1 niveau = 500 XP)
    const newLevel = Math.floor(this.data.totalXP / 500) + 1;
    if (newLevel > this.data.level) {
      this.data.level = newLevel;
      // TODO: déclencher event level up
    }

    // Heatmap : toute activité XP
    const today = new Date().toISOString().split('T')[0];
    if (!this.data.heatmap[today]) this.data.heatmap[today] = 0;
    this.data.heatmap[today] += amount;

    // Gestion streak : objectif journalier
    if (this.data.dailyXP >= this.data.dailyGoal && this.data.lastSessionDate !== today + '_goal_met') {
      this.data.streak += 1;
      this.data.lastSessionDate = today + '_goal_met';
    }

    this.save();
    return amount;
  },

  completeChapter(chapterId) {
    if (!this.data.completedChapters.includes(chapterId)) {
      this.data.completedChapters.push(chapterId);
      this.save();
    }
  },

  isChapterCompleted(chapterId) {
    return this.data.completedChapters.includes(chapterId);
  },
  
  setCurrentChapter(unitId, chapterId) {
      this.data.currentUnit = unitId;
      this.data.currentChapter = chapterId;
      this.save();
  },

  updateSetting(key, value) {
    if (this.data.settings[key] !== undefined) {
      this.data.settings[key] = value;
      this.save();
    }
  },

  resetAllData() {
    localStorage.removeItem('turkceyol_data');
    this.data = JSON.parse(JSON.stringify(this.defaultData));
    this.save();
    window.location.reload();
  },

  // ── Import / Export de Sauvegarde ──
  exportData() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "turkceyol_save.json");
    document.body.appendChild(downloadAnchorNode); // requis pour Firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  },

  importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (imported && imported.totalXP !== undefined) {
          localStorage.setItem('turkceyol_data', JSON.stringify(imported));
          window.location.reload();
        } else {
          alert("Fichier de sauvegarde invalide.");
        }
      } catch (err) {
        alert("Erreur lors de la lecture du fichier.");
      }
    };
    reader.readAsText(file);
  }
};
