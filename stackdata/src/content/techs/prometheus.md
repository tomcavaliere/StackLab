---
name: Prometheus
kind: outil-infra
layers: [observabilite]
tags: [open-source, metriques, cncf, cloud-native]
difficulty: 2
summary: "Système de métriques open-source : il collecte les séries temporelles exposées par les services, les stocke, et déclenche des alertes à partir de requêtes PromQL."
integratesWith:
  - tech: grafana
    note: "Grafana affiche les métriques de Prometheus en tableaux de bord."
---

## Problème résolu

Savoir si un service va bien demande des mesures continues : nombre de requêtes, taux d'erreurs, latence, mémoire. Prometheus, créé chez SoundCloud en 2012 et deuxième projet hébergé par la CNCF après Kubernetes, collecte ces métriques en interrogeant régulièrement une URL `/metrics` exposée par chaque service (modèle « pull »). Il les stocke comme séries temporelles étiquetées (service, instance, code HTTP…).

Le langage PromQL calcule des taux, des percentiles et des agrégations. Des règles d'alerte déclenchent des notifications via l'Alertmanager. Dans Kubernetes, il découvre automatiquement les services à surveiller.

## Quand l'utiliser

- Surveillance d'API et de services, en particulier sur Kubernetes, où il est le standard de fait.
- Alertes sur des indicateurs de service (taux d'erreurs, latence) plutôt que sur des signaux bas niveau.

## Quand l'éviter

- Journaux ou traces : ce sont d'autres outils (Loki, Tempo, Elasticsearch…).
- Conservation de métriques sur de longues durées ou à très grande échelle : le stockage local d'un serveur Prometheus a ses limites, et des projets comme Thanos ou Mimir prennent le relais.
- Petite application sur un PaaS : les métriques fournies par l'hébergeur et un outil d'erreurs suffisent souvent.

## Pour aller plus loin

- [Documentation officielle](https://prometheus.io/docs/introduction/overview/)
- [Bases de PromQL](https://prometheus.io/docs/prometheus/latest/querying/basics/)
