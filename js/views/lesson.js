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

  render(param) {
    if (!param) { App.navigate('#units'); return; }

    const parts = param.split('_');
    this.unitId = parts[0];
    this.chapterId = parts.slice(0, 2).join('_');

    this.exercises = Exercises.generateForChapter(this.chapterId);
    this.currentIndex = 0;
    this.correctCount = 0;
    this.currentXp = 0;

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
        <div class="exercise-container animate-fade-in">
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
        <div class="exercise-container animate-fade-in">
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
        <div class="exercise-container animate-fade-in">
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
            <div class="options-grid" id="options-container">${optsHtml}</div>
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
    if (exo.type === 'qcm' || exo.type === 'true_false' || exo.type === 'audio_qcm') {
      document.querySelectorAll('.option-btn').forEach(b => {
        b.onclick = null;
        const val = (b.querySelector('.opt-text')?.textContent || '').trim();
        if (clean(val) === clean(exo.answer)) b.classList.add('correct');
        else if (clean(val) === clean(selected) && !isCorrect) b.classList.add('wrong');
      });
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
      fbBar.classList.add('correct');
      document.getElementById('fb-icon').textContent = '✓';
      document.getElementById('fb-title').textContent = ['Parfait !', 'Excellent !', 'Bravo !', 'Super !'][Math.floor(Math.random() * 4)];
      document.getElementById('btn-next-exo').className = 'btn btn-success btn-full';
    } else {
      fbBar.classList.add('wrong');
      document.getElementById('fb-icon').textContent = '✕';
      if (exo.subtype === 'verb_fill') {
        document.getElementById('fb-title').textContent = `La bonne forme :`;
      } else {
        document.getElementById('fb-title').textContent = 'Pas tout à fait…';
      }
      // Shake sur QCM/TF/Audio
      if (exo.type === 'qcm' || exo.type === 'true_false' || exo.type === 'audio_qcm') {
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

    // Mise à jour SRS
    if (window.SRS) {
      SRS.updateItem(exo.data.id, exo.data.type || 'vocabulary', isCorrect, exo.data.tense);
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
    this._bindKeys();
    this.showNextExercise();
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

    State.addXP(finalXp);
    State.completeChapter(this.chapterId);
    this._advanceCurrentChapter();
    if (window.Gamification) Gamification.checkAchievements();

    const modal = document.getElementById('session-modal');
    document.getElementById('sm-emoji').textContent = accuracy >= 80 ? '🎉' : '💪';
    document.getElementById('sm-title').textContent = accuracy >= 80 ? 'Chapitre terminé !' : 'Bien joué !';
    document.getElementById('sm-xp').textContent = `+${finalXp}`;
    document.getElementById('sm-acc').textContent = `${accuracy}%`;
    document.getElementById('sm-learned').textContent = this.exercises.length;
    modal.classList.remove('hidden');
    App.fireConfetti();
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

  _escape(s) {
    return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  }
};
