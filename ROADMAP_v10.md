# TürkçeYol — ROADMAP v10

## « N'ÉVALUER QUE CE QUI A ÉTÉ ENSEIGNÉ — ET RENDRE ACCESSIBLE CE QUI EST DÉJÀ CODÉ »

> Séquence : v7 (parler/comprendre) → v8 (passé narratif, interleaving) → v9 (retester,
> négation, Défi du jour) → **v10**.
>
> L'audit v9 a vérifié l'**intégrité** des données (ids, références, doublons) et concluait :
> « le socle de données est sain ». C'était vrai techniquement, mais incomplet. v10 part de
> **deux audits indépendants, croisés puis vérifiés un par un dans le code** :
> - un audit **pédagogique et linguistique** : relecture des 73 chapitres dans l'ordre
>   d'apprentissage, croisée avec le moteur d'exercices ;
> - un audit **fonctionnel** (Codex) : simulation de 1 460 générations de leçons (73 chapitres
>   × 20), contrôle des 17 routes, vérification des vues et du chargement des scripts.
>
> Chaque constat ci-dessous a été confirmé dans le code. Les affirmations qui n'ont pas résisté
> à la vérification ont été retirées ou corrigées.
>
> Quatre constats majeurs :
>
> 1. **Des fonctionnalités « livrées » n'ont jamais été accessibles.** `js/views/stats.js`
>    redéfinit `window.Settings` (l.416) et `window.Daily` (l.386). Comme il est chargé après
>    `settings.js` (`index.html:455-456`), la version complète des Paramètres est écrasée par
>    une version à 3 réglages (sons, rappels, sauvegarde). Sont donc inaccessibles : thème,
>    objectif XP, durée des leçons (v7), micro (v7), vibrations, pause et mode discret du
>    streak (v8). De plus, `js/views/daily.js` n'est chargé nulle part : c'est du code mort, et
>    le vrai Défi du jour est celui de `stats.js`.
> 2. **Le moteur teste des notions pas encore enseignées.**
>    - **Temps.** Un chapitre sans champ `tenses` est testé par défaut sur
>      `['present', 'past', 'future']` (`exercises.js:41`). 19 chapitres des unités 2 à 9 font
>      donc conjuguer au passé et au futur, enseignés en u11. Les distracteurs proposent aussi de
>      l'aoriste et du *-mış* (u18).
>    - **Vocabulaire.** Une leçon présente au plus 5 mots, mais les associations et l'écoute
>      piochent dans tout le vocabulaire du chapitre (`exercises.js:125-127`, `:748`).
>    - **Révision.** `generateForReview` ajoute de la grammaire, un dialogue, une écoute et une
>      phrase tirés parmi **tout** le contenu (`exercises.js:317-324`).
> 3. **« Être » n'est jamais enseigné, et il est remplacé par une forme fausse.** Aucune règle
>    ne couvre la copule (*Fransız**ım***, *öğrenci**yim***, *yirmi yaşında**yım***). Les chapitres
>    identité, nationalité, âge et description conjuguent `vb_olmak`, dont le présent
>    *oluyorum* signifie « je **deviens** ». Les dialogues de ces mêmes chapitres utilisent
>    pourtant la bonne forme (*Fransızım*, *İstanbulluyum*).
> 4. **La correction prévue en v9 aggraverait le constat n°2.** v9 AXE 1.1 veut faire réviser
>    `Object.keys(verb.conjugations)`, c'est-à-dire tous les temps de la fiche. Un apprenant en
>    u2 recevrait alors *olurum* ou *olmuşum*. La révision doit se limiter aux temps
>    **débloqués**, déduits de `completedChapters` (AXE 1.3).

---

## ⛔ CONTRAINTES DURES — INCHANGÉES

1. **🔊 TTS INTOUCHABLE.** `App.playTTS()` / `App._playGoogleTTS()` / meta `no-referrer`.
2. **Zéro régression de progression.** Aucun `id` supprimé ni renommé, qu'il s'agisse d'un
   chapitre, d'un mot, d'un verbe ou d'une règle. Aucune clé de `State` supprimée.
   Conséquences directes :
   - on ne **fusionne** pas les chapitres doublons, on les **différencie** ;
   - on ne **déplace** pas un chapitre d'une unité à l'autre, car l'ordre de déblocage d'un
     utilisateur existant changerait.
   Retirer un `verbId` ou ajouter un `vocabId` dans un chapitre est autorisé : cela ne
   supprime aucun id.
3. **Persistance via `State` uniquement**, avec des valeurs par défaut pour toute nouvelle clé.
4. **Vanilla, statique, sans backend, sans build.**
5. **Rigueur grammaticale** : toute forme ou phrase turque ajoutée ou corrigée est vérifiée
   (dérivation par règle + contrôle contre des formes de référence), comme en v7/v8/v9.
6. **Aucune nouvelle mécanique de gamification.**

---

## 📊 ÉTAT AUDITÉ (25/09/2026, post-v8, v9 non implémentée)

| Constat | Mesure |
|---|---|
| Réglages codés mais inaccessibles (Paramètres écrasés) | 7 (thème, objectif XP, durée, micro, vibrations, pause streak, streak discret) |
| Fichiers de vue morts | 1 (`daily.js`) |
| Chapitres qui testent des temps non encore enseignés | 19 (u2 → u9) |
| Règle de copule (« je suis ») | absente |
| Verbes `isFrequent` **sans aucun exemple** | 12/44 (*olmak, yapmak, gitmek, gelmek, yemek, içmek, istemek, çalışmak, sevmek, uyumak, kalkmak, bilmek*) |
| Corrections ponctuelles d'exemples, dialogues et règles | 11 = 9 erreurs factuelles + 2 problèmes d'alignement (cf. AXE 3.1) |
| Mots jamais utilisés dans un chapitre | 209/520 (40 %) |
| Verbes jamais utilisés dans un chapitre | 5 (*vermek, açmak, kapatmak, düşünmek, satmak*) |
| Phrases utilisées dans les leçons ou la révision | 0/77 (bibliothèque isolée) |
| Chapitres au contenu pédagogique identique | u8_c2 / u8_c4 (même dialogue, mêmes mots, mêmes verbes) |
| Chapitres d'unités A1 tagués A2 ou B1 | 18 |
| Calculs de niveau différents dans l'app | 2 (+ un nom de niveau toujours faux) |
| Ce qui est sain | 0 id dupliqué, 0 référence cassée, 17 routes sans écran bloqué, 1 460 générations sans erreur structurelle |

---

## 🅾️ AXE 0 — Rendre accessible ce qui est déjà codé (priorité technique n°1)

