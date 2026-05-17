/* ═══════════════════════════════════════════════
   TürkçeYol — vocabulary.js
   Base de données lexicale (Mots, expressions)
   ═══════════════════════════════════════════════ */

window.AppVocabulary = [
  // ── Salutations & Politesse ──
  { id: 'v_merhaba', tr: 'Merhaba', fr: 'Bonjour', topic: 'salutations', type: 'expression', difficulty: 1 },
  { id: 'v_gunaydin', tr: 'Günaydın', fr: 'Bonjour (matin)', topic: 'salutations', type: 'expression', difficulty: 1 },
  { id: 'v_iyi_aksamlar', tr: 'İyi akşamlar', fr: 'Bonsoir', topic: 'salutations', type: 'expression', difficulty: 1 },
  { id: 'v_iyi_geceler', tr: 'İyi geceler', fr: 'Bonne nuit', topic: 'salutations', type: 'expression', difficulty: 1 },
  { id: 'v_gorusuruz', tr: 'Görüşürüz', fr: 'À plus tard', topic: 'salutations', type: 'expression', difficulty: 2 },
  { id: 'v_hoscakal', tr: 'Hoşça kal', fr: 'Au revoir', topic: 'salutations', type: 'expression', difficulty: 2 },
  { id: 'v_tesekkurler', tr: 'Teşekkürler', fr: 'Merci', topic: 'salutations', type: 'expression', difficulty: 1 },
  { id: 'v_lutfen', tr: 'Lütfen', fr: 'S\'il vous plaît', topic: 'salutations', type: 'expression', difficulty: 1 },
  { id: 'v_affedersiniz', tr: 'Affedersiniz', fr: 'Excusez-moi', topic: 'salutations', type: 'expression', difficulty: 2 },
  { id: 'v_evet', tr: 'Evet', fr: 'Oui', topic: 'base', type: 'mot', difficulty: 1 },
  { id: 'v_hayir', tr: 'Hayır', fr: 'Non', topic: 'base', type: 'mot', difficulty: 1 },
  { id: 'v_tamam', tr: 'Tamam', fr: 'D\'accord / OK', topic: 'base', type: 'mot', difficulty: 1 },

  // ── Identité & Personnes ──
  { id: 'v_ben', tr: 'Ben', fr: 'Je / Moi', topic: 'pronoms', type: 'mot', difficulty: 1 },
  { id: 'v_sen', tr: 'Sen', fr: 'Tu / Toi', topic: 'pronoms', type: 'mot', difficulty: 1 },
  { id: 'v_o', tr: 'O', fr: 'Il / Elle', topic: 'pronoms', type: 'mot', difficulty: 1 },
  { id: 'v_biz', tr: 'Biz', fr: 'Nous', topic: 'pronoms', type: 'mot', difficulty: 1 },
  { id: 'v_siz', tr: 'Siz', fr: 'Vous', topic: 'pronoms', type: 'mot', difficulty: 1 },
  { id: 'v_onlar', tr: 'Onlar', fr: 'Ils / Elles', topic: 'pronoms', type: 'mot', difficulty: 1 },
  { id: 'v_isim', tr: 'İsim / Ad', fr: 'Nom / Prénom', topic: 'identite', type: 'nom', difficulty: 2 },
  { id: 'v_yas', tr: 'Yaş', fr: 'Âge', topic: 'identite', type: 'nom', difficulty: 2 },
  { id: 'v_arkadas', tr: 'Arkadaş', fr: 'Ami', topic: 'personnes', type: 'nom', difficulty: 1 },

  // ── Famille ──
  { id: 'v_aile', tr: 'Aile', fr: 'Famille', topic: 'famille', type: 'nom', difficulty: 1 },
  { id: 'v_anne', tr: 'Anne', fr: 'Mère', topic: 'famille', type: 'nom', difficulty: 1 },
  { id: 'v_baba', tr: 'Baba', fr: 'Père', topic: 'famille', type: 'nom', difficulty: 1 },
  { id: 'v_kardes', tr: 'Kardeş', fr: 'Frère / Sœur', topic: 'famille', type: 'nom', difficulty: 2 },
  { id: 'v_erkek_kardes', tr: 'Erkek kardeş', fr: 'Frère (plus jeune)', topic: 'famille', type: 'nom', difficulty: 2 },
  { id: 'v_kiz_kardes', tr: 'Kız kardeş', fr: 'Sœur (plus jeune)', topic: 'famille', type: 'nom', difficulty: 2 },
  { id: 'v_abi', tr: 'Abi', fr: 'Grand frère', topic: 'famille', type: 'nom', difficulty: 2 },
  { id: 'v_abla', tr: 'Abla', fr: 'Grande sœur', topic: 'famille', type: 'nom', difficulty: 2 },

  // ── Ville & Lieux ──
  { id: 'v_ev', tr: 'Ev', fr: 'Maison', topic: 'lieux', type: 'nom', difficulty: 1 },
  { id: 'v_okul', tr: 'Okul', fr: 'École', topic: 'lieux', type: 'nom', difficulty: 1 },
  { id: 'v_hastane', tr: 'Hastane', fr: 'Hôpital', topic: 'lieux', type: 'nom', difficulty: 2 },
  { id: 'v_sokak', tr: 'Sokak', fr: 'Rue', topic: 'lieux', type: 'nom', difficulty: 2 },
  { id: 'v_havalimani', tr: 'Havalimanı', fr: 'Aéroport', topic: 'lieux', type: 'nom', difficulty: 3 },
  { id: 'v_market', tr: 'Market', fr: 'Supermarché', topic: 'lieux', type: 'nom', difficulty: 1 },

  // ── Nourriture & Boissons ──
  { id: 'v_su', tr: 'Su', fr: 'Eau', topic: 'nourriture', type: 'nom', difficulty: 1 },
  { id: 'v_cay', tr: 'Çay', fr: 'Thé', topic: 'nourriture', type: 'nom', difficulty: 1 },
  { id: 'v_kahve', tr: 'Kahve', fr: 'Café', topic: 'nourriture', type: 'nom', difficulty: 1 },
  { id: 'v_ekmek', tr: 'Ekmek', fr: 'Pain', topic: 'nourriture', type: 'nom', difficulty: 1 },
  { id: 'v_et', tr: 'Et', fr: 'Viande', topic: 'nourriture', type: 'nom', difficulty: 2 },
  { id: 'v_tavuk', tr: 'Tavuk', fr: 'Poulet', topic: 'nourriture', type: 'nom', difficulty: 2 },
  { id: 'v_balik', tr: 'Balık', fr: 'Poisson', topic: 'nourriture', type: 'nom', difficulty: 2 },
  { id: 'v_peynir', tr: 'Peynir', fr: 'Fromage', topic: 'nourriture', type: 'nom', difficulty: 2 },

  // ── Nombres ──
  { id: 'v_bir', tr: 'Bir', fr: 'Un (1)', topic: 'nombres', type: 'nombre', difficulty: 1 },
  { id: 'v_iki', tr: 'İki', fr: 'Deux (2)', topic: 'nombres', type: 'nombre', difficulty: 1 },
  { id: 'v_uc', tr: 'Üç', fr: 'Trois (3)', topic: 'nombres', type: 'nombre', difficulty: 1 },
  { id: 'v_dort', tr: 'Dört', fr: 'Quatre (4)', topic: 'nombres', type: 'nombre', difficulty: 1 },
  { id: 'v_bes', tr: 'Beş', fr: 'Cinq (5)', topic: 'nombres', type: 'nombre', difficulty: 1 },
  { id: 'v_alti', tr: 'Altı', fr: 'Six (6)', topic: 'nombres', type: 'nombre', difficulty: 1 },
  { id: 'v_yedi', tr: 'Yedi', fr: 'Sept (7)', topic: 'nombres', type: 'nombre', difficulty: 1 },
  { id: 'v_sekiz', tr: 'Sekiz', fr: 'Huit (8)', topic: 'nombres', type: 'nombre', difficulty: 1 },
  { id: 'v_dokuz', tr: 'Dokuz', fr: 'Neuf (9)', topic: 'nombres', type: 'nombre', difficulty: 1 },
  { id: 'v_on', tr: 'On', fr: 'Dix (10)', topic: 'nombres', type: 'nombre', difficulty: 1 },
  { id: 'v_yirmi', tr: 'Yirmi', fr: 'Vingt (20)', topic: 'nombres', type: 'nombre', difficulty: 2 },
  { id: 'v_elli', tr: 'Elli', fr: 'Cinquante (50)', topic: 'nombres', type: 'nombre', difficulty: 2 },
  { id: 'v_yuz', tr: 'Yüz', fr: 'Cent (100)', topic: 'nombres', type: 'nombre', difficulty: 2 },

  // ── Adjectifs fréquents ──
  { id: 'v_guzel', tr: 'Güzel', fr: 'Beau / Belle / Bien', topic: 'adjectifs', type: 'adjectif', difficulty: 1 },
  { id: 'v_iyi', tr: 'İyi', fr: 'Bon / Bien', topic: 'adjectifs', type: 'adjectif', difficulty: 1 },
  { id: 'v_buyuk', tr: 'Büyük', fr: 'Grand', topic: 'adjectifs', type: 'adjectif', difficulty: 2 },
  { id: 'v_kucuk', tr: 'Küçük', fr: 'Petit', topic: 'adjectifs', type: 'adjectif', difficulty: 2 },
  { id: 'v_sicak', tr: 'Sıcak', fr: 'Chaud', topic: 'adjectifs', type: 'adjectif', difficulty: 2 },
  { id: 'v_soguk', tr: 'Soğuk', fr: 'Froid', topic: 'adjectifs', type: 'adjectif', difficulty: 2 },
  { id: 'v_yeni', tr: 'Yeni', fr: 'Nouveau', topic: 'adjectifs', type: 'adjectif', difficulty: 2 },
  { id: 'v_eski', tr: 'Eski', fr: 'Vieux / Ancien', topic: 'adjectifs', type: 'adjectif', difficulty: 2 },

  // ── Politesse extra ──
  { id: 'v_rica_ederim', tr: 'Rica ederim', fr: 'Je vous en prie / De rien', topic: 'salutations', type: 'expression', difficulty: 2 },
  { id: 'v_ozur_dilerim', tr: 'Özür dilerim', fr: 'Je suis désolé(e)', topic: 'salutations', type: 'expression', difficulty: 2 },
  { id: 'v_belki', tr: 'Belki', fr: 'Peut-être', topic: 'base', type: 'mot', difficulty: 1 },
  { id: 'v_tabii', tr: 'Tabii', fr: 'Bien sûr', topic: 'base', type: 'mot', difficulty: 1 },

  // ── Temps ──
  { id: 'v_bugun', tr: 'Bugün', fr: 'Aujourd\'hui', topic: 'temps', type: 'mot', difficulty: 1 },
  { id: 'v_yarin', tr: 'Yarın', fr: 'Demain', topic: 'temps', type: 'mot', difficulty: 1 },
  { id: 'v_dun', tr: 'Dün', fr: 'Hier', topic: 'temps', type: 'mot', difficulty: 1 },
  { id: 'v_simdi', tr: 'Şimdi', fr: 'Maintenant', topic: 'temps', type: 'mot', difficulty: 1 },
  { id: 'v_sabah', tr: 'Sabah', fr: 'Matin', topic: 'temps', type: 'mot', difficulty: 1 },
  { id: 'v_aksam', tr: 'Akşam', fr: 'Soir', topic: 'temps', type: 'mot', difficulty: 1 },
  { id: 'v_gece', tr: 'Gece', fr: 'Nuit', topic: 'temps', type: 'mot', difficulty: 1 },
  { id: 'v_saat', tr: 'Saat', fr: 'Heure / Horloge', topic: 'temps', type: 'nom', difficulty: 1 },
  { id: 'v_gun', tr: 'Gün', fr: 'Jour', topic: 'temps', type: 'nom', difficulty: 1 },
  { id: 'v_hafta', tr: 'Hafta', fr: 'Semaine', topic: 'temps', type: 'nom', difficulty: 2 },
  { id: 'v_ay', tr: 'Ay', fr: 'Mois / Lune', topic: 'temps', type: 'nom', difficulty: 2 },
  { id: 'v_yil', tr: 'Yıl', fr: 'Année', topic: 'temps', type: 'nom', difficulty: 2 },

  // ── Jours ──
  { id: 'v_pazartesi', tr: 'Pazartesi', fr: 'Lundi', topic: 'jours', type: 'nom', difficulty: 2 },
  { id: 'v_sali', tr: 'Salı', fr: 'Mardi', topic: 'jours', type: 'nom', difficulty: 2 },
  { id: 'v_carsamba', tr: 'Çarşamba', fr: 'Mercredi', topic: 'jours', type: 'nom', difficulty: 2 },
  { id: 'v_persembe', tr: 'Perşembe', fr: 'Jeudi', topic: 'jours', type: 'nom', difficulty: 2 },
  { id: 'v_cuma', tr: 'Cuma', fr: 'Vendredi', topic: 'jours', type: 'nom', difficulty: 2 },
  { id: 'v_cumartesi', tr: 'Cumartesi', fr: 'Samedi', topic: 'jours', type: 'nom', difficulty: 2 },
  { id: 'v_pazar', tr: 'Pazar', fr: 'Dimanche', topic: 'jours', type: 'nom', difficulty: 2 },

  // ── Couleurs ──
  { id: 'v_kirmizi', tr: 'Kırmızı', fr: 'Rouge', topic: 'couleurs', type: 'adjectif', difficulty: 1 },
  { id: 'v_mavi', tr: 'Mavi', fr: 'Bleu', topic: 'couleurs', type: 'adjectif', difficulty: 1 },
  { id: 'v_yesil', tr: 'Yeşil', fr: 'Vert', topic: 'couleurs', type: 'adjectif', difficulty: 1 },
  { id: 'v_sari', tr: 'Sarı', fr: 'Jaune', topic: 'couleurs', type: 'adjectif', difficulty: 1 },
  { id: 'v_siyah', tr: 'Siyah', fr: 'Noir', topic: 'couleurs', type: 'adjectif', difficulty: 1 },
  { id: 'v_beyaz', tr: 'Beyaz', fr: 'Blanc', topic: 'couleurs', type: 'adjectif', difficulty: 1 },

  // ── Transport ──
  { id: 'v_otobus', tr: 'Otobüs', fr: 'Bus', topic: 'transport', type: 'nom', difficulty: 1 },
  { id: 'v_metro', tr: 'Metro', fr: 'Métro', topic: 'transport', type: 'nom', difficulty: 1 },
  { id: 'v_araba', tr: 'Araba', fr: 'Voiture', topic: 'transport', type: 'nom', difficulty: 1 },
  { id: 'v_taksi', tr: 'Taksi', fr: 'Taxi', topic: 'transport', type: 'nom', difficulty: 1 },
  { id: 'v_tren', tr: 'Tren', fr: 'Train', topic: 'transport', type: 'nom', difficulty: 1 },
  { id: 'v_ucak', tr: 'Uçak', fr: 'Avion', topic: 'transport', type: 'nom', difficulty: 2 },

  // ── Métiers ──
  { id: 'v_doktor', tr: 'Doktor', fr: 'Médecin', topic: 'metiers', type: 'nom', difficulty: 1 },
  { id: 'v_ogretmen', tr: 'Öğretmen', fr: 'Professeur', topic: 'metiers', type: 'nom', difficulty: 2 },
  { id: 'v_ogrenci', tr: 'Öğrenci', fr: 'Étudiant(e)', topic: 'metiers', type: 'nom', difficulty: 2 },
  { id: 'v_muhendis', tr: 'Mühendis', fr: 'Ingénieur', topic: 'metiers', type: 'nom', difficulty: 2 },
  { id: 'v_avukat', tr: 'Avukat', fr: 'Avocat(e)', topic: 'metiers', type: 'nom', difficulty: 2 },
  { id: 'v_asci', tr: 'Aşçı', fr: 'Cuisinier/Cuisinière', topic: 'metiers', type: 'nom', difficulty: 2 },

  // ── Lieux supplémentaires ──
  { id: 'v_otel', tr: 'Otel', fr: 'Hôtel', topic: 'lieux', type: 'nom', difficulty: 1 },
  { id: 'v_restoran', tr: 'Restoran', fr: 'Restaurant', topic: 'lieux', type: 'nom', difficulty: 1 },
  { id: 'v_banka', tr: 'Banka', fr: 'Banque', topic: 'lieux', type: 'nom', difficulty: 2 },
  { id: 'v_eczane', tr: 'Eczane', fr: 'Pharmacie', topic: 'lieux', type: 'nom', difficulty: 2 },
  { id: 'v_polis', tr: 'Polis', fr: 'Police', topic: 'lieux', type: 'nom', difficulty: 1 },

  // ── Maison ──
  { id: 'v_kapi', tr: 'Kapı', fr: 'Porte', topic: 'maison', type: 'nom', difficulty: 1 },
  { id: 'v_pencere', tr: 'Pencere', fr: 'Fenêtre', topic: 'maison', type: 'nom', difficulty: 2 },
  { id: 'v_masa', tr: 'Masa', fr: 'Table', topic: 'maison', type: 'nom', difficulty: 1 },
  { id: 'v_sandalye', tr: 'Sandalye', fr: 'Chaise', topic: 'maison', type: 'nom', difficulty: 2 },
  { id: 'v_yatak', tr: 'Yatak', fr: 'Lit', topic: 'maison', type: 'nom', difficulty: 2 },
  { id: 'v_mutfak', tr: 'Mutfak', fr: 'Cuisine (pièce)', topic: 'maison', type: 'nom', difficulty: 2 },
  { id: 'v_banyo', tr: 'Banyo', fr: 'Salle de bain', topic: 'maison', type: 'nom', difficulty: 1 },

  // ── Adjectifs supplémentaires ──
  { id: 'v_ucuz', tr: 'Ucuz', fr: 'Pas cher', topic: 'adjectifs', type: 'adjectif', difficulty: 2 },
  { id: 'v_pahali', tr: 'Pahalı', fr: 'Cher / Coûteux', topic: 'adjectifs', type: 'adjectif', difficulty: 2 },
  { id: 'v_hizli', tr: 'Hızlı', fr: 'Rapide', topic: 'adjectifs', type: 'adjectif', difficulty: 2 },
  { id: 'v_yavas', tr: 'Yavaş', fr: 'Lent(e)', topic: 'adjectifs', type: 'adjectif', difficulty: 2 },

  // ── Commerce & argent ──
  { id: 'v_para', tr: 'Para', fr: 'Argent', topic: 'commerce', type: 'nom', difficulty: 1 },
  { id: 'v_fiyat', tr: 'Fiyat', fr: 'Prix', topic: 'commerce', type: 'nom', difficulty: 2 },
  { id: 'v_hesap', tr: 'Hesap', fr: 'Addition / Compte', topic: 'commerce', type: 'nom', difficulty: 2 },

  // ── Voyage ──
  { id: 'v_pasaport', tr: 'Pasaport', fr: 'Passeport', topic: 'voyage', type: 'nom', difficulty: 2 },
  { id: 'v_bilet', tr: 'Bilet', fr: 'Billet', topic: 'voyage', type: 'nom', difficulty: 1 },
  { id: 'v_bagaj', tr: 'Bagaj', fr: 'Bagage', topic: 'voyage', type: 'nom', difficulty: 2 },

  // ── Nourriture supplémentaire ──
  { id: 'v_elma', tr: 'Elma', fr: 'Pomme', topic: 'nourriture', type: 'nom', difficulty: 1 },
  { id: 'v_domates', tr: 'Domates', fr: 'Tomate', topic: 'nourriture', type: 'nom', difficulty: 1 },
  { id: 'v_pirinc', tr: 'Pirinç', fr: 'Riz', topic: 'nourriture', type: 'nom', difficulty: 2 },
  { id: 'v_seker', tr: 'Şeker', fr: 'Sucre', topic: 'nourriture', type: 'nom', difficulty: 1 },
  { id: 'v_sut', tr: 'Süt', fr: 'Lait', topic: 'nourriture', type: 'nom', difficulty: 1 },
  { id: 'v_yumurta', tr: 'Yumurta', fr: 'Œuf', topic: 'nourriture', type: 'nom', difficulty: 1 },
  { id: 'v_meyve', tr: 'Meyve', fr: 'Fruit', topic: 'nourriture', type: 'nom', difficulty: 1 },
  { id: 'v_sebze', tr: 'Sebze', fr: 'Légume', topic: 'nourriture', type: 'nom', difficulty: 2 }
];
