# TürkçeYol — ROADMAP v8

## « CONSOLIDER · APPROFONDIR · ALLÉGER »

> **Statut : 100% livrée** (12/07/2026)
> ✅ AXE 1 — Passé narratif -mış (règle + 24 verbes vérifiés + chapitre u18_c6)
> ✅ AXE 2 — Interleaving réel (diversité de type + anti-répétition de thème dans le Mix rapide)
> ✅ AXE 3 — Streak plus sain (message neutre, mode pause, affichage discret)
> ✅ AXE 4 — 3 badges d'apprentissage (Conteur, Habitué(e), Curateur)
> ✅ AXE 5 — Les 3 bugs corrigés (garde micro, contraste bandeau gel, audit clair v7)
> ⏸️ AXE 6 — Contenu en réserve (non traité, explicitement optionnel dès la rédaction)

> Séquence : v3 (bases) → v4 (densité) → v5 (fondations) → v6 (profondeur + rétention) →
> v7 (parler/comprendre/s'entraîner, élaguée après revue critique) → **v8**.
>
> Après 5 sessions à empiler des fonctionnalités, la question qui doit primer n'est plus
> « qu'est-ce qu'on peut ajouter ? » mais **« qu'est-ce qui rendrait vraiment l'apprentissage
> meilleur, et qu'est-ce qui ne fait qu'ajouter du poids ? »**. Cette roadmap part de trois
> constats obtenus par recherche + audit, pas d'inspiration spontanée :
>
> 1. **La gamification en a déjà beaucoup — en rajouter serait contre-productif.**
>    La littérature 2026 sur Duolingo est unanime : streaks, ligues et pression sociale
>    créent de l'anxiété et du *burnout* au-delà d'un certain seuil, et « la gamification
>    sape le plaisir intrinsèque de l'activité elle-même ». TürkçeYol a déjà XP, niveaux,
>    streak, gel de série, combo, badges, objectif quotidien, rapport hebdo. **On n'ajoute
>    plus de mécanique de jeu neuve — on rend celles qui existent plus saines.**
> 2. **Il reste un vrai trou grammatical, du même calibre que l'aoriste (v7).** Le passé
>    narratif/reportatif `-mış` (évidentialité : ce qu'on a vu soi-même vs. ce qu'on a appris/
>    déduit) est absent. C'est *l'exemple canonique* utilisé dans tous les cours de turc pour
>    illustrer une catégorie grammaticale qui n'existe pas en français — plus important
>    pédagogiquement que n'importe quelle nouvelle fonctionnalité de confort.
> 3. **La qualité de la répétition compte plus que son volume.** La recherche 2026 confirme
>    l'intérêt de l'*interleaving* (mélanger délibérément anciens et nouveaux items/thèmes)
>    par rapport à la pratique groupée — TürkçeYol a un excellent SRS mais les sessions de
>    révision ne garantissent pas explicitly la diversité thématique.
>
> **Cette v8 ne cherche pas à faire aussi long que v7. Un plan plus court mais entièrement
> justifié vaut mieux qu'un plan long à moitié gonflé — la leçon de la première version de
> v7 (jetée après relecture) reste appliquée ici dès l'écriture.**

---

## ⛔ CONTRAINTES DURES — INCHANGÉES

1. **🔊 TTS INTOUCHABLE.** `App.playTTS()` / `App._playGoogleTTS()` / meta `no-referrer` :
   zéro modification. `Speech` (reconnaissance, v7) reste un canal entrant séparé.
2. **Zéro régression de progression.** Aucun `id` supprimé/renommé.
3. **Persistance via `State` uniquement**, valeurs par défaut pour toute nouvelle clé.
4. **Vanilla, statique, sans backend, sans build.**
5. **Rigueur grammaticale non négociable** : toute forme turque ajoutée est dérivée par
   règle **et** vérifiée programmatiquement contre des formes de référence connues avant
   d'être écrite dans les données — méthode qui a fonctionné pour l'aoriste (v7), reconduite
   à l'identique pour `-mış`.
6. **Ne pas ajouter de mécanique de gamification neuve** (pas de nouveau système de points,
   pas de nouvelle pression sociale) — seulement rendre l'existant plus sain ou plus juste.

---

## 📊 ÉTAT AUDITÉ (12/07/2026, post-v7 + fix clavier)

| Ressource | Quantité | Note |
|---|---|---|
| Vocabulaire | 520 mots | 100% avec exemple |
| Verbes | 44 | présent/passé/futur/aoriste ; **`-mış` absent** |
| Grammaire | 19 règles | présent -iyor, passé -dı, futur -ecek, aoriste -Ar/-Ir, cas, etc. |
| Histoires | 8 | lecture + questions |
| Badges | 12 | **aucun lié aux histoires/favoris/aoriste** (ajoutés en v7, jamais récompensés) |
| Gamification | XP, niveaux, streak, gel, combo, objectif, rapport hebdo | **déjà dense — ne pas en rajouter** |
| Sessions de révision | SRS.getSessionMix existant | **pas de garantie de diversité thématique** |
| Bugs trouvés cette session | 2 | (1) clavier turc absent sur l'exercice "Traduire" → **corrigé** ; (2) pas de garde anti-double-clic sur le micro ; (3) contraste limite du bandeau gel de série en thème clair |

---

## 🅰️ AXE 1 — Le passé narratif `-mış` (le vrai trou restant)

> Même rigueur que l'aoriste v7 : dérivation par règle + vérification programmatique contre
> des formes connues avant toute écriture. Aucune approximation.

### 1.1 — Règle de grammaire `g_gecmis_mis` · **M**
- Formation : radical + `-mış/-miş/-muş/-müş` (harmonie 4 voyelles) + terminaison personnelle.
  Contrairement à l'aoriste, **pas d'irrégularité** de type liste fermée — la difficulté est
  **sémantique**, pas morphologique : `-dı` = fait vécu/vu directement, `-mış` = rapporté,
  déduit, découvert après coup, ou surprise (« je me suis réveillé et il avait neigé »).
- Piège central à documenter : *« Yağmur yağdı » (j'ai vu qu'il pleuvait) vs « Yağmur yağmış »
  (je découvre en sortant que le sol est mouillé, mais je n'ai pas vu la pluie tomber)* — une
  distinction que le français ne marque jamais grammaticalement, seulement par le contexte.
- **Accept.** : règle avec `rule`/`example`/`traps` (le piège -dı vs -mış explicité) + drills.

### 1.2 — Conjugaisons sur 20+ verbes fréquents · **M**
- `conjugations.pastNarrative` (ou nom cohérent) sur un lot de verbes déjà couverts par
  l'aoriste (réutilise les mêmes radicaux, donc les mêmes vérifications de voyelle finale/
  consonne sourde déjà validées en v7 — pas de nouvelle irrégularité à gérer).
- **Script de vérification obligatoire** : dériver les formes puis les comparer à un jeu de
  formes de référence connues (ex. `gitmişim`, `gelmiş`, `okumuşsun`) avant d'écrire quoi
  que ce soit dans `verbs.js`.
- **Accept.** : script de contrôle passe à 100% sur le jeu de référence avant intégration.

### 1.3 — Chapitre d'introduction · **S**
- Nouveau chapitre (ex. `u18_c6` ou nouvelle unité selon la place disponible), `tenses:
  ['pastNarrative']`, `grammarIds: ['g_gecmis_mis']`, thématiquement isolé (aucune fuite vers
  les autres temps, garanti par le mécanisme générique déjà en place depuis v5).
- **Accept.** : smoke-test à 0 problème, tableau de conjugaison affiché juste (réutilise
  `_CONJ_TABLE_RULES` + `_buildConjTable`, déjà génériques).

---

## 🅱️ AXE 2 — Interleaving réel dans les révisions

> La pratique intercalée (mélanger volontairement plusieurs thèmes/compétences dans une
> session de révision) améliore la rétention par rapport à des blocs mono-thème. Le SRS
> existant priorise déjà bien *quoi* réviser (urgence, échecs) — il ne garantit pas encore
> la *diversité* de ce qui est réellement servi dans une session.

### 2.1 — Diversité thématique dans le Mix rapide (hub Pratique) · **S/M**
- `SRS.getSessionMix` : après sélection par urgence/EF, réordonner/filtrer légèrement pour
  éviter que 4-5 items d'affilée viennent du même topic vocabulaire ou du même verbe —
  un simple "jamais 2 items consécutifs du même topic" à la manière de `_antiRepeat` déjà
  utilisé côté types d'exercices (v5).
- **Accept.** : sur un jeu de test avec plusieurs topics dus, aucune paire consécutive de
  même topic dans le mix généré.

### 2.2 — Mélanger vocab + conjugaison + grammaire dans une même session « Mix rapide » · **S**
- Vérifier/garantir que le Mix rapide pioche dans plusieurs *types* (`vocabulary`, `verb`,
  `grammar`) quand c'est possible, pas seulement du vocabulaire — cohérent avec l'esprit
  interleaving (mélanger compétences, pas juste des mots).
- **Accept.** : si l'utilisateur a des items dus de plusieurs types, le mix les représente tous.

---

## 🅲️ AXE 3 — Une relation plus saine au streak (recherche : anxiété documentée)

> On ne supprime rien de ce qui existe (le streak reste, le gel reste) — on retire la
> **pression** superflue et on donne un contrôle explicite à l'utilisateur plutôt qu'une
> mécanique punitive implicite.

### 3.1 — Reformulation du message « streak en danger » · **S**
- Actuel : ton d'alerte (« ⚠️ Streak en danger »). Reformuler en ton neutre/encourageant
  (« Une petite session avant ce soir ? » plutôt qu'un avertissement de perte), sans retirer
  l'information. Cohérent avec la recherche : le message d'urgence est précisément ce qui
  transforme un outil d'habitude en source d'anxiété.
- **Accept.** : le message informe sans utiliser de vocabulaire de perte/danger.

### 3.2 — Mode pause explicite (vacances) · **M**
- Un bouton dans Settings « Mettre le streak en pause » : suspend le calcul de streak
  (ni gain ni perte) jusqu'à réactivation manuelle — différent du gel (limité, automatique) :
  ici c'est un choix assumé et illimité dans le temps, pour ne jamais culpabiliser une
  interruption volontaire (vacances, examens, etc.).
- **Accept.** : streak gelé pendant la pause, reprend normalement à la réactivation, aucune
  perte ni pénalité.

### 3.3 — Réduire l'emphase visuelle du streak si souhaité · **S**
- Option Settings « Discret » : le chiffre du streak reste visible mais sans le badge feu 🔥
  ni les couleurs d'alerte, pour les utilisateurs qui préfèrent suivre leur régularité sans
  la charge émotionnelle du symbole. Opt-in, ne change rien pour qui aime le côté ludique.
- **Accept.** : activable/désactivable, aucun impact sur le calcul réel du streak.

---

## 🅳️ AXE 4 — Badges alignés sur l'apprentissage (pas sur l'engagement)

> Volontairement **petit** — pas une nouvelle couche de gamification, juste combler l'oubli :
> les fonctionnalités v7 (histoires, favoris, aoriste) n'ont **aucun** badge alors que 12
> existent déjà pour d'autres mécaniques. Ce sont des badges de *compétence*, pas de *présence*.

### 4.1 — 3 nouveaux badges · **S**
- 📖 *Conteur* — 3 histoires terminées avec 100% aux questions.
- 🔁 *Habitué(e)* — chapitre aoriste (`u18_c6` ou équivalent) terminé à 100%.
- ⭐ *Curateur* — 10 favoris ajoutés (vocab + verbes confondus).
- **Accept.** : conditions réellement évaluées (pas seulement déclarées, cf. bug historique
  des achievements jamais évalués corrigé en v4 — ne pas répéter l'erreur).

---

## 🅴️ AXE 5 — Bugs trouvés + polish ciblé (pas un audit générique)

> Trois éléments concrets trouvés pendant la préparation de cette roadmap, pas une invitation
> à « chercher des bugs » dans le vide.

### 5.1 — Garde anti-double-clic sur le bouton micro · **S**
- `Lesson._startMic()` peut être déclenché deux fois de suite (double-tap) avant la fin de
  la première reconnaissance, créant potentiellement deux instances `SpeechRecognition`
  concurrentes. Ajouter un drapeau `_micActive` qui ignore les appels pendant qu'une
  écoute est en cours.
- **Accept.** : double-tap rapide ne déclenche qu'une seule reconnaissance.

### 5.2 — Contraste du bandeau « gel de série gagné » en thème clair · **S**
- `#38BDF8` sur fond `rgba(56,189,248,0.12)` : lisible en sombre, contraste plus faible sur
  fond clair. Ajuster la couleur de texte via une variable qui distingue clair/sombre (comme
  fait pour le reste du thème en v6).
- **Accept.** : contraste AA respecté dans les deux thèmes.

### 5.3 — Audit rapide clair/sombre des vues v7 (histoires, pratique, radar) · **S**
- Ces vues ont été construites vite en fin de session v7 ; repasser dessus en thème clair
  pour vérifier qu'aucune autre couleur codée en dur ne pose problème (même classe de bug
  que 5.2, vérifié une fois pour toutes plutôt qu'au cas par cas).
- **Accept.** : les 3 vues lisibles et cohérentes en thème clair.

---

## 🅵️ AXE 6 — Contenu en réserve (petit, incrémental, pas de bloc géant)

> Cohérent avec la leçon de v7 : le contenu s'ajoute bien au fil de l'eau, pas en gros lot
> planifié à l'avance. Deux candidats identifiés, **à ne traiter que si le temps le permet**
> après les axes 1-5.

- **Nécessitatif `-meli/-malı`** (« je dois ») — reporté de v7, toujours pertinent, toujours
  simple à ajouter par rapport à `-mış`.
- **Connecteurs temporels `-meden önce` / `-dıktan sonra`** (« avant de / après avoir ») —
  structures A2 très utilisées, absentes des 19 règles actuelles (seul le vocabulaire
  « avant/après » existe, pas la construction verbale).

---

## 🗓️ ORDRE D'EXÉCUTION CONSEILLÉ

1. **AXE 5.1** (garde micro) — bug réel, corrige avant tout le reste.
2. **AXE 1** (passé narratif `-mış`) — le plus gros gain pédagogique, priorité absolue.
3. **AXE 5.2 + 5.3** (polish thème clair) — petit, rapide, pendant qu'on est dans le sujet UI.
4. **AXE 3** (streak plus sain) — différenciant, informé par la recherche, risque faible.
5. **AXE 2** (interleaving) — améliore la qualité des révisions existantes.
6. **AXE 4** (badges apprentissage) — petit geste de cohérence, rapide.
7. **AXE 6** (contenu en réserve) — si le temps le permet, sans obligation.

---

## ✅ CRITÈRES D'ACCEPTATION GLOBAUX v8

- ✅ Le passé narratif `-mış` est enseigné avec le piège `-dı` vs `-mış` explicité, formes
  vérifiées programmatiquement avant intégration.
- ✅ Le Mix rapide du hub Pratique garantit une diversité thématique/de type, pas de blocs
  répétitifs.
- ✅ Le streak reste fonctionnel mais son message n'induit plus d'urgence anxiogène ; une
  pause explicite est possible sans pénalité.
- ✅ 3 nouveaux badges liés à l'apprentissage réel (histoires, aoriste, favoris), conditions
  réellement évaluées.
- ✅ Les 3 bugs identifiés (micro, contraste, thème clair v7) sont corrigés et vérifiés.
- ✅ **Zéro nouvelle mécanique de gamification** — cette roadmap n'ajoute pas de points, pas
  de nouvelle compétition, pas de nouvelle pression. Elle consolide.
- ✅ Moteur TTS strictement intact, aucun id supprimé, `node tools/*.js` = 0.

---

## 🔎 SOURCES / RECHERCHE

- Tendances 2026 apps de langue (IA, microlearning, répétition espacée) — Befreed, Science
  Based Learning, Languatalk, comparatifs multiples.
- **Retrieval practice, interleaving, sentence mining** — The Language Gym (recalibration
  2026 sur l'usage excessif de la pratique de rappel), Clozemaster, PolyChat.
- **Anxiété et burnout liés à la gamification (Duolingo)** — StriveCloud, The Decision Lab
  (« Streak Creep »), Screenwise (streaks et anxiété), My Senpai (pourquoi les gens quittent
  Duolingo), analyse systématique arXiv sur les effets négatifs de la gamification en
  éducation.
- **Passé narratif turc (`-mış`, évidentialité)** — connaissance grammaticale de référence
  du turc (catégorie enseignée dans tout cursus A2/B1, distincte du passé simple `-dı`),
  vérifiée par dérivation morphologique + contrôle programmatique avant intégration (même
  méthode que l'aoriste v7).

---

## Légende complexité
- **S** — Small (~30 min, 1 fichier)
- **M** — Medium (1-2 h, quelques fichiers)

## Rappel de philosophie v8
> v5 a rendu l'app cohérente, v6 profonde, v7 vivante. v8 la rend **plus juste** : moins de
> pression, plus de justesse grammaticale, une répétition plus intelligente. On ne mesure pas
> cette roadmap au nombre de fonctionnalités ajoutées, mais à la disparition des irritants et
> à la solidité de ce qui reste.
