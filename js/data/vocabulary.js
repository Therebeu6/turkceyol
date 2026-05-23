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
  { id: 'v_sebze', tr: 'Sebze', fr: 'Légume', topic: 'nourriture', type: 'nom', difficulty: 2 },

  // ── Nationalités & Pays ──
  { id: 'v_fransiz', tr: 'Fransız', fr: 'Français(e)', topic: 'nationalites', type: 'adjectif', difficulty: 1 },
  { id: 'v_turk', tr: 'Türk', fr: 'Turc / Turque', topic: 'nationalites', type: 'adjectif', difficulty: 1 },
  { id: 'v_ingiliz', tr: 'İngiliz', fr: 'Anglais(e)', topic: 'nationalites', type: 'adjectif', difficulty: 2 },
  { id: 'v_alman', tr: 'Alman', fr: 'Allemand(e)', topic: 'nationalites', type: 'adjectif', difficulty: 2 },
  { id: 'v_italyan', tr: 'İtalyan', fr: 'Italien(ne)', topic: 'nationalites', type: 'adjectif', difficulty: 2 },
  { id: 'v_ispanyol', tr: 'İspanyol', fr: 'Espagnol(e)', topic: 'nationalites', type: 'adjectif', difficulty: 2 },
  { id: 'v_fransa', tr: 'Fransa', fr: 'France', topic: 'nationalites', type: 'nom', difficulty: 1 },
  { id: 'v_turkiye', tr: 'Türkiye', fr: 'Turquie', topic: 'nationalites', type: 'nom', difficulty: 1 },
  { id: 'v_ingiltere', tr: 'İngiltere', fr: 'Angleterre', topic: 'nationalites', type: 'nom', difficulty: 2 },
  { id: 'v_almanya', tr: 'Almanya', fr: 'Allemagne', topic: 'nationalites', type: 'nom', difficulty: 2 },
  { id: 'v_dil', tr: 'Dil', fr: 'Langue', topic: 'identite', type: 'nom', difficulty: 2 },
  { id: 'v_ulke', tr: 'Ülke', fr: 'Pays', topic: 'identite', type: 'nom', difficulty: 2 },
  { id: 'v_nerelisiniz', tr: 'Nerelisiniz?', fr: 'D\'où êtes-vous ?', topic: 'nationalites', type: 'expression', difficulty: 2 },

  // ── Nombres complémentaires (30–1000) ──
  { id: 'v_otuz', tr: 'Otuz', fr: 'Trente (30)', topic: 'nombres', type: 'nombre', difficulty: 2 },
  { id: 'v_kirk', tr: 'Kırk', fr: 'Quarante (40)', topic: 'nombres', type: 'nombre', difficulty: 2 },
  { id: 'v_altmis', tr: 'Altmış', fr: 'Soixante (60)', topic: 'nombres', type: 'nombre', difficulty: 2 },
  { id: 'v_yetmis', tr: 'Yetmiş', fr: 'Soixante-dix (70)', topic: 'nombres', type: 'nombre', difficulty: 2 },
  { id: 'v_seksen', tr: 'Seksen', fr: 'Quatre-vingts (80)', topic: 'nombres', type: 'nombre', difficulty: 3 },
  { id: 'v_doksan', tr: 'Doksan', fr: 'Quatre-vingt-dix (90)', topic: 'nombres', type: 'nombre', difficulty: 3 },
  { id: 'v_bin', tr: 'Bin', fr: 'Mille (1000)', topic: 'nombres', type: 'nombre', difficulty: 3 },

  // ── Descriptions de personnes ──
  { id: 'v_genc', tr: 'Genç', fr: 'Jeune', topic: 'adjectifs', type: 'adjectif', difficulty: 1 },
  { id: 'v_yasli', tr: 'Yaşlı', fr: 'Âgé(e)', topic: 'adjectifs', type: 'adjectif', difficulty: 2 },
  { id: 'v_uzun', tr: 'Uzun', fr: 'Grand(e) / Long(ue)', topic: 'adjectifs', type: 'adjectif', difficulty: 2 },
  { id: 'v_kisa', tr: 'Kısa', fr: 'Petit(e) / Court(e)', topic: 'adjectifs', type: 'adjectif', difficulty: 2 },
  { id: 'v_zeki', tr: 'Zeki', fr: 'Intelligent(e)', topic: 'adjectifs', type: 'adjectif', difficulty: 2 },

  // ── Directions ──
  { id: 'v_sag', tr: 'Sağ', fr: 'Droite', topic: 'directions', type: 'mot', difficulty: 1 },
  { id: 'v_sol', tr: 'Sol', fr: 'Gauche', topic: 'directions', type: 'mot', difficulty: 1 },
  { id: 'v_duz', tr: 'Dümdüz', fr: 'Tout droit', topic: 'directions', type: 'mot', difficulty: 2 },
  { id: 'v_kose', tr: 'Köşe', fr: 'Coin / Angle', topic: 'directions', type: 'nom', difficulty: 2 },
  { id: 'v_yakin', tr: 'Yakın', fr: 'Proche / Près', topic: 'directions', type: 'adjectif', difficulty: 1 },
  { id: 'v_uzak', tr: 'Uzak', fr: 'Loin / Éloigné(e)', topic: 'directions', type: 'adjectif', difficulty: 1 },
  { id: 'v_karsisinda', tr: 'Karşısında', fr: 'En face de', topic: 'directions', type: 'expression', difficulty: 3 },

  // ── Vêtements ──
  { id: 'v_gomlek', tr: 'Gömlek', fr: 'Chemise', topic: 'vetements', type: 'nom', difficulty: 2 },
  { id: 'v_pantolon', tr: 'Pantolon', fr: 'Pantalon', topic: 'vetements', type: 'nom', difficulty: 2 },
  { id: 'v_elbise', tr: 'Elbise', fr: 'Robe', topic: 'vetements', type: 'nom', difficulty: 2 },
  { id: 'v_ayakkabi', tr: 'Ayakkabı', fr: 'Chaussures', topic: 'vetements', type: 'nom', difficulty: 2 },
  { id: 'v_kazak', tr: 'Kazak', fr: 'Pull / Sweat', topic: 'vetements', type: 'nom', difficulty: 2 },
  { id: 'v_canta', tr: 'Çanta', fr: 'Sac', topic: 'vetements', type: 'nom', difficulty: 2 },

  // ── Urgences ──
  { id: 'v_yardim', tr: 'Yardım', fr: 'Aide / Au secours', topic: 'urgences', type: 'nom', difficulty: 1 },
  { id: 'v_acil', tr: 'Acil', fr: 'Urgent(e) / Urgence', topic: 'urgences', type: 'adjectif', difficulty: 2 },

  // ── Communication ──
  { id: 'v_anlamiyorum', tr: 'Anlamıyorum', fr: 'Je ne comprends pas', topic: 'communication', type: 'expression', difficulty: 2 },
  { id: 'v_bilmiyorum', tr: 'Bilmiyorum', fr: 'Je ne sais pas', topic: 'communication', type: 'expression', difficulty: 2 },
  { id: 'v_tekrar', tr: 'Tekrar', fr: 'De nouveau / Encore', topic: 'communication', type: 'mot', difficulty: 2 },
  { id: 'v_yavas_konusun', tr: 'Yavaş konuşun', fr: 'Parlez plus lentement', topic: 'communication', type: 'expression', difficulty: 3 },

  // ── Goûts alimentaires ──
  { id: 'v_lezzetli', tr: 'Lezzetli', fr: 'Délicieux / Savoureux', topic: 'nourriture', type: 'adjectif', difficulty: 2 },
  { id: 'v_tatli', tr: 'Tatlı', fr: 'Sucré(e) / Doux', topic: 'nourriture', type: 'adjectif', difficulty: 2 },
  { id: 'v_aci', tr: 'Acı', fr: 'Épicé(e) / Amer', topic: 'nourriture', type: 'adjectif', difficulty: 2 },
  { id: 'v_meyve_suyu', tr: 'Meyve suyu', fr: 'Jus de fruit', topic: 'nourriture', type: 'nom', difficulty: 2 },
  { id: 'v_ayran', tr: 'Ayran', fr: 'Ayran (boisson au yaourt)', topic: 'nourriture', type: 'nom', difficulty: 2 },

  // ── Chunks & Expressions courantes ──
  { id: 'v_nasilsiniz', tr: 'Nasılsınız?', fr: 'Comment allez-vous ?', topic: 'chunks', type: 'expression', difficulty: 1 },
  { id: 'v_iyiyim', tr: 'İyiyim', fr: 'Je vais bien', topic: 'chunks', type: 'expression', difficulty: 1 },
  { id: 'v_cok_iyi', tr: 'Çok iyi!', fr: 'Très bien !', topic: 'chunks', type: 'expression', difficulty: 1 },
  { id: 'v_fena_degil', tr: 'Fena değil', fr: 'Pas mal', topic: 'chunks', type: 'expression', difficulty: 2 },
  { id: 'v_ne_kadar', tr: 'Ne kadar?', fr: 'Combien ? / C\'est combien ?', topic: 'chunks', type: 'expression', difficulty: 1 },
  { id: 'v_ne_zaman', tr: 'Ne zaman?', fr: 'Quand ?', topic: 'chunks', type: 'expression', difficulty: 1 },
  { id: 'v_neden', tr: 'Neden?', fr: 'Pourquoi ?', topic: 'chunks', type: 'expression', difficulty: 2 },
  { id: 'v_nasil', tr: 'Nasıl?', fr: 'Comment ?', topic: 'chunks', type: 'expression', difficulty: 1 },
  { id: 'v_nerede', tr: 'Nerede?', fr: 'Où ?', topic: 'chunks', type: 'expression', difficulty: 1 },
  { id: 'v_var', tr: 'Var', fr: 'Il y a / Disponible', topic: 'chunks', type: 'mot', difficulty: 1 },
  { id: 'v_yok', tr: 'Yok', fr: 'Il n\'y a pas / Absent', topic: 'chunks', type: 'mot', difficulty: 1 },
  { id: 'v_cok', tr: 'Çok', fr: 'Très / Beaucoup', topic: 'chunks', type: 'mot', difficulty: 1 },
  { id: 'v_az', tr: 'Az', fr: 'Peu / Un peu', topic: 'chunks', type: 'mot', difficulty: 1 },
  { id: 'v_biraz', tr: 'Biraz', fr: 'Un peu', topic: 'chunks', type: 'mot', difficulty: 1 },
  { id: 'v_bazen', tr: 'Bazen', fr: 'Parfois', topic: 'chunks', type: 'mot', difficulty: 2 },
  { id: 'v_hep', tr: 'Her zaman', fr: 'Toujours', topic: 'chunks', type: 'mot', difficulty: 2 },
  { id: 'v_hic', tr: 'Hiç', fr: 'Jamais / Du tout', topic: 'chunks', type: 'mot', difficulty: 2 },
  { id: 'v_dogru', tr: 'Doğru', fr: 'Juste / Correct / Vrai', topic: 'base', type: 'adjectif', difficulty: 2 },
  { id: 'v_yanlis', tr: 'Yanlış', fr: 'Faux / Incorrect', topic: 'base', type: 'adjectif', difficulty: 2 },
  { id: 'v_elbette', tr: 'Elbette', fr: 'Bien sûr / Évidemment', topic: 'base', type: 'mot', difficulty: 2 },
  { id: 'v_gercekten', tr: 'Gerçekten', fr: 'Vraiment', topic: 'base', type: 'mot', difficulty: 2 },
  { id: 'v_hadi', tr: 'Hadi!', fr: 'Allez ! / Allons-y !', topic: 'chunks', type: 'expression', difficulty: 2 },
  { id: 'v_anliyorum', tr: 'Anlıyorum', fr: 'Je comprends', topic: 'communication', type: 'expression', difficulty: 2 },
  { id: 'v_biliyorum', tr: 'Biliyorum', fr: 'Je sais', topic: 'communication', type: 'expression', difficulty: 2 },
  { id: 'v_bir_dakika', tr: 'Bir dakika', fr: 'Une minute / Attendez', topic: 'chunks', type: 'expression', difficulty: 2 },

  // ── Locatifs ──
  { id: 'v_icinde', tr: 'İçinde', fr: 'Dans / À l\'intérieur de', topic: 'locatifs', type: 'expression', difficulty: 2 },
  { id: 'v_disinda', tr: 'Dışında', fr: 'Dehors / À l\'extérieur de', topic: 'locatifs', type: 'expression', difficulty: 3 },
  { id: 'v_onunde', tr: 'Önünde', fr: 'Devant', topic: 'locatifs', type: 'expression', difficulty: 2 },
  { id: 'v_arkasinda', tr: 'Arkasında', fr: 'Derrière', topic: 'locatifs', type: 'expression', difficulty: 2 },
  { id: 'v_yaninda', tr: 'Yanında', fr: 'À côté de', topic: 'locatifs', type: 'expression', difficulty: 2 },
  { id: 'v_ustunde', tr: 'Üstünde', fr: 'Sur / Au-dessus de', topic: 'locatifs', type: 'expression', difficulty: 3 },
  { id: 'v_altinda', tr: 'Altında', fr: 'Sous / En dessous de', topic: 'locatifs', type: 'expression', difficulty: 3 },
  { id: 'v_karsida', tr: 'Karşıda', fr: 'En face / De l\'autre côté', topic: 'locatifs', type: 'expression', difficulty: 2 },

  // ── Météo ──
  { id: 'v_hava', tr: 'Hava', fr: 'Météo / Temps / Air', topic: 'meteo', type: 'nom', difficulty: 1 },
  { id: 'v_gunes', tr: 'Güneş', fr: 'Soleil', topic: 'meteo', type: 'nom', difficulty: 1 },
  { id: 'v_yagmur', tr: 'Yağmur', fr: 'Pluie', topic: 'meteo', type: 'nom', difficulty: 2 },
  { id: 'v_kar', tr: 'Kar', fr: 'Neige', topic: 'meteo', type: 'nom', difficulty: 2 },
  { id: 'v_ruzgar', tr: 'Rüzgar', fr: 'Vent', topic: 'meteo', type: 'nom', difficulty: 2 },
  { id: 'v_bulutlu', tr: 'Bulutlu', fr: 'Nuageux', topic: 'meteo', type: 'adjectif', difficulty: 2 },
  { id: 'v_gunesli', tr: 'Güneşli', fr: 'Ensoleillé', topic: 'meteo', type: 'adjectif', difficulty: 2 },
  { id: 'v_yagmurlu', tr: 'Yağmurlu', fr: 'Pluvieux', topic: 'meteo', type: 'adjectif', difficulty: 2 },
  { id: 'v_karik', tr: 'Karlı', fr: 'Enneigé', topic: 'meteo', type: 'adjectif', difficulty: 3 },
  { id: 'v_hava_sicak', tr: 'Hava sıcak', fr: 'Il fait chaud', topic: 'meteo', type: 'expression', difficulty: 1 },
  { id: 'v_hava_soguk', tr: 'Hava soğuk', fr: 'Il fait froid', topic: 'meteo', type: 'expression', difficulty: 1 },
  { id: 'v_hava_guzel', tr: 'Hava güzel', fr: 'Il fait beau', topic: 'meteo', type: 'expression', difficulty: 1 },

  // ── Corps humain ──
  { id: 'v_bas', tr: 'Baş', fr: 'Tête', topic: 'corps', type: 'nom', difficulty: 1 },
  { id: 'v_el', tr: 'El', fr: 'Main', topic: 'corps', type: 'nom', difficulty: 1 },
  { id: 'v_goz', tr: 'Göz', fr: 'Œil / Yeux', topic: 'corps', type: 'nom', difficulty: 1 },
  { id: 'v_kulak', tr: 'Kulak', fr: 'Oreille', topic: 'corps', type: 'nom', difficulty: 2 },
  { id: 'v_agiz', tr: 'Ağız', fr: 'Bouche', topic: 'corps', type: 'nom', difficulty: 2 },
  { id: 'v_ayak', tr: 'Ayak', fr: 'Pied', topic: 'corps', type: 'nom', difficulty: 2 },
  { id: 'v_kol', tr: 'Kol', fr: 'Bras', topic: 'corps', type: 'nom', difficulty: 2 },
  { id: 'v_dis', tr: 'Diş', fr: 'Dent', topic: 'corps', type: 'nom', difficulty: 2 },
  { id: 'v_sirt', tr: 'Sırt', fr: 'Dos', topic: 'corps', type: 'nom', difficulty: 2 },
  { id: 'v_karin', tr: 'Karın', fr: 'Ventre / Estomac', topic: 'corps', type: 'nom', difficulty: 2 },

  // ── Santé ──
  { id: 'v_hasta', tr: 'Hasta', fr: 'Malade', topic: 'sante', type: 'adjectif', difficulty: 1 },
  { id: 'v_ilac', tr: 'İlaç', fr: 'Médicament', topic: 'sante', type: 'nom', difficulty: 2 },
  { id: 'v_agri', tr: 'Ağrı', fr: 'Douleur', topic: 'sante', type: 'nom', difficulty: 2 },
  { id: 'v_ates', tr: 'Ateş', fr: 'Fièvre', topic: 'sante', type: 'nom', difficulty: 2 },
  { id: 'v_bas_agrisi', tr: 'Baş ağrısı', fr: 'Mal de tête', topic: 'sante', type: 'expression', difficulty: 2 },
  { id: 'v_karin_agrisi', tr: 'Karın ağrısı', fr: 'Mal au ventre', topic: 'sante', type: 'expression', difficulty: 3 },
  { id: 'v_iyi_hissediyorum', tr: 'İyi hissediyorum', fr: 'Je me sens bien', topic: 'sante', type: 'expression', difficulty: 3 },
  { id: 'v_iyi_degilim', tr: 'İyi değilim', fr: 'Je ne vais pas bien', topic: 'sante', type: 'expression', difficulty: 2 },
  { id: 'v_dinlen', tr: 'Dinlen', fr: 'Repose-toi', topic: 'sante', type: 'expression', difficulty: 3 },

  // ── Famille élargie ──
  { id: 'v_cocuk', tr: 'Çocuk', fr: 'Enfant', topic: 'famille', type: 'nom', difficulty: 1 },
  { id: 'v_koca', tr: 'Koca', fr: 'Mari', topic: 'famille', type: 'nom', difficulty: 2 },
  { id: 'v_karim', tr: 'Karı', fr: 'Femme (épouse)', topic: 'famille', type: 'nom', difficulty: 2 },
  { id: 'v_dede', tr: 'Dede', fr: 'Grand-père', topic: 'famille', type: 'nom', difficulty: 1 },
  { id: 'v_nine', tr: 'Nine', fr: 'Grand-mère', topic: 'famille', type: 'nom', difficulty: 1 },
  { id: 'v_amca', tr: 'Amca', fr: 'Oncle (côté paternel)', topic: 'famille', type: 'nom', difficulty: 2 },
  { id: 'v_teyze', tr: 'Teyze', fr: 'Tante (côté maternel)', topic: 'famille', type: 'nom', difficulty: 2 },

  // ── Adverbes & Connecteurs ──
  { id: 'v_once', tr: 'Önce', fr: 'D\'abord / Avant', topic: 'adverbes', type: 'mot', difficulty: 2 },
  { id: 'v_sonra', tr: 'Sonra', fr: 'Ensuite / Après', topic: 'adverbes', type: 'mot', difficulty: 1 },
  { id: 'v_simdilik', tr: 'Şimdilik', fr: 'Pour l\'instant', topic: 'adverbes', type: 'mot', difficulty: 3 },
  { id: 'v_artik', tr: 'Artık', fr: 'Désormais / Maintenant (changement)', topic: 'adverbes', type: 'mot', difficulty: 3 },
  { id: 'v_hemen', tr: 'Hemen', fr: 'Tout de suite / Immédiatement', topic: 'adverbes', type: 'mot', difficulty: 2 },
  { id: 'v_cok_daha', tr: 'Çok daha', fr: 'Bien plus', topic: 'adverbes', type: 'mot', difficulty: 3 },

  // ── Émotions ──
  { id: 'v_mutlu', tr: 'Mutlu', fr: 'Heureux/Heureuse', topic: 'emotions', type: 'adjectif', difficulty: 1, example: { tr: 'Ben bugün çok mutluyum.', fr: 'Je suis très heureux aujourd\'hui.' } },
  { id: 'v_uzgun', tr: 'Üzgün', fr: 'Triste', topic: 'emotions', type: 'adjectif', difficulty: 1, example: { tr: 'O çok üzgün görünüyor.', fr: 'Il/Elle a l\'air très triste.' } },
  { id: 'v_yorgun', tr: 'Yorgun', fr: 'Fatigué(e)', topic: 'emotions', type: 'adjectif', difficulty: 1, example: { tr: 'Ben çok yorgunum.', fr: 'Je suis très fatigué(e).' } },
  { id: 'v_sinirli', tr: 'Sinirli', fr: 'Énervé(e)', topic: 'emotions', type: 'adjectif', difficulty: 2, example: { tr: 'Neden bu kadar sinirlisin?', fr: 'Pourquoi es-tu si énervé(e) ?' } },
  { id: 'v_saskin', tr: 'Şaşkın', fr: 'Surpris(e)', topic: 'emotions', type: 'adjectif', difficulty: 2, example: { tr: 'Bu habere çok şaşırdım.', fr: 'J\'ai été très surpris(e) par cette nouvelle.' } },
  { id: 'v_endiseli', tr: 'Endişeli', fr: 'Inquiet/Inquiète', topic: 'emotions', type: 'adjectif', difficulty: 2, example: { tr: 'Annem çok endişeli.', fr: 'Ma mère est très inquiète.' } },
  { id: 'v_korkmus', tr: 'Korkmuş', fr: 'Effrayé(e)', topic: 'emotions', type: 'adjectif', difficulty: 2, example: { tr: 'Çocuk korkmuş.', fr: 'L\'enfant est effrayé.' } },
  { id: 'v_heyecanli', tr: 'Heyecanlı', fr: 'Enthousiaste / Excité(e)', topic: 'emotions', type: 'adjectif', difficulty: 2, example: { tr: 'Yarın için çok heyecanlıyım.', fr: 'Je suis très enthousiaste pour demain.' } },
  { id: 'v_sikilmis', tr: 'Sıkılmış', fr: 'Ennuyé(e)', topic: 'emotions', type: 'adjectif', difficulty: 2, example: { tr: 'Evde sıkılıyorum.', fr: 'Je m\'ennuie à la maison.' } },
  { id: 'v_memnun', tr: 'Memnun', fr: 'Content(e) / Satisfait(e)', topic: 'emotions', type: 'adjectif', difficulty: 2, example: { tr: 'Sonuçtan memnunum.', fr: 'Je suis content(e) du résultat.' } },
  { id: 'v_kizgin', tr: 'Kızgın', fr: 'Fâché(e) / En colère', topic: 'emotions', type: 'adjectif', difficulty: 2, example: { tr: 'Ona çok kızgınım.', fr: 'Je suis très fâché(e) contre lui/elle.' } },
  { id: 'v_neseli', tr: 'Neşeli', fr: 'Joyeux/Joyeuse', topic: 'emotions', type: 'adjectif', difficulty: 2, example: { tr: 'O her zaman neşeli.', fr: 'Il/Elle est toujours joyeux/joyeuse.' } },
  { id: 'v_utanmis', tr: 'Utanmış', fr: 'Honteux/Honteuse', topic: 'emotions', type: 'adjectif', difficulty: 3, example: { tr: 'Bu durumdan utanıyorum.', fr: 'J\'ai honte de cette situation.' } },
  { id: 'v_merakli', tr: 'Meraklı', fr: 'Curieux/Curieuse', topic: 'emotions', type: 'adjectif', difficulty: 2, example: { tr: 'Çocuklar her şeye meraklı.', fr: 'Les enfants sont curieux de tout.' } },
  { id: 'v_rahat', tr: 'Rahat', fr: 'Détendu(e) / À l\'aise', topic: 'emotions', type: 'adjectif', difficulty: 2, example: { tr: 'Şimdi çok rahatım.', fr: 'Je suis très détendu(e) maintenant.' } },

  // ── Animaux ──
  { id: 'v_kopek', tr: 'Köpek', fr: 'Chien', topic: 'animaux', type: 'nom', difficulty: 1, example: { tr: 'Köpeğim çok sevimli.', fr: 'Mon chien est très mignon.' } },
  { id: 'v_kedi', tr: 'Kedi', fr: 'Chat', topic: 'animaux', type: 'nom', difficulty: 1, example: { tr: 'Kedi uyuyor.', fr: 'Le chat dort.' } },
  { id: 'v_kus', tr: 'Kuş', fr: 'Oiseau', topic: 'animaux', type: 'nom', difficulty: 1, example: { tr: 'Bahçede bir kuş var.', fr: 'Il y a un oiseau dans le jardin.' } },
  { id: 'v_at', tr: 'At', fr: 'Cheval', topic: 'animaux', type: 'nom', difficulty: 1, example: { tr: 'At hızlı koşuyor.', fr: 'Le cheval court vite.' } },
  { id: 'v_inek', tr: 'İnek', fr: 'Vache', topic: 'animaux', type: 'nom', difficulty: 2, example: { tr: 'Çiftlikte inek var.', fr: 'Il y a une vache à la ferme.' } },
  { id: 'v_tavsan', tr: 'Tavşan', fr: 'Lapin', topic: 'animaux', type: 'nom', difficulty: 2, example: { tr: 'Beyaz bir tavşan gördüm.', fr: 'J\'ai vu un lapin blanc.' } },
  { id: 'v_fare', tr: 'Fare', fr: 'Souris', topic: 'animaux', type: 'nom', difficulty: 2, example: { tr: 'Mutfakta fare var.', fr: 'Il y a une souris dans la cuisine.' } },
  { id: 'v_aslan', tr: 'Aslan', fr: 'Lion', topic: 'animaux', type: 'nom', difficulty: 1, example: { tr: 'Aslan ormanın kralı.', fr: 'Le lion est le roi de la forêt.' } },
  { id: 'v_fil', tr: 'Fil', fr: 'Éléphant', topic: 'animaux', type: 'nom', difficulty: 2, example: { tr: 'Fil çok büyük bir hayvandır.', fr: 'L\'éléphant est un très grand animal.' } },
  { id: 'v_maymun', tr: 'Maymun', fr: 'Singe', topic: 'animaux', type: 'nom', difficulty: 2, example: { tr: 'Maymunlar ağaçta oynuyor.', fr: 'Les singes jouent dans l\'arbre.' } },
  { id: 'v_kaplumbaga', tr: 'Kaplumbağa', fr: 'Tortue', topic: 'animaux', type: 'nom', difficulty: 3, example: { tr: 'Kaplumbağa yavaş yürüyor.', fr: 'La tortue marche lentement.' } },
  { id: 'v_yilan', tr: 'Yılan', fr: 'Serpent', topic: 'animaux', type: 'nom', difficulty: 2, example: { tr: 'Bahçede yılan gördüm.', fr: 'J\'ai vu un serpent dans le jardin.' } },

  // ── Adjectifs opposés ──
  { id: 'v_guclu', tr: 'Güçlü', fr: 'Fort(e)', topic: 'adjectifs', type: 'adjectif', difficulty: 2, example: { tr: 'O çok güçlü.', fr: 'Il/Elle est très fort(e).' } },
  { id: 'v_zayif', tr: 'Zayıf', fr: 'Faible', topic: 'adjectifs', type: 'adjectif', difficulty: 2, example: { tr: 'Bugün kendimi zayıf hissediyorum.', fr: 'Je me sens faible aujourd\'hui.' } },
  { id: 'v_temiz', tr: 'Temiz', fr: 'Propre', topic: 'adjectifs', type: 'adjectif', difficulty: 1, example: { tr: 'Oda çok temiz.', fr: 'La pièce est très propre.' } },
  { id: 'v_kirli', tr: 'Kirli', fr: 'Sale', topic: 'adjectifs', type: 'adjectif', difficulty: 1, example: { tr: 'Eller kirli.', fr: 'Les mains sont sales.' } },
  { id: 'v_dolu', tr: 'Dolu', fr: 'Plein(e)', topic: 'adjectifs', type: 'adjectif', difficulty: 2, example: { tr: 'Bardak dolu.', fr: 'Le verre est plein.' } },
  { id: 'v_bos', tr: 'Boş', fr: 'Vide', topic: 'adjectifs', type: 'adjectif', difficulty: 2, example: { tr: 'Bardak boş.', fr: 'Le verre est vide.' } },
  { id: 'v_agir', tr: 'Ağır', fr: 'Lourd(e)', topic: 'adjectifs', type: 'adjectif', difficulty: 2, example: { tr: 'Bu çanta çok ağır.', fr: 'Ce sac est très lourd.' } },
  { id: 'v_hafif', tr: 'Hafif', fr: 'Léger/Légère', topic: 'adjectifs', type: 'adjectif', difficulty: 2, example: { tr: 'Bu çanta çok hafif.', fr: 'Ce sac est très léger.' } },
  { id: 'v_acik', tr: 'Açık', fr: 'Ouvert(e)', topic: 'adjectifs', type: 'adjectif', difficulty: 1, example: { tr: 'Kapı açık.', fr: 'La porte est ouverte.' } },
  { id: 'v_kapali', tr: 'Kapalı', fr: 'Fermé(e)', topic: 'adjectifs', type: 'adjectif', difficulty: 1, example: { tr: 'Dükkan kapalı.', fr: 'Le magasin est fermé.' } },
  { id: 'v_kolay', tr: 'Kolay', fr: 'Facile', topic: 'adjectifs', type: 'adjectif', difficulty: 1, example: { tr: 'Bu egzersiz çok kolay.', fr: 'Cet exercice est très facile.' } },
  { id: 'v_zor', tr: 'Zor', fr: 'Difficile', topic: 'adjectifs', type: 'adjectif', difficulty: 1, example: { tr: 'Bu soru zor.', fr: 'Cette question est difficile.' } },
  { id: 'v_sert', tr: 'Sert', fr: 'Dur(e) / Rigide', topic: 'adjectifs', type: 'adjectif', difficulty: 2, example: { tr: 'Bu ekmek çok sert.', fr: 'Ce pain est très dur.' } },
  { id: 'v_yumusak', tr: 'Yumuşak', fr: 'Doux/Douce / Mou', topic: 'adjectifs', type: 'adjectif', difficulty: 2, example: { tr: 'Yatak çok yumuşak.', fr: 'Le lit est très doux.' } },
  { id: 'v_aydinlik', tr: 'Aydınlık', fr: 'Clair(e) / Lumineux', topic: 'adjectifs', type: 'adjectif', difficulty: 2, example: { tr: 'Oda çok aydınlık.', fr: 'La pièce est très lumineuse.' } },
  { id: 'v_karanlik', tr: 'Karanlık', fr: 'Sombre / Obscur(e)', topic: 'adjectifs', type: 'adjectif', difficulty: 2, example: { tr: 'Gece çok karanlık.', fr: 'La nuit est très sombre.' } },
  { id: 'v_sessiz', tr: 'Sessiz', fr: 'Silencieux/Silencieuse', topic: 'adjectifs', type: 'adjectif', difficulty: 2, example: { tr: 'Kütüphane çok sessiz.', fr: 'La bibliothèque est très silencieuse.' } },
  { id: 'v_gurultulu', tr: 'Gürültülü', fr: 'Bruyant(e)', topic: 'adjectifs', type: 'adjectif', difficulty: 2, example: { tr: 'Sokak çok gürültülü.', fr: 'La rue est très bruyante.' } },
  { id: 'v_guvenli', tr: 'Güvenli', fr: 'Sûr(e) / En sécurité', topic: 'adjectifs', type: 'adjectif', difficulty: 2, example: { tr: 'Bu yol güvenli.', fr: 'Cette route est sûre.' } },
  { id: 'v_tehlikeli', tr: 'Tehlikeli', fr: 'Dangereux/Dangereuse', topic: 'adjectifs', type: 'adjectif', difficulty: 2, example: { tr: 'Bu bölge tehlikeli.', fr: 'Ce quartier est dangereux.' } }
];
