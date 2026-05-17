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
    turns: [
      { speaker: 'Turist', tr: 'Affedersiniz, hastane nerede?', fr: 'Excusez-moi, où est l\'hôpital ?' },
      { speaker: 'Adam', tr: 'Hastane mi? Çok yakın. Dümdüz gidin.', fr: 'L\'hôpital ? Très proche. Allez tout droit.' },
      { speaker: 'Turist', tr: 'Sonra sağa mı, sola mı?', fr: 'Ensuite à droite ou à gauche ?' },
      { speaker: 'Adam', tr: 'Sonra sağa dönün. Hastane orada.', fr: 'Ensuite tournez à droite. L\'hôpital est là.' },
      { speaker: 'Turist', tr: 'Çok teşekkür ederim!', fr: 'Merci beaucoup !' }
    ]
  }
];
