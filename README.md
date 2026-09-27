# TürkçeYol 🇹🇷

TürkçeYol est une application web d'apprentissage du turc conçue pour les francophones débutants. L'application est développée en **Vanilla JS, HTML et CSS**, avec une approche 100% *Front-End* et *Mobile-First*, garantissant une expérience fluide, rapide et interactive.

🌟 **Application en ligne :** [Accéder à TürkçeYol](https://therebeu6.github.io/turkceyol/#dashboard)

## 🚀 Fonctionnalités Principales

- **Parcours Pédagogique (Units & Chapters)** : 18 unités et 76 chapitres progressifs, allant des bases absolues jusqu'aux temps complexes (Présent, Passé, Futur, Aoriste, Passé narratif).
- **Répétition Espacée (SRS)** : mots et verbes entrent dans une file de révision espacée (SM-2) au fil des leçons. Les phrases, elles, sont présentées en leçon et redevenues accessibles en révision une fois leur chapitre terminé, mais restent volontairement hors SRS (pas de planification individuelle par phrase).
- **Dictionnaire & Verbes** : 526 mots classés par thèmes et 48 verbes avec un module de conjugaison dynamique (présent, passé, futur, aoriste, passé narratif et leurs négations, selon ce qui est réellement disponible pour chaque verbe) pour s'entraîner aux différentes terminaisons.
- **Phrases & Mini-dialogues** : 77 expressions du quotidien rattachées aux chapitres les plus cohérents, et des dialogues en situations réelles pour s'entraîner à la compréhension et à l'usage.
- **Mode Écoute & Histoires** : entraînement à la compréhension orale et petites histoires progressives en turc.
- **Exercices Interactifs** : QCM, flashcards, remise en ordre, construction de phrase, dictées courtes et traductions inversées.
- **Gamification** : Gagnez des XP, suivez le Défi du jour (objectif d'XP quotidien configurable), maintenez votre *streak* (série de jours à objectif atteint, calculée en date locale, avec gels et mode pause) et débloquez des badges pour rester motivé au quotidien.
- **Paramètres** : thème clair/sombre, objectif XP quotidien, densité de session (courte/normale/longue), micro pour la saisie vocale, sons et vibrations, mode discret du streak. Les rappels quotidiens sont **« Bientôt disponible »** (l'interrupteur existe mais reste désactivé : aucune notification n'est envoyée).
- **Sauvegarde Locale Privée** : Toute votre progression est sauvegardée en toute sécurité directement dans la mémoire de votre navigateur (`localStorage`). Vous pouvez également importer ou exporter vos données depuis les paramètres.

## 🎓 Principes pédagogiques

- **Présenté avant d'être évalué** : un mot, un verbe ou une phrase n'est jamais testé dans un exercice avant d'avoir reçu sa propre carte de découverte dans la même leçon (ou d'être déjà maîtrisé). La révision applique la même règle : elle ne pioche que dans les chapitres réellement terminés.
- **La copule (« être »)** : enseignée comme une règle à part (*Fransız**ım***, *öğrenci**yim***), distincte du verbe *olmak* (« devenir »), pour ne pas apprendre une forme fausse dès les premières leçons d'identité.
- **Progression des temps** : un chapitre ne peut jamais tester un temps qui n'a pas encore été enseigné par un chapitre antérieur du parcours — vérifié automatiquement, pas seulement par relecture (voir Tests ci-dessous).

## 🛠️ Architecture Technique

Ce projet se distingue par son absence volontaire de frameworks lourds (ni React, ni Vue, ni Tailwind). Tout a été conçu à la main pour garantir une compréhension parfaite des mécaniques web fondamentales :
- **Routeur SPA (Single Page Application)** : Implémentation d'un système de navigation par Hash (`#`) dans `app.js`.
- **Design System** : Utilisation avancée des variables CSS (Tokens) pour supporter un *Dark Mode* fluide, un système de grille et des composants graphiques de type "glassmorphism" et "premium".
- **State Management** : Gestionnaire d'état (`state.js`) fait maison pour synchroniser l'UI et la sauvegarde locale.

## 📁 Structure du Projet

- `index.html` : Coque de l'application et conteneurs des vues.
- `css/` : Design system (`main.css`), composants (`components.css`) et keyframes (`animations.css`).
- `js/app.js` : Contrôleur principal et routeur SPA.
- `js/state.js` : Gestion des XP, Streaks et persistance locale.
- `js/data/` : Contient toutes les données pédagogiques (vocabulaire, verbes, dialogues, succès).
- `js/engine/` : Moteurs de logique métier (Générateur d'exercices, SRS, Gamification).
- `js/views/` : Scripts liés à chaque vue spécifique (Dashboard, Leçons, Révisions).

## ✅ Tests

Le projet n'a pas de suite de tests unitaires classique, mais une série d'outils Node autonomes (aucune dépendance, aucun build) qui chargent les données et le moteur dans un `vm` sandbox et vérifient des invariants pédagogiques et structurels précis :

```bash
node tools/validate-data.js            # intégrité des données (ids, références, doublons, niveaux CECRL, couverture)
node tools/smoke-test.js               # chaque chapitre génère une leçon valide, sans fuite hors-thème
node tools/verify-tense-gating.js      # aucun exercice ne porte sur un temps non enseigné à ce stade
node tools/verify-streak.js            # scénarios de calcul et de migration du streak
node tools/verify-verb-detail.js       # la fiche verbe n'affiche que les temps réellement disponibles
node tools/verify-true-false-homonyms.js  # un homonyme (ex. Yüz) ne peut pas être déclaré "Faux" à tort
node tools/verify-verb-intro-order.js  # un verbe n'est jamais testé avant sa propre carte de découverte
node tools/verify-phrase-coverage.js   # chaque phrase est rattachée, présentée puis exercée, avant révision
node tools/verify-globals.js           # tout window.X lu par l'app est bien assigné quelque part
node tools/verify-vocab-intro-order.js # idem verify-verb-intro-order, pour le vocabulaire, sur 3 densités
node tools/verify-vocab-coverage.js    # chaque mot est rattaché ou explicitement documenté hors parcours
```

Sur cette machine, `node` n'est pas nécessairement sur le PATH standard ; le binaire fourni avec Playwright (`ms-playwright-go/<version>/node.exe`) ou tout Node ≥ 18 installé normalement fonctionne.

## 📄 Documentation

Le projet contient également des documents détaillant la conception de l'application :
- [`ROADMAP_v10.md`](ROADMAP_v10.md) : dernière feuille de route (axes obligatoires 0 à 6.6 finalisés).
- [`implementation_plan.md`](implementation_plan.md) : Plan d'architecture technique et pédagogique initial.
- [`task.md`](task.md) : Suivi des tâches de développement.

---
*Projet développé de A à Z avec ❤️ pour l'apprentissage linguistique.*
