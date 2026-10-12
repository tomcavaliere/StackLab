---
questions:
  - id: execution
    prompt: "Comment s'exécute une fonction AWS Lambda ?"
    answer: "À la demande, en réaction à un événement : requête HTTP, fichier S3, message, horaire"
    decoys:
      - "Sur un serveur allumé en permanence, dimensionné à l'avance selon le pic de trafic attendu"
      - "Uniquement quand un développeur la lance depuis la console"
    why: "AWS démarre autant d'instances que nécessaire, puis aucune quand il n'y a rien à faire."
  - id: facturation
    prompt: "Comment Lambda est-il facturé ?"
    answer: "Au nombre d'appels et à leur durée"
    decoys:
      - "Au nombre de serveurs réservés chaque mois"
      - "À la quantité de données lues, comme BigQuery"
    why: "Une fonction qui ne sert pas ne coûte rien."
  - id: duree-max
    prompt: "Quelle est la durée maximale d'une exécution Lambda ?"
    answer: "15 minutes"
    decoys:
      - "24 heures"
      - "Illimitée"
    why: "Au-delà, il faut un processus de longue durée : conteneur, serveur ou worker."
  - id: sans-etat
    prompt: "Une fonction Lambda garde-t-elle un état entre deux appels ?"
    answer: "Non : l'état doit être stocké ailleurs (base, S3…)"
    decoys:
      - "Oui : ses variables globales sont garanties d'un appel à l'autre"
      - "Oui, dans une mémoire partagée par toutes ses instances"
    why: "Chaque appel peut tomber sur une instance différente, ou toute neuve."
  - id: demarrage-a-froid
    prompt: "Qu'est-ce qu'un démarrage à froid ?"
    answer: "Le délai nécessaire pour démarrer une nouvelle instance de la fonction"
    decoys:
      - "Le redémarrage complet d'un serveur physique après une coupure de courant dans le datacenter"
      - "Le premier déploiement d'un compte AWS"
    why: "Ce délai s'ajoute à la requête qui déclenche une nouvelle instance : à surveiller si la latence est serrée."
  - id: connexions-bdd
    prompt: "Quel risque court une base relationnelle face à de nombreuses instances Lambda simultanées ?"
    answer: "L'épuisement de ses connexions"
    decoys:
      - "La corruption de ses tables"
      - "Le blocage de ses sauvegardes"
    why: "Chaque instance ouvre ses connexions ; des centaines d'instances peuvent saturer la base. DynamoDB, sans connexion persistante, évite ce problème."
  - id: websocket
    prompt: "Un serveur WebSocket ou un worker permanent sur Lambda ?"
    answer: "Peu adapté : la durée d'exécution est limitée"
    decoys:
      - "Idéal : Lambda garde les connexions ouvertes indéfiniment"
      - "Peu adapté : Lambda ne sait pas répondre aux requêtes HTTP"
    why: "Lambda répond très bien en HTTP, mais une exécution ne dure jamais plus de 15 minutes."
  - id: trafic-constant
    prompt: "Avec un trafic élevé et constant, Lambda est-il forcément le moins cher ?"
    answer: "Non : des conteneurs ou des serveurs allumés en permanence peuvent revenir moins cher, selon le cas"
    decoys:
      - "Oui : le serverless est toujours l'option la moins chère, quel que soit le profil de trafic de l'application"
      - "Non : Lambda refuse les trafics constants"
    why: "La facturation à l'appel brille quand le trafic est faible ou irrégulier. Le calcul dépend du cas."
  - id: declencheur-s3
    prompt: "Quel déclencheur classique associe Lambda et S3 ?"
    answer: "Une fonction exécutée à chaque fichier déposé dans un bucket"
    decoys:
      - "Une fonction qui remplace le bucket"
      - "Une copie complète du bucket, créée à chaque appel de la fonction"
    why: "Redimensionner une image dès son dépôt, par exemple."
  - id: portabilite
    prompt: "Quel inconvénient stratégique la fiche signale-t-elle ?"
    answer: "Le code et ses déclencheurs sont liés à AWS"
    decoys:
      - "Le code doit être écrit en Java"
      - "Chaque fonction exige un serveur dédié"
    why: "Changer de fournisseur impose de réécrire les déclencheurs et souvent une partie du code."
  - id: handler
    prompt: "Comment s'appelle la fonction d'entrée qu'AWS appelle à chaque invocation d'une Lambda ?"
    answer: "Le handler"
    decoys:
      - "Le listener"
      - "Le daemon"
    why: "Le handler reçoit l'événement et un objet de contexte, puis renvoie le résultat. Il n'y a ni écouteur permanent ni démon : la fonction ne tourne que pendant l'appel."
  - id: langages
    prompt: "Dans quels langages peut-on écrire une fonction Lambda ?"
    answer: "Plusieurs runtimes gérés (Node.js, Python, Java…), plus des runtimes personnalisés"
    decoys:
      - "Uniquement en JavaScript, le seul langage que sait exécuter le moteur de Lambda"
      - "Uniquement en Java, compilé à l'avance en bytecode pour la JVM fournie par AWS"
    why: "AWS fournit des runtimes pour plusieurs langages courants, et un runtime personnalisé permet d'en exécuter d'autres. Lambda n'est pas lié à un langage unique."
  - id: memoire-cpu
    prompt: "Quel réglage principal dimensionne la puissance d'une fonction Lambda ?"
    answer: "La mémoire allouée, dont dépend aussi la puissance CPU"
    decoys:
      - "Le nombre de cœurs, choisi indépendamment de la mémoire"
      - "Le type d'instance EC2 sur laquelle la fonction s'exécute"
    why: "On choisit la mémoire, et AWS alloue un CPU proportionnel. On ne choisit ni les cœurs séparément ni la machine sous-jacente."
  - id: api-gateway
    prompt: "Quel service place-t-on classiquement devant Lambda pour exposer une API HTTP ?"
    answer: "Amazon API Gateway"
    decoys:
      - "AWS CloudTrail"
      - "AWS Glue"
    why: "API Gateway reçoit les requêtes HTTP et invoque la fonction. CloudTrail journalise les appels d'API AWS, Glue est un service d'intégration de données."
  - id: paquet
    prompt: "Sous quelle forme peut-on déployer le code d'une fonction Lambda ?"
    answer: "Une archive zip ou une image de conteneur"
    decoys:
      - "Uniquement un script collé dans l'éditeur de la console"
      - "Une image de machine virtuelle EC2 (AMI)"
    why: "Lambda accepte une archive zip ou une image de conteneur. L'éditeur de la console n'est qu'une commodité, et une AMI sert à lancer des instances EC2."
  - id: couches
    prompt: "À quoi servent les couches (layers) Lambda ?"
    answer: "Partager des bibliothèques et dépendances entre plusieurs fonctions"
    decoys:
      - "Exécuter une même fonction dans plusieurs régions en même temps"
      - "Enchaîner plusieurs fonctions dans une seule et même invocation"
    why: "Une couche est une archive de dépendances ajoutée à l'environnement d'exécution. Elle ne gère ni le multirégion ni l'enchaînement de fonctions."
  - id: concurrence-provisionnee
    prompt: "Quel réglage Lambda réduit les démarrages à froid en gardant des instances prêtes à répondre ?"
    answer: "La concurrence provisionnée"
    decoys:
      - "La concurrence réservée"
      - "Le délai d'expiration (timeout)"
    why: "La concurrence provisionnée initialise des instances à l'avance. La concurrence réservée garantit et plafonne un nombre d'instances sans les préchauffer ; le timeout limite la durée d'un appel."
  - id: limitation
    prompt: "Que se passe-t-il quand une fonction Lambda atteint sa limite de concurrence ?"
    answer: "Les invocations en trop sont limitées (throttling)"
    decoys:
      - "AWS bascule automatiquement le trafic vers des instances EC2"
      - "Les invocations en trop partent s'exécuter dans une autre région"
    why: "Au-delà de la limite, les nouveaux appels sont refusés ou retardés : un appel synchrone reçoit une erreur, un appel asynchrone est retenté. Lambda ne bascule ni vers EC2 ni vers une autre région."
  - id: synchrone-asynchrone
    prompt: "Quelle différence entre invocation synchrone et asynchrone d'une Lambda ?"
    answer: "En synchrone l'appelant attend la réponse ; en asynchrone l'événement est mis en file"
    decoys:
      - "En synchrone la fonction a un serveur dédié ; en asynchrone elle partage ses instances"
      - "En synchrone l'appel est gratuit ; en asynchrone il est facturé selon sa durée réelle"
    why: "Un appel asynchrone rend la main tout de suite : Lambda place l'événement en file et le traite ensuite, avec de nouvelles tentatives en cas d'échec. La facturation et les instances ne changent pas."
  - id: idempotence
    prompt: "Pourquoi une fonction Lambda déclenchée par des événements doit-elle être idempotente ?"
    answer: "Un même événement peut être livré plus d'une fois, par exemple lors d'une nouvelle tentative"
    decoys:
      - "Lambda refuse de déployer une fonction qui écrit en base de façon non idempotente"
      - "Une fonction non idempotente ne peut pas être déclenchée par un fichier déposé dans S3"
    why: "Les nouvelles tentatives et certaines sources livrent au moins une fois : traiter deux fois le même événement ne doit pas doubler l'effet. Lambda ne vérifie rien de tel au déploiement."
  - id: echecs-asynchrones
    prompt: "Où envoyer les événements asynchrones qui échouent encore après toutes les tentatives ?"
    answer: "Vers une destination d'échec ou une file de lettres mortes (SQS, SNS)"
    decoys:
      - "Dans les variables globales de la fonction, pour les rejouer à l'appel suivant"
      - "Dans le répertoire /tmp de l'instance, conservé jusqu'à la prochaine version"
    why: "Une destination d'échec ou une file de lettres mortes garde l'événement pour analyse ou rejeu. Les variables globales et /tmp disparaissent avec l'instance."
  - id: tmp
    prompt: "Quel espace disque une fonction Lambda peut-elle utiliser pendant son exécution ?"
    answer: "Un répertoire /tmp éphémère, propre à chaque instance"
    decoys:
      - "Un disque persistant partagé par toutes les instances de la fonction"
      - "Le disque du poste du développeur qui a déployé la fonction"
    why: "/tmp sert d'espace de travail temporaire ; il disparaît avec l'instance et n'est pas partagé. Pour garder des fichiers, on écrit dans S3."
  - id: init-hors-handler
    prompt: "Pourquoi initialiser un client de base de données en dehors du handler ?"
    answer: "Une instance réutilisée pour plusieurs appels garde cet objet, qui n'est pas recréé à chaque fois"
    decoys:
      - "Le code placé hors du handler n'est jamais facturé, quelle que soit sa durée d'exécution"
      - "Le handler n'a pas le droit d'ouvrir de connexion réseau vers une base de données"
    why: "Le code hors du handler s'exécute une fois par instance ; les appels suivants sur la même instance en profitent. Ce n'est pas garanti, d'où l'absence d'état fiable entre appels."
  - id: variables-environnement
    prompt: "Comment passer une configuration (nom de table, URL d'un service) à une fonction Lambda sans la coder en dur ?"
    answer: "Par les variables d'environnement de la fonction"
    decoys:
      - "En réécrivant le handler pour chaque environnement"
      - "En déposant un fichier dans /tmp avant le déploiement"
    why: "Les variables d'environnement se règlent par fonction, sans toucher au code. Réécrire le handler multiplie les versions, et /tmp n'existe qu'à l'exécution."
  - id: role-execution
    prompt: "Comment une fonction Lambda obtient-elle le droit d'écrire dans une table DynamoDB ?"
    answer: "Par son rôle d'exécution IAM"
    decoys:
      - "Par le compte racine, utilisé par défaut"
      - "Par des clés d'accès écrites dans son code"
    why: "Chaque fonction assume un rôle IAM qui définit ses droits, avec des identifiants temporaires. Le compte racine et les clés en dur sont à proscrire."
  - id: journaux
    prompt: "Où arrivent par défaut les journaux (logs) d'une fonction Lambda ?"
    answer: "Dans CloudWatch Logs"
    decoys:
      - "Dans un bucket S3 créé automatiquement"
      - "Dans CloudTrail, avec les appels d'API"
    why: "Ce que la fonction écrit sur la sortie standard part dans CloudWatch Logs. CloudTrail trace les appels d'API AWS, pas la sortie du code."
  - id: planification
    prompt: "Comment exécuter une fonction Lambda tous les jours à heure fixe ?"
    answer: "Avec une planification EventBridge (expression cron)"
    decoys:
      - "Avec une boucle dans le handler, qui attend l'heure voulue"
      - "Avec une variable d'environnement qui contient l'heure voulue"
    why: "EventBridge déclenche la fonction selon un horaire. Une boucle d'attente se heurte à la durée maximale d'exécution, et une variable d'environnement ne déclenche rien."
  - id: source-sqs
    prompt: "Comment Lambda consomme-t-il les messages d'une file SQS ?"
    answer: "Un mappage de source d'événements interroge la file et passe les messages par lots"
    decoys:
      - "La file SQS exécute elle-même le code de la fonction, sans passer par Lambda"
      - "La fonction reste allumée en permanence et écoute la file en continu"
    why: "Lambda interroge la file pour le compte de la fonction et l'invoque avec un lot de messages. La fonction, elle, ne tourne que pendant le traitement."
  - id: step-functions
    prompt: "Quel service AWS orchestre plusieurs fonctions Lambda en un workflow avec étapes, branches et reprises ?"
    answer: "AWS Step Functions"
    decoys:
      - "AWS CloudFormation"
      - "Amazon Route 53"
    why: "Step Functions enchaîne des étapes avec conditions, attentes et reprises sur erreur. CloudFormation déploie l'infrastructure, Route 53 gère le DNS."
  - id: sens-serverless
    prompt: "Que signifie « serverless » pour AWS Lambda ?"
    answer: "Les serveurs existent, mais AWS les gère : on ne provisionne ni ne maintient de machine"
    decoys:
      - "Le code s'exécute dans le navigateur de l'utilisateur, sans aucun serveur derrière"
      - "Le code tourne sur des serveurs physiques dédiés que l'on loue pour un an minimum"
    why: "Serverless veut dire sans serveur à gérer, pas sans serveur du tout : AWS s'occupe des machines, des mises à jour et du dimensionnement."
---
