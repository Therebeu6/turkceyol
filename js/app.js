/* ═══════════════════════════════════════════════
   TürkçeYol — app.js
   Contrôleur principal (Router SPA, Navigation, UI)
   ═══════════════════════════════════════════════ */

const App = {
  // ── Propriétés ──
  currentView: '',
  history: [],
  views: {}, // stocke les modules de vue (ex: Dashboard, Lesson, etc.)

  // ── Initialisation ──
  init() {
    console.log("App initializing...");
    
    // Init state global
    State.init();

    // DOM Elements
    this.els = {
      header: document.getElementById('app-header'),
      btnBack: document.getElementById('btn-back'),
      headerLogo: document.getElementById('header-logo'),
      headerTitle: document.getElementById('header-title'),
      headerStreakVal: document.getElementById('header-streak-val'),
      headerXpVal: document.getElementById('header-xp-val'),
      bottomNav: document.getElementById('bottom-nav'),
      toastContainer: document.getElementById('toast-container'),
      xpFloat: document.getElementById('xp-float'),
      confettiCanvas: document.getElementById('confetti-canvas')
    };

    // Binding des évènements de routing (hashchange)
    window.addEventListener('hashchange', () => this.handleRoute());
    
    // Header UI init
    this.updateHeaderUI();

    // Init modules (s'ils existent / sont chargés)
    // C'est ici qu'on appellerait Dashboard.init(), Units.init() etc.
    // On le fera de manière lazy (ou dans handleRoute) pour l'instant.

    // Premier routage
    if (!window.location.hash) {
      window.location.hash = '#dashboard';
    } else {
      this.handleRoute();
    }
    
    console.log("App initialized.");
  },

  // ── Routing SPA ──
  handleRoute() {
    const hash = window.location.hash || '#dashboard';
    // Parser le hash (ex: #lesson/u1_c2)
    const [path, param] = hash.substring(1).split('/');
    
    const targetViewId = 'view-' + path;
    const viewEl = document.getElementById(targetViewId);

    if (!viewEl) {
      console.warn("View not found:", targetViewId);
      this.navigate('#dashboard');
      return;
    }

    // Gestion de l'historique
    if (this.currentView && this.currentView !== path) {
      if (this.history[this.history.length - 1] !== this.currentView) {
        this.history.push(this.currentView);
      }
    }
    
    this.currentView = path;

    // Transition UI
    document.querySelectorAll('.view').forEach(el => {
      el.classList.remove('active');
    });
    viewEl.classList.add('active');

    // Mise à jour de la Bottom Nav
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    const navBtn = document.querySelector(`.nav-btn[data-view="${path}"]`);
    if (navBtn) {
      navBtn.classList.add('active');
    }

    // Gestion du Header & Bottom Nav
    const isNoHeader = viewEl.classList.contains('no-header');
    if (isNoHeader) {
      this.els.header.classList.add('hidden');
      this.els.bottomNav.classList.add('hidden');
    } else {
      this.els.header.classList.remove('hidden');
      const hideNavViews = ['settings'];
      if(hideNavViews.includes(path)) {
          this.els.bottomNav.classList.add('hidden');
      } else {
          this.els.bottomNav.classList.remove('hidden');
      }
    }

    // Affichage du bouton retour
    if (path === 'dashboard') {
      this.els.btnBack.classList.add('hidden');
      this.els.headerLogo.classList.remove('hidden');
      this.els.headerTitle.classList.add('hidden');
      this.history = []; // reset history on home
    } else {
      this.els.btnBack.classList.remove('hidden');
      this.els.headerLogo.classList.add('hidden');
      this.els.headerTitle.classList.remove('hidden');
      
      // Titres propres pour le header
      const titles = {
        'units': 'Mon parcours',
        'verbs': 'Conjugaison',
        'vocabulary': 'Vocabulaire',
        'phrases': 'Phrases utiles',
        'dialogues': 'Dialogues',
        'review': 'Révisions',
        'daily': 'Défi du jour',
        'stats': 'Statistiques',
        'settings': 'Paramètres'
      };
      this.els.headerTitle.textContent = titles[path] || (path.charAt(0).toUpperCase() + path.slice(1));
    }

    // Déclenchement de la logique spécifique à la vue
    this.triggerViewLogic(path, param);
  },

  navigate(hash) {
    window.location.hash = hash;
  },

  goBack() {
    if (this.history.length > 0) {
      const prev = this.history.pop();
      window.location.hash = '#' + prev;
    } else {
      this.navigate('#dashboard');
    }
  },

  // ── Logique par vue ──
  triggerViewLogic(viewName, param) {
    // Appel dynamique si le module vue existe
    // ex: window.Dashboard.render()
    const viewObjName = viewName.charAt(0).toUpperCase() + viewName.slice(1);
    if (window[viewObjName] && typeof window[viewObjName].render === 'function') {
      window[viewObjName].render(param);
    }
  },

  // ── UI Globale ──
  updateHeaderUI() {
    this.els.headerStreakVal.textContent = State.data.streak;
    this.els.headerXpVal.textContent = State.data.totalXP;
  },

  // ── Toasts ──
  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    this.els.toastContainer.appendChild(toast);
    
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  // ── Text-To-Speech (Prononciation Turque) ──
  playTTS(text) {
    // 1. On vérifie si l'appareil possède une "vraie" voix turque
    if ('speechSynthesis' in window) {
      const voices = window.speechSynthesis.getVoices();
      const turkishVoice = voices.find(v => 
        v.lang === 'tr-TR' || 
        v.lang === 'tr_TR' || 
        v.lang === 'tr' || 
        v.name.toLowerCase().includes('turkish') || 
        v.name.toLowerCase().includes('türkçe')
      );
      
      if (turkishVoice) {
        window.speechSynthesis.cancel(); // Coupe l'audio en cours
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'tr-TR';
        u.voice = turkishVoice;
        window.speechSynthesis.speak(u);
        return; // Succès natif
      }
    }

    // 2. FALLBACK GOOGLE TRANSLATE
    // Si on arrive ici, c'est que l'appareil (ex: PC Windows) n'a PAS de voix turque installée.
    // On utilise alors secrètement l'API audio de Google Translate pour avoir un accent parfait.
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=tr&client=tw-ob&q=${encodeURIComponent(text)}`;
    const audio = new Audio(url);
    audio.play().catch(err => {
      console.warn("Erreur audio:", err);
      this.showToast("Erreur de lecture audio", "error");
    });
  },

  // ── Effets visuels (XP, Confetti) ──
  showXPFloat(amount) {
    this.els.xpFloat.textContent = `+${amount} XP`;
    this.els.xpFloat.classList.remove('hidden');
    
    // Réinitialiser l'animation
    this.els.xpFloat.style.animation = 'none';
    this.els.xpFloat.offsetHeight; // trigger reflow
    this.els.xpFloat.style.animation = null;
    
    setTimeout(() => {
      this.els.xpFloat.classList.add('hidden');
    }, 1200);
    
    this.updateHeaderUI();
  },

  fireConfetti() {
    // Placeholder pour l'animation canvas
    console.log("🎉 Confetti !");
  },

  // ── Actions métiers transverses ──
  startCurrentLesson() {
    const unit = State.data.currentUnit;
    const chapter = State.data.currentChapter;
    this.navigate(`#lesson/${unit}_${chapter}`);
  },

  quitLesson() {
    if(confirm("Quitter la leçon en cours ? La progression ne sera pas sauvegardée.")) {
      this.goBack();
    }
  }
};

// Démarrage de l'app au DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
