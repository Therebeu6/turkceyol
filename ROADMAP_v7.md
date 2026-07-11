# TürkçeYol — ROADMAP v7

## « PARLER · COMPRENDRE · S'ADAPTER »

> Séquence du projet : **v3** (Sessions A→G, bases produit) → **v4** (Blocs H→M, densité) →
> **v5** (réparation des fondations : phases de leçon, cohérence, phonétique, CEFR) →
> **v6** (approfondir la pédagogie + retenir : conjugaison, culture, chemin, PWA, thème, écoute) →
> **v7 (les 3 frontières manquantes : production orale, immersion contextuelle, personnalisation)**.
>
> La v5 a rendu l'app **cohérente**. La v6 l'a rendue **profonde et engageante**. Mais après audit,
> trois grandes capacités qui définissent les meilleures apps de 2026 sont **totalement absentes** :
>
> 1. **On ne parle jamais.** Zéro production orale, zéro retour sur la prononciation. C'est LE manque
>    n°1 relevé par toutes les comparatives 2026 : les apps qui font progresser vraiment font
>    **écouter, répéter, prononcer et corrigent l'accent** en temps réel.
> 2. **On ne lit rien en contexte.** Pas d'histoires, pas de lecture guidée. Or « l'exposition
>    multi-modale (lecture + écoute + rappel actif) produit ~40 % de rétention en plus que le mono-mode ».
> 3. **Tout le monde a le même parcours.** Pas d'onboarding, pas de test de niveau, pas de pratique
>    adaptée aux faiblesses. Les meilleures apps **adaptent le contenu, le rythme et la révision** au profil.
>
> **La v7 attaque ces trois frontières**, sans jamais casser ce qui marche.

---

## 🧭 PHILOSOPHIE v7

> On ne refait rien de ce que v5/v6 ont posé. On **ajoute trois nouvelles couches** par-dessus des
> fondations saines :
>
> - **PARLER** — faire produire de l'oral (répéter, prononcer, se faire corriger), 100 % côté navigateur.
> - **COMPRENDRE** — immersion par des histoires courtes et des dialogues vivants, avec vérification.
> - **S'ADAPTER** — accueillir, situer le niveau, et orienter chacun vers ce qui lui manque.
>
> **Mètre-étalon v7** : à la fin, un débutant peut **s'entendre parler turc et être corrigé**, **lire
> une petite histoire turque et la comprendre**, et **recevoir un parcours qui lui ressemble**.

---

## ⛔ CONTRAINTES DURES — NE JAMAIS ENFREINDRE

> Ces règles priment sur **toute** tâche ci-dessous. Une amélioration qui les viole est un bug.

1. **🔊 AUDIO / TTS INTOUCHABLE.** Ne **jamais** modifier `App.playTTS()`, `App._playGoogleTTS()`,
   ni la balise `<meta name="referrer" content="no-referrer">`. Tout audio **sortant** passe par
   `App.playTTS(text)`. ⚠️ La reconnaissance vocale (v7 AXE 1) utilise l'API **`SpeechRecognition`**,
   qui est **entrante** et **totalement distincte** du TTS — elle ne touche donc pas au moteur audio,
   mais on ne « refactore » pas le TTS au passage.
2. **Zéro régression de progression.** Ne jamais supprimer/renommer un `id` déjà utilisé
   (`v_*`, `vb_*`, `p_*`, `d_*`, `g_*`, `u*_c*`, `ach_*`, et les nouveaux `st_*` histoires). Recentrer
   = changer le **contenu**, pas l'id.
3. **Persistance uniquement via `State`.** Jamais de `localStorage` direct : `State.data` + `State.save()`.
   Prévoir une **migration douce** pour toute nouvelle clé (valeur par défaut si absente).
4. **Pas de build, pas de framework, pas d'ES modules, pas de backend.** Vanilla `window.Module`,
   chargé par `<script>`, statique GitHub Pages. Aucune dépendance npm au runtime, aucun serveur.
