---
name: ClickHouse
kind: base-de-donnees
layers: [stockage-analytique]
languages: [sql]
tags: [open-source, colonnaire, distribue, offre-managee]
difficulty: 2
summary: "Base analytique colonnaire open-source, conçue pour agréger en SQL de gros volumes d'événements à mesure qu'ils arrivent, souvent derrière des tableaux de bord en temps réel."
alternatives:
  - tech: snowflake
    note: "Entrepôt managé pensé pour les analystes et la BI, sans serveur à opérer."
  - tech: duckdb
    note: "Même famille colonnaire, mais embarquée dans un processus : pour l'analyse locale, sans serveur."
---

## Problème résolu

Les applications produisent des flots d'événements (clics, journaux, mesures) qu'on veut agréger à la demande : combien de visites par page sur la dernière heure, par pays. Une base orientée lignes relit chaque ligne en entier. ClickHouse (développé chez Yandex, open-source depuis 2016) range les données par colonne, les compresse et parallélise le calcul : une requête ne lit que les colonnes dont elle a besoin.

Il s'interroge en SQL, ingère en continu (de préférence par lots) et sert souvent de moteur derrière des tableaux de bord interactifs, de l'analytique produit ou de l'observabilité. ClickHouse Inc., créée en 2021, en propose une offre managée (ClickHouse Cloud).

## Quand l'utiliser

- Analytique en temps réel sur de gros volumes d'événements : tableaux de bord produit, statistiques affichées aux utilisateurs d'une application.
- Journaux et métriques à conserver longtemps et à agréger.
- Équipe prête à opérer une base analytique, ou à prendre l'offre managée.

## Quand l'éviter

- Base transactionnelle d'une application : les mises à jour et suppressions unitaires y sont coûteuses, et il n'offre pas les transactions d'une base comme PostgreSQL.
- Données qui tiennent sur une machine et analyses ponctuelles : DuckDB suffit, sans serveur.
- Équipe d'analystes qui veut surtout un entrepôt SQL partagé, sans exploitation : un entrepôt managé (Snowflake, BigQuery) est plus simple. Les jointures complexes y demandent aussi plus d'attention.

## Pour aller plus loin

- [Documentation officielle](https://clickhouse.com/docs)
- [Qu'est-ce que ClickHouse ? (stockage en colonnes)](https://clickhouse.com/docs/intro)
