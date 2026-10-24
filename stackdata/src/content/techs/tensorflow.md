---
name: TensorFlow
kind: framework
layers: [ml]
languages: [python, javascript]
tags: [open-source, machine-learning, deep-learning]
difficulty: 3
summary: "Framework de deep learning de Google, avec Keras comme API haut niveau et des outils pour déployer les modèles sur serveur, mobile, embarqué et navigateur."
---

## Problème résolu

Comme PyTorch, TensorFlow (Google, open-source depuis 2015) fournit des tenseurs calculés sur CPU, GPU ou TPU, la différentiation automatique et les briques pour construire et entraîner des réseaux de neurones. Depuis TensorFlow 2 (2019), l'exécution est immédiate par défaut et Keras est l'API haut niveau recommandée : on décrit un modèle couche par couche, puis `fit` l'entraîne. Keras 3 est devenu multi-backend : le même code Keras peut tourner sur TensorFlow, JAX ou PyTorch.

Son point fort est le déploiement : TF Serving sert des modèles derrière une API, LiteRT (anciennement TensorFlow Lite) les exécute sur mobile et sur des appareils embarqués, TensorFlow.js dans le navigateur.

## Quand l'utiliser

- Projet déjà construit sur TensorFlow ou Keras : l'existant, les compétences et les outils de production comptent plus que le choix initial.
- Déploiement sur mobile, embarqué ou navigateur, où son outillage (LiteRT, TensorFlow.js) est mature.
- Entraînement sur TPU dans Google Cloud.

## Quand l'éviter

- Nouveau projet de recherche ou travail centré sur les modèles de langage récents : ces dernières années, PyTorch s'est imposé comme le choix le plus courant dans la recherche et dans l'écosystème Hugging Face (tendance générale, sans chiffre précis ici).
- Problème tabulaire simple : scikit-learn ou XGBoost suffisent ; un réseau de neurones y est surdimensionné.
- Simple appel à un modèle hébergé : une API suffit.

## Pour aller plus loin

- [Documentation officielle (guides)](https://www.tensorflow.org/guide)
- [Documentation de Keras](https://keras.io/)
