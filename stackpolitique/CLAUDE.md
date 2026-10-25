# StackPolitique

App web perso pour comprendre en profondeur les mouvements politiques français : leur histoire, leurs idées, leur programme, leurs figures. Un tronc commun de notions et d'institutions, puis un parcours par parti. Même méthode et même moteur que StackData (copié, pas partagé) : fiches, quiz de fiche, thèmes à 2 choix, parcours avec verrous, révisions espacées, renforcement, progression. Un seul utilisateur. Optimiser pour la vitesse d'itération, pas pour la finition.

Hors périmètre, à ne pas ajouter : comptes utilisateurs (un seul mot de passe suffit), CMS, i18n, dark mode, éditeur in-app, SEO, analytics, onboarding, audit d'accessibilité, jeu de composition (pas de plateau en v1), sondages.

L'environnement (`.venv`, PATH, installation) et le monorepo sont décrits dans le `CLAUDE.md` de la racine. Tous les chemins et commandes ci-dessous sont relatifs au dossier `stackpolitique/` (lancer les commandes depuis ce dossier, ou depuis la racine avec `-w stackpolitique`).

**Variables d'environnement** (`.env.example` → `stackpolitique/.env`, ignoré par git ; déclarées dans `astro.config.mjs`, `astro:env`) : `TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN` (sans URL : fichier local `data/stackpolitique.db`) et `APP_PASSWORD` (vide : pas de mot de passe).

## Déploiement

- **Vercel** (adapter `@astrojs/vercel`) : l'app est servie sous **`/politique`** (`base` dans `astro.config.mjs`) par le projet Vercel commun aux deux apps, derrière le portail ; déploiement décrit dans le `CLAUDE.md` racine. **Tout lien interne passe par `url()`** (`src/lib/url.ts`) : `href={url('/fiches')}`, `fetch(url('/api/…'))`, `Astro.redirect(url('/verrou'))`.
- **Turso** : la base de StackData (`stacklab`), partagée. Les tables de StackPolitique sont préfixées **`politique_`** (`politique_quiz_sessions`…) ; une nouvelle table doit l'être aussi. Le schéma s'applique tout seul au premier appel, comme en local.
- **Mot de passe** : `src/middleware.ts`, Basic Auth sur toutes les requêtes.

## Commandes

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur local sur http://localhost:4322/politique/ (StackData garde 4321) |
| `npm run build` | Vérifie les sections des fiches, les `party` et les quiz (`scripts/check-content.mjs`), puis `astro build` (valide tout le contenu) |
| `npm test` | Tests Vitest (récompenses, parcours, révisions) |
| `node scripts/check-quality.mjs lengths [ids]` | Signale les quiz où la bonne réponse est trop souvent l'option la plus longue ; avec des ids, liste les questions concernées |
| `sqlite3 data/stackpolitique.db` | Interroger la progression locale |

## Architecture

