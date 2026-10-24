---
name: SQL Server
kind: base-de-donnees
layers: [base-operationnelle]
languages: [sql]
tags: [relationnel, transactionnel, offre-managee]
difficulty: 2
summary: "Base de données relationnelle commerciale de Microsoft, intégrée à l'écosystème Windows, .NET et Azure, avec ses outils de reporting et d'intégration."
alternatives:
  - tech: postgresql
    note: "Open-source et sans licence, sur n'importe quel système et n'importe quel cloud."
integratesWith:
  - tech: aws
    note: "Aussi proposée en service managé sur AWS (Amazon RDS for SQL Server), en plus d'Azure SQL chez Microsoft."
---

## Problème résolu

Une entreprise équipée en Microsoft (Windows Server, Active Directory, applications .NET, Power BI) veut une base relationnelle qui s'intègre à tout cela, avec les outils et le support d'un seul éditeur. SQL Server répond à ce besoin. Il est longtemps resté réservé à Windows ; il tourne aussi sous Linux depuis la version 2017, et en conteneur.

On y retrouve les transactions ACID et le SQL standard, plus :

- **T-SQL** (*Transact-SQL*) : le dialecte SQL de Microsoft, avec ses procédures stockées, variables et structures de contrôle. Une syntaxe propre à SQL Server, par exemple `SELECT TOP 10` à la place de `LIMIT 10`.
- **SSMS** (*SQL Server Management Studio*) : l'outil graphique d'administration et de requêtes.
- Des services autour de la base : **SSIS** (intégration et chargement de données), **SSRS** (rapports), **SSAS** (cubes analytiques).
- **Always On** (groupes de disponibilité) : des répliques prêtes à prendre le relais, et lisibles pour décharger le serveur principal. Ce n'est pas une sauvegarde : une suppression par erreur se réplique aussitôt.

Plusieurs éditions existent : **Express** (gratuite, limitée), **Developer** (gratuite, réservée au développement et aux tests), Standard et Enterprise (payantes). Microsoft la propose aussi en service managé dans Azure (Azure SQL Database).

## Quand l'utiliser

- Environnement Microsoft : applications .NET, authentification Windows, reporting Power BI, Azure.
- Entreprise qui a déjà ses bases, ses équipes et ses processus sur SQL Server.
- Besoin d'outils intégrés d'intégration et de reporting, fournis par le même éditeur.

## Quand l'éviter

- **Nouveau projet hors écosystème Microsoft, budget serré** : les éditions de production sont payantes, alors que PostgreSQL ou MySQL ne coûtent rien en licence.
- **Portabilité** : le T-SQL et les outils propres à SQL Server lient l'application à l'éditeur.
- Équipe qui travaille sous Linux avec des outils libres : le support Linux existe, mais l'outillage et l'expérience de l'équipe sont plus riches côté PostgreSQL.

## Pour aller plus loin

- [Documentation officielle de SQL Server](https://learn.microsoft.com/fr-fr/sql/sql-server/)
- [Référence du langage T-SQL](https://learn.microsoft.com/fr-fr/sql/t-sql/language-reference)
