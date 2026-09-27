/* ═══════════════════════════════════════════════
   TürkçeYol — units.js
   Structure du parcours d'apprentissage (12 Units)
   Champ `tenses` : restreint les temps testés dans les exercices
   ═══════════════════════════════════════════════ */

window.AppUnits = [
  {
    id: 'u1',
    cefr: 'A1',
    title: 'Premiers pas',
    description: 'Bases, salutations et prononciation.',
    icon: '👋',
    color: '#E8571A',
    chapters: [
      {
        id: 'u1_c1',
        tips: [{ icon: '🔤', text: 'Bonne nouvelle : le turc se lit EXACTEMENT comme il s\'écrit. Une lettre = un son, toujours. Apprenez les 6 lettres spéciales et vous savez tout lire !' }],
        canDo: 'Je peux lire et prononcer les sons spéciaux du turc',
        // v10 AXE 3.4 : g_harmonie_majeure retiré — ses exercices testent le locatif (u5) et
        // le pluriel (u3), jamais enseignés à ce stade. La règle reste seule en u10_c1.
        title: 'Sons et lettres clés',
        goal: 'Lire les sons ç, ş, ğ, ı, ö, ü',
        xpReward: 50,
        time: 5,
        tags: ['Alphabet', 'A1'],
        // v10 AXE 4 : un mot par son spécial (au lieu de réutiliser les salutations d'u1_c2),
        // pour que ce chapitre tienne vraiment son objectif affiché.
        vocabIds: ['v_cay', 'v_seker', 'v_dag', 'v_yil', 'v_goz', 'v_uc'],
        verbIds: []
      },
      {
        id: 'u1_c2',
        phraseIds: ['p_iyiyim'],
        culture: 'En Turquie, on salue chaleureusement : une poignée de main ferme, souvent deux bises entre proches. « Merhaba » marche à toute heure ; « Selam » est plus familier entre jeunes.',
        canDo: 'Je peux saluer et prendre congé',
        // v10 AXE 3.3 : d_rencontre (prénom, origine, nationalité) est le programme de l'unité 2,
        // pas de ce chapitre — remplacé par un dialogue limité aux salutations.
        dialogueIds: ['d_selamlama'],
        title: 'Bonjour et au revoir',
        goal: 'Saluer et prendre congé',
        xpReward: 50,
        time: 6,
        tags: ['Salutations', 'A1'],
        // v10 AXE 5.4 : Nasılsın?/İyiyim entrent ici avec le dialogue de salutations (3.3),
        // qui les utilise déjà — pas juste ajoutés seuls, sans contexte.
        vocabIds: ['v_merhaba', 'v_gunaydin', 'v_iyi_aksamlar', 'v_iyi_geceler', 'v_gorusuruz', 'v_hoscakal', 'v_tesekkurler', 'v_nasilsin', 'v_iyiyim'],
        requiredVocabIds: ['v_nasilsin', 'v_iyiyim'],
        verbIds: []
      },
      {
        id: 'u1_c3',
        culture: '« Buyurun » est un mot magique : il veut dire « je vous en prie / voici / entrez / servez-vous » selon le contexte. Un commerçant vous accueillera toujours par « Buyurun ! ».',
        canDo: 'Je peux remercier et m\'excuser',
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
        canDo: 'Je peux répondre oui, non, d\'accord',
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
        tips: [{ icon: '🔢', text: 'Les nombres se combinent logiquement : on bir = 11 (dix-un), on üç = 13 (dix-trois). Aucune exception !' }],
        canDo: 'Je peux compter de 1 à 10',
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
    cefr: 'A1',
    title: 'Me présenter',
    description: 'Parler de soi : nom, âge, nationalité.',
    icon: '👤',
    color: '#4F8EF7',
    chapters: [
      {
        id: 'u2_c1',
        phraseIds: ['p_adiniz_ne', 'p_benim_adim'],
        culture: 'Le turc distingue « sen » (tu, proches) et « siz » (vous, politesse). Avec un inconnu ou une personne plus âgée, utilisez toujours « siz » — c\'est une marque de respect essentielle.',
        canDo: 'Je peux dire mon prénom et demander celui de quelqu\'un',
        grammarIds: ['g_ordre_mots'],
        dialogueIds: ['d_rencontre'],
        title: 'Je m\'appelle...',
        goal: 'Dire et demander son prénom',
        xpReward: 60,
        time: 7,
        tags: ['Identité', 'A1'],
        vocabIds: ['v_ben', 'v_sen', 'v_o', 'v_isim', 'v_arkadas'],
        verbIds: []
      },
      {
        id: 'u2_c2',
        phraseIds: ['p_fransaliyim'],
        tips: [{ icon: '🌍', text: 'Pas de masculin/féminin en turc : Fransız = français ET française. Le genre grammatical n\'existe pas !' }],
        canDo: 'Je peux dire ma nationalité et ma langue',
        grammarIds: ['g_copule'],
        dialogueIds: ['d_nationalite'],
        title: 'Ma nationalité',
        goal: 'Pays, origines, langues et nationalités',
        xpReward: 70,
        time: 8,
        tags: ['Identité', 'A1'],
        vocabIds: ['v_fransiz', 'v_turk', 'v_ingiliz', 'v_alman', 'v_italyan', 'v_ispanyol', 'v_fransa', 'v_turkiye', 'v_ingiltere', 'v_almanya', 'v_dil', 'v_ulke', 'v_nerelisiniz'],
        verbIds: ['vb_konusmak']
      },
      {
        id: 'u2_c3',
        phraseIds: ['p_kac_yasindasin'],
        canDo: 'Je peux dire et demander l\'âge',
        grammarIds: ['g_copule'],
        title: 'Mon âge',
        goal: 'Dire et demander l\'âge avec des chiffres',
        xpReward: 50,
        time: 6,
        tags: ['Identité', 'A1'],
        vocabIds: ['v_yas', 'v_bir', 'v_iki', 'v_uc', 'v_dort', 'v_bes', 'v_alti', 'v_yedi', 'v_sekiz', 'v_dokuz', 'v_on', 'v_yirmi', 'v_otuz'],
        verbIds: []
      },
      {
        id: 'u2_c4',
        phraseIds: ['p_is_ne_yapiyorsunuz'],
        canDo: 'Je peux dire mon métier',
        // v10 AXE 3.3 : d_calisma (futur, -abil, kadar) est niveau B1 — remplacé par un
        // dialogue à la copule, cohérent avec ce qui est enseigné jusqu'ici.
        dialogueIds: ['d_meslek_ne'],
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
        phraseIds: ['p_tanistigimiza_memnun_oldum', 'p_nerelisiniz'],
        canDo: 'Je peux me présenter en 4 phrases',
        grammarIds: ['g_ordre_mots', 'g_copule'],
        dialogueIds: ['d_rencontre', 'd_nationalite'],
        title: 'Mini présentation',
        goal: 'Enchaîner 4 phrases sur soi',
        xpReward: 100,
        time: 10,
        tags: ['Identité', 'A1'],
        vocabIds: ['v_ben', 'v_isim', 'v_yas', 'v_fransiz', 'v_turk', 'v_ingiliz', 'v_doktor', 'v_ogretmen', 'v_dil', 'v_ulke'],
        verbIds: ['vb_konusmak', 'vb_calismak']
      }
    ]
  },
  {
    id: 'u3',
    cefr: 'A1',
    title: 'Le quotidien',
    description: 'Mots de la maison, l\'heure, les jours.',
    icon: '🏠',
    color: '#22C55E',
    chapters: [
      {
        id: 'u3_c1',
        tips: [{ icon: '🕐', text: '« Saat kaç ? » = quelle heure est-il ? — mais « Kaç saat ? » = combien d\'heures ? L\'ordre des mots change tout.' }],
        canDo: 'Je peux dire l\'heure et les jours de la semaine',
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
        canDo: 'Je peux nommer les pièces et objets de base de la maison',
        grammarIds: ['g_pluriel'],
        // v10 AXE 3.3 : d_apartman (participes relatifs, -abil, conditionnel, aidat,
        // sözleşme) est bien trop avancé ici — il reste en u15, où il est à sa place.
        dialogueIds: ['d_ev_turu'],
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
        canDo: 'Je peux situer une action : hier, aujourd\'hui, demain',
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
        canDo: 'Je peux compter jusqu\'à 1000',
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
    cefr: 'A1',
    title: 'Famille et entourage',
    description: 'Parler de ses proches et les décrire.',
    icon: '👨‍👩‍👧‍👦',
    color: '#F59E0B',
    chapters: [
      {
        id: 'u4_c1',
        culture: '« Abi » (grand frère) et « abla » (grande sœur) ne servent pas qu\'en famille : on les utilise pour s\'adresser poliment à une personne un peu plus âgée, même un serveur ou un vendeur.',
        canDo: 'Je peux présenter ma famille',
        dialogueIds: ['d_aile', 'd_famille_elargie'],
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
        canDo: 'Je peux décrire l\'apparence de quelqu\'un',
        grammarIds: ['g_copule'],
        title: 'Décrire quelqu\'un',
        goal: 'Taille, apparence et caractère',
        xpReward: 80,
        time: 9,
        tags: ['Adjectifs', 'A1'],
        vocabIds: ['v_guzel', 'v_iyi', 'v_buyuk', 'v_kucuk', 'v_genc', 'v_yasli', 'v_uzun', 'v_kisa', 'v_zeki'],
        verbIds: []
      },
      {
        id: 'u4_c3',
        tips: [{ icon: '👪', text: 'En turc on ne dit pas « ma mère » avec un mot séparé : le possessif est un SUFFIXE collé au nom : annem = ma mère.' }],
        canDo: 'Je peux dire « mon, ton, son » avec les suffixes possessifs',
        grammarIds: ['g_possessif'],
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
    cefr: 'A1',
    title: 'Se déplacer',
    description: 'Lieux, directions et transports.',
    icon: '🗺️',
    color: '#8B5CF6',
    chapters: [
      {
        id: 'u5_c1',
        canDo: 'Je peux nommer les lieux courants de la ville',
        grammarIds: ['g_locatif'],
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
        phraseIds: ['p_tuvalet_nerede', 'p_hastane_nerede', 'p_ne_kadar_uzakta'],
        culture: 'Les Turcs sont réputés très serviables : demandez votre chemin et on vous accompagnera parfois sur plusieurs rues. Un « Affedersiniz » (excusez-moi) ouvre toutes les portes.',
        canDo: 'Je peux demander mon chemin',
        grammarIds: ['g_datif'],
        // v10 AXE 4 : u5_c2 (poser la question) et u5_c4 (comprendre la réponse) partageaient
        // le même dialogue — désormais différenciés.
        dialogueIds: ['d_yol_sorma'],
        title: 'Demander son chemin',
        goal: 'Où est... ? À gauche, à droite, tout droit',
        xpReward: 90,
        time: 10,
        tags: ['Directions', 'A1'],
        // v10 AXE 5.4 : v_nerede sert directement le goal « Où est... ? » — le dialogue
        // d_yol_sorma l'utilise déjà (« market nerede? ») mais il n'était pas rattaché ici.
        vocabIds: ['v_nerede', 'v_sag', 'v_sol', 'v_duz', 'v_kose', 'v_yakin', 'v_uzak', 'v_karsisinda', 'v_hastane', 'v_okul', 'v_market', 'v_otel'],
        requiredVocabIds: ['v_nerede'],
        verbIds: ['vb_gitmek', 'vb_gelmek']
      },
      {
        id: 'u5_c3',
        phraseIds: ['p_otobus_duragi_nerede', 'p_metro_nerede', 'p_bir_bilet_lutfen'],
        canDo: 'Je peux nommer les transports',
        dialogueIds: ['d_otobus', 'd_taksi'],
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
        phraseIds: ['p_duz_gidin', 'p_saga_donun', 'p_ilk_sola_donun', 'p_cok_uzak_degil'],
        canDo: 'Je peux comprendre des indications de direction',
        grammarIds: ['g_ablatif'],
        // v10 AXE 4 : garde d_direction (déjà orienté "comprendre la réponse" : "Sonra sağa
        // dönün"), tandis qu'u5_c2 obtient son propre dialogue de question.
        dialogueIds: ['d_direction'],
        title: 'Directions',
        goal: 'Tout droit, tournez à gauche, c\'est près',
        xpReward: 80,
        time: 9,
        tags: ['Directions', 'A1'],
        // v10 AXE 4 : ajout des postpositions (thème locatifs, jusque-là inutilisé),
        // pertinentes pour comprendre une direction ("à côté de", "devant", "derrière").
        vocabIds: ['v_sag', 'v_sol', 'v_duz', 'v_kose', 'v_yakin', 'v_uzak', 'v_karsisinda', 'v_ev', 'v_okul', 'v_market', 'v_yaninda', 'v_onunde', 'v_arkasinda'],
        verbIds: ['vb_gitmek', 'vb_gelmek']
      }
    ]
  },
  {
    id: 'u6',
    cefr: 'A1',
    title: 'Manger et boire',
    description: 'Aliments, restaurant, goûts.',
    icon: '🍽️',
    color: '#EF4444',
    chapters: [
      {
        id: 'u6_c1',
        phraseIds: ['p_cok_tuzlu'],
        canDo: 'Je peux nommer les aliments de base',
        dialogueIds: ['d_marche'],
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
        phraseIds: ['p_bir_cay_istiyorum'],
        culture: 'Le çay (thé) est une institution : servi dans un petit verre tulipe, offert partout, à toute heure, souvent gratuitement. Refuser un çay peut presque vexer — acceptez, c\'est un geste d\'hospitalité.',
        canDo: 'Je peux commander une boisson',
        dialogueIds: ['d_cafe'],
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
        phraseIds: ['p_menu_lutfen', 'p_hesap_lutfen', 'p_iki_kisilik_masa'],
        culture: 'À table, on souhaite « Afiyet olsun » (bon appétit) et on remercie le cuisinier par « Elinize sağlık » (santé à vos mains). Le pain (ekmek) accompagne quasiment tout repas.',
        tips: [{ icon: '🍽️', text: 'Pour commander poliment : « … istiyorum » (je voudrais) ou « … alabilir miyim ? » (puis-je avoir ?).' }],
        canDo: 'Je peux commander au restaurant et demander l\'addition',
        grammarIds: ['g_accusatif'],
        dialogueIds: ['d_restaurant_complet'],
        title: 'Au restaurant',
        goal: 'Commander un plat et payer l\'addition',
        xpReward: 100,
        time: 11,
        tags: ['Restaurant', 'A1'],
        vocabIds: ['v_su', 'v_cay', 'v_kahve', 'v_ekmek', 'v_et', 'v_tavuk', 'v_para', 'v_hesap', 'v_fiyat', 'v_istiyorum_chunk', 'v_alabilir_miyim'],
        // v10 AXE 1.5 : ces 2 chunks portent le canDo ("commander") — toujours enseignés,
        // jamais laissés au tirage aléatoire de l'échantillon.
        requiredVocabIds: ['v_istiyorum_chunk', 'v_alabilir_miyim'],
        // v10 AXE 5.3 : vermek (donner) était orphelin — cohérent ici (un serveur/client
        // donne/apporte l'addition, l'eau, etc.). requiredVerbIds garantit sa carte de
        // découverte malgré les 3 autres verbes déjà présents (relecture Codex : un chapitre
        // à >2 verbIds ne montre que 2 cartes par défaut, un verbe pouvait donc être testé
        // sans jamais être introduit).
        requiredVerbIds: ['vb_vermek'],
        verbIds: ['vb_istemek', 'vb_yemek', 'vb_icmek', 'vb_vermek']
      },
      {
        id: 'u6_c4',
        phraseIds: ['p_cok_lezzetli', 'p_vejeteryanim', 'p_asca_tebrikler'],
        culture: 'Le petit-déjeuner turc (kahvaltı) est un festin : fromages, olives, tomates, concombre, miel, œufs, pain frais et çay. C\'est souvent le repas préféré des Turcs.',
        canDo: 'Je peux dire ce que j\'aime et ce que je n\'aime pas',
        // v10 AXE 3.4 : g_yok_var (il y a / il n'y a pas) n'a aucun rapport avec "j'aime" —
        // remplacé par g_accusatif (déjà enseigné juste avant, u6_c3), pertinent pour
        // "Çayı seviyorum" (accusatif défini avec le chunk "seviyorum", cf. AXE 1.5).
        grammarIds: ['g_accusatif'],
        title: 'Goûts et préférences',
        goal: 'J\'aime, je n\'aime pas, c\'est délicieux',
        xpReward: 80,
        time: 9,
        tags: ['Nourriture', 'A1'],
        // v10 AXE 3.6 : Ucuz/Pahalı (prix) retirés — hors thème ici, déjà enseignés en u7.
        vocabIds: ['v_lezzetli', 'v_tatli', 'v_aci', 'v_guzel', 'v_iyi', 'v_ekmek', 'v_et', 'v_tavuk', 'v_su', 'v_cay', 'v_seviyorum', 'v_sevmiyorum'],
        // v10 AXE 1.5 : ces 2 chunks portent le canDo ("dire ce que j'aime") — toujours
        // enseignés, jamais laissés au tirage aléatoire de l'échantillon.
        requiredVocabIds: ['v_seviyorum', 'v_sevmiyorum'],
        verbIds: ['vb_sevmek', 'vb_istemek', 'vb_yemek', 'vb_icmek']
      }
    ]
  },
  {
    id: 'u7',
    cefr: 'A1',
    title: 'Acheter et comparer',
    description: 'Shopping, vêtements, prix.',
    icon: '🛍️',
    color: '#EC4899',
    chapters: [
      {
        id: 'u7_c1',
        phraseIds: ['p_ne_kadar', 'p_cok_pahali', 'p_servis_dahil_mi'],
        culture: 'Au bazar et sur les marchés, marchander (pazarlık) est normal et attendu. Dans les magasins à prix fixe, non. Souriez, discutez : le prix baisse souvent avec la sympathie.',
        canDo: 'Je peux demander et comprendre un prix',
        dialogueIds: ['d_supermarche'],
        title: 'Les prix',
        goal: 'Combien ça coûte ? C\'est cher ou pas cher ?',
        xpReward: 80,
        time: 8,
        tags: ['Commerce', 'A1'],
        vocabIds: ['v_para', 'v_fiyat', 'v_hesap', 'v_ucuz', 'v_pahali', 'v_on', 'v_yirmi', 'v_otuz', 'v_elli', 'v_yuz'],
        // v10 AXE 5.3 : satmak (vendre) était orphelin — cohérent avec le thème des prix
        // (un vendeur vend, un client demande le prix).
        requiredVerbIds: ['vb_satmak'],
        verbIds: ['vb_satmak']
      },
      {
        id: 'u7_c2',
        phraseIds: ['p_indirim_var_mi'],
        canDo: 'Je peux nommer les vêtements courants',
        dialogueIds: ['d_kiyafet'],
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
        canDo: 'Je peux décrire la couleur et la taille d\'un article',
        dialogueIds: ['d_kiyafet'],
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
        canDo: 'Je peux comparer deux choses (plus grand, moins cher)',
        grammarIds: ['g_comparatif'],
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
    cefr: 'A1',
    title: 'Se faire comprendre',
    description: 'Clarifications et urgences.',
    icon: '🆘',
    color: '#14B8A6',
    chapters: [
      {
        id: 'u8_c1',
        phraseIds: ['p_tekrar_eder_misiniz', 'p_yavas_konusur_musunuz', 'p_anlamiyorum'],
        canDo: 'Je peux faire répéter et demander de parler lentement',
        // v10 AXE 3.3/4 : d_telefon (réservation de restaurant B1) puis d_anlamadim (partagé
        // avec u8_c3) remplacés par un dialogue propre, focalisé sur la répétition seule.
        dialogueIds: ['d_tekrar_eder_misiniz'],
        title: 'Faire répéter',
        goal: 'Pardon ? Pouvez-vous répéter / parler plus lentement ?',
        xpReward: 60,
        time: 6,
        tags: ['Communication', 'A1'],
        vocabIds: ['v_tamam', 'v_affedersiniz', 'v_lutfen', 'v_tekrar', 'v_yavas_konusun'],
        verbIds: ['vb_anlamak', 'vb_konusmak']
      },
      {
        id: 'u8_c2',
        phraseIds: ['p_yardim_eder_misiniz'],
        canDo: 'Je peux demander de l\'aide',
        // v10 AXE 3.3 : un achat de médicament n'est pas une demande d'aide générale — ce
        // chapitre devient l'aide NON urgente (l'urgence proprement dite est en u8_c4/u16_c4,
        // qui reprend ici la note culturelle 112/İmdat, mieux à sa place).
        dialogueIds: ['d_yardim_rica'],
        title: 'Demander de l\'aide',
        goal: 'Demander un service ou un renseignement à quelqu\'un',
        xpReward: 80,
        time: 9,
        // v10 AXE 4 : tag et vocabulaire alignés sur l'aide NON urgente (le tag "Urgences"
        // et les mots médicaux appartiennent désormais à u8_c4).
        tags: ['Aide', 'A1'],
        vocabIds: ['v_yardim', 'v_eczane', 'v_yakin', 'v_kose'],
        verbIds: ['vb_istemek', 'vb_anlamak']
      },
      {
        id: 'u8_c3',
        phraseIds: ['p_turkce_bilmiyorum', 'p_ingilizce_biliyor_musunuz'],
        canDo: 'Je peux gérer une incompréhension',
        // v10 AXE 4 : dialogue propre, focalisé sur la demande de sens ("ne demek?"), pour ne
        // plus partager le même dialogue qu'u8_c1.
        dialogueIds: ['d_ne_demek'],
        title: 'Je ne comprends pas',
        goal: 'Gérer l\'incompréhension en turc',
        xpReward: 60,
        time: 7,
        tags: ['Communication', 'A1'],
        vocabIds: ['v_anlamiyorum', 'v_bilmiyorum', 'v_tekrar', 'v_yavas_konusun', 'v_lutfen', 'v_affedersiniz'],
        verbIds: ['vb_anlamak', 'vb_bilmek']
      },
      {
        id: 'u8_c4',
        phraseIds: ['p_yardim_edin', 'p_doktor_cagirin', 'p_eczane_nerede'],
        culture: 'Le numéro d\'urgence unique en Turquie est le 112 (police, pompiers, ambulance). « İmdat ! » veut dire « au secours ! ».',
        canDo: 'Je peux réagir face à une urgence',
        // v10 AXE 3.3 : un achat de médicament n'appelait aucun secours — remplacé par un
        // vrai dialogue d'urgence (İmdat, ambulance, 112).
        dialogueIds: ['d_acil_yardim'],
        title: 'Urgences',
        goal: 'Médecin, police, pharmacie : les mots qui sauvent',
        xpReward: 90,
        time: 10,
        tags: ['Urgences', 'A1'],
        // v10 AXE 4 : v_eczane retiré (déjà propre à u8_c2 désormais) pour ne plus partager
        // 100% de son vocabulaire avec u8_c2.
        vocabIds: ['v_yardim', 'v_acil', 'v_hastane', 'v_polis', 'v_doktor'],
        verbIds: ['vb_anlamak', 'vb_istemek']
      }
    ]
  },
  {
    id: 'u9',
    cefr: 'A1',
    title: 'Ma routine',
    description: 'Actions du quotidien et verbes de mouvement.',
    icon: '⏰',
    color: '#F97316',
    chapters: [
      {
        id: 'u9_c1',
        culture: 'La journée turque est rythmée par les repas et le çay. En ville, on dîne plutôt tard ; « kolay gelsin » se dit à quelqu\'un au travail, et « eline sağlık » à qui a cuisiné.',
        canDo: 'Je peux raconter ma journée type',
        dialogueIds: ['d_habitudes'],
        title: 'Ma journée type',
        goal: 'Se lever, dormir, manger, aller au travail',
        xpReward: 90,
        time: 10,
        tags: ['Routine', 'A1'],
        vocabIds: ['v_sabah', 'v_aksam', 'v_gece', 'v_bugun', 'v_saat'],
        verbIds: ['vb_uyumak', 'vb_kalkmak', 'vb_yemek', 'vb_icmek', 'vb_gitmek']
      },
      {
        id: 'u9_c2',
        canDo: 'Je peux dire où je vais et d\'où je viens',
        grammarIds: ['g_datif'],
        title: 'Verbes de mouvement',
        goal: 'Aller, venir, partir — avec lieu et transport',
        xpReward: 90,
        time: 10,
        tags: ['Verbes', 'A1'],
        vocabIds: ['v_ev', 'v_okul', 'v_market', 'v_otobus', 'v_tren', 'v_araba'],
        verbIds: ['vb_gitmek', 'vb_gelmek']
      },
      {
        id: 'u9_c3',
        phraseIds: ['p_ise_gidiyorum', 'p_eve_geliyorum', 'p_kahve_iciyorum'],
        canDo: 'Je peux dire ce que je suis en train de faire',
        grammarIds: ['g_present_iyor'],
        title: 'Ce que je fais',
        goal: 'Introduction au présent progressif en contexte',
        xpReward: 100,
        time: 11,
        tags: ['Verbes', 'A1'],
        vocabIds: ['v_ben', 'v_sen', 'v_biz', 'v_sabah', 'v_aksam'],
        verbIds: ['vb_yapmak', 'vb_calismak', 'vb_yemek', 'vb_icmek', 'vb_uyumak'],
        tenses: ['present']
      }
    ]
  },
  {
    id: 'u10',
    cefr: 'A1',
    title: 'Conjugaison : Présent',
    description: 'Maîtriser le temps présent progressif (-iyor).',
    icon: '⚡',
    color: '#6366F1',
    chapters: [
      {
        id: 'u10_c1',
        canDo: 'Je reconnais l\'infinitif des verbes (-mak/-mek)',
        grammarIds: ['g_harmonie_majeure'],
        title: 'Les infinitifs',
        goal: 'Comprendre les suffixes -mak et -mek',
        xpReward: 80,
        time: 8,
        tags: ['Grammaire', 'A1'],
        vocabIds: [],
        verbIds: ['vb_olmak', 'vb_yapmak', 'vb_gitmek', 'vb_gelmek'],
        tenses: ['present']
      },
      {
        id: 'u10_c2',
        phraseIds: ['p_turkce_calisiyorum'],
        tips: [{ icon: '⚡', text: 'Le présent -iyor couvre à la fois « je mange » et « je suis en train de manger » : un seul temps pour les deux !' }],
        canDo: 'Je peux conjuguer au présent progressif (-iyor)',
        grammarIds: ['g_present_iyor'],
        title: 'Le présent affirmatif',
        goal: 'Former le présent progressif avec -iyor',
        xpReward: 120,
        time: 12,
        tags: ['Grammaire', 'A1'],
        vocabIds: [],
        verbIds: ['vb_yapmak', 'vb_gitmek', 'vb_gelmek', 'vb_konusmak', 'vb_yemek', 'vb_icmek'],
        tenses: ['present']
      },
      {
        id: 'u10_c3',
        canDo: 'Je peux dire ce que je ne fais pas (-miyor)',
        grammarIds: ['g_negatif_fiil'],
        title: 'Le présent négatif',
        goal: 'Former la négation avec -miyor (-mıyor, -muyor, -müyor)',
        xpReward: 100,
        time: 10,
        tags: ['Grammaire', 'A1'],
        vocabIds: [],
        verbIds: ['vb_yapmak', 'vb_gitmek', 'vb_istemek', 'vb_anlamak'],
        tenses: ['present_neg']
      },
      {
        id: 'u10_c4',
        canDo: 'Je peux poser une question oui/non (mi ?)',
        grammarIds: ['g_soru_mi'],
        title: 'Poser une question',
        goal: 'La particule interrogative mi/mı/mu/mü',
        xpReward: 100,
        time: 10,
        tags: ['Grammaire', 'A1'],
        vocabIds: [],
        verbIds: ['vb_gitmek', 'vb_gelmek', 'vb_istemek', 'vb_olmak'],
        tenses: ['present']
      }
    ]
  },
  {
    id: 'u11',
    cefr: 'A1',
    title: 'Passé et Futur',
    description: 'Parler de ce qui a été fait et ce qui sera fait.',
    icon: '⏳',
    color: '#84CC16',
    chapters: [
      {
        id: 'u11_c1',
        canDo: 'Je peux conjuguer au passé (-di)',
        grammarIds: ['g_passe_di'],
        title: 'Le passé simple',
        goal: 'Suffixe -di / -dı / -du / -dü',
        xpReward: 120,
        time: 11,
        tags: ['Grammaire', 'A1'],
        vocabIds: ['v_dun', 'v_sabah', 'v_aksam'],
        verbIds: ['vb_gitmek', 'vb_gelmek', 'vb_yapmak', 'vb_yemek'],
        tenses: ['past']
      },
      {
        id: 'u11_c2',
        canDo: 'Je peux raconter ma journée au passé',
        grammarIds: ['g_passe_di'],
        dialogueIds: ['d_habitudes'],
        title: 'Raconter sa journée',
        goal: 'Enchaîner des actions passées en contexte',
        xpReward: 120,
        time: 12,
        tags: ['Passé', 'A1'],
        vocabIds: ['v_bugun', 'v_dun', 'v_aksam', 'v_sabah'],
        verbIds: ['vb_gitmek', 'vb_gelmek', 'vb_yemek', 'vb_icmek', 'vb_calismak', 'vb_uyumak'],
        tenses: ['past']
      },
      {
        id: 'u11_c3',
        canDo: 'Je peux conjuguer au futur (-ecek/-acak)',
        grammarIds: ['g_futur_acak'],
        title: 'Le futur',
        goal: 'Suffixe -ecek / -acak — projets et intentions',
        xpReward: 120,
        time: 11,
        tags: ['Grammaire', 'A1'],
        vocabIds: ['v_yarin', 'v_hafta', 'v_ay'],
        verbIds: ['vb_gitmek', 'vb_gelmek', 'vb_yapmak', 'vb_olmak'],
        tenses: ['future']
      },
      {
        id: 'u11_c4',
        canDo: 'Je peux parler de mes projets',
        grammarIds: ['g_futur_acak'],
        title: 'Mes projets',
        goal: 'Exprimer des intentions futures en contexte',
        xpReward: 100,
        time: 10,
        tags: ['Futur', 'A1'],
        vocabIds: ['v_yarin', 'v_hafta', 'v_ay', 'v_yil'],
        verbIds: ['vb_gitmek', 'vb_gelmek', 'vb_calismak', 'vb_istemek', 'vb_sevmek'],
        tenses: ['future']
      },
      {
        id: 'u11_c5',
        tips: [{ icon: '🚫', text: 'La négation reste collée au verbe, comme au présent : "gitmedim" (je n\'y suis pas allé), "gitmeyeceğim" (je n\'irai pas) — jamais un mot "pas" séparé.' }],
        canDo: 'Je peux dire ce que je n\'ai pas fait et ce que je ne ferai pas',
        grammarIds: ['g_negatif_passe_futur'],
        title: 'Je n\'ai pas... / Je ne ferai pas...',
        goal: 'Nier une action au passé et au futur',
        xpReward: 100,
        time: 10,
        tags: ['Négation', 'A1'],
        vocabIds: [],
        verbIds: ['vb_gitmek', 'vb_yapmak', 'vb_yemek', 'vb_gormek'],
        tenses: ['past_neg', 'future_neg']
      }
    ]
  },
  {
    id: 'u12',
    cefr: 'A1',
    title: 'Missions réelles (A1)',
    description: 'Mises en situation pratiques et test final.',
    icon: '🏆',
    color: '#F59E0B',
    chapters: [
      {
        id: 'u12_c1',
        phraseIds: ['p_rezervasyonum_var', 'p_oda_anahtari_lutfen', 'p_odamda_sorun_var', 'p_kahvalti_dahil_mi'],
        culture: 'Dans les hôtels, la carte d\'identité ou le passeport est demandé à l\'enregistrement (giriş). Le petit-déjeuner (kahvaltı dahil) est très souvent inclus.',
        canDo: 'Je peux réserver une chambre d\'hôtel',
        dialogueIds: ['d_hotel'],
        title: 'Mission : à l\'hôtel',
        goal: 'Réserver une chambre et gérer un problème',
        xpReward: 130,
        time: 12,
        tags: ['Voyage', 'A1'],
        vocabIds: ['v_otel', 'v_bilet', 'v_bagaj', 'v_para', 'v_hesap', 'v_gece', 'v_saat'],
        verbIds: ['vb_istemek', 'vb_olmak', 'vb_gitmek']
      },
      {
        id: 'u12_c2',
        phraseIds: ['p_bavulumu_birakabilir_miyim'],
        canDo: 'Je peux me débrouiller à l\'aéroport et dans l\'avion',
        dialogueIds: ['d_avion'],
        title: 'Dans l\'avion',
        goal: 'Vocabulaire du voyage, douanes et aéroport',
        xpReward: 130,
        time: 11,
        tags: ['Voyage', 'A1'],
        vocabIds: ['v_ucak', 'v_bilet', 'v_bagaj', 'v_pasaport', 'v_havalimani'],
        verbIds: ['vb_gitmek', 'vb_olmak']
      },
      {
        id: 'u12_c3',
        phraseIds: ['p_istanbul_ziyaret_ediyorum', 'p_cok_guzel_ulke'],
        canDo: 'Je peux tenir une conversation informelle simple',
        dialogueIds: ['d_soiree_amis', 'd_rencontre'],
        title: 'Rencontre informelle',
        goal: 'Dialogue long multi-temps avec un natif',
        xpReward: 150,
        time: 12,
        tags: ['Conversation', 'A1'],
        // v10 AXE 3.6 : Otel retiré — hors thème pour une rencontre informelle entre amis.
        vocabIds: ['v_arkadas', 'v_bugun', 'v_yarin', 'v_dun', 'v_saat'],
        verbIds: ['vb_gitmek', 'vb_gelmek', 'vb_olmak', 'vb_konusmak', 'vb_yapmak']
      },
      {
        id: 'u12_c4',
        canDo: 'Je valide mon niveau A1 !',
        grammarIds: ['g_present_iyor', 'g_passe_di', 'g_futur_acak', 'g_locatif'],
        title: 'Révision mixte',
        goal: 'Révision mixte des unités 1 à 11',
        xpReward: 200,
        time: 12,
        tags: ['Révision', 'A1'],
        vocabIds: ['v_merhaba', 'v_tesekkurler', 'v_evet', 'v_hayir', 'v_fransiz', 'v_turk', 'v_sag', 'v_sol', 'v_bugun', 'v_yarin'],
        verbIds: ['vb_gitmek', 'vb_gelmek', 'vb_olmak', 'vb_yapmak', 'vb_istemek', 'vb_sevmek']
      }
    ]
  },
  {
    id: 'u13',
    cefr: 'A2',
    title: 'Santé et météo',
    description: 'Parler du temps, du corps et de la santé.',
    icon: '🏥',
    color: '#06B6D4',
    chapters: [
      {
        id: 'u13_c1',
        culture: 'Le climat turc est très contrasté : étés chauds et secs sur la côte égéenne, hivers neigeux à l\'est et en Anatolie centrale. « Kolay gelsin » (bon courage) se dit à qui travaille par tous les temps.',
        canDo: 'Je peux parler du temps qu\'il fait',
        dialogueIds: ['d_meteo'],
        title: 'La météo',
        goal: 'Parler du temps qu\'il fait',
        xpReward: 70,
        time: 8,
        tags: ['Météo', 'A2'],
        vocabIds: ['v_hava', 'v_gunes', 'v_yagmur', 'v_kar', 'v_ruzgar', 'v_bulutlu', 'v_gunesli', 'v_yagmurlu', 'v_hava_sicak', 'v_hava_soguk', 'v_hava_guzel', 'v_sicak', 'v_soguk'],
        verbIds: []
      },
      {
        id: 'u13_c2',
        grammarIds: ['g_possessif'],
        canDo: 'Je peux nommer les parties du corps',
        title: 'Mon corps',
        goal: 'Nommer les parties du corps',
        xpReward: 70,
        time: 8,
        tags: ['Corps', 'A2'],
        vocabIds: ['v_bas', 'v_el', 'v_goz', 'v_kulak', 'v_agiz', 'v_ayak', 'v_kol', 'v_dis', 'v_sirt', 'v_karin'],
        verbIds: []
      },
      {
        id: 'u13_c3',
        phraseIds: ['p_basim_agriyor', 'p_atesim_var', 'p_karnım_agriyor'],
        tips: [{ icon: '🏥', text: 'Pour dire où vous avez mal : partie du corps + ağrıyor → Başım ağrıyor = j\'ai mal à la tête.' }],
        canDo: 'Je peux décrire un symptôme',
        // v10 AXE 3.3 : d_eczane s'ouvre sur "Başım ağrıyor", exactement ce canDo — il rejoint
        // d_saglik ici plutôt qu'en u16_c3, où il ne faisait que le répéter.
        dialogueIds: ['d_saglik', 'd_eczane'],
        title: 'Je ne me sens pas bien',
        goal: 'Décrire un symptôme chez le médecin',
        xpReward: 90,
        time: 10,
        tags: ['Santé', 'A2'],
        vocabIds: ['v_hasta', 'v_ilac', 'v_agri', 'v_ates', 'v_bas_agrisi', 'v_karin_agrisi', 'v_iyi_degilim', 'v_yardim', 'v_doktor', 'v_eczane', 'v_hastane'],
        verbIds: ['vb_istemek', 'vb_anlamak']
      }
    ]
  },
  {
    id: 'u14',
    cefr: 'A2',
    title: 'Expressions du quotidien',
    description: 'Questions essentielles, salutations et expressions courantes.',
    icon: '💬',
    color: '#A855F7',
    chapters: [
      {
        id: 'u14_c1',
        phraseIds: ['p_buraya_nasil_gidebilirim', 'p_kac_dakika_yurumus'],
        canDo: 'Je peux poser les questions essentielles (où, quand, comment…)',
        grammarIds: ['g_soru_mi', 'g_yok_var'],
        title: 'Questions essentielles',
        goal: 'Poser les 5 grandes questions en turc',
        xpReward: 80,
        time: 9,
        tags: ['Expressions', 'A2'],
        vocabIds: ['v_nasil', 'v_ne_kadar', 'v_ne_zaman', 'v_neden', 'v_nerede', 'v_nasilsiniz', 'v_var', 'v_yok'],
        verbIds: ['vb_gitmek', 'vb_olmak']
      },
      {
        id: 'u14_c2',
        phraseIds: ['p_nasilsin'],
        culture: '« Nasılsın ? » (comment vas-tu ?) est un rituel : on répond souvent « İyiyim, teşekkürler, sen ? ». Répondre « şükür » (Dieu merci) est courant et chaleureux.',
        canDo: 'Je peux demander et dire comment ça va',
        dialogueIds: ['d_rencontre'],
        title: 'Comment ça va ?',
        goal: 'Saluer, demander et répondre sur l\'état',
        xpReward: 70,
        time: 7,
        tags: ['Salutations', 'A2'],
        vocabIds: ['v_nasilsiniz', 'v_iyiyim', 'v_cok_iyi', 'v_fena_degil', 'v_tesekkurler', 'v_iyi_degilim', 'v_hasta'],
        verbIds: ['vb_olmak', 'vb_sevmek']
      },
      {
        id: 'u14_c3',
        canDo: 'Je peux nuancer une opinion (beaucoup, un peu, vraiment)',
        title: 'Exprimer l\'opinion',
        goal: 'Dire ce qu\'on aime, pense, veut',
        xpReward: 90,
        time: 10,
        tags: ['Expressions', 'A2'],
        vocabIds: ['v_cok', 'v_az', 'v_biraz', 'v_elbette', 'v_dogru', 'v_yanlis', 'v_gercekten', 'v_hic', 'v_bazen', 'v_hep'],
        // v10 AXE 5.3 : düşünmek (penser) était orphelin — c'est littéralement le verbe
        // pour exprimer une opinion, thème de ce chapitre. requiredVerbIds garantit sa carte
        // de découverte (4e verbe du chapitre, sinon jamais montré — relecture Codex).
        requiredVerbIds: ['vb_dusunmek'],
        verbIds: ['vb_sevmek', 'vb_istemek', 'vb_bilmek', 'vb_dusunmek']
      },
      {
        id: 'u14_c4',
        phraseIds: ['p_ne_zamandan_beri'],
        canDo: 'Je peux situer des actions dans le temps (avant, après)',
        title: 'Avant et après',
        goal: 'Situer des actions dans le temps',
        xpReward: 80,
        time: 9,
        tags: ['Temps', 'A2'],
        vocabIds: ['v_once', 'v_sonra', 'v_simdi', 'v_bugun', 'v_yarin', 'v_dun', 'v_hemen', 'v_bir_dakika', 'v_sabah', 'v_aksam'],
        verbIds: ['vb_gitmek', 'vb_gelmek', 'vb_yapmak']
      }
    ]
  },

  // ── Unités A2 (u15–u18) ──

  {
    id: 'u15',
    cefr: 'A2',
    title: 'Ma maison & mon quotidien',
    description: 'Décrire son logement, les pièces, les meubles et les tâches du quotidien.',
    icon: '🏠',
    color: '#8B6914',
    level: 'A2',
    chapters: [
      {
        id: 'u15_c1',
        canDo: 'Je peux décrire les pièces de mon logement',
        grammarIds: ['g_locatif'],
        dialogueIds: ['d_apartman'],
        title: 'Les pièces de la maison',
        goal: 'Nommer et localiser les pièces',
        xpReward: 80,
        time: 8,
        tags: ['Maison', 'A2'],
        vocabIds: ['v_salon', 'v_mutfak', 'v_yatak_odasi', 'v_banyo', 'v_tuvalet', 'v_koridor', 'v_balkon', 'v_garaj', 'v_bahce', 'v_kat'],
        verbIds: ['vb_olmak', 'vb_gitmek']
      },
      {
        id: 'u15_c2',
        canDo: 'Je peux décrire les meubles et objets de la maison',
        grammarIds: ['g_yok_var'],
        title: 'Les meubles & objets',
        goal: 'Compléter l\'ameublement : éclairage, décoration, rangement',
        xpReward: 80,
        time: 9,
        tags: ['Maison', 'A2'],
        vocabIds: ['v_koltuk', 'v_dolap', 'v_buzdolabi', 'v_firin', 'v_televizyon', 'v_lamba', 'v_ayna', 'v_hali', 'v_perde', 'v_duvar'],
        // v10 AXE 5.3 : açmak/kapatmak (ouvrir/fermer) étaient orphelins — cohérents ici,
        // on les utilise justement avec ces objets (allumer/éteindre la lampe, la télé...).
        // requiredVerbIds garantit leurs cartes de découverte (3e/4e verbes du chapitre,
        // sinon jamais montrés — relecture Codex).
        requiredVerbIds: ['vb_acmak', 'vb_kapatmak'],
        verbIds: ['vb_olmak', 'vb_bakmak', 'vb_acmak', 'vb_kapatmak']
      },
      {
        id: 'u15_c3',
        canDo: 'Je peux parler des tâches ménagères',
        title: 'Les tâches ménagères',
        goal: 'Parler des activités à la maison',
        xpReward: 90,
        time: 10,
        tags: ['Maison', 'Verbes', 'A2'],
        vocabIds: ['v_temiz', 'v_kirli', 'v_duzen', 'v_ev'],
        // v10 AXE 3.6 : "tâches ménagères" n'avait aucun verbe de tâche concrète — ajout de
        // temizlemek/yıkamak/toplamak, à côté des verbes déjà présents.
        verbIds: ['vb_yapmak', 'vb_calismak', 'vb_hazirlamak', 'vb_baslamak', 'vb_bitirmek', 'vb_temizlemek', 'vb_yikamak', 'vb_toplamak'],
        tenses: ['present', 'past']
      },
      {
        id: 'u15_c4',
        phraseIds: ['p_nerede_oturuyorsun', 'p_karsisinda', 'p_kopruyu_gecin'],
        canDo: 'Je peux parler de mon quartier et de mes voisins',
        dialogueIds: ['d_apartman'],
        title: 'Mon quartier & mes voisins',
        goal: 'Parler de son environnement proche',
        xpReward: 100,
        time: 10,
        tags: ['Maison', 'Lieux', 'A2'],
        vocabIds: ['v_komsu', 'v_apartman', 'v_bina', 'v_kira', 'v_adres', 'v_sehir', 'v_mahalle'],
        verbIds: ['vb_olmak', 'vb_gitmek', 'vb_sormak']
      }
    ]
  },

  {
    id: 'u16',
    cefr: 'A2',
    title: 'Corps, santé & bien-être',
    description: 'Décrire le corps humain, parler de sa santé et consulter un médecin.',
    icon: '🏥',
    color: '#E84040',
    level: 'A2',
    chapters: [
      {
        id: 'u16_c1',
        grammarIds: ['g_possessif'],
        canDo: 'Je peux nommer des parties du corps précises (articulations, organes)',
        title: 'Le corps humain — approfondi',
        goal: 'Aller au-delà des bases : articulations et détails utiles chez le médecin',
        xpReward: 70,
        time: 8,
        tags: ['Corps', 'A2'],
        vocabIds: ['v_burun', 'v_bacak', 'v_boyun', 'v_omuz', 'v_dirsek', 'v_diz', 'v_bilek', 'v_gogus', 'v_kalp', 'v_parmak', 'v_sac', 'v_tirnak'],
        verbIds: []
      },
      {
        id: 'u16_c2',
        canDo: 'Je peux exprimer mon état physique et émotionnel',
        grammarIds: ['g_copule'],
        title: 'Comment vous sentez-vous ?',
        goal: 'Exprimer son état physique et émotionnel',
        xpReward: 80,
        time: 9,
        tags: ['Santé', 'Émotions', 'A2'],
        vocabIds: ['v_hasta', 'v_yorgun', 'v_agri', 'v_ates', 'v_iyi', 'v_kotu', 'v_mutlu', 'v_uzgun', 'v_endiseli'],
        verbIds: []
      },
      {
        id: 'u16_c3',
        phraseIds: ['p_alerjim_var', 'p_gluten_yiyemiyorum'],
        canDo: 'Je peux consulter un médecin et comprendre une ordonnance',
        // v10 AXE 3.3 : d_saglik reprenait exactement le même dialogue qu'u13_c3, sans rien
        // ajouter — d_medecin seul suffit et correspond au lieu annoncé par ce chapitre.
        dialogueIds: ['d_medecin'],
        title: 'Chez le médecin',
        goal: 'Décrire ses symptômes et comprendre une ordonnance',
        xpReward: 100,
        time: 11,
        tags: ['Santé', 'Urgences', 'A2'],
        vocabIds: ['v_doktor', 'v_ilac', 'v_recete', 'v_ameliyat', 'v_randevu', 'v_eczane', 'v_bas_agrisi', 'v_karin_agrisi'],
        verbIds: ['vb_olmak', 'vb_sormak', 'vb_soylemek']
      },
      {
        id: 'u16_c4',
        phraseIds: ['p_ambulans_cagirin'],
        culture: 'En cas d\'urgence médicale, composez le 112. Les pharmacies (eczane) de garde (« nöbetçi eczane ») assurent un service de nuit, affiché sur chaque devanture.',
        canDo: 'Je peux appeler les secours et réagir en urgence',
        // v10 AXE 3.3 : même remplacement qu'u8_c4 — un achat de médicament n'est pas un
        // appel aux secours.
        dialogueIds: ['d_acil_yardim'],
        title: 'Urgences & secours',
        goal: 'Réagir en cas d\'urgence',
        xpReward: 90,
        time: 9,
        tags: ['Urgences', 'A2'],
        vocabIds: ['v_yardim', 'v_acil', 'v_polis', 'v_ambulans', 'v_itfaiye', 'v_tehlike'],
        verbIds: ['vb_aramak', 'vb_gelmek', 'vb_yardim_etmek']
      }
    ]
  },

  {
    id: 'u17',
    cefr: 'A2',
    title: 'Transports, ville & voyages',
    description: 'Se déplacer en ville, voyager en Turquie et gérer l\'hôtel.',
    icon: '✈️',
    color: '#2D9CDB',
    level: 'A2',
    chapters: [
      {
        id: 'u17_c1',
        phraseIds: ['p_bu_otobus_gidiyor_mu', 'p_taksi_cagirabilir_misiniz', 'p_kac_dakika_suruyor'],
        culture: 'Dans les grandes villes, la carte Istanbulkart (ou équivalent local) sert pour bus, métro, tram et ferry. On dit « inecek var ! » (quelqu\'un descend !) pour signaler son arrêt dans le bus.',
        canDo: 'Je peux prendre les transports en commun',
        grammarIds: ['g_ablatif'],
        dialogueIds: ['d_otobus', 'd_taksi'],
        title: 'Transports en commun',
        goal: 'Prendre le bus, le métro, le taxi',
        xpReward: 80,
        time: 9,
        tags: ['Transport', 'A2'],
        vocabIds: ['v_otobus', 'v_metro', 'v_taksi', 'v_tren', 'v_durak', 'v_bilet', 'v_aktarma', 'v_hat', 'v_saat'],
        verbIds: ['vb_gitmek', 'vb_gelmek', 'vb_almak', 'vb_beklemek']
      },
      {
        id: 'u17_c2',
        phraseIds: ['p_tren_gari_nerede', 'p_son_otobus_kacta', 'p_otobus_gec_kaldi'],
        canDo: 'Je peux acheter un billet et m\'orienter en gare/aéroport',
        dialogueIds: ['d_gare', 'd_avion', 'd_voyage_retour'],
        title: 'À la gare & à l\'aéroport',
        goal: 'Acheter un billet et s\'orienter dans un terminal',
        xpReward: 100,
        time: 11,
        tags: ['Transport', 'Voyage', 'A2'],
        vocabIds: ['v_gar', 'v_havalimani', 'v_ucak', 'v_kalkis', 'v_inis', 'v_peron', 'v_bagaj', 'v_pasaport'],
        verbIds: ['vb_gitmek', 'vb_sormak', 'vb_almak', 'vb_bulmak']
      },
      {
        id: 'u17_c3',
        phraseIds: ['p_bunu_alacagim'],
        canDo: 'Je peux faire des achats et des démarches en ville',
        grammarIds: ['g_locatif'],
        dialogueIds: ['d_banque', 'd_cinema'],
        title: 'Lieux & commerces',
        goal: 'Découvrir des commerces de proximité au-delà des lieux essentiels',
        xpReward: 80,
        time: 9,
        tags: ['Lieux', 'Commerce', 'A2'],
        vocabIds: ['v_postane', 'v_muze', 'v_sinema', 'v_kuafor', 'v_berber', 'v_pastane', 'v_kasap', 'v_dukkan', 'v_kutuphane'],
        verbIds: ['vb_gitmek', 'vb_bulmak', 'vb_almak', 'vb_odemek']
      },
      {
        id: 'u17_c4',
        phraseIds: ['p_kac_gecelik', 'p_kacta_check_in', 'p_kacta_check_out', 'p_erken_kacta_cikarsiniz'],
        canDo: 'Je peux gérer mon séjour à l\'hôtel de A à Z',
        // v10 AXE 4 : dialogue différent de d_hotel (u12_c1), axé sur les services et un
        // problème de chambre plutôt que sur la réservation.
        dialogueIds: ['d_otel_servis'],
        title: 'À l\'hôtel',
        goal: 'Réserver, s\'enregistrer et demander des services',
        xpReward: 90,
        time: 10,
        tags: ['Voyage', 'Hôtel', 'A2'],
        vocabIds: ['v_otel', 'v_oda', 'v_anahtar', 'v_rezervasyon', 'v_giris', 'v_cikis', 'v_kat', 'v_fiyat'],
        verbIds: ['vb_olmak', 'vb_istemek', 'vb_sormak', 'vb_odemek']
      }
    ]
  },

  {
    id: 'u18',
    cefr: 'A2',
    title: 'Verbes avancés & production active',
    description: 'Maîtriser les verbes A2 essentiels et construire des phrases plus complexes.',
    icon: '⚡',
    color: '#8E44AD',
    level: 'A2',
    chapters: [
      {
        id: 'u18_c1',
        phraseIds: ['p_turkce_ogreniyorum'],
        canDo: 'Je peux parler d\'apprendre, se souvenir, oublier',
        grammarIds: ['g_abilmek'],
        dialogueIds: ['d_universite'],
        title: 'Apprendre, se souvenir, oublier',
        goal: 'Exprimer des processus cognitifs',
        xpReward: 100,
        time: 10,
        tags: ['Verbes A2', 'A2'],
        vocabIds: [],
        verbIds: ['vb_ogrenmek', 'vb_ogretmek', 'vb_hatirlamak', 'vb_unutmak'],
        tenses: ['present', 'past', 'future']
      },
      {
        id: 'u18_c2',
        phraseIds: ['p_benimle_konusur_musunuz'],
        canDo: 'Je peux exprimer commencer, finir, demander, répondre',
        title: 'Commencer, finir, demander, répondre',
        goal: 'Verbes d\'action et d\'interaction',
        xpReward: 100,
        time: 10,
        tags: ['Verbes A2', 'A2'],
        vocabIds: [],
        verbIds: ['vb_baslamak', 'vb_bitirmek', 'vb_sormak', 'vb_cevaplamak'],
        tenses: ['present', 'past', 'future']
      },
      {
        id: 'u18_c3',
        phraseIds: ['p_wifi_sifresi_ne'],
        canDo: 'Je peux utiliser trouver, perdre, dire, préparer',
        // v10 AXE 3.4 : g_ki_relatif retiré (aucun rapport avec ces verbes) — il enseigne
        // désormais u18_c8, où il a un vrai rôle.
        dialogueIds: ['d_telephone_portable'],
        title: 'Trouver, perdre, dire, préparer',
        goal: 'Verbes essentiels du quotidien',
        xpReward: 100,
        time: 10,
        tags: ['Verbes A2', 'A2'],
        vocabIds: [],
        verbIds: ['vb_bulmak', 'vb_kaybetmek', 'vb_soylemek', 'vb_hazirlamak'],
        tenses: ['present', 'past', 'future']
      },
      {
        id: 'u18_c4',
        canDo: 'Je peux exprimer des émotions avec des verbes',
        // v10 AXE 3.4 : g_suffixe_avec retiré (aucun rapport avec les émotions) — il enseigne
        // désormais u18_c7, où il a un vrai rôle.
        title: 'Émotions en action',
        goal: 'Exprimer des émotions avec des verbes',
        xpReward: 110,
        time: 11,
        tags: ['Verbes A2', 'Émotions', 'A2'],
        vocabIds: ['v_mutlu', 'v_uzgun', 'v_kizgin', 'v_saskin'],
        // v10 AXE 3.6 : vb_tasimak (porter) retiré — hors thème ; vb_korkmak (avoir peur) le
        // remplace, un vrai verbe d'émotion.
        verbIds: ['vb_aglamak', 'vb_gulmek', 'vb_korkmak', 'vb_sevmek'],
        tenses: ['present', 'past']
      },
      {
        id: 'u18_c5',
        tips: [{ icon: '🔁', text: 'L\'aoriste sert pour les habitudes et vérités générales — pas pour une action en train de se passer (ça, c\'est -iyor).' }],
        canDo: 'Je peux parler de mes habitudes avec l\'aoriste (-er/-ir)',
        grammarIds: ['g_aorist'],
        title: 'Mes habitudes (l\'aoriste)',
        goal: 'Exprimer des habitudes et vérités générales avec le présent large -r/-Ar/-Ir',
        xpReward: 110,
        time: 11,
        tags: ['Grammaire', 'A2'],
        vocabIds: [],
        verbIds: ['vb_yemek', 'vb_icmek', 'vb_okumak', 'vb_calismak', 'vb_uyumak', 'vb_yazmak'],
        tenses: ['aorist']
      },
      {
        id: 'u18_c6',
        tips: [{ icon: '💬', text: '-mış sert pour un fait rapporté, déduit ou découvert après coup — pas pour un fait vu ou vécu directement (ça, c\'est -dı).' }],
        canDo: 'Je peux raconter un fait rapporté ou déduit avec le passé narratif (-mış)',
        grammarIds: ['g_gecmis_mis'],
        title: 'On raconte (le passé narratif)',
        goal: 'Distinguer -dı (vécu) et -mış (rapporté, déduit, surprise) avec le passé narratif -mış/-miş/-muş/-müş',
        xpReward: 110,
        time: 11,
        tags: ['Grammaire', 'A2'],
        vocabIds: [],
        verbIds: ['vb_gitmek', 'vb_gormek', 'vb_almak', 'vb_duymak', 'vb_gelmek', 'vb_yapmak'],
        tenses: ['pastNarrative']
      },
      {
        // v10 AXE 3.5 : nouveau chapitre, ajout pur — donne enfin une vraie place à
        // g_suffixe_avec, jusqu'ici rattaché à u18_c4 sans aucun rapport.
        id: 'u18_c7',
        tips: [{ icon: '🤝', text: '-le/-la ("avec") se colle directement au mot, comme un suffixe de plus : arkadaşımla = avec mon ami. Après une voyelle, on ajoute un -y- : otobüsle mais arabayla.' }],
        canDo: 'Je peux dire avec qui ou avec quoi je fais quelque chose',
        grammarIds: ['g_suffixe_avec'],
        title: 'Avec qui, avec quoi',
        goal: 'Exprimer l\'accompagnement avec le suffixe -le/-la',
        xpReward: 100,
        time: 9,
        tags: ['Grammaire', 'A2'],
        vocabIds: ['v_arkadas', 'v_otobus', 'v_araba', 'v_cay', 'v_seker'],
        verbIds: []
      },
      {
        // v10 AXE 3.5 : nouveau chapitre, ajout pur — donne enfin une vraie place à
        // g_ki_relatif, jusqu'ici rattaché à u18_c3 sans aucun rapport.
        id: 'u18_c8',
        tips: [{ icon: '📍', text: '-ki transforme un mot en "celui/celle de..." : evdeki = celui de la maison, benimki = le mien. Il ne change jamais de forme.' }],
        canDo: 'Je peux dire "celui de..." avec le suffixe -ki',
        grammarIds: ['g_ki_relatif'],
        title: 'Celui de...',
        goal: 'Utiliser le suffixe relatif -ki',
        xpReward: 100,
        time: 9,
        tags: ['Grammaire', 'A2'],
        vocabIds: ['v_ev', 'v_yarin', 'v_okul', 'v_masa'],
        verbIds: []
      }
    ]
  }
];
