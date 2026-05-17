/* ═══════════════════════════════════════════════
   TürkçeYol — stats.js
   Tableau de bord de suivi (Statistiques)
   ═══════════════════════════════════════════════ */

window.Stats = {
  render() {
    const d = State.data;
    const container = document.getElementById('stats-body');

    container.innerHTML = `
      <div class="grid grid-cols-2 gap-3 mb-6">
        <div class="card text-center">
          <div class="text-3xl font-bold text-primary">${d.totalXP}</div>
          <div class="text-xs font-bold text-muted uppercase">Total XP</div>
        </div>
        <div class="card text-center">
          <div class="text-3xl font-bold text-gold">🔥 ${d.streak}</div>
          <div class="text-xs font-bold text-muted uppercase">Jours de suite</div>
        </div>
        <div class="card text-center">
          <div class="text-3xl font-bold text-success">${d.completedChapters.length}</div>
          <div class="text-xs font-bold text-muted uppercase">Chapitres</div>
        </div>
        <div class="card text-center">
          <div class="text-3xl font-bold text-secondary">Niv. ${d.level}</div>
          <div class="text-xs font-bold text-muted uppercase">${window.Gamification ? Gamification.getLevelName(d.level) : 'Titre'}</div>
        </div>
      </div>

      <div class="section-row"><span class="section-lbl">Mes Badges</span></div>
      <div class="grid grid-cols-3 gap-2">
        ${AppAchievements.map(ach => {
          const unlocked = d.achievementIds.includes(ach.id);
          return `
            <div class="card text-center ${!unlocked ? 'opacity-50 grayscale' : 'border-primary'}" style="padding:10px;">
              <div class="text-2xl mb-1">${ach.icon}</div>
              <div class="text-xs font-bold">${ach.title}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }
};

// Vues mineures (daily, settings)
window.Daily = {
  render() {
    document.getElementById('daily-body').innerHTML = `
      <div class="center-state">
        <div class="cs-icon">⚡</div>
        <h2>Défi du jour</h2>
        <p>Le défi d'aujourd'hui est de faire 2 leçons parfaites !</p>
        <button class="btn btn-primary" onclick="App.navigate('#units')">Go !</button>
      </div>
    `;
  }
};

window.Settings = {
  render() {
    document.getElementById('settings-body').innerHTML = `
      <div class="card mb-4">
        <div class="flex justify-between items-center mb-4">
          <span class="font-bold">Effets sonores</span>
          <input type="checkbox" checked onchange="App.showToast('Paramètre mis à jour')">
        </div>
        <div class="flex justify-between items-center mb-4">
          <span class="font-bold">Rappels quotidiens</span>
          <input type="checkbox" checked onchange="App.showToast('Paramètre mis à jour')">
        </div>
        <hr class="border-t border-border my-4">
        <button class="btn btn-outline btn-full text-error" style="border-color:var(--error);" onclick="if(confirm('Tout effacer ?')) State.resetAllData()">Réinitialiser ma progression</button>
      </div>
    `;
  }
};
