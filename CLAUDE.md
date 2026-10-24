# Stacks : deux apps d'apprentissage dans un dépôt

Deux apps web perso, un seul utilisateur chacune, même méthode (fiches, quiz, parcours, révisions espacées, progression) :

| Dossier | App | Sujet |
|---|---|---|
| `stackdata/` | **StackData** (ex-StackLab) | le rôle de chaque techno dans une stack tech / data, et composer une stack pour un besoin |

Chaque app a son propre `CLAUDE.md` (périmètre, architecture, procédures, avancement), son projet Vercel et sa base Turso. Le moteur est **copié** d'une app à l'autre, pas partagé : chacune évolue librement. Un changement du moteur qui vaut pour les deux se reporte à la main.

## Monorepo

- Workspaces npm (`package.json` racine) : un seul `package-lock.json` et un seul `node_modules` à la racine. Installer avec `npm ci` **à la racine**. Ajouter une dépendance à une app : `npm install <paquet> -w stackdata`.
- Chaque app est autonome dans son dossier : `src/`, `scripts/`, `astro.config.mjs`, `vercel.json`, `.env` (non versionné), `data/` (base locale, non versionnée), `.claude/skills/` (skills de l'app).
- Une commande d'app se lance depuis son dossier (`npm run build`) ou depuis la racine (`npm run build -w stackdata`).

| Commande (racine) | Effet |
|---|---|
| `npm run dev:data` | StackData sur http://localhost:4321 |
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

## Déploiement

Un projet Vercel par app, tous reliés à ce dépôt GitHub, chacun avec **Root Directory = son dossier** (et « Include files outside the root directory » activé, pour le lockfile racine). Chaque `git push` sur `main` redéploie. Les variables (`TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `APP_PASSWORD`) sont dans les réglages de chaque projet.

## Git

Un commit par phase validée. Le message nomme l'app concernée (« StackData : … »).
