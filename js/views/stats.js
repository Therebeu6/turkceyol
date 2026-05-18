/* ═══════════════════════════════════════════════
   TürkçeYol — stats.js + Daily + Settings
   ═══════════════════════════════════════════════ */

window.Stats = {
  render() {
    const d = State.data;
    const container = document.getElementById('stats-body');

    // Activité des 7 derniers jours
    const activityHtml = this._buildActivityRow();
    // Stats des temps verbaux
    const tenseHtml = this._buildTenseStats();
    // Items SRS par niveau de maîtrise
    const masteryHtml = this._buildMasteryBreakdown();

    const fragileItems = window.SRS ? SRS.getFragileItems(5) : [];
    const topicHtml = this._buildTopicRetention();
    const fragileHtml = fragileItems.length > 0 ? this._buildFragileWarning(fragileItems) : '';

    container.innerHTML = `
      <!-- Chiffres clés -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-val text-primary">${d.totalXP}</div>
          <div class="stat-lbl">XP Total</div>
        </div>
        <div class="stat-card">
          <div class="stat-val" style="color:var(--gold)">🔥 ${d.streak}</div>
          <div class="stat-lbl">Jours de suite</div>
        </div>
        <div class="stat-card">
          <div class="stat-val text-success">${d.completedChapters.length}</div>
          <div class="stat-lbl">Chapitres</div>
        </div>
        <div class="stat-card">
          <div class="stat-val" style="color:var(--secondary)">Niv. ${d.level}</div>
          <div class="stat-lbl">${window.Gamification ? Gamification.getLevelName(d.level) : ''}</div>
        </div>
      </div>

      <!-- Alerte items fragiles -->
      ${fragileHtml}

      <!-- Activité -->
      <div class="section-row"><span class="section-lbl">Activité (7 jours)</span></div>
      <div class="card mb-4">${activityHtml}</div>

      <!-- Conjugaison par temps -->
      ${tenseHtml}

      <!-- Maîtrise du vocabulaire -->
      ${masteryHtml}

      <!-- Rétention par thème -->
      ${topicHtml}

      <!-- Badges -->
      <div class="section-row"><span class="section-lbl">Badges</span></div>
      <div class="badges-grid">
        ${AppAchievements.map(ach => {
          const unlocked = d.achievementIds.includes(ach.id);
          return `
            <div class="badge-card ${unlocked ? 'badge-unlocked' : 'badge-locked'}">
              <div class="badge-icon">${ach.icon}</div>
              <div class="badge-name">${ach.title}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  _buildActivityRow() {
    const today = new Date();
    const days = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
    let html = '<div class="activity-row">';
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split('T')[0];
      const hasActivity = !!(State.data.heatmap && State.data.heatmap[key]);
      const isToday = i === 0;
      html += `
        <div class="activity-day">
          <div class="act-dot ${hasActivity ? 'act-active' : ''} ${isToday ? 'act-today' : ''}"></div>
          <div class="act-label">${days[d.getDay()]}</div>
        </div>
      `;
    }
    html += '</div>';
    return html;
  },

  _buildTenseStats() {
    const ts = State.data.tenseStats || {};
    const tenses = [
      { key: 'present', label: 'Présent (-iyor)', color: 'var(--primary)' },
      { key: 'past',    label: 'Passé (-di)',     color: 'var(--secondary)' },
      { key: 'future',  label: 'Futur (-ecek)',   color: 'var(--success)' }
    ];

    const hasData = tenses.some(t => ts[t.key] && ts[t.key].total > 0);
    if (!hasData) {
      return `
        <div class="section-row"><span class="section-lbl">Conjugaison</span></div>
        <div class="empty-state-sm"><span>⚡</span>Faites des leçons de conjugaison pour voir vos stats !</div>
      `;
    }

    const rows = tenses.map(t => {
      const stat = ts[t.key] || { correct: 0, total: 0 };
      const pct = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
      return `
        <div class="tense-stat-row">
          <div class="tense-stat-label">${t.label}</div>
          <div class="tense-stat-bar-wrap">
            <div class="tense-stat-bar" style="width:${pct}%;background:${t.color}"></div>
          </div>
          <div class="tense-stat-pct" style="color:${t.color}">${pct}%</div>
          <div class="tense-stat-count">${stat.correct}/${stat.total}</div>
        </div>
      `;
    }).join('');

    return `
      <div class="section-row"><span class="section-lbl">Conjugaison</span></div>
      <div class="card mb-4">${rows}</div>
    `;
  },

  _buildFragileWarning(items) {
    const rows = items.map(item => {
      const word = window.AppVocabulary && AppVocabulary.find(w => w.id === item.id);
      const verb = window.AppVerbs && AppVerbs.find(v => v.id === item.id);
      const label = word ? `${word.tr} — ${word.fr}` : (verb ? `${verb.infinitive}` : item.id);
      const fails = item.consecutiveFails || 0;
      return `<div class="fragile-row"><span class="fragile-label">${label}</span><span class="fragile-fails">${fails}✗</span></div>`;
    }).join('');
    return `
      <div class="section-row"><span class="section-lbl" style="color:var(--warning)">⚠ À retravailler</span></div>
      <div class="card mb-4" style="border-color:rgba(245,158,11,0.3)">${rows}</div>
    `;
  },

  _buildTopicRetention() {
    if (!window.SRS) return '';
    const stats = SRS.getVocabTopicStats();
    const entries = Object.entries(stats).filter(([, s]) => s.total >= 3);
    if (entries.length === 0) return '';

    const labels = {
      base: 'Base', salutations: 'Salutations', famille: 'Famille', nourriture: 'Nourriture',
      lieux: 'Lieux', transport: 'Transport', couleurs: 'Couleurs', metiers: 'Métiers',
      temps: 'Temps', nombres: 'Nombres', nationalites: 'Nationalités', directions: 'Directions',
      vetements: 'Vêtements', urgences: 'Urgences', communication: 'Communication',
      meteo: 'Météo', corps: 'Corps', sante: 'Santé', locatifs: 'Locatifs', chunks: 'Expressions'
    };

    const rows = entries
      .sort((a, b) => b[1].total - a[1].total)
      .map(([topic, s]) => {
        const pct = Math.round((s.mastered / s.total) * 100);
        const color = pct >= 70 ? 'var(--success)' : pct >= 40 ? 'var(--primary)' : 'var(--warning)';
        return `
          <div class="tense-stat-row">
            <div class="tense-stat-label">${labels[topic] || topic}</div>
            <div class="tense-stat-bar-wrap">
              <div class="tense-stat-bar" style="width:${pct}%;background:${color}"></div>
            </div>
            <div class="tense-stat-pct" style="color:${color}">${pct}%</div>
            <div class="tense-stat-count">${s.mastered}/${s.total}</div>
          </div>
        `;
      }).join('');

    return `
      <div class="section-row"><span class="section-lbl">Vocabulaire par thème</span></div>
      <div class="card mb-4">${rows}</div>
    `;
  },

  _buildMasteryBreakdown() {
    const queue = State.data.reviewQueue || [];
    if (queue.length === 0) return '';

    const levels = [0, 1, 2, 3, 4, 5];
    const counts = levels.map(l =>
      queue.filter(i => (window.SRS ? SRS.getMasteryLevel(i) : 0) === l).length
    );
    const total = queue.length;
    const labels = ['Nouveau', 'Faible', 'Moyen', 'Bien', 'Fort', 'Expert'];
    const colors = ['var(--text-3)', 'var(--error)', 'var(--warning)', 'var(--primary)', 'var(--secondary)', 'var(--success)'];

    const bars = levels.map((l, i) => {
      if (counts[i] === 0) return '';
      const w = Math.round((counts[i] / total) * 100);
      return `
        <div class="mastery-row">
          <div class="mastery-lbl" style="color:${colors[i]}">${labels[i]}</div>
          <div class="mastery-bar-wrap"><div class="mastery-bar-fill" style="width:${w}%;background:${colors[i]}"></div></div>
          <div class="mastery-count">${counts[i]}</div>
        </div>
      `;
    }).join('');

    return `
      <div class="section-row"><span class="section-lbl">Maîtrise · ${total} mots</span></div>
      <div class="card mb-4">${bars}</div>
    `;
  }
};

