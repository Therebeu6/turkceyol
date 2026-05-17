/* ═══════════════════════════════════════════════
   TürkçeYol — gamification.js
   Gestion des niveaux, XP et Badges (Achievements)
   ═══════════════════════════════════════════════ */

window.Gamification = {
  
  checkAchievements() {
    let newAchievements = [];
    const state = State.data;

    // Itérer sur tous les achievements possibles
    AppAchievements.forEach(ach => {
      // Si déjà débloqué, on passe
      if (state.achievementIds.includes(ach.id)) return;

      let unlocked = false;
      
      // Évaluation basique de la condition
      if (ach.condition.includes('streak >=')) {
        const val = parseInt(ach.condition.split('>=')[1].trim());
        if (state.streak >= val) unlocked = true;
      }
      else if (ach.condition.includes('words_learned >=')) {
        const val = parseInt(ach.condition.split('>=')[1].trim());
        if (state.reviewQueue.length >= val) unlocked = true; // approximation
      }
      // Ajoutez d'autres parsings de conditions ici

      if (unlocked) {
        state.achievementIds.push(ach.id);
        newAchievements.push(ach);
      }
    });

    if (newAchievements.length > 0) {
      State.save();
      // On pourrait déclencher des toasts multiples ici, mais on se contente du premier pour l'instant
      App.showToast(`🏆 Nouveau badge : ${newAchievements[0].title}`, 'success');
      App.fireConfetti();
    }
  },

  getLevelName(level) {
    if (level < 5) return 'Débutant';
    if (level < 10) return 'Voyageur';
    if (level < 20) return 'Explorateur';
    return 'Aventurier';
  }
};
