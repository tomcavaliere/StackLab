---
questions:
  - id: pull
    prompt: "Comment Prometheus collecte-t-il les métriques ?"
    answer: "Il interroge régulièrement une URL /metrics exposée par chaque service (modèle « pull »)"
    decoys:
      - "Chaque service lui envoie chaque événement dès qu'il se produit (modèle « push »)"
      - "Il lit et analyse les fichiers de journaux de chaque service"
    why: "C'est Prometheus qui va chercher les métriques, à intervalle régulier."
  - id: series-temporelles
    prompt: "Comment Prometheus stocke-t-il les métriques ?"
    answer: "En séries temporelles étiquetées (service, instance, code HTTP…)"
    decoys:
      - "En documents JSON, un par mesure"
      - "En tables relationnelles, une par service surveillé"
    why: "Chaque série est une suite de valeurs dans le temps, identifiée par ses étiquettes."
  - id: promql
    prompt: "À quoi sert PromQL ?"
    answer: "Calculer des taux, des percentiles et des agrégations sur les métriques"
    decoys:
      - "Construire des tableaux de bord HTML, sans passer par Grafana"
      - "Fouiller les journaux applicatifs"
    why: "PromQL est le langage de requête de Prometheus ; il sert aussi à écrire les règles d'alerte."
  - id: alertmanager
    prompt: "Quel composant envoie les notifications d'alerte ?"
    answer: "L'Alertmanager"
    decoys:
      - "Grafana Tempo"
      - "Sentry"
    why: "Les règles d'alerte déclenchent des notifications via l'Alertmanager. Tempo stocke des traces ; Sentry suit les erreurs."
  - id: journaux
    prompt: "Centraliser les journaux des services : est-ce le rôle de Prometheus ?"
    answer: "Non : ce sont d'autres outils (Loki, Elasticsearch…)"
    decoys:
      - "Oui : c'est son rôle principal"
      - "Oui, en les interrogeant avec PromQL comme des métriques"
    why: "Prometheus gère des métriques. Journaux et traces relèvent d'autres outils."
  - id: long-terme
    prompt: "Conserver des métriques sur de longues durées, à très grande échelle ?"
    answer: "Le stockage local a ses limites : Thanos ou Mimir prennent le relais"
    decoys:
      - "Prometheus le fait nativement, sans aucune limite de durée ni de volume"
      - "Il faut tout exporter dans Sentry"
    why: "Le stockage local d'un serveur Prometheus n'est pas fait pour des années d'historique à grande échelle."
  - id: origine
    prompt: "Où Prometheus a-t-il été créé ?"
    answer: "Chez SoundCloud, en 2012"
    decoys:
      - "Chez Google, à partir de Borg"
      - "Chez LinkedIn, avec Kafka"
    why: "Prometheus vient de SoundCloud. Borg a inspiré Kubernetes."
  - id: cncf
    prompt: "Quel statut Prometheus a-t-il à la CNCF ?"
    answer: "Deuxième projet hébergé, après Kubernetes"
    decoys:
      - "Premier projet hébergé, avant Kubernetes"
      - "Il ne fait pas partie de la CNCF"
    why: "Prometheus a rejoint la CNCF juste après Kubernetes."
  - id: kubernetes
    prompt: "Pourquoi Prometheus est-il pratique sur Kubernetes ?"
    answer: "Il découvre automatiquement les services à surveiller"
    decoys:
      - "Il remplace le planificateur de Kubernetes pour placer les pods"
      - "Il construit les images des conteneurs"
    why: "Pas besoin de déclarer chaque service à la main : il les trouve dans le cluster."
  - id: quoi-alerter
    prompt: "Sur quoi la fiche conseille-t-elle d'alerter ?"
    answer: "Sur des indicateurs de service (taux d'erreurs, latence) plutôt que sur des signaux bas niveau"
    decoys:
      - "Sur chaque ligne de journal contenant le mot « error », pour ne rien laisser passer"
      - "Uniquement sur l'utilisation du processeur"
    why: "Une alerte doit signaler ce que vivent les utilisateurs : erreurs et lenteurs."
---
