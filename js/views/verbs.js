/* ═══════════════════════════════════════════════
   TürkçeYol — verbs.js
   Module Verbes & Conjugaison
   ═══════════════════════════════════════════════ */

window.Verbs = {
  render() {
    this.renderList(AppVerbs);
    
    // Bind search
    document.getElementById('verbs-search').addEventListener('input', (e) => {
      this.filterData(e.target.value.toLowerCase(), 'search');
    });

    // Bind chips
    document.querySelectorAll('#verbs-filters .chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        document.querySelectorAll('#verbs-filters .chip').forEach(c => c.classList.remove('active'));
        e.target.classList.add('active');
        this.filterData(e.target.dataset.filter, 'chip');
      });
    });
  },

  filterData(val, type) {
    let filtered = AppVerbs;
    
    if (type === 'search' && val) {
      filtered = AppVerbs.filter(v => 
        v.infinitive.toLowerCase().includes(val) || 
        v.fr.toLowerCase().includes(val)
      );
    } else if (type === 'chip') {
      if (val === 'frequent') filtered = AppVerbs.filter(v => v.isFrequent);
      // 'weak' et 'mastered' nécessiteraient un lien avec State.data.weakVerbs, simplifié ici
      else if (val === 'weak') filtered = AppVerbs.filter(v => v.difficulty === 2);
    }
    
    this.renderList(filtered);
  },

  renderList(verbs) {
    const container = document.getElementById('verbs-list');
    
    if (verbs.length === 0) {
      container.innerHTML = `<div class="empty-state-sm">Aucun verbe trouvé.</div>`;
      return;
    }

    container.innerHTML = verbs.map(v => `
      <div class="list-item" onclick="Verbs.showDetail('${v.id}')">
        <div class="li-left">
          <div class="li-tr">${v.infinitive} <span class="li-tag">${v.stem}-</span></div>
          <div class="li-fr">${v.fr}</div>
        </div>
        <div class="li-right">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M9 18l6-6-6-6"/></svg>
        </div>
      </div>
    `).join('');
  },

  showDetail(id) {
    const verb = AppVerbs.find(v => v.id === id);
    if(!verb) return;

    document.getElementById('vm-title').textContent = verb.infinitive;
    document.getElementById('vm-fr').textContent = verb.fr;
    
    const noteEl = document.getElementById('vm-note');
    if (verb.note) {
      noteEl.textContent = `⚠️ ${verb.note}`;
      noteEl.classList.remove('hidden');
    } else {
      noteEl.classList.add('hidden');
    }

    const renderTense = (tenseObj) => {
      return `
        <div><span class="text-muted">Ben</span> ${tenseObj.ben}</div>
        <div><span class="text-muted">Biz</span> ${tenseObj.biz}</div>
        <div><span class="text-muted">Sen</span> ${tenseObj.sen}</div>
        <div><span class="text-muted">Siz</span> ${tenseObj.siz}</div>
        <div><span class="text-muted">O</span> ${tenseObj.o}</div>
        <div><span class="text-muted">Onlar</span> ${tenseObj.onlar}</div>
      `;
    };

    document.getElementById('vm-pres').innerHTML = renderTense(verb.conjugations.present);
    document.getElementById('vm-past').innerHTML = renderTense(verb.conjugations.past);
    document.getElementById('vm-fut').innerHTML = renderTense(verb.conjugations.future);

    const modal = document.getElementById('verb-modal');
    modal.classList.remove('hidden');
  }
};
