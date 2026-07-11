# TürkçeYol — ROADMAP v7 (élaguée)

## « PARLER (un peu) · COMPRENDRE · S'ENTRAÎNER MIEUX »

> Séquence : v3 (bases) → v4 (densité) → v5 (fondations : phases de leçon, cohérence, phonétique) →
> v6 (profondeur : conjugaison, culture, chemin, PWA, thème, écoute) → **v7 (élaguée après revue critique)**.
>
> **Ce fichier remplace la première version de la v7**, jugée trop généreuse après un audit technique
> à tête reposée. Cinq axes ont été **coupés entièrement** (pas réduits — coupés), un axe a été
> **fortement réduit** en portée. Le détail de ce qui a été retiré et pourquoi est en fin de fichier
> (§ Annexe — Ce qui a été coupé et pourquoi), pour ne pas perdre la réflexion si on veut y revenir un jour.
>
> **Contexte qui a guidé l'élagage** : c'est un outil utilisé par une seule personne en local, pas un
> produit avec plusieurs utilisateurs. Tout ce qui simule du social (ligues, partage) ou qui prépare
> une généricité hypothétique (i18n, onboarding multi-profils) a été retiré : ça n'a de valeur que si
> quelqu'un d'autre que toi ouvre l'app un jour, ce qui n'est pas le cas aujourd'hui.

---

## 🧭 PHILOSOPHIE v7 (élaguée)

On garde seulement ce qui a une valeur **concrète et vérifiable** pour un usage solo :

1. **COMPRENDRE mieux** — des histoires courtes en turc (lecture + écoute + question), ça marche,
   c'est sûr techniquement, et la recherche est unanime sur le gain de rétention. **Priorité n°1.**
2. **COMBLER un vrai trou pédagogique** — l'app n'enseigne que le présent progressif `-iyor` et
   ignore l'**aoriste `-er/-ir`**, pourtant un des temps les plus utilisés du turc courant.
   **Priorité n°2, zéro risque.**
3. **S'ENTRAÎNER plus intelligemment** — un hub qui regroupe les sessions déjà calculables par le
   SRS existant (mots faibles, conjugaison à revoir, écoute), pour ne pas avoir à chercher où réviser quoi.
4. **PARLER, mais en version bêta honnête** — reconnaissance vocale du navigateur, avec un **avertissement
   clair sur ses limites réelles** (audio envoyé à Google, bugs connus sur iPhone), scope réduit au
   strict minimum testable, pas de gros système de scoring tant qu'on n'a pas vérifié que ça marche.

---

## ⛔ CONTRAINTES DURES — INCHANGÉES

1. **🔊 TTS INTOUCHABLE.** Ne jamais modifier `App.playTTS()` / `App._playGoogleTTS()` / la meta
   `no-referrer`. La reconnaissance vocale (AXE 3) est un canal **entrant**, séparé, elle ne touche
   pas au TTS — mais on ne « profite » pas d'y toucher au passage.
2. **Zéro régression de progression.** Aucun `id` supprimé/renommé (`v_*`, `vb_*`, `p_*`, `d_*`, `g_*`,
   `u*_c*`, `ach_*`, nouveaux `st_*` histoires).
3. **Persistance via `State` uniquement.** Toute nouvelle clé a une valeur par défaut (merge existant).
4. **Vanilla, statique, sans backend, sans build.** Comme toujours.
5. **Dégradation gracieuse obligatoire** pour toute API non universelle, avec un message honnête —
   pas juste un fallback silencieux qui laisse croire que ça marche partout pareil.
6. **Mobile-first 375px, clair/sombre, `prefers-reduced-motion`, cache-bust, CSS modulaire** (v6 continue).

---

## 📚 AXE 1 — COMPRENDRE : histoires courtes (priorité n°1)

> Aucune API fragile, réutilise TTS/vocab/SRS existants, gain de rétention documenté (lecture + écoute
> + rappel actif). C'est le meilleur rapport valeur/risque de toute la roadmap.