```
src/
  content.config.ts      schémas Zod des 4 collections + ref() (références vérifiées) + contrôles des parcours
  content/
    fiches/<id>.md       fiches : partis, personnalités, courants, notions, institutions, événements
    quiz-fiche/<id>.md   quiz d'une fiche (QCM en texte), id = id de la fiche
    quiz/<id>.md         thèmes (questions à 2 fiches, en général « quel parti défend… ? »)
    parcours/parcours.md les parcours : tronc commun, un par parti, comparaisons ; chacun ses prérequis et ses unités
  lib/
    taxonomy.ts          vocabulaires contrôlés (kinds, familles, types de parcours, types de source) : slug -> libellé
    db.ts, schema.sql    client libSQL (Turso, ou fichier local), schéma appliqué à chaque ouverture
    rewards.ts (+ .test) XP, niveaux, série, maîtrise, choix des questions, badges : fonctions pures
    path.ts (+ .test)    parcours : parcours ouverts, statut de chaque étape, prochaine étape : fonction pure
    review.ts (+ .test)  révisions espacées : fonctions pures
    progress.ts          historique lu en base -> progression, parcours, révisions ; badges persistés
    sources.ts           isOld() : source de plus de 3 ans
  components/quiz/Quiz.tsx  îlot du quiz (thèmes, fiches, révisions, renforcement)
  components/FichesTabs.astro  onglets de la bibliothèque, un par kind
  pages/
    index.astro          accueil : révisions du jour, Continuer, tronc commun, partis par famille, comparaisons
    parcours/[id].astro  un parcours, bouton « Suivre ce parcours »
    fiches/              bibliothèque (`?type=`, `?tag=`) ; page fiche : sections, parti / personnalités, liens, sources datées
    quiz/                liste des thèmes et des quiz de fiche ; `quiz/[id]` (thème), `quiz/fiche/[id]` (fiche) ; `?renforcement`
    revisions.astro, renforcement.astro, verrou.astro, progression.astro
    api/views.ts         POST { ficheId } : enregistre une vue · GET : vues par fiche
    api/quiz.ts          POST { sessions: [{ themeId, answers: [{ questionId, chosen, correct }] }] } · GET ?theme=
    api/progress.ts      GET : XP, niveau, série, maîtrise, badges, confusions, révisions dues, prochaine étape
    api/parcours.ts      POST { id } : parcours suivi (table settings)
  layouts/Base.astro, middleware.ts
scripts/check-content.mjs  ce que Zod ne voit pas : sections imposées par kind, `party` vers une fiche parti, quiz sans fiche (erreur) ; fiche sans quiz, quiz de moins de 20 questions (avertissements)
scripts/check-quality.mjs  hors build : bonne réponse trop souvent la plus longue
.claude/skills/            nouvelle-fiche, quiz-fiche, quiz-theme
```

- **Le contenu est de la donnée** : un fichier Markdown + frontmatter par entité, validé au build.
- **SQLite ne stocke que la progression** (`politique_fiche_views`, `politique_quiz_sessions`, `politique_quiz_answers`, `politique_badges`, `politique_settings`). Une session du quiz d'une fiche a `theme_id = 'fiche:<id de la fiche>'` et le texte des options dans `chosen` / `correct` ; un thème a des ids de fiche.
- **Tout est rendu à la demande** (`output: 'server'`) pour que le middleware protège chaque page. Pages dynamiques : `getEntry(collection, Astro.params.id)`, 404 si absente.
- **Téléphone et ordi** : un seul code, Tailwind mobile d'abord, `md:` pour l'ordi. Vérifier à 390 px qu'aucune page ne défile horizontalement.

## Conventions

- **id = nom du fichier**, en kebab-case ASCII minuscule (`la-france-insoumise.md` → `la-france-insoumise`).
- **Références entre entrées : toujours `ref('fiches')` / `ref('quiz')`** de `content.config.ts`.
- **Zod** : `import { z } from 'astro/zod'`.
- **Vocabulaires** (kind, famille, type de parcours, type de source) : slugs dans les fichiers, libellés dans `taxonomy.ts`.
- **Tags** libres, en kebab-case ASCII. Réutiliser les tags existants (`grep -h "^tags:" src/content/fiches/*.md`).
- **SQLite** : pas de migration. Ajouter une table est automatique ; modifier une table existante impose de la supprimer (historique de la table perdu).
- **Code** : le minimum qui fait le travail, pas d'abstraction anticipée. Un changement du moteur utile aussi à StackData se reporte à la main.

## Règles de contenu : neutralité, sources, actualité

