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
---