### 1.1 — Données histoires (`js/data/stories.js`, ids `st_*`) · **L**
- 8-10 mini-histoires A1→A2 (5-10 phrases), réutilisant le vocabulaire déjà enseigné : une journée à
  Istanbul, au marché, chez le médecin, un trajet en bus, un café entre amis, la météo du week-end…
- Schéma : `{ id:'st_*', title, level:'A1|A2', icon:'emoji', unitId, lines:[{tr, fr}],
  questions:[{q, options[4], answer}] }`.
- **Accept.** : `validate-data.js` étendu — ids uniques, questions bien formées (4 options, réponse incluse).

### 1.2 — Lecteur d'histoire (`js/views/stories.js`, `#stories`) · **M/L**
- Liste des histoires → lecteur : chaque phrase turque cliquable (`App.playTTS`), bouton pour révéler
  la traduction FR, « lire tout » en enchaînant l'audio. Fin : 2-3 questions QCM → XP + SRS des mots vus.
- **Accept.** : lire une histoire du début à la fin, écouter chaque phrase, répondre aux questions, gagner de l'XP.

### 1.3 — Accès depuis le dashboard · **S**
- Une carte "Histoire du jour" (déterministe par date, comme le mot du jour) dans la rangée Explorer.
- **Accept.** : change chaque jour, mène directement au lecteur.

---

## 📖 AXE 2 — GRAMMAIRE : combler le vrai trou (priorité n°2)

### 2.1 — Aoriste (`geniş zaman`, `-er/-ir`) · **M**
- Nouvelle règle `g_aorist` (rule + example + traps + drills), conjugaisons `aorist` ajoutées aux verbes
  existants (au moins les 20-25 les plus fréquents), nouveau chapitre d'introduction rattaché.
- **Piège central à documenter explicitement** : -iyor = action en cours/ponctuelle, aoriste = habitude/
  vérité générale (« Ben çay içerim » = je bois du thé, en général — pas « je suis en train de boire »).
- **Accept.** : un chapitre enseigne l'aoriste avec tableau de conjugaison + piège -iyor-vs-aoriste explicite ;
  smoke-test toujours à 0 problème.

### 2.2 — Un second mode utile : nécessitatif `-meli` (« je dois ») · **S/M**
- Règle + drills + conjugaisons sur quelques verbes clés (gitmeliyim, yapmalıyım…). Utilité immédiate
  (obligations, conseils), grammaticalement simple à ajouter par rapport à l'impératif/conditionnel.
- **Accept.** : règle rattachée à un chapitre, exercices générables, smoke-test au vert.

> *(Impératif, conditionnel -se, et le reste des verbes A2/B1 : gardés en réserve, ajoutés au fil de
> l'eau plutôt qu'en gros bloc — pas de sur-planification sur du contenu qui se fait bien incrémentalement.)*

---

## 🧠 AXE 3 — S'ENTRAÎNER MIEUX : hub Pratique adaptatif

> Zéro nouvelle donnée nécessaire : `SRS.getWeakItems / getFragileItems / getSessionMix` existent déjà
> et sont sous-exploités (seulement 2 boutons dans Review). On les rend visibles et actionnables.

### 3.1 — Vue `#practice` (hub d'entraînement) · **M**
- Écran unique avec des cartes de session ciblée : **Mots fragiles**, **Conjugaison à revoir** (weakVerbs
  déjà trackés), **Écoute** (renvoie vers `#listening`), **Mix rapide 5 min**. Chaque carte affiche un
  compteur réel (« 6 mots », pas un chiffre en dur).
- Accès depuis le dashboard, à côté de "Défi du jour".
- **Accept.** : chaque carte lance une session réellement calculée sur les données actuelles de l'utilisateur.

### 3.2 — Densité de session réglable · **S**
- Préférence Courte / Normale / Longue dans Settings (nombre de slides), respectée par `generateForChapter`.
- **Accept.** : "Courte" produit visiblement moins de slides que "Longue".

