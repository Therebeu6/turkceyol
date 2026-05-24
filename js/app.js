/* ═══════════════════════════════════════════════
   TürkçeYol — app.js
   Contrôleur principal (Router SPA, Navigation, UI)
   ═══════════════════════════════════════════════ */

const App = {
  // ── Propriétés ──
  currentView: '',
  history: [],
  _isGoingBack: false,
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
    
    // Pré-charger les voix TTS
    this.loadVoices();

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
    if (!this._isGoingBack && this.currentView && this.currentView !== path) {
      if (this.history[this.history.length - 1] !== this.currentView) {
        this.history.push(this.currentView);
      }
    }
    this._isGoingBack = false;

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
      this._isGoingBack = true;
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
  _voices: [],
  
  loadVoices() {
    this._voices = window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      this._voices = window.speechSynthesis.getVoices();
    };
  },

  playTTS(text) {
    if (!text) return;

    // 1. Chercher une VRAIE voix turque native sur l'appareil
    if ('speechSynthesis' in window) {
      if (this._voices.length === 0) this._voices = window.speechSynthesis.getVoices();
      const turkishVoice = this._voices.find(v => 
        v.lang === 'tr-TR' || v.lang === 'tr_TR' || v.lang === 'tr' ||
        v.name.toLowerCase().includes('turkish') || 
        v.name.toLowerCase().includes('türkçe')
      );
      
      // Utiliser speechSynthesis UNIQUEMENT si on a trouvé une vraie voix turque
      if (turkishVoice) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'tr-TR';
        u.voice = turkishVoice;
        u.rate = window._ttsRate || 0.9;
        window.speechSynthesis.speak(u);
        return;
      }
    }
    
    // 2. Sinon → Google Translate TTS (accent turc parfait)
    // Fonctionne grâce au <meta name="referrer" content="no-referrer"> dans le HTML
    this._playGoogleTTS(text);
  },

  _playGoogleTTS(text) {
    const audio = new Audio();
    audio.playbackRate = window._ttsRate || 1.0;
    audio.oncanplaythrough = () => { audio.play(); };
    audio.onerror = () => { /* silencieux */ };
    audio.src = `https://translate.google.com/translate_tts?ie=UTF-8&tl=tr&client=tw-ob&q=${encodeURIComponent(text)}`;
    audio.load();
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
    const canvas = this.els.confettiCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#E8571A', '#F59E0B', '#10B981', '#6366F1', '#EC4899', '#06B6D4'];
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: -10 - Math.random() * 80,
      w: 6 + Math.random() * 8,
      h: 3 + Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 3,
      vy: 3 + Math.random() * 4,
      angle: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.2
    }));

    const start = performance.now();
    const duration = 2800;

    const tick = (now) => {
      const elapsed = now - start;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const fade = Math.max(0, 1 - (elapsed - duration * 0.6) / (duration * 0.4));
      ctx.globalAlpha = fade;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
        p.angle += p.spin;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }

      if (elapsed < duration) {
        requestAnimationFrame(tick);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
      }
    };

    requestAnimationFrame(tick);
  },

  // ── Actions métiers transverses ──
  startCurrentLesson() {
    const chapter = State.data.currentChapter;
    this.navigate(`#lesson/${chapter}`);
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
