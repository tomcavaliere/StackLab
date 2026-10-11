---
questions:
  - id: role
    prompt: "Que fait Grafana ?"
    answer: "Il affiche des tableaux de bord et des alertes branchés sur de nombreuses sources"
    decoys:
      - "Il collecte lui-même les métriques en interrogeant chaque service"
      - "Il capture les exceptions des applications avec leur pile d'appels et le contexte de la requête"
    why: "Grafana visualise des données venues de Prometheus, de bases SQL, d'Elasticsearch… La collecte, c'est Prometheus ; les exceptions, Sentry."
  - id: pas-de-stockage
    prompt: "Grafana stocke-t-il les métriques qu'il affiche ?"
    answer: "Non : il interroge les sources à chaque affichage"
    decoys:
      - "Oui, dans une base de séries temporelles intégrée"
      - "Oui, en copiant chaque nuit les données des sources"
    why: "Grafana est une couche de visualisation. Pour stocker, Grafana Labs propose d'autres projets (Mimir, Loki, Tempo)."
  - id: duo
    prompt: "Avec quel outil Grafana forme-t-il le duo classique de la surveillance ?"
    answer: "Prometheus"
    decoys:
      - "Sentry"
      - "Airflow"
    why: "Prometheus collecte et stocke les métriques, Grafana les met en tableaux de bord."
  - id: loki
    prompt: "Dans la suite de Grafana Labs, à quoi sert Loki ?"
    answer: "Stocker les journaux"
    decoys:
      - "Stocker les traces"
      - "Stocker les métriques"
    why: "Loki pour les journaux, Tempo pour les traces, Mimir pour les métriques."
  - id: tempo
    prompt: "Dans la suite de Grafana Labs, à quoi sert Tempo ?"
    answer: "Stocker les traces"
    decoys:
      - "Stocker les journaux"
      - "Planifier les alertes"
    why: "Tempo stocke les traces, Loki les journaux, Mimir les métriques ; Grafana les affiche."
  - id: erreurs
    prompt: "Suivre les erreurs applicatives avec leur pile d'appels : est-ce le rôle de Grafana ?"
    answer: "Non : c'est le rôle de Sentry"
    decoys:
      - "Oui : c'est sa fonction principale"
      - "Oui, grâce à Mimir"
    why: "Sentry capture chaque exception avec son contexte et la regroupe ; Grafana affiche des métriques."
  - id: bi
    prompt: "Analyse métier pour des utilisateurs non techniques : que préférer ?"
    answer: "Un outil de BI, comme Metabase ou Superset"
    decoys:
      - "Grafana, conçu d'abord pour la BI des équipes métier"
      - "Prometheus, avec PromQL"
    why: "Grafana vise l'état des systèmes. Pour l'analyse métier, un outil de BI est plus adapté."
  - id: licence
    prompt: "Sous quelle licence est Grafana depuis 2021 ?"
    answer: "AGPLv3"
    decoys:
      - "SSPL"
      - "Functional Source License"
    why: "Grafana est passé à l'AGPLv3 en 2021. La SSPL est la licence de MongoDB, la Functional Source License celle de Sentry."
  - id: sans-source
    prompt: "Grafana installé seul, sans aucune source de métriques : est-il utile ?"
    answer: "Non : il n'a rien à afficher"
    decoys:
      - "Oui : il produit ses propres métriques sur les applications"
      - "Oui : il interroge directement les applications sans configuration"
    why: "Grafana a besoin de sources ; la fiche le range dans « Quand l'éviter » si aucune n'est en place."
  - id: interet
    prompt: "Quel est l'intérêt de Grafana pour une équipe ?"
    answer: "Rassembler des sources hétérogènes sur des tableaux de bord partagés"
    decoys:
      - "Remplacer la base de données de production par des séries temporelles"
      - "Déployer les applications sur un cluster"
    why: "Métriques, journaux, bases SQL : un même écran, partagé par toute l'équipe, avec des alertes."
---
