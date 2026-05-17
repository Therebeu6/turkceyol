/* ═══════════════════════════════════════════════
   TürkçeYol — review.js
   Vue du module de Répétition Espacée
   ═══════════════════════════════════════════════ */

window.Review = {
  render() {
    const dueItems = window.SRS ? window.SRS.getDueItems() : [];
    const container = document.getElementById('review-body');

    if (dueItems.length === 0) {
      container.innerHTML = `
        <div class="center-state">
          <div class="cs-icon">🧠</div>
          <h2>Aucune révision en attente</h2>
          <p>Vous êtes à jour ! Revenez demain.</p>
          <button class="btn btn-primary" onclick="App.navigate('#units')">Retour au parcours</button>
        </div>
      `;
      return;
    }

    // Simplification pour l'instant : on affiche un bouton pour "lancer" la session de révision
    // Dans l'idéal, on lancerait une instance de Lesson modifiée.
    container.innerHTML = `
      <div class="card text-center">
        <h2 class="text-2xl font-bold text-primary mb-2">${dueItems.length} items à réviser</h2>
        <p class="text-muted mb-4">Mots, phrases et verbes que vous êtes sur le point d'oublier.</p>
        <button class="btn btn-primary btn-full" onclick="Review.startSession()">Commencer la session</button>
      </div>
      <div class="mt-4">
        <h3 class="text-sm font-bold text-muted uppercase mb-2">Aperçu</h3>
        ${dueItems.slice(0,5).map(item => {
          let wordData = AppVocabulary.find(v => v.id === item.id);
          if(!wordData) return '';
          return `
            <div class="list-item">
              <div class="li-left">
                <div class="li-tr">${wordData.tr}</div>
                <div class="li-fr">${wordData.fr}</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  startSession() {
    // Hack pour la V1 : simuler une session en marquant tout comme réussi et donner des XP
    const dueItems = window.SRS.getDueItems();
    dueItems.forEach(item => {
      window.SRS.updateItem(item.id, item.type, true);
    });
    
    State.addXP(dueItems.length * 5);
    App.showToast(`Session terminée ! +${dueItems.length * 5} XP`, 'success');
    App.fireConfetti();
    this.render(); // refresh
  }
};
