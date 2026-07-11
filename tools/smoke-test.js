#!/usr/bin/env node
/* ═══════════════════════════════════════════════
   TürkçeYol — tools/smoke-test.js  (AXE 6.2)
   Smoke test du moteur d'exercices (hors runtime).
   Charge données + moteurs dans un faux `window`,
   puis pour CHAQUE chapitre appelle generateForChapter
   et vérifie qu'une leçon valide est produite :
     • ≥1 slide, aucun undefined critique
     • pour les exos à options : answer ∈ options
     • cohérence de thème : grammar_fill/dialogue_fill
       ne tirent que dans grammarIds/dialogueIds du chapitre
       (garantie v5, on la re-vérifie ici)

   Usage : node tools/smoke-test.js
   Sortie : 0 si les 71 chapitres passent, 1 sinon.
   Ne fait AUCUNE écriture, ne touche à AUCUN code runtime.
   ═══════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const errors = [];
const err = (m) => errors.push(m);

// ── Sandbox : window = global, State minimal, TTS no-op (jamais appelé ici) ──
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
// State minimal : reviewQueue vide (aucun mot "déjà connu" → intro cards affichées)
sandbox.State = { data: { reviewQueue: [] } };
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

// Données puis moteurs (ordre = celui d'index.html)
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
const AppGrammar = sandbox.AppGrammar || [];

if (!Exercises || typeof Exercises.generateForChapter !== 'function') {
  console.log('❌ window.Exercises.generateForChapter introuvable.');
  process.exit(1);
}

// Types dont la réponse est un choix parmi `options` (true_false a des boutons
// fixes Vrai/Faux → pas de tableau options, vérifié via `answer` seul).
const OPTION_TYPES = new Set(['qcm', 'audio_qcm', 'cloze', 'grammar_fill', 'dialogue_fill']);
const TEACHING_TYPES = new Set(['intro_card', 'grammar_note', 'tip_callout', 'culture_note']);

let chapterCount = 0, slideCount = 0;
const RUNS = 5; // plusieurs passes car la génération est aléatoire

for (const u of AppUnits) {
  for (const c of (u.chapters || [])) {
    chapterCount++;
    const chapGrammar = new Set(c.grammarIds || []);
    const chapDialogues = new Set(c.dialogueIds || []);

    for (let run = 0; run < RUNS; run++) {
      let slides;
      try {
        slides = Exercises.generateForChapter(c.id);
      } catch (e) {
        err(`generateForChapter("${c.id}") a levé : ${e.message}`);
        continue;
      }
      if (!Array.isArray(slides) || slides.length === 0) {
        err(`chapitre "${c.id}" : aucune slide générée (run ${run})`);
        continue;
      }
      slideCount += slides.length;

      for (const s of slides) {
        if (!s || typeof s !== 'object' || !s.type) {
          err(`chapitre "${c.id}" : slide sans type → ${JSON.stringify(s).slice(0, 60)}`);
          continue;
        }
        if (s.isTeaching || TEACHING_TYPES.has(s.type)) continue; // slides d'enseignement : pas de scoring

        // Réponse présente
        const hasAnswer = s.answer !== undefined || Array.isArray(s.correct) || Array.isArray(s.pairs) || s.text !== undefined;
        if (!hasAnswer) err(`chapitre "${c.id}" : ${s.type} sans réponse (answer/correct/pairs/text)`);

        // answer ∈ options
        if (OPTION_TYPES.has(s.type)) {
          if (!Array.isArray(s.options) || s.options.length < 2) {
            err(`chapitre "${c.id}" : ${s.type} options invalides`);
          } else if (s.answer === undefined || !s.options.includes(s.answer)) {
            err(`chapitre "${c.id}" : ${s.type} answer "${s.answer}" absente des options`);
          }
          // pas d'option undefined/vide
          if (Array.isArray(s.options) && s.options.some(o => o === undefined || o === null || o === '')) {
            err(`chapitre "${c.id}" : ${s.type} contient une option vide`);
          }
          // pas de doublon d'option (AXE 2.4 : distracteur = réponse déguisée)
          if (Array.isArray(s.options) && new Set(s.options).size !== s.options.length) {
            err(`chapitre "${c.id}" : ${s.type} a des options dupliquées → ${JSON.stringify(s.options)}`);
          }
        }

        // Cohérence de thème (garantie v5)
        if (s.type === 'grammar_fill' && chapGrammar.size > 0) {
          const rid = (s.ruleId) || (s.grammarMeta && s.grammarMeta.ruleId) || (s.data && s.data.id);
          if (rid && !chapGrammar.has(rid)) {
            err(`chapitre "${c.id}" : grammar_fill HORS-THÈME (règle "${rid}" ∉ ${[...chapGrammar]})`);
          }
        }
        if (s.type === 'dialogue_fill' && chapDialogues.size > 0) {
          const did = s.data && s.data.id;
          if (did && !chapDialogues.has(did)) {
            err(`chapitre "${c.id}" : dialogue_fill HORS-THÈME (dialogue "${did}" ∉ ${[...chapDialogues]})`);
          }
        }
      }
    }
  }
}

console.log('─'.repeat(56));
console.log('TürkçeYol — smoke test moteur d\'exercices');
console.log('─'.repeat(56));
console.log(`Chapitres testés : ${chapterCount} × ${RUNS} passes`);
console.log(`Slides générées : ${slideCount}`);
console.log('─'.repeat(56));

if (errors.length) {
  console.log(`\n❌ ${errors.length} PROBLÈME(S) :`);
  for (const e of errors.slice(0, 60)) console.log('   ✗ ' + e);
  if (errors.length > 60) console.log(`   … +${errors.length - 60} autres`);
  console.log('\nSmoke test ÉCHOUÉ.');
  process.exit(1);
}

console.log('\n✅ Les ' + chapterCount + ' chapitres génèrent une leçon valide, sans fuite hors-thème.');
process.exit(0);
