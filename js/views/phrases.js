/* ═══════════════════════════════════════════════
   TürkçeYol — phrases.js
   Liste des phrases utiles
   ═══════════════════════════════════════════════ */

window.Phrases = {
  render() {
    this.renderList(AppPhrases);

    // Bind chips
    document.querySelectorAll('#phrases-filters .chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        document.querySelectorAll('#phrases-filters .chip').forEach(c => c.classList.remove('active'));
        e.target.classList.add('active');
        
        const filter = e.target.dataset.filter;
        if (filter === 'all') this.renderList(AppPhrases);
        else this.renderList(AppPhrases.filter(p => p.topic === filter));
      });
    });
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
           <button class="btn-tts" onclick="event.stopPropagation(); Phrases.playTTS('${p.tr.replace(/'/g, "\\'")}')">🔊</button>
        </div>
      </div>
    `).join('');
  },

  playTTS(text) {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'tr-TR';
      window.speechSynthesis.speak(u);
    }
  }
};
