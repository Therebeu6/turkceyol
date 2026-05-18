/* ═══════════════════════════════════════════════
   TürkçeYol — review.js
   Session de révision SRS interactive
   ═══════════════════════════════════════════════ */

window.Review = {
  exercises: [],
  currentIndex: 0,
  correctCount: 0,
  _active: false,

  render() {
    this._active = false;
    const dueItems = window.SRS ? SRS.getDueItems() : [];
    const container = document.getElementById('review-body');

    if (dueItems.length === 0) {
      // Proposer une révision préventive avec les items fragiles
      const weakItems = window.SRS ? SRS.getWeakItems(8) : [];
      if (weakItems.length > 0) {
        container.innerHTML = this._renderWeakPreview(weakItems);
      } else {
        container.innerHTML = `
          <div class="center-state">
            <div class="cs-icon">🧠</div>
            <h2>Tout est à jour !</h2>
            <p>Revenez demain pour une nouvelle session de révision.</p>
            <button class="btn btn-primary" onclick="App.navigate('#units')">Continuer les leçons</button>
          </div>
        `;
      }
      return;
    }

    container.innerHTML = this._renderDuePreview(dueItems);
  },

  _renderDuePreview(dueItems) {
    const weakItems = window.SRS ? SRS.getWeakItems(3) : [];
    const previewHtml = dueItems.slice(0, 4).map(item => {
      const word = AppVocabulary.find(w => w.id === item.id);
      const verb = window.AppVerbs && AppVerbs.find(v => v.id === item.id);
      const label = word ? word.tr : (verb ? verb.infinitive : item.id);
      const sub = word ? word.fr : (verb ? verb.fr : '');
      const mastery = window.SRS ? SRS.getMasteryLevel(item) : 0;
      const dots = Array(5).fill(0).map((_, i) =>
        `<span class="mdot ${i < mastery ? 'fill' : ''}"></span>`
      ).join('');
      return `
        <div class="rev-preview-item">
          <div class="li-left">
            <div class="li-tr">${label}</div>
            <div class="li-fr">${sub}</div>
          </div>
          <div class="mastery-dots">${dots}</div>
        </div>
      `;
    }).join('');

    const moreLabel = dueItems.length > 4 ? `<div class="rev-more">+${dueItems.length - 4} autres…</div>` : '';

    return `
      <div class="rev-intro-card card">
        <div class="rev-intro-header">
          <div class="rev-intro-icon">🧠</div>
          <div>
            <div class="rev-intro-count">${dueItems.length} item${dueItems.length > 1 ? 's' : ''} à réviser</div>
            <div class="rev-intro-sub">Mots et verbes sur le point d'être oubliés</div>
          </div>
        </div>
        <button class="btn btn-primary btn-full" onclick="Review.startSession()">Commencer la révision</button>
      </div>
      <div class="section-row"><span class="section-lbl">Aperçu</span></div>
      <div class="rev-preview-list">${previewHtml}${moreLabel}</div>
    `;
  },

  _renderWeakPreview(weakItems) {
    return `
      <div class="rev-intro-card card">
        <div class="rev-intro-header">
          <div class="rev-intro-icon">💪</div>
          <div>
            <div class="rev-intro-count">Session de renforcement</div>
            <div class="rev-intro-sub">${weakItems.length} points fragiles identifiés</div>
          </div>
        </div>
        <button class="btn btn-primary btn-full" onclick="Review.startWeakSession()">Renforcer les points faibles</button>
      </div>
      <div class="section-row"><span class="section-lbl">Points fragiles</span></div>
      ${weakItems.slice(0, 4).map(item => {
        const word = AppVocabulary.find(w => w.id === item.id);
        const verb = window.AppVerbs && AppVerbs.find(v => v.id === item.id);
        const label = word ? word.tr : (verb ? verb.infinitive : item.id);
        const sub = word ? word.fr : (verb ? verb.fr : '');
        const rate = Math.round(((item.failures || 0) / Math.max(1, (item.successes || 0) + (item.failures || 0))) * 100);
        return `
          <div class="rev-preview-item">
            <div class="li-left">
              <div class="li-tr">${label}</div>
              <div class="li-fr">${sub}</div>
            </div>
            <div style="font-size:11px;color:var(--error);font-weight:700">${rate}% erreur</div>
          </div>
        `;
      }).join('')}
    `;
  },

  startSession() {
    const dueItems = window.SRS ? SRS.getDueItems() : [];
    this._launchSession(dueItems);
  },

  startWeakSession() {
    const weakItems = window.SRS ? SRS.getWeakItems(8) : [];
    this._launchSession(weakItems);
  },

  _launchSession(items) {
    if (items.length === 0) { this.render(); return; }
    this.exercises = Exercises.generateForReview(items);
    if (this.exercises.length === 0) { this.render(); return; }

    this.currentIndex = 0;
    this.correctCount = 0;
    this._active = true;
    this._renderExercise();
  },

  _renderExercise() {
    const container = document.getElementById('review-body');
    if (this.currentIndex >= this.exercises.length) {
      this._showSummary();
      return;
    }

    const exo = this.exercises[this.currentIndex];
    const pct = Math.round((this.currentIndex / this.exercises.length) * 100);

    const optsHtml = exo.options.map((opt, i) => `
      <button class="option-btn" onclick="Review._checkAnswer('${this._escape(opt)}')">
        <span class="opt-key">${i + 1}</span>
        <span class="opt-text">${opt}</span>
      </button>
    `).join('');

    container.innerHTML = `
      <div class="rev-session-header">
        <div class="rev-prog-track"><div class="rev-prog-fill" style="width:${pct}%"></div></div>
        <div class="rev-counter">${this.currentIndex + 1} / ${this.exercises.length}</div>
      </div>
      <div class="exercise-container animate-fade-in">
        <div class="exercise-header">
          <div class="exo-type-label">${exo.subtype === 'verb_fill' ? '⚡ Conjugaison' : '🔄 Révision'}</div>
          <h2 class="exercise-prompt">${exo.question}</h2>
          ${exo.hint ? `<div class="exo-hint">${exo.hint}</div>` : ''}
        </div>
        <div class="exercise-content">
          <div class="options-grid" id="rev-options">${optsHtml}</div>
        </div>
      </div>
      <div id="rev-feedback" class="feedback-bar">
        <div class="fb-msg-row">
          <div class="fb-icon" id="rev-fb-icon">✓</div>
          <div class="fb-text">
            <div class="fb-title" id="rev-fb-title"></div>
            <div class="fb-tr" id="rev-fb-tr"></div>
            <div class="fb-fr" id="rev-fb-fr"></div>
          </div>
        </div>
        <button class="btn btn-primary btn-full" onclick="Review._next()">Continuer</button>
      </div>
    `;
  },

  _checkAnswer(selected) {
    const exo = this.exercises[this.currentIndex];
    const clean = s => s.normalize('NFC').toLocaleLowerCase('tr-TR')
      .replace(/[.!?,;:'"]/g, '').replace(/\s+/g, ' ').trim();
    const isCorrect = clean(selected) === clean(exo.answer);

    document.querySelectorAll('.option-btn').forEach(b => {
      b.onclick = null;
      const val = (b.querySelector('.opt-text')?.textContent || '').trim();
      if (clean(val) === clean(exo.answer)) b.classList.add('correct');
      else if (clean(val) === clean(selected) && !isCorrect) b.classList.add('wrong');
    });

    const fb = document.getElementById('rev-feedback');
    if (isCorrect) {
      this.correctCount++;
      fb.classList.add('correct');
      document.getElementById('rev-fb-icon').textContent = '✓';
      document.getElementById('rev-fb-title').textContent = 'Bien joué !';
      fb.querySelector('.btn').className = 'btn btn-success btn-full';
    } else {
      fb.classList.add('wrong');
      document.getElementById('rev-fb-icon').textContent = '✕';
      document.getElementById('rev-fb-title').textContent = 'La bonne réponse :';
    }
    document.getElementById('rev-fb-tr').textContent = exo.data.tr || '';
    document.getElementById('rev-fb-fr').textContent = exo.data.fr || '';

    if (exo.data.tr) App.playTTS(exo.data.tr);
    if (window.SRS) SRS.updateItem(exo.data.id, exo.data.type || 'vocabulary', isCorrect, exo.data.tense);

    fb.classList.add('show');
  },

  _next() {
    this.currentIndex++;
    this._renderExercise();
  },

  _showSummary() {
    const acc = Math.round((this.correctCount / this.exercises.length) * 100);
    const xp = this.correctCount * 8;
    State.addXP(xp);

    document.getElementById('review-body').innerHTML = `
      <div class="center-state">
        <div class="cs-icon">${acc >= 80 ? '🎉' : '💪'}</div>
        <h2>Révision terminée !</h2>
        <div class="sm-stats" style="margin:1rem 0">
          <div class="sm-stat"><div class="sm-val text-primary">+${xp}</div><div class="sm-lbl">XP</div></div>
          <div class="sm-stat"><div class="sm-val text-success">${acc}%</div><div class="sm-lbl">Précision</div></div>
          <div class="sm-stat"><div class="sm-val">${this.correctCount}/${this.exercises.length}</div><div class="sm-lbl">Correct</div></div>
        </div>
        <button class="btn btn-primary btn-full" onclick="Review.render()">Nouvelle session</button>
        <button class="btn btn-ghost btn-full" style="margin-top:8px" onclick="App.navigate('#units')">Retour au parcours</button>
      </div>
    `;
    App.fireConfetti();
  },

  _escape(s) {
    return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  }
};
