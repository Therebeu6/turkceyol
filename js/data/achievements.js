/* ═══════════════════════════════════════════════
   TürkçeYol — achievements.js
   Badges et récompenses
   ═══════════════════════════════════════════════ */

window.AppAchievements = [
  { id: 'ach_first_word', icon: '🌱', title: 'Première graine', description: 'Apprendre votre premier mot turc.', condition: 'words_learned >= 1' },
  { id: 'ach_streak_3', icon: '🔥', title: 'En feu', description: 'Atteindre un streak de 3 jours.', condition: 'streak >= 3' },
  { id: 'ach_streak_7', icon: '🌟', title: 'Habitude', description: 'Atteindre un streak de 7 jours.', condition: 'streak >= 7' },
  { id: 'ach_unit_1', icon: '🏅', title: 'Premier pas', description: 'Terminer l\'Unité 1.', condition: 'unit_completed == u1' },
  { id: 'ach_vocab_50', icon: '📚', title: 'Vocabulaire de base', description: 'Maîtriser 50 mots.', condition: 'words_mastered >= 50' },
  { id: 'ach_verb_master', icon: '⚡', title: 'Maître des verbes', description: 'Maîtriser 10 verbes (3 temps).', condition: 'verbs_mastered >= 10' },
  { id: 'ach_streak_14', icon: '🗓', title: 'Régulier', description: '14 jours de streak.', condition: { type: 'streak', value: 14 } },
  { id: 'ach_streak_30', icon: '🏆', title: 'Expert', description: '30 jours de streak.', condition: { type: 'streak', value: 30 } },
  { id: 'ach_perfect_3', icon: '🎯', title: 'Perfectionniste', description: '3 leçons terminées à 100%.', condition: { type: 'perfect_lessons', value: 3 } },
  { id: 'ach_dialogues_5', icon: '📖', title: 'Lecteur', description: '5 dialogues lus.', condition: { type: 'dialogues_read', value: 5 } },
  { id: 'ach_combo_10', icon: '⚡', title: 'Série', description: '10 réponses consécutives correctes.', condition: { type: 'max_combo', value: 10 } },
  { id: 'ach_voyageur', icon: '🌍', title: 'Voyageur', description: 'Unité Transport terminée.', condition: { type: 'unit_completed', unitId: 'u7' } }
];
