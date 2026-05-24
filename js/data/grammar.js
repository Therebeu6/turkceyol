/* ═══════════════════════════════════════════════
   TürkçeYol — grammar.js
   Astuces et règles de grammaire simplifiées
   ═══════════════════════════════════════════════ */

window.AppGrammar = [
  /* ── Grammaire essentielle A1 ─────────────────── */
  {
    id: 'g_harmonie_majeure',
    title: 'Harmonie vocalique (Majeure)',
    rule: 'En turc, les voyelles s\'accordent. Si la dernière voyelle du mot est A, I, O, U, on utilise le suffixe en A ou I sans point (ı). Si c\'est E, İ, Ö, Ü, on utilise E ou İ.',
    example: 'Araba -> Arabalar (Voitures) | Ev -> Evler (Maisons)'
  },
  {
    id: 'g_ordre_mots',
    title: 'L\'ordre des mots (SOV)',
    rule: 'La structure de base est Sujet + Objet + Verbe. Le verbe est toujours à la fin de la phrase.',
    example: 'Ben (Sujet) elma (Objet) yiyorum (Verbe). -> Je mange une pomme.'
  },
  {
    id: 'g_present_iyor',
    title: 'Le présent progressif (-iyor)',
    rule: 'Pour dire "je suis en train de faire", on ajoute -iyor au radical du verbe, puis la terminaison personnelle (ex: -um pour "Je").',
    example: 'Yapmak (Faire) -> Yap + ı + yor + um = Yapıyorum.'
  },
  {
    id: 'g_pluriel',
    title: 'Pluriel -lar/-ler',
    rule: 'Pour mettre un nom au pluriel, on ajoute -lar après une voyelle arrière (a, ı, o, u) ou -ler après une voyelle avant (e, i, ö, ü). Suit l\'harmonie vocalique.',
    example: 'araba → arabalar (voitures) | ev → evler (maisons)',
    drills: [
      { root: 'kitap', question: 'Pluriel de "kitap" ?', correct: 'kitaplar', distractors: ['kitabler', 'kitap', 'kitablar'] },
      { root: 'ev', question: 'Pluriel de "ev" ?', correct: 'evler', distractors: ['evlar', 'evlerin', 'ev'] },
      { root: 'çocuk', question: 'Pluriel de "çocuk" ?', correct: 'çocuklar', distractors: ['çocukler', 'çocuk', 'çocuklarım'] }
    ]
  },
  {
    id: 'g_negatif_fiil',
    title: 'Négation du verbe (-me/-ma)',
    rule: 'Pour nier un verbe au présent progressif, on insère -me (voyelle avant) ou -ma (voyelle arrière) entre le radical et -iyor. Le -e/-a tombe devant -iyor : -miyor/-mıyor.',
    example: 'gidiyorum → gitmiyorum (je ne vais pas) | yapıyorum → yapmıyorum (je ne fais pas)'
  },
  {
    id: 'g_soru_mi',
    title: 'Question -mı/-mi/-mu/-mü',
    rule: 'Pour poser une question oui/non, on ajoute la particule -mı/-mi/-mu/-mü après le verbe selon l\'harmonie vocalique. Elle s\'écrit séparée du verbe.',
    example: 'Geliyor musun? = Tu viens ? | Gidiyor musunuz? = Vous allez ?',
    drills: [
      { root: 'geliyor', question: '"Tu viens ?" (forme interrogative) ?', correct: 'geliyor musun?', distractors: ['geliyorsun mu?', 'geliyor mu sun?', 'geliyor mısın?'] },
      { root: 'biliyor', question: '"Vous savez ?" (forme interrogative) ?', correct: 'biliyor musunuz?', distractors: ['biliyor musun?', 'biliyorsun muz?', 'biliyor mü sunuz?'] },
      { root: 'iyi', question: '"Tu vas bien ?" ?', correct: 'iyi misin?', distractors: ['iyi misiniz?', 'iyimisin?', 'iyi mu sun?'] }
    ]
  },
  {
    id: 'g_locatif',
    title: 'Cas locatif -da/-de (à/dans/sur)',
    rule: 'Le suffixe -da/-de indique la position (lieu où l\'on se trouve). Après une consonne sourde (ç, f, h, k, p, s, ş, t), -da/-de devient -ta/-te par assimilation.',
    example: 'evde = à la maison | okulda = à l\'école | parkta = dans le parc',
    drills: [
      { root: 'ev', question: 'Forme locative (à/dans la maison) ?', correct: 'evde', distractors: ['eve', 'evden', 'evin'] },
      { root: 'okul', question: 'Forme locative (à l\'école) ?', correct: 'okulda', distractors: ['okula', 'okuldan', 'okulun'] },
      { root: 'park', question: 'Forme locative (dans le parc) ?', correct: 'parkta', distractors: ['parka', 'parktan', 'parkda'] }
    ]
  },
  {
    id: 'g_datif',
    title: 'Cas directif/datif -a/-e (à/vers)',
    rule: 'Le suffixe -a/-e exprime le mouvement vers un lieu ou une personne. Après une voyelle, on ajoute un -y- de liaison : ev → eve, araba → arabaya.',
    example: 'eve gidiyorum = je vais à la maison | okula gidiyorum = je vais à l\'école',
    drills: [
      { root: 'ev', question: 'Forme datif (vers/à la maison) ?', correct: 'eve', distractors: ['evde', 'evden', 'evi'] },
      { root: 'okul', question: 'Forme datif (à l\'école) ?', correct: 'okula', distractors: ['okulda', 'okuldan', 'okulu'] },
      { root: 'araba', question: 'Forme datif (vers la voiture) ?', correct: 'arabaya', distractors: ['arabada', 'arabadan', 'arabayı'] }
    ]
  },
  {
    id: 'g_ablatif',
    title: 'Cas ablatif -dan/-den (de/depuis)',
    rule: 'Le suffixe -dan/-den exprime la provenance ou le point de départ. Après consonne sourde, -dan/-den devient -tan/-ten par assimilation.',
    example: 'evden geliyorum = je viens de la maison | Türkiye\'den = de Turquie',
    drills: [
      { root: 'ev', question: 'Forme ablatif (de/depuis la maison) ?', correct: 'evden', distractors: ['evde', 'eve', 'evi'] },
      { root: 'okul', question: 'Forme ablatif (depuis l\'école) ?', correct: 'okuldan', distractors: ['okulda', 'okula', 'okulu'] },
      { root: 'park', question: 'Forme ablatif (du parc) ?', correct: 'parktan', distractors: ['parkta', 'parka', 'parkdan'] }
    ]
  },
  {
    id: 'g_passe_di',
    title: 'Passé simple -dı/-di/-du/-dü',
    rule: 'Pour former le passé accompli, on ajoute au radical -dı/-di/-du/-dü (selon harmonie) puis la terminaison personnelle. Après consonne sourde : -tı/-ti/-tu/-tü.',
    example: 'gittim = je suis allé | yaptın = tu as fait | geldi = il est venu'
  },
  {
    id: 'g_futur_acak',
    title: 'Futur -acak/-ecek',
    rule: 'Pour exprimer le futur, on ajoute au radical -acak (voyelle arrière) ou -ecek (voyelle avant), puis la terminaison personnelle. Le -k final peut se transformer en -ğ devant une voyelle.',
    example: 'gideceğim = j\'irai | yapacaksın = tu feras | gelecek = il viendra'
  },
  {
    id: 'g_accusatif',
    title: 'Cas accusatif -ı/-i/-u/-ü (COD défini)',
    rule: 'L\'objet direct défini ou spécifique prend le suffixe d\'accusatif -ı/-i/-u/-ü. Sans suffixe, l\'objet est indéfini ou général. Après voyelle, un -y- de liaison s\'intercale.',
    example: 'elmayı yiyorum = je mange LA pomme | elma yiyorum = je mange (une/des) pomme(s)',
    drills: [
      { root: 'kitap', question: 'Accusatif (le livre) ?', correct: 'kitabı', distractors: ['kitapı', 'kitaba', 'kitapta'] },
      { root: 'elma', question: 'Accusatif (la pomme) ?', correct: 'elmayı', distractors: ['elmaı', 'elmaya', 'elmada'] },
      { root: 'su', question: 'Accusatif (l\'eau) ?', correct: 'suyu', distractors: ['suı', 'suya', 'sude'] }
    ]
  },
  /* ── Grammaire intermédiaire A2 ───────────────── */
  {
    id: 'g_possessif',
    title: 'Possessifs suffixaux',
    rule: 'Les possessifs se forment avec des suffixes ajoutés au nom : -ım/-im/-um/-üm (mon/ma), -ın/-in/-un/-ün (ton/ta), -(s)ı/-(s)i/-(s)u/-(s)ü (son/sa). Suit l\'harmonie vocalique.',
    example: 'evim = ma maison | araban = ta voiture | arabası = sa voiture',
    drills: [
      { root: 'ev', question: 'Possessif "ma maison" ?', correct: 'evim', distractors: ['evin', 'evi', 'evimiz'] },
      { root: 'araba', question: 'Possessif "ta voiture" ?', correct: 'araban', distractors: ['arabam', 'arabası', 'arabanız'] },
      { root: 'kitap', question: 'Possessif "son livre" ?', correct: 'kitabı', distractors: ['kitabım', 'kitabın', 'kitabımız'] }
    ]
  },
  {
    id: 'g_comparatif',
    title: 'Comparatif (daha/en)',
    rule: 'Pour comparer, on place daha (plus) devant l\'adjectif. Pour le superlatif, on utilise en (le/la plus) devant l\'adjectif. Ces mots sont invariables.',
    example: 'daha büyük = plus grand | en güzel = le plus beau/belle',
    drills: [
      { root: 'büyük', question: '"Plus grand" ?', correct: 'daha büyük', distractors: ['en büyük', 'çok büyük', 'büyüker'] },
      { root: 'güzel', question: '"Le plus beau" ?', correct: 'en güzel', distractors: ['daha güzel', 'çok güzel', 'güzelin'] },
      { root: 'iyi', question: '"Mieux / Meilleur" ?', correct: 'daha iyi', distractors: ['en iyi', 'çok iyi', 'iyice'] }
    ]
  },
  {
    id: 'g_yok_var',
    title: 'Var / Yok (il y a / il n\'y a pas)',
    rule: 'var signifie "il y a" ou "c\'est disponible / j\'en ai". yok signifie "il n\'y a pas" ou "ce n\'est pas disponible / je n\'en ai pas". Très courants à l\'oral.',
    example: 'Su var mı? Evet, var. = Il y a de l\'eau ? Oui. | Param yok. = Je n\'ai pas d\'argent.'
  },
  {
    id: 'g_abilmek',
    title: 'Capacité -abil- (pouvoir/savoir)',
    rule: 'Pour exprimer la capacité ou la possibilité, on insère -abil- entre le radical et la conjugaison. La négation est -ama-/-eme- (le -bil- disparaît à la forme négative).',
    example: 'gidebiliyorum = je peux y aller | yapamıyorum = je ne peux pas faire'
  },
  {
    id: 'g_ki_relatif',
    title: 'Suffixe relatif -ki',
    rule: 'Le suffixe -ki s\'ajoute à un nom au locatif pour former un adjectif relatif signifiant "celui/celle de" ou "celui/celle qui est à/dans". Il est invariable.',
    example: 'evdeki = celui de la maison | masadaki kitap = le livre (qui est) sur la table'
  },
  {
    id: 'g_suffixe_avec',
    title: 'Comitative -le/-la (avec)',
    rule: 'Le suffixe -le/-la exprime l\'accompagnement ("avec"). Après une voyelle, on ajoute un -y- de liaison : -yle/-yla. Il suit l\'harmonie vocalique.',
    example: 'seninle = avec toi | arabamla = avec ma voiture | arkadaşımla = avec mon ami'
  }
];
