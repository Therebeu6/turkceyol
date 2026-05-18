/* ═══════════════════════════════════════════════
   TürkçeYol — vocabulary.js
   Liste du vocabulaire avec filtres
   ═══════════════════════════════════════════════ */

window.Vocabulary = {
  _initialized: false,

  render() {
    // Mise à jour compteur
    const sub = document.querySelector('#view-vocabulary .view-sub');
    if (sub) sub.textContent = `${AppVocabulary.length} mots · par thème`;

    this.renderList(AppVocabulary);

    if (!this._initialized) {
      this._initialized = true;

      document.getElementById('vocab-search').addEventListener('input', (e) => {
        this.filterData(e.target.value.toLowerCase().trim(), 'search');
      });

      document.querySelectorAll('#vocab-filters .chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
          document.querySelectorAll('#vocab-filters .chip').forEach(c => c.classList.remove('active'));
          e.target.classList.add('active');
          this.filterData(e.target.dataset.filter, 'chip');
        });
      });
    }
  },

  filterData(val, type) {
    let filtered = AppVocabulary;
    if (type === 'search' && val) {
      filtered = AppVocabulary.filter(v =>
        v.tr.toLowerCase().includes(val) || v.fr.toLowerCase().includes(val)
      );
    } else if (type === 'chip' && val !== 'all') {
      filtered = AppVocabulary.filter(v => v.topic === val);
    }
    this.renderList(filtered);
  },

  renderList(words) {
    const container = document.getElementById('vocab-list');
    if (words.length === 0) {
      container.innerHTML = `<div class="empty-state-sm">Aucun mot trouvé.</div>`;
      return;
    }

    container.innerHTML = words.map(w => {
      const srsItem = State.data.reviewQueue.find(i => i.id === w.id);
      const mastery = window.SRS ? SRS.getMasteryLevel(srsItem) : 0;
      const dots = Array(5).fill(0).map((_, i) =>
        `<span class="mdot ${i < mastery ? 'fill' : ''}"></span>`
      ).join('');

      return `
        <div class="list-item" onclick="App.playTTS('${w.tr.replace(/'/g, "\\'")}')">
          <div class="li-left">
            <div class="li-tr">${w.tr} <span class="li-tag">${w.topic}</span></div>
            <div class="li-fr">${w.fr}</div>
          </div>
          <div class="li-right">
            <div class="mastery-dots">${dots}</div>
          </div>
        </div>
      `;
    }).join('');
  }
};
