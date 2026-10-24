---
name: Jupyter
kind: plateforme
layers: []
languages: [python, r]
tags: [open-source, data]
difficulty: 1
summary: "Notebooks interactifs : un document où se suivent cellules de code, résultats (tableaux, graphiques) et texte, pour explorer des données pas à pas."
integratesWith:
  - tech: pandas
    note: "Le duo classique de l'exploration : on charge un DataFrame, puis on le regarde et on le transforme cellule par cellule."
  - tech: duckdb
    note: "Des requêtes SQL sur de gros fichiers, lancées et affichées directement dans une cellule."
  - tech: git
    note: "Un notebook se versionne mal avec ses sorties : les vider avant de committer."
---

## Problème résolu

Explorer des données, c'est une suite d'essais : charger un fichier, regarder les premières lignes, tracer une distribution, corriger, recommencer. Avec un script classique, il faut tout relancer à chaque essai et les résultats disparaissent dans le terminal. Le projet Jupyter (issu d'IPython en 2014, son nom évoque Julia, Python et R) propose le **notebook** : un document découpé en cellules, qu'on exécute une à une, et qui garde sous chaque cellule son résultat.

### Le modèle

- **Cellules** : une cellule de code s'exécute et affiche sa sortie juste en dessous (un tableau, un graphique, un message d'erreur). Une cellule Markdown contient du texte explicatif, des titres, des formules.
- **Noyau** (*kernel*) : le processus qui exécute le code. Il garde les variables en mémoire entre deux cellules : une donnée chargée une fois reste disponible pour les suivantes. Le noyau le plus courant est celui de Python ; il en existe pour d'autres langages, dont R et Julia.
- **Fichier `.ipynb`** : le notebook est enregistré en JSON, avec le code, le texte et les sorties.
- **Interfaces** : JupyterLab dans le navigateur, mais aussi les éditeurs (VS Code) et des services hébergés comme Google Colab. JupyterHub sert des notebooks à toute une équipe depuis un serveur partagé.

### Le piège de l'état caché

Les cellules peuvent s'exécuter dans n'importe quel ordre, et le noyau garde tout ce qui a été exécuté, même une cellule modifiée ou supprimée depuis. Un notebook peut donc afficher des résultats impossibles à reproduire en le relançant de haut en bas. Le réflexe : avant de partager, **redémarrer le noyau et tout exécuter dans l'ordre**.

## Quand l'utiliser

- Exploration et nettoyage de données, analyse ponctuelle, prototypage d'un modèle.
- Partager une analyse avec son raisonnement : le code, les graphiques et le texte qui les explique dans un même document.
- Apprendre ou enseigner un langage ou une bibliothèque, en voyant le résultat de chaque étape.

## Quand l'éviter

- **Code de production** (pipelines planifiés, API, bibliothèques) : l'état caché, l'absence de structure et la difficulté à tester en font une mauvaise base. Une fois l'analyse stabilisée, on déplace le code dans des modules Python testés, appelés par un orchestrateur.
- **Travail à plusieurs sur le même notebook** : le JSON avec ses sorties donne des différences illisibles dans Git et des conflits difficiles à résoudre.
- **Traitements longs ou lourds** : le notebook dépend d'un noyau ouvert dans une session. Un job planifié sur un orchestrateur est plus fiable.

## Pour aller plus loin

- [Documentation officielle du projet Jupyter](https://docs.jupyter.org/en/latest/)
- [Documentation de JupyterLab](https://jupyterlab.readthedocs.io/en/stable/)
