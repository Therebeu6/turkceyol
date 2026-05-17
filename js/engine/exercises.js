/* ═══════════════════════════════════════════════
   TürkçeYol — exercises.js
   Générateur d'exercices dynamiques
   ═══════════════════════════════════════════════ */

window.Exercises = {
  // Types : 'qcm_tr_fr', 'qcm_fr_tr', 'input_tr', 'order_words', 'verb_conj'
  
  generateForChapter(chapterId) {
    // Pour l'instant, on simule une génération en piochant aléatoirement dans le vocabulaire
    // Dans une app complète, on filtrerait le vocabulaire lié au chapitre
    
    const vocab = AppVocabulary.sort(() => 0.5 - Math.random()).slice(0, 5); // Prendre 5 mots au hasard
    let exercises = [];
    
    vocab.forEach((word, index) => {
      // Alterne entre différents types d'exercices pour varier
      if (index % 3 === 0) {
        exercises.push(this.createQCMTrFr(word));
      } else if (index % 3 === 1) {
        exercises.push(this.createQCMFrTr(word));
      } else {
        exercises.push(this.createInputTr(word));
      }
    });

    return exercises;
  },

  createQCMTrFr(targetWord) {
    // Trouver 3 distracteurs
    const distractors = this.getDistractors(targetWord, 3).map(w => w.fr);
    const options = [targetWord.fr, ...distractors].sort(() => 0.5 - Math.random());
    
    return {
      type: 'qcm',
      question: `Que signifie "<b>${targetWord.tr}</b>" ?`,
      options: options,
      answer: targetWord.fr,
      data: targetWord
    };
  },

  createQCMFrTr(targetWord) {
    const distractors = this.getDistractors(targetWord, 3).map(w => w.tr);
    const options = [targetWord.tr, ...distractors].sort(() => 0.5 - Math.random());
    
    return {
      type: 'qcm',
      question: `Comment dit-on "<b>${targetWord.fr}</b>" ?`,
      options: options,
      answer: targetWord.tr,
      data: targetWord
    };
  },
  
  createInputTr(targetWord) {
    return {
      type: 'input',
      question: `Traduisez en turc : "<b>${targetWord.fr}</b>"`,
      answer: targetWord.tr,
      data: targetWord
    };
  },

  getDistractors(targetWord, count) {
    // Prendre des mots au hasard qui ne sont pas le mot cible
    const pool = AppVocabulary.filter(w => w.id !== targetWord.id);
    return pool.sort(() => 0.5 - Math.random()).slice(0, count);
  }
};
