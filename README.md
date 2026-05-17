# TürkçeYol 🇹🇷

TürkçeYol est une application web d'apprentissage du turc conçue pour les francophones débutants. L'application est développée en **Vanilla JS, HTML et CSS**, avec une approche 100% *Front-End* et *Mobile-First*, garantissant une expérience fluide, rapide et interactive.

🌟 **Application en ligne :** [Accéder à TürkçeYol](https://therebeu6.github.io/turkceyol/#dashboard)

## 🚀 Fonctionnalités Principales

- **Parcours Pédagogique (Units & Chapters)** : 12 unités progressives, allant des bases absolues jusqu'aux temps complexes (Passé, Futur).
- **Répétition Espacée (SRS)** : Un système intelligent de mémorisation qui vous représente les mots, verbes et phrases au bon moment pour ancrer l'apprentissage à long terme.
- **Dictionnaire & Verbes** : Une base de vocabulaire classée par thèmes et un module de conjugaison dynamique pour s'entraîner aux différentes terminaisons.
- **Exercices Interactifs** : QCM, flashcards, et traductions inversées.
- **Gamification** : Gagnez des XP, maintenez votre *streak* (série de jours) et débloquez des badges pour rester motivé au quotidien.
- **Sauvegarde Locale Privée** : Toute votre progression est sauvegardée en toute sécurité directement dans la mémoire de votre navigateur (`localStorage`). Vous pouvez également importer ou exporter vos données depuis les paramètres !

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

## 📄 Documentation

Le projet contient également des documents détaillant la conception de l'application :
- [`implementation_plan.md`](implementation_plan.md) : Plan d'architecture technique et pédagogique initial.
- [`task.md`](task.md) : Suivi des tâches de développement.

---
*Projet développé de A à Z avec ❤️ pour l'apprentissage linguistique.*
