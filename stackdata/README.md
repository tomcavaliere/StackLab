# StackData

Une app web pour comprendre à quoi sert chaque techno d'une stack, et s'entraîner à composer une stack adaptée à un besoin donné.

Projet perso, pour un seul utilisateur. Elle est déployée sur Vercel, protégée par un mot de passe, pour s'en servir depuis le téléphone ; la progression est stockée dans [Turso](https://turso.tech) (SQLite hébergé) et partagée entre le téléphone et l'ordi. En local, `npm run dev`.

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

L'installation (Node dans un venv Python, `npm ci` à la racine du dépôt) est décrite dans le [README de la racine](../README.md). Ensuite, depuis la racine : `npm run dev:data`, ou depuis ce dossier : `npm run dev`. L'app tourne sur http://localhost:4321/data/.

Sans configuration, la progression va dans le fichier local `data/stackdata.db`. Pour travailler sur la même progression que l'app en ligne, copier `.env.example` en `.env` (dans ce dossier) et y mettre l'URL et le token Turso.

## Déploiement

1. **Turso** : créer une base (celle de StackData s'appelle `stacklab`, son nom d'origine) en région `aws-eu-west-1` (Irlande) sur [turso.tech](https://turso.tech), puis récupérer son URL (`libsql://…`) et un token.
2. **Vercel** : un seul projet pour les deux apps, Root Directory vide (voir le `CLAUDE.md` racine) ; l'app y est servie sous `/data`. Renseigner `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` et `APP_PASSWORD` dans Settings → Environment Variables. La région des fonctions est fixée par `vercel.json` (`dub1`, Dublin, comme la base Turso).
3. Chaque `git push` sur `main` redéploie. Sur le téléphone, ouvrir l'URL Vercel, saisir le mot de passe (n'importe quel nom d'utilisateur), puis « Ajouter à l'écran d'accueil ».

Les tables sont créées au premier appel. Pour reprendre une progression locale : `sqlite3 data/stackdata.db .dump > dump.sql`, puis `turso db shell stacklab < dump.sql`.

## Commandes

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur local sur http://localhost:4321/data/ |
| `npm run build` | Vérifie le contenu (sections des fiches, quiz), puis lance `astro build`, qui valide tous les schémas |
| `npm test` | Tests Vitest du scoring et des récompenses |
| `node scripts/check-quality.mjs verdicts` | Liste les cartes sans verdict, par scénario |
| `node scripts/check-quality.mjs lengths` | Signale les quiz où la bonne réponse est trop souvent l'option la plus longue |
| `sqlite3 data/stackdata.db` | Interroge la progression locale |
| `turso db shell stacklab` | Interroge la progression en ligne (CLI Turso, ou l'éditeur SQL du dashboard) |

## Comment c'est fait

- **[Astro](https://astro.build/) 7**, rendu côté serveur sur Vercel (adapter `@astrojs/vercel`), avec un middleware qui demande le mot de passe.
- **React 19** pour les parties interactives : le jeu (diagramme et animations avec [React Flow](https://reactflow.dev/)), le quiz et la page « Par métier ».
- **Tailwind CSS 4** pour le style.
- **Le contenu est de la donnée** : un fichier Markdown avec frontmatter par entité, dans `src/content/` (`techs`, `scenarios`, `companies`, `roles`, `quiz`, `tech-quiz`). Les schémas Zod de `src/content.config.ts` le valident au build, et une référence vers une fiche qui n'existe pas fait échouer le build.
- **SQLite**, via le client libSQL : Turso en ligne, ou le fichier local `data/stackdata.db` (non versionné). Il ne stocke que la progression : parties, vues, sessions de quiz, badges. Les tables sont créées au premier appel d'API.
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

Pas de comptes utilisateurs (un seul mot de passe), de CMS, d'i18n, de mode sombre, de SEO ni d'analytics. L'affichage s'adapte au téléphone (le jeu se joue au toucher). Le projet vise la vitesse d'itération, pas la finition.
