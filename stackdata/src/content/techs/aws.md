---
name: AWS
kind: plateforme
layers: [cloud]
tags: [cloud-public, offre-managee]
difficulty: 3
summary: "Le plus ancien et le plus vaste des grands clouds publics : calcul, stockage, bases managées, réseau et des centaines d'autres services à la demande."
alternatives:
  - tech: heroku
    note: "PaaS bien plus simple pour une application web standard, au prix du contrôle et d'un coût unitaire plus élevé."
integratesWith:
  - tech: aws-s3
    note: "Le service de stockage d'objets d'AWS, souvent le premier utilisé."
  - tech: dynamodb
    note: "Base NoSQL managée d'AWS."
---

## Problème résolu

Acheter et opérer ses propres serveurs impose de prévoir la capacité des mois à l'avance et de tout gérer, du matériel au réseau. Amazon Web Services, lancé publiquement en 2006 avec S3 puis EC2, loue cette infrastructure à la demande et facture à l'usage. On crée des machines virtuelles, des bases managées ou des files de messages par API, en quelques minutes, dans des régions du monde entier.

Le catalogue couvre presque tout : calcul (EC2, Lambda, conteneurs), stockage (S3), bases (RDS, DynamoDB, Aurora), data (Redshift, EMR), réseau et sécurité (VPC, IAM). La plupart des grandes architectures de référence publiées par l'industrie s'appuient dessus.

## Quand l'utiliser

- Infrastructure qui doit grandir, avec des besoins variés : bases managées, data, files, CDN.
- Entreprise qui veut un large choix de services managés et de régions.
- Équipe qui a, ou acquiert, les compétences pour configurer réseau, droits d'accès et coûts.

## Quand l'éviter

- MVP d'une petite équipe sans compétences cloud : un PaaS (Heroku, Vercel…) livre plus vite, sans configurer réseau ni droits IAM.
- Budget à maîtriser sans suivi : la facturation à l'usage, les transferts sortants et les ressources oubliées réservent des surprises.
- Dépendance au fournisseur : plus on utilise de services propres à AWS, plus une migration coûte.

## Pour aller plus loin

- [Documentation officielle](https://docs.aws.amazon.com/)
- [AWS Well-Architected Framework](https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html)
