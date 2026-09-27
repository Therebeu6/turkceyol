#!/usr/bin/env node
/* ═══════════════════════════════════════════════
   TürkçeYol — tools/verify-globals.js
   Vérification statique : tout objet de l'app lu via `window.X` doit être
   réellement assigné par `window.X = ...` quelque part dans js/.

   Pourquoi : un `const X = {...}` au niveau racine d'un <script> classique
   n'est PAS une propriété de window. `State` et `App` étaient dans ce cas :
   tous les tests `window.State && ...` valaient false dans le navigateur
   (révision SRS vide, densité de session et favoris ignorés, sons coupés...),
   alors que les outils Node, qui injectent State dans leur sandbox, passaient.

   Usage : node tools/verify-globals.js — sortie 0 si OK, 1 sinon.
   ═══════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BROWSER = new Set(['AudioContext', 'SpeechRecognition', 'SpeechSynthesisUtterance']);

const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.js')) files.push(p);
  }
})(path.join(ROOT, 'js'));

const read = new Map();   // X -> premier fichier qui lit window.X
const assigned = new Set();
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  for (const m of src.matchAll(/window\.([A-Z][A-Za-z0-9_]*)\s*=(?!=)/g)) assigned.add(m[1]);
  for (const m of src.matchAll(/window\.([A-Z][A-Za-z0-9_]*)/g)) {
    if (!read.has(m[1])) read.set(m[1], path.relative(ROOT, f));
  }
}

const missing = [...read.keys()].filter(x => !BROWSER.has(x) && !assigned.has(x));
console.log('─'.repeat(56));
console.log('TürkçeYol — globaux window.* réellement exposés');
console.log('─'.repeat(56));
console.log(`Fichiers : ${files.length} · globaux lus via window.* : ${read.size} · assignés : ${assigned.size}`);
if (missing.length) {
  console.log(`\n❌ ${missing.length} global(aux) lu(s) via window.* mais jamais assigné(s) :`);
  for (const x of missing) console.log(`   ✗ window.${x} (lu dans ${read.get(x)}) — ajouter \`window.${x} = ${x};\``);
  process.exit(1);
}
console.log('\n✅ Chaque window.* lu par l\'app est bien assigné.');
process.exit(0);
