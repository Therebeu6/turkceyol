/* ═══════════════════════════════════════════════
   TürkçeYol — srs.js
   Spaced Repetition System (Répétition Espacée)
   ═══════════════════════════════════════════════ */

window.SRS = {
  // ── Algorithme simplifié basé sur Leitner / SuperMemo ──
  // Si success = true : l'intervalle augmente (ex: 1j -> 3j -> 7j)
  // Si success = false : l'intervalle retombe à 0 (à revoir aujourd'hui)

  intervals: [1, 3, 7, 14, 30, 90], // jours
  
  // Mettre à jour le statut d'un mot après une révision
  // itemType = 'vocabulary', 'verb', 'phrase'
  updateItem(itemId, itemType, success) {
    let itemData = State.data.reviewQueue.find(i => i.id === itemId && i.type === itemType);
    
    if (!itemData) {
      // Premier ajout au SRS
      itemData = {
        id: itemId,
        type: itemType,
        step: 0,
        nextReview: this.addDays(new Date(), success ? 1 : 0).toISOString().split('T')[0],
        successes: success ? 1 : 0,
        failures: success ? 0 : 1
      };
      State.data.reviewQueue.push(itemData);
    } else {
      // Mise à jour
      if (success) {
        itemData.step = Math.min(itemData.step + 1, this.intervals.length - 1);
        itemData.successes += 1;
      } else {
        itemData.step = 0; // On recommence du début
        itemData.failures += 1;
      }
      const daysToAdd = this.intervals[itemData.step];
      itemData.nextReview = this.addDays(new Date(), daysToAdd).toISOString().split('T')[0];
    }
    
    State.save();
    return itemData;
  },

  // Récupérer les items à réviser aujourd'hui
  getDueItems() {
    const today = new Date().toISOString().split('T')[0];
    return State.data.reviewQueue.filter(item => item.nextReview <= today);
  },

  // Helper pour ajouter des jours à une date
  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
};
