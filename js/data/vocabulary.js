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
  { id: 'v_eski', tr: 'Eski', fr: 'Vieux / Ancien', topic: 'adjectifs', type: 'adjectif', difficulty: 2 }
];
