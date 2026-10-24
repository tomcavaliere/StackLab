---
name: PyTorch
kind: framework
layers: [ml]
languages: [python]
tags: [open-source, machine-learning, deep-learning]
difficulty: 3
summary: "Framework de deep learning : des tenseurs calculés sur GPU, une différentiation automatique et une exécution immédiate qui se code comme du Python ordinaire."
alternatives:
  - tech: tensorflow
    note: "Écosystème Google, avec Keras et des outils de déploiement mobile et embarqué (LiteRT)."
integratesWith:
  - tech: hugging-face
    note: "La bibliothèque Transformers et une grande partie des modèles publiés sur le Hub s'utilisent avec PyTorch."
---

## Problème résolu

Entraîner un réseau de neurones profond, c'est enchaîner un très grand nombre d'opérations sur des tableaux de nombres (tenseurs), calculer le gradient de l'erreur par rapport à chaque paramètre, puis mettre les paramètres à jour, assez vite pour que ce soit faisable. PyTorch (lancé par Facebook AI Research en 2016, hébergé par la PyTorch Foundation de la Linux Foundation depuis 2022) fournit les tenseurs sur GPU, la différentiation automatique (`autograd`) et les briques des réseaux : couches, fonctions de perte, optimiseurs.

Son exécution est immédiate (*eager*) : le graphe de calcul se construit pendant que le code Python s'exécute, ce qui permet d'utiliser des boucles, des conditions et le débogueur habituel. Depuis la version 2.0, `torch.compile` permet en plus de compiler un modèle pour l'accélérer.

## Quand l'utiliser

- Deep learning sur images, texte, son ou vidéo, à l'entraînement comme à l'inférence.
- Recherche et prototypage : il est très répandu dans la recherche en apprentissage profond.
- Travail avec des modèles de langage ou des modèles pré-entraînés : une grande partie de l'écosystème (Hugging Face, serveurs d'inférence comme vLLM) repose sur PyTorch.

## Quand l'éviter

- Problème tabulaire simple (prédire une valeur à partir de quelques dizaines de colonnes) : scikit-learn ou XGBoost donnent souvent d'aussi bons résultats, plus vite et avec beaucoup moins de code. PyTorch y est surdimensionné.
- Simple appel à un modèle de langage hébergé : une API (OpenAI, Claude) suffit, sans entraîner ni faire tourner de modèle soi-même.
- Équipe sans GPU ni compétences en deep learning : le coût d'entrée (matériel, réglages, suivi des entraînements) est élevé.

## Pour aller plus loin

- [Documentation officielle](https://pytorch.org/docs/stable/)
- [Tutoriels officiels](https://pytorch.org/tutorials/)
