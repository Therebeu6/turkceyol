/* ═══════════════════════════════════════════════
   TürkçeYol — phrases.js
   Base de données de phrases utiles par niveau
   ═══════════════════════════════════════════════ */

window.AppPhrases = [
  // ── Salutations & Rencontres ──
  { id: 'p_nasilsin', tr: 'Nasılsın?', fr: 'Comment vas-tu ?', topic: 'salutations', difficulty: 1 },
  { id: 'p_iyiyim', tr: 'İyiyim, sen nasılsın?', fr: 'Je vais bien, et toi ?', topic: 'salutations', difficulty: 1 },
  { id: 'p_tanistigimiza_memnun_oldum', tr: 'Tanıştığımıza memnun oldum.', fr: 'Ravi de vous rencontrer.', topic: 'salutations', difficulty: 2 },
  { id: 'p_adiniz_ne', tr: 'Adınız ne?', fr: 'Comment vous appelez-vous ?', topic: 'salutations', difficulty: 1 },
  { id: 'p_benim_adim', tr: 'Benim adım Ali.', fr: 'Mon nom est Ali.', topic: 'salutations', difficulty: 1 },
  { id: 'p_nerelisiniz', tr: 'Nerelisiniz?', fr: 'D\'où venez-vous ?', topic: 'salutations', difficulty: 2 },
  { id: 'p_fransaliyim', tr: 'Fransalıyım.', fr: 'Je suis français(e).', topic: 'salutations', difficulty: 1 },

  // ── Compréhension & Aide ──
  { id: 'p_anlamiyorum', tr: 'Anlamıyorum.', fr: 'Je ne comprends pas.', topic: 'aide', difficulty: 1 },
  { id: 'p_tekrar_eder_misiniz', tr: 'Tekrar eder misiniz?', fr: 'Pouvez-vous répéter ?', topic: 'aide', difficulty: 2 },
  { id: 'p_yavas_konusur_musunuz', tr: 'Yavaş konuşur musunuz?', fr: 'Pouvez-vous parler lentement ?', topic: 'aide', difficulty: 2 },
  { id: 'p_turkce_bilmiyorum', tr: 'Türkçe bilmiyorum.', fr: 'Je ne parle pas turc.', topic: 'aide', difficulty: 1 },
  { id: 'p_ingilizce_biliyor_musunuz', tr: 'İngilizce biliyor musunuz?', fr: 'Parlez-vous anglais ?', topic: 'aide', difficulty: 2 },
  { id: 'p_yardim_eder_misiniz', tr: 'Yardım eder misiniz?', fr: 'Pouvez-vous m\'aider ?', topic: 'aide', difficulty: 2 },

  // ── Au restaurant / Café ──
  { id: 'p_menu_lutfen', tr: 'Menü lütfen.', fr: 'Le menu s\'il vous plaît.', topic: 'restaurant', difficulty: 1 },
  { id: 'p_bir_cay_istiyorum', tr: 'Bir çay istiyorum.', fr: 'Je veux un thé.', topic: 'restaurant', difficulty: 1 },
  { id: 'p_hesap_lutfen', tr: 'Hesap lütfen.', fr: 'L\'addition s\'il vous plaît.', topic: 'restaurant', difficulty: 1 },
  { id: 'p_cok_lezzetli', tr: 'Çok lezzetli!', fr: 'C\'est très délicieux !', topic: 'restaurant', difficulty: 1 },
  { id: 'p_bunu_alacagim', tr: 'Bunu alacağım.', fr: 'Je vais prendre ça.', topic: 'restaurant', difficulty: 2 },

  // ── Shopping / Lieux ──
  { id: 'p_ne_kadar', tr: 'Bu ne kadar?', fr: 'Combien ça coûte ?', topic: 'shopping', difficulty: 1 },
  { id: 'p_cok_pahali', tr: 'Çok pahalı!', fr: 'C\'est très cher !', topic: 'shopping', difficulty: 1 },
  { id: 'p_indirim_var_mi', tr: 'İndirim var mı?', fr: 'Y a-t-il une réduction ?', topic: 'shopping', difficulty: 2 },
  { id: 'p_tuvalet_nerede', tr: 'Tuvalet nerede?', fr: 'Où sont les toilettes ?', topic: 'voyage', difficulty: 1 },
  { id: 'p_hastane_nerede', tr: 'Hastane nerede?', fr: 'Où est l\'hôpital ?', topic: 'voyage', difficulty: 1 },
  
  // ── Routine & Actions (Verbes conjugués) ──
  { id: 'p_ise_gidiyorum', tr: 'İşe gidiyorum.', fr: 'Je vais au travail.', topic: 'routine', difficulty: 2 },
  { id: 'p_eve_geliyorum', tr: 'Eve geliyorum.', fr: 'Je viens à la maison / Je rentre.', topic: 'routine', difficulty: 2 },
  { id: 'p_turkce_calisiyorum', tr: 'Türkçe çalışıyorum.', fr: 'J\'étudie le turc.', topic: 'routine', difficulty: 2 },
  { id: 'p_kahve_iciyorum', tr: 'Kahve içiyorum.', fr: 'Je bois du café.', topic: 'routine', difficulty: 1 },

  // ── Transport ──
  { id: 'p_otobus_duragi_nerede', tr: 'Otobüs durağı nerede?', fr: 'Où est l\'arrêt de bus ?', topic: 'transport', difficulty: 1 },
  { id: 'p_bu_otobus_gidiyor_mu', tr: 'Bu otobüs Taksim\'e gidiyor mu?', fr: 'Est-ce que ce bus va à Taksim ?', topic: 'transport', difficulty: 2 },
  { id: 'p_metro_nerede', tr: 'Metro nerede?', fr: 'Où est le métro ?', topic: 'transport', difficulty: 1 },
  { id: 'p_bir_bilet_lutfen', tr: 'Bir bilet lütfen.', fr: 'Un billet s\'il vous plaît.', topic: 'transport', difficulty: 1 },
  { id: 'p_taksi_cagirabilir_misiniz', tr: 'Taksi çağırabilir misiniz?', fr: 'Pouvez-vous appeler un taxi ?', topic: 'transport', difficulty: 2 },
  { id: 'p_tren_gari_nerede', tr: 'Tren garı nerede?', fr: 'Où est la gare ?', topic: 'transport', difficulty: 1 },
  { id: 'p_kac_dakika_suruyor', tr: 'Kaç dakika sürüyor?', fr: 'Combien de minutes ça prend ?', topic: 'transport', difficulty: 2 },
  { id: 'p_son_otobus_kacta', tr: 'Son otobüs kaçta?', fr: 'À quelle heure est le dernier bus ?', topic: 'transport', difficulty: 2 },
  { id: 'p_otobus_gec_kaldi', tr: 'Otobüs gecikti.', fr: 'Le bus est en retard.', topic: 'transport', difficulty: 2 },
  { id: 'p_buraya_nasil_gidebilirim', tr: 'Buraya nasıl gidebilirim?', fr: 'Comment puis-je aller ici ?', topic: 'transport', difficulty: 2 },

  // ── Hôtel / Voyage ──
  { id: 'p_rezervasyonum_var', tr: 'Rezervasyonum var.', fr: 'J\'ai une réservation.', topic: 'hotel', difficulty: 1 },
  { id: 'p_oda_anahtari_lutfen', tr: 'Oda anahtarı lütfen.', fr: 'La clé de la chambre s\'il vous plaît.', topic: 'hotel', difficulty: 1 },
  { id: 'p_kac_gecelik', tr: 'İki gecelik bir oda istiyorum.', fr: 'Je voudrais une chambre pour deux nuits.', topic: 'hotel', difficulty: 2 },
  { id: 'p_kacta_check_in', tr: 'Giriş saati kaçta?', fr: 'À quelle heure est le check-in ?', topic: 'hotel', difficulty: 2 },
  { id: 'p_kacta_check_out', tr: 'Çıkış saati kaçta?', fr: 'À quelle heure est le check-out ?', topic: 'hotel', difficulty: 2 },
  { id: 'p_kahvalti_dahil_mi', tr: 'Kahvaltı dahil mi?', fr: 'Le petit-déjeuner est-il inclus ?', topic: 'hotel', difficulty: 2 },
  { id: 'p_wifi_sifresi_ne', tr: 'Wifi şifresi ne?', fr: 'Quel est le mot de passe wifi ?', topic: 'hotel', difficulty: 1 },
  { id: 'p_bavulumu_birakabilir_miyim', tr: 'Bavulumu bırakabilir miyim?', fr: 'Puis-je laisser ma valise ?', topic: 'hotel', difficulty: 2 },
  { id: 'p_odamda_sorun_var', tr: 'Odamda bir sorun var.', fr: 'Il y a un problème dans ma chambre.', topic: 'hotel', difficulty: 2 },
  { id: 'p_erken_kacta_cikarsiniz', tr: 'Geç çıkış mümkün mü?', fr: 'Est-ce que le check-out tardif est possible ?', topic: 'hotel', difficulty: 3 },

  // ── Urgences & Santé ──
  { id: 'p_basim_agriyor', tr: 'Başım ağrıyor.', fr: 'J\'ai mal à la tête.', topic: 'sante', difficulty: 1 },
  { id: 'p_doktor_cagirin', tr: 'Lütfen doktor çağırın.', fr: 'Appelez un médecin s\'il vous plaît.', topic: 'urgences', difficulty: 2 },
  { id: 'p_eczane_nerede', tr: 'En yakın eczane nerede?', fr: 'Où est la pharmacie la plus proche ?', topic: 'sante', difficulty: 2 },
  { id: 'p_alerjim_var', tr: 'Alerjim var.', fr: 'J\'ai une allergie.', topic: 'sante', difficulty: 1 },
  { id: 'p_yardim_edin', tr: 'Yardım edin!', fr: 'Au secours ! / Aidez-moi !', topic: 'urgences', difficulty: 1 },
  { id: 'p_atesim_var', tr: 'Ateşim var.', fr: 'J\'ai de la fièvre.', topic: 'sante', difficulty: 1 },
  { id: 'p_karnım_agriyor', tr: 'Karnım ağrıyor.', fr: 'J\'ai mal au ventre.', topic: 'sante', difficulty: 1 },
  { id: 'p_ambulans_cagirin', tr: 'Ambulans çağırın!', fr: 'Appelez une ambulance !', topic: 'urgences', difficulty: 2 },

  // ── Directions détaillées ──
  { id: 'p_ne_kadar_uzakta', tr: 'Ne kadar uzakta?', fr: 'C\'est à quelle distance ?', topic: 'directions', difficulty: 1 },
  { id: 'p_kac_dakika_yurumus', tr: 'Yürüyerek kaç dakika?', fr: 'C\'est à combien de minutes à pied ?', topic: 'directions', difficulty: 2 },
  { id: 'p_ilk_sola_donun', tr: 'İlk sokakta sola dönün.', fr: 'Tournez à gauche à la première rue.', topic: 'directions', difficulty: 2 },
  { id: 'p_duz_gidin', tr: 'Düz gidin.', fr: 'Allez tout droit.', topic: 'directions', difficulty: 1 },
  { id: 'p_kopruyu_gecin', tr: 'Köprüyü geçin.', fr: 'Traversez le pont.', topic: 'directions', difficulty: 2 },
  { id: 'p_karsisinda', tr: 'Oranın karşısında.', fr: 'C\'est en face.', topic: 'directions', difficulty: 2 },
  { id: 'p_saga_donun', tr: 'Sağa dönün.', fr: 'Tournez à droite.', topic: 'directions', difficulty: 1 },
  { id: 'p_cok_uzak_degil', tr: 'Çok uzak değil.', fr: 'Ce n\'est pas très loin.', topic: 'directions', difficulty: 1 },

  // ── Social / Conversation ──
  { id: 'p_kac_yasindasin', tr: 'Kaç yaşındasın?', fr: 'Quel âge as-tu ?', topic: 'social', difficulty: 1 },
  { id: 'p_nerede_oturuyorsun', tr: 'Nerede oturuyorsun?', fr: 'Où habites-tu ?', topic: 'social', difficulty: 1 },
  { id: 'p_ne_zamandan_beri', tr: 'Ne zamandan beri Türkiye\'desin?', fr: 'Depuis combien de temps es-tu en Turquie ?', topic: 'social', difficulty: 3 },
  { id: 'p_turkce_ogreniyorum', tr: 'Türkçe öğreniyorum.', fr: 'J\'apprends le turc.', topic: 'social', difficulty: 2 },
  { id: 'p_istanbul_ziyaret_ediyorum', tr: 'İstanbul\'u ziyaret ediyorum.', fr: 'Je visite Istanbul.', topic: 'social', difficulty: 2 },
  { id: 'p_is_ne_yapiyorsunuz', tr: 'Ne iş yapıyorsunuz?', fr: 'Quel est votre métier ?', topic: 'social', difficulty: 2 },
  { id: 'p_cok_guzel_ulke', tr: 'Türkiye çok güzel bir ülke.', fr: 'La Turquie est un très beau pays.', topic: 'social', difficulty: 2 },
  { id: 'p_benimle_konusur_musunuz', tr: 'Benimle Türkçe konuşur musunuz?', fr: 'Pouvez-vous parler turc avec moi ?', topic: 'social', difficulty: 3 },

  // ── Restaurant avancé ──
  { id: 'p_iki_kisilik_masa', tr: 'İki kişilik bir masa istiyorum.', fr: 'Je voudrais une table pour deux personnes.', topic: 'restaurant', difficulty: 2 },
  { id: 'p_vejeteryanim', tr: 'Ben vejetaryenim.', fr: 'Je suis végétarien(ne).', topic: 'restaurant', difficulty: 1 },
  { id: 'p_gluten_yiyemiyorum', tr: 'Gluten yiyemiyorum.', fr: 'Je ne peux pas manger de gluten.', topic: 'restaurant', difficulty: 2 },
  { id: 'p_cok_tuzlu', tr: 'Bu çok tuzlu.', fr: 'C\'est trop salé.', topic: 'restaurant', difficulty: 1 },
  { id: 'p_asca_tebrikler', tr: 'Aşçıya tebrikler!', fr: 'Félicitations au chef !', topic: 'restaurant', difficulty: 2 },
  { id: 'p_servis_dahil_mi', tr: 'Servis ücreti dahil mi?', fr: 'Le service est-il inclus ?', topic: 'restaurant', difficulty: 2 }
];
