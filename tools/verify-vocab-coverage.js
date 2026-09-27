#!/usr/bin/env node
/* ═══════════════════════════════════════════════
   TürkçeYol — tools/verify-vocab-coverage.js  (v10 AXE 5.2)
   Couverture du vocabulaire par le parcours :
   - chaque mot de AppVocabulary est soit rattaché à au moins un chapitre
     (`vocabIds`), soit listé ci-dessous comme VOLONTAIREMENT hors parcours,
     avec sa justification — jamais orphelin « par oubli » ;
   - la liste ne peut pas vieillir : un mot listé qui devient rattaché, ou un id
     listé qui n'existe plus, fait échouer l'outil ;
   - chaque mot rattaché est réellement enseignable : sur un profil neuf, il
     reçoit une carte de découverte dans son premier chapitre (sur N passes).

   Usage : node tools/verify-vocab-coverage.js — sortie 0 si OK, 1 sinon.
   ═══════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Mots laissés dans l'onglet Vocabulaire (dictionnaire), sans chapitre : aucun chapitre
// existant n'en fait un emplacement thématique ET de niveau cohérent. Les y forcer
// gonflerait des leçons sans rapport avec leur objectif.
const OFF_PATH = {
  'animaux — aucun chapitre sur les animaux (choix assumé de la roadmap)': [
    'v_kopek', 'v_kedi', 'v_kus', 'v_at', 'v_inek', 'v_tavsan', 'v_fare', 'v_aslan', 'v_fil',
    'v_maymun', 'v_kaplumbaga', 'v_yilan'],
  'nature — aucun chapitre nature/paysages (choix assumé de la roadmap)': [
    'v_orman', 'v_plaj', 'v_deniz', 'v_gol', 'v_nehir', 'v_agac', 'v_cicek', 'v_yaprak', 'v_cim',
    'v_kaya', 'v_yildiz', 'v_gokyuzu', 'v_bulut', 'v_firtina'],
  'formes géométriques — aucun chapitre ne décrit des formes (choix assumé de la roadmap)': [
    'v_yuvarlak', 'v_kare', 'v_ucgen', 'v_dikdortgen'],
  'adjectifs de texture/dimension sans situation de communication dans le parcours': [
    'v_sert', 'v_yumusak', 'v_kalin', 'v_derin', 'v_sig', 'v_canli', 'v_olu'],
  'vêtements et accessoires secondaires — u7_c2 reçoit déjà les 5 essentiels, u13_c1 manteau/écharpe': [
    'v_kravat', 'v_kemer', 'v_eldiven', 'v_terlik', 'v_bot', 'v_pijama', 'v_takim_elbise', 'v_sort',
    'v_bluz', 'v_yelek', 'v_gozluk', 'v_kol_saati', 'v_mayo'],
  'école et bureau spécialisés — aucun chapitre école/études ; u2_c4 reçoit les mots de métier utiles': [
    'v_calisma', 'v_meslektas', 'v_proje', 'v_klavye', 'v_defter', 'v_ders', 'v_sinav', 'v_not',
    'v_yonetici', 'v_okul_cantasi'],
  'conduite et transport maritime — aucun chapitre voiture/port ; u17_c1 reçoit ferry/tram/station': [
    'v_motosiklet', 'v_gemi', 'v_benzin', 'v_hiz_transport', 'v_tunel', 'v_liman', 'v_yakit'],
  'anatomie hors besoins de consultation (cerveau, os)': ['v_beyin', 'v_kemik'],
  '« Karı » seul peut sonner familier/péjoratif : la forme neutre « Eş » (v_es) est enseignée en u4_c1': ['v_karim'],
  '« Karşıda » : quasi-doublon de « Karşısında », déjà enseigné en u5_c2/u5_c4': ['v_karsida'],
  '« Çok daha » : tournure comparative, pas un mot isolé à enseigner sur carte': ['v_cok_daha'],
  '« Çatı » (toit) : aucun chapitre maison ne décrit l\'extérieur du bâtiment': ['v_cati'],
  '« Saniye » : u3_c1 (l\'heure) est déjà le chapitre le plus chargé (17 mots), dakika y suffit': ['v_saniye'],
};

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
const { Exercises, AppUnits, AppVocabulary } = sandbox;
const vocabIds = new Set(AppVocabulary.map(w => w.id));

const firstChapter = new Map();
for (const u of AppUnits) for (const c of u.chapters) for (const id of (c.vocabIds || [])) {
  if (!firstChapter.has(id)) firstChapter.set(id, c);
}

const offPath = new Map();
for (const [reason, ids] of Object.entries(OFF_PATH)) {
  for (const id of ids) {
    if (!vocabIds.has(id)) err(`hors parcours : "${id}" n'existe pas dans AppVocabulary`);
    if (firstChapter.has(id)) err(`hors parcours : "${id}" est pourtant rattaché à "${firstChapter.get(id).id}" — le retirer de la liste`);
    if (offPath.has(id)) err(`hors parcours : "${id}" listé deux fois`);
    offPath.set(id, reason);
  }
}
for (const w of AppVocabulary) {
  if (!firstChapter.has(w.id) && !offPath.has(w.id)) {
    err(`mot orphelin non justifié : "${w.id}" (${w.tr}) — le rattacher à un chapitre ou le documenter dans OFF_PATH`);
  }
}

// Enseignabilité réelle : chaque mot rattaché reçoit une carte dans son premier chapitre.
// L'échantillon étant aléatoire (5 mots en densité normale), on multiplie les passes.
const RUNS = 150;
const taught = new Set();
const byChapter = new Map();
for (const [id, c] of firstChapter) {
  if (!byChapter.has(c.id)) byChapter.set(c.id, []);
  byChapter.get(c.id).push(id);
}
for (const [cid, ids] of byChapter) {
  const missing = new Set(ids);
  for (let run = 0; run < RUNS && missing.size > 0; run++) {
    for (const s of Exercises.generateForChapter(cid)) {
      if (s.type === 'intro_card' && !s.isVerb && !s.isPhrase) { missing.delete(s.data.id); taught.add(s.data.id); }
    }
  }
  for (const id of missing) err(`"${id}" n'a jamais reçu de carte dans son premier chapitre "${cid}" sur ${RUNS} passes`);
}

console.log('─'.repeat(56));
console.log('TürkçeYol — couverture du vocabulaire (v10 AXE 5.2)');
console.log('─'.repeat(56));
console.log(`Mots : ${AppVocabulary.length} · rattachés : ${firstChapter.size} · réellement présentés : ${taught.size} · hors parcours documentés : ${offPath.size}`);
console.log('─'.repeat(56));
if (errors.length) {
  console.log(`\n❌ ${errors.length} PROBLÈME(S) :`);
  for (const e of errors.slice(0, 40)) console.log('   ✗ ' + e);
  process.exit(1);
}
console.log('\n✅ Chaque mot est enseigné par le parcours ou volontairement laissé au dictionnaire, avec justification.');
process.exit(0);
