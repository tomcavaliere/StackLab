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
---
