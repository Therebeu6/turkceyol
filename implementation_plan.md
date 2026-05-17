# 🇹🇷 TürkçeYol — Application Web d'apprentissage du turc

**Concept produit** : Une web app statique premium, mobile-first, pour francophones débutants souhaitant progresser en turc. Elle combine progression structurée par Units/Chapters, gamification sobre, répétition espacée, conjugaison intégrée et contenu réel — le tout sans backend, 100% HTML/CSS/JS vanilla.

---

## Architecture produit

```
TürkçeYol/
├── index.html              ← Point d'entrée unique (SPA via hash routing)
├── css/
│   ├── main.css            ← Design system, tokens, reset, typography
│   ├── components.css      ← Cards, boutons, barres, badges, modals
│   └── animations.css      ← Micro-interactions, transitions, feedback
├── js/
│   ├── app.js              ← Router SPA, init, navigation
│   ├── state.js            ← State global, localStorage, userProgress
│   ├── data/
│   │   ├── units.js        ← Units + Chapters
│   │   ├── vocabulary.js   ← ~300 mots structurés
│   │   ├── verbs.js        ← 40+ verbes avec conjugaisons
│   │   ├── phrases.js      ← ~150 phrases utiles
│   │   ├── dialogues.js    ← 10+ mini-dialogues
│   │   ├── grammar.js      ← Tips grammaticaux
│   │   └── achievements.js ← Badges et récompenses
│   ├── engine/
│   │   ├── srs.js          ← Spaced Repetition System
│   │   ├── exercises.js    ← Générateur d'exercices
│   │   └── gamification.js ← XP, streak, niveaux
│   └── views/
│       ├── dashboard.js    ← Accueil / Dashboard
│       ├── units.js        ← Parcours / Units
│       ├── lesson.js       ← Leçon interactive
│       ├── verbs.js        ← Module Verbes & Conjugaison
│       ├── vocabulary.js   ← Vocabulaire filtrable
│       ├── phrases.js      ← Phrases utiles
│       ├── dialogues.js    ← Mini-dialogues
│       ├── review.js       ← Révisions SRS
│       ├── daily.js        ← Défi quotidien
│       ├── stats.js        ← Statistiques
│       └── settings.js     ← Paramètres
```

> [!NOTE]
> SPA avec hash routing (`#dashboard`, `#units`, `#lesson/ch1`, etc.) — aucune dépendance externe, fonctionne en `file://` ou serveur statique.

---

## Units & Chapters complets

### Unit 1 — Premiers pas en turc *(~1h30)*
| # | Chapter | Objectif | XP |
|---|---------|----------|----|
| 1.1 | Sons et lettres clés | Maîtriser ç, ş, ğ, ı, ö, ü | 50 |
| 1.2 | Bonjour et au revoir | Salutations formelles et informelles | 50 |
| 1.3 | Politesse essentielle | Merci, pardon, s'il vous plaît | 60 |
| 1.4 | Oui, non, peut-être | Réponses de base | 40 |
| 1.5 | Les chiffres 1–20 | Compter et comprendre les prix simples | 70 |

### Unit 2 — Me présenter *(~2h)*
| # | Chapter | Objectif | XP |
|---|---------|----------|----|
| 2.1 | Je m'appelle… | Dire et demander son prénom | 60 |
| 2.2 | Ma nationalité | Pays, origines, langues | 70 |
| 2.3 | Mon âge | Dire et demander l'âge | 50 |
| 2.4 | Mon métier | Professions fréquentes | 70 |
| 2.5 | Mini présentation | Enchaîner 4–5 phrases sur soi | 100 |

### Unit 3 — Le quotidien immédiat *(~2h)*
| # | Chapter | Objectif | XP |
|---|---------|----------|----|
| 3.1 | L'heure et les jours | Dire l'heure, les jours de la semaine | 70 |
| 3.2 | Aujourd'hui et demain | Hier / aujourd'hui / demain / fréquence | 70 |
| 3.3 | Mots de la maison | Pièces, objets du quotidien | 80 |
| 3.4 | Couleurs et formes | Décrire visuellement | 50 |
| 3.5 | Les chiffres 20–100 | Compter jusqu'à 100 | 60 |

### Unit 4 — Famille et entourage *(~1h30)*
| # | Chapter | Objectif | XP |
|---|---------|----------|----|
| 4.1 | Ma famille | Membres de la famille | 70 |
| 4.2 | Décrire quelqu'un | Taille, apparence, caractère | 80 |
| 4.3 | Possessifs | Mon/ma/mes en turc | 80 |
| 4.4 | Parler de ses proches | Mini-dialogue famille | 100 |

