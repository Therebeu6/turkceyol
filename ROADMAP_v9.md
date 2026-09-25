# TürkçeYol — ROADMAP v9

## « RETESTER · COMPLÉTER · TENIR SES PROMESSES »

> Séquence : v6 (profondeur) → v7 (parler/comprendre/s'entraîner) → v8 (passé narratif,
> interleaving, streak plus sain) → **v9**.
>
> Cette fois, la matière ne vient pas d'une envie de fonctionnalité neuve mais d'un **audit
> complet du dépôt** (intégrité des données, lecture du moteur de révision ligne par ligne,
> recherche des vraies tendances 2026) + recherche externe. Trois constats, du plus important
> au plus mineur :
>
> 1. **Bug réel trouvé en lisant le moteur : le SRS n'interroge jamais l'aoriste ni le passé
>    narratif.** `Exercises.generateForReview()` — la fonction qui décide quoi faire réviser
>    chaque jour — tire au sort parmi une liste figée `['present', 'past', 'future']`
>    (`js/engine/exercises.js:294`). L'aoriste (v7) et le passé narratif (v8) n'y figurent pas.
>    Résultat concret : un verbe appris via le chapitre aoriste ou passé narratif, une fois
>    entré dans la file de révision espacée, ne sera **plus jamais** retesté sur la forme
>    précisément enseignée dans ce chapitre — seulement sur présent/passé/futur. Les deux
>    dernières fonctionnalités phares du projet ne bénéficient donc d'aucune rétention à long
>    terme. C'est le genre de trou qu'aucun audit "à l'œil" ne trouve — seulement la lecture du
>    code de bout en bout, ce qui est précisément l'objet de cette v9.
> 2. **Recherche : FSRS a authentiquement dépassé l'algorithme actuel — mais ce n'est PAS une
>    tâche v9.** FSRS-6 (2025-2026) réduit le nombre de révisions de 20 à 30% pour une même
>    rétention par rapport à un algorithme de type SM-2/EF (celui que `srs.js` utilise
>    aujourd'hui). C'est réel et vérifié. Mais remplacer le moteur de révision reviendrait à
>    retoucher la structure de données qui porte des mois de progression réelle d'un seul
>    utilisateur, pour un algorithme dont la mise en œuvre correcte (stabilité, difficulté,
>    rétrievabilité par carte, ré-ajustement des paramètres) est significative — et
>    `SRS.getRetentionRate()` ne signale aujourd'hui aucun problème de rétention. Rapport
>    risque/valeur défavorable pour une appli mono-utilisateur sans symptôme. **Décision : ne
>    pas y toucher en v9**, notée ici pour ne pas redécouvrir cette réponse dans deux versions
>    si la question revient — seulement à reconsidérer si `getRetentionRate()` se dégrade
>    réellement.
> 3. **Recherche : les grandes tendances 2026 (tuteur IA conversationnel, scoring de
>    prononciation au niveau du phonème) sont structurellement incompatibles avec l'app.**
>    Elles reposent toutes sur des appels LLM/serveur. TürkçeYol est statique, sans backend,
>    par contrainte assumée depuis la v3. Ce n'est pas un renoncement caché : mieux vaut le dire
>    explicitement que faire comme si la question ne s'était pas posée.
>
> **Conclusion de l'audit : le socle de données est sain** (0 id dupliqué, 0 référence orpheline,
> 0 règle de grammaire jamais utilisée, sur 520 mots / 44 verbes / 20 règles / 73 chapitres / 29
> dialogues / 77 phrases / 8 histoires / 15 badges). v9 n'a donc pas besoin d'un axe "nettoyage
> général" — elle peut se concentrer sur des trous précis, vérifiés, chacun justifié seul.

---

## ⛔ CONTRAINTES DURES — INCHANGÉES

1. **🔊 TTS INTOUCHABLE.** `App.playTTS()` / `App._playGoogleTTS()` / meta `no-referrer` :
   zéro modification.
2. **Zéro régression de progression.** Aucun `id` supprimé/renommé. Aucune structure de
   `reviewQueue` modifiée (voir constat n°2 — le moteur SRS n'est pas touché en v9, seule sa
   *sélection de tense* l'est, ce qui ne change ni le format des items ni l'historique).