### 3.3 — Favoris ⭐ sur mots/verbes/phrases · **S/M**
- Bouton étoile dans les vues Vocabulaire/Verbes/Phrases (`State.data.favorites`), + carte "Mes favoris"
  dans le hub Pratique qui lance une révision dessus.
- **Accept.** : étoiler un mot l'ajoute à une liste révisable persistée.

---

## 🎙️ AXE 4 — PARLER : bêta minimale, honnête sur ses limites

> Réduit au strict nécessaire pour **savoir si ça vaut le coup d'aller plus loin**, avant d'investir
> dans un système de scoring ou un mode shadowing complet.

### Ce qu'on sait, vérifié avant d'écrire une ligne de code
- **L'audio est envoyé aux serveurs de Google** pour être transcrit (comportement par défaut de
  `webkitSpeechRecognition` dans Chrome) — ce n'est pas local, contrairement au TTS. À dire clairement
  dans l'UI, pas juste dans un commentaire de code.
- **iOS Safari a des bugs connus et documentés** : l'événement de résultat ne se redéclenche parfois
  qu'une fois, délais de 2-3 s avant capture, comportement instable. Sur une app mobile-first, c'est un
  risque réel de frustration plus que d'aide.
- **Qualité de reconnaissance en turc non garantie** (langue moins dotée que l'anglais/espagnol/français
  dans ces moteurs).

### 4.1 — Bouton micro sur le champ de saisie existant (`input`, `listening_transcribe`) · **S**
- **Seule feature de cet axe pour l'instant.** Pas de scoring, pas de nouveau type d'exercice, pas de
  shadowing : juste un bouton 🎤 optionnel à côté des champs de saisie déjà existants, qui remplit le
  champ texte avec ce que `SpeechRecognition` a compris. L'utilisateur valide ensuite normalement — le
  circuit de correction existant (`Grading`) s'applique sans rien changer.
- **Opt-in strict** : désactivé par défaut, activable dans Settings avec un texte clair : « Expérimental.
  Ta voix est envoyée à un service de reconnaissance externe (navigateur). Peut mal fonctionner sur iPhone. »
- Détection de support (`'webkitSpeechRecognition' in window`) → bouton absent si non supporté, aucune erreur.
- **Accept.** : sur Chrome desktop/Android avec l'option activée, dicter remplit le champ correctement la
  plupart du temps ; sur Firefox ou avec l'option désactivée, le bouton n'apparaît pas ; zéro erreur console.

### Décision différée, pas annulée
> Scoring de prononciation, nouveau type d'exercice `speak`, mode shadowing : **repoussés à une v8**,
> conditionnés à un retour d'usage réel sur 4.1. Construire un système de notation complet sur une API
> dont on n'a pas encore vérifié la fiabilité en conditions réelles serait du temps perdu si la reconnaissance
> s'avère trop mauvaise en turc pour être utilisable.

---

## 📈 AXE 5 — UN SEUL insight visuel, pas une suite complète

> L'axe "Insights" de la première version (radar + calendrier + timeline) était trois features pour un
> seul vrai besoin : voir où on est faible d'un coup d'œil. On garde la plus utile, on jette les deux autres.

### 5.1 — Radar de compétences (Stats) · **M**
- Graphe radar SVG (Vocabulaire / Écoute / Conjugaison / Grammaire / Lecture si histoires faites), calculé
  depuis le SRS et l'historique réel — pas de valeur inventée.
- **Accept.** : le radar reflète les vraies données et bouge quand la progression change.

---

## ⚙️ AXE 6 — TECHNIQUE : juste le filet de sécurité

### 6.1 — Étendre le filet de tests · **S**
- `smoke-test.js` : valider le nouveau type facultatif et les histoires. `validate-data.js` : ids `st_*`,
  refs, questions bien formées, aoriste présent sur les verbes qui le déclarent.
- **Accept.** : `node tools/*.js` = 0 sur le dépôt après chaque ajout de contenu.

### 6.2 — Migration d'état · **S**
- Toute nouvelle clé `State` (favorites, densité de session, speaking opt-in) a une valeur par défaut au
  chargement (le merge existant le fait déjà — juste s'assurer que rien n'oublie ce filet).
