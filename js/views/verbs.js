/* ═══════════════════════════════════════════════
   TürkçeYol — verbs.js (Vue)
   Module Verbes & Conjugaison avec maîtrise SRS
   ═══════════════════════════════════════════════ */

window.Verbs = {
  _initialized: false,

  render() {
    this.renderList(AppVerbs);

    if (!this._initialized) {
      this._initialized = true;

      document.getElementById('verbs-search').addEventListener('input', (e) => {
        this.filterData(e.target.value.toLowerCase().trim(), 'search');
      });

      document.querySelectorAll('#verbs-filters .chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
          document.querySelectorAll('#verbs-filters .chip').forEach(c => c.classList.remove('active'));
          e.target.classList.add('active');
          this.filterData(e.target.dataset.filter, 'chip');
        });
      });
    }
  },

  filterData(val, type) {
    let filtered = AppVerbs;
    if (type === 'search' && val) {
      filtered = AppVerbs.filter(v =>
        v.infinitive.toLowerCase().includes(val) || v.fr.toLowerCase().includes(val)
      );
    } else if (type === 'chip') {
      if (val === 'frequent') filtered = AppVerbs.filter(v => v.isFrequent);
      else if (val === 'weak') {
        const weakIds = new Set((window.SRS ? SRS.getWeakItems(20) : [])
          .filter(i => i.type === 'verb').map(i => i.id));
        filtered = AppVerbs.filter(v => weakIds.has(v.id));
        if (filtered.length === 0) filtered = AppVerbs.filter(v => v.difficulty >= 2);
      } else if (val === 'mastered') {
        filtered = AppVerbs.filter(v => {
          const item = State.data.reviewQueue.find(i => i.id === v.id && i.type === 'verb');
          return item && item.step >= 3;
        });
      }
    }
    this.renderList(filtered);
  },

  renderList(verbs) {
    const container = document.getElementById('verbs-list');
    if (verbs.length === 0) {
      container.innerHTML = `<div class="empty-state-sm">Aucun verbe trouvé.</div>`;
      return;
    }

    container.innerHTML = verbs.map(v => {
      const srsItem = State.data.reviewQueue.find(i => i.id === v.id && i.type === 'verb');
      const mastery = window.SRS ? SRS.getMasteryLevel(srsItem) : 0;
      const dots = Array(5).fill(0).map((_, i) =>
        `<span class="mdot ${i < mastery ? 'fill' : ''}"></span>`
      ).join('');
      const hasNote = v.note ? `<span class="verb-note-ico" title="${v.note}">⚠️</span>` : '';

      return `
        <div class="verb-item" onclick="Verbs.showDetail('${v.id}')">
          <div class="li-left">
            <div class="li-tr">
              ${v.infinitive}
              <span class="li-tag">${v.stem}-</span>
              ${hasNote}
            </div>
            <div class="li-fr">${v.fr}</div>
          </div>
          <div class="li-right">
            <div class="mastery-dots">${dots}</div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </div>
      `;
    }).join('');
  },

  showDetail(id) {
    const verb = AppVerbs.find(v => v.id === id);
    if (!verb) return;

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
      const pairs = [
        ['ben', 'biz'], ['sen', 'siz'], ['o', 'onlar']
      ];
      return pairs.map(([sg, pl]) => `
        <div class="vm-conj-pair">
          <div class="vm-conj-cell">
            <span class="vm-pronoun">Ben</span>
            <span class="vm-form">${tenseObj.ben}</span>
          </div>
          <div class="vm-conj-cell">
            <span class="vm-pronoun">Biz</span>
            <span class="vm-form">${tenseObj.biz}</span>
          </div>
        </div>
        <div class="vm-conj-pair">
          <span class="vm-pronoun">Sen</span>
          <span class="vm-form">${tenseObj.sen}</span>
          <span class="vm-pronoun" style="margin-left:auto">Siz</span>
          <span class="vm-form">${tenseObj.siz}</span>
        </div>
        <div class="vm-conj-pair">
          <span class="vm-pronoun">O</span>
          <span class="vm-form">${tenseObj.o}</span>
          <span class="vm-pronoun" style="margin-left:auto">Onlar</span>
          <span class="vm-form">${tenseObj.onlar}</span>
        </div>
      `).join('');
    };

    // Rendu simplifié lisible
    const renderTenseSimple = (tenseObj) => `
      <div class="vm-conj-grid">
        <div><span class="vm-pronoun">Ben</span> <span class="vm-form">${tenseObj.ben}</span></div>
        <div><span class="vm-pronoun">Biz</span> <span class="vm-form">${tenseObj.biz}</span></div>
        <div><span class="vm-pronoun">Sen</span> <span class="vm-form">${tenseObj.sen}</span></div>
        <div><span class="vm-pronoun">Siz</span> <span class="vm-form">${tenseObj.siz}</span></div>
        <div><span class="vm-pronoun">O</span> <span class="vm-form">${tenseObj.o}</span></div>
        <div><span class="vm-pronoun">Onlar</span> <span class="vm-form">${tenseObj.onlar}</span></div>
      </div>
    `;

    document.getElementById('vm-pres').innerHTML = renderTenseSimple(verb.conjugations.present);
    document.getElementById('vm-past').innerHTML = renderTenseSimple(verb.conjugations.past);
    document.getElementById('vm-fut').innerHTML = renderTenseSimple(verb.conjugations.future);

    document.getElementById('verb-modal').classList.remove('hidden');
  }
};
