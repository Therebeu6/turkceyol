/* ═══════════════════════════════════════════════
   TürkçeYol — practice.js (v7 AXE 3)
   Hub d'entraînement adaptatif : regroupe les sessions ciblées déjà
   calculables par le SRS existant (rien de nouveau côté données),
   pour ne plus avoir à chercher où réviser quoi.
   ═══════════════════════════════════════════════ */

window.Practice = {
  render() {
    const container = document.getElementById('practice-body');
    if (!container) return;

    if (!window.SRS) {
      container.innerHTML = `<div class="empty-state-sm"><span>🧠</span> Fais quelques leçons d'abord pour débloquer l'entraînement ciblé.</div>`;
      return;
    }

    const weakVocab = SRS.getWeakItems(30).filter(i => i.type === 'vocabulary');
    const weakVerbs = SRS.getWeakItems(30).filter(i => i.type === 'verb');
    const favorites = (window.State && State.data && State.data.favorites) || [];
    const mix = SRS.getSessionMix({ maxNew: 3, maxReviews: 5 }).all;

    const cards = [
      { icon: '🎯', title: 'Mots fragiles', sub: 'Les mots que tu confonds le plus souvent', count: weakVocab.length, action: "Practice.launchWeak('vocabulary')" },
      { icon: '⚡', title: 'Conjugaison à revoir', sub: 'Les verbes les moins solides', count: weakVerbs.length, action: "Practice.launchWeak('verb')" },
      { icon: '⏱️', title: 'Mix rapide', sub: '~5 minutes, révisions + nouveautés', count: mix.length, action: 'Practice.launchMix()' },
      { icon: '⭐', title: 'Mes favoris', sub: 'Les mots et verbes que tu as étoilés', count: favorites.length, action: 'Practice.launchFavorites()' },
      { icon: '🎧', title: 'Écoute', sub: 'Entraîne ton oreille', count: null, action: "App.navigate('#listening')" }
    ];

    container.innerHTML = cards.map(c => {
      const empty = c.count === 0;
      return `
        <div class="practice-card ${empty ? 'practice-card-empty' : ''}" ${empty ? '' : `onclick="${c.action}"`}>
          <div class="practice-card-icon">${c.icon}</div>
          <div class="practice-card-info">
            <div class="practice-card-title">${c.title}</div>
            <div class="practice-card-sub">${empty ? 'Rien à réviser ici pour l\'instant' : c.sub}</div>
          </div>
          ${c.count !== null
            ? `<div class="practice-card-count">${c.count}</div>`
            : `<div class="practice-card-arrow">›</div>`}
        </div>
      `;
    }).join('');
  },

  launchWeak(type) {
    if (!window.SRS) return;
    const items = SRS.getWeakItems(30).filter(i => i.type === type).slice(0, 10);
    if (items.length === 0) return;
    this._launch(items);
  },

  launchMix() {
    if (!window.SRS) return;
    const mix = SRS.getSessionMix({ maxNew: 3, maxReviews: 5 }).all;
    if (mix.length === 0) return;
    this._launch(mix);
  },

  launchFavorites() {
    const favorites = (window.State && State.data && State.data.favorites) || [];
    if (favorites.length === 0) return;
    this._launch(favorites.slice(0, 15));
  },

  _launch(items) {
    if (window.Review) Review.launchCustomSession(items);
  }
};
