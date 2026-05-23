/* ═══════════════════════════════════════════════
   TürkçeYol — audio.js
   Sons de feedback via Web Audio API (sans fichier externe)
   ═══════════════════════════════════════════════ */

window.AudioEngine = (function() {
  let _ctx = null;

  function _getCtx() {
    if (!_ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      _ctx = new AC();
    }
    return _ctx;
  }

  function _beep(freq, duration, type = 'sine', vol = 0.15) {
    try {
      const ctx = _getCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch (e) { /* silent */ }
  }

  function _soundEnabled() {
    return window.State && State.data && State.data.settings &&
           State.data.settings.soundEffects !== false;
  }

  function playCorrect() {
    if (!_soundEnabled()) return;
    _beep(880, 0.08);
    setTimeout(() => _beep(1100, 0.08), 80);
  }

  function playWrong() {
    if (!_soundEnabled()) return;
    _beep(220, 0.15, 'sawtooth', 0.1);
  }

  function playLevelUp() {
    if (!_soundEnabled()) return;
    [523, 659, 784, 1047].forEach((f, i) => {
      setTimeout(() => _beep(f, 0.12), i * 100);
    });
  }

  function playCombo() {
    if (!_soundEnabled()) return;
    _beep(660, 0.06);
    setTimeout(() => _beep(880, 0.06), 60);
  }

  return { playCorrect, playWrong, playLevelUp, playCombo };
})();
