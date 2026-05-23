/* ═══════════════════════════════════════════════
   TürkçeYol — grammar.js (vue)
   Règles de grammaire cliquables (TTS sur exemples)
   ═══════════════════════════════════════════════ */

window.Grammar = {
  render() {
    const container = document.getElementById('grammar-body');
    if (!container) return;
    if (!window.AppGrammar || AppGrammar.length === 0) {
      container.innerHTML = `<div class="empty-state-sm"><span>📖</span>Aucune règle pour l'instant.</div>`;
      return;
    }

    container.innerHTML = AppGrammar.map(g => {
      const examples = (g.example || '').split('|').map(s => s.trim()).filter(Boolean);
      const exHtml = examples.map(ex => `
        <button class="grammar-example" onclick="Grammar._play(this)" data-tr="${this._escape(ex)}">
          <span class="gex-play">
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </span>
          <span class="gex-text">${ex}</span>
        </button>
      `).join('');

      return `
        <div class="grammar-card">
          <h3 class="grammar-title">${g.title}</h3>
          <p class="grammar-rule">${g.rule}</p>
          <div class="grammar-examples">${exHtml}</div>
        </div>
      `;
    }).join('');
  },

  _play(btn) {
    const text = btn.dataset.tr || '';
    if (text && window.App) App.playTTS(text);
  },

  _escape(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
};
