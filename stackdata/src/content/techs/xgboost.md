---
name: XGBoost
kind: framework
layers: [ml]
languages: [python]
tags: [open-source, machine-learning, tabulaire]
difficulty: 2
summary: "Bibliothèque de gradient boosting d'arbres de décision : une référence pour la prédiction sur données tabulaires structurées."
alternatives:
  - tech: pytorch
    note: "Pour des images, du texte ou du son bruts : le deep learning apprend lui-même les représentations."
integratesWith:
  - tech: spark
    note: "XGBoost propose une intégration PySpark pour entraîner sur un cluster."
---

## Problème résolu

Sur des données en tableau (clients, transactions, capteurs), un seul arbre de décision est trop simple ou sur-apprend vite. Le *gradient boosting* entraîne une suite d'arbres, chacun corrigeant les erreurs des précédents, et additionne leurs prédictions. XGBoost (projet lancé par Tianqi Chen en 2014, open-source) en est une implémentation optimisée et régularisée : il gère nativement les valeurs manquantes, parallélise le calcul et peut utiliser un GPU.

Ses classes `XGBClassifier` et `XGBRegressor` suivent l'API de scikit-learn : elles s'insèrent dans un pipeline, une validation croisée ou une recherche d'hyperparamètres. Il s'utilise aussi depuis R ou Java, et en distribué (Spark, Dask). LightGBM et CatBoost sont deux autres bibliothèques de gradient boosting, de même usage.

## Quand l'utiliser

- Classification ou régression sur des données tabulaires structurées : c'est souvent le modèle à battre, très présent dans les compétitions de data science.
- Besoin d'un modèle performant sans réseau de neurones : il s'entraîne sur CPU, en un temps raisonnable sur des volumes moyens.
- Besoin de savoir quelles variables comptent : il fournit des importances de variables.

## Quand l'éviter

- Images, texte ou son bruts : ce ne sont pas des colonnes bien définies, le deep learning (PyTorch, TensorFlow) est fait pour ça.
- Petit jeu de données ou besoin d'un modèle très facile à expliquer : une régression linéaire ou un arbre simple (scikit-learn) peuvent suffire.
- Pas de temps pour le réglage : profondeur des arbres, taux d'apprentissage et nombre d'arbres se règlent par validation croisée, sinon on sur-apprend facilement.

## Pour aller plus loin

- [Documentation officielle](https://xgboost.readthedocs.io/en/stable/)
- [Introduction aux arbres boostés](https://xgboost.readthedocs.io/en/stable/tutorials/model.html)
