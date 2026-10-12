---
name: Deep learning
kind: concept
layers: []
languages: [python]
tags: [machine-learning, deep-learning]
difficulty: 3
summary: "Apprentissage par des réseaux de neurones à nombreuses couches, qui apprennent eux-mêmes leurs représentations à partir de données brutes : images, texte, audio."
alternatives:
  - tech: xgboost
    note: "Sur des données tabulaires (lignes et colonnes), surtout en petit volume : le gradient boosting est souvent aussi bon ou meilleur, plus rapide à entraîner et plus simple à régler."
integratesWith:
  - tech: pytorch
    note: "Le framework le plus utilisé pour définir et entraîner des réseaux de neurones, en recherche comme en production."
  - tech: tensorflow
    note: "L'autre grand framework de deep learning, avec Keras comme interface de haut niveau."
  - tech: llm
    note: "Les LLM sont des réseaux de deep learning de type transformer, entraînés sur d'énormes corpus de texte."
  - tech: embeddings
    note: "Un embedding est la représentation apprise par un réseau de neurones : un vecteur qui capture le sens d'un texte ou d'une image."
---

## Problème résolu

Avec l'apprentissage classique, il faut décrire les données au modèle sous forme de colonnes utiles : pour reconnaître un chat sur une photo, quelqu'un devrait inventer des indicateurs (« présence d'oreilles pointues »…). Personne ne sait écrire ces indicateurs pour des pixels, des sons ou des phrases. Le deep learning contourne le problème : un **réseau de neurones** empile de nombreuses couches de calcul, et chaque couche transforme la sortie de la précédente. Pendant l'entraînement, le réseau ajuste des millions de poids, ou bien plus, pour réduire son erreur. Ce faisant, il **apprend ses propres représentations** : sur des images, les premières couches détectent des bords et des textures, les suivantes des formes, les dernières des objets entiers.

Exemples métier :

- **Images** : contrôle qualité qui repère les pièces défectueuses sur une chaîne de production à partir de photos.
- **Texte** : tri automatique des e-mails du support par motif, traduction, résumé.
- **Audio** : transcription des appels d'un centre de relation client.

Le deep learning a percé au début des années 2010, notamment en reconnaissance d'images, quand trois ingrédients se sont rencontrés : de grands jeux de données, des **GPU** capables de faire les calculs en parallèle, et des améliorations des techniques d'entraînement. En 2017, l'architecture **transformer** (article « Attention Is All You Need ») a remplacé les approches précédentes pour le texte ; elle est à la base des LLM actuels.

Ce que cela coûte :

- **Beaucoup de données** : entraîner un réseau depuis zéro demande en général beaucoup d'exemples étiquetés. Le plus souvent, on part d'un modèle déjà entraîné (*pré-entraîné*) et on l'adapte à son cas (*transfer learning* ou *fine-tuning*), ce qui réduit fortement ce besoin.
- **Du calcul** : l'entraînement se fait sur GPU ; sur un simple processeur, il devient vite trop lent.
- **De l'opacité** : expliquer pourquoi un réseau a pris une décision est difficile.
- **Du réglage** : architecture, taux d'apprentissage, taille des lots… les choix sont nombreux et l'entraînement peut échouer silencieusement.

## Quand l'utiliser

- Données **non structurées** : images, vidéo, texte libre, audio. C'est là que le deep learning domine nettement.
- Un modèle pré-entraîné existe pour un problème proche : on l'adapte au lieu de partir de zéro.
- On a accès aux GPU (en local, dans le cloud ou via un service managé) et à des données en volume.
- Pour le texte, avant d'entraîner quoi que ce soit, vérifier si un LLM ou des embeddings existants ne suffisent pas.

## Quand l'éviter

- **Petites données tabulaires** (un fichier clients, des transactions en lignes et colonnes) : le gradient boosting (XGBoost) est souvent aussi bon ou meilleur, plus simple à entraîner et à expliquer. Des études comparatives publiées vont dans ce sens, par exemple Grinsztajn, Oyallon et Varoquaux (2022), « Why do tree-based models still outperform deep learning on tabular data? ».
- Peu d'exemples et aucun modèle pré-entraîné adapté : le réseau surapprendra.
- Chaque décision doit être expliquée et auditée (crédit, décisions réglementées) : préférer un modèle plus lisible.
- Pas de budget de calcul, ou une règle simple résout déjà le problème.

## Pour aller plus loin

- [PyTorch : Learn the Basics (tutoriel officiel)](https://docs.pytorch.org/tutorials/beginner/basics/intro.html)
- [Deep Learning, Goodfellow, Bengio et Courville (livre en ligne, MIT Press)](https://www.deeplearningbook.org/)
