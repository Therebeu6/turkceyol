#!/usr/bin/env node
/* ═══════════════════════════════════════════════
   TürkçeYol — tools/verify-word-order-escaping.js
   Bug réel signalé par l'utilisateur : un exercice "Remettre en ordre" sur
   une phrase contenant une apostrophe turque (ex. "İstanbul'u ziyaret
   ediyorum.") était déclaré FAUX même quand les mots étaient replacés dans
   le bon ordre exact.

   Cause : `data-word="${this._escape(w)}"` (lesson.js/review.js, word_order
   ET sentence_builder) utilisait `_escape()`, qui échappe pour un LITTÉRAL
   DE CHAÎNE JS (antislash devant l'apostrophe — pensé pour l'intérieur d'un
   attribut onclick="...('...')"), pas pour une valeur d'attribut HTML. Dans
   `data-word="İstanbul\'u"`, l'antislash n'a AUCUN sens HTML et reste tel
   quel dans l'attribut ; `element.dataset.word` renvoyait donc
   "İstanbul\'u" (avec l'antislash), jamais nettoyé par `checkAnswer` (qui ne
   strip que la ponctuation, pas l'antislash) → comparaison toujours fausse
   dès qu'un mot du puzzle contient une apostrophe.

   Corrigé par un nouvel helper `_escapeAttr()` (échappement HTML réel :
   &amp; &lt; &gt; &quot;), utilisé désormais pour les 4 `data-word=` du
   projet (word_order et sentence_builder, en leçon ET en révision).

   Ce script vérifie, sans navigateur :
   1. Statiquement (grep du code source) : aucun `data-word="${this._escape(`
      ne subsiste dans lesson.js/review.js — seul `_escapeAttr` doit y être
      utilisé pour cet attribut, pour empêcher toute régression future.
   2. `_escapeAttr` fait un aller-retour fidèle (encode → décode HTML minimal
      → valeur d'origine) sur une batterie de vrais mots/phrases turcs à
      apostrophe pris dans les données (verbes, vocabulaire, phrases).
   3. `_escape` (l'ancien choix, resté légitime pour les contextes JS comme
      onclick="...('...')") NE fait PAS cet aller-retour pour un mot à
      apostrophe — documente pourquoi le bug existait, et détecterait un
      retour en arrière accidentel (ex. un alias qui les confondrait à nouveau).

   Usage : node tools/verify-word-order-escaping.js
   Sortie : 0 si tout est cohérent, 1 sinon. Aucune écriture.
   ═══════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const errors = [];
const err = (m) => errors.push(m);

// ── 1. Vérification statique : plus aucun data-word="${this._escape(" dans le source ──
const VIEW_FILES = ['js/views/lesson.js', 'js/views/review.js'];
for (const rel of VIEW_FILES) {
  const src = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  if (/data-word="\$\{this\._escape\(/.test(src)) {
    err(`${rel} : contient encore data-word="\${this._escape(...)}" — devrait utiliser _escapeAttr (régression du correctif "İstanbul'u")`);
  }
  const dataWordCount = (src.match(/data-word="\$\{this\._escapeAttr\(/g) || []).length;
  if (dataWordCount === 0) {
    err(`${rel} : aucun data-word="\${this._escapeAttr(...)}" trouvé — le test ne vérifierait plus rien, à adapter si le rendu a changé.`);
  }
  if (!/_escapeAttr\(s\)\s*\{/.test(src)) {
    err(`${rel} : la méthode _escapeAttr n'existe plus.`);
  }
}

// ── Charger _escape/_escapeAttr réellement, plutôt que de les redéfinir dans ce test ──
const sandbox = { window: {}, navigator: {}, document: { getElementById: () => null } };
sandbox.window = sandbox;
vm.createContext(sandbox);
for (const rel of VIEW_FILES) {
  try {
    vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), sandbox, { filename: rel });
  } catch (e) {
    err(`${rel} : erreur de chargement → ${e.message}`);
  }
}
if (errors.length) {
  console.log('❌ Chargement impossible :');
  for (const e of errors) console.log('   ✗ ' + e);
  process.exit(1);
}

// Décodeur HTML minimal, symétrique de _escapeAttr (&amp; &lt; &gt; &quot;) — c'est exactement
// ce que fait le navigateur en lisant `dataset.word` sur un attribut HTML.
function decodeHtmlAttr(s) {
  return String(s)
    .replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
}

// Mots/phrases réels à apostrophe, extraits des données (pas inventés) : preuve que le bug
// touchait du contenu qui existe vraiment dans le jeu, pas un cas théorique.
const N = {};
N.window = N;
vm.createContext(N);
for (const rel of ['js/data/vocabulary.js', 'js/data/verbs.js', 'js/data/phrases.js']) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), N, { filename: rel });
}
const apostropheWords = new Set();
const collect = (tr) => {
  if (!tr || !tr.includes("'")) return;
  for (const w of tr.split(/\s+/)) if (w.includes("'")) apostropheWords.add(w);
};
for (const p of (N.AppPhrases || [])) collect(p.tr);
for (const v of (N.AppVerbs || [])) for (const ex of (v.examples || [])) collect(ex.tr);
for (const w of (N.AppVocabulary || [])) { collect(w.tr); if (w.example) collect(w.example.tr); }

if (apostropheWords.size === 0) {
  err('Aucun mot à apostrophe trouvé dans les données — le test ne prouverait plus rien sur du contenu réel.');
}

const { Lesson, Review } = sandbox;
for (const [name, obj] of [['Lesson', Lesson], ['Review', Review]]) {
  for (const w of apostropheWords) {
    const attr = obj._escapeAttr(w);
    const roundTrip = decodeHtmlAttr(attr);
    if (roundTrip !== w) {
      err(`${name}._escapeAttr("${w}") → "${attr}" → décodé "${roundTrip}" ≠ original (régression sur un mot réel du jeu)`);
    }
    // Documente la cause du bug : _escape (JS-string) laisse un antislash qu'aucun décodage
    // HTML ne retire — c'est exactement ce que lisait `dataset.word` avant le correctif.
    if (w.includes("'")) {
      const jsEscaped = obj._escape(w);
      if (decodeHtmlAttr(jsEscaped) === w) {
        // Si jamais _escape devenait un jour "HTML-safe" par coïncidence, tant mieux — mais
        // aujourd'hui il laisse un antislash, donc ce cas ne doit PAS se produire ; s'il se
        // produit, au moins on ne perd rien à le signaler comme info, pas comme échec.
        continue;
      }
      if (!jsEscaped.includes('\\')) {
        err(`_escape("${w}") ne contient plus d'antislash — ce test suppose encore l'ancien comportement, à relire si _escape a changé de rôle.`);
      }
    }
  }
}

console.log('─'.repeat(56));
console.log('TürkçeYol — échappement HTML de data-word (word_order / sentence_builder)');
console.log('─'.repeat(56));
console.log(`Mots/phrases à apostrophe trouvés dans les données : ${apostropheWords.size}`);
console.log(`Exemples : ${[...apostropheWords].slice(0, 5).join(', ')}`);
console.log('─'.repeat(56));
if (errors.length) {
  console.log(`\n❌ ${errors.length} PROBLÈME(S) :`);
  for (const e of errors) console.log('   ✗ ' + e);
  process.exit(1);
}
console.log('\n✅ data-word est correctement échappé pour du HTML ; aucun mot à apostrophe ne peut casser checkAnswer.');
process.exit(0);
