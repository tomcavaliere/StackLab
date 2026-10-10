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
| `npm test` | Tests Vitest (scoring) |
| `sqlite3 data/stacklab.db` | Interroger la progression |

## Architecture

```
src/
  content.config.ts      schémas Zod des 3 collections + ref() (références vérifiées)
  content/
    techs/<id>.md        fiches technos
    scenarios/<id>.md    scénarios du jeu
    companies/<id>.md    stacks d'entreprises
  lib/
    taxonomy.ts          vocabulaires contrôlés (kinds, couches, verdicts…) : slug -> libellé
    db.ts, schema.sql    SQLite : ouverture paresseuse, schéma appliqué si la base n'existe pas
    scoring.ts (+ .test) score d'une partie, fonction pure
    sources.ts           isOld() : source de plus de 3 ans
  components/game/
    Game.tsx             îlot du jeu : pioche, plateau React Flow, résultats, lecture des animations
    flows.ts             étapes des animations (requête utilisateur, flux de données), fonction pure
  pages/
    fiches/              liste filtrable + page fiche (enregistre une vue)
    jouer/               liste des scénarios + page de partie (îlot Game, debrief)
    entreprises/         liste + page entreprise (sources, ⚠ > 3 ans)
    api/views.ts         POST { techId } : enregistre une vue · GET : vues par fiche
    api/attempts.ts      POST { scenarioId, score, cards: [{ techId, layer, verdict }] } : enregistre une partie · GET : meilleur score par scénario
  layouts/Base.astro
scripts/check-sections.mjs   sections imposées du corps des fiches (Zod ne voit que le frontmatter)
data/stacklab.db             base locale, ignorée par git
```

- **Le contenu est de la donnée** : un fichier Markdown + frontmatter par entité, validé au build. Ajouter une techno, c'est ajouter un fichier, sans toucher au code.
- **SQLite ne stocke que la progression** (`attempts`, `attempt_cards`, `tech_views`), jamais de contenu. Les ids de tech et de scénario y sont des ids de contenu, sans clé étrangère possible.
- **Pages prérendues** ; seuls les endpoints `src/pages/api/*` (`export const prerender = false`) tournent côté serveur (adapter `@astrojs/node`).
- **Scoring** (phase 2) : fonction pure dans `src/lib/scoring.ts`, indépendante de l'UI, testée avec Vitest. Calculée côté client, le résultat est envoyé tel quel à `/api/attempts`.
- **Jeu** (phase 3) : îlot React, diagramme et animation avec React Flow (`@xyflow/react`), drag HTML5 natif depuis la pioche. dnd-kit seulement si React Flow ne suffit pas.

## Conventions

- **id = nom du fichier**, en kebab-case ASCII minuscule (`aws-s3.md` → `aws-s3`). Astro dérive l'id du nom : une majuscule ou un espace casse les références.
- **Références entre entrées : toujours `ref('techs')` / `ref('scenarios')`** de `content.config.ts`. Le `reference()` d'Astro 7 seul ne vérifie pas que l'id existe.
- **Zod** : `import { z } from 'astro/zod'` (Zod 4). L'import depuis `astro:content` est déprécié.
- **Vocabulaires** (kind, couches, type de scénario, verdict, type de source, confiance) : slugs ASCII dans les fichiers, libellés dans `taxonomy.ts`. En ajouter un modifie le code, c'est assumé.
- **Tags** libres, en kebab-case ASCII. Réutiliser les tags existants avant d'en créer (`grep -h "^tags:" src/content/techs/*.md`).
- **Exactitude** : aucun chiffre de performance inventé. En cas d'incertitude, l'écrire explicitement dans la fiche.
- **SQLite** : pas d'outil de migration. Si `schema.sql` change, supprimer `data/stacklab.db` ; elle est recréée au premier appel d'API.
- **Code** : le minimum qui fait le travail, pas d'abstraction anticipée. Les messages d'erreur peuvent être orientés développeur.
- **Git** : un commit par phase validée.

## Procédure : ajouter une fiche techno

1. Créer `src/content/techs/<id>.md`, en partant de `postgresql.md` (techno) ou de `sql.md` (langage).
2. Remplir le frontmatter :

   | Champ | Contenu |
   |---|---|
   | `name` | nom affiché |
   | `kind` | `langage` `framework` `base-de-donnees` `cache-queue` `moteur-traitement` `orchestrateur` `plateforme` `service-cloud` `outil-infra` `concept` |
   | `layers` | couches où la carte peut se poser : `frontend` `mobile` `backend-api` `auth` `base-operationnelle` `cache-messaging` `stockage-analytique` `traitement-data` `orchestration` `ml` `conteneurs-infra` `cloud` `ci-cd` `observabilite`. **`[]` pour un langage** : il n'est pas une carte du jeu. |
   | `languages` | ids des fiches langage dans lesquels *on écrit* avec cette techno (pas son langage d'implémentation). Optionnel. |
   | `tags` | libres, optionnel |
   | `difficulty` | `1` prise en main rapide · `2` demande de la pratique · `3` expertise ou exploitation lourde |
   | `summary` | une phrase (= « En une phrase ») ; affichée sur les cartes, les listes et l'animation |
   | `alternatives` | `- { tech: <id>, note: "quand choisir l'autre" }`. Optionnel. Affichées dans les deux sens : déclarer A→B suffit. |
   | `integratesWith` | même format, pour les technos compatibles. Optionnel. |

3. Écrire le corps avec exactement ces 4 titres `##` : `Problème résolu`, `Quand l'utiliser`, `Quand l'éviter`, `Pour aller plus loin`. Les sections « Alternatives » et « S'intègre avec » sont générées depuis le frontmatter.
4. `npm run build` doit passer. Une référence vers une fiche qui n'existe pas encore fait échouer le build : créer d'abord la fiche cible, ou retirer le lien en attendant.

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

## Avancement

- [x] Phase 0 : socle (environnement, schémas, garde-fous du build, SQLite, endpoints, CLAUDE.md), 3 fiches d'échantillon (sql, postgresql, mongodb)
- [x] Phase 1 : module Fiches (liste filtrable, page fiche, liens, vues) + fiches de la tranche verticale
- [x] Phase 2 : scoring + tests + 3 scénarios (MVP SaaS web, API à fort trafic, plateforme data analytique)
- [x] Phase 3 : jeu jouable (pioche, diagramme en couches, drag & drop, feedback, enregistrement)
- [x] Phase 4 : animation des flux (requête utilisateur, flux de données)
- [x] Phase 5 : stacks d'entreprises (Airbnb, Instagram) + mode devine
