/* ═══════════════════════════════════════════════
   TürkçeYol — lesson.js
   Leçon interactive, moteur d'affichage des exos
   ═══════════════════════════════════════════════ */

window.Lesson = {
  chapterId: null,
  unitId: null,
  exercises: [],
  currentIndex: 0,
  correctCount: 0,
  currentXp: 0,
  
  render(param) {
    if (!param) {
      App.navigate('#units');
      return;
    }
    
    const [uId, cId] = param.split('_');
    this.unitId = uId;
    this.chapterId = `${uId}_${cId}`;
    
    // Générer les exercices
    this.exercises = Exercises.generateForChapter(this.chapterId);
    this.currentIndex = 0;
    this.correctCount = 0;
    this.currentXp = 0;
    
    document.getElementById('session-modal').classList.add('hidden');
    this.updateProgressUI();
    this.showNextExercise();
  },

  updateProgressUI() {
    const pct = (this.currentIndex / this.exercises.length) * 100;
    document.getElementById('lesson-prog-fill').style.width = pct + '%';
    document.getElementById('lesson-xp-live').textContent = `${this.currentXp} XP`;
  },

  showNextExercise() {
    const container = document.getElementById('lesson-body');
    
    if (this.currentIndex >= this.exercises.length) {
      this.finishLesson();
      return;
    }

    const exo = this.exercises[this.currentIndex];
    let contentHtml = '';

    if (exo.type === 'qcm') {
      const optsHtml = exo.options.map(opt => `
        <button class="option-btn" onclick="Lesson.checkAnswer('${opt.replace(/'/g, "\\'")}')">
          ${opt}
        </button>
      `).join('');
      
      contentHtml = `
        <div class="exercise-container animate-fade-in">
          <div class="exercise-header">
            <h2 class="exercise-prompt">${exo.question}</h2>
          </div>
          <div class="exercise-content">
            <div class="options-grid cols-2" id="options-container">${optsHtml}</div>
          </div>
        </div>
      `;
    } 
    else if (exo.type === 'input') {
      contentHtml = `
        <div class="exercise-container animate-fade-in">
          <div class="exercise-header">
            <h2 class="exercise-prompt">${exo.question}</h2>
          </div>
          <div class="exercise-content" style="justify-content: flex-start; margin-top:2rem;">
            <input type="text" id="exo-input" class="exercise-input" placeholder="Écrivez en turc..." autocomplete="off">
            <button class="btn btn-primary btn-full mt-4" onclick="Lesson.checkInput()">Valider</button>
          </div>
        </div>
      `;
    }

    // Feedback bar template (cachée)
    const feedbackHtml = `
      <div id="feedback-bar" class="feedback-bar">
        <div class="fb-msg-row">
          <div class="fb-icon" id="fb-icon">✓</div>
          <div class="fb-text">
            <div class="fb-title" id="fb-title">Excellent !</div>
            <div class="fb-tr" id="fb-tr"></div>
            <div class="fb-fr" id="fb-fr"></div>
          </div>
        </div>
        <button id="btn-next-exo" class="btn btn-primary btn-full" onclick="Lesson.nextStep()">Continuer</button>
      </div>
    `;

    container.innerHTML = contentHtml + feedbackHtml;
    
    // Focus auto sur l'input
    if (exo.type === 'input') {
      setTimeout(() => document.getElementById('exo-input').focus(), 100);
    }
  },

  checkInput() {
    const inputEl = document.getElementById('exo-input');
    const val = inputEl.value.trim();
    if(!val) return;
    this.checkAnswer(val);
  },

  checkAnswer(selected) {
    const exo = this.exercises[this.currentIndex];
    // Nettoyage intelligent : Unicode, casse turque (İ/ı), ponctuation, espaces
    const clean = (s) => s.normalize('NFC').toLocaleLowerCase('tr-TR').replace(/[.!?,;:'"]/g, '').replace(/\s+/g, ' ').trim();
    
    const isCorrect = clean(selected) === clean(exo.answer);
    
    // UI Update
    if (exo.type === 'qcm') {
      const btns = document.querySelectorAll('.option-btn');
      btns.forEach(b => {
        b.onclick = null; // disable
        if (clean(b.textContent) === clean(exo.answer)) b.classList.add('correct');
        else if (clean(b.textContent) === clean(selected) && !isCorrect) b.classList.add('wrong');
      });
    } else if (exo.type === 'input') {
      const inputEl = document.getElementById('exo-input');
      inputEl.disabled = true;
      if(isCorrect) inputEl.classList.add('correct');
      else inputEl.classList.add('wrong');
    }

    // Feedback
    const fbBar = document.getElementById('feedback-bar');
    if (isCorrect) {
      this.correctCount++;
      const xpGain = 10;
      this.currentXp += xpGain;
      App.showXPFloat(xpGain);
      
      fbBar.classList.add('correct');
      document.getElementById('fb-icon').textContent = '✓';
      document.getElementById('fb-title').textContent = 'Excellent !';
      document.getElementById('btn-next-exo').classList.replace('btn-primary', 'btn-success');
    } else {
      fbBar.classList.add('wrong');
      document.getElementById('fb-icon').textContent = '✕';
      document.getElementById('fb-title').textContent = 'Pas tout à fait';
    }
    
    // Afficher la traduction
    document.getElementById('fb-tr').textContent = exo.data.tr;
    document.getElementById('fb-fr').textContent = exo.data.fr;

    // TTS Auto (Optionnel, simule la prononciation)
    if (exo.data.tr) {
       App.playTTS(exo.data.tr);
    }

    // Mise à jour SRS
    if (window.SRS) {
       SRS.updateItem(exo.data.id, exo.data.type || 'vocabulary', isCorrect);
    }

    fbBar.classList.add('show');
    this.updateProgressUI();
  },

  nextStep() {
    this.currentIndex++;
    this.showNextExercise();
  },

  finishLesson() {
    const accuracy = Math.round((this.correctCount / this.exercises.length) * 100);
    
    // Bonus XP fin
    let finalXp = this.currentXp;
    if(accuracy > 80) finalXp += 20;
    
    // Enregistrement
    State.addXP(finalXp);
    State.completeChapter(this.chapterId);
    if(window.Gamification) Gamification.checkAchievements();

    // UI Modal
    const modal = document.getElementById('session-modal');
    document.getElementById('sm-xp').textContent = `+${finalXp}`;
    document.getElementById('sm-acc').textContent = `${accuracy}%`;
    document.getElementById('sm-learned').textContent = this.exercises.length;
    
    modal.classList.remove('hidden');
    App.fireConfetti();
  }
};
