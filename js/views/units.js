/* ═══════════════════════════════════════════════
   TürkçeYol — units.js
   Vue du parcours (Liste des unités et chapitres)
   ═══════════════════════════════════════════════ */

window.Units = {
  render() {
    const container = document.getElementById('units-list');
    container.innerHTML = '';

    let totalChapters = 0;
    let completedTotal = 0;
    let isPreviousUnitCompleted = true; // La première unité est toujours débloquée

    AppUnits.forEach((unit, uIdx) => {
      totalChapters += unit.chapters.length;
      let completedInUnit = 0;

      // HTML pour les chapitres
      let chaptersHtml = '';
      let isPreviousChapterCompleted = true; // Le premier chapitre de l'unité active est débloqué
      let hasActiveInUnit = false;

      unit.chapters.forEach((chap, cIdx) => {
        const isCompleted = State.isChapterCompleted(chap.id);
        if (isCompleted) { completedInUnit++; completedTotal++; }
        
        // Un chapitre est débloqué si le précédent est terminé (ou si c'est le 1er du parcours autorisé)
        const isUnlocked = isPreviousUnitCompleted && isPreviousChapterCompleted;
        const isActive = isUnlocked && !isCompleted;
        if (isActive) hasActiveInUnit = true;

        let statusIcon = '🔒';
        if (isCompleted) statusIcon = '✓';
        else if (isActive) statusIcon = '▶';

        chaptersHtml += `
          <div class="chapter-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active-chapter' : ''} ${!isUnlocked ? 'locked' : ''}" 
               onclick="${isUnlocked ? `Units.startChapter('${unit.id}', '${chap.id}')` : ''}">
            <div class="chapter-status-ico">${statusIcon}</div>
            <div class="chapter-info">
              <div class="chapter-title">${cIdx + 1}. ${chap.title}</div>
              <div class="chapter-goal">${chap.goal}</div>
            </div>
            <div class="chapter-xp">+${chap.xpReward}</div>
          </div>
        `;
        
        isPreviousChapterCompleted = isCompleted;
      });

      // HTML pour l'Unité
      const unitProgress = Math.round((completedInUnit / unit.chapters.length) * 100);
      const isUnitCompleted = completedInUnit === unit.chapters.length;
      const isUnitLocked = !isPreviousUnitCompleted;

      const unitHtml = `
        <div class="unit-card animate-slide-up stagger-${(uIdx%8)+1} ${isUnitCompleted ? 'completed' : ''} ${hasActiveInUnit ? 'active-unit' : ''} ${isUnitLocked ? 'locked' : ''}">
          <div class="unit-header">
            <div class="unit-icon">
              ${unit.icon}
              <div class="unit-icon-ring" style="border-color: ${isUnitCompleted ? 'var(--success)' : (hasActiveInUnit ? 'var(--primary)' : 'var(--surface-3)')}"></div>
            </div>
            <div class="unit-info">
              <div class="unit-meta">
                <span class="unit-num">Unité ${uIdx + 1}</span>
                <span class="unit-prog-text">${completedInUnit}/${unit.chapters.length}</span>
              </div>
              <div class="unit-title">${unit.title}</div>
              <div class="unit-desc">${unit.description}</div>
            </div>
          </div>
          <div class="chapter-list">
            ${chaptersHtml}
          </div>
        </div>
      `;
      
      container.innerHTML += unitHtml;
      isPreviousUnitCompleted = isUnitCompleted;
    });

    // Maj barre globale
    document.getElementById('global-prog-label').textContent = `${completedTotal} / ${totalChapters} chapitres`;
    document.getElementById('global-prog-fill').style.width = ((completedTotal / totalChapters) * 100) + '%';
  },

  startChapter(unitId, chapterId) {
    State.setCurrentChapter(unitId, chapterId);
    App.navigate(`#lesson/${unitId}_${chapterId}`);
  }
};
