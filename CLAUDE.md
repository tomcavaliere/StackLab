# StackLab

App web perso pour comprendre le rôle de chaque techno dans une stack et s'entraîner à composer une stack pour un besoin donné. Un seul utilisateur, usage local (`npm run dev`), pas de déploiement. Optimiser pour la vitesse d'itération, pas pour la finition.

Hors périmètre, à ne pas ajouter : auth, CMS, i18n, dark mode, éditeur in-app, SEO, analytics, onboarding, audit d'accessibilité, responsive mobile (desktop seulement).

## Environnement : tout dans `.venv`

Rien n'est installé au niveau système. `.venv` est un venv Python dans lequel `nodeenv` a installé Node 24 LTS et npm ; la CLI `sqlite3.exe` y est copiée. Les paquets npm sont dans `node_modules`, comme d'habitude.

- **Terminal VS Code** : `.vscode/settings.json` met `.venv\Scripts` en tête du PATH, rien à activer.
- **Autre terminal** : `.venv\Scripts\activate.bat` (cmd) ou `.venv\Scripts\Activate.ps1` (PowerShell).
- **Agent (shell non interactif)** : préfixer chaque commande. En PowerShell : `$env:PATH = "$PWD\.venv\Scripts;$env:PATH"`. En bash : `export PATH="$PWD/.venv/Scripts:$PATH"`.

Recréer l'environnement depuis zéro (PowerShell, à la racine) :

```powershell
python -m venv .venv
.venv\Scripts\python -m pip install nodeenv==1.11.0
$env:VIRTUAL_ENV = "$PWD\.venv"; .venv\Scripts\nodeenv -p --node=24.21.0
# CLI sqlite3 : télécharger sqlite-tools-win-x64-*.zip sur https://www.sqlite.org/download.html, copier sqlite3.exe dans .venv\Scripts
$env:PATH = "$PWD\.venv\Scripts;$env:PATH"; npm ci
```

**better-sqlite3** : son script d'installation est refusé (`allowScripts` dans `package.json`). C'est voulu : le paquet inclut un binaire précompilé `win32-x64`. Ne pas approuver ce script, sinon npm lance une compilation node-gyp qui exige Visual Studio Build Tools.

## Commandes

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur local sur http://localhost:4321 |
| `npm run build` | Vérifie les sections des fiches (`scripts/check-sections.mjs`), puis `astro build` (valide tout le contenu) |
| `npm test` | Tests Vitest (scoring, récompenses) |
| `sqlite3 data/stacklab.db` | Interroger la progression |

## Architecture

```
src/
  content.config.ts      schémas Zod des 4 collections + ref() (références vérifiées)
  content/
    techs/<id>.md        fiches technos
    scenarios/<id>.md    scénarios du jeu
    companies/<id>.md    stacks d'entreprises
    quiz/<id>.md         thèmes du quiz (questions à 2 technos)
  lib/
    taxonomy.ts          vocabulaires contrôlés (kinds, couches, verdicts…) : slug -> libellé
    db.ts, schema.sql    SQLite : ouverture paresseuse, schéma (IF NOT EXISTS) appliqué à chaque ouverture
    scoring.ts (+ .test) score d'une partie, fonction pure
    rewards.ts (+ .test) XP, niveaux, série, maîtrise, choix des questions, badges : fonctions pures
    progress.ts          historique lu en base -> computeProgress, persistance des badges débloqués
    sources.ts           isOld() : source de plus de 3 ans
  components/game/
    Game.tsx             îlot du jeu : pioche, plateau React Flow, résultats, lecture des animations
    flows.ts             étapes des animations (requête utilisateur, flux de données), fonction pure
  components/quiz/
    Quiz.tsx             îlot du quiz : session de 10 questions, clavier, feedback, bilan (XP, niveau, badges)
  pages/
    fiches/              liste filtrable + page fiche (enregistre une vue)
    jouer/               liste des scénarios + page de partie (îlot Game, debrief)
    entreprises/         liste + page entreprise (sources, ⚠ > 3 ans)
    quiz/                liste des thèmes (barres de maîtrise) + page de session (îlot Quiz)
    progression.astro    niveau, série, badges, maîtrise, confusions, activité (rendue à la demande)
    api/views.ts         POST { techId } : enregistre une vue · GET : vues par fiche
    api/attempts.ts      POST { scenarioId, score, cards: [{ techId, layer, verdict }] } : enregistre une partie · GET : meilleur score par scénario
    api/quiz.ts          POST { themeId, answers: [{ questionId, chosenTech, correctTech }] } : enregistre une session · GET ?theme= : stats par question
    api/progress.ts      GET : XP, niveau, série, maîtrise par thème, badges, confusions
  layouts/Base.astro
scripts/check-sections.mjs   sections imposées du corps des fiches (Zod ne voit que le frontmatter)
data/stacklab.db             base locale, ignorée par git
```

