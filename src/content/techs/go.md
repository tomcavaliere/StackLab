---
name: Go
kind: langage
layers: []
tags: [typage-statique, open-source, cloud-native]
difficulty: 2
summary: "Langage compilé et volontairement simple, conçu chez Google, avec la concurrence intégrée : très utilisé pour les services réseau et l'outillage cloud."
---

## Problème résolu

Go (annoncé par Google en 2009, version 1.0 en 2012) vise des programmes serveur rapides à compiler, simples à lire et faciles à déployer. Le compilateur produit un binaire unique, sans dépendance à installer sur la machine cible. Le langage reste petit : peu de mots-clés, un formatage imposé (`gofmt`), et les génériques ne sont arrivés qu'en 2022 (Go 1.18).

La concurrence fait partie du langage : les goroutines sont des tâches légères, ordonnancées par le runtime Go, qui communiquent par des canaux. Un serveur peut ainsi traiter beaucoup de connexions simultanées avec un code séquentiel lisible. Une grande partie de l'outillage cloud est écrite en Go : Docker, Kubernetes, Prometheus et Terraform notamment.

## Quand l'utiliser

- API et services réseau à fort trafic, proxys, microservices.
- Outils en ligne de commande et agents d'infrastructure à distribuer en un seul binaire.
- Équipe qui veut un langage typé, performant et rapide à apprendre.

## Quand l'éviter

- Data science et machine learning : l'écosystème est sans commune mesure avec celui de Python.
- Application web « batteries incluses » avec ORM, administration et authentification : Go laisse assembler soi-même ces briques, là où Django ou Rails les fournissent.
- Interfaces graphiques ou mobile : ce n'est pas son terrain.

## Pour aller plus loin

- [A Tour of Go](https://go.dev/tour/)
- [Effective Go](https://go.dev/doc/effective_go)
