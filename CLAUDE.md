# StackLab

App web perso pour comprendre le rôle de chaque techno dans une stack et s'entraîner à composer une stack pour un besoin donné. Un seul utilisateur. Déployée sur Vercel (accès depuis le téléphone), progression dans Turso, partagée entre le téléphone et l'ordi ; `npm run dev` en local. Optimiser pour la vitesse d'itération, pas pour la finition.

Hors périmètre, à ne pas ajouter : comptes utilisateurs (un seul mot de passe suffit), CMS, i18n, dark mode, éditeur in-app, SEO, analytics, onboarding, audit d'accessibilité.

## Environnement : tout dans `.venv`

Le projet tourne sous Windows et sous macOS. Rien n'est installé au niveau système. `.venv` est un venv Python dans lequel `nodeenv` a installé Node 24 LTS et npm. Les exécutables sont dans `.venv\Scripts` sous Windows (la CLI `sqlite3.exe` y est copiée) et dans `.venv/bin` sous macOS (`sqlite3` est fourni par le système). Les paquets npm sont dans `node_modules`, comme d'habitude.

- **Terminal VS Code** : `.vscode/settings.json` met le dossier du venv en tête du PATH, sous Windows comme sous macOS, rien à activer.
- **Autre terminal** : Windows : `.venv\Scripts\activate.bat` (cmd) ou `.venv\Scripts\Activate.ps1` (PowerShell). macOS : `source .venv/bin/activate`.
- **Agent (shell non interactif)** : préfixer chaque commande. En PowerShell : `$env:PATH = "$PWD\.venv\Scripts;$env:PATH"`. En bash ou zsh, sur les deux systèmes : `export PATH="$PWD/.venv/Scripts:$PWD/.venv/bin:$PATH"`.

Recréer l'environnement depuis zéro, à la racine. Windows (PowerShell) :

```powershell
python -m venv .venv
.venv\Scripts\python -m pip install nodeenv==1.11.0
$env:VIRTUAL_ENV = "$PWD\.venv"; .venv\Scripts\nodeenv -p --node=24.21.0
# CLI sqlite3 : télécharger sqlite-tools-win-x64-*.zip sur https://www.sqlite.org/download.html, copier sqlite3.exe dans .venv\Scripts
$env:PATH = "$PWD\.venv\Scripts;$env:PATH"; npm ci
```

macOS (zsh) :

```bash
python3 -m venv .venv
.venv/bin/python -m pip install nodeenv==1.11.0
VIRTUAL_ENV="$PWD/.venv" .venv/bin/nodeenv -p --node=24.21.0
export PATH="$PWD/.venv/bin:$PATH"; npm ci
```

**Script d'installation refusé** (`allowScripts` dans `package.json`) : `fsevents` (watcher de fichiers de Vite, macOS seulement). C'est voulu : le paquet inclut son binaire précompilé. Ne pas l'approuver, sinon npm lance une compilation node-gyp qui exige les Xcode Command Line Tools. (`@libsql/client` n'a pas de script : son binaire natif vient d'un paquet optionnel par plateforme.)

**Variables d'environnement** (`.env.example` → `.env`, ignoré par git ; déclarées dans `astro.config.mjs`, `astro:env`) : `TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN` (sans URL : fichier local `data/stacklab.db`) et `STACKLAB_PASSWORD` (vide : pas de mot de passe). Avec les valeurs Turso dans `.env`, `npm run dev` lit et écrit la même progression que l'app déployée.

## Déploiement

