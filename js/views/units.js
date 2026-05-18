/* ═══════════════════════════════════════════════
   TürkçeYol — units.js (Vue)
   Écran Parcours — redesign premium mobile-first
   ═══════════════════════════════════════════════ */

window.Units = {
  render() {
    const container = document.getElementById('units-list');
    container.innerHTML = '';

    let totalChapters = 0, completedTotal = 0;
    let isPrevUnitDone = true;

    // Trouver le prochain chapitre non terminé pour le "Next Up"
    let nextChapter = null, nextUnit = null;
    for (const u of AppUnits) {
      for (const c of u.chapters) {
        if (!State.isChapterCompleted(c.id)) {
          nextChapter = c; nextUnit = u; break;
        }
      }
      if (nextChapter) break;
    }

    AppUnits.forEach((unit, uIdx) => {
      totalChapters += unit.chapters.length;
      let completedInUnit = 0;
      let isPrevChapDone = true;
      let chapHtml = '';

      unit.chapters.forEach((chap, cIdx) => {
        const isDone = State.isChapterCompleted(chap.id);
        if (isDone) { completedInUnit++; completedTotal++; }

        const isUnlocked = isPrevUnitDone && isPrevChapDone;
        const isNext = nextChapter && chap.id === nextChapter.id;

        let statusClass = 'ch-locked';
        let iconHtml = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
        if (isDone) {
          statusClass = 'ch-done';
          iconHtml = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg>`;
        } else if (isNext) {
          statusClass = 'ch-next';
          iconHtml = `<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M8 5v14l11-7z"/></svg>`;
        } else if (isUnlocked) {
          statusClass = 'ch-available';
          iconHtml = `<span style="font-size:11px;font-weight:700">${cIdx + 1}</span>`;
        }

        const timeLabel = chap.time ? `${chap.time} min` : '';
        const clickable = isUnlocked && !isDone ? `onclick="Units.startChapter('${unit.id}','${chap.id}')"` : '';
        const cursorClass = (isUnlocked && !isDone) ? 'ch-clickable' : '';

        chapHtml += `
          <div class="ch-item ${statusClass} ${cursorClass}" ${clickable}>
            <div class="ch-icon-wrap"><div class="ch-icon ${statusClass}-icon">${iconHtml}</div></div>
            <div class="ch-info">
              <div class="ch-title">${chap.title}</div>
              <div class="ch-goal">${chap.goal}</div>
            </div>
            <div class="ch-meta">
              ${timeLabel ? `<span class="ch-time">${timeLabel}</span>` : ''}
              <span class="ch-xp">+${chap.xpReward}</span>
            </div>
          </div>
        `;

        isPrevChapDone = isDone;
      });

      const pct = Math.round((completedInUnit / unit.chapters.length) * 100);
      const isUnitDone = completedInUnit === unit.chapters.length;
      const isLocked = !isPrevUnitDone;
      const isActive = !isLocked && !isUnitDone;
      const unitColor = unit.color || 'var(--primary)';

      const unitHtml = `
        <div class="unit-card2 ${isUnitDone ? 'unit-done' : ''} ${isActive ? 'unit-active' : ''} ${isLocked ? 'unit-locked' : ''}">
          <div class="unit-accent-bar" style="background:${unitColor}"></div>
          <div class="unit-header2">
            <div class="unit-icon2" style="border-color:${unitColor}22;background:${unitColor}14">
              <span style="font-size:1.6rem">${unit.icon}</span>
              ${isUnitDone ? `<div class="unit-done-ring" style="border-color:var(--success)"></div>` : ''}
            </div>
            <div class="unit-info2">
              <div class="unit-num2">Unité ${uIdx + 1}${isUnitDone ? ' · Terminé ✓' : ''}</div>
              <div class="unit-title2">${unit.title}</div>
              <div class="unit-desc2">${unit.description}</div>
              <div class="unit-prog-row">
                <div class="unit-prog-track2"><div class="unit-prog-fill2" style="width:${pct}%;background:${unitColor}"></div></div>
                <span class="unit-prog-pct">${completedInUnit}/${unit.chapters.length}</span>
              </div>
            </div>
          </div>
          <div class="unit-chapters-wrap">${chapHtml}</div>
        </div>
      `;

      container.innerHTML += unitHtml;
      isPrevUnitDone = isUnitDone;
    });

    // Barre de progression globale
    document.getElementById('global-prog-label').textContent = `${completedTotal} / ${totalChapters} chapitres`;
    document.getElementById('global-prog-fill').style.width = ((completedTotal / totalChapters) * 100) + '%';
  },

  startChapter(unitId, chapterId) {
    State.setCurrentChapter(unitId, chapterId);
    App.navigate(`#lesson/${chapterId}`);
  }
};
