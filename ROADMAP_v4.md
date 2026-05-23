# TürkçeYol — ROADMAP v4

Suite de la ROADMAP v3 (Sessions A→G terminées). L'app est déjà solide sur les bases produit, mais elle peut encore beaucoup s'enrichir côté contenu, pédagogie, rétention et profondeur UX.

Cette v4 vise un double objectif : approcher un vrai socle CEFR A1 complet en turc, puis préparer une montée vers A2 avec plus de production active, plus de matière, et plus de systèmes de progression.

---

## État actuel

Le projet dispose déjà d'une base sérieuse : plusieurs vues pédagogiques, un moteur SRS type SM-2, une gamification fonctionnelle, une UX mobile améliorée et une première vue grammaire. Le positionnement commence à ressembler à une vraie app d'apprentissage, mais le contenu reste encore trop court face à un parcours A1-A2 complet, et plusieurs mécaniques à fort impact (écoute intensive, production active, ligues, adaptatif, stats avancées) manquent encore. Les apps de langue qui retiennent bien leurs utilisateurs combinent justement volume de contenu, répétition intelligente, objectifs clairs, feedback constant et progression lisible.

---

## AXE 1 — Contenu A1/A2 plus dense

### Constat
Le volume actuel est bon pour une app proto avancée, mais encore léger pour couvrir tout un A1 solide. Des listes académiques alignées CEFR pour le turc montrent qu'un vrai socle A1 représente un corpus lexical très large, bien au-delà de quelques centaines d'entrées, avec un enrichissement thématique important et progressif.

Le syllabus A1/A2 en turc couvre aussi davantage de cas grammaticaux, de suffixes, de fonctions communicatives et de situations concrètes que ce que l'app expose aujourd'hui. Les programmes A1 et A2 officiels incluent typiquement les cas essentiels, les structures interrogatives, les usages du passé, les comparatifs, les connecteurs, les routines sociales, les déplacements, la santé et les interactions de service.

### Objectif
Passer d'un contenu “bon prototype riche” à un contenu “vrai parcours débutant structuré”, avec plus de profondeur thématique, plus de dialogues, plus de phrases réutilisables, et une progression cohérente du simple vers le contextuel.

### Checklist vocabulaire
- [ ] Ajouter un bloc **corps humain** (+20 mots) — tête, yeux, nez, bouche, bras, main, doigt, jambe, pied, dos, ventre, cœur, dents, cheveux, etc. — `js/data/vocabulary.js` — **S**
- [ ] Ajouter un bloc **maison & pièces** (+25 mots) — salon, cuisine, chambre, salle de bain, fenêtre, porte, lit, table, chaise, armoire, canapé, four, frigo, miroir, etc. — `js/data/vocabulary.js` — **S**
- [ ] Ajouter un bloc **vêtements** (+20 mots) — pull, veste, manteau, pantalon, robe, chemise, chaussures, chaussettes, ceinture, chapeau, sac, etc. — `js/data/vocabulary.js` — **S**
- [ ] Ajouter un bloc **transports** (+20 mots) — bus, métro, taxi, train, gare, arrêt, billet, avion, aéroport, vélo, moto, route, trafic, etc. — `js/data/vocabulary.js` — **S**
- [ ] Ajouter un bloc **ville & lieux publics** (+20 mots) — parc, poste, banque, hôpital, hôtel, restaurant, musée, cinéma, marché, université, pharmacie, etc. — `js/data/vocabulary.js` — **S**
- [ ] Ajouter un bloc **santé** (+15 mots) — médecin, médicament, douleur, fièvre, blessure, rendez-vous, fatigue, allergie, etc. — `js/data/vocabulary.js` — **S**
- [ ] Ajouter un bloc **travail & école** (+20 mots) — bureau, cours, examen, professeur, étudiant, cahier, stylo, réunion, collègue, patron, salaire, etc. — `js/data/vocabulary.js` — **S**
- [ ] Ajouter un bloc **nature & météo étendue** (+15 mots) — forêt, montagne, plage, mer, neige, vent, nuage, tempête, soleil, lune, étoile, etc. — `js/data/vocabulary.js` — **S**
- [ ] Ajouter un bloc **couleurs, tailles, formes, opposés** (+20 mots) — rouge, bleu, vert, rond, carré, grand, petit, rapide, lent, fort, faible, propre, sale, etc. — `js/data/vocabulary.js` — **S**
- [ ] Ajouter un bloc **temps avancé** (+15 mots) — avant-hier, après-demain, semaine prochaine, mois dernier, premier, deuxième, tôt, tard, etc. — `js/data/vocabulary.js` — **S**
- [ ] Enrichir les mots existants avec davantage de champs `example` et, si utile, `phonetic` pour les mots qui posent problème à un francophone — `js/data/vocabulary.js` — **M**

