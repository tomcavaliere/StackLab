---
name: Oracle Database
kind: base-de-donnees
layers: [base-operationnelle]
languages: [sql]
tags: [relationnel, transactionnel, offre-managee]
difficulty: 3
summary: "Base de données relationnelle commerciale d'Oracle, très présente dans les grandes entreprises : robuste et riche en fonctions de haute disponibilité, mais chère et complexe à licencier."
alternatives:
  - tech: postgresql
    note: "Open-source, sans licence à payer : la cible la plus fréquente des migrations depuis Oracle."
  - tech: sql-server
    note: "L'autre grande base commerciale, naturelle dans un environnement Microsoft."
integratesWith:
  - tech: aws
    note: "Proposée en service managé (Amazon RDS for Oracle), avec la licence incluse ou apportée par le client."
---

## Problème résolu

Les systèmes critiques des grandes organisations (banque, assurance, télécoms, administrations, progiciels de gestion) ont besoin d'une base relationnelle qui tienne de très gros volumes de transactions, sans perte de données et sans interruption. Oracle Database, l'une des premières bases relationnelles commerciales (fin des années 1970), occupe ce terrain depuis des décennies.

Elle apporte les transactions ACID et un moteur MVCC, comme les autres bases relationnelles, avec un ensemble d'outils d'entreprise :

- **PL/SQL** : le langage procédural d'Oracle, pour écrire des procédures stockées, des fonctions et des déclencheurs exécutés dans la base.
- **RAC** (*Real Application Clusters*) : plusieurs serveurs travaillent sur la même base, pour la disponibilité et la montée en charge.
- **Data Guard** : une base de secours (*standby*) tenue à jour par réplication, prête à prendre le relais.
- **Partitionnement**, compression, chiffrement, audit : souvent des **options payantes** de l'édition Enterprise.

Une édition gratuite et limitée existe pour apprendre et développer. Oracle propose aussi sa base en service managé dans son cloud (Autonomous Database), et elle est disponible sur AWS (RDS for Oracle).

## Quand l'utiliser

- L'entreprise l'utilise déjà, avec des équipes, des procédures PL/SQL et des progiciels qui en dépendent : migrer coûte cher et comporte des risques.
- Systèmes critiques à très forte charge transactionnelle, où les fonctions de haute disponibilité intégrées (RAC, Data Guard) et le support d'un éditeur sont exigés.
- Progiciel qui impose ou recommande Oracle.

## Quand l'éviter

- **Nouveau projet, startup, budget limité** : le coût des licences et du support est élevé, et PostgreSQL couvre la plupart des besoins sans licence.
- **Licences complexes** : le prix dépend du nombre de processeurs, de l'édition et des options activées. Une option utilisée sans licence peut coûter cher lors d'un audit de l'éditeur.
- **Dépendance à l'éditeur** : le PL/SQL et les fonctions propres à Oracle rendent une future migration longue.
- Petite équipe sans DBA : l'administration demande des compétences spécialisées.

## Pour aller plus loin

- [Documentation officielle d'Oracle Database](https://docs.oracle.com/en/database/oracle/oracle-database/)
