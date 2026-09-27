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
    // v10 AXE 6.4 : distinct de lastSessionDate (dernier jour où l'app a été OUVERTE, sert
    // juste à remettre dailyXP à zéro). lastGoalMetDate ne bouge que quand l'objectif est
    // réellement atteint — c'est lui qui doit décider si la série se casse, jamais une
    // simple ouverture de l'app un jour sans rien faire.
    lastGoalMetDate: null,
    // v10 AXE 6.4 : garde de migration à usage unique (voir checkNewDay). Une sauvegarde
    // d'avant ce correctif peut avoir perdu, via l'ancien bug, toute trace fiable du dernier
    // jour où l'objectif a été atteint — cette clé garantit qu'on ne retente la migration
    // qu'une seule fois, jamais à chaque ouverture.
    streakMigrated: false,
    level: 1,
    
    currentUnit: 'u1',
    currentChapter: 'u1_c1',
    
    completedChapters: [],
    masteredWords: [],
    weakVerbs: [],
    reviewQueue: [],
    achievementIds: [],
    readDialogueIds: [],
    storiesRead: [],
    storiesPerfect: [],
    favorites: [],

    perfectLessons: 0,
    dialoguesRead: 0,
    maxCombo: 0,
    streakFreezes: 0,
    streakPaused: false,
    sessionDensity: 'normal',

    heatmap: {},
    tenseStats: {},
    settings: {
      soundEffects: true,
      dailyReminder: true,
      haptics: true,
      theme: 'dark',
      speechInput: false,
      streakDiscreet: false
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
        this.data.storiesRead = parsed.storiesRead || [];
        this.data.storiesPerfect = parsed.storiesPerfect || [];
        this.data.favorites = parsed.favorites || [];
        this.data.heatmap = parsed.heatmap || {};
        this.data.perfectLessons = parsed.perfectLessons || 0;
        this.data.dialoguesRead = parsed.dialoguesRead || 0;
        this.data.maxCombo = parsed.maxCombo || 0;
        this.data.streakFreezes = parsed.streakFreezes || 0;
        this.data.streakPaused = parsed.streakPaused || false;
        this.data.sessionDensity = parsed.sessionDensity || 'normal';
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

  // v10 AXE 6.4 : date LOCALE (YYYY-MM-DD), pas UTC — toISOString() décale une session de
  // 00h-2h heure de Paris sur la veille. Utilisée pour lastSessionDate, lastGoalMetDate et
  // le heatmap, pour que les trois s'accordent toujours sur "quel jour on est".
  _localDateStr(date) {
    const d = date || new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  },

  // Différence en jours entre deux dates locales "YYYY-MM-DD" (minuit local des deux côtés,
  // donc pas de dérive liée au fuseau horaire).
  _daysBetween(dateStrA, dateStrB) {
    const a = new Date(dateStrA + 'T00:00:00');
    const b = new Date(dateStrB + 'T00:00:00');
    return Math.round((b - a) / (1000 * 60 * 60 * 24));
  },

  // ── Vérification journalière (streak & dailyXP) ──
  checkNewDay() {
    const today = this._localDateStr();
    const lastOpen = this.data.lastSessionDate;

    // v10 AXE 6.4 — migration à usage unique, AVANT toute autre logique (voir
    // tools/verify-streak.js, scénario "migration"). Une ancienne sauvegarde peut avoir :
    // (a) lastSessionDate = "2026-05-23_goal_met" encore intact → on récupère cette date ;
    // (b) le suffixe déjà perdu par l'ANCIEN bug lui-même (une simple ouverture de l'app,
    //     un jour sans jouer, écrasait "date_goal_met" par "date" avant même ce correctif) →
    //     dans ce cas, avec un streak non nul, impossible de reconstruire fidèlement le
    //     dernier jour réussi. Plutôt que de laisser la série gelée indéfiniment (plus aucune
    //     rupture ne se déclencherait, faute de lastGoalMetDate) ou repartir artificiellement
    //     de sa valeur au prochain objectif atteint, on la remet à 0 une seule fois : c'est
    //     le choix honnête, une perte de série plutôt qu'une série non méritée.
    if (!this.data.streakMigrated) {
      this.data.streakMigrated = true;
      if (!this.data.lastGoalMetDate) {
        if (lastOpen && lastOpen.includes('_goal_met')) {
          this.data.lastGoalMetDate = lastOpen.split('_')[0];
        } else if (this.data.streak > 0) {
          this.data.streak = 0;
          this._lastStreakEvent = 'migration_reset';
        }
      }
    }

    if (!lastOpen) {
      // Pas de session précédente
      this.data.lastSessionDate = today;
      this.save();
      return;
    }

    if (lastOpen === today) { this.save(); return; } // déjà vu aujourd'hui (persiste la migration)

    // Mode pause (v8 AXE 3.2) : ni gain ni perte tant que l'utilisateur ne réactive pas
    if (this.data.streakPaused) {
      this.data.dailyXP = 0;
      this.data.lastSessionDate = today;
      this.save();
      return;
    }

    // Rupture de série : basée UNIQUEMENT sur le dernier jour où l'objectif a été atteint —
    // jamais sur le dernier jour où l'app a simplement été ouverte. Sans ça, ouvrir l'app
    // chaque jour sans rien faire avance quand même "le dernier jour vu" d'un jour à la
    // fois, et la condition de rupture ne se déclenche jamais.
    this._lastStreakEvent = null;
    if (this.data.lastGoalMetDate) {
      const diffDays = this._daysBetween(this.data.lastGoalMetDate, today);
      if (diffDays <= 1) {
        // Objectif atteint hier (ou aujourd'hui déjà) : série intacte.
      } else if (diffDays === 2 && (this.data.streakFreezes || 0) > 0) {
        // Un seul jour manqué + gel disponible → on consomme un gel et on garde la série
        this.data.streakFreezes -= 1;
        this._lastStreakEvent = 'freeze_used';
      } else if (diffDays > 1) {
        // Streak brisée (aucun gel, ou trop de jours manqués)
        this.data.streak = 0;
      }
    }

    // Reset daily XP (nouveau jour, quel que soit l'état de la série)
    this.data.dailyXP = 0;
    this.data.lastSessionDate = today;
    this.save();
  },

  // ── Actions principales ──

  // Mode pause du streak (v8 AXE 3.2) : suspend gains/pertes jusqu'à réactivation manuelle
  setStreakPaused(paused) {
    this.data.streakPaused = paused;
    if (!paused) {
      // Réactivation : on repart d'aujourd'hui, aucun jour passé en pause ne compte contre
      // la série (report du dernier jour "réussi" à aujourd'hui, pas seulement de l'ouverture).
      const today = this._localDateStr();
      this.data.lastSessionDate = today;
      this.data.lastGoalMetDate = today;
    }
    this.save();
  },

  addXP(amount) {
    this.data.totalXP += amount;
    this.data.dailyXP += amount;
    
    // v10 AXE 6.3 : même barème que Gamification.LEVELS (utilisé par le dashboard et les
    // stats), plus le calcul à 500 XP/niveau qui divergeait du reste de l'app. +1 car
    // Gamification.getLevelInfo est 0-indexé, alors que State.data.level démarre à 1.
    // Toujours réassigné (pas seulement si newLevel > l'ancien) : une sauvegarde existante,
    // calculée avec l'ancienne formule sans plafond, peut afficher un niveau plus HAUT que
    // le nouveau barème pour un gros total d'XP (celui-ci plafonne à 10 au-delà de 10 000 XP,
    // l'ancien continuait de grimper indéfiniment) — il faut pouvoir la corriger vers le bas.
    this.data.level = (window.Gamification ? Gamification.getLevelInfo(this.data.totalXP).level : Math.floor(this.data.totalXP / 500)) + 1;

    // Heatmap : toute activité XP (date locale, v10 AXE 6.4)
    const today = this._localDateStr();
    if (!this.data.heatmap[today]) this.data.heatmap[today] = 0;
    this.data.heatmap[today] += amount;

    // Gestion streak : objectif journalier — lastGoalMetDate (pas lastSessionDate, qui ne
    // suit que la dernière OUVERTURE de l'app, v10 AXE 6.4) garde une date propre, sans le
    // suffixe "_goal_met" qui servait avant à faire porter les deux sens par une seule clé.
    if (this.data.dailyXP >= this.data.dailyGoal && this.data.lastGoalMetDate !== today) {
      this.data.streak += 1;
      this.data.lastGoalMetDate = today;
      // Gel de série : 1 gagné tous les 7 jours de série, plafonné à 2 (AXE 3.5)
      if (this.data.streak > 0 && this.data.streak % 7 === 0 && (this.data.streakFreezes || 0) < 2) {
        this.data.streakFreezes = (this.data.streakFreezes || 0) + 1;
        this._lastStreakEvent = 'freeze_earned';
      }
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
// Un `const` global n'est pas une propriété de window : sans cette ligne, tous les tests
// `window.State && ...` du reste de l'app sont silencieusement faux dans le navigateur.
window.State = State;
