/* ═══════════════════════════════════════════════
   TürkçeYol — lesson.js
   Leçon interactive — exercices, feedback, TTS
   ═══════════════════════════════════════════════ */

window.Lesson = {
  chapterId: null,
  unitId: null,
  exercises: [],
  currentIndex: 0,
  correctCount: 0,
  currentXp: 0,
  _keyHandler: null,
  _answered: false,
  _mpState: null,
  _comboCount: 0,
  _mistakes: [],

  render(param) {
    if (!param) { App.navigate('#units'); return; }

    const parts = param.split('_');
    this.unitId = parts[0];
    this.chapterId = parts.slice(0, 2).join('_');

    this.exercises = Exercises.generateForChapter(this.chapterId);
    this.currentIndex = 0;
    this.correctCount = 0;
    this.currentXp = 0;
    this._comboCount = 0;
    this._mistakes = [];

    document.getElementById('session-modal').classList.add('hidden');
    this._bindKeys();
    this.updateProgressUI();
    this.showNextExercise();
  },

  updateProgressUI() {
    const pct = this.exercises.length > 0
      ? (this.currentIndex / this.exercises.length) * 100 : 0;
    document.getElementById('lesson-prog-fill').style.width = pct + '%';
    document.getElementById('lesson-xp-live').textContent = `${this.currentXp} XP`;
  },

  showNextExercise() {
    if (this.currentIndex >= this.exercises.length) {
      this._unbindKeys();
      this.finishLesson();
      return;
    }
    const exo = this.exercises[this.currentIndex];
    const container = document.getElementById('lesson-body');

    let exoHtml = '';
    if (exo.type === 'qcm') {
      const isVerb = exo.subtype === 'verb_fill';
      const optsHtml = exo.options.map((opt, i) => `
        <button class="option-btn" onclick="Lesson.checkAnswer('${this._escape(opt)}')">
          <span class="opt-key">${i + 1}</span>
          <span class="opt-text">${opt}</span>
        </button>
      `).join('');

      let headerContent;
      if (isVerb && exo.verbMeta) {
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

      exoHtml = `
        <div class="exercise-container exo-slide-in">
          <div class="exercise-header">
            <div class="exo-type-label">${isVerb ? '⚡ Conjugaison' : '🎯 Choix multiple'}</div>
            ${headerContent}
          </div>
          <div class="exercise-content">
            <div class="options-grid" id="options-container">${optsHtml}</div>
          </div>
        </div>
      `;
    } else if (exo.type === 'input') {
      exoHtml = `
        <div class="exercise-container exo-slide-in">
          <div class="exercise-header">
            <div class="exo-type-label">✍️ Traduire</div>
            <h2 class="exercise-prompt">${exo.question}</h2>
          </div>
          <div class="exercise-content" style="justify-content:flex-start;margin-top:1.5rem">
            <input type="text" id="exo-input" class="exercise-input"
                   placeholder="Écrivez en turc…" autocomplete="off" autocorrect="off" spellcheck="false">
            <button class="btn btn-primary btn-full mt-4" onclick="Lesson.checkInput()">Valider</button>
          </div>
        </div>
      `;
    } else if (exo.type === 'true_false') {
      exoHtml = `
        <div class="exercise-container exo-slide-in">
          <div class="exercise-header">
            <div class="exo-type-label">✅ Vrai ou Faux ?</div>
            <h2 class="exercise-prompt exo-tr">${exo.question}</h2>
            <div class="tf-proposed">= <span class="exo-fr">${exo.proposed}</span></div>
          </div>
          <div class="exercise-content">
            <div class="tf-grid">
              <button class="tf-btn option-btn" onclick="Lesson.checkAnswer('Vrai')">
                <span class="opt-text">Vrai</span>
              </button>
              <button class="tf-btn option-btn" onclick="Lesson.checkAnswer('Faux')">
                <span class="opt-text">Faux</span>
              </button>
            </div>
          </div>
        </div>
      `;
    } else if (exo.type === 'audio_qcm') {
      const optsHtml = exo.options.map((opt, i) => `
        <button class="option-btn" onclick="Lesson.checkAnswer('${this._escape(opt)}')">
          <span class="opt-key">${i + 1}</span>
          <span class="opt-text">${opt}</span>
        </button>
      `).join('');
      exoHtml = `
        <div class="exercise-container exo-slide-in">
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
            <div class="options-grid" id="options-container">${optsHtml}</div>
          </div>
        </div>
      `;
    } else if (exo.type === 'word_order') {
      const wordsHtml = exo.words.map(w =>
        `<button class="word-chip" data-word="${this._escape(w)}" onclick="Lesson._woClickBank(this)">${w}</button>`
      ).join('');
      exoHtml = `
        <div class="exercise-container exo-slide-in">
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
              <button class="btn btn-primary btn-full" id="wo-validate" onclick="Lesson._woValidate()" disabled>Valider</button>
            </div>
          </div>
        </div>
      `;
    } else if (exo.type === 'cloze') {
      const optsHtml = exo.options.map((opt, i) => `
        <button class="option-btn" onclick="Lesson.checkAnswer('${this._escape(opt)}')">
          <span class="opt-key">${i + 1}</span>
          <span class="opt-text">${opt}</span>
        </button>
      `).join('');
      const sentenceHtml = exo.sentence.replace(
        /____/g,
        '<span style="color:var(--primary);font-weight:800;letter-spacing:1px">____</span>'
      );
      const hintHtml = exo.hint ? `<div class="exo-hint">${exo.hint}</div>` : '';
      exoHtml = `
        <div class="exercise-container exo-slide-in">
          <div class="exercise-header">
            <div class="exo-type-label">🧩 Complète la phrase</div>
            <h2 class="exercise-prompt exo-tr">${sentenceHtml}</h2>
            ${hintHtml}
          </div>
          <div class="exercise-content">
            <div class="options-grid" id="options-container">${optsHtml}</div>
          </div>
        </div>
      `;
    } else if (exo.type === 'match_pairs') {
      this._mpState = { matched: 0, selectedTR: null, selectedFR: null };
      const pairsFR = [...exo.pairs].sort(() => 0.5 - Math.random());
      const trHtml = exo.pairs.map(p =>
        `<button class="match-chip match-tr" data-id="${p.id}" onclick="Lesson._mpClickTR('${this._escape(p.id)}', this)">${p.tr}</button>`
      ).join('');
      const frHtml = pairsFR.map(p =>
        `<button class="match-chip match-fr" data-id="${p.id}" onclick="Lesson._mpClickFR('${this._escape(p.id)}', this)">${p.fr}</button>`
      ).join('');
      exoHtml = `
        <div class="exercise-container exo-slide-in">
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
    }

    const feedbackHtml = `
      <div id="feedback-bar" class="feedback-bar">
        <div class="fb-msg-row">
          <div class="fb-icon" id="fb-icon">✓</div>
          <div class="fb-text">
            <div class="fb-title" id="fb-title">Excellent !</div>
            <div class="fb-tr-row">
              <span class="fb-tr" id="fb-tr"></span>
              <button class="btn-tts-inline" id="fb-tts-btn" onclick="" style="display:none">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/>
                </svg>
              </button>
            </div>
            <div class="fb-fr" id="fb-fr"></div>
          </div>
        </div>
        <button id="btn-next-exo" class="btn btn-primary btn-full" onclick="Lesson.nextStep()">Continuer</button>
      </div>
    `;

    this._answered = false;
    container.innerHTML = exoHtml + feedbackHtml;

    if (exo.type === 'input') {
      setTimeout(() => {
        const inp = document.getElementById('exo-input');
        if (inp) inp.focus();
      }, 120);
    }
    if (exo.type === 'audio_qcm') {
      setTimeout(() => App.playTTS(exo.audioTr), 400);
    }
  },

  checkInput() {
    const el = document.getElementById('exo-input');
    if (!el || !el.value.trim()) return;
    this.checkAnswer(el.value.trim());
  },

  checkAnswer(selected) {
    if (this._answered) return;
    this._answered = true;
    const exo = this.exercises[this.currentIndex];
    const clean = s => s.normalize('NFC').toLocaleLowerCase('tr-TR')
      .replace(/[.!?,;:'"]/g, '').replace(/\s+/g, ' ').trim();

    const isCorrect = clean(selected) === clean(exo.answer);

    // Style des boutons / input
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
    } else {
      const inp = document.getElementById('exo-input');
      if (inp) {
        inp.disabled = true;
        inp.classList.add(isCorrect ? 'correct' : 'wrong');
      }
    }

    const fbBar = document.getElementById('feedback-bar');
    if (isCorrect) {
      this.correctCount++;
      const xpGain = exo.subtype === 'verb_fill' ? 15 : 10;
      this.currentXp += xpGain;
      App.showXPFloat(xpGain);

      // Combo
      this._comboCount++;
      if (this._comboCount > (State.data.maxCombo || 0)) {
        State.data.maxCombo = this._comboCount;
        State.save();
      }
      if (this._comboCount >= 3) {
        const bonusXP = 2;
        this.currentXp += bonusXP;
        this._showComboToast(this._comboCount);
      }
      if (window.AudioEngine) AudioEngine.playCorrect();

      fbBar.classList.add('correct');
      document.getElementById('fb-icon').textContent = '✓';
      document.getElementById('fb-title').textContent = ['Parfait !', 'Excellent !', 'Bravo !', 'Super !'][Math.floor(Math.random() * 4)];
      document.getElementById('btn-next-exo').className = 'btn btn-success btn-full';
    } else {
      this._comboCount = 0;
      if (window.AudioEngine) AudioEngine.playWrong();

      // Track mistake (pour "Revoir les erreurs")
      if (exo.data && exo.data.id) {
        this._mistakes.push({
          id: exo.data.id,
          type: exo.data.type || 'vocabulary',
          tr: exo.data.tr || '',
          fr: exo.data.fr || ''
        });
      }

      fbBar.classList.add('wrong');
      document.getElementById('fb-icon').textContent = '✕';
      if (exo.subtype === 'verb_fill') {
        document.getElementById('fb-title').textContent = `La bonne forme :`;
      } else {
        document.getElementById('fb-title').textContent = 'Pas tout à fait…';
      }
      // Shake sur QCM/TF/Audio/cloze/grammar/dialogue
      if (exo.type === 'qcm' || exo.type === 'true_false' || exo.type === 'audio_qcm'
          || exo.type === 'cloze' || exo.type === 'grammar_fill' || exo.type === 'dialogue_fill') {
        const wrongBtn = document.querySelector('.option-btn.wrong');
        if (wrongBtn) wrongBtn.classList.add('animate-shake');
      }
    }

    document.getElementById('fb-tr').textContent = exo.data.tr || '';
    if (exo.subtype === 'verb_fill' && exo.verbMeta) {
      const vm = exo.verbMeta;
      document.getElementById('fb-fr').textContent =
        `${vm.personLabel} — ${vm.fr} (${vm.tenseLabel})`;
    } else {
      document.getElementById('fb-fr').textContent = exo.data.fr || '';
    }

    // Bouton TTS dans le feedback
    if (exo.data.tr) {
      const ttsBtn = document.getElementById('fb-tts-btn');
      if (ttsBtn) {
        ttsBtn.style.display = 'inline-flex';
        ttsBtn.onclick = () => App.playTTS(exo.data.tr);
      }
      // TTS auto
      App.playTTS(exo.data.tr);
    }

    // Mise à jour SRS (qualité SM-2 : 5 si combo, 4 si correct, 2 si faux)
    if (window.SRS && exo.data.type !== 'phrase') {
      const quality = isCorrect
        ? (this._comboCount >= 3 ? 5 : 4)
        : 2;
      SRS.updateItem(exo.data.id, exo.data.type || 'vocabulary', quality, exo.data.tense);
    }

    fbBar.classList.add('show');
    this.updateProgressUI();

    // Maj touche Entrée pour continuer
    if (this._keyHandler) {
      document.removeEventListener('keydown', this._keyHandler);
    }
    this._keyHandler = (e) => {
      if (e.key === 'Enter') { this.nextStep(); }
    };
    document.addEventListener('keydown', this._keyHandler);
  },

  nextStep() {
    this.currentIndex++;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const exoEl = document.querySelector('#lesson-body .exercise-container');
    if (!reduced && exoEl) {
      exoEl.classList.add('exo-slide-out');
      setTimeout(() => {
        this._bindKeys();
        this.showNextExercise();
      }, 200);
    } else {
      this._bindKeys();
      this.showNextExercise();
    }
  },

  _bindKeys() {
    if (this._keyHandler) document.removeEventListener('keydown', this._keyHandler);
    this._keyHandler = (e) => {
      const fbVisible = document.getElementById('feedback-bar')?.classList.contains('show');
      if (fbVisible) {
        if (e.key === 'Enter') this.nextStep();
        return;
      }
      if (['1','2','3','4'].includes(e.key)) {
        const idx = parseInt(e.key) - 1;
        const btns = document.querySelectorAll('.option-btn');
        if (btns[idx]) btns[idx].click();
      }
    };
    document.addEventListener('keydown', this._keyHandler);
  },

  _unbindKeys() {
    if (this._keyHandler) {
      document.removeEventListener('keydown', this._keyHandler);
      this._keyHandler = null;
    }
  },

  finishLesson() {
    const accuracy = this.exercises.length > 0
      ? Math.round((this.correctCount / this.exercises.length) * 100) : 0;

    let finalXp = this.currentXp;
    if (accuracy >= 80) finalXp += 20;
    if (accuracy === 100) finalXp += 10;

    // Persist via Gamification pour détecter le level-up (audio + toast)
    if (window.Gamification) Gamification.addXP(finalXp);
    else State.addXP(finalXp);
    State.completeChapter(this.chapterId);
    this._advanceCurrentChapter();

    // Track perfect lessons (100%)
    if (accuracy === 100) {
      State.data.perfectLessons = (State.data.perfectLessons || 0) + 1;
      State.save();
    }

    if (window.Gamification) Gamification.checkAchievements();

    // Construction dynamique de la session-card (G3)
    const modal = document.getElementById('session-modal');
    const card = modal.querySelector('.session-card');

    let emoji, title, message;
    if (accuracy >= 80) {
      emoji = '🎉';
      title = 'Chapitre terminé !';
      message = accuracy === 100
        ? 'Sans-faute ! Tu maîtrises ce chapitre.'
        : 'Excellent travail — tu progresses vite !';
    } else if (accuracy >= 60) {
      emoji = '👍';
      title = 'Bien joué !';
      message = 'Solide ! Quelques erreurs à revoir pour consolider.';
    } else {
      emoji = '💪';
      title = 'Continue !';
      message = 'Pas grave — l\'erreur fait partie de l\'apprentissage. Réessaie !';
    }

    // Liste des mots vus (uniques)
    const wordsMap = new Map();
    this.exercises.forEach(ex => {
      if (!ex.data || !ex.data.id) return;
      if (ex.data.type === 'phrase') return;
      const key = ex.data.id;
      if (!wordsMap.has(key)) {
        wordsMap.set(key, { tr: ex.data.tr || '', fr: ex.data.fr || '', wrong: false });
      }
    });
    this._mistakes.forEach(m => {
      if (wordsMap.has(m.id)) wordsMap.get(m.id).wrong = true;
    });
    const words = Array.from(wordsMap.values()).filter(w => w.tr);

    const wordsHtml = words.length > 0 ? `
      <div class="sm-words-section">
        <div class="sm-words-title">Vu dans cette leçon · ${words.length}</div>
        ${words.map(w => `
          <div class="sm-word-row ${w.wrong ? 'sm-word-wrong' : ''}">
            <span class="sm-w-tr">${w.wrong ? '✕ ' : '✓ '}${w.tr}</span>
            <span class="sm-w-fr">${w.fr}</span>
          </div>
        `).join('')}
      </div>
    ` : '';

    const retryBtn = this._mistakes.length > 0
      ? `<button class="btn btn-outline btn-full" style="margin-bottom:8px" onclick="Lesson.retryMistakes()">Revoir les erreurs (${this._mistakes.length})</button>`
      : '';

    card.innerHTML = `
      <div class="sm-emoji" id="sm-emoji">${emoji}</div>
      <h2 class="sm-title" id="sm-title">${title}</h2>
      <div class="sm-message">${message}</div>
      <div class="sm-stats">
        <div class="sm-stat"><div class="sm-val" id="sm-xp">+${finalXp}</div><div class="sm-lbl">XP</div></div>
        <div class="sm-stat"><div class="sm-val" id="sm-acc">${accuracy}%</div><div class="sm-lbl">Précision</div></div>
        <div class="sm-stat"><div class="sm-val" id="sm-learned">${this.exercises.length}</div><div class="sm-lbl">Exos</div></div>
      </div>
      ${wordsHtml}
      ${retryBtn}
      <button class="btn btn-primary btn-full" onclick="App.navigate('#units')">Continuer le parcours</button>
      <button class="btn btn-ghost btn-full" style="margin-top:8px" onclick="App.navigate('#dashboard')">Accueil</button>
    `;

    modal.classList.remove('hidden');
    if (accuracy >= 80) App.fireConfetti();
  },

  // Mini-session sur les erreurs uniquement (G3)
  retryMistakes() {
    if (!this._mistakes || this._mistakes.length === 0) return;
    const items = this._mistakes.map(m => ({ id: m.id, type: m.type }));
    const retryExercises = window.Exercises ? Exercises.generateForReview(items) : [];
    if (retryExercises.length === 0) {
      App.showToast('Pas d\'exercices disponibles pour revoir', 'info');
      return;
    }
    this.exercises = retryExercises;
    this.currentIndex = 0;
    this.correctCount = 0;
    this.currentXp = 0;
    this._comboCount = 0;
    this._mistakes = [];
    document.getElementById('session-modal').classList.add('hidden');
    this._bindKeys();
    this.updateProgressUI();
    this.showNextExercise();
  },

  _advanceCurrentChapter() {
    const currentId = this.chapterId;
    for (let ui = 0; ui < AppUnits.length; ui++) {
      const unit = AppUnits[ui];
      for (let ci = 0; ci < unit.chapters.length; ci++) {
        if (unit.chapters[ci].id === currentId) {
          if (ci + 1 < unit.chapters.length) {
            State.setCurrentChapter(unit.id, unit.chapters[ci + 1].id);
          } else if (ui + 1 < AppUnits.length) {
            const next = AppUnits[ui + 1];
            State.setCurrentChapter(next.id, next.chapters[0].id);
          }
          return;
        }
      }
    }
  },

  _woClickBank(btn) {
    btn.onclick = () => Lesson._woClickAnswer(btn);
    document.getElementById('wo-answer').appendChild(btn);
    const ph = document.getElementById('wo-placeholder');
    if (ph) ph.style.display = 'none';
    document.getElementById('wo-validate').disabled = false;
  },

  _woClickAnswer(btn) {
    btn.onclick = () => Lesson._woClickBank(btn);
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
    this.checkAnswer(selected);
  },

  _mpClickTR(id, btn) {
    if (!this._mpState) return;
    document.querySelectorAll('.match-tr.selected').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    this._mpState.selectedTR = { id, btn };
    this._mpCheck();
  },

  _mpClickFR(id, btn) {
    if (!this._mpState) return;
    document.querySelectorAll('.match-fr.selected').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    this._mpState.selectedFR = { id, btn };
    this._mpCheck();
  },

  _mpCheck() {
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
      if (this._mpState.matched === exo.pairs.length) setTimeout(() => this._mpComplete(), 500);
    } else {
      const trBtn = selectedTR.btn, frBtn = selectedFR.btn;
      trBtn.classList.add('wrong'); frBtn.classList.add('wrong');
      this._mpState.selectedTR = null; this._mpState.selectedFR = null;
      setTimeout(() => { trBtn.classList.remove('wrong', 'selected'); frBtn.classList.remove('wrong', 'selected'); }, 600);
    }
  },

  _mpComplete() {
    if (this._answered) return;
    this._answered = true;
    const exo = this.exercises[this.currentIndex];
    this.correctCount++;
    this.currentXp += 10;
    App.showXPFloat(10);

    this._comboCount++;
    if (this._comboCount > (State.data.maxCombo || 0)) {
      State.data.maxCombo = this._comboCount;
      State.save();
    }
    if (this._comboCount >= 3) {
      const bonusXP = 2;
      this.currentXp += bonusXP;
      this._showComboToast(this._comboCount);
    }
    if (window.AudioEngine) AudioEngine.playCorrect();

    if (window.SRS) {
      const q = this._comboCount >= 3 ? 5 : 4;
      exo.pairs.forEach(p => SRS.updateItem(p.id, 'vocabulary', q));
    }
    const fbBar = document.getElementById('feedback-bar');
    fbBar.classList.add('correct', 'show');
    document.getElementById('fb-icon').textContent = '✓';
    document.getElementById('fb-title').textContent = 'Toutes les paires trouvées !';
    document.getElementById('btn-next-exo').className = 'btn btn-success btn-full';
    document.getElementById('fb-tr').textContent = '';
    document.getElementById('fb-fr').textContent = `${exo.pairs.length} paires associées ✓`;
    this.updateProgressUI();
  },

  _showComboToast(count) {
    const host = document.querySelector('.exercise-container');
    if (!host) return;
    // Clean previous toast if still visible
    const old = host.querySelector('.combo-toast');
    if (old) old.remove();

    const toast = document.createElement('div');
    toast.className = 'combo-toast';
    toast.textContent = `🔥 ×${count} Combo !`;
    host.appendChild(toast);

    if (count >= 5 && window.AudioEngine) AudioEngine.playCombo();

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => { if (toast.parentNode) toast.remove(); }, 320);
    }, 1200);
  },

  _escape(s) {
    return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  }
};
