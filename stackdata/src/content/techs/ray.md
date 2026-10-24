---
name: Ray
kind: moteur-traitement
layers: [traitement-data, ml]
languages: [python]
tags: [open-source, distribue, machine-learning]
difficulty: 3
summary: "Framework open-source pour répartir du code Python sur un cluster : tâches et acteurs distribués, avec des bibliothèques pour le traitement de données, l'entraînement, l'optimisation d'hyperparamètres et l'inférence."
alternatives:
  - tech: spark
    note: "Référence du traitement de données distribué en SQL et DataFrames ; Ray est plus généraliste et plus orienté Python et ML (GPU, entraînement, inférence)."
  - tech: celery
    note: "File de tâches pour du travail en arrière-plan d'une application web, pas pour du calcul distribué avec état et GPU."
integratesWith:
  - tech: pytorch
    note: "Ray Train répartit un entraînement PyTorch sur plusieurs machines et GPU."
  - tech: vllm
    note: "vLLM peut s'appuyer sur Ray pour répartir un modèle sur plusieurs nœuds."
  - tech: kubernetes
    note: "KubeRay déploie et dimensionne des clusters Ray sur Kubernetes."
  - tech: python
    note: "On écrit du Python ordinaire, décoré pour s'exécuter à distance."
---

## Problème résolu

Un traitement Python devient trop lent ou trop gros pour une machine : prétraiter des millions d'images, entraîner sur plusieurs GPU, tester des centaines de combinaisons d'hyperparamètres, servir un modèle à forte charge. Le réécrire pour un autre moteur coûte cher. **Ray Core** distribue du Python presque tel quel :

- une fonction décorée `@ray.remote` devient une **tâche**, exécutée sur un nœud du cluster ; l'appel renvoie une référence vers le futur résultat ;
- une classe décorée devient un **acteur** : un processus distant qui garde un état (un modèle chargé en mémoire, par exemple) ;
- on déclare les ressources demandées (CPU, GPU), et l'ordonnanceur place le travail.

Au-dessus, des bibliothèques spécialisées : **Ray Data** (traitement de données en flux, souvent pour l'inférence par lots ou l'entraînement), **Ray Train** (entraînement distribué), **Ray Tune** (optimisation d'hyperparamètres), **Ray Serve** (servir des modèles). Licence Apache 2.0 ; offre managée par Anyscale, l'entreprise fondée par ses créateurs.

## Quand l'utiliser

- Charges de ML qui dépassent une machine : entraînement multi-GPU, inférence par lots à grande échelle, recherche d'hyperparamètres.
- Pipelines Python hétérogènes (CPU pour le prétraitement, GPU pour le modèle) qu'on veut faire tourner dans un même cluster.
- Équipe ML qui veut passer de son poste au cluster sans changer de langage ni de modèle de programmation.

## Quand l'éviter

- Les données tiennent sur une machine : pandas, DuckDB ou scikit-learn suffisent, sans cluster à opérer.
- Transformations de données tabulaires en SQL : un entrepôt de données ou Spark sont plus naturels.
- Tâches de fond d'une application web (courriels, exports) : une file de tâches est plus simple.
- Pas d'équipe pour opérer un cluster : passer par une offre managée ou réduire le besoin.

## Pour aller plus loin

- [Documentation officielle](https://docs.ray.io/en/latest/)
- [Dépôt GitHub](https://github.com/ray-project/ray)
