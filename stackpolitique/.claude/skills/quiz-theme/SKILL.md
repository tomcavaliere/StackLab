---
name: quiz-theme
description: Créer un thème de quiz StackPolitique ou y ajouter des questions (src/content/quiz/<id>.md). Chaque question demande de départager deux fiches, en général « quel parti défend cette mesure ? ». À utiliser quand l'utilisateur demande « crée un thème de quiz sur … », « compare les partis sur … » ou « ajoute des questions au thème X ».
---

# Créer un thème de quiz ou y ajouter des questions

La procédure de référence est « Procédure : ajouter un thème ou des questions de quiz » dans `stackpolitique/CLAUDE.md`.

Toutes les commandes se lancent en bash depuis le dossier `stackpolitique/`, avec ce préfixe : `export PATH="$PWD/../.venv/Scripts:$PWD/../.venv/bin:$PATH"` (`Scripts` sous Windows, `bin` sous macOS).

## 1. Préparer

- **Le principe** : une mesure ou une position courte, deux fiches (en général deux partis), une seule est la bonne. On apprend à *départager*. Les questions sur une seule fiche vont dans son quiz (skill `quiz-fiche`).
- `answer` et `decoy` sont des **ids de fiches existantes** (`ls src/content/fiches/`).
- **Chaque mesure vient d'un programme sourcé** et figure dans la fiche du parti (section « Programme ») : c'est ce qui rend la question vérifiable. Sinon, compléter d'abord la fiche.
- **Modèle** : le premier thème écrit dans `src/content/quiz/`.

## 2. Écrire

- **Nouveau thème** : `src/content/quiz/<id>.md`, frontmatter seul : `title`, `description`, `questions` (au moins 5 ; viser 12 à 20).
- **Chaque question** :
  ```yaml
  - id: retraite-60-ans          # kebab-case, unique dans le thème
    prompt: "Ramener l'âge légal de départ à la retraite à 60 ans (programme des législatives de 2024)"   # la mesure, avec sa source
    answer: <id du parti qui la propose>
    decoy: <id d'un parti voisin qui ne la propose pas>
    why: "…"                     # 1 à 2 phrases : ce que dit chaque programme
  ```
- **Le leurre doit vraiment tenter** : un parti proche (même famille, ou position voisine sur ce sujet), pas un parti à l'opposé.
- **Neutralité** : formuler la mesure dans les mots du programme, sans la qualifier. Faire tourner les partis : chacun doit être tantôt la réponse, tantôt le leurre.
- **Ne jamais renommer ni réutiliser un `id`** de question.
- **YAML** : chaînes entre guillemets doubles, le fichier **se termine par la ligne `---`**.

## 3. Valider

- L'ajouter aux `themes` d'une unité de `src/content/parcours/parcours.md` où toutes les fiches citées ont déjà été vues : en général un parcours `kind: comparaison` qui requiert les partis comparés. Le build le vérifie.
- `npm run build` doit passer.