### 0.1 — Sortir `Settings` et `Daily` de `stats.js` · **S**
- Supprimer `window.Settings` de `stats.js` (l.416 → fin). La version de `settings.js`
  contient déjà tout, **y compris** l'export, l'import et la réinitialisation. Rien n'est
  perdu, c'est vérifié.
- Déplacer le `window.Daily` actif (`stats.js:386`, qui suit `dailyXP` / `dailyGoal`) dans
  `js/views/daily.js`, à la place du code mort actuel (texte figé « 2 leçons parfaites »), et
  charger `daily.js` dans `index.html`.
- Incrémenter les `?v=` des scripts concernés et vérifier la liste de cache de `sw.js`, pour
  que les utilisateurs existants reçoivent la nouvelle version.
- **Accept.** : chaque réglage de `settings.js` est visible et modifiable, persiste après
  rechargement et produit son effet (thème appliqué, densité de leçon, micro, vibrations,
  pause du streak, mode discret). Un seul `window.Settings` et un seul `window.Daily` dans
  tout `js/`.

### 0.2 — Note pour v9 AXE 3 (Défi du jour) · —
- La v9 décrit comme « texte identique tous les jours » le contenu de `daily.js`, qui est du
  code mort. Le Défi du jour réellement actif suit l'objectif d'XP quotidien. Si v9 AXE 3 est
  mené, il doit partir de l'implémentation déplacée en 0.1, et non de l'ancien fichier.

---

## 🅰️ AXE 1 — N'évaluer que ce qui a été enseigné (priorité pédagogique n°1)

