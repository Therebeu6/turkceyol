#!/usr/bin/env node
/* ═══════════════════════════════════════════════
   TürkçeYol — tools/verify-phrase-coverage.js  (v10 AXE 5.5)
   Vérifie, hors runtime, que les phrases utiles (AppPhrases) font réellement
   partie du parcours :
   1. chaque phrase est rattachée à au moins un chapitre (`phraseIds`) ;
   2. en leçon, PROFIL NEUF : aucun exercice ne porte sur une phrase qui n'a pas
      reçu sa carte de découverte dans la même génération ;
   3. chaque phrase est effectivement exercée dans son chapitre (au moins une
      fois sur plusieurs générations) — pas seulement affichée ;
   4. en révision : une phrase n'est proposée que si elle appartient à un
      chapitre TERMINÉ, et toutes le deviennent quand tout le parcours l'est.

   Usage : node tools/verify-phrase-coverage.js
   Sortie : 0 si tout est cohérent, 1 sinon. Aucune écriture.
   ═══════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const errors = [];
const err = (m) => errors.push(m);

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

const { Exercises, AppUnits, AppPhrases, AppVocabulary } = sandbox;
const phraseIdSet = new Set(AppPhrases.map(p => p.id));
const chapters = AppUnits.flatMap(u => u.chapters);
const RUNS = 60;

// Id de la phrase sur laquelle porte un exercice (null si ce n'est pas un exercice de phrase).
const phraseOf = (s) => {
  if (s.isTeaching) return null;
  if (s.sourcePhraseId) return s.sourcePhraseId;
  if (s.data && s.data.type === 'phrase' && phraseIdSet.has(s.data.id)) return s.data.id;
  return null;
};

// ── 1. Rattachement ──
const attached = new Map();
for (const c of chapters) for (const pid of (c.phraseIds || [])) {
  if (!phraseIdSet.has(pid)) err(`chapitre "${c.id}" : phraseId "${pid}" introuvable`);
  if (!attached.has(pid)) attached.set(pid, c.id);
}
for (const p of AppPhrases) if (!attached.has(p.id)) err(`phrase "${p.id}" rattachée à aucun chapitre`);

// ── 2 + 3. Leçons, profil neuf ──
const exercised = new Set();
let lessonExos = 0;
for (const c of chapters) {
  const own = new Set(c.phraseIds || []);
  for (let run = 0; run < RUNS; run++) {
    const slides = Exercises.generateForChapter(c.id);
    const shown = new Set(slides.filter(s => s.type === 'intro_card' && s.isPhrase).map(s => s.data.id));
    for (const s of slides) {
      const pid = phraseOf(s);
      if (!pid) continue;
      lessonExos++;
      if (!shown.has(pid)) {
        err(`leçon "${c.id}" : exercice "${s.type}" sur la phrase "${pid}" sans carte de découverte préalable`);
      } else if (!own.has(pid)) {
        err(`leçon "${c.id}" : phrase "${pid}" hors des phraseIds du chapitre`);
      }
      exercised.add(pid);
    }
    for (const pid of own) if (!shown.has(pid)) {
      err(`leçon "${c.id}" : la phrase "${pid}" n'a pas reçu de carte de découverte`);
    }
    if (own.size === 0) break; // chapitre sans phrase : une passe suffit pour l'invariant
  }
}
for (const p of AppPhrases) if (attached.has(p.id) && !exercised.has(p.id)) {
  err(`phrase "${p.id}" jamais exercée dans "${attached.get(p.id)}" sur ${RUNS} générations`);
}

// ── 4. Révision ──
const anyVocab = AppVocabulary.find(w => chapters[0].vocabIds && chapters[0].vocabIds.includes(w.id));
const items = anyVocab ? [{ id: anyVocab.id, type: 'vocabulary' }] : [];
// 4a. Progression partielle : moitié du parcours terminée → jamais une phrase d'un chapitre suivant.
const half = chapters.slice(0, Math.floor(chapters.length / 2));
sandbox.State.data.completedChapters = half.map(c => c.id);
const allowedHalf = new Set(half.flatMap(c => c.phraseIds || []));
for (let run = 0; run < 200; run++) {
  for (const s of Exercises.generateForReview(items)) {
    const pid = phraseOf(s);
    if (pid && !allowedHalf.has(pid)) err(`révision (mi-parcours) : phrase "${pid}" d'un chapitre non terminé`);
  }
}
// 4b. Aucun chapitre terminé → aucune phrase.
sandbox.State.data.completedChapters = [];
for (let run = 0; run < 50; run++) {
  for (const s of Exercises.generateForReview(items)) {
    const pid = phraseOf(s);
    if (pid) err(`révision (aucun chapitre terminé) : phrase "${pid}" proposée`);
  }
}
// 4c. Tout le parcours terminé → chaque phrase atteignable en révision.
sandbox.State.data.completedChapters = chapters.map(c => c.id);
const reviewed = new Set();
for (let run = 0; run < 3000 && reviewed.size < AppPhrases.length; run++) {
  for (const s of Exercises.generateForReview(items)) {
    const pid = phraseOf(s);
    if (pid) reviewed.add(pid);
  }
}
for (const p of AppPhrases) if (!reviewed.has(p.id)) err(`phrase "${p.id}" jamais proposée en révision (parcours terminé)`);

console.log('─'.repeat(56));
console.log('TürkçeYol — couverture des phrases utiles (v10 AXE 5.5)');
console.log('─'.repeat(56));
console.log(`Phrases : ${AppPhrases.length} · rattachées : ${attached.size} · exercées en leçon : ${exercised.size} · atteintes en révision : ${reviewed.size}`);
console.log(`Exercices de phrase inspectés en leçon : ${lessonExos}`);
console.log('─'.repeat(56));
if (errors.length) {
  const uniq = [...new Set(errors)];
  console.log(`\n❌ ${uniq.length} PROBLÈME(S) :`);
  for (const e of uniq.slice(0, 40)) console.log('   ✗ ' + e);
  console.log('\nVérification ÉCHOUÉE.');
  process.exit(1);
}
console.log('\n✅ Toutes les phrases sont rattachées, montrées avant d\'être exercées, et atteignables en leçon comme en révision.');
process.exit(0);
