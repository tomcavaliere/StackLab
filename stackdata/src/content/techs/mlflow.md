---
name: MLflow
kind: plateforme
layers: [ml]
languages: [python]
tags: [open-source, mlops, offre-managee]
difficulty: 2
summary: "Plateforme open-source du cycle de vie des modèles : suivi des expériences, registre de modèles, packaging et déploiement, et suivi des applications LLM."
alternatives:
  - tech: aws-sagemaker
    note: "Tout le cycle (notebooks, entraînement, suivi, déploiement) en service managé sur AWS, au prix de la dépendance au fournisseur."
integratesWith:
  - tech: python
    note: "API principale en Python : quelques appels (ou l'autolog) suffisent à enregistrer une exécution."
  - tech: airflow
    note: "Airflow planifie l'entraînement ; MLflow en garde la trace et versionne le modèle produit."
  - tech: dagster
    note: "Même partage des rôles : Dagster orchestre, MLflow suit les expériences et les modèles."
  - tech: aws-s3
    note: "Stockage courant des artefacts (modèles, fichiers) d'un serveur MLflow auto-hébergé."
---

## Problème résolu

Entraîner un modèle, c'est des dizaines d'essais : quels paramètres, quelles données, quel score, quel fichier de modèle ? Sans outil, ces informations finissent dans des notebooks et des noms de fichiers. MLflow les centralise.

- **Tracking** : chaque exécution enregistre ses paramètres, ses métriques et ses artefacts (modèle, graphiques), consultables et comparables dans une interface web.
- **Registre de modèles** : les modèles sont versionnés, annotés et promus (par alias ou étiquettes) vers la production.
- **Packaging et service** : un format de modèle commun à de nombreuses bibliothèques, qu'on peut servir derrière une API REST ou déployer vers d'autres plateformes.
- **Applications LLM** : traçage des appels (prompts, outils, réponses, compatible OpenTelemetry), évaluation avec des « LLM juges » et gestion versionnée des prompts.

Open-source, projet de la Linux Foundation ; créé par Databricks, qui en propose une version managée, comme d'autres clouds (dont SageMaker).

## Quand l'utiliser

- Une équipe qui entraîne des modèles et veut savoir quelle exécution a produit quel modèle, et pouvoir revenir en arrière.
- Rester indépendant d'un cloud : MLflow tourne en local, sur un serveur maison ou en offre managée.
- Suivre et évaluer une application LLM (RAG, agent) sans adopter un outil propriétaire de plus.

## Quand l'éviter

- Planifier et enchaîner les étapes d'un pipeline (extraction, entraînement, déploiement) : MLflow ne le fait pas, c'est le rôle d'un orchestrateur comme Airflow ou Dagster.
- Un seul modèle simple, entraîné rarement : un script et un fichier versionné peuvent suffire.
- Serveur auto-hébergé sans personne pour l'opérer : base de métadonnées, stockage des artefacts et contrôle d'accès restent à votre charge.

## Pour aller plus loin

- [Documentation officielle](https://mlflow.org/docs/latest/)
- [MLflow pour les applications LLM et les agents](https://mlflow.org/docs/latest/genai/)
