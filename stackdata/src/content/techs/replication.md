---
name: Réplication
kind: concept
layers: []
tags: [distribue, standard]
difficulty: 3
summary: "Tenir des copies à jour d'une base sur plusieurs serveurs : pour survivre à une panne, répartir les lectures ou rapprocher les données des utilisateurs."
integratesWith:
  - tech: postgresql
    note: "Réplication en continu par le journal (streaming replication), et réplication logique, table par table."
  - tech: mysql
    note: "Réplication par le journal binaire (binlog), simple à mettre en place, très utilisée pour les répliques en lecture."
  - tech: sauvegarde-restauration
    note: "La réplication protège d'une panne de serveur, pas d'une erreur : un DELETE se réplique aussi. Les sauvegardes restent indispensables."
---

## Problème résolu

Une base sur un seul serveur est un point de fragilité : si le serveur tombe, l'application tombe avec. Et un seul serveur finit par saturer quand les lectures se multiplient. La réplication tient des **copies à jour** de la base sur d'autres serveurs.

### Le schéma le plus courant : un primaire, des répliques

- Le **primaire** reçoit toutes les écritures.
- Les **répliques** (*replicas*, ou secondaires) reçoivent en continu les modifications du primaire, en général en rejouant son **journal** de transactions.
- Les répliques servent à :
  - la **haute disponibilité** : si le primaire tombe, une réplique est promue primaire (la **bascule**, *failover*) ;
  - la **répartition des lectures** : les requêtes de lecture (rapports, pages consultées) vont sur les répliques, ce qui soulage le primaire ;
  - la **proximité** : une réplique dans une autre région, près des utilisateurs, ou pour survivre à la perte d'un datacenter.

### Synchrone ou asynchrone

- **Asynchrone** : le primaire confirme l'écriture sans attendre les répliques. C'est rapide, mais les répliques ont un **retard** (*replication lag*). Si le primaire tombe, les dernières transactions confirmées mais pas encore transmises peuvent être **perdues**.
- **Synchrone** : le primaire attend qu'au moins une réplique ait reçu l'écriture avant de confirmer. Aucune perte à la bascule, mais chaque écriture est plus lente, et une réplique indisponible peut bloquer les écritures.

### Le piège du retard

Avec des répliques asynchrones, un utilisateur qui vient de modifier son profil peut, s'il est servi par une réplique en retard, revoir l'ancienne version. Pour les lectures qui suivent une écriture (« lire ce qu'on vient d'écrire »), on lit sur le primaire.

### Ce que la réplication n'est pas

- **Pas une sauvegarde** : une suppression par erreur, une corruption ou une attaque se répliquent aussitôt sur toutes les copies.
- **Pas du partitionnement** : répliquer **copie** toutes les données sur chaque serveur ; le **sharding** (partitionnement horizontal) les **répartit**, chaque serveur n'en ayant qu'une partie. La réplication multiplie la capacité de lecture, pas celle d'écriture.

### Plusieurs primaires

Certaines configurations acceptent les écritures sur plusieurs serveurs (**multi-primaire**). Deux serveurs peuvent alors modifier la même ligne en même temps : il faut une règle pour résoudre ces **conflits**. Une coupure réseau peut aussi faire croire à deux serveurs qu'ils sont chacun le primaire (*split-brain*). C'est puissant, mais nettement plus délicat à exploiter.

Chaque moteur a ses outils : streaming replication pour PostgreSQL, binlog pour MySQL, Data Guard pour Oracle, groupes de disponibilité Always On pour SQL Server. Les services managés (Amazon RDS, Cloud SQL, Azure SQL) proposent une réplique de secours et des répliques en lecture en quelques clics.

## Quand l'utiliser

- Base de production dont l'indisponibilité coûte cher : une réplique prête à prendre le relais.
- Lectures beaucoup plus nombreuses que les écritures : des répliques en lecture absorbent la charge.
- Utilisateurs ou équipes dans plusieurs régions, ou exigence de survivre à la perte d'un datacenter.
- Alimenter un autre système sans charger le primaire (une réplique pour les requêtes d'analyse).

## Quand l'éviter

- **Petite application sans exigence de disponibilité** : de bonnes sauvegardes testées suffisent souvent, sans la complexité d'une bascule.
- **Problème de capacité d'écriture** : les répliques n'en ajoutent pas. Il faut alimenter moins la base, optimiser, ou partitionner.
- **Lectures qui exigent la toute dernière écriture** sur des répliques asynchrones : sans précaution, l'utilisateur voit des données périmées.
- Multi-primaire sans besoin réel : la gestion des conflits et du split-brain demande une équipe qui maîtrise le sujet.

## Pour aller plus loin

- [Documentation de PostgreSQL : haute disponibilité et réplication](https://www.postgresql.org/docs/current/high-availability.html)
- [Documentation de MySQL : la réplication](https://dev.mysql.com/doc/refman/8.4/en/replication.html)
