#!/usr/bin/env node
/* ═══════════════════════════════════════════════
   TürkçeYol — tools/verify-tense-gating.js  (v10 AXE 1.1 + 1.2)
   Vérifie, hors runtime, que le moteur ne teste jamais un temps
   verbal avant que le chapitre qui l'enseigne n'ait été atteint :
     • pour CHAQUE chapitre, generateForChapter ne produit aucun
       exercice (verb_fill, cloze, word_order, sentence_builder,
       listening_transcribe) dont le temps sort de l'ensemble
       autorisé (chapter.tenses explicite, sinon les temps
       cumulés des chapitres précédents via
       Exercises._unlockedTensesBefore) ;
     • pour un chapitre dont les temps sont volontairement
       restreints (ex. u10_c2 = présent seul), aucune mauvaise
       réponse (distracteur) proposée n'est une forme d'un temps
       non autorisé du même verbe ;
     • la règle g_copule existe, avec ≥4 exercices dont la
       réponse figure bien dans ses propres options.

   Le temps d'un exemple de verbe est déterminé en le comparant
   UNIQUEMENT aux formes propres à CE verbe (jamais à un autre
   verbe de la même phrase) — c'est exactement la stratégie
   utilisée par le moteur lui-même (voir _detectExampleTense
   dans js/engine/exercises.js), donc ce script vérifie que
   l'implémentation reste fidèle à sa propre règle en la
   ré-exécutant de façon indépendante sur les résultats produits.

   Usage : node tools/verify-tense-gating.js
   Sortie : 0 si tout est cohérent, 1 sinon.
   Ne fait AUCUNE écriture, ne touche à AUCUN code runtime.
   ═══════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const errors = [];
const err = (m) => errors.push(m);

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
const AppVerbs = sandbox.AppVerbs || [];
const AppGrammar = sandbox.AppGrammar || [];

if (!Exercises || typeof Exercises.generateForChapter !== 'function' || typeof Exercises._unlockedTensesBefore !== 'function') {
  console.log('❌ Exercises.generateForChapter / _unlockedTensesBefore introuvables.');
  process.exit(1);
}

const RUNS = 20;
let chapterCount = 0, tenseExerciseCount = 0;

for (const u of AppUnits) {
  for (const c of (u.chapters || [])) {
    chapterCount++;
    // Même calcul que generateForChapter (js/engine/exercises.js) : `allowed` est le cumul
    // des temps enseignés par les chapitres précédents ET du/des temps propres à ce chapitre
    // — un distracteur peut légitimement venir d'un temps déjà connu (ex. le présent
    // affirmatif comme distracteur de la négation présente à u10_c3), ce n'est pas une fuite.
    const unlockedBefore = Array.from(Exercises._unlockedTensesBefore(c.id));
    const drillTenses = (Array.isArray(c.tenses) && c.tenses.length > 0) ? c.tenses : unlockedBefore;
    const allowed = Array.from(new Set([...unlockedBefore, ...drillTenses]));

    for (let run = 0; run < RUNS; run++) {
      let slides;
      try {
        slides = Exercises.generateForChapter(c.id);
      } catch (e) {
        err(`generateForChapter("${c.id}") a levé : ${e.message}`);
        continue;
      }

      for (const s of slides) {
        // 1) Le temps testé par un exercice de conjugaison doit être autorisé.
        if (s.subtype === 'verb_fill' && s.verbMeta) {
          tenseExerciseCount++;
          // Le temps PRINCIPALEMENT testé doit être un des temps que ce chapitre fait
          // pratiquer (drillTenses) — plus strict que `allowed`, qui n'est là que pour
          // les distracteurs/exemples.
          if (!drillTenses.includes(s.verbMeta.tense)) {
            err(`"${c.id}" : verb_fill teste "${s.verbMeta.tense}" (verbe ${s.data.id}), hors de [${drillTenses}]`);
          }
          // 2) Aucun distracteur ne doit être une forme d'un temps NON autorisé du même verbe.
          const verb = AppVerbs.find(v => v.id === s.data.id);
          if (verb && verb.conjugations) {
            const forbiddenForms = new Set();
            for (const t of Object.keys(verb.conjugations)) {
              if (allowed.includes(t)) continue;
              for (const p of Object.keys(verb.conjugations[t])) forbiddenForms.add(verb.conjugations[t][p]);
            }
            for (const opt of (s.options || [])) {
              if (forbiddenForms.has(opt)) {
                err(`"${c.id}" : option "${opt}" (verbe ${s.data.id}) est une forme d'un temps non autorisé [${allowed}]`);
              }
            }
          }
        }
        // 3) cloze : le temps de l'exemple choisi (détecté via les formes propres au verbe)
        // doit être dans l'ensemble autorisé — data.type vaut bien 'verb' pour cet exercice.
        if (s.type === 'cloze' && s.data && s.data.type === 'verb') {
          const verb = AppVerbs.find(v => v.id === s.data.id);
          const tr = s.data.tr;
          if (verb && tr) {
            const t = Exercises._detectExampleTense(verb, tr);
            tenseExerciseCount++;
            if (t && !allowed.includes(t)) {
              err(`"${c.id}" : ${s.type} utilise "${tr}" (${verb.id}, temps "${t}"), hors de [${allowed}]`);
            }
          }
        }
        // 4) word_order / sentence_builder / listening_transcribe : leur data.type vaut
        // 'phrase' (jamais 'verb'), donc on ne peut PAS s'appuyer dessus pour retrouver le
        // verbe source — le moteur expose maintenant explicitement `sourceVerbId` /
        // `sourceTense` (js/engine/exercises.js) pour que ce contrôle porte sur le vrai
        // exemple choisi, pas sur une reconstruction devinée à partir de data.id/data.tr.
        if (['word_order', 'sentence_builder', 'listening_transcribe'].includes(s.type) && s.sourceVerbId) {
          tenseExerciseCount++;
          if (s.sourceTense === null || s.sourceTense === undefined) {
            err(`"${c.id}" : ${s.type} (verbe ${s.sourceVerbId}) sans temps détectable — devrait avoir été exclu par le filtre`);
          } else if (!allowed.includes(s.sourceTense)) {
            err(`"${c.id}" : ${s.type} utilise le verbe ${s.sourceVerbId} au temps "${s.sourceTense}", hors de [${allowed}]`);
          }
        }
      }
    }
  }
}

// 4) La copule doit exister et être correcte.
const copule = AppGrammar.find(g => g.id === 'g_copule');
if (!copule) {
  err('Règle "g_copule" introuvable.');
} else {
  if (!Array.isArray(copule.exercises) || copule.exercises.length < 4) {
    err(`"g_copule" : ${copule.exercises ? copule.exercises.length : 0} exercice(s), 4 minimum attendus.`);
  } else {
    for (const ex of copule.exercises) {
      if (!Array.isArray(ex.options) || !ex.options.includes(ex.answer)) {
        err(`"g_copule" : réponse "${ex.answer}" absente des options de "${ex.prompt}"`);
      }
    }
  }
}

console.log('─'.repeat(56));
console.log('TürkçeYol — vérification du filtrage par temps (v10 AXE 1.1/1.2)');
console.log('─'.repeat(56));
console.log(`Chapitres testés : ${chapterCount} × ${RUNS} passes`);
console.log(`Exercices liés à un temps inspectés : ${tenseExerciseCount}`);
console.log('─'.repeat(56));

if (errors.length) {
  console.log(`\n❌ ${errors.length} PROBLÈME(S) :`);
  for (const e of errors.slice(0, 60)) console.log('   ✗ ' + e);
  if (errors.length > 60) console.log(`   … +${errors.length - 60} autres`);
  console.log('\nVérification ÉCHOUÉE.');
  process.exit(1);
}

console.log('\n✅ Aucun exercice ne porte sur un temps non enseigné par un chapitre antérieur.');
process.exit(0);
