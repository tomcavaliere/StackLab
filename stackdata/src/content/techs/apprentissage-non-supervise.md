---
name: Apprentissage non supervisé
kind: concept
layers: []
languages: [python]
tags: [machine-learning, tabulaire]
difficulty: 2
summary: "Faire émerger une structure dans des données sans réponse connue : regrouper ce qui se ressemble, résumer beaucoup de colonnes en peu, repérer ce qui sort de l'ordinaire."
integratesWith:
  - tech: scikit-learn
    note: "Fournit les méthodes classiques : k-means, DBSCAN, ACP, Isolation Forest, avec la même interface que les modèles supervisés."
  - tech: embeddings
    note: "On regroupe souvent des textes ou des images en appliquant un clustering à leurs embeddings plutôt qu'aux données brutes."
---

## Problème résolu

Souvent, on a beaucoup de données mais **aucune étiquette** : des milliers de clients, sans que personne ait noté à quel « type » chacun appartient ; des millions de lignes de logs, sans liste des incidents. L'apprentissage non supervisé ne prédit pas une réponse connue : il cherche une structure dans les données elles-mêmes. Trois usages principaux :

- **Clustering (regroupement)** : former des groupes d'éléments qui se ressemblent. Exemple métier : la **segmentation client**. À partir de la fréquence d'achat, du panier moyen et des catégories achetées, l'algorithme fait ressortir des groupes (« petits acheteurs fréquents », « gros achats rares »…), que le marketing nomme ensuite et cible différemment. L'algorithme le plus connu, **k-means**, demande le nombre de groupes à l'avance et place chaque point dans le groupe dont le centre est le plus proche ; d'autres, comme DBSCAN, trouvent eux-mêmes le nombre de groupes et isolent les points isolés.
- **Réduction de dimension** : résumer de nombreuses colonnes en quelques-unes qui gardent l'essentiel de l'information. L'**ACP** (analyse en composantes principales) en est la méthode de base. Exemple : ramener 50 indicateurs d'un questionnaire à 2 axes pour les afficher sur un graphique, ou alléger les données avant un autre modèle.
- **Détection d'anomalies** : repérer ce qui s'écarte du comportement habituel, sans exemples d'anomalies. Exemple : une machine dont les capteurs dérivent, un compte dont l'activité ne ressemble à rien de connu. Isolation Forest est une méthode courante.

**La difficulté : évaluer.** Sans bonne réponse, il n'y a pas d'erreur à mesurer. Des indicateurs internes existent (le score de silhouette mesure si les groupes sont compacts et bien séparés), mais ils ne disent pas si les groupes sont *utiles*. Le juge final est le métier : les segments sont-ils interprétables, stables d'une période à l'autre, actionnables ? Le résultat dépend aussi fortement de choix humains : les colonnes retenues, leur mise à l'échelle (une colonne en euros écrase une colonne en pourcentage si on ne normalise pas), le nombre de groupes.

## Quand l'utiliser

- Explorer un jeu de données qu'on connaît mal, avant de décider quoi en faire.
- Segmenter des clients, des produits ou des documents quand aucune catégorie n'existe encore.
- Surveiller un système pour repérer des comportements inhabituels quand les anomalies sont rares, variées ou jamais étiquetées.
- Préparer les données d'un autre modèle : réduire le nombre de colonnes, créer une variable « segment ».

## Quand l'éviter

- On dispose d'**étiquettes** pour la question posée : un modèle supervisé répondra plus directement et pourra être mesuré.
- Le métier attend une réponse précise et vérifiable (« ce client va-t-il résilier ? ») : des groupes ne répondent pas à cette question.
- Les catégories sont déjà connues et stables : une règle ou un simple filtre suffit, pas besoin de les « découvrir ».
- Personne ne pourra interpréter ni exploiter les groupes obtenus : le résultat restera une curiosité.

## Pour aller plus loin

- [scikit-learn : apprentissage non supervisé (guide utilisateur)](https://scikit-learn.org/stable/unsupervised_learning.html)
- [scikit-learn : clustering](https://scikit-learn.org/stable/modules/clustering.html)
