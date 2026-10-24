---
name: Kubernetes
kind: orchestrateur
layers: [conteneurs-infra]
tags: [conteneurs, open-source, cncf, cloud-native]
difficulty: 3
summary: "Orchestrateur de conteneurs : on déclare l'état voulu (quelles images, combien d'instances, quelles ressources), Kubernetes place, redémarre et met à l'échelle sur un cluster."
alternatives:
  - tech: heroku
    note: "PaaS : on pousse le code et la plateforme gère l'exécution. Beaucoup moins de contrôle, beaucoup moins de travail."
integratesWith:
  - tech: prometheus
    note: "Standard de fait pour les métriques des clusters et des applications qui y tournent."
---

## Problème résolu

Faire tourner des dizaines de conteneurs sur plusieurs machines pose sans cesse les mêmes questions : où placer chaque conteneur, le redémarrer s'il tombe, en ajouter quand la charge monte, répartir le trafic, déployer une nouvelle version sans coupure. Kubernetes, créé par Google en 2014 à partir de son expérience avec Borg, puis confié à la CNCF, répond par un modèle déclaratif : on décrit l'état voulu en YAML (Deployments, Services…) et des boucles de contrôle rapprochent en permanence le cluster de cet état.

C'est devenu une interface standard d'infrastructure, avec des offres managées chez tous les grands clouds (EKS, GKE, AKS) et un vaste écosystème : Helm, opérateurs, maillage de services.

## Quand l'utiliser

- Nombreux services conteneurisés, plusieurs équipes, besoin de déploiements et de mise à l'échelle standardisés.
- Organisation qui veut une même plateforme sur plusieurs clouds ou sur ses propres serveurs.
- Équipe plateforme dédiée, ou recours à une offre managée.

## Quand l'éviter

- MVP ou petite équipe : la complexité (réseau, stockage, sécurité, mises à jour du cluster) dépasse de loin le besoin. Un PaaS ou un service de conteneurs managé suffit.
- Une seule application monolithique : un PaaS ou quelques machines avec Docker suffisent.
- Sans compétences internes : un cluster mal configuré est un risque de sécurité et de disponibilité.

## Pour aller plus loin

- [Documentation officielle](https://kubernetes.io/fr/docs/home/)
- [Concepts](https://kubernetes.io/docs/concepts/)
