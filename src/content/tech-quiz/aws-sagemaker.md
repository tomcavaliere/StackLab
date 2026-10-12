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
---
