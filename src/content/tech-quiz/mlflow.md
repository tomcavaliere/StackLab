---
questions:
  - id: role
    prompt: "À quoi sert principalement MLflow ?"
    answer: "Gérer le cycle de vie des modèles : suivi des expériences, registre, déploiement"
    decoys:
      - "Planifier et enchaîner les étapes d'un pipeline de données à heure fixe"
      - "Entraîner les modèles à la place des bibliothèques comme PyTorch, avec ses propres algorithmes"
    why: "MLflow garde la trace des exécutions et versionne les modèles. Il ne planifie pas de pipeline (rôle d'un orchestrateur) et n'entraîne rien lui-même : il enregistre ce que font les bibliothèques."
  - id: tracking
    prompt: "Qu'enregistre le tracking de MLflow pour chaque exécution ?"
    answer: "Ses paramètres, ses métriques et ses artefacts"
    decoys:
      - "Le code source complet, recompilé à chaque consultation"
      - "Les requêtes des utilisateurs du modèle en production"
    why: "Chaque exécution consigne ses paramètres (hyperparamètres), ses métriques (score, perte) et ses artefacts (fichier du modèle, graphiques), comparables dans l'interface web."
  - id: registre
    prompt: "À quoi sert le registre de modèles de MLflow ?"
    answer: "Versionner les modèles et désigner celui qui part en production"
    decoys:
      - "Stocker les jeux de données d'entraînement avec leurs schémas"
      - "Lister les bibliothèques Python installées sur chaque machine"
    why: "Le registre donne des versions numérotées à un modèle, avec annotations et alias ou étiquettes pour marquer celle à servir. Les données restent dans leur stockage."
  - id: pas-orchestrateur
    prompt: "Une équipe veut réentraîner un modèle chaque nuit, après l'arrivée des données. MLflow suffit-il ?"
    answer: "Non : il faut un orchestrateur, MLflow gardant la trace de chaque entraînement"
    decoys:
      - "Oui : MLflow déclenche les exécutions à l'heure prévue dans le registre"
      - "Oui : le serveur de tracking relance l'entraînement dès qu'un fichier de données change"
    why: "MLflow ne planifie rien. Airflow ou Dagster déclenchent et enchaînent les étapes ; MLflow enregistre les paramètres, les métriques et le modèle produit."
  - id: llm
    prompt: "Qu'apporte MLflow aux applications LLM (RAG, agents) ?"
    answer: "Le traçage des appels, l'évaluation par des LLM juges et la gestion des prompts"
    decoys:
      - "L'hébergement gratuit de grands modèles de langage open-source"
      - "Un index vectoriel intégré, pour remplacer la base de recherche utilisée par le RAG"
    why: "Les versions récentes tracent prompts, outils et réponses (compatible OpenTelemetry), évaluent avec des juges LLM et versionnent les prompts. Ni hébergement de modèles gratuit, ni base vectorielle."
  - id: licence
    prompt: "Quel est le statut de MLflow ?"
    answer: "Open-source, projet de la Linux Foundation, créé par Databricks"
    decoys:
      - "Propriétaire, réservé aux clients de la plateforme Databricks et à ses abonnés"
      - "Open-source, mais seulement utilisable sur AWS"
    why: "MLflow est open-source et tourne partout : en local, sur un serveur maison ou en offre managée (Databricks, SageMaker et d'autres)."
  - id: artefacts
    prompt: "Sur un serveur MLflow auto-hébergé, où stocke-t-on couramment les artefacts (fichiers des modèles) ?"
    answer: "Dans un stockage objet comme S3"
    decoys:
      - "Dans les métriques de chaque exécution"
      - "Dans le registre Git du projet"
    why: "Les métadonnées vont dans une base, les fichiers volumineux dans un stockage objet. Les métriques ne sont que des valeurs numériques, et Git n'est pas fait pour des modèles de cette taille."
  - id: service
    prompt: "Une fois un modèle enregistré dans MLflow, comment l'exposer simplement ?"
    answer: "Le servir derrière une API REST grâce à son format de modèle commun"
    decoys:
      - "Le copier à la main dans le dossier static d'un site web, avec son fichier de config"
      - "Le convertir en table SQL interrogeable par l'application"
    why: "MLflow emballe les modèles dans un format commun à de nombreuses bibliothèques, qu'on peut servir localement en REST ou déployer vers d'autres plateformes."
  - id: quand-eviter
    prompt: "Dans quel cas MLflow est-il probablement superflu ?"
    answer: "Un seul modèle simple, entraîné rarement"
    decoys:
      - "Une équipe qui compare des dizaines de réglages par semaine"
      - "Plusieurs modèles en production à versionner"
    why: "Le suivi d'expériences paie quand les essais se multiplient. Pour un modèle unique rarement réentraîné, un script et un fichier versionné peuvent suffire."
  - id: vs-sagemaker
    prompt: "Pourquoi choisir MLflow plutôt que SageMaker ?"
    answer: "Pour rester indépendant d'un cloud, quitte à opérer son serveur"
    decoys:
      - "Parce que MLflow fournit les GPU d'entraînement à la demande"
      - "Parce que SageMaker ne sait pas déployer de modèle"
    why: "MLflow tourne partout mais ne fournit pas l'infrastructure : machines, stockage et serveur restent à votre charge. SageMaker fournit tout, au prix de la dépendance à AWS."
---
