/* ═══════════════════════════════════════════════
   TürkçeYol — review.js
   Session de révision SRS interactive
   ═══════════════════════════════════════════════ */

window.Review = {
  exercises: [],
  currentIndex: 0,
  correctCount: 0,
  _active: false,
  _answered: false,
  _mpState: null,

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
    this._answered = false;

    const sessionHeader = `
      <div class="rev-session-header">
        <div class="rev-prog-track"><div class="rev-prog-fill" style="width:${pct}%"></div></div>
        <div class="rev-counter">${this.currentIndex + 1} / ${this.exercises.length}</div>
      </div>
    `;

    const feedbackHtml = `
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

    let exoHtml = '';

    if (exo.type === 'dialogue_fill') {
      const ctxHtml = exo.context.map((t, i) => {
        const isLeft = i % 2 === 0;
        const align = isLeft ? 'flex-start' : 'flex-end';
        return `
          <div style="display:flex;justify-content:${align};margin-bottom:var(--s2)">
            <div style="max-width:80%;background:var(--surface-2);border-radius:var(--r-md);padding:var(--s2) var(--s3)">
              <div style="font-size:10px;font-weight:700;color:var(--text-3);text-transform:uppercase;margin-bottom:2px">${t.speaker}</div>
              <div style="font-size:var(--text-sm);color:var(--text)">${t.text}</div>
            </div>
          </div>
        `;
      }).join('');
      const maskedAlign = exo.context.length % 2 === 0 ? 'flex-start' : 'flex-end';
      const maskedBubble = `
        <div style="display:flex;justify-content:${maskedAlign};margin-bottom:var(--s3)">
          <div style="max-width:80%;background:var(--primary-glow);border:1.5px dashed var(--primary);border-radius:var(--r-md);padding:var(--s2) var(--s3)">
            <div style="font-size:10px;font-weight:700;color:var(--primary);text-transform:uppercase;margin-bottom:2px">${exo.maskedSpeaker}</div>
            <div style="font-size:var(--text-sm);color:var(--primary);font-weight:700">_______________</div>
          </div>
        </div>
      `;
      const optsHtml = exo.options.map((opt, i) =>
        `<button class="option-btn" onclick="Review._checkAnswer('${this._escape(opt)}')">
          <span class="opt-key">${i + 1}</span><span class="opt-text">${opt}</span>
        </button>`
      ).join('');
      const hintHtml = exo.hint ? `<div class="exo-hint">${exo.hint}</div>` : '';
      exoHtml = `
        <div class="exercise-container animate-fade-in">
          <div class="exercise-header">
            <div class="exo-type-label">💬 Complète le dialogue</div>
            ${hintHtml}
          </div>
          <div class="exercise-content">
            <div style="margin-bottom:var(--s4)">${ctxHtml}${maskedBubble}</div>
            <div class="options-grid" id="rev-options">${optsHtml}</div>
          </div>
        </div>
      `;
    } else if (exo.type === 'grammar_fill') {
      const optsHtml = exo.options.map((opt, i) =>
        `<button class="option-btn" onclick="Review._checkAnswer('${this._escape(opt)}')">
          <span class="opt-key">${i + 1}</span><span class="opt-text">${opt}</span>
        </button>`
      ).join('');
      exoHtml = `
        <div class="exercise-container animate-fade-in">
          <div class="exercise-header">
            <div class="exo-type-label">📐 Grammaire — ${exo.ruleTitle || ''}</div>
            <h2 class="exercise-prompt exo-tr" style="font-size:var(--text-2xl)">${exo.root}</h2>
            <div class="exo-hint" style="font-size:var(--text-md);color:var(--text-2);margin-top:8px">${exo.question}</div>
          </div>
          <div class="exercise-content">
            <div class="options-grid" id="rev-options">${optsHtml}</div>
          </div>
        </div>
      `;
    } else if (exo.type === 'cloze') {
      const optsHtml = exo.options.map((opt, i) =>
        `<button class="option-btn" onclick="Review._checkAnswer('${this._escape(opt)}')">
          <span class="opt-key">${i + 1}</span><span class="opt-text">${opt}</span>
        </button>`
      ).join('');
      const sentenceHtml = exo.sentence.replace(
        /____/g,
        '<span style="color:var(--primary);font-weight:800;letter-spacing:1px">____</span>'
      );
      const hintHtml = exo.hint ? `<div class="exo-hint">${exo.hint}</div>` : '';
      exoHtml = `
        <div class="exercise-container animate-fade-in">
          <div class="exercise-header">
            <div class="exo-type-label">🧩 Complète la phrase</div>
            <h2 class="exercise-prompt exo-tr">${sentenceHtml}</h2>
            ${hintHtml}
          </div>
          <div class="exercise-content">
            <div class="options-grid" id="rev-options">${optsHtml}</div>
          </div>
        </div>
      `;
    } else if (exo.type === 'word_order') {
      const wordsHtml = exo.words.map(w =>
        `<button class="word-chip" data-word="${this._escape(w)}" onclick="Review._woClickBank(this)">${w}</button>`
      ).join('');
      exoHtml = `
        <div class="exercise-container animate-fade-in">
          <div class="exercise-header">
            <div class="exo-type-label">🔀 Remettre en ordre</div>
            <h2 class="exercise-prompt">${exo.question}</h2>
            <div class="exo-hint">${exo.hint}</div>
          </div>
          <div class="exercise-content">
            <div class="word-order-container">
              <div class="word-answer" id="wo-answer">
                <span class="answer-placeholder" id="wo-placeholder">Appuie sur les mots…</span>
              </div>
              <div class="word-bank" id="wo-bank">${wordsHtml}</div>
              <button class="btn btn-primary btn-full" id="wo-validate" onclick="Review._woValidate()" disabled>Valider</button>
            </div>
          </div>
        </div>
      `;
    } else if (exo.type === 'match_pairs') {
      this._mpState = { matched: 0, selectedTR: null, selectedFR: null };
      const pairsFR = [...exo.pairs].sort(() => 0.5 - Math.random());
      const trHtml = exo.pairs.map(p =>
        `<button class="match-chip match-tr" data-id="${p.id}" onclick="Review._mpClickTR('${this._escape(p.id)}', this)">${p.tr}</button>`
      ).join('');
      const frHtml = pairsFR.map(p =>
        `<button class="match-chip match-fr" data-id="${p.id}" onclick="Review._mpClickFR('${this._escape(p.id)}', this)">${p.fr}</button>`
      ).join('');
      exoHtml = `
        <div class="exercise-container animate-fade-in">
          <div class="exercise-header">
            <div class="exo-type-label">🔗 Associer les paires</div>
            <h2 class="exercise-prompt">${exo.question}</h2>
            <div class="match-score" id="mp-score">0 / ${exo.pairs.length} paires trouvées</div>
          </div>
          <div class="exercise-content">
            <div class="match-pairs-container">
              <div class="match-grid">
                <div class="match-col">${trHtml}</div>
                <div class="match-col">${frHtml}</div>
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (exo.type === 'true_false') {
      exoHtml = `
        <div class="exercise-container animate-fade-in">
          <div class="exercise-header">
            <div class="exo-type-label">✅ Vrai ou Faux ?</div>
            <h2 class="exercise-prompt exo-tr">${exo.question}</h2>
            <div class="tf-proposed">= <span class="exo-fr">${exo.proposed}</span></div>
          </div>
          <div class="exercise-content">
            <div class="tf-grid">
              <button class="tf-btn option-btn" onclick="Review._checkAnswer('Vrai')">
                <span class="opt-text">Vrai</span>
              </button>
              <button class="tf-btn option-btn" onclick="Review._checkAnswer('Faux')">
                <span class="opt-text">Faux</span>
              </button>
            </div>
          </div>
        </div>
      `;
    } else if (exo.type === 'audio_qcm') {
      const optsHtml = exo.options.map((opt, i) =>
        `<button class="option-btn" onclick="Review._checkAnswer('${this._escape(opt)}')">
          <span class="opt-key">${i + 1}</span><span class="opt-text">${opt}</span>
        </button>`
      ).join('');
      exoHtml = `
        <div class="exercise-container animate-fade-in">
          <div class="exercise-header">
            <div class="exo-type-label">🔊 Écouter et choisir</div>
            <button class="audio-play-btn" onclick="App.playTTS('${this._escape(exo.audioTr)}')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/>
              </svg>
              Écouter
            </button>
          </div>
          <div class="exercise-content">
            <div class="options-grid" id="rev-options">${optsHtml}</div>
          </div>
        </div>
      `;
    } else {
      // qcm (vocab ou verb_fill)
      let headerContent;
      if (exo.subtype === 'verb_fill' && exo.verbMeta) {
        const vm = exo.verbMeta;
        headerContent = `
          <div class="verb-exo-card">
            <div class="verb-exo-row">
              <div>
                <div class="verb-exo-name">${vm.infinitive}</div>
                <div class="verb-exo-meaning">${vm.fr}</div>
              </div>
              <span class="verb-exo-tense">${vm.tenseLabel}</span>
            </div>
          </div>
          <h2 class="exercise-prompt">
            <span class="exo-person">${vm.personLabel}</span><span class="exo-blank"> _______</span>
          </h2>
        `;
      } else {
        const hintHtml = exo.hint ? `<div class="exo-hint">${exo.hint}</div>` : '';
        headerContent = `<h2 class="exercise-prompt">${exo.question}</h2>${hintHtml}`;
      }
      const optsHtml = exo.options.map((opt, i) =>
        `<button class="option-btn" onclick="Review._checkAnswer('${this._escape(opt)}')">
          <span class="opt-key">${i + 1}</span><span class="opt-text">${opt}</span>
        </button>`
      ).join('');
      exoHtml = `
        <div class="exercise-container animate-fade-in">
          <div class="exercise-header">
            <div class="exo-type-label">${exo.subtype === 'verb_fill' ? '⚡ Conjugaison' : '🔄 Révision'}</div>
            ${headerContent}
          </div>
          <div class="exercise-content">
            <div class="options-grid" id="rev-options">${optsHtml}</div>
          </div>
        </div>
      `;
    }

    container.innerHTML = sessionHeader + exoHtml + feedbackHtml;

    if (exo.type === 'audio_qcm') {
      setTimeout(() => App.playTTS(exo.audioTr), 400);
    }
  },

  _checkAnswer(selected) {
    if (this._answered) return;
    this._answered = true;
    const exo = this.exercises[this.currentIndex];
    const clean = s => s.normalize('NFC').toLocaleLowerCase('tr-TR')
      .replace(/[.!?,;:'"]/g, '').replace(/\s+/g, ' ').trim();
    const isCorrect = clean(selected) === clean(exo.answer);

    if (exo.type === 'qcm' || exo.type === 'true_false' || exo.type === 'audio_qcm'
        || exo.type === 'cloze' || exo.type === 'grammar_fill' || exo.type === 'dialogue_fill') {
      document.querySelectorAll('.option-btn').forEach(b => {
        b.onclick = null;
        const val = (b.querySelector('.opt-text')?.textContent || '').trim();
        if (clean(val) === clean(exo.answer)) b.classList.add('correct');
        else if (clean(val) === clean(selected) && !isCorrect) b.classList.add('wrong');
      });
    } else if (exo.type === 'word_order') {
      const answerDiv = document.getElementById('wo-answer');
      if (answerDiv) answerDiv.classList.add(isCorrect ? 'correct' : 'wrong');
    }

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
    if (window.SRS && exo.data.type !== 'phrase') {
      const quality = isCorrect ? 4 : 2;
      SRS.updateItem(exo.data.id, exo.data.type || 'vocabulary', quality, exo.data.tense);
    }

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

  _woClickBank(btn) {
    btn.onclick = () => Review._woClickAnswer(btn);
    document.getElementById('wo-answer').appendChild(btn);
    const ph = document.getElementById('wo-placeholder');
    if (ph) ph.style.display = 'none';
    document.getElementById('wo-validate').disabled = false;
  },

  _woClickAnswer(btn) {
    btn.onclick = () => Review._woClickBank(btn);
    document.getElementById('wo-bank').appendChild(btn);
    const answerDiv = document.getElementById('wo-answer');
    if (!answerDiv.querySelector('.word-chip')) {
      const ph = document.getElementById('wo-placeholder');
      if (ph) ph.style.display = '';
      document.getElementById('wo-validate').disabled = true;
    }
  },

  _woValidate() {
    if (this._answered) return;
    const chips = Array.from(document.getElementById('wo-answer').querySelectorAll('.word-chip'));
    if (chips.length === 0) return;
    const selected = chips.map(c => c.dataset.word).join(' ');
    document.querySelectorAll('.word-chip').forEach(c => { c.onclick = null; });
    document.getElementById('wo-validate').disabled = true;
    this._checkAnswer(selected);
  },

  _mpClickTR(id, btn) {
    if (!this._mpState) return;
    document.querySelectorAll('.match-tr.selected').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    this._mpState.selectedTR = { id, btn };
    this._mpRevCheck();
  },

  _mpClickFR(id, btn) {
    if (!this._mpState) return;
    document.querySelectorAll('.match-fr.selected').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    this._mpState.selectedFR = { id, btn };
    this._mpRevCheck();
  },

  _mpRevCheck() {
    const { selectedTR, selectedFR } = this._mpState;
    if (!selectedTR || !selectedFR) return;
    if (selectedTR.id === selectedFR.id) {
      selectedTR.btn.classList.remove('selected'); selectedFR.btn.classList.remove('selected');
      selectedTR.btn.classList.add('matched'); selectedFR.btn.classList.add('matched');
      this._mpState.matched++;
      const scoreEl = document.getElementById('mp-score');
      const exo = this.exercises[this.currentIndex];
      if (scoreEl) scoreEl.textContent = `${this._mpState.matched} / ${exo.pairs.length} paires trouvées`;
      const pair = exo.pairs.find(p => p.id === selectedTR.id);
      if (pair) App.playTTS(pair.tr);
      this._mpState.selectedTR = null; this._mpState.selectedFR = null;
      if (this._mpState.matched === exo.pairs.length) setTimeout(() => this._mpRevComplete(), 500);
    } else {
      const trBtn = selectedTR.btn, frBtn = selectedFR.btn;
      trBtn.classList.add('wrong'); frBtn.classList.add('wrong');
      this._mpState.selectedTR = null; this._mpState.selectedFR = null;
      setTimeout(() => { trBtn.classList.remove('wrong', 'selected'); frBtn.classList.remove('wrong', 'selected'); }, 600);
    }
  },

  _mpRevComplete() {
    if (this._answered) return;
    this._answered = true;
    const exo = this.exercises[this.currentIndex];
    this.correctCount++;
    if (window.SRS) exo.pairs.forEach(p => SRS.updateItem(p.id, 'vocabulary', 4));
    const fb = document.getElementById('rev-feedback');
    fb.classList.add('correct', 'show');
    document.getElementById('rev-fb-icon').textContent = '✓';
    document.getElementById('rev-fb-title').textContent = 'Toutes les paires trouvées !';
    fb.querySelector('.btn').className = 'btn btn-success btn-full';
    document.getElementById('rev-fb-tr').textContent = '';
    document.getElementById('rev-fb-fr').textContent = `${exo.pairs.length} paires associées ✓`;
  },

  _escape(s) {
    return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  }
};
