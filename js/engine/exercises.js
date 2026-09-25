/* ═══════════════════════════════════════════════
   TürkçeYol — exercises.js
   Générateur d'exercices avec distracteurs intelligents
   ═══════════════════════════════════════════════ */

window.Exercises = {

  /* ═══ v5 — Leçon en phases : Découverte → Pratique → Rappel → Production ═══
     - 100% du contenu vient du chapitre (plus d'injection aléatoire)
     - On enseigne (intro_card / grammar_note) AVANT de tester
     - Difficulté croissante + anti-répétition de type
     - Gating : pas de production dans les toutes premières unités          */

  generateForChapter(chapterId) {
    let chapter = null, unit = null;
    for (const u of AppUnits) {
      const c = u.chapters.find(ch => ch.id === chapterId);
      if (c) { chapter = c; unit = u; break; }
    }

    const hasExplicitVocab = chapter && chapter.vocabIds && chapter.vocabIds.length > 0;

    // Vocab du chapitre — complément UNIQUEMENT depuis la même unité (jamais global)
    let vocab = [];
    if (hasExplicitVocab) {
      vocab = chapter.vocabIds.map(id => AppVocabulary.find(w => w.id === id)).filter(Boolean);
      if (vocab.length < 5 && unit) {
        const unitIds = new Set(unit.chapters.flatMap(c => c.vocabIds || []));
        const extra = AppVocabulary.filter(w => unitIds.has(w.id) && !vocab.find(v => v.id === w.id));
        vocab.push(...this._shuffle(extra));
      }
    }

    // Verbes du chapitre
    let verbs = [];
    if (chapter && chapter.verbIds && chapter.verbIds.length > 0) {
      verbs = chapter.verbIds.map(id => window.AppVerbs && AppVerbs.find(v => v.id === id)).filter(Boolean);
    }

    // Temps (v10 AXE 1.1) — deux notions distinctes :
    // - `drillTenses` : quel(s) temps CE chapitre fait pratiquer en priorité dans sa boucle
    //   de conjugaison. Le champ `tenses` explicite reste prioritaire quand il existe
    //   (ex. u10_c3 isole 'present_neg' pour se concentrer sur la négation) ; sans lui, ce
    //   sont les temps déjà enseignés par un chapitre antérieur (plus de présent/passé/futur
    //   par défaut dès l'unité 2).
    // - `allowedTenses` : tout ce que l'apprenant est censé DÉJÀ connaître à ce stade
    //   (cumul des chapitres précédents ∪ drillTenses). C'est cette liste, plus large, qui
    //   borne les distracteurs et les exemples (AXE 1.2) — un présent affirmatif reste un
    //   distracteur légitime pour la négation présente de u10_c3, puisque le présent a été
    //   enseigné juste avant ; seul un temps jamais enseigné (aoriste, -mış…) doit disparaître.
    const unlockedBefore = Array.from(this._unlockedTensesBefore(chapterId));
    const drillTenses = (chapter && Array.isArray(chapter.tenses) && chapter.tenses.length > 0)
      ? chapter.tenses
      : unlockedBefore;
    const allowedTenses = Array.from(new Set([...unlockedBefore, ...drillTenses]));

    // Gating production (Pilier E) : u1 = reconnaissance pure,
    // u2 = saisie simple ok, u3+ = tout
    const unitNum = unit ? parseInt(unit.id.slice(1), 10) || 99 : 99;
    const prodLevel = unitNum <= 1 ? 0 : (unitNum === 2 ? 1 : 2);

    // Densité de session (v7 AXE 3.2) : Courte/Normale/Longue, réglable en Settings
    const density = (window.State && State.data && State.data.sessionDensity) || 'normal';
    const vocabSampleSize = density === 'short' ? 3 : density === 'long' ? 7 : 5;

    // ── Échantillon : on enseigne EXACTEMENT ce qu'on teste ──
    // v10 AXE 1.5 : certains mots (souvent des expressions figées indispensables au canDo,
    // ex. "Seviyorum" pour "dire ce que j'aime") ne doivent PAS dépendre du tirage aléatoire —
    // `chapter.requiredVocabIds` (optionnel) les garantit toujours dans l'échantillon, avant
    // de compléter aléatoirement avec le reste, comme avant.
    const requiredIds = (chapter && Array.isArray(chapter.requiredVocabIds)) ? chapter.requiredVocabIds : [];
    const requiredVocab = requiredIds.map(id => vocab.find(w => w.id === id)).filter(Boolean);
    const restVocab = vocab.filter(w => !requiredIds.includes(w.id));
    const vocabSample = [
      ...requiredVocab,
      ...this._shuffle(restVocab).slice(0, Math.max(0, vocabSampleSize - requiredVocab.length))
    ];

    // v10 AXE 1.4 : mots "connus" à ce stade = enseignés dans CETTE session (vocabSample) ou
    // déjà maîtrisés lors d'une session précédente (reviewQueue, step >= 2 — même seuil que
    // createIntroCards). Sert à borner les exercices qui, sinon, piochent au-delà du strict
    // échantillon enseigné (association de paires, écoute de vocabulaire).
    const reviewKnownIds = new Set(
      ((window.State && State.data && State.data.reviewQueue) || [])
        .filter(it => (it.step || 0) >= 2)
        .map(it => it.id)
    );
    const knownVocabIds = new Set([...vocabSample.map(w => w.id), ...reviewKnownIds]);

    const discover = [];  // enseigner
    const practice = [];  // reconnaître (niv 1)
    const recall   = [];  // rappeler   (niv 2)
    const produce  = [];  // produire   (niv 3)

    // 1) Cartes de découverte (mots non maîtrisés uniquement)
    discover.push(...this.createIntroCards(vocabSample, verbs));

    // 2) Fiche grammaire du chapitre (1 max)
    const gn = this.createGrammarNote(chapter);
    if (gn) discover.push(gn);

    // 3) Astuces du chapitre (tips[])
    if (chapter && Array.isArray(chapter.tips)) {
      for (const tip of chapter.tips.slice(0, 2)) {
        if (tip && tip.text) {
          discover.push({ type: 'tip_callout', isTeaching: true, icon: tip.icon || '💡', text: tip.text });
        }
      }
    }

    // 3b) Note culturelle du chapitre (AXE 2.2) — en fin de découverte
    if (chapter && chapter.culture) {
      discover.push({ type: 'culture_note', isTeaching: true, text: chapter.culture });
    }

    // 3c) Lecture du/des dialogue(s) du chapitre AVANT tout exercice dessus (v10 AXE 1.4) :
    // createDialogueFill (étape 7) masque une réplique de l'un de ces dialogues — il ne doit
    // jamais porter sur une réplique que l'apprenant n'a pas encore lue.
    if (chapter && Array.isArray(chapter.dialogueIds)) {
      for (const did of chapter.dialogueIds) {
        const dr = this.createDialogueRead(did);
        if (dr) discover.push(dr);
      }
    }

    // 4) Exercices de vocabulaire répartis par difficulté
    vocabSample.forEach((word, i) => {
      if (i % 5 === 0) practice.push(this.createQCMTrFr(word));
      else if (i % 5 === 1) recall.push(this.createQCMFrTr(word));
      else if (i % 5 === 2) {
        if (prodLevel >= 1) produce.push(this.createInputTr(word));
        else practice.push(this.createQCMFrTr(word));
      }
      else if (i % 5 === 3) practice.push(this.createTrueFalse(word));
      else practice.push(this.createAudioQCM(word));
    });

    // 5) Conjugaison → rappel (rien à conjuguer si aucun temps n'est encore enseigné)
    if (verbs.length > 0 && drillTenses.length > 0) {
      const persons = ['ben', 'sen', 'o', 'biz', 'siz', 'onlar'];
      const count = !hasExplicitVocab ? Math.min(8, verbs.length * 2 + 1) : Math.min(3, verbs.length + 1);
      for (let i = 0; i < count; i++) {
        const verb = verbs[i % verbs.length];
        const person = persons[i % persons.length];
        const tense = drillTenses[i % drillTenses.length];
        const ex = this.createVerbFill(verb, person, tense, allowedTenses);
        if (ex) recall.push(ex);
      }
    }

    // 6) Grammaire du chapitre (drills/exercises des règles rattachées) → rappel
    if (chapter) {
      const gf = this.createGrammarFill(chapter);
      if (gf) recall.push(gf);
    }

    // 7) Dialogue du chapitre → rappel en contexte
    if (chapter) {
      const df = this.createDialogueFill(chapter);
      if (df) recall.push(df);
    }

    // 8) Cloze (exemples des verbes du chapitre) → rappel
    if (verbs.length > 0) {
      const cz = this.createCloze(verbs, allowedTenses);
      if (cz) recall.push(cz);
    }

    // 9) Match pairs (v10 AXE 1.4 : uniquement le vocab déjà enseigné/connu) → pratique
    const knownVocabForPairs = vocab.filter(w => knownVocabIds.has(w.id));
    if (knownVocabForPairs.length >= 4) {
      const mp = this.createMatchPairs(knownVocabForPairs);
      if (mp) practice.push(mp);
    }

    // 10) Production (si niveau suffisant)
    if (prodLevel >= 2) {
      if (verbs.length > 0) {
        const wo = this.createWordOrder(verbs, null, allowedTenses);
        if (wo) produce.push(wo);
      }
      const sb = this.createSentenceBuilder(chapter, allowedTenses);
      if (sb) produce.push(sb);
      const lt = this.createListeningTranscribe(chapter, allowedTenses, knownVocabIds);
      if (lt) produce.push(lt);
    } else if (prodLevel === 1) {
      // Écoute d'un mot simple dès u2 (transcription courte)
      const lt = this.createListeningTranscribe(chapter, allowedTenses, knownVocabIds);
      if (lt && lt.text && lt.text.split(' ').length <= 2) produce.push(lt);
    }

    // Fallback sécurité (données cassées uniquement)
    if (practice.length + recall.length + produce.length === 0) {
      const fallback = this._shuffle(AppVocabulary).slice(0, 5);
      fallback.forEach((word, i) => {
        practice.push(i % 2 === 0 ? this.createQCMTrFr(word) : this.createQCMFrTr(word));
      });
    }

    // Densité "courte" : on garde le meilleur de chaque phase plutôt que tout
    // (jamais les slides d'enseignement — enseigner reste toujours complet)
    let trimmedPractice = practice, trimmedRecall = recall, trimmedProduce = produce;
    if (density === 'short') {
      const keep = (arr) => arr.length > 1 ? arr.slice(0, Math.ceil(arr.length * 0.6)) : arr;
      trimmedPractice = keep(practice);
      trimmedRecall = keep(recall);
      trimmedProduce = keep(produce);
    }

    // ── Assemblage : découverte fixe, puis phases mélangées SANS répétition de type ──
    discover.forEach(e => { e.phase = 'discover'; });
    trimmedPractice.forEach(e => { e.phase = 'practice'; });
    trimmedRecall.forEach(e => { e.phase = 'recall'; });
    trimmedProduce.forEach(e => { e.phase = 'produce'; });
    return [
      ...discover,
      ...this._antiRepeat(this._shuffle(trimmedPractice)),
      ...this._antiRepeat(this._shuffle(trimmedRecall)),
      ...this._antiRepeat(this._shuffle(trimmedProduce))
    ];
  },

  // ── Cartes de découverte : enseigner avant de tester (Pilier A) ──
  createIntroCards(words, verbs) {
    const cards = [];
    const known = new Set(
      ((window.State && State.data && State.data.reviewQueue) || [])
        .filter(it => (it.step || 0) >= 2)
        .map(it => it.id)
    );
    for (const word of (words || [])) {
      if (known.has(word.id)) continue;
      cards.push({
        type: 'intro_card',
        isTeaching: true,
        tr: word.tr,
        fr: word.fr,
        phonetic: word.phonetic || (window.Phonetics ? Phonetics.toFrench(word.tr) : null),
        soundHints: window.Phonetics ? Phonetics.soundHints(word.tr) : [],
        example: word.example || null,
        data: { id: word.id, tr: word.tr, fr: word.fr, type: 'vocabulary' }
      });
      if (cards.length >= 5) break;
    }
    // Verbes nouveaux : 2 cartes max
    let verbCards = 0;
    for (const verb of (verbs || [])) {
      if (known.has(verb.id) || verbCards >= 2 || cards.length >= 6) break;
      const ex = (verb.examples && verb.examples[0]) || null;
      cards.push({
        type: 'intro_card',
        isTeaching: true,
        isVerb: true,
        tr: verb.infinitive,
        fr: verb.fr,
        phonetic: verb.phonetic || (window.Phonetics ? Phonetics.toFrench(verb.infinitive) : null),
        soundHints: window.Phonetics ? Phonetics.soundHints(verb.infinitive) : [],
        example: ex,
        data: { id: verb.id, tr: verb.infinitive, fr: verb.fr, type: 'verb' }
      });
      verbCards++;
    }
    return cards;
  },

  // Règles verbales → tableau de conjugaison (6 personnes) depuis verbs.js
  _CONJ_TABLE_RULES: {
    g_present_iyor: { verbId: 'vb_gelmek', tense: 'present', label: 'Présent (-iyor) — venir' },
    g_negatif_fiil: { verbId: 'vb_gitmek', tense: 'present_neg', label: 'Présent négatif — aller' },
    g_passe_di:     { verbId: 'vb_gitmek', tense: 'past', label: 'Passé (-di) — aller' },
    g_futur_acak:   { verbId: 'vb_gelmek', tense: 'future', label: 'Futur (-ecek) — venir' },
    g_aorist:       { verbId: 'vb_yapmak', tense: 'aorist', label: 'Aoriste (-Ar/-Ir) — faire' },
    g_gecmis_mis:   { verbId: 'vb_gitmek', tense: 'pastNarrative', label: 'Passé narratif (-mış) — aller' }
  },

  _buildConjTable(ruleId) {
    const map = this._CONJ_TABLE_RULES[ruleId];
    if (!map || !window.AppVerbs) return null;
    const verb = AppVerbs.find(v => v.id === map.verbId);
    if (!verb) return null;
    const table = map.tense === 'present_neg'
      ? (verb.negations && verb.negations.present)
      : (verb.conjugations && verb.conjugations[map.tense]);
    if (!table) return null;
    const persons = [['ben', 'je'], ['sen', 'tu'], ['o', 'il/elle'], ['biz', 'nous'], ['siz', 'vous'], ['onlar', 'ils/elles']];
    const rows = persons
      .filter(([p]) => table[p])
      .map(([p, fr]) => ({ person: p, fr, form: table[p] }));
    if (rows.length === 0) return null;
    return { label: map.label, rows };
  },

  // ── Fiche grammaire compacte du chapitre (Pilier A) ──
  createGrammarNote(chapter) {
    if (!chapter || !window.AppGrammar) return null;
    const ids = chapter.grammarIds || [];
    if (ids.length === 0) return null;
    const rule = AppGrammar.find(g => g.id === ids[0]);
    if (!rule) return null;
    return {
      type: 'grammar_note',
      isTeaching: true,
      ruleId: rule.id,
      title: rule.title,
      rule: rule.rule,
      example: rule.example || '',
      table: this._buildConjTable(rule.id),
      traps: Array.isArray(rule.traps) ? rule.traps.slice(0, 2) : []
    };
  },

  // ── Anti-répétition : jamais 2 fois le même type d'affilée (Pilier E) ──
  _antiRepeat(list) {
    const result = [...list];
    for (let i = 1; i < result.length; i++) {
      if (result[i].type === result[i - 1].type) {
        for (let j = i + 1; j < result.length; j++) {
          if (result[j].type !== result[i - 1].type) {
            [result[i], result[j]] = [result[j], result[i]];
            break;
          }
        }
      }
    }
    return result;
  },

  // ── v10 AXE 1.1 — Temps déjà enseignés avant un chapitre donné ──
  // Parcourt AppUnits dans l'ordre du parcours et unionne les `tenses` explicites de
  // chaque chapitre rencontré AVANT le chapitre visé (jamais celui-ci ni les suivants).
  // Sert de valeur par défaut aux chapitres qui n'ont pas leur propre champ `tenses`.
  _unlockedTensesBefore(chapterId) {
    const unlocked = new Set();
    for (const u of AppUnits) {
      for (const c of u.chapters) {
        if (c.id === chapterId) return unlocked;
        if (Array.isArray(c.tenses)) {
          for (const t of c.tenses) unlocked.add(t);
        }
      }
    }
    return unlocked;
  },

  // ── v10 AXE 1.2 — Détecte le temps d'un exemple, UNIQUEMENT via les formes propres
  // au verbe testé (jamais celles d'un autre verbe de la phrase, ex. "konuşmak istiyorum"
  // ne doit jamais être classé comme un présent de konuşmak). Retourne null si aucune
  // forme ne correspond (temps absent des données, ex. futur négatif) : l'exemple est
  // alors exclu par prudence des générateurs filtrés par temps, jamais classé au hasard.
  _detectExampleTense(verb, exampleTr) {
    if (!verb || !exampleTr) return null;
    const strip = s => s.replace(/[.!?,;:'"]/g, '').toLocaleLowerCase('tr-TR');
    const words = exampleTr.split(/\s+/).map(strip);
    const tables = { ...(verb.conjugations || {}) };
    if (verb.negations && verb.negations.present) tables.present_neg = verb.negations.present;
    for (const tense of Object.keys(tables)) {
      const table = tables[tense];
      for (const p of Object.keys(table)) {
        const form = table[p] && strip(table[p]);
        if (form && words.includes(form)) return tense;
      }
    }
    return null;
  },

  // v10 AXE 1.3 — Temps débloqués par la progression RÉELLE (chapitres terminés), et non
  // plus tout ce qui existe dans les données. Remplace v9 AXE 1.1 (qui aurait fait réviser
  // tous les temps de la fiche du verbe, y compris ceux jamais enseignés) sans son effet de
  // bord : seuls les temps enseignés par un chapitre déjà TERMINÉ sont éligibles.
  _unlockedTensesFromCompleted(completedChapters) {
    const done = new Set(completedChapters || []);
    const unlocked = new Set();
    for (const u of AppUnits) {
      for (const c of u.chapters) {
        if (done.has(c.id) && Array.isArray(c.tenses)) {
          for (const t of c.tenses) unlocked.add(t);
        }
      }
    }
    return unlocked;
  },

  generateForReview(reviewItems) {
    const exercises = [];
    const completedChapters = (window.State && State.data && State.data.completedChapters) || [];
    const unlockedTenses = Array.from(this._unlockedTensesFromCompleted(completedChapters));

    // v10 AXE 1.3 — "chapitre virtuel" : union des grammarIds/dialogueIds/verbIds/vocabIds
    // de tous les chapitres TERMINÉS. Calculé ici, EN PREMIER, pour deux usages :
    // (a) plus bas, borner grammaire/dialogue/phrase/écoute exactement comme un vrai chapitre ;
    // (b) filtrer `reviewItems` lui-même AVANT toute génération — un item ne devrait jamais
    // pouvoir sortir d'un chapitre non terminé, mais on ne fait plus confiance à cette seule
    // hypothèse (import de sauvegarde, ancien état, réorganisation du parcours) : on vérifie.
    const completedSet = new Set(completedChapters);
    const virtualChapter = { grammarIds: [], dialogueIds: [], verbIds: [], vocabIds: [] };
    for (const u of AppUnits) {
      for (const c of u.chapters) {
        if (!completedSet.has(c.id)) continue;
        if (c.grammarIds) virtualChapter.grammarIds.push(...c.grammarIds);
        if (c.dialogueIds) virtualChapter.dialogueIds.push(...c.dialogueIds);
        if (c.verbIds) virtualChapter.verbIds.push(...c.verbIds);
        if (c.vocabIds) virtualChapter.vocabIds.push(...c.vocabIds);
      }
    }
    const knownVocabSet = new Set(virtualChapter.vocabIds);
    const knownVerbSet = new Set(virtualChapter.verbIds);
    const safeReviewItems = reviewItems.filter(it => knownVocabSet.has(it.id) || knownVerbSet.has(it.id));

    for (const item of safeReviewItems) {
      const word = AppVocabulary.find(w => w.id === item.id);
      if (word) {
        exercises.push(Math.random() > 0.5 ? this.createQCMTrFr(word) : this.createQCMFrTr(word));
        continue;
      }
      if (window.AppVerbs) {
        const verb = AppVerbs.find(v => v.id === item.id);
        if (verb) {
          // Intersection « temps propres au verbe ∩ temps débloqués » : un verbe appris via
          // l'aoriste/-mış n'est retesté sur ces temps qu'une fois réellement enseignés,
          // jamais avant (objectif de v9 AXE 1.1, sans son effet de bord).
          const verbTenses = Object.keys(verb.conjugations || {}).filter(t => unlockedTenses.includes(t));
          if (verbTenses.length > 0) {
            const persons = ['ben', 'sen', 'o', 'biz'];
            const person = persons[Math.floor(Math.random() * persons.length)];
            const tense = verbTenses[Math.floor(Math.random() * verbTenses.length)];
            const ex = this.createVerbFill(verb, person, tense, unlockedTenses);
            if (ex) exercises.push(ex);
          }
        }
      }
    }
    // Bonus word_order + match_pairs sur le vocab de révision (bornés via safeReviewItems).
    const revVocab = safeReviewItems.map(it => AppVocabulary.find(w => w.id === it.id)).filter(Boolean);
    const revVerbs = window.AppVerbs ? safeReviewItems.map(it => AppVerbs.find(v => v.id === it.id)).filter(Boolean) : [];
    if (revVocab.length >= 4) {
      const mp = this.createMatchPairs(revVocab);
      if (mp) exercises.push(mp);
    }
    if (revVerbs.length > 0) {
      const wo = this.createWordOrder(revVerbs, null, unlockedTenses);
      if (wo) exercises.push(wo);
    }
    if (revVerbs.length > 0) {
      const cz = this.createCloze(revVerbs, unlockedTenses);
      if (cz) exercises.push(cz);
    }

    // Grammaire / dialogue / phrase / écoute : les fonctions déjà contextualisées par
    // chapitre (createGrammarFill, createDialogueFill, createSentenceBuilder,
    // createListeningTranscribe) s'appliquent au `virtualChapter` calculé plus haut, SANS
    // aucune modification de leur logique de filtrage — et renvoient naturellement `null` si
    // l'utilisateur n'a encore terminé aucun chapitre (tableaux vides), sans repli global.
    const sbRev = this.createSentenceBuilder(virtualChapter, unlockedTenses);
    if (sbRev) exercises.push(sbRev);
    const gf = this.createGrammarFill(virtualChapter);
    if (gf) exercises.push(gf);
    const df = this.createDialogueFill(virtualChapter);
    if (df) exercises.push(df);
    const lt = this.createListeningTranscribe(virtualChapter, unlockedTenses);
    if (lt) exercises.push(lt);

    return this._shuffle(exercises);
  },

  createQCMTrFr(word) {
    const distractors = this.getSmartDistractors(word, 3, 'fr');
    return {
      type: 'qcm',
      question: `Que signifie <span class="exo-tr">${word.tr}</span> ?`,
      options: this._shuffle([word.fr, ...distractors]),
      answer: word.fr,
      data: { id: word.id, tr: word.tr, fr: word.fr, type: 'vocabulary' }
    };
  },

  createQCMFrTr(word) {
    const distractors = this.getSmartDistractors(word, 3, 'tr');
    return {
      type: 'qcm',
      question: `Comment dit-on <span class="exo-fr">${word.fr}</span> en turc ?`,
      options: this._shuffle([word.tr, ...distractors]),
      answer: word.tr,
      data: { id: word.id, tr: word.tr, fr: word.fr, type: 'vocabulary' }
    };
  },

  createInputTr(word) {
    return {
      type: 'input',
      question: `Traduisez en turc : <span class="exo-fr">${word.fr}</span>`,
      answer: word.tr,
      data: { id: word.id, tr: word.tr, fr: word.fr, type: 'vocabulary' }
    };
  },

  createTrueFalse(word) {
    const useReal = Math.random() > 0.5;
    let proposedFr;
    if (useReal) {
      proposedFr = word.fr;
    } else {
      const distractors = AppVocabulary.filter(w =>
        w.id !== word.id && w.topic === word.topic && w.fr !== word.fr
      );
      const fallback = AppVocabulary.filter(w => w.id !== word.id && w.fr !== word.fr);
      const pool = distractors.length > 0 ? distractors : fallback;
      const picked = pool[Math.floor(Math.random() * pool.length)];
      proposedFr = picked ? picked.fr : word.fr;
      if (proposedFr === word.fr) { proposedFr = word.fr; }
    }
    const isReal = proposedFr === word.fr;
    return {
      type: 'true_false',
      question: word.tr,
      proposed: proposedFr,
      answer: isReal ? 'Vrai' : 'Faux',
      data: { id: word.id, tr: word.tr, fr: word.fr, type: 'vocabulary' }
    };
  },

  createAudioQCM(word) {
    const distractors = this.getSmartDistractors(word, 3, 'fr');
    if (distractors.length < 2) return this.createQCMTrFr(word);
    return {
      type: 'audio_qcm',
      audioTr: word.tr,
      options: this._shuffle([word.fr, ...distractors]),
      answer: word.fr,
      data: { id: word.id, tr: word.tr, fr: word.fr, type: 'vocabulary' }
    };
  },

  createWordOrder(verbsPool, phrasesPool, allowedTenses) {
    const withEx = (verbsPool || []).filter(v => v.examples && v.examples.length > 0);
    let source = null, sourceVerb = null, sourceTense = null;
    if (withEx.length > 0) {
      const candidates = [];
      for (const v of this._shuffle(withEx)) {
        for (const ex of v.examples) {
          if (!(ex.tr && ex.tr.split(' ').length >= 3)) continue;
          // v10 AXE 1.2 : jamais un temps pas encore enseigné.
          let t = null;
          if (allowedTenses) {
            t = this._detectExampleTense(v, ex.tr);
            if (!t || !allowedTenses.includes(t)) continue;
          }
          candidates.push({ verb: v, example: ex, tense: t });
        }
      }
      if (candidates.length > 0) {
        const pick = candidates[Math.floor(Math.random() * candidates.length)];
        source = pick.example; sourceVerb = pick.verb; sourceTense = pick.tense;
      }
    }
    if (!source && phrasesPool && phrasesPool.length > 0) {
      const pool = phrasesPool.filter(p => p.tr && p.tr.split(' ').length >= 3);
      if (pool.length > 0) source = pool[Math.floor(Math.random() * pool.length)];
    }
    if (!source) return null;
    const words = source.tr.split(' ');
    return {
      type: 'word_order',
      question: 'Remets les mots dans le bon ordre :',
      hint: source.fr,
      words: this._shuffle([...words]),
      answer: source.tr,
      // v10 AXE 1.2 : traçabilité explicite pour la vérification (tools/verify-tense-gating.js)
      // plutôt que de faire deviner l'origine via data.id — absents quand la source est une
      // phrase du hub Pratique (aucune notion de temps).
      sourceVerbId: sourceVerb ? sourceVerb.id : null,
      sourceTense: sourceTense,
      data: { id: 'wo_phrase', tr: source.tr, fr: source.fr, type: 'phrase' }
    };
  },

  createSentenceBuilder(chapter, allowedTenses) {
    const chapterVerbIds = (chapter && chapter.verbIds) || [];
    let verbPool = (window.AppVerbs || []).filter(v =>
      (v.examples || []).some(ex => ex.tr && ex.tr.split(' ').length >= 3)
    );
    // En leçon : UNIQUEMENT les verbes du chapitre (Pilier B). En révision : tous.
    if (chapter) {
      if (chapterVerbIds.length === 0) return null;
      verbPool = verbPool.filter(v => chapterVerbIds.includes(v.id));
    }
    if (verbPool.length === 0) return null;

    // v10 AXE 1.2 : jamais un exemple dont le temps n'a pas encore été enseigné.
    const candidates = [];
    for (const v of verbPool) {
      for (const ex of (v.examples || [])) {
        if (!(ex.tr && ex.tr.split(' ').length >= 3)) continue;
        let t = null;
        if (allowedTenses) {
          t = this._detectExampleTense(v, ex.tr);
          if (!t || !allowedTenses.includes(t)) continue;
        }
        candidates.push({ verb: v, example: ex, tense: t });
      }
    }
    if (candidates.length === 0) return null;
    const { verb, example, tense: sourceTense } = candidates[Math.floor(Math.random() * candidates.length)];

    const correctBlocks = example.tr.split(' ');

    // Distracteurs : même topic que le chapitre d'abord, sinon aléatoire
    const chapterTopics = new Set(
      (window.AppVocabulary || [])
        .filter(v => chapterVerbIds.length > 0
          ? (chapter && chapter.vocabIds || []).includes(v.id)
          : false)
        .map(v => v.topic).filter(Boolean)
    );
    let distPool = (window.AppVocabulary || []).filter(v =>
      v.tr && v.tr.split(' ').length === 1 && !correctBlocks.includes(v.tr)
    );
    const topicPool = chapterTopics.size > 0
      ? distPool.filter(v => chapterTopics.has(v.topic))
      : [];
    const distractors = [];
    const shuffledDist = [...(topicPool.length >= 3 ? topicPool : distPool)].sort(() => Math.random() - 0.5);
    for (let i = 0; i < shuffledDist.length && distractors.length < 3; i++) {
      distractors.push(shuffledDist[i].tr);
    }

    const allBlocks = [...correctBlocks, ...distractors].sort(() => Math.random() - 0.5);

    return {
      type: 'sentence_builder',
      blocks: allBlocks,
      correct: correctBlocks,
      hint: example.fr,
      // v10 AXE 1.2 : traçabilité explicite pour tools/verify-tense-gating.js.
      sourceVerbId: verb.id,
      sourceTense,
      data: { id: 'sb_' + verb.id, tr: example.tr, fr: example.fr, type: 'phrase' }
    };
  },

  createMatchPairs(vocabPool) {
    if (!vocabPool || vocabPool.length < 4) return null;
    const topics = [...new Set(vocabPool.map(w => w.topic))];
    let pairs = null;
    for (const topic of this._shuffle(topics)) {
      const tw = vocabPool.filter(w => w.topic === topic);
      if (tw.length >= 4) { pairs = this._shuffle(tw).slice(0, 4); break; }
    }
    if (!pairs) pairs = this._shuffle(vocabPool).slice(0, 4);
    return {
      type: 'match_pairs',
      question: 'Associe chaque mot à sa traduction :',
      pairs: pairs.map(w => ({ id: w.id, tr: w.tr, fr: w.fr })),
      data: { id: pairs[0].id, tr: '', fr: '', type: 'vocabulary' }
    };
  },

  // ── Dialogue read : montre le dialogue COMPLET, avec traduction (v10 AXE 1.4) ──
  // Carte de découverte (isTeaching), à placer AVANT tout exercice sur ce dialogue, pour que
  // createDialogueFill ne masque jamais une réplique que l'apprenant n'a pas encore lue.
  createDialogueRead(dialogueId) {
    if (!window.AppDialogues) return null;
    const dialogue = AppDialogues.find(d => d.id === dialogueId);
    if (!dialogue || !Array.isArray(dialogue.turns) || dialogue.turns.length === 0) return null;
    return {
      type: 'dialogue_read',
      isTeaching: true,
      title: dialogue.title || '',
      turns: dialogue.turns.map(t => ({ speaker: t.speaker, tr: t.tr, fr: t.fr })),
      data: { id: dialogue.id, tr: '', fr: '', type: 'dialogue' }
    };
  },

  // ── Dialogue fill : compléter une réplique masquée dans un dialogue ──
  // Contextualisé (Pilier B) : en leçon, UNIQUEMENT les dialogues du chapitre.
  // Sans chapitre (révision), tirage libre.
  createDialogueFill(chapter) {
    if (!window.AppDialogues || AppDialogues.length === 0) return null;
    let pool = AppDialogues;
    if (chapter) {
      const ids = chapter.dialogueIds || [];
      if (ids.length === 0) return null; // chapitre sans dialogue → on omet, pas de hors-sujet
      pool = AppDialogues.filter(d => ids.includes(d.id));
    }
    const candidates = pool.filter(d => d.turns && d.turns.length >= 4);
    if (candidates.length === 0) return null;

    const dialogue = candidates[Math.floor(Math.random() * candidates.length)];

    // Sélectionner une réplique "masquable" : pas la première, min 2 mots
    const maskableIdxs = [];
    for (let i = 1; i < dialogue.turns.length; i++) {
      const t = dialogue.turns[i];
      if (t.tr && t.tr.split(/\s+/).length >= 2) maskableIdxs.push(i);
    }
    if (maskableIdxs.length === 0) return null;

    const maskIdx = maskableIdxs[Math.floor(Math.random() * maskableIdxs.length)];
    const correctTurn = dialogue.turns[maskIdx];

    // Contexte : 2-3 répliques avant le masque
    const ctxStart = Math.max(0, maskIdx - 2);
    const context = dialogue.turns.slice(ctxStart, maskIdx).map(t => ({
      speaker: t.speaker,
      text: t.tr
    }));

    // Distracteurs : 2 autres répliques (du même dialogue d'abord)
    const sameDialogue = dialogue.turns
      .filter((t, i) => i !== maskIdx && t.tr && t.tr !== correctTurn.tr)
      .map(t => t.tr);
    let distractorPool = [...new Set(sameDialogue)];

    // Compléter depuis d'autres dialogues si nécessaire
    if (distractorPool.length < 2) {
      const allOthers = AppDialogues
        .filter(d => d.id !== dialogue.id)
        .flatMap(d => (d.turns || []).map(t => t.tr))
        .filter(t => t && t !== correctTurn.tr);
      distractorPool = [...new Set([...distractorPool, ...this._shuffle(allOthers)])];
    }
    const distractors = this._shuffle(distractorPool).slice(0, 2);
    if (distractors.length < 2) return null;

    return {
      type: 'dialogue_fill',
      context,
      maskedSpeaker: correctTurn.speaker,
      hint: correctTurn.fr,
      options: this._shuffle([correctTurn.tr, ...distractors]),
      answer: correctTurn.tr,
      data: { id: dialogue.id, tr: correctTurn.tr, fr: correctTurn.fr, type: 'phrase' }
    };
  },

  // ── Grammar fill : drill grammatical (locatif, datif, pluriel, etc.) ──
  // Contextualisé (Pilier B) : en leçon, UNIQUEMENT les règles du chapitre
  // (drills[] ET exercises[] comme sources). Sans chapitre (révision), tirage libre.
  createGrammarFill(chapter) {
    if (!window.AppGrammar) return null;
    let pool = AppGrammar;
    if (chapter) {
      const ids = chapter.grammarIds || [];
      if (ids.length === 0) return null; // chapitre sans grammaire → on omet
      pool = AppGrammar.filter(g => ids.includes(g.id));
    }
    // Candidats : drills (format racine+question) et exercises (format QCM)
    const candidates = [];
    for (const rule of pool) {
      for (const drill of (rule.drills || [])) {
        if (drill && drill.correct && Array.isArray(drill.distractors) && drill.distractors.length >= 3) {
          candidates.push({ kind: 'drill', rule, drill });
        }
      }
      for (const ex of (rule.exercises || [])) {
        if (ex && ex.answer && Array.isArray(ex.options) && ex.options.length >= 3) {
          candidates.push({ kind: 'ex', rule, ex });
        }
      }
    }
    if (candidates.length === 0) return null;
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    if (pick.kind === 'ex') {
      return this.createGrammarPracticeExercise(pick.ex, pick.rule.id, pick.rule.title);
    }
    const { rule, drill } = pick;
    return {
      type: 'grammar_fill',
      root: drill.root,
      question: drill.question,
      ruleTitle: rule.title,
      ruleId: rule.id,
      options: this._shuffle([drill.correct, ...drill.distractors.slice(0, 3)]),
      answer: drill.correct,
      data: { id: rule.id, tr: drill.correct, fr: drill.question, type: 'grammar' }
    };
  },

  // ── Cloze : phrase à trou avec UN mot masqué (verbe conjugué) ──
  createCloze(verbsPool, allowedTenses) {
    const candidates = [];
    for (const v of (verbsPool || [])) {
      if (!v.examples || !v.examples.length) continue;
      for (const ex of v.examples) {
        if (!ex.tr) continue;
        const words = ex.tr.split(/\s+/);
        if (words.length < 3) continue;
        // v10 AXE 1.2 : jamais un exemple dont le temps n'a pas encore été enseigné.
        if (allowedTenses) {
          const t = this._detectExampleTense(v, ex.tr);
          if (!t || !allowedTenses.includes(t)) continue;
        }
        candidates.push({ verb: v, example: ex, words });
      }
    }
    if (candidates.length === 0) return null;

    const { verb, example, words } = candidates[Math.floor(Math.random() * candidates.length)];

    // Collecter les formes conjuguées (positive + négative présent), limitées aux temps
    // déjà enseignés quand une restriction est fournie (v10 AXE 1.2) — sinon un distracteur
    // (ou le mot masqué lui-même) pourrait venir d'un temps jamais vu.
    const allForms = new Set();
    const tenseTables = { ...(verb.conjugations || {}) };
    if (verb.negations && verb.negations.present) tenseTables.present_neg = verb.negations.present;
    for (const tense of Object.keys(tenseTables)) {
      if (allowedTenses && !allowedTenses.includes(tense)) continue;
      const table = tenseTables[tense];
      for (const p of Object.keys(table)) {
        const f = table[p];
        if (f) allForms.add(f.toLocaleLowerCase('tr-TR'));
      }
    }
    if (allForms.size < 4) return null;

    // Trouver une forme conjuguée du verbe dans la phrase
    const strip = s => s.replace(/[.!?,;:'"]/g, '');
    let maskIdx = -1, correct = '';
    for (let i = 0; i < words.length; i++) {
      const cw = strip(words[i]).toLocaleLowerCase('tr-TR');
      if (allForms.has(cw)) {
        maskIdx = i;
        correct = strip(words[i]);
        break;
      }
    }
    if (maskIdx === -1) return null;

    // Distracteurs : 3 autres formes conjuguées du même verbe
    const correctLc = correct.toLocaleLowerCase('tr-TR');
    const distractorPool = [...allForms].filter(f => f !== correctLc);
    if (distractorPool.length < 3) return null;
    const distractors = this._shuffle(distractorPool).slice(0, 3);

    const maskedWords = [...words];
    maskedWords[maskIdx] = '____';
    const maskedSentence = maskedWords.join(' ');

    return {
      type: 'cloze',
      sentence: maskedSentence,
      blank: correct,
      hint: example.fr,
      options: this._shuffle([correct, ...distractors]),
      answer: correct,
      data: { id: verb.id, tr: example.tr, fr: example.fr, type: 'verb' }
    };
  },

  createVerbFill(verb, person, tense, allowedTenses) {
    const personFr = { ben: 'Je', sen: 'Tu', o: 'Il / Elle', biz: 'Nous', siz: 'Vous', onlar: 'Ils / Elles' };
    const tenseLabel = {
      present: 'présent',
      past: 'passé',
      future: 'futur',
      present_neg: 'présent négatif',
      aorist: 'aoriste (habitude)',
      pastNarrative: 'passé narratif (-mış)'
    };

    // Résoudre la table de conjugaison (normale ou négative)
    let conjugTable;
    if (tense === 'present_neg') {
      conjugTable = verb.negations && verb.negations.present;
    } else {
      conjugTable = verb.conjugations && verb.conjugations[tense];
    }
    if (!conjugTable || !conjugTable[person]) return null;

    const correct = conjugTable[person];
    const allPersons = ['ben', 'sen', 'o', 'biz', 'siz', 'onlar'];

    // Distracteurs : mauvaises personnes dans la même forme (même temps/mode)
    const wrongByPerson = allPersons
      .filter(p => p !== person)
      .map(p => conjugTable[p])
      .filter(f => f && f !== correct);

    // Distracteurs : même personne, autre temps (confusion temps/mode) — v10 AXE 1.2 :
    // jamais un temps pas encore enseigné (ex. aoriste/-mış proposés dès u10).
    let otherTenses = tense === 'present_neg'
      ? ['present', 'past']
      : Object.keys(verb.conjugations).filter(t => t !== tense);
    if (allowedTenses) otherTenses = otherTenses.filter(t => allowedTenses.includes(t));
    const wrongByTense = otherTenses
      .map(t => {
        const tbl = verb.conjugations && verb.conjugations[t];
        return tbl && tbl[person];
      })
      .filter(f => f && f !== correct);

    // Pour le présent négatif : ajouter la forme affirmative du même temps comme distractor clé
    if (tense === 'present_neg' && verb.conjugations && verb.conjugations.present) {
      const affirmatif = verb.conjugations.present[person];
      if (affirmatif && affirmatif !== correct && !wrongByTense.includes(affirmatif)) {
        wrongByTense.unshift(affirmatif);
      }
    }

    const candidates = [...new Set([...wrongByPerson, ...wrongByTense])];
    const distractors = this._shuffle(candidates).slice(0, 3);
    if (distractors.length === 0) return null;

    // Exemple contextuel aléatoire si disponible — v10 AXE 1.2 : jamais un exemple dont
    // le temps propre au verbe n'a pas encore été enseigné.
    let exampleChoices = verb.examples || [];
    if (allowedTenses) {
      exampleChoices = exampleChoices.filter(ex => {
        const t = this._detectExampleTense(verb, ex.tr);
        return t && allowedTenses.includes(t);
      });
    }
    const example = exampleChoices.length > 0
      ? exampleChoices[Math.floor(Math.random() * exampleChoices.length)]
      : null;
    const hintText = example
      ? `${verb.fr} — <em>${example.tr}</em>`
      : verb.fr;

    return {
      type: 'qcm',
      subtype: 'verb_fill',
      question: `${personFr[person]} _______`,
      verbMeta: {
        infinitive: verb.infinitive,
        fr: verb.fr,
        person,
        personLabel: personFr[person],
        tense,
        tenseLabel: tenseLabel[tense]
      },
      hint: hintText,
      options: this._shuffle([correct, ...distractors]),
      answer: correct,
      data: {
        id: verb.id,
        tr: correct,
        fr: verb.fr,
        type: 'verb',
        tense: tense === 'present_neg' ? 'present' : tense
      }
    };
  },

  createListeningTranscribe(chapter, allowedTenses, knownVocabIds) {
    const chapterVocabIds = (chapter && chapter.vocabIds) || [];
    const chapterVerbIds  = (chapter && chapter.verbIds)  || [];

    // Pool 1a : vocab DIRECT du chapitre (≤ 3 mots turcs), limité à ce qui est déjà enseigné
    // ou connu (v10 AXE 1.4) — `chapter.vocabIds` peut dépasser l'échantillon réellement
    // enseigné (vocabSample), notamment quand l'unité complète du vocab a été utilisée.
    let shortVocab = chapterVocabIds.length > 0
      ? (window.AppVocabulary || []).filter(v =>
          chapterVocabIds.includes(v.id) && v.tr && v.tr.split(' ').length <= 3
          && (!knownVocabIds || knownVocabIds.has(v.id))
        )
      : [];
    // Pool 1b : fallback global UNIQUEMENT hors leçon (révision) — Pilier B
    if (shortVocab.length === 0 && !chapter) {
      shortVocab = (window.AppVocabulary || []).filter(v =>
        v.tr && v.tr.split(' ').length <= 3 && (v.difficulty ?? 3) <= 2
      );
    }
    if (shortVocab.length > 0) {
      const item = shortVocab[Math.floor(Math.random() * shortVocab.length)];
      return {
        type: 'listening_transcribe',
        text: item.tr,
        hint: item.fr,
        data: { id: item.id, tr: item.tr, fr: item.fr, type: 'vocabulary' }
      };
    }
    // Pool 2 : exemples de verbes ≤ 4 mots — verbes du chapitre en leçon,
    // tous les verbes uniquement en révision (Pilier B)
    const verbExamples = [];
    const verbs = (window.AppVerbs || []);
    const verbsPool = chapterVerbIds.length > 0
      ? verbs.filter(v => chapterVerbIds.includes(v.id))
      : (chapter ? [] : verbs);
    for (const verb of verbsPool) {
      for (const ex of (verb.examples || [])) {
        if (!(ex && ex.tr && ex.tr.split(' ').length <= 4)) continue;
        // v10 AXE 1.2 : jamais un exemple dont le temps n'a pas encore été enseigné.
        let t = null;
        if (allowedTenses) {
          t = this._detectExampleTense(verb, ex.tr);
          if (!t || !allowedTenses.includes(t)) continue;
        }
        verbExamples.push({ id: 'lt_' + verb.id, tr: ex.tr, fr: ex.fr, verbId: verb.id, tense: t });
      }
    }
    if (verbExamples.length > 0) {
      const pick = verbExamples[Math.floor(Math.random() * verbExamples.length)];
      return {
        type: 'listening_transcribe',
        text: pick.tr,
        hint: pick.fr,
        // v10 AXE 1.2 : traçabilité explicite pour tools/verify-tense-gating.js.
        sourceVerbId: pick.verbId,
        sourceTense: pick.tense,
        data: { id: pick.id, tr: pick.tr, fr: pick.fr, type: 'phrase' }
      };
    }
    return null;
  },

  getSmartDistractors(targetWord, count, field) {
    // P1 : même topic (confusion sémantique réelle)
    const sameTopic = AppVocabulary.filter(w =>
      w.id !== targetWord.id && w.topic === targetWord.topic && w[field] !== targetWord[field]
    );
    // P2 : même type grammatical
    const sameType = AppVocabulary.filter(w =>
      w.id !== targetWord.id && w.type === targetWord.type &&
      w.topic !== targetWord.topic && w[field] !== targetWord[field]
    );
    // P3 : fallback difficulté similaire
    const similar = AppVocabulary.filter(w =>
      w.id !== targetWord.id && !sameTopic.find(s => s.id === w.id) &&
      !sameType.find(s => s.id === w.id) && w[field] !== targetWord[field]
    );

    // AXE 2.4 — préférer des distracteurs de LONGUEUR proche de la réponse
    // (plus plausibles, moins « devinables » par élimination visuelle).
    const targetLen = String(targetWord[field] || '').length;
    const byLenProximity = (arr) => this._shuffle(arr).sort((a, b) =>
      Math.abs(String(a[field]).length - targetLen) - Math.abs(String(b[field]).length - targetLen)
    );

    const result = [];
    const targetVal = String(targetWord[field]).toLocaleLowerCase('tr-TR');
    const addUnique = (arr) => {
      for (const w of byLenProximity(arr)) {
        if (result.length >= count) break;
        const val = w[field];
        // jamais la bonne réponse déguisée (casse/espaces), jamais un doublon
        if (String(val).toLocaleLowerCase('tr-TR') === targetVal) continue;
        if (!result.includes(val)) result.push(val);
      }
    };
    addUnique(sameTopic);
    if (result.length < count) addUnique(sameType);
    if (result.length < count) addUnique(similar);

    return result.slice(0, count);
  },

  _shuffle(arr) {
    return [...arr].sort(() => 0.5 - Math.random());
  },

  generateForGrammarRule(ruleId) {
    const rule = window.AppGrammar && AppGrammar.find(g => g.id === ruleId);
    if (!rule) return [];
    if (!rule.exercises || rule.exercises.length === 0) {
      // Fallback: 3 vocab QCMs
      const fallback = this._shuffle(AppVocabulary).slice(0, 3);
      return fallback.map(w => this.createQCMTrFr(w));
    }
    return rule.exercises.map(ex => this.createGrammarPracticeExercise(ex, ruleId, rule.title));
  },

  createGrammarPracticeExercise(exerciseData, ruleId, ruleTitle) {
    return {
      type: 'qcm',
      subtype: 'grammar_fill',
      question: exerciseData.prompt,
      grammarMeta: {
        ruleId: ruleId,
        ruleTitle: ruleTitle,
        hint: exerciseData.hint || ''
      },
      hint: exerciseData.hint || '',
      options: this._shuffle([...exerciseData.options]),
      answer: exerciseData.answer,
      data: {
        id: ruleId,
        tr: exerciseData.answer,
        fr: exerciseData.explanation || ruleTitle,
        type: 'grammar'
      }
    };
  }
};