### Unit 5 — Se déplacer en ville *(~2h)*
| # | Chapter | Objectif | XP |
|---|---------|----------|----|
| 5.1 | Les lieux de la ville | Magasin, café, hôpital, gare… | 80 |
| 5.2 | Demander son chemin | Où est… ? Comment aller à… ? | 90 |
| 5.3 | Les transports | Bus, metro, taxi, pied… | 70 |
| 5.4 | Directions | Tout droit, à gauche, proche… | 80 |
| 5.5 | Mission : aller au café | Dialogue de navigation réaliste | 100 |

### Unit 6 — Manger et commander *(~2h)*
| # | Chapter | Objectif | XP |
|---|---------|----------|----|
| 6.1 | Les aliments | Fruits, légumes, plats turcs | 80 |
| 6.2 | Les boissons | Çay, kahve, su, ayran… | 60 |
| 6.3 | Au café/restaurant | Commander, demander l'addition | 100 |
| 6.4 | J'aime / je n'aime pas | Exprimer ses goûts | 80 |
| 6.5 | Goûts et préférences | Seviyorum / sevmiyorum en contexte | 100 |

### Unit 7 — Acheter et comparer *(~2h)*
| # | Chapter | Objectif | XP |
|---|---------|----------|----|
| 7.1 | Les prix | Combien ça coûte ? Trop cher ! | 80 |
| 7.2 | Les vêtements | Vocabulaire shopping | 70 |
| 7.3 | Tailles et couleurs | Qualifier un achat | 60 |
| 7.4 | Au marché | Dialogue d'achat réaliste | 100 |
| 7.5 | Comparer | Plus grand, moins cher, le meilleur | 90 |

### Unit 8 — Se faire comprendre *(~1h30)*
| # | Chapter | Objectif | XP |
|---|---------|----------|----|
| 8.1 | Demander de répéter | Pardon ? Plus lentement ? | 60 |
| 8.2 | Demander de l'aide | J'ai besoin de… Pouvez-vous… | 80 |
| 8.3 | Je ne comprends pas | Expressions de clarification | 60 |
| 8.4 | Urgences légères | Médecin, pharmacie, police | 90 |

### Unit 9 — Ma routine et mes actions *(~2h)*
| # | Chapter | Objectif | XP |
|---|---------|----------|----|
| 9.1 | Ma journée type | Se lever, manger, travailler… | 90 |
| 9.2 | Verbes de mouvement | Aller, venir, partir, rentrer | 90 |
| 9.3 | Verbes du quotidien | Manger, dormir, lire, travailler | 80 |
| 9.4 | Dire ce qu'on fait | Présent progressif -iyor | 100 |
| 9.5 | Poser des questions | Qu'est-ce que tu fais ? Où vas-tu ? | 100 |

### Unit 10 — Verbes et premières conjugaisons *(~3h)*
| # | Chapter | Objectif | XP |
|---|---------|----------|----|
| 10.1 | Comprendre les infinitifs | Radical et terminaison -mak/-mek | 80 |
| 10.2 | Le présent progressif | -iyor + terminaisons personnelles | 120 |
| 10.3 | La négation au présent | -mıyor, -miyor, -muyor, -müyor | 100 |
| 10.4 | Poser une question | -mı/mi/mu/mü au présent | 100 |
| 10.5 | Les 20 verbes clés | Révision active des verbes prioritaires | 120 |

### Unit 11 — Passé et futur *(~3h)*
| # | Chapter | Objectif | XP |
|---|---------|----------|----|
| 11.1 | Le passé simple (-dı) | Formation et usage | 120 |
| 11.2 | Ce que j'ai fait | Raconter une journée passée | 120 |
| 11.3 | Le futur (-acak/-ecek) | Formation et usage | 120 |
| 11.4 | Ce que je vais faire | Parler de projets | 100 |
| 11.5 | Passé vs Futur | Exercices de transformation | 130 |
| 11.6 | Mini récit de voyage | Dialogue complet multitenps | 150 |

### Unit 12 — Consolidation et missions réelles *(~3h)*
| # | Chapter | Objectif | XP |
|---|---------|----------|----|
| 12.1 | Révision vocabulaire clé | Top 200 mots, flashcards actives | 100 |
| 12.2 | Révision verbes | 30 verbes, 3 temps | 120 |
| 12.3 | Mission : à l'hôtel | Dialogue complet A1 | 130 |
| 12.4 | Mission : dans l'avion | Dialogue complet A1 | 130 |
| 12.5 | Mission : visite d'Istanbul | Scénario multi-compétences | 150 |
| 12.6 | Test de niveau A1 | Quiz de validation globale | 200 |

---

## Logique pédagogique globale

```
Phase 1 (Units 1-3)  → Survie, reconnaissance, sons, chiffres
Phase 2 (Units 4-6)  → Famille, lieux, nourriture, goûts
Phase 3 (Units 7-9)  → Shopping, se débrouiller, routine, actions
Phase 4 (Units 10-12)→ Conjugaison complète, temps verbaux, missions
```

