#!/usr/bin/env node
/* ═══════════════════════════════════════════════
   TürkçeYol — tools/verify-streak.js  (v10 AXE 6.4)
   Simule des séquences de jours (horloge pilotée, sans dépendre de l'heure
   réelle de la machine) pour vérifier que la série (streak) se comporte
   correctement, hors runtime, sans navigateur :
     • des jours consécutifs avec l'objectif atteint font monter la série ;
     • LE BUG CIBLÉ : ouvrir l'app un jour SANS atteindre l'objectif ne doit
       plus, à lui seul, empêcher la rupture de série au jour suivant —
       avant le correctif, `lastSessionDate` (dernière OUVERTURE) avançait
       d'un jour à chaque ouverture, et la rupture ne se basait que sur cet
       écart, qui ne dépassait donc jamais 1 ;
     • un seul jour manqué + un gel disponible préserve la série et
       consomme le gel ;
     • le mode pause (v8 AXE 3.2) neutralise complètement les jours sautés ;
     • une session à 00h30 heure locale compte pour le BON jour (et non la
       veille, comme le ferait `toISOString()`, qui raisonne en UTC) ;
     • migration d'une ancienne sauvegarde : si le suffixe "_goal_met" est
       encore intact, la date est récupérée sans casser la série pour
       rien ; s'il a déjà été perdu par l'ANCIEN bug lui-même (une simple
       ouverture de l'app, un jour sans jouer, l'effaçait avant même ce
       correctif), la série est remise à 0 une seule fois plutôt que de
       rester gelée indéfiniment ou repartir artificiellement plus tard.

   Usage : node tools/verify-streak.js
   Sortie : 0 si tous les scénarios passent, 1 sinon.
   Ne fait AUCUNE écriture, ne touche à AUCUN code runtime.
   ═══════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const errors = [];
const err = (m) => errors.push(m);

// Horloge simulée, pilotable depuis ce script — injectée à la place de Date dans le sandbox.
let FAKE_NOW = new Date();
class FakeDate extends Date {
  constructor(...args) {
    if (args.length === 0) { super(FAKE_NOW.getTime()); }
    else { super(...args); }
  }
  static now() { return FAKE_NOW.getTime(); }
}
function setDay(y, m, d, h = 10, mi = 0) { FAKE_NOW = new Date(y, m - 1, d, h, mi, 0); }

// `oldSave` (optionnel) : simule une sauvegarde DÉJÀ présente dans localStorage avant le
// premier appel à State.init() — indispensable pour tester une migration, puisque init()
// appelle checkNewDay() lui-même dès le chargement (le simuler en mutant state.data APRÈS
// coup manquerait ce tout premier appel, celui qui déclenche réellement la migration).
function makeState(oldSave) {
  const store = {};
  if (oldSave) store['turkceyol_data'] = JSON.stringify(oldSave);
  const sandbox = {
    Date: FakeDate,
    Math, JSON,
    console: { log: () => {} }, // state.js logge tout State.data à l'init, on le tait ici
    localStorage: {
      getItem: (k) => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = v; }
    }
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  const p = path.join(ROOT, 'js/state.js');
  if (!fs.existsSync(p)) { err('Fichier manquant : js/state.js'); return null; }
  try {
    vm.runInContext(fs.readFileSync(p, 'utf8'), sandbox, { filename: 'js/state.js' });
  } catch (e) {
    err(`js/state.js : erreur de parsing/exécution → ${e.message}`);
    return null;
  }
  // state.js déclare `const State` en haut de fichier — une liaison lexicale de script,
  // jamais une propriété de l'objet global (ni dans un vrai navigateur, ni dans vm) : on la
  // récupère explicitement pour pouvoir la piloter depuis ce script.
  const State = vm.runInContext('State', sandbox);
  State.init();
  return State;
}

function openApp(state) { state.checkNewDay(); }
function meetGoal(state) { state.addXP(state.data.dailyGoal); }

function check(scenario, actual, expected) {
  if (actual !== expected) {
    err(`${scenario} : attendu ${JSON.stringify(expected)}, obtenu ${JSON.stringify(actual)}`);
  }
}

let scenarioCount = 0;

// 1) Jours consécutifs avec objectif atteint → la série monte sans coupure.
{
  scenarioCount++;
  const s = makeState();
  if (s) {
    setDay(2026, 1, 1); openApp(s); meetGoal(s);
    check('S1 jour1', s.data.streak, 1);
    setDay(2026, 1, 2); openApp(s); meetGoal(s);
    check('S1 jour2 consécutif', s.data.streak, 2);
    setDay(2026, 1, 3); openApp(s); meetGoal(s);
    check('S1 jour3 consécutif', s.data.streak, 3);
  }
}

// 2) LE BUG CIBLÉ : ouvrir l'app un jour sans atteindre l'objectif ne doit pas, à lui seul,
// empêcher la rupture de série au jour suivant.
{
  scenarioCount++;
  const s = makeState();
  if (s) {
    setDay(2026, 1, 1); openApp(s); meetGoal(s);
    check('S2 jour1', s.data.streak, 1);
    setDay(2026, 1, 2); openApp(s); // ouverture SANS atteindre l'objectif
    check('S2 jour2 (ouvert, rien fait)', s.data.streak, 1);
    setDay(2026, 1, 3); openApp(s); // 2 jours sans objectif depuis le dernier succès
    check('S2 jour3 (streak doit être cassée)', s.data.streak, 0);
  }
}

// 3) Un seul jour manqué + gel disponible → série préservée, gel consommé.
{
  scenarioCount++;
  const s = makeState();
  if (s) {
    setDay(2026, 1, 1); openApp(s); meetGoal(s);
    s.data.streakFreezes = 1;
    setDay(2026, 1, 2); openApp(s); // jour manqué
    setDay(2026, 1, 3); openApp(s); // 2 jours d'écart → gel consommé
    check('S3 streak préservée par le gel', s.data.streak, 1);
    check('S3 gel consommé', s.data.streakFreezes, 0);
    meetGoal(s);
    check('S3 streak repart normalement', s.data.streak, 2);
  }
}

// 4) Mode pause : aucun jour passé en pause ne compte contre la série, même sur plusieurs
// jours d'affilée.
{
  scenarioCount++;
  const s = makeState();
  if (s) {
    setDay(2026, 1, 1); openApp(s); meetGoal(s);
    s.setStreakPaused(true);
    setDay(2026, 1, 2); openApp(s);
    setDay(2026, 1, 5); openApp(s); // plusieurs jours sautés, en pause
    check('S4 streak intacte pendant la pause', s.data.streak, 1);
    s.setStreakPaused(false);
    setDay(2026, 1, 6); openApp(s); meetGoal(s);
    check('S4 streak reprend après réactivation', s.data.streak, 2);
  }
}

// 5) Date locale vs UTC : une session à 00h30 heure locale doit compter pour le jour qui
// vient de commencer, pas pour la veille (anti-régression du bug toISOString/UTC).
{
  scenarioCount++;
  const s = makeState();
  if (s) {
    setDay(2026, 1, 1, 23, 50); openApp(s); meetGoal(s);
    setDay(2026, 1, 2, 0, 30); // 40 minutes plus tard, nouveau jour LOCAL déjà commencé
    openApp(s); meetGoal(s);
    check('S5 session 00h30 locale = bon jour', s.data.streak, 2);
  }
}

// 6) Migration — CAS POSITIF : une ancienne sauvegarde a encore le suffixe "_goal_met"
// intact dans lastSessionDate. Le tout premier appel à State.init() (qui déclenche lui-même
// checkNewDay) doit récupérer cette date dans lastGoalMetDate, sans casser la série pour rien.
{
  scenarioCount++;
  setDay(2026, 1, 6); // "aujourd'hui" au moment du tout premier chargement de la sauvegarde
  const s = makeState({ streak: 3, lastSessionDate: '2026-01-05_goal_met' });
  if (s) {
    check('S6 migration positive : lastGoalMetDate récupérée', s.data.lastGoalMetDate, '2026-01-05');
    check('S6 migration positive : streak NON réinitialisée', s.data.streak, 3);
    meetGoal(s);
    check('S6 migration positive : streak continue normalement', s.data.streak, 4);
  }
}

// 7) Migration — CAS PIÉGÉ (trouvé en relecture externe, Codex) : le suffixe "_goal_met" a
// DÉJÀ été perdu par l'ANCIEN bug lui-même, avant même que ce correctif n'existe (une simple
// ouverture un jour sans jouer écrasait "date_goal_met" par "date" nu). Il n'y a alors plus
// aucune date de dernier objectif récupérable, alors que la série affichée est non nulle :
// impossible de reconstruire fidèlement, donc remise à 0 une seule fois plutôt que de
// laisser la série gelée indéfiniment ou repartir artificiellement plus tard.
{
  scenarioCount++;
  setDay(2026, 1, 10); // "aujourd'hui" au moment du tout premier chargement de la sauvegarde
  const s = makeState({ streak: 5, lastSessionDate: '2026-01-06' }); // suffixe déjà perdu
  if (s) {
    check('S7 migration piégée : streak remise à 0', s.data.streak, 0);
    check('S7 migration piégée : lastGoalMetDate reste vide (rien à récupérer)', s.data.lastGoalMetDate, null);
    // La migration ne doit s'exécuter qu'UNE fois : un streak reconstitué ensuite ne doit
    // plus jamais être remis à 0 par cette même logique.
    setDay(2026, 1, 11); openApp(s); meetGoal(s);
    setDay(2026, 1, 12); openApp(s); meetGoal(s);
    check('S7 après migration : la série se reconstruit normalement', s.data.streak, 2);
  }
}

console.log('─'.repeat(56));
console.log('TürkçeYol — vérification de la série (streak, v10 AXE 6.4)');
console.log('─'.repeat(56));
console.log(`Scénarios simulés : ${scenarioCount}`);
console.log('─'.repeat(56));

if (errors.length) {
  console.log(`\n❌ ${errors.length} PROBLÈME(S) :`);
  for (const e of errors) console.log('   ✗ ' + e);
  console.log('\nVérification ÉCHOUÉE.');
  process.exit(1);
}

console.log('\n✅ Tous les scénarios de streak se comportent comme attendu.');
process.exit(0);
