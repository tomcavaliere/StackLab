---
name: Vertex AI
kind: service-cloud
layers: [ml]
languages: [python]
tags: [ia-generative, mlops, offre-managee, inference]
difficulty: 2
summary: "Plateforme de machine learning et d'IA générative de Google Cloud : modèles Gemini et tiers par API, entraînement et déploiement de ses propres modèles, pipelines et évaluation."
alternatives:
  - tech: aws-sagemaker
    note: "L'équivalent côté entraînement et déploiement de modèles chez AWS."
integratesWith:
  - tech: bigquery
    note: "Les données d'entraînement viennent souvent de BigQuery, et BigQuery peut appeler des modèles Vertex AI depuis SQL."
  - tech: hugging-face
    note: "Des modèles ouverts peuvent être déployés sur Vertex AI depuis son catalogue (Model Garden)."
  - tech: kubernetes
    note: "Les pipelines de Vertex AI reprennent le format de Kubeflow Pipelines, né sur Kubernetes."
---

## Problème résolu

Vertex AI regroupe dans Google Cloud deux besoins qu'on sépare souvent :

- **IA générative** : appeler les modèles **Gemini** de Google, ainsi que des modèles tiers ou ouverts du **Model Garden**, avec l'authentification, le réseau et la facturation de Google Cloud. S'y ajoutent des outils pour ancrer les réponses dans ses données (RAG, recherche), construire des agents et évaluer les réponses.
- **Machine learning classique** : notebooks (Workbench), entraînement sur des machines à la demande (CPU, GPU, TPU), AutoML, **pipelines** reproductibles, **registre de modèles** et **endpoints** d'inférence en ligne ou par lots, avec suivi des expériences et surveillance des modèles.

Les noms des produits de Google Cloud autour de l'IA changent régulièrement : vérifier la documentation à jour avant de s'appuyer sur une fonctionnalité précise.

## Quand l'utiliser

- Organisation sur Google Cloud, en particulier avec ses données dans BigQuery.
- Besoin d'accéder à Gemini dans un cadre d'entreprise (contrôle des accès, région, facturation centralisée).
- Équipe ML qui veut industrialiser entraînement, déploiement et suivi sans gérer l'infrastructure.

## Quand l'éviter

- Pas de Google Cloud dans la stack : la dépendance à une nouvelle plateforme coûte plus qu'elle n'apporte.
- Modèle classique qui s'entraîne sur un poste et produit une liste par semaine : une plateforme complète est surdimensionnée.
- Équipe qui veut rester portable entre clouds : beaucoup de briques (pipelines managés, registre, endpoints) sont propres à Google Cloud.

## Pour aller plus loin

- [Documentation officielle](https://cloud.google.com/vertex-ai/docs)
- [IA générative sur Vertex AI](https://cloud.google.com/vertex-ai/generative-ai/docs/overview)
