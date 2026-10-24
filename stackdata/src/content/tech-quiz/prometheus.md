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
  - id: types-metriques
    prompt: "Quels sont les quatre types de métriques de Prometheus ?"
    answer: "Counter, gauge, histogram, summary"
    decoys:
      - "Counter, timer, meter, histogram, set"
      - "Gauge, event, trace, summary, info"
      - "Counter, gauge, log, span"
    why: "Ce sont les quatre types des bibliothèques clientes. Timer et meter viennent d'autres bibliothèques ; logs et spans relèvent des journaux et des traces."
  - id: counter
    prompt: "Qu'est-ce qui caractérise une métrique de type counter dans Prometheus ?"
    answer: "Elle ne fait qu'augmenter, sauf remise à zéro au redémarrage"
    decoys:
      - "Elle monte et descend librement, comme la mémoire utilisée"
      - "Elle ne compte que les événements de la dernière minute écoulée"
    why: "Un counter cumule (requêtes servies, erreurs) ; on en tire un débit avec rate(). Une valeur qui monte et descend est une gauge."
  - id: gauge
    prompt: "Quel type de métrique Prometheus choisir pour la mémoire utilisée par un processus ?"
    answer: "Une gauge"
    decoys:
      - "Un counter"
      - "Un summary"
      - "Un histogram"
    why: "La mémoire utilisée monte et descend : c'est une gauge. Un counter ne fait qu'augmenter ; histogram et summary décrivent des distributions."
  - id: rate
    prompt: "Que calcule la requête PromQL rate(http_requests_total[5m]) ?"
    answer: "Le nombre moyen de requêtes par seconde sur les 5 dernières minutes"
    decoys:
      - "Le nombre total de requêtes reçues depuis le démarrage du service"
      - "Le nombre de requêtes reçues pendant la dernière seconde des 5 minutes"
    why: "rate() donne un débit par seconde moyenné sur la fenêtre, en gérant les remises à zéro du counter."
  - id: rate-gauge
    prompt: "Pourquoi appliquer rate() à une gauge est-il une erreur classique ?"
    answer: "rate() suppose un counter croissant : une baisse est prise pour une remise à zéro"
    decoys:
      - "rate() refuse les gauges et renvoie une erreur de type dès l'évaluation de la requête"
      - "rate() ne s'applique qu'aux histogrammes, dont il calcule un percentile"
    why: "Sur une gauge, chaque baisse fausse le calcul. Pour la variation d'une gauge, on utilise par exemple deriv() ou delta()."
  - id: histogram-quantile
    prompt: "Quelle fonction PromQL estime le 95e percentile de latence à partir d'un histogramme ?"
    answer: "histogram_quantile(0.95, …)"
    decoys:
      - "percentile_over_time(0.95, …)"
      - "quantile_over_time(95, …)"
      - "avg_quantile(0.95, …)"
    why: "histogram_quantile estime un quantile à partir des buckets d'un histogramme, souvent combinée à rate()."
  - id: selecteur
    prompt: "Dans PromQL, que sélectionne http_requests_total{status=\"500\"} ?"
    answer: "Les séries de cette métrique dont l'étiquette status vaut 500"
    decoys:
      - "Les 500 dernières valeurs de chaque série de cette métrique"
      - "Les séries de cette métrique dont la valeur actuelle dépasse 500"
    why: "Les accolades filtrent sur les étiquettes. Un seuil sur la valeur s'écrit avec un opérateur de comparaison, par exemple > 500."
  - id: sum-by
    prompt: "Que fait sum by (service) (rate(http_requests_total[5m])) ?"
    answer: "Il additionne les débits de toutes les séries, avec un résultat par service"
    decoys:
      - "Il additionne les débits de toutes les séries en une seule valeur globale, sans étiquette"
      - "Il ne garde que la série du service qui a le débit le plus élevé sur 5 min"
    why: "by (service) conserve l'étiquette service et agrège tout le reste (instances, codes…). Sans by, on obtiendrait une valeur unique."
  - id: exporter
    prompt: "Comment surveiller avec Prometheus un logiciel qui n'expose pas lui-même de métriques (une machine Linux, une base de données) ?"
    answer: "Avec un exporter, qui traduit ses statistiques au format Prometheus"
    decoys:
      - "En configurant Prometheus pour lire directement les fichiers de ce logiciel"
      - "C'est impossible : seuls les logiciels instrumentés peuvent être surveillés"
    why: "Un exporter (node_exporter pour une machine, d'autres pour PostgreSQL, Redis…) expose une URL /metrics que Prometheus vient interroger."
  - id: pushgateway
    prompt: "Un job batch se termine en quelques secondes, avant que Prometheus ait pu l'interroger. Quelle solution prévoit Prometheus ?"
    answer: "La Pushgateway : le job y pousse ses métriques avant de s'arrêter"
    decoys:
      - "L'Alertmanager : le job lui envoie ses métriques à la fin"
      - "Rien : Prometheus garde la connexion ouverte jusqu'à la fin du job"
    why: "La Pushgateway conserve les métriques poussées pour que Prometheus les collecte ensuite. Elle est réservée à ce cas, pas aux services ordinaires."
  - id: cardinalite
    prompt: "Pourquoi ne faut-il pas mettre un identifiant d'utilisateur en étiquette d'une métrique Prometheus ?"
    answer: "Chaque valeur d'étiquette crée une série : leur nombre explose"
    decoys:
      - "Les étiquettes n'acceptent que des valeurs numériques et courtes"
      - "Les étiquettes sont publiques et lisibles par tous depuis Internet"
    why: "Une série par combinaison d'étiquettes : une étiquette à valeurs illimitées (utilisateur, e-mail, URL complète) fait exploser la mémoire et le stockage."
  - id: up
    prompt: "Que vaut la métrique up générée par Prometheus pour chaque cible ?"
    answer: "1 si la dernière collecte a réussi, 0 sinon"
    decoys:
      - "Le temps écoulé depuis le démarrage de la cible"
      - "Le nombre de redémarrages de la cible"
    why: "up est ajoutée automatiquement à chaque collecte ; alerter sur up == 0 détecte une cible injoignable."
  - id: for
    prompt: "Dans une règle d'alerte Prometheus, à quoi sert la clause for: 5m ?"
    answer: "L'alerte ne se déclenche que si la condition reste vraie 5 minutes"
    decoys:
      - "La règle n'est évaluée qu'une fois toutes les 5 minutes"
      - "L'alerte est automatiquement résolue au bout de 5 minutes, même si rien ne change"
    why: "Pendant ce délai, l'alerte est « pending » : cela évite d'alerter sur un pic passager."
  - id: alertmanager-fonctions
    prompt: "Que fait l'Alertmanager des alertes envoyées par Prometheus ?"
    answer: "Il les regroupe, les déduplique, applique silences et inhibitions, puis les route"
    decoys:
      - "Il évalue les règles PromQL et décide lui-même quand une alerte se déclenche"
      - "Il stocke l'historique des métriques qui ont déclenché chaque alerte"
    why: "Les règles sont évaluées par Prometheus ; l'Alertmanager gère la suite : regroupement, silences, envoi vers le bon canal."
  - id: recording-rules
    prompt: "Une requête PromQL coûteuse est utilisée par plusieurs tableaux de bord. Comment éviter de la recalculer à chaque affichage ?"
    answer: "Avec une recording rule, qui la précalcule et l'enregistre comme nouvelle série"
    decoys:
      - "Avec un exporter dédié, qui recalcule la requête au moment de chaque collecte des cibles"
      - "Avec une alerting rule, dont le résultat est mis en cache par l'Alertmanager"
    why: "Une recording rule est évaluée à intervalle régulier et stocke son résultat : les tableaux de bord lisent une série déjà calculée."
  - id: scrape-configs
    prompt: "Où déclare-t-on les cibles que Prometheus doit interroger ?"
    answer: "Dans la section scrape_configs du fichier de configuration"
    decoys:
      - "Dans le code de chaque service, qui s'inscrit auprès de Prometheus"
      - "Dans une table de la base interne, éditée depuis l'interface web"
    why: "scrape_configs liste les jobs et leurs cibles, statiques ou découvertes (Kubernetes, DNS, cloud…)."
  - id: facturation
    prompt: "Facturer chaque requête au client à l'unité près : Prometheus est-il adapté ?"
    answer: "Non : ses métriques sont échantillonnées, pas exactes à l'unité"
    decoys:
      - "Oui : c'est l'un des usages recommandés par sa documentation"
      - "Oui, à condition de passer par la Pushgateway"
    why: "La documentation de Prometheus le dit : pour une exactitude à 100 % (facturation à la requête), mieux vaut un autre système."
  - id: haute-disponibilite
    prompt: "Comment obtient-on la haute disponibilité avec Prometheus seul ?"
    answer: "En faisant tourner deux serveurs identiques qui collectent les mêmes cibles"
    decoys:
      - "En activant le mode cluster intégré, qui répartit les séries entre nœuds"
      - "En plaçant le stockage local sur un disque partagé entre deux serveurs"
    why: "Un serveur Prometheus est autonome, sans clustering natif. Deux serveurs en double, et l'Alertmanager déduplique les alertes."
  - id: nommage
    prompt: "Selon les conventions de Prometheus, comment nommer un counter de requêtes HTTP ?"
    answer: "http_requests_total"
    decoys:
      - "HttpRequestsCount"
      - "http.requests.count"
      - "http_requests_per_second"
    why: "Snake case, suffixe _total pour un counter, unités de base (secondes, octets). Le débit par seconde se calcule avec rate(), il ne se nomme pas."
  - id: instrumentation
    prompt: "Comment une application expose-t-elle ses propres métriques à Prometheus ?"
    answer: "Avec une bibliothèque cliente qui sert l'URL /metrics"
    decoys:
      - "En écrivant ses métriques dans une table SQL dédiée au monitoring"
      - "En envoyant chaque mesure à Grafana, qui les relaie"
    why: "Les bibliothèques clientes (Go, Java, Python…) définissent counters, gauges et histogrammes et les publient au format texte sur /metrics."
---
