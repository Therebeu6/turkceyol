/* ═══════════════════════════════════════════════
   TürkçeYol — settings.js
   Vue des Paramètres
   ═══════════════════════════════════════════════ */

window.Settings = {
  render() {
    const s = (State.data && State.data.settings) || {};
    const soundOn = s.soundEffects !== false;
    const reminderOn = s.dailyReminder !== false;

    document.getElementById('settings-body').innerHTML = `
      <div class="card mb-4">
        <div class="flex justify-between items-center mb-4">
          <span class="font-bold">Sons de feedback</span>
          <label class="switch">
            <input type="checkbox" ${soundOn ? 'checked' : ''} onchange="Settings.toggleSound(this.checked)">
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

  toggleReminder(enabled) {
    State.updateSetting('dailyReminder', enabled);
    App.showToast(`Rappels ${enabled ? 'activés' : 'désactivés'}`);
  }
};
