---
questions:
  - id: role
    prompt: "Qu'est-ce qu'Amazon SageMaker (aujourd'hui SageMaker AI) ?"
    answer: "Le service managé d'AWS pour entraîner, suivre et déployer des modèles"
    decoys:
      - "Le catalogue d'AWS pour appeler par API des LLM d'éditeurs tiers, sans les héberger"
      - "Un entrepôt de données colonnaire d'AWS pour l'analytique SQL"
    why: "SageMaker AI couvre le cycle du ML : notebooks, entraînement, suivi, registre, endpoints. L'accès par API à des LLM tiers relève plutôt d'Amazon Bedrock, l'entrepôt colonnaire de Redshift."
  - id: job-entrainement
    prompt: "Que se passe-t-il lors d'un job d'entraînement SageMaker ?"
    answer: "AWS démarre les instances, exécute le code, écrit le modèle dans S3 et arrête les machines"
    decoys:
      - "Le code tourne sur le poste du développeur et seul le modèle final, une fois entraîné, est envoyé à AWS"
      - "AWS réserve un serveur dédié pour l'année, facturé même entre deux entraînements"
    why: "Les instances n'existent que le temps du job : on ne paie l'entraînement que pendant qu'il tourne. Le modèle produit atterrit dans S3."
  - id: piege-cout
    prompt: "Quel est le piège de coût classique avec SageMaker ?"
    answer: "Un endpoint temps réel ou un notebook oublié, facturé tant qu'il tourne"
    decoys:
      - "Chaque prédiction est facturée au prix d'un entraînement complet du modèle servi"
      - "Les modèles stockés dans S3 sont supprimés s'ils ne servent pas"
    why: "Un endpoint temps réel garde ses instances allumées, même sans requête. Il faut arrêter ce qui ne sert plus ou choisir un mode d'inférence adapté au trafic."
  - id: serverless
    prompt: "Trafic irrégulier avec de longues périodes sans requête, démarrage à froid toléré. Quel mode d'inférence SageMaker ?"
    answer: "L'inférence serverless"
    decoys:
      - "Un endpoint temps réel"
      - "Un job d'entraînement"
    why: "L'inférence serverless gère l'infrastructure et s'adapte au trafic, au prix de démarrages à froid. L'endpoint temps réel vise la faible latence avec des instances toujours allumées."
  - id: asynchrone
    prompt: "Requêtes longues à traiter, avec des charges volumineuses, sans besoin de réponse immédiate. Quel mode SageMaker ?"
    answer: "L'inférence asynchrone, qui met les requêtes en file"
    decoys:
      - "L'inférence temps réel, pour la plus faible latence"
      - "L'inférence serverless, pour les pics de trafic"
    why: "L'inférence asynchrone met les requêtes en file et les traite à son rythme : adaptée aux charges volumineuses et aux traitements longs. Le temps réel vise des réponses rapides et courtes."
  - id: renommage
    prompt: "Que s'est-il passé pour le nom de SageMaker en décembre 2024 ?"
    answer: "Le service ML est devenu SageMaker AI ; SageMaker nomme une plateforme plus large"
    decoys:
      - "SageMaker a été fusionné dans Bedrock, et ses API historiques ont toutes été supprimées"
      - "SageMaker a été rendu open-source sous le nom de MLflow"
    why: "Le service historique s'appelle SageMaker AI ; « Amazon SageMaker » regroupe désormais données, analytique et IA. Les API et la CLI gardent le nom sagemaker."
  - id: s3
    prompt: "Quel service AWS SageMaker utilise-t-il pour lire les données d'entraînement et stocker les modèles ?"
    answer: "Amazon S3"
    decoys:
      - "Amazon DynamoDB"
      - "AWS Lambda"
    why: "Les jobs lisent leurs données dans S3 et y écrivent le modèle produit. DynamoDB est une base clé-valeur, Lambda exécute des fonctions."
  - id: quand-eviter
    prompt: "Dans quel cas éviter SageMaker ?"
    answer: "Une équipe hors d'AWS qui veut rester portable entre clouds"
    decoys:
      - "Une équipe sur AWS dont les données sont déjà dans S3"
      - "Des entraînements ponctuels mais lourds sur GPU"
    why: "SageMaker crée une forte dépendance à AWS. Hors d'AWS ou pour rester portable, MLflow avec une infrastructure maison est l'alternative."
  - id: mlflow-manage
    prompt: "Quel lien SageMaker a-t-il avec MLflow ?"
    answer: "Il propose un serveur MLflow managé pour suivre les expériences"
    decoys:
      - "Il interdit l'usage de MLflow, remplacé par un format de suivi propriétaire"
      - "C'est le nom commercial de MLflow sur AWS"
    why: "SageMaker peut héberger un serveur de tracking MLflow : on garde l'outil open-source sans opérer le serveur. Les deux restent des produits distincts."
  - id: llm-api
    prompt: "Une application veut juste appeler un LLM hébergé par un fournisseur. Faut-il SageMaker ?"
    answer: "Non : une API de modèle suffit, sans plateforme d'entraînement ni endpoint à gérer"
    decoys:
      - "Oui : tout appel à un LLM passe obligatoirement par un endpoint SageMaker dédié et facturé"
      - "Oui : il faut d'abord réentraîner le modèle dans un job SageMaker"
    why: "SageMaker sert à entraîner et à héberger ses propres modèles. Pour consommer un LLM existant, l'API du fournisseur est plus simple et ne laisse aucune instance allumée."
  - id: studio
    prompt: "À quoi sert SageMaker Studio ?"
    answer: "À fournir un environnement de notebooks pour développer"
    decoys:
      - "À exposer un modèle entraîné à des applications, derrière un point d'accès"
      - "À stocker les jeux de données et les modèles produits par les entraînements"
    why: "Studio est l'environnement de développement avec notebooks. L'exposition d'un modèle passe par un endpoint, le stockage par S3."
  - id: jumpstart
    prompt: "Que propose SageMaker JumpStart ?"
    answer: "Un catalogue de modèles pré-entraînés"
    decoys:
      - "Un service qui démarre les instances d'entraînement plus vite que d'habitude"
      - "Un registre où l'on versionne ses propres modèles avant de les déployer"
    why: "JumpStart donne accès à des modèles déjà entraînés. Le registre de modèles est une autre fonction de SageMaker."
  - id: registre-modeles
    prompt: "À quoi sert le registre de modèles de SageMaker ?"
    answer: "À garder une trace des modèles produits avant de les déployer"
    decoys:
      - "À réserver à l'avance des instances GPU pour les futurs entraînements"
      - "À répertorier les modèles d'éditeurs tiers appelables par API"
    why: "Le registre fait partie du cadre complet de SageMaker : suivi, registre, déploiement. Le catalogue de modèles pré-entraînés est JumpStart."
  - id: pipelines
    prompt: "Que permettent les pipelines de SageMaker ?"
    answer: "Enchaîner les étapes d'un workflow de ML"
    decoys:
      - "Relier plusieurs comptes AWS pour partager leurs jeux de données"
      - "Acheminer les requêtes d'inférence vers l'endpoint le moins chargé"
    why: "Les pipelines automatisent la suite d'étapes : préparation, entraînement, évaluation, déploiement. Ils ne gèrent ni les comptes ni le routage."
  - id: temps-reel
    prompt: "Une application exige des réponses rapides de façon continue. Quel mode d'inférence SageMaker ?"
    answer: "L'endpoint temps réel, dont les instances tournent en continu"
    decoys:
      - "L'inférence asynchrone, qui met les requêtes en file avant de les traiter"
      - "L'inférence serverless, qui s'éteint entre les requêtes et subit des démarrages à froid"
    why: "Le temps réel vise la faible latence, avec des instances toujours allumées donc facturées. L'asynchrone et le serverless acceptent une réponse moins immédiate."
  - id: traitement-par-lots
    prompt: "Appliquer un modèle à un très gros fichier de données, une fois, sans besoin de réponse immédiate. Quel mode ?"
    answer: "Le traitement par lots"
    decoys:
      - "Un endpoint temps réel"
      - "Un notebook SageMaker Studio lancé en continu"
    why: "Le traitement par lots traite un grand volume hors ligne, sans endpoint permanent à facturer. Un endpoint temps réel resterait allumé pour rien."
  - id: demarrage-froid
    prompt: "Quel est le compromis de l'inférence serverless par rapport au temps réel ?"
    answer: "Des démarrages à froid après une période sans requête"
    decoys:
      - "Elle exige de choisir soi-même le type d'instance et de les gérer"
      - "Elle fonctionne uniquement avec les modèles du catalogue JumpStart"
    why: "Le serverless gère l'infrastructure et s'adapte au trafic, mais le premier appel après une pause peut être plus lent."
  - id: permissions-iam
    prompt: "Qui contrôle ce qu'un job SageMaker a le droit de lire dans S3 ?"
    answer: "Les droits IAM d'AWS, comme pour les autres services"
    decoys:
      - "Un système de permissions propre à SageMaker, séparé de celui d'AWS"
      - "Le code d'entraînement, qui s'authentifie auprès de S3 avec un mot de passe"
    why: "SageMaker fait partie d'AWS : droits IAM, réseau et facturation sont communs aux autres services."
  - id: endpoint
    prompt: "Qu'est-ce qu'un endpoint SageMaker ?"
    answer: "Le point d'accès où un modèle déployé répond aux requêtes d'inférence"
    decoys:
      - "L'instance temporaire qui exécute un job d'entraînement avant de s'arrêter"
      - "Le dossier S3 où sont déposées les données d'entraînement"
    why: "Un endpoint sert le modèle pour l'inférence. L'instance d'entraînement est éphémère, et les données vivent dans S3."
  - id: entrainement-ponctuel
    prompt: "Un entraînement lourd sur GPU, une fois par mois. Pourquoi SageMaker convient-il ?"
    answer: "On ne paie les instances que pendant la durée du job"
    decoys:
      - "AWS garantit que les GPU restent réservés à l'équipe entre deux entraînements"
      - "Le job tourne gratuitement tant que le modèle produit est stocké dans S3"
    why: "Les instances démarrent pour le job et s'arrêtent à la fin. Aucune réservation permanente n'est facturée."
  - id: arret-endpoint
    prompt: "Comment éviter de payer pour un endpoint temps réel qui ne sert plus ?"
    answer: "L'arrêter ou le supprimer, ou choisir un mode d'inférence adapté au trafic"
    decoys:
      - "Attendre : un endpoint sans requête cesse d'être facturé de lui-même"
      - "Supprimer le modèle dans S3, ce qui arrête aussitôt la facturation de l'endpoint"
    why: "Un endpoint temps réel facture ses instances tant qu'il tourne, même sans requête. Supprimer le modèle dans S3 ne l'arrête pas."
  - id: tarifs
    prompt: "Où trouver le coût exact d'une instance SageMaker ?"
    answer: "Dans la grille tarifaire officielle d'AWS"
    decoys:
      - "Dans la documentation de SageMaker, qui fixe un forfait unique à tous les clients"
      - "Dans la console du job d'entraînement, qui facture toujours le même montant forfaitaire"
    why: "Les prix évoluent et dépendent des instances : la source fiable est la grille tarifaire officielle."
  - id: bedrock-ou-sagemaker
    prompt: "Entraîner son propre modèle sur GPU, ou appeler par API le modèle d'un éditeur tiers : quel service pour chaque besoin ?"
    answer: "SageMaker pour entraîner le sien, Bedrock pour appeler un modèle tiers"
    decoys:
      - "Bedrock pour entraîner le sien, SageMaker pour appeler un modèle tiers"
      - "SageMaker pour les deux, Bedrock servant seulement à stocker les modèles"
    why: "SageMaker couvre l'entraînement et l'hébergement de ses modèles. Bedrock donne accès par API à des modèles d'éditeurs tiers."
  - id: rester-portable
    prompt: "Une équipe veut garder la possibilité de changer de cloud. Quelle approche limite la dépendance à AWS ?"
    answer: "MLflow sur une infrastructure maison ou sur un autre cloud"
    decoys:
      - "Utiliser SageMaker en n'employant que ses API propres, puis tout migrer en un seul clic"
      - "Réserver à l'avance des instances SageMaker pour plusieurs années"
    why: "SageMaker crée une forte dépendance au fournisseur. MLflow, open-source, reste portable."
  - id: cadre-complet
    prompt: "Dans quel cas SageMaker apporte-t-il le plus de valeur ?"
    answer: "Besoin d'un cadre complet (suivi, registre, déploiement, montée en charge) chez un seul fournisseur"
    decoys:
      - "Un simple appel ponctuel à un LLM hébergé, sans aucun modèle propre"
      - "Une équipe qui veut changer de cloud sans effort"
    why: "SageMaker réunit les étapes du cycle d'un modèle chez AWS. Pour un simple appel de LLM ou pour rester portable, il est moins adapté."
  - id: choix-instances
    prompt: "Comment choisit-on la puissance de calcul d'un job d'entraînement ?"
    answer: "On demande les instances voulues, éventuellement avec GPU, et AWS les démarre"
    decoys:
      - "On réserve d'abord un serveur dédié, sur lequel les jobs tourneront ensuite"
      - "On ne choisit rien : SageMaker déduit seul la puissance depuis le code"
    why: "Le job précise les instances à utiliser. AWS les démarre pour le job, puis les arrête."
  - id: eviter-serveurs
    prompt: "Qu'évite SageMaker à une équipe ML ?"
    answer: "Gérer elle-même les serveurs et les GPU"
    decoys:
      - "Écrire le code d'entraînement de ses modèles"
      - "Choisir les données qui servent à l'entraînement"
    why: "SageMaker fournit l'infrastructure managée. Le code d'entraînement et le choix des données restent à la charge de l'équipe."
  - id: faible-trafic
    prompt: "Un modèle n'est appelé que quelques fois par jour, avec un budget serré. Quel choix limite le coût ?"
    answer: "L'inférence serverless, ou un traitement par lots, plutôt qu'un endpoint toujours allumé"
    decoys:
      - "Un endpoint temps réel, qui ne facture que les requêtes réellement servies"
      - "Un job d'entraînement permanent, qui garde le modèle chaud en mémoire"
    why: "Un endpoint temps réel facture ses instances même sans requête. Un job d'entraînement ne sert pas de modèle."
  - id: modele-deploye
    prompt: "Que déploie-t-on sur un endpoint SageMaker ?"
    answer: "Le modèle produit par le job d'entraînement, stocké dans S3"
    decoys:
      - "Le notebook de développement tel qu'il a été écrit dans Studio"
      - "Le jeu de données d'entraînement, que l'endpoint relit à chaque requête"
    why: "Le job écrit le modèle dans S3, puis on le déploie sur un endpoint pour l'inférence. Le notebook et les données ne sont pas servis."
  - id: suivi-experiences
    prompt: "Pourquoi suivre les expériences d'entraînement avec un serveur MLflow managé dans SageMaker ?"
    answer: "Garder un outil open-source sans avoir à opérer soi-même le serveur"
    decoys:
      - "Remplacer le registre de modèles de SageMaker, que MLflow rend inutile"
      - "Faire tourner les jobs d'entraînement sur les serveurs d'une autre société"
    why: "Le serveur MLflow est hébergé et géré par AWS : on garde l'outil sans l'exploiter. Il ne remplace ni le registre ni les jobs."
---
