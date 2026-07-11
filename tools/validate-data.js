#!/usr/bin/env node
/* ═══════════════════════════════════════════════
   TürkçeYol — tools/validate-data.js
   Filet de validation des données (hors runtime).
   Charge les fichiers js/data/*.js dans un faux `window`
   et vérifie la cohérence : ids uniques, références
   croisées valides, exercices bien formés, champs requis.

   Usage : node tools/validate-data.js
   Sortie : 0 si tout est sain, 1 sinon (avec messages clairs).
   Ne fait AUCUNE écriture, ne touche à AUCUN code runtime.
   ═══════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'js', 'data');

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

// ── Charger tous les js/data/*.js dans un contexte partagé ──
const sandbox = { window: {}, console };
vm.createContext(sandbox);
const DATA_FILES = [
  'vocabulary.js', 'verbs.js', 'phrases.js', 'dialogues.js',
  'grammar.js', 'units.js', 'achievements.js',
];
for (const f of DATA_FILES) {
  const p = path.join(DATA, f);
  if (!fs.existsSync(p)) { err(`Fichier manquant : js/data/${f}`); continue; }
  try {
    vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: f });
  } catch (e) {
    err(`js/data/${f} : erreur de parsing JS → ${e.message}`);
  }
}

const W = sandbox.window;
const vocab = W.AppVocabulary || [];
const verbs = W.AppVerbs || [];
const phrases = W.AppPhrases || [];
const dialogues = W.AppDialogues || [];
const grammar = W.AppGrammar || [];
const units = W.AppUnits || [];
const achievements = W.AppAchievements || [];

// ── Helpers ──
const idSet = (arr) => new Set(arr.map(x => x && x.id).filter(Boolean));
function checkUniqueIds(arr, label) {
  const seen = new Set();
  for (const item of arr) {
    if (!item || !item.id) { err(`${label} : item sans id → ${JSON.stringify(item).slice(0, 80)}`); continue; }
    if (seen.has(item.id)) err(`${label} : id dupliqué "${item.id}"`);
    seen.add(item.id);
  }
}

// ── 1. Ids uniques ──
checkUniqueIds(vocab, 'vocabulary');
checkUniqueIds(verbs, 'verbs');
checkUniqueIds(phrases, 'phrases');
checkUniqueIds(dialogues, 'dialogues');
checkUniqueIds(grammar, 'grammar');
checkUniqueIds(units, 'units');
checkUniqueIds(achievements, 'achievements');

// ── 2. Champs requis du vocabulaire (+ forme de example) ──
const REQ_VOCAB = ['id', 'tr', 'fr', 'topic', 'type', 'difficulty'];
let vocabWithExample = 0;
for (const w of vocab) {
  for (const k of REQ_VOCAB) {
    if (w[k] === undefined || w[k] === null || w[k] === '') err(`vocab "${w.id}" : champ requis manquant "${k}"`);
  }
  if (typeof w.difficulty !== 'number') err(`vocab "${w.id}" : difficulty doit être un nombre`);
  if (w.example !== undefined) {
    vocabWithExample++;
    if (typeof w.example !== 'object' || !w.example.tr || !w.example.fr)
      err(`vocab "${w.id}" : example mal formé (attendu {tr, fr})`);
    else if (!w.example.tr.toLocaleLowerCase('tr-TR').includes(String(w.tr).split(' ')[0].toLocaleLowerCase('tr-TR')))
      warn(`vocab "${w.id}" : le mot cible n'apparaît peut-être pas dans example.tr`);
  }
}

// ── 3. Grammaire : exercices bien formés ──
// Deux schémas légitimes coexistent :
//   exercises[] : { prompt, answer, options:[4], hint, explanation }  (overlay Pratiquer)
//   drills[]    : { root, question, correct, distractors:[3] }        (leçon)
for (const g of grammar) {
  if (Array.isArray(g.exercises)) {
    g.exercises.forEach((ex, i) => {
      const tag = `grammar "${g.id}".exercises[${i}]`;
      if (!Array.isArray(ex.options)) { err(`${tag} : options absentes`); return; }
      if (ex.options.length !== 4) err(`${tag} : ${ex.options.length} options (attendu 4)`);
      if (new Set(ex.options).size !== ex.options.length) err(`${tag} : options dupliquées → ${JSON.stringify(ex.options)}`);
      if (ex.answer === undefined) err(`${tag} : answer absente`);
      else if (!ex.options.includes(ex.answer)) err(`${tag} : answer "${ex.answer}" absente des options`);
    });
  }
  if (Array.isArray(g.drills)) {
    g.drills.forEach((d, i) => {
      const tag = `grammar "${g.id}".drills[${i}]`;
      if (d.correct === undefined) err(`${tag} : correct absent`);
      if (!Array.isArray(d.distractors)) { err(`${tag} : distractors absents`); return; }
      if (d.distractors.length !== 3) err(`${tag} : ${d.distractors.length} distractors (attendu 3)`);
      const opts = [d.correct, ...d.distractors];
      if (new Set(opts).size !== opts.length) err(`${tag} : correct présent dans les distractors ou doublon → ${JSON.stringify(opts)}`);
    });
  }
}

// ── 4. Références croisées des chapitres (units → vocab/verbs/grammar/dialogues) ──
const vocabIds = idSet(vocab);
const verbIds = idSet(verbs);
const grammarIds = idSet(grammar);
const dialogueIds = idSet(dialogues);
const chapterIds = new Set();
let chapterCount = 0;

for (const u of units) {
  if (!Array.isArray(u.chapters)) { err(`unit "${u.id}" : chapters absent`); continue; }
  for (const c of u.chapters) {
    chapterCount++;
    if (!c.id) { err(`unit "${u.id}" : chapitre sans id`); continue; }
    if (chapterIds.has(c.id)) err(`chapitre : id dupliqué "${c.id}"`);
    chapterIds.add(c.id);
    const checkRefs = (field, set, label) => {
      if (!Array.isArray(c[field])) return;
      for (const ref of c[field]) if (!set.has(ref)) err(`chapitre "${c.id}" : ${label} "${ref}" introuvable`);
    };
    checkRefs('vocabIds', vocabIds, 'vocabId');
    checkRefs('verbIds', verbIds, 'verbId');
    checkRefs('grammarIds', grammarIds, 'grammarId');
    checkRefs('dialogueIds', dialogueIds, 'dialogueId');
  }
}

// ── 5. Couverture pédagogique (warnings, non bloquants) ──
const vocabNoExample = vocab.length - vocabWithExample;
if (vocabNoExample > 0) warn(`${vocabNoExample} mot(s) sans example (AXE 1.1) sur ${vocab.length}`);
const usedGrammar = new Set();
for (const u of units) for (const c of (u.chapters || [])) for (const gid of (c.grammarIds || [])) usedGrammar.add(gid);
for (const g of grammar) if (!usedGrammar.has(g.id)) warn(`règle "${g.id}" rattachée à aucun chapitre (AXE 1.3)`);

// ── Rapport ──
console.log('─'.repeat(56));
console.log('TürkçeYol — validation des données');
console.log('─'.repeat(56));
console.log(`Vocabulaire : ${vocab.length} (avec example : ${vocabWithExample})`);
console.log(`Verbes : ${verbs.length} · Phrases : ${phrases.length} · Dialogues : ${dialogues.length}`);
console.log(`Grammaire : ${grammar.length} · Unités : ${units.length} · Chapitres : ${chapterCount}`);
console.log('─'.repeat(56));

if (warnings.length) {
  console.log(`\n⚠️  ${warnings.length} avertissement(s) (non bloquant) :`);
  for (const w of warnings.slice(0, 40)) console.log('   • ' + w);
  if (warnings.length > 40) console.log(`   … +${warnings.length - 40} autres`);
}

if (errors.length) {
  console.log(`\n❌ ${errors.length} ERREUR(S) :`);
  for (const e of errors) console.log('   ✗ ' + e);
  console.log('\nValidation ÉCHOUÉE.');
  process.exit(1);
}

console.log('\n✅ Données valides — aucune erreur bloquante.');
process.exit(0);
