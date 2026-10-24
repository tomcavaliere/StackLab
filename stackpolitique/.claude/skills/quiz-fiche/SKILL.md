---
name: quiz-fiche
description: Écrire ou compléter le quiz QCM d'une fiche StackPolitique (src/content/quiz-fiche/<id>.md). À utiliser quand l'utilisateur demande « écris le quiz de X », « ajoute des questions au quiz de X », ou après la création d'une fiche.
---

# Écrire le quiz d'une fiche

La procédure de référence est « Procédure : écrire ou compléter le quiz d'une fiche » dans `stackpolitique/CLAUDE.md`.

Toutes les commandes se lancent en bash depuis le dossier `stackpolitique/`, avec ce préfixe : `export PATH="$PWD/../.venv/Scripts:$PWD/../.venv/bin:$PATH"` (`Scripts` sous Windows, `bin` sous macOS).

## 1. Préparer

- Le fichier s'appelle `src/content/quiz-fiche/<id>.md`, où `<id>` est l'id exact de la fiche, qui doit exister.
- **Lire la fiche d'abord** : le quiz ne pose que ce qu'elle documente. Une question dont la réponse n'y est pas oblige d'abord à compléter la fiche (avec sa source).
- **Modèles** : `src/content/quiz-fiche/cinquieme-republique.md`, `clivage-gauche-droite.md`.
- **Compléter un quiz existant** : ne jamais renommer ni réutiliser un `id` de question (il porte l'historique en base). Le texte des options peut être corrigé.

## 2. Écrire

- Frontmatter seul, une clé `questions`, **20 questions** (une session en pose 10, le renforcement sert les 10 autres ; le build avertit en dessous de 20).
- Chaque question : `id` (kebab-case, unique, pas un mot réservé YAML), `prompt` (se comprend seul : les questions sont mélangées), `answer`, `decoys` (2 ou 3, faux mais plausibles), `why` (1 à 2 phrases appuyées sur la fiche).
- **Angles variés** : dates et origines, idées et valeurs, mesures du programme (avec leur année), figures et rôles, résultats électoraux, idées reçues de la fiche.
- **Neutralité** : une question porte sur un fait ou sur ce que le parti dit (« Que propose le parti dans son programme de 2024 sur… ? »), jamais sur un jugement de valeur.
- **YAML** : chaînes entre guillemets doubles, le fichier **se termine par la ligne `---`**. Un `id` est en ASCII sans accent (`seuil-releve`, pas `seuil-relevé`) et n'est jamais un nombre seul (`1981` est lu comme un nombre : écrire `mitterrand-1981`).

## 3. La bonne réponse ne doit pas se deviner à sa longueur

- Leurres aussi précis que la réponse ; la bonne réponse est la plus longue au plus une fois sur trois environ.
- `node scripts/check-quality.mjs lengths <id>` liste les questions concernées, avec la longueur de la réponse et du plus long leurre : allonger un leurre (une précision fausse mais crédible) et relancer jusqu'à ce que rien ne soit signalé.
- Le piège le plus fréquent : des leurres courts et visiblement faux face à une réponse précise. Écrire d'emblée des leurres aussi détaillés que la réponse.

## 4. Valider

- `npm run build` doit passer (fiche existante, ids et options sans doublon).
