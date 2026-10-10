---
name: Apache Cassandra
kind: base-de-donnees
layers: [base-operationnelle]
tags: [open-source, nosql, distribue]
difficulty: 3
summary: "Base NoSQL distribuée sans nœud maître : conçue pour absorber des écritures massives réparties sur de nombreux serveurs et plusieurs datacenters."
alternatives:
  - tech: dynamodb
    note: "Modèle comparable, entièrement managé par AWS : pas de cluster à opérer, mais dépendance à AWS."
  - tech: postgresql
    note: "Tant que les données tiennent sur un serveur principal et ses répliques, beaucoup plus simple et plus souple à interroger."
---

## Problème résolu

Quand une application écrit énormément (messages, événements, flux d'activité) et doit rester disponible même si des serveurs ou un datacenter tombent, une base relationnelle unique devient le goulot d'étranglement. Cassandra, créée chez Facebook puis confiée à la fondation Apache, répartit les données sur un anneau de nœuds égaux, sans maître : chaque nœud accepte lectures et écritures, et chaque donnée est répliquée sur plusieurs nœuds.

La cohérence est réglable par requête : on choisit combien de répliques doivent répondre. Son stockage (arbre LSM) est optimisé pour les écritures. On l'interroge en CQL, qui ressemble à SQL mais sans jointures : on conçoit une table par requête à servir.

## Quand l'utiliser

- Très gros volumes d'écritures, croissance prévisible du nombre de nœuds, accès par clé connue (fil d'activité d'un utilisateur, séries temporelles).
- Disponibilité multi-datacenter exigée.
- Équipe capable d'opérer un cluster distribué, ou recours à une offre managée.

## Quand l'éviter

- Volume modeste : on paie la complexité d'un système distribué sans en avoir besoin.
- Requêtes ad hoc, jointures, transactions multi-lignes : le modèle ne s'y prête pas.
- Modèle de données encore instable : chaque nouvelle requête peut imposer une nouvelle table et une migration des données.

## Pour aller plus loin

- [Documentation officielle](https://cassandra.apache.org/doc/latest/)
- [Modélisation des données](https://cassandra.apache.org/doc/latest/cassandra/developing/data-modeling/intro.html)
