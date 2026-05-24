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
    example: 'Araba -> Arabalar (Voitures) | Ev -> Evler (Maisons)',
    exercises: [
      {
        prompt: 'Suffixe locatif pour "araba" (voyelle finale = a) ?',
        answer: 'arabada',
        options: ['arabada', 'arabade', 'arabata', 'arabate'],
        hint: '"a" = voyelle arrière → suffixe en -a',
        explanation: 'Voyelle arrière "a" → on utilise -da : arabada.'
      },
      {
        prompt: 'Suffixe locatif pour "ev" (voyelle finale = e) ?',
        answer: 'evde',
        options: ['evde', 'evda', 'evte', 'evta'],
        hint: '"e" = voyelle avant → suffixe en -e',
        explanation: 'Voyelle avant "e" → on utilise -de : evde.'
      },
      {
        prompt: 'Suffixe pluriel correct pour "göz" (œil) ?',
        answer: 'gözler',
        options: ['gözler', 'gözlar', 'gözleri', 'gözları'],
        hint: '"ö" = voyelle avant → -ler',
        explanation: '"ö" est avant → pluriel -ler : gözler.'
      }
    ]
  },
  {
    id: 'g_ordre_mots',
    title: 'L\'ordre des mots (SOV)',
    rule: 'La structure de base est Sujet + Objet + Verbe. Le verbe est toujours à la fin de la phrase.',
    example: 'Ben (Sujet) elma (Objet) yiyorum (Verbe). -> Je mange une pomme.',
    exercises: [
      {
        prompt: 'Ordre correct : "elma / yiyorum / Ben" ?',
        answer: 'Ben elma yiyorum',
        options: ['Ben elma yiyorum', 'Elma ben yiyorum', 'Yiyorum ben elma', 'Ben yiyorum elma'],
        hint: 'Sujet + Objet + Verbe — verbe TOUJOURS en dernier',
        explanation: 'SOV : Ben (S) + elma (O) + yiyorum (V).'
      },
      {
        prompt: 'Ordre correct : "görüyor / Ahmet / seni" ?',
        answer: 'Ahmet seni görüyor',
        options: ['Ahmet seni görüyor', 'Görüyor Ahmet seni', 'Seni görüyor Ahmet', 'Ahmet görüyor seni'],
        hint: 'Le verbe termine toujours la phrase en turc',
        explanation: 'Ahmet (S) + seni (O) + görüyor (V).'
      },
      {
        prompt: 'Quelle phrase est correcte en turc ?',
        answer: 'Ben kitap okuyorum',
        options: ['Ben kitap okuyorum', 'Ben okuyorum kitap', 'Okuyorum kitap ben', 'Kitap ben okuyorum'],
        hint: 'Le verbe est TOUJOURS à la fin',
        explanation: 'Ben (S) + kitap (O) + okuyorum (V) = Je lis un livre.'
      }
    ]
  },
  {
    id: 'g_present_iyor',
    title: 'Le présent progressif (-iyor)',
    rule: 'Pour dire "je suis en train de faire", on ajoute -iyor au radical du verbe, puis la terminaison personnelle (ex: -um pour "Je").',
    example: 'Yapmak (Faire) -> Yap + ı + yor + um = Yapıyorum.',
    exercises: [
      {
        prompt: '"gitmek" (aller) conjugué à "je" (ben) ?',
        answer: 'gidiyorum',
        options: ['gidiyorum', 'gitiyorum', 'gidıyorum', 'giderum'],
        hint: 'git → gid- (t→d avant voyelle) + -iyor + -um',
        explanation: '"t" → "d" devant voyelle : gid + iyor + um = gidiyorum.'
      },
      {
        prompt: '"yapmak" (faire) conjugué à "tu" (sen) ?',
        answer: 'yapıyorsun',
        options: ['yapıyorsun', 'yapıyorum', 'yapiyorsun', 'yaparsın'],
        hint: 'yap + ı (liaison, "a" arrière) + yor + sun',
        explanation: 'yap + ı + yor + sun = yapıyorsun.'
      },
      {
        prompt: '"gelmek" (venir) conjugué à "il/elle" (o) ?',
        answer: 'geliyor',
        options: ['geliyor', 'gelıyor', 'geliyorum', 'gelir'],
        hint: 'gel + i (liaison, "e" avant) + yor — pas de terminaison pour "o"',
        explanation: 'gel + i + yor = geliyor. Pas de terminaison supplémentaire pour la 3e personne.'
      }
    ]
  },
  {
    id: 'g_pluriel',
    title: 'Pluriel -lar/-ler',
    rule: 'Pour mettre un nom au pluriel, on ajoute -lar après une voyelle arrière (a, ı, o, u) ou -ler après une voyelle avant (e, i, ö, ü). Suit l\'harmonie vocalique.',
    example: 'araba → arabalar (voitures) | ev → evler (maisons)',
    exercises: [
      {
        prompt: 'Pluriel de "araba" (voiture) ?',
        answer: 'arabalar',
        options: ['arabalar', 'arabaler', 'arabalari', 'arabaları'],
        hint: '"a" = voyelle arrière → -lar',
        explanation: '"a" arrière → arabalar.'
      },
      {
        prompt: 'Pluriel de "kitap" (livre) ?',
        answer: 'kitaplar',
        options: ['kitaplar', 'kitapler', 'kitaplari', 'kitapları'],
        hint: '"a" = voyelle arrière → -lar',
        explanation: '"a" arrière → kitaplar.'
      },
      {
        prompt: 'Pluriel de "yüz" (visage) ?',
        answer: 'yüzler',
        options: ['yüzler', 'yüzlar', 'yüzleri', 'yüzları'],
        hint: '"ü" = voyelle avant → -ler',
        explanation: '"ü" avant → yüzler.'
      }
    ]
  },
  {
    id: 'g_negatif_fiil',
    title: 'Négation du verbe (-me/-ma)',
    rule: 'Pour nier un verbe au présent progressif, on insère -me (voyelle avant) ou -ma (voyelle arrière) entre le radical et -iyor. Le -e/-a tombe devant -iyor : -miyor/-mıyor.',
    example: 'gidiyorum → gitmiyorum (je ne vais pas) | yapıyorum → yapmıyorum (je ne fais pas)',
    exercises: [
      {
        prompt: 'Négatif de "gidiyorum" (je vais) ?',
        answer: 'gitmiyorum',
        options: ['gitmiyorum', 'gidemiyorum', 'gidmiyorum', 'gitmiyor'],
        hint: 'git + -mi- (e arrière→ma→mı) + yor + um',
        explanation: 'Après consonne + voyelle arrière → -mı- : gitmiyorum.'
      },
      {
        prompt: 'Négatif de "yapıyorum" (je fais) ?',
        answer: 'yapmıyorum',
        options: ['yapmıyorum', 'yapamıyorum', 'yapmıyorsun', 'yapmiyorum'],
        hint: 'yap + -mı- (voyelle arrière "a") + yor + um',
        explanation: '"a" arrière → négation -mı- : yapmıyorum.'
      },
      {
        prompt: 'Négatif de "geliyor" (il vient) ?',
        answer: 'gelmiyor',
        options: ['gelmiyor', 'gelmemiyor', 'gelimiyor', 'gelmıyor'],
        hint: 'gel + -mi- (voyelle avant "e") + yor — pas de terminaison pour "o"',
        explanation: '"e" avant → négation -mi- : gelmiyor.'
      }
    ]
  },
  {
    id: 'g_soru_mi',
    title: 'Question -mı/-mi/-mu/-mü',
    rule: 'Pour poser une question oui/non, on ajoute la particule -mı/-mi/-mu/-mü après le verbe selon l\'harmonie vocalique. Elle s\'écrit séparée du verbe.',
    example: 'Geliyor musun? = Tu viens ? | Gidiyor musunuz? = Vous allez ?',
    exercises: [
      {
        prompt: 'Particule interrogative pour "Geliyor ___ ?" (Tu viens ?) ?',
        answer: 'musun?',
        options: ['musun?', 'mısın?', 'müsün?', 'misin?'],
        hint: '"o" dans geliyor → voyelle arrière ronde → -mu-',
        explanation: 'Voyelle "o" arrière ronde → particule "mu" : Geliyor musun?'
      },
      {
        prompt: 'Particule pour "Güzel ___ ?" (C\'est beau ?) ?',
        answer: 'mi?',
        options: ['mi?', 'mı?', 'mu?', 'mü?'],
        hint: '"e" dans güzel → voyelle avant → -mi',
        explanation: '"e" avant → particule "mi" : Güzel mi?'
      },
      {
        prompt: 'Particule pour "Var ___ ?" (Il y en a ?) ?',
        answer: 'mı?',
        options: ['mı?', 'mi?', 'mu?', 'mü?'],
        hint: '"a" dans var → voyelle arrière non-ronde → -mı',
        explanation: '"a" arrière non-ronde → particule "mı" : Var mı?'
      }
    ]
  },
  {
    id: 'g_locatif',
    title: 'Cas locatif -da/-de (à/dans/sur)',
    rule: 'Le suffixe -da/-de indique la position (lieu où l\'on se trouve). Après une consonne sourde (ç, f, h, k, p, s, ş, t), -da/-de devient -ta/-te par assimilation.',
    example: 'evde = à la maison | okulda = à l\'école | parkta = dans le parc',
    exercises: [
      {
        prompt: '"à l\'école" en turc ? (okul)',
        answer: 'okulda',
        options: ['okulda', 'okulde', 'okulta', 'okulte'],
        hint: '"u" arrière → -da ; "l" sonore → pas d\'assimilation',
        explanation: '"u" arrière + "l" sonore → okulda.'
      },
      {
        prompt: '"dans le parc" en turc ? (park)',
        answer: 'parkta',
        options: ['parkta', 'parkda', 'parkte', 'parkde'],
        hint: '"a" arrière → -da → mais "k" sourd → assimilation → -ta',
        explanation: '"k" est une consonne sourde → -da → -ta par assimilation : parkta.'
      },
      {
        prompt: '"dans le bus" en turc ? (otobüs)',
        answer: 'otobüste',
        options: ['otobüste', 'otobüsde', 'otobüsda', 'otobüsten'],
        hint: '"ü" avant → -de → "s" sourd → -te',
        explanation: '"ü" avant + "s" sourd → assimilation : -de → -te : otobüste.'
      }
    ]
  },
  {
    id: 'g_datif',
    title: 'Cas directif/datif -a/-e (à/vers)',
    rule: 'Le suffixe -a/-e exprime le mouvement vers un lieu ou une personne. Après une voyelle, on ajoute un -y- de liaison : ev → eve, araba → arabaya.',
    example: 'eve gidiyorum = je vais à la maison | okula gidiyorum = je vais à l\'école',
    exercises: [
      {
        prompt: '"vers la maison" ? (ev)',
        answer: 'eve',
        options: ['eve', 'eva', 'evye', 'evey'],
        hint: '"e" avant → -e ; "v" consonne → pas de -y-',
        explanation: 'ev finit par consonne + "e" avant → direct -e : eve.'
      },
      {
        prompt: '"vers la voiture" ? (araba)',
        answer: 'arabaya',
        options: ['arabaya', 'arabaa', 'arabae', 'arabeya'],
        hint: '"a" arrière → -a ; mais "a" final = voyelle → buffer -y-',
        explanation: 'araba finit par voyelle → buffer -y- obligatoire : arabaya.'
      },
      {
        prompt: '"vers l\'école" ? (okul)',
        answer: 'okula',
        options: ['okula', 'okule', 'okulay', 'okulya'],
        hint: '"u" arrière → -a ; "l" consonne → pas de -y-',
        explanation: '"u" arrière + "l" consonne → direct -a : okula.'
      }
    ]
  },
  {
    id: 'g_ablatif',
    title: 'Cas ablatif -dan/-den (de/depuis)',
    rule: 'Le suffixe -dan/-den exprime la provenance ou le point de départ. Après consonne sourde, -dan/-den devient -tan/-ten par assimilation.',
    example: 'evden geliyorum = je viens de la maison | Türkiye\'den = de Turquie',
    exercises: [
      {
        prompt: '"de la maison" ? (ev)',
        answer: 'evden',
        options: ['evden', 'evdan', 'evten', 'evtan'],
        hint: '"e" avant → -den ; "v" sonore',
        explanation: '"e" avant + "v" sonore → evden.'
      },
      {
        prompt: '"depuis Istanbul" ? (İstanbul)',
        answer: "İstanbul'dan",
        options: ["İstanbul'dan", "İstanbul'den", "İstanbul'tan", "İstanbul'ten"],
        hint: '"u" arrière → -dan ; "l" sonore',
        explanation: '"u" arrière + "l" sonore → İstanbul\'dan.'
      },
      {
        prompt: '"depuis le marché" ? (market)',
        answer: 'marketten',
        options: ['marketten', 'markettan', 'marketden', 'marketdan'],
        hint: '"e" avant → -den ; "t" sourd → -ten',
        explanation: '"e" avant + "t" sourd → assimilation -den → -ten : marketten.'
      }
    ]
  },
  {
    id: 'g_passe_di',
    title: 'Passé simple -dı/-di/-du/-dü',
    rule: 'Pour former le passé accompli, on ajoute au radical -dı/-di/-du/-dü (selon harmonie) puis la terminaison personnelle. Après consonne sourde : -tı/-ti/-tu/-tü.',
    example: 'gittim = je suis allé | yaptın = tu as fait | geldi = il est venu',
    exercises: [
      {
        prompt: '"gitmek" (aller) au passé à "je" ?',
        answer: 'gittim',
        options: ['gittim', 'gidim', 'gitim', 'gittum'],
        hint: 'git + passé : "t" sourd → -ti → doublage + -m',
        explanation: '"t" sourd → passé -ti + doublage : gittim.'
      },
      {
        prompt: '"gelmek" (venir) au passé à "il/elle" ?',
        answer: 'geldi',
        options: ['geldi', 'geldı', 'gelti', 'gelmedi'],
        hint: '"e" avant, "l" sonore → passé -di',
        explanation: '"e" avant + "l" sonore → passé -di, pas de terminaison pour la 3e pers : geldi.'
      },
      {
        prompt: '"yapmak" (faire) au passé à "tu" ?',
        answer: 'yaptın',
        options: ['yaptın', 'yapttın', 'yapdın', 'yapıtın'],
        hint: '"a" arrière, "p" sourd → passé -tı + -n',
        explanation: '"a" arrière + "p" sourd → passé -tı + terminaison -n : yaptın.'
      }
    ]
  },
  {
    id: 'g_futur_acak',
    title: 'Futur -acak/-ecek',
    rule: 'Pour exprimer le futur, on ajoute au radical -acak (voyelle arrière) ou -ecek (voyelle avant), puis la terminaison personnelle. Le -k final peut se transformer en -ğ devant une voyelle.',
    example: 'gideceğim = j\'irai | yapacaksın = tu feras | gelecek = il viendra',
    exercises: [
      {
        prompt: '"gitmek" (aller) au futur à "je" ?',
        answer: 'gideceğim',
        options: ['gideceğim', 'gidecekım', 'gitecekım', 'gidecekum'],
        hint: 'git → gid + ecek (avant) + im → -k → -ğ devant voyelle',
        explanation: 'gid + ecek + im → le -k final → -ğ devant voyelle : gideceğim.'
      },
      {
        prompt: '"yapmak" (faire) au futur à "tu" ?',
        answer: 'yapacaksın',
        options: ['yapacaksın', 'yapeceksin', 'yapacaksin', 'yapacakım'],
        hint: '"a" arrière → -acak + sın',
        explanation: '"a" arrière → futur -acak + terminaison -sın : yapacaksın.'
      },
      {
        prompt: '"gelmek" (venir) au futur à "il/elle" ?',
        answer: 'gelecek',
        options: ['gelecek', 'gelecekı', 'gelecekir', 'gelecekım'],
        hint: '"e" avant → -ecek ; pas de terminaison pour "o"',
        explanation: '"e" avant → futur -ecek, pas de terminaison pour la 3e pers : gelecek.'
      }
    ]
  },
  {
    id: 'g_accusatif',
    title: 'Cas accusatif -ı/-i/-u/-ü (COD défini)',
    rule: 'L\'objet direct défini ou spécifique prend le suffixe d\'accusatif -ı/-i/-u/-ü. Sans suffixe, l\'objet est indéfini ou général. Après voyelle, un -y- de liaison s\'intercale.',
    example: 'elmayı yiyorum = je mange LA pomme | elma yiyorum = je mange (une/des) pomme(s)',
    exercises: [
      {
        prompt: '"je mange LA pomme (définie)" → "elma" + accusatif ?',
        answer: 'elmayı',
        options: ['elmayı', 'elmaa', 'elmaı', 'elmayi'],
        hint: '"a" arrière → -ı ; "a" final = voyelle → buffer -y-',
        explanation: 'elma finit par voyelle + "a" arrière → accusatif -yı : elmayı.'
      },
      {
        prompt: '"je vois LE livre (défini)" → "kitap" + accusatif ?',
        answer: 'kitabı',
        options: ['kitabı', 'kitapı', 'kitabii', 'kitabu'],
        hint: '"a" arrière → -ı ; "p" final → "b" devant voyelle',
        explanation: '"p" final → "b" devant voyelle + "a" arrière → -ı : kitabı.'
      },
      {
        prompt: 'Quelle phrase signifie "je cherche LE bus (spécifique)" ?',
        answer: 'Otobüsü arıyorum',
        options: ['Otobüsü arıyorum', 'Otobüs arıyorum', 'Otobüse arıyorum', 'Otobüsü gidiyorum'],
        hint: 'Objet défini/spécifique → accusatif -ü (voyelle avant "ü")',
        explanation: 'Objet défini → accusatif obligatoire : otobüs + ü = otobüsü.'
      }
    ]
  },
  /* ── Grammaire intermédiaire A2 ───────────────── */
  {
    id: 'g_possessif',
    title: 'Possessifs suffixaux',
    rule: 'Les possessifs se forment avec des suffixes ajoutés au nom : -ım/-im/-um/-üm (mon/ma), -ın/-in/-un/-ün (ton/ta), -(s)ı/-(s)i/-(s)u/-(s)ü (son/sa). Suit l\'harmonie vocalique.',
    example: 'evim = ma maison | araban = ta voiture | arabası = sa voiture',
    exercises: [
      {
        prompt: '"ma maison" en turc ? (ev)',
        answer: 'evim',
        options: ['evim', 'evım', 'evum', 'evüm'],
        hint: '"e" avant → -im pour "mon/ma"',
        explanation: '"e" avant → possessif -im : evim.'
      },
      {
        prompt: '"ta voiture" en turc ? (araba)',
        answer: 'araban',
        options: ['araban', 'arabam', 'arabası', 'arabanı'],
        hint: '"a" arrière → -ın → mais araba finit par voyelle → -n',
        explanation: 'araba finit par voyelle → on drop le -ı du suffixe -ın : araban.'
      },
      {
        prompt: '"sa maison (à lui/elle)" en turc ? (ev)',
        answer: 'evi',
        options: ['evi', 'evisi', 'evin', 'evım'],
        hint: '"e" avant → possessif 3e pers. -(s)i → evi',
        explanation: '"e" avant → possessif 3e pers. -i : evi.'
      }
    ]
  },
  {
    id: 'g_comparatif',
    title: 'Comparatif (daha/en)',
    rule: 'Pour comparer, on place daha (plus) devant l\'adjectif. Pour le superlatif, on utilise en (le/la plus) devant l\'adjectif. Ces mots sont invariables.',
    example: 'daha büyük = plus grand | en güzel = le plus beau/belle',
    exercises: [
      {
        prompt: '"plus grand" en turc ? (büyük)',
        answer: 'daha büyük',
        options: ['daha büyük', 'en büyük', 'büyük daha', 'çok büyük'],
        hint: 'daha = plus (comparatif) ; se place AVANT l\'adjectif',
        explanation: 'daha = "plus" → daha büyük = plus grand (≠ en = superlatif).'
      },
      {
        prompt: '"le plus beau / la plus belle" en turc ? (güzel)',
        answer: 'en güzel',
        options: ['en güzel', 'daha güzel', 'çok güzel', 'güzel en'],
        hint: 'en = le/la plus (superlatif) ; se place AVANT l\'adjectif',
        explanation: 'en = "le/la plus" → en güzel = le plus beau.'
      },
      {
        prompt: 'Quelle phrase veut dire "elle est plus intelligente que lui" ?',
        answer: 'O ondan daha zeki',
        options: ['O ondan daha zeki', 'O daha zeki ondan', 'O en zeki ondan', 'O ondan zeki daha'],
        hint: 'Structure : X + Y-dan + daha + adjectif',
        explanation: 'Structure comparative : X + Y-dan + daha + adj : O ondan daha zeki.'
      }
    ]
  },
  {
    id: 'g_yok_var',
    title: 'Var / Yok (il y a / il n\'y a pas)',
    rule: 'var signifie "il y a" ou "c\'est disponible / j\'en ai". yok signifie "il n\'y a pas" ou "ce n\'est pas disponible / je n\'en ai pas". Très courants à l\'oral.',
    example: 'Su var mı? Evet, var. = Il y a de l\'eau ? Oui. | Param yok. = Je n\'ai pas d\'argent.',
    exercises: [
      {
        prompt: 'Comment dire "Il y a du café" en turc ?',
        answer: 'Kahve var',
        options: ['Kahve var', 'Kahve yok', 'Var kahve', 'Kahvesi var'],
        hint: 'var = il y a / disponible — se place APRÈS le sujet',
        explanation: 'var suit le nom : Kahve var = Il y a du café.'
      },
      {
        prompt: 'Comment dire "Je n\'ai pas d\'argent" en turc ?',
        answer: 'Param yok',
        options: ['Param yok', 'Param var', 'Yok param', 'Para yok benim'],
        hint: 'yok = il n\'y a pas / indisponible ; param = mon argent',
        explanation: 'Param (mon argent) + yok = je n\'ai pas d\'argent.'
      },
      {
        prompt: 'Quelle réponse à "Wi-Fi var mı?" (Il y a le wifi ?) ?',
        answer: 'Evet, var',
        options: ['Evet, var', 'Evet, yok', 'Hayır, var', 'Var mı evet'],
        hint: 'var = oui, il y a / yok = non, il n\'y a pas',
        explanation: 'var confirme la présence : Evet, var = Oui, il y en a.'
      }
    ]
  },
  {
    id: 'g_abilmek',
    title: 'Capacité -abil- (pouvoir/savoir)',
    rule: 'Pour exprimer la capacité ou la possibilité, on insère -abil- entre le radical et la conjugaison. La négation est -ama-/-eme- (le -bil- disparaît à la forme négative).',
    example: 'gidebiliyorum = je peux y aller | yapamıyorum = je ne peux pas faire',
    exercises: [
      {
        prompt: '"je peux y aller" en turc ? (gitmek)',
        answer: 'gidebiliyorum',
        options: ['gidebiliyorum', 'gidiyorum', 'gidemiyorum', 'gidebilmiyorum'],
        hint: 'gid + -ebil- + iyor + um',
        explanation: 'gid + ebil (capacité) + iyor + um = gidebiliyorum.'
      },
      {
        prompt: '"je ne peux pas faire" en turc ? (yapmak)',
        answer: 'yapamıyorum',
        options: ['yapamıyorum', 'yapabilmiyorum', 'yapmıyorum', 'yapamıyor'],
        hint: 'yap + -ama- (négatif capacité, pas -abil-) + ıyor + um',
        explanation: 'La négation supprime -bil- → yap + ama + ıyor + um = yapamıyorum.'
      },
      {
        prompt: '"il/elle peut parler" en turc ? (konuşmak)',
        answer: 'konuşabilir',
        options: ['konuşabilir', 'konuşabiliyor', 'konuşabilmek', 'konuşamaz'],
        hint: 'konuş + -abil- + ir (capacité potentielle)',
        explanation: 'konuş + abil + ir = konuşabilir (il/elle peut/sait parler).'
      }
    ]
  },
  {
    id: 'g_ki_relatif',
    title: 'Suffixe relatif -ki',
    rule: 'Le suffixe -ki s\'ajoute à un nom au locatif pour former un adjectif relatif signifiant "celui/celle de" ou "celui/celle qui est à/dans". Il est invariable.',
    example: 'evdeki = celui de la maison | masadaki kitap = le livre (qui est) sur la table',
    exercises: [
      {
        prompt: '"le livre sur la table" en turc ? (masa + kitap)',
        answer: 'masadaki kitap',
        options: ['masadaki kitap', 'masanın kitap', 'masaki kitap', 'masadaki kitabı'],
        hint: 'masa + da (locatif) + ki (relatif) → masadaki',
        explanation: 'Locatif masada + ki = masadaki → masadaki kitap.'
      },
      {
        prompt: '"celui de la maison" en turc ? (ev)',
        answer: 'evdeki',
        options: ['evdeki', 'evki', 'evdede', 'evinkı'],
        hint: 'ev + de (locatif) + ki (relatif) → evdeki',
        explanation: 'evde + ki = evdeki (celui/celle qui est dans la maison).'
      },
      {
        prompt: '"le manteau de là-bas" en turc ? (orada = là-bas)',
        answer: 'oradaki palto',
        options: ['oradaki palto', 'orada palto', 'oraki palto', 'oranın palto'],
        hint: 'orada (là-bas) + ki → oradaki',
        explanation: 'orada (locatif) + ki = oradaki : oradaki palto = le manteau qui est là-bas.'
      }
    ]
  },
  {
    id: 'g_suffixe_avec',
    title: 'Comitative -le/-la (avec)',
    rule: 'Le suffixe -le/-la exprime l\'accompagnement ("avec"). Après une voyelle, on ajoute un -y- de liaison : -yle/-yla. Il suit l\'harmonie vocalique.',
    example: 'seninle = avec toi | arabamla = avec ma voiture | arkadaşımla = avec mon ami',
    exercises: [
      {
        prompt: '"avec toi" en turc ? (sen)',
        answer: 'seninle',
        options: ['seninle', 'senle', 'senyla', 'seniyle'],
        hint: 'sen → senin + le (base possessive pour -le)',
        explanation: 'sen (tu) → forme possessive senin + le = seninle.'
      },
      {
        prompt: '"avec ma voiture" en turc ? (arabam)',
        answer: 'arabamla',
        options: ['arabamla', 'arabamyla', 'arabayla', 'arabamle'],
        hint: '"a" arrière → -la ; "m" consonne → pas de -y-',
        explanation: 'arabam finit par consonne + "a" arrière → -la direct : arabamla.'
      },
      {
        prompt: '"avec mon ami" en turc ? (arkadaşım)',
        answer: 'arkadaşımla',
        options: ['arkadaşımla', 'arkadaşımyla', 'arkadaşımle', 'arkadaşımıla'],
        hint: '"a" arrière → -la ; "m" consonne → pas de -y-',
        explanation: 'arkadaşım + la (consonne finale + voyelle arrière) = arkadaşımla.'
      }
    ]
  }
];