### Checklist verbes, phrases, dialogues
- [ ] Ajouter un lot **verbes A2 prioritaires** (+15) — öğrenmek, öğretmek, hatırlamak, unutmak, başlamak, bitirmek, sormak, cevaplamak, bulmak, kaybetmek, söylemek, ağlamak, gülmek, taşımak, hazırlamak — `js/data/verbs.js` — **M**
- [ ] Ajouter pour chaque nouveau verbe : conjugaisons présentes/passées/futures + négations + 3 exemples min — `js/data/verbs.js` — **M**
- [ ] Ajouter **+50 phrases utiles** orientées vie réelle — hôtel, restaurant, transport, santé, achats, orientation, urgences, conversation sociale — `js/data/phrases.js` — **M**
- [ ] Ajouter **+20 dialogues** plus longs et plus situés — gare, pharmacie, réception d'hôtel, trajet en taxi, shopping, commande au restaurant, consultation médicale, demande de direction — `js/data/dialogues.js` — **M**
- [ ] Créer des dialogues “à embranchements légers” avec 2 ou 3 variantes de réponse pour enrichir le réemploi — `js/data/dialogues.js` — **L**

### Checklist grammaire
- [ ] Étendre `js/data/grammar.js` à 15–20 règles structurées, avec titre, règle courte, mini-tableau, exemples et pièges fréquents — `js/data/grammar.js` — **L**
- [ ] Couvrir explicitement : accusatif, datif/directionnel, locatif, ablatif, possessif, question -mı/-mi, pluriel -lar/-ler, comparatif, superlatif, capacité -abil, négation, -ki, ordre SOV, connecteurs simples, passé narratif -mış, formes en -madan, -arak, -ip — `js/data/grammar.js` — **L**
- [ ] Ajouter des liens entre règle ↔ exemples ↔ exercices générés pour éviter une grammaire “isolée” — `js/data/grammar.js`, `js/engine/exercises.js`, `js/views/grammar.js` — **L**

### Checklist structure pédagogique
- [ ] Créer **4 nouvelles unités minimum** — u15 à u18 — autour de : corps/santé, maison/quotidien, ville/transports, grammaire cas/suffixes — `js/data/units.js` — **M**
- [ ] Réorganiser certains chapitres pour mieux séparer “acquisition de mots” et “mise en contexte” — `js/data/units.js` — **M**
- [ ] Introduire des chapitres “révision mixte” qui mélangent plusieurs topics au lieu de rester 100% thématiques — `js/data/units.js`, `js/engine/exercises.js` — **M**

---

## AXE 2 — Plus de types d'exercices

### Constat
Les apps de langue les plus efficaces alternent reconnaissance, rappel actif, écoute, transformation et production. Les mécaniques répétitives mais variées aident à maintenir l'engagement et la mémorisation sur le long terme.

### Objectif
Passer d'un moteur “déjà varié” à un moteur “riche et durable”, où chaque compétence est attaquée sous plusieurs angles : lire, reconnaître, compléter, écouter, réordonner, écrire, choisir et reconstruire.

