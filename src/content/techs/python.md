---
name: Python
kind: langage
layers: []
tags: [typage-dynamique, open-source, data]
difficulty: 1
summary: "Langage généraliste réputé pour sa lisibilité, dominant en data et en machine learning, très utilisé aussi pour les back-ends web."
---

## Problème résolu

Python (Guido van Rossum, 1991) privilégie un code court et lisible, avec une bibliothèque standard très fournie. Son vrai atout est son écosystème : NumPy, pandas, scikit-learn et PyTorch en ont fait le langage de référence de l'analyse de données et du machine learning, tandis que Django, Flask et FastAPI couvrent le développement web.

Le typage est dynamique, avec des annotations de type optionnelles que des outils comme mypy ou les éditeurs vérifient. L'interpréteur de référence, CPython, a un verrou global (GIL) qui empêche plusieurs threads d'exécuter du code Python en parallèle. CPython propose depuis la version 3.13 une variante sans GIL, encore optionnelle.

## Quand l'utiliser

- Data, analyse, machine learning, scripts d'automatisation : l'écosystème n'a pas d'équivalent.
- Back-end web ou API quand l'équipe connaît Python, en particulier si le produit touche aussi à la data.
- Équipe mixte développeurs et data : un langage commun.

## Quand l'éviter

- Calcul intensif écrit en Python pur : l'interpréteur est lent sur les boucles ; les bibliothèques rapides (NumPy, Polars…) déportent le calcul dans du code natif.
- Application mobile ou code exécuté dans le navigateur : ce n'est pas son terrain.
- Distribution d'un binaire autonome : packager une application Python avec ses dépendances reste moins simple qu'avec Go.

## Pour aller plus loin

- [Tutoriel officiel](https://docs.python.org/fr/3/tutorial/)
- [Documentation Python](https://docs.python.org/3/)
