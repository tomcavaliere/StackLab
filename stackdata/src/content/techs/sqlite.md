---
name: SQLite
kind: base-de-donnees
layers: [base-operationnelle]
languages: [sql]
tags: [open-source, relationnel, transactionnel, embarque]
difficulty: 1
summary: "Base relationnelle embarquée : une bibliothèque qui lit et écrit une base complète dans un seul fichier, sans serveur à installer."
alternatives:
  - tech: postgresql
    note: "Un serveur auquel plusieurs instances se connectent, avec écritures concurrentes, utilisateurs et droits : le choix dès que l'application tourne sur plusieurs machines."
---

## Problème résolu

Une application qui stocke des données structurées n'a pas toujours besoin d'un serveur de base de données à installer, configurer et sauvegarder. SQLite (D. Richard Hipp, 2000) est une bibliothèque en C liée directement à l'application : la base entière tient dans un seul fichier, lu et écrit par le processus lui-même. Elle offre du SQL et des transactions ACID, sans configuration.

Elle est intégrée à Android, à iOS, aux navigateurs et à d'innombrables logiciels, et son code est dans le domaine public. Le prix de cette simplicité : un seul écrivain à la fois (les lectures continuent pendant une écriture en mode WAL), et un fichier qui vit sur une seule machine. StackData lui-même enregistre sa progression dans un fichier SQLite.

## Quand l'utiliser

- Base locale d'une application mobile, de bureau ou d'un outil en ligne de commande, y compris hors ligne.
- Petite application web sur un seul serveur, à trafic modeste : Rails 8 la présente comme une option viable en production, plus seulement en développement.
- Tests, prototypes, échange de données : une base complète se copie comme un fichier.

## Quand l'éviter

- Plusieurs serveurs d'application qui écrivent dans la même base : le fichier est local à une machine. Il faut une base client-serveur comme PostgreSQL.
- Écritures très concurrentes : elles passent une par une.
- Hébergement au disque éphémère (dynos Heroku, conteneurs sans volume) : le fichier disparaît au redémarrage. Des outils comme Litestream répliquent la base vers un stockage objet, mais c'est une brique de plus.
- Utilisateurs et droits gérés par la base : SQLite n'en a pas, l'accès dépend des permissions du fichier.

## Pour aller plus loin

- [Documentation officielle](https://www.sqlite.org/docs.html)
- [Usages appropriés de SQLite](https://www.sqlite.org/whentouse.html)
