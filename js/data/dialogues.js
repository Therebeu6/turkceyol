/* ═══════════════════════════════════════════════
   TürkçeYol — dialogues.js
   Mini-dialogues pour l'apprentissage en contexte
   ═══════════════════════════════════════════════ */

window.AppDialogues = [
  {
    id: 'd_rencontre',
    title: 'Une première rencontre',
    scenario: 'Ali et Sophie se rencontrent pour la première fois à Istanbul.',
    level: 1,
    tags: ['Présentation', 'A1'],
    turns: [
      { speaker: 'Ali', tr: 'Merhaba! Benim adım Ali.', fr: 'Bonjour ! Mon nom est Ali.' },
      { speaker: 'Sophie', tr: 'Merhaba Ali. Ben Sophie. Tanıştığımıza memnun oldum.', fr: 'Bonjour Ali. Moi c\'est Sophie. Ravie de te rencontrer.' },
      { speaker: 'Ali', tr: 'Ben de memnun oldum. Nerelisiniz?', fr: 'Ravi également. D\'où venez-vous ?' },
      { speaker: 'Sophie', tr: 'Fransalıyım. Siz İstanbullu musunuz?', fr: 'Je suis française. Vous êtes d\'Istanbul ?' },
      { speaker: 'Ali', tr: 'Evet, İstanbulluyum.', fr: 'Oui, je suis d\'Istanbul.' }
    ]
  },
  {
    id: 'd_cafe',
    title: 'Commander un café',
    scenario: 'Au café, passer commande au serveur.',
    level: 1,
    tags: ['Restaurant', 'A1'],
    turns: [
      { speaker: 'Garson', tr: 'Hoş geldiniz! Ne istersiniz?', fr: 'Bienvenue ! Que désirez-vous ?' },
      { speaker: 'Müşteri', tr: 'Hoş bulduk. Bir kahve ve bir su istiyorum, lütfen.', fr: 'Merci. Je veux un café et une eau, s\'il vous plaît.' },
      { speaker: 'Garson', tr: 'Tamam. Hemen getiriyorum.', fr: 'D\'accord. J\'apporte ça tout de suite.' },
      { speaker: 'Müşteri', tr: 'Teşekkürler. Hesap ne kadar?', fr: 'Merci. L\'addition est à combien ?' },
      { speaker: 'Garson', tr: 'Yüz lira.', fr: 'Cent lires.' }
    ]
  },
  {
    id: 'd_direction',
    title: 'Demander son chemin',
    scenario: 'Dans la rue, chercher l\'hôpital.',
    level: 2,
    tags: ['Orientation', 'A1'],
    turns: [
      { speaker: 'Turist', tr: 'Affedersiniz, hastane nerede?', fr: 'Excusez-moi, où est l\'hôpital ?' },
      { speaker: 'Adam', tr: 'Hastane mi? Çok yakın. Dümdüz gidin.', fr: 'L\'hôpital ? Très proche. Allez tout droit.' },
      { speaker: 'Turist', tr: 'Sonra sağa mı, sola mı?', fr: 'Ensuite à droite ou à gauche ?' },
      { speaker: 'Adam', tr: 'Sonra sağa dönün. Hastane orada.', fr: 'Ensuite tournez à droite. L\'hôpital est là.' },
      { speaker: 'Turist', tr: 'Çok teşekkür ederim!', fr: 'Merci beaucoup !' }
    ]
  },
  {
    id: 'd_marche',
    title: 'Au marché',
    scenario: 'Faire ses courses au marché couvert d\'Istanbul.',
    level: 1,
    tags: ['Shopping', 'A1'],
    turns: [
      { speaker: 'Müşteri', tr: 'Elma kaç lira?', fr: 'Les pommes, c\'est combien ?' },
      { speaker: 'Satıcı', tr: 'Bir kilo on lira.', fr: 'Un kilo pour dix lires.' },
      { speaker: 'Müşteri', tr: 'İki kilo istiyorum lütfen.', fr: 'Je voudrais deux kilos, s\'il vous plaît.' },
      { speaker: 'Satıcı', tr: 'Tamam. Başka bir şey?', fr: 'D\'accord. Autre chose ?' },
      { speaker: 'Müşteri', tr: 'Domates de var mı?', fr: 'Vous avez aussi des tomates ?' },
      { speaker: 'Satıcı', tr: 'Evet, çok taze. İşte burada.', fr: 'Oui, très fraîches. Les voilà.' },
      { speaker: 'Müşteri', tr: 'Teşekkürler, bu kadar.', fr: 'Merci, c\'est tout.' }
    ]
  },
  {
    id: 'd_eczane',
    title: 'À la pharmacie',
    scenario: 'Acheter des médicaments à la pharmacie.',
    level: 2,
    tags: ['Santé', 'A2'],
    turns: [
      { speaker: 'Müşteri', tr: 'Affedersiniz, başım ağrıyor.', fr: 'Excusez-moi, j\'ai mal à la tête.' },
      { speaker: 'Eczacı', tr: 'Kaç gündür ağrıyor?', fr: 'Depuis combien de jours ?' },
      { speaker: 'Müşteri', tr: 'İki gündür. Bir ilaç istiyorum.', fr: 'Depuis deux jours. Je voudrais un médicament.' },
      { speaker: 'Eczacı', tr: 'Tamam. Bu hapları alın, günde iki tane.', fr: 'Très bien. Prenez ces comprimés, deux par jour.' },
      { speaker: 'Müşteri', tr: 'Teşekkürler. Fiyatı ne kadar?', fr: 'Merci. Combien ça coûte ?' },
      { speaker: 'Eczacı', tr: 'Otuz beş lira.', fr: 'Trente-cinq lires.' }
    ]
  },
  {
    id: 'd_otobus',
    title: 'Prendre le bus',
    scenario: 'Demander son chemin pour prendre le bus à Istanbul.',
    level: 2,
    tags: ['Transport', 'A2'],
    turns: [
      { speaker: 'Turist', tr: 'Affedersiniz, Taksim\'e giden otobüs var mı?', fr: 'Excusez-moi, y a-t-il un bus pour Taksim ?' },
      { speaker: 'Adam', tr: 'Evet, 48T numaralı otobüs.', fr: 'Oui, le bus numéro 48T.' },
      { speaker: 'Turist', tr: 'Durak nerede?', fr: 'Où est l\'arrêt ?' },
      { speaker: 'Adam', tr: 'Şurada, köşede.', fr: 'Là-bas, au coin de la rue.' },
      { speaker: 'Turist', tr: 'Ne kadar sürer?', fr: 'Combien de temps ça prend ?' },
      { speaker: 'Adam', tr: 'Yaklaşık yirmi dakika.', fr: 'Environ vingt minutes.' },
      { speaker: 'Turist', tr: 'Çok teşekkür ederim!', fr: 'Merci beaucoup !' }
    ]
  },
  {
    id: 'd_taksi',
    title: 'Dans un taxi',
    scenario: 'Prendre un taxi pour aller à l\'aéroport.',
    level: 2,
    tags: ['Transport', 'A2'],
    turns: [
      { speaker: 'Müşteri', tr: 'Havalimanına gidiyorum.', fr: 'Je vais à l\'aéroport.' },
      { speaker: 'Şoför', tr: 'Hangi havalimanı? Atatürk mü, Sabiha Gökçen mi?', fr: 'Quel aéroport ? Atatürk ou Sabiha Gökçen ?' },
      { speaker: 'Müşteri', tr: 'Sabiha Gökçen lütfen.', fr: 'Sabiha Gökçen, s\'il vous plaît.' },
      { speaker: 'Şoför', tr: 'Tamam. Yaklaşık kırk dakika sürer.', fr: 'D\'accord. Environ quarante minutes.' },
      { speaker: 'Müşteri', tr: 'Ne kadar tutar?', fr: 'Combien ça coûte ?' },
      { speaker: 'Şoför', tr: 'Yüz elli lira.', fr: 'Cent cinquante lires.' },
      { speaker: 'Müşteri', tr: 'Tamam, gidelim.', fr: 'D\'accord, allons-y.' }
    ]
  },
  {
    id: 'd_aile',
    title: 'Parler de sa famille',
    scenario: 'Deux amis discutent de leur famille lors d\'un dîner.',
    level: 2,
    tags: ['Famille', 'A2'],
    turns: [
      { speaker: 'Mehmet', tr: 'Aileniz kalabalık mı?', fr: 'Votre famille est grande ?' },
      { speaker: 'Sophie', tr: 'Evet, üç kardeşim var. Siz?', fr: 'Oui, j\'ai trois frères et sœurs. Et vous ?' },
      { speaker: 'Mehmet', tr: 'Ben tek çocuğum. Annem ve babam İzmir\'de yaşıyor.', fr: 'Je suis enfant unique. Ma mère et mon père vivent à Izmir.' },
      { speaker: 'Sophie', tr: 'Onları sık görüyor musunuz?', fr: 'Vous les voyez souvent ?' },
      { speaker: 'Mehmet', tr: 'Ayda bir görüyorum. Sizin aileniz nerede?', fr: 'Je les vois une fois par mois. Où est votre famille ?' },
      { speaker: 'Sophie', tr: 'Fransa\'da. Özlüyorum onları.', fr: 'En France. Ils me manquent.' }
    ]
  },
  {
    id: 'd_telefon',
    title: 'Au téléphone',
    scenario: 'Réserver une table au restaurant par téléphone.',
    level: 3,
    tags: ['Téléphone', 'B1'],
    turns: [
      { speaker: 'Garson', tr: 'Merhaba, Boğaz Restoran.', fr: 'Bonjour, Restaurant Boğaz.' },
      { speaker: 'Müşteri', tr: 'Merhaba. Bu akşam için masa ayırtmak istiyorum.', fr: 'Bonjour. Je voudrais réserver une table pour ce soir.' },
      { speaker: 'Garson', tr: 'Kaç kişilik?', fr: 'Pour combien de personnes ?' },
      { speaker: 'Müşteri', tr: 'İki kişilik lütfen.', fr: 'Pour deux personnes, s\'il vous plaît.' },
      { speaker: 'Garson', tr: 'Saat kaçta geleceksiniz?', fr: 'À quelle heure viendrez-vous ?' },
      { speaker: 'Müşteri', tr: 'Sekizde. Mümkün mü?', fr: 'À huit heures. C\'est possible ?' },
      { speaker: 'Garson', tr: 'Evet, tablonuz hazır olacak. İsminiz?', fr: 'Oui, votre table sera prête. Votre nom ?' },
      { speaker: 'Müşteri', tr: 'Sophie Martin.', fr: 'Sophie Martin.' },
      { speaker: 'Garson', tr: 'Teşekkürler, görüşürüz!', fr: 'Merci, à ce soir !' }
    ]
  },
  {
    id: 'd_hotel',
    title: 'À l\'hôtel',
    scenario: 'Faire le check-in dans un hôtel d\'Istanbul.',
    level: 3,
    tags: ['Voyage', 'B1'],
    turns: [
      { speaker: 'Resepsiyonist', tr: 'Hoş geldiniz! Rezervasyonunuz var mı?', fr: 'Bienvenue ! Avez-vous une réservation ?' },
      { speaker: 'Müşteri', tr: 'Evet, adım Sophie Martin.', fr: 'Oui, je m\'appelle Sophie Martin.' },
      { speaker: 'Resepsiyonist', tr: 'Bir dakika... Evet, iki gecelik bir oda. Pasaportunuzu alabilir miyim?', fr: 'Un instant... Oui, une chambre pour deux nuits. Puis-je avoir votre passeport ?' },
      { speaker: 'Müşteri', tr: 'Tabii, buyurun.', fr: 'Bien sûr, voilà.' },
      { speaker: 'Resepsiyonist', tr: 'Odanız 304 numaralı. İşte anahtarınız.', fr: 'Votre chambre est la 304. Voici votre clé.' },
      { speaker: 'Müşteri', tr: 'Teşekkürler. Kahvaltı saat kaçta?', fr: 'Merci. Le petit-déjeuner est à quelle heure ?' },
      { speaker: 'Resepsiyonist', tr: 'Yedi ile ona kadar.', fr: 'De sept heures à dix heures.' }
    ]
  },
  {
    id: 'd_calisma',
    title: 'Au bureau',
    scenario: 'Première journée dans un bureau à Istanbul.',
    level: 3,
    tags: ['Travail', 'B1'],
    turns: [
      { speaker: 'Müdür', tr: 'Merhaba Sophie, hoş geldiniz!', fr: 'Bonjour Sophie, bienvenue !' },
      { speaker: 'Sophie', tr: 'Teşekkürler, memnun oldum.', fr: 'Merci, ravie d\'être là.' },
      { speaker: 'Müdür', tr: 'Masanız şu köşede. Bilgisayarınız hazır.', fr: 'Votre bureau est dans ce coin. Votre ordinateur est prêt.' },
      { speaker: 'Sophie', tr: 'Çok iyi. Ekiple ne zaman tanışabilirim?', fr: 'Très bien. Quand puis-je rencontrer l\'équipe ?' },
      { speaker: 'Müdür', tr: 'Öğle yemeğinde tanışacaksınız. Saat bire kadar çalışıyoruz.', fr: 'Vous vous rencontrerez au déjeuner. On travaille jusqu\'à une heure.' },
      { speaker: 'Sophie', tr: 'Anladım. Çalışmaya hazırım!', fr: 'Je comprends. Je suis prête à travailler !' }
    ]
  },
  {
    id: 'd_nationalite',
    title: 'D\'où venez-vous ?',
    scenario: 'Deux voyageurs font connaissance dans un hostel d\'Istanbul.',
    level: 1,
    tags: ['Identité', 'Nationalité', 'A1'],
    turns: [
      { speaker: 'Kemal', tr: 'Merhaba! Ben Kemal. Siz nerelisiniz?', fr: 'Bonjour ! Je suis Kemal. D\'où êtes-vous ?' },
      { speaker: 'Marie', tr: 'Merhaba! Ben Marie. Fransızım. Siz?', fr: 'Bonjour ! Je suis Marie. Je suis française. Et vous ?' },
      { speaker: 'Kemal', tr: 'Ben Türküm, İstanbulluyum. Kaç yaşındasınız?', fr: 'Je suis turc, je suis d\'Istanbul. Quel âge avez-vous ?' },
      { speaker: 'Marie', tr: 'Yirmi sekiz yaşındayım. Türkçe konuşuyor musunuz?', fr: 'J\'ai vingt-huit ans. Parlez-vous turc ?' },
      { speaker: 'Kemal', tr: 'Evet, tabii! Türkçe ve İngilizce konuşuyorum.', fr: 'Oui, bien sûr ! Je parle turc et anglais.' },
      { speaker: 'Marie', tr: 'Harika! Ben Fransızca ve biraz Türkçe konuşuyorum.', fr: 'Super ! Moi je parle français et un peu turc.' },
      { speaker: 'Kemal', tr: 'Türkçeniz çok iyi! Hoş geldiniz Türkiye\'ye.', fr: 'Votre turc est très bien ! Bienvenue en Turquie.' }
    ]
  },
  {
    id: 'd_kiyafet',
    title: 'Les courses de vêtements',
    scenario: 'Dans une boutique de vêtements au Grand Bazar d\'Istanbul.',
    level: 2,
    tags: ['Vêtements', 'Shopping', 'A2'],
    turns: [
      { speaker: 'Satıcı', tr: 'Hoş geldiniz! Size yardımcı olabilir miyim?', fr: 'Bienvenue ! Puis-je vous aider ?' },
      { speaker: 'Müşteri', tr: 'Evet, bir gömlek arıyorum.', fr: 'Oui, je cherche une chemise.' },
      { speaker: 'Satıcı', tr: 'Hangi renk istiyorsunuz? Mavi, kırmızı veya beyaz?', fr: 'Quelle couleur voulez-vous ? Bleu, rouge ou blanc ?' },
      { speaker: 'Müşteri', tr: 'Mavi istiyorum. Büyük beden var mı?', fr: 'Je voudrais bleu. Avez-vous en grande taille ?' },
      { speaker: 'Satıcı', tr: 'Evet, buyurun. Bu gömlek çok güzel.', fr: 'Oui, voilà. Cette chemise est très belle.' },
      { speaker: 'Müşteri', tr: 'Teşekkürler. Fiyatı ne kadar?', fr: 'Merci. Quel est le prix ?' },
      { speaker: 'Satıcı', tr: 'Yüz elli lira. Ucuz!', fr: 'Cent cinquante lires. Pas cher !' },
      { speaker: 'Müşteri', tr: 'Tamam, alıyorum.', fr: 'D\'accord, je la prends.' }
    ]
  },
  {
    id: 'd_meteo',
    title: 'Quel temps fait-il ?',
    scenario: 'Deux collègues parlent de la météo à Istanbul.',
    level: 1,
    tags: ['Météo', 'A1'],
    turns: [
      { speaker: 'Ayşe', tr: 'Bugün hava çok soğuk, değil mi?', fr: 'Il fait très froid aujourd\'hui, non ?' },
      { speaker: 'Kemal', tr: 'Evet, çok soğuk. Yağmur da yağıyor.', fr: 'Oui, très froid. Il pleut aussi.' },
      { speaker: 'Ayşe', tr: 'Paltomu getirmedim. Çok üşüyorum.', fr: 'Je n\'ai pas apporté mon manteau. J\'ai très froid.' },
      { speaker: 'Kemal', tr: 'Yarın hava güneşli olacak.', fr: 'Demain il fera beau.' },
      { speaker: 'Ayşe', tr: 'Gerçekten mi? Hava sıcak olacak mı?', fr: 'Vraiment ? Il fera chaud ?' },
      { speaker: 'Kemal', tr: 'Evet, hava tahminine göre yirmi derece olacak.', fr: 'Oui, selon la météo il fera vingt degrés.' }
    ]
  },
  {
    id: 'd_saglik',
    title: 'Chez le médecin',
    scenario: 'Un patient consulte le médecin à Istanbul.',
    level: 2,
    tags: ['Santé', 'A2'],
    turns: [
      { speaker: 'Hasta', tr: 'Doktor bey, iyi hissetmiyorum.', fr: 'Docteur, je ne me sens pas bien.' },
      { speaker: 'Doktor', tr: 'Neden? Ne şikayetiniz var?', fr: 'Pourquoi ? Qu\'est-ce qui ne va pas ?' },
      { speaker: 'Hasta', tr: 'Baş ağrım var ve ateşim var.', fr: 'J\'ai mal à la tête et j\'ai de la fièvre.' },
      { speaker: 'Doktor', tr: 'Ne zamandır böyle hissediyorsunuz?', fr: 'Depuis quand vous sentez-vous ainsi ?' },
      { speaker: 'Hasta', tr: 'İki gündür. Çok yorgunum da.', fr: 'Depuis deux jours. Je suis aussi très fatigué.' },
      { speaker: 'Doktor', tr: 'Tamam, sizi muayene edeyim. Grip olmuşsunuz.', fr: 'D\'accord, je vais vous examiner. Vous avez la grippe.' },
      { speaker: 'Hasta', tr: 'İlaç yazacak mısınız?', fr: 'Allez-vous me prescrire des médicaments ?' },
      { speaker: 'Doktor', tr: 'Evet. Bu ilaçları günde üç kez alın ve dinlenin.', fr: 'Oui. Prenez ces médicaments trois fois par jour et reposez-vous.' }
    ]
  },
  {
    id: 'd_habitudes',
    title: 'Mes habitudes',
    scenario: 'Deux amis parlent de leur routine quotidienne.',
    level: 2,
    tags: ['Routine', 'A2'],
    turns: [
      { speaker: 'Selin', tr: 'Her sabah saat kaçta kalkıyorsunuz?', fr: 'Vous vous levez à quelle heure chaque matin ?' },
      { speaker: 'Marc', tr: 'Genellikle yedide kalkıyorum. Siz?', fr: 'En général je me lève à sept heures. Et vous ?' },
      { speaker: 'Selin', tr: 'Ben altıda kalkıyorum. Hep erken çalışıyorum.', fr: 'Je me lève à six heures. Je travaille toujours tôt.' },
      { speaker: 'Marc', tr: 'Akşamları ne yapıyorsunuz?', fr: 'Que faites-vous le soir ?' },
      { speaker: 'Selin', tr: 'Bazen kitap okuyorum, bazen müzik dinliyorum.', fr: 'Parfois je lis un livre, parfois j\'écoute de la musique.' },
      { speaker: 'Marc', tr: 'Ben de okumayı çok seviyorum. Saat kaçta uyuyorsunuz?', fr: 'Moi aussi j\'aime beaucoup lire. À quelle heure dormez-vous ?' },
      { speaker: 'Selin', tr: 'Genellikle on birde uyuyorum.', fr: 'En général je dors à onze heures.' }
    ]
  },
  {
    id: 'd_famille_elargie',
    title: 'La famille turque',
    scenario: 'Présentation de la famille lors d\'un repas à Izmir.',
    level: 2,
    tags: ['Famille', 'A2'],
    turns: [
      { speaker: 'Fatma', tr: 'Ailemizi tanıtayım. Bu dedem ve ninem.', fr: 'Laissez-moi vous présenter ma famille. Voici mon grand-père et ma grand-mère.' },
      { speaker: 'Sophie', tr: 'Merhaba! Tanıştığımıza memnun oldum.', fr: 'Bonjour ! Ravie de vous rencontrer.' },
      { speaker: 'Dede', tr: 'Hoş geldiniz! İzmir\'e ilk kez mi geldiniz?', fr: 'Bienvenue ! C\'est votre première visite à Izmir ?' },
      { speaker: 'Sophie', tr: 'Evet, ilk kez. Çok güzel bir şehir!', fr: 'Oui, la première fois. C\'est une très belle ville !' },
      { speaker: 'Fatma', tr: 'Şu amcam ve teyzem de var. Büyük bir aileyiz.', fr: 'Il y a aussi mon oncle et ma tante. Nous sommes une grande famille.' },
      { speaker: 'Sophie', tr: 'Kaç çocuk var ailede?', fr: 'Combien d\'enfants y a-t-il dans la famille ?' },
      { speaker: 'Fatma', tr: 'Beş çocuk var. Hepimiz İzmir\'i çok seviyoruz.', fr: 'Il y a cinq enfants. Nous aimons tous beaucoup Izmir.' }
    ]
  }
];
