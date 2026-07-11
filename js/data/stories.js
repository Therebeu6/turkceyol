/* ═══════════════════════════════════════════════
   TürkçeYol — stories.js (v7 AXE 1)
   Mini-histoires A1/A2 : lecture + écoute + questions.
   Chaque ligne est cliquable (App.playTTS) dans le lecteur (#stories).
   ═══════════════════════════════════════════════ */

window.AppStories = [
  {
    id: 'st_istanbul_gunu',
    title: 'Bir Gün İstanbul\'da',
    fr: 'Une journée à Istanbul',
    level: 'A1',
    icon: '🌉',
    lines: [
      { tr: 'Günaydın! Bugün hava çok güzel.', fr: 'Bonjour ! Aujourd\'hui il fait très beau.' },
      { tr: 'Saat yedide kalkıyorum.', fr: 'Je me lève à sept heures.' },
      { tr: 'Kahvaltıda çay içiyorum.', fr: 'Au petit-déjeuner, je bois du thé.' },
      { tr: 'Sonra otobüse biniyorum.', fr: 'Ensuite je monte dans le bus.' },
      { tr: 'İşe saat dokuzda gidiyorum.', fr: 'Je vais au travail à neuf heures.' },
      { tr: 'Öğlen bir restoranda yemek yiyorum.', fr: 'À midi, je mange dans un restaurant.' },
      { tr: 'Akşam eve dönüyorum.', fr: 'Le soir, je rentre à la maison.' },
      { tr: 'Çok yorgunum ama mutluyum.', fr: 'Je suis très fatigué mais heureux.' }
    ],
    questions: [
      { q: 'Saat kaçta kalkıyor?', options: ['Yedide', 'Sekizde', 'Dokuzda', 'Onda'], answer: 'Yedide' },
      { q: 'Kahvaltıda ne içiyor?', options: ['Çay', 'Kahve', 'Su', 'Süt'], answer: 'Çay' },
      { q: 'Öğlen nerede yemek yiyor?', options: ['Bir restoranda', 'Evde', 'Ofiste', 'Kafede'], answer: 'Bir restoranda' }
    ]
  },
  {
    id: 'st_pazar',
    title: 'Pazarda',
    fr: 'Au marché',
    level: 'A1',
    icon: '🍎',
    lines: [
      { tr: 'Bugün pazara gidiyorum.', fr: 'Aujourd\'hui je vais au marché.' },
      { tr: 'Pazarda meyve ve sebze var.', fr: 'Au marché il y a des fruits et légumes.' },
      { tr: '"Elma kaç lira?" diye soruyorum.', fr: 'Je demande : "Les pommes, c\'est combien ?"' },
      { tr: 'Satıcı "bir kilo on lira" diyor.', fr: 'Le vendeur dit : "Un kilo, dix lires."' },
      { tr: 'İki kilo elma alıyorum.', fr: 'J\'achète deux kilos de pommes.' },
      { tr: 'Domates de çok taze.', fr: 'Les tomates sont aussi très fraîches.' },
      { tr: 'Sonra eve dönüyorum.', fr: 'Ensuite je rentre à la maison.' }
    ],
    questions: [
      { q: 'Nereye gidiyor?', options: ['Pazara', 'Okula', 'Hastaneye', 'Otele'], answer: 'Pazara' },
      { q: 'Bir kilo elma kaç lira?', options: ['On lira', 'Yirmi lira', 'Beş lira', 'On beş lira'], answer: 'On lira' },
      { q: 'Kaç kilo elma alıyor?', options: ['İki kilo', 'Bir kilo', 'Üç kilo', 'Dört kilo'], answer: 'İki kilo' }
    ]
  },
  {
    id: 'st_doktor',
    title: 'Doktorda',
    fr: 'Chez le médecin',
    level: 'A2',
    icon: '🏥',
    lines: [
      { tr: 'Bugün kendimi iyi hissetmiyorum.', fr: 'Aujourd\'hui je ne me sens pas bien.' },
      { tr: 'Başım çok ağrıyor.', fr: 'J\'ai très mal à la tête.' },
      { tr: 'Ateşim de var.', fr: 'J\'ai aussi de la fièvre.' },
      { tr: 'Doktora gidiyorum.', fr: 'Je vais chez le médecin.' },
      { tr: 'Doktor "ne zamandır hastasınız?" diye soruyor.', fr: 'Le médecin demande : "Depuis quand êtes-vous malade ?"' },
      { tr: '"İki gündür" diyorum.', fr: 'Je dis : "Depuis deux jours."' },
      { tr: 'Doktor bana ilaç veriyor.', fr: 'Le médecin me donne un médicament.' },
      { tr: 'Eczaneye gidip ilacı alıyorum.', fr: 'Je vais à la pharmacie et je prends le médicament.' }
    ],
    questions: [
      { q: 'Neresi ağrıyor?', options: ['Başı', 'Karnı', 'Sırtı', 'Boğazı'], answer: 'Başı' },
      { q: 'Kaç gündür hasta?', options: ['İki gündür', 'Bir gündür', 'Üç gündür', 'Bir haftadır'], answer: 'İki gündür' },
      { q: 'Doktor ona ne veriyor?', options: ['İlaç', 'Su', 'Çay', 'Kitap'], answer: 'İlaç' }
    ]
  },
  {
    id: 'st_otobus',
    title: 'Otobüs Yolculuğu',
    fr: 'Le trajet en bus',
    level: 'A1',
    icon: '🚌',
    lines: [
      { tr: 'Otobüs durağında bekliyorum.', fr: 'J\'attends à l\'arrêt de bus.' },
      { tr: 'Otobüs saat sekizde geliyor.', fr: 'Le bus arrive à huit heures.' },
      { tr: 'Otobüse biniyorum ve bilet alıyorum.', fr: 'Je monte dans le bus et j\'achète un billet.' },
      { tr: 'Otobüs çok kalabalık.', fr: 'Le bus est très bondé.' },
      { tr: 'Bir arkadaşımı görüyorum.', fr: 'Je vois un(e) ami(e).' },
      { tr: 'Beraber konuşuyoruz.', fr: 'Nous parlons ensemble.' },
      { tr: 'Merkez durağında iniyorum.', fr: 'Je descends à l\'arrêt du centre.' }
    ],
    questions: [
      { q: 'Otobüs saat kaçta geliyor?', options: ['Sekizde', 'Yedide', 'Dokuzda', 'Onda'], answer: 'Sekizde' },
      { q: 'Otobüste kimi görüyor?', options: ['Bir arkadaşını', 'Kardeşini', 'Annesini', 'Doktorunu'], answer: 'Bir arkadaşını' },
      { q: 'Nerede iniyor?', options: ['Merkez durağında', 'Okulda', 'Evde', 'Hastanede'], answer: 'Merkez durağında' }
    ]
  },
  {
    id: 'st_kafe',
    title: 'Kafede',
    fr: 'Au café',
    level: 'A1',
    icon: '☕',
    lines: [
      { tr: 'Arkadaşımla kafede buluşuyoruz.', fr: 'Je retrouve mon ami(e) au café.' },
      { tr: 'Ben bir kahve istiyorum.', fr: 'Je veux un café.' },
      { tr: 'O bir çay istiyor.', fr: 'Il/elle veut un thé.' },
      { tr: 'Garson "başka bir şey?" diye soruyor.', fr: 'Le serveur demande : "Autre chose ?"' },
      { tr: 'Biraz pasta da alıyoruz.', fr: 'Nous prenons aussi un peu de gâteau.' },
      { tr: 'Uzun uzun konuşuyoruz.', fr: 'Nous parlons longuement.' },
      { tr: 'Sonra hesabı ödüyoruz.', fr: 'Ensuite nous payons l\'addition.' }
    ],
    questions: [
      { q: 'Ben ne içiyor?', options: ['Kahve', 'Çay', 'Su', 'Süt'], answer: 'Kahve' },
      { q: 'Arkadaşı ne içiyor?', options: ['Çay', 'Kahve', 'Ayran', 'Meyve suyu'], answer: 'Çay' },
      { q: 'Ne de alıyorlar?', options: ['Pasta', 'Ekmek', 'Meyve', 'Çorba'], answer: 'Pasta' }
    ]
  },
  {
    id: 'st_hava',
    title: 'Hafta Sonu',
    fr: 'Le week-end',
    level: 'A1',
    icon: '☀️',
    lines: [
      { tr: 'Yarın hafta sonu.', fr: 'Demain c\'est le week-end.' },
      { tr: 'Hava durumuna bakıyorum.', fr: 'Je regarde la météo.' },
      { tr: 'Cumartesi güneşli olacak.', fr: 'Samedi il fera soleil.' },
      { tr: 'Ama pazar yağmurlu olacak.', fr: 'Mais dimanche il pleuvra.' },
      { tr: 'Cumartesi parka gidiyorum.', fr: 'Samedi je vais au parc.' },
      { tr: 'Pazar günü evde kalıyorum.', fr: 'Dimanche je reste à la maison.' },
      { tr: 'Kitap okuyorum ve dinleniyorum.', fr: 'Je lis un livre et je me repose.' }
    ],
    questions: [
      { q: 'Cumartesi hava nasıl olacak?', options: ['Güneşli', 'Yağmurlu', 'Karlı', 'Rüzgarlı'], answer: 'Güneşli' },
      { q: 'Pazar günü ne yapıyor?', options: ['Evde kalıyor', 'Parka gidiyor', 'Alışverişe gidiyor', 'Çalışıyor'], answer: 'Evde kalıyor' },
      { q: 'Cumartesi nereye gidiyor?', options: ['Parka', 'Denize', 'Okula', 'Ofise'], answer: 'Parka' }
    ]
  },
  {
    id: 'st_aile',
    title: 'Benim Ailem',
    fr: 'Ma famille',
    level: 'A1',
    icon: '👨‍👩‍👧',
    lines: [
      { tr: 'Ailem dört kişi.', fr: 'Ma famille est composée de quatre personnes.' },
      { tr: 'Annemin adı Ayşe.', fr: 'Ma mère s\'appelle Ayşe.' },
      { tr: 'Babamın adı Mehmet.', fr: 'Mon père s\'appelle Mehmet.' },
      { tr: 'Bir kız kardeşim var.', fr: 'J\'ai une sœur.' },
      { tr: 'Adı Elif ve on iki yaşında.', fr: 'Elle s\'appelle Elif et elle a douze ans.' },
      { tr: 'Hep beraber akşam yemeği yiyoruz.', fr: 'Nous dînons toujours ensemble.' },
      { tr: 'Ailemi çok seviyorum.', fr: 'J\'aime beaucoup ma famille.' }
    ],
    questions: [
      { q: 'Ailede kaç kişi var?', options: ['Dört', 'Üç', 'Beş', 'İki'], answer: 'Dört' },
      { q: 'Annesinin adı ne?', options: ['Ayşe', 'Elif', 'Fatma', 'Zeynep'], answer: 'Ayşe' },
      { q: 'Kız kardeşi kaç yaşında?', options: ['On iki', 'On', 'On üç', 'On bir'], answer: 'On iki' }
    ]
  },
  {
    id: 'st_calisma',
    title: 'Bir Çalışma Günü',
    fr: 'Une journée de travail',
    level: 'A2',
    icon: '💼',
    lines: [
      { tr: 'Ben her gün erken kalkarım.', fr: 'Je me lève tôt tous les jours.' },
      { tr: 'Kahvaltıda genellikle çay içerim.', fr: 'Au petit-déjeuner, je bois généralement du thé.' },
      { tr: 'Ofise otobüsle giderim.', fr: 'Je vais au bureau en bus.' },
      { tr: 'Sabahları çok çalışırım.', fr: 'Le matin, je travaille beaucoup.' },
      { tr: 'Öğlen meslektaşlarımla yemek yerim.', fr: 'À midi, je mange avec mes collègues.' },
      { tr: 'Akşam eve dönerim ve dinlenirim.', fr: 'Le soir je rentre à la maison et je me repose.' },
      { tr: 'Bazen kitap okurum.', fr: 'Parfois je lis un livre.' }
    ],
    questions: [
      { q: 'Sabah kahvaltıda ne içer?', options: ['Çay', 'Kahve', 'Su', 'Süt'], answer: 'Çay' },
      { q: 'Ofise nasıl gider?', options: ['Otobüsle', 'Arabayla', 'Yürüyerek', 'Bisikletle'], answer: 'Otobüsle' },
      { q: 'Öğlen kiminle yemek yer?', options: ['Meslektaşlarıyla', 'Ailesiyle', 'Arkadaşlarıyla', 'Yalnız'], answer: 'Meslektaşlarıyla' }
    ]
  }
];
