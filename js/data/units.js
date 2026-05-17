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
    color: '#E8571A',
    chapters: [
      {
        id: 'u1_c1',
        title: 'Sons et lettres clés',
        goal: 'Lire les sons ç, ş, ğ, ı, ö, ü',
        xpReward: 50,
        time: 5,
        tags: ['Alphabet', 'A1'],
        vocabIds: ['v_merhaba', 'v_gunaydin', 'v_iyi_aksamlar', 'v_iyi_geceler', 'v_evet', 'v_hayir', 'v_tamam'],
        verbIds: []
      },
      {
        id: 'u1_c2',
        title: 'Bonjour et au revoir',
        goal: 'Saluer et prendre congé',
        xpReward: 50,
        time: 6,
        tags: ['Salutations', 'A1'],
        vocabIds: ['v_merhaba', 'v_gunaydin', 'v_iyi_aksamlar', 'v_iyi_geceler', 'v_gorusuruz', 'v_hoscakal', 'v_tesekkurler'],
        verbIds: []
      },
      {
        id: 'u1_c3',
        title: 'Politesse essentielle',
        goal: 'Dire merci, pardon, s\'il vous plaît',
        xpReward: 60,
        time: 7,
        tags: ['Politesse', 'A1'],
        vocabIds: ['v_tesekkurler', 'v_lutfen', 'v_affedersiniz', 'v_rica_ederim', 'v_ozur_dilerim'],
        verbIds: []
      },
      {
        id: 'u1_c4',
        title: 'Oui, non, peut-être',
        goal: 'Réponses de base',
        xpReward: 40,
        time: 5,
        tags: ['Base', 'A1'],
        vocabIds: ['v_evet', 'v_hayir', 'v_tamam', 'v_belki', 'v_tabii'],
        verbIds: []
      },
      {
        id: 'u1_c5',
        title: 'Les chiffres 1–10',
        goal: 'Compter jusqu\'à 10',
        xpReward: 70,
        time: 8,
        tags: ['Nombres', 'A1'],
        vocabIds: ['v_bir', 'v_iki', 'v_uc', 'v_dort', 'v_bes', 'v_alti', 'v_yedi', 'v_sekiz', 'v_dokuz', 'v_on'],
        verbIds: []
      }
    ]
  },
  {
    id: 'u2',
    title: 'Me présenter',
    description: 'Parler de soi : nom, âge, nationalité.',
    icon: '👤',
    color: '#4F8EF7',
    chapters: [
      {
        id: 'u2_c1',
        title: 'Je m\'appelle...',
        goal: 'Dire et demander son prénom',
        xpReward: 60,
        time: 7,
        tags: ['Identité', 'A1'],
        vocabIds: ['v_ben', 'v_sen', 'v_o', 'v_isim', 'v_arkadas'],
        verbIds: ['vb_olmak']
      },
      {
        id: 'u2_c2',
        title: 'Ma nationalité',
        goal: 'Pays, origines et langues',
        xpReward: 70,
        time: 8,
        tags: ['Identité', 'A1'],
        vocabIds: ['v_ben', 'v_sen', 'v_biz', 'v_siz'],
        verbIds: ['vb_olmak', 'vb_konusmak']
      },
      {
        id: 'u2_c3',
        title: 'Mon âge',
        goal: 'Dire et demander l\'âge',
        xpReward: 50,
        time: 6,
        tags: ['Identité', 'A1'],
        vocabIds: ['v_yas', 'v_ben', 'v_sen', 'v_o'],
        verbIds: ['vb_olmak']
      },
      {
        id: 'u2_c4',
        title: 'Mon métier',
        goal: 'Professions fréquentes',
        xpReward: 70,
        time: 8,
        tags: ['Métiers', 'A1'],
        vocabIds: ['v_doktor', 'v_ogretmen', 'v_ogrenci', 'v_muhendis', 'v_avukat', 'v_asci'],
        verbIds: ['vb_calismak']
      },
      {
        id: 'u2_c5',
        title: 'Mini présentation',
        goal: 'Enchaîner 4 phrases sur soi',
        xpReward: 100,
        time: 10,
        tags: ['Identité', 'A1'],
        vocabIds: ['v_ben', 'v_sen', 'v_isim', 'v_yas', 'v_arkadas', 'v_doktor', 'v_ogretmen'],
        verbIds: ['vb_olmak', 'vb_konusmak']
      }
    ]
  },
  {
    id: 'u3',
    title: 'Le quotidien',
    description: 'Mots de la maison, l\'heure, les jours.',
    icon: '🏠',
    color: '#22C55E',
    chapters: [
      {
        id: 'u3_c1',
        title: 'L\'heure et les jours',
        goal: 'Dire l\'heure et les jours',
        xpReward: 70,
        time: 9,
        tags: ['Temps', 'A1'],
        vocabIds: ['v_saat', 'v_gun', 'v_sabah', 'v_aksam', 'v_gece', 'v_bugun', 'v_yarin', 'v_dun', 'v_pazartesi', 'v_sali', 'v_carsamba', 'v_persembe', 'v_cuma', 'v_cumartesi', 'v_pazar'],
        verbIds: []
      },
      {
        id: 'u3_c2',
        title: 'Mots de la maison',
        goal: 'Pièces et objets',
        xpReward: 80,
        time: 9,
        tags: ['Maison', 'A1'],
        vocabIds: ['v_ev', 'v_kapi', 'v_pencere', 'v_masa', 'v_sandalye', 'v_yatak', 'v_mutfak', 'v_banyo'],
        verbIds: []
      },
      {
        id: 'u3_c3',
        title: 'Aujourd\'hui et demain',
        goal: 'Notions de temps',
        xpReward: 70,
        time: 8,
        tags: ['Temps', 'A1'],
        vocabIds: ['v_bugun', 'v_yarin', 'v_dun', 'v_simdi', 'v_sabah', 'v_aksam', 'v_hafta'],
        verbIds: ['vb_gitmek', 'vb_gelmek']
      },
      {
        id: 'u3_c4',
        title: 'Les chiffres 10–100',
        goal: 'Compter jusqu\'à 100',
        xpReward: 60,
        time: 7,
        tags: ['Nombres', 'A1'],
        vocabIds: ['v_yirmi', 'v_elli', 'v_yuz', 'v_on', 'v_bir', 'v_iki', 'v_uc', 'v_dort', 'v_bes'],
        verbIds: []
      }
    ]
  },
  {
    id: 'u4',
    title: 'Famille et entourage',
    description: 'Parler de ses proches et les décrire.',
    icon: '👨‍👩‍👧‍👦',
    color: '#F59E0B',
    chapters: [
      {
        id: 'u4_c1',
        title: 'Ma famille',
        goal: 'Membres de la famille',
        xpReward: 70,
        time: 8,
        tags: ['Famille', 'A1'],
        vocabIds: ['v_aile', 'v_anne', 'v_baba', 'v_kardes', 'v_erkek_kardes', 'v_kiz_kardes', 'v_abi', 'v_abla'],
        verbIds: []
      },
      {
        id: 'u4_c2',
        title: 'Décrire quelqu\'un',
        goal: 'Taille, apparence, caractère',
        xpReward: 80,
        time: 9,
        tags: ['Adjectifs', 'A1'],
        vocabIds: ['v_guzel', 'v_iyi', 'v_buyuk', 'v_kucuk', 'v_sicak', 'v_yeni', 'v_eski', 'v_hizli'],
        verbIds: ['vb_olmak']
      },
      {
        id: 'u4_c3',
        title: 'Possessifs',
        goal: 'Mon/ma/mes en turc',
        xpReward: 80,
        time: 9,
        tags: ['Grammaire', 'A1'],
        vocabIds: ['v_ben', 'v_sen', 'v_o', 'v_biz', 'v_siz', 'v_onlar', 'v_aile', 'v_anne', 'v_baba'],
        verbIds: []
      }
    ]
  },
  {
    id: 'u5',
    title: 'Se déplacer',
    description: 'Lieux, directions et transports.',
    icon: '🗺️',
    color: '#8B5CF6',
    chapters: [
      {
        id: 'u5_c1',
        title: 'Lieux de la ville',
        goal: 'Magasin, hôpital, gare...',
        xpReward: 80,
        time: 9,
        tags: ['Lieux', 'A1'],
        vocabIds: ['v_ev', 'v_okul', 'v_hastane', 'v_sokak', 'v_market', 'v_havalimani', 'v_otel', 'v_restoran', 'v_banka', 'v_eczane', 'v_polis'],
        verbIds: []
      },
      {
        id: 'u5_c2',
        title: 'Demander son chemin',
        goal: 'Où est... ? Comment aller à...',
        xpReward: 90,
        time: 10,
        tags: ['Lieux', 'A1'],
        vocabIds: ['v_hastane', 'v_okul', 'v_market', 'v_otel', 'v_restoran', 'v_eczane'],
        verbIds: ['vb_gitmek', 'vb_gelmek']
      },
      {
        id: 'u5_c3',
        title: 'Transports',
        goal: 'Bus, métro, taxi',
        xpReward: 70,
        time: 8,
        tags: ['Transport', 'A1'],
        vocabIds: ['v_otobus', 'v_metro', 'v_araba', 'v_taksi', 'v_tren', 'v_ucak', 'v_havalimani'],
        verbIds: ['vb_gitmek']
      },
      {
        id: 'u5_c4',
        title: 'Directions',
        goal: 'Tout droit, gauche, droite',
        xpReward: 80,
        time: 9,
        tags: ['Orientation', 'A1'],
        vocabIds: ['v_ev', 'v_okul', 'v_market', 'v_otel'],
        verbIds: ['vb_gitmek', 'vb_gelmek']
      }
    ]
  },
  {
    id: 'u6',
    title: 'Manger et boire',
    description: 'Aliments, restaurant, goûts.',
    icon: '🍽️',
    color: '#EF4444',
    chapters: [
      {
        id: 'u6_c1',
        title: 'Les aliments',
        goal: 'Fruits, légumes, plats',
        xpReward: 80,
        time: 10,
        tags: ['Nourriture', 'A1'],
        vocabIds: ['v_ekmek', 'v_et', 'v_tavuk', 'v_balik', 'v_peynir', 'v_elma', 'v_domates', 'v_pirinc', 'v_seker', 'v_sut', 'v_yumurta', 'v_meyve', 'v_sebze'],
        verbIds: []
      },
      {
        id: 'u6_c2',
        title: 'Les boissons',
        goal: 'Eau, thé, café',
        xpReward: 60,
        time: 6,
        tags: ['Boissons', 'A1'],
        vocabIds: ['v_su', 'v_cay', 'v_kahve', 'v_sut'],
        verbIds: ['vb_icmek']
      },
      {
        id: 'u6_c3',
        title: 'Au restaurant',
        goal: 'Commander et payer',
        xpReward: 100,
        time: 11,
        tags: ['Restaurant', 'A1'],
        vocabIds: ['v_su', 'v_cay', 'v_kahve', 'v_ekmek', 'v_et', 'v_tavuk', 'v_para', 'v_hesap'],
        verbIds: ['vb_istemek', 'vb_yemek', 'vb_icmek']
      },
      {
        id: 'u6_c4',
        title: 'Goûts et préférences',
        goal: 'J\'aime / Je n\'aime pas',
        xpReward: 80,
        time: 9,
        tags: ['Nourriture', 'A1'],
        vocabIds: ['v_guzel', 'v_iyi', 'v_ucuz', 'v_pahali', 'v_ekmek', 'v_et', 'v_tavuk', 'v_su', 'v_cay'],
        verbIds: ['vb_istemek', 'vb_yemek', 'vb_icmek']
      }
    ]
  },
  {
    id: 'u7',
    title: 'Acheter et comparer',
    description: 'Shopping, vêtements, prix.',
    icon: '🛍️',
    color: '#EC4899',
    chapters: [
      {
        id: 'u7_c1',
        title: 'Les prix',
        goal: 'Combien ça coûte ?',
        xpReward: 80,
        time: 8,
        tags: ['Commerce', 'A1'],
        vocabIds: ['v_para', 'v_fiyat', 'v_hesap', 'v_ucuz', 'v_pahali', 'v_bir', 'v_iki', 'v_on', 'v_yuz'],
        verbIds: []
      },
      {
        id: 'u7_c2',
        title: 'Vêtements',
        goal: 'Vocabulaire shopping',
        xpReward: 70,
        time: 8,
        tags: ['Shopping', 'A1'],
        vocabIds: ['v_yeni', 'v_eski', 'v_buyuk', 'v_kucuk', 'v_guzel'],
        verbIds: []
      },
      {
        id: 'u7_c3',
        title: 'Couleurs et tailles',
        goal: 'Décrire un achat',
        xpReward: 60,
        time: 7,
        tags: ['Couleurs', 'A1'],
        vocabIds: ['v_kirmizi', 'v_mavi', 'v_yesil', 'v_sari', 'v_siyah', 'v_beyaz'],
        verbIds: []
      },
      {
        id: 'u7_c4',
        title: 'Comparer',
        goal: 'Plus, moins, très',
        xpReward: 90,
        time: 10,
        tags: ['Adjectifs', 'A1'],
        vocabIds: ['v_guzel', 'v_iyi', 'v_buyuk', 'v_kucuk', 'v_ucuz', 'v_pahali', 'v_hizli', 'v_yavas'],
        verbIds: []
      }
    ]
  },
  {
    id: 'u8',
    title: 'Se faire comprendre',
    description: 'Clarifications et urgences.',
    icon: '🆘',
    color: '#14B8A6',
    chapters: [
      {
        id: 'u8_c1',
        title: 'Faire répéter',
        goal: 'Pardon ? Plus lentement ?',
        xpReward: 60,
        time: 6,
        tags: ['Communication', 'A2'],
        vocabIds: ['v_tamam', 'v_evet', 'v_hayir', 'v_affedersiniz', 'v_lutfen'],
        verbIds: ['vb_anlamak', 'vb_konusmak']
      },
      {
        id: 'u8_c2',
        title: 'Demander de l\'aide',
        goal: 'J\'ai besoin de...',
        xpReward: 80,
        time: 9,
        tags: ['Urgences', 'A2'],
        vocabIds: ['v_hastane', 'v_eczane', 'v_polis'],
        verbIds: ['vb_istemek', 'vb_anlamak']
      },
      {
        id: 'u8_c3',
        title: 'Je ne comprends pas',
        goal: 'Gérer l\'incompréhension',
        xpReward: 60,
        time: 7,
        tags: ['Communication', 'A2'],
        vocabIds: ['v_tamam', 'v_evet', 'v_hayir', 'v_tesekkurler'],
        verbIds: ['vb_anlamak', 'vb_konusmak']
      },
      {
        id: 'u8_c4',
        title: 'Urgences',
        goal: 'Médecin, police, pharmacie',
        xpReward: 90,
        time: 10,
        tags: ['Urgences', 'A2'],
        vocabIds: ['v_hastane', 'v_eczane', 'v_polis', 'v_doktor'],
        verbIds: ['vb_anlamak', 'vb_istemek']
      }
    ]
  },
  {
    id: 'u9',
    title: 'Ma routine',
    description: 'Actions du quotidien et verbes de mouvement.',
    icon: '⏰',
    color: '#F97316',
    chapters: [
      {
        id: 'u9_c1',
        title: 'Ma journée type',
        goal: 'Se lever, manger, dormir',
        xpReward: 90,
        time: 10,
        tags: ['Routine', 'A2'],
        vocabIds: ['v_sabah', 'v_aksam', 'v_gece', 'v_bugun', 'v_saat'],
        verbIds: ['vb_yapmak', 'vb_yemek', 'vb_icmek', 'vb_gitmek', 'vb_gelmek']
      },
      {
        id: 'u9_c2',
        title: 'Verbes de mouvement',
        goal: 'Aller, venir, partir',
        xpReward: 90,
        time: 10,
        tags: ['Verbes', 'A2'],
        vocabIds: ['v_ev', 'v_okul', 'v_market', 'v_otobus'],
        verbIds: ['vb_gitmek', 'vb_gelmek']
      },
      {
        id: 'u9_c3',
        title: 'Ce que je fais',
        goal: 'Introduction au présent progressif',
        xpReward: 100,
        time: 11,
        tags: ['Verbes', 'A2'],
        vocabIds: ['v_ben', 'v_sen', 'v_biz'],
        verbIds: ['vb_yapmak', 'vb_calismak', 'vb_yemek', 'vb_icmek']
      }
    ]
  },
  {
    id: 'u10',
    title: 'Conjugaison : Présent',
    description: 'Maîtriser le temps présent progressif (-iyor).',
    icon: '⚡',
    color: '#6366F1',
    chapters: [
      {
        id: 'u10_c1',
        title: 'Les infinitifs',
        goal: 'Comprendre -mak et -mek',
        xpReward: 80,
        time: 8,
        tags: ['Grammaire', 'A2'],
        vocabIds: [],
        verbIds: ['vb_olmak', 'vb_yapmak', 'vb_gitmek', 'vb_gelmek']
      },
      {
        id: 'u10_c2',
        title: 'Le présent affirmatif',
        goal: 'Suffixe -iyor',
        xpReward: 120,
        time: 12,
        tags: ['Grammaire', 'A2'],
        vocabIds: [],
        verbIds: ['vb_yapmak', 'vb_gitmek', 'vb_gelmek', 'vb_konusmak', 'vb_yemek', 'vb_icmek']
      },
      {
        id: 'u10_c3',
        title: 'Le présent négatif',
        goal: 'Suffixe -miyor',
        xpReward: 100,
        time: 10,
        tags: ['Grammaire', 'A2'],
        vocabIds: [],
        verbIds: ['vb_yapmak', 'vb_gitmek', 'vb_istemek', 'vb_anlamak']
      },
      {
        id: 'u10_c4',
        title: 'Poser une question',
        goal: 'Particule mi/mu',
        xpReward: 100,
        time: 10,
        tags: ['Grammaire', 'A2'],
        vocabIds: [],
        verbIds: ['vb_gitmek', 'vb_gelmek', 'vb_istemek', 'vb_olmak']
      }
    ]
  },
  {
    id: 'u11',
    title: 'Passé et Futur',
    description: 'Parler de ce qui a été fait et ce qui sera fait.',
    icon: '⏳',
    color: '#84CC16',
    chapters: [
      {
        id: 'u11_c1',
        title: 'Le passé simple',
        goal: 'Suffixe -di / -dı',
        xpReward: 120,
        time: 11,
        tags: ['Grammaire', 'A2'],
        vocabIds: ['v_dun'],
        verbIds: ['vb_gitmek', 'vb_gelmek', 'vb_yapmak', 'vb_yemek']
      },
      {
        id: 'u11_c2',
        title: 'Raconter sa journée',
        goal: 'Actions passées en contexte',
        xpReward: 120,
        time: 12,
        tags: ['Passé', 'A2'],
        vocabIds: ['v_bugun', 'v_dun', 'v_aksam'],
        verbIds: ['vb_gitmek', 'vb_gelmek', 'vb_yemek', 'vb_icmek', 'vb_calismak']
      },
      {
        id: 'u11_c3',
        title: 'Le futur',
        goal: 'Suffixe -ecek / -acak',
        xpReward: 120,
        time: 11,
        tags: ['Grammaire', 'A2'],
        vocabIds: ['v_yarin'],
        verbIds: ['vb_gitmek', 'vb_gelmek', 'vb_yapmak', 'vb_olmak']
      },
      {
        id: 'u11_c4',
        title: 'Mes projets',
        goal: 'Exprimer des intentions futures',
        xpReward: 100,
        time: 10,
        tags: ['Futur', 'A2'],
        vocabIds: ['v_yarin', 'v_hafta'],
        verbIds: ['vb_gitmek', 'vb_gelmek', 'vb_calismak', 'vb_istemek']
      }
    ]
  },
  {
    id: 'u12',
    title: 'Missions réelles (A1)',
    description: 'Mises en situation pratiques et test final.',
    icon: '🏆',
    color: '#F59E0B',
    chapters: [
      {
        id: 'u12_c1',
        title: 'À l\'hôtel',
        goal: 'Réserver et gérer un problème',
        xpReward: 130,
        time: 12,
        tags: ['Voyage', 'B1'],
        vocabIds: ['v_otel', 'v_bilet', 'v_bagaj', 'v_para', 'v_hesap'],
        verbIds: ['vb_istemek', 'vb_olmak', 'vb_gitmek']
      },
      {
        id: 'u12_c2',
        title: 'Dans l\'avion',
        goal: 'Voyage et douanes',
        xpReward: 130,
        time: 11,
        tags: ['Voyage', 'B1'],
        vocabIds: ['v_ucak', 'v_bilet', 'v_bagaj', 'v_pasaport'],
        verbIds: ['vb_gitmek', 'vb_olmak']
      },
      {
        id: 'u12_c3',
        title: 'Rencontre informelle',
        goal: 'Dialogue long multi-temps',
        xpReward: 150,
        time: 12,
        tags: ['Conversation', 'B1'],
        vocabIds: ['v_arkadas', 'v_bugun', 'v_yarin', 'v_otel'],
        verbIds: ['vb_gitmek', 'vb_gelmek', 'vb_olmak', 'vb_konusmak', 'vb_yapmak']
      },
      {
        id: 'u12_c4',
        title: 'Test A1',
        goal: 'Validation finale du niveau',
        xpReward: 200,
        time: 12,
        tags: ['Révision', 'A1'],
        vocabIds: ['v_merhaba', 'v_tesekkurler', 'v_evet', 'v_hayir', 'v_bugun', 'v_yarin'],
        verbIds: ['vb_gitmek', 'vb_gelmek', 'vb_olmak', 'vb_yapmak', 'vb_istemek']
      }
    ]
  }
];
