# Stacks

Des apps web perso pour apprendre un domaine en profondeur : des fiches, un quiz par fiche, des parcours guidés, des révisions espacées et une page de progression. Chaque app est déployée sur Vercel, protégée par un mot de passe, pour s'en servir depuis le téléphone ; la progression est stockée dans [Turso](https://turso.tech).

| App | Dossier | Sujet |
|---|---|---|
| **StackData** | [`stackdata/`](stackdata/README.md) | à quoi sert chaque techno d'une stack tech / data, et composer une stack adaptée à un besoin |
| **StackPolitique** | [`stackpolitique/`](stackpolitique/README.md) | les mouvements politiques français : histoire, idées, programme et figures de chaque parti |

## Démarrer

Rien n'est installé au niveau du système : Node, npm et la CLI `sqlite3` vivent dans un venv Python (`.venv`), via [nodeenv](https://github.com/ekalinin/nodeenv). Le projet tourne sous Windows et sous macOS.

**Windows (PowerShell, à la racine du dépôt)** :

```powershell
python -m venv .venv
.venv\Scripts\python -m pip install nodeenv==1.11.0
$env:VIRTUAL_ENV = "$PWD\.venv"; .venv\Scripts\nodeenv -p --node=24.21.0
# CLI sqlite3 : télécharger sqlite-tools-win-x64-*.zip sur https://www.sqlite.org/download.html
# et copier sqlite3.exe dans .venv\Scripts
$env:PATH = "$PWD\.venv\Scripts;$env:PATH"; npm ci
npm run dev:data
```

**macOS (zsh, à la racine du dépôt)**. `sqlite3` est déjà fourni par le système :

```bash
python3 -m venv .venv
.venv/bin/python -m pip install nodeenv==1.11.0
VIRTUAL_ENV="$PWD/.venv" .venv/bin/nodeenv -p --node=24.21.0
export PATH="$PWD/.venv/bin:$PATH"; npm ci
npm run dev:data
```

Dans le terminal intégré de VS Code, le dossier du venv est déjà en tête du PATH (`.vscode/settings.json`). Dans un autre terminal, l'activer d'abord : `.venv\Scripts\Activate.ps1` sous Windows, `source .venv/bin/activate` sous macOS.

> Le script d'installation de `fsevents` est volontairement refusé (`allowScripts` dans `package.json`), parce que le paquet embarque déjà son binaire précompilé. Il ne faut pas l'autoriser : npm lancerait une compilation node-gyp qui exige un compilateur C++.

## Organisation

Un dépôt, des workspaces npm : un `node_modules` et un lockfile communs à la racine, une app autonome par dossier (son code, son contenu, sa base locale, son projet Vercel avec Root Directory = son dossier). Le moteur est copié d'une app à l'autre plutôt que partagé.

| Commande (racine) | Effet |
|---|---|
| `npm run dev:data` | StackData sur http://localhost:4321 |
| `npm run dev:politique` | StackPolitique sur http://localhost:4322 |
| `npm run build` | Build de toutes les apps |
| `npm test` | Tests de toutes les apps |