**Montée en complexité des phrases** :
`mot → expression → sujet+verbe → sujet+verbe+complément → mini-échange → dialogue`

---

## Système des verbes & conjugaison

### 40 verbes prioritaires (extrait)
| infinitif | radical | français | rang |
|-----------|---------|----------|------|
| olmak | ol- | être/devenir | 1 |
| yapmak | yap- | faire | 2 |
| gitmek | git- | aller | 3 |
| gelmek | gel- | venir | 4 |
| konuşmak | konuş- | parler | 5 |
| yemek | ye- | manger | 6 |
| içmek | iç- | boire | 7 |
| görmek | gör- | voir | 8 |
| istemek | iste- | vouloir | 9 |
| bilmek | bil- | savoir | 10 |
| ... | ... | ... | ... |

### Temps intégrés
| Temps | Suffixe | Exemple (gitmek) |
|-------|---------|-----------------|
| Présent prog. | -iyor | Gidiyorum |
| Passé | -dı/-di/-du/-dü | Gittim |
| Futur | -acak/-ecek | Gideceğim |
| Aoriste (V2) | -ır/-ir/-ur/-ür | Giderim |

### Progression verbale (8 niveaux)
1. Reconnaître l'infinitif
2. Associer verbe → sens français
3. Identifier le radical
4. Compléter une conjugaison (trou)
5. Transformer présent → passé
6. Transformer présent → futur
7. Utiliser le verbe dans une phrase
8. Multi-verbes dans un mini-dialogue

---

## Structure des données (JS)

### `units[]`
```js
{ unitId, unitTitle, unitDescription, levelRange, estimatedHours,
  chapterIds[], unlockCondition, iconEmoji, colorTheme, progress }
```

### `chapters[]`
```js
{ chapterId, unitId, chapterTitle, chapterGoal, vocabularyFocus[],
  grammarFocus, exerciseTypes[], miniMission, xpReward,
  estimatedMinutes, unlockLogic, status }
```

### `vocabulary[]`
```js
{ id, turkish, french, pronunciation, topic, level, difficulty,
  partOfSpeech, relatedVerbIds[], grammarTags[], distractors[],
  exampleSentence, imageHint, srs: { lastSeen, successRate,
  interval, nextReview, status } }
```

### `verbs[]`
```js
{ id, infinitive, stem, french, topicTags[], frequencyRank,
  difficulty, conjugationPresent:{}, conjugationPast:{},
  conjugationFuture:{}, examplePresent, examplePast, exampleFuture,
  negativeForms:{}, questionForms:{}, commonMistakes[],
  pronunciationHelp, masteryScore }
```

### `phrases[]`
```js
{ id, turkish, french, topic, level, relatedVerbIds[],
  grammarTags[], difficulty, distractors[], audioHint }
```

### `dialogues[]`
```js
{ id, title, scenario, turns:[{speaker, turkish, french}],
  targetVocabulary[], targetVerbs[], grammarFocus,
  estimatedMinutes, level }
```

### `userProgress{}`
```js
{ streak, totalXP, level, dailyXP, dailyGoal, currentUnit,
  currentChapter, lastSession, completedChapters[],
  masteredWords[], weakVerbs[], reviewQueue[],
  achievementIds[], heatmap:{} }
```

---

## Types d'exercices (20 types)

| # | Type | Description |
|---|------|-------------|
| 1 | QCM simple | 4 options, 1 bonne |
| 2 | QCM piégeux | Distracteurs très proches |
| 3 | Compléter la phrase | Champ ou choix dans une phrase |
| 4 | Remettre dans l'ordre | Mots à glisser/cliquer |
| 5 | Associer turc↔français | Matching pairs |
| 6 | Flashcard | Retourner pour voir |
| 7 | Choisir la traduction | Parmi 4 phrases |
| 8 | Bon verbe en contexte | Choisir parmi 3 verbes |
| 9 | Bonne conjugaison | Choisir la forme correcte |
| 10 | Corriger l'erreur | Phrase fausse à corriger |
| 11 | Transformer au passé | Phrase au présent → passé |
| 12 | Transformer au futur | Phrase au présent → futur |
| 13 | Dialogue à trous | Compléter les répliques manquantes |
| 14 | Dictée simulée | Entendre (TTS) et écrire/choisir |
| 15 | Révision express | 5 flashcards en 30 secondes |
| 16 | Défi de fin de chapitre | Mix des 5 derniers exercices |
| 17 | Défi quotidien | Format surprenant chaque jour |
| 18 | Mode survie voyage | Scénario d'urgence en 10 questions |
| 19 | Mode erreurs | Rejouer ses pires questions |
| 20 | Quiz Unit | Validation de l'unité complète |