> **État (commits `5c82b5a` et `9988d59`)** : 1.1 et 1.2 sont faits et vérifiés (voir
> encadré de méthode sous 1.2). **1.3, 1.4 et 1.5 restent à faire** — en particulier,
> `generateForReview` (la révision quotidienne) tire toujours son temps dans
> `['present', 'past', 'future']` sans tenir compte de la progression réelle : la garantie de
> cette section ne couvre encore que les **leçons**, pas la révision.
>
> **Résidu connu, dans le périmètre de 1.4/3.2, pas de 1.1/1.2** : les dialogues eux-mêmes
> peuvent encore exposer des formes conjuguées non enseignées (*d_nationalite* en u2_c2 :
> *Türkçe konuşuyor musunuz?*, présent, avant que u9_c3 ne l'enseigne formellement). Ce n'est
> **pas** hors scoring : `createDialogueFill` peut très bien piocher cette réplique et la
> transformer en exercice à trous **noté**, compté par `lesson.js` comme un `realExo` normal,
> avec impact sur le score et l'XP. 1.1/1.2 ne portent que sur les exercices de conjugaison et
> les exemples de verbes isolés (`verb.examples`), pas sur les répliques des dialogues, qui
> restent un contenu à part (voir la slide `dialogue_read` prévue en 1.4 pour les exposer avant
> de les tester, et 3.2 pour la relecture linguistique des dialogues eux-mêmes).

### 1.1 — Temps autorisés par défaut = temps déjà enseignés · **M**
- Remplacer le défaut figé de `exercises.js:41` par un calcul : les temps introduits par les
  chapitres **situés avant** le chapitre courant dans le parcours (en parcourant `AppUnits`
  dans l'ordre et en lisant les `tenses` des chapitres de grammaire).
  - Avant u9_c3 : aucun temps enseigné, donc aucun exercice de conjugaison. Le chapitre garde
    ses cartes de découverte et ses exercices de vocabulaire et de copule (AXE 2).
  - De u9_c3 à u10 : `present`. À partir de u10_c3 : `present_neg`. À partir de u11 :
    `past`, puis `future`. Et ainsi de suite.
- Le champ `tenses` explicite reste prioritaire quand il existe.
- Garde explicite pour une liste vide : aujourd'hui, `allowedTenses[i % 0]` donnerait
  `undefined`, et un exercice n'est omis que par accident.
- **Accept.** : simulé sur tous les chapitres, aucun exercice `verb_fill` ne porte sur un temps
  introduit après le chapitre courant.
  - Les chapitres qui ont un champ `tenses` explicite (dont tout u10, u11, u18) gardent
    exactement leur comportement actuel.
  - Les chapitres sans `tenses` **changent volontairement** : les 19 chapitres d'u2 à u9_c2
    n'ont plus de conjugaison. Ceux situés après u11 (u12 à u17) reçoivent l'ensemble des temps
    débloqués.
  - **Décision** : l'ensemble est **cumulatif**, et `present_neg` en fait partie dès u10_c3.
    Un chapitre sans `tenses` situé après u10_c3 peut donc tester la négation au présent,
    alors que le défaut actuel l'exclut : c'est un changement voulu. La même règle vaudra pour
    les négations passé/futur de v9 AXE 2, dès le chapitre qui les enseigne.
  - **Précision découverte à l'implémentation** : un chapitre à `tenses` explicite étroit
    (ex. u10_c3 = `['present_neg']` seul) a en réalité DEUX notions distinctes, pas une :
    `drillTenses` (ce que la boucle de conjugaison teste en priorité — reste l'array explicite
    tel quel) et `allowedTenses` (tout ce que l'apprenant connaît déjà = `drillTenses` ∪ les
    temps des chapitres précédents — sert de plafond pour les distracteurs/exemples, AXE 1.2).
    Sans cette distinction, le distracteur « présent affirmatif » déjà codé en dur pour la
    négation présente (`exercises.js`, bloc `if (tense === 'present_neg' && ...)`) aurait été
    supprimé à tort : le présent EST déjà connu à ce stade, ce n'est pas une fuite.

### 1.2 — Distracteurs et cloze limités aux temps connus · **S**
- `createVerbFill` : `otherTenses` (`exercises.js:692-694`) est filtré sur les temps
  autorisés. Plus de *olmuşum* proposé comme réponse possible en u10.
- `createCloze` : même filtrage de `allForms`, et on ignore les exemples dont la forme
  conjuguée est d'un temps non encore appris.
- `createWordOrder`, `createSentenceBuilder` et `createListeningTranscribe` (pool 2) puisent
  aussi dans `verb.examples`, sans aucun filtre de temps. Ils appliquent donc le même filtre
  que le cloze.
- **Décision d'implémentation, différente du plan initial de cette section — détection à
  l'exécution plutôt qu'un champ de données.** Le plan initial ci-dessous demandait un champ
  `tense` explicite sur chaque exemple de verbe (96 exemples à relire à la main), au motif
  qu'« une détection automatique n'est pas fiable » (ex. dans *Seninle konuşmak **istiyorum***,
  un détecteur naïf pourrait rattacher ce présent à *konuşmak* alors qu'il appartient à
  *istemek*). En pratique, une détection automatique **restreinte aux formes propres au verbe
  testé** (jamais à un autre verbe de la phrase) évite exactement ce piège : elle ne compare
  *konuşmak* qu'à SES PROPRES formes conjuguées, et *istiyorum* n'en fait pas partie — le
  détecteur renvoie alors `null` (temps inconnu) plutôt qu'un mauvais temps, et l'exemple est
  écarté par prudence, avec le même résultat que le comportement `other` prévu ci-dessous.
  C'est ce qu'implémente `Exercises._detectExampleTense(verb, exampleTr)`
  (`js/engine/exercises.js`) : elle ne renvoie **jamais** une mauvaise classification, seulement
  une classification correcte ou une absence de classification (exclusion). Ce choix évite la
  relecture manuelle de 96 exemples sans rouvrir le risque que le plan initial voulait éviter.
  Un futur ajout de données pourra toujours introduire un champ `tense` explicite pour les cas
  où la détection échoue par manque de forme reconnaissable (ex. formes composées comme
  *yardım etmek*, ou négations passé/futur avant que v9 AXE 2 ne les ajoute aux données) —
  non bloquant, à réévaluer si ces cas s'avèrent fréquents en usage réel.
  - Plan initial conservé pour mémoire : `tense: 'present' | 'past' | 'future' |
    'present_neg' | 'aorist' | 'pastNarrative' | 'other'` par exemple, un exemple combinant
    plusieurs structures reçoit le temps le plus avancé ou `'other'`, un exemple `other` ou
    sans champ est exclu des générateurs filtrés — objectif final identique à la solution
    retenue, méthode différente.
- **Accept.** : sur la même simulation, 0 distracteur, cloze, remise en ordre, construction de
  phrase ou écoute ne porte sur un temps non appris.
- **Vérifié par** `node tools/verify-tense-gating.js` (nouvel outil, même famille que
  `tools/validate-data.js` et `tools/smoke-test.js` : charge les données et le moteur dans un
  faux `window` via `vm`, sans navigateur). Il rejoue, chapitre par chapitre, 20 générations et
  vérifie qu'aucun exercice ni distracteur ne dépasse l'ensemble des temps déjà enseignés (voir
  la note sous 1.1 sur `drillTenses` vs `allowedTenses`), plus la validité de `g_copule`. Sur
  cette machine, `node` n'est pas sur le PATH standard ; utiliser le binaire fourni par
  Playwright si besoin, ex. trouvé ici lors de cette session :
  `C:\Users\<user>\AppData\Local\ms-playwright-go\<version>\node.exe`, ou tout Node ≥ 18
  installé normalement ailleurs.

### 1.3 — Révision quotidienne bornée à la progression · **M** (remplace v9 AXE 1.1)
- `generateForReview` tire le temps d'un verbe dans l'intersection « temps présents sur le
  verbe ∩ temps débloqués ». Les temps débloqués sont déduits de
  `State.data.completedChapters`, sans nouvelle clé persistante. Cela couvre l'objectif de v9
  AXE 1.1 (retester l'aoriste et le *-mış* une fois appris) sans son effet de bord.
- Les exercices ajoutés en fin de révision (`createGrammarFill()`, `createDialogueFill()`,
  `createSentenceBuilder(null)`, `createListeningTranscribe(null)`, `exercises.js:317-324`)
  puisent seulement dans les règles, dialogues, verbes et mots des **chapitres terminés**.
- **Accept.** : un profil simulé bloqué en u5 ne reçoit en révision ni aoriste, ni *-mış*, ni
  règle *-ki*, ni dialogue *d_apartman*. Un profil qui a fini u18 reçoit bien les 5 temps.

### 1.4 — Chaque élément testé a été présenté ou appris · **S**
- `createMatchPairs` et `createListeningTranscribe` en leçon puisent dans
  `vocabSample ∪ mots déjà appris` (items `reviewQueue` avec `step >= 2`), et plus dans tout
  `chapter.vocabIds`.
- Nuance : un mot « non présenté dans cette session » a parfois été vu dans un chapitre
  précédent. Le problème réel concerne les mots **nouveaux**, surtout au premier passage d'un
  chapitre. La règle ci-dessus le traite sans appauvrir les révisions.
- **Dialogues** : `createDialogueFill` (`exercises.js:494`) masque une réplique au hasard, qui
  peut n'avoir jamais été enseignée. On ajoute donc une slide d'enseignement `dialogue_read`
  en phase Découverte : le dialogue complet, avec sa traduction et l'audio par réplique, avant
  tout exercice sur ce dialogue. Le texte à trous porte alors sur un dialogue que l'apprenant
  vient de lire. En révision, seuls les dialogues de chapitres terminés sont utilisés (1.3),
  donc déjà lus.
- **Accept.** : sur 20 générations de chaque chapitre (tous les chapitres, y compris ceux
  ajoutés en 3.5) et un profil neuf, aucun exercice ne porte sur un mot ou une réplique qui
  n'a été ni présenté dans la session, ni appris auparavant.

### 1.5 — Politique des expressions figées (« chunks ») · **S** (décision, puis données)
- Problème : l'AXE 1.1 supprime la conjugaison avant u9_c3, alors que certains chapitres
  promettent déjà des énoncés conjugués. C'est le cas d'u6_c4 « Goûts et préférences »
  (« j'aime, je n'aime pas ») et d'u6_c3 « Au restaurant », dont l'astuce enseigne
  *… istiyorum* et *… alabilir miyim?*. Remplacer `g_yok_var` par l'accusatif ne suffit pas.
- **Décision** : avant l'enseignement formel d'un temps, une forme conjuguée peut apparaître
  **uniquement comme expression figée**. C'est une entrée de vocabulaire du thème `chunks`,
  présentée et testée comme un bloc (QCM, association, écoute), jamais comme un exercice de
  conjugaison. L'app le fait déjà avec *İyiyim*, *Anlamıyorum* et *Bilmiyorum* (u8, u14) : on
  généralise une pratique existante.
- Données, avec de nouveaux ids et rien de supprimé :
  - u6_c4 : chunks *Seviyorum* (j'aime), *Sevmiyorum* (je n'aime pas), *Çok lezzetli*, plus
    l'accusatif en exemple (*Çayı seviyorum*) ;
  - u6_c3 : chunks *… istiyorum* (je voudrais) et *… alabilir miyim?* (puis-je avoir ?).
  `vb_sevmek` et `vb_istemek` peuvent rester dans `verbIds` : l'AXE 1.1 et 1.2 garantissent
  qu'ils ne produiront aucun exercice de conjugaison ni d'exemple d'un temps non appris avant
  u9_c3.
- Quand le temps est enseigné (u9_c3/u10), la fiche grammaire rappelle que *seviyorum*, déjà
  connu comme bloc, est en fait *sev + iyor + um*. Le « chunk » devient une forme analysable.
- **Accept.** : chaque `canDo` d'un chapitre antérieur à u9_c3 est atteignable avec du
  vocabulaire, des expressions figées et la copule, sans aucun exercice de conjugaison.

---

## 🅱️ AXE 2 — Enseigner « être » (la copule), retirer *olmak* là où il est faux

> **État (commit `5c82b5a`)** : fait. Une précision par rapport au plan initial : u2_c1
> (« Je m'appelle… ») ne porte finalement **pas** `g_copule`, contrairement à ce que 2.2
> prévoyait. Raison : `createGrammarNote` n'affiche jamais qu'**une seule** fiche de
> grammaire par chapitre (la première de `grammarIds`) ; comme u2_c1 avait déjà
> `g_ordre_mots`, y ajouter `g_copule` en second l'aurait rendue invisible dans ce
> chapitre. Or le contenu réel d'u2_c1 (dire son prénom) est à copule zéro dans le dialogue
> `d_rencontre` (*Ben Sophie*, sans suffixe) : la copule n'y est donc pas requise. Son
> premier enseignement réel reste u2_c2 (*Fransızım*), qui n'a pas ce conflit.

### 2.1 — Nouvelle règle `g_copule` · **M**
- Suffixe personnel de « être » avec harmonie à 4 voyelles et *-y-* de liaison après voyelle :
  *-(y)Im, -sIn, ∅/-dIr, -(y)Iz, -sInIz, -lAr*.
  Ex. *Fransızım, öğretmenim, öğrenciyim, yirmi yaşındayım, İstanbulluyum*.
- Pièges explicites :
  1. « je suis » ne se dit **pas** avec *olmak* (*oluyorum* = je deviens) ;
  2. à la 3ᵉ personne, rien n'est ajouté à l'oral (*O doktor*).
- Au moins 4 exercices QCM, formes vérifiées contre une liste de référence avant écriture.
- Corriger aussi la description de `vb_olmak` : « Devenir / Se produire », avec une note
  indiquant que « être » au présent se forme par la copule.
- **Accept.** : script de contrôle à 100 % sur les formes de référence.

### 2.2 — Rattacher la copule et retirer *olmak* des chapitres concernés · **S**
- `grammarIds += 'g_copule'` et retrait de `vb_olmak` des `verbIds` pour :
  - u2_c1 « Je m'appelle… » — **retrait de `vb_olmak` fait, mais pas de `g_copule`** (voir
    l'état ci-dessus : conflit avec `g_ordre_mots`, déjà là, et non nécessaire au contenu) ;
  - u2_c2 « Ma nationalité » ;
  - u2_c3 « Mon âge » ;
  - u2_c5 « Mini présentation » ;
  - u4_c2 « Décrire quelqu'un » ;
  - u16_c2 « Comment vous sentez-vous ? » (*yorgunum, hastayım*).
- Garder *olmak* là où il a un vrai sens de « devenir » ou « se passer », et dans les chapitres
  de conjugaison (u10, u11).
- **Accept.** : plus aucun chapitre où « je suis + adjectif/nom » est testé avec *olmak*.

---

## 🅲️ AXE 3 — Corriger les contenus faux ou mal placés

### 3.1 — 9 erreurs factuelles + 2 problèmes d'alignement (tous vérifiés) · **S**
| Où | Erreur | Correction |
|---|---|---|
| `vb_okumak`, exemple passé | *Dün iki saat ders **çalıştım*** entraîne *çalışmak* | *Dün bir kitap okudum.* / Hier j'ai lu un livre. |
| `vb_hazirlamak`, exemple passé | *Sınav için hazırladım* : préparer quoi ? | *Sınav için sunum hazırladım.* ou *Sınava hazırlandım.* |
| `d_telefon` | *tablonuz* = « votre tableau » | *masanız hazır olacak* |
| `d_gare` | *gidiş-dönüş **billet*** (mot français) | *bilet* |
| `d_gare` | *öğleden sonra **ikiyle** bir tren* | *öğleden sonra **ikide** bir tren var* |
| `d_cinema` | *İkisi için iki bilet* ≠ « pour celui de sept heures » | *Saat yedideki seans için iki bilet.* |
| `g_negatif_fiil`, exercice 1 | « voyelle arrière → -mı- » pour *gitmiyorum* | *i* est une voyelle **avant** : -mi- |
| `g_negatif_fiil`, règle | ne cite que -miyor/-mıyor | ajouter -muyor/-müyor (*okumuyorum, görmüyorum*) |
| `g_ordre_mots` | « le verbe est **toujours** à la fin » | « l'ordre **neutre** de base est Sujet–Objet–Verbe » |
- Les 2 problèmes d'alignement :
  - `v_saskin`, `v_sikilmis`, `v_utanmis` : les exemples utilisent le verbe (*şaşırdım*,
    *sıkılıyorum*, *utanıyorum*). Les réécrire avec l'adjectif lui-même.
  - u1_c5 : l'astuce cite *yirmi bir* (21) avant qu'on apprenne *yirmi*. La reformuler avec
    *on bir* / *on üç* seulement.
- **Accept.** : chaque exemple de mot contient le mot enseigné **ou une forme fléchie
  légitime**, et chaque exemple de verbe contient une forme conjuguée de ce verbe.
  - Le validateur ne cherche **pas** la chaîne exacte. Il accepte les alternances régulières du
    turc : consonne finale adoucie (*kulak → kulağım*, *kalp → kalbim*, *kitap → kitabı*) et
    voyelle qui tombe (*ağız → ağzım*, *burun → burnum*, *oğul → oğlum*).
  - Un champ optionnel `exampleForms` sur le mot permet de déclarer les cas restants.
  - Tout ce qui n'est toujours pas reconnu est signalé **pour relecture humaine**, pas rejeté
    automatiquement.

### 3.2 — Relecture linguistique des 192 répliques de dialogue · **M**
- Les 5 erreurs de dialogue ci-dessus ont été trouvées sans relecture systématique : il y en a
  probablement d'autres. Relire les 29 dialogues réplique par réplique, turc **et**
  traduction, en vérifiant la cohérence entre les deux.
- **Accept.** : relecture tracée (dialogue → OK / corrigé), 0 incohérence turc/français connue.

### 3.3 — Dialogues trop avancés ou hors sujet pour leur chapitre · **M**
| Chapitre | Dialogue | Problème | Action |
|---|---|---|---|
| u1_c2 « Bonjour et au revoir » | `d_rencontre` | prénom (*Benim adım*), origine (*Nerelisiniz?*, *Fransalıyım*), question (*İstanbullu musunuz?*) : c'est le programme de l'unité 2 | nouveau dialogue limité aux salutations : *Merhaba — Merhaba, nasılsın? — İyiyim, teşekkürler. Sen? — … — Görüşürüz! — Hoşça kal!* ; `d_rencontre` reste en u2_c1, u2_c5, u12_c3, u14_c2 |
| u2_c4 « Mon métier » | `d_calisma` (B1) | futur, *-abil*, *kadar* | nouveau dialogue à la copule (*Ne iş yapıyorsunuz? — Öğretmenim.*) |
| u3_c2 « Mots de la maison » | `d_apartman` | participes relatifs, *-abil*, conditionnel, *aidat*, *sözleşme* | retirer (reste en u15) ; dialogue court au présent et à la copule |
| u8_c1 / u8_c3 (faire répéter, incompréhension) | `d_telefon` (B1) | réservation de restaurant : aucune demande de répétition | nouveau dialogue où l'on fait répéter et demande le sens |
| u8_c4 / u16_c4 « Urgences » | `d_eczane` | achat en pharmacie, aucun appel aux secours | nouveau dialogue d'urgence (*İmdat!*, 112, ambulance) |
| u8_c2 « Demander de l'aide » | `d_eczane` | un achat de médicament n'est pas une demande d'aide générale | nouveau dialogue d'aide **non urgente** (quelqu'un perdu ou qui a perdu un objet, *Yardım eder misiniz?*, *Bir sorum var*) |
| u16_c3 « Chez le médecin » | `d_saglik` (reprise d'u13_c3) | doublon de spirale sans apport | retirer `d_saglik` ; `d_medecin`, déjà rattaché, suffit et correspond au lieu annoncé |
| u13_c3 « Je ne me sens pas bien » | (`d_eczane` y sera rattaché) | — | `d_eczane` s'ouvre sur *Başım ağrıyor* : c'est exactement le canDo « décrire un symptôme », sans lieu imposé par le titre. Il rejoint `d_saglik` ici, et le chapitre n'a pas besoin d'être renommé. **Pas de déplacement tel quel** : il contient *Kaç gündür?* (suffixe *-dır* de durée) et l'impératif poli *alın*, jamais enseignés avant u13. Lors de la relecture (3.2), on simplifie ces répliques ou on les déclare comme expressions figées (1.5), présentées avant l'exercice (`dialogue_read`, 1.4) |
- Contrôle systématique : pour chaque dialogue, vérifier que ses suffixes sont enseignés au
  plus tard dans le chapitre qui l'utilise. Les formules figées identifiées comme telles sont
  tolérées (*memnun oldum*, *hoş geldiniz*).
- **Accept.** : 0 dialogue utilisé avant l'unité où ses structures sont enseignées, et chaque
  dialogue correspond au `canDo` de son chapitre.

### 3.4 — Règles grammaticales mal rattachées · **S**
| Chapitre | Règle actuelle | Problème | Action |
|---|---|---|---|
| u1_c1 « Sons et lettres » | `g_harmonie_majeure` | ses exercices testent le locatif (u5) et le pluriel (u3) | retirer ; la règle reste en u10_c1 |
| u6_c4 « Goûts et préférences » | `g_yok_var` | aucun rapport avec « j'aime » | remplacer par `g_accusatif` (*Çayı seviyorum*) |
| u18_c3 « Trouver, perdre… » | `g_ki_relatif` | aucun rapport | voir 3.5 |
| u18_c4 « Émotions en action » | `g_suffixe_avec` | aucun rapport | voir 3.5 |

### 3.5 — Donner une vraie place à `-ki` et `-le` · **M**
- Nouveaux chapitres (nouveaux ids, rien de supprimé) en fin d'u18 :
  - `-le/-la` : *arkadaşımla, otobüsle, çayı şekerle* ;
  - `-ki` : *evdeki, yarınki, benimki*.
- Vocabulaire ciblé, et au moins 3 exercices propres à chacun.

### 3.6 — Mots et verbes hors thème · **S**
| Chapitre | Hors thème | Action |
|---|---|---|
| u18_c4 « Émotions en action » | `vb_tasimak` (porter) | le remplacer par un verbe d'émotion (*korkmak*, *kızmak*), à dériver et vérifier |
| u16_c2 « Comment vous sentez-vous ? » | `vb_sevmek` (aimer) | le retirer (la copule le remplace, AXE 2.2) |
| u15_c3 « Tâches ménagères » | aucun verbe de tâche concrète | ajouter *temizlemek, yıkamak, toplamak* (à dériver et vérifier) |
| u6_c4 « Goûts » | *Ucuz / Pahalı* (prix, déjà en u7) | les retirer |
| u12_c3 « Rencontre informelle » | *Otel* | le retirer |

---

## 🅳️ AXE 4 — Différencier les chapitres doublons (sans rien supprimer)

- **u8_c2 « Demander de l'aide » / u8_c4 « Urgences »** : titres et récompenses différents,
  mais contenu pédagogique identique (même dialogue, mêmes mots, mêmes verbes).
  - u8_c2 devient une aide **non urgente** : *yardım eder misiniz*, *bir sorum var*,
    *kaybettim*, avec le nouveau dialogue d'aide non urgente (3.3). `d_eczane` n'y reste pas.
  - u8_c4 garde l'urgence : *İmdat*, 112, *Ambulans*, *Acil*, *Tehlike*, avec le nouveau
    dialogue d'urgence (3.3).
- **u5_c2 « Demander son chemin » / u5_c4 « Directions »** : 7 mots de direction identiques et
  le même dialogue.
  - u5_c2 : **poser** la question (*… nerede?*, *… nasıl giderim?*).
  - u5_c4 : **comprendre** la réponse, avec l'ablatif et les postpositions (*sağa dönün*,
    *… -dan sonra*, *yanında*, *karşısında*, *önünde*). Cela introduit enfin les postpositions
    du thème `locatifs`, aujourd'hui inutilisées.
- **u8_c1 « Faire répéter » / u8_c3 « Je ne comprends pas »**.
  - u8_c1 : faire répéter (*Tekrar eder misiniz?*, *Yavaş konuşun*).
  - u8_c3 : demander le sens (*Bu ne demek?*, *… Türkçe'de nasıl denir?*).
- **u13 / u16 (santé) et u12 / u17 (hôtel, avion)** : répétition assumée en spirale (A1 puis
  A2), à condition que la version A2 ajoute réellement quelque chose.
  - u16_c3 : on retire `d_saglik` et on garde `d_medecin` seul ; `d_eczane` part en u13_c3
    (cf. 3.3).
  - u17_c4 : un dialogue d'hôtel différent de `d_hotel` (u12_c1), axé sur les services et les
    problèmes de chambre.
- **u1_c1 « Sons et lettres »** reprend 4 salutations d'u1_c2 et 3 mots d'u1_c4. Le remplacer
  par des mots choisis **pour leurs sons** (*çay, şeker, dağ, ılık, göz, üç*…), ce qui
  correspond à l'objectif du chapitre.
- **Accept.** : aucune paire de chapitres n'a le même contenu pédagogique (même dialogue +
  même vocabulaire + mêmes verbes).
  - Le seuil de 50 % de vocabulaire partagé sert d'**alerte** dans le validateur, pas de règle
    bloquante : certaines répétitions sont voulues (révision u12_c4, spirale A1/A2, rappel des
    chiffres dans « Mon âge »).
  - Chaque alerte est soit corrigée, soit marquée comme répétition voulue.

---

## 🅴️ AXE 5 — Combler les trous de contenu

### 5.1 — Exemples pour les 12 verbes `isFrequent` · **M**
- *olmak, yapmak, gitmek, gelmek, yemek, içmek, istemek, çalışmak, sevmek, uyumak, kalkmak,
  bilmek* n'ont **aucun** tableau `examples`. Ces verbes ne peuvent donc pas **eux-mêmes**
  alimenter le cloze, la remise en ordre, la construction de phrase ni l'écoute de phrase.
  Les générateurs ne renvoient pas toujours `null` : ils se rabattent sur un autre verbe du
  chapitre ou sur le vocabulaire. Mais ces verbes n'apparaissent jamais en contexte, et leur
  carte de découverte n'a pas d'exemple. Un chapitre dont tous les verbes sont dans ce cas
  (ex. u10_c1 : *olmak, yapmak, gitmek, gelmek*) n'a aucun exercice contextuel de verbe.
- 3 exemples par verbe (présent, passé, futur), dans le même format que les 32 autres. Le
  **premier au présent**, car c'est celui qu'affiche la carte de découverte.
- **Accept.** : 44/44 verbes avec exemples, chaque exemple contenant une forme du verbe.

### 5.2 — Intégrer le vocabulaire essentiel inutilisé · **M**
- 209 mots sur 520 n'apparaissent dans aucun chapitre : il y a un grand écart entre le
  « dictionnaire disponible » et le « contenu enseigné ». Priorité aux trous qui rendent un
  chapitre existant incomplet :
  - « Ma famille » (u4_c1) : *Çocuk, Dede, Nine, Amca, Teyze, Koca, Karı* ;
  - « L'heure et les jours » (u3_c1) : *Dakika, Yarım saat, Öğlen, Erken, Geç* ;
  - « Mon métier » (u2_c4) : *İş, Ofis, Şirket, Patron* ;
  - « Vêtements » (u7_c2) : *Tişört, Ceket, Etek, Çorap, Şapka* ;
  - « Couleurs » (u7_c3) : *Gri, Kahverengi, Pembe, Mor, Turuncu* ;
  - « Transports » (u17_c1) : *Vapur, Tramvay, İstasyon* ;
  - postpositions (`locatifs`) : via u5_c4 (AXE 4).
- **Optionnel** : animaux, nature et formes peuvent rester dans l'onglet Vocabulaire. C'est un
  choix assumé, pas un oubli.

### 5.3 — Verbes jamais utilisés · **S**
- *vermek* (donner) : u6_c3 « Au restaurant » (*Bana su verir misiniz?*).
- *açmak / kapatmak* : u15_c2 « Meubles & objets » (lampe, télé, fenêtre).
- *satmak* : u7_c1 « Les prix ».
- *düşünmek* : u14_c3 « Exprimer l'opinion ».

### 5.4 — Mots interrogatifs trop tardifs · **S**
- *Nerede?* et *Nasılsınız?* ne sont enseignés qu'en u14, **après** le Test A1, alors que
  u5_c2 demande « Où est… ? » et que « Comment ça va ? » relève des salutations de base.
- Sans déplacer u14 (contrainte 2) :
  - u1_c2 : *Nasılsın? / İyiyim* entrent **avec le nouveau dialogue de salutations** (3.3) et
    le vocabulaire correspondant : `v_iyiyim` (existant) et une **nouvelle** entrée informelle
    `v_nasilsin` (*Nasılsın?* = Comment vas-tu ?). `v_nasilsiniz` (*Nasılsınız?*, formel)
    reste pour u14. Le dialogue et son vocabulaire utilisent tous deux le tutoiement,
    cohérent avec des salutations entre proches. Ajouter le mot
    seul, sans dialogue qui l'utilise, ne résoudrait rien ;
  - u5_c2 : ajouter `v_nerede`, qui sert directement la question « Où est… ? ».
- u14 devient une consolidation.

### 5.5 — Intégrer les phrases au parcours · **M**
- Les 77 phrases (`AppPhrases`) ne servent dans aucune leçon ni révision.
  `createWordOrder(verbs, null)` a pourtant déjà un paramètre `phrasesPool` jamais alimenté.
- Ajouter `phraseIds` optionnels aux chapitres thématiques (restaurant, transport, hôtel,
  directions, santé, urgences) et alimenter `phrasesPool` en leçon, avec les phrases des
  chapitres rattachés, et en révision, avec les phrases des chapitres terminés (cf. 1.3).
- **Accept.** : chaque thème de phrases est rattaché à au moins un chapitre, et les phrases
  apparaissent dans les exercices de remise en ordre.

---

## 🅵️ AXE 6 — Interface : cohérence et bugs

### 6.1 — Filtres de phrases cassés · **S**
- `phrases.js:11` cherche `#phrases-filters .chip`, mais la rangée de filtres
  (`index.html:270`) n'a pas cet id : les filtres ne font rien. Ajouter l'id.
- Ne sont proposés que 4 thèmes sur 12 (dont *voyage*, qui n'a que 2 phrases). Générer les
  filtres depuis les `topic` réellement présents dans `AppPhrases`.
- Une fois l'id réparé, `Phrases.render()` ajouterait de nouveaux écouteurs à chaque retour
  sur l'écran. Ajouter une garde `_initialized`, comme dans `vocabulary.js:7` et
  `verbs.js:7`. À l'implémentation : générer les boutons une seule fois, ou utiliser un seul
  écouteur délégué sur le conteneur, pour que les boutons générés dynamiquement n'aient pas
  besoin d'être rebranchés.
- **Accept.** : chaque filtre fonctionne, un clic ne déclenche qu'un seul rendu même après
  plusieurs visites de l'écran, et tous les thèmes présents dans les données ont un filtre.

### 6.2 — Fiche verbe incomplète · **S**
- `verbs.js:147-149` n'affiche que présent, passé et futur. Afficher aussi l'aoriste et le
  passé narratif pour les 24 verbes qui les ont, et la négation des autres temps si v9 AXE 2
  est livré.

### 6.3 — Un seul calcul de niveau · **S**
- `State.addXP` calcule un niveau tous les 500 XP (`state.js:165`), alors que le dashboard
  utilise les seuils de `gamification.js:6` (0, 100, 300, 600…).
- `stats.js:38` appelle `getLevelName(d.level)` avec un **numéro de niveau**, alors que la
  fonction attend des **XP**. Le nom reste donc presque toujours au premier palier
  (« Merhaba ») : il ne changerait qu'à partir d'un « niveau » 100, soit environ 50 000 XP.
- Toutes les vues passent par `Gamification.getLevelInfo(totalXP)`. `State.data.level` est
  conservé (contrainte 2), mais recalculé à partir du même barème.
- **Accept.** : dashboard et statistiques affichent le même niveau et le même nom, quel que
  soit le total d'XP.

### 6.4 — Streak : date locale et jour « réellement actif » · **M**
- `checkNewDay` (`state.js:101`) utilise `toISOString()`, qui donne la date UTC : en France,
  une session vers 1 h du matin compte pour la veille. Utiliser la date **locale** (un seul
  utilitaire, réutilisé par la heatmap `state.js:171` et `setStreakPaused`).
- `lastSessionDate` est mis à jour dès l'**ouverture** de l'app. Un jour ouvert sans objectif
  atteint ne casse donc pas la série : si on atteint l'objectif le jour 1, qu'on ouvre juste
  l'app le jour 2, puis qu'on joue le jour 3, la série continue. Distinguer « dernier jour
  ouvert » (reset `dailyXP`) et « dernier jour où l'objectif est atteint » (calcul du streak),
  avec une nouvelle clé à valeur par défaut. La logique gel/pause de v8 est conservée.
- **Accept.** : simulé sur des séquences de dates, le streak se casse exactement quand un jour
  sans objectif atteint n'est pas couvert par un gel ou la pause, et une session à 00 h 30
  heure de Paris compte pour le bon jour.

### 6.5 — Défi du jour et textes périmés · **S**
- La carte d'accueil annonce « 5 questions · ~3 min » (`index.html:136`), alors que le défi
  suit l'objectif d'XP. Afficher l'objectif réel (ex. « 50 XP · objectif du jour »).
- Textes périmés, à générer depuis les données plutôt qu'écrire en dur :
  - `index.html:167` : « 12 unités · du zéro à A1 solide » → 18 unités, A1 → A2 ;
  - `index.html:208` : « 20 verbes essentiels · 3 temps » → « 44 verbes · jusqu'à 5 temps »
    (seuls 24 verbes ont les 5 temps) ;
  - `index.html:269` : « 150+ expressions » → 77 ;
  - `index.html:169` : « 0 / 50 chapitres » est bien recalculé par `units.js:133`, seul le
    texte initial est faux ;
  - `achievements.js:12` : « Maîtriser 10 verbes (3 temps) » ;
  - `README.md` : « 12 unités », fonctionnalités v5 à v8 absentes.

### 6.6 — Niveaux CECRL et « Test A1 » · **S**
- 18 chapitres d'unités A1 portent des tags A2 ou B1 (u8 à u11 : A2 ; u12 : **B1**).
  **Ne pas se contenter de retaguer.** Remettre « A1 » sur un contenu réellement A2/B1 masque
  le problème sans le résoudre. La démarche :
  1. déterminer le niveau **réel** de chaque chapitre à partir de ce qu'il contient (structures,
     dialogues, vocabulaire) ;
  2. si le contenu dépasse le niveau de l'unité, **simplifier le contenu** (cf. 3.3, par
     exemple les missions u12, dont les dialogues sont `level: 3`) ;
  3. seulement ensuite, aligner les tags de l'unité, du chapitre et du dialogue sur ce niveau
     réel.
  Le « Test A1 » ne peut pas contenir de contenu B1.
- **« Test A1 — 50 questions mixtes »** (u12_c4) : le générateur normal produit environ
  18 slides, dont environ 11 exercices notés. Deux options :
  - **(a)** honnête et rapide (**S**) : changer le `goal` pour « révision mixte des unités
    1 à 11 » ;
  - **(b)** vrai test (**M**) : un mode sans cartes de découverte, avec un nombre fixe de
    questions tirées de tout le contenu d'u1 à u11, et un score final.
  Choisir (a) sauf si (b) est explicitement souhaité.
- **Casse des infinitifs** : certains verbes sont en minuscule (*hazırlamak, sormak…*), les
  autres en majuscule (*Gitmek*). Uniformiser.
- **Homonyme *Yüz*** (`v_yuz` = cent, `v_yuz_corps` = visage) : vérifier que le Vrai/Faux ne
  peut pas déclarer « Faux » un sens pourtant correct.

### 6.7 — Rappels quotidiens : une vraie fonctionnalité ou rien · **M** (optionnel)
- Constat (AXE 0) : le réglage `dailyReminder` était enregistré, mais aucun code ne demandait
  ni ne programmait de notification. En attendant, l'interrupteur est affiché désactivé, avec
  la mention « Bientôt disponible ». La clé `State` est conservée (contrainte 2).
- Pour le rendre réel sans backend (contrainte 4), la seule voie est une notification
  **locale** : `Notification.requestPermission()` au moment où l'utilisateur active
  l'interrupteur, puis un rappel à l'ouverture suivante ou via le service worker.
  - Sans serveur de push, aucune notification n'est garantie quand l'app est fermée.
  - La Periodic Background Sync n'est disponible que sur Chromium, et seulement pour une PWA
    installée.
  - Il faut le dire dans l'interface plutôt que promettre un rappel fiable.
- **Accept.** : soit l'interrupteur déclenche une notification réelle (permission demandée,
  rappel reçu dans les conditions annoncées), soit il reste marqué « Bientôt disponible ».
  Jamais un réglage qui a l'air actif mais ne fait rien.

---

## 🗓️ ORDRE D'EXÉCUTION CONSEILLÉ

1. **AXE 0** (Paramètres et Défi du jour) : environ 30 minutes, et ça débloque des
   fonctionnalités déjà écrites. À faire avant tout le reste.
2. **AXE 1.1 + 1.2 + 1.5** (temps autorisés, expressions figées) et **AXE 2** (copule) : même criticité pédagogique, à
   mener ensemble, car sans conjugaison avant u9, c'est la copule qui fait parler
   l'apprenant.
3. **AXE 3.1** : corrections factuelles rapides.
4. **AXE 1.3 + 1.4** : révision bornée et « testé = présenté ». Remplace v9 AXE 1.1.
5. **AXE 5.1** : exemples des 12 verbes.
6. **AXE 3.2 à 3.6, puis AXE 4** : relecture linguistique et réorganisation du contenu.
7. **AXE 6.3 + 6.4** : niveau unifié, streak.
8. **AXE 5.2 à 5.5, 6.1, 6.2, 6.5, 6.6** : enrichissement et finitions.

> **Articulation avec v9** :
> - v9 AXE 1.1 est **remplacé** par v10 AXE 1.3. Ne pas livrer la version v9 seule.
> - v9 AXE 2 (négation passé/futur) reste valable, et ses nouveaux temps doivent être ajoutés
>   à la logique de temps débloqués (1.1 / 1.3).
> - v9 AXE 3 (Défi du jour) doit partir de l'implémentation réelle (cf. 0.2).
> - v9 AXE 4 (accessibilité, manifest) reste inchangé.

---

## ✅ CRITÈRES D'ACCEPTATION GLOBAUX v10

- ✅ Chaque réglage de `settings.js` est accessible et fonctionne. Plus aucune vue n'est
  définie deux fois, plus aucun fichier de vue n'est mort.
- ✅ Simulation sur **tous** les chapitres (y compris ceux ajoutés en v10) × 20 générations,
  profil neuf : aucune question, aucun distracteur et aucun exemple ne porte sur un temps
  enseigné après le chapitre courant, ni sur un mot ou une réplique qui n'a été ni présenté
  ni appris.
- ✅ 100 % des exemples de verbes ont un champ `tense`, relu à la main.
- ✅ La révision d'un profil en cours de parcours ne contient que du contenu de chapitres
  terminés.
- ✅ La copule est enseignée, et plus aucun chapitre ne fait dire « je suis » avec *olmak*.
- ✅ Les 11 corrections ponctuelles sont faites (9 erreurs + 2 alignements), et les 192
  répliques de dialogue ont été relues.
- ✅ Aucun chapitre antérieur à u9_c3 n'exige de conjugaison : les énoncés conjugués y passent
  par des expressions figées (politique 1.5).
- ✅ Les niveaux CECRL affichés reflètent le niveau réel du contenu, pas seulement un tag
  réaligné.
- ✅ 44/44 verbes avec exemples, et les 5 verbes orphelins sont dans le parcours.
- ✅ Aucun chapitre ne reprend le contenu pédagogique d'un autre, hors spirale assumée ; chaque
  dialogue et chaque règle correspondent au `canDo` de leur chapitre.
- ✅ Un seul barème de niveau ; streak calculé en date locale sur les jours à objectif atteint.
- ✅ Tous les chiffres affichés (unités, verbes, temps, phrases, défi) correspondent aux données.
- ✅ Moteur TTS intact, aucun id supprimé ni renommé, aucune clé `State` supprimée, aucun
  chapitre déplacé.

---

## 🔎 MÉTHODE DES AUDITS

- **Audit pédagogique** : conversion des `js/data/*.js` en JSON (parseur Python, car Node
  n'est pas installé sur la machine), vue complète du parcours chapitre par chapitre, lecture
  de `js/engine/exercises.js`, et contrôles scriptés (mot présent dans son exemple, temps de
  chaque exemple de verbe, chevauchement de chapitres, contenu inutilisé, première apparition
  de chaque règle, niveau des dialogues).
- **Audit fonctionnel (Codex)** : 1 460 générations de leçons simulées, 17 routes contrôlées,
  vérification de l'ordre de chargement des scripts et des vues.
- **Vérification croisée** : chaque constat de chaque audit a été revérifié dans le code par
  l'autre. Deux affirmations ont été corrigées en cours de route :
  - le Défi du jour réellement actif suit bien les XP : `daily.js` est mort ;
  - « 70/73 chapitres testent un élément non présenté » vaut pour la session, pas pour tout
    le parcours.
- **Relecture de la roadmap elle-même** (Codex), qui a corrigé cette version avant exécution :
  - `d_rencontre` est trop avancé pour u1_c2, et il ne contient pas *Nasılsın* contrairement
    à ce qu'affirmait une version précédente ;
  - contradiction « goûts avant conjugaison », d'où la politique des chunks (1.5) ;
  - `d_eczane` n'est pas une aide générale ;
  - un critère d'exemple textuel serait trop strict pour la morphologie turque ;
  - un réalignement CECRL par simple retag masquerait le problème ;
  - le compte des corrections, la formulation du cinéma et « jusqu'à 5 temps » ont été
    précisés ;
  - la garde `_initialized` des phrases, le seuil de 50 % en simple alerte.
- **Seconde relecture de la roadmap** (Codex), 7 formulations corrigées :
  - champ `tense` explicite sur les exemples de verbes, prérequis de 1.2 ;
  - entrée informelle `v_nasilsin` ;
  - acceptation de 1.1 qui reconnaît le changement voulu des chapitres sans `tenses` ;
  - slide `dialogue_read` avant tout exercice de dialogue (1.4) ;
  - portée réelle du manque d'exemples (5.1) ;
  - `d_eczane` en u13_c3 plutôt qu'en u16_c3 « Chez le médecin » ;
  - simulation sur « tous les chapitres » et non sur un nombre figé.
- **À ajouter à `tools/validate-data.js`** : ces contrôles pédagogiques (temps avant
  enseignement, mot absent de son exemple, chevauchement de chapitres > 50 %, vue définie deux
  fois), pour détecter automatiquement la prochaine régression.

---

## Légende complexité
- **S** — Small (~30 min, 1 fichier)
- **M** — Medium (1-2 h, quelques fichiers)

## Rappel de philosophie v10
> v9 a appris qu'une notion enseignée mais jamais retestée n'est qu'à moitié construite. v10
> ajoute deux leçons :
> - **une notion testée avant d'avoir été enseignée n'est pas de la révision, c'est un
>   piège ;**
> - **une fonctionnalité « livrée » mais inaccessible n'est pas livrée.** Des données « saines »
>   et des cases cochées ne suffisent pas : il faut relire le parcours dans l'ordre où
>   l'apprenant le découvre, et vérifier l'app telle qu'elle est réellement chargée.
