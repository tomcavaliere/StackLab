---
name: scikit-learn
kind: framework
layers: [ml]
languages: [python]
tags: [open-source, machine-learning, tabulaire]
difficulty: 2
summary: "Bibliothèque Python de machine learning « classique » : régression, classification, clustering et prétraitement derrière une même API fit / predict / transform."
alternatives:
  - tech: pytorch
    note: "Pour du deep learning (images, texte, son) ou des modèles qui ont besoin d'un GPU."
integratesWith:
  - tech: pandas
    note: "On prépare les données en DataFrame, puis on les passe directement aux estimateurs."
  - tech: xgboost
    note: "XGBoost fournit des estimateurs compatibles : ils se glissent dans un pipeline ou une validation croisée scikit-learn."
---

## Problème résolu

Entraîner un modèle prédictif sur des données tabulaires (prédire un prix, détecter un client qui va partir, regrouper des profils) demande toujours les mêmes étapes : préparer les colonnes, choisir un algorithme, l'évaluer honnêtement, régler ses paramètres. scikit-learn (projet né en 2007, open-source sous licence BSD) rassemble ces étapes dans une seule bibliothèque Python.

Tous ses objets suivent la même API : un estimateur apprend avec `fit` et prédit avec `predict`, un transformateur modifie les données avec `transform`. On remplace une régression logistique par une forêt aléatoire en changeant une ligne. Les `Pipeline` enchaînent prétraitement et modèle pour que les mêmes transformations s'appliquent à l'entraînement et à la prédiction, sans fuite d'information du jeu de test vers l'entraînement. La validation croisée, la recherche d'hyperparamètres et les métriques d'évaluation sont fournies.

## Quand l'utiliser

- Apprentissage supervisé ou non supervisé sur des données tabulaires qui tiennent en mémoire : régression, classification, clustering, réduction de dimension.
- Construire une base de comparaison (baseline) simple et solide avant d'essayer plus compliqué.
- Prétraitement et évaluation, même quand le modèle final vient d'ailleurs : XGBoost, par exemple, s'utilise avec ses outils.

## Quand l'éviter

- Deep learning sur images, texte ou son : scikit-learn n'est pas conçu pour les réseaux de neurones profonds, PyTorch ou TensorFlow le sont.
- Calcul sur GPU : scikit-learn tourne essentiellement sur CPU ; un support expérimental (via l'Array API) existe pour quelques estimateurs seulement.
- Données qui ne tiennent pas dans la mémoire d'une machine : il faut alors un outil distribué (Spark MLlib, par exemple) ou échantillonner.

## Pour aller plus loin

- [Documentation officielle](https://scikit-learn.org/stable/)
- [Guide utilisateur](https://scikit-learn.org/stable/user_guide.html)
