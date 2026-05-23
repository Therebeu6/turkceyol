# TürkçeYol — ROADMAP v3

> Feuille de route pour la prochaine upgrade majeure.
> Chaque tâche est autonome : suffisamment précise pour être donnée à une session isolée sans contexte supplémentaire.

---

## État actuel (post-V2, mai 2026)

### Données
| Ressource | Quantité | Fichier |
|---|---|---|
| Mots de vocabulaire | 261 entrées | `js/data/vocabulary.js` |
| Verbes | 20 (avec conjugaisons présent/passé/futur + négations + exemples) | `js/data/verbs.js` |
| Phrases utiles | 27 | `js/data/phrases.js` |
| Dialogues | 17 | `js/data/dialogues.js` |
| Unités | 14 (u1–u14) | `js/data/units.js` |
| Chapitres | 55 | `js/data/units.js` |
| Règles de grammaire | 3 seulement | `js/data/grammar.js` |
| Badges/achievements | 6 | `js/data/achievements.js` |

### Moteur
- **SRS** : Leitner à 6 paliers `[1, 3, 7, 14, 30, 90]` jours. Suivi `consecutiveFails` (forçage J+1 si ≥ 2 échecs consécutifs). `getWeakItems`, `getFragileItems`, `getVocabTopicStats` présents. Pas de qualité de réponse (SM-2 style), pas d'intervalles fractionnaires.
- **Exercices** : 4 types — QCM TR→FR, QCM FR→TR, input FR→TR, verb_fill (QCM conjugaison). Distracteurs intelligents par topic/type. Exemples contextuels dans les hints de conjugaison (verb.examples[]).
- **Gamification** : XP, streak, niveaux (4 paliers: Débutant/Voyageur/Explorateur/Aventurier), 6 badges dont seulement 2 conditions évaluées réellement (streak et words_learned). Confetti canvas opérationnel (120 particules, 2.8s).
- **TTS** : Google Translate Plan A + speechSynthesis Plan B. **Ne jamais toucher `js/app.js` lignes TTS.**

### Vues disponibles
Dashboard, Parcours (Units), Leçon (Lesson), Révision (Review), Verbes, Vocabulaire, Phrases, Dialogues, Stats, Daily, Settings.

### Bugs connus
- `review.js` : pas de flag `_answered` → double-réponse possible (même bug que lesson.js, déjà corrigé dans lesson).
- `achievements.js` : conditions `words_mastered`, `unit_completed`, `verbs_mastered` non évaluées dans `gamification.js`.

---

## AXE 1 — Contenu (vocabulaire, verbes, expressions)

### Constat
261 mots couvrent environ 35–40% du vocabulaire A1 turc CEFR (objectif : 600–700 mots pour A1 solide). Catégories absentes ou trop minces : corps humain étendu, vie quotidienne (maison, pièces), école/travail, transports détaillés, émotions, opposés, animaux, nature. 20 verbes sur les ~80 essentiels A1-A2.

### Ce qui manque

**Vocabulaire (catégories absentes)**
- Maison & mobilier : chambre, cuisine, salon, table, chaise, lit, fenêtre, porte…
- Émotions : heureux, triste, fatigué, fâché, surpris, inquiet…
- Animaux courants : chien, chat, oiseau, poisson, cheval…
- Nature & météo étendue : mer, montagne, forêt, fleuve, neige, vent, nuage…
- École/travail : stylo, livre, cahier, bureau, professeur, étudiant, réunion…
- Nourriture étendue : viande, poisson, légumes (tomate, concombre, oignon), dessert…
- Adjectifs opposés : grand/petit, chaud/froid, rapide/lent, fort/faible, propre/sale…
- Nombres avancés : ordinaux (premier, deuxième…), fractions, pourcentages

**Verbes manquants (A1-A2 essentiels)**
- Manger (yemek), boire (içmek), dormir (uyumak ✓), se lever (kalkmak ✓), aimer (sevmek ✓)
- Pouvoir (yapabilmek), devoir (zorunda olmak), vouloir (istemek ✓), savoir (bilmek ✓)
- Parler (konuşmak), entendre (duymak), voir (görmek), chercher (aramak)
- Ouvrir (açmak), fermer (kapatmak), acheter (almak ✓), vendre (satmak), payer (ödemek)
- Penser (düşünmek), comprendre (anlamak), expliquer (açıklamak), aider (yardım etmek)

**Phrases utiles** : 27 phrases insuffisantes. Manquent : demander son chemin, réserver, urgences médicales, transports, hébergement.

### Checklist

