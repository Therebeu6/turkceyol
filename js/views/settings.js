/* ═══════════════════════════════════════════════
   TürkçeYol — settings.js
   Vue des Paramètres
   ═══════════════════════════════════════════════ */

window.Settings = {
  render() {
    const s = (State.data && State.data.settings) || {};
    const soundOn = s.soundEffects !== false;
    const reminderOn = s.dailyReminder !== false;
    const hapticsOn = s.haptics !== false;
    const theme = s.theme || 'dark';
    const goal = State.data.dailyGoal || 50;
    const goalOpts = [[20, 'Détente'], [50, 'Normal'], [100, 'Sérieux']];
    const themeOpts = [['dark', '🌙 Sombre'], ['light', '☀️ Clair'], ['system', '💻 Système']];
    const density = State.data.sessionDensity || 'normal';
    const densityOpts = [['short', 'Courte'], ['normal', 'Normale'], ['long', 'Longue']];
    const speechOn = s.speechInput === true;
    const speechSupported = window.Speech && Speech.isSupported();

    document.getElementById('settings-body').innerHTML = `
      <div class="card mb-4">
        <h3 class="font-bold text-sm text-muted uppercase mb-3">Thème</h3>
        <div class="goal-select-row" style="margin-bottom:var(--s4)">
          ${themeOpts.map(([v, lbl]) => `
            <button class="goal-opt ${theme === v ? 'goal-opt-active' : ''}" onclick="Settings.setTheme('${v}')">
              <span class="goal-opt-lbl" style="font-size:var(--text-sm)">${lbl}</span>
            </button>
          `).join('')}
        </div>
        <h3 class="font-bold text-sm text-muted uppercase mb-3">Objectif quotidien</h3>
        <div class="goal-select-row" style="margin-bottom:var(--s4)">
          ${goalOpts.map(([v, lbl]) => `
            <button class="goal-opt ${goal === v ? 'goal-opt-active' : ''}" onclick="Settings.setGoal(${v})">
              <span class="goal-opt-xp">${v} XP</span>
              <span class="goal-opt-lbl">${lbl}</span>
            </button>
          `).join('')}
        </div>
        <h3 class="font-bold text-sm text-muted uppercase mb-3">Durée des leçons</h3>
        <div class="goal-select-row">
          ${densityOpts.map(([v, lbl]) => `
            <button class="goal-opt ${density === v ? 'goal-opt-active' : ''}" onclick="Settings.setDensity('${v}')">
              <span class="goal-opt-lbl" style="font-size:var(--text-sm)">${lbl}</span>
            </button>
          `).join('')}
        </div>
        <hr class="border-t border-border my-4" style="border-color: var(--border);">

        <h3 class="font-bold text-sm text-muted uppercase mb-2">Saisie vocale (bêta) 🎤</h3>
        ${speechSupported ? `
          <p class="text-xs text-muted mb-3">Expérimental. Ta voix est envoyée à un service de reconnaissance externe (navigateur). Peut mal fonctionner sur iPhone.</p>
          <div class="flex justify-between items-center mb-4">
            <span class="font-bold">Bouton micro sur les exercices de saisie</span>
            <label class="switch">
              <input type="checkbox" ${speechOn ? 'checked' : ''} onchange="Settings.toggleSpeech(this.checked)">
              <span class="slider"></span>
            </label>
          </div>
        ` : `
          <p class="text-xs text-muted mb-4">Non disponible sur ce navigateur.</p>
        `}
        <hr class="border-t border-border my-4" style="border-color: var(--border);">

        <div class="flex justify-between items-center mb-4">
          <span class="font-bold">Sons de feedback</span>
          <label class="switch">
            <input type="checkbox" ${soundOn ? 'checked' : ''} onchange="Settings.toggleSound(this.checked)">
            <span class="slider"></span>
          </label>
        </div>
        <div class="flex justify-between items-center mb-4">
          <span class="font-bold">Vibrations (mobile)</span>
          <label class="switch">
            <input type="checkbox" ${hapticsOn ? 'checked' : ''} onchange="Settings.toggleHaptics(this.checked)">
            <span class="slider"></span>
          </label>
        </div>
        <div class="flex justify-between items-center mb-4">
          <span class="font-bold">Rappels quotidiens</span>
          <label class="switch">
            <input type="checkbox" ${reminderOn ? 'checked' : ''} onchange="Settings.toggleReminder(this.checked)">
            <span class="slider"></span>
          </label>
        </div>
        <hr class="border-t border-border my-4" style="border-color: var(--border);">

        <h3 class="font-bold text-sm text-muted uppercase mb-3">Sauvegarde locale</h3>
        <p class="text-xs text-muted mb-4">Votre progression est automatiquement sauvegardée dans ce navigateur. Vous pouvez exporter un fichier pour la transférer sur un autre appareil.</p>

        <button class="btn btn-outline btn-full mb-3" onclick="State.exportData()">Exporter ma sauvegarde (.json)</button>
        <label class="btn btn-outline btn-full mb-4" style="text-align: center; display: block; cursor:pointer;">
          Importer une sauvegarde
          <input type="file" accept=".json" class="hidden" onchange="State.importData(event)">
        </label>

        <hr class="border-t border-border my-4" style="border-color: var(--border);">
        <button class="btn btn-outline btn-full text-error" style="border-color:var(--error);" onclick="if(confirm('Voulez-vous vraiment effacer toute votre progression ?')) State.resetAllData()">Réinitialiser ma progression</button>
      </div>
      <div class="text-center text-muted text-xs mt-6">
        TürkçeYol v1.0.0<br>
        Développé pour l'apprentissage du turc.
      </div>
    `;
  },

  toggleSound(enabled) {
    State.updateSetting('soundEffects', enabled);
    App.showToast(`Sons ${enabled ? 'activés' : 'désactivés'}`);
  },

  toggleSpeech(enabled) {
    State.updateSetting('speechInput', enabled);
    App.showToast(`Micro ${enabled ? 'activé' : 'désactivé'}`);
  },

  toggleReminder(enabled) {
    State.updateSetting('dailyReminder', enabled);
    App.showToast(`Rappels ${enabled ? 'activés' : 'désactivés'}`);
  },

  toggleHaptics(enabled) {
    State.updateSetting('haptics', enabled);
    if (enabled && navigator.vibrate) navigator.vibrate(15);
    App.showToast(`Vibrations ${enabled ? 'activées' : 'désactivées'}`);
  },

  setGoal(value) {
    State.data.dailyGoal = value;
    State.save();
    this.render();
    App.showToast(`Objectif : ${value} XP / jour`);
  },

  setDensity(value) {
    State.data.sessionDensity = value;
    State.save();
    this.render();
    const labels = { short: 'Courte', normal: 'Normale', long: 'Longue' };
    App.showToast(`Leçons : ${labels[value]}`);
  },

  setTheme(value) {
    State.updateSetting('theme', value);
    Settings.applyTheme(value);
    this.render();
    App.showToast('Thème mis à jour');
  },

  // Applique le thème au <html> (system = suit la préférence OS)
  applyTheme(value) {
    let t = value;
    if (value === 'system') {
      t = (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark';
    }
    document.documentElement.setAttribute('data-theme', t);
  }
};
