#!/usr/bin/env node
/* ═══════════════════════════════════════════════
   TürkçeYol — tools/verify-anti-repeat.js
   Vérifie hors runtime le garde-fou anti-répétition (Pilier E). Deux relectures
   successives (utilisateur, puis Codex) ont chacune trouvé une faille réelle :

   1. `Exercises._antiRepeat` doit éviter deux exercices adjacents qui portent
      sur le MÊME mot/verbe (même `data.id`, ou un id partagé avec un
      `match_pairs`), pas seulement le même TYPE — un QCM puis un Vrai/Faux
      sur "Dün" juste après se ressent comme "le même mot deux fois de
      suite", même si les deux exercices sont de types différents.
   1b. Cette anti-répétition doit aussi couvrir la FRONTIÈRE entre deux phases
      (Pratique → Rappel → Production), pas seulement l'intérieur de chaque
      phase — sans jamais faire remonter un exercice d'une phase à l'autre.
      Cas réel trouvé (Codex) : u1_c2, un `match_pairs` contenant "İyiyim" en
      fin de Pratique suivi d'un QCM "İyiyim" en tout début de Rappel, alors
      qu'un `dialogue_fill` non conflictuel était disponible juste après.
      Testé unitairement sur des exercices synthétiques (déterministe, ne
      dépend pas des données réelles) : les tests d'intégration sur données
      réelles restent volatiles ici car `_antiRepeat` reste un best-effort —
      une phase entière dominée par un seul type (ex. 8 verb_fill d'affilée
      en "recall") ne peut de toute façon pas être totalement dé-répétée, ce
      qui est déjà le comportement historique pour le TYPE, avant ce lot.

   2. `Exercises.generateForChapter(chapterId, avoidDataIds)` : à l'enchaînement
      direct entre deux leçons (Lesson.startNextChapter, v10), le tout premier
      exercice réel de la leçon suivante ne doit pas retester un mot/verbe qui
      venait justement d'être demandé en tout dernier dans la leçon
      précédente (ex. "Dün" en fin d'u11_c1 puis à nouveau en tête d'u11_c2 —
      cas réel signalé). `avoidDataIds` est un TABLEAU, pas un seul id (Codex) :
      un dernier exercice `match_pairs` teste 4 mots à la fois — n'en protéger
      qu'un seul laisserait les 3 autres réapparaître immédiatement après.
      Testé en conditions réelles sur ce couple précis de chapitres, sur de
      nombreuses passes, et unitairement pour le cas match_pairs à 4 mots.

   Usage : node tools/verify-anti-repeat.js
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
sandbox.State = { data: { reviewQueue: [], sessionDensity: 'normal' } };
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
const { Exercises } = sandbox;

// ── 1a. _contentIds : match_pairs renvoie tous ses ids, un exercice normal renvoie [data.id] ──
{
  const mp = { type: 'match_pairs', pairs: [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }] };
  const qcm = { type: 'qcm', data: { id: 'x' } };
  const noData = { type: 'tip_callout' };
  const got = Exercises._contentIds(mp);
  if (got.join(',') !== 'a,b,c,d') err(`_contentIds(match_pairs) attendu [a,b,c,d], reçu [${got.join(',')}]`);
  if (Exercises._contentIds(qcm).join(',') !== 'x') err(`_contentIds(qcm) attendu [x], reçu [${Exercises._contentIds(qcm).join(',')}]`);
  if (Exercises._contentIds(noData).length !== 0) err(`_contentIds(sans data) devrait être vide`);
}

// ── 1b. _clashes : même type → clash ; type différent + id partagé → clash ; sinon non ──
{
  const a = { type: 'qcm', data: { id: 'x' } };
  const bSameType = { type: 'qcm', data: { id: 'y' } };
  const bSameId = { type: 'true_false', data: { id: 'x' } };
  const bNeither = { type: 'true_false', data: { id: 'y' } };
  if (!Exercises._clashes(a, bSameType)) err('_clashes : même type, id différent → devrait être un clash');
  if (!Exercises._clashes(a, bSameId)) err('_clashes : type différent, même id → devrait être un clash (régression du correctif)');
  if (Exercises._clashes(a, bNeither)) err('_clashes : type et id différents → ne devrait PAS être un clash');
  const mp = { type: 'match_pairs', pairs: [{ id: 'x' }, { id: 'z' }] };
  if (!Exercises._clashes(mp, a)) err('_clashes : match_pairs contenant "x" et qcm sur "x" → devrait être un clash');
}

// ── 1c. _antiRepeat : résout un clash d'id (type différent) quand une alternative existe ──
{
  const list = [
    { type: 'qcm', data: { id: 'x' } },
    { type: 'true_false', data: { id: 'x' } }, // clash d'id avec le précédent (types différents)
    { type: 'audio_qcm', data: { id: 'z' } },  // alternative valide
  ];
  const result = Exercises._antiRepeat(list);
  if (Exercises._clashes(result[0], result[1])) {
    err(`_antiRepeat n'a pas résolu un clash d'id résoluble : [${result.map(e => e.data.id).join(',')}]`);
  }
  // Vérifie qu'aucun exercice n'a été perdu ni ajouté (permutation pure).
  const before = list.map(e => e.data.id).sort().join(',');
  const after = result.map(e => e.data.id).sort().join(',');
  if (before !== after) err(`_antiRepeat a changé le contenu de la liste (attendu une permutation) : ${before} → ${after}`);
}

// ── 1d. _antiRepeat(list, precedingRef) : résout un clash à la FRONTIÈRE entre deux phases,
// sans jamais faire remonter un exercice de la phase suivante avant elle. Reproduit le cas réel
// u1_c2 : match_pairs "İyiyim" (fin de Pratique) → QCM "İyiyim" (début de Rappel), alors qu'un
// dialogue_fill non conflictuel est disponible juste après dans le Rappel.
{
  const lastOfPractice = { type: 'match_pairs', data: { id: 'v_iyiyim' }, pairs: [{ id: 'v_iyiyim' }, { id: 'v_merhaba' }, { id: 'v_evet' }, { id: 'v_hayir' }] };
  const recall = [
    { type: 'qcm', data: { id: 'v_iyiyim' } },       // clash avec lastOfPractice (même id)
    { type: 'dialogue_fill', data: { id: 'd_x' } },  // alternative non conflictuelle
  ];
  const result = Exercises._antiRepeat(recall, lastOfPractice);
  if (Exercises._clashes(result[0], lastOfPractice)) {
    err(`_antiRepeat(precedingRef) n'a pas résolu le clash de frontière u1_c2 (İyiyim) : premier du rappel = ${result[0].type}/${result[0].data.id}`);
  }
  if (result.length !== recall.length || !result.every(e => recall.includes(e))) {
    err('_antiRepeat(precedingRef) a modifié le contenu de la phase (attendu une permutation de `recall` seule, jamais un élément de `precedingRef`)');
  }
}

// ── 1e. match_pairs en DERNIÈRE position d'une phase, suivi (phase suivante) d'un exercice sur
// l'un de ses mots NON PREMIERS (le 3e ici) — doit aussi être détecté comme un clash.
{
  const lastOfPractice = { type: 'match_pairs', pairs: [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }] };
  const recall = [
    { type: 'qcm', data: { id: 'c' } },          // clash : "c" est le 3e mot du match_pairs, pas le 1er
    { type: 'true_false', data: { id: 'z' } },   // alternative non conflictuelle
  ];
  const result = Exercises._antiRepeat(recall, lastOfPractice);
  if (Exercises._clashes(result[0], lastOfPractice)) {
    err(`_antiRepeat(precedingRef) n'a pas détecté le clash sur le mot non-premier d'un match_pairs : premier du rappel = ${result[0].data.id}`);
  }
}

// ── 1f. Intégration réelle : generateForChapter CÂBLE bien `precedingRef` d'une phase à
// l'autre (1d/1e ne testent que `_antiRepeat` isolément — ils ne prouvent pas que
// generateForChapter l'appelle avec la bonne référence). Reproduit le cas cité par Codex sur
// u1_c2 : `v_iyiyim` (requis, donc TOUJOURS présent, et TOUJOURS en position 1 de l'échantillon
// puisque `requiredVocabIds` est placé en tête sans mélange) atterrit systématiquement dans le
// Rappel via son QCM (règle `i % 5 === 1`) — donc dès que le `match_pairs` de fin de Pratique
// contient aussi "İyiyim", la frontière Pratique→Rappel est un cas réel et reproductible.
{
  const RUNS3 = 400;
  let applicable = 0, boundaryClash = 0;
  for (let r = 0; r < RUNS3; r++) {
    const list = Exercises.generateForChapter('u1_c2');
    const practice = list.filter(e => e.phase === 'practice');
    const recall = list.filter(e => e.phase === 'recall');
    if (practice.length === 0 || recall.length === 0) continue;
    const lastPractice = practice[practice.length - 1];
    if (lastPractice.type !== 'match_pairs') continue;
    if (!Exercises._contentIds(lastPractice).includes('v_iyiyim')) continue;
    applicable++;
    if (Exercises._clashes(recall[0], lastPractice)) boundaryClash++;
  }
  if (applicable === 0) {
    err('test 1f : jamais reproduit le cas (match_pairs contenant "İyiyim" en fin de Pratique d\'u1_c2) sur 400 passes — le test ne prouve plus rien, à revoir.');
  } else if (boundaryClash > 0) {
    err(`generateForChapter("u1_c2") : la frontière Pratique→Rappel reteste encore "İyiyim" sur ${boundaryClash}/${applicable} cas reproduits (dialogue_fill était pourtant disponible).`);
  }
}

// ── 2. generateForChapter(chapterId, avoidDataIds) : cas réel signalé, u11_c1 → u11_c2 ──
// (u11_c2.vocabIds = ['v_bugun','v_dun','v_aksam','v_sabah'], quasi identique à u11_c1 —
// exactement le couple de chapitres où le mot "Dün" a été vu répété par l'utilisateur).
const RUNS = 300;
let stillHit = 0;
for (let r = 0; r < RUNS; r++) {
  const first = Exercises.generateForChapter('u11_c1').filter(e => !e.isTeaching);
  const last = first[first.length - 1];
  const avoidIds = last ? Exercises._contentIds(last) : [];
  if (avoidIds.length === 0) continue;
  const second = Exercises.generateForChapter('u11_c2', avoidIds).filter(e => !e.isTeaching);
  const firstOfSecond = second[0];
  if (firstOfSecond && Exercises._contentIds(firstOfSecond).some(id => avoidIds.includes(id))) stillHit++;
}
if (stillHit > 0) {
  err(`generateForChapter("u11_c2", avoidIds) reteste encore un mot du dernier exercice sur ${stillHit}/${RUNS} passes — l'enchaînement direct devrait l'éviter.`);
}

// ── 2b. avoidDataIds protège les 4 mots d'un dernier match_pairs, pas seulement le 1er ──
// (déterministe : sandbox le temps du test, AppUnits et le chapitre sont remplacés localement).
let matchPairsHit = 0;
{
  const RUNS2 = 200;
  const origFind = sandbox.AppUnits.flatMap(u => u.chapters).find(c => c.id === 'u11_c2');
  for (let r = 0; r < RUNS2; r++) {
    // Un dernier exercice fictif : match_pairs sur 4 mots RÉELS d'u11_c2 (garantit qu'ils
    // peuvent effectivement réapparaître dans sa propre génération si mal protégés).
    const fourIds = (origFind.vocabIds || []).slice(0, 4);
    if (fourIds.length < 4) break;
    const fakeLast = { type: 'match_pairs', pairs: fourIds.map(id => ({ id })) };
    const avoidIds = Exercises._contentIds(fakeLast);
    const gen = Exercises.generateForChapter('u11_c2', avoidIds).filter(e => !e.isTeaching);
    const firstOfGen = gen[0];
    if (firstOfGen && Exercises._contentIds(firstOfGen).some(id => avoidIds.includes(id))) matchPairsHit++;
  }
  if (matchPairsHit > 0) {
    err(`avoidDataIds (4 mots d'un match_pairs) : ${matchPairsHit}/${RUNS2} passes retestent encore un des 4 mots en tête — un seul id protégé au lieu de 4 ?`);
  }
}

console.log('─'.repeat(56));
console.log('TürkçeYol — anti-répétition (mot/verbe, frontières de phase, match_pairs)');
console.log('─'.repeat(56));
console.log(`u11_c1 → u11_c2 (avoidDataIds) : ${RUNS} passes, ${stillHit} retest immédiat.`);
console.log(`avoidDataIds sur un match_pairs à 4 mots : ${matchPairsHit} retest immédiat.`);
console.log('─'.repeat(56));
if (errors.length) {
  console.log(`\n❌ ${errors.length} PROBLÈME(S) :`);
  for (const e of errors) console.log('   ✗ ' + e);
  process.exit(1);
}
console.log('\n✅ Anti-répétition par mot/verbe et enchaînement direct entre leçons corrects.');
process.exit(0);
