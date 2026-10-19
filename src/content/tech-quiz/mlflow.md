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
  - id: autolog
    prompt: "Que fait l'autolog de MLflow ?"
    answer: "Enregistre automatiquement paramètres et métriques d'une exécution"
    decoys:
      - "Choisit automatiquement les meilleurs hyperparamètres pour le modèle en cours d'entraînement"
      - "Journalise les erreurs du serveur MLflow dans un fichier de logs système"
    why: "L'autolog évite d'écrire à la main les appels de suivi ; il consigne ce que fait la bibliothèque, sans optimiser quoi que ce soit."
  - id: interface-web
    prompt: "À quoi sert l'interface web de MLflow ?"
    answer: "Consulter et comparer les exécutions enregistrées"
    decoys:
      - "Écrire et lancer le code d'entraînement dans un éditeur intégré au navigateur"
      - "Superviser les ressources des machines qui hébergent les modèles servis"
    why: "L'interface affiche les paramètres, métriques et artefacts de chaque exécution pour les comparer. Elle n'est ni un éditeur de code ni un outil de supervision système."
  - id: alias-version
    prompt: "Comment marquer la version d'un modèle qui doit être servie en production ?"
    answer: "Avec un alias ou une étiquette sur cette version dans le registre"
    decoys:
      - "En renommant le fichier du modèle avec le mot « production » avant de le copier"
      - "En supprimant du registre toutes les versions plus anciennes du même modèle"
    why: "Le registre permet d'annoter et de promouvoir une version par alias ou étiquette, sans toucher aux fichiers ni perdre l'historique."
  - id: airflow-mlflow
    prompt: "Comment Airflow et MLflow se répartissent-ils le travail ?"
    answer: "Airflow planifie l'entraînement, MLflow en garde la trace et versionne le modèle"
    decoys:
      - "MLflow planifie les exécutions, Airflow enregistre les paramètres et les métriques"
      - "Ils font la même chose : l'un en Python, l'autre en SQL"
    why: "L'orchestrateur déclenche et enchaîne les étapes ; MLflow suit les expériences et les modèles."
  - id: api-python
    prompt: "Comment enregistre-t-on une exécution avec MLflow ?"
    answer: "Avec quelques appels de son API Python"
    decoys:
      - "En décrivant l'ensemble du pipeline dans un fichier de configuration YAML"
      - "En déclarant chaque paramètre dans une table SQL du serveur de tracking"
    why: "L'API principale est en Python : quelques appels, ou l'autolog, suffisent à consigner paramètres, métriques et artefacts."
  - id: versions-managees
    prompt: "Qui propose une version managée de MLflow ?"
    answer: "Databricks, qui l'a créé, et d'autres clouds comme SageMaker"
    decoys:
      - "Aucun fournisseur : MLflow n'existe qu'en installation maison"
      - "Uniquement Google Cloud, via sa plateforme d'IA"
    why: "MLflow est open-source et peut s'auto-héberger, mais plusieurs plateformes le proposent en service managé."
  - id: charge-auto-hebergement
    prompt: "Qu'implique l'auto-hébergement d'un serveur MLflow pour l'équipe ?"
    answer: "Opérer la base de métadonnées, le stockage des artefacts et le contrôle d'accès"
    decoys:
      - "Payer une licence annuelle au projet pour chaque utilisateur du serveur"
      - "Fournir les GPU d'entraînement depuis le serveur de tracking lui-même"
    why: "Le logiciel est libre mais l'exploitation est à votre charge : base, stockage et droits d'accès. Les machines d'entraînement sont un autre sujet."
  - id: base-metadonnees
    prompt: "Que contient la base de métadonnées d'un serveur MLflow ?"
    answer: "Les paramètres, les métriques et les informations sur les exécutions"
    decoys:
      - "Les fichiers volumineux des modèles et les graphiques produits par les exécutions"
      - "Les données brutes d'entraînement de l'entreprise, pour les réutiliser plus tard"
    why: "Les métadonnées vont en base, les fichiers volumineux (artefacts) dans un stockage objet, et les données d'entraînement restent là où elles sont."
  - id: retour-arriere
    prompt: "Un nouveau modèle se comporte mal en production. Que permet MLflow ?"
    answer: "Revenir à une version précédente du registre, dont on connaît l'exécution"
    decoys:
      - "Relancer automatiquement l'entraînement jusqu'à obtenir un meilleur score"
      - "Bloquer les requêtes des utilisateurs jusqu'à la correction du modèle"
    why: "Le registre versionne les modèles et chaque version renvoie à l'exécution qui l'a produite ; MLflow ne corrige ni ne filtre rien."
  - id: opentelemetry
    prompt: "Avec quel standard le traçage des applications LLM de MLflow est-il compatible ?"
    answer: "OpenTelemetry"
    decoys:
      - "Kubeflow Pipelines"
      - "ONNX"
    why: "MLflow trace prompts, outils et réponses de façon compatible OpenTelemetry. ONNX est un format de modèle et Kubeflow Pipelines un format de pipeline."
  - id: llm-juge
    prompt: "Qu'est-ce qu'un « LLM juge » dans MLflow ?"
    answer: "Un modèle qui note les sorties d'une application selon des critères"
    decoys:
      - "Un modèle qui décide quelle version du registre part en production"
      - "Un modèle qui relit le code d'entraînement avant son exécution"
    why: "L'évaluation des applications LLM utilise des juges pour noter les réponses ; la promotion d'un modèle reste une décision humaine ou d'un processus."
  - id: prompts-versionnes
    prompt: "Qu'apporte la gestion des prompts de MLflow ?"
    answer: "Les versionner pour retrouver celui qui a produit une réponse"
    decoys:
      - "Les générer automatiquement à partir des données d'entraînement"
      - "Les chiffrer pour que le fournisseur du modèle ne puisse pas les lire"
    why: "Les prompts sont versionnés comme les modèles ; MLflow ne les écrit pas et ne les chiffre pas."
  - id: sans-outil-proprietaire
    prompt: "Pourquoi suivre une application LLM avec MLflow plutôt qu'un outil dédié ?"
    answer: "Pour ne pas adopter un outil propriétaire de plus, si l'on utilise déjà MLflow"
    decoys:
      - "Parce qu'il remplace les modèles de langage par des modèles gratuits"
      - "Parce qu'il est le seul outil à pouvoir tracer les appels de modèles"
    why: "L'intérêt est de garder un seul outil open-source pour les modèles classiques et les applications LLM."
  - id: essais-multiples
    prompt: "Une équipe teste des dizaines de réglages. Qu'apporte MLflow ?"
    answer: "Retrouver et comparer les paramètres et les scores de chaque essai"
    decoys:
      - "Choisir à sa place le réglage qui sera le plus performant en production"
      - "Exécuter les essais en parallèle sur des machines qu'il fournit"
    why: "MLflow enregistre et compare ; il n'optimise pas les réglages et ne fournit pas de machines."
  - id: probleme-notebooks
    prompt: "Quel problème pratique MLflow évite-t-il ?"
    answer: "Des paramètres et des scores éparpillés dans des notebooks et des noms de fichiers"
    decoys:
      - "Des conflits de versions de dépendances Python entre les postes de l'équipe"
      - "Des pannes de GPU qui interrompent les entraînements en cours"
    why: "Le tracking centralise ce qui définit chaque essai. Les dépendances et le matériel ne sont pas son sujet."
  - id: dagster-mlflow
    prompt: "Dagster peut-il remplacer MLflow, ou l'inverse ?"
    answer: "Non, ils se complètent : l'un orchestre, l'autre suit expériences et modèles"
    decoys:
      - "Oui, Dagster enregistre aussi les modèles dans un registre versionné"
      - "Oui, MLflow orchestre aussi les pipelines grâce à son planificateur intégré"
    why: "Dagster orchestre les étapes ; MLflow garde la trace des expériences et versionne les modèles."
  - id: ou-tourne
    prompt: "Où peut tourner MLflow ?"
    answer: "En local, sur un serveur maison ou en offre managée"
    decoys:
      - "Uniquement sur la plateforme Databricks, qui détient le projet"
      - "Uniquement dans un navigateur, sans serveur ni stockage à prévoir"
    why: "Cette liberté de déploiement est l'un de ses atouts face à une plateforme liée à un cloud."
  - id: format-commun
    prompt: "Quel intérêt du format de modèle commun de MLflow ?"
    answer: "Servir en REST ou déployer ailleurs sans réécrire pour chaque bibliothèque"
    decoys:
      - "Entraîner le même modèle avec plusieurs bibliothèques en une seule exécution"
      - "Compresser automatiquement les modèles pour qu'ils tiennent dans un dépôt Git"
    why: "Le format est partagé par de nombreuses bibliothèques, ce qui simplifie le service et le déploiement."
  - id: exemple-artefact
    prompt: "Lequel de ces éléments est un artefact d'une exécution MLflow ?"
    answer: "Le fichier du modèle ou un graphique"
    decoys:
      - "Le taux d'apprentissage choisi avant l'entraînement"
      - "Le score de précision obtenu sur les données de test"
    why: "Les artefacts sont des fichiers. Le taux d'apprentissage est un paramètre, la précision une métrique."
  - id: param-metrique
    prompt: "Dans MLflow, le taux d'apprentissage choisi et le score obtenu sont respectivement :"
    answer: "Un paramètre et une métrique"
    decoys:
      - "Une métrique et un paramètre"
      - "Un artefact et un paramètre"
    why: "Un paramètre est un réglage fixé avant l'exécution, une métrique une mesure du résultat."
---