window.Daily = {
  render() {
    const xp = State.data.dailyXP || 0;
    const goal = State.data.dailyGoal || 50;
    const done = xp >= goal;
    const pct = Math.min(100, Math.round((xp / goal) * 100));

    document.getElementById('daily-body').innerHTML = `
      <div class="card mb-4" style="text-align:center;padding:var(--s6)">
        <div style="font-size:3rem;margin-bottom:var(--s3)">${done ? '🏆' : '⚡'}</div>
        <h2 style="font-size:var(--text-xl);font-weight:800;margin-bottom:var(--s2)">
          ${done ? 'Défi du jour réussi !' : 'Défi du jour'}
        </h2>
        <p style="color:var(--text-2);margin-bottom:var(--s4)">
          ${done ? 'Objectif atteint ! Continuez pour consolider vos acquis.'
                 : `Gagnez ${goal - xp} XP de plus pour valider votre défi.`}
        </p>
        ${!done ? `<button class="btn btn-primary btn-full" onclick="App.navigate('#units')">Continuer les leçons →</button>` : ''}
      </div>
      <div class="card">
        <div class="section-lbl" style="margin-bottom:var(--s3)">Objectif journalier · ${xp} / ${goal} XP</div>
        <div style="display:flex;align-items:center;gap:var(--s3)">
          <div class="goal-bar-track" style="flex:1"><div class="goal-bar-fill" style="width:${pct}%"></div></div>
          <div style="font-size:var(--text-sm);font-weight:700;color:var(--primary)">${pct}%</div>
        </div>
      </div>
    `;
  }
};

window.Settings = {
  render() {
    const s = State.data.settings || {};
    document.getElementById('settings-body').innerHTML = `
      <div class="card mb-4">
        <div class="settings-row">
          <div>
            <div class="settings-label">Effets sonores</div>
            <div class="settings-sub">Sons lors des exercices</div>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" ${s.soundEffects !== false ? 'checked' : ''}
                   onchange="State.updateSetting('soundEffects', this.checked)">
            <span class="toggle-slider"></span>
          </label>
        </div>
        <div class="settings-row">
          <div>
            <div class="settings-label">Rappels quotidiens</div>
            <div class="settings-sub">Notification de révision</div>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" ${s.dailyReminder !== false ? 'checked' : ''}
                   onchange="State.updateSetting('dailyReminder', this.checked)">
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>

      <div class="card mb-4">
        <div class="settings-label" style="margin-bottom:var(--s3)">Sauvegarde</div>
        <button class="btn btn-ghost btn-full mb-2" onclick="State.exportData()">📤 Exporter ma progression</button>
        <label class="btn btn-ghost btn-full" style="cursor:pointer">
          📥 Importer une sauvegarde
          <input type="file" accept=".json" style="display:none" onchange="State.importData(event)">
        </label>
      </div>

      <div class="card">
        <button class="btn btn-full" style="background:var(--error-bg);color:var(--error);border:1px solid rgba(239,68,68,0.3)"
                onclick="if(confirm('Effacer toute la progression ?')) State.resetAllData()">
          🗑️ Réinitialiser la progression
        </button>
      </div>
    `;
  }
};