- **Neutralité** : chaque position est attribuée (« le parti propose… », « selon son programme de 2024… ») ; les critiques sont attribuées à qui les formule, avec la réponse du parti quand elle existe ; aucun jugement éditorial. Même structure et même profondeur pour tous les partis.
- **Sources** : toute fiche a au moins une source datée (`sources`). Ordre de préférence : programme officiel et site du parti, institutions (Assemblée nationale, Sénat, Conseil constitutionnel, ministère de l'Intérieur pour les résultats), vie-publique.fr, presse de référence. Page non datée : date de consultation et `note: "page non datée, date de consultation"`.
- **Sources de plus de 3 ans** : signalées (⚠) sur les fiches de parti et de personnalité seulement ; pour une notion ou un événement, une source ancienne est normale.
- **Exactitude** : aucun chiffre inventé ; résultats électoraux officiels, avec l'élection et l'année. En cas de doute, l'écrire dans la fiche.
- **Actualité** : dirigeants, alliances et programmes changent. Une fiche de parti ou de personnalité s'écrit **après une recherche web**, porte `lastResearched`, et sa section « Programme » cite le dernier programme publié et son année. Pas de résumé à faire valider avant d'écrire : chaque fait de la fiche doit venir d'une source listée dans `sources`.
- **Classification** (`family`) : nomenclature usuelle (ministère de l'Intérieur, science politique) ; quand un parti la conteste, la fiche le dit.

## Procédure : ajouter une fiche

Le skill `nouvelle-fiche` la déroule pas à pas.

1. Créer `src/content/fiches/<id>.md`, en partant de `clivage-gauche-droite.md` (notion) ou de `cinquieme-republique.md` (institution).
2. Frontmatter :

   | Champ | Contenu |
   |---|---|
   | `name` | nom affiché |
   | `kind` | `parti` `personnalite` `courant` `notion` `institution` `evenement` |
   | `family` | parti seulement : `gauche-radicale` `ecologie` `gauche` `centre` `droite` `extreme-droite` |
   | `party` | personnalité : id de la fiche de son parti (vérifié : une fiche `kind: parti`). Optionnel pour une figure historique |
   | `tags` | libres, optionnel |
   | `difficulty` | `1` notion de base · `2` demande un peu de recul · `3` pour approfondir |
   | `summary` | une phrase ; affichée sur les cartes et en tête de fiche |
   | `liens` | `- { fiche: <id>, note: "…" }`, optionnel ; affichés dans les deux sens avec la même note : déclarer A→B suffit, la note doit se lire depuis les deux fiches |
   | `sources` | au moins une : `- { url, title, date, type: programme\|site-officiel\|institution\|presse\|ouvrage\|autre, note? }` |
   | `lastResearched` | date de la recherche qui a servi à écrire la fiche |

3. Corps : les titres `##` imposés par kind (le build les vérifie) :
   - parti : `Origines et histoire`, `Idées et valeurs`, `Programme`, `Figures`, `Électorat et résultats`, `Pour aller plus loin` ;
   - personnalité : `Parcours`, `Positions`, `Rôle aujourd'hui`, `Pour aller plus loin` ;
   - courant, notion, institution, événement : `De quoi s'agit-il`, `Pourquoi c'est important`, `Idées reçues`, `Pour aller plus loin`.
4. Écrire son quiz (procédure suivante). Chaque réponse du quiz doit se trouver dans la fiche.
5. La placer dans `parcours.md` (tronc commun, ou parcours de son parti). Le build échoue si une fiche n'est dans aucun parcours, figure deux fois dans un parcours (ou dans un parcours et ceux qu'il requiert) ou n'a pas de quiz.
6. `npm run build` doit passer, sans avertissement.

## Procédure : écrire ou compléter le quiz d'une fiche

Le skill `quiz-fiche` la déroule.

1. `src/content/quiz-fiche/<id>.md`, où `<id>` est l'id de la fiche : frontmatter seul, une clé `questions`, **20 questions** (une session en pose 10, le renforcement sert les autres).
2. Chaque question : `id` (kebab-case, unique, pas un mot réservé YAML), `prompt` (se comprend seul), `answer`, `decoys` (1 à 3, faux mais plausibles), `why` (1 à 2 phrases appuyées sur la fiche).
3. **Ne poser que ce que la fiche documente.** Questions de fait ou sur ce que dit le parti, jamais de jugement de valeur.
4. **La bonne réponse ne doit pas se reconnaître à sa longueur** : la plus longue au plus une fois sur trois environ (`check-quality.mjs lengths`).
5. **Ne jamais renommer ni réutiliser un `id` de question** : il identifie l'historique en base. Le texte des options peut être corrigé.
6. `npm run build`.

## Procédure : ajouter un thème ou des questions de quiz

Le skill `quiz-theme` la déroule.

1. `src/content/quiz/<id>.md` (frontmatter seul) : `title`, `description`, au moins 5 `questions` (viser 12 à 20).
2. Chaque question : `id`, `prompt` (la mesure ou la position, avec la source, sans nommer la réponse), `answer` et `decoy` (ids de fiche, en général deux partis proches), `why`.
3. La mesure vient d'un programme sourcé et figure dans la fiche du parti.
4. L'ajouter aux `themes` d'une unité où toutes les fiches citées ont été vues : en général un parcours `kind: comparaison` qui requiert les partis comparés.
5. `npm run build` : il échoue si une fiche n'existe pas, si un id est en double, si `decoy` = `answer`, si un thème n'est dans aucun parcours ou cite une fiche pas encore vue.

## Procédure : ajouter le parcours d'un parti

1. Écrire les fiches : le parti (`kind: parti`, `family`), 2 à 4 personnalités (`party: <id du parti>`), et un courant ou un événement propre s'il n'est pas déjà dans le tronc commun. Chacune avec son quiz.
2. Dans `parcours.md`, une entrée `kind: parti`, `party: <id>`, `requires: [tronc-commun]`, avec trois unités en général : « Histoire et identité » (la fiche du parti), « Idées et programme » (son courant propre), « Les figures » (les personnalités). Une fiche du tronc ne se répète pas.
3. `npm run build`. Le parcours apparaît sur l'accueil dans la famille du parti.

## Règles du moteur

### Récompenses (`src/lib/rewards.ts`)

- **XP** : 10 par bonne réponse + 2 × (combo − 1), bonus plafonné à +10 ; session sans faute d'au moins 5 questions : +30 ; 5 par fiche distincte consultée.
- **Niveaux** : Sympathisant 0 · Militant 150 · Conseiller municipal 400 · Maire 800 · Conseiller régional 1500 · Député 2500 · Sénateur 4000 · Ministre 6000 · Premier ministre 9000 · Président 13000 · Sage du Conseil constitutionnel 18000.
- **Série** : jours locaux consécutifs avec au moins une session de quiz ; elle reste en vie si l'on a joué la veille.
- **Maîtrise** : une question est maîtrisée après 2 bonnes réponses d'affilée ; une erreur remet le compteur à 0. Un thème ou une fiche est maîtrisé quand toutes ses questions actuelles le sont.
- **Choix des questions** : ratées, puis jamais vues, puis en cours, puis maîtrisées (la plus anciennement vue d'abord), 10 au maximum, puis mélangées.
- **Badges** : liste `BADGES` ; un badge atteint est enregistré avec sa date et ne se reperd plus. Les confusions ne portent que sur les thèmes (leurs réponses sont des fiches).

### Parcours (`src/lib/path.ts`)

- **Parcours** (`kind`) : un `tronc`, des `parti` (un par parti, `party`), des `comparaison`. Un parcours s'**ouvre** quand tous ses `requires` (directement ou non) sont terminés : le tronc ouvre les partis, qui se suivent en parallèle ; une comparaison s'ouvre quand les partis qu'elle compare sont faits.
- Étapes, dans l'ordre : pour chaque unité, ses leçons puis ses thèmes. Une unité de comparaison peut n'avoir que des thèmes ; une unité vide est refusée.
- Une étape **faite** l'est dans tous les parcours qui la contiennent ; elle est ouverte si elle est faite ou en cours dans au moins un parcours ouvert.
- **Parcours suivi** (`settings`) : la carte « Continuer » propose son étape en cours ; s'il est fermé, celle du parcours requis à terminer ; sans choix, celle du tronc commun.
- **Leçon** faite : fiche lue **et** une session de son quiz avec au moins 5 réponses et ≥ 70 %. **Thème** fait : une session ≥ 70 %. Seuils : `PASS`.
- Contrôles du build : chaque fiche et thème dans au moins un parcours ; une fiche une seule fois par parcours, parcours requis compris ; un thème après les fiches qu'il cite ; un parcours de parti contient la fiche de son parti ; `requires` connus et sans cycle ; un seul tronc.

### Révisions (`src/lib/review.ts`) et renforcement (`/renforcement`)

- Répétition espacée façon Anki, notée par le QCM : première réponse juste → 1 jour, fausse → aujourd'hui ; ensuite, à échéance, juste → l'intervalle grandit (1, 3, 8, 20, 50… jours), faux → retour à 0 et ease −0,2. Avant échéance : juste ne change rien, faux remet à 0.
- `/revisions` : les questions **déjà vues** des étapes faites, arrivées à échéance, 20 au plus ; une erreur repasse une fois en fin de session. Une question jamais vue n'entre jamais en révision.
- `/renforcement` : pour chaque leçon ou thème validé, ses questions jamais vues, 10 par session. Facultatif, quiz par quiz.

## Critères de succès

1. **Contenu invalide → build en échec** avec chemin et champ (section manquante, `party` vers une fiche qui n'est pas un parti, kind ou family invalide).
2. **Tests** (`npm test`) : récompenses, parcours, révisions.
3. Sur une base neuve, seul le quiz de la première leçon s'ouvre, après lecture de sa fiche ; les autres redirigent vers `/verrou`. Après une session ≥ 7/10, l'étape suivante est proposée, `/revisions` ne contient que des questions de cette session, `/renforcement` affiche « 10 / 20 questions vues ».
4. **Session enregistrée** :
   ```
   sqlite3 -header -column data/stackpolitique.db "SELECT s.id, s.theme_id, a.position, a.question_id, a.chosen, a.correct FROM politique_quiz_sessions s JOIN politique_quiz_answers a ON a.session_id = s.id ORDER BY s.id DESC, a.position;"
   ```
5. Chaque fiche a ses sources affichées avec leur date, et son quiz de 20 questions (aucun avertissement au build).

## Avancement

- [x] Phase B : squelette (moteur copié de StackData et adapté, sans jeu ni atelier), 2 fiches d'échantillon (clivage gauche-droite, Ve République) avec leur quiz
- [x] Phase C : tronc commun, 19 fiches en 4 unités (clivages ; institutions ; élections ; grands courants), 380 questions, 3 thèmes (Qui fait quoi ?, Quelle élection ?, Quel courant ?)
- [ ] Phases D : un parcours par parti (LFI, Les Écologistes, PS, Renaissance, MoDem, Horizons, LR, RN, Reconquête)
  - [x] LFI : 10 fiches (parti, écosocialisme, Nouveau Front populaire, 7 personnalités), 200 questions, thème « Quel insoumis ? »
  - [ ] **À mettre à jour après le 7 novembre 2026** : LFI présente les 6 et 7 novembre la nouvelle édition de son programme (« la Nouvelle France »). Les fiches ont été écrites avec l'édition de janvier 2025 : refaire la recherche, puis mettre à jour la section « Programme » de `la-france-insoumise.md` et ses questions (`smic`, `retraite`, `fiscalite`, `energie`, `institutions`, `otan`, `nouveau-programme`), et `clemence-guette.md`.
  - [x] Les Écologistes : 10 fiches (parti, décroissance, primaire de la gauche de 2026, 7 personnalités), 200 questions, thème « Quel écologiste ? »
  - [ ] **À mettre à jour après le 13 décembre 2026** : les adhérents des Écologistes votent du 10 au 13 décembre sur le maintien de la candidature de Marine Tondelier. Mettre à jour `les-ecologistes.md` (histoire), `marine-tondelier.md`, `primaire-de-la-gauche-2026.md` et les questions `vote-decembre`, `decembre-2026`, `suite-ecologistes`, `idee-recue-renonce`. Vérifier aussi l'issue de la suspension de Yannick Jadot (trois mois à partir du 25 septembre 2026).
- [ ] Phase E : comparaisons (thèmes « quel parti défend… ? »)
- [x] Déploiement : servie sous `/politique` par le projet Vercel commun, derrière le portail, tables `politique_*` dans la base Turso partagée