### Checklist
- [ ] Ajouter **`cloze` avancé** avec phrase à trou + distracteurs cohérents sémantiquement — `js/engine/exercises.js`, `js/views/lesson.js`, `js/views/review.js` — **M**
- [ ] Ajouter **`grammar_fill`** centré suffixes/cas — mot racine + consigne grammaticale + validation intelligente — `js/engine/exercises.js`, `js/views/lesson.js` — **M**
- [ ] Ajouter **`dialogue_fill`** à partir des dialogues existants — réplique manquante ou choix de réponse logique — `js/engine/exercises.js`, `js/views/lesson.js` — **M**
- [ ] Ajouter **`sentence_builder`** — construire une phrase correcte à partir d'éléments fournis — `js/engine/exercises.js`, `js/views/lesson.js` — **L**
- [ ] Ajouter **`listening_transcribe`** — lecture TTS d'une phrase puis saisie libre avec correction tolérante — `js/engine/exercises.js`, `js/views/lesson.js` — **L**
- [ ] Ajouter un mode **`minimal_pairs`** ou “confusions fréquentes” pour entraîner des distinctions proches chez un francophone — `js/engine/exercises.js` — **M**
- [ ] Faire varier automatiquement le **ratio des types d'exercices** selon le niveau, afin de ne pas injecter trop tôt les exercices les plus exigeants — `js/engine/exercises.js` — **M**
- [ ] Ajouter un système de **`difficultyProfile`** par type d'exercice pour mieux calibrer le SRS et les récompenses — `js/engine/exercises.js`, `js/engine/srs.js` — **L**

---

## AXE 3 — Engagement, rétention, boucle quotidienne

### Constat
Les apps grand public les plus retenantes reposent sur une boucle simple : objectif du jour, petite victoire rapide, progression visible, pression douce via streak/league, et récompense claire à chaque session. Les systèmes de leaderboards et d'objectifs quotidiens sont au cœur de cette logique chez Duolingo.

### Objectif
Donner à l'utilisateur une raison de revenir tous les jours, même pour une session courte, avec une sensation constante de progression visible.

