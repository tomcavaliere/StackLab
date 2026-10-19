---
name: ML engineer
family: ia
summary: "Fait passer un modèle du notebook à la production et le garde en état de marche."
mission: "Prend un modèle qui fonctionne sur un ordinateur et le rend entraînable de façon reproductible, déployable, mesurable et réentraînable. Il se préoccupe du cycle de vie du modèle (MLOps) autant que de sa précision."
stack:
  - step: Écrire le code
    intro: "Le code d'entraînement et de service est du logiciel : il doit être versionné, testé et lisible par une équipe."
    techs:
      - { tech: python, essential: true, why: "Le langage de l'entraînement, des bibliothèques ML et des pipelines." }
  - step: Entraîner les modèles
    intro: "Le choix de la bibliothèque dépend de la famille de modèle ; quand un seul ordinateur ne suffit plus, on distribue l'entraînement."
    techs:
      - { tech: scikit-learn, why: "Modèles classiques et outils de préparation, avec une API homogène." }
      - { tech: xgboost, why: "Arbres boostés, très performants sur des données tabulaires." }
      - { tech: pytorch, essential: true, why: "Bibliothèque de deep learning dominante en recherche, de plus en plus en production." }
      - { tech: tensorflow, why: "Bibliothèque de deep learning avec un outillage de déploiement complet." }
      - { tech: deep-learning, why: "Le cadre conceptuel : réseaux de neurones, entraînement par rétropropagation." }
      - { tech: fine-tuning, why: "Adapter un modèle déjà entraîné à son cas plutôt que de repartir de zéro." }
      - { tech: ray, why: "Distribue le calcul Python sur un cluster : entraînement et recherche d'hyperparamètres en parallèle." }
  - step: Tracer et versionner
    intro: "Un modèle en production doit pouvoir être expliqué : avec quelles données, quel code, quels paramètres."
    techs:
      - { tech: mlflow, essential: true, why: "Suivi des expériences et registre des modèles : ce qui a été entraîné et ce qui est déployé." }
      - { tech: hugging-face, why: "Hub pour récupérer et partager des modèles préentraînés et leurs jeux de données." }
  - step: Servir les prédictions
    intro: "Un modèle est utile quand une application peut l'appeler : en temps réel via une API, ou par lots."
    techs:
      - { tech: fastapi, essential: true, why: "Expose un modèle Python en API HTTP rapidement." }
      - { tech: vllm, why: "Moteur de service optimisé pour les grands modèles de langage." }
      - { tech: aws-sagemaker, why: "Plateforme managée d'AWS pour entraîner et déployer des modèles." }
      - { tech: vertex-ai, why: "L'équivalent managé chez Google Cloud." }
  - step: Automatiser les pipelines
    intro: "Réentraîner à la main ne tient pas : les données changent, le modèle se dégrade, il faut relancer sans effort."
    techs:
      - { tech: airflow, why: "Planifie et enchaîne préparation des données, entraînement et évaluation." }
      - { tech: dagster, why: "Orchestration centrée sur les données et les modèles produits." }
      - { tech: spark, why: "Prépare des jeux de données volumineux avant l'entraînement." }
  - step: Industrialiser
    intro: "Le modèle tourne dans un environnement reproductible, déployé par du code."
    techs:
      - { tech: docker, essential: true, why: "Fige l'environnement (bibliothèques, versions) pour que l'entraînement et le service soient identiques partout." }
      - { tech: kubernetes, why: "Exécute et met à l'échelle les services de prédiction." }
      - { tech: terraform, why: "Décrit l'infrastructure (GPU, clusters) en code reproductible." }
      - { tech: github-actions, why: "Teste et déploie le code ML à chaque changement." }
  - step: Surveiller
    intro: "Un modèle se dégrade en silence quand les données changent : on suit la latence, les erreurs et la qualité des prédictions."
    techs:
      - { tech: prometheus, why: "Collecte des métriques techniques du service de prédiction." }
      - { tech: grafana, why: "Tableaux de bord de ces métriques et alertes." }
---
