/* ═══════════════════════════════════════════════
   TürkçeYol — dialogues.js
   Vue des mini-dialogues immersifs
   ═══════════════════════════════════════════════ */

window.Dialogues = {
  render() {
    const container = document.getElementById('dialogues-list');

    // Mise à jour du compteur dans le hero
    const sub = document.querySelector('#view-dialogues .view-sub');
    if (sub) sub.textContent = `${AppDialogues.length} situations · A1 à B1`;

    const levelColors = { 1: 'var(--success)', 2: 'var(--secondary)', 3: 'var(--primary)' };
    const levelLabels = { 1: 'A1', 2: 'A2', 3: 'B1' };

    container.innerHTML = AppDialogues.map(d => {
      const lvlColor = levelColors[d.level] || 'var(--text-3)';
      const lvlLabel = levelLabels[d.level] || '';
      const tagsHtml = (d.tags || []).map(t => `<span class="dlg-tag">${t}</span>`).join('');

      return `
        <div class="dlg-card" onclick="Dialogues.toggle('${d.id}')">
          <div class="dlg-header">
            <div class="dlg-icon">${d.turns.length > 0 ? '💬' : '📖'}</div>
            <div class="dlg-info">
              <div class="dlg-title">${d.title}</div>
              <div class="dlg-scenario">${d.scenario}</div>
              <div class="dlg-meta">
                ${tagsHtml}
                <span class="dlg-level" style="color:${lvlColor}">${lvlLabel}</span>
                <span class="dlg-turns">${d.turns.length} répliques</span>
              </div>
            </div>
            <div class="dlg-chevron" id="dlg-chev-${d.id}">›</div>
          </div>
          <div id="dlg-${d.id}" class="dlg-body hidden">
            ${d.turns.map((t, i) => {
              const isLeft = i % 2 === 0;
              return `
                <div class="dlg-turn ${isLeft ? 'dlg-turn-left' : 'dlg-turn-right'}">
                  <div class="dlg-speaker">${t.speaker}</div>
                  <div class="dlg-bubble">
                    <span class="dlg-tr">${t.tr}</span>
                    <button class="btn-tts" onclick="event.stopPropagation();App.playTTS('${t.tr.replace(/'/g, "\\'")}')">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                      </svg>
                    </button>
                  </div>
                  <div class="dlg-fr">${t.fr}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');
  },

  toggle(id) {
    const body = document.getElementById(`dlg-${id}`);
    const chev = document.getElementById(`dlg-chev-${id}`);
    const isHidden = body.classList.contains('hidden');
    body.classList.toggle('hidden', !isHidden);
    body.classList.toggle('animate-slide-down', isHidden);
    if (chev) chev.style.transform = isHidden ? 'rotate(90deg)' : '';
  }
};