3. **Persistance via `State` uniquement**, valeurs par défaut pour toute nouvelle clé.
4. **Vanilla, statique, sans backend, sans build.**
5. **Rigueur grammaticale non négociable** : toute forme turque ajoutée est dérivée par règle
   **et** vérifiée programmatiquement contre des formes de référence connues avant d'être
   écrite dans les données — méthode reconduite à l'identique pour la négation passé/futur.
6. **Ne pas ajouter de mécanique de gamification neuve** (cf. v8) — l'AXE 3 de cette roadmap
   *complète* une carte déjà visible chaque jour, elle n'en crée pas une nouvelle.

---

## 📊 ÉTAT AUDITÉ (12/07/2026, post-v8)

| Ressource | Quantité | Note |
|---|---|---|
| Vocabulaire | 520 mots | 100% avec exemple, 100% avec thème, 0 doublon |
| Verbes | 44 | présent/passé/futur (44) ; aoriste + passé narratif (24) ; **négation : présent seulement (44), aucune au passé/futur/aoriste** |
| Grammaire | 20 règles | 0 règle orpheline (toutes rattachées à ≥1 chapitre) |
| Chapitres | 73 | 0 référence cassée (grammarIds/verbIds tous valides) |
| Histoires / Dialogues / Phrases | 8 / 29 / 77 | 0 doublon |
| Badges | 15 | tous à conditions réellement évaluées |
| **Bug trouvé** | `generateForReview` (SRS quotidien) ignore aoriste et passé narratif | **priorité absolue v9** |

---

## 🅰️ AXE 1 — Le SRS doit retester ce qu'il enseigne (bug réel, priorité absolue)

### 1.1 — Corriger `generateForReview` · **S**
- Remplacer la liste figée `['present', 'past', 'future']` (`exercises.js:294`) par
  `Object.keys(verb.conjugations)` : le tirage se fait alors parmi les temps **réellement
  présents** sur le verbe, aoriste et passé narratif inclus — et reste correct automatiquement
  si un futur temps est ajouté un jour, sans nouvelle liste à maintenir à la main.
- `createVerbFill` gère déjà l'absence propre d'un temps (retourne `null` sans planter), donc
  aucun risque pour les 20 verbes qui n'ont pas encore aoriste/passé narratif — ils continuent
  d'être testés sur présent/passé/futur exactement comme avant.
- **Accept.** : sur un jeu de test simulé avec des verbes ayant les 5 temps, aoriste et passé
  narratif apparaissent dans le tirage de révision ; sur un verbe n'ayant que 3 temps,
  comportement strictement inchangé.

### 1.2 — Élargir aoriste/passé narratif à quelques verbes fréquents de plus · **M** (optionnel, après 1.1 seulement)
- Sans 1.1, cet axe ne sert à rien (les nouvelles formes ne seraient jamais testées) — ordre
  important. Une fois 1.1 fait, élargir au-delà des 24 verbes actuels varie davantage le pool de
  révision. Même méthode de vérification que v7/v8 (dérivation + contrôle contre formes de
  référence avant écriture).
- **Accept.** : script de contrôle à 100% sur le jeu de référence avant intégration.

---

## 🅱️ AXE 2 — Négation passé/futur (trou plus fondamental qu'exotique)

> "Je n'ai pas mangé", "je n'irai pas" sont des structures A1 basiques, utilisées bien plus
> souvent au quotidien qu'un temps composé — et pourtant 0% couvertes aujourd'hui (seule la
> négation au présent progressif existe, `g_negatif_fiil`).

### 2.1 — Négation passé (-medi/-madı) et futur (-meyecek/-mayacak) · **M**
- `conjugations.pastNeg` / `futureNeg` sur un sous-ensemble de verbes vérifiés (même rigueur :
  dérivation + contrôle contre formes connues — ex. `gitmedim`, `yapmayacağım`).
- Extension de `g_negatif_fiil` (ou nouvelle règle dédiée) avec les deux formations + piège
  explicite (négation DANS le verbe, pas un mot séparé — déjà documenté pour le présent,
  à reconduire).
- **Accept.** : script de contrôle à 100% avant intégration, `generateForReview` (via la
  correction 1.1) route naturellement ces nouveaux temps sans code supplémentaire.

