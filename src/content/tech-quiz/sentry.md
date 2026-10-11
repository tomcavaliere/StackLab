---
questions:
  - id: role
    prompt: "Que fait Sentry ?"
    answer: "Il capture chaque exception avec sa pile d'appels et son contexte, la regroupe et alerte l'équipe"
    decoys:
      - "Il collecte les métriques de processeur et de mémoire des serveurs, puis les affiche en tableaux de bord"
      - "Il centralise tous les journaux des applications"
    why: "Sentry suit les erreurs applicatives. Les métriques relèvent de Prometheus, les journaux d'outils comme Loki ou Elasticsearch."
  - id: contexte
    prompt: "Quel contexte accompagne une erreur dans Sentry ?"
    answer: "La requête, l'utilisateur et la version déployée"
    decoys:
      - "Le code source complet du dépôt, à la bonne version"
      - "Le mot de passe de l'utilisateur"
    why: "On sait combien d'utilisateurs sont touchés, et depuis quelle version."
  - id: regroupement
    prompt: "Que fait Sentry des occurrences répétées d'une même erreur ?"
    answer: "Il les regroupe en un seul problème"
    decoys:
      - "Il ouvre un ticket séparé pour chaque occurrence"
      - "Il ne conserve que la première"
    why: "Le regroupement évite d'être noyé : un problème, son nombre d'occurrences, les utilisateurs touchés."
  - id: front-mobile
    prompt: "Pourquoi Sentry est-il précieux pour le front et le mobile ?"
    answer: "Leurs erreurs n'atteignent jamais les journaux du serveur"
    decoys:
      - "Le code front ne lève jamais d'erreur, contrairement au serveur"
      - "Il accélère le chargement des pages"
    why: "Une erreur dans le navigateur ou sur un téléphone reste invisible côté serveur sans un outil comme Sentry."
  - id: source-maps
    prompt: "À quoi servent les source maps avec le SDK JavaScript de Sentry ?"
    answer: "Lire le code d'origine dans les piles d'appels du navigateur"
    decoys:
      - "Compresser le JavaScript envoyé au navigateur"
      - "Afficher une carte du réseau de l'application et de ses dépendances"
    why: "Le code envoyé au navigateur est transformé et minifié ; les source maps permettent de retrouver le code écrit."
  - id: origine
    prompt: "Comment Sentry est-il né ?"
    answer: "Comme une extension Django, en 2008"
    decoys:
      - "Comme un module de Grafana"
      - "Comme un composant de Kubernetes"
    why: "Le SDK Python se branche toujours sur Django en quelques lignes."
  - id: licence
    prompt: "Sous quelle licence Sentry est-il distribué ?"
    answer: "Une licence « source disponible », la Functional Source License, depuis 2023"
    decoys:
      - "Apache 2.0, comme la plupart des projets open-source, sans aucune restriction d'usage"
      - "AGPLv3, comme Grafana depuis 2021"
    why: "Sentry s'auto-héberge, mais n'est pas open-source au sens de l'OSI. Grafana est sous AGPLv3."
  - id: metriques
    prompt: "Métriques d'infrastructure et tableaux de bord : est-ce le rôle de Sentry ?"
    answer: "Non : c'est celui de Prometheus et Grafana, ou d'une plateforme d'observabilité complète"
    decoys:
      - "Oui : c'est sa fonction principale, avec des tableaux de bord intégrés pour chaque serveur"
      - "Oui, grâce aux source maps"
    why: "Sentry se concentre sur les erreurs, avec un suivi des performances des requêtes."
  - id: donnees-personnelles
    prompt: "Quel risque Sentry pose-t-il pour les données personnelles ?"
    answer: "Les erreurs peuvent embarquer des données sensibles : il faut configurer le filtrage avant l'envoi"
    decoys:
      - "Aucun : Sentry efface toutes les données personnelles avant l'envoi, sans configuration à prévoir"
      - "Aucun : Sentry ne reçoit que des numéros de ligne"
    why: "Une requête ou un contexte d'erreur peut contenir des données personnelles."
  - id: quand
    prompt: "À partir de quand installer Sentry ?"
    answer: "Dès la mise en production, quelle que soit la taille"
    decoys:
      - "Seulement au-delà de 100 000 utilisateurs"
      - "Seulement quand Prometheus et Grafana sont déjà en place"
    why: "La fiche le présente comme l'outil d'observabilité le plus rentable pour une petite équipe."
---