- **Vercel** (adapter `@astrojs/vercel`), relié au dépôt GitHub : chaque `git push` sur `main` redéploie. Les 3 variables sont dans les réglages du projet Vercel (Settings → Environment Variables). Région des fonctions : `vercel.json` (`dub1`, Dublin), la même que la base Turso (`aws-eu-west-1`).
- **Turso** : SQLite hébergé (client `@libsql/client`), base `stacklab`. Le schéma s'applique tout seul au premier appel, comme en local.
- **Mot de passe** : `src/middleware.ts`, Basic Auth sur toutes les requêtes (le nom d'utilisateur est ignoré). Le navigateur le demande une fois puis le mémorise.

## Commandes

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur local sur http://localhost:4321 |
| `npm run build` | Vérifie les sections des fiches et les quiz de techno (`scripts/check-content.mjs`), puis `astro build` (valide tout le contenu) |
| `npm test` | Tests Vitest (scoring, récompenses, parcours, révisions) |
| `npm run check:exercises [ids]` | Exécute la solution de chaque exercice de l'atelier (SQL, Python, JavaScript, TypeScript) et la compare à `expected` |
| `sqlite3 data/stacklab.db` | Interroger la progression locale (sans `.env` Turso) |
| `turso db shell stacklab` | Interroger la progression en ligne (CLI Turso, ou l'éditeur SQL du dashboard turso.tech) |

## Architecture

```
src/
  content.config.ts      schémas Zod des 8 collections + ref() (références vérifiées)
  content/
    techs/<id>.md        fiches technos
    scenarios/<id>.md    scénarios du jeu
    companies/<id>.md    stacks d'entreprises
    roles/<id>.md        métiers (data engineer, frontend…) : leur pile par étape, avec le rôle de chaque techno
    quiz/<id>.md         thèmes du quiz (questions à 2 technos)
    tech-quiz/<id>.md    quiz d'une techno (QCM en texte), id = id de sa fiche
    parcours/parcours.md les parcours (tronc commun, métiers, compétences) : chacun ses prérequis et ses unités, chaque unité avec ses leçons (fiches), ses thèmes, ses scénarios
    exercises/<id>.md    exercices de code d'une fiche langage (atelier), id = id de sa fiche
  lib/
    taxonomy.ts          vocabulaires contrôlés (kinds, couches, verdicts…) : slug -> libellé
    db.ts, schema.sql    client libSQL (Turso, ou fichier local) : ouverture paresseuse, schéma (IF NOT EXISTS) appliqué à chaque ouverture
    scoring.ts (+ .test) score d'une partie, fonction pure
    rewards.ts (+ .test) XP, niveaux, série, maîtrise, choix des questions, badges : fonctions pures
    path.ts (+ .test)    parcours : parcours ouverts, statut de chaque étape (faite, en cours, verrouillée), prochaine étape du parcours suivi, fonction pure
    review.ts (+ .test)  révisions espacées : état de chaque question rejoué depuis l'historique, session du jour, fonctions pures
    progress.ts          historique lu en base -> computeProgress, parcours (loadParcours, parcours suivi) et révisions (loadLearning), persistance des badges débloqués
    sources.ts           isOld() : source de plus de 3 ans
  components/game/
    Game.tsx             îlot du jeu : pioche (tiroir en bas sur téléphone), plateau React Flow à la largeur de l'écran, résultats, lecture des animations
    flows.ts             étapes des animations (requête utilisateur, flux de données), fonction pure
  components/roles/
    Roles.tsx            îlot de la page « Par métier » : bulles, pile d'un métier, comparaison de deux métiers (diagramme de Venn)
  components/quiz/
    Quiz.tsx             îlot du quiz, pour les thèmes (2 technos), les technos (QCM), les révisions (quiz mélangés) et le renforcement : session de 10 questions, clavier, feedback, bilan qui enchaîne sur l'étape suivante
  components/atelier/
    Atelier.tsx          îlot de l'atelier d'une fiche langage (ordi seulement) : éditeur, exécution, comparaison à la sortie attendue ; sinon copie vers le playground
    runner.worker.ts     worker qui exécute le code (sql.js, Pyodide depuis le CDN, sucrase) ; arrêté et recréé après 10 s
    run.ts               exécution par langage, partagée avec scripts/check-exercises.mjs
  pages/
    index.astro          accueil : révisions du jour, prochaine étape du parcours suivi, cartes des parcours (tronc, métiers par famille, compétences)
    parcours/[id].astro  un parcours : unités et étapes, bouton « Suivre ce parcours »
    revisions.astro      session de révision du jour (îlot Quiz en mode révision)
    renforcement.astro   les questions jamais vues des étapes validées, quiz par quiz (liens vers les pages de quiz en `?renforcement`)
    verrou.astro         page d'une étape verrouillée (les pages de quiz, scénario, entreprise y redirigent)
    fiches/              bibliothèque : un onglet par type (`?type=`), vue d'un tag (`?tag=`), `metiers` (bulles par métier), page fiche (enregistre une vue côté serveur, ouvre son quiz si le parcours y est, atelier « S'exercer » pour un langage)
    jouer/               liste des scénarios + page de partie (îlot Game, debrief)
    entreprises/         liste + page entreprise (sources, ⚠ > 3 ans)
    quiz/                liste des thèmes et des technos (barres de maîtrise) + page de session d'un thème (îlot Quiz ; `?renforcement` : les questions jamais vues)
    quiz/techno/[id]     page de session du quiz d'une techno (îlot Quiz)
    progression.astro    niveau, série, badges, maîtrise par thème et par techno, confusions, activité (rendue à la demande)
    api/views.ts         POST { techId } : enregistre une vue · GET : vues par fiche
    api/attempts.ts      POST { scenarioId, score, cards: [{ techId, layer, verdict }] } : enregistre une partie · GET : meilleur score par scénario
    api/quiz.ts          POST { sessions: [{ themeId, answers: [{ questionId, chosenTech, correctTech }] }] } : enregistre une ou plusieurs sessions (une révision = une par quiz) · GET ?theme= : stats par question
    api/progress.ts      GET : XP, niveau, série, maîtrise par thème et par techno, badges, confusions, révisions dues, prochaine étape
    api/parcours.ts      POST { id } : enregistre le parcours suivi (table settings)
  layouts/Base.astro
  middleware.ts          mot de passe (Basic Auth) devant toutes les requêtes, si STACKLAB_PASSWORD est défini
scripts/check-content.mjs    ce que Zod ne voit pas : sections imposées des fiches (2 de plus pour un langage), quiz de techno ou exercices sans fiche (erreur), fiche sans quiz (avertissement)
scripts/check-exercises.mjs  hors build : exécute les solutions des exercices (mêmes moteurs que l'atelier, Pyodide en paquet npm)
scripts/check-quality.mjs    hors build : cartes sans verdict par scénario (`verdicts`), bonne réponse trop souvent la plus longue (`lengths [ids]`)
.claude/skills/              nouvelle-fiche, quiz-techno, quiz-theme : procédures de rédaction pas à pas
data/stacklab.db             base locale (sans Turso), ignorée par git
```

- **Le contenu est de la donnée** : un fichier Markdown + frontmatter par entité, validé au build. Ajouter une techno, c'est ajouter un fichier, sans toucher au code.
- **SQLite ne stocke que la progression** (`attempts`, `attempt_cards`, `tech_views`, `quiz_sessions`, `quiz_answers`, `badges`, et `settings` pour le parcours suivi), jamais de contenu. Les ids de tech, de scénario, de thème et de question y sont des ids de contenu, sans clé étrangère possible. Une session du quiz d'une techno est une session de quiz comme une autre, avec `theme_id = 'tech:<id de la fiche>'` et le texte des options dans `chosen_tech` / `correct_tech`.
- **Parcours** (phases 12 et 14) : plusieurs chemins dans un seul fichier, `parcours.md` (un tronc commun, un parcours par métier, des modules de compétence) ; tout est recalculé depuis l'historique (`path.ts`), seul le parcours suivi est stocké (`settings`). Les fiches se lisent toutes ; les quiz, scénarios et entreprises sont verrouillés côté serveur tant qu'aucun parcours ouvert n'y est (redirection vers `/verrou`). La nav montre Parcours, Révisions, Renforcement, Fiches, Progression : `/quiz`, `/jouer`, `/entreprises` restent accessibles depuis le parcours.
- **Atelier** (phase 13) : sur les fiches langage, exercices de code facultatifs, hors parcours et sans enregistrement en base. SQL, Python, JavaScript et TypeScript s'exécutent dans le navigateur (WebAssembly, worker). Les 8 autres langages renvoient vers leur playground. L'îlot n'est chargé qu'à partir de 768 px (`client:media`), le téléphone affiche une simple mention.
- **Tout est rendu à la demande** (`output: 'server'`, adapter `@astrojs/vercel`) : sur Vercel, des pages prérendues seraient servies sans passer par le middleware, donc sans mot de passe. Les pages dynamiques lisent leur entrée avec `getEntry(collection, Astro.params.id)` (404 si absente), pas de `getStaticPaths`. Hors `/progression`, la progression s'affiche par `fetch('/api/progress')` (widget de la nav, barres de maîtrise).
- **Scoring** (phase 2) : fonction pure dans `src/lib/scoring.ts`, indépendante de l'UI, testée avec Vitest. Calculée côté client, le résultat est envoyé tel quel à `/api/attempts`.
- **Récompenses** (phase 6) : fonctions pures dans `src/lib/rewards.ts`, testées avec Vitest, partagées par le serveur et l'îlot Quiz. Tout est recalculé depuis l'historique brut ; seuls les badges débloqués sont stockés (avec leur date, sans régression possible).
- **Jeu** (phase 3) : îlot React, diagramme et animation avec React Flow (`@xyflow/react`), drag HTML5 natif depuis la pioche à la souris ; au toucher (et au clic), toucher une carte de la pioche puis une couche. dnd-kit seulement si React Flow ne suffit pas.
- **Téléphone et ordi** (phase 11) : un seul code, Tailwind mobile d'abord. Les classes sans préfixe visent le téléphone, `md:` (≥ 768 px) rétablit l'affichage ordi, qui ne doit pas changer. Grilles en `grid-cols-1 md:grid-cols-N`, tableaux larges dans un `overflow-x-auto`, lignes « titre + compteur » en `flex-wrap`. Sous 640 px de large, le plateau du jeu passe en compact (libellé au-dessus des cartes, moins de cartes par ligne). Vérifier à 390 px qu'aucune page ne défile horizontalement.

## Conventions

- **id = nom du fichier**, en kebab-case ASCII minuscule (`aws-s3.md` → `aws-s3`). Astro dérive l'id du nom : une majuscule ou un espace casse les références.
- **Références entre entrées : toujours `ref('techs')` / `ref('scenarios')`** de `content.config.ts`. Le `reference()` d'Astro 7 seul ne vérifie pas que l'id existe.
- **Zod** : `import { z } from 'astro/zod'` (Zod 4). L'import depuis `astro:content` est déprécié.
- **Vocabulaires** (kind, couches, type de scénario, verdict, type de source, confiance) : slugs ASCII dans les fichiers, libellés dans `taxonomy.ts`. En ajouter un modifie le code, c'est assumé.
- **Tags** libres, en kebab-case ASCII. Réutiliser les tags existants avant d'en créer (`grep -h "^tags:" src/content/techs/*.md`).
- **Exactitude** : aucun chiffre de performance inventé. En cas d'incertitude, l'écrire explicitement dans la fiche.
- **SQLite** : pas d'outil de migration. `schema.sql` (`CREATE TABLE IF NOT EXISTS`) est appliqué à chaque ouverture : **ajouter une table** est automatique et garde l'historique ; **modifier une table existante** impose de la supprimer (`DROP TABLE` dans `turso db shell stacklab`, ou supprimer `data/stacklab.db` en local) : recréée au premier appel d'API, historique de la table perdu. Les requêtes sont asynchrones (`await (await getDb()).execute({ sql, args })`) ; plusieurs écritures liées passent par `db.transaction('write')`.
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

3. Écrire le corps avec ces 4 titres `##` : `Problème résolu`, `Quand l'utiliser`, `Quand l'éviter`, `Pour aller plus loin`. Les sections « Alternatives » et « S'intègre avec » sont générées depuis le frontmatter. **Langage** : 2 titres de plus, entre « Quand l'éviter » et « Pour aller plus loin » :
   - `## Syntaxe`, en `###` avec un court bloc de code chacun : variables, conditions, boucles, collections, fonctions, particularités ;
   - `## Exemples concrets` : 2 ou 3 extraits réalistes.
   Ensuite, ses exercices (procédure ci-dessous).
4. **Si `layers` n'est pas vide**, ajouter un verdict pour la fiche dans chaque scénario dont les couches requises ou optionnelles croisent les siennes. Sans verdict, la carte sort « non évaluée » (grise, hors score) dans ce scénario.
5. Écrire son quiz : `src/content/tech-quiz/<id>.md` (procédure « quiz d'une techno » ci-dessous). Chaque réponse du quiz doit se trouver dans la fiche.
6. **La placer dans les parcours** : ajouter son id aux `lessons` d'une unité de `src/content/parcours/parcours.md`, au moins dans le module de compétence qui lui correspond, et dans les métiers où elle compte. Le build échoue si une fiche n'est dans aucun parcours, figure deux fois dans un parcours (ou dans un parcours et ceux qu'il requiert) ou n'a pas de quiz.
7. `npm run build` doit passer. Une référence vers une fiche qui n'existe pas encore fait échouer le build : créer d'abord la fiche cible, ou retirer le lien en attendant. (Le serveur de dev rejette aussi une fiche dont la cible n'existe pas encore, et ne la revalide pas quand la cible apparaît : la réenregistrer.)

La fiche apparaît alors dans son onglet de la bibliothèque, comme leçon du parcours, et, si `layers` n'est pas vide, dans la pioche du jeu.

## Procédure : ajouter ou modifier un métier

1. Créer `src/content/roles/<id>.md` (frontmatter seul), en partant de `data-engineer.md`. Champs : `name`, `family` (`dev` `data` `ia` `infra`, vocabulaire `ROLE_FAMILIES`), `summary`, `mission`, `stack`.
2. `stack` = les étapes du travail du métier, dans l'ordre : `{ step, intro, techs: [{ tech, why, essential? }] }`. `intro` explique ce qu'on cherche à faire à l'étape ; `why` dit à quoi la techno sert **pour ce métier** (la même techno a un `why` différent d'un métier à l'autre, c'est ce que la comparaison montre) ; `essential: true` = à apprendre en premier.
3. Une techno ne figure qu'une fois par métier. Ne lister que des fiches existantes (`ref('techs')`). Une nouvelle fiche n'apparaît dans aucun métier tant qu'on ne l'y ajoute pas.
4. `npm run build`. La page `/fiches/metiers?m=<id>,<id>` ouvre la page avec 1 ou 2 métiers sélectionnés.

## Procédure : ajouter un parcours métier

1. Le métier existe dans `src/content/roles/<id>.md` (procédure ci-dessus).
2. Dans `parcours.md`, ajouter une entrée `kind: metier`, `role: <id>`, `requires: [tronc-commun]`, avec ses unités : en général une par `step` du métier, dans l'ordre. Leçons : les technos `essential: true` du métier qui ne sont pas dans le tronc commun, plus quelques technos proches ; le reste du catalogue est dans les modules de compétence. Une techno du tronc ne se répète pas.
3. Thèmes et scénarios : seulement ceux dont toutes les technos citées sont vues avant, dans le parcours ou le tronc.
4. `npm run build`. Le parcours apparaît sur l'accueil dans la famille du métier, et la page « Par métier » y renvoie.

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
5. **Le placer dans un parcours** : l'ajouter aux `scenarios` de l'unité après laquelle toutes ses couches requises ont été vues (`parcours.md`), dans un module de compétence ou un métier.
6. `npm run build` : le build vérifie que les couches requises figurent dans `referenceStack` et que chaque tech y a un verdict `ideal` ou `acceptable` dans sa couche.

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
5. Nouveau thème : l'ajouter aux `themes` d'une unité de `parcours.md`, celle où toutes les technos qu'il cite ont été vues (dans l'unité, avant elle dans le parcours, ou dans les parcours requis).
6. `npm run build` : il échoue si une tech n'existe pas, si un id est en double, si `decoy` = `answer`, si un thème n'est dans aucun parcours ou cite une techno pas encore vue.

## Procédure : écrire ou compléter le quiz d'une techno

Le quiz d'une techno porte sur la techno elle-même (rôle, mécanismes, quand l'utiliser ou l'éviter), pas sur le choix entre deux technos : c'est le rôle des thèmes. **Il ne pose que ce que la fiche documente** : la leçon du parcours, c'est lire la fiche puis passer le quiz. Une question sur une commande ou une syntaxe absente de la fiche oblige d'abord à compléter la fiche.

1. Créer `src/content/tech-quiz/<id>.md`, où `<id>` est l'id de la fiche (frontmatter seul, une clé `questions`, au moins 5 ; les quiz actuels en ont 30, une session en pose 10, les autres arrivent par les révisions).
2. Chaque question :
   ```yaml
   - id: classement              # kebab-case, unique dans le fichier ; pas un mot réservé YAML (null, true, yes, on…)
     prompt: "Quelle structure Redis utiliser pour un classement de joueurs ?"   # se comprend seul : les questions sont mélangées
     answer: "Un ensemble trié (sorted set)"
     decoys:                     # 1 à 3 leurres, faux mais plausibles, tous différents de answer
       - "Une liste"
       - "Un hash"
     why: "…"                    # 1 à 2 phrases appuyées sur la fiche : pourquoi la réponse, et pourquoi pas les leurres
   ```
3. **La bonne réponse ne doit pas se reconnaître à sa longueur** : sinon, choisir l'option la plus longue suffit pour réussir. Donner aux leurres la même précision que la réponse (une justification fausse mais crédible) ; sur l'ensemble d'un quiz, la bonne réponse ne doit être la plus longue qu'environ une fois sur trois.
4. Même règle que pour les thèmes : **ne jamais renommer ni réutiliser un `id` de question**. Le texte des options, lui, peut être corrigé : la justesse d'une réponse passée est enregistrée telle quelle.
5. `npm run build` : il échoue si le fichier ne correspond à aucune fiche, si un id est en double ou si une option est en double.

### Règles de récompense (phase 6, `src/lib/rewards.ts`)

- **XP du quiz** : 10 par bonne réponse + 2 × (combo − 1), bonus plafonné à +10 (combo = bonnes réponses consécutives dans la session). Session sans faute d'au moins 5 questions : +30.
- **XP des scénarios** : somme du **meilleur** score de chaque scénario (rejouer sans battre son record ne rapporte rien).
- **XP des fiches** : 5 par fiche distincte consultée.
- **Niveaux** : Stagiaire 0 · Junior 150 · Confirmé 400 · Senior 800 · Lead 1500 · Staff 2500 · Principal 4000 · Architecte 6000 · Distinguished 9000 · Fellow 13000 · Légende 18000 (les trois derniers depuis les quiz de techno, qui multiplient l'XP disponible).
- **Série** : jours locaux consécutifs avec au moins une session de quiz ou une partie de scénario ; elle reste en vie si l'on a joué la veille.
- **Maîtrise** : une question est maîtrisée après 2 bonnes réponses d'affilée (avec 2 choix, une seule peut être un coup de chance) ; une erreur remet le compteur à 0. Un thème ou une techno est maîtrisé quand toutes ses questions actuelles le sont.
- **Quiz de techno** : mêmes règles d'XP, de combo, de série et de maîtrise que les thèmes ; ils comptent pour les badges généraux (sessions, combo, sans faute, centurion). Les confusions ne portent que sur les thèmes (leurs réponses sont des technos).
- **Choix des questions** : ratées, puis jamais vues, puis en cours, puis maîtrisées (la plus anciennement vue d'abord dans chaque groupe), 10 au maximum, puis mélangées.
- **Badges** : liste `BADGES`, chacun avec un prédicat sur des statistiques. Un badge atteint est enregistré dans `badges` avec sa date et ne se reperd plus. Badges des technos : Expert (1 techno maîtrisée), Explorateur (10 technos jouées), Boîte à outils (10 technos maîtrisées), Encyclopédie (toutes).

### Règles du parcours (phases 12 et 14, `src/lib/path.ts`)

- **Parcours** (`kind`) : un `tronc` (le tronc commun), des `metier` (un par fiche métier, `role`), des `competence` (tout le catalogue, module par module). Un parcours s'**ouvre** quand tous ses `requires` (directement ou non) sont terminés : le tronc ouvre les métiers et les premiers modules ; les métiers se suivent en parallèle.
- Étapes d'un parcours, dans l'ordre : pour chaque unité, ses leçons, puis ses thèmes, puis ses scénarios. Dans un parcours ouvert, l'étape en cours est la première non faite ; les suivantes sont verrouillées, sauf celles déjà faites (rejouables, l'historique compte rétroactivement). Un parcours fermé n'a pas d'étape en cours.
- Une étape **faite** l'est dans tous les parcours qui la contiennent. Une étape est ouverte (quiz, scénario jouables) si elle est faite, ou en cours dans au moins un parcours ouvert (`stepOf` fusionne).
- **Parcours suivi** (`settings`, bouton « Suivre ce parcours ») : la carte « Continuer », le widget et la suite du bilan de quiz proposent son étape en cours ; s'il est fermé, celle du parcours requis à terminer ; sans choix, celle du tronc commun.
- Contrôles du build (`content.config.ts`) : chaque fiche, thème et scénario dans au moins un parcours ; une fiche une seule fois par parcours, parcours requis compris ; un thème après les technos qu'il cite ; un métier contient (avec ses parcours requis) toutes les technos `essential: true` de sa fiche métier ; `requires` connus et sans cycle ; un seul tronc.
- **Leçon** faite : fiche lue **et** une session de son quiz avec au moins 5 réponses et ≥ 70 % de bonnes (7/10). Son quiz s'ouvre quand l'étape est en cours et la fiche lue. Lire une fiche en avance ne débloque rien.
- **Thème** fait : une session ≥ 70 %. **Scénario** fait : une partie ≥ 60/100.
- **Entreprise** : ouverte quand son scénario « devine la stack » est fait (sans scénario : toujours).
- Seuils : `PASS` dans `path.ts`.

### Règles des révisions (phase 12, `src/lib/review.ts`)

- Répétition espacée façon Anki, notée automatiquement par le QCM. L'état de chaque question (`<quiz>|<question>`) est rejoué depuis `quiz_answers`, en jours locaux.
- Première réponse : juste → revient dans 1 jour, faux → aujourd'hui. Ensuite, à échéance ou après : juste → l'intervalle grandit (0→1, 1→3, puis × ease : 8, 20, 50… jours) ; faux → retour à 0 (aujourd'hui) et ease −0,2 (départ 2,5, plancher 1,3). Avant échéance : juste ne change rien (pas de bachotage), faux remet à 0.
- Session du jour (`/revisions`) : les questions **déjà vues** des étapes faites, arrivées à échéance (la plus en retard d'abord), 20 au plus. Une question jamais vue n'entre jamais en révision. En révision, une erreur repasse une fois en fin de session. Le compteur de la nav compte les questions dues.
- Une révision est enregistrée en une session par quiz (le combo repart à 0 entre deux quiz). Une question est « solidement retenue » à partir de 21 jours d'intervalle. La maîtrise (2 bonnes d'affilée) et les badges ne changent pas.

### Règles du renforcement (phase 12, `/renforcement`)

- Le parcours ne pose que 10 questions par quiz (les quiz de techno en ont 30). Le renforcement propose, pour chaque leçon ou thème **validé**, ses questions jamais vues (`unseen` dans `review.ts`), 10 par session.
- C'est facultatif, quiz par quiz : une techno qu'on ne renforce pas ne ramène en révision que ses questions déjà vues. Une fois répondue, une question entre dans les révisions comme les autres.
- Une session de renforcement est une session de quiz normale (XP, maîtrise, badges). Sur une étape non validée, `?renforcement` redirige vers `/renforcement`.

## Procédure : écrire les exercices de code d'un langage (atelier)

1. Créer `src/content/exercises/<id>.md`, où `<id>` est l'id de la fiche langage (frontmatter seul), en partant de `sql.md` (exécuté dans le navigateur) ou de `go.md` (playground).
2. Champs :
   - `playground` : URL du bac à sable officiel, obligatoire hors de `sql`, `python`, `javascript` et `typescript`. `playgroundNote` s'il n'est pas officiel ;
   - `exercises` : environ 6, alignés sur les sous-sections de « Syntaxe », le dernier étant un cas concret. Chacun a les champs `id` (kebab-case, unique), `title`, `prompt`, `starter` (le code de départ, qui ne doit pas déjà donner la bonne sortie), `solution`, `expected` et, en SQL seulement, `setup`.
   - `expected` est la sortie exacte de la solution :
     - Python : `print` ;
     - JavaScript et TypeScript : `console.log`, avec tableaux et objets affichés en JSON (`[1,2]`) ;
     - SQL : pour chaque résultat, l'en-tête puis une ligne par résultat, au format `a | b`, NULL écrit `NULL`.
     Les fins de ligne et les espaces de fin sont ignorés.
3. SQL tourne sous SQLite (sql.js) et Python sous Pyodide, à la version `PYODIDE_VERSION` de `run.ts`, égale au paquet npm `pyodide`. TypeScript est exécuté sans vérification des types.
4. `npm run check:exercises <id>` exécute les solutions. Pour un langage à playground, vérifier les sorties dans le playground ou avec l'outil local.
5. `npm run build` : il échoue si le fichier ne correspond à aucune fiche langage, si un langage non exécutable n'a pas de playground, si un id est en double ou s'il manque `expected` à un exercice exécutable.

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
2. **Nouvelle techno = 1 fichier + 1 ligne de parcours** : suivre la procédure ci-dessus à la lettre ; la fiche apparaît dans la bibliothèque, dans le parcours et dans la pioche sans toucher au code.
3. **Tests du scoring** (`npm test`) : idéale > acceptable > surdimensionnée ; couche requise manquante pénalisée ; anti-pattern détecté.
4. **Les 3 scénarios sont jouables** de bout en bout, animation comprise.
5. **Page entreprise** : source, date et confiance de chaque techno ; sources de plus de 3 ans signalées visuellement.
6. **Partie enregistrée** (en ligne : même requête dans `turso db shell stacklab`) :
   ```
   sqlite3 -header -column data/stacklab.db "SELECT a.id, a.scenario_id, a.played_at, a.score, c.tech_id, c.layer, c.verdict FROM attempts a JOIN attempt_cards c ON c.attempt_id = a.id ORDER BY a.id DESC;"
   ```
7. **Session de quiz enregistrée**, avec XP et badges à jour sur `/progression` :
   ```
   sqlite3 -header -column data/stacklab.db "SELECT s.id, s.theme_id, s.played_at, a.position, a.question_id, a.chosen_tech, a.correct_tech FROM quiz_sessions s JOIN quiz_answers a ON a.session_id = s.id ORDER BY s.id DESC, a.position;"
   sqlite3 -header -column data/stacklab.db "SELECT * FROM badges;"
   ```
8. **Chaque fiche a son quiz** : `npm run build` n'affiche aucun avertissement « Fiches sans quiz ». Une session de quiz de techno apparaît dans la requête du critère 7 avec `theme_id = tech:<id>`, et sa maîtrise sur la fiche, sur `/quiz` et sur `/progression`.
9. **Parcours** : `npm test` couvre les règles ; retirer une fiche de tous les parcours (ou la mettre deux fois dans un parcours, placer un thème avant une techno qu'il cite, retirer une techno essentielle d'un métier) fait échouer le build. Sur une base neuve, seule la fiche SQL et son quiz sont ouverts, les métiers sont 🔒 ; `/quiz/techno/pandas` redirige vers `/verrou`, qui nomme le tronc commun. Tronc fait : tous les métiers s'ouvrent, « Suivre ce parcours » change la carte « Continuer ». Après la leçon SQL, `/revisions` ne contient que des questions de cette session ; `/renforcement` affiche SQL « 10 / 30 questions vues » et ne sert que des questions jamais vues.
10. **Langages et atelier** : une fiche langage sans `## Syntaxe` fait échouer le build ; `npm run check:exercises` passe ; sur ordi, la fiche SQL montre l'atelier, une bonne solution donne ✓, une boucle infinie JavaScript est arrêtée à 10 s ; sur téléphone, l'atelier n'est pas chargé.

## Avancement

- [x] Phase 0 : socle (environnement, schémas, garde-fous du build, SQLite, endpoints, CLAUDE.md), 3 fiches d'échantillon (sql, postgresql, mongodb)
- [x] Phase 1 : module Fiches (liste filtrable, page fiche, liens, vues) + fiches de la tranche verticale
- [x] Phase 2 : scoring + tests + 3 scénarios (MVP SaaS web, API à fort trafic, plateforme data analytique)
- [x] Phase 3 : jeu jouable (pioche, diagramme en couches, drag & drop, feedback, enregistrement)
- [x] Phase 4 : animation des flux (requête utilisateur, flux de données)
- [x] Phase 5 : stacks d'entreprises (Airbnb, Instagram) + mode devine
- [x] Phase 6 : quiz par thème (4 thèmes, 49 questions) + système de récompense (XP, niveaux, série, maîtrise, badges, page Progression)
- [x] Phase 7 : contenu enrichi : 20 fiches (dont 5 langages et 4 concepts d'API), 3 thèmes de quiz (Frameworks web & mobile, Langages, API & communication), 111 questions au total, verdicts des nouvelles cartes dans les 5 scénarios
- [x] Phase 8 : un quiz par techno (68 quiz, 686 questions en QCM), maîtrise par techno sur les fiches, `/quiz` et `/progression`, 4 badges et 3 niveaux de plus
- [x] Phase 9 : IA et machine learning : 25 fiches (LLM, RAG, embeddings, bases vectorielles, MLOps, bibliothèques ML, concepts) avec quiz, 2 thèmes de quiz (LLM & IA générative, Machine learning), 2 scénarios (assistant documentaire RAG, prédiction de résiliation), cartes de la couche `ml` dans l'animation de requête (tag `vectoriel` = recherche vectorielle avant l'appel au modèle)
- [x] Phase 10 : liste des fiches groupée par type (défaut) + page « Par métier » (9 métiers, bulles, pile par étape, comparaison de deux métiers)
- [x] Phase 11 : déploiement (Vercel + Turso + mot de passe) et affichage téléphone (nav, grilles, quiz, par métier, jeu au toucher avec pioche en tiroir)
- [x] Phase 12 : parcours guidé (8 unités, 119 étapes : fiche → quiz → thème → scénario → entreprise), révisions espacées façon Anki (questions déjà vues seulement), renforcement des questions restantes, bibliothèque des fiches en onglets par type, nav à 5 entrées
- [x] Phase 13 : langages : sections Syntaxe et Exemples concrets dans les 12 fiches langage (chaque réponse de leur quiz y figure), atelier de code (74 exercices ; SQL, Python, JavaScript, TypeScript exécutés dans le navigateur, playground pour les 8 autres)
- [ ] Phase 14 : plusieurs parcours. Fait : tronc commun, 9 parcours métier, 8 modules de compétence, parcours suivi (14a) ; fiches Git (tronc commun) et Jupyter (14b) ; métier et parcours Statisticien avec R (et ses exercices), tidyverse, ggplot2, 4 concepts de statistiques et le thème Statistiques (14c). À faire : DBA avec l'exploitation des bases, Oracle et SQL Server (14d)
