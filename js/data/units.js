/* ═══════════════════════════════════════════════
   TürkçeYol — units.js
   Structure du parcours d'apprentissage (12 Units)
   Champ `tenses` : restreint les temps testés dans les exercices
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
        goal: 'Pays, origines, langues et nationalités',
        xpReward: 70,
        time: 8,
        tags: ['Identité', 'A1'],
        vocabIds: ['v_fransiz', 'v_turk', 'v_ingiliz', 'v_alman', 'v_italyan', 'v_ispanyol', 'v_fransa', 'v_turkiye', 'v_ingiltere', 'v_almanya', 'v_dil', 'v_ulke', 'v_nerelisiniz'],
        verbIds: ['vb_olmak', 'vb_konusmak']
      },
      {
        id: 'u2_c3',
        title: 'Mon âge',
        goal: 'Dire et demander l\'âge avec des chiffres',
        xpReward: 50,
        time: 6,
        tags: ['Identité', 'A1'],
        vocabIds: ['v_yas', 'v_bir', 'v_iki', 'v_uc', 'v_dort', 'v_bes', 'v_alti', 'v_yedi', 'v_sekiz', 'v_dokuz', 'v_on', 'v_yirmi', 'v_otuz'],
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
        vocabIds: ['v_ben', 'v_isim', 'v_yas', 'v_fransiz', 'v_turk', 'v_ingiliz', 'v_doktor', 'v_ogretmen', 'v_dil', 'v_ulke'],
        verbIds: ['vb_olmak', 'vb_konusmak', 'vb_calismak']
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
        goal: 'Dire l\'heure et les jours de la semaine',
        xpReward: 70,
        time: 9,
        tags: ['Temps', 'A1'],
        vocabIds: ['v_saat', 'v_gun', 'v_sabah', 'v_aksam', 'v_gece', 'v_bugun', 'v_yarin', 'v_dun', 'v_pazartesi', 'v_sali', 'v_carsamba', 'v_persembe', 'v_cuma', 'v_cumartesi', 'v_pazar'],
        verbIds: []
      },
      {
        id: 'u3_c2',
        title: 'Mots de la maison',
        goal: 'Pièces et objets du quotidien',
        xpReward: 80,
        time: 9,
        tags: ['Maison', 'A1'],
        vocabIds: ['v_ev', 'v_kapi', 'v_pencere', 'v_masa', 'v_sandalye', 'v_yatak', 'v_mutfak', 'v_banyo'],
        verbIds: []
      },
      {
        id: 'u3_c3',
        title: 'Aujourd\'hui et demain',
        goal: 'Notions de temps : hier, aujourd\'hui, demain',
        xpReward: 70,
        time: 8,
        tags: ['Temps', 'A1'],
        vocabIds: ['v_bugun', 'v_yarin', 'v_dun', 'v_simdi', 'v_sabah', 'v_aksam', 'v_hafta', 'v_ay', 'v_yil'],
        verbIds: ['vb_gitmek', 'vb_gelmek']
      },
      {
        id: 'u3_c4',
        title: 'Les chiffres 10–1000',
        goal: 'Compter jusqu\'à 1000 : dizaines et centaines',
        xpReward: 60,
        time: 7,
        tags: ['Nombres', 'A1'],
        vocabIds: ['v_on', 'v_yirmi', 'v_otuz', 'v_kirk', 'v_elli', 'v_altmis', 'v_yetmis', 'v_seksen', 'v_doksan', 'v_yuz', 'v_bin'],
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
        goal: 'Taille, apparence et caractère',
        xpReward: 80,
        time: 9,
        tags: ['Adjectifs', 'A1'],
        vocabIds: ['v_guzel', 'v_iyi', 'v_buyuk', 'v_kucuk', 'v_genc', 'v_yasli', 'v_uzun', 'v_kisa', 'v_zeki'],
        verbIds: ['vb_olmak']
      },
      {
        id: 'u4_c3',
        title: 'Possessifs',
        goal: 'Mon/ma/mes — les pronoms possessifs',
        xpReward: 80,
        time: 9,
        tags: ['Grammaire', 'A1'],
        vocabIds: ['v_ben', 'v_sen', 'v_o', 'v_biz', 'v_siz', 'v_onlar', 'v_aile', 'v_anne', 'v_baba', 'v_kardes'],
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
        goal: 'Magasin, hôpital, gare, hôtel...',
        xpReward: 80,
        time: 9,
        tags: ['Lieux', 'A1'],
        vocabIds: ['v_ev', 'v_okul', 'v_hastane', 'v_sokak', 'v_market', 'v_havalimani', 'v_otel', 'v_restoran', 'v_banka', 'v_eczane', 'v_polis'],
        verbIds: []
      },
      {
        id: 'u5_c2',
        title: 'Demander son chemin',
        goal: 'Où est... ? À gauche, à droite, tout droit',
        xpReward: 90,
        time: 10,
        tags: ['Directions', 'A1'],
        vocabIds: ['v_sag', 'v_sol', 'v_duz', 'v_kose', 'v_yakin', 'v_uzak', 'v_karsisinda', 'v_hastane', 'v_okul', 'v_market', 'v_otel'],
        verbIds: ['vb_gitmek', 'vb_gelmek']
      },
      {
        id: 'u5_c3',
        title: 'Transports',
        goal: 'Bus, métro, taxi, train, avion',
        xpReward: 70,
        time: 8,
        tags: ['Transport', 'A1'],
        vocabIds: ['v_otobus', 'v_metro', 'v_araba', 'v_taksi', 'v_tren', 'v_ucak', 'v_havalimani'],
        verbIds: ['vb_gitmek']
      },
      {
        id: 'u5_c4',
        title: 'Directions',
        goal: 'Tout droit, tournez à gauche, c\'est près',
        xpReward: 80,
        time: 9,
        tags: ['Directions', 'A1'],
        vocabIds: ['v_sag', 'v_sol', 'v_duz', 'v_kose', 'v_yakin', 'v_uzak', 'v_karsisinda', 'v_ev', 'v_okul', 'v_market'],
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
        goal: 'Fruits, légumes, viandes et produits de base',
        xpReward: 80,
        time: 10,
        tags: ['Nourriture', 'A1'],
        vocabIds: ['v_ekmek', 'v_et', 'v_tavuk', 'v_balik', 'v_peynir', 'v_elma', 'v_domates', 'v_pirinc', 'v_seker', 'v_sut', 'v_yumurta', 'v_meyve', 'v_sebze'],
        verbIds: []
      },
      {
        id: 'u6_c2',
        title: 'Les boissons',
        goal: 'Eau, thé, café, jus de fruit',
        xpReward: 60,
        time: 6,
        tags: ['Boissons', 'A1'],
        vocabIds: ['v_su', 'v_cay', 'v_kahve', 'v_sut', 'v_meyve_suyu', 'v_ayran'],
        verbIds: ['vb_icmek']
      },
      {
        id: 'u6_c3',
        title: 'Au restaurant',
        goal: 'Commander un plat et payer l\'addition',
        xpReward: 100,
        time: 11,
        tags: ['Restaurant', 'A1'],
        vocabIds: ['v_su', 'v_cay', 'v_kahve', 'v_ekmek', 'v_et', 'v_tavuk', 'v_para', 'v_hesap', 'v_fiyat'],
        verbIds: ['vb_istemek', 'vb_yemek', 'vb_icmek']
      },
      {
        id: 'u6_c4',
        title: 'Goûts et préférences',
        goal: 'J\'aime, je n\'aime pas, c\'est délicieux',
        xpReward: 80,
        time: 9,
        tags: ['Nourriture', 'A1'],
        vocabIds: ['v_lezzetli', 'v_tatli', 'v_aci', 'v_guzel', 'v_iyi', 'v_ucuz', 'v_pahali', 'v_ekmek', 'v_et', 'v_tavuk', 'v_su', 'v_cay'],
        verbIds: ['vb_sevmek', 'vb_istemek', 'vb_yemek', 'vb_icmek']
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
        goal: 'Combien ça coûte ? C\'est cher ou pas cher ?',
        xpReward: 80,
        time: 8,
        tags: ['Commerce', 'A1'],
        vocabIds: ['v_para', 'v_fiyat', 'v_hesap', 'v_ucuz', 'v_pahali', 'v_on', 'v_yirmi', 'v_otuz', 'v_elli', 'v_yuz'],
        verbIds: []
      },
      {
        id: 'u7_c2',
        title: 'Vêtements',
        goal: 'Chemise, pantalon, robe, chaussures...',
        xpReward: 70,
        time: 8,
        tags: ['Vêtements', 'A1'],
        vocabIds: ['v_gomlek', 'v_pantolon', 'v_elbise', 'v_ayakkabi', 'v_kazak', 'v_canta', 'v_yeni', 'v_eski', 'v_buyuk', 'v_kucuk'],
        verbIds: []
      },
      {
        id: 'u7_c3',
        title: 'Couleurs et tailles',
        goal: 'Décrire la couleur et la taille d\'un article',
        xpReward: 60,
        time: 7,
        tags: ['Couleurs', 'A1'],
        vocabIds: ['v_kirmizi', 'v_mavi', 'v_yesil', 'v_sari', 'v_siyah', 'v_beyaz', 'v_buyuk', 'v_kucuk', 'v_uzun', 'v_kisa'],
        verbIds: []
      },
      {
        id: 'u7_c4',
        title: 'Comparer',
        goal: 'Plus grand, moins cher, très beau...',
        xpReward: 90,
        time: 10,
        tags: ['Adjectifs', 'A1'],
        vocabIds: ['v_guzel', 'v_iyi', 'v_buyuk', 'v_kucuk', 'v_ucuz', 'v_pahali', 'v_hizli', 'v_yavas', 'v_uzun', 'v_kisa'],
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
        goal: 'Pardon ? Pouvez-vous répéter / parler plus lentement ?',
        xpReward: 60,
        time: 6,
        tags: ['Communication', 'A2'],
        vocabIds: ['v_tamam', 'v_affedersiniz', 'v_lutfen', 'v_tekrar', 'v_yavas_konusun'],
        verbIds: ['vb_anlamak', 'vb_konusmak']
      },
      {
        id: 'u8_c2',
        title: 'Demander de l\'aide',
        goal: 'J\'ai besoin de... Au secours ! C\'est urgent',
        xpReward: 80,
        time: 9,
        tags: ['Urgences', 'A2'],
        vocabIds: ['v_yardim', 'v_acil', 'v_hastane', 'v_eczane', 'v_polis', 'v_doktor'],
        verbIds: ['vb_istemek', 'vb_anlamak']
      },
      {
        id: 'u8_c3',
        title: 'Je ne comprends pas',
        goal: 'Gérer l\'incompréhension en turc',
        xpReward: 60,
        time: 7,
        tags: ['Communication', 'A2'],
        vocabIds: ['v_anlamiyorum', 'v_bilmiyorum', 'v_tekrar', 'v_yavas_konusun', 'v_lutfen', 'v_affedersiniz'],
        verbIds: ['vb_anlamak', 'vb_bilmek']
      },
      {
        id: 'u8_c4',
        title: 'Urgences',
        goal: 'Médecin, police, pharmacie : les mots qui sauvent',
        xpReward: 90,
        time: 10,
        tags: ['Urgences', 'A2'],
        vocabIds: ['v_yardim', 'v_acil', 'v_hastane', 'v_eczane', 'v_polis', 'v_doktor'],
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
        goal: 'Se lever, dormir, manger, aller au travail',
        xpReward: 90,
        time: 10,
        tags: ['Routine', 'A2'],
        vocabIds: ['v_sabah', 'v_aksam', 'v_gece', 'v_bugun', 'v_saat'],
        verbIds: ['vb_uyumak', 'vb_kalkmak', 'vb_yemek', 'vb_icmek', 'vb_gitmek']
      },
      {
        id: 'u9_c2',
        title: 'Verbes de mouvement',
        goal: 'Aller, venir, partir — avec lieu et transport',
        xpReward: 90,
        time: 10,
        tags: ['Verbes', 'A2'],
        vocabIds: ['v_ev', 'v_okul', 'v_market', 'v_otobus', 'v_tren', 'v_araba'],
        verbIds: ['vb_gitmek', 'vb_gelmek']
      },
      {
        id: 'u9_c3',
        title: 'Ce que je fais',
        goal: 'Introduction au présent progressif en contexte',
        xpReward: 100,
        time: 11,
        tags: ['Verbes', 'A2'],
        vocabIds: ['v_ben', 'v_sen', 'v_biz', 'v_sabah', 'v_aksam'],
        verbIds: ['vb_yapmak', 'vb_calismak', 'vb_yemek', 'vb_icmek', 'vb_uyumak'],
        tenses: ['present']
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
        goal: 'Comprendre les suffixes -mak et -mek',
        xpReward: 80,
        time: 8,
        tags: ['Grammaire', 'A2'],
        vocabIds: [],
        verbIds: ['vb_olmak', 'vb_yapmak', 'vb_gitmek', 'vb_gelmek'],
        tenses: ['present']
      },
      {
        id: 'u10_c2',
        title: 'Le présent affirmatif',
        goal: 'Former le présent progressif avec -iyor',
        xpReward: 120,
        time: 12,
        tags: ['Grammaire', 'A2'],
        vocabIds: [],
        verbIds: ['vb_yapmak', 'vb_gitmek', 'vb_gelmek', 'vb_konusmak', 'vb_yemek', 'vb_icmek'],
        tenses: ['present']
      },
      {
        id: 'u10_c3',
        title: 'Le présent négatif',
        goal: 'Former la négation avec -miyor (-mıyor, -muyor, -müyor)',
        xpReward: 100,
        time: 10,
        tags: ['Grammaire', 'A2'],
        vocabIds: [],
        verbIds: ['vb_yapmak', 'vb_gitmek', 'vb_istemek', 'vb_anlamak'],
        tenses: ['present_neg']
      },
      {
        id: 'u10_c4',
        title: 'Poser une question',
        goal: 'La particule interrogative mi/mı/mu/mü',
        xpReward: 100,
        time: 10,
        tags: ['Grammaire', 'A2'],
        vocabIds: [],
        verbIds: ['vb_gitmek', 'vb_gelmek', 'vb_istemek', 'vb_olmak'],
        tenses: ['present']
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
        goal: 'Suffixe -di / -dı / -du / -dü',
        xpReward: 120,
        time: 11,
        tags: ['Grammaire', 'A2'],
        vocabIds: ['v_dun', 'v_sabah', 'v_aksam'],
        verbIds: ['vb_gitmek', 'vb_gelmek', 'vb_yapmak', 'vb_yemek'],
        tenses: ['past']
      },
      {
        id: 'u11_c2',
        title: 'Raconter sa journée',
        goal: 'Enchaîner des actions passées en contexte',
        xpReward: 120,
        time: 12,
        tags: ['Passé', 'A2'],
        vocabIds: ['v_bugun', 'v_dun', 'v_aksam', 'v_sabah'],
        verbIds: ['vb_gitmek', 'vb_gelmek', 'vb_yemek', 'vb_icmek', 'vb_calismak', 'vb_uyumak'],
        tenses: ['past']
      },
      {
        id: 'u11_c3',
        title: 'Le futur',
        goal: 'Suffixe -ecek / -acak — projets et intentions',
        xpReward: 120,
        time: 11,
        tags: ['Grammaire', 'A2'],
        vocabIds: ['v_yarin', 'v_hafta', 'v_ay'],
        verbIds: ['vb_gitmek', 'vb_gelmek', 'vb_yapmak', 'vb_olmak'],
        tenses: ['future']
      },
      {
        id: 'u11_c4',
        title: 'Mes projets',
        goal: 'Exprimer des intentions futures en contexte',
        xpReward: 100,
        time: 10,
        tags: ['Futur', 'A2'],
        vocabIds: ['v_yarin', 'v_hafta', 'v_ay', 'v_yil'],
        verbIds: ['vb_gitmek', 'vb_gelmek', 'vb_calismak', 'vb_istemek', 'vb_sevmek'],
        tenses: ['future']
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
        goal: 'Réserver une chambre et gérer un problème',
        xpReward: 130,
        time: 12,
        tags: ['Voyage', 'B1'],
        vocabIds: ['v_otel', 'v_bilet', 'v_bagaj', 'v_para', 'v_hesap', 'v_gece', 'v_saat'],
        verbIds: ['vb_istemek', 'vb_olmak', 'vb_gitmek']
      },
      {
        id: 'u12_c2',
        title: 'Dans l\'avion',
        goal: 'Vocabulaire du voyage, douanes et aéroport',
        xpReward: 130,
        time: 11,
        tags: ['Voyage', 'B1'],
        vocabIds: ['v_ucak', 'v_bilet', 'v_bagaj', 'v_pasaport', 'v_havalimani'],
        verbIds: ['vb_gitmek', 'vb_olmak']
      },
      {
        id: 'u12_c3',
        title: 'Rencontre informelle',
        goal: 'Dialogue long multi-temps avec un natif',
        xpReward: 150,
        time: 12,
        tags: ['Conversation', 'B1'],
        vocabIds: ['v_arkadas', 'v_bugun', 'v_yarin', 'v_dun', 'v_otel', 'v_saat'],
        verbIds: ['vb_gitmek', 'vb_gelmek', 'vb_olmak', 'vb_konusmak', 'vb_yapmak']
      },
      {
        id: 'u12_c4',
        title: 'Test A1',
        goal: 'Validation finale du niveau — 50 questions mixtes',
        xpReward: 200,
        time: 12,
        tags: ['Révision', 'A1'],
        vocabIds: ['v_merhaba', 'v_tesekkurler', 'v_evet', 'v_hayir', 'v_fransiz', 'v_turk', 'v_sag', 'v_sol', 'v_bugun', 'v_yarin'],
        verbIds: ['vb_gitmek', 'vb_gelmek', 'vb_olmak', 'vb_yapmak', 'vb_istemek', 'vb_sevmek']
      }
    ]
  }
];
