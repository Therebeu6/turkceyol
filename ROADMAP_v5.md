# TürkçeYol — ROADMAP v5

> **📌 ÉTAT (10/07/2026 — session V5-1)** : le noyau de la v5 est **implémenté** ✅
> - **Pilier B ✅** — aléatoire tué : `grammarIds`/`dialogueIds` sur 56 chapitres, `createGrammarFill(chapter)` /
>   `createDialogueFill(chapter)` / `createSentenceBuilder` / `createListeningTranscribe` contextualisés,
>   fallback vocab global supprimé. Révision (sans chapitre) = tirage libre conservé.
> - **Pilier A ✅ (noyau)** — leçon en phases Découverte → Pratique → Rappel → Production :
>   `intro_card` (mot + TTS auto + exemple + phonétique, skip si SRS step≥2), `grammar_note`
>   (fiche règle + pièges avant les exos), `tip_callout`, précision hors slides d'enseignement.
> - **Pilier E ✅** — gating production (u1 reconnaissance pure / u2 saisie / u3+ tout),
>   anti-répétition de type, difficulté croissante par phases, chip de phase dans la barre de leçon.
> - **Pilier C ✅ (léger)** — `cefr` par unité + badge A1/A2, `canDo` sur les 71 chapitres +
>   bandeau 🎯 objectif en leçon, titres doublons différenciés (sans casser les ids sauvegardés).
> - **Pilier D ✅ (moteur)** — **`js/engine/phonetics.js`** : phonétique TR→FR automatique par règles
>   (mieux que le plan : couvre 100% des mots sans data). `traps[]` sur les 18 règles (leçon + vue
>   Grammaire), `tips[]` sur 8 chapitres clés. *Reste : `example` sur les ~261 mots sans exemple.*
> - **Pilier F/G ✅ (partiel)** — chip de phase, alerte streak en danger le soir. L'objectif quotidien,
>   les révisions dues, l'écran de fin enrichi et « revoir les erreurs » existaient déjà (v3/v4).
>   *Reste (plus tard) : dashboard-chemin, découpage CSS, ligues/rapport hebdo.*

## « Réparer les fondations » — Cohérence, pédagogie & expérience d'apprentissage

> Les roadmaps v3 (Sessions A→G) et v4 (Blocs H→M) ont **ajouté** : du contenu, des types
> d'exercices, de la gamification, une vue grammaire, un SRS type SM-2. Résultat : une app
> riche mais **désordonnée**. On teste des mots jamais présentés, une leçon « Les chiffres »
> peut afficher un drill sur l'ablatif ou un dialogue chez le médecin, la moitié du vocabulaire
> n'a pas d'exemple, et rien n'enseigne avant d'interroger.
>
> **La v5 ne rajoute presque rien. Elle RÉPARE, STRUCTURE et POLIT.**
> Objectif : qu'un vrai débutant francophone puisse progresser en turc de façon fluide,
> logique et motivante, avec des leçons cohérentes qui enseignent avant de tester.
>
> Chaque tâche est autonome et référencée (`fichier:ligne`) pour être exécutable
> par une session isolée sans contexte supplémentaire.

---

## SOMMAIRE

