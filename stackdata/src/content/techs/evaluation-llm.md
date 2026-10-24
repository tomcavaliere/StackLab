---
name: Évaluation de LLM (evals)
kind: concept
layers: []
tags: [ia-generative]
difficulty: 2
summary: "Mesurer la qualité des réponses d'une application de LLM sur un jeu de cas de test, avec des vérifications par code, un LLM juge ou des relecteurs, pour comparer des versions avant de les livrer."
integratesWith:
  - tech: llm
    note: "Les sorties d'un LLM varient et peuvent se dégrader sans prévenir : seule une mesure régulière le montre."
  - tech: rag
    note: "On évalue la récupération (les bons passages sont-ils retrouvés ?) séparément de la réponse (est-elle fidèle aux passages ?)."
  - tech: github-actions
    note: "Lancer le jeu d'évaluation à chaque modification de prompt ou de modèle, comme des tests."
  - tech: mlflow
    note: "Propose des fonctions d'évaluation de LLM et garde la trace des résultats de chaque version."
---

## Problème résolu

On modifie un prompt, on change de modèle ou de découpage de documents : les réponses sont-elles meilleures ? En essayant trois questions à la main, impossible de le savoir. Et un LLM n'a pas de sortie unique attendue : il n'y a pas de `assertEquals` évident. Les evals rendent la qualité mesurable :

1. **Définir les critères de succès** : exactitude, fidélité aux sources, format, ton, refus quand il faut refuser, latence, coût.
2. **Construire un jeu de cas de test** représentatif, cas difficiles et cas limites compris : questions réelles d'utilisateurs, erreurs déjà rencontrées.
3. **Noter les réponses**, par ordre de préférence :
   - **vérifications par code** quand c'est possible : correspondance exacte, JSON valide, présence d'un mot, classe attendue ; rapides, fiables, gratuites ;
   - **LLM juge** : un modèle note la réponse selon une grille précise ; utile pour des critères subjectifs, mais il a ses biais et doit lui-même être vérifié par sondage contre des notes humaines ;
   - **évaluation humaine** : la plus fiable, la plus lente et la plus chère, à réserver à l'étalonnage et aux cas ambigus.
4. **Comparer les versions** sur le même jeu à chaque changement, et surveiller en production (retours des utilisateurs, échantillons notés).

Les benchmarks publics comparent des modèles entre eux ; ils ne disent pas si votre application répond bien à vos utilisateurs.

## Quand l'utiliser

- Dès qu'une application de LLM doit aller en production, ou qu'on hésite entre deux prompts ou deux modèles.
- Avant de changer de version de modèle : vérifier qu'aucun cas qui marchait ne se dégrade.
- RAG : savoir si une mauvaise réponse vient de la récupération ou de la rédaction.

## Quand l'éviter

- Exploration du tout premier prototype : quelques essais à la main suffisent pour savoir si l'idée tient. Commencer le jeu de test dès que le prototype devient un produit.
- Se reposer sur un LLM juge sans jamais le confronter à des notes humaines : on mesure alors les préférences du juge.
- Choisir un modèle sur un classement public seulement : il faut le tester sur ses propres cas.

## Pour aller plus loin

- [Définir des critères de succès et construire des évaluations (documentation Claude)](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests)
