---
name: quiz-techno
description: Écrire ou compléter le quiz QCM d'une fiche techno StackData (src/content/tech-quiz/<id>.md). À utiliser quand l'utilisateur demande « écris le quiz de X », « ajoute des questions au quiz de X », ou après la création d'une fiche.
---

# Écrire le quiz d'une techno

La procédure de référence est « Procédure : écrire ou compléter le quiz d'une techno » dans CLAUDE.md. Ce skill la déroule et ajoute les pièges rencontrés.

Toutes les commandes se lancent en bash depuis le dossier `stackdata/`, avec ce préfixe (le venv est à la racine du dépôt) : `export PATH="$PWD/../.venv/Scripts:$PWD/../.venv/bin:$PATH"` (`Scripts` sous Windows, `bin` sous macOS).

## 1. Préparer

- Le fichier s'appelle `src/content/tech-quiz/<id>.md`, où `<id>` est l'id exact de la fiche. La fiche doit exister.
- **Lire la fiche d'abord** : les questions portent sur ce qu'elle dit (rôle, mécanismes, quand l'utiliser, quand l'éviter). Le choix entre deux technos relève des thèmes (skill `quiz-theme`).
- **La fiche documente chaque réponse** : la leçon du parcours, c'est lire la fiche puis passer le quiz. Une question dont la réponse n'est pas dans la fiche (une commande, une syntaxe, une date) oblige d'abord à compléter la fiche. Pour un langage, c'est en général dans sa section `## Syntaxe`.
- **Modèles** : `src/content/tech-quiz/redis.md`, `src/content/tech-quiz/postgresql.md`.
- **Compléter un quiz existant** : ne jamais renommer ni réutiliser un `id` de question, car il porte l'historique en base. Le texte des options peut être corrigé. Pour changer le sens d'une question, en créer une nouvelle.

## 2. Écrire

- Frontmatter seul, avec une clé `questions`. Au moins 5 questions ; en viser 10, car une session en pose 10.
- Chaque question contient :
  - `id` : kebab-case, unique dans le fichier ;
  - `prompt` : se comprend seul, car les questions sont mélangées ;
  - `answer` : la bonne réponse ;
  - `decoys` : 1 à 3 leurres, plutôt 2 ou 3, faux mais plausibles, tous différents de `answer` ;
  - `why` : 1 à 2 phrases qui disent pourquoi c'est la réponse et pourquoi pas les leurres.
- **YAML** :
  - mettre toutes les chaînes entre guillemets doubles, surtout celles qui contiennent « : » ;
  - ne pas utiliser de mot réservé YAML comme id (`null`, `true`, `yes`, `no`, `on`, `off`) ;
  - **terminer le fichier par la ligne `---`**. Sans elle, Astro répond « questions: Required ».
- Couvrir des angles variés : à quoi sert la techno, un mécanisme clé, un cas d'usage, un cas à éviter, une confusion fréquente avec une techno voisine, un piège d'exploitation.

## 3. La bonne réponse ne doit pas se deviner à sa longueur

- Donner aux leurres la même précision que la réponse : une justification fausse mais crédible, pas une option courte et visiblement fausse.
- Sur le fichier, la bonne réponse doit être l'option la plus longue au plus 3 à 4 fois sur 10. Vérifier avec `node scripts/check-quality.mjs lengths <id> [<id>…]`.
- Si le fichier est signalé, allonger des leurres ou raccourcir la réponse, puis relancer jusqu'à ce que plus rien ne soit signalé.

## 4. Valider

- `npm run build` doit passer. Il échoue si le fichier ne correspond à aucune fiche, si un id est en double ou si une option est en double.
- Ne pas inventer de chiffre ; s'en tenir à ce que la fiche affirme ou à des faits vérifiés.
