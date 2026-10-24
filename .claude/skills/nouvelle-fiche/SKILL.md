---
name: nouvelle-fiche
description: Écrire une ou plusieurs nouvelles fiches techno StackLab (src/content/techs/<id>.md), avec leurs verdicts dans les scénarios et leur quiz. À utiliser quand l'utilisateur demande « ajoute une fiche », « ajoute la techno X », « crée des fiches sur … ».
---

# Écrire une nouvelle fiche techno

La procédure de référence est « Procédure : ajouter une fiche techno » dans CLAUDE.md. Ce skill la déroule et ajoute les pièges rencontrés.

Toutes les commandes se lancent en bash depuis la racine, avec ce préfixe : `export PATH="$PWD/.venv/Scripts:$PWD/.venv/bin:$PATH"` (`Scripts` sous Windows, `bin` sous macOS).

## 1. Cadrer avant d'écrire

- **id** : le nom du fichier, en kebab-case ASCII minuscule (`aws-s3`). Vérifier qu'il n'existe pas déjà : `ls src/content/techs/`.
- **kind** et **layers** : prendre les valeurs dans `src/lib/taxonomy.ts`. `layers: []` pour un langage ou un concept : ce n'est alors pas une carte du jeu, et il n'y a pas de verdict à écrire.
- **Plusieurs fiches à la fois** : fixer d'abord la liste complète des ids, des kinds et des layers. Les fiches peuvent alors se référencer entre elles, et des agents parallèles s'en servent comme contrat.
- **Ajouter une couche** à une fiche multiplie les verdicts à écrire, un dans chaque scénario qui l'utilise. Ne mettre que les couches où la carte a vraiment sa place.

## 2. Écrire la fiche

- **Modèles** : partir de `src/content/techs/postgresql.md` pour une techno, de `sql.md` pour un langage, de `rest.md` pour un concept.
- **Frontmatter** : `name`, `kind`, `layers`, `languages` (ids des langages dans lesquels *on écrit*), `tags`, `difficulty` (1 à 3), `summary` (une phrase, affichée sur les cartes et dans l'animation), `alternatives`, `integratesWith`.
- **Tags** : réutiliser l'existant avant d'en créer : `grep -h "^tags:" src/content/techs/*.md | tr -d '[]' | sed 's/tags://' | tr ',' '\n' | sed 's/ //g' | sort | uniq -c | sort -rn`. Le tag `streaming` sur une carte de cache-messaging, et `vectoriel` sur une base vectorielle, changent l'animation du jeu : ne les mettre qu'à bon escient.
- **Relations** : une relation déclarée dans un seul sens s'affiche des deux côtés. Ne pas la déclarer deux fois, et ne référencer que des fiches existantes, sinon le build échoue.
- **Corps** : 4 titres `##` : `Problème résolu`, `Quand l'utiliser`, `Quand l'éviter`, `Pour aller plus loin`.
- **Langage** (`kind: langage`) : 2 titres de plus, entre « Quand l'éviter » et « Pour aller plus loin » :
  - `## Syntaxe`, découpé en `###` avec un court bloc de code chacun : variables et types, conditions, boucles, collections, fonctions, puis les particularités du langage ;
  - `## Exemples concrets` : 2 ou 3 extraits réalistes et commentés.
  Le build les exige. Modèle : `sql.md` ou `python.md`.
- **Style** : phrases courtes et concrètes, ton pédagogique, sans marketing. Typographie française (espace avant « : ; ? ! », guillemets « »).

## 3. Exactitude

- Aucun chiffre de performance, de prix ou de taille inventé. En cas de doute, écrire l'incertitude dans la fiche ou ne rien mettre.
- Pas de version précise de produit ni de modèle qui se périme vite : parler de familles ou de principes.
- Dans « Pour aller plus loin », mettre de la documentation officielle. Vérifier les URLs avec WebFetch quand c'est possible.
- Signaler à l'utilisateur, en fin de travail, ce qui a été écrit de mémoire sans vérification (dates, historique, fonctionnalités récentes).

## 4. Verdicts dans les scénarios (si `layers` n'est pas vide)

- `node scripts/check-quality.mjs verdicts` liste, pour chaque scénario, les cartes sans verdict dans une couche requise ou optionnelle.
- Pour chacune, ajouter dans `src/content/scenarios/<id>.md`, sous `verdicts.<couche>` : `- { tech: <id>, verdict: ideal|acceptable|surdimensionne|inadapte, why: "une phrase liée au brief" }`.
- Le `why` justifie le verdict par les contraintes du scénario (équipe, budget, volume…), pas par des généralités.
- Relancer jusqu'à « OK » partout.

## 5. Quiz, exercices, parcours et validation

- Écrire le quiz de la fiche avec le skill `quiz-techno` : sans quiz, la fiche ne peut pas être une leçon du parcours. Chaque réponse du quiz doit se trouver dans la fiche.
- **Langage** : écrire ses exercices, `src/content/exercises/<id>.md` (procédure « exercices de code » dans CLAUDE.md). Pour SQL, Python, JavaScript et TypeScript, `npm run check:exercises <id>` exécute les solutions. Pour les autres langages, vérifier les sorties avec leur playground.
- Placer la fiche dans `src/content/parcours/parcours.md` : ajouter son id aux `lessons` du module de compétence qui lui correspond (`kind: competence`), à sa place dans l'ordre (difficulté croissante, prérequis d'abord), et aux parcours métier où elle compte (technos `essential` du métier en priorité). Le build échoue si une fiche n'est dans aucun parcours, figure deux fois dans un parcours (ou dans un parcours et ceux qu'il requiert), et si un thème cite une techno placée après lui.
- `npm run build` doit passer. Une erreur `EPERM` lors du « Rearranging server assets » vient d'un fichier verrouillé dans `dist` : supprimer `dist` (`rm -rf dist`) et relancer.
- Si le serveur de dev tourne, il ne revalide pas une fiche dont la cible vient d'apparaître : réenregistrer le fichier.
