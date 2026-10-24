---
name: Amazon DynamoDB
kind: service-cloud
layers: [base-operationnelle]
tags: [nosql, cle-valeur, serverless, offre-managee]
difficulty: 2
summary: "Base clé-valeur et document entièrement managée par AWS : aucune machine à gérer, montée en charge automatique, mais une modélisation contrainte par les clés."
---

## Problème résolu

Opérer une base distribuée (réplication, partitionnement, pannes) est un métier. DynamoDB, lancé par AWS en 2012 et inspiré du système Dynamo décrit par Amazon en 2007, le prend en charge : on crée une table, on choisit une clé de partition (et éventuellement une clé de tri), et AWS répartit les données et la charge. La capacité est facturée à la demande ou réservée à l'avance.

L'accès se fait par clé ou par plage de clés de tri. Des index secondaires globaux ajoutent d'autres chemins d'accès. Des transactions existent, ainsi qu'un flux des modifications (Streams) pour déclencher des traitements.

## Quand l'utiliser

- API à fort trafic avec des accès connus à l'avance (par utilisateur, par session, par commande).
- Architecture serverless sur AWS (Lambda), où une base sans connexion persistante simplifie tout.
- Équipe qui veut zéro exploitation de base.

## Quand l'éviter

- Requêtes ad hoc, filtres variés, jointures ou reporting : il faut connaître ses requêtes avant de modéliser.
- Volonté de ne pas dépendre d'un fournisseur : l'API est propre à AWS.
- Accès très concentrés sur quelques clés : une partition chaude limite le débit, d'où l'importance du choix de clé.

## Pour aller plus loin

- [Documentation officielle](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)
- [Bonnes pratiques de modélisation](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html)
