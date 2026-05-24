/* ═══════════════════════════════════════════════
   TürkçeYol — exercises.js
   Générateur d'exercices avec distracteurs intelligents
   ═══════════════════════════════════════════════ */

window.Exercises = {

  generateForChapter(chapterId) {
    let chapter = null, unit = null;
    for (const u of AppUnits) {
      const c = u.chapters.find(ch => ch.id === chapterId);
      if (c) { chapter = c; unit = u; break; }
    }

    const hasExplicitVocab = chapter && chapter.vocabIds && chapter.vocabIds.length > 0;

    // Vocab du chapitre — fallback seulement si le chapitre a du vocab explicite
    let vocab = [];
    if (hasExplicitVocab) {
      vocab = chapter.vocabIds.map(id => AppVocabulary.find(w => w.id === id)).filter(Boolean);
      // Complément depuis l'unité
      if (vocab.length < 5 && unit) {
        const unitIds = new Set(unit.chapters.flatMap(c => c.vocabIds || []));
        const extra = AppVocabulary.filter(w => unitIds.has(w.id) && !vocab.find(v => v.id === w.id));
        vocab.push(...this._shuffle(extra));
      }
      // Fallback global minimal
      if (vocab.length < 4) {
        const extra = AppVocabulary.filter(w => !vocab.find(v => v.id === w.id));
        vocab.push(...this._shuffle(extra).slice(0, 4 - vocab.length));
      }
    }

    // Verbes du chapitre
    let verbs = [];
    if (chapter && chapter.verbIds && chapter.verbIds.length > 0) {
      verbs = chapter.verbIds.map(id => window.AppVerbs && AppVerbs.find(v => v.id === id)).filter(Boolean);
    }

    // Temps autorisés (présent_neg inclus pour u10_c3)
    const allowedTenses = (chapter && chapter.tenses) || ['present', 'past', 'future'];

    const exercises = [];

    // Exercices de vocabulaire (seulement si vocab explicite)
    if (vocab.length > 0) {
      const vocabSample = this._shuffle(vocab).slice(0, 5);
      vocabSample.forEach((word, i) => {
        if (i % 5 === 0) exercises.push(this.createQCMTrFr(word));
        else if (i % 5 === 1) exercises.push(this.createQCMFrTr(word));
        else if (i % 5 === 2) exercises.push(this.createInputTr(word));
        else if (i % 5 === 3) exercises.push(this.createTrueFalse(word));
        else exercises.push(this.createAudioQCM(word));
      });
    }

    // Exercices de conjugaison
    if (verbs.length > 0) {
      const persons = ['ben', 'sen', 'o', 'biz', 'siz', 'onlar'];
      // Chapitre grammaire pure (pas de vocab) → plus d'exercices de conjugaison
      const count = !hasExplicitVocab ? Math.min(8, verbs.length * 2 + 1) : Math.min(3, verbs.length + 1);
      for (let i = 0; i < count; i++) {
        const verb = verbs[i % verbs.length];
        const person = persons[i % persons.length];
        const tense = allowedTenses[i % allowedTenses.length];
        const ex = this.createVerbFill(verb, person, tense);
        if (ex) exercises.push(ex);
      }
    }

    // Fallback si aucun exercice généré
    if (exercises.length === 0) {
      const fallback = this._shuffle(AppVocabulary).slice(0, 5);
      fallback.forEach((word, i) => {
        exercises.push(i % 2 === 0 ? this.createQCMTrFr(word) : this.createQCMFrTr(word));
      });
    }

    // Word order (si verbes disponibles)
    if (verbs.length > 0) {
      const wo = this.createWordOrder(verbs, null);
      if (wo) exercises.push(wo);
    }

    // Sentence builder (si verbes avec examples[] ≥ 3 mots)
    const sb = this.createSentenceBuilder(chapter);
    if (sb) exercises.push(sb);

    // Cloze (si verbes avec examples[])
    if (verbs.length > 0) {
      const cz = this.createCloze(verbs);
      if (cz) exercises.push(cz);
    }

    // Grammar fill (si règles avec drills[])
    const gf = this.createGrammarFill();
    if (gf) exercises.push(gf);

    // Dialogue fill (si dialogues ≥ 4 répliques)
    const df = this.createDialogueFill();
    if (df) exercises.push(df);

    // Match pairs (si vocab suffisant)
    if (vocab.length >= 4) {
      const mp = this.createMatchPairs(vocab);
      if (mp) exercises.push(mp);
    }

    // Listening transcribe (1 par session)
    const lt = this.createListeningTranscribe(chapter);
    if (lt) exercises.push(lt);

    return this._shuffle(exercises);
  },

  generateForReview(reviewItems) {
    const exercises = [];
    for (const item of reviewItems) {
      const word = AppVocabulary.find(w => w.id === item.id);
      if (word) {
        exercises.push(Math.random() > 0.5 ? this.createQCMTrFr(word) : this.createQCMFrTr(word));
        continue;
      }
      if (window.AppVerbs) {
        const verb = AppVerbs.find(v => v.id === item.id);
        if (verb) {
          const persons = ['ben', 'sen', 'o', 'biz'];
          const tenses = ['present', 'past', 'future'];
          const person = persons[Math.floor(Math.random() * persons.length)];
          const tense = tenses[Math.floor(Math.random() * tenses.length)];
          const ex = this.createVerbFill(verb, person, tense);
          if (ex) exercises.push(ex);
        }
      }
    }
    // Bonus word_order + match_pairs sur le vocab de révision
    const revVocab = reviewItems.map(it => AppVocabulary.find(w => w.id === it.id)).filter(Boolean);
    const revVerbs = window.AppVerbs ? reviewItems.map(it => AppVerbs.find(v => v.id === it.id)).filter(Boolean) : [];
    if (revVocab.length >= 4) {
      const mp = this.createMatchPairs(revVocab);
      if (mp) exercises.push(mp);
    }
    if (revVerbs.length > 0) {
      const wo = this.createWordOrder(revVerbs, null);
      if (wo) exercises.push(wo);
    }
    if (revVerbs.length > 0) {
      const cz = this.createCloze(revVerbs);
      if (cz) exercises.push(cz);
    }
    const sbRev = this.createSentenceBuilder(null);
    if (sbRev) exercises.push(sbRev);
    const gf = this.createGrammarFill();
    if (gf) exercises.push(gf);
    const df = this.createDialogueFill();
    if (df) exercises.push(df);
    const lt = this.createListeningTranscribe(null);
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

  createWordOrder(verbsPool, phrasesPool) {
    const withEx = (verbsPool || []).filter(v => v.examples && v.examples.length > 0);
    let source = null;
    if (withEx.length > 0) {
      const candidates = [];
      for (const v of this._shuffle(withEx)) {
        for (const ex of v.examples) {
          if (ex.tr && ex.tr.split(' ').length >= 3) candidates.push(ex);
        }
      }
      if (candidates.length > 0) source = candidates[Math.floor(Math.random() * candidates.length)];
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
      data: { id: 'wo_phrase', tr: source.tr, fr: source.fr, type: 'phrase' }
    };
  },

  createSentenceBuilder(chapter) {
    const verbs = (window.AppVerbs || []).filter(v =>
      (v.examples || []).some(ex => ex.tr && ex.tr.split(' ').length >= 3)
    );
    if (verbs.length === 0) return null;

    const verb = verbs[Math.floor(Math.random() * verbs.length)];
    const example = (verb.examples || []).find(ex => ex.tr && ex.tr.split(' ').length >= 3);
    if (!example) return null;

    const correctBlocks = example.tr.split(' ');

    // Distracteurs depuis AppVocabulary (mots courts, pas déjà dans la phrase)
    const allVocab = (window.AppVocabulary || []).filter(v =>
      v.tr && v.tr.split(' ').length === 1 && !correctBlocks.includes(v.tr)
    );
    const distractors = [];
    const shuffledVocab = allVocab.sort(() => Math.random() - 0.5);
    for (let i = 0; i < shuffledVocab.length && distractors.length < 3; i++) {
      distractors.push(shuffledVocab[i].tr);
    }

    const allBlocks = [...correctBlocks, ...distractors].sort(() => Math.random() - 0.5);

    return {
      type: 'sentence_builder',
      blocks: allBlocks,
      correct: correctBlocks,
      hint: example.fr,
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

  // ── Dialogue fill : compléter une réplique masquée dans un dialogue ──
  createDialogueFill() {
    if (!window.AppDialogues || AppDialogues.length === 0) return null;
    const candidates = AppDialogues.filter(d => d.turns && d.turns.length >= 4);
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
    let pool = [...new Set(sameDialogue)];

    // Compléter depuis d'autres dialogues si nécessaire
    if (pool.length < 2) {
      const allOthers = AppDialogues
        .filter(d => d.id !== dialogue.id)
        .flatMap(d => (d.turns || []).map(t => t.tr))
        .filter(t => t && t !== correctTurn.tr);
      pool = [...new Set([...pool, ...this._shuffle(allOthers)])];
    }
    const distractors = this._shuffle(pool).slice(0, 2);
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
  createGrammarFill() {
    if (!window.AppGrammar) return null;
    const withDrills = AppGrammar.filter(g => Array.isArray(g.drills) && g.drills.length > 0);
    if (withDrills.length === 0) return null;
    const rule = withDrills[Math.floor(Math.random() * withDrills.length)];
    const drill = rule.drills[Math.floor(Math.random() * rule.drills.length)];
    if (!drill || !drill.correct || !Array.isArray(drill.distractors) || drill.distractors.length < 3) {
      return null;
    }
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
  createCloze(verbsPool) {
    const candidates = [];
    for (const v of (verbsPool || [])) {
      if (!v.examples || !v.examples.length) continue;
      for (const ex of v.examples) {
        if (!ex.tr) continue;
        const words = ex.tr.split(/\s+/);
        if (words.length < 3) continue;
        candidates.push({ verb: v, example: ex, words });
      }
    }
    if (candidates.length === 0) return null;

    const { verb, example, words } = candidates[Math.floor(Math.random() * candidates.length)];

    // Collecter toutes les formes conjuguées (positive + négative présent)
    const allForms = new Set();
    for (const tense of Object.keys(verb.conjugations || {})) {
      for (const p of Object.keys(verb.conjugations[tense])) {
        const f = verb.conjugations[tense][p];
        if (f) allForms.add(f.toLocaleLowerCase('tr-TR'));
      }
    }
    if (verb.negations && verb.negations.present) {
      for (const p of Object.keys(verb.negations.present)) {
        const f = verb.negations.present[p];
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

  createVerbFill(verb, person, tense) {
    const personFr = { ben: 'Je', sen: 'Tu', o: 'Il / Elle', biz: 'Nous', siz: 'Vous', onlar: 'Ils / Elles' };
    const tenseLabel = {
      present: 'présent',
      past: 'passé',
      future: 'futur',
      present_neg: 'présent négatif'
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

    // Distracteurs : même personne, autre temps (confusion temps/mode)
    const otherTenses = tense === 'present_neg'
      ? ['present', 'past']
      : Object.keys(verb.conjugations).filter(t => t !== tense);
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

    // Exemple contextuel aléatoire si disponible
    const example = verb.examples && verb.examples.length > 0
      ? verb.examples[Math.floor(Math.random() * verb.examples.length)]
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

  createListeningTranscribe(chapter) {
    // Source: mots A1 courts (≤2 mots) de AppVocabulary
    const shortVocab = (window.AppVocabulary || []).filter(v =>
      v.level === 'A1' && v.tr && v.tr.split(' ').length <= 2
    );
    let item = null;
    if (shortVocab.length > 0) {
      item = shortVocab[Math.floor(Math.random() * shortVocab.length)];
      return {
        type: 'listening_transcribe',
        text: item.tr,
        hint: item.fr,
        data: { id: item.id, tr: item.tr, fr: item.fr, type: 'vocabulary' }
      };
    }
    // Fallback: verb example ≤4 mots
    const verbs = (window.AppVerbs || []);
    for (const verb of verbs) {
      const ex = (verb.examples || [])[0];
      if (ex && ex.tr && ex.tr.split(' ').length <= 4) {
        return {
          type: 'listening_transcribe',
          text: ex.tr,
          hint: ex.fr,
          data: { id: 'lt_' + verb.id, tr: ex.tr, fr: ex.fr, type: 'vocabulary' }
        };
      }
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

    const result = [];
    const addUnique = (arr) => {
      for (const w of this._shuffle(arr)) {
        if (result.length >= count) break;
        if (!result.includes(w[field])) result.push(w[field]);
      }
    };
    addUnique(sameTopic);
    if (result.length < count) addUnique(sameType);
    if (result.length < count) addUnique(similar);

    return result.slice(0, count);
  },

  _shuffle(arr) {
    return [...arr].sort(() => 0.5 - Math.random());
  }
};