5. **Dégradation gracieuse obligatoire.** Toute API non universelle (reconnaissance vocale, notifications,
   vibration) doit **détecter le support** et se désactiver proprement (message clair, pas d'erreur) si
   absente. Firefox n'a pas `SpeechRecognition` → l'exercice oral propose une alternative « auto-évaluation ».
6. **Mobile-first 375px** · **clair/sombre** · **`prefers-reduced-motion`** · **cache-bust `?v=N`** sur
   tout fichier modifié · **CSS modulaire** (on continue le découpage v6, on ne recrée pas un monolithe).
7. **Vie privée.** La reconnaissance vocale du navigateur peut router l'audio via un service tiers selon
   le navigateur : le préciser dans un court avis, et rendre la fonction **opt-in** (désactivée par défaut,
   activable dans Settings). Aucune donnée vocale n'est stockée.
8. **Additif par défaut.** On enrichit ; un refactor n'est justifié que s'il ne change **aucun**
   comportement observable (comme le découpage CSS v6, prouvé à l'octet près).

---

## 📊 ÉTAT RÉEL (audité le 11/07/2026, post-v6)

| Ressource | Quantité | Note |
|---|---|---|
| Vocabulaire | **520 mots** | 100 % avec `example` ✅ |
| Verbes | **44** | présent -iyor / passé -di / futur -acak + négation. **Manque l'aoriste -er/-ir (geniş zaman)** |
| Phrases | **77** | |
| Dialogues | **29** | rattachés aux chapitres, `dialogue_fill` cohérent. **Non interactifs / pas de shadowing** |
| Unités / Chapitres | **18 / 71** | A1 (u1-12) / A2 (u13-18), doublons majeurs résolus ✅ |
| Grammaire | **18 règles** | `drills` + `exercises` + `traps` + tableaux conjugaison ✅ |
| Types d'exercices | **13 + 4 slides d'enseignement** | **aucun de production orale** |
| Vues | **13** | dashboard, units, lesson, review, verbs, vocab, phrases, dialogues, stats, grammar, settings, daily, **listening** |
| Moteurs | **6** | exercises, srs (SM-2), gamification, grading, phonetics, audio |
| Rétention | streak + gel + objectif configurable + rapport hebdo ✅ | **pas de ligue / classement / quêtes** |
| PWA | installable + offline ✅ | **pas de rappels/notifications** |
| **Production orale** | **❌ ABSENTE** | le manque n°1 |
| **Histoires / lecture guidée** | **❌ ABSENTE** | |
| **Onboarding / test de niveau** | **❌ ABSENT** | premier lancement = dashboard brut |
| **Parcours adaptatif / objectifs** | **❌ ABSENT** | tout le monde a le même parcours |

---

## 🎙️ AXE 1 — PARLER : production orale (le manque n°1)

> Objectif : que l'utilisateur **répète, prononce et s'entende corriger**. 100 % navigateur, opt-in,
> avec repli propre là où l'API n'existe pas.

### 1.1 — Moteur de reconnaissance vocale (`js/engine/speech.js`) · **M**
- Nouveau module `window.Speech` encapsulant `SpeechRecognition` / `webkitSpeechRecognition` en `tr-TR`.
- API : `Speech.isSupported()`, `Speech.listen({onResult, onError, onEnd})`, `Speech.stop()`.
- **Détection de support** stricte + drapeau `settings.speaking` (opt-in, off par défaut, avis vie privée).
- **Ne touche pas** au TTS ; c'est un canal entrant séparé.
- **Accept.** : sur Chrome/Edge/Safari, capte la parole turque ; sur Firefox, `isSupported()===false`.

### 1.2 — Scoring de prononciation tolérant (réutiliser `grading.js`) · **S/M**
- Comparer la transcription obtenue à la cible via `Grading` (normalisation + Levenshtein déjà en place).
- Score 0-100 + verdict (🟢 ≥80 « Excellent », 🟡 50-79 « Presque », 🔴 « Réessaie ») + **mot(s) à retravailler**
  surlignés (diff au niveau mot).
- **Accept.** : dire correctement « Günaydın » donne un vert ; une erreur nette donne un rouge ciblé.

### 1.3 — Nouveau type d'exercice `speak` (prononce le mot/la phrase) · **M**
- Dans `exercises.js` : `createSpeak(item)` → affiche la cible + bouton 🎤. L'utilisateur écoute (TTS),
  puis parle ; feedback via 1.2. Mis en phase **Production** (gating existant).
- Repli sans micro/API : bouton « 🔊 Écouter puis auto-évaluer » (Je l'ai bien dit / Pas sûr) → SRS.
- Généré **uniquement** si `Speech.isSupported()` **et** `settings.speaking` actif ; sinon omis.
- **Accept.** : une leçon d'un utilisateur « oral activé » propose 1-2 exercices `speak` cohérents ;
  aucun impact si oral désactivé. Smoke-test étendu (le type est facultatif).

### 1.4 — Mode **Shadowing** (répétition guidée) — vue `#shadowing` · **M/L**
- Sur les phrases et **dialogues** : écouter (`App.playTTS`, vitesse 🐢/🐇/⚡ existante) → répéter à voix
  haute → (si oral activé) score, sinon simple validation → phrase suivante. Enchaîne une réplique après l'autre.
- Idéal pour l'accent et le rythme ; réutilise le contenu des dialogues existants (29).
- **Accept.** : on peut « shadow » un dialogue entier réplique par réplique, avec vitesse réglable.

### 1.5 — Bouton micro optionnel sur `listening_transcribe` et `input` · **S**
- Là où l'utilisateur tape déjà, offrir « ou dis-le 🎤 » qui remplit le champ par la transcription.
- **Accept.** : dicter remplit le champ ; désactivé proprement si non supporté.

---

## 📖 AXE 2 — COMPRENDRE EN CONTEXTE : immersion & lecture

> « Lecture + écoute + rappel actif = +40 % de rétention. » On crée de vraies **histoires** turques
> pour débutants et on rend les **dialogues vivants**.

### 2.1 — Données histoires (`js/data/stories.js`, ids `st_*`) · **L**
- 8-12 mini-histoires narratives A1→A2 (5-10 phrases), thème par thème, réutilisant le vocab déjà appris :
  une journée à Istanbul, au marché, chez le médecin, un voyage en bus, un café entre amis…
- Schéma : `{ id:'st_*', title, level:'A1|A2', cover:'emoji', lines:[{tr, fr, vocab:[ids]}],
  questions:[{q, options[4], answer}] }`. Chaque ligne a sa traduction + mots-clés liés au lexique.
- **Accept.** : `validate-data.js` étendu vérifie ids uniques, refs vocab existantes, questions bien formées.

### 2.2 — Lecteur d'histoire (`js/views/stories.js`, `#stories`) · **L**
- Liste des histoires (verrouillées par niveau/progression) → lecteur : chaque phrase turque **cliquable**
  (`App.playTTS`), **tap long / bouton** révèle la traduction FR, mots connus surlignés. Bouton « lire tout ».
- À la fin : **2-3 questions de compréhension** (QCM) → XP + comptabilisation SRS des mots vus.
- **Accept.** : lire une histoire, écouter chaque phrase, révéler la trad, répondre aux questions, gagner de l'XP.

### 2.3 — Type d'exercice `reading_comprehension` · **M**
- Court paragraphe turc (tiré d'une histoire ou généré depuis un dialogue) + 1 question QCM.
- Injecté en phase **Rappel/Contexte** des chapitres qui ont une histoire rattachée (`storyIds` sur le chapitre).
- **Accept.** : cohérent avec le thème ; jamais hors-sujet (garanti par le même mécanisme que v5 Pilier B).

### 2.4 — Dialogues vivants / jeu de rôle léger · **M/L**
- Dans la vue Dialogues : mode « joue un rôle » — l'app lit les répliques d'un personnage, l'utilisateur
  choisit/prononce celles de l'autre (QCM de réponse plausible, ou `speak` si oral activé).
- Option **embranchements légers** (2-3 réponses possibles) pour le réemploi, comme prévu en v4.
- **Accept.** : on peut « jouer » un dialogue de bout en bout en tenant un rôle.

### 2.5 — Widget « Mot / phrase du jour » sur le dashboard · **S**
- Une carte quotidienne (mot ou expression utile) avec audio + exemple, tirée du lexique, déterministe par date.
- **Accept.** : change chaque jour, écoutable, sans casser la mise en page.

---

## 🧭 AXE 3 — S'ADAPTER : onboarding, niveau & parcours personnalisé

> Deux utilisateurs ne devraient plus avoir exactement le même parcours.

### 3.1 — Onboarding premier lancement (`js/views/onboarding.js`) · **M**
- 3-4 écrans au tout premier lancement : bienvenue → **pourquoi tu apprends** (voyage / travail / culture /
  série & films / par curiosité) → **objectif quotidien** (Détente/Normal/Sérieux) → **oral on/off** (avis vie privée).
- Stocké dans `State.data.profile` ; rejouable depuis Settings.
- **Accept.** : au premier lancement seulement, fluide, 375px, skippable ; relançable dans Settings.

### 3.2 — Test de placement optionnel · **M**
- Après l'onboarding : « Débuter du début » **ou** « J'ai déjà des bases → test rapide ». Le test (10-15
  questions de difficulté croissante) débloque les premiers chapitres et pré-remplit le SRS.
- **Accept.** : réussir le test place l'utilisateur plus loin dans le parcours sans casser le déblocage.

### 3.3 — Objectif d'apprentissage → priorisation du contenu · **M**
- Le `profile.goal` réordonne les accès rapides et pondère les thèmes servis en révision (voyage → transport/
  hôtel/directions en avant ; travail → métiers/bureau ; culture → dialogues/histoires).
- **Accept.** : changer d'objectif change visiblement les suggestions du dashboard.

### 3.4 — **Pratique adaptative** — vue `#practice` (le hub d'entraînement) · **M/L**
- Un écran « S'entraîner » qui propose des sessions ciblées calculées depuis le SRS et les stats :
  **Mes mots fragiles**, **Conjugaison à revoir**, **Écoute**, **Prononciation** (si oral), **Mix rapide 5 min**.
- Réutilise `SRS.getWeakItems / getFragileItems / getSessionMix` (déjà présents).
- **Accept.** : chaque bouton lance une session réellement ciblée sur les données de l'utilisateur.

### 3.5 — Densité de session réglable · **S**
- Préférence Courte / Normale / Longue (nombre de slides par leçon) dans Settings, respectée par `generateForChapter`.
- **Accept.** : « Courte » sert des leçons visiblement plus rapides ; « Longue » plus fournies.

### 3.6 — Favoris ⭐ + notes personnelles · **M**
- Étoiler mots / verbes / phrases (`State.data.favorites`) + note perso par item ; mode de révision « Mes favoris ».
- **Accept.** : étoiler un mot l'ajoute à une liste révisable ; la note s'affiche dans la fiche.

---

## 🔥 AXE 4 — ENGAGEMENT : ligues, quêtes, partage

> Sans backend, on reste **honnête** : pas de vrai classement multi-joueurs. On simule une cohorte
> hebdomadaire crédible et on renforce la boucle personnelle.

### 4.1 — Ligue hebdomadaire (locale/simulée) · **M/L**
- Divisions Bronze → Diamant. Classement de la semaine face à une **cohorte de bots** au comportement
  plausible (progression pseudo-aléatoire bornée, graine déterministe par semaine). Montée/descente, reset lundi.
- **Transparent** : petit « ⓘ Adversaires simulés hors-ligne » — aucune promesse de multijoueur réel.
- **Accept.** : gagner de l'XP fait monter dans le classement de la semaine ; reset hebdo fonctionnel.

### 4.2 — Quêtes / missions courtes · **M**
- Objectifs annexes tournants : « fais 3 exercices d'écoute », « 5 bonnes réponses d'affilée »,
  « termine 1 histoire », « prononce 5 mots » → petites récompenses XP. Stockés dans `State.data.quests`.
- **Accept.** : 2-3 quêtes du jour visibles, complétables, récompensées.

### 4.3 — Achievements enrichis + galerie · **S/M**
- Nouveaux badges liés à v7 : 1re histoire lue, 10 mots prononcés, 1re ligue gagnée, oral 3 jours de suite…
- **Accept.** : chaque nouvelle mécanique débloque au moins un badge évaluable réellement.

### 4.4 — Carte de progression partageable (canvas → image) · **M**
- Depuis l'écran de fin / stats : générer une image (canvas) « J'ai appris X mots · streak Y · niveau Z »
  téléchargeable. Aucune donnée envoyée nulle part.
- **Accept.** : bouton « Partager ma progression » produit une image propre en clair et sombre.

---

## 📚 AXE 5 — CONTENU : combler les trous grammaticaux et pousser vers A2/B1

> On vise un vrai A2 solide et un pied dans le B1.

### 5.1 — **Aoriste (geniş zaman -er/-ir)** — le trou grammatical majeur · **M**
- L'app n'enseigne que le présent progressif -iyor. L'aoriste (présent général/habituel : *içerim* = je bois /
  j'ai l'habitude de boire) est **essentiel** et absent. Ajouter la règle `g_aorist`, les conjugaisons
  `aorist` sur les verbes, et son chapitre d'introduction. Distinguer clairement -iyor vs -er/-ir (piège FR).
- **Accept.** : un chapitre enseigne l'aoriste avec tableau + pièges ; les verbes ont la forme aoriste.

### 5.2 — Modes A2/B1 supplémentaires · **M/L**
- Impératif (*gel!*), nécessitatif -meli (*gitmeliyim* = je dois aller), conditionnel -se, capacité -abil
  (déjà en règle, à outiller en conjugaison). Ajouter règles + drills + exemples.
- **Accept.** : chaque mode a une règle, des pièges, et des exercices générables.

### 5.3 — +15 verbes fréquents + formes complètes · **M**
- Compléter les verbes A2/B1 courants manquants, tous avec présent/aoriste/passé/futur/négation + 3 exemples.
- **Accept.** : `validate-data.js` : tout verbe a les temps requis + exemples.

### 5.4 — +40 phrases, +10 dialogues situés, expressions idiomatiques · **M**
- Situations réelles supplémentaires (pharmacie avancée, banque, location, rendez-vous), connecteurs
  (*ama, çünkü, ama, sonra, önce*), et un petit lot d'expressions idiomatiques courantes avec sens.
- **Accept.** : nouveau contenu rattaché à des chapitres/thèmes existants, jamais orphelin.

### 5.5 — Entraîneurs spécialisés (nombres, heure, dates) · **S/M**
- Mini-drills dédiés (dictée de nombres via TTS, « quelle heure est-il ? », jours/mois) accessibles depuis le hub Pratique.
- **Accept.** : un drill « nombres » lit un nombre et l'utilisateur le saisit/choisit.

---

## 📈 AXE 6 — INSIGHTS & MAÎTRISE

### 6.1 — Radar de compétences · **M**
- Graphe radar (SVG) : Vocabulaire / Écoute / Conjugaison / Grammaire / (Oral) / Lecture, calculé depuis le SRS
  et l'historique. Montre où l'on est fort/faible d'un coup d'œil.
- **Accept.** : le radar reflète les vraies données ; se met à jour avec la progression.

### 6.2 — Prévision de révisions (calendrier) · **S/M**
- Petit calendrier « combien de mots à revoir chaque jour cette semaine » depuis `SRS.getUpcomingCount`.
- **Accept.** : chiffres cohérents avec la file SRS réelle.

### 6.3 — Timeline de maîtrise & jalons · **S**
- Frise des jalons (100 mots, 1re histoire, A1 validé…) + courbe XP 30 jours (déjà partiellement en heatmap).
- **Accept.** : jalons débloqués affichés, aucune valeur factice.

---

## ⚙️ AXE 7 — TECHNIQUE, QUALITÉ & PORTÉE

### 7.1 — Rappels & notifications (portée honnête) · **M**
- `Notification` locale + relance douce quand l'app est ouverte / réouverte le soir sans activité.
  ⚠️ Les vraies notifications push web hors-app nécessitent un service worker push + serveur (hors scope
  statique) : le documenter clairement, ne pas sur-promettre. Proposer plutôt un rappel navigateur opt-in.
- **Accept.** : opt-in, respecte le refus, aucune erreur si non supporté.

### 7.2 — Extension du filet de tests · **S/M**
- `smoke-test.js` : gérer les nouveaux types (`speak`, `reading_comprehension`) comme facultatifs, et valider
  les histoires (`stories.js`). `validate-data.js` : ids `st_*`, refs, questions.
- **Accept.** : `node tools/*.js` = 0 sur un dépôt sain, y compris nouveau contenu.

### 7.3 — Robustesse données & migration d'état · **S**
- Toute nouvelle clé `State` (profile, favorites, quests, league, speaking…) a une valeur par défaut au chargement
  (merge déjà en place) → aucune sauvegarde ancienne ne casse.
- **Accept.** : charger une vieille sauvegarde v6 marche sans perte ni erreur.

### 7.4 — Accessibilité & i18n-ready · **S/M**
- Poursuivre a11y (rôles ARIA sur les nouvelles vues, ordre de focus, annonces). Extraire les libellés d'UI
  récurrents pour préparer une future traduction de l'interface (l'app enseigne le turc à des francophones,
  mais l'UI pourrait un jour être multilingue).
- **Accept.** : parcours clavier complet des nouvelles vues ; libellés centralisés.

### 7.5 — Poursuite du découpage CSS · **S**
- Les nouvelles vues (speak, stories, practice, onboarding, league) ont leur propre fichier CSS modulaire,
  chargé dans l'ordre. On ne regonfle jamais un monolithe.
- **Accept.** : chaque nouvelle vue < ~250 lignes CSS dédiées.

---

## 🗓️ ORDRE D'EXÉCUTION CONSEILLÉ

> Frontière par frontière, en livrant utilisable à chaque étape. On ne monte pas d'un étage tant que
> celui du dessous n'est pas solide.

1. **AXE 7.2/7.3** (filet de tests + migration) — sécuriser avant d'ajouter des mécaniques.
2. **AXE 1 — PARLER** (speech engine → scoring → type `speak` → shadowing). La plus forte valeur perçue.
3. **AXE 2 — COMPRENDRE** (histoires : données → lecteur → reading_comprehension → dialogues vivants).
4. **AXE 3 — S'ADAPTER** (onboarding → placement → hub Pratique → objectif/densité/favoris).
5. **AXE 5 — CONTENU** (aoriste d'abord — trou majeur —, puis modes A2/B1, verbes, dialogues).
6. **AXE 4 — ENGAGEMENT** (ligue simulée, quêtes, badges, partage).
7. **AXE 6 — INSIGHTS** (radar, prévisions, jalons).
8. **AXE 7.1/7.4/7.5** (rappels, a11y/i18n, CSS) — finitions transverses.

---

## ✅ CRITÈRES D'ACCEPTATION GLOBAUX v7

- ✅ On peut **parler** (Chrome/Edge/Safari) et recevoir un score de prononciation ciblé ; repli propre ailleurs.
- ✅ On peut **lire une histoire** turque avec audio phrase-à-phrase, révélation FR, et questions de compréhension.
- ✅ Le **premier lancement** propose onboarding + (option) test de niveau ; un **hub Pratique** cible les faiblesses.
- ✅ L'**aoriste** et les modes A2/B1 clés sont enseignés (le trou grammatical est comblé).
- ✅ **Ligue** hebdo honnête (simulée, transparente), **quêtes**, badges, **carte partageable**.
- ✅ Le **moteur TTS** (`playTTS`/`_playGoogleTTS`/meta no-referrer) est **strictement identique** à v6.
- ✅ Aucun `id` supprimé ; vieilles sauvegardes intactes ; `node tools/*.js` = 0 ; 375px & clair/sombre OK.
- ✅ Toute API non universelle **détecte le support** et se désactive proprement (zéro erreur console).

---

## 🔎 SOURCES / INSPIRATION (recherche 2026)

- Comparatifs de features 2026 (SRS, gamification, immersion, oral IA) — Lingopie, LingQ, BGR, Promova, TechTimes.
- Rôle de l'**exposition multi-modale** (+40 % de rétention) et des **leçons situées** — synthèses comparatives 2026.
- **Duolingo Stories / Advanced Stories** (lecture+écoute narrative, questions de compréhension) et
  **Personalized Practice** (révision ciblée des points faibles) — blog Duolingo, Lingoly.
- **LingoDeer** (structure « mini-cours » : notes de grammaire explicites, drills, prononciation liée aux phrases) —
  comparatifs LingoDeer vs Duolingo/Babbel.
- **Web Speech API** (reconnaissance + synthèse côté navigateur, gratuit, sans backend ; support Chrome/Edge/
  Safari, Firefox derrière un flag) — MDN, guides Web Speech API.

> Note : ces références ont guidé le **choix des axes** (oral, immersion, adaptation), pas le copiage. Tout
> est implémentable **sans backend**, en vanilla, en respectant les contraintes dures ci-dessus.

---

## Légende complexité
- **S** — Small (~30 min, 1 fichier)
- **M** — Medium (1-2 h, quelques fichiers)
- **L** — Large (plusieurs sessions ou forte dépendance)

## Rappel de philosophie v7
> v5 a rendu l'app **cohérente**, v6 l'a rendue **profonde**. v7 la rend **vivante** : on y parle, on y lit
> des histoires, et elle s'adapte à qui l'utilise. On ajoute trois couches — jamais au prix de ce qui marche déjà.
