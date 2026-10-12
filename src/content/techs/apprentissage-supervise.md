---
name: Apprentissage supervisé
kind: concept
layers: []
languages: [python]
tags: [machine-learning, tabulaire]
difficulty: 2
summary: "Apprendre à prédire une réponse connue (une catégorie ou un nombre) à partir d'exemples passés dont on connaît déjà la bonne réponse."
alternatives:
  - tech: apprentissage-non-supervise
    note: "Quand on n'a pas d'étiquettes et qu'on cherche à découvrir une structure (groupes, anomalies) plutôt qu'à prédire une réponse connue."
integratesWith:
  - tech: scikit-learn
    note: "La boîte à outils de référence en Python : découpage des données, modèles classiques, validation croisée, métriques."
  - tech: xgboost
    note: "Le gradient boosting, souvent le modèle le plus performant sur des données tabulaires (lignes et colonnes)."
---

## Problème résolu

Beaucoup de décisions métier reviennent à deviner une réponse à partir d'indices : ce client va-t-il résilier ? cette transaction est-elle une fraude ? combien vaut cet appartement ? Écrire ces règles à la main devient vite impossible. L'apprentissage supervisé les apprend à partir d'**exemples étiquetés** : des cas passés pour lesquels on connaît la bonne réponse (le client a résilié ou non, la transaction était frauduleuse ou non). Le modèle cherche le lien entre les indices (les *features*, ou variables d'entrée) et la réponse (la *cible*), puis l'applique aux nouveaux cas.

Deux familles de problèmes :

- **Classification** : la réponse est une catégorie. Exemple : un e-mail est « spam » ou « pas spam » ; un client « va résilier » ou « va rester ».
- **Régression** : la réponse est un nombre. Exemple : le prix d'un appartement d'après sa surface, son quartier et son étage ; le nombre de ventes de la semaine prochaine.

**Évaluer honnêtement.** Un modèle doit être jugé sur des données qu'il n'a jamais vues. On découpe donc les données en trois : le jeu d'**entraînement** (pour apprendre), le jeu de **validation** (pour comparer les modèles et régler leurs paramètres) et le jeu de **test** (consulté une seule fois, à la fin, pour estimer la performance réelle). La validation croisée fait tourner le rôle de validation entre plusieurs morceaux quand les données sont peu nombreuses.

**Surapprentissage et sous-apprentissage.** Un modèle qui *surapprend* a mémorisé les exemples, bruit compris : excellent sur l'entraînement, mauvais sur des données nouvelles, comme un élève qui apprend les corrigés par cœur. Un modèle qui *sous-apprend* est trop simple pour capter le lien : mauvais partout. L'écart entre le score d'entraînement et celui de validation sert de signal.

**Fuite de données (data leakage).** Le piège le plus fréquent : une information indisponible au moment de la prédiction se glisse dans l'entraînement. Exemple : pour prédire la résiliation, utiliser la colonne « date de clôture du compte », qui n'est remplie qu'*après* la résiliation. Autre forme : calculer une normalisation ou une sélection de variables sur toutes les données avant de les découper. Le score paraît excellent, puis s'effondre en production.

**Les métriques.** En classification : la **précision** (parmi les cas signalés comme fraude, combien le sont vraiment), le **rappel** (parmi les vraies fraudes, combien sont détectées), le **F1** (qui combine les deux) et l'**AUC** (capacité à classer les cas positifs au-dessus des négatifs, quel que soit le seuil choisi). En régression : la **MAE** (erreur absolue moyenne, dans l'unité de la cible : « on se trompe de 12 000 € en moyenne ») et la **RMSE** (qui pénalise plus fortement les grosses erreurs).

**Classes déséquilibrées.** Si 1 transaction sur 1 000 est frauduleuse, un modèle qui répond toujours « pas fraude » a 99,9 % d'**exactitude** (accuracy)… et ne détecte aucune fraude. L'exactitude seule trompe dès que les classes sont déséquilibrées : regarder la précision, le rappel et le F1 de la classe rare.

**Toujours commencer par une baseline.** Avant un modèle complexe, mesurer une référence simple : prédire la classe majoritaire, la moyenne, ou appliquer une règle métier évidente. Si le modèle ne fait pas nettement mieux, il ne vaut pas sa complexité.

## Quand l'utiliser

- On dispose d'exemples passés **avec la bonne réponse** (historique de résiliations, transactions vérifiées, ventes réalisées), en quantité suffisante.
- La réponse dépend de beaucoup d'indices combinés de façon difficile à écrire en règles : scoring de risque, prévision de demande, détection de fraude, priorisation de tickets.
- On peut mesurer l'erreur et décider d'un seuil acceptable avec le métier.

## Quand l'éviter

- **Pas d'étiquettes**, et les obtenir coûterait trop cher (annotation manuelle) : regarder l'apprentissage non supervisé, ou commencer par étiqueter un échantillon.
- **Une règle métier simple suffit** : « bloquer les paiements de plus de 10 000 € depuis un nouveau pays » est plus lisible, plus facile à auditer et à corriger qu'un modèle.
- Le passé ne ressemble plus à l'avenir (nouveau produit, changement de réglementation) : le modèle apprend des régularités qui n'existent plus.
- Il faut justifier chaque décision au cas par cas et le modèle retenu n'est pas explicable : préférer un modèle simple (régression logistique, arbre de décision) ou des règles.

## Pour aller plus loin

- [scikit-learn : apprentissage supervisé (guide utilisateur)](https://scikit-learn.org/stable/supervised_learning.html)
- [scikit-learn : métriques d'évaluation](https://scikit-learn.org/stable/modules/model_evaluation.html)
- [scikit-learn : pièges courants, dont la fuite de données](https://scikit-learn.org/stable/common_pitfalls.html)
