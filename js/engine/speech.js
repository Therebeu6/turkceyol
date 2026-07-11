/* ═══════════════════════════════════════════════
   TürkçeYol — speech.js (v7 AXE 4.1)
   Reconnaissance vocale (entrante) — STRICTEMENT DISTINCTE du moteur
   TTS (sortant, App.playTTS). On ne touche JAMAIS à ce dernier ici.

   Bêta minimale et honnête : remplit un champ de saisie existant,
   rien d'autre (pas de scoring, pas de nouveau type d'exercice).
   Opt-in strict via State.data.settings.speechInput (off par défaut).

   Limites connues, assumées dans l'UI (Settings) :
   - L'audio est envoyé à un service de reconnaissance du navigateur
     (pas de traitement local garanti selon le navigateur/la version).
   - Comportement instable documenté sur iOS Safari.
   ═══════════════════════════════════════════════ */

window.Speech = {
  isSupported() {
    return typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  },

  // listen({ onResult, onError, onEnd })
  listen(callbacks) {
    const cb = callbacks || {};
    if (!this.isSupported()) {
      if (cb.onError) cb.onError('unsupported');
      return null;
    }
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new Recognition();
    rec.lang = 'tr-TR';
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onresult = (e) => {
      const text = (e.results && e.results[0] && e.results[0][0]) ? e.results[0][0].transcript : '';
      if (cb.onResult) cb.onResult(text.trim());
    };
    rec.onerror = (e) => { if (cb.onError) cb.onError((e && e.error) || 'error'); };
    rec.onend = () => { if (cb.onEnd) cb.onEnd(); };

    try {
      rec.start();
    } catch (e) {
      if (cb.onError) cb.onError('start_failed');
      return null;
    }
    return rec;
  }
};
