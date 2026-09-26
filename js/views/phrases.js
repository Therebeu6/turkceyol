/* ═══════════════════════════════════════════════
   TürkçeYol — phrases.js
   Liste des phrases utiles
   ═══════════════════════════════════════════════ */

window.Phrases = {
  _initialized: false,

  // v10 AXE 6.1 : labels FR pour les topics réellement présents dans AppPhrases (12, pas 4).
  _TOPIC_LABELS: {
    salutations: 'Salutations', aide: 'Aide', restaurant: 'Restaurant', shopping: 'Shopping',
    voyage: 'Voyage', routine: 'Routine', transport: 'Transport', hotel: 'Hôtel',
    sante: 'Santé', urgences: 'Urgences', directions: 'Directions', social: 'Social'
  },

  render() {
    if (!this._initialized) {
      this._initialized = true;
      this._renderFilters();

      // Écouteur délégué unique sur le conteneur : fonctionne pour tous les chips générés
      // dynamiquement, sans avoir à re-brancher quoi que ce soit au fil des rendus.
      document.getElementById('phrases-filters').addEventListener('click', (e) => {
        const chip = e.target.closest('.chip');
        if (!chip) return;
        document.querySelectorAll('#phrases-filters .chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const filter = chip.dataset.filter;
        this.renderList(filter === 'all' ? AppPhrases : AppPhrases.filter(p => p.topic === filter));
      });
    }
    this.renderList(AppPhrases);
  },

  _renderFilters() {
    const topics = [...new Set(AppPhrases.map(p => p.topic))];
    const container = document.getElementById('phrases-filters');
    container.innerHTML = `
      <button class="chip active" data-filter="all">Toutes</button>
      ${topics.map(t => `<button class="chip" data-filter="${t}">${this._TOPIC_LABELS[t] || t}</button>`).join('')}
    `;
  },

  renderList(phrases) {
    const container = document.getElementById('phrases-list');

    if (phrases.length === 0) {
      container.innerHTML = `<div class="empty-state-sm">Aucune phrase trouvée.</div>`;
      return;
    }

    container.innerHTML = phrases.map(p => `
      <div class="list-item">
        <div class="li-left">
          <div class="li-tr" style="font-size: var(--text-md);">${p.tr}</div>
          <div class="li-fr">${p.fr}</div>
        </div>
        <div class="li-right">
           <button class="btn-tts" onclick="event.stopPropagation(); App.playTTS('${p.tr.replace(/'/g, "\\'")}')">🔊</button>
        </div>
      </div>
    `).join('');
  }
};