- [ ] **Vocab — Maison & mobilier** (+20 mots, topic `maison`) — `js/data/vocabulary.js` + nouveaux chapitres dans `js/data/units.js` — **M**
- [ ] **Vocab — Émotions** (+15 mots, topic `emotions`) — `js/data/vocabulary.js` — **S**
- [ ] **Vocab — Animaux** (+12 mots, topic `animaux`) — `js/data/vocabulary.js` — **S**
- [ ] **Vocab — Adjectifs opposés** (+20 mots, topic `adjectifs`, paires FR/TR liées) — `js/data/vocabulary.js` — **S**
- [ ] **Vocab — Nourriture étendue** (+20 mots, topic `nourriture`) — `js/data/vocabulary.js` — **S**
- [ ] **Vocab — École/travail** (+15 mots, topic `travail`) — `js/data/vocabulary.js` — **S**
- [ ] **Verbes — lot A** : konuşmak, duymak, görmek, aramak, açmak, kapatmak — `js/data/verbs.js` (structure identique aux 20 existants : conjugaisons 3 temps + négations.present + 3 examples[]) — **M**
- [ ] **Verbes — lot B** : düşünmek, anlamak, satmak, ödemek, yapabilmek (forme modale) — `js/data/verbs.js` — **M**
- [ ] **Phrases utiles** : +30 phrases (transports, hôtel, urgences médicales, directions détaillées) topics `transport`, `hotel`, `urgences`, `directions` — `js/data/phrases.js` — **M**
- [ ] **Grammaire** : réécrire `grammar.js` avec 15+ règles structurées (harmonie vocalique mineure, pluriel -lar/-ler, cas locatif -da/-de, cas directionnel -a/-e, cas ablatif -dan/-den, suffixe de question -mi, structure négative -me/-ma) — `js/data/grammar.js` + `js/views/grammar.js` à créer — **L**
- [ ] **Champs enrichis** : ajouter champ `example` (phrase exemple) sur tous les mots vocabulary.js qui n'en ont pas encore — `js/data/vocabulary.js` — **L**
- [ ] **Nouveaux chapitres** : créer u15 "Maison & quotidien", u16 "Émotions & états" dans `js/data/units.js` avec leurs vocabIds/verbIds — **M**

---

## AXE 2 — Nouveaux types d'exercices

### Constat
`js/engine/exercises.js` génère 4 types : `qcm` (TR→FR), `qcm` (FR→TR), `input` (FR→TR saisie libre), `qcm` subtype `verb_fill`. `js/views/lesson.js` et `js/views/review.js` ne savent afficher que ces types. Aucun exercice actif de production (construction de phrase), aucun cloze, aucun matching.

### Nouveaux types à créer

**Type `cloze`** — Phrase à trous : "Ben her sabah _____ içiyorum." → réponse : "çay". Question générée depuis `examples[]` des verbes ou depuis `AppPhrases`. Options : 4 mots dont 3 distracteurs sémantiquement proches.

**Type `word_order`** — Remettre les mots dans l'ordre : mots d'une phrase mélangés, cliquer dans le bon ordre (SOV turc). Ex : `["çay", "Ben", "içiyorum"]` → "Ben çay içiyorum."

**Type `match_pairs`** — Associer 4 paires TR↔FR par drag/tap. Utile pour revoir un lot de mots rapidement.

**Type `true_false`** — Phrase turque affichée, traduction proposée, vrai ou faux ? Ex : "Merhaba = Bonsoir ?" → Faux. Génération automatique : 50% vraie traduction, 50% traduction d'un autre mot du même topic.

**Type `audio_qcm`** — TTS joue un mot turc (App.playTTS), 4 options en FR. Réutilise le TTS existant, aucune dépendance externe.

### Checklist

