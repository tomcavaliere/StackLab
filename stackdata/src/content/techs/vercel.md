---
name: Vercel
kind: plateforme
layers: [cloud]
tags: [paas, serverless, web]
difficulty: 1
summary: "Hébergement pour applications front et full-stack JavaScript : déploiement à chaque push Git, préversion par branche, fonctions serverless et CDN."
alternatives:
  - tech: heroku
    note: "PaaS généraliste pour des serveurs qui tournent en continu, dans de nombreux langages."
---

## Problème résolu

Mettre en ligne une application front, c'est configurer un build, un CDN, des certificats et des environnements de test. Vercel (anciennement ZEIT, éditeur de Next.js) automatise tout cela : on relie un dépôt Git, chaque push déclenche un build et chaque branche obtient sa propre URL de préversion. Les pages sont servies depuis un réseau mondial, et le code serveur (rendu, routes d'API) s'exécute en fonctions serverless.

L'intégration avec Next.js est la plus poussée, mais d'autres frameworks front sont pris en charge.

## Quand l'utiliser

- Application Next.js ou front moderne, de l'MVP à la production.
- Équipe front qui veut des préversions par branche pour faire valider chaque changement.
- Sites et applications dont le back-end se limite à des routes légères ou à des services externes.

## Quand l'éviter

- Processus de longue durée : workers, tâches planifiées lourdes, serveurs WebSocket. Les fonctions serverless ont des durées d'exécution limitées.
- Back-end principal dans un autre langage avec une base à côté : un PaaS généraliste ou un cloud est plus adapté.
- Fort trafic à budget serré : la facturation à l'usage peut monter vite, à surveiller.

## Pour aller plus loin

- [Documentation officielle](https://vercel.com/docs)
- [Déploiements de préversion](https://vercel.com/docs/deployments/environments)
