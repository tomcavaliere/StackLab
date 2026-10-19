# StackLab

Une app web locale pour comprendre à quoi sert chaque techno d'une stack, et s'entraîner à composer une stack adaptée à un besoin donné.

Projet perso, pour un seul utilisateur : elle tourne en local avec `npm run dev` et n'est pas faite pour être déployée.

## Ce qu'on y trouve

| Page | Contenu |
|---|---|
| **Fiches** (`/fiches`) | Une centaine de fiches techno (bases de données, frameworks, cloud, data, IA…), groupées par type ou filtrables. Chaque fiche dit quel problème la techno résout, quand l'utiliser, quand l'éviter, et donne ses alternatives. |
| **Par métier** (`/fiches/metiers`) | La pile de 9 métiers (data engineer, frontend, DevOps…), étape par étape, avec le rôle de chaque techno pour ce métier. On peut comparer deux métiers côte à côte. |
| **Jouer** (`/jouer`) | Des scénarios rédigés comme par un client (MVP SaaS, API à fort trafic, plateforme data, RAG, ML…). On glisse des cartes techno sur un diagramme en couches, puis on obtient un score, une animation du flux et un debrief. Plusieurs réponses peuvent être bonnes. |
| **Entreprises** (`/entreprises`) | La stack réelle d'Airbnb et d'Instagram. Chaque techno a sa source, sa date et un niveau de confiance, et les sources de plus de 3 ans sont signalées. Un mode « devine la stack » permet de s'y essayer avant de voir la réponse. |
| **Quiz** (`/quiz`) | Des thèmes où il faut choisir entre deux technos pour un besoin, et un QCM par techno. Les sessions font 10 questions et commencent par les questions ratées. |
| **Progression** (`/progression`) | XP, niveaux, série de jours, badges, maîtrise par thème et par techno, technos qu'on confond le plus souvent. |

## Démarrer

Rien n'est installé au niveau du système : Node, npm et la CLI `sqlite3` vivent dans un venv Python (`.venv`), via [nodeenv](https://github.com/ekalinin/nodeenv).

Le projet tourne sous Windows et sous macOS.

**Windows (PowerShell, à la racine du dépôt)** :

```powershell
python -m venv .venv
.venv\Scripts\python -m pip install nodeenv==1.11.0
$env:VIRTUAL_ENV = "$PWD\.venv"; .venv\Scripts\nodeenv -p --node=24.21.0
# CLI sqlite3 : télécharger sqlite-tools-win-x64-*.zip sur https://www.sqlite.org/download.html
# et copier sqlite3.exe dans .venv\Scripts
$env:PATH = "$PWD\.venv\Scripts;$env:PATH"; npm ci
npm run dev
```

**macOS (zsh, à la racine du dépôt)**. `sqlite3` est déjà fourni par le système :

```bash
python3 -m venv .venv
.venv/bin/python -m pip install nodeenv==1.11.0
VIRTUAL_ENV="$PWD/.venv" .venv/bin/nodeenv -p --node=24.21.0
export PATH="$PWD/.venv/bin:$PATH"; npm ci
npm run dev
```

L'app tourne alors sur http://localhost:4321. Dans le terminal intégré de VS Code, le dossier du venv est déjà en tête du PATH sur les deux systèmes (`.vscode/settings.json`). Dans un autre terminal, l'activer d'abord : `.venv\Scripts\Activate.ps1` sous Windows, `source .venv/bin/activate` sous macOS.

> Les scripts d'installation de `better-sqlite3` et de `fsevents` sont volontairement refusés (`allowScripts` dans `package.json`), parce que ces paquets embarquent déjà leurs binaires précompilés pour Windows et macOS. Il ne faut pas les autoriser : npm lancerait une compilation node-gyp qui exige un compilateur C++.

## Commandes

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur local sur http://localhost:4321 |
| `npm run build` | Vérifie le contenu (sections des fiches, quiz), puis lance `astro build`, qui valide tous les schémas |
| `npm test` | Tests Vitest du scoring et des récompenses |
| `node scripts/check-quality.mjs verdicts` | Liste les cartes sans verdict, par scénario |
| `node scripts/check-quality.mjs lengths` | Signale les quiz où la bonne réponse est trop souvent l'option la plus longue |
| `sqlite3 data/stacklab.db` | Interroge la progression enregistrée |

## Comment c'est fait

- **[Astro](https://astro.build/) 7** : les pages sont prérendues. Seuls les endpoints `src/pages/api/*` et `/progression` tournent côté serveur (adapter `@astrojs/node`).
- **React 19** pour les parties interactives : le jeu (diagramme et animations avec [React Flow](https://reactflow.dev/)), le quiz et la page « Par métier ».
- **Tailwind CSS 4** pour le style.
- **Le contenu est de la donnée** : un fichier Markdown avec frontmatter par entité, dans `src/content/` (`techs`, `scenarios`, `companies`, `roles`, `quiz`, `tech-quiz`). Les schémas Zod de `src/content.config.ts` le valident au build, et une référence vers une fiche qui n'existe pas fait échouer le build.
- **SQLite** (`better-sqlite3`) ne stocke que la progression : parties, vues, sessions de quiz, badges. La base `data/stacklab.db` est créée au premier appel d'API et n'est pas versionnée.
- **Le scoring et les récompenses** sont des fonctions pures (`src/lib/scoring.ts`, `src/lib/rewards.ts`), testées avec Vitest. Tout est recalculé depuis l'historique brut, et seuls les badges débloqués sont stockés.

```
src/
  content/            fiches, scénarios, entreprises, métiers, quiz (Markdown)
  content.config.ts   schémas Zod des collections
  lib/                taxonomie, SQLite, scoring, récompenses, progression
  components/         îlots React : game/, quiz/, roles/
  pages/              routes Astro et endpoints api/
scripts/              contrôles du contenu (build) et de la qualité (manuel)
```

## Ajouter du contenu

Ajouter une techno, un scénario ou un quiz revient à ajouter un fichier Markdown, sans toucher au code. Les procédures détaillées (champs du frontmatter, sections imposées, règles de verdict et de scoring, workflow de recherche pour une stack d'entreprise) sont dans [CLAUDE.md](CLAUDE.md). Les skills Claude Code de `.claude/skills/` (`nouvelle-fiche`, `quiz-techno`, `quiz-theme`) les suivent pas à pas.

`npm run build` doit passer après chaque ajout.

## Hors périmètre

Pas d'authentification, de CMS, d'i18n, de mode sombre, de SEO, d'analytics, de version mobile ni de déploiement. Le projet vise la vitesse d'itération, pas la finition.