---

## Fonctionnalités UX/UI clés

### Design System
- **Palette** : dark mode par défaut — fond `#0f0f14`, accent primaire `#E85D26` (orange turc), accent secondaire `#2D9CDB` (bleu ciel), success `#27AE60`
- **Typographie** : `Outfit` (Google Fonts) — chiffres et labels en `tabular-nums`
- **Tokens CSS** : `--color-*`, `--radius-*`, `--shadow-*`, `--spacing-*`
- **Animations** : confetti léger, shake sur erreur, pulse sur XP gain, progress ring SVG

### Dashboard
- Anneau de progression journalière (SVG animé)
- Streak en feu 🔥
- Leçon recommandée (card CTA)
- Mots à revoir aujourd'hui
- Encouragement personnalisé (heure-dépendant)

### Écran Units
- Cards verticales avec ring SVG de completion
- Chapters listés en accordéon (locked/unlocked/done)
- Badge de statut visuel : 🔒 verrouillé, ▶ en cours, ✓ terminé, ⭐ maîtrisé

### Leçon interactive
- Barre de progression haut d'écran (steps)
- Feedback immédiat coloré (vert/rouge)
- Explication brève en français sur chaque erreur
- Bouton TTS (Web Speech API) sur chaque phrase turque
- Animation de validation fin de session

### Module Verbes
- Tableau de conjugaison visuel (radical coloré, suffixe temps, terminaison)
- Filtres : par temps, par niveau, par thème
- Mini-drill rapide : 5 conjugaisons en 60 secondes
- Indicateur masteryScore par verbe

### Révision SRS
- File SRS quotidienne intelligente (max 20 items)
- Bouton "facile / difficile / oublié"
- Recalcul automatique de l'intervalle
- Affichage "prochain rappel dans X jours"

### Gamification
- XP animé (+25 XP flottant sur bonne réponse)
- Niveaux : Débutant → Voyageur → Explorateur → Aventurier → A1 Validé
- 15 badges thématiques (premier mot, 7 jours de streak, 100 mots maîtrisés…)
- Résumé de session : mots appris, XP gagné, précision, prochain objectif

---

## Plan d'exécution technique

> [!IMPORTANT]
> L'application sera entièrement contenue dans le dossier `c:\Users\aniss\Desktop\dili\`

### Phases de développement

```
Partie 1 : Foundation
  → index.html (SPA shell)
  → css/main.css (design system complet)
  → css/components.css
  → css/animations.css
  → js/app.js (router)
  → js/state.js (state + localStorage)

Partie 2 : Données
  → js/data/units.js (12 units, 50+ chapters)
  → js/data/vocabulary.js (300+ mots)
  → js/data/verbs.js (40 verbes complets)
  → js/data/phrases.js (150+ phrases)
  → js/data/dialogues.js (10+ dialogues)
  → js/data/grammar.js + achievements.js

Partie 3 : Engine
  → js/engine/srs.js
  → js/engine/exercises.js
  → js/engine/gamification.js

Partie 4 : Vues
  → dashboard, units, lesson, verbs, vocabulary,
    phrases, dialogues, review, daily, stats, settings
```

---

## Open Questions

> [!IMPORTANT]
> **Découpage des fichiers** : Je prévois de tout générer en fichiers séparés liés par `<script src="...">` dans index.html. Préfères-tu un seul gros fichier ou bien la structure modulaire décrite ?

> [!IMPORTANT]
> **Langue de l'interface** : Interface entièrement en **français** avec les termes turcs dans le contenu. Confirmer ?

> [!NOTE]
> **Taille réelle du contenu V1** : Vu la contrainte "static + vanilla JS", je vise 300 mots, 40 verbes, 100 phrases, 10 dialogues pour la V1. C'est déjà très riche et fonctionnel. OK ?

> [!NOTE]
> **Audio TTS** : J'utilise la Web Speech API (navigateur), avec voix `tr-TR` si disponible — ça fonctionne sur Chrome/Edge. Pas d'audio pré-enregistré.

---

## V2 — Améliorations prioritaires

1. 📱 PWA (manifest + service worker) pour usage hors-ligne
2. 🎙️ Reconnaissance vocale (répéter une phrase)
3. 📊 Heatmap calendrier (style GitHub) de l'activité
4. 🔄 Export/import de progression (JSON)
5. 🌙 Aoriste (-ır/-ir) et conditionnel (-sa/-se)
6. 🎯 Mode voyage : 10 situations d'urgence gamifiées
7. 📖 Grammaire complète : suffixes de cas, locatif, accusatif
8. 🤝 Partage de streak sur réseaux sociaux
9. 🗂️ Contenu étendu : 1000 mots, 80 verbes, 30 dialogues
10. 🧠 Algorithme SRS plus fin (SM-2 complet)
