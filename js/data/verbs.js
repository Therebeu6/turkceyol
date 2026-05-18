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
    }
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
  }
];
