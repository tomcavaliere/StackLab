---
name: quiz-theme
description: Créer un thème de quiz StackData ou y ajouter des questions (src/content/quiz/<id>.md). Chaque question demande de choisir entre deux technos pour un besoin. À utiliser quand l'utilisateur demande « crée un thème de quiz sur … » ou « ajoute des questions au thème X ».
---

# Créer un thème de quiz ou y ajouter des questions

La procédure de référence est « Procédure : ajouter un thème ou des questions de quiz » dans CLAUDE.md. Ce skill la déroule et ajoute les pièges rencontrés.

Toutes les commandes se lancent en bash depuis le dossier `stackdata/`, avec ce préfixe (le venv est à la racine du dépôt) : `export PATH="$PWD/../.venv/Scripts:$PWD/../.venv/bin:$PATH"` (`Scripts` sous Windows, `bin` sous macOS).

## 1. Préparer

- **Le principe d'un thème** : un besoin court, deux technos, une seule est la bonne. On apprend à *choisir*. Les questions sur une techno seule vont dans son quiz (skill `quiz-techno`).
- `answer` et `decoy` sont des **ids de fiches existantes** (`ls src/content/techs/`). Les concepts (`rag`, `fine-tuning`, `rest`…) peuvent servir de réponse.
- **S'il manque une fiche pour exprimer la bonne réponse**, ne pas forcer une réponse approximative : écrire d'abord la fiche (skill `nouvelle-fiche`), ou renoncer à la question.
- **Lire les fiches concernées** avant d'écrire : le `why` doit s'appuyer sur ce qu'elles disent.
- **Modèle** : `src/content/quiz/data-analytique.md`.

## 2. Écrire

- **Nouveau thème** : `src/content/quiz/<id>.md`, frontmatter seul, avec `title`, `description` (une question qui résume le thème) et `questions`. Au moins 5 questions ; en viser 12 à 20, car une session en pose 10.
- **Chaque question** :
  ```yaml
  - id: sessions-qui-expirent      # kebab-case, unique dans le thème
    prompt: "Stocker des sessions utilisateur qui expirent toutes seules"   # un besoin, sans nommer la réponse
    answer: redis
    decoy: postgresql              # plausible, différent de answer
    why: "…"                       # 1 à 2 phrases : pourquoi l'une et pas l'autre
  ```
- **Le leurre doit vraiment tenter** : une techno voisine qu'on choisit souvent à tort pour ce besoin, pas une techno d'une autre catégorie.
- **Le prompt** décrit le besoin avec un détail qui fait pencher la balance (volume, équipe, latence, données sensibles…). Il ne nomme ni la réponse ni le leurre.
- **Équilibre** : faire tourner les technos d'une question à l'autre, et retourner une paire dans un autre contexte (A bat B ici, B bat A là). C'est le plus formateur.
- **Questions existantes** : ne jamais renommer ni réutiliser un `id`, car il porte l'historique en base (maîtrise, confusions). Pour changer le sens d'une question, en créer une nouvelle. Une question jamais publiée (non commitée) peut encore être supprimée.
- **YAML** : chaînes entre guillemets doubles, pas de mot réservé YAML comme id, et le fichier **se termine par la ligne `---`**.

## 3. Valider

- Nouveau thème : l'ajouter aux `themes` d'une unité de `src/content/parcours/parcours.md`, celle où toutes les technos qu'il cite ont déjà été vues (dans cette unité ou avant). Le build le vérifie.

- `npm run build` doit passer. Il échoue si une techno n'existe pas, si un id est en double ou si `decoy` = `answer`.
- Pas de chiffre inventé dans les `why`.
- Le thème apparaît automatiquement sur `/quiz`, sans toucher au code.