- [ ] **Type `cloze`** : dans `exercises.js`, ajouter `createCloze(phrase)` qui découpe une phrase-exemple et masque un mot clé. Dans `lesson.js` et `review.js`, ajouter le rendu HTML du type `cloze` (input avec suggestion ou QCM 4 options). — `js/engine/exercises.js`, `js/views/lesson.js`, `js/views/review.js` — **M**
- [ ] **Type `word_order`** : dans `exercises.js`, ajouter `createWordOrder(phrase)`. Dans `lesson.js`, rendu avec boutons de mots cliquables qui s'ajoutent à une zone de réponse. Validation par comparaison de tableau. — `js/engine/exercises.js`, `js/views/lesson.js`, `css/components.css` — **L**
- [ ] **Type `match_pairs`** : dans `exercises.js`, ajouter `createMatchPairs(words[4])`. Dans `lesson.js`, rendu 2 colonnes tap-to-match avec highlight. Score : 1 point par paire correcte. — `js/engine/exercises.js`, `js/views/lesson.js`, `css/components.css` — **L**
- [ ] **Type `true_false`** : dans `exercises.js`, ajouter `createTrueFalse(word)`. Dans `lesson.js`, rendu 2 boutons VRAI/FAUX. — `js/engine/exercises.js`, `js/views/lesson.js` — **S**
- [ ] **Type `audio_qcm`** : dans `exercises.js`, ajouter `createAudioQCM(word)` qui retourne un QCM standard avec `audioTr: word.tr`. Dans `lesson.js`, remplacer la question texte par un bouton play + icône son, appel `App.playTTS(exo.audioTr)` au chargement. — `js/engine/exercises.js`, `js/views/lesson.js` — **S**
- [ ] **Intégration dans `generateForChapter`** : mixer les nouveaux types dans la génération (cloze si verbes avec examples[], true_false pour vocab, audio_qcm 1 fois sur 5). — `js/engine/exercises.js` — **M**
- [ ] **Fix review.js** : ajouter flag `_answered` dans `Review._checkAnswer()` identique au fix de `lesson.js`. — `js/views/review.js` — **S**
- [ ] **Affichage type dans lesson/review** : ajouter `exo-type-label` spécifique pour chaque nouveau type (🧩 Compléter, 🔀 Ordonner, 🔗 Associer, ✓✗ Vrai/Faux, 🔊 Écouter). — `js/views/lesson.js`, `js/views/review.js` — **S**

---

## AXE 3 — SRS plus intelligent

### Constat
`js/engine/srs.js` implémente Leitner basique : réussite → step+1, échec → step-1, intervalles fixes `[1, 3, 7, 14, 30, 90]`. Ajouts récents : `consecutiveFails` (forçage J+1), `getFragileItems`, `getVocabTopicStats`. Manque : qualité de réponse graduée (SM-2), intervalles calculés dynamiquement, séparation vocab/verbes dans les priorités, planification intelligente du nombre d'items/session.

### Ce qui manque vs. SM-2

SM-2 note la réponse de 0 à 5 (pas binaire succès/échec) et calcule `nextInterval = lastInterval × EasinessFactor`. L'implémentation actuelle est binaire. Migrer vers qualité de réponse permettrait : révisions plus fréquentes pour les items difficiles, moins pour les faciles.

### Checklist

