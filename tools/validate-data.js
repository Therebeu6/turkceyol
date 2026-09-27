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

// stories.js (v7 AXE 1) : optionnel, chargé seulement s'il existe déjà
const storiesPath = path.join(DATA, 'stories.js');
if (fs.existsSync(storiesPath)) {
  try {
    vm.runInContext(fs.readFileSync(storiesPath, 'utf8'), sandbox, { filename: 'stories.js' });
  } catch (e) {
    err(`js/data/stories.js : erreur de parsing JS → ${e.message}`);
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
const stories = W.AppStories || [];

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
checkUniqueIds(stories, 'stories');

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

// ── 3b. Histoires (v7 AXE 1) : lignes et questions bien formées ──
for (const s of stories) {
  const tag = `story "${s.id}"`;
  if (!Array.isArray(s.lines) || s.lines.length === 0) { err(`${tag} : lines absentes ou vides`); continue; }
  s.lines.forEach((l, i) => {
    if (!l.tr || !l.fr) err(`${tag}.lines[${i}] : tr/fr requis`);
  });
  if (!Array.isArray(s.questions) || s.questions.length === 0) {
    warn(`${tag} : aucune question de compréhension`);
  } else {
    s.questions.forEach((q, i) => {
      const qtag = `${tag}.questions[${i}]`;
      if (!Array.isArray(q.options) || q.options.length !== 4) err(`${qtag} : attendu 4 options`);
      else if (new Set(q.options).size !== q.options.length) err(`${qtag} : options dupliquées`);
      if (q.answer === undefined) err(`${qtag} : answer absente`);
      else if (Array.isArray(q.options) && !q.options.includes(q.answer)) err(`${qtag} : answer absente des options`);
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
    checkRefs('phraseIds', idSet(phrases), 'phraseId');

    // v10 (relecture Codex, post-clôture) : requiredVerbIds doit référencer un verbe existant
    // ET figurer dans verbIds du même chapitre — sinon createIntroCards l'ignore silencieusement
    // (son garde-fou `for (const verb of allVerbs)` ne parcourt que verbIds), et le verbe requis
    // ne reçoit jamais sa carte malgré l'intention affichée dans les données.
    if (Array.isArray(c.requiredVerbIds)) {
      const chapterVerbIds = new Set(c.verbIds || []);
      for (const rid of c.requiredVerbIds) {
        if (!verbIds.has(rid)) err(`chapitre "${c.id}" : requiredVerbId "${rid}" introuvable`);
        else if (!chapterVerbIds.has(rid)) err(`chapitre "${c.id}" : requiredVerbId "${rid}" absent de verbIds — ignoré silencieusement par le moteur`);
      }
    }
  }
}

// ── 4c. Phrases utiles rattachées au parcours (v10 AXE 5.5) ──
// Chaque phrase de l'onglet Phrases doit être enseignée par au moins un chapitre ; un chapitre
// n'en porte que 4 au plus (toutes montrées en carte à chaque passage, sans gonfler la leçon) ;
// une phrase identique à un mot du même chapitre ferait doublon de carte ; une phrase de
// difficulté 3 n'a pas sa place dans une unité A1.
const normTr = (t) => String(t || '').toLocaleLowerCase('tr-TR').replace(/[.!?,;:]/g, '').trim();
const phraseById = Object.fromEntries(phrases.map(p => [p.id, p]));
const vocabById = Object.fromEntries(vocab.map(w => [w.id, w]));
const phraseUse = new Map();
for (const u of units) {
  for (const c of (u.chapters || [])) {
    const pids = c.phraseIds || [];
    if (pids.length > 4) err(`chapitre "${c.id}" : ${pids.length} phraseIds (4 max)`);
    const chapterVocabTr = new Set((c.vocabIds || []).map(id => vocabById[id]).filter(Boolean).map(w => normTr(w.tr)));
    for (const pid of pids) {
      const p = phraseById[pid];
      if (!p) continue;
      phraseUse.set(pid, (phraseUse.get(pid) || 0) + 1);
      if (chapterVocabTr.has(normTr(p.tr))) err(`chapitre "${c.id}" : phrase "${pid}" identique à un mot de ses vocabIds (doublon de carte)`);
      if ((p.difficulty || 1) >= 3 && u.cefr === 'A1') err(`chapitre "${c.id}" (A1) : phrase "${pid}" de difficulté ${p.difficulty}, trop avancée`);
    }
  }
}
for (const p of phrases) if (!phraseUse.has(p.id)) err(`phrase "${p.id}" rattachée à aucun chapitre (AXE 5.5)`);

// ── 4d. Vocabulaire des chapitres : niveau et doublons (v10 AXE 5.2) ──
// Un mot de difficulté 3 n'est pas enseigné dans une unité A1 — sauf ces 6 cas antérieurs à la
// règle, conservés tels quels (nombres 80/90/1000 du chapitre des chiffres, « Havalimanı »,
// « Karşısında », « Yavaş konuşun ») : tout NOUVEAU cas est une erreur. Deux mots de même forme
// turque dans un même chapitre produiraient deux cartes et des exercices indiscernables.
const LEGACY_A1_D3 = new Set(['v_seksen', 'v_doksan', 'v_bin', 'v_havalimani', 'v_karsisinda', 'v_yavas_konusun']);
for (const u of units) {
  for (const c of (u.chapters || [])) {
    const seenTr = new Map();
    for (const vid of (c.vocabIds || [])) {
      const w = vocabById[vid];
      if (!w) continue;
      if (u.cefr === 'A1' && (w.difficulty || 1) >= 3 && !LEGACY_A1_D3.has(vid)) {
        err(`chapitre "${c.id}" (A1) : mot "${vid}" de difficulté ${w.difficulty}, trop avancé`);
      }
      const k = normTr(w.tr);
      if (seenTr.has(k)) err(`chapitre "${c.id}" : "${seenTr.get(k)}" et "${vid}" ont la même forme turque "${w.tr}"`);
      seenTr.set(k, vid);
    }
  }
}

// ── 4b. Cohérence des niveaux CECRL (v10 AXE 6.6) ──
// Convention établie dans TOUTE la base (vérifiée avant d'écrire cette règle) : le tag CECRL
// d'un CHAPITRE doit toujours être IDENTIQUE au `cefr` de son unité (jamais plus haut — un
// chapitre A1 dans une unité A1, jamais A2/B1). Un DIALOGUE qu'il utilise peut légitimement
// porter un tag un cran au-dessus (enrichissement, ex. un chapitre A1 utilisant un dialogue
// A2), mais jamais plus d'un cran (pas de B1 dans un chapitre A1).
const CEFR_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const extractCefr = (tags) => (tags || []).find(t => CEFR_ORDER.includes(t));
const dialogueById = Object.fromEntries(dialogues.map(d => [d.id, d]));
for (const u of units) {
  for (const c of (u.chapters || [])) {
    const chapterCefr = extractCefr(c.tags);
    if (chapterCefr && chapterCefr !== u.cefr) {
      err(`chapitre "${c.id}" : tag CECRL "${chapterCefr}" différent du niveau de son unité "${u.id}" (${u.cefr})`);
    }
    for (const did of (c.dialogueIds || [])) {
      const d = dialogueById[did];
      if (!d) continue;
      const dialogueCefr = extractCefr(d.tags);
      if (dialogueCefr && chapterCefr) {
        const gap = CEFR_ORDER.indexOf(dialogueCefr) - CEFR_ORDER.indexOf(chapterCefr);
        if (gap > 1) err(`chapitre "${c.id}" (${chapterCefr}) : dialogue "${did}" trop avancé (${dialogueCefr})`);
      }
    }
  }
}

// ── 5. Couverture pédagogique (warnings, non bloquants) ──
const vocabNoExample = vocab.length - vocabWithExample;
if (vocabNoExample > 0) warn(`${vocabNoExample} mot(s) sans example (AXE 1.1) sur ${vocab.length}`);
const usedGrammar = new Set();
for (const u of units) for (const c of (u.chapters || [])) for (const gid of (c.grammarIds || [])) usedGrammar.add(gid);
for (const g of grammar) if (!usedGrammar.has(g.id)) warn(`règle "${g.id}" rattachée à aucun chapitre (AXE 1.3)`);

// v10 (relecture Codex, post-clôture) : un dialogue non rattaché reste consultable dans
// l'onglet Dialogues (pas une fuite), mais doit être VOLONTAIRE, jamais un oubli — la liste
// documente pourquoi. Tout nouveau dialogue non rattaché et non listé produit un avertissement.
const LIBRARY_ONLY_DIALOGUES = new Set([
  'd_anlamadim', // scindé en d_tekrar_eder_misiniz (u8_c1) + d_ne_demek (u8_c3), cf. sa note (AXE 4)
  'd_telefon', // B1 — le parcours (18 unités) ne dépasse pas A2 ; bonus de bibliothèque
  'd_calisma', // B1 — idem : contenu volontairement au-delà du niveau enseigné
]);
const usedDialogues = new Set();
for (const u of units) for (const c of (u.chapters || [])) for (const did of (c.dialogueIds || [])) usedDialogues.add(did);
for (const d of dialogues) {
  if (usedDialogues.has(d.id)) continue;
  if (LIBRARY_ONLY_DIALOGUES.has(d.id)) continue;
  warn(`dialogue "${d.id}" rattaché à aucun chapitre — le rattacher ou l'ajouter à LIBRARY_ONLY_DIALOGUES avec sa justification`);
}
for (const did of LIBRARY_ONLY_DIALOGUES) {
  if (!dialogueById[did]) err(`LIBRARY_ONLY_DIALOGUES : dialogue "${did}" n'existe pas`);
  else if (usedDialogues.has(did)) err(`LIBRARY_ONLY_DIALOGUES : "${did}" est pourtant rattaché à un chapitre — le retirer de la liste`);
}

// ── Rapport ──
console.log('─'.repeat(56));
console.log('TürkçeYol — validation des données');
console.log('─'.repeat(56));
const verbsWithAorist = verbs.filter(v => v.conjugations && v.conjugations.aorist).length;
const verbsWithPastNarrative = verbs.filter(v => v.conjugations && v.conjugations.pastNarrative).length;
console.log(`Vocabulaire : ${vocab.length} (avec example : ${vocabWithExample})`);
console.log(`Verbes : ${verbs.length} (avec aoriste : ${verbsWithAorist}, avec passé narratif : ${verbsWithPastNarrative}) · Phrases : ${phrases.length} · Dialogues : ${dialogues.length}`);
console.log(`Grammaire : ${grammar.length} · Unités : ${units.length} · Chapitres : ${chapterCount} · Histoires : ${stories.length}`);
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
