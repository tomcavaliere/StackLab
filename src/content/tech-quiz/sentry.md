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
  - id: dsn
    prompt: "Dans la configuration d'un SDK Sentry, à quoi sert le DSN ?"
    answer: "Indiquer au SDK le projet Sentry auquel envoyer les événements"
    decoys:
      - "Indiquer au SDK la base de données où écrire les journaux applicatifs"
      - "Indiquer au SDK le nom de domaine du site, pour filtrer les erreurs"
    why: "Le DSN (Data Source Name) contient l'adresse d'ingestion et la clé du projet ; sans lui, le SDK n'envoie rien."
  - id: event-issue
    prompt: "Dans le vocabulaire de Sentry, quelle différence entre un événement (event) et un problème (issue) ?"
    answer: "Un événement est une occurrence ; un problème regroupe les événements similaires"
    decoys:
      - "Un problème est une occurrence ; un événement regroupe les problèmes similaires entre eux"
      - "Un événement vient du front ; un problème vient toujours du back"
    why: "Chaque erreur envoyée est un événement ; Sentry les regroupe en problèmes, que l'équipe trie et résout."
  - id: breadcrumbs
    prompt: "Dans Sentry, que sont les breadcrumbs (fils d'Ariane) ?"
    answer: "Les actions et événements qui ont précédé l'erreur"
    decoys:
      - "Les commits qui ont modifié le fichier fautif"
      - "Les liens entre problèmes ayant la même cause"
      - "Les étapes pour reproduire, saisies par l'utilisateur"
    why: "Clics, requêtes réseau, navigations, logs : le SDK enregistre cette trace et l'attache à l'erreur pour comprendre comment on en est arrivé là."
  - id: fingerprint
    prompt: "Sentry regroupe à tort deux erreurs différentes dans un même problème. Quel mécanisme permet de corriger le regroupement ?"
    answer: "L'empreinte (fingerprint) ou des règles de regroupement"
    decoys:
      - "Le taux d'échantillonnage (sample rate)"
      - "Le DSN, en créant un second projet"
      - "Les breadcrumbs, filtrés par catégorie"
    why: "Le fingerprint décide quels événements forment un même problème ; on peut le personnaliser dans le SDK ou par des règles côté projet."
  - id: releases
    prompt: "Pourquoi déclarer les releases (versions déployées) dans Sentry ?"
    answer: "Savoir dans quelle version une erreur apparaît, et détecter les régressions"
    decoys:
      - "Déployer automatiquement la nouvelle version quand aucune erreur n'est signalée"
      - "Supprimer les erreurs des anciennes versions pour réduire le volume stocké"
    why: "Avec la version, Sentry indique où un problème est apparu et le rouvre comme régression s'il revient après avoir été résolu."
  - id: regression
    prompt: "Un problème marqué résolu réapparaît dans une version ultérieure. Que fait Sentry ?"
    answer: "Il le rouvre et le signale comme régression"
    decoys:
      - "Il l'ignore, puisqu'il a été marqué résolu"
      - "Il crée un problème neuf, sans lien avec l'ancien"
    why: "Le problème garde son historique : sa réapparition après résolution est une régression, notifiée à l'équipe."
  - id: environnement
    prompt: "Comment distinguer dans Sentry les erreurs de production de celles de préproduction ?"
    answer: "Avec l'option environment du SDK"
    decoys:
      - "Avec un fingerprint par serveur"
      - "Avec les breadcrumbs de navigation"
      - "Avec le numéro de ligne de l'erreur"
    why: "L'environnement (production, staging…) est attaché à chaque événement et sert de filtre dans l'interface et dans les alertes."
  - id: before-send
    prompt: "Avec quel mécanisme du SDK Sentry retirer un champ sensible d'un événement avant son envoi ?"
    answer: "Le hook beforeSend, qui peut modifier ou abandonner l'événement"
    decoys:
      - "Le DSN, en y ajoutant en paramètre la liste des champs à masquer"
      - "Le fingerprint, qui exclut les champs du regroupement"
    why: "beforeSend reçoit chaque événement avant l'envoi : on peut l'expurger ou renvoyer null pour ne pas l'envoyer. Le fingerprint ne touche qu'au regroupement."
  - id: capture-exception
    prompt: "Une erreur est attrapée par un try/catch et ne remonte donc pas automatiquement. Comment l'envoyer quand même à Sentry ?"
    answer: "En appelant captureException dans le bloc catch"
    decoys:
      - "En relançant le serveur avec le mode debug activé"
      - "En ajoutant un breadcrumb dans le bloc catch"
    why: "Le SDK capture d'office les exceptions non gérées ; une erreur attrapée doit être signalée explicitement. Un breadcrumb n'est qu'un repère."
  - id: set-user
    prompt: "Comment savoir combien d'utilisateurs distincts sont touchés par un problème Sentry ?"
    answer: "En renseignant l'utilisateur courant dans le SDK (setUser)"
    decoys:
      - "En comptant les occurrences, chacune correspondant à un utilisateur"
      - "En activant les source maps, qui identifient chaque navigateur"
    why: "Avec un identifiant d'utilisateur attaché aux événements, Sentry compte les utilisateurs touchés, distincts du nombre d'occurrences."
  - id: traces-sample-rate
    prompt: "Dans le SDK Sentry, à quoi sert l'option tracesSampleRate ?"
    answer: "Choisir la proportion de transactions envoyées pour le suivi des performances"
    decoys:
      - "Choisir la proportion d'utilisateurs autorisés à signaler une erreur"
      - "Choisir l'intervalle, en secondes, entre deux envois groupés d'erreurs au serveur"
    why: "Envoyer toutes les traces coûte cher en volume : on en échantillonne une fraction, entre 0 et 1."
  - id: tracing-distribue
    prompt: "Comment Sentry relie-t-il une requête du front aux appels qu'elle provoque dans plusieurs services back ?"
    answer: "Par le traçage distribué : un identifiant de trace propagé dans les en-têtes"
    decoys:
      - "En comparant l'heure des erreurs de chaque service, à la seconde près"
      - "En regroupant toutes les erreurs ayant le même message dans un seul problème"
    why: "Les SDK transmettent l'identifiant de trace d'un service à l'autre : on suit la requête de bout en bout, avec la durée de chaque étape."
  - id: debug-symbols
    prompt: "Pour une application iOS ou Android, quel est l'équivalent des source maps dans Sentry ?"
    answer: "Les fichiers de symboles de débogage (dSYM, mapping ProGuard)"
    decoys:
      - "Les captures d'écran prises au moment du plantage"
      - "Les journaux système du téléphone, envoyés par le SDK au plantage"
    why: "Le code natif est compilé ou obfusqué ; ces fichiers, envoyés à Sentry, permettent de lire des piles d'appels avec les noms d'origine."
  - id: session-replay
    prompt: "Que permet la relecture de sessions (Session Replay) de Sentry côté front ?"
    answer: "Revoir ce que l'utilisateur a vu et fait autour d'une erreur"
    decoys:
      - "Rejouer la requête fautive en production pour reproduire l'erreur"
      - "Revenir à la version précédente de l'application en un clic"
    why: "Le SDK enregistre les changements de la page et les interactions ; on revoit la session dans Sentry, avec masquage des données sensibles."
  - id: release-health
    prompt: "Que mesure le suivi de santé des releases (Release Health) de Sentry ?"
    answer: "La part de sessions et d'utilisateurs sans plantage, par version"
    decoys:
      - "Le temps de déploiement de chaque version jusqu'en production"
      - "Le nombre de tests passés par la CI avant chaque version"
    why: "Le taux de sessions sans plantage (crash-free) permet de juger une version et de décider d'un retour arrière."
  - id: suspect-commits
    prompt: "Le dépôt Git est relié à Sentry et les releases sont déclarées avec leurs commits. Qu'apporte cette intégration ?"
    answer: "Sentry propose le commit suspect et son auteur pour chaque problème"
    decoys:
      - "Sentry corrige automatiquement le code et ouvre une pull request"
      - "Sentry bloque la fusion de toute pull request tant qu'une erreur reste ouverte"
    why: "En croisant la pile d'appels et les commits de la release, Sentry désigne le changement le plus probable et la personne à prévenir."
  - id: crons
    prompt: "Quelle fonction de Sentry signale qu'une tâche planifiée (cron) ne s'est pas exécutée ou a échoué ?"
    answer: "Le suivi des tâches planifiées (Crons)"
    decoys:
      - "Le suivi de santé des releases"
      - "La relecture de sessions"
      - "Le traçage distribué"
    why: "La tâche signale son début et sa fin ; Sentry alerte si un passage attendu manque ou échoue. Une tâche qui ne tourne pas ne lève aucune exception."
  - id: alertes
    prompt: "Comment être prévenu dans Slack dès qu'un nouveau problème apparaît dans Sentry ?"
    answer: "Avec une règle d'alerte reliée à l'intégration Slack"
    decoys:
      - "Avec un breadcrumb envoyé vers le canal Slack"
      - "Avec le DSN du canal Slack dans le SDK"
    why: "Les règles d'alerte définissent la condition (nouveau problème, seuil d'occurrences…) et l'action, par exemple un message Slack."
  - id: auto-hebergement
    prompt: "À quoi s'attendre en auto-hébergeant Sentry ?"
    answer: "Une installation Docker Compose de nombreux services, à maintenir soi-même"
    decoys:
      - "Un binaire unique, sans dépendance, qui stocke tout dans un fichier SQLite"
      - "Une simple bibliothèque Python à ajouter à son application Django"
    why: "Sentry auto-hébergé assemble beaucoup de composants (bases, files de messages, workers) : c'est une vraie charge d'exploitation, d'où l'intérêt du SaaS."
  - id: langage
    prompt: "Dans quel langage le serveur de Sentry est-il principalement écrit ?"
    answer: "Python, avec Django"
    decoys:
      - "Go, avec Gin"
      - "Java, avec Spring"
      - "Ruby, avec Rails"
    why: "Sentry est né comme extension Django et son serveur reste une application Python/Django, avec quelques services annexes dans d'autres langages."
---