- [0. Diagnostic brutal (l'état réel, preuves à l'appui)](#0--diagnostic-brutal)
- [1. Vision cible (à quoi ressemble une bonne leçon)](#1--vision-cible)
- [2. Ce qu'on vole aux meilleures apps](#2--ce-quon-vole-aux-meilleures-apps)
- [PILIER A — Architecture de leçon « Apprendre → Pratiquer → Produire »](#pilier-a--architecture-de-leçon)
- [PILIER B — Tuer l'aléatoire : cohérence de contenu](#pilier-b--tuer-laléatoire)
- [PILIER C — Refonte du curriculum (progression logique)](#pilier-c--refonte-du-curriculum)
- [PILIER D — Enrichissement pédagogique (exemples, phonétique, pièges)](#pilier-d--enrichissement-pédagogique)
- [PILIER E — Moteur d'exercices (gating, équilibrage, distracteurs)](#pilier-e--moteur-dexercices)
- [PILIER F — Refonte visuelle & UX premium](#pilier-f--refonte-visuelle--ux-premium)
- [PILIER G — Boucle de rétention & engagement](#pilier-g--boucle-de-rétention--engagement)
- [3. Modèle de données cible (nouveaux champs)](#3--modèle-de-données-cible)
- [4. Plan d'exécution phasé](#4--plan-dexécution-phasé)
- [5. Critères d'acceptation globaux](#5--critères-dacceptation-globaux)
- [6. Contraintes techniques](#6--contraintes-techniques)
- [7. Annexe — Grille d'audit chapitre par chapitre](#7--annexe--grille-daudit-chapitre-par-chapitre)

---

## 0 — DIAGNOSTIC BRUTAL

### État réel (compté le 10/07/2026)

| Ressource | Quantité | Détail |
|---|---|---|
| Vocabulaire | **520 mots** | dont **259 avec `example`** (50% → l'autre moitié n'a rien) |
| Verbes | **~44 verbes** | conjugués 3 temps + négations + exemples |
| Phrases | **77** | |
| Dialogues | **29** | |
| Unités | **18** (u1→u18) | |
| Chapitres | **71** | |
| Règles de grammaire | **18** | avec `drills[]` (leçon) + `exercises[]` (overlay pratique) |
| Vues | **12** | dashboard, units, lesson, review, verbs, vocab, phrases, dialogues, stats, grammar, settings, daily |
| CSS | 3 fichiers | `components.css` = 49 KB (devient dur à maintenir) |

### Les 6 problèmes-racines (par ordre de gravité)

#### 🔴 PROBLÈME 1 — Injection de contenu aléatoire dans les leçons
**C'est LA cause du « on tombe sur des choses qui n'ont rien à voir avec le titre ».**

- `js/engine/exercises.js:96` et `:153` → `this.createGrammarFill()` est appelé **sans argument**.
  La fonction (`:380`) fait `AppGrammar.filter(g => g.drills…)` puis choisit une règle **au hasard**
  parmi les 18, et un drill **au hasard** dedans. Un chapitre « Politesse » peut donc afficher
  un exercice sur le cas ablatif.
- `js/engine/exercises.js:326` → `createDialogueFill()` choisit un dialogue **au hasard**
  parmi les 29 (`AppDialogues[Math.floor(Math.random()*…)]`), aucun lien avec le thème.
  Chapitre « Les couleurs » → dialogue à la gare.
- `js/engine/exercises.js:22-31` → si un chapitre a moins de 4-5 mots, le vocab est complété
  par du **vocabulaire global aléatoire** (`this._shuffle(extra)`), injectant des mots hors sujet.

> Les commits récents (`cbfd692`, `2735c3a`) ont déjà commencé à filtrer `sentence_builder`
> et `listening_transcribe` par thème. **Il faut finir le travail** sur `grammar_fill`,
> `dialogue_fill` et le fallback vocab.

#### 🔴 PROBLÈME 2 — Aucune phase d'apprentissage : on teste sans enseigner
`js/views/lesson.js:23-41` → `render()` appelle `generateForChapter()` puis `showNextExercise()`
**directement**. Il n'y a **aucune** présentation des mots, aucune règle expliquée, aucun exemple
montré avant le premier QCM. L'utilisateur doit deviner des mots qu'il n'a jamais vus.
→ C'est exactement ce que tu décris : *« il faut des mini-remarques dans la même leçon que les exos »*.

#### 🟠 PROBLÈME 3 — Redondance thématique dans le curriculum
Les unités A2 (u15→u18) ont été greffées après coup et **dupliquent** des thèmes A1 :
- **u15** « Ma maison » ↔ **u3_c2** « Mots de la maison »
- **u16** « Corps, santé & bien-être » ↔ **u13** « Santé et météo » (u13_c2 « Mon corps », u13_c3 « Je ne me sens pas bien »)
- **u17** « Transports, ville & voyages » ↔ **u5** « Se déplacer » (lieux, directions, transports)
- **u12_c1** « À l'hôtel » ↔ **u17_c4** « À l'hôtel » (doublon quasi littéral)

Pas de frontière A1/A2 claire ; le parcours a grossi par accumulation, pas par design.

#### 🟠 PROBLÈME 4 — Métadonnées pédagogiques trop minces
- 50% du vocab sans `example`.
- **Aucun champ `phonetic`** : un francophone ne sait pas que `c` = « dj », `ş` = « ch »,
  `ğ` allonge la voyelle, `ı` = « e » sourd, `ö`/`ü` = sons français. Sons pourtant enseignés
  dans le tout premier chapitre (u1_c1) mais jamais rappelés ensuite.
- Les chapitres ne référencent **aucune règle de grammaire** (`grammarIds` absent) ni dialogue
  (`dialogueIds` absent). La grammaire vit isolée dans sa vue, déconnectée des leçons.
- Aucune note culturelle, aucun « piège » signalé.

#### 🟡 PROBLÈME 5 — Difficulté non progressive dans la leçon
`generateForChapter` mélange puis `_shuffle` tous les exercices (`:113`). Un `sentence_builder`
ou un `listening_transcribe` (production active, difficile) peut tomber **avant** le moindre QCM
de reconnaissance. Aucune montée en difficulté intra-leçon (reconnaître → rappeler → produire).

#### 🟡 PROBLÈME 6 — Dette visuelle & UX
- Passage d'un exercice à l'autre **brutal** (pas de transition douce fiable).
- Dashboard = liste d'unités, pas un « chemin » lisible façon parcours.
- `components.css` monolithique (49 KB) → difficile à faire évoluer proprement.
- Écran de fin de leçon succinct, peu gratifiant.

---

## 1 — VISION CIBLE

### Avant / Après d'une leçon

**❌ AUJOURD'HUI — chapitre « u1_c5 : Les chiffres 1–10 »**
```
[QCM] "Que signifie Yedi ?"          ← on n'a jamais montré "Yedi"
[grammar_fill] cas ablatif marketten ← rien à voir avec les chiffres
[dialogue_fill] dialogue à la gare   ← rien à voir
[input] "trois" en turc ?            ← jamais enseigné
[QCM] "Que signifie Beş ?"
→ fin. XP + confetti.
```

**✅ CIBLE — même chapitre**
```
ÉTAPE 1 · DÉCOUVERTE (enseigner)
  Carte 1 : Bir = un   🔊  ex: "Bir kahve, lütfen." (Un café, svp)
  Carte 2 : İki = deux 🔊  ex: "İki kardeşim var." (J'ai deux frères)
  … (5 mots présentés avec audio + exemple + phonétique)
  💡 Astuce : en turc les chiffres sont invariables, pas d'accord.

ÉTAPE 2 · PRATIQUE GUIDÉE (reconnaître — facile)
  [audio_qcm] 🔊 "…" → Bir / İki / Üç / Dört
  [match_pairs] associer 4 chiffres TR↔FR

ÉTAPE 3 · RAPPEL ACTIF (produire — moyen)
  [QCM FR→TR] "cinq" → Beş
  [input] écris "sept" en turc → Yedi

ÉTAPE 4 · MISE EN CONTEXTE (appliquer — thème respecté)
  [cloze] "____ kahve, lütfen." (Deux cafés svp) → İki
  (exemple tiré du vocab DU CHAPITRE, pas d'un dialogue au hasard)

ÉTAPE 5 · BILAN
  5/5 mots vus · précision 90% · +70 XP
  "Revoir les 2 mots hésitants" · "Continuer"
```

### Principe directeur
> **Chaque leçon = 1 objectif clair, 5–8 items maximum, 1 point de grammaire maximum,
> et 100% du contenu rattaché au thème du chapitre. On enseigne, puis on entraîne du
> facile vers le difficile, puis on met en situation.**

---

## 2 — CE QU'ON VOLE AUX MEILLEURES APPS

| App | Ce qu'elle fait de mieux | Ce qu'on reprend pour TürkçeYol |
|---|---|---|
| **Duolingo** | Le « path » (chemin) linéaire lisible, streak, ligues, feedback instantané, unités à objectif « can-do » | Dashboard en chemin vertical, objectif quotidien, écran de fin gratifiant, micro-feedback sonore/visuel |
| **LingoDeer** | Référence pour les langues **à cas / agglutinantes** : chaque leçon a une **fiche grammaire claire avec tableaux** avant les exercices | La phase « Découverte » + fiches grammaire intégrées à la leçon (Pilier A & D) |
| **Babbel** | Dialogues **réalistes et situés**, apprentissage par situation concrète, révision espacée | Dialogues rattachés au thème du chapitre, `dialogue_fill` cohérent (Pilier B) |
| **Busuu** | Structure **CEFR explicite** (A1/A2…), objectifs « can-do » par leçon, parcours par compétence | Frontière A1/A2 nette, « can-do » par chapitre (Pilier C) |
| **Memrise** | SRS + **exemples contextualisés** systématiques, mèmes mnémotechniques, audio natif | Exemple obligatoire sur 100% du vocab, astuces mnémo pour sons durs (Pilier D) |
| **Drops / Mondly** | Micro-interactions très soignées, associations visuelles rapides, sessions courtes | Polissage `match_pairs`/`audio_qcm`, transitions douces, sessions calibrées (Pilier E & F) |

**Le fil rouge des apps qui retiennent** : objectif clair → petite victoire rapide →
progression **visible** → feedback constant → répétition intelligente. La v5 vise exactement ça.

---

## PILIER A — Architecture de leçon
### « Apprendre → Pratiquer → Produire »

### Constat
`js/views/lesson.js` ne connaît qu'un mode : enchaîner des exercices. Aucune notion d'« étape »,
aucune carte de découverte, aucune astuce affichée. C'est le manque le plus douloureux pour un débutant.

### Objectif
Transformer la leçon en un **parcours en 5 étapes** : Découverte → Pratique guidée → Rappel actif
→ Mise en contexte → Bilan. Les exercices existants sont **réutilisés** mais **ordonnés** et
**précédés d'un enseignement**.

### Solution détaillée
1. **Nouveau type de « slide » non-exercice : `intro_card`** (carte de découverte).
   Généré depuis les `vocabIds`/`verbIds`/`grammarIds` du chapitre. Contient : mot TR (gros),
   traduction FR, bouton 🔊 (`App.playTTS`), phonétique, phrase-exemple avec audio.
2. **Nouveau type de slide : `grammar_note`** (mini-fiche règle) — titre + règle courte +
   mini-tableau + 1 exemple cliquable. Affichée **avant** le premier exercice qui teste cette règle.
3. **Nouveau type de slide : `tip_callout`** (astuce/piège) — encart court (« ⚠️ En turc, `c` se
   prononce “dj” »), affiché au bon moment.
4. **Ordonnancement en phases** dans `generateForChapter` : on ne `_shuffle` plus tout en vrac ;
   on construit une **séquence** : [intro_cards] → [grammar_note?] → [pratique facile] →
   [rappel actif] → [contexte] → bilan. Le shuffle ne s'applique **qu'à l'intérieur** d'une phase.
5. **Barre de progression par étapes** en haut de la leçon (5 segments) au lieu d'une barre linéaire brute.

### Checklist
- [ ] **`lesson.js` — moteur d'étapes** : introduire une notion de `phase` sur chaque slide
  (`discover` | `practice` | `recall` | `context` | `done`). `showNextExercise()` gère les
  slides non-exercice (pas de bouton « valider », juste « Continuer »). — `js/views/lesson.js` — **L**
- [ ] **Type `intro_card`** : dans `exercises.js`, `createIntroCards(chapter)` retourne 1 carte par
  nouveau mot/verbe du chapitre (max 8). Rendu dédié dans `lesson.js` (mot, FR, 🔊, phonétique, exemple 🔊).
  — `js/engine/exercises.js`, `js/views/lesson.js`, `css/components.css` — **M**
- [ ] **Type `grammar_note`** : `createGrammarNote(ruleId)` → fiche compacte depuis `AppGrammar`.
  Affichée si le chapitre a des `grammarIds`. Rendu carte + exemple cliquable TTS. — **M**
- [ ] **Type `tip_callout`** : encart court paramétrable (`{icon, text}`), déclenché par le chapitre
  (`chapter.tips[]`) ou automatiquement sur les sons durs au premier contact. — `js/views/lesson.js` — **S**
- [ ] **Ordonnancement en phases** : réécrire la fin de `generateForChapter` pour produire une
  séquence ordonnée (discover → practice → recall → context) au lieu d'un `_shuffle` global.
  — `js/engine/exercises.js` — **L**
- [ ] **Barre de progression segmentée** : 5 segments d'étape en haut de la leçon. — `js/views/lesson.js`, `css/components.css` — **S**
- [ ] **Bouton « passer la découverte »** pour les révisions (utilisateur qui a déjà vu les mots
  → saute directement à la pratique). Basé sur `SRS` : si tous les mots du chapitre sont step≥2, skip auto. — **M**

### Critères d'acceptation
- Ouvrir n'importe quel chapitre montre **d'abord** les mots (avec audio + exemple) avant tout test.
- Un chapitre avec une règle de grammaire affiche sa fiche **avant** l'exercice qui la teste.
- L'ordre des exercices monte en difficulté : jamais un `sentence_builder` avant un QCM.

---

## PILIER B — Tuer l'aléatoire
### Cohérence de contenu (100% rattaché au thème)

### Constat
Trois sources d'incohérence identifiées (cf. Problème 1) : `grammar_fill` aléatoire,
`dialogue_fill` aléatoire, fallback vocab aléatoire.

### Objectif
**Aucun exercice d'une leçon ne doit provenir d'un contenu non déclaré par le chapitre.**
Si un chapitre n'a pas de matière pour un type d'exercice, ce type est **simplement omis**
(pas remplacé par du hors-sujet).

### Solution détaillée
1. Ajouter aux chapitres (`units.js`) deux champs optionnels : **`grammarIds: []`** et **`dialogueIds: []`**.
2. `createGrammarFill()` (le tirage leçon, `:380`) doit accepter le **contexte du chapitre** :
   ne tirer que parmi `chapter.grammarIds`. Si vide → **ne pas générer** de grammar_fill.
3. `createDialogueFill()` (`:326`) : ne tirer que parmi `chapter.dialogueIds` (ou, à défaut, parmi
   les dialogues du **même `topic`** que le chapitre). Sinon → **omettre**.
4. Fallback vocab (`:22-31`) : ne compléter **que** depuis le même `topic`/la même unité.
   Interdire le `_shuffle(AppVocabulary)` global. Si vraiment trop peu de mots → moins d'exercices,
   pas de hors-sujet.
5. **Garde-fou générique** : une fonction `assertOnTheme(exo, chapter)` en dev qui `console.warn`
   si un exercice contient un `data.id` hors du périmètre du chapitre (aide à débusquer les fuites).

### Checklist
- [ ] **`units.js` — champs `grammarIds`/`dialogueIds`** sur les chapitres (au moins ceux qui ont
  une grammaire/un dialogue pertinent). — `js/data/units.js` — **M**
- [ ] **`createGrammarFill` contextualisé** : signature `createGrammarFill(chapter)` ; tire dans
  `chapter.grammarIds` uniquement ; retourne `null` si vide. Mettre à jour les appels `:96` et `:153`.
  — `js/engine/exercises.js` — **M**
- [ ] **`createDialogueFill` contextualisé** : paramètre chapitre ; filtre par `dialogueIds` puis
  par `topic` ; `null` sinon. — `js/engine/exercises.js` — **M**
- [ ] **Fallback vocab restreint** : supprimer le `_shuffle(AppVocabulary)` global (`:29`) ;
  ne compléter que depuis l'unité/le topic. — `js/engine/exercises.js` — **S**
- [ ] **`assertOnTheme` (dev only)** : warn console si un exercice sort du périmètre. Désactivable.
  — `js/engine/exercises.js` — **S**
- [ ] **Revue des autres générateurs** : vérifier `createCloze`, `createWordOrder`, `createMatchPairs`,
  `createSentenceBuilder`, `createListeningTranscribe` — tous doivent partir du contenu du chapitre.
  (Déjà partiellement fait pour SB/LT via `cbfd692`/`2735c3a` — **confirmer**.) — **M**

### Critères d'acceptation
- Parcourir 10 chapitres au hasard : **zéro** exercice hors-thème (grammaire, dialogue ou mot
  n'appartenant pas au chapitre).
- Un chapitre sans grammaire déclarée ne montre **jamais** de `grammar_fill`.

---

## PILIER C — Refonte du curriculum
### Progression logique, dédoublonnage, frontière A1/A2

### Constat
71 chapitres / 18 unités, mais redondances (Problème 3) et pas de frontière CEFR nette.
Le parcours doit raconter une **histoire de progression** : du survie-immédiat vers le contextuel.

### Objectif
Un **arbre de compétences** clair, sans doublon, avec :
- **A1** = u1→u12 (survie, présent, passé/futur, missions A1).
- **A2** = u13→u18 (santé, maison, ville/voyage approfondis, verbes A2, production).
- 1 objectif « can-do » explicite par chapitre (façon CEFR/Busuu).
- Prérequis entre chapitres (déblocage progressif déjà géré par `completedChapters` ? à vérifier).

### Solution détaillée
1. **Audit des 71 chapitres** avec la grille de l'annexe §7 : titre ↔ contenu ↔ objectif ↔ grammaire.
   Marquer chaque chapitre : ✅ cohérent / ⚠️ à recentrer / ❌ doublon.
2. **Dédoublonnage** :
   - Fusionner/spécialiser u3(maison) vs u15 : u3 garde l'initiation, u15 devient « aménager &
     tâches » (approfondissement A2, sans re-présenter les mêmes mots de base).
   - u13(santé) vs u16 : u13 = « ressentir/météo » (A1), u16 = « consultation médicale » (A2).
   - u5(déplacement) vs u17 : u5 = « s'orienter en ville » (A1), u17 = « voyager/hôtel/gare » (A2).
   - Supprimer le doublon littéral u12_c1 « À l'hôtel » **ou** u17_c4 (garder un seul, l'autre
     devient « check-in avancé » ou disparaît).
3. **Champ `cefr`** sur chaque unité (`'A1'` / `'A2'`) + **`canDo`** (string) sur chaque chapitre.
4. **Ordonner les `vocabIds`** d'un chapitre du plus simple au plus utile (les intro_cards suivront cet ordre).
5. **Un point de grammaire par chapitre max** : rattacher via `grammarIds` (Pilier B) le bon
   moment d'introduction de chaque règle (ex : possessifs → u4_c3, locatif → u5_c1, passé → u11_c1…).

### Checklist
- [ ] **Audit complet des 71 chapitres** (grille §7), livré comme tableau dans ce fichier. — **L**
- [ ] **Plan de dédoublonnage** u3/u15, u13/u16, u5/u17, u12/u17 — décisions actées puis appliquées
  à `units.js`. — `js/data/units.js` — **L**
- [ ] **Champ `cefr` par unité** + **`canDo` par chapitre**. Afficher le `canDo` en tête de leçon
  (« Objectif : je sais commander au restaurant »). — `js/data/units.js`, `js/views/lesson.js` — **M**
- [ ] **Rattachement grammaire↔chapitre** : remplir `grammarIds` au bon endroit de la progression.
  — `js/data/units.js` — **M**
- [ ] **Ré-ordonner les `vocabIds`** par difficulté croissante dans chaque chapitre. — **M**
- [ ] **Vérifier le déblocage progressif** (prérequis) : un chapitre A2 ne doit pas être accessible
  avant la fin de l'A1 correspondant. Vérifier la logique de `completedChapters`/verrouillage dans
  `js/views/units.js`. — **M**
- [ ] **Carte du parcours** : documenter l'arbre final (unité → chapitres → can-do → grammaire) en annexe. — **S**

### Critères d'acceptation
- Aucun mot de base n'est « présenté comme nouveau » deux fois dans deux unités différentes.
- Chaque chapitre affiche un objectif « can-do » compréhensible.
- La frontière A1 (u1-12) / A2 (u13-18) est visible dans le dashboard.

---

## PILIER D — Enrichissement pédagogique
### Exemples, phonétique, pièges, notes culturelles

### Constat
50% du vocab sans exemple, aucune phonétique, grammaire sans « pièges francophone », zéro note culturelle.

### Objectif
Donner à chaque mot/règle **de quoi être compris et retenu** par un francophone, pas juste traduit.

### Solution détaillée
1. **`example` sur 100% du vocab** : `{ tr, fr }` court et naturel, réutilisable en `cloze`.
   Prioriser les ~261 mots qui n'en ont pas.
2. **Champ `phonetic`** (approximation française) sur les mots à sons durs :
   `c`→« dj », `ç`→« tch », `ş`→« ch », `ğ`→allonge, `ı`→« e » sourd, `ö`/`ü`→sons français,
   `h` toujours aspiré, `r` roulé léger. Ex : `Teşekkürler` → « té-ché-kur-lèr ».
3. **`traps[]` sur les règles de grammaire** : erreurs typiques d'un francophone
   (ex : oublier l'harmonie vocalique, calquer l'ordre SVO au lieu de SOV, oublier l'accusatif
   sur objet défini). Affichées comme `tip_callout` (Pilier A).
4. **`culture[]` léger** : encarts culturels courts sur certains chapitres (thé, çay, politesse,
   tutoiement/vouvoiement, gestes). Optionnel mais fort en engagement.
5. **Mnémo pour sons durs** : associations mémorables dans les intro_cards du chapitre u1_c1
   et rappelées via callouts au premier contact d'un son.

### Checklist
- [ ] **Compléter tous les `example` manquants** (~261 mots) — `{tr, fr}` naturel. — `js/data/vocabulary.js` — **L**
- [ ] **Champ `phonetic`** sur au moins tous les mots `difficulty ≥ 2` et toutes les expressions.
  — `js/data/vocabulary.js`, `js/data/phrases.js` — **L**
- [ ] **Affichage phonétique** dans intro_card, vue vocabulaire, vue phrases. — `js/views/*.js` — **S**
- [ ] **`traps[]` sur les 18 règles** de `grammar.js` + rendu dans la fiche grammaire et en callout.
  — `js/data/grammar.js`, `js/views/grammar.js`, `js/views/lesson.js` — **M**
- [ ] **`culture[]` sur ~10 chapitres clés** (salutations, restaurant, thé, politesse, marchandage…).
  — `js/data/units.js` ou nouveau `js/data/culture.js` — **M**
- [ ] **Guide de prononciation dédié** : un mini-écran/onglet « Sons du turc » (les 6 lettres
  spéciales, avec audio et exemples), accessible depuis le dashboard ou u1. — `js/views/sounds.js` (nouveau) — **M**

### Critères d'acceptation
- Chaque mot testé a un exemple contextualisé disponible.
- Les mots à sons piégeux affichent une aide de prononciation.
- Chaque règle de grammaire liste au moins 1 piège francophone.

---

## PILIER E — Moteur d'exercices
### Gating de difficulté, équilibrage, distracteurs

### Constat
`generateForChapter` `_shuffle` tout (Problème 5). Pas de montée en difficulté, risque de 5 QCM
d'affilée ou d'un exercice dur trop tôt. Les distracteurs existent (`getSmartDistractors`) mais
ne sont pas calibrés par niveau.

### Objectif
Une leçon **équilibrée** (variété des types, pas de répétition immédiate) et **progressive**
(reconnaissance → rappel → production), avec une difficulté qui dépend de l'avancement.

### Solution détaillée
1. **Profil de difficulté par type** : classer chaque type sur une échelle 1-3.
   - Niv 1 (reconnaître) : `match_pairs`, `audio_qcm`, `qcm` TR→FR, `true_false`.
   - Niv 2 (rappeler) : `qcm` FR→TR, `cloze`, `dialogue_fill`, `grammar_fill`, `verb_fill`.
   - Niv 3 (produire) : `input`, `word_order`, `sentence_builder`, `listening_transcribe`.
2. **Gating par progression** : les premiers chapitres d'une unité privilégient niv 1-2 ;
   les niv 3 (production) n'apparaissent qu'à partir des chapitres de consolidation / A2.
   (Reprend l'idée « faire varier le ratio selon le niveau » de la v4-AXE2.)
3. **Anti-répétition** : ne jamais servir 2 fois le même type consécutivement (sauf QCM de base).
4. **Distracteurs calibrés** : au niveau débutant, distracteurs franchement différents ;
   plus tard, distracteurs proches (même topic/type) pour forcer la discrimination fine.
5. **Longueur de session calibrée** : viser 8-14 slides utiles par leçon (dont 2-5 intro_cards),
   pas plus — respecter la préférence « densité de session » (courte/normale/longue) si présente.

### Checklist
- [ ] **Table `EXERCISE_DIFFICULTY`** (type → 1/2/3) dans `exercises.js`. — **S**
- [ ] **Gating par chapitre** : n'autoriser les types niv 3 qu'à partir d'un seuil
  (chapitre de consolidation, ou `cefr === 'A2'`, ou `chapter.allowProduction`). — `js/engine/exercises.js`, `js/data/units.js` — **M**
- [ ] **Anti-répétition de type consécutif** dans l'ordonnancement des phases. — `js/engine/exercises.js` — **S**
- [ ] **Distracteurs calibrés par niveau** : paramétrer `getSmartDistractors` avec un facteur
  « proximité » selon l'avancement. — `js/engine/exercises.js` — **M**
- [ ] **Calibrage longueur de session** : borne haute/basse de slides selon densité choisie. — **S**
- [ ] **Vérifier `difficulty ?? 3`** (falsy 0) — déjà corrigé (`aeaa62a`), re-tester. — **S**

### Critères d'acceptation
- Sur une leçon donnée : pas 2 fois le même type d'affilée ; la difficulté croît ; la production
  n'apparaît pas dans les tout premiers chapitres.

---

## PILIER F — Refonte visuelle & UX premium

### Constat
UI correcte mais transitions brutes, dashboard peu « parcours », `components.css` monolithique,
écran de fin peu gratifiant (Problème 6).

### Objectif
Une app qui **respire** : chemin lisible, cartes soignées, feedback riche mais sobre, cohérente
en clair/sombre, fluide sur mobile 375px.

### Solution détaillée
1. **Dashboard « chemin »** : représenter le parcours en chemin vertical (nœuds de chapitres reliés,
   nœud courant mis en avant, nœuds verrouillés grisés), façon Duolingo path — sans copier, en gardant
   l'identité TürkçeYol (couleurs par unité déjà présentes : `color` sur chaque unité).
2. **Refonte de la carte d'exercice** : hiérarchie claire (consigne → contenu → options),
   plus d'air, focus visuel sur la question, boutons d'option tactiles ≥ 44px.
3. **Cartes de découverte** (Pilier A) : design « flashcard » premium (grand mot TR, FR discret,
   bouton 🔊 proéminent, exemple en encart, phonétique en pied).
4. **Transitions douces** : slide-in/out fiable entre slides (respecter `prefers-reduced-motion`).
5. **Micro-feedback de réussite** : pulse/glow léger + son (déjà `audio.js`) + combo visible.
6. **Écran de fin enrichi** : mots vus, précision (mini-barre), message contextuel selon score,
   bouton « Revoir mes erreurs » (relance mini-session sur `_mistakes` — déjà tracké dans `lesson.js`).
7. **Découpage CSS** : scinder `components.css` (49 KB) en modules (`lesson.css`, `cards.css`,
   `path.css`, `feedback.css`) importés dans `index.html`, pour la maintenabilité.
8. **Design system léger** : documenter tokens (couleurs, espacements, rayons, ombres) déjà présents
   en variables CSS, et s'y tenir.

### Checklist
- [ ] **Dashboard chemin vertical** : refonte `dashboard.js` + CSS `path`. Nœuds état
  (fait/courant/verrouillé), progression par unité. — `js/views/dashboard.js`, `css/` — **L**
- [ ] **Refonte carte d'exercice** (espacement, hiérarchie, cibles tactiles). — `css/components.css` (→ `lesson.css`) — **M**
- [ ] **Design cartes de découverte** (`intro_card`, `grammar_note`, `tip_callout`). — `css/` — **M**
- [ ] **Transitions slide fiables** entre slides (+ `prefers-reduced-motion`). — `js/views/lesson.js`, `css/animations.css` — **S**
- [ ] **Micro-feedback réussite** (pulse/glow + combo + son). — `css/animations.css`, `js/views/lesson.js` — **M**
- [ ] **Écran de fin enrichi** + bouton « Revoir mes erreurs ». — `js/views/lesson.js`, `index.html`, `css/` — **M**
- [ ] **Découper `components.css`** en modules thématiques. — `css/`, `index.html` — **M**
- [ ] **Audit responsive 375px** sur toutes les nouvelles vues. — **S**
- [ ] **Cohérence clair/sombre** vérifiée sur chaque nouveau composant. — **S**

### Critères d'acceptation
- Le dashboard se lit comme un chemin de progression, pas comme une liste.
- Transitions fluides, aucun débordement horizontal à 375px, rendu correct en clair et sombre.
- L'écran de fin donne envie de continuer et permet de revoir ses erreurs.

---

## PILIER G — Boucle de rétention & engagement

### Constat
Gamification déjà là (XP, streak, combo, sons, 10 niveaux, badges). Manque une boucle quotidienne
lisible et une mise en avant des révisions dues. (Reprend le meilleur de v4-AXE3.)

### Objectif
Donner une raison de revenir chaque jour, avec une révision espacée bien mise en avant.

### Solution détaillée
1. **Objectif quotidien** clair sur le dashboard (barre + message dynamique).
2. **File de révision proéminente** : « X mots à revoir aujourd'hui » (issu du SRS) en tête de dashboard,
   accès direct à une session de révision ciblée.
3. **Freeze de streak** (protection) déblocable.
4. **Alerte streak en danger** le soir si aucune activité.
5. (Optionnel / plus tard) **Ligues hebdo**, **rapport hebdo**, **quêtes courtes** — déjà décrits en v4,
   à ne traiter qu'après les piliers A→F.

### Checklist
- [ ] **Objectif quotidien configurable + barre dashboard**. — `js/views/dashboard.js`, `js/views/settings.js`, `js/state.js` — **M**
- [ ] **Encart « révisions dues »** en tête de dashboard, lien vers révision ciblée. — `js/views/dashboard.js`, `js/engine/srs.js` — **M**
- [ ] **Freeze de streak** (gain, consommation auto, feedback). — `js/engine/gamification.js`, `js/state.js` — **M**
- [ ] **Alerte streak en danger** (soir, sans activité). — `js/views/dashboard.js` — **S**
- [ ] *(Plus tard)* Ligues, rapport hebdo, quêtes — cf. ROADMAP_v4 AXE3. — **L**

### Critères d'acceptation
- Le dashboard montre l'objectif du jour ET les révisions dues dès l'ouverture.

---

## 3 — MODÈLE DE DONNÉES CIBLE

### Vocabulaire (`vocabulary.js`) — champs ajoutés
```js
{
  id: 'v_slug',
  tr: 'Teşekkürler',
  fr: 'Merci',
  topic: 'salutations',
  type: 'expression',
  difficulty: 1,
  example: { tr: 'Çok teşekkürler!', fr: 'Merci beaucoup !' },  // ← OBLIGATOIRE (Pilier D)
  phonetic: 'té-ché-kur-lèr'                                     // ← si son difficile (Pilier D)
}
```

### Chapitre (`units.js`) — champs ajoutés
```js
{
  id: 'u5_c1',
  title: 'Lieux de la ville',
  goal: 'Nommer les lieux publics',
  canDo: 'Je peux nommer les lieux courants d\'une ville',  // ← Pilier C (can-do CEFR)
  xpReward: 60, time: 7, tags: ['Ville', 'A1'],
  vocabIds: [...],          // ordonnés du + simple au + utile (Pilier C)
  verbIds: [...],
  grammarIds: ['g_locatif'],   // ← Pilier B (grammaire rattachée, plus d'aléatoire)
  dialogueIds: ['d_ville_1'],  // ← Pilier B (dialogue rattaché)
  tips: [{ icon: '⚠️', text: 'Locatif : -da après voyelle arrière, -de après voyelle avant.' }], // Pilier A/D
  allowProduction: false       // ← Pilier E (gating difficulté)
}
```

### Unité (`units.js`) — champ ajouté
```js
{ id: 'u5', title: 'Se déplacer', cefr: 'A1', /* … */ }   // ← Pilier C
```

### Règle de grammaire (`grammar.js`) — champ ajouté
```js
{
  id: 'g_locatif', title: '…', rule: '…', example: '…',
  drills: [...], exercises: [...],
  traps: ['Ne pas oublier l\'assimilation -da → -ta après consonne sourde (k, p, t, s…).'], // Pilier D
  table: [['ev', 'evde'], ['okul', 'okulda'], ['park', 'parkta']]  // mini-tableau pour grammar_note
}
```

> **Toutes ces additions sont rétro-compatibles** : champs optionnels, l'app continue de
> fonctionner si un champ manque (dégradation propre).

---

## 4 — PLAN D'EXÉCUTION PHASÉ

> Principe : d'abord **réparer** (cohérence + apprentissage), ensuite **structurer** (curriculum),
> puis **enrichir** (pédagogie), enfin **embellir** (UX). On ne polit pas une leçon incohérente.

### PHASE 1 — Réparation critique (impact immédiat) 🔴
1. **Pilier B** — Tuer l'aléatoire (`grammarIds`/`dialogueIds` + générateurs contextualisés + fallback restreint).
2. **Pilier A (noyau)** — Phase « Découverte » : `intro_cards` avant les exercices + ordonnancement en phases.
> Après la Phase 1, plus aucune leçon n'affiche de hors-sujet, et chaque leçon enseigne avant de tester.

### PHASE 2 — Structure du parcours 🟠
3. **Pilier C** — Audit des 71 chapitres + dédoublonnage + `cefr`/`canDo` + rattachement grammaire.
4. **Pilier E** — Gating de difficulté + équilibrage + anti-répétition.

### PHASE 3 — Densité pédagogique 🟡
5. **Pilier D** — `example` sur 100% du vocab + `phonetic` + `traps` + notes culturelles + écran « Sons du turc ».
6. **Pilier A (compléments)** — `grammar_note` + `tip_callout` + « can-do » en tête de leçon + skip découverte en révision.

### PHASE 4 — Polissage & rétention ✨
7. **Pilier F** — Dashboard chemin, refonte cartes, transitions, écran de fin, découpage CSS.
8. **Pilier G** — Objectif quotidien + révisions dues + freeze streak.

### PHASE 5 — Extensions (optionnel, post-fondations)
9. Ligues hebdo, rapport hebdo, quêtes, favoris/notes, test de niveau, export/import, stats avancées
   (déjà spécifiés dans ROADMAP_v4 — à reprendre tel quel une fois les fondations saines).

---

## 5 — CRITÈRES D'ACCEPTATION GLOBAUX

L'app est « v5-done » quand, sur un échantillon de **15 chapitres tirés au hasard** :
- [ ] **Cohérence** : 0 exercice hors-thème (mot/grammaire/dialogue étranger au chapitre).
- [ ] **Enseignement** : chaque leçon présente ses mots (audio + exemple) **avant** de tester.
- [ ] **Progression** : difficulté croissante ; pas 2 fois le même type d'affilée ; production tardive.
- [ ] **Pédagogie** : chaque mot testé a un exemple ; sons durs annotés ; grammaire avec pièges.
- [ ] **Curriculum** : objectif « can-do » affiché ; aucun doublon de mot de base entre unités ;
  frontière A1/A2 visible.
- [ ] **UX** : dashboard-chemin lisible ; transitions fluides ; 375px OK ; clair/sombre OK ;
  écran de fin gratifiant avec « revoir mes erreurs ».
- [ ] **Rétention** : objectif du jour + révisions dues visibles au lancement.
- [ ] **Non-régression** : TTS intact, streak/XP/SRS intacts, aucune erreur console.

---

## 6 — CONTRAINTES TECHNIQUES (à respecter dans toutes les sessions)

1. **TTS intouchable** — `playTTS()`, `_playNative()`, `_playGoogleFallback()` dans `js/app.js`
   ne se modifient pas. Toute lecture audio passe par `App.playTTS(texte)`.
2. **GitHub Pages statique** — pas de backend, pas de build, pas de dépendance npm. Tout nouveau
   fichier JS/CSS s'ajoute via une balise dans `index.html`.
3. **Cache-bust obligatoire** — incrémenter `?v=N` de chaque fichier modifié dans `index.html`.
4. **Architecture `window.X`** — modules globaux, pas d'ES modules, pas de classes, pas de refonte brutale.
5. **Persistance via `State`** — `State.save()` / `State.data` uniquement, jamais `localStorage` direct.
   Prévoir une **migration d'état** si le format change (nouveaux champs).
6. **Rétro-compatibilité données** — tout nouveau champ est optionnel ; dégradation propre s'il manque.
7. **Mobile-first 375px** — tester chaque écran à 375×667.
8. **Accessibilité motion** — respecter `prefers-reduced-motion` sur toute nouvelle animation.
9. **Clair/sombre** — styler les deux thèmes pour chaque nouveau composant.
10. **IDs préfixés** — `v_` vocab, `vb_` verbe, `p_` phrase, `d_` dialogue, `u`/`u\d_c\d` unité/chapitre,
    `g_` grammaire, `ach_` achievement.
11. **Commit** — `type: description` (feat/fix/docs/refactor/style) + trailer
    `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`.
12. **Une session = un pilier (ou un sous-lot)** — livrer cohérent, testable, non cassant.

---

## 7 — ANNEXE — Grille d'audit chapitre par chapitre

### Méthode (à appliquer aux 71 chapitres)
Pour chaque chapitre, remplir :

| Critère | Question | Verdict |
|---|---|---|
| **Titre↔contenu** | Les `vocabIds`/`verbIds` correspondent-ils au titre ? | ✅ / ⚠️ / ❌ |
| **Objectif** | Un « can-do » clair est-il formulable ? | ✅ / ⚠️ |
| **Volume** | 5–8 items (ni trop peu → fallback, ni trop) ? | ✅ / ⚠️ |
| **Grammaire** | Un point de grammaire pertinent à rattacher (`grammarIds`) ? | lequel |
| **Dialogue** | Un dialogue du même thème à rattacher (`dialogueIds`) ? | lequel |
| **Doublon** | Ce thème existe-t-il déjà dans une autre unité ? | avec qui |
| **Production** | Autoriser les exercices de production (`allowProduction`) ? | oui/non |

### Doublons déjà identifiés (à traiter en priorité — Pilier C)
| Unité A1 | Unité A2 en doublon | Résolution proposée |
|---|---|---|
| u3 « Le quotidien » (mots maison) | u15 « Ma maison » | u3 = initiation ; u15 = aménagement & tâches (A2), sans re-présenter les mots de base |
| u13 « Santé et météo » | u16 « Corps, santé & bien-être » | u13 = ressentir/météo (A1) ; u16 = consultation médicale (A2) |
| u5 « Se déplacer » | u17 « Transports, ville & voyages » | u5 = s'orienter (A1) ; u17 = voyage/gare/hôtel (A2) |
| u12_c1 « À l'hôtel » | u17_c4 « À l'hôtel » | garder **un seul** ; l'autre → check-in avancé ou suppression |

### Progression cible de la grammaire (rattachement `grammarIds`)
| Règle | Chapitre d'introduction naturel |
|---|---|
| Harmonie vocalique | u1 (dès les sons) puis rappel u3 |
| Ordre SOV | u2 (premières phrases) |
| Présent -iyor | u10_c2 |
| Négation -me/-ma | u10_c3 |
| Question -mı/-mi | u10_c4 |
| Pluriel -lar/-ler | u3 ou u4 |
| Possessifs | u4_c3 |
| Locatif -da/-de | u5_c1 |
| Datif -a/-e | u5_c2 |
| Ablatif -dan/-den | u5 (directions) |
| Accusatif -ı/-i | u6 (objet défini : « je mange LA pomme ») |
| Passé -dı | u11_c1 |
| Futur -acak | u11_c3 |
| Comparatif daha/en | u7_c4 « Comparer » |
| Var/Yok | u6 ou u3 |
| Capacité -abil | u18 (A2) |
| -ki relatif | u18 (A2) |
| Comitatif -le/-la | u18 (A2) |

> **Livrable de l'audit** : compléter ce tableau pour les 71 chapitres et acter les
> recentrages/suppressions **avant** de toucher `units.js` (une session dédiée, Pilier C).

---

## Légende complexité
- **S** — Small (~30 min, 1 fichier)
- **M** — Medium (1–2 h, quelques fichiers)
- **L** — Large (plusieurs sessions ou forte dépendance)

## Rappel de philosophie v5
> On ne mesure pas cette roadmap au nombre de features ajoutées, mais à **la disparition de la
> confusion**. Une leçon doit enseigner ce qu'elle promet, dans l'ordre, avec de quoi comprendre
> et retenir. Le reste (ligues, stats, oral) viendra **après** que les fondations soient saines.
