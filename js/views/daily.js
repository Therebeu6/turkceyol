/* ═══════════════════════════════════════════════
   TürkçeYol — daily.js
   Vue du Défi Quotidien (suit l'objectif d'XP du jour)
   ═══════════════════════════════════════════════ */

window.Daily = {
  render() {
    const xp = State.data.dailyXP || 0;
    const goal = State.data.dailyGoal || 50;
    const done = xp >= goal;
    const pct = Math.min(100, Math.round((xp / goal) * 100));

    document.getElementById('daily-body').innerHTML = `
      <div class="card mb-4" style="text-align:center;padding:var(--s6)">
        <div style="font-size:3rem;margin-bottom:var(--s3)">${done ? '🏆' : '⚡'}</div>
        <h2 style="font-size:var(--text-xl);font-weight:800;margin-bottom:var(--s2)">
          ${done ? 'Défi du jour réussi !' : 'Défi du jour'}
        </h2>
        <p style="color:var(--text-2);margin-bottom:var(--s4)">
          ${done ? 'Objectif atteint ! Continuez pour consolider vos acquis.'
                 : `Gagnez ${goal - xp} XP de plus pour valider votre défi.`}
        </p>
        ${!done ? `<button class="btn btn-primary btn-full" onclick="App.navigate('#units')">Continuer les leçons →</button>` : ''}
      </div>
      <div class="card">
        <div class="section-lbl" style="margin-bottom:var(--s3)">Objectif journalier · ${xp} / ${goal} XP</div>
        <div style="display:flex;align-items:center;gap:var(--s3)">
          <div class="goal-bar-track" style="flex:1"><div class="goal-bar-fill" style="width:${pct}%"></div></div>
          <div style="font-size:var(--text-sm);font-weight:700;color:var(--primary)">${pct}%</div>
        </div>
      </div>
    `;
  }
};
