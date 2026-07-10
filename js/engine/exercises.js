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

    // Temps autorisés (présent_neg inclus pour u10_c3)
    const allowedTenses = (chapter && chapter.tenses) || ['present', 'past', 'future'];

    // Gating production (Pilier E) : u1 = reconnaissance pure,
    // u2 = saisie simple ok, u3+ = tout
    const unitNum = unit ? parseInt(unit.id.slice(1), 10) || 99 : 99;
    const prodLevel = unitNum <= 1 ? 0 : (unitNum === 2 ? 1 : 2);

    // ── Échantillon : on enseigne EXACTEMENT ce qu'on teste ──
    const vocabSample = this._shuffle(vocab).slice(0, 5);

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

    // 5) Conjugaison → rappel
    if (verbs.length > 0) {
      const persons = ['ben', 'sen', 'o', 'biz', 'siz', 'onlar'];
      const count = !hasExplicitVocab ? Math.min(8, verbs.length * 2 + 1) : Math.min(3, verbs.length + 1);
      for (let i = 0; i < count; i++) {
        const verb = verbs[i % verbs.length];
        const person = persons[i % persons.length];
        const tense = allowedTenses[i % allowedTenses.length];
        const ex = this.createVerbFill(verb, person, tense);
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
      const cz = this.createCloze(verbs);
      if (cz) recall.push(cz);
    }

    // 9) Match pairs (vocab du chapitre) → pratique
    if (vocab.length >= 4) {
      const mp = this.createMatchPairs(vocab);
      if (mp) practice.push(mp);
    }

    // 10) Production (si niveau suffisant)
    if (prodLevel >= 2) {
      if (verbs.length > 0) {
        const wo = this.createWordOrder(verbs, null);
        if (wo) produce.push(wo);
      }
      const sb = this.createSentenceBuilder(chapter);
      if (sb) produce.push(sb);
      const lt = this.createListeningTranscribe(chapter);
      if (lt) produce.push(lt);
    } else if (prodLevel === 1) {
      // Écoute d'un mot simple dès u2 (transcription courte)
      const lt = this.createListeningTranscribe(chapter);
      if (lt && lt.text && lt.text.split(' ').length <= 2) produce.push(lt);
    }

    // Fallback sécurité (données cassées uniquement)
    if (practice.length + recall.length + produce.length === 0) {
      const fallback = this._shuffle(AppVocabulary).slice(0, 5);
      fallback.forEach((word, i) => {
        practice.push(i % 2 === 0 ? this.createQCMTrFr(word) : this.createQCMFrTr(word));
      });
    }

    // ── Assemblage : découverte fixe, puis phases mélangées SANS répétition de type ──
    discover.forEach(e => { e.phase = 'discover'; });
    practice.forEach(e => { e.phase = 'practice'; });
    recall.forEach(e => { e.phase = 'recall'; });
    produce.forEach(e => { e.phase = 'produce'; });
    return [
      ...discover,
      ...this._antiRepeat(this._shuffle(practice)),
      ...this._antiRepeat(this._shuffle(recall)),
      ...this._antiRepeat(this._shuffle(produce))
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
        example: ex,
        data: { id: verb.id, tr: verb.infinitive, fr: verb.fr, type: 'verb' }
      });
      verbCards++;
    }
    return cards;
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

    const verb = verbPool[Math.floor(Math.random() * verbPool.length)];
    const example = (verb.examples || []).find(ex => ex.tr && ex.tr.split(' ').length >= 3);
    if (!example) return null;

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
    const chapterVocabIds = (chapter && chapter.vocabIds) || [];
    const chapterVerbIds  = (chapter && chapter.verbIds)  || [];

    // Pool 1a : vocab DIRECT du chapitre (≤ 3 mots turcs)
    let shortVocab = chapterVocabIds.length > 0
      ? (window.AppVocabulary || []).filter(v =>
          chapterVocabIds.includes(v.id) && v.tr && v.tr.split(' ').length <= 3
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
        if (ex && ex.tr && ex.tr.split(' ').length <= 4) {
          verbExamples.push({ id: 'lt_' + verb.id, tr: ex.tr, fr: ex.fr });
        }
      }
    }
    if (verbExamples.length > 0) {
      const pick = verbExamples[Math.floor(Math.random() * verbExamples.length)];
      return {
        type: 'listening_transcribe',
        text: pick.tr,
        hint: pick.fr,
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
