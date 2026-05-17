/* ═══════════════════════════════════════════════
   TürkçeYol — srs.js
   Répétition Espacée (algorithme Leitner amélioré)
   ═══════════════════════════════════════════════ */

window.SRS = {
  intervals: [1, 3, 7, 14, 30, 90],

  updateItem(itemId, itemType, success, tense) {
    let item = State.data.reviewQueue.find(i => i.id === itemId && i.type === itemType);
    const today = new Date().toISOString().split('T')[0];

    if (!item) {
      item = {
        id: itemId, type: itemType,
        step: 0,
        nextReview: this.addDays(new Date(), success ? 1 : 0).toISOString().split('T')[0],
        successes: success ? 1 : 0,
        failures: success ? 0 : 1,
        lastSeen: today
      };
      State.data.reviewQueue.push(item);
    } else {
      if (success) {
        item.step = Math.min(item.step + 1, this.intervals.length - 1);
        item.successes = (item.successes || 0) + 1;
      } else {
        // Régression partielle (pas retour à 0) pour ne pas trop décourager
        item.step = Math.max(0, item.step - 1);
        item.failures = (item.failures || 0) + 1;
      }
      item.nextReview = this.addDays(new Date(), this.intervals[item.step]).toISOString().split('T')[0];
      item.lastSeen = today;
    }

    // Stats par temps verbal
    if (itemType === 'verb' && tense) {
      if (!State.data.tenseStats) State.data.tenseStats = {};
      if (!State.data.tenseStats[tense]) State.data.tenseStats[tense] = { correct: 0, total: 0 };
      State.data.tenseStats[tense].total++;
      if (success) State.data.tenseStats[tense].correct++;
    }

    State.save();
    return item;
  },

  getDueItems() {
    const today = new Date().toISOString().split('T')[0];
    return State.data.reviewQueue.filter(i => i.nextReview <= today);
  },

  // Items les plus fragiles (taux d'échec élevé)
  getWeakItems(limit = 6) {
    return [...State.data.reviewQueue]
      .filter(i => (i.failures || 0) > 0)
      .sort((a, b) => {
        const rateA = (a.failures || 0) / Math.max(1, (a.successes || 0) + (a.failures || 0));
        const rateB = (b.failures || 0) / Math.max(1, (b.successes || 0) + (b.failures || 0));
        return rateB - rateA;
      })
      .slice(0, limit);
  },

  // Niveau de maîtrise 0-5
  getMasteryLevel(item) {
    if (!item) return 0;
    return Math.round((item.step / (this.intervals.length - 1)) * 5);
  },

  getTenseStats() {
    return State.data.tenseStats || {};
  },

  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
};
