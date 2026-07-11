/* ═══════════════════════════════════════════════
   TürkçeYol — stories.js (v7 AXE 1)
   Lecteur d'histoires : lecture + écoute + questions.
   Tout l'audio passe par App.playTTS (moteur inchangé).
   ═══════════════════════════════════════════════ */

window.Stories = {
  _current: null,
  _revealed: {},
  _qIndex: 0,
  _qCorrect: 0,
  _playAllTimer: null,

  render() {
    this.renderList();
  },

  renderList() {
    if (this._playAllTimer) { clearTimeout(this._playAllTimer); this._playAllTimer = null; }
    const container = document.getElementById('stories-body');
    if (!container) return;
    const stories = window.AppStories || [];
    if (stories.length === 0) {
      container.innerHTML = `<div class="empty-state-sm"><span>📖</span> Aucune histoire pour l'instant.</div>`;
      return;
    }
    const read = (window.State && State.data && State.data.storiesRead) || [];
    container.innerHTML = `
      <div class="story-list">
        ${stories.map(s => `
          <div class="story-card" onclick="Stories.openStory('${s.id}')">
            <div class="story-card-icon">${s.icon}</div>
            <div class="story-card-info">
              <div class="story-card-title">${s.title}${read.includes(s.id) ? ' <span class="story-done-badge">✓</span>' : ''}</div>
              <div class="story-card-sub">${s.fr}</div>
              <div class="story-card-meta">
                <span class="story-level story-level-${s.level.toLowerCase()}">${s.level}</span>
                <span class="story-card-count">${s.lines.length} phrases · ${(s.questions || []).length} questions</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  openStory(id) {
    const story = (window.AppStories || []).find(s => s.id === id);
    if (!story) { this.renderList(); return; }
    this._current = story;
    this._revealed = {};
    this._renderReader();
  },

  _renderReader() {
    const s = this._current;
    const container = document.getElementById('stories-body');
    if (!container) return;
    const linesHtml = s.lines.map((l, i) => `
      <div class="story-line">
        <button class="story-line-tr" onclick="Stories.playLine(${i})">
          ${this._escapeHtml(l.tr)} <span class="story-line-tts">🔊</span>
        </button>
        <div class="story-line-fr ${this._revealed[i] ? '' : 'hidden'}" id="story-fr-${i}">${this._escapeHtml(l.fr)}</div>
      </div>
    `).join('');

    container.innerHTML = `
      <button class="btn-icon story-back" onclick="Stories.renderList()" aria-label="Retour à la liste">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        Retour
      </button>
      <div class="story-reader-header">
        <div class="story-reader-icon">${s.icon}</div>
        <h2 class="story-reader-title">${s.title}</h2>
        <div class="story-reader-sub">${s.fr}</div>
      </div>
      <div class="story-actions">
        <button class="btn btn-outline btn-sm" onclick="Stories.playAll()">🔊 Lire tout</button>
        <button class="btn btn-outline btn-sm" onclick="Stories.revealAll()">👁 Tout révéler</button>
      </div>
      <div class="story-lines">${linesHtml}</div>
      <button class="btn btn-primary btn-full mt-4" onclick="Stories.startQuestions()">
        Questions (${(s.questions || []).length}) →
      </button>
    `;
  },

  playLine(i) {
    const s = this._current;
    if (!s || !s.lines[i]) return;
    App.playTTS(s.lines[i].tr);
    this._revealed[i] = true;
    const el = document.getElementById('story-fr-' + i);
    if (el) el.classList.remove('hidden');
  },

  revealAll() {
    if (!this._current) return;
    this._current.lines.forEach((_, i) => { this._revealed[i] = true; });
    this._renderReader();
  },

  playAll() {
    const s = this._current;
    if (!s) return;
    if (this._playAllTimer) clearTimeout(this._playAllTimer);
    let i = 0;
    const next = () => {
      if (!this._current || i >= s.lines.length) return;
      this.playLine(i);
      i++;
      this._playAllTimer = setTimeout(next, 1900);
    };
    next();
  },

  startQuestions() {
    if (this._playAllTimer) { clearTimeout(this._playAllTimer); this._playAllTimer = null; }
    this._qIndex = 0;
    this._qCorrect = 0;
    this._renderQuestion();
  },

  _renderQuestion() {
    const s = this._current;
    const questions = (s && s.questions) || [];
    if (this._qIndex >= questions.length) { this._finish(); return; }
    const q = questions[this._qIndex];
    const container = document.getElementById('stories-body');
    if (!container) return;
    container.innerHTML = `
      <div class="story-q-progress">${this._qIndex + 1} / ${questions.length}</div>
      <div class="story-q-card">
        <h3 class="story-q-text">${this._escapeHtml(q.q)}</h3>
        <div class="options-grid" id="story-q-options">
          ${q.options.map((o, i) => `
            <button class="option-btn" onclick="Stories.answer('${this._escape(o)}')">
              <span class="opt-key">${i + 1}</span>
              <span class="opt-text">${this._escapeHtml(o)}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;
  },

  answer(selected) {
    const s = this._current;
    const q = s.questions[this._qIndex];
    const correct = selected === q.answer;
    if (correct) this._qCorrect++;

    document.querySelectorAll('#story-q-options .option-btn').forEach(b => {
      b.onclick = null;
      const val = (b.querySelector('.opt-text') || {}).textContent || '';
      if (val === q.answer) b.classList.add('correct');
      else if (val === selected && !correct) b.classList.add('wrong');
    });

    if (window.AudioEngine) correct ? AudioEngine.playCorrect() : AudioEngine.playWrong();

    setTimeout(() => {
      this._qIndex++;
      this._renderQuestion();
    }, 900);
  },

  _finish() {
    const s = this._current;
    const questions = (s && s.questions) || [];
    const total = questions.length;
    const xp = 10 + this._qCorrect * 5;

    if (window.Gamification) Gamification.addXP(xp);
    else if (window.State) State.addXP(xp);

    if (window.State && s) {
      if (!State.data.storiesRead) State.data.storiesRead = [];
      if (!State.data.storiesRead.includes(s.id)) {
        State.data.storiesRead.push(s.id);
        State.save();
      }
    }

    const perfect = total > 0 && this._qCorrect === total;
    const container = document.getElementById('stories-body');
    if (!container) return;
    container.innerHTML = `
      <div class="story-finish">
        <div class="story-finish-icon">${perfect ? '🎉' : '📖'}</div>
        <div class="story-finish-title">${this._qCorrect} / ${total} bonnes réponses</div>
        <div class="story-finish-sub">+${xp} XP</div>
        <button class="btn btn-primary btn-full mt-4" onclick="Stories.renderList()">Autres histoires</button>
        <button class="btn btn-ghost btn-full" style="margin-top:8px" onclick="App.navigate('#dashboard')">Accueil</button>
      </div>
    `;
    if (perfect && window.App && typeof App.fireConfetti === 'function') App.fireConfetti();
  },

  _escape(s) {
    return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  },

  _escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
};
