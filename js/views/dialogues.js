/* ═══════════════════════════════════════════════
   TürkçeYol — dialogues.js
   Vue des dialogues immersifs
   ═══════════════════════════════════════════════ */

window.Dialogues = {
  render() {
    const container = document.getElementById('dialogues-list');
    
    container.innerHTML = AppDialogues.map(d => `
      <div class="card mb-4" onclick="Dialogues.toggleDialogue('${d.id}')" style="cursor:pointer;">
        <div class="flex items-center justify-between">
          <div>
            <div class="font-bold text-lg">${d.title}</div>
            <div class="text-sm text-muted">${d.scenario}</div>
          </div>
          <div>⬇️</div>
        </div>
        <div id="dlg-${d.id}" class="hidden mt-4 pt-4" style="border-top:1px solid var(--border);">
          ${d.turns.map(t => `
            <div class="mb-4">
              <div class="text-xs font-bold text-primary mb-1">${t.speaker}</div>
              <div class="font-semibold text-md flex justify-between items-center">
                <span>${t.tr}</span>
                <button class="btn-tts" onclick="event.stopPropagation(); Phrases.playTTS('${t.tr.replace(/'/g, "\\'")}')">🔊</button>
              </div>
              <div class="text-sm text-muted">${t.fr}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  },

  toggleDialogue(id) {
    const el = document.getElementById(`dlg-${id}`);
    if(el.classList.contains('hidden')) {
      el.classList.remove('hidden');
      el.classList.add('animate-slide-down');
    } else {
      el.classList.add('hidden');
      el.classList.remove('animate-slide-down');
    }
  }
};
