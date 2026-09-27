#!/usr/bin/env node
/* ═══════════════════════════════════════════════
   TürkçeYol — tools/verify-vocab-intro-order.js
   Profil NEUF (aucun mot jamais vu), pour chacune des 3 densités de session
   (short / normal / long) et sur tous les chapitres : tout mot de vocabulaire
   qui alimente un exercice (QCM, Vrai/Faux, audio, saisie, écoute, paires...)
   doit avoir reçu sa carte de découverte dans la MÊME génération.

   Contexte : createIntroCards plafonnait les cartes de mots à 5, alors que la
   densité « Longue » échantillonne 7 mots, tous testés ensuite. La faille était
   masquée tant que `window.State` était indéfini dans le navigateur (densité
   toujours « normale ») ; elle est devenue réelle une fois ce bug corrigé.

   Usage : node tools/verify-vocab-intro-order.js — sortie 0 si OK, 1 sinon.
   ═══════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const sandbox = {};
sandbox.window = sandbox;
sandbox.console = console;
sandbox.State = { data: { reviewQueue: [], completedChapters: [], sessionDensity: 'normal' } };
vm.createContext(sandbox);
for (const rel of [
  'js/data/vocabulary.js', 'js/data/verbs.js', 'js/data/phrases.js',
  'js/data/dialogues.js', 'js/data/grammar.js', 'js/data/units.js',
  'js/engine/phonetics.js', 'js/engine/exercises.js',
]) {
  try {
    vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), sandbox, { filename: rel });
  } catch (e) {
    console.log(`❌ ${rel} : ${e.message}`);
    process.exit(1);
  }
}

const { Exercises, AppUnits, AppVocabulary } = sandbox;
const vocabIds = new Set(AppVocabulary.map(w => w.id));
const RUNS = 15;
const errors = new Map(); // un exemple par chapitre/densité
let checked = 0;

// Mots sur lesquels porte un exercice (jamais les distracteurs, qui ne sont pas « testés »).
const testedWords = (s) => {
  if (s.isTeaching) return [];
  if (s.type === 'match_pairs') return (s.pairs || []).map(p => p.id);
  if (s.data && s.data.type === 'vocabulary' && vocabIds.has(s.data.id)) return [s.data.id];
  return [];
};

for (const density of ['short', 'normal', 'long']) {
  sandbox.State.data.sessionDensity = density;
  for (const u of AppUnits) {
    for (const c of u.chapters) {
      for (let run = 0; run < RUNS; run++) {
        const slides = Exercises.generateForChapter(c.id);
        const shown = new Set(slides.filter(s => s.type === 'intro_card' && !s.isVerb && !s.isPhrase).map(s => s.data.id));
        for (const s of slides) {
          for (const id of testedWords(s)) {
            checked++;
            if (!shown.has(id)) {
              const key = `${density}/${c.id}`;
              if (!errors.has(key)) errors.set(key, `densité "${density}", chapitre "${c.id}" : "${s.type}" teste le mot "${id}" sans carte de découverte`);
            }
          }
        }
      }
    }
  }
}

console.log('─'.repeat(56));
console.log('TürkçeYol — ordre découverte → exercice pour le vocabulaire');
console.log('─'.repeat(56));
console.log(`Densités : 3 · passes par chapitre : ${RUNS} · mots testés inspectés : ${checked}`);
if (errors.size) {
  console.log(`\n❌ ${errors.size} chapitre(s)/densité(s) en faute :`);
  for (const e of [...errors.values()].slice(0, 30)) console.log('   ✗ ' + e);
  process.exit(1);
}
console.log('\n✅ Aucun mot testé sans avoir été présenté dans la même leçon, quelle que soit la densité.');
process.exit(0);
