---
name: MySQL
kind: base-de-donnees
layers: [base-operationnelle]
languages: [sql]
tags: [open-source, relationnel, transactionnel, offre-managee]
difficulty: 2
summary: "Base de données relationnelle open-source parmi les plus répandues du web, aujourd'hui propriété d'Oracle."
alternatives:
  - tech: postgresql
    note: "Plus riche en types, en fonctions SQL et en extensions ; souvent le choix par défaut des nouveaux projets."
---

## Problème résolu

Comme PostgreSQL, MySQL (1995) stocke les données d'une application dans des tables, avec des transactions et un langage de requête standard. Il a été le « M » de la pile LAMP (Linux, Apache, MySQL, PHP) et a porté une grande partie du web des années 2000. Racheté par Sun en 2008, puis passé chez Oracle avec Sun en 2010, il a donné naissance au fork MariaDB.

Son moteur de stockage par défaut depuis la version 5.5, InnoDB, apporte les transactions ACID, le verrouillage par ligne et le MVCC. La réplication est simple à mettre en place. Pour répartir les données sur de nombreux serveurs, des outils comme Vitess (né chez YouTube) ajoutent un sharding au-dessus.

## Quand l'utiliser

- Application web classique, surtout si l'équipe ou l'hébergeur maîtrise déjà MySQL.
- Écosystèmes historiquement liés à MySQL (PHP, WordPress) ou parc existant.
- Charges dominées par des lectures simples et répétées, avec des répliques en lecture.

## Quand l'éviter

- Besoin de types avancés, de SQL analytique riche ou d'extensions (géospatial poussé, vecteurs) : PostgreSQL est mieux pourvu.
- Analytique sur de gros historiques : un moteur colonnaire est conçu pour ça.
- Gouvernance : certaines organisations préfèrent MariaDB ou PostgreSQL pour ne pas dépendre d'Oracle.

## Pour aller plus loin

- [Documentation officielle](https://dev.mysql.com/doc/)
- [Le moteur InnoDB](https://dev.mysql.com/doc/refman/8.4/en/innodb-introduction.html)
