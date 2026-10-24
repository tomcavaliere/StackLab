---
name: Grafana
kind: outil-infra
layers: [observabilite]
tags: [open-source, dashboards, offre-managee]
difficulty: 1
summary: "Tableaux de bord et alertes branchés sur de nombreuses sources (Prometheus, bases SQL, journaux…) pour visualiser l'état des systèmes."
---

## Problème résolu

Les métriques et les journaux sont dispersés entre plusieurs systèmes, et les lire en requêtes brutes ne permet pas de voir d'un coup d'œil l'état d'un service. Grafana (2014, Grafana Labs) se connecte à ces sources (Prometheus, bases SQL, Elasticsearch, services cloud…) et affiche leurs données dans des tableaux de bord partagés, avec des alertes.

Il ne stocke pas les métriques lui-même : il interroge les sources. Grafana Labs propose aussi des systèmes de stockage (Loki pour les journaux, Tempo pour les traces, Mimir pour les métriques) et une offre hébergée. Le projet est sous licence AGPLv3 depuis 2021.

## Quand l'utiliser

- Visualiser les métriques de Prometheus : c'est le duo classique.
- Tableaux de bord communs à toute l'équipe, ou affichés en permanence pour surveiller un service.
- Rassembler sur un même écran des sources hétérogènes.

## Quand l'éviter

- Suivi des erreurs applicatives avec leur pile d'appels : c'est le rôle de Sentry.
- BI et analyse métier pour des utilisateurs non techniques : un outil de BI (Metabase, Superset…) est plus adapté.
- Sans source de métriques en place : Grafana n'a rien à afficher seul.

## Pour aller plus loin

- [Documentation officielle](https://grafana.com/docs/grafana/latest/)
- [Bien concevoir un tableau de bord](https://grafana.com/docs/grafana/latest/visualizations/dashboards/build-dashboards/best-practices/)