- **Le contenu est de la donnée** : un fichier Markdown + frontmatter par entité, validé au build. Ajouter une techno, c'est ajouter un fichier, sans toucher au code.
- **SQLite ne stocke que la progression** (`attempts`, `attempt_cards`, `tech_views`, `quiz_sessions`, `quiz_answers`, `badges`), jamais de contenu. Les ids de tech, de scénario, de thème et de question y sont des ids de contenu, sans clé étrangère possible.
- **Pages prérendues** ; seuls les endpoints `src/pages/api/*` et `/progression` (`export const prerender = false`) tournent côté serveur (adapter `@astrojs/node`). Ailleurs, la progression s'affiche par `fetch('/api/progress')` (widget de la nav, barres de maîtrise).
- **Scoring** (phase 2) : fonction pure dans `src/lib/scoring.ts`, indépendante de l'UI, testée avec Vitest. Calculée côté client, le résultat est envoyé tel quel à `/api/attempts`.
- **Récompenses** (phase 6) : fonctions pures dans `src/lib/rewards.ts`, testées avec Vitest, partagées par le serveur et l'îlot Quiz. Tout est recalculé depuis l'historique brut ; seuls les badges débloqués sont stockés (avec leur date, sans régression possible).
- **Jeu** (phase 3) : îlot React, diagramme et animation avec React Flow (`@xyflow/react`), drag HTML5 natif depuis la pioche. dnd-kit seulement si React Flow ne suffit pas.

## Conventions

