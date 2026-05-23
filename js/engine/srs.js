/* ═══════════════════════════════════════════════
   TürkçeYol — srs.js
   Répétition Espacée — algorithme SM-2 (qualité 0-5, EF dynamique)
   ═══════════════════════════════════════════════ */

window.SRS = {
  // ── Configuration globale (modifiable) ──
  CONFIG: {
    initialEF: 2.5,
    minEF: 1.3,
    maxNewPerSession: 5,
    maxReviewsPerSession: 15,
    masteryEFThreshold: 2.5,
    masteryRepThreshold: 3,
    capInterval: 365
  },

  // Conservé pour rétrocompatibilité (migration legacy step → interval)
  intervals: [1, 3, 7, 14, 30, 90],

  // ── Migration : garantit qu'un item ancien (Leitner) reçoit les champs SM-2 ──
  _ensureSM2(item) {
    if (!item) return item;
    if (typeof item.ef !== 'number')          item.ef = this.CONFIG.initialEF;
    if (typeof item.repetitions !== 'number') item.repetitions = item.step || 0;
    if (typeof item.interval !== 'number') {
      const stepIdx = Math.min(item.step || 0, this.intervals.length - 1);
      item.interval = this.intervals[stepIdx];
    }
    return item;
  },

  // Convertit boolean (legacy) ou number (nouveau) → qualité 0-5
  _toQuality(arg) {
    if (typeof arg === 'number') return Math.max(0, Math.min(5, arg));
    return arg ? 4 : 2;
  },

  // ── Mise à jour SM-2 ──
  // updateItem(id, type, quality|success, tense)
  updateItem(itemId, itemType, qualityOrSuccess, tense) {
    const quality = this._toQuality(qualityOrSuccess);
    const isCorrect = quality >= 3;
    const today = new Date().toISOString().split('T')[0];

    let item = State.data.reviewQueue.find(i => i.id === itemId && i.type === itemType);

    if (!item) {
      // Nouvel item
      const initialInterval = isCorrect ? 1 : 0;
      item = {
        id: itemId,
        type: itemType,
        step: isCorrect ? 1 : 0,
        ef: this.CONFIG.initialEF,
        repetitions: isCorrect ? 1 : 0,
        interval: initialInterval,
        nextReview: this.addDays(new Date(), initialInterval).toISOString().split('T')[0],
        successes: isCorrect ? 1 : 0,
        failures: isCorrect ? 0 : 1,
        consecutiveFails: isCorrect ? 0 : 1,
        lastSeen: today,
        lastQuality: quality
      };
      State.data.reviewQueue.push(item);
    } else {
      this._ensureSM2(item);

      // ── Formule SM-2 du facteur de facilité ──
      // EF' = EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02))
      const newEF = item.ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
      item.ef = Math.max(this.CONFIG.minEF, newEF);

      if (isCorrect) {
        item.repetitions = (item.repetitions || 0) + 1;
        item.successes   = (item.successes   || 0) + 1;
        item.consecutiveFails = 0;
        item.step = Math.min((item.step || 0) + 1, this.intervals.length - 1);

        // Intervalles SM-2 classiques
        if (item.repetitions === 1)      item.interval = 1;
        else if (item.repetitions === 2) item.interval = 6;
        else                             item.interval = Math.round((item.interval || 1) * item.ef);
      } else {
        // Échec : reset reps, on revient demain
        item.repetitions = 0;
        item.failures = (item.failures || 0) + 1;
        item.consecutiveFails = (item.consecutiveFails || 0) + 1;
        item.step = Math.max(0, (item.step || 0) - 1);
        item.interval = 1;
      }

      item.interval = Math.min(item.interval, this.CONFIG.capInterval);
      item.nextReview = this.addDays(new Date(), item.interval).toISOString().split('T')[0];
      item.lastSeen = today;
      item.lastQuality = quality;
    }

    // Stats par temps verbal (inchangé)
    if (itemType === 'verb' && tense) {
      if (!State.data.tenseStats) State.data.tenseStats = {};
      if (!State.data.tenseStats[tense]) State.data.tenseStats[tense] = { correct: 0, total: 0 };
      State.data.tenseStats[tense].total++;
      if (isCorrect) State.data.tenseStats[tense].correct++;
    }

    State.save();
    return item;
  },

  // ── Items dus, triés par urgence (retard + taux d'échec) ──
  getDueItems() {
    const today = new Date().toISOString().split('T')[0];
    const items = (State.data.reviewQueue || []).filter(i => i.nextReview <= today);
    return items
      .map(i => {
        const overdueDays = this._daysBetween(i.nextReview, today);
        const total = (i.successes || 0) + (i.failures || 0);
        const failRate = total > 0 ? (i.failures || 0) / total : 0;
        return { item: i, score: overdueDays + failRate * 5 };
      })
      .sort((a, b) => b.score - a.score)
      .map(o => o.item);
  },

  // ── Items fragiles (taux d'échec élevé) ──
  getWeakItems(limit = 6) {
    return [...(State.data.reviewQueue || [])]
      .filter(i => (i.failures || 0) > 0)
      .sort((a, b) => {
        const rateA = (a.failures || 0) / Math.max(1, (a.successes || 0) + (a.failures || 0));
        const rateB = (b.failures || 0) / Math.max(1, (b.successes || 0) + (b.failures || 0));
        return rateB - rateA;
      })
      .slice(0, limit);
  },

  // ── Items avec 2+ échecs consécutifs ──
  getFragileItems(limit = 5) {
    return [...(State.data.reviewQueue || [])]
      .filter(i => (i.consecutiveFails || 0) >= 2)
      .sort((a, b) => (b.consecutiveFails || 0) - (a.consecutiveFails || 0))
      .slice(0, limit);
  },

  // ── Session mix optimal : dus prioritaires + quelques "neufs" (peu vus) ──
  getSessionMix(opts) {
    const cfg = this.CONFIG;
    const maxNew     = (opts && opts.maxNew     != null) ? opts.maxNew     : cfg.maxNewPerSession;
    const maxReviews = (opts && opts.maxReviews != null) ? opts.maxReviews : cfg.maxReviewsPerSession;

    const due = this.getDueItems().slice(0, maxReviews);

    // "Neufs" = items présents mais encore très peu maîtrisés
    const queue = State.data.reviewQueue || [];
    const dueIds = new Set(due.map(i => i.id + '_' + i.type));
    const fresh = queue
      .filter(i => !dueIds.has(i.id + '_' + i.type))
      .filter(i => (i.repetitions || i.step || 0) < 2 && (i.failures || 0) === 0)
      .sort((a, b) => {
        // Difficulté croissante = items les plus faciles d'abord (EF élevé)
        const efA = a.ef != null ? a.ef : cfg.initialEF;
        const efB = b.ef != null ? b.ef : cfg.initialEF;
        return efB - efA;
      })
      .slice(0, maxNew);

    return { due, fresh, all: [...due, ...fresh] };
  },

  // ── Maîtrise du vocabulaire par thème ──
  getVocabTopicStats() {
    const stats = {};
    for (const item of (State.data.reviewQueue || [])) {
      if (item.type !== 'vocabulary') continue;
      const word = window.AppVocabulary && AppVocabulary.find(w => w.id === item.id);
      if (!word) continue;
      const t = word.topic || 'base';
      if (!stats[t]) stats[t] = { total: 0, mastered: 0 };
      stats[t].total++;
      if (this.getMasteryLevel(item) >= 3) stats[t].mastered++;
    }
    return stats;
  },

  // ── Niveau de maîtrise 0-5 (combiné EF + repetitions) ──
  getMasteryLevel(item) {
    if (!item) return 0;
    this._ensureSM2(item);
    const rep = item.repetitions || 0;
    const ef  = item.ef || this.CONFIG.initialEF;
    if (rep === 0) return 0;
    if (rep >= 5 && ef >= 2.7) return 5;
    if (rep >= 4 && ef >= 2.5) return 4;
    if (rep >= 3)              return 3;
    if (rep >= 2)              return 2;
    return 1;
  },

  // ── Taux de rétention : % d'items considérés maîtrisés ──
  getRetentionRate() {
    const queue = State.data.reviewQueue || [];
    if (queue.length === 0) return 0;
    const mastered = queue.filter(i => {
      this._ensureSM2(i);
      return (i.ef || 0) >= this.CONFIG.masteryEFThreshold
          && (i.repetitions || 0) >= this.CONFIG.masteryRepThreshold;
    }).length;
    return Math.round((mastered / queue.length) * 100);
  },

  // ── EF moyen du deck ──
  getAverageEF() {
    const queue = State.data.reviewQueue || [];
    if (queue.length === 0) return this.CONFIG.initialEF;
    const total = queue.reduce((sum, i) => {
      this._ensureSM2(i);
      return sum + (i.ef || this.CONFIG.initialEF);
    }, 0);
    return Math.round((total / queue.length) * 100) / 100;
  },

  // ── Items qui vont tomber dus dans N prochains jours (hors aujourd'hui) ──
  getUpcomingCount(days = 7) {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    const futureStr = this.addDays(today, days).toISOString().split('T')[0];
    return (State.data.reviewQueue || []).filter(i =>
      i.nextReview > todayStr && i.nextReview <= futureStr
    ).length;
  },

  getTenseStats() {
    return State.data.tenseStats || {};
  },

  // ── Utils ──
  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },

  _daysBetween(dateAStr, dateBStr) {
    const a = new Date(dateAStr);
    const b = new Date(dateBStr);
    return Math.max(0, Math.floor((b - a) / (1000 * 60 * 60 * 24)));
  }
};
