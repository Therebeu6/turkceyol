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

    // Match pairs (si vocab suffisant)
    if (vocab.length >= 4) {
      const mp = this.createMatchPairs(vocab);
      if (mp) exercises.push(mp);
    }

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
