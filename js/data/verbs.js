/* ═══════════════════════════════════════════════
   TürkçeYol — verbs.js
   Base de données des verbes avec conjugaison
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
    }
  },
  {
    id: 'vb_gitmek',
    infinitive: 'Gitmek',
    stem: 'Git',
    fr: 'Aller',
    difficulty: 2,
    isFrequent: true,
    note: 'Attention à l\'adoucissement t -> d (Gidiyorum)',
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
    }
  },
  {
    id: 'vb_yemek',
    infinitive: 'Yemek',
    stem: 'Ye',
    fr: 'Manger',
    difficulty: 2,
    isFrequent: true,
    note: 'Attention à la mutation e -> i (Yiyorum)',
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
    }
  },
  {
    id: 'vb_istemek',
    infinitive: 'İstemek',
    stem: 'İste',
    fr: 'Vouloir',
    difficulty: 2,
    isFrequent: true,
    note: 'Attention à la chute de voyelle au présent (İstiyorum)',
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
    }
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
    }
  }
];
