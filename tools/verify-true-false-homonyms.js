#!/usr/bin/env node
/* ═══════════════════════════════════════════════
   TürkçeYol — tools/verify-true-false-homonyms.js  (v10 AXE 6.6)
   Vérifie, hors runtime, qu'un mot turc qui a plusieurs entrées de vocabulaire
   (homonymes, ex. "Yüz" = cent / visage) ne peut jamais faire déclarer un de
   ses sens valides comme incorrect par le moteur d'exercices :
     • détecte dynamiquement TOUS les groupes d'homonymes présents dans
       AppVocabulary (même `tr`, entrées différentes) — jamais une liste
       d'ids figée, pour rester valable si d'autres homonymes sont ajoutés ;
     • Vrai/Faux (createTrueFalse) : ne doit jamais proposer la traduction
       d'un AUTRE membre du même groupe avec la réponse « Faux » ;
     • QCM (getSmartDistractors, utilisé par createQCMTrFr/FrTr et
       createAudioQCM) : les distracteurs d'un mot ne doivent jamais inclure
       un autre membre de son propre groupe d'homonymes ;
     • Associer les paires (createMatchPairs) : deux membres du même groupe
       d'homonymes ne doivent jamais apparaître ensemble dans le même
       exercice (deux cartes affichant le même mot turc seraient impossibles
       à associer avec certitude).

   Usage : node tools/verify-true-false-homonyms.js
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
const AppVocabulary = sandbox.AppVocabulary || [];

if (!Exercises || typeof Exercises.createTrueFalse !== 'function') {
  console.log('❌ window.Exercises.createTrueFalse introuvable.');
  process.exit(1);
}

// ── Détection dynamique des groupes d'homonymes (même `tr`, ≥2 entrées) ──
const byTr = new Map();
for (const w of AppVocabulary) {
  const key = w.tr.toLocaleLowerCase('tr-TR');
  if (!byTr.has(key)) byTr.set(key, []);
  byTr.get(key).push(w);
}
const homonymGroups = [...byTr.values()].filter(group => group.length > 1);

if (homonymGroups.length === 0) {
  console.log('⚠️  Aucun groupe d\'homonymes détecté dans AppVocabulary — rien à vérifier.');
}

const RUNS = 200; // Vrai/Faux est aléatoire (50/50 + distracteur aléatoire) : beaucoup de tirages
let checked = 0;

for (const group of homonymGroups) {
  const validFr = new Set(group.map(w => w.fr));
  const groupIds = new Set(group.map(w => w.id));

  for (const word of group) {
    // Vrai/Faux
    for (let i = 0; i < RUNS; i++) {
      const ex = Exercises.createTrueFalse(word);
      checked++;
      if (ex.answer === 'Faux' && validFr.has(ex.proposed)) {
        err(`Vrai/Faux — "${word.tr}" (${word.id}, sens attendu "${word.fr}") : propose "${ex.proposed}" ` +
            `et répond "Faux", alors que c'est un sens valide de ce même mot turc (homonyme "${group.find(w => w.fr === ex.proposed).id}").`);
        break;
      }
    }

    // QCM — les distracteurs ne doivent jamais inclure un autre membre du groupe
    for (let i = 0; i < RUNS; i++) {
      const distractorsFr = Exercises.getSmartDistractors(word, 3, 'fr');
      checked++;
      const collision = distractorsFr.find(fr => validFr.has(fr) && fr !== word.fr);
      if (collision) {
        err(`QCM (getSmartDistractors, champ "fr") — "${word.tr}" (${word.id}) : distracteur "${collision}" ` +
            `est un sens valide du même mot turc (homonyme du groupe).`);
        break;
      }
    }
  }

  // Associer les paires — deux membres du même groupe ne doivent jamais co-apparaître.
  // Le remplissage doit couvrir des thèmes DIFFÉRENTS (au plus 1 mot par thème) : sinon
  // createMatchPairs choisit déterministement un groupe de 4 mots du même thème et ne
  // retombe jamais sur le tirage global où la collision peut se produire — ce qui masquerait
  // le bug au lieu de le vérifier (piège rencontré en écrivant ce test).
  if (group.length >= 2) {
    const seenTopics = new Set(group.map(w => w.topic));
    const filler = [];
    for (const w of AppVocabulary) {
      if (groupIds.has(w.id) || seenTopics.has(w.topic)) continue;
      seenTopics.add(w.topic);
      filler.push(w);
      if (filler.length >= 4) break;
    }
    const pool = [...group, ...filler];
    for (let i = 0; i < RUNS; i++) {
      const mp = Exercises.createMatchPairs(pool);
      checked++;
      if (!mp) continue;
      const idsInPairs = mp.pairs.map(p => p.id);
      const groupMembersPresent = idsInPairs.filter(id => groupIds.has(id));
      if (groupMembersPresent.length > 1) {
        err(`Associer les paires — le groupe d'homonymes "${group[0].tr}" apparaît ${groupMembersPresent.length} ` +
            `fois dans le même exercice (ids : ${groupMembersPresent.join(', ')}) — deux cartes identiques, ` +
            `association impossible à deviner avec certitude.`);
        break;
      }
    }
  }
}

console.log('─'.repeat(56));
console.log('TürkçeYol — vérification Vrai/Faux et homonymes (v10 AXE 6.6)');
console.log('─'.repeat(56));
console.log(`Groupes d'homonymes détectés : ${homonymGroups.length} · Exercices générés : ${checked}`);
console.log('─'.repeat(56));

if (errors.length) {
  console.log(`\n❌ ${errors.length} PROBLÈME(S) :`);
  for (const e of errors) console.log('   ✗ ' + e);
  console.log('\nVérification ÉCHOUÉE.');
  process.exit(1);
}

console.log('\n✅ Aucun exercice Vrai/Faux ne déclare "Faux" un sens pourtant correct.');
process.exit(0);
