---
name: MongoDB
kind: base-de-donnees
layers: [base-operationnelle]
tags: [nosql, document, source-available, offre-managee]
difficulty: 2
summary: "Base de données orientée documents : chaque enregistrement est un document de type JSON au schéma souple, avec réplication et sharding intégrés."
alternatives:
  - tech: postgresql
    note: "Relationnel, schéma strict, jointures et intégrité en base ; sa colonne JSONB couvre une partie des besoins « document »."
---

## Problème résolu

Certaines données se lisent naturellement comme un tout : un profil avec ses préférences, un article avec ses blocs de contenu, un événement avec des attributs variables. Une base relationnelle oblige à les découper en plusieurs tables, puis à les recomposer par jointure. MongoDB stocke ce tout tel quel dans un document (format BSON, proche de JSON), sans imposer la même structure à tous les documents d'une collection.

La base intègre la réplication (replica sets) et le partitionnement horizontal sur plusieurs serveurs (sharding). Les écritures sur un document sont atomiques. Les transactions multi-documents existent depuis la version 4.0, mais la documentation officielle rappelle qu'elles coûtent plus cher et ne remplacent pas un schéma bien pensé : le modèle vise à ce que la plupart des écritures tiennent dans un seul document.

## Quand l'utiliser

- Données à structure variable ou changeante, lues et écrites surtout comme un bloc (catalogue produits hétérogène, contenus, événements).
- Besoin anticipé de répartir les données sur plusieurs serveurs, avec un sharding fourni par la base.
- Équipe qui veut manipuler en base des objets proches de ceux du code applicatif.

## Quand l'éviter

- Données fortement reliées, avec beaucoup de jointures et de contraintes d'intégrité : on finit par réimplémenter le relationnel dans le code.
- Reporting en SQL ad hoc : le langage de requête de MongoDB et son pipeline d'agrégation ne sont pas du SQL.
- « Schéma souple » ne veut pas dire « pas de schéma » : sans discipline, ou sans la validation de schéma que MongoDB propose, les documents dérivent et le code de lecture doit gérer toutes les variantes.
- Licence : depuis fin 2018, le serveur est sous licence SSPL, qui n'est pas reconnue comme open-source par l'OSI. Cela pèse surtout si on veut le proposer comme service hébergé à des tiers.

## Pour aller plus loin

- [Documentation officielle](https://www.mongodb.com/docs/manual/)
- [Modélisation des données](https://www.mongodb.com/docs/manual/data-modeling/)
- [Transactions](https://www.mongodb.com/docs/manual/core/transactions/)
