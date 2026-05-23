/* ═══════════════════════════════════════════════
   TürkçeYol — gamification.js
   Niveaux, XP et Badges (Achievements)
   ═══════════════════════════════════════════════ */

const LEVELS = [
  { min: 0,     name: 'Merhaba',  icon: '👋' },
  { min: 100,   name: 'Öğrenci',  icon: '📚' },
  { min: 300,   name: 'Konuşan',  icon: '💬' },
  { min: 600,   name: 'Gezgin',   icon: '🗺' },
  { min: 1000,  name: 'Kaşif',    icon: '🔭' },
  { min: 1500,  name: 'Bilge',    icon: '🧠' },
  { min: 2500,  name: 'Usta',     icon: '⚔️' },
  { min: 4000,  name: 'Şair',     icon: '🖊' },
  { min: 6000,  name: 'Üstat',    icon: '🎓' },
  { min: 10000, name: 'Osmanlı',  icon: '🌙' }
];

window.Gamification = {
  LEVELS,

  getLevelInfo(xp) {
    let levelIdx = 0;
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (xp >= LEVELS[i].min) { levelIdx = i; break; }
    }
    const current = LEVELS[levelIdx];
    const next = LEVELS[levelIdx + 1] || null;
    let progress = 100;
    if (next) {
      const span = next.min - current.min;
      progress = Math.round(((xp - current.min) / span) * 100);
    }
    return {
      level: levelIdx,
      name: current.name,
      icon: current.icon,
      currentXP: xp,
      minXP: current.min,
      nextXP: next ? next.min : null,
      progress: Math.min(100, Math.max(0, progress))
    };
  },

  // Wrapper qui ajoute XP et déclenche level-up si franchi
  addXP(amount) {
    const oldXp = State.data.totalXP || 0;
    const oldLevel = this.getLevelInfo(oldXp).level;
    State.addXP(amount);
    const newLevel = this.getLevelInfo(State.data.totalXP || 0).level;
    if (newLevel > oldLevel) {
      if (window.AudioEngine) AudioEngine.playLevelUp();
      const lvl = LEVELS[newLevel];
      if (window.App) App.showToast(`🎉 Niveau ${lvl.icon} ${lvl.name} atteint !`, 'success');
      if (window.App && App.fireConfetti) App.fireConfetti();
    }
    return amount;
  },

  // Évalue une condition de badge (supporte ancien format string et nouveau format objet)
  _evaluateCondition(ach) {
    const cond = ach.condition;
    const state = State.data;

    // ── Nouveau format : objet { type, value, unitId } ──
    if (typeof cond === 'object' && cond !== null) {
      switch (cond.type) {
        case 'streak':          return (state.streak || 0) >= cond.value;
        case 'perfect_lessons': return (state.perfectLessons || 0) >= cond.value;
        case 'dialogues_read':  return (state.dialoguesRead || 0) >= cond.value;
        case 'max_combo':       return (state.maxCombo || 0) >= cond.value;
        case 'words_mastered':  return this._countMastered('vocabulary') >= cond.value;
        case 'verbs_mastered':  return this._countMastered('verb') >= cond.value;
        case 'words_seen':      return this._countSeenVocab() >= cond.value;
        case 'unit_completed':  return this._isUnitCompleted(cond.unitId);
      }
      return false;
    }

    // ── Ancien format : string ──
    if (typeof cond !== 'string') return false;

    if (cond.includes('streak >=')) {
      const v = parseInt(cond.split('>=')[1].trim());
      return (state.streak || 0) >= v;
    }
    if (cond.includes('words_learned >=')) {
      const v = parseInt(cond.split('>=')[1].trim());
      return this._countSeenVocab() >= v;
    }
    if (cond.includes('words_mastered >=')) {
      const v = parseInt(cond.split('>=')[1].trim());
      return this._countMastered('vocabulary') >= v;
    }
    if (cond.includes('verbs_mastered >=')) {
      const v = parseInt(cond.split('>=')[1].trim());
      return this._countMastered('verb') >= v;
    }
    if (cond.includes('unit_completed ==')) {
      const unitId = cond.split('==')[1].trim();
      return this._isUnitCompleted(unitId);
    }
    return false;
  },

  // Items SRS du type donné avec step >= 3 (maîtrisé)
  _countMastered(type) {
    const queue = State.data.reviewQueue || [];
    if (type === 'verb') {
      return queue.filter(i => i.type === 'verb' && (i.step || 0) >= 3).length;
    }
    return queue.filter(i => i.type === type && (i.step || 0) >= 3).length;
  },

  // Items vocabulaire avec step >= 1 (vus au moins une fois)
  _countSeenVocab() {
    const queue = State.data.reviewQueue || [];
    return queue.filter(i => i.type === 'vocabulary' && (i.step || 0) >= 1).length;
  },

  // Vrai si tous les chapitres de l'unité sont dans completedChapters
  _isUnitCompleted(unitId) {
    if (!window.AppUnits) return false;
    const unit = AppUnits.find(u => u.id === unitId);
    if (!unit) return false;
    const completed = State.data.completedChapters || [];
    return unit.chapters.every(c => completed.includes(c.id));
  },

  checkAchievements() {
    const newAchievements = [];
    const state = State.data;

    AppAchievements.forEach(ach => {
      if (state.achievementIds.includes(ach.id)) return;
      if (this._evaluateCondition(ach)) {
        state.achievementIds.push(ach.id);
        newAchievements.push(ach);
      }
    });

    if (newAchievements.length > 0) {
      State.save();
      newAchievements.forEach((ach, i) => {
        setTimeout(() => {
          App.showToast(`🏆 ${ach.icon} ${ach.title}`, 'success');
        }, i * 600);
      });
      App.fireConfetti();
    }
  },

  getLevelName(xp) {
    return this.getLevelInfo(xp).name;
  }
};
