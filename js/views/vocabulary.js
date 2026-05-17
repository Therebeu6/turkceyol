/* ═══════════════════════════════════════════════
   TürkçeYol — vocabulary.js
   Liste du vocabulaire
   ═══════════════════════════════════════════════ */

window.Vocabulary = {
  render() {
    this.renderList(AppVocabulary);

    // Bind search
    document.getElementById('vocab-search').addEventListener('input', (e) => {
      this.filterData(e.target.value.toLowerCase(), 'search');
    });

    // Bind chips
    document.querySelectorAll('#vocab-filters .chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        document.querySelectorAll('#vocab-filters .chip').forEach(c => c.classList.remove('active'));
        e.target.classList.add('active');
        this.filterData(e.target.dataset.filter, 'chip');
      });
    });
  },

  filterData(val, type) {
    let filtered = AppVocabulary;
    
    if (type === 'search' && val) {
      filtered = AppVocabulary.filter(v => 
        v.tr.toLowerCase().includes(val) || 
        v.fr.toLowerCase().includes(val)
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
      // Simuler des points de maîtrise selon le SRS (1 à 3 points)
      const srsItem = State.data.reviewQueue.find(i => i.id === w.id);
      const step = srsItem ? Math.min(3, srsItem.step) : 0;
      
      const dots = `
        <div class="mastery-dots">
          <div class="mdot ${step >= 1 ? 'fill' : ''}"></div>
          <div class="mdot ${step >= 2 ? 'fill' : ''}"></div>
          <div class="mdot ${step >= 3 ? 'fill' : ''}"></div>
        </div>
      `;

      return `
        <div class="list-item">
          <div class="li-left">
            <div class="li-tr">${w.tr}</div>
            <div class="li-fr">${w.fr}</div>
          </div>
          <div class="li-right">
            ${dots}
          </div>
        </div>
      `;
    }).join('');
  }
};
