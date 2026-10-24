---
name: Transactions ACID
kind: concept
layers: []
languages: [sql]
tags: [relationnel, transactionnel, standard]
difficulty: 2
summary: "Grouper des opérations en une unité tout-ou-rien : atomicité, cohérence, isolation et durabilité garantissent qu'une base reste juste malgré les pannes et les accès simultanés."
integratesWith:
  - tech: postgresql
    note: "Transactions ACID et MVCC ; niveau d'isolation par défaut : read committed."
  - tech: mysql
    note: "Avec le moteur InnoDB : transactions ACID et MVCC ; niveau d'isolation par défaut : repeatable read."
---

## Problème résolu

Un virement de 100 € débite un compte puis en crédite un autre. Si le serveur tombe entre les deux opérations, 100 € disparaissent. Si deux virements lisent le même solde en même temps, l'un peut écraser l'autre. Une **transaction** regroupe plusieurs opérations en une seule unité : soit tout est appliqué, soit rien.

```sql
BEGIN;
UPDATE comptes SET solde = solde - 100 WHERE id = 1;
UPDATE comptes SET solde = solde + 100 WHERE id = 2;
COMMIT;      -- tout est enregistré ; ROLLBACK annulerait les deux mises à jour
```

### ACID

- **Atomicité** : tout ou rien. Une erreur, ou un `ROLLBACK`, annule toutes les opérations de la transaction.
- **Cohérence** : une transaction fait passer la base d'un état valide à un autre état valide, en respectant les contraintes (clés étrangères, unicité, `CHECK`).
- **Isolation** : des transactions simultanées ne se voient pas à moitié faites ; tout se passe, selon le niveau choisi, plus ou moins comme si elles s'exécutaient l'une après l'autre.
- **Durabilité** : une fois le `COMMIT` confirmé, la modification survit à une panne. La base l'écrit d'abord dans un **journal** (le *WAL*, *write-ahead log*, dans PostgreSQL) avant de confirmer.

### Les niveaux d'isolation

Une isolation parfaite coûte cher en performance ; le standard SQL définit donc des niveaux, du plus permissif au plus strict. Chacun empêche certaines anomalies :

- **Lecture sale** : lire une donnée écrite par une transaction qui n'a pas encore validé (et qui pourrait l'annuler).
- **Lecture non répétable** : relire la même ligne dans la transaction et trouver une autre valeur, modifiée entre-temps par une autre transaction.
- **Lecture fantôme** : relancer la même requête et voir apparaître de nouvelles lignes.

| Niveau | Empêche |
|---|---|
| Read uncommitted | presque rien |
| **Read committed** (défaut de PostgreSQL, SQL Server, Oracle) | les lectures sales |
| **Repeatable read** (défaut de MySQL avec InnoDB) | en plus, les lectures non répétables |
| **Serializable** | toutes les anomalies : le résultat est celui d'une exécution l'une après l'autre |

Plus le niveau est strict, plus la base doit bloquer ou annuler des transactions qui se gênent.

### Verrous, MVCC et interblocages

- Pour protéger les données, la base pose des **verrous**, en général sur les lignes modifiées.
- Le **MVCC** (*contrôle de concurrence multiversion*, utilisé par PostgreSQL, Oracle et MySQL avec InnoDB) garde plusieurs versions d'une ligne : chaque transaction lit une photo cohérente, et **les lectures ne bloquent pas les écritures**.
- Un **interblocage** (*deadlock*) survient quand deux transactions attendent chacune un verrou tenu par l'autre. La base le détecte et annule l'une des deux : l'application doit savoir **réessayer**.

## Quand l'utiliser

- Toute opération qui modifie plusieurs lignes ou plusieurs tables qui doivent rester cohérentes : virement, commande avec ses lignes et son stock, inscription avec son abonnement.
- Lectures qui doivent voir un état cohérent de plusieurs tables (un rapport financier).
- `SERIALIZABLE`, ou un verrou explicite (`SELECT … FOR UPDATE`), quand des règles métier dépendent de ce que d'autres transactions écrivent en même temps : ne pas vendre deux fois la dernière place.

## Quand l'éviter

- **Transactions longues** (une transaction ouverte pendant un appel réseau ou une saisie utilisateur) : elles tiennent des verrous et des versions anciennes, bloquent les autres et gonflent la base. On garde les transactions courtes.
- **Isolation maximale partout par réflexe** : `SERIALIZABLE` provoque plus d'échecs à réessayer ; le niveau par défaut suffit à la plupart des cas.
- **Transactions réparties entre plusieurs services** ou plusieurs bases : une transaction ACID ne traverse pas un appel réseau vers un autre service. On utilise alors d'autres méthodes (événements, compensations).
- Penser que toute base offre les mêmes garanties : beaucoup de bases NoSQL limitent les transactions (à un document, une partition), il faut le vérifier.

## Pour aller plus loin

- [Documentation de PostgreSQL : les transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html)
- [Documentation de PostgreSQL : niveaux d'isolation](https://www.postgresql.org/docs/current/transaction-iso.html)
- [Documentation de MySQL : niveaux d'isolation d'InnoDB](https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-isolation-levels.html)