- **id = nom du fichier**, en kebab-case ASCII minuscule (`aws-s3.md` → `aws-s3`). Astro dérive l'id du nom : une majuscule ou un espace casse les références.
- **Références entre entrées : toujours `ref('techs')` / `ref('scenarios')`** de `content.config.ts`. Le `reference()` d'Astro 7 seul ne vérifie pas que l'id existe.
- **Zod** : `import { z } from 'astro/zod'` (Zod 4). L'import depuis `astro:content` est déprécié.
- **Vocabulaires** (kind, couches, type de scénario, verdict, type de source, confiance) : slugs ASCII dans les fichiers, libellés dans `taxonomy.ts`. En ajouter un modifie le code, c'est assumé.
- **Tags** libres, en kebab-case ASCII. Réutiliser les tags existants avant d'en créer (`grep -h "^tags:" src/content/techs/*.md`).
- **Exactitude** : aucun chiffre de performance inventé. En cas d'incertitude, l'écrire explicitement dans la fiche.
- **SQLite** : pas d'outil de migration. `schema.sql` (`CREATE TABLE IF NOT EXISTS`) est appliqué à chaque ouverture : **ajouter une table** est automatique et garde l'historique ; **modifier une table existante** impose de supprimer `data/stacklab.db` (recréée au premier appel d'API, progression perdue).
- **Code** : le minimum qui fait le travail, pas d'abstraction anticipée. Les messages d'erreur peuvent être orientés développeur.
- **Git** : un commit par phase validée.

## Procédure : ajouter une fiche techno

1. Créer `src/content/techs/<id>.md`, en partant de `postgresql.md` (techno) ou de `sql.md` (langage).
2. Remplir le frontmatter :

   | Champ | Contenu |
   |---|---|
   | `name` | nom affiché |
   | `kind` | `langage` `framework` `base-de-donnees` `cache-queue` `moteur-traitement` `orchestrateur` `plateforme` `service-cloud` `outil-infra` `concept` |
   | `layers` | couches où la carte peut se poser : `frontend` `mobile` `backend-api` `auth` `base-operationnelle` `cache-messaging` `stockage-analytique` `traitement-data` `orchestration` `ml` `conteneurs-infra` `cloud` `ci-cd` `observabilite`. **`[]` pour un langage ou un concept** (REST, GraphQL…) : ce n'est pas une carte du jeu. |
   | `languages` | ids des fiches langage dans lesquels *on écrit* avec cette techno (pas son langage d'implémentation). Optionnel. |
   | `tags` | libres, optionnel |
   | `difficulty` | `1` prise en main rapide · `2` demande de la pratique · `3` expertise ou exploitation lourde |
   | `summary` | une phrase (= « En une phrase ») ; affichée sur les cartes, les listes et l'animation |
   | `alternatives` | `- { tech: <id>, note: "quand choisir l'autre" }`. Optionnel. Affichées dans les deux sens : déclarer A→B suffit. |
   | `integratesWith` | même format, pour les technos compatibles. Optionnel. |

3. Écrire le corps avec exactement ces 4 titres `##` : `Problème résolu`, `Quand l'utiliser`, `Quand l'éviter`, `Pour aller plus loin`. Les sections « Alternatives » et « S'intègre avec » sont générées depuis le frontmatter.
4. **Si `layers` n'est pas vide**, ajouter un verdict pour la fiche dans chaque scénario dont les couches requises ou optionnelles croisent les siennes. Sans verdict, la carte sort « non évaluée » (grise, hors score) dans ce scénario.
5. `npm run build` doit passer. Une référence vers une fiche qui n'existe pas encore fait échouer le build : créer d'abord la fiche cible, ou retirer le lien en attendant. (Le serveur de dev rejette aussi une fiche dont la cible n'existe pas encore, et ne la revalide pas quand la cible apparaît : la réenregistrer.)

La fiche apparaît alors dans la liste des fiches et, si `layers` n'est pas vide, dans la pioche du jeu.

## Procédure : ajouter un scénario

1. Créer `src/content/scenarios/<id>.md`.
2. Frontmatter :
   - `title`, `type` (`mvp` `saas` `api` `app-web` `app-mobile` `logiciel` `plateforme-data` `ml`) ;
   - `brief` : bloc `|` rédigé comme par un client non technique, sans nommer de techno ;
   - `constraints` : `{ team, budget, volume, latency, timeToMarket }`, en texte libre (affichage seulement) ;
   - `requiredLayers` (au moins une) et `optionalLayers` ;
   - `verdicts` : par couche, `- { tech: <id>, verdict: ideal|acceptable|surdimensionne|inadapte, why: "une phrase" }` ;
   - `antiPatterns` : `- { techs: [<id>, <id>, …], penalty: <entier>, why: "…" }`. Il se déclenche si toutes ses techs sont présentes, toutes couches confondues ;
   - `referenceStack` : une stack valide parmi d'autres, par couche (`{ backend-api: [django], … }`).
3. Corps Markdown = le raisonnement du debrief.
4. Le surdimensionnement s'exprime par des verdicts écrits (ex. Spark `surdimensionne` pour quelques milliers de lignes), pas par un calcul sur les contraintes.
5. `npm run build` : le build vérifie que les couches requises figurent dans `referenceStack` et que chaque tech y a un verdict `ideal` ou `acceptable` dans sa couche.

### Règles de scoring (phase 2, `src/lib/scoring.ts`)

Verdict d'une carte posée, dans l'ordre :
1. un verdict est écrit pour cette tech dans cette couche → on l'applique ;
2. la couche n'est pas dans les `layers` de la tech → `inadapte` ;
3. la couche n'est ni requise ni optionnelle pour le scénario → `surdimensionne` ;
4. sinon → `non-evalue` (gris, hors score : il manque un verdict dans le scénario).

Score : idéal 3, acceptable 2, surdimensionné 1, inadapté 0 points. Base = 100 × points / (3 × nombre de cartes évaluées). Puis −20 par couche requise vide, −`penalty` par anti-pattern déclenché. Le score est borné à [0, 100]. Plusieurs réponses valides sont possibles : jamais de comparaison à une réponse unique.

## Procédure : ajouter un thème ou des questions de quiz

1. Thème : créer `src/content/quiz/<id>.md` (frontmatter seul) avec `title`, `description` et au moins 5 `questions`. Questions : les ajouter à la liste du thème.
2. Chaque question :
   ```yaml
   - id: sessions-qui-expirent   # kebab-case, unique dans le thème
     prompt: "Stocker des sessions utilisateur qui expirent toutes seules"   # un besoin court, sans nommer la réponse
     answer: redis               # id de fiche : la bonne réponse
     decoy: postgresql           # id de fiche : un leurre plausible, différent de answer
     why: "…"                    # 1 à 2 phrases appuyées sur les fiches : pourquoi l'une et pas l'autre
   ```
3. **Ne jamais renommer ni réutiliser un `id` de question** : il identifie l'historique en base (maîtrise, questions ratées). Pour changer le sens d'une question, en créer une nouvelle.
4. Viser au moins une dizaine de questions par thème : une session en pose 10.
5. `npm run build` : il échoue si une tech n'existe pas, si un id est en double ou si `decoy` = `answer`.

### Règles de récompense (phase 6, `src/lib/rewards.ts`)

- **XP du quiz** : 10 par bonne réponse + 2 × (combo − 1), bonus plafonné à +10 (combo = bonnes réponses consécutives dans la session). Session sans faute d'au moins 5 questions : +30.
- **XP des scénarios** : somme du **meilleur** score de chaque scénario (rejouer sans battre son record ne rapporte rien).
- **XP des fiches** : 5 par fiche distincte consultée.
- **Niveaux** : Stagiaire 0 · Junior 150 · Confirmé 400 · Senior 800 · Lead 1500 · Staff 2500 · Principal 4000 · Architecte 6000.
- **Série** : jours locaux consécutifs avec au moins une session de quiz ou une partie de scénario ; elle reste en vie si l'on a joué la veille.
- **Maîtrise** : une question est maîtrisée après 2 bonnes réponses d'affilée (avec 2 choix, une seule peut être un coup de chance) ; une erreur remet le compteur à 0.
- **Choix des questions** : ratées, puis jamais vues, puis en cours, puis maîtrisées (la plus anciennement vue d'abord dans chaque groupe), 10 au maximum, puis mélangées.
- **Badges** : liste `BADGES`, chacun avec un prédicat sur des statistiques. Un badge atteint est enregistré dans `badges` avec sa date et ne se reperd plus.

## Procédure : ajouter ou mettre à jour une stack d'entreprise (workflow de recherche)

À suivre quand l'utilisateur demande « ajoute / mets à jour la stack de X ».

1. **Chercher sur le web**, dans cet ordre de priorité : blog engineering de l'entreprise, talks et conférences, documentation officielle, puis offres d'emploi récentes.
2. **Une source par techno**, avec sa date et son type (`blog-engineering` `talk` `offre-emploi` `doc-officielle` `autre`). Niveau de confiance :
   - `confirme` : uniquement si l'entreprise le dit elle-même (son blog, son talk, sa doc) ;
   - `probable` : l'entreprise le laisse entendre sans le dire clairement, ou une source tierce sérieuse l'affirme ;
   - `indice` : signal indirect. **Une offre d'emploi seule = `indice`**, et le schéma refuse toute autre valeur dans ce cas.
   - Source non datée (page de doc) : mettre la date de consultation et `note: "page non datée, date de consultation"`.
3. **Signaler explicitement les sources de plus de 3 ans.** La page les signale aussi visuellement.
4. **Ne rien inventer pour combler une couche** : une couche sans source n'apparaît pas dans le fichier.
5. **Présenter un résumé à l'utilisateur avant d'écrire le fichier** : tableau couche | techno | confiance | type | date | source, avec ⚠ sur les sources de plus de 3 ans. Lister à part les technos trouvées qui **n'ont pas de fiche** : l'utilisateur choisit entre créer la fiche ou omettre la techno.
6. Après validation, écrire `src/content/companies/<id>.md` :
   - frontmatter : `company`, `product`, `need`, `lastResearched` (date du jour), `scenario` (id du scénario du mode devine) et `stack`. Chaque entrée de `stack` : `{ tech, source, sourceTitle, sourceDate, sourceType, confidence, note? }` ;
   - corps : le rationale, c'est-à-dire pourquoi ces choix, d'après les sources.
7. **Mode « devine la stack »** : écrire un scénario normal (procédure ci-dessus) dont le brief reprend le besoin de l'entreprise sans nommer ses technos, et le lier par `scenario`. Le debrief montre la vraie stack et ses sources.
8. `npm run build`.

## Critères de succès (à rejouer à chaque phase)

1. **Contenu invalide → build en échec** avec chemin + champ. Ajouter une fiche cassée (enum invalide, id inexistant, section manquante), lancer `npm run build`, constater l'échec, retirer la fiche.
2. **Nouvelle techno = 1 fichier** : suivre la procédure ci-dessus à la lettre ; la fiche apparaît dans la liste et dans la pioche sans toucher au code.
3. **Tests du scoring** (`npm test`) : idéale > acceptable > surdimensionnée ; couche requise manquante pénalisée ; anti-pattern détecté.
4. **Les 3 scénarios sont jouables** de bout en bout, animation comprise.
5. **Page entreprise** : source, date et confiance de chaque techno ; sources de plus de 3 ans signalées visuellement.
6. **Partie enregistrée** :
   ```
   sqlite3 -header -column data/stacklab.db "SELECT a.id, a.scenario_id, a.played_at, a.score, c.tech_id, c.layer, c.verdict FROM attempts a JOIN attempt_cards c ON c.attempt_id = a.id ORDER BY a.id DESC;"
   ```
7. **Session de quiz enregistrée**, avec XP et badges à jour sur `/progression` :
   ```
   sqlite3 -header -column data/stacklab.db "SELECT s.id, s.theme_id, s.played_at, a.position, a.question_id, a.chosen_tech, a.correct_tech FROM quiz_sessions s JOIN quiz_answers a ON a.session_id = s.id ORDER BY s.id DESC, a.position;"
   sqlite3 -header -column data/stacklab.db "SELECT * FROM badges;"
   ```

## Avancement

- [x] Phase 0 : socle (environnement, schémas, garde-fous du build, SQLite, endpoints, CLAUDE.md), 3 fiches d'échantillon (sql, postgresql, mongodb)
- [x] Phase 1 : module Fiches (liste filtrable, page fiche, liens, vues) + fiches de la tranche verticale
- [x] Phase 2 : scoring + tests + 3 scénarios (MVP SaaS web, API à fort trafic, plateforme data analytique)
- [x] Phase 3 : jeu jouable (pioche, diagramme en couches, drag & drop, feedback, enregistrement)
- [x] Phase 4 : animation des flux (requête utilisateur, flux de données)
- [x] Phase 5 : stacks d'entreprises (Airbnb, Instagram) + mode devine
- [x] Phase 6 : quiz par thème (4 thèmes, 49 questions) + système de récompense (XP, niveaux, série, maîtrise, badges, page Progression)
- [x] Phase 7 : contenu enrichi : 20 fiches (dont 5 langages et 4 concepts d'API), 3 thèmes de quiz (Frameworks web & mobile, Langages, API & communication), 111 questions au total, verdicts des nouvelles cartes dans les 5 scénarios
