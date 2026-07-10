/* ═══════════════════════════════════════════════
   TürkçeYol — grammar.js (vue)
   Règles de grammaire cliquables + mini-pratique
   ═══════════════════════════════════════════════ */

window.Grammar = {
  _practiceState: null,

  render() {
    const container = document.getElementById('grammar-body');
    if (!container) return;
    if (!window.AppGrammar || AppGrammar.length === 0) {
      container.innerHTML = `<div class="empty-state-sm"><span>📖</span>Aucune règle pour l'instant.</div>`;
      return;
    }

    container.innerHTML = `
      <div id="grammar-practice-overlay" class="grammar-practice-overlay hidden"></div>
      ${AppGrammar.map(g => {
        const examples = (g.example || '').split('|').map(s => s.trim()).filter(Boolean);
        const exHtml = examples.map(ex => `
          <button class="grammar-example" onclick="Grammar._play(this)" data-tr="${this._escape(ex)}">
            <span class="gex-play">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </span>
            <span class="gex-text">${ex}</span>
          </button>
        `).join('');

        const hasPractice = g.exercises && g.exercises.length > 0;
        const practiceBtn = hasPractice
          ? `<button class="btn-grammar-practice" onclick="Grammar.startPractice('${g.id}')">🎯 Pratiquer</button>`
          : '';

        return `
          <div class="grammar-card" id="gcard-${g.id}">
            <div class="grammar-card-header">
              <h3 class="grammar-title">${g.title}</h3>
              ${practiceBtn}
            </div>
            <p class="grammar-rule">${g.rule}</p>
            <div class="grammar-examples">${exHtml}</div>
          </div>
        `;
      }).join('')}
    `;
  },

  startPractice(ruleId) {
    if (!window.Exercises) return;
    const exercises = Exercises.generateForGrammarRule(ruleId);
    if (!exercises || exercises.length === 0) return;

    this._practiceState = {
      ruleId,
      exercises,
      index: 0,
      score: 0,
      answered: false
    };

    const overlay = document.getElementById('grammar-practice-overlay');
    if (!overlay) return;
    overlay.classList.remove('hidden');
    this._renderPracticeExo();
    overlay.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },

  _renderPracticeExo() {
    const state = this._practiceState;
    const overlay = document.getElementById('grammar-practice-overlay');
    if (!overlay || !state) return;

    const exo = state.exercises[state.index];
    const total = state.exercises.length;
    const pct = Math.round((state.index / total) * 100);

    const rule = window.AppGrammar && AppGrammar.find(g => g.id === state.ruleId);
    const ruleTitle = rule ? rule.title : 'Grammaire';

    const optsHtml = exo.options.map((opt, i) => `
      <button class="gp-option" onclick="Grammar._checkPracticeAnswer(this, '${this._escape(opt)}')">
        <span class="gp-opt-key">${i + 1}</span>
        <span class="gp-opt-text">${opt}</span>
      </button>
    `).join('');

    const hintHtml = exo.grammarMeta && exo.grammarMeta.hint
      ? `<div class="gp-hint">${exo.grammarMeta.hint}</div>`
      : '';

    overlay.innerHTML = `
      <div class="gp-header">
        <div class="gp-rule-label">📐 ${this._escape(ruleTitle)}</div>
        <button class="gp-close" onclick="Grammar.closePractice()">✕</button>
      </div>
      <div class="gp-progress-track">
        <div class="gp-progress-fill" style="width:${pct}%"></div>
      </div>
      <div class="gp-counter">${state.index + 1} / ${total}</div>
      <div class="gp-exercise">
        <div class="gp-type-label">🎯 Choix multiple</div>
        <h3 class="gp-question">${exo.question}</h3>
        ${hintHtml}
        <div class="gp-options" id="gp-options">${optsHtml}</div>
      </div>
      <div id="gp-feedback" class="gp-feedback hidden">
        <div class="gp-fb-icon" id="gp-fb-icon">✓</div>
        <div class="gp-fb-text">
          <div class="gp-fb-title" id="gp-fb-title">Parfait !</div>
          <div class="gp-fb-answer" id="gp-fb-answer"></div>
          <div class="gp-fb-expl" id="gp-fb-expl"></div>
        </div>
        <button class="btn btn-primary btn-full" onclick="Grammar._nextPracticeExo()">Continuer</button>
      </div>
    `;
  },

  _checkPracticeAnswer(btn, selected) {
    const state = this._practiceState;
    if (!state || state.answered) return;
    state.answered = true;

    const exo = state.exercises[state.index];
    const clean = s => s.normalize('NFC').toLocaleLowerCase('tr-TR')
      .replace(/[.!?,;:'"]/g, '').replace(/\s+/g, ' ').trim();
    const isCorrect = clean(selected) === clean(exo.answer);

    // Style buttons
    document.querySelectorAll('.gp-option').forEach(b => {
      b.onclick = null;
      const txt = (b.querySelector('.gp-opt-text')?.textContent || '').trim();
      if (clean(txt) === clean(exo.answer)) b.classList.add('correct');
      else if (clean(txt) === clean(selected) && !isCorrect) b.classList.add('wrong');
    });

    if (isCorrect) state.score++;

    // Show feedback
    const fb = document.getElementById('gp-feedback');
    const fbIcon = document.getElementById('gp-fb-icon');
    const fbTitle = document.getElementById('gp-fb-title');
    const fbAnswer = document.getElementById('gp-fb-answer');
    const fbExpl = document.getElementById('gp-fb-expl');

    if (fb) fb.classList.remove('hidden');
    if (fb) fb.classList.add(isCorrect ? 'correct' : 'wrong');
    if (fbIcon) fbIcon.textContent = isCorrect ? '✓' : '✕';
    if (fbTitle) fbTitle.textContent = isCorrect
      ? ['Parfait !', 'Excellent !', 'Bravo !', 'Super !'][Math.floor(Math.random() * 4)]
      : 'Pas tout à fait…';
    if (fbAnswer) fbAnswer.textContent = isCorrect ? '' : `Bonne réponse : ${exo.answer}`;
    if (fbExpl) fbExpl.textContent = exo.data && exo.data.fr ? exo.data.fr : '';

    // TTS on correct answer
    if (exo.answer && window.App) App.playTTS(exo.answer);
  },

  _nextPracticeExo() {
    const state = this._practiceState;
    if (!state) return;
    state.answered = false;
    state.index++;
    if (state.index >= state.exercises.length) {
      this._finishPractice();
    } else {
      this._renderPracticeExo();
    }
  },

  _finishPractice() {
    const state = this._practiceState;
    const overlay = document.getElementById('grammar-practice-overlay');
    if (!overlay || !state) return;

    const total = state.exercises.length;
    const pct = Math.round((state.score / total) * 100);
    const medal = pct === 100 ? '🏆' : pct >= 66 ? '🥈' : '🥉';

    overlay.innerHTML = `
      <div class="gp-header">
        <div class="gp-rule-label">📐 Pratique terminée</div>
        <button class="gp-close" onclick="Grammar.closePractice()">✕</button>
      </div>
      <div class="gp-finish">
        <div class="gp-finish-medal">${medal}</div>
        <div class="gp-finish-score">${state.score} / ${total}</div>
        <div class="gp-finish-label">${pct === 100 ? 'Parfait !' : pct >= 66 ? 'Bien joué !' : 'Continue à pratiquer !'}</div>
        <button class="btn btn-primary btn-full" onclick="Grammar.startPractice('${state.ruleId}')">🔄 Rejouer</button>
        <button class="btn btn-secondary btn-full mt-2" onclick="Grammar.closePractice()">← Retour aux règles</button>
      </div>
    `;
  },

  closePractice() {
    const overlay = document.getElementById('grammar-practice-overlay');
    if (overlay) {
      overlay.classList.add('hidden');
      overlay.innerHTML = '';
    }
    this._practiceState = null;
  },

  _play(btn) {
    const text = btn.dataset.tr || '';
    if (text && window.App) App.playTTS(text);
  },

  _escape(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
};
