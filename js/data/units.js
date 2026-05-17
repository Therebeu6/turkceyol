/* ═══════════════════════════════════════════════
   TürkçeYol — units.js
   Structure du parcours d'apprentissage (12 Units)
   ═══════════════════════════════════════════════ */

window.AppUnits = [
  {
    id: 'u1',
    title: 'Premiers pas',
    description: 'Bases, salutations et prononciation.',
    icon: '👋',
    chapters: [
      { id: 'u1_c1', title: 'Sons et lettres clés', goal: 'Lire les sons ç, ş, ğ, ı, ö, ü', xpReward: 50 },
      { id: 'u1_c2', title: 'Bonjour et au revoir', goal: 'Saluer et prendre congé', xpReward: 50 },
      { id: 'u1_c3', title: 'Politesse essentielle', goal: 'Dire merci, pardon, s\'il vous plaît', xpReward: 60 },
      { id: 'u1_c4', title: 'Oui, non, peut-être', goal: 'Réponses de base', xpReward: 40 },
      { id: 'u1_c5', title: 'Les chiffres 1–10', goal: 'Compter jusqu\'à 10', xpReward: 70 }
    ]
  },
  {
    id: 'u2',
    title: 'Me présenter',
    description: 'Parler de soi : nom, âge, nationalité.',
    icon: '👤',
    chapters: [
      { id: 'u2_c1', title: 'Je m\'appelle...', goal: 'Dire et demander son prénom', xpReward: 60 },
      { id: 'u2_c2', title: 'Ma nationalité', goal: 'Pays, origines et langues', xpReward: 70 },
      { id: 'u2_c3', title: 'Mon âge', goal: 'Dire et demander l\'âge', xpReward: 50 },
      { id: 'u2_c4', title: 'Mon métier', goal: 'Professions fréquentes', xpReward: 70 },
      { id: 'u2_c5', title: 'Mini présentation', goal: 'Enchaîner 4 phrases sur soi', xpReward: 100 }
    ]
  },
  {
    id: 'u3',
    title: 'Le quotidien',
    description: 'Mots de la maison, l\'heure, les jours.',
    icon: '🏠',
    chapters: [
      { id: 'u3_c1', title: 'L\'heure et les jours', goal: 'Dire l\'heure et les jours', xpReward: 70 },
      { id: 'u3_c2', title: 'Mots de la maison', goal: 'Pièces et objets', xpReward: 80 },
      { id: 'u3_c3', title: 'Aujourd\'hui et demain', goal: 'Notions de temps', xpReward: 70 },
      { id: 'u3_c4', title: 'Les chiffres 10–100', goal: 'Compter jusqu\'à 100', xpReward: 60 }
    ]
  },
  {
    id: 'u4',
    title: 'Famille et entourage',
    description: 'Parler de ses proches et les décrire.',
    icon: '👨‍👩‍👧‍👦',
    chapters: [
      { id: 'u4_c1', title: 'Ma famille', goal: 'Membres de la famille', xpReward: 70 },
      { id: 'u4_c2', title: 'Décrire quelqu\'un', goal: 'Taille, apparence, caractère', xpReward: 80 },
      { id: 'u4_c3', title: 'Possessifs', goal: 'Mon/ma/mes en turc', xpReward: 80 }
    ]
  },
  {
    id: 'u5',
    title: 'Se déplacer',
    description: 'Lieux, directions et transports.',
    icon: '🗺️',
    chapters: [
      { id: 'u5_c1', title: 'Lieux de la ville', goal: 'Magasin, hôpital, gare...', xpReward: 80 },
      { id: 'u5_c2', title: 'Demander son chemin', goal: 'Où est... ? Comment aller à...', xpReward: 90 },
      { id: 'u5_c3', title: 'Transports', goal: 'Bus, métro, taxi', xpReward: 70 },
      { id: 'u5_c4', title: 'Directions', goal: 'Tout droit, gauche, droite', xpReward: 80 }
    ]
  },
  {
    id: 'u6',
    title: 'Manger et boire',
    description: 'Aliments, restaurant, goûts.',
    icon: '🍽️',
    chapters: [
      { id: 'u6_c1', title: 'Les aliments', goal: 'Fruits, légumes, plats', xpReward: 80 },
      { id: 'u6_c2', title: 'Les boissons', goal: 'Eau, thé, café', xpReward: 60 },
      { id: 'u6_c3', title: 'Au restaurant', goal: 'Commander et payer', xpReward: 100 },
      { id: 'u6_c4', title: 'Goûts et préférences', goal: 'J\'aime / Je n\'aime pas', xpReward: 80 }
    ]
  },
  {
    id: 'u7',
    title: 'Acheter et comparer',
    description: 'Shopping, vêtements, prix.',
    icon: '🛍️',
    chapters: [
      { id: 'u7_c1', title: 'Les prix', goal: 'Combien ça coûte ?', xpReward: 80 },
      { id: 'u7_c2', title: 'Vêtements', goal: 'Vocabulaire shopping', xpReward: 70 },
      { id: 'u7_c3', title: 'Couleurs et tailles', goal: 'Décrire un achat', xpReward: 60 },
      { id: 'u7_c4', title: 'Comparer', goal: 'Plus, moins, très', xpReward: 90 }
    ]
  },
  {
    id: 'u8',
    title: 'Se faire comprendre',
    description: 'Clarifications et urgences.',
    icon: '🆘',
    chapters: [
      { id: 'u8_c1', title: 'Faire répéter', goal: 'Pardon ? Plus lentement ?', xpReward: 60 },
      { id: 'u8_c2', title: 'Demander de l\'aide', goal: 'J\'ai besoin de...', xpReward: 80 },
      { id: 'u8_c3', title: 'Je ne comprends pas', goal: 'Gérer l\'incompréhension', xpReward: 60 },
      { id: 'u8_c4', title: 'Urgences', goal: 'Médecin, police, pharmacie', xpReward: 90 }
    ]
  },
  {
    id: 'u9',
    title: 'Ma routine',
    description: 'Actions du quotidien et verbes de mouvement.',
    icon: '⏰',
    chapters: [
      { id: 'u9_c1', title: 'Ma journée type', goal: 'Se lever, manger, dormir', xpReward: 90 },
      { id: 'u9_c2', title: 'Verbes de mouvement', goal: 'Aller, venir, partir', xpReward: 90 },
      { id: 'u9_c3', title: 'Ce que je fais', goal: 'Introduction au présent progressif', xpReward: 100 }
    ]
  },
  {
    id: 'u10',
    title: 'Conjugaison : Présent',
    description: 'Maîtriser le temps présent progressif (-iyor).',
    icon: '⚡',
    chapters: [
      { id: 'u10_c1', title: 'Les infinitifs', goal: 'Comprendre -mak et -mek', xpReward: 80 },
      { id: 'u10_c2', title: 'Le présent affirmatif', goal: 'Suffixe -iyor', xpReward: 120 },
      { id: 'u10_c3', title: 'Le présent négatif', goal: 'Suffixe -miyor', xpReward: 100 },
      { id: 'u10_c4', title: 'Poser une question', goal: 'Particule mi/mu', xpReward: 100 }
    ]
  },
  {
    id: 'u11',
    title: 'Passé et Futur',
    description: 'Parler de ce qui a été fait et ce qui sera fait.',
    icon: '⏳',
    chapters: [
      { id: 'u11_c1', title: 'Le passé simple', goal: 'Suffixe -di / -dı', xpReward: 120 },
      { id: 'u11_c2', title: 'Raconter sa journée', goal: 'Actions passées en contexte', xpReward: 120 },
      { id: 'u11_c3', title: 'Le futur', goal: 'Suffixe -ecek / -acak', xpReward: 120 },
      { id: 'u11_c4', title: 'Mes projets', goal: 'Exprimer des intentions futures', xpReward: 100 }
    ]
  },
  {
    id: 'u12',
    title: 'Missions réelles (A1)',
    description: 'Mises en situation pratiques et test final.',
    icon: '🏆',
    chapters: [
      { id: 'u12_c1', title: 'À l\'hôtel', goal: 'Réserver et gérer un problème', xpReward: 130 },
      { id: 'u12_c2', title: 'Dans l\'avion', goal: 'Voyage et douanes', xpReward: 130 },
      { id: 'u12_c3', title: 'Rencontre informelle', goal: 'Dialogue long multi-temps', xpReward: 150 },
      { id: 'u12_c4', title: 'Test A1', goal: 'Validation finale du niveau', xpReward: 200 }
    ]
  }
];
