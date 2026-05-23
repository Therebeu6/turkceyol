/* ═══════════════════════════════════════════════
   TürkçeYol — dashboard.js
   Vue de l'accueil
   ═══════════════════════════════════════════════ */

window.Dashboard = {
  render() {
    // Skeleton d'abord, puis vraies données après un frame (G4)
    this._renderSkeleton();
    setTimeout(() => this._renderReal(), 30);
  },

  _renderSkeleton() {
    const setSk = (id, html) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = html;
    };
    setSk('dash-level-card',
      `<div class="skeleton skeleton-line sk-w-40"></div>
       <div class="skeleton skeleton-block-sm" style="margin-top:8px"></div>`);
    setSk('dash-parcours',
      `<div class="skeleton-card">
         <div class="skeleton skeleton-line sk-w-60"></div>
         <div class="skeleton skeleton-line sk-w-100"></div>
         <div class="skeleton skeleton-block-sm" style="margin-top:8px"></div>
       </div>`);
    setSk('dash-review-preview',
      `<div class="skeleton skeleton-block-md"></div>`);
    setSk('dash-weak-verbs',
      `<div class="skeleton skeleton-block-md"></div>`);
  },

  _renderReal() {
    const data = State.data;

    // 1. Message de bienvenue
    const hour = new Date().getHours();
    let greeting = 'Merhaba !';
    if (hour < 12) greeting = 'Günaydın ! ☀️';
    else if (hour < 18) greeting = 'İyi günler ! 🌤️';
    else greeting = 'İyi akşamlar ! 🌙';
    document.getElementById('greeting-text').textContent = greeting;

    // 2. Stats rapides
    document.getElementById('qs-streak').textContent = data.streak;
    document.getElementById('qs-xp').textContent = data.totalXP;
    document.getElementById('qs-words').textContent = data.reviewQueue.length;
    document.getElementById('qs-chapters').textContent = data.completedChapters.length;

    // 2b. Niveau
    this.renderLevelCard();

    // 3. Objectif journalier
    const pct = Math.min(100, (data.dailyXP / data.dailyGoal) * 100);
    document.getElementById('goal-xp-cur').textContent = data.dailyXP;
    document.getElementById('goal-xp-target').textContent = data.dailyGoal;

    // Ring animé (G5)
    this._animateRing(pct);

    // Animation barre
    document.getElementById('goal-bar-fill').style.width = pct + '%';

    if (pct >= 100) {
      document.getElementById('goal-status').textContent = "Objectif atteint ! 🔥";
      document.getElementById('goal-status').classList.add('text-success');
    } else {
      document.getElementById('goal-status').textContent = `Encore ${data.dailyGoal - data.dailyXP} XP !`;
      document.getElementById('goal-status').classList.remove('text-success');
    }

    // 4. Continuer la leçon en cours
    this.renderContinueCard();

    // 5. Parcours actuel
    this.renderParcoursCard();

    // 6. Révisions en attente
    this.renderReviewPreview();

    // 7. Verbes faibles
    this.renderWeakVerbs();
  },

  // Ring SVG animé de 0 à target (G5)
  _animateRing(targetPct) {
    const ring = document.getElementById('ring-prog');
    const ringPct = document.getElementById('ring-pct');
    if (!ring || !ringPct) return;

    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const setRing = (v) => {
      const offset = 176 - (176 * v / 100);
      ring.style.strokeDashoffset = offset;
      ringPct.textContent = Math.round(v) + '%';
    };

    if (reduced) { setRing(targetPct); return; }

    const duration = 800;
    const start = performance.now();
    const easeOut = t => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeOut(t);
      setRing(targetPct * eased);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  },

  renderLevelCard() {
    const container = document.getElementById('dash-level-card');
    if (!container || !window.Gamification) return;
    const info = Gamification.getLevelInfo(State.data.totalXP || 0);
    const isMax = info.nextXP === null;
    const progressLabel = isMax
      ? 'Niveau maximum 🌙'
      : `${info.currentXP} / ${info.nextXP} XP`;
    const barWidth = isMax ? 100 : info.progress;
    container.innerHTML = `
      <div class="lvl-card-row">
        <div class="lvl-icon">${info.icon}</div>
        <div class="lvl-info">
          <div class="lvl-name">${info.name}</div>
          <div class="lvl-meta">Niveau ${info.level + 1}</div>
        </div>
        <div class="lvl-pct">${isMax ? 'MAX' : info.progress + '%'}</div>
      </div>
      <div class="lvl-bar-track"><div class="lvl-bar-fill" style="width:${barWidth}%"></div></div>
      <div class="lvl-xp-label">${progressLabel}</div>
    `;
  },

  renderContinueCard() {
    const currUId = State.data.currentUnit;
    const currCId = State.data.currentChapter;
    const unit = AppUnits.find(u => u.id === currUId);
    
    if (unit) {
      const chapter = unit.chapters.find(c => c.id === currCId);
      if (chapter) {
        document.getElementById('cc-unit-tag').textContent = `Unité ${unit.id.replace('u', '')}`;
        document.getElementById('cc-title').textContent = unit.title;
        document.getElementById('cc-chapter').textContent = chapter.title;
        // Calcul progression unité
        const completedInUnit = unit.chapters.filter(c => State.isChapterCompleted(c.id)).length;
        const progress = (completedInUnit / unit.chapters.length) * 100;
        document.getElementById('cc-bar-fill').style.width = progress + '%';
      }
    }
  },

  renderParcoursCard() {
    const container = document.getElementById('dash-parcours');
    if (!container) return;

    const currUId = State.data.currentUnit;
    const unit = AppUnits.find(u => u.id === currUId);
    if (!unit) { container.innerHTML = ''; return; }

    const completedInUnit = unit.chapters.filter(c => State.isChapterCompleted(c.id)).length;
    const totalInUnit = unit.chapters.length;
    const pct = Math.round((completedInUnit / totalInUnit) * 100);
    const pendingChapters = unit.chapters.filter(c => !State.isChapterCompleted(c.id)).slice(0, 3);

    const chapList = pendingChapters.map((ch, i) => {
      const isNext = i === 0;
      return `
        <div class="parc-chap-item${isNext ? ' parc-chap-next' : ''}" onclick="event.stopPropagation();App.navigate('#lesson/${ch.id}')">
          <span class="parc-chap-dot${isNext ? ' dot-active' : ''}"></span>
          <span class="parc-chap-title">${ch.title}</span>
          ${isNext ? '<span class="parc-chap-badge">Commencer →</span>' : ''}
        </div>
      `;
    }).join('');

    const unitNum = unit.id.replace('u', '');
    container.innerHTML = `
      <div class="parc-unit-card" onclick="App.navigate('#units')" style="--unit-color:${unit.color || 'var(--primary)'}">
        <div class="parc-unit-header">
          <div class="parc-unit-icon">${unit.icon || '📘'}</div>
          <div class="parc-unit-info">
            <div class="parc-unit-num">Unité ${unitNum}</div>
            <div class="parc-unit-title">${unit.title}</div>
          </div>
          <div class="parc-unit-pct">${pct}%</div>
        </div>
        <div class="parc-prog-track"><div class="parc-prog-fill" style="width:${pct}%"></div></div>
        ${pendingChapters.length > 0
          ? `<div class="parc-chapters-list">${chapList}</div>`
          : '<div class="parc-all-done">Unité complétée !</div>'}
      </div>
    `;
  },

  renderWeakVerbs() {
    const container = document.getElementById('dash-weak-verbs');
    if (!container || !window.SRS) return;
    const weakItems = SRS.getWeakItems(3).filter(i => i.type === 'verb');
    if (weakItems.length === 0) {
      container.innerHTML = `<div class="empty-state-sm"><span>💪</span>Continuez les leçons pour identifier vos points faibles.</div>`;
      return;
    }
    container.innerHTML = weakItems.map(item => {
      const verb = window.AppVerbs && AppVerbs.find(v => v.id === item.id);
      if (!verb) return '';
      const rate = Math.round(((item.failures || 0) / Math.max(1, (item.successes || 0) + (item.failures || 0))) * 100);
      return `
        <div class="list-item" onclick="App.navigate('#verbs')">
          <div class="li-left">
            <div class="li-tr">${verb.infinitive}</div>
            <div class="li-fr">${verb.fr}</div>
          </div>
          <div style="font-size:11px;font-weight:700;color:var(--error)">${rate}% erreur</div>
        </div>
      `;
    }).join('');
  },

  renderReviewPreview() {
    const dueItems = window.SRS ? window.SRS.getDueItems() : [];
    const container = document.getElementById('dash-review-preview');
    
    if (dueItems.length === 0) {
      container.innerHTML = `<div class="empty-state-sm"><span>🎯</span> Aucune révision pour l'instant — continuez les leçons !</div>`;
    } else {
      container.innerHTML = `
        <div class="card card-glow" style="cursor:pointer;" onclick="App.navigate('#review')">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="qs-icon">🧠</div>
              <div>
                <div class="font-bold">${dueItems.length} mots à revoir</div>
                <div class="text-xs text-muted">La répétition consolide la mémoire.</div>
              </div>
            </div>
            <button class="btn btn-primary btn-sm">Réviser</button>
          </div>
        </div>
      `;
    }
  }
};
