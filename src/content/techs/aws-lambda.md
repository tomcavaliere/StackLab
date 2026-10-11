---
name: AWS Lambda
kind: service-cloud
layers: [cloud]
tags: [serverless, offre-managee]
difficulty: 2
summary: "Fonctions serverless d'AWS : on dépose du code, déclenché par un événement (requête HTTP, fichier, message), facturé seulement quand il s'exécute."
alternatives:
  - tech: heroku
    note: "PaaS qui exécute des processus en continu : plus simple pour une application web classique ou un worker permanent."
integratesWith:
  - tech: aws-s3
    note: "Une fonction peut se déclencher à chaque fichier déposé dans un bucket."
  - tech: dynamodb
    note: "Base managée sans connexion persistante, adaptée à des fonctions qui démarrent et s'arrêtent sans cesse."
---

## Problème résolu

Pour exécuter un bout de code quelques fois par jour (redimensionner une image déposée, traiter un message, répondre à un webhook), faire tourner un serveur en permanence coûte et demande de l'entretien. AWS Lambda (2014) exécute une fonction à la demande, en réaction à un événement : requête HTTP, fichier déposé dans S3, message dans une file, horaire. AWS démarre autant d'instances que nécessaire, puis aucune quand il n'y a rien à faire ; on paie le nombre d'appels et leur durée.

Les contraintes viennent avec : une exécution dure au plus 15 minutes, la fonction ne garde pas d'état entre deux appels, et une nouvelle instance met un moment à démarrer (démarrage à froid). De nombreuses instances simultanées peuvent aussi épuiser les connexions d'une base relationnelle.

## Quand l'utiliser

- Traitements déclenchés par des événements AWS : fichier déposé, message, changement en base.
- API ou tâches au trafic faible ou irrégulier, qui ne doivent rien coûter quand elles ne servent pas.
- Petites tâches planifiées et code de liaison entre services AWS.

## Quand l'éviter

- Processus de longue durée, workers permanents, serveurs WebSocket : la durée d'exécution est limitée.
- Trafic élevé et constant : des conteneurs ou des serveurs allumés en permanence peuvent revenir moins cher ; le calcul dépend du cas.
- Latence très serrée sur chaque requête : les démarrages à froid ajoutent du délai.
- Portabilité : le code et ses déclencheurs sont liés à AWS.

## Pour aller plus loin

- [Documentation officielle](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html)
- [Quotas Lambda (durée, mémoire)](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html)
