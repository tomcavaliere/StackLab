# Stacks : deux apps d'apprentissage dans un dépôt

Deux apps web perso, un seul utilisateur chacune, même méthode (fiches, quiz, parcours, révisions espacées, progression) :

| Dossier | App | Sujet |
|---|---|---|
| `stackdata/` | **StackData** (ex-StackLab) | le rôle de chaque techno dans une stack tech / data, et composer une stack pour un besoin |
| `stackpolitique/` | **StackPolitique** | les mouvements politiques français : histoire, idées, programme et figures de chaque parti |

Chaque app a son propre `CLAUDE.md` (périmètre, architecture, procédures, avancement). Les deux sont servies par un seul projet Vercel, derrière un portail et un seul mot de passe (voir « Déploiement »). Le moteur est **copié** d'une app à l'autre, pas partagé : chacune évolue librement. Un changement du moteur qui vaut pour les deux se reporte à la main.

## Monorepo

- Workspaces npm (`package.json` racine) : un seul `package-lock.json` et un seul `node_modules` à la racine. Installer avec `npm ci` **à la racine**. Ajouter une dépendance à une app : `npm install <paquet> -w stackdata`.
- Chaque app est autonome dans son dossier : `src/`, `scripts/`, `astro.config.mjs`, `.env` (non versionné), `data/` (base locale, non versionnée), `.claude/skills/` (skills de l'app).
- Une commande d'app se lance depuis son dossier (`npm run build`) ou depuis la racine (`npm run build -w stackdata`).

| Commande (racine) | Effet |
|---|---|
| `npm run dev:data` | StackData sur http://localhost:4321/data/ |
| `npm run dev:politique` | StackPolitique sur http://localhost:4322/politique/ |
| `npm run build:vercel` | Build des deux apps et assemblage du projet Vercel (`.vercel/output`) |
| `npm run build` | Build de toutes les apps |
| `npm test` | Tests de toutes les apps |

## Environnement : tout dans `.venv`

Le projet tourne sous Windows et sous macOS. Rien n'est installé au niveau système. `.venv` (à la racine, commun aux apps) est un venv Python dans lequel `nodeenv` a installé Node 24 LTS et npm. Les exécutables sont dans `.venv\Scripts` sous Windows (la CLI `sqlite3.exe` y est copiée) et dans `.venv/bin` sous macOS (`sqlite3` est fourni par le système).

- **Terminal VS Code** : `.vscode/settings.json` met le dossier du venv en tête du PATH, sous Windows comme sous macOS, rien à activer.
- **Autre terminal** : Windows : `.venv\Scripts\activate.bat` (cmd) ou `.venv\Scripts\Activate.ps1` (PowerShell). macOS : `source .venv/bin/activate`.
- **Agent (shell non interactif)** : préfixer chaque commande, avec le chemin absolu de la racine du dépôt (le dossier courant peut être une app). En PowerShell : `$env:PATH = "<racine>\.venv\Scripts;$env:PATH"`. En bash ou zsh : `export PATH="<racine>/.venv/Scripts:<racine>/.venv/bin:$PATH"`.

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

**Script d'installation refusé** (`allowScripts` dans le `package.json` racine) : `fsevents` (watcher de fichiers de Vite, macOS seulement). C'est voulu : le paquet inclut son binaire précompilé. Ne pas l'approuver, sinon npm lance une compilation node-gyp qui exige les Xcode Command Line Tools. (`@libsql/client` n'a pas de script : son binaire natif vient d'un paquet optionnel par plateforme.)

## Déploiement : un seul projet Vercel

Un seul projet Vercel, relié au dépôt GitHub, **Root Directory vide** (la racine). Chaque `git push` sur `main` redéploie.

| URL | Servie par |
|---|---|
| `/` | le portail (`portal/`) : choisir entre les deux apps |
| `/data/…` | StackData (`base: '/data'` dans son `astro.config.mjs`) |
| `/politique/…` | StackPolitique (`base: '/politique'`) |

- **Build** : `vercel.json` (racine) lance `npm run build:vercel`, c'est-à-dire `scripts/build-vercel.mjs`. Il construit les deux apps, puis assemble leurs sorties `@astrojs/vercel` dans `.vercel/output` (Build Output API) : trois fonctions (`index`, `data`, `politique`), les assets de chaque app recopiés sous `static/<préfixe>/`, et un `config.json` qui envoie chaque préfixe à sa fonction. Le script échoue si la sortie de l'adapter change de forme : c'est là qu'il faut regarder après une mise à jour d'Astro ou de l'adapter.
- **Liens internes** : chaque app est servie sous son préfixe, donc tout lien interne passe par `url()` (`src/lib/url.ts` de chaque app) : `href={url('/fiches')}`, `fetch(url('/api/progress'))`, `Astro.redirect(url('/verrou'))`. Un lien `href="/…"` écrit en dur sort de l'app (seul le lien « ⌂ Stacks » de la nav vise `/`, le portail).
- **Mot de passe** : `APP_PASSWORD`, vérifié par le middleware de chaque app et par le portail, avec le même realm Basic Auth (`Stacks`) : le navigateur ne le demande qu'une fois pour les trois.
- **Turso** : une seule base (`stacklab`, son nom d'origine), partagée. Les tables de StackPolitique sont préfixées `politique_` pour ne pas croiser celles de StackData. Variables du projet : `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `APP_PASSWORD`. Région des fonctions : `dub1` (`vercel.json`), la même que la base (`aws-eu-west-1`).

## Git

Un commit par phase validée. Le message nomme l'app concernée (« StackData : … »).
