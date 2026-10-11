---
questions:
  - id: declaratif
    prompt: "Quel est le modèle de fonctionnement de Kubernetes ?"
    answer: "Déclaratif : on décrit l'état voulu, des boucles de contrôle en rapprochent le cluster en permanence"
    decoys:
      - "Impératif : on lance chaque commande de déploiement à la main, dans l'ordre, sur chacune des machines"
      - "PaaS : on pousse le code source, et la plateforme construit l'application"
    why: "On déclare quelles images, combien d'instances, quelles ressources ; Kubernetes corrige sans cesse l'écart avec la réalité."
  - id: role
    prompt: "Que fait Kubernetes ?"
    answer: "Il place, redémarre et met à l'échelle des conteneurs sur un cluster"
    decoys:
      - "Il construit les images de conteneurs à partir d'un Dockerfile"
      - "Il capture les erreurs applicatives avec leur pile d'appels"
    why: "Kubernetes orchestre des conteneurs déjà construits (avec Docker, par exemple). Les erreurs applicatives relèvent de Sentry."
  - id: objets
    prompt: "Quels objets décrivent l'état voulu dans Kubernetes ?"
    answer: "Des Deployments, des Services… décrits en YAML"
    decoys:
      - "Des Dockerfile, un par service, lus par le cluster"
      - "Des DAG écrits en Python, planifiés par le cluster"
    why: "Deployments, Services et autres objets s'écrivent en YAML. Le Dockerfile construit l'image ; les DAG sont ceux d'Airflow."
  - id: borg
    prompt: "De quel système interne de Google Kubernetes s'inspire-t-il ?"
    answer: "Borg"
    decoys:
      - "Dremel"
      - "Bigtable"
    why: "Google a créé Kubernetes en 2014 à partir de son expérience avec Borg. Dremel a inspiré BigQuery."
  - id: offres-managees
    prompt: "Lesquelles sont des offres managées de Kubernetes ?"
    answer: "EKS, GKE et AKS"
    decoys:
      - "EC2, S3 et IAM"
      - "MWAA, MSK et EMR"
    why: "Chaque grand cloud a son Kubernetes managé : EKS (AWS), GKE (Google), AKS (Azure)."
  - id: mvp
    prompt: "MVP d'une petite équipe : Kubernetes est-il un bon choix ?"
    answer: "Non : sa complexité dépasse de loin le besoin ; un PaaS ou un service de conteneurs managé suffit"
    decoys:
      - "Oui : il devient indispensable dès le premier conteneur, sinon impossible de passer en production plus tard"
      - "Oui : il est plus simple à prendre en main qu'Heroku"
    why: "Réseau, stockage, sécurité, mises à jour du cluster : Kubernetes se justifie avec de nombreux services et une équipe plateforme."
  - id: monolithe
    prompt: "Une seule application monolithique : que conseille la fiche ?"
    answer: "Un PaaS ou quelques machines avec Docker suffisent"
    decoys:
      - "Kubernetes, qui découpe automatiquement le monolithe en microservices"
      - "Kubernetes, parce que Docker ne peut lancer qu'un seul conteneur"
    why: "Kubernetes ne découpe rien ; il sert à orchestrer beaucoup de conteneurs. Pour une seule application, c'est surdimensionné."
  - id: metriques
    prompt: "Quel outil est le standard de fait pour les métriques sur Kubernetes ?"
    answer: "Prometheus"
    decoys:
      - "Sentry"
      - "Airflow"
    why: "Prometheus découvre automatiquement les services du cluster et collecte leurs métriques."
  - id: helm
    prompt: "Qu'est-ce que Helm, dans l'écosystème Kubernetes ?"
    answer: "Un gestionnaire de paquets qui installe des applications sous forme de charts"
    decoys:
      - "Le planificateur interne qui place les conteneurs sur les nœuds"
      - "Un moteur de stockage distribué intégré au cluster, qui réplique les volumes entre les nœuds"
    why: "Helm empaquette et installe des applications Kubernetes (charts). Le placement des conteneurs est fait par le planificateur de Kubernetes lui-même."
  - id: interface-standard
    prompt: "Pourquoi une organisation choisit-elle Kubernetes pour tourner sur plusieurs clouds ?"
    answer: "C'est une interface d'infrastructure standard, disponible partout"
    decoys:
      - "Il synchronise automatiquement les données entre les clouds"
      - "Il réduit d'office la facture de chaque cloud"
    why: "Les mêmes descriptions YAML se déploient sur EKS, GKE, AKS ou ses propres serveurs."
  - id: sans-competences
    prompt: "Quel risque court une équipe sans compétences Kubernetes ?"
    answer: "Un cluster mal configuré est un risque de sécurité et de disponibilité"
    decoys:
      - "Kubernetes refuse de démarrer sans certification de l'équipe"
      - "Les conteneurs tournent nettement plus lentement que s'ils étaient lancés sans Kubernetes"
    why: "La fiche le range dans « Quand l'éviter » : un cluster mal tenu expose l'infrastructure."
---
