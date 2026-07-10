/* ═══════════════════════════════════════════════
   TürkçeYol — phonetics.js (v5, Pilier D)
   Transcription phonétique turc → approximation française
   Le turc est 100% phonétique : des règles suffisent.
   Usage : Phonetics.toFrench('Teşekkürler') → 'té-chék-kur-lér'
   ═══════════════════════════════════════════════ */

window.Phonetics = {

  VOWELS: 'aeıioöuü',

  toFrench(text) {
    if (!text) return '';
    // Mot par mot (les expressions gardent leurs espaces)
    return String(text)
      .split(/\s+/)
      .map(w => this._word(w))
      .filter(Boolean)
      .join(' ');
  },

  _word(word) {
    // Nettoyage + minuscules turques (İ→i, I→ı)
    const clean = word.replace(/[.!?,;:'"()]/g, '');
    if (!clean) return '';
    const lower = clean.toLocaleLowerCase('tr-TR');
    // Mots non alphabétiques (nombres…) : ignorer
    if (!/[a-zçğıöşü]/.test(lower)) return '';

    const syllables = this._syllabify(lower);
    return syllables.map((syl, i) => this._mapSyllable(syl, syllables[i + 1] || '')).join('-');
  },

  // ── Syllabification turque (structure (C)V(C)(C)) ──
  _syllabify(word) {
    const V = this.VOWELS;
    const isV = ch => V.includes(ch);
    const sylls = [];
    let cur = '';
    for (let i = 0; i < word.length; i++) {
      cur += word[i];
      if (!isV(word[i])) continue;
      // On vient de poser une voyelle : regarder la suite
      let j = i + 1, consonants = 0;
      while (j < word.length && !isV(word[j])) { consonants++; j++; }
      if (j >= word.length) {
        // Fin de mot : tout prendre
        cur += word.slice(i + 1);
        i = word.length;
      } else if (consonants <= 1) {
        // V.CV → coupure avant la consonne
      } else {
        // VC.CV (ou VCC.CV) : la dernière consonne part avec la syllabe suivante
        cur += word.slice(i + 1, i + consonants);
        i += consonants - 1;
      }
      sylls.push(cur);
      cur = '';
    }
    if (cur) {
      if (sylls.length > 0) sylls[sylls.length - 1] += cur;
      else sylls.push(cur);
    }
    return sylls;
  },

  // ── Mapping lettres turques → lecture française ──
  _mapSyllable(syl, nextSyl) {
    const V = this.VOWELS;
    let out = '';
    for (let i = 0; i < syl.length; i++) {
      const c = syl[i];
      const prev = i > 0 ? syl[i - 1] : '';
      const next = i + 1 < syl.length ? syl[i + 1] : (nextSyl[0] || '');
      switch (c) {
        case 'c': out += 'dj'; break;
        case 'ç': out += 'tch'; break;
        case 'ş': out += 'ch'; break;
        case 'ğ':
          // Allonge la voyelle précédente
          if (prev && V.includes(prev)) out += this._vowel(prev, '');
          break;
        case 'e': out += 'é'; break;
        case 'ı': out += 'e'; break; // e sourd (comme "le")
        case 'ö': out += 'eu'; break;
        case 'u': out += 'ou'; break;
        case 'ü': out += 'u'; break;
        case 'g':
          // g toujours dur : "gu" devant é/i pour la lecture française
          out += (next === 'e' || next === 'i') ? 'gu' : 'g';
          break;
        case 's':
          // s toujours /s/ : "ss" entre voyelles
          out += (prev && V.includes(prev) && next && V.includes(next)) ? 'ss' : 's';
          break;
        case 'y':
          // Diphtongues : ay→aï, ey→eï…
          if (prev && V.includes(prev) && (!next || !V.includes(next))) out += 'ï';
          else out += 'y';
          break;
        default:
          out += this._vowel(c, next);
      }
    }
    return out;
  },

  _vowel(c, next) {
    switch (c) {
      case 'e': return 'é';
      case 'ı': return 'e';
      case 'ö': return 'eu';
      case 'u': return 'ou';
      case 'ü': return 'u';
      default: return c;
    }
  }
};
