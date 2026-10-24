---
name: Amazon SageMaker
kind: service-cloud
layers: [ml]
languages: [python]
tags: [mlops, offre-managee, inference]
difficulty: 3
summary: "Service managé d'AWS pour tout le cycle d'un modèle : notebooks, entraînement sur des instances à la demande, suivi, registre et endpoints d'inférence."
integratesWith:
  - tech: aws
    note: "Fait partie d'AWS : droits IAM, réseau, facturation et surveillance communs aux autres services."
  - tech: aws-s3
    note: "Les données d'entraînement et les modèles produits sont lus et écrits dans S3."
  - tech: mlflow
    note: "SageMaker propose un serveur MLflow managé pour suivre les expériences."
---

## Problème résolu

Industrialiser le machine learning demande beaucoup d'infrastructure : des machines (souvent avec GPU) pour entraîner, un suivi des expériences, un registre de modèles, puis des serveurs pour exposer le modèle. SageMaker fournit tout cela en service managé. On lance un **job d'entraînement** : AWS démarre les instances demandées, exécute le code, écrit le modèle dans S3 et arrête les machines. On déploie ensuite le modèle sur un **endpoint** d'inférence.

Plusieurs modes d'inférence : temps réel (faible latence, instances qui tournent en continu), serverless (pour un trafic irrégulier, avec des démarrages à froid), asynchrone (requêtes mises en file, longues ou volumineuses) et traitement par lots. S'y ajoutent des environnements de notebooks (SageMaker Studio), des pipelines, un registre de modèles et un catalogue de modèles pré-entraînés (JumpStart).

Nom à connaître : depuis décembre 2024, ce service s'appelle **Amazon SageMaker AI**, et « Amazon SageMaker » désigne une plateforme plus large qui l'englobe avec les services de données et d'analytique d'AWS. Les API gardent le nom `sagemaker`.

## Quand l'utiliser

- Équipe déjà sur AWS, données dans S3, qui veut entraîner et servir des modèles sans gérer elle-même les serveurs et les GPU.
- Entraînements ponctuels mais lourds : on ne paie les instances que pendant le job.
- Besoin d'un cadre complet (suivi, registre, déploiement, montée en charge automatique) fourni par un seul fournisseur.

## Quand l'éviter

- Pas sur AWS, ou volonté de rester portable : la dépendance au fournisseur est forte. MLflow avec une infrastructure maison (ou un autre cloud) est l'alternative.
- Petit budget ou trafic faible : un endpoint temps réel facture ses instances tant qu'il tourne, même sans requête. Oublier d'arrêter un endpoint ou un notebook est un piège de coût classique. Aucun prix n'est donné ici : voir la grille tarifaire officielle.
- Simple appel à un LLM hébergé par un fournisseur : une API de modèle suffit, sans plateforme d'entraînement.

## Pour aller plus loin

- [Documentation officielle (SageMaker AI)](https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html)
- [Options de déploiement et d'inférence](https://docs.aws.amazon.com/sagemaker/latest/dg/deploy-model.html)
