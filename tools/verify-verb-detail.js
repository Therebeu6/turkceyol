#!/usr/bin/env node
/* ═══════════════════════════════════════════════
   TürkçeYol — tools/verify-verb-detail.js  (v10 AXE 6.2)
   Vérifie, hors navigateur, que la fiche détail d'un verbe
   (js/views/verbs.js, Verbs.showDetail) n'affiche QUE les sections de
   temps/négation que ce verbe possède réellement :
     • un verbe à couverture complète (aoriste, passé narratif,
       négations présent/passé/futur) doit afficher les 5 sections
       optionnelles correspondantes ;
     • un verbe sans aoriste ni passé narratif, avec seulement la
       négation présente, ne doit afficher QUE cette section-là — pas
       de section vide, pas de "-" à la place d'une vraie forme.

   Simule un DOM minimal (getElementById → objets avec classList/
   innerHTML), exécute js/data/verbs.js puis js/views/verbs.js dans un
   contexte vm, et appelle Verbs.showDetail(id) directement.

   Usage : node tools/verify-verb-detail.js
   Sortie : 0 si tout est cohérent, 1 sinon.
   Ne fait AUCUNE écriture, ne touche à AUCUN code runtime.
   ═══════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const errors = [];
const err = (m) => errors.push(m);

function makeEl(id) {
  return {
    id,
    classList: {
      set: new Set(['hidden']),
      add(c) { this.set.add(c); },
      remove(c) { this.set.delete(c); },
      contains(c) { return this.set.has(c); }
    },
    innerHTML: '',
    textContent: ''
  };
}

function loadVerbsView() {
  const elements = {};
  const ids = [
    'vm-title', 'vm-fr', 'vm-note', 'vm-pres', 'vm-past', 'vm-fut',
    'vm-aorist-section', 'vm-aorist', 'vm-narr-section', 'vm-narr',
    'vm-neg-pres-section', 'vm-neg-pres', 'vm-neg-past-section', 'vm-neg-past',
    'vm-neg-fut-section', 'vm-neg-fut', 'verb-modal'
  ];
  ids.forEach(id => { elements[id] = makeEl(id); });

  const sandbox = {
    console: { log: () => {} },
    document: { getElementById: (id) => elements[id] || makeEl(id) },
    State: { data: { reviewQueue: [] } },
    App: { isFavorite: () => false },
    SRS: { getMasteryLevel: () => 0 }
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);

  const dataPath = path.join(ROOT, 'js/data/verbs.js');
  const viewPath = path.join(ROOT, 'js/views/verbs.js');
  if (!fs.existsSync(dataPath) || !fs.existsSync(viewPath)) {
    err('Fichier manquant : js/data/verbs.js ou js/views/verbs.js');
    return null;
  }
  try {
    vm.runInContext(fs.readFileSync(dataPath, 'utf8'), sandbox, { filename: 'js/data/verbs.js' });
    vm.runInContext(fs.readFileSync(viewPath, 'utf8'), sandbox, { filename: 'js/views/verbs.js' });
  } catch (e) {
    err(`Erreur de parsing/exécution → ${e.message}`);
    return null;
  }

  const Verbs = vm.runInContext('Verbs', sandbox);
  const AppVerbs = vm.runInContext('AppVerbs', sandbox);
  return { Verbs, AppVerbs, elements };
}

const loaded = loadVerbsView();

const OPTIONAL_SECTIONS = [
  'vm-aorist-section', 'vm-narr-section',
  'vm-neg-pres-section', 'vm-neg-past-section', 'vm-neg-fut-section'
];

function check(scenario, id, expectedShown) {
  if (!loaded) return;
  const { Verbs, AppVerbs, elements } = loaded;
  const verb = AppVerbs.find(v => v.id === id);
  if (!verb) { err(`${scenario} : verbe "${id}" introuvable dans AppVerbs`); return; }

  Verbs.showDetail(id);

  for (const sectionId of OPTIONAL_SECTIONS) {
    const shown = !elements[sectionId].classList.contains('hidden');
    const expected = expectedShown.includes(sectionId);
    if (shown !== expected) {
      err(`${scenario} (${id}) : section "${sectionId}" ${shown ? 'affichée' : 'masquée'}, attendu ${expected ? 'affichée' : 'masquée'}`);
    }
  }
}

// 1) Verbe à couverture complète : aoriste, passé narratif, et les 3 négations existent
//    réellement (vérifié dynamiquement plutôt que supposé) → les 5 sections s'affichent.
{
  const full = loaded && loaded.AppVerbs.find(v =>
    v.conjugations.aorist && v.conjugations.pastNarrative &&
    v.negations && v.negations.present && v.negations.past && v.negations.future
  );
  if (!full) {
    err('Aucun verbe à couverture complète (aoriste + passé narratif + 3 négations) trouvé pour le scénario 1 — vérifier les données.');
  } else {
    check('S1 couverture complète', full.id, OPTIONAL_SECTIONS);
  }
}

// 2) Verbe minimal : aucun aoriste, aucun passé narratif, seule la négation présente existe
//    (cas réel : vb_kapatmak) → SEULE la section négation-présent doit s'afficher.
{
  const minimal = loaded && loaded.AppVerbs.find(v =>
    !v.conjugations.aorist && !v.conjugations.pastNarrative &&
    v.negations && v.negations.present && !v.negations.past && !v.negations.future
  );
  if (!minimal) {
    err('Aucun verbe minimal (ni aoriste ni passé narratif, seule négation présente) trouvé pour le scénario 2 — vérifier les données.');
  } else {
    check('S2 couverture minimale', minimal.id, ['vm-neg-pres-section']);
  }
}

console.log('─'.repeat(56));
console.log('TürkçeYol — vérification de la fiche verbe (v10 AXE 6.2)');
console.log('─'.repeat(56));

if (errors.length) {
  console.log(`\n❌ ${errors.length} PROBLÈME(S) :`);
  for (const e of errors) console.log('   ✗ ' + e);
  console.log('\nVérification ÉCHOUÉE.');
  process.exit(1);
}

console.log('\n✅ La fiche verbe n\'affiche que les temps/négations réellement disponibles.');
process.exit(0);