- **Accept.** : charger une sauvegarde v6 fonctionne sans perte ni erreur après la v7.

---

## 🗓️ ORDRE D'EXÉCUTION CONSEILLÉ

1. **AXE 6.1** (filet de tests étendu) — avant de toucher à la donnée.
2. **AXE 2.1** (aoriste) — le gain le plus sûr et le plus rentable, à faire en premier.
3. **AXE 1** (histoires) — le plus gros morceau, mais zéro risque technique.
4. **AXE 3** (hub Pratique + densité + favoris) — réutilise l'existant, rapide.
5. **AXE 5.1** (radar) — bonus visuel une fois qu'il y a plus de données à représenter (post-histoires).
6. **AXE 4.1** (micro sur input) — en dernier, en bêta clairement affichée, pour voir si ça vaut le coup
   d'aller plus loin un jour.
7. **AXE 2.2** (nécessitatif) — au fil de l'eau, sans urgence.

---

## ✅ CRITÈRES D'ACCEPTATION GLOBAUX v7

- ✅ On peut lire une histoire turque avec audio phrase-à-phrase et répondre à des questions dessus.
- ✅ L'aoriste est enseigné avec un piège -iyor-vs-aoriste explicite.
- ✅ Un hub unique regroupe les sessions de révision ciblées, avec des compteurs réels.
- ✅ Le micro (si activé) remplit un champ de saisie existant, sans nouveau système de scoring.
- ✅ Le moteur TTS est strictement identique à v6. Aucun id supprimé. `node tools/*.js` = 0.
- ✅ Toute API non universelle se désactive proprement avec un message honnête, jamais une erreur silencieuse.

---

## Annexe — Ce qui a été coupé et pourquoi

*(Gardé pour mémoire, pas pour être fait — à rouvrir seulement si le contexte change, ex. l'app sert un jour à quelqu'un d'autre.)*

| Item retiré | Pourquoi |
|---|---|
| **Ligue hebdo simulée (bots)** | Théâtre : la valeur des ligues vient de la compétition sociale réelle. Contre des bots dont le dev connaît le mécanisme, aucun effet motivant. Gros travail pour zéro gain. |
| **Carte de progression partageable** | Zéro destinataire identifié — usage strictement solo, pas de canal de partage réel. |
| **Notifications / rappels** | Les vraies push notifications (app fermée) demandent un serveur, ce qui viole la contrainte statique. Les notifications en premier plan sont inutiles par construction (l'onglet ouvert = déjà dans l'app). Aucune version honnête et utile n'existe en statique pur. |
| **i18n-ready (UI multilingue)** | Généralité spéculative pour un besoin hypothétique qui n'a aucune raison de survenir : app perso, un seul utilisateur francophone. |
| **Onboarding + test de placement** | Utile pour accueillir de vrais nouveaux utilisateurs variés ; sans objet pour un usage solo où l'unique utilisateur connaît déjà tout le contexte. |
| **Scoring de prononciation + type `speak` + shadowing complet (v7 initiale)** | Pas supprimés, **repoussés** : risque technique réel non vérifié (audio envoyé à Google, bugs iOS Safari documentés, qualité turque incertaine). On construit d'abord la version la plus simple possible (AXE 4.1) et on décide après avoir un vrai retour d'usage. |
| **Dialogues vivants / jeu de rôle à embranchements** | Coût de rédaction de contenu élevé (plusieurs branches par dialogue) pour un gain incertain par rapport aux histoires (AXE 1), qui couvrent déjà l'objectif "lecture + écoute en contexte" avec beaucoup moins d'effort. |
| **+40 phrases / +10 dialogues / +15 verbes en bloc** | Pas coupé sur le fond, juste dé-priorisé : ce type de contenu s'ajoute bien incrémentalement, pas besoin de le planifier en gros lot dans une roadmap. |

---

## Légende complexité
- **S** — Small (~30 min, 1 fichier)
- **M** — Medium (1-2 h, quelques fichiers)
- **L** — Large (plusieurs sessions)