- [ ] **Qualité de réponse** : remplacer le booléen `success` par un score `quality` (0=blank, 1=wrong, 2=wrong-hint, 3=correct-hard, 4=correct, 5=correct-easy). Dans `lesson.js` et `review.js`, mapper : réponse correcte rapide → 4, après hésitation → 3, faux → 1. — `js/engine/srs.js`, `js/views/lesson.js`, `js/views/review.js` — **L**
- [ ] **EasinessFactor** : ajouter champ `ef` (easiness factor, init 2.5) par item. Recalculer après chaque réponse : `ef = ef + (0.1 - (5-q)×(0.08+(5-q)×0.02))`, plancher à 1.3. — `js/engine/srs.js` — **M**
- [ ] **Intervalles dynamiques** : remplacer `this.intervals[item.step]` par `Math.round(item.ef × lastInterval)` (avec lastInterval stocké dans l'item). — `js/engine/srs.js` — **M**
- [ ] **Session sizing** : ajouter `getSessionItems(maxNew=5, maxReview=15)` qui retourne un mix optimal : items dus triés par urgence + nouveaux items triés par difficulté. — `js/engine/srs.js` — **M**
- [ ] **Priorité par type** : dans `getDueItems()`, trier par `(today - nextReview)` décroissant (les plus en retard d'abord) puis par `consecutiveFails` décroissant. — `js/engine/srs.js` — **S**
- [ ] **Stats enrichies** : ajouter `getRetentionRate()` (% items step≥3 sur total), `getAverageEF()`, `getProjectedDueCount(days=7)`. Exposer dans `stats.js`. — `js/engine/srs.js`, `js/views/stats.js` — **M**

---

## AXE 4 — Gamification réelle

### Constat
XP et streak fonctionnels. 4 niveaux trop peu différenciés. 6 badges dont 4 conditions jamais évaluées (`words_mastered`, `verbs_mastered`, `unit_completed`, `vocab_50`). Pas de système de combo (réponses consécutives correctes). Pas de sons de feedback. Daily challenge basique. Confetti opérationnel.

### Checklist

- [ ] **Fix achievements** : implémenter les 4 conditions manquantes dans `gamification.js` : `words_mastered` (items SRS step≥3), `verbs_mastered` (verbes step≥3), `unit_completed` (via `State.data.completedChapters`), `vocab_50`. — `js/engine/gamification.js` — **S**
- [ ] **Nouveaux badges** : ajouter dans `achievements.js` : 🗓 Régulier (streak 14j), 🏆 Expert (streak 30j), 🎯 Perfectionniste (3 leçons à 100%), 📖 Lecteur (5 dialogues lus), 🌍 Voyageur (unité transport terminée), ⚡ Série (combo 10 réponses). — `js/data/achievements.js` + `js/engine/gamification.js` — **M**
- [ ] **Système de combo** : dans `lesson.js`, tracker `_comboCount` (incrémenté à chaque bonne réponse, remis à 0 à chaque erreur). Afficher un badge flottant "🔥 ×3 Combo !" à partir de 3. Bonus XP : +2 par réponse en combo. — `js/views/lesson.js`, `css/components.css` — **M**
- [ ] **Sons de feedback** (Web Audio API, aucune dépendance) : créer `js/engine/audio.js` avec `AudioEngine.playCorrect()` (bip court 880Hz, 80ms), `AudioEngine.playWrong()` (bip grave 220Hz, 150ms avec fade), `AudioEngine.playLevelUp()` (accord ascendant). Déclencher depuis `lesson.js`. Respecter `State.data.settings.soundEffects`. — `js/engine/audio.js` (nouveau), `js/views/lesson.js`, `js/views/settings.js` — **M**
- [ ] **Niveaux enrichis** : passer de 4 à 10 niveaux dans `gamification.js`. Paliers : 0/100/300/600/1000/1500/2500/4000/6000/10000 XP. Noms : Merhaba → Öğrenci → Konuşan → Gezgin → Kaşif → Bilge → Usta → Şair → Üstat → Osmanlı. Afficher l'XP next level dans le dashboard. — `js/engine/gamification.js`, `js/views/dashboard.js`, `js/state.js` — **M**
- [ ] **Daily challenge amélioré** : remplacer la vue `daily.js` (actuelle = simple barre XP) par un vrai défi quotidien : 5 items sélectionnés par le SRS (les plus urgents + 1 nouveau), affiché comme une mini-leçon, avec récompense XP bonus ×1.5. — `js/views/daily.js`, `js/engine/exercises.js` — **L**
- [ ] **Streak protection** : ajouter un "freeze de streak" (1 utilisation gratuite) déblocable à streak ≥ 7j. Stocker `State.data.streakFreezes`. — `js/state.js`, `js/views/settings.js` — **M**

---

## AXE 5 — Polish UI/UX

### Constat
UI mobile-first propre et cohérente. Transitions : `animate-fade-in` sur les exercices. Fin de leçon : modal `session-modal` avec XP/précision. Animations confetti opérationnelles. Points d'amélioration : pas de transition entre exercices (brutal), écran fin de leçon succinct, dashboard peu dynamique, quelques problèmes à 375px.

### Checklist

- [ ] **Transition slide entre exercices** : dans `lesson.js`, wrapper l'exercise-container dans une div `.slide-out` au `nextStep()`, puis `.slide-in` au render suivant. CSS dans `animations.css` : `transform: translateX(±100%)` avec `transition: 0.2s ease`. — `js/views/lesson.js`, `css/animations.css` — **S**
- [ ] **Écran fin de leçon enrichi** : dans le `session-modal` HTML (`index.html`) + `lesson.js`, ajouter : mots appris dans cette session (liste des items SRS créés), graphique précision (mini barre), message personnalisé selon score (< 60% encouragement, 60-80% bien, > 80% excellent), bouton "Revoir les erreurs" (relance une mini-session sur les items ratés). — `js/views/lesson.js`, `index.html`, `css/components.css` — **L**
- [ ] **Skeleton loading** : remplacer le spinner générique par des squelettes animés (blocs gris clignotants) dans `units.js` et `dashboard.js` pendant le rendu. — `js/views/units.js`, `js/views/dashboard.js`, `css/animations.css` — **S**
- [ ] **Progress ring animé au démarrage** : dans `dashboard.js`, animer le SVG ring de 0 → valeur réelle en 800ms via `requestAnimationFrame`. — `js/views/dashboard.js` — **S**
- [ ] **Toast XP flottant amélioré** : dans `app.js`, enrichir `showXPFloat()` avec une micro-animation de rebond et couleur dorée pour les gains > 15 XP (bonus combo). — `js/app.js`, `css/animations.css` — **S**
- [ ] **Fix 375px** : vérifier et corriger les débordements sur les cards `.unit-card2`, `.exercise-container`, `.stats-grid` (4 colonnes trop serrées → 2×2 sous 400px). — `css/components.css`, `css/main.css` — **S**
- [ ] **Dark mode persisté** : le thème est `data-theme="dark"` hardcodé dans `index.html`. Ajouter un bouton bascule dans Settings + lecture depuis `localStorage`. — `js/views/settings.js`, `js/state.js`, `index.html` — **M**
- [ ] **Vue Grammaire** : créer `js/views/grammar.js` pour afficher les règles de `grammar.js` en cartes lisibles avec exemples interactifs cliquables (TTS sur l'exemple). Ajouter un onglet dans la bottom nav ou un accès depuis le dashboard. — `js/views/grammar.js` (nouveau), `index.html` — **L**

---

## Ordre d'exécution recommandé

| Priorité | Axe | Justification | Dépendances |
|---|---|---|---|
| 1 | **AXE 2 — Nouveaux exercices** | Améliore immédiatement la qualité d'apprentissage sans attendre plus de contenu | Aucune |
| 2 | **AXE 1 — Contenu (verbes + vocab)** | La valeur pédagogique dépend du volume de matière | Aucune (indépendant de l'axe 2) |
| 3 | **AXE 4 — Gamification** | Fix achievements + combo + sons = engagement immédiat | Aucune |
| 4 | **AXE 3 — SRS SM-2** | Amélioration long terme, nécessite un volume de données existant | Axe 1 (plus d'items pour tester) |
| 5 | **AXE 5 — Polish UI** | Finition, pas bloquant | Tous les autres axes |

**Sessions suggérées :**
- Session A : AXE 2 tâches S (true_false + audio_qcm + fix review.js) → rapide, haut impact
- Session B : AXE 1 vocab émotions + animaux + adjectifs → contenu pur, indépendant
- Session C : AXE 1 verbes lot A + lot B → structure connue, copier le pattern existant
- Session D : AXE 2 tâches L (word_order + match_pairs) → exercices complexes
- Session E : AXE 4 fix achievements + combo + sons → gamification complète
- Session F : AXE 3 SM-2 complet → algorithmique, tester avec données réelles
- Session G : AXE 5 polish global → finition

---

## Contraintes techniques (à respecter dans toutes les sessions)

1. **TTS intouchable** : les fonctions `playTTS()`, `_playNative()`, `_playGoogleFallback()` dans `js/app.js` ne doivent jamais être modifiées. Pour déclencher le TTS, appeler uniquement `App.playTTS(texte)`.

2. **GitHub Pages statique** : aucun backend, aucune dépendance npm, aucun bundler. Tout nouveau fichier JS doit être ajouté avec une balise `<script src="..." >` dans `index.html`.

3. **Cache-bust obligatoire** : à chaque fichier JS modifié, incrémenter son `?v=N` dans `index.html`. Version actuelle : `v=8`. Prochaine : `v=9`, etc.

4. **Architecture `window.X`** : chaque module expose son API via `window.NomModule = { ... }`. Pas d'import/export ES modules. Pas de classes.

5. **Format vocabulaire** : tout nouveau mot doit respecter `{ id: 'v_slug', tr: '...', fr: '...', topic: '...', type: 'nom|verbe|adjectif|expression|mot', difficulty: 1|2|3 }`. Ajouter `example: { tr: '...', fr: '...' }` si possible.

6. **Format verbe** : `{ id: 'vb_infinitif', infinitive: '...', stem: '...', fr: '...', difficulty: 1|2|3, isFrequent: bool, conjugations: { present: {ben,sen,o,biz,siz,onlar}, past: {...}, future: {...} }, negations: { present: {...} }, examples: [{tr,fr}, {tr,fr}, {tr,fr}] }`.

7. **IDs uniques** : préfixes à respecter — `v_` vocab, `vb_` verbe, `p_` phrase, `d_` dialogue, `u` unité, `u\d_c\d` chapitre, `ach_` achievement, `g_` grammaire.

8. **localStorage uniquement** : toute persistance passe par `State.save()` / `State.data`. Ne jamais écrire directement dans `localStorage`.

9. **Mobile-first 375px** : tester visuellement sur viewport 375×667 avant tout commit.

10. **Commit message** : format `type: description courte` (feat/fix/docs/refactor/style). Ajouter `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>` en trailer.
