#!/usr/bin/env node
/* ═══════════════════════════════════════════════
   TürkçeYol — tools/verify-verb-intro-order.js  (v10 AXE 5.3)
   Vérifie, hors runtime, avec un PROFIL NEUF (aucun verbe jamais vu,
   reviewQueue vide), qu'aucun verbe ne peut alimenter un exercice de
   conjugaison (verb_fill, cloze, word_order) sans avoir été montré dans
   une carte de découverte de LA MÊME génération, ou déjà maîtrisé.

   Contexte (relecture externe, Codex, 2 passes) : createIntroCards ne montre que
   2 cartes de verbe max par leçon, mais l'étape 5 (conjugaison) parcourait
   TOUS les verbIds du chapitre — un chapitre à >2 verbIds pouvait donc
   tester un verbe (ex. le 4e) sans jamais l'avoir introduit. Corrigé par
   `chapter.requiredVerbIds` (priorise les verbes concernés dans les
   cartes) + un filtre général `drillableVerbs` dans generateForChapter
   (un verbe n'alimente un exercice que s'il a été introduit ou est déjà
   connu), appliqué aussi à createSentenceBuilder/createListeningTranscribe
   (via un chapitre cloné dont `verbIds` est restreint à `drillableVerbs` —
   ces deux fonctions lisaient encore `chapter.verbIds` en direct).
   Un second bug trouvé en relecture : dans createIntroCards, un verbe déjà
   CONNU faisait `break` au lieu de `continue`, ce qui empêchait tout verbe
   suivant (nouveau) de jamais recevoir sa carte dès que le premier candidat
   non requis était déjà maîtrisé.

   Ce script vérifie TOUS les `chapter.requiredVerbIds` présents dans les données
   (collectés dynamiquement, jamais une liste codée en dur) — donc les 5 verbes de
   l'AXE 5.3, vb_tasimak (u12_c2) et tout futur verbe requis, sans qu'il faille
   modifier ce fichier. La vérification d'invariant (aucun verbe testé sans carte)
   tourne sur TOUS les chapitres du jeu, requis ou non — et couvre aussi
   sentence_builder/listening_transcribe, plus un scénario multi-session (2 premiers
   verbes déjà maîtrisés) pour le bug break/continue.

   Usage : node tools/verify-verb-intro-order.js
   Sortie : 0 si tout est cohérent, 1 sinon.
   Ne fait AUCUNE écriture, ne touche à AUCUN code runtime.
   ═══════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const errors = [];
const err = (m) => errors.push(m);

// ── Sandbox : profil NEUF — reviewQueue vide, donc AUCUN verbe "déjà connu" ──
const sandbox = {};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
sandbox.console = console;
sandbox.Math = Math;
sandbox.Set = Set;
sandbox.Map = Map;
sandbox.JSON = JSON;
sandbox.Array = Array;
sandbox.Object = Object;
sandbox.String = String;
sandbox.Number = Number;
sandbox.Date = Date;
sandbox.State = { data: { reviewQueue: [], sessionDensity: 'normal' } };
vm.createContext(sandbox);

function load(rel) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) { err(`Fichier manquant : ${rel}`); return; }
  try {
    vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: rel });
  } catch (e) {
    err(`${rel} : erreur de parsing/exécution → ${e.message}`);
  }
}

[
  'js/data/vocabulary.js', 'js/data/verbs.js', 'js/data/phrases.js',
  'js/data/dialogues.js', 'js/data/grammar.js', 'js/data/units.js',
  'js/data/achievements.js',
  'js/engine/phonetics.js', 'js/engine/exercises.js',
].forEach(load);

if (errors.length) {
  console.log('❌ Chargement impossible :');
  for (const e of errors) console.log('   ✗ ' + e);
  process.exit(1);
}

const Exercises = sandbox.Exercises;
const AppUnits = sandbox.AppUnits || [];

if (!Exercises || typeof Exercises.generateForChapter !== 'function') {
  console.log('❌ window.Exercises.generateForChapter introuvable.');
  process.exit(1);
}

const RUNS = 15; // génération aléatoire : plusieurs passes par chapitre

// ── 1. Invariant général, sur TOUS les chapitres : un verbe qui alimente un exercice de
// conjugaison doit avoir été montré dans une carte de découverte de LA MÊME génération. Avec
// un profil neuf, "déjà connu" est toujours vide, donc ce test est strict : la seule façon
// pour un verbe d'apparaître dans un exercice est d'avoir eu sa propre carte cette fois-ci.
let chaptersChecked = 0, exercisesChecked = 0;
for (const u of AppUnits) {
  for (const c of (u.chapters || [])) {
    if (!c.verbIds || c.verbIds.length === 0) continue;
    chaptersChecked++;
    for (let run = 0; run < RUNS; run++) {
      let slides;
      try {
        slides = Exercises.generateForChapter(c.id);
      } catch (e) {
        err(`generateForChapter("${c.id}") a levé : ${e.message}`);
        continue;
      }
      const introducedVerbIds = new Set(
        slides.filter(s => s.type === 'intro_card' && s.isVerb).map(s => s.data.id)
      );
      for (const s of slides) {
        exercisesChecked++;
        let verbId = null;
        if (s.type === 'cloze' && s.data && s.data.type === 'verb') verbId = s.data.id;
        else if (s.subtype === 'verb_fill' && s.data && s.data.type === 'verb') verbId = s.data.id;
        else if (s.type === 'word_order' && s.sourceVerbId) verbId = s.sourceVerbId;
        else if (s.type === 'sentence_builder' && s.sourceVerbId) verbId = s.sourceVerbId;
        else if (s.type === 'listening_transcribe' && s.sourceVerbId) verbId = s.sourceVerbId;
        if (!verbId) continue;
        if (!introducedVerbIds.has(verbId)) {
          err(`chapitre "${c.id}" : l'exercice "${s.type}${s.subtype ? '/' + s.subtype : ''}" ` +
              `porte sur le verbe "${verbId}", jamais montré dans une carte de découverte de ` +
              `cette même génération (profil neuf → ne peut pas non plus être "déjà connu").`);
          break; // un exemple suffit par chapitre/run
        }
      }
    }
  }
}

// ── 2. Preuve positive : TOUT verbe requis (`chapter.requiredVerbIds`, quel que soit le lot qui
// l'a ajouté — AXE 5.3, vb_tasimak en u12_c2, ou un futur ajout) reçoit bien une carte de
// découverte dans son chapitre (sinon requiredVerbIds ne servirait à rien). Collecté
// dynamiquement depuis les données plutôt que codé en dur, pour couvrir automatiquement tout
// nouveau verbe requis sans modifier ce fichier.
const REQUIRED_VERBS = [];
for (const u of AppUnits) {
  for (const c of (u.chapters || [])) {
    for (const verbId of (c.requiredVerbIds || [])) REQUIRED_VERBS.push({ chapterId: c.id, verbId });
  }
}
if (REQUIRED_VERBS.length === 0) {
  err('aucun chapter.requiredVerbIds trouvé dans les données — le test 2 ne vérifierait plus rien.');
}

for (const { chapterId, verbId } of REQUIRED_VERBS) {
  let seenAsCard = false;
  for (let run = 0; run < RUNS && !seenAsCard; run++) {
    const slides = Exercises.generateForChapter(chapterId);
    seenAsCard = slides.some(s => s.type === 'intro_card' && s.isVerb && s.data.id === verbId);
  }
  if (!seenAsCard) {
    err(`"${verbId}" n'a jamais reçu de carte de découverte dans "${chapterId}" sur ${RUNS} ` +
        `générations — requiredVerbIds ne le priorise pas comme attendu.`);
  }
}

// ── 3. Scénario multi-session (relecture externe, Codex) : les 2 premiers verbes NON requis
// d'un chapitre sont déjà maîtrisés (reviewQueue, step >= 2) → les verbes suivants doivent
// quand même recevoir leur carte de découverte. Avant correctif, `known.has(verb.id)` faisait
// `break` au lieu de `continue` : dès que le 1er verbe rencontré était connu, la boucle
// s'arrêtait net et aucun verbe suivant (même nouveau) ne recevait jamais de carte.
{
  const chapterId = 'u9_c1'; // ['vb_uyumak', 'vb_kalkmak', 'vb_yemek', 'vb_icmek', 'vb_gitmek'] — aucun requis
  let chapterVerbIds = [];
  for (const u of AppUnits) {
    const c = (u.chapters || []).find(ch => ch.id === chapterId);
    if (c) chapterVerbIds = c.verbIds || [];
  }
  if (chapterVerbIds.length < 3) {
    err(`Scénario multi-session : "${chapterId}" a moins de 3 verbIds — test invalide, à adapter.`);
  } else {
    const [firstKnown, secondKnown, ...rest] = chapterVerbIds;
    sandbox.State.data.reviewQueue = [
      { id: firstKnown, type: 'verb', step: 3 },
      { id: secondKnown, type: 'verb', step: 3 }
    ];
    let sawNewVerbCard = false;
    for (let run = 0; run < RUNS && !sawNewVerbCard; run++) {
      const slides = Exercises.generateForChapter(chapterId);
      sawNewVerbCard = slides.some(s =>
        s.type === 'intro_card' && s.isVerb && rest.includes(s.data.id)
      );
    }
    if (!sawNewVerbCard) {
      err(`Scénario multi-session : avec "${firstKnown}" et "${secondKnown}" déjà maîtrisés, ` +
          `aucun des verbes suivants (${rest.join(', ')}) n'a reçu de carte de découverte sur ` +
          `${RUNS} générations — le verbe connu bloque encore les suivants (break au lieu de continue).`);
    }
    sandbox.State.data.reviewQueue = []; // restaure le profil neuf pour la suite
  }
}

console.log('─'.repeat(56));
console.log('TürkçeYol — vérification ordre verbes découverte/exercices (v10 AXE 5.3)');
console.log('─'.repeat(56));
console.log(`Chapitres avec verbIds testés : ${chaptersChecked} × ${RUNS} passes · Slides inspectées : ${exercisesChecked}`);
console.log(`Verbes requis (requiredVerbIds) vérifiés individuellement : ${REQUIRED_VERBS.length}`);
console.log('─'.repeat(56));

if (errors.length) {
  console.log(`\n❌ ${errors.length} PROBLÈME(S) :`);
  for (const e of errors) console.log('   ✗ ' + e);
  console.log('\nVérification ÉCHOUÉE.');
  process.exit(1);
}

console.log('\n✅ Tout verbe testé a bien été introduit dans la même génération (ou déjà connu).');
process.exit(0);