### 2.2 — Négation aoriste (-mAz) — paradigme à part, à ne traiter que si 2.1 est solide · **S**
- Irrégularité réelle (vérifiée par recherche) : le aoriste négatif n'ajoute pas -mA- devant
  la forme affirmative -Ar/-Ir, il utilise -mAz pour toutes les personnes SAUF ben/biz où le
  -z tombe : *gitmem* (pas "gitmezim"), *gitmeyiz* (pas "gitmeziz"), *gitmezsin*, *gitmez*,
  *gitmezsiniz*, *gitmezler*. Paradigme structurellement différent de 2.1, nécessite son propre
  jeu de formes de référence.
- **Explicitement optionnel** : si 2.1 prend tout le temps disponible, 2.2 se reporte sans
  problème — cohérent avec la doctrine "petit pas vérifié plutôt que bloc géant" (v7/v8).

---

## 🅲️ AXE 3 — Rendre réel le Défi du jour (une carte déjà visible chaque jour, mais vide)

> Ce n'est pas une nouvelle mécanique de gamification (contrainte n°6) : `#daily` existe déjà
> dans l'UI (carte sur le dashboard, vue dédiée) depuis une version antérieure — mais
> `Daily.render()` affiche un texte **strictement identique tous les jours** ("faire 2 leçons
> parfaites"), sans aucun suivi ni récompense propres. Un utilisateur qui l'ouvre régulièrement
> voit toujours exactement la même chose : une carte qui prétend être vivante sans l'être.

### 3.1 — Défi choisi parmi 4-5 variantes, déterministe par date · **M**
- Variantes proposées, toutes basées sur des compteurs **déjà trackés** (aucun nouvel état
  aléatoire à inventer) : "3 leçons parfaites" (`perfectLessons`), "termine le Mix rapide"
  (hub Pratique existant), "révise tes mots fragiles" (`SRS.getWeakItems`), "termine une
  histoire à 100%" (`storiesPerfect`).
- Sélection déterministe (ex. hash de la date → index dans le tableau de variantes) : pas de
  `Math.random()` ni de nouvel état à persister, le défi du jour est reproductible si l'app est
  rouverte plusieurs fois le même jour.
- Récompense = XP bonus via `Gamification.addXP` existant (pas de nouvelle monnaie).
- **Accept.** : le texte du Défi du jour change réellement d'un jour à l'autre (vérifiable en
  simulant plusieurs dates), la progression vers le défi du jour est visible, la récompense
  utilise le circuit XP existant sans rien dupliquer.

---

## 🅳️ AXE 4 — Polish ciblé (pas un audit d'accessibilité complet)

> Deux points concrets trouvés pendant l'audit — pas une invitation à un audit WCAG exhaustif :
> le rapport effort/valeur d'une mise aux normes complète ne se justifie pas pour une appli
> mono-utilisateur, mais deux oublis précis et rapides à corriger valent la peine.

### 4.1 — `aria-label` sur les boutons icône-seule les plus visibles · **S**
- Constat : 105 gestionnaires `onclick` dans les vues, seulement 6 fichiers utilisent
  `aria-label` au moins une fois. Corriger uniquement les boutons icône-seule les plus visibles
  (navigation, fermeture de modale) sans texte visible à côté — pas un passage exhaustif sur
  chaque élément cliquable du site.
- **Accept.** : les boutons icône-seule de la nav principale et des modales ont un `aria-label`.

### 4.2 — `theme_color`/`background_color` du manifest figés en sombre · **S**
- `manifest.json` déclare `#0D0D14` (sombre) sans condition : un utilisateur en thème clair
  voit quand même une barre d'installation/statut PWA sombre. Petit ajustement pour que la
  couleur reflète le thème actif (ou, à défaut, un choix neutre assumé plutôt qu'un oubli).
- **Accept.** : cohérence visuelle entre le thème actif dans l'app et la chrome du navigateur
  en mode PWA installé, dans les deux thèmes.

---

## 🅴️ Rappel : contenu en réserve (reporté de v7, puis v8, toujours optionnel)

- **Nécessitatif `-meli/-malı`** ("je dois") — repoussé une troisième fois : la négation
  passé/futur (AXE 2) est plus fondamentale et plus utilisée au quotidien. Reste pertinent,
  reste simple, reste en réserve.
- **Connecteurs temporels `-meden önce` / `-dıktan sonra`** ("avant de / après avoir") — idem,
  toujours en réserve, toujours non obligatoire.

---

## 🗓️ ORDRE D'EXÉCUTION CONSEILLÉ

1. **AXE 1.1** (fix `generateForReview`) — bug réel, corrige avant tout le reste ; sans lui,
   tout nouvel apport grammatical futur restera lui aussi jamais retesté.
2. **AXE 2.1** (négation passé/futur) — le plus gros gain pédagogique, structure A1 fondamentale
   totalement absente aujourd'hui.
3. **AXE 3** (Défi du jour réel) — visible immédiatement par l'utilisateur, risque faible,
   réutilise uniquement des mécaniques existantes.
4. **AXE 4** (polish ciblé) — petit, rapide.
5. **AXE 1.2** puis **AXE 2.2** — si le temps le permet, dans cet ordre, sans obligation.

---

## ✅ CRITÈRES D'ACCEPTATION GLOBAUX v9

- ✅ La révision espacée retteste réellement l'aoriste et le passé narratif une fois appris —
  vérifié sur un jeu de test simulé, pas seulement "ça ne plante pas".
- ✅ La négation passé et futur existe, vérifiée programmatiquement avant intégration, routée
  automatiquement par le SRS corrigé (AXE 1.1) sans code supplémentaire.
- ✅ Le Défi du jour affiche un contenu réellement différent selon le jour, sans nouvelle
  mécanique de gamification, sans nouvel état aléatoire non déterministe.
- ✅ Les deux oublis d'accessibilité/PWA identifiés sont corrigés, sans prétendre à un audit
  WCAG complet.
- ✅ FSRS documenté comme délibérément écarté de v9, avec la raison, pour ne pas rouvrir le
  débat sans nouvelle donnée (`SRS.getRetentionRate()` à surveiller).
- ✅ Moteur TTS strictement intact, aucun id supprimé, aucune structure `reviewQueue` modifiée,
  `node tools/*.js` = 0.

---

## 🔎 SOURCES / RECHERCHE

- **FSRS vs SM-2 (2026)** — comparatifs Diane, Flica, DeckStudy, SmartRecallAI : FSRS-6 (fin
  2025, entraîné sur ~700M révisions) réduit le volume de révisions de 20-30% à rétention égale
  par rapport à SM-2/EF. Confirme la supériorité technique, mais ne change pas la décision de
  ne pas y toucher en v9 (cf. constat n°2).
- **Web Speech API / reconnaissance sur device (2026)** — MDN, WebAudio Community Group
  (rapport de mai 2026), caniuse : la reconnaissance sur device reste en Edge Canary/Dev
  uniquement, Firefox ne l'active toujours pas par défaut. Confirme que la décision v7 (mic
  opt-in minimal, pas de scoring) reste valide sans changement.
- **Tendances apps de langue 2026** — comparatifs Enverson AI, PolyChat, ISSEN : dominance de
  la personnalisation par IA et des tuteurs conversationnels LLM (ex. Duolingo Video Call) —
  confirmés structurellement incompatibles avec la contrainte zéro-backend de TürkçeYol
  (constat n°3).
- **Négation aoriste turque (-mAz)** — vérification du paradigme irrégulier (chute du -z aux
  1ères personnes : gitmem/gitmeyiz) avant toute mention dans cette roadmap, pour que l'AXE 2.2
  soit décrit avec exactitude dès l'écriture.
- **Audit interne** — lecture complète de `js/engine/exercises.js`, `js/engine/srs.js`,
  `js/views/daily.js`, `manifest.json`, `sw.js`, et script Python (quickjs) vérifiant doublons
  d'id, références orphelines et couverture de données sur l'ensemble des fichiers `js/data/*`.

---

## Légende complexité
- **S** — Small (~30 min, 1 fichier)
- **M** — Medium (1-2 h, quelques fichiers)

## Rappel de philosophie v9
> v7 a appris à élaguer, v8 a appris à finir ce qui est commencé plutôt que d'en ouvrir sans
> cesse. v9 ajoute une troisième leçon : **une fonctionnalité qui enseigne quelque chose sans
> jamais le retester n'est qu'à moitié construite.** Le plus grand gain de cette version n'est
> pas une nouvelle fonctionnalité — c'est de faire fonctionner correctement ce qui existe déjà.
