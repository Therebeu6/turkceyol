/* ═══════════════════════════════════════════════
   TürkçeYol — daily.js
   Vue du Défi Quotidien
   ═══════════════════════════════════════════════ */

window.Daily = {
  render() {
    document.getElementById('daily-body').innerHTML = `
      <div class="center-state">
        <div class="cs-icon">⚡</div>
        <h2>Défi du jour</h2>
        <p>Le défi d'aujourd'hui est de faire 2 leçons parfaites !</p>
        <button class="btn btn-primary" onclick="App.navigate('#units')">C'est parti !</button>
      </div>
    `;
  }
};
