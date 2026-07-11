#!/usr/bin/env node
/* Injecte les exemples produits par les agents dans js/data/vocabulary.js.
   Lit scratchpad/examples_batch*.json, merge, insère `example: {tr, fr}` sur
   chaque ligne de mot qui n'en a pas encore. N'écrase JAMAIS un example existant.
   Usage : node tools/inject-examples.js <dossier_scratchpad> */

const fs = require('fs');
const path = require('path');

const scratch = process.argv[2];
if (!scratch) { console.error('Usage: node tools/inject-examples.js <scratchpad_dir>'); process.exit(1); }

const VOCAB = path.resolve(__dirname, '..', 'js', 'data', 'vocabulary.js');
const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");

// 1. Merge des batchs JSON
const map = {};
let batches = 0;
for (const f of fs.readdirSync(scratch)) {
  if (!/^examples_batch\d+\.json$/.test(f)) continue;
  batches++;
  const obj = JSON.parse(fs.readFileSync(path.join(scratch, f), 'utf8'));
  for (const [id, ex] of Object.entries(obj)) {
    if (!ex || !ex.tr || !ex.fr) { console.warn(`  ⚠️ ${id} : example incomplet, ignoré`); continue; }
    if (map[id]) console.warn(`  ⚠️ ${id} : présent dans 2 batchs, on garde le 1er`);
    else map[id] = ex;
  }
}
console.log(`${batches} batch(s), ${Object.keys(map).length} exemples à injecter.`);

// 2. Injection ligne par ligne
const lines = fs.readFileSync(VOCAB, 'utf8').split('\n');
let injected = 0, skippedExisting = 0;
const used = new Set();
const out = lines.map((line) => {
  const m = line.match(/id:\s*'([^']+)'/);
  if (!m) return line;
  const id = m[1];
  if (!map[id]) return line;
  if (/example\s*:/.test(line)) { skippedExisting++; return line; } // ne jamais écraser
  const ex = map[id];
  const repl = `, example: { tr: '${esc(ex.tr)}', fr: '${esc(ex.fr)}' } }$1`;
  const newLine = line.replace(/\s*\}(\s*,?)\s*$/, repl);
  if (newLine === line) { console.warn(`  ⚠️ ${id} : motif de ligne non reconnu, non modifié`); return line; }
  injected++; used.add(id);
  return newLine;
});

// 3. Ids fournis mais non injectés (déjà un example, ou introuvables)
const notFound = Object.keys(map).filter(id => !used.has(id));
if (notFound.length) console.warn(`  ⚠️ ${notFound.length} id(s) fournis mais non injectés (déjà un example, ou introuvables) : ${notFound.slice(0,10).join(', ')}${notFound.length>10?'…':''}`);

fs.writeFileSync(VOCAB, out.join('\n'));
console.log(`✅ ${injected} exemples injectés · ${skippedExisting} lignes déjà pourvues (préservées).`);
