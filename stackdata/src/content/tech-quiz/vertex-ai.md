---
questions:
  - id: role
    prompt: "Qu'est-ce que Vertex AI ?"
    answer: "La plateforme de ML et d'IA générative de Google Cloud"
    decoys:
      - "Le modèle de langage phare de Google, concurrent des modèles d'OpenAI"
      - "Une bibliothèque open-source de Google pour entraîner des réseaux de neurones"
    why: "Vertex AI est une plateforme : elle donne accès à Gemini et à d'autres modèles, et couvre l'entraînement et le déploiement. Gemini est la famille de modèles, pas la plateforme."
  - id: deux-besoins
    prompt: "Quels deux grands besoins Vertex AI regroupe-t-il ?"
    answer: "L'accès à des modèles d'IA générative et le cycle de vie de ses propres modèles"
    decoys:
      - "L'hébergement de sites web et la gestion des noms de domaine"
      - "L'entrepôt de données et l'orchestration des pipelines SQL quotidiens"
    why: "D'un côté Gemini et le Model Garden, de l'autre entraînement, pipelines, registre et endpoints. L'entrepôt, c'est BigQuery."
  - id: model-garden
    prompt: "Qu'est-ce que le Model Garden de Vertex AI ?"
    answer: "Un catalogue de modèles de Google, tiers et ouverts, à utiliser ou déployer"
    decoys:
      - "Un bac à sable où les modèles s'entraînent seuls sur les données publiques"
      - "Un tableau de bord qui classe les modèles selon leur coût mensuel"
    why: "Le Model Garden regroupe des modèles à appeler ou à déployer sur Vertex AI, dont des modèles ouverts."
  - id: bigquery
    prompt: "Pourquoi Vertex AI est-il naturel pour une équipe dont les données sont dans BigQuery ?"
    answer: "Les données y sont déjà, et BigQuery peut appeler ses modèles en SQL"
    decoys:
      - "BigQuery ne peut exporter ses données vers aucun autre outil de ML"
      - "Vertex AI remplace BigQuery comme entrepôt de données de l'entreprise"
    why: "L'intégration est étroite dans Google Cloud ; BigQuery reste l'entrepôt, Vertex AI la plateforme de ML."
  - id: pipelines
    prompt: "De quel format les pipelines de Vertex AI reprennent-ils la définition ?"
    answer: "Kubeflow Pipelines"
    decoys:
      - "Les DAG d'Apache Airflow"
      - "Les workflows de GitHub Actions"
    why: "Vertex AI Pipelines exécute des pipelines définis avec le SDK Kubeflow Pipelines, sans cluster Kubernetes à gérer."
  - id: endpoints
    prompt: "Après avoir entraîné un modèle sur Vertex AI, comment l'exposer à une application ?"
    answer: "En le déployant sur un endpoint pour l'inférence en ligne"
    decoys:
      - "En copiant le fichier du modèle dans le dépôt de code de l'application"
      - "En le publiant sur le Model Garden, seul moyen de l'appeler par API"
    why: "Le registre de modèles garde les versions, et un endpoint sert les prédictions en ligne ; l'inférence par lots est l'autre option."
  - id: tabulaire-hebdo
    prompt: "Un modèle sur données tabulaires s'entraîne sur un poste et produit une liste par semaine. Vertex AI ?"
    answer: "Surdimensionné : une plateforme complète pour un besoin qui tient sur un poste"
    decoys:
      - "Indispensable : seul Vertex AI sait entraîner un modèle sur des données"
      - "Inadapté : Vertex AI ne traite que des modèles d'IA générative"
    why: "Vertex AI couvre aussi le ML classique, mais son appareil (pipelines, endpoints) ne se justifie pas pour un traitement hebdomadaire sur un poste."
  - id: portabilite
    prompt: "Quelle limite de Vertex AI pour une équipe qui veut rester portable entre clouds ?"
    answer: "Beaucoup de ses briques managées sont propres à Google Cloud"
    decoys:
      - "Ses modèles entraînés ne peuvent jamais être exportés hors de Google Cloud"
      - "Il ne fonctionne qu'avec les données stockées dans Google Drive"
    why: "Les services managés créent une dépendance au fournisseur ; le code de modèle reste portable, l'industrialisation l'est moins."
  - id: noms
    prompt: "Pourquoi vérifier la documentation à jour avant de s'appuyer sur une fonctionnalité de Vertex AI ?"
    answer: "Les noms et le périmètre des produits d'IA de Google Cloud changent souvent"
    decoys:
      - "La documentation n'est publiée qu'une fois par an, avec retard"
      - "Chaque région de Google Cloud a sa propre documentation, avec des fonctions différentes"
    why: "L'offre d'IA de Google Cloud évolue vite et les produits sont régulièrement renommés ou regroupés."
  - id: materiel
    prompt: "Sur quel matériel peut-on entraîner des modèles avec Vertex AI ?"
    answer: "Des machines à la demande avec CPU, GPU ou TPU"
    decoys:
      - "Uniquement des TPU, le matériel maison de Google"
      - "Uniquement le poste du développeur, Vertex AI ne servant qu'au déploiement"
    why: "Vertex AI lance des machines à la demande pour l'entraînement, avec CPU, GPU ou TPU selon le besoin."
  - id: gemini
    prompt: "Quelle est la relation entre Gemini et Vertex AI ?"
    answer: "Gemini est une famille de modèles, Vertex AI la plateforme qui y donne accès"
    decoys:
      - "Gemini est la plateforme de Google Cloud, Vertex AI en est le modèle de langage"
      - "Gemini est l'ancien nom de Vertex AI, abandonné depuis"
    why: "Gemini désigne les modèles de Google ; Vertex AI est la plateforme d'accès, d'entraînement et de déploiement."
  - id: workbench
    prompt: "À quoi sert Workbench dans Vertex AI ?"
    answer: "À travailler dans des notebooks"
    decoys:
      - "À planifier les pipelines de données quotidiens"
      - "À servir les prédictions en ligne aux applications"
    why: "Workbench fournit les notebooks du ML classique. Les pipelines et les endpoints sont d'autres briques."
  - id: automl
    prompt: "À quoi sert AutoML dans Vertex AI ?"
    answer: "Entraîner un modèle sans écrire soi-même tout le code d'entraînement"
    decoys:
      - "Déployer automatiquement un modèle sur tous les clouds de l'entreprise"
      - "Nettoyer automatiquement les données d'entraînement avant chaque exécution"
    why: "AutoML fait partie du ML classique de la plateforme ; il ne gère ni le multicloud ni la préparation des données."
  - id: registre-modeles
    prompt: "Quel est le rôle du registre de modèles de Vertex AI ?"
    answer: "Garder les versions des modèles, d'où l'on déploie sur un endpoint"
    decoys:
      - "Lister les modèles d'IA générative disponibles dans chaque région"
      - "Stocker les données d'entraînement avec leur schéma"
    why: "Le registre garde les versions des modèles entraînés ; le catalogue de modèles à appeler est le Model Garden."
  - id: lots-ou-ligne
    prompt: "Quelle différence entre inférence en ligne et par lots ?"
    answer: "En ligne : une prédiction à la demande ; par lots : un ensemble traité d'un coup"
    decoys:
      - "En ligne : sur un poste local ; par lots : uniquement dans le cloud"
      - "En ligne : pour le texte ; par lots : réservée aux images"
    why: "Un endpoint répond requête par requête ; le traitement par lots convient à de gros volumes sans réponse immédiate."
  - id: surveillance
    prompt: "Que permet la surveillance des modèles de Vertex AI ?"
    answer: "Suivre un modèle déployé pour repérer une dégradation"
    decoys:
      - "Surveiller l'accès physique aux centres de données de Google"
      - "Corriger automatiquement le code d'entraînement quand le score baisse"
    why: "Le suivi des expériences et la surveillance font partie de l'industrialisation du ML ; la plateforme ne réécrit pas le code."
  - id: ancrage
    prompt: "Que signifie ancrer les réponses d'un modèle dans ses données avec Vertex AI ?"
    answer: "Les appuyer sur ses documents, par RAG ou recherche"
    decoys:
      - "Figer le modèle sur une version qui ne sera jamais mise à jour"
      - "Copier les données de l'entreprise dans le modèle de Google"
    why: "L'ancrage fournit au modèle des passages de ses propres données. Il ne modifie pas le modèle."
  - id: evaluation-genai
    prompt: "Outre l'accès aux modèles, quels outils l'IA générative de Vertex AI ajoute-t-elle ?"
    answer: "L'ancrage, les agents et l'évaluation des réponses"
    decoys:
      - "Un hébergement de sites web et une gestion de noms de domaine"
      - "Un éditeur de code qui remplace les IDE des développeurs"
    why: "Au-delà des appels aux modèles, la plateforme propose RAG ou recherche, agents et évaluation."
  - id: equivalent-aws
    prompt: "Quel service d'AWS est l'équivalent de Vertex AI côté entraînement et déploiement ?"
    answer: "SageMaker"
    decoys:
      - "Amazon Athena"
      - "AWS Lambda"
    why: "SageMaker couvre le cycle d'un modèle sur AWS. Athena interroge des données, Lambda exécute des fonctions."
  - id: sans-cluster
    prompt: "Faut-il gérer un cluster Kubernetes pour exécuter les pipelines de Vertex AI ?"
    answer: "Non, l'exécution est managée"
    decoys:
      - "Oui, un cluster Kubernetes est requis avant le premier pipeline"
      - "Oui, mais seulement pour les pipelines de plus de dix étapes"
    why: "Vertex AI Pipelines reprend le format de Kubeflow Pipelines sans demander de gérer l'infrastructure."
  - id: modeles-ouverts
    prompt: "Comment déployer un modèle ouvert de Hugging Face sur Vertex AI ?"
    answer: "Depuis le Model Garden"
    decoys:
      - "En le téléversant dans BigQuery"
      - "En l'installant dans un notebook Workbench seulement"
    why: "Le catalogue du Model Garden permet de déployer des modèles ouverts. BigQuery est un entrepôt, pas un lieu de service de modèles."
  - id: bigquery-sql
    prompt: "Que peut faire BigQuery avec Vertex AI ?"
    answer: "Appeler des modèles Vertex AI depuis du SQL"
    decoys:
      - "Remplacer les endpoints pour servir les modèles entraînés"
      - "Entraîner des modèles sur les GPU de l'entrepôt de données"
    why: "BigQuery peut appeler des modèles Vertex AI en SQL ; l'inférence en ligne reste servie par les endpoints."
  - id: acces-entreprise
    prompt: "Pourquoi utiliser Gemini via Vertex AI plutôt qu'en accès grand public ?"
    answer: "Pour le contrôle des accès, la région et la facturation centralisée"
    decoys:
      - "Pour des modèles plus puissants que ceux accessibles au grand public"
      - "Pour supprimer toute dépendance envers Google Cloud"
    why: "Vertex AI apporte le cadre d'entreprise de Google Cloud, pas un modèle différent."
  - id: sans-gcp
    prompt: "Pas de Google Cloud dans la stack : quel est le risque d'adopter Vertex AI ?"
    answer: "La nouvelle dépendance coûte plus qu'elle n'apporte"
    decoys:
      - "Aucun : il se connecte nativement à tous les clouds"
      - "Les modèles Gemini cessent de répondre hors de Google Cloud"
    why: "Une plateforme complète se justifie surtout si l'organisation est déjà sur Google Cloud."
  - id: pipelines-repro
    prompt: "À quoi servent les pipelines de Vertex AI ?"
    answer: "Enchaîner les étapes d'un traitement de façon reproductible"
    decoys:
      - "Relier le site de l'entreprise à son service de paiement"
      - "Transformer les modèles en pages web exécutables dans un navigateur"
    why: "Un pipeline décrit des étapes (préparation, entraînement, déploiement) qu'on peut rejouer à l'identique."
  - id: tpu
    prompt: "Qu'est-ce qu'un TPU ?"
    answer: "Un accélérateur matériel de Google pour le machine learning"
    decoys:
      - "Un format de fichier pour sauvegarder les modèles entraînés"
      - "Un type de base de données de Google Cloud"
    why: "Les TPU sont un des types de matériel d'entraînement proposés par Vertex AI, avec CPU et GPU."
  - id: industrialiser
    prompt: "Quel besoin d'une équipe ML Vertex AI couvre-t-il ?"
    answer: "Industrialiser entraînement, déploiement et suivi sans gérer l'infrastructure"
    decoys:
      - "Remplacer les data scientists par des modèles qui s'entraînent seuls"
      - "Héberger l'application web finale qui utilise les prédictions"
    why: "La plateforme gère l'infrastructure du cycle de vie des modèles, pas le travail des équipes ni l'application."
  - id: donnees-bigquery
    prompt: "D'où viennent souvent les données d'entraînement d'une équipe qui utilise Vertex AI ?"
    answer: "De BigQuery"
    decoys:
      - "Du Model Garden"
      - "Du registre de modèles"
    why: "BigQuery est l'entrepôt de données de Google Cloud, souvent source d'entraînement. Le Model Garden et le registre contiennent des modèles."
  - id: equipe-aws
    prompt: "Une équipe est entièrement sur AWS. Que regarder plutôt que Vertex AI ?"
    answer: "SageMaker ou Bedrock"
    decoys:
      - "BigQuery"
      - "Looker Studio"
    why: "Vertex AI est la plateforme de Google Cloud ; sur AWS, SageMaker et Bedrock jouent des rôles voisins."
  - id: poste-unique
    prompt: "Quand Vertex AI est-il surdimensionné ?"
    answer: "Pour un modèle classique réentraîné rarement, sur un poste"
    decoys:
      - "Pour une équipe qui industrialise plusieurs modèles par mois"
      - "Pour une organisation sur Google Cloud qui veut utiliser Gemini"
    why: "Pipelines, registre et endpoints se justifient quand le cycle de vie des modèles est industrialisé."
---
