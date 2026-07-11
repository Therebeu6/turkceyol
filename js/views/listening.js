/* ═══════════════════════════════════════════════
   TürkçeYol — listening.js (v6 AXE 5.1)
   Mode écoute intensive : écouter → deviner → révéler.
   Tout l'audio passe par App.playTTS (moteur inchangé).
   ═══════════════════════════════════════════════ */

window.Listening = {
  _session: null,

  render() {
    const items = this._pickItems(10);
    if (items.length === 0) {
      document.getElementById('listening-body').innerHTML =
        `<div class="empty-state-sm"><span>🎧</span> Apprends quelques mots d'abord, puis reviens t'entraîner à l'oreille !</div>`;
      return;
    }
    this._session = { items, index: 0, xp: 0, known: 0, revealed: false };
    this._renderIntro();
  },

  _renderIntro() {
    const n = this._session.items.length;
    document.getElementById('listening-body').innerHTML = `
      <div class="listen-intro card">
        <div class="listen-intro-icon">🎧</div>
        <div class="listen-intro-title">${n} sons à reconnaître</div>
        <div class="listen-intro-sub">Écoute chaque mot, essaie de le comprendre, puis révèle la réponse. Idéal pour muscler ta compréhension orale.</div>
        <button class="btn btn-primary btn-full" onclick="Listening.start()">Commencer</button>
      </div>
    `;
  },

  start() {
    this._session.index = 0;
    this._renderCurrent();
  },

  _pickItems(n) {
    const vocab = window.AppVocabulary || [];
    const queue = (window.State && State.data && State.data.reviewQueue) || [];
    const dueIds = new Set(queue.filter(i => i.type === 'vocabulary').map(i => i.id));

    // 1) priorité : mots déjà rencontrés (dans la file SRS), courts
    let pool = vocab.filter(w => dueIds.has(w.id) && w.tr && w.tr.split(' ').length <= 3);
    // 2) complément : mots faciles courts
    if (pool.length < n) {
      const extra = vocab.filter(w =>
        !pool.find(p => p.id === w.id) &&
        w.tr && w.tr.split(' ').length <= 3 && (w.difficulty == null || w.difficulty <= 2)
      );
      pool = pool.concat(this._shuffle(extra));
    }
    return this._shuffle(pool).slice(0, n);
  },

  _renderCurrent() {
    const s = this._session;
    if (s.index >= s.items.length) { this._finish(); return; }
    s.revealed = false;
    const item = s.items[s.index];
    const phonetic = window.Phonetics ? Phonetics.toFrench(item.tr) : '';

    document.getElementById('listening-body').innerHTML = `
      <div class="listen-progress">
        <div class="listen-prog-track"><div class="listen-prog-fill" style="width:${(s.index / s.items.length) * 100}%"></div></div>
        <span class="listen-prog-lbl">${s.index + 1} / ${s.items.length}</span>
      </div>
      <div class="listen-card card">
        <button class="listen-big-play" onclick="App.playTTS('${this._escape(item.tr)}')" aria-label="Écouter">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="40" height="40">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07M19.07 4.93a10 10 0 0 1 0 14.14"/>
          </svg>
        </button>
        <div class="listen-speeds">${window.Lesson ? Lesson._ttsSpeedHtml() : ''}</div>

        <div class="listen-reveal ${s.revealed ? '' : 'hidden'}" id="listen-reveal">
          <div class="listen-tr">${item.tr}</div>
          <div class="listen-phon">🗣 ${phonetic}</div>
          <div class="listen-fr">${item.fr}</div>
        </div>

        <div id="listen-actions">
          <button class="btn btn-outline btn-full" onclick="Listening.reveal()">Révéler la réponse</button>
        </div>
      </div>
    `;
    // Lecture auto au chargement de la carte
    setTimeout(() => App.playTTS(item.tr), 350);
  },

  reveal() {
    const s = this._session;
    s.revealed = true;
    const rev = document.getElementById('listen-reveal');
    if (rev) rev.classList.remove('hidden');
    const actions = document.getElementById('listen-actions');
    if (actions) {
      actions.innerHTML = `
        <div class="listen-rate-row">
          <button class="btn btn-outline listen-rate" onclick="Listening.rate(false)">😐 Pas sûr</button>
          <button class="btn btn-success listen-rate" onclick="Listening.rate(true)">✅ Je savais</button>
        </div>
      `;
    }
  },

  rate(knew) {
    const s = this._session;
    const item = s.items[s.index];
    if (knew) { s.known++; s.xp += 5; }
    // Comptabilise dans le SRS (qualité 4 si su, 2 sinon)
    if (window.SRS) SRS.updateItem(item.id, 'vocabulary', knew ? 4 : 2);
    s.index++;
    this._renderCurrent();
  },

  _finish() {
    const s = this._session;
    const total = s.items.length;
    const pct = total > 0 ? Math.round((s.known / total) * 100) : 0;
    if (window.Gamification) Gamification.addXP(s.xp);
    else if (window.State) State.addXP(s.xp);

    document.getElementById('listening-body').innerHTML = `
      <div class="listen-intro card">
        <div class="listen-intro-icon">${pct >= 70 ? '🎉' : '💪'}</div>
        <div class="listen-intro-title">${s.known} / ${total} reconnus</div>
        <div class="listen-intro-sub">+${s.xp} XP · Ton oreille progresse à chaque session.</div>
        <button class="btn btn-primary btn-full" onclick="Listening.render()">Nouvelle session</button>
        <button class="btn btn-ghost btn-full" style="margin-top:8px" onclick="App.navigate('#dashboard')">Retour</button>
      </div>
    `;
  },

  _shuffle(arr) { return [...arr].sort(() => 0.5 - Math.random()); },
  _escape(s) { return String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'"); }
};
