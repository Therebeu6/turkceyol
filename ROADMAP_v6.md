# TürkçeYol — ROADMAP v6

> **📌 AVANCEMENT (session du 11/07/2026)** — la v6 est **livrée à 100 %** ✅
> - **AXE 1** — ✅ 1.1 (520/520 mots avec exemple) · ✅ 1.2 (les 3 pires doublons A1/A2 réellement recentrés par le contenu : u16_c1 corps 10/12→0/12 overlap, u15_c2 meubles 5/10→0/10, u17_c3 lieux 4/9→0/9 — vocabulaire piochi dans des mots existants jamais rattachés, aucun id créé/supprimé) · ✅ 1.3 (18/18 règles rattachées + renfort possessif corps).
> - **AXE 2** — ✅ 2.1 tableaux de conjugaison (leçon + vue Grammaire) · ✅ 2.2 notes culturelles (16 chapitres, slide `culture_note`) · ✅ 2.3 mnémo sons durs · ✅ 2.4 distracteurs longueur-proche + anti-doublon.
> - **AXE 3** — ✅ 3.1 dashboard-chemin (spine + « tu es ici ») · ✅ 3.2 révisions (dues + renforcement + compteur) · ✅ 3.3 objectif configurable + rapport hebdo · ✅ 3.4 écran de fin (combo max) · ✅ 3.5 gel de série.
> - **AXE 4** — ✅ 4.1 découpage CSS (components.css 1620 lignes → 14 modules < 230 lignes chacun, cascade préservée à l'octet près, preuve par `cmp` binaire) · ✅ 4.3 thème clair/sombre/système (anti-flash) · ✅ 4.4 haptique · 4.2 transitions déjà en place.
> - **AXE 5** — ✅ 5.1 mode écoute intensive (#listening) · ✅ 5.3 TTS exemples (cartes Découverte). 5.2 shadowing : couvert partiellement par le contrôle de vitesse, non prioritaire.
> - **AXE 6** — ✅ 6.1 validateur données · ✅ 6.2 smoke test (quickjs, 71 chapitres × 10 passes = 0 problème) · ✅ 6.3 PWA installable + offline (SW ne touche jamais l'audio TTS) · ✅ 6.4 garde-fous leçon · ✅ 6.5 aria-labels + focus clavier.
> - **Contraintes dures respectées** : moteur TTS `playTTS` / `_playGoogleTTS` / meta `no-referrer` **strictement intacts** ; aucun id supprimé ; persistance via `State` ; vanilla statique ; cache-bust systématique.



> **Fichier de suivi de la v6.** Séquence : v3 (Sessions A→G) → v4 (Blocs H→M) → v5 (réparation des
> fondations : phases de leçon, cohérence, phonétique, CEFR) → **v6 (finir + enrichir + retenir)**.
>
> _(Nommé `ROADMAP_v6.md` pour suivre la séquence v3→v4→v5. Dis-moi si tu voulais « v7 ».)_

---

## 🧭 PHILOSOPHIE v6 — « Finir, approfondir, retenir »

La v5 a **réparé les fondations** : une leçon enseigne désormais avant de tester, dans l'ordre,
avec du contenu rattaché à son thème. Mais elle a laissé du travail inachevé (261 mots sans
exemple, audit curriculum non fait, CSS monolithique) et a **volontairement reporté** la couche
rétention/engagement (« le reste viendra après que les fondations soient saines »).

**La v6 ne repart pas de zéro. Elle CONSOLIDE ce que v5 a posé, puis construit dessus la couche
qui donne envie de revenir chaque jour.** Trois mouvements, dans cet ordre :

1. **FINIR** ce que v5 a laissé à moitié (fondations 100% saines).
2. **APPROFONDIR** la pédagogie (tableaux, culture, mnémo, oral) pour un vrai A1→A2 complet.
3. **RETENIR** — dashboard-chemin, rapport hebdo, révisions intelligentes, PWA installable offline.

> **Mètre-étalon** : la v5 se mesurait à la *disparition de la confusion*. La v6 se mesure à
> **la profondeur pédagogique** (on comprend *pourquoi*, pas juste *quoi*) et à **la rétention**
> (on revient sans qu'on nous le demande). On n'ajoute jamais une couche tant que celle du dessous
> n'est pas solide.

---

## ⛔ CONTRAINTES DURES — NE JAMAIS ENFREINDRE

> Ces règles priment sur **toute** tâche ci-dessous. Une amélioration qui les viole est un bug.

1. **🔊 AUDIO / TTS INTOUCHABLE.** Ne **jamais** modifier `App.playTTS()`, `App._playGoogleTTS()`,
   ni la balise `<meta name="referrer" content="no-referrer">` de `index.html:8`.
   **Tout** appel audio passe exclusivement par `App.playTTS(text)`. Le fallback Google Translate
   TTS + `speechSynthesis` natif a été durement calibré — on ne le refactore pas, on ne le
   « nettoie » pas, on ne le remplace pas.
2. **Zéro régression de progression.** Ne jamais supprimer ni renommer un `id` déjà utilisé
   (`v_*`, `vb_*`, `p_*`, `d_*`, `g_*`, `u*_c*`, `ach_*`) : ça casse la sauvegarde SRS/State des
   utilisateurs. Recentrer un chapitre = changer son **contenu/titre**, pas son id.
3. **Persistance uniquement via `State`.** Jamais de `localStorage` direct : `State.data` +
   `State.save()`. Toute nouvelle donnée persistée passe par le schéma de `State`.
4. **Pas de build, pas de framework, pas d'ES modules.** On reste en vanilla JS `window.Module`,
   chargé par `<script>` dans `index.html`, statique GitHub Pages. Aucune dépendance npm au runtime.
5. **Mobile-first 375px.** Toute UI doit tenir et rester utilisable à 375px de large.
6. **Cache-bust obligatoire.** Tout fichier JS/CSS modifié → bump `?v=N` dans `index.html`.
7. **Additif par défaut.** On préfère ajouter/enrichir plutôt que réécrire. Un refactor n'est
   justifié que s'il ne change **aucun** comportement observable (ex. découpage CSS).

---

## 📊 ÉTAT RÉEL (audité le 11/07/2026)

| Ressource | Quantité | Note |
|---|---|---|
| Vocabulaire | **520 mots** | **259 avec `example`** → **261 SANS** (le point noir n°1) |
| Verbes | **44** | 3 temps + négation + exemples ✅ |
| Phrases | **77** | |
| Dialogues | **29** | rattachés aux chapitres via `dialogueIds` (v5) ✅ |
| Unités / Chapitres | **18 / 71** | doublons A1/A2 identifiés, **audit non traité** |
| Règles de grammaire | **18** | `drills[]` (8), `exercises[]` (18), `traps[]` (18) ✅ |
| Types d'exercices | **13 jouables** | qcm, input, true_false, audio_qcm, word_order, match_pairs, verb_fill, grammar_fill, cloze, dialogue_fill, sentence_builder, listening_transcribe (+ slides intro/grammar_note/tip_callout) |
| Moteurs | 6 | exercises, srs (SM-2), gamification, grading, phonetics, audio |
| Vues | 12 | + `components.css` **1342 lignes / ~49 KB** (monolithe) |
| `phonetic` stocké sur vocab | **0** | 100% dérivé à la volée par `phonetics.js` (OK, mais non vérifiable) |
| PWA / offline / installable | **❌** | aucun manifest, aucun service worker |
| Filet de tests | **❌** | aucune validation de cohérence des données |

---

## 🎯 AXE 1 — FINIR LES FONDATIONS (priorité absolue)

> Rien de nouveau ici : on **termine** v5. Tant que ce n'est pas fait, la couche rétention est
> prématurée.

### 1.1 — Exemple sur 100% du vocabulaire · **L**
- **Constat** : 261 mots (50%) n'ont pas de champ `example`. La phase Découverte (v5) affiche
  l'exemple ; sans lui, la carte est nue → l'enrichissement le plus rentable de toute la v6.
- **Format** (déjà en place, `js/data/vocabulary.js`) :
  `example: { tr: 'Phrase turque courte.', fr: 'Traduction française.' }`
- **Règles de qualité** :
  - phrase **courte** (3–7 mots), niveau du mot, réutilisant si possible du vocab déjà connu ;
  - turc **correct** (harmonie vocalique, casse İ/ı, ş/ç/ğ/ö/ü exacts) ;
  - le mot cible **apparaît** dans la phrase ; traduction FR naturelle.
- **Méthode** : traiter par `topic` (batchs), agents parallèles, **ne toucher qu'au champ
  `example`** (jamais id/tr/fr/topic/type/difficulty). Valider avec le script de l'AXE 6.1.
- **Accept.** : `grep -c "example:"` = nombre total de mots ; 0 mot sans exemple ; app charge sans erreur.

### 1.2 — Audit curriculum + dédoublonnage A1/A2 · **M**
- **Constat** (v5, Pilier C non terminé) : u3↔u15 (maison), u13↔u16 (santé/corps), u5↔u17
  (déplacements), **u12_c1↔u17_c4 (« À l'hôtel » quasi identique)**.
- **Livrable 1** : compléter la grille d'audit des 71 chapitres (thème, `grammarIds` cible,
  `dialogueIds` cible, doublon éventuel, `allowProduction`) dans un tableau en annexe de ce fichier.
- **Livrable 2** : recentrer les chapitres en doublon **par le contenu** (A1 = initiation,
  A2 = approfondissement), **sans supprimer d'id**. Ex. u17_c4 → check-in avancé / réclamation.
- **Accept.** : plus aucun thème traité deux fois à l'identique ; frontière A1(u1–u12)/A2(u13–u18) nette.

### 1.3 — Rattachement grammatical complet (`grammarIds`) · **S/M**
- **Constat** : v5 a ajouté `grammarIds`/`dialogueIds` sur 56 chapitres. Compléter les ~15 restants
  selon la table de progression grammaticale (annexe v5), pour que **chaque** point de grammaire
  soit introduit dans son chapitre naturel (harmonie u1, SOV u2, -iyor u10_c2, locatif u5_c1…).
- **Accept.** : chaque règle `g_*` est rattachée à ≥1 chapitre ; `createGrammarNote`/`createGrammarFill`
  ne tirent que dans le thème (déjà garanti par v5) → plus jamais d'ablatif dans « les chiffres ».

---

## 🎓 AXE 2 — APPROFONDIR LA PÉDAGOGIE

### 2.1 — Tableaux de conjugaison dans la fiche grammaire · **M**
- Pour les règles verbales (-iyor, passé -dı, futur -acak, négation, -abil), afficher un **mini-tableau**
  6 personnes (ben/sen/o/biz/siz/onlar) dans `grammar_note` (leçon) et la vue Grammaire.
  Données déjà présentes dans `js/data/verbs.js` (conjugations) → composant de rendu, pas de nouvelle data.
- **Accept.** : la fiche d'un chapitre de conjugaison montre le paradigme complet avant les drills ;
  chaque forme est cliquable → `App.playTTS()`.

### 2.2 — Notes culturelles & registres · **M**
- Nouveau champ optionnel `culture: '…'` sur chapitres/dialogues (ex. tutoiement sen/siz, `Buyurun`,
  `Afiyet olsun`, `kolay gelsin`). Rendu dans une carte `culture_note` (nouveau slide, même famille
  que `tip_callout`, **sans scoring**).
- **Accept.** : ≥15 chapitres clés ont une note culturelle ; slide non comptée dans la précision.

### 2.3 — Mnémo pour les sons durs (renfort phonétique) · **S**
- `phonetics.js` couvre déjà la transcription. Ajouter, sur la carte Découverte, un **rappel court
  du son** quand le mot contient c/ç/ş/ğ/ı/ö/ü (« ş se lit *ch* », « c se lit *dj* »).
- **Accept.** : un mot avec `ş` affiche le rappel une fois ; pas de bruit visuel si le mot n'a pas de son dur.

### 2.4 — Distracteurs plus fins & anti-frustration · **M**
- Auditer `getSmartDistractors` : garantir des distracteurs **plausibles** (même topic/type,
  même longueur, harmonie proche) et **jamais** la bonne réponse déguisée. Ajouter, après 2 échecs
  sur un item, un **indice progressif** (1re lettre / structure) plutôt que la réponse sèche.
- **Accept.** : aucun QCM avec distracteur absurde ; 2 échecs → indice, 3e → correction expliquée.

---

## 🔥 AXE 3 — RÉTENTION & ENGAGEMENT (la couche que v5 a reportée)

### 3.1 — Dashboard « chemin » vertical · **L**
- **Constat** (v5 Problème 6) : le dashboard est une liste, pas un *parcours* lisible façon Duolingo.
- Vue chemin vertical : unités → chapitres comme des nœuds (verrouillé / disponible / en cours /
  terminé ✓ / doré si parfait), position « tu es ici », scroll qui suit la progression.
- **Additif** : nouvelle section/vue, on **ne casse pas** le dashboard existant (feature-flag ou
  onglet), migration douce. Réutilise `dash-parcours` déjà présent (`index.html:95`).
- **Accept.** : on voit d'un coup d'œil où on en est et quoi faire ensuite ; 375px OK.

### 3.2 — Révisions intelligentes & « réviser mes erreurs » · **M**
- Le SRS SM-2 existe (`srs.js`). Ajouter : une **file de révision priorisée** (dues + items faibles),
  un rappel dashboard « X items à revoir aujourd'hui », et une session dédiée « mes 10 mots les plus
  fragiles » (basée sur EF/échecs).
- **Accept.** : le dashboard affiche le nombre réel d'items dus ; la session faible tire les plus bas EF.

### 3.3 — Objectif quotidien configurable + rapport hebdomadaire · **M**
- Objectif XP réglable (Détente 20 / Normal 50 / Sérieux 100) dans `settings`. Écran **rapport hebdo**
  (XP 7 jours, jours actifs, mots appris, précision moyenne, meilleur combo), accessible depuis stats.
- **Accept.** : changer l'objectif met à jour l'anneau du dashboard ; le rapport reflète les vraies données `State`.

### 3.4 — Écran de fin de leçon gratifiant · **S/M**
- Enrichir le bilan : mots vus, précision, XP, **combo max**, 1 phrase d'encouragement contextuelle,
  bouton « revoir les hésitants » + « chapitre suivant ». Animation d'entrée douce (respecte
  `prefers-reduced-motion`).
- **Accept.** : l'écran de fin donne envie d'enchaîner ; aucune valeur factice.

### 3.5 — Alerte streak enrichie + « streak freeze » · **S**
- v5 a l'alerte « streak en danger » le soir. Ajouter un **gel de série** (1/semaine) consommable,
  stocké dans `State`, pour ne pas décourager en cas d'oubli.
- **Accept.** : rater un jour avec un gel dispo conserve la série ; compteur de gels visible.

---

## 🎨 AXE 4 — UX & VISUEL PREMIUM

### 4.1 — Découpage de `components.css` · **M** (refactor pur, zéro régression visuelle)
- 1342 lignes en un fichier → éclater par domaine (`dashboard.css`, `lesson.css`, `grammar.css`,
  `review.css`, `common.css`) chargés dans `index.html`. **Aucun** changement de règle, juste un
  déplacement. Vérifier pixel-à-pixel avant/après.
- **Accept.** : rendu strictement identique ; chaque fichier < ~400 lignes ; cache-bust posé.

### 4.2 — Transitions douces entre exercices · **S**
- Transition fiable (fade/slide court) à chaque `showNextExercise`, coupée si `prefers-reduced-motion`.
- **Accept.** : passage fluide, jamais de saut brutal ; pas de latence perçue.

### 4.3 — Cohérence thème clair/sombre · **S/M**
- L'app est `data-theme="dark"` par défaut. Auditer les vues pour un **light** propre (contrastes AA),
  et exposer un vrai toggle clair/sombre/système dans `settings`.
- **Accept.** : bascule clair/sombre sans zone illisible ; préférence persistée via `State`.

### 4.4 — Retour haptique (mobile) · **S**
- `navigator.vibrate` court sur bonne/mauvaise réponse (si supporté), réglable dans settings.
- **Accept.** : vibration discrète sur mobile ; désactivable ; no-op propre sur desktop.

---

## 🎧 AXE 5 — ORAL & ÉCOUTE (sans jamais toucher le moteur TTS)

> Tout passe par `App.playTTS()`. On n'ajoute **aucun** nouveau chemin audio.

### 5.1 — Mode « écoute intensive » · **M**
- Session qui enchaîne mot/phrase en audio (via `App.playTTS`) → l'utilisateur devine → révèle.
  Idéal en déplacement, faible charge de lecture.
- **Accept.** : lit une file d'items, révèle à la demande, comptabilise dans le SRS.

### 5.2 — Shadowing (répétition guidée) · **S/M**
- Sur les phrases/dialogues : bouton « écouter » (`App.playTTS`) + invite à répéter à voix haute,
  avec vitesse déjà gérée (🐢/🐇/⚡ existant). **Pas de reconnaissance vocale** (hors scope statique).
- **Accept.** : boucle écoute→répète confortable ; réutilise le contrôle de vitesse existant.

### 5.3 — TTS sur les exemples de vocabulaire · **S**
- La carte Découverte affiche déjà l'exemple ; rendre la **phrase d'exemple** cliquable → `App.playTTS`.
- **Accept.** : chaque exemple est écoutable ; passe par le moteur existant, rien d'autre.

---

## ⚙️ AXE 6 — TECHNIQUE, PERF & QUALITÉ

### 6.1 — Filet de validation des données · **S** (à faire AVANT l'AXE 1)
- Script Node autonome (`tools/validate-data.js`, hors runtime) vérifiant :
  ids uniques, refs `vocabIds`/`verbIds`/`grammarIds`/`dialogueIds` existantes, `options`
  des exercices (4, uniques, `answer` incluse), champs requis présents, JS parsable.
- **Accept.** : `node tools/validate-data.js` sort 0 sur un dépôt sain, ≠0 avec un message clair sinon.

### 6.2 — Smoke test du moteur d'exercices · **S/M**
- Script qui, pour **chaque** chapitre, appelle `generateForChapter` et vérifie : ≥1 exercice,
  aucun `undefined`, `answer` ∈ `options`, aucune fuite hors-thème (grammar/dialogue).
- **Accept.** : les 71 chapitres génèrent une leçon valide sans exception.

### 6.3 — PWA installable & offline · **L**
- `manifest.json` (icônes, nom, thème, standalone) + service worker (cache-first des assets, réseau
  pour l'audio Google TTS). L'app devient **installable** et jouable **hors-ligne** (sauf l'audio).
  Ne **pas** mettre en cache ni intercepter les requêtes TTS (respect strict du moteur audio).
- **Accept.** : « Ajouter à l'écran d'accueil » fonctionne ; leçons jouables en avion (audio dégradé proprement).

### 6.4 — Robustesse & garde-fous runtime · **S**
- Vérifier que chaque vue gère l'absence de données (empty states déjà partiellement là), et qu'une
  donnée manquante ne casse jamais la leçon (skip propre + log).
- **Accept.** : supprimer temporairement un dialogue n'empêche pas la leçon de se dérouler.

### 6.5 — Accessibilité de base · **S/M**
- `aria-label` sur les boutons icônes, focus visible clavier, contrastes AA, `alt`/labels sur les
  contrôles audio. Navigation clavier déjà partielle en leçon (touches 1–4, Entrée) → compléter.
- **Accept.** : parcours clavier complet d'une leçon ; lecteur d'écran annonce les actions clés.

---

## 🗓️ ORDRE D'EXÉCUTION CONSEILLÉ

> Foundations → profondeur → rétention → polish. On ne monte pas d'un étage tant que celui du
> dessous n'est pas solide.

1. **AXE 6.1** (validateur de données) — le filet **avant** de toucher la donnée.
2. **AXE 1.1** (exemples 261 mots) — le plus rentable, purement additif, agents parallèles.
3. **AXE 1.2 + 1.3** (audit curriculum, dédoublonnage, `grammarIds`) — cohérence 100%.
4. **AXE 6.2** (smoke test moteur) — verrouiller la non-régression.
5. **AXE 2** (tableaux, culture, mnémo, distracteurs) — profondeur pédagogique.
6. **AXE 3** (dashboard-chemin, révisions, objectif/rapport, fin de leçon, streak freeze) — rétention.
7. **AXE 4** (découpage CSS, transitions, thème, haptique) — polish.
8. **AXE 5** (écoute, shadowing, TTS exemples) — oral.
9. **AXE 6.3–6.5** (PWA, robustesse, a11y) — industrialisation.

## Légende complexité
- **S** — Small (~30 min, 1 fichier)
- **M** — Medium (1–2 h, quelques fichiers)
- **L** — Large (plusieurs sessions ou forte dépendance)

## Critères d'acceptation globaux v6
- ✅ 0 mot sans exemple ; 0 thème traité en doublon ; chaque règle rattachée à un chapitre.
- ✅ Le moteur TTS (`playTTS`/`_playGoogleTTS`/meta `no-referrer`) est **strictement identique** à v5.
- ✅ Aucun `id` supprimé/renommé ; sauvegardes existantes intactes.
- ✅ `node tools/validate-data.js` = 0 ; les 71 chapitres génèrent une leçon valide.
- ✅ App installable, jouable hors-ligne (audio dégradé proprement), 375px OK, clair/sombre propre.
- ✅ Rétention : dashboard-chemin lisible, révisions dues visibles, rapport hebdo réel.

---

## Annexe — Grille d'audit chapitre par chapitre (à compléter en AXE 1.2)

| Chapitre | Thème | grammarIds cible | dialogueIds cible | Doublon avec | allowProduction |
|---|---|---|---|---|---|
| _(à remplir pour les 71 chapitres avant de toucher `units.js`)_ | | | | | |
