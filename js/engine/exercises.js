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

    // Vocab du chapitre
    let vocab = [];
    if (chapter && chapter.vocabIds && chapter.vocabIds.length > 0) {
      vocab = chapter.vocabIds.map(id => AppVocabulary.find(w => w.id === id)).filter(Boolean);
    }
    // Complément depuis l'unité
    if (vocab.length < 5 && unit) {
      const unitIds = new Set(unit.chapters.flatMap(c => c.vocabIds || []));
      const extra = AppVocabulary.filter(w => unitIds.has(w.id) && !vocab.find(v => v.id === w.id));
      vocab.push(...this._shuffle(extra));
    }
    // Fallback global
    if (vocab.length < 5) {
      const extra = AppVocabulary.filter(w => !vocab.find(v => v.id === w.id));
      vocab.push(...this._shuffle(extra).slice(0, 5 - vocab.length));
    }

    // Verbes du chapitre
    let verbs = [];
    if (chapter && chapter.verbIds && chapter.verbIds.length > 0) {
      verbs = chapter.verbIds.map(id => window.AppVerbs && AppVerbs.find(v => v.id === id)).filter(Boolean);
    }

    const exercises = [];
    const vocabSample = this._shuffle(vocab).slice(0, 5);

    vocabSample.forEach((word, i) => {
      if (i % 3 === 0) exercises.push(this.createQCMTrFr(word));
      else if (i % 3 === 1) exercises.push(this.createQCMFrTr(word));
      else exercises.push(this.createInputTr(word));
    });

    // Exercices de conjugaison
    if (verbs.length > 0) {
      const tenses = ['present', 'past', 'future'];
      const persons = ['ben', 'sen', 'o', 'biz'];
      const count = Math.min(3, verbs.length + 1);
      for (let i = 0; i < count; i++) {
        const verb = verbs[i % verbs.length];
        const person = persons[i % persons.length];
        const tense = tenses[i % tenses.length];
        exercises.push(this.createVerbFill(verb, person, tense));
      }
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
          exercises.push(this.createVerbFill(verb, person, tense));
        }
      }
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

  createVerbFill(verb, person, tense) {
    const personFr = { ben: 'Je', sen: 'Tu', o: 'Il / Elle', biz: 'Nous', siz: 'Vous', onlar: 'Ils / Elles' };
    const tenseLabel = { present: 'présent', past: 'passé', future: 'futur' };
    const correct = verb.conjugations[tense][person];

    // Distracteurs : mauvaises personnes + mauvais temps (erreurs réelles d'apprenants)
    const allPersons = ['ben', 'sen', 'o', 'biz', 'siz', 'onlar'];
    const wrongByPerson = allPersons
      .filter(p => p !== person)
      .map(p => verb.conjugations[tense][p])
      .filter(f => f && f !== correct);

    const otherTenses = Object.keys(verb.conjugations).filter(t => t !== tense);
    const wrongByTense = otherTenses.map(t => verb.conjugations[t][person]).filter(f => f && f !== correct);

    const candidates = [...new Set([...wrongByPerson, ...wrongByTense])];
    const distractors = this._shuffle(candidates).slice(0, 3);

    return {
      type: 'qcm',
      subtype: 'verb_fill',
      question: `<span class="verb-person-label">${personFr[person]}</span> _______ <span class="verb-tense-label">(${verb.infinitive} · ${tenseLabel[tense]})</span>`,
      hint: verb.fr,
      options: this._shuffle([correct, ...distractors]),
      answer: correct,
      data: {
        id: verb.id,
        tr: `${personFr[person]} ${correct}`,
        fr: `${personFr[person]} ${verb.fr}`,
        type: 'verb',
        tense
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
    // P3 : difficulté similaire (fallback)
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
