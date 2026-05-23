/* ═══════════════════════════════════════════════
   TürkçeYol — verbs.js
   Base de données des verbes avec conjugaison
   Champ `negations.present` pour le présent négatif (-miyor)
   ═══════════════════════════════════════════════ */

window.AppVerbs = [
  {
    id: 'vb_olmak',
    infinitive: 'Olmak',
    stem: 'Ol',
    fr: 'Être / Devenir',
    difficulty: 1,
    isFrequent: true,
    conjugations: {
      present: {
        ben: 'oluyorum', sen: 'oluyorsun', o: 'oluyor',
        biz: 'oluyoruz', siz: 'oluyorsunuz', onlar: 'oluyorlar'
      },
      past: {
        ben: 'oldum', sen: 'oldun', o: 'oldu',
        biz: 'olduk', siz: 'oldunuz', onlar: 'oldular'
      },
      future: {
        ben: 'olacağım', sen: 'olacaksın', o: 'olacak',
        biz: 'olacağız', siz: 'olacaksınız', onlar: 'olacaklar'
      }
    },
    negations: {
      present: {
        ben: 'olmuyorum', sen: 'olmuyorsun', o: 'olmuyor',
        biz: 'olmuyoruz', siz: 'olmuyorsunuz', onlar: 'olmuyorlar'
      }
    }
  },
  {
    id: 'vb_yapmak',
    infinitive: 'Yapmak',
    stem: 'Yap',
    fr: 'Faire',
    difficulty: 1,
    isFrequent: true,
    conjugations: {
      present: {
        ben: 'yapıyorum', sen: 'yapıyorsun', o: 'yapıyor',
        biz: 'yapıyoruz', siz: 'yapıyorsunuz', onlar: 'yapıyorlar'
      },
      past: {
        ben: 'yaptım', sen: 'yaptın', o: 'yaptı',
        biz: 'yaptık', siz: 'yaptınız', onlar: 'yaptılar'
      },
      future: {
        ben: 'yapacağım', sen: 'yapacaksın', o: 'yapacak',
        biz: 'yapacağız', siz: 'yapacaksınız', onlar: 'yapacaklar'
      }
    },
    negations: {
      present: {
        ben: 'yapmıyorum', sen: 'yapmıyorsun', o: 'yapmıyor',
        biz: 'yapmıyoruz', siz: 'yapmıyorsunuz', onlar: 'yapmıyorlar'
      }
    }
  },
  {
    id: 'vb_gitmek',
    infinitive: 'Gitmek',
    stem: 'Git',
    fr: 'Aller',
    difficulty: 2,
    isFrequent: true,
    note: 'Attention à l\'adoucissement t → d au présent affirmatif (Gidiyorum)',
    conjugations: {
      present: {
        ben: 'gidiyorum', sen: 'gidiyorsun', o: 'gidiyor',
        biz: 'gidiyoruz', siz: 'gidiyorsunuz', onlar: 'gidiyorlar'
      },
      past: {
        ben: 'gittim', sen: 'gittin', o: 'gitti',
        biz: 'gittik', siz: 'gittiniz', onlar: 'gittiler'
      },
      future: {
        ben: 'gideceğim', sen: 'gideceksin', o: 'gidecek',
        biz: 'gideceğiz', siz: 'gideceksiniz', onlar: 'gidecekler'
      }
    },
    negations: {
      present: {
        ben: 'gitmiyorum', sen: 'gitmiyorsun', o: 'gitmiyor',
        biz: 'gitmiyoruz', siz: 'gitmiyorsunuz', onlar: 'gitmiyorlar'
      }
    }
  },
  {
    id: 'vb_gelmek',
    infinitive: 'Gelmek',
    stem: 'Gel',
    fr: 'Venir',
    difficulty: 1,
    isFrequent: true,
    conjugations: {
      present: {
        ben: 'geliyorum', sen: 'geliyorsun', o: 'geliyor',
        biz: 'geliyoruz', siz: 'geliyorsunuz', onlar: 'geliyorlar'
      },
      past: {
        ben: 'geldim', sen: 'geldin', o: 'geldi',
        biz: 'geldik', siz: 'geldiniz', onlar: 'geldiler'
      },
      future: {
        ben: 'geleceğim', sen: 'geleceksin', o: 'gelecek',
        biz: 'geleceğiz', siz: 'geleceksiniz', onlar: 'gelecekler'
      }
    },
    negations: {
      present: {
        ben: 'gelmiyorum', sen: 'gelmiyorsun', o: 'gelmiyor',
        biz: 'gelmiyoruz', siz: 'gelmiyorsunuz', onlar: 'gelmiyorlar'
      }
    }
  },
  {
    id: 'vb_konusmak',
    infinitive: 'Konuşmak',
    stem: 'Konuş',
    fr: 'Parler',
    difficulty: 2,
    isFrequent: true,
    conjugations: {
      present: {
        ben: 'konuşuyorum', sen: 'konuşuyorsun', o: 'konuşuyor',
        biz: 'konuşuyoruz', siz: 'konuşuyorsunuz', onlar: 'konuşuyorlar'
      },
      past: {
        ben: 'konuştum', sen: 'konuştun', o: 'konuştu',
        biz: 'konuştuk', siz: 'konuştunuz', onlar: 'konuştular'
      },
      future: {
        ben: 'konuşacağım', sen: 'konuşacaksın', o: 'konuşacak',
        biz: 'konuşacağız', siz: 'konuşacaksınız', onlar: 'konuşacaklar'
      }
    },
    negations: {
      present: {
        ben: 'konuşmuyorum', sen: 'konuşmuyorsun', o: 'konuşmuyor',
        biz: 'konuşmuyoruz', siz: 'konuşmuyorsunuz', onlar: 'konuşmuyorlar'
      }
    },
    examples: [
      { tr: 'Türkçe konuşuyorum.', fr: 'Je parle turc.' },
      { tr: 'Seninle konuşmak istiyorum.', fr: 'Je veux parler avec toi.' },
      { tr: 'O çok güzel konuşuyor.', fr: 'Il/Elle parle très bien.' }
    ]
  },
  {
    id: 'vb_yemek',
    infinitive: 'Yemek',
    stem: 'Ye',
    fr: 'Manger',
    difficulty: 2,
    isFrequent: true,
    note: 'Attention à la mutation ye → yi au présent affirmatif (Yiyorum)',
    conjugations: {
      present: {
        ben: 'yiyorum', sen: 'yiyorsun', o: 'yiyor',
        biz: 'yiyoruz', siz: 'yiyorsunuz', onlar: 'yiyorlar'
      },
      past: {
        ben: 'yedim', sen: 'yedin', o: 'yedi',
        biz: 'yedik', siz: 'yediniz', onlar: 'yediler'
      },
      future: {
        ben: 'yiyeceğim', sen: 'yiyeceksin', o: 'yiyecek',
        biz: 'yiyeceğiz', siz: 'yiyeceksiniz', onlar: 'yiyecekler'
      }
    },
    negations: {
      present: {
        ben: 'yemiyorum', sen: 'yemiyorsun', o: 'yemiyor',
        biz: 'yemiyoruz', siz: 'yemiyorsunuz', onlar: 'yemiyorlar'
      }
    }
  },
  {
    id: 'vb_icmek',
    infinitive: 'İçmek',
    stem: 'İç',
    fr: 'Boire',
    difficulty: 1,
    isFrequent: true,
    conjugations: {
      present: {
        ben: 'içiyorum', sen: 'içiyorsun', o: 'içiyor',
        biz: 'içiyoruz', siz: 'içiyorsunuz', onlar: 'içiyorlar'
      },
      past: {
        ben: 'içtim', sen: 'içtin', o: 'içti',
        biz: 'içtik', siz: 'içtiniz', onlar: 'içtiler'
      },
      future: {
        ben: 'içeceğim', sen: 'içeceksin', o: 'içecek',
        biz: 'içeceğiz', siz: 'içeceksiniz', onlar: 'içecekler'
      }
    },
    negations: {
      present: {
        ben: 'içmiyorum', sen: 'içmiyorsun', o: 'içmiyor',
        biz: 'içmiyoruz', siz: 'içmiyorsunuz', onlar: 'içmiyorlar'
      }
    }
  },
  {
    id: 'vb_istemek',
    infinitive: 'İstemek',
    stem: 'İste',
    fr: 'Vouloir',
    difficulty: 2,
    isFrequent: true,
    note: 'Chute de voyelle au présent affirmatif : İste → İsti (İstiyorum)',
    conjugations: {
      present: {
        ben: 'istiyorum', sen: 'istiyorsun', o: 'istiyor',
        biz: 'istiyoruz', siz: 'istiyorsunuz', onlar: 'istiyorlar'
      },
      past: {
        ben: 'istedim', sen: 'istedin', o: 'istedi',
        biz: 'istedik', siz: 'istediniz', onlar: 'istediler'
      },
      future: {
        ben: 'isteyeceğim', sen: 'isteyeceksin', o: 'isteyecek',
        biz: 'isteyeceğiz', siz: 'isteyeceksiniz', onlar: 'isteyecekler'
      }
    },
    negations: {
      present: {
        ben: 'istemiyorum', sen: 'istemiyorsun', o: 'istemiyor',
        biz: 'istemiyoruz', siz: 'istemiyorsunuz', onlar: 'istemiyorlar'
      }
    }
  },
  {
    id: 'vb_anlamak',
    infinitive: 'Anlamak',
    stem: 'Anla',
    fr: 'Comprendre',
    difficulty: 2,
    isFrequent: true,
    conjugations: {
      present: {
        ben: 'anlıyorum', sen: 'anlıyorsun', o: 'anlıyor',
        biz: 'anlıyoruz', siz: 'anlıyorsunuz', onlar: 'anlıyorlar'
      },
      past: {
        ben: 'anladım', sen: 'anladın', o: 'anladı',
        biz: 'anladık', siz: 'anladınız', onlar: 'anladılar'
      },
      future: {
        ben: 'anlayacağım', sen: 'anlayacaksın', o: 'anlayacak',
        biz: 'anlayacağız', siz: 'anlayacaksınız', onlar: 'anlayacaklar'
      }
    },
    negations: {
      present: {
        ben: 'anlamıyorum', sen: 'anlamıyorsun', o: 'anlamıyor',
        biz: 'anlamıyoruz', siz: 'anlamıyorsunuz', onlar: 'anlamıyorlar'
      }
    },
    examples: [
      { tr: 'Sizi anlamıyorum.', fr: 'Je ne vous comprends pas.' },
      { tr: 'Şimdi her şeyi anladım.', fr: 'Maintenant j\'ai tout compris.' },
      { tr: 'O Türkçe anlıyor ama konuşmuyor.', fr: 'Il/Elle comprend le turc mais ne parle pas.' }
    ]
  },
  {
    id: 'vb_calismak',
    infinitive: 'Çalışmak',
    stem: 'Çalış',
    fr: 'Travailler / Étudier',
    difficulty: 2,
    isFrequent: true,
    conjugations: {
      present: {
        ben: 'çalışıyorum', sen: 'çalışıyorsun', o: 'çalışıyor',
        biz: 'çalışıyoruz', siz: 'çalışıyorsunuz', onlar: 'çalışıyorlar'
      },
      past: {
        ben: 'çalıştım', sen: 'çalıştın', o: 'çalıştı',
        biz: 'çalıştık', siz: 'çalıştınız', onlar: 'çalıştılar'
      },
      future: {
        ben: 'çalışacağım', sen: 'çalışacaksın', o: 'çalışacak',
        biz: 'çalışacağız', siz: 'çalışacaksınız', onlar: 'çalışacaklar'
      }
    },
    negations: {
      present: {
        ben: 'çalışmıyorum', sen: 'çalışmıyorsun', o: 'çalışmıyor',
        biz: 'çalışmıyoruz', siz: 'çalışmıyorsunuz', onlar: 'çalışmıyorlar'
      }
    }
  },
  {
    id: 'vb_sevmek',
    infinitive: 'Sevmek',
    stem: 'Sev',
    fr: 'Aimer',
    difficulty: 1,
    isFrequent: true,
    conjugations: {
      present: {
        ben: 'seviyorum', sen: 'seviyorsun', o: 'seviyor',
        biz: 'seviyoruz', siz: 'seviyorsunuz', onlar: 'seviyorlar'
      },
      past: {
        ben: 'sevdim', sen: 'sevdin', o: 'sevdi',
        biz: 'sevdik', siz: 'sevdiniz', onlar: 'sevdiler'
      },
      future: {
        ben: 'seveceğim', sen: 'seveceksin', o: 'sevecek',
        biz: 'seveceğiz', siz: 'seveceksiniz', onlar: 'sevecekler'
      }
    },
    negations: {
      present: {
        ben: 'sevmiyorum', sen: 'sevmiyorsun', o: 'sevmiyor',
        biz: 'sevmiyoruz', siz: 'sevmiyorsunuz', onlar: 'sevmiyorlar'
      }
    }
  },
  {
    id: 'vb_uyumak',
    infinitive: 'Uyumak',
    stem: 'Uyu',
    fr: 'Dormir',
    difficulty: 1,
    isFrequent: true,
    conjugations: {
      present: {
        ben: 'uyuyorum', sen: 'uyuyorsun', o: 'uyuyor',
        biz: 'uyuyoruz', siz: 'uyuyorsunuz', onlar: 'uyuyorlar'
      },
      past: {
        ben: 'uyudum', sen: 'uyudun', o: 'uyudu',
        biz: 'uyuduk', siz: 'uyudunuz', onlar: 'uyudular'
      },
      future: {
        ben: 'uyuyacağım', sen: 'uyuyacaksın', o: 'uyuyacak',
        biz: 'uyuyacağız', siz: 'uyuyacaksınız', onlar: 'uyuyacaklar'
      }
    },
    negations: {
      present: {
        ben: 'uyumuyorum', sen: 'uyumuyorsun', o: 'uyumuyor',
        biz: 'uyumuyoruz', siz: 'uyumuyorsunuz', onlar: 'uyumuyorlar'
      }
    }
  },
  {
    id: 'vb_kalkmak',
    infinitive: 'Kalkmak',
    stem: 'Kalk',
    fr: 'Se lever',
    difficulty: 2,
    isFrequent: true,
    conjugations: {
      present: {
        ben: 'kalkıyorum', sen: 'kalkıyorsun', o: 'kalkıyor',
        biz: 'kalkıyoruz', siz: 'kalkıyorsunuz', onlar: 'kalkıyorlar'
      },
      past: {
        ben: 'kalktım', sen: 'kalktın', o: 'kalktı',
        biz: 'kalktık', siz: 'kalktınız', onlar: 'kalktılar'
      },
      future: {
        ben: 'kalkacağım', sen: 'kalkacaksın', o: 'kalkacak',
        biz: 'kalkacağız', siz: 'kalkacaksınız', onlar: 'kalkacaklar'
      }
    },
    negations: {
      present: {
        ben: 'kalkmıyorum', sen: 'kalkmıyorsun', o: 'kalkmıyor',
        biz: 'kalkmıyoruz', siz: 'kalkmıyorsunuz', onlar: 'kalkmıyorlar'
      }
    }
  },
  {
    id: 'vb_bilmek',
    infinitive: 'Bilmek',
    stem: 'Bil',
    fr: 'Savoir / Connaître',
    difficulty: 2,
    isFrequent: true,
    conjugations: {
      present: {
        ben: 'biliyorum', sen: 'biliyorsun', o: 'biliyor',
        biz: 'biliyoruz', siz: 'biliyorsunuz', onlar: 'biliyorlar'
      },
      past: {
        ben: 'bildim', sen: 'bildin', o: 'bildi',
        biz: 'bildik', siz: 'bildiniz', onlar: 'bildiler'
      },
      future: {
        ben: 'bileceğim', sen: 'bileceksin', o: 'bilecek',
        biz: 'bileceğiz', siz: 'bileceksiniz', onlar: 'bilecekler'
      }
    },
    negations: {
      present: {
        ben: 'bilmiyorum', sen: 'bilmiyorsun', o: 'bilmiyor',
        biz: 'bilmiyoruz', siz: 'bilmiyorsunuz', onlar: 'bilmiyorlar'
      }
    }
  },
  {
    id: 'vb_almak',
    infinitive: 'Almak',
    stem: 'Al',
    fr: 'Prendre / Acheter',
    difficulty: 1,
    isFrequent: true,
    conjugations: {
      present: {
        ben: 'alıyorum', sen: 'alıyorsun', o: 'alıyor',
        biz: 'alıyoruz', siz: 'alıyorsunuz', onlar: 'alıyorlar'
      },
      past: {
        ben: 'aldım', sen: 'aldın', o: 'aldı',
        biz: 'aldık', siz: 'aldınız', onlar: 'aldılar'
      },
      future: {
        ben: 'alacağım', sen: 'alacaksın', o: 'alacak',
        biz: 'alacağız', siz: 'alacaksınız', onlar: 'alacaklar'
      }
    },
    negations: {
      present: {
        ben: 'almıyorum', sen: 'almıyorsun', o: 'almıyor',
        biz: 'almıyoruz', siz: 'almıyorsunuz', onlar: 'almıyorlar'
      }
    },
    examples: [
      { tr: 'Her gün gazete alıyorum.', fr: 'J\'achète le journal tous les jours.' },
      { tr: 'Dün marketten ekmek aldım.', fr: 'Hier j\'ai acheté du pain au supermarché.' },
      { tr: 'Yarın yeni bir kitap alacağım.', fr: 'Demain j\'achèterai un nouveau livre.' }
    ]
  },
  {
    id: 'vb_vermek',
    infinitive: 'Vermek',
    stem: 'Ver',
    fr: 'Donner',
    difficulty: 1,
    isFrequent: true,
    conjugations: {
      present: {
        ben: 'veriyorum', sen: 'veriyorsun', o: 'veriyor',
        biz: 'veriyoruz', siz: 'veriyorsunuz', onlar: 'veriyorlar'
      },
      past: {
        ben: 'verdim', sen: 'verdin', o: 'verdi',
        biz: 'verdik', siz: 'verdiniz', onlar: 'verdiler'
      },
      future: {
        ben: 'vereceğim', sen: 'vereceksin', o: 'verecek',
        biz: 'vereceğiz', siz: 'vereceksiniz', onlar: 'verecekler'
      }
    },
    negations: {
      present: {
        ben: 'vermiyorum', sen: 'vermiyorsun', o: 'vermiyor',
        biz: 'vermiyoruz', siz: 'vermiyorsunuz', onlar: 'vermiyorlar'
      }
    },
    examples: [
      { tr: 'Sana bir şey veriyorum.', fr: 'Je te donne quelque chose.' },
      { tr: 'Ona hediye verdim.', fr: 'Je lui ai offert un cadeau.' },
      { tr: 'Yarın sana kitabı vereceğim.', fr: 'Demain je te donnerai le livre.' }
    ]
  },
  {
    id: 'vb_bakmak',
    infinitive: 'Bakmak',
    stem: 'Bak',
    fr: 'Regarder / Chercher',
    difficulty: 2,
    isFrequent: true,
    conjugations: {
      present: {
        ben: 'bakıyorum', sen: 'bakıyorsun', o: 'bakıyor',
        biz: 'bakıyoruz', siz: 'bakıyorsunuz', onlar: 'bakıyorlar'
      },
      past: {
        ben: 'baktım', sen: 'baktın', o: 'baktı',
        biz: 'baktık', siz: 'baktınız', onlar: 'baktılar'
      },
      future: {
        ben: 'bakacağım', sen: 'bakacaksın', o: 'bakacak',
        biz: 'bakacağız', siz: 'bakacaksınız', onlar: 'bakacaklar'
      }
    },
    negations: {
      present: {
        ben: 'bakmıyorum', sen: 'bakmıyorsun', o: 'bakmıyor',
        biz: 'bakmıyoruz', siz: 'bakmıyorsunuz', onlar: 'bakmıyorlar'
      }
    },
    examples: [
      { tr: 'Pencereden dışarı bakıyorum.', fr: 'Je regarde dehors par la fenêtre.' },
      { tr: 'Ona baktım ama göremedim.', fr: 'Je l\'ai regardé mais je n\'ai pas pu voir.' },
      { tr: 'Yarın çocuğa bakacağım.', fr: 'Demain je garderai l\'enfant.' }
    ]
  },
  {
    id: 'vb_beklemek',
    infinitive: 'Beklemek',
    stem: 'Bekle',
    fr: 'Attendre',
    difficulty: 2,
    isFrequent: true,
    conjugations: {
      present: {
        ben: 'bekliyorum', sen: 'bekliyorsun', o: 'bekliyor',
        biz: 'bekliyoruz', siz: 'bekliyorsunuz', onlar: 'bekliyorlar'
      },
      past: {
        ben: 'bekledim', sen: 'bekledin', o: 'bekledi',
        biz: 'bekledik', siz: 'beklediniz', onlar: 'beklediler'
      },
      future: {
        ben: 'bekleyeceğim', sen: 'bekleyeceksin', o: 'bekleyecek',
        biz: 'bekleyeceğiz', siz: 'bekleyeceksiniz', onlar: 'bekleyecekler'
      }
    },
    negations: {
      present: {
        ben: 'beklemiyorum', sen: 'beklemiyorsun', o: 'beklemiyor',
        biz: 'beklemiyoruz', siz: 'beklemiyorsunuz', onlar: 'beklemiyorlar'
      }
    },
    examples: [
      { tr: 'Seni otobüs durağında bekliyorum.', fr: 'Je t\'attends à l\'arrêt de bus.' },
      { tr: 'Bir saat bekledim.', fr: 'J\'ai attendu une heure.' },
      { tr: 'Yarın sizi burada bekleyeceğim.', fr: 'Demain je vous attendrai ici.' }
    ]
  },
  {
    id: 'vb_okumak',
    infinitive: 'Okumak',
    stem: 'Oku',
    fr: 'Lire / Étudier',
    difficulty: 1,
    isFrequent: true,
    conjugations: {
      present: {
        ben: 'okuyorum', sen: 'okuyorsun', o: 'okuyor',
        biz: 'okuyoruz', siz: 'okuyorsunuz', onlar: 'okuyorlar'
      },
      past: {
        ben: 'okudum', sen: 'okudun', o: 'okudu',
        biz: 'okuduk', siz: 'okudunuz', onlar: 'okudular'
      },
      future: {
        ben: 'okuyacağım', sen: 'okuyacaksın', o: 'okuyacak',
        biz: 'okuyacağız', siz: 'okuyacaksınız', onlar: 'okuyacaklar'
      }
    },
    negations: {
      present: {
        ben: 'okumuyorum', sen: 'okumuyorsun', o: 'okumuyor',
        biz: 'okumuyoruz', siz: 'okumuyorsunuz', onlar: 'okumuyorlar'
      }
    },
    examples: [
      { tr: 'Akşamları kitap okuyorum.', fr: 'Je lis un livre le soir.' },
      { tr: 'Dün iki saat ders çalıştım.', fr: 'Hier j\'ai étudié pendant deux heures.' },
      { tr: 'Yarın gazete okuyacağım.', fr: 'Demain je lirai le journal.' }
    ]
  },
  {
    id: 'vb_yazmak',
    infinitive: 'Yazmak',
    stem: 'Yaz',
    fr: 'Écrire',
    difficulty: 1,
    isFrequent: true,
    conjugations: {
      present: {
        ben: 'yazıyorum', sen: 'yazıyorsun', o: 'yazıyor',
        biz: 'yazıyoruz', siz: 'yazıyorsunuz', onlar: 'yazıyorlar'
      },
      past: {
        ben: 'yazdım', sen: 'yazdın', o: 'yazdı',
        biz: 'yazdık', siz: 'yazdınız', onlar: 'yazdılar'
      },
      future: {
        ben: 'yazacağım', sen: 'yazacaksın', o: 'yazacak',
        biz: 'yazacağız', siz: 'yazacaksınız', onlar: 'yazacaklar'
      }
    },
    negations: {
      present: {
        ben: 'yazmıyorum', sen: 'yazmıyorsun', o: 'yazmıyor',
        biz: 'yazmıyoruz', siz: 'yazmıyorsunuz', onlar: 'yazmıyorlar'
      }
    },
    examples: [
      { tr: 'Her gün günlük yazıyorum.', fr: 'J\'écris un journal tous les jours.' },
      { tr: 'Sana bir mektup yazdım.', fr: 'Je t\'ai écrit une lettre.' },
      { tr: 'Yarın raporu yazacağım.', fr: 'Demain j\'écrirai le rapport.' }
    ]
  },

  // ── Lot A ──
  {
    id: 'vb_duymak',
    infinitive: 'Duymak',
    stem: 'Duy',
    fr: 'Entendre / Ressentir',
    difficulty: 1,
    isFrequent: true,
    conjugations: {
      present: {
        ben: 'duyuyorum', sen: 'duyuyorsun', o: 'duyuyor',
        biz: 'duyuyoruz', siz: 'duyuyorsunuz', onlar: 'duyuyorlar'
      },
      past: {
        ben: 'duydum', sen: 'duydun', o: 'duydu',
        biz: 'duyduk', siz: 'duydunuz', onlar: 'duydular'
      },
      future: {
        ben: 'duyacağım', sen: 'duyacaksın', o: 'duyacak',
        biz: 'duyacağız', siz: 'duyacaksınız', onlar: 'duyacaklar'
      }
    },
    negations: {
      present: {
        ben: 'duymuyorum', sen: 'duymuyorsun', o: 'duymuyor',
        biz: 'duymuyoruz', siz: 'duymuyorsunuz', onlar: 'duymuyorlar'
      }
    },
    examples: [
      { tr: 'Sesini duyuyorum.', fr: 'J\'entends ta voix.' },
      { tr: 'Bizi duyuyor musun?', fr: 'Tu nous entends ?' },
      { tr: 'Müziği duydum ama göremedim.', fr: 'J\'ai entendu la musique mais je n\'ai pas vu.' }
    ]
  },
  {
    id: 'vb_gormek',
    infinitive: 'Görmek',
    stem: 'Gör',
    fr: 'Voir',
    difficulty: 1,
    isFrequent: true,
    conjugations: {
      present: {
        ben: 'görüyorum', sen: 'görüyorsun', o: 'görüyor',
        biz: 'görüyoruz', siz: 'görüyorsunuz', onlar: 'görüyorlar'
      },
      past: {
        ben: 'gördüm', sen: 'gördün', o: 'gördü',
        biz: 'gördük', siz: 'gördünüz', onlar: 'gördüler'
      },
      future: {
        ben: 'göreceğim', sen: 'göreceksin', o: 'görecek',
        biz: 'göreceğiz', siz: 'göreceksiniz', onlar: 'görecekler'
      }
    },
    negations: {
      present: {
        ben: 'görmüyorum', sen: 'görmüyorsun', o: 'görmüyor',
        biz: 'görmüyoruz', siz: 'görmüyorsunuz', onlar: 'görmüyorlar'
      }
    },
    examples: [
      { tr: 'Her gün seni görüyorum.', fr: 'Je te vois tous les jours.' },
      { tr: 'Dün sinemada bir film gördüm.', fr: 'Hier j\'ai vu un film au cinéma.' },
      { tr: 'Yarın seni göreceğim.', fr: 'Je te verrai demain.' }
    ]
  },
  {
    id: 'vb_aramak',
    infinitive: 'Aramak',
    stem: 'Ara',
    fr: 'Chercher / Appeler (téléphone)',
    difficulty: 2,
    isFrequent: true,
    conjugations: {
      present: {
        ben: 'arıyorum', sen: 'arıyorsun', o: 'arıyor',
        biz: 'arıyoruz', siz: 'arıyorsunuz', onlar: 'arıyorlar'
      },
      past: {
        ben: 'aradım', sen: 'aradın', o: 'aradı',
        biz: 'aradık', siz: 'aradınız', onlar: 'aradılar'
      },
      future: {
        ben: 'arayacağım', sen: 'arayacaksın', o: 'arayacak',
        biz: 'arayacağız', siz: 'arayacaksınız', onlar: 'arayacaklar'
      }
    },
    negations: {
      present: {
        ben: 'aramıyorum', sen: 'aramıyorsun', o: 'aramıyor',
        biz: 'aramıyoruz', siz: 'aramıyorsunuz', onlar: 'aramıyorlar'
      }
    },
    examples: [
      { tr: 'Seni her gün arıyorum.', fr: 'Je t\'appelle tous les jours.' },
      { tr: 'Anahtarımı aradım ama bulamadım.', fr: 'J\'ai cherché mes clés mais je n\'ai pas trouvé.' },
      { tr: 'Yarın seni arayacağım.', fr: 'Je t\'appellerai demain.' }
    ]
  },
  {
    id: 'vb_acmak',
    infinitive: 'Açmak',
    stem: 'Aç',
    fr: 'Ouvrir / Allumer',
    difficulty: 2,
    isFrequent: true,
    conjugations: {
      present: {
        ben: 'açıyorum', sen: 'açıyorsun', o: 'açıyor',
        biz: 'açıyoruz', siz: 'açıyorsunuz', onlar: 'açıyorlar'
      },
      past: {
        ben: 'açtım', sen: 'açtın', o: 'açtı',
        biz: 'açtık', siz: 'açtınız', onlar: 'açtılar'
      },
      future: {
        ben: 'açacağım', sen: 'açacaksın', o: 'açacak',
        biz: 'açacağız', siz: 'açacaksınız', onlar: 'açacaklar'
      }
    },
    negations: {
      present: {
        ben: 'açmıyorum', sen: 'açmıyorsun', o: 'açmıyor',
        biz: 'açmıyoruz', siz: 'açmıyorsunuz', onlar: 'açmıyorlar'
      }
    },
    examples: [
      { tr: 'Kapıyı açıyorum.', fr: 'J\'ouvre la porte.' },
      { tr: 'Televizyonu açtın mı?', fr: 'As-tu allumé la télévision ?' },
      { tr: 'Yarın pencereyi açacağım.', fr: 'Demain j\'ouvrirai la fenêtre.' }
    ]
  },
  {
    id: 'vb_kapatmak',
    infinitive: 'Kapatmak',
    stem: 'Kapat',
    fr: 'Fermer / Éteindre',
    difficulty: 2,
    isFrequent: true,
    conjugations: {
      present: {
        ben: 'kapatıyorum', sen: 'kapatıyorsun', o: 'kapatıyor',
        biz: 'kapatıyoruz', siz: 'kapatıyorsunuz', onlar: 'kapatıyorlar'
      },
      past: {
        ben: 'kapattım', sen: 'kapattın', o: 'kapattı',
        biz: 'kapattık', siz: 'kapattınız', onlar: 'kapattılar'
      },
      future: {
        ben: 'kapatacağım', sen: 'kapatacaksın', o: 'kapatacak',
        biz: 'kapatacağız', siz: 'kapatacaksınız', onlar: 'kapatacaklar'
      }
    },
    negations: {
      present: {
        ben: 'kapatmıyorum', sen: 'kapatmıyorsun', o: 'kapatmıyor',
        biz: 'kapatmıyoruz', siz: 'kapatmıyorsunuz', onlar: 'kapatmıyorlar'
      }
    },
    examples: [
      { tr: 'Kapıyı kapatıyorum.', fr: 'Je ferme la porte.' },
      { tr: 'Işığı kapattın mı?', fr: 'As-tu éteint la lumière ?' },
      { tr: 'Yarın dükkânı kapatacağım.', fr: 'Demain je fermerai le magasin.' }
    ]
  },

  // ── Lot B ──
  {
    id: 'vb_dusunmek',
    infinitive: 'Düşünmek',
    stem: 'Düşün',
    fr: 'Penser / Réfléchir',
    difficulty: 2,
    isFrequent: true,
    conjugations: {
      present: {
        ben: 'düşünüyorum', sen: 'düşünüyorsun', o: 'düşünüyor',
        biz: 'düşünüyoruz', siz: 'düşünüyorsunuz', onlar: 'düşünüyorlar'
      },
      past: {
        ben: 'düşündüm', sen: 'düşündün', o: 'düşündü',
        biz: 'düşündük', siz: 'düşündünüz', onlar: 'düşündüler'
      },
      future: {
        ben: 'düşüneceğim', sen: 'düşüneceksin', o: 'düşünecek',
        biz: 'düşüneceğiz', siz: 'düşüneceksiniz', onlar: 'düşünecekler'
      }
    },
    negations: {
      present: {
        ben: 'düşünmüyorum', sen: 'düşünmüyorsun', o: 'düşünmüyor',
        biz: 'düşünmüyoruz', siz: 'düşünmüyorsunuz', onlar: 'düşünmüyorlar'
      }
    },
    examples: [
      { tr: 'Bu konuda ne düşünüyorsun?', fr: 'Qu\'est-ce que tu penses de ce sujet ?' },
      { tr: 'Çok düşündüm ve karar verdim.', fr: 'J\'ai beaucoup réfléchi et j\'ai décidé.' },
      { tr: 'Yarın bu soruyu düşüneceğim.', fr: 'Je réfléchirai à cette question demain.' }
    ]
  },
  {
    id: 'vb_satmak',
    infinitive: 'Satmak',
    stem: 'Sat',
    fr: 'Vendre',
    difficulty: 2,
    isFrequent: false,
    conjugations: {
      present: {
        ben: 'satıyorum', sen: 'satıyorsun', o: 'satıyor',
        biz: 'satıyoruz', siz: 'satıyorsunuz', onlar: 'satıyorlar'
      },
      past: {
        ben: 'sattım', sen: 'sattın', o: 'sattı',
        biz: 'sattık', siz: 'sattınız', onlar: 'sattılar'
      },
      future: {
        ben: 'satacağım', sen: 'satacaksın', o: 'satacak',
        biz: 'satacağız', siz: 'satacaksınız', onlar: 'satacaklar'
      }
    },
    negations: {
      present: {
        ben: 'satmıyorum', sen: 'satmıyorsun', o: 'satmıyor',
        biz: 'satmıyoruz', siz: 'satmıyorsunuz', onlar: 'satmıyorlar'
      }
    },
    examples: [
      { tr: 'Bu dükkânda meyve satıyorlar.', fr: 'Ils vendent des fruits dans cette boutique.' },
      { tr: 'Arabasını sattı.', fr: 'Il/Elle a vendu sa voiture.' },
      { tr: 'Onu ucuza satacağım.', fr: 'Je le vendrai à bas prix.' }
    ]
  },
  {
    id: 'vb_odemek',
    infinitive: 'Ödemek',
    stem: 'Öde',
    fr: 'Payer',
    difficulty: 2,
    isFrequent: true,
    note: 'Voyelle finale e tombe au présent affirmatif, harmonie sur ö retenu : ödüyorum',
    conjugations: {
      present: {
        ben: 'ödüyorum', sen: 'ödüyorsun', o: 'ödüyor',
        biz: 'ödüyoruz', siz: 'ödüyorsunuz', onlar: 'ödüyorlar'
      },
      past: {
        ben: 'ödedim', sen: 'ödedin', o: 'ödedi',
        biz: 'ödedik', siz: 'ödediniz', onlar: 'ödediler'
      },
      future: {
        ben: 'ödeyeceğim', sen: 'ödeyeceksin', o: 'ödeyecek',
        biz: 'ödeyeceğiz', siz: 'ödeyeceksiniz', onlar: 'ödeyecekler'
      }
    },
    negations: {
      present: {
        ben: 'ödemiyorum', sen: 'ödemiyorsun', o: 'ödemiyor',
        biz: 'ödemiyoruz', siz: 'ödemiyorsunuz', onlar: 'ödemiyorlar'
      }
    },
    examples: [
      { tr: 'Hesabı ödüyorum.', fr: 'Je paie l\'addition.' },
      { tr: 'Dün faturayı ödedim.', fr: 'Hier j\'ai payé la facture.' },
      { tr: 'Yarın kirayı ödeyeceğim.', fr: 'Demain je paierai le loyer.' }
    ]
  },
  {
    id: 'vb_yardim_etmek',
    infinitive: 'Yardım etmek',
    stem: 'Yardım et',
    fr: 'Aider',
    difficulty: 2,
    isFrequent: true,
    note: 'Verbe composé : yardım + etmek. Conjuguer etmek, t → d devant voyelle (ediyorum). Garder yardım devant.',
    conjugations: {
      present: {
        ben: 'yardım ediyorum', sen: 'yardım ediyorsun', o: 'yardım ediyor',
        biz: 'yardım ediyoruz', siz: 'yardım ediyorsunuz', onlar: 'yardım ediyorlar'
      },
      past: {
        ben: 'yardım ettim', sen: 'yardım ettin', o: 'yardım etti',
        biz: 'yardım ettik', siz: 'yardım ettiniz', onlar: 'yardım ettiler'
      },
      future: {
        ben: 'yardım edeceğim', sen: 'yardım edeceksin', o: 'yardım edecek',
        biz: 'yardım edeceğiz', siz: 'yardım edeceksiniz', onlar: 'yardım edecekler'
      }
    },
    negations: {
      present: {
        ben: 'yardım etmiyorum', sen: 'yardım etmiyorsun', o: 'yardım etmiyor',
        biz: 'yardım etmiyoruz', siz: 'yardım etmiyorsunuz', onlar: 'yardım etmiyorlar'
      }
    },
    examples: [
      { tr: 'Sana yardım ediyorum.', fr: 'Je t\'aide.' },
      { tr: 'Dün ona yardım ettim.', fr: 'Hier je l\'ai aidé(e).' },
      { tr: 'Yarın size yardım edeceğim.', fr: 'Demain je vous aiderai.' }
    ]
  }
];
