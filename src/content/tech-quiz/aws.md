---
questions:
  - id: modele-economique
    prompt: "Quel modèle AWS a-t-il popularisé ?"
    answer: "Louer l'infrastructure à la demande et la facturer à l'usage"
    decoys:
      - "Vendre des serveurs physiques installés chez le client"
      - "Une licence annuelle fixe, quel que soit l'usage"
    why: "Plus besoin de prévoir la capacité des mois à l'avance : on crée machines, bases et files par API en quelques minutes, et on paie ce qu'on consomme."
  - id: premiers-services
    prompt: "Quels services ont ouvert AWS au public en 2006 ?"
    answer: "S3, puis EC2"
    decoys:
      - "Lambda, puis DynamoDB"
      - "Redshift, puis EMR"
    why: "AWS a démarré publiquement avec le stockage d'objets S3 puis les machines virtuelles EC2. DynamoDB date de 2012, Lambda de 2014."
  - id: ec2
    prompt: "Qu'est-ce qu'EC2 ?"
    answer: "Le service de machines virtuelles d'AWS"
    decoys:
      - "Le service de stockage d'objets d'AWS"
      - "Le service de gestion des droits d'accès d'AWS"
    why: "EC2 fournit le calcul (machines virtuelles). Le stockage d'objets, c'est S3 ; les droits d'accès, IAM."
  - id: iam
    prompt: "À quoi sert IAM ?"
    answer: "Gérer les identités et les droits d'accès aux ressources AWS"
    decoys:
      - "Exécuter des fonctions serverless à la demande"
      - "Isoler dans un réseau privé virtuel les ressources d'un compte AWS"
    why: "IAM décide qui peut faire quoi sur quelle ressource. Les fonctions serverless, c'est Lambda ; le réseau privé, VPC."
  - id: mvp
    prompt: "Petite équipe sans compétences cloud, MVP à livrer vite. Que conseille la fiche ?"
    answer: "Un PaaS (Heroku, Vercel…), qui livre plus vite sans configurer réseau ni droits IAM"
    decoys:
      - "AWS directement : son catalogue est le plus vaste, donc c'est le plus rapide pour livrer"
      - "Kubernetes sur AWS dès le départ, pour ne jamais avoir à migrer"
    why: "La richesse d'AWS a un prix : réseau, droits IAM et coûts à configurer. Pour un MVP sans compétences cloud, un PaaS va plus vite."
  - id: surprises-facture
    prompt: "Quelles sources de surprise sur la facture AWS la fiche cite-t-elle ?"
    answer: "La facturation à l'usage, les transferts sortants et les ressources oubliées"
    decoys:
      - "Les frais d'installation des datacenters"
      - "Les licences obligatoires par cœur de processeur, facturées à chaque nouvelle machine"
    why: "Sans suivi, une ressource oubliée continue de coûter, et les données qui sortent d'AWS se paient."
  - id: dependance
    prompt: "Quel est l'effet d'utiliser beaucoup de services propres à AWS ?"
    answer: "Une migration vers un autre fournisseur coûte plus cher"
    decoys:
      - "Les performances baissent à cause des échanges entre services"
      - "Le support d'AWS cesse d'être inclus"
    why: "Plus on s'appuie sur des services spécifiques (DynamoDB, Lambda…), plus il faut réécrire pour partir : c'est la dépendance au fournisseur."
  - id: base-managee
    prompt: "Lequel de ces services est une base relationnelle managée d'AWS ?"
    answer: "RDS"
    decoys:
      - "VPC"
      - "EC2"
    why: "RDS (comme Aurora) fournit des bases relationnelles managées. VPC est le réseau privé, EC2 les machines virtuelles."
  - id: services-data
    prompt: "Lesquels de ces services AWS relèvent de la data ?"
    answer: "Redshift et EMR"
    decoys:
      - "IAM et VPC"
      - "Lambda et EC2"
    why: "Redshift est l'entrepôt de données d'AWS, EMR son service managé pour Spark et Hadoop."
  - id: bon-choix
    prompt: "Dans quel cas AWS est-il un bon choix ?"
    answer: "Une infrastructure qui doit grandir avec des besoins variés, et une équipe qui maîtrise réseau, droits et coûts"
    decoys:
      - "Un prototype monté en un week-end par un développeur seul, sans compétences cloud et sans personne pour suivre les coûts"
      - "Un site vitrine statique, sans back-end ni base de données"
    why: "AWS brille quand les besoins se diversifient (bases managées, data, files, CDN) et que l'équipe sait le configurer. Pour un prototype ou un site statique, c'est surdimensionné."
  - id: zone-disponibilite
    prompt: "Qu'est-ce qu'une zone de disponibilité (Availability Zone) chez AWS ?"
    answer: "Un ou plusieurs datacenters isolés des autres zones d'une même région"
    decoys:
      - "Un pays dans lequel AWS a le droit de facturer ses services cloud"
      - "Un sous-réseau privé créé automatiquement dans chaque nouveau compte AWS"
    why: "Une région regroupe plusieurs zones de disponibilité, isolées les unes des autres pour qu'une panne locale n'en touche qu'une. Ce n'est ni une notion de facturation ni un sous-réseau."
  - id: multi-az
    prompt: "Pourquoi répartir une application sur plusieurs zones de disponibilité ?"
    answer: "Pour qu'elle survive à la panne d'une zone entière"
    decoys:
      - "Pour ne plus payer les transferts de données entre ses serveurs"
      - "Pour échapper aux droits IAM, qui sont définis zone par zone"
    why: "Si une zone tombe, les instances des autres zones continuent de servir. Cela ne supprime pas les frais de transfert, et IAM est global au compte, pas propre à une zone."
  - id: vpc
    prompt: "Qu'est-ce qu'un VPC chez AWS ?"
    answer: "Un réseau privé virtuel isolé, dans lequel on place ses ressources"
    decoys:
      - "Un cache en mémoire placé devant les bases de données managées"
      - "Une machine virtuelle préconfigurée avec un serveur web prêt à l'emploi"
    why: "Le VPC définit le réseau (sous-réseaux, routage, règles de trafic) où vivent instances et bases. Le cache et les machines virtuelles relèvent d'autres services."
  - id: moindre-privilege
    prompt: "Quel principe suivre en écrivant des politiques IAM ?"
    answer: "Le moindre privilège : n'accorder que les droits strictement nécessaires"
    decoys:
      - "Donner les droits administrateur à tous, puis retirer ceux qui posent problème"
      - "Partager un seul utilisateur IAM et ses clés entre toute l'équipe, pour simplifier"
    why: "Limiter les droits limite les dégâts d'une erreur ou d'une clé volée. Des droits administrateur généralisés ou un utilisateur partagé font l'inverse et empêchent de savoir qui a fait quoi."
  - id: compte-racine
    prompt: "Que recommande AWS pour le compte racine (root) d'un compte AWS ?"
    answer: "Le protéger par une authentification multifacteur et ne pas s'en servir au quotidien"
    decoys:
      - "S'en servir pour toutes les opérations courantes, puisqu'il possède tous les droits sur le compte"
      - "Partager ses identifiants avec l'équipe, pour éviter de créer des utilisateurs IAM"
    why: "Le compte racine peut tout faire, y compris fermer le compte : on le verrouille et on travaille avec des identités IAM aux droits limités."
  - id: role-iam
    prompt: "Comment une instance EC2 doit-elle obtenir le droit de lire un bucket S3 ?"
    answer: "Par un rôle IAM attaché à l'instance, qui fournit des identifiants temporaires"
    decoys:
      - "Par des clés d'accès permanentes écrites en dur dans le code de l'application"
      - "Par les identifiants du compte racine, copiés dans un fichier sur la machine"
    why: "Le rôle évite de stocker des secrets : AWS fournit et renouvelle des identifiants temporaires. Des clés en dur ou le compte racine sur la machine sont des fuites en attente."
  - id: cloudformation
    prompt: "Quel service AWS décrit une infrastructure dans des modèles déclaratifs (infrastructure as code) ?"
    answer: "CloudFormation"
    decoys:
      - "CloudWatch"
      - "CloudTrail"
    why: "CloudFormation crée et met à jour les ressources décrites dans un modèle YAML ou JSON. CloudWatch surveille, CloudTrail journalise les appels d'API."
  - id: cloudwatch
    prompt: "À quoi sert Amazon CloudWatch ?"
    answer: "Collecter les métriques et les journaux des ressources, et déclencher des alarmes"
    decoys:
      - "Enregistrer qui a appelé quelle API sur le compte, pour l'audit de sécurité"
      - "Distribuer du contenu statique depuis des points de présence proches des visiteurs"
    why: "CloudWatch est l'outil d'observabilité d'AWS. L'audit des appels d'API, c'est CloudTrail ; la distribution de contenu, CloudFront."
  - id: cloudtrail
    prompt: "Quel service enregistre les appels d'API effectués sur un compte AWS, pour l'audit ?"
    answer: "CloudTrail"
    decoys:
      - "CloudFront"
      - "Route 53"
    why: "CloudTrail garde la trace de qui a fait quoi et quand sur le compte. CloudFront est le CDN, Route 53 le DNS."
  - id: cloudfront
    prompt: "Qu'est-ce qu'Amazon CloudFront ?"
    answer: "Le CDN d'AWS, qui sert le contenu depuis des points de présence proches des visiteurs"
    decoys:
      - "Le service DNS d'AWS, qui traduit les noms de domaine en adresses IP pour les visiteurs"
      - "Un équilibreur de charge qui répartit les requêtes entre les instances EC2 d'une région"
    why: "CloudFront met en cache le contenu au plus près des utilisateurs. Le DNS, c'est Route 53 ; la répartition entre instances, Elastic Load Balancing."
  - id: route-53
    prompt: "Quel service AWS gère les noms de domaine et le DNS ?"
    answer: "Route 53"
    decoys:
      - "Elastic Beanstalk"
      - "Direct Connect"
    why: "Route 53 enregistre des domaines et répond aux requêtes DNS. Elastic Beanstalk déploie des applications, Direct Connect relie un datacenter à AWS par une liaison dédiée."
  - id: sqs-sns
    prompt: "Quelle différence entre Amazon SQS et Amazon SNS ?"
    answer: "SQS est une file lue par des consommateurs ; SNS diffuse chaque message à ses abonnés"
    decoys:
      - "SQS stocke des fichiers dans des buckets ; SNS exécute des fonctions à la demande"
      - "SQS est une base relationnelle managée ; SNS en est la réplique en lecture seule"
    why: "SQS met les messages en attente jusqu'à ce qu'un consommateur les traite ; SNS les pousse à tous ses abonnés (publication-abonnement). Les fichiers, c'est S3 ; les fonctions, Lambda."
  - id: conteneurs
    prompt: "Quels services AWS font tourner des conteneurs ?"
    answer: "ECS, EKS et Fargate"
    decoys:
      - "RDS, Aurora et DynamoDB"
      - "Redshift, EMR et Athena"
    why: "ECS est l'orchestrateur maison, EKS du Kubernetes managé, Fargate exécute les conteneurs sans gérer de machines. Les autres listes sont des bases et des services data."
  - id: eks
    prompt: "Qu'est-ce qu'Amazon EKS ?"
    answer: "Un service de Kubernetes managé par AWS"
    decoys:
      - "Le registre d'images de conteneurs d'AWS"
      - "Un entrepôt de données en colonnes d'AWS"
    why: "EKS gère le plan de contrôle Kubernetes. Le registre d'images, c'est ECR ; l'entrepôt de données, Redshift."
  - id: instances-spot
    prompt: "Que sont les instances Spot d'EC2 ?"
    answer: "De la capacité inutilisée vendue moins cher, qu'AWS peut reprendre avec un court préavis"
    decoys:
      - "Des machines réservées pour un an ou plus, contre un engagement de paiement à l'avance"
      - "Des instances dédiées, garanties sans aucun autre client sur le même serveur physique"
    why: "Spot convient aux traitements interruptibles (lots, calculs). L'engagement sur la durée correspond aux instances réservées, le serveur physique exclusif aux instances dédiées."
  - id: responsabilite-partagee
    prompt: "Que dit le modèle de responsabilité partagée d'AWS ?"
    answer: "AWS sécurise l'infrastructure ; le client sécurise ce qu'il y configure : droits, données, réseau"
    decoys:
      - "AWS est responsable de toute la sécurité, y compris des droits IAM mal configurés par le client"
      - "Le client sécurise aussi les datacenters physiques, AWS ne fournissant que le réseau mondial"
    why: "AWS protège le matériel, les datacenters et ses services ; un bucket laissé public ou une politique IAM trop large reste la responsabilité du client."
  - id: budgets
    prompt: "Quel outil AWS permet d'être alerté quand les dépenses approchent d'un seuil ?"
    answer: "AWS Budgets"
    decoys:
      - "AWS CloudTrail"
      - "AWS IAM Identity Center"
    why: "AWS Budgets envoie des alertes quand les coûts réels ou prévus dépassent un montant fixé. CloudTrail audite les appels d'API, IAM Identity Center gère les connexions des utilisateurs."
  - id: dynamodb
    prompt: "Qu'est-ce qu'Amazon DynamoDB ?"
    answer: "Une base NoSQL clé-valeur et documents, entièrement managée"
    decoys:
      - "Une base relationnelle compatible avec PostgreSQL et MySQL"
      - "Un entrepôt de données analytique, interrogé en SQL standard"
    why: "DynamoDB stocke des éléments accessibles par clé, sans serveur à gérer. La base relationnelle compatible PostgreSQL et MySQL, c'est Aurora ; l'entrepôt, Redshift."
  - id: athena
    prompt: "Quel service AWS interroge en SQL des fichiers stockés dans S3, sans serveur à gérer ?"
    answer: "Athena"
    decoys:
      - "Aurora"
      - "Elastic Beanstalk"
    why: "Athena lit directement les fichiers (CSV, Parquet…) dans S3. Aurora est une base relationnelle qui stocke ses propres données, Elastic Beanstalk un service de déploiement d'applications."
  - id: well-architected
    prompt: "Qu'est-ce que l'AWS Well-Architected Framework ?"
    answer: "Un ensemble de bonnes pratiques pour évaluer et améliorer une architecture"
    decoys:
      - "Un outil qui déploie automatiquement une architecture de référence complète"
      - "Une certification obligatoire pour ouvrir un compte AWS d'entreprise"
    why: "Il organise les bonnes pratiques en piliers (sécurité, fiabilité, coûts…) et sert de grille de revue. Ce n'est ni un outil de déploiement ni une condition d'accès."
---
