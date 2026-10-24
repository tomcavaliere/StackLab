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
  - id: data-source
    prompt: "Dans Grafana, comment s'appelle la connexion configurée vers un système qui fournit les données (Prometheus, PostgreSQL…) ?"
    answer: "Une source de données (data source)"
    decoys:
      - "Un exportateur (exporter)"
      - "Un collecteur (collector)"
      - "Un connecteur d'ingestion (ingester)"
    why: "Grafana interroge des sources de données. Les exportateurs exposent des métriques pour Prometheus ; Grafana n'ingère rien lui-même."
  - id: panneau
    prompt: "Dans un tableau de bord Grafana, qu'est-ce qu'un panneau (panel) ?"
    answer: "Une visualisation (graphe, jauge, tableau…) alimentée par une ou plusieurs requêtes"
    decoys:
      - "Un onglet qui regroupe plusieurs tableaux de bord d'une même équipe"
      - "Une règle d'alerte attachée à un tableau de bord, sans visualisation propre"
    why: "Un tableau de bord est une grille de panneaux ; chacun exécute ses requêtes et affiche le résultat sous la forme choisie."
  - id: variables
    prompt: "Un même tableau de bord doit servir pour chaque instance d'un service, choisie dans une liste déroulante. Quel mécanisme de Grafana utiliser ?"
    answer: "Une variable de tableau de bord, réutilisée dans les requêtes"
    decoys:
      - "Une copie du tableau de bord par instance, mise à jour à la main"
      - "Une transformation qui filtre les résultats après chaque requête"
    why: "Une variable (par exemple $instance) alimente une liste déroulante et s'insère dans les requêtes : un seul tableau de bord pour toutes les instances."
  - id: json
    prompt: "Sous quelle forme un tableau de bord Grafana peut-il être exporté, versionné et réimporté ?"
    answer: "Un document JSON"
    decoys:
      - "Un fichier PromQL"
      - "Une image PNG annotée"
      - "Un script SQL"
    why: "Le modèle d'un tableau de bord est un document JSON : on peut le commiter, le relire et le recréer ailleurs."
  - id: provisioning
    prompt: "Comment configurer les sources de données et les tableaux de bord de Grafana sans clics, au démarrage ?"
    answer: "Par le provisioning : des fichiers de configuration lus au démarrage"
    decoys:
      - "En éditant à la main le fichier de la base interne, avant chaque démarrage"
      - "C'est impossible : tout se configure dans l'interface web, à la main"
    why: "Le provisioning décrit sources et tableaux de bord dans des fichiers (YAML, JSON) : la configuration devient reproductible et versionnée."
  - id: base-interne
    prompt: "Grafana ne stocke pas les métriques. Que conserve sa propre base de données (SQLite par défaut) ?"
    answer: "Sa configuration : utilisateurs, tableaux de bord, sources de données"
    decoys:
      - "Une copie des métriques des dernières vingt-quatre heures"
      - "Les journaux applicatifs envoyés par les services surveillés"
    why: "La base interne (SQLite, ou MySQL et PostgreSQL) garde l'état de Grafana ; les données affichées restent dans les sources."
  - id: admin-defaut
    prompt: "Que faire en premier après l'installation d'un serveur Grafana ?"
    answer: "Changer le mot de passe du compte admin créé par défaut"
    decoys:
      - "Importer les métriques historiques dans la base interne"
      - "Créer un compte admin, car l'installation n'en fournit aucun"
    why: "Grafana crée un compte admin au mot de passe connu (admin) et demande de le changer à la première connexion ; le laisser tel quel ouvre l'accès à tous."
  - id: port
    prompt: "Sur quel port un serveur Grafana écoute-t-il par défaut ?"
    answer: "3000"
    decoys:
      - "9090"
      - "8080"
      - "5601"
    why: "Grafana écoute sur 3000. 9090 est le port de Prometheus, 5601 celui de Kibana."
  - id: explore
    prompt: "Dans Grafana, à quoi sert la vue Explore ?"
    answer: "Interroger une source à la volée, sans construire de tableau de bord"
    decoys:
      - "Parcourir la place de marché des plugins et en installer de nouveaux"
      - "Découvrir automatiquement les services à surveiller dans un cluster"
    why: "Explore sert à l'investigation : on écrit des requêtes ad hoc, on compare métriques et journaux, puis on garde ce qui est utile."
  - id: annotations
    prompt: "Comment marquer les déploiements sur les graphes de Grafana pour les relier à un changement de comportement ?"
    answer: "Avec des annotations"
    decoys:
      - "Avec des transformations"
      - "Avec des variables"
      - "Avec des alertes"
    why: "Une annotation pose un repère daté sur les graphes ; elle peut venir d'une requête ou de l'API. Une transformation, elle, retravaille des résultats."
  - id: alerting
    prompt: "Dans l'alerting de Grafana, à quoi servent les points de contact (contact points) ?"
    answer: "Définir où envoyer les notifications : e-mail, Slack, PagerDuty…"
    decoys:
      - "Définir les seuils au-delà desquels une règle d'alerte se déclenche"
      - "Définir les sources de données que les règles d'alerte ont le droit de lire"
    why: "Une règle d'alerte évalue une condition ; les politiques de notification l'orientent vers un point de contact, qui précise le canal."
  - id: plugins
    prompt: "Quels types de plugins étendent Grafana ?"
    answer: "Des plugins de source de données, de panneau et d'application"
    decoys:
      - "Uniquement des plugins de thème graphique pour l'interface"
      - "Uniquement des pilotes de base de données écrits en SQL"
    why: "Un plugin peut ajouter une source de données, un type de visualisation, ou une application complète intégrée à Grafana."
  - id: logql
    prompt: "Avec quel langage interroge-t-on Loki depuis Grafana ?"
    answer: "LogQL"
    decoys:
      - "PromQL"
      - "TraceQL"
      - "KQL"
    why: "LogQL, inspiré de PromQL, interroge les journaux de Loki. PromQL vise les métriques de Prometheus, TraceQL les traces de Tempo."
  - id: mimir
    prompt: "Dans la suite de Grafana Labs, quel est le rôle de Mimir ?"
    answer: "Stocker des métriques compatibles Prometheus sur la durée et à grande échelle"
    decoys:
      - "Stocker des journaux indexés par étiquettes, à la manière d'Elasticsearch"
      - "Stocker des traces distribuées, interrogées depuis les panneaux de Grafana"
    why: "Mimir prend le relais du stockage local de Prometheus pour l'historique long. Les journaux, c'est Loki ; les traces, Tempo."
  - id: kibana
    prompt: "De quel projet Grafana est-il issu à l'origine ?"
    answer: "D'un fork de Kibana"
    decoys:
      - "D'un fork de Graphite"
      - "D'un fork de Prometheus"
      - "D'un fork de Nagios"
    why: "Grafana est né en 2014 d'un fork de Kibana 3, réorienté vers les métriques (au départ celles de Graphite)."
  - id: stat
    prompt: "Afficher en grand la valeur actuelle d'un indicateur (par exemple le nombre de requêtes par seconde) : quel type de panneau choisir ?"
    answer: "Stat"
    decoys:
      - "Heatmap"
      - "Logs"
      - "Node graph"
    why: "Le panneau Stat met en avant une valeur, avec une couleur selon les seuils. Heatmap montre une distribution, Logs des lignes de journal."
  - id: transformations
    prompt: "Dans un panneau Grafana, à quoi servent les transformations ?"
    answer: "Retravailler les résultats des requêtes (joindre, renommer, calculer) avant l'affichage"
    decoys:
      - "Modifier les données directement dans la source pour corriger les valeurs fausses"
      - "Convertir un tableau de bord d'une version de Grafana à une autre, au moment de l'import"
    why: "Les transformations s'appliquent dans Grafana, sur le résultat des requêtes ; la source n'est jamais modifiée."
  - id: mixed
    prompt: "Un même panneau Grafana peut-il combiner des requêtes vers des sources différentes ?"
    answer: "Oui, avec la source de données « Mixed »"
    decoys:
      - "Non : un panneau est lié à une seule source de données"
      - "Oui, mais seulement si les deux sources sont des bases SQL"
    why: "La source « Mixed » permet de choisir une source par requête dans un même panneau, par exemple Prometheus et une base SQL."
  - id: red
    prompt: "La documentation de Grafana cite la méthode RED pour concevoir le tableau de bord d'un service. Que mesure-t-elle ?"
    answer: "Le débit de requêtes, les erreurs et la durée"
    decoys:
      - "La redondance, la disponibilité et la latence disque"
      - "Le réseau, l'espace disque et la mémoire"
      - "Les relances, les échecs et les délais d'attente"
    why: "RED = Rate, Errors, Duration : les indicateurs vus par les utilisateurs d'un service. La méthode USE, elle, vise les ressources (utilisation, saturation, erreurs)."
  - id: rafraichissement
    prompt: "Un tableau de bord de 40 panneaux se rafraîchit toutes les 5 secondes, affiché sur plusieurs écrans. Quel risque ?"
    answer: "Surcharger les sources de données, interrogées à chaque rafraîchissement"
    decoys:
      - "Remplir la base interne de Grafana, qui copie chaque résultat affiché"
      - "Aucun : Grafana met en cache les résultats et n'interroge qu'une fois par heure"
    why: "Grafana ne stocke pas les données : chaque panneau relance ses requêtes à chaque rafraîchissement, sur chaque écran ouvert."
---