### Checklist
- [ ] Ajouter des **objectifs quotidiens configurables** (5 / 10 / 20 / 50 XP ou équivalent en exercices) — `js/views/settings.js`, `js/views/dashboard.js`, `js/state.js` — **M**
- [ ] Afficher une **barre de progression du jour** sur le dashboard, avec message motivant dynamique — `js/views/dashboard.js` — **S**
- [ ] Ajouter un **freeze de streak complet** : compteur, gain, consommation automatique, feedback visuel — `js/engine/gamification.js`, `js/state.js`, `js/views/dashboard.js`, `js/views/settings.js` — **M**
- [ ] Créer une **vue ligues hebdomadaires** inspirée des leaderboards : Bronze → Diamant, classement hebdo, montée/descente, reset semaine — `js/views/league.js`, `js/engine/gamification.js`, `js/state.js`, `index.html` — **L**
- [ ] Ajouter un **rapport hebdomadaire** : XP, mots appris, jours actifs, meilleur jour, comparaison semaine précédente — `js/views/dashboard.js`, `js/state.js` — **M**
- [ ] Ajouter une **alerte streak en danger** en soirée si aucune activité du jour — `js/views/dashboard.js` — **S**
- [ ] Ajouter un bouton **partager ma progression** depuis l'écran de fin — image canvas téléchargeable — `js/views/lesson.js`, `js/engine/share.js` — **L**
- [ ] Ajouter des **quêtes courtes** ou mini-objectifs annexes (“fais 3 exercices audio”, “réussis 5 réponses d'affilée”) — `js/engine/gamification.js`, `js/views/dashboard.js` — **M**

---

## AXE 4 — Écoute, oral, production active

### Constat
Les apps de langue modernes ne se limitent pas à la reconnaissance visuelle : elles injectent aussi de l'écoute active, du shadowing, de la répétition orale et parfois de la reconnaissance vocale. Les interfaces de speech recognition demandent néanmoins une UX claire, tolérante et bien guidée pour éviter la frustration.

### Objectif
Faire entrer l'app dans une logique plus “vivante” où l'utilisateur écoute, répète, prononce, et produit davantage, même avec des contraintes purement front-end.

### Checklist
- [ ] Ajouter un **mode écoute intensive** dédié — 10 phrases audio + QCM de compréhension — `js/views/listening.js`, `index.html` — **M**
- [ ] Ajouter du **shadowing** dans les dialogues : écouter, répéter, valider, rejouer — `js/views/dialogues.js`, `js/engine/audio.js` — **L**
- [ ] Ajouter un **bouton micro** optionnel sur certains exercices `input`, via Web Speech API si `tr-TR` est disponible — `js/views/lesson.js`, `js/views/settings.js` — **L**
- [ ] Ajouter un mode **prononciation guidée** avec phrase affichée mot à mot et lecture ralentie si besoin — `js/views/dialogues.js`, `js/engine/audio.js` — **L**
- [ ] Ajouter des champs `phonetic` sur les mots et expressions difficiles pour un public francophone — `js/data/vocabulary.js`, `js/data/phrases.js`, `js/views/vocabulary.js`, `js/views/phrases.js` — **M**
- [ ] Ajouter des **boutons TTS sur tous les exemples de verbes**, pas seulement sur l'infinitif — `js/views/verbs.js` — **S**

---

## AXE 5 — Parcours adaptatif et personnalisation

### Constat
Les bonnes apps adaptent soit le contenu, soit le rythme, soit le type de révision au profil de l'utilisateur. L'adaptation n'a pas besoin d'être “IA” pour être utile : quelques embranchements intelligents suffisent souvent à améliorer la sensation de personnalisation.

### Objectif
Faire en sorte que deux utilisateurs n'aient plus exactement le même parcours, selon leur niveau, leurs objectifs et leurs faiblesses.

### Checklist
- [ ] Ajouter un **test de niveau initial** au premier lancement — `js/views/onboarding.js`, `index.html`, `js/state.js` — **M**
- [ ] Proposer un **objectif d'apprentissage** (voyage, série, quotidien, travail) et ajuster les priorités de contenu — `js/views/onboarding.js`, `js/data/units.js`, `js/engine/exercises.js` — **L**
- [ ] Ajouter les **favoris ⭐** sur mots, verbes, phrases, puis un mode de révision dédié — `js/views/vocabulary.js`, `js/views/verbs.js`, `js/views/phrases.js`, `js/views/review.js`, `js/state.js` — **M**
- [ ] Ajouter des **notes personnelles** stockées par item — `js/views/vocabulary.js`, `js/views/verbs.js`, `js/state.js` — **M**
- [ ] Ajouter une **logique de révisions ciblées par faiblesse** (suffixes, audio, verbes, ordre des mots, etc.) — `js/engine/srs.js`, `js/engine/exercises.js`, `js/views/review.js` — **L**
- [ ] Ajouter une préférence de **densité de session** (courte, normale, longue) pour ajuster le nombre d'exercices servis — `js/views/settings.js`, `js/engine/srs.js`, `js/state.js` — **M**

---

## AXE 6 — Stats avancées, robustesse, qualité perçue

### Constat
Quand une app grandit, la richesse de ses stats, la sécurité des données et la sensation de fiabilité deviennent aussi importantes que le contenu lui-même. Une roadmap bien tenue dans des fichiers Markdown versionnés est aussi une bonne pratique de projet, car elle garde l'historique du plan et facilite l'itération.

### Objectif
Rendre l'app plus rassurante, plus lisible, plus “produit fini”, avec des stats utiles et des mécanismes de sauvegarde/récupération propres.

### Checklist
- [ ] Ajouter **export/import JSON complet** de `State.data` — `js/views/settings.js` — **M**
- [ ] Ajouter une vraie **vue stats avancées** : XP sur 30 jours, heatmap 12 semaines, mots par topic, erreurs par type d'exercice, rétention estimée — `js/views/stats.js`, `js/engine/srs.js` — **L**
- [ ] Ajouter un **mode hors-ligne explicite** avec bannière et désactivation des modes audio incompatibles — `js/app.js`, `js/views/dashboard.js` — **S**
- [ ] Ajouter des **tooltips d'onboarding** par vue importante — `js/views/lesson.js`, `js/views/review.js`, `js/views/stats.js`, `js/views/grammar.js`, `js/state.js` — **M**
- [ ] Ajouter un **smoke test manuel console** pour vérifier les briques clés après chaque grosse session — `js/tests/smoke.js` — **S**
- [ ] Ajouter une **logique de migration de version d'état** si `State.data` change de format dans les futures sessions — `js/state.js` — **M**
- [ ] Éviter le **flash du dark mode** au chargement via script inline dans `<head>` — `index.html` — **S**

---

## AXE 7 — UI/UX encore plus premium

### Constat
L'UX a déjà été enrichie, mais les apps très aimées travaillent énormément les micro-interactions, les rythmes de feedback, les transitions entre états, les signaux visuels de réussite, et la qualité émotionnelle des écrans de fin. Les stratégies d'engagement dans l'edtech insistent souvent sur la clarté immédiate, les retours rapides et la progression visible.

### Objectif
Faire monter l'app d'un cran visuel et sensoriel, sans casser sa simplicité ni ses perfs.

### Checklist
- [ ] Ajouter des **micro-états de réussite** plus riches : pulse, glow, petites particules localisées, badges temporaires — `css/animations.css`, `js/views/lesson.js` — **M**
- [ ] Enrichir l'**écran de fin** avec stats mini-session, erreurs dominantes, mots difficiles, bouton rejouer ciblé, phrase motivante contextuelle — `js/views/lesson.js`, `index.html` — **M**
- [ ] Ajouter des **transitions de vue** plus cohérentes entre dashboard / units / lesson / grammar — `js/app.js`, `css/animations.css` — **M**
- [ ] Ajouter des **empty states** plus travaillés pour les vues peu remplies — `js/views/*.js`, `css/components.css` — **M**
- [ ] Ajouter des **squelettes à davantage d'écrans** que dashboard/units si pertinent — `js/views/stats.js`, `js/views/grammar.js`, `js/views/dialogues.js` — **S**
- [ ] Ajouter un système de **callouts pédagogiques** (“attention à l'harmonie vocalique ici”) pendant la leçon quand une erreur récurrente est détectée — `js/views/lesson.js`, `js/engine/srs.js` — **L**
- [ ] Ajouter une **rangée d'accès rapide configurable** sur le dashboard selon l'usage récent — `js/views/dashboard.js`, `js/state.js` — **M**

---

## Ordre d'exécution recommandé

### Bloc H — Volume pédagogique
1. Vocabulaire massif (corps, maison, vêtements, transports, ville, santé, travail, nature).
2. Verbes A2 + phrases utiles + dialogues supplémentaires.
3. Nouvelles unités et réorganisation des chapitres.

### Bloc I — Grammaire exploitable
1. Étendre `grammar.js`.
2. Relier les règles à de vrais exercices.
3. Ajouter les points A1 obligatoires avant de pousser plus loin l'A2.

### Bloc J — Exercices avancés
1. `cloze`, `grammar_fill`, `dialogue_fill`.
2. Puis `sentence_builder`.
3. Puis `listening_transcribe` quand le contenu audio est assez dense.

### Bloc K — Rétention produit
1. Objectif quotidien.
2. Freeze streak.
3. Ligues hebdo.
4. Rapport hebdomadaire.

### Bloc L — Oral / écoute
1. Mode écoute intensive.
2. Audio sur tous les exemples.
3. Shadowing.
4. Micro Web Speech API optionnel.

### Bloc M — Personnalisation / stats / robustesse
1. Favoris + notes.
2. Test de niveau.
3. Export/import.
4. Stats avancées.
5. Migrations d'état et smoke tests.

---

## Contraintes techniques

- **Ne pas casser le TTS existant** : toute lecture audio doit continuer à passer par `App.playTTS(...)` ou s'appuyer proprement dessus quand c'est possible.
- **Repo GitHub Pages statique** : pas de backend, pas de build complexe, pas de dépendance serveur.
- **Cache-bust obligatoire** : incrémenter les versions `?v=N` à chaque évolution front importante.
- **Architecture actuelle à respecter** : modules globaux `window.X`, sans refonte brutale vers un autre modèle.
- **Compatibilité mobile 375px minimum** à préserver à chaque session.
- **Accessibilité motion** : toute nouvelle animation doit rester compatible avec `prefers-reduced-motion`.
- **Persistance via State** : éviter les écritures dispersées hors de la logique existante.
- **Documents roadmap versionnés** : garder `ROADMAP.md` intact et créer cette nouvelle version dans un fichier séparé est cohérent avec les bonnes pratiques de documentation Markdown versionnée.

---

## Légende complexité

- **S** — Small (1 session courte, ~30 min)
- **M** — Medium (1 session, 1–2 h)
- **L** — Large (plusieurs sessions ou dépendance forte)
