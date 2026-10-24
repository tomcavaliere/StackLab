---
name: Amazon Bedrock
kind: service-cloud
layers: [ml]
tags: [ia-generative, offre-managee, inference]
difficulty: 2
summary: "Service managé d'AWS qui donne accès, par une même API, à des modèles de fondation de plusieurs éditeurs, avec bases de connaissances (RAG), agents et garde-fous intégrés."
alternatives:
  - tech: vertex-ai
    note: "L'équivalent chez Google Cloud : modèles Gemini et modèles tiers, dans l'écosystème GCP."
  - tech: claude-api
    note: "Appeler directement l'éditeur du modèle : les nouveautés y arrivent en général en premier, mais hors du compte AWS."
  - tech: openai-api
    note: "Appeler directement OpenAI, hors du compte AWS."
integratesWith:
  - tech: aws
    note: "Droits IAM, réseau privé, journalisation et facturation communs aux autres services AWS."
  - tech: aws-s3
    note: "Les documents des bases de connaissances et les données de fine-tuning sont lus dans S3."
  - tech: aws-sagemaker
    note: "SageMaker entraîne et héberge ses propres modèles ; Bedrock sert des modèles prêts à l'emploi. On passe à SageMaker quand il faut plus de contrôle."
  - tech: rag
    note: "Les Knowledge Bases gèrent l'indexation et la récupération d'un RAG en service managé."
---

## Problème résolu

Une entreprise déjà sur AWS veut utiliser des LLM sans envoyer ses données hors de son environnement cloud, sans signer un contrat par éditeur et sans gérer de GPU. Bedrock expose des **modèles de fondation** de plusieurs éditeurs (Anthropic, Meta, Mistral, Amazon et d'autres ; le catalogue évolue et varie selon la région) derrière une API AWS : on s'authentifie avec IAM, on est facturé sur le compte AWS, et l'API **Converse** offre une interface commune pour converser avec les différents modèles.

Autour des modèles, des briques managées :

- **Knowledge Bases** : un RAG géré, de l'indexation de documents stockés dans S3 à la récupération des passages ;
- **Agents** : un modèle qui appelle des actions (fonctions, API) pour accomplir une tâche ;
- **Guardrails** : filtres configurables sur les entrées et les sorties (sujets interdits, données personnelles…) ;
- personnalisation de certains modèles (fine-tuning) et évaluation de modèles.

## Quand l'utiliser

- Organisation déjà sur AWS, qui veut des LLM dans le même cadre de sécurité, de réseau et de facturation.
- Besoin de comparer ou de changer de modèle sans changer de fournisseur cloud.
- Petite équipe qui veut un RAG ou des garde-fous managés plutôt que les construire.

## Quand l'éviter

- Pas d'AWS dans la stack : l'API directe d'un éditeur est plus simple à adopter.
- Besoin de la toute dernière fonctionnalité d'un modèle : elle peut arriver plus tard sur Bedrock que chez son éditeur. À vérifier au cas par cas.
- Modèle maison ou à poids ouverts très spécifique à servir avec un contrôle fin : SageMaker ou un serveur d'inférence auto-hébergé donnent plus de prise.

## Pour aller plus loin

- [Documentation officielle : qu'est-ce qu'Amazon Bedrock ?](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html)
