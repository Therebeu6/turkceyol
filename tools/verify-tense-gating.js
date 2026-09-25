#!/usr/bin/env node
/* ═══════════════════════════════════════════════
   TürkçeYol — tools/verify-tense-gating.js  (v10 AXE 1.1 + 1.2 + 1.3 + 1.4)
   Vérifie, hors runtime, que le moteur ne teste jamais un temps
   verbal avant que le chapitre qui l'enseigne n'ait été atteint :
     • pour CHAQUE chapitre, generateForChapter ne produit aucun
       exercice (verb_fill, cloze, word_order, sentence_builder,
       listening_transcribe) dont le temps sort de l'ensemble
       autorisé (chapter.tenses explicite, sinon les temps
       cumulés des chapitres précédents via
       Exercises._unlockedTensesBefore) ;
     • pour un chapitre dont les temps sont volontairement
       restreints (ex. u10_c2 = présent seul), aucune mauvaise
       réponse (distracteur) proposée n'est une forme d'un temps
       non autorisé du même verbe ;
     • AXE 1.3 : sur un profil simulé (chapitres terminés arrêtés
       juste avant u10_c3), generateForReview() ne produit aucun
       exercice hors de la progression réelle, même en le forçant
       à réviser tout le vocabulaire et tous les verbes du jeu ;
       et un profil sans aucun chapitre terminé ne reçoit aucun
       grammar_fill / dialogue_fill / sentence_builder (pas de
       repli global vers tout le contenu) ;
     • AXE 1.4 : un mot de match_pairs / d'écoute de vocabulaire a
       été enseigné ailleurs dans la même génération (jamais
       au-delà du strict échantillon enseigné) ; un dialogue_fill
       est toujours précédé, dans la même génération, d'une slide
       dialogue_read qui montre le dialogue en entier ;
     • la règle g_copule existe, avec ≥4 exercices dont la
       réponse figure bien dans ses propres options.

   Le temps d'un exemple de verbe est déterminé en le comparant
   UNIQUEMENT aux formes propres à CE verbe (jamais à un autre
   verbe de la même phrase) — c'est exactement la stratégie
   utilisée par le moteur lui-même (voir _detectExampleTense
   dans js/engine/exercises.js), donc ce script vérifie que
   l'implémentation reste fidèle à sa propre règle en la
   ré-exécutant de façon indépendante sur les résultats produits.

   Usage : node tools/verify-tense-gating.js
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
sandbox.State = { data: { reviewQueue: [], sessionDensity: 'normal' } };
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
const AppUnits = sandbox.AppUnits || [];
const AppVerbs = sandbox.AppVerbs || [];
const AppGrammar = sandbox.AppGrammar || [];

if (!Exercises || typeof Exercises.generateForChapter !== 'function' || typeof Exercises._unlockedTensesBefore !== 'function') {
  console.log('❌ Exercises.generateForChapter / _unlockedTensesBefore introuvables.');
  process.exit(1);
}

const RUNS = 20;
let chapterCount = 0, tenseExerciseCount = 0, contentExerciseCount = 0;

for (const u of AppUnits) {
  for (const c of (u.chapters || [])) {
    chapterCount++;
    // Même calcul que generateForChapter (js/engine/exercises.js) : `allowed` est le cumul
    // des temps enseignés par les chapitres précédents ET du/des temps propres à ce chapitre
    // — un distracteur peut légitimement venir d'un temps déjà connu (ex. le présent
    // affirmatif comme distracteur de la négation présente à u10_c3), ce n'est pas une fuite.
    const unlockedBefore = Array.from(Exercises._unlockedTensesBefore(c.id));
    const drillTenses = (Array.isArray(c.tenses) && c.tenses.length > 0) ? c.tenses : unlockedBefore;
    const allowed = Array.from(new Set([...unlockedBefore, ...drillTenses]));

    for (let run = 0; run < RUNS; run++) {
      let slides;
      try {
        slides = Exercises.generateForChapter(c.id);
      } catch (e) {
        err(`generateForChapter("${c.id}") a levé : ${e.message}`);
        continue;
      }

      for (const s of slides) {
        // 1) Le temps testé par un exercice de conjugaison doit être autorisé.
        if (s.subtype === 'verb_fill' && s.verbMeta) {
          tenseExerciseCount++;
          // Le temps PRINCIPALEMENT testé doit être un des temps que ce chapitre fait
          // pratiquer (drillTenses) — plus strict que `allowed`, qui n'est là que pour
          // les distracteurs/exemples.
          if (!drillTenses.includes(s.verbMeta.tense)) {
            err(`"${c.id}" : verb_fill teste "${s.verbMeta.tense}" (verbe ${s.data.id}), hors de [${drillTenses}]`);
          }
          // 2) Aucun distracteur ne doit être une forme d'un temps NON autorisé du même verbe.
          const verb = AppVerbs.find(v => v.id === s.data.id);
          if (verb && verb.conjugations) {
            const forbiddenForms = new Set();
            for (const t of Object.keys(verb.conjugations)) {
              if (allowed.includes(t)) continue;
              for (const p of Object.keys(verb.conjugations[t])) forbiddenForms.add(verb.conjugations[t][p]);
            }
            for (const opt of (s.options || [])) {
              if (forbiddenForms.has(opt)) {
                err(`"${c.id}" : option "${opt}" (verbe ${s.data.id}) est une forme d'un temps non autorisé [${allowed}]`);
              }
            }
          }
        }
        // 3) cloze : le temps de l'exemple choisi (détecté via les formes propres au verbe)
        // doit être dans l'ensemble autorisé — data.type vaut bien 'verb' pour cet exercice.
        if (s.type === 'cloze' && s.data && s.data.type === 'verb') {
          const verb = AppVerbs.find(v => v.id === s.data.id);
          const tr = s.data.tr;
          if (verb && tr) {
            const t = Exercises._detectExampleTense(verb, tr);
            tenseExerciseCount++;
            if (t && !allowed.includes(t)) {
              err(`"${c.id}" : ${s.type} utilise "${tr}" (${verb.id}, temps "${t}"), hors de [${allowed}]`);
            }
          }
        }
        // 4) word_order / sentence_builder / listening_transcribe : leur data.type vaut
        // 'phrase' (jamais 'verb'), donc on ne peut PAS s'appuyer dessus pour retrouver le
        // verbe source — le moteur expose maintenant explicitement `sourceVerbId` /
        // `sourceTense` (js/engine/exercises.js) pour que ce contrôle porte sur le vrai
        // exemple choisi, pas sur une reconstruction devinée à partir de data.id/data.tr.
        if (['word_order', 'sentence_builder', 'listening_transcribe'].includes(s.type) && s.sourceVerbId) {
          tenseExerciseCount++;
          if (s.sourceTense === null || s.sourceTense === undefined) {
            err(`"${c.id}" : ${s.type} (verbe ${s.sourceVerbId}) sans temps détectable — devrait avoir été exclu par le filtre`);
          } else if (!allowed.includes(s.sourceTense)) {
            err(`"${c.id}" : ${s.type} utilise le verbe ${s.sourceVerbId} au temps "${s.sourceTense}", hors de [${allowed}]`);
          }
        }
      }

      // 5) v10 AXE 1.4 — un mot testé en match_pairs / écoute de vocabulaire doit avoir été
      // enseigné ailleurs DANS LA MÊME session (intro_card ou exercice individuel), jamais
      // piocher au-delà de l'échantillon réellement enseigné (chapter.vocabIds/l'unité
      // entière peuvent dépasser ce qui est montré dans une seule génération).
      const taughtVocabIds = new Set(
        slides.filter(s => s.data && s.data.type === 'vocabulary').map(s => s.data.id)
      );
      const mp = slides.find(s => s.type === 'match_pairs');
      if (mp) {
        contentExerciseCount++;
        for (const p of mp.pairs) {
          if (!taughtVocabIds.has(p.id)) {
            err(`"${c.id}" : match_pairs contient "${p.id}", jamais enseigné ailleurs dans cette génération`);
          }
        }
      }
      const ltVocab = slides.find(s => s.type === 'listening_transcribe' && s.data && s.data.type === 'vocabulary');
      if (ltVocab) {
        contentExerciseCount++;
        if (!taughtVocabIds.has(ltVocab.data.id)) {
          err(`"${c.id}" : listening_transcribe (vocab) porte sur "${ltVocab.data.id}", jamais enseigné ailleurs dans cette génération`);
        }
      }

      // 6) v10 AXE 1.4 — dialogue_fill ne doit jamais porter sur un dialogue qui n'a pas
      // d'abord été montré en entier via une slide dialogue_read (dans CETTE génération),
      // et cette lecture doit précéder l'exercice dans l'ordre des slides.
      const dialogueReads = slides.filter(s => s.type === 'dialogue_read');
      const firstFillIdx = slides.findIndex(s => s.type === 'dialogue_fill');
      if (firstFillIdx !== -1) {
        contentExerciseCount++;
        const df = slides[firstFillIdx];
        const matchingRead = dialogueReads.find(dr => dr.data.id === df.data.id);
        if (!matchingRead) {
          err(`"${c.id}" : dialogue_fill sur "${df.data.id}" sans dialogue_read correspondant dans cette génération`);
        } else if (slides.indexOf(matchingRead) > firstFillIdx) {
          err(`"${c.id}" : dialogue_read pour "${df.data.id}" apparaît APRÈS le dialogue_fill`);
        }
      }
    }
  }
}

// 5) v10 AXE 1.3 — La révision quotidienne (generateForReview) ne doit jamais dépasser la
// progression RÉELLE d'un profil simulé, arrêté juste avant u10_c3 (donc 'present' débloqué,
// 'present_neg'/'past'/'future'/'aorist'/'pastNarrative' PAS encore). On force artificiellement
// reviewItems à couvrir tout le vocabulaire et tous les verbes du jeu (pire cas), pour vérifier
// que le moteur borne bien la sortie à la progression, pas aux données saisies en entrée.
if (typeof Exercises.generateForReview === 'function') {
  const cutoffChapters = [];
  outer:
  for (const u of AppUnits) {
    for (const c of u.chapters) {
      if (c.id === 'u10_c3') break outer;
      cutoffChapters.push(c.id);
    }
  }
  sandbox.State.data.completedChapters = cutoffChapters;
  const reviewAllowed = ['present']; // seul temps débloqué avant u10_c3
  const reviewGrammarIds = new Set();
  const reviewDialogueIds = new Set();
  const reviewKnownVocabIds = new Set();
  const reviewKnownVerbIds = new Set();
  for (const u of AppUnits) {
    for (const c of u.chapters) {
      if (!cutoffChapters.includes(c.id)) continue;
      for (const g of (c.grammarIds || [])) reviewGrammarIds.add(g);
      for (const d of (c.dialogueIds || [])) reviewDialogueIds.add(d);
      for (const v of (c.vocabIds || [])) reviewKnownVocabIds.add(v);
      for (const v of (c.verbIds || [])) reviewKnownVerbIds.add(v);
    }
  }
  const reviewItems = [
    ...sandbox.AppVocabulary.map(w => ({ id: w.id, type: 'vocabulary' })),
    ...AppVerbs.map(v => ({ id: v.id, type: 'verb' })),
  ];
  let reviewExerciseCount = 0;
  for (let pass = 0; pass < 30; pass++) {
    let exs;
    try {
      exs = Exercises.generateForReview(reviewItems);
    } catch (e) {
      err(`generateForReview a levé (pass ${pass}) : ${e.message}`);
      continue;
    }
    for (const s of exs) {
      reviewExerciseCount++;
      if (s.subtype === 'verb_fill' && s.verbMeta) {
        if (!reviewAllowed.includes(s.verbMeta.tense)) {
          err(`révision : verb_fill teste "${s.verbMeta.tense}" (verbe ${s.data.id}), hors de [${reviewAllowed}] pour ce profil`);
        }
      }
      if (s.type === 'cloze' && s.data && s.data.type === 'verb') {
        const verb = AppVerbs.find(v => v.id === s.data.id);
        const t = verb && Exercises._detectExampleTense(verb, s.data.tr);
        if (t && !reviewAllowed.includes(t)) {
          err(`révision : cloze utilise "${s.data.tr}" (${verb.id}, temps "${t}"), hors de [${reviewAllowed}] pour ce profil`);
        }
      }
      if (['word_order', 'sentence_builder', 'listening_transcribe'].includes(s.type) && s.sourceVerbId && s.sourceTense) {
        if (!reviewAllowed.includes(s.sourceTense)) {
          err(`révision : ${s.type} utilise le verbe ${s.sourceVerbId} au temps "${s.sourceTense}", hors de [${reviewAllowed}] pour ce profil`);
        }
      }
      if (s.type === 'grammar_fill') {
        const rid = s.ruleId || (s.data && s.data.id);
        if (rid && !reviewGrammarIds.has(rid)) {
          err(`révision : grammar_fill utilise la règle "${rid}", non enseignée par les chapitres terminés de ce profil`);
        }
      }
      if (s.type === 'dialogue_fill') {
        const did = s.data && s.data.id;
        if (did && !reviewDialogueIds.has(did)) {
          err(`révision : dialogue_fill utilise "${did}", non enseigné par les chapitres terminés de ce profil`);
        }
      }
      // 5bis) Le mot/verbe RÉVISÉ lui-même doit venir d'un chapitre terminé — reviewItems
      // contient volontairement TOUT le vocabulaire et TOUS les verbes du jeu (y compris ceux
      // d'u18, jamais enseignés à ce stade) : sans ce contrôle, un mot ou verbe non appris
      // pourrait quand même être révisé si la file de révision le contenait par erreur
      // (import de sauvegarde, ancien état, réorganisation du parcours).
      if (s.data && s.data.type === 'vocabulary' && !reviewKnownVocabIds.has(s.data.id)) {
        err(`révision : ${s.type} porte sur le mot "${s.data.id}", non enseigné par les chapitres terminés de ce profil`);
      }
      if ((s.subtype === 'verb_fill' || s.sourceVerbId) && s.data) {
        const vid = s.sourceVerbId || s.data.id;
        if (vid && !reviewKnownVerbIds.has(vid)) {
          err(`révision : ${s.type} porte sur le verbe "${vid}", non enseigné par les chapitres terminés de ce profil`);
        }
      }
      if (s.type === 'match_pairs') {
        for (const p of s.pairs) {
          if (!reviewKnownVocabIds.has(p.id)) {
            err(`révision : match_pairs contient "${p.id}", non enseigné par les chapitres terminés de ce profil`);
          }
        }
      }
    }
  }
  console.log(`Révision (profil simulé, arrêté avant u10_c3) : ${reviewExerciseCount} exercices sur 30 passes.`);

  // Profil sans aucun chapitre terminé : aucun exercice de grammaire/dialogue/phrase/écoute
  // ne doit être produit (aucun repli global vers tout le contenu du jeu).
  sandbox.State.data.completedChapters = [];
  const exsEmpty = Exercises.generateForReview(reviewItems);
  const leakedTypes = exsEmpty.filter(s => ['grammar_fill', 'dialogue_fill', 'sentence_builder'].includes(s.type));
  if (leakedTypes.length > 0) {
    err(`révision, profil sans chapitre terminé : ${leakedTypes.length} exercice(s) produit(s) au lieu de 0 (${leakedTypes.map(s => s.type).join(', ')})`);
  }
} else {
  err('Exercises.generateForReview introuvable.');
}

// 6bis) v10 AXE 1.5 — un chapitre qui déclare `requiredVocabIds` (expressions figées dont
// dépend son canDo, ex. u6_c3/u6_c4) doit les enseigner à CHAQUE génération, jamais seulement
// "parfois" au gré du tirage aléatoire de l'échantillon.
for (const u of AppUnits) {
  for (const c of u.chapters) {
    if (!Array.isArray(c.requiredVocabIds) || c.requiredVocabIds.length === 0) continue;
    for (let pass = 0; pass < 20; pass++) {
      const exs = Exercises.generateForChapter(c.id);
      const taughtIds = new Set(exs.filter(s => s.data && s.data.type === 'vocabulary').map(s => s.data.id));
      for (const rid of c.requiredVocabIds) {
        if (!taughtIds.has(rid)) {
          err(`"${c.id}" : "${rid}" est déclaré requiredVocabIds mais absent de la génération (pass ${pass})`);
        }
      }
    }
  }
}

// 6) La copule doit exister et être correcte.
const copule = AppGrammar.find(g => g.id === 'g_copule');
if (!copule) {
  err('Règle "g_copule" introuvable.');
} else {
  if (!Array.isArray(copule.exercises) || copule.exercises.length < 4) {
    err(`"g_copule" : ${copule.exercises ? copule.exercises.length : 0} exercice(s), 4 minimum attendus.`);
  } else {
    for (const ex of copule.exercises) {
      if (!Array.isArray(ex.options) || !ex.options.includes(ex.answer)) {
        err(`"g_copule" : réponse "${ex.answer}" absente des options de "${ex.prompt}"`);
      }
    }
  }
}

console.log('─'.repeat(56));
console.log('TürkçeYol — vérification du filtrage par temps (v10 AXE 1.1/1.2)');
console.log('─'.repeat(56));
console.log(`Chapitres testés : ${chapterCount} × ${RUNS} passes`);
console.log(`Exercices liés à un temps inspectés : ${tenseExerciseCount}`);
console.log(`Exercices de contenu (match_pairs/écoute/dialogue) inspectés : ${contentExerciseCount}`);
console.log('─'.repeat(56));

if (errors.length) {
  console.log(`\n❌ ${errors.length} PROBLÈME(S) :`);
  for (const e of errors.slice(0, 60)) console.log('   ✗ ' + e);
  if (errors.length > 60) console.log(`   … +${errors.length - 60} autres`);
  console.log('\nVérification ÉCHOUÉE.');
  process.exit(1);
}

console.log('\n✅ Aucun exercice ne porte sur un temps non enseigné par un chapitre antérieur.');
process.exit(0);
