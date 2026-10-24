---
questions:
  - id: role
    prompt: "À quoi sert Celery ?"
    answer: "Exécuter en arrière-plan, dans des workers, les traitements Python lents"
    decoys:
      - "Planifier des pipelines de données, avec lignée des tables et historique des exécutions"
      - "Servir les pages web plus vite grâce à un cache en mémoire"
    why: "Celery sort les traitements lents (e-mails, images, exports) du cycle requête-réponse. Les pipelines avec lignée relèvent d'un orchestrateur, le cache de Redis ou Memcached."
  - id: broker-et-workers
    prompt: "Que se passe-t-il quand l'application appelle une tâche Celery ?"
    answer: "Un message est déposé dans un broker, et un worker séparé l'exécute"
    decoys:
      - "La tâche s'exécute dans un thread du même processus web"
      - "La requête HTTP attend la fin de la tâche avant de répondre"
    why: "L'appel est asynchrone : le message part dans le broker (RabbitMQ ou Redis) et des processus workers le traitent, pendant que la requête répond tout de suite."
  - id: brokers
    prompt: "Quels brokers Celery utilise-t-il couramment ?"
    answer: "RabbitMQ ou Redis"
    decoys:
      - "Memcached ou DuckDB"
      - "Spark ou Airflow"
    why: "RabbitMQ est le broker historique et recommandé, Redis l'autre choix courant (il peut aussi stocker les résultats)."
  - id: beat
    prompt: "Comment Celery exécute-t-il des tâches planifiées ?"
    answer: "Avec Celery Beat"
    decoys:
      - "Avec un DAG Airflow embarqué dans chaque worker"
      - "Avec des triggers de la base de données"
    why: "Celery Beat déclenche des tâches à intervalles réguliers, à côté de l'application."
  - id: pipeline-data
    prompt: "Un pipeline de données en 6 étapes dépendantes, avec reprises et historique. Celery est-il l'outil adapté ?"
    answer: "Non : un orchestrateur comme Airflow ou Dagster est fait pour ça"
    decoys:
      - "Oui : une tâche Celery par étape, enchaînées à la main, suffit largement"
      - "Oui : Celery Beat gère les dépendances et la lignée"
    why: "Celery exécute des tâches ; dépendances entre étapes, reprises et historique sont le métier d'un orchestrateur."
  - id: ruby
    prompt: "Une application Ruby a besoin d'une file de tâches. Peut-elle utiliser Celery ?"
    answer: "Non : Celery est pour Python ; en Ruby, l'équivalent est Sidekiq"
    decoys:
      - "Oui : Celery est indépendant du langage de l'application"
      - "Oui, grâce à son SDK Ruby officiel"
    why: "Celery est une bibliothèque Python. Chaque écosystème a son équivalent : Sidekiq en Ruby, BullMQ en Node.js."
  - id: node
    prompt: "Quel équivalent de Celery utiliser dans une application Node.js ?"
    answer: "BullMQ, qui s'appuie sur Redis"
    decoys:
      - "Celery, via son paquet npm officiel"
      - "Airflow, avec un opérateur Node.js"
    why: "BullMQ est la file de tâches courante en Node.js ; elle s'appuie sur Redis."
  - id: ne-pas-faire-attendre
    prompt: "Pourquoi sortir l'envoi d'un e-mail du traitement de la requête web ?"
    answer: "Pour ne pas faire attendre l'utilisateur pendant un traitement lent"
    decoys:
      - "Parce que Django interdit l'envoi d'e-mails depuis une vue, pour des raisons de sécurité"
      - "Pour que le contenu de l'e-mail soit chiffré"
    why: "L'utilisateur reçoit sa réponse tout de suite ; l'e-mail part en arrière-plan, et peut être retenté en cas d'échec."
  - id: fonctions
    prompt: "Que gère Celery en plus de l'exécution des tâches ?"
    answer: "Les nouvelles tentatives, les délais et les chaînes de tâches"
    decoys:
      - "Le rendu des pages HTML de l'application, en parallèle des requêtes"
      - "La réplication de la base de données"
    why: "Celery relance une tâche en échec, la retarde, ou enchaîne plusieurs tâches."
  - id: taches-rares
    prompt: "Quelques tâches rares dans une petite application. Que dit la fiche ?"
    answer: "Un broker et des workers à opérer peuvent être disproportionnés ; le framework couvre parfois déjà le besoin"
    decoys:
      - "Celery est indispensable dès la première tâche asynchrone de l'application"
      - "Il vaut mieux passer directement à Kafka, qui couvrira tous les besoins futurs sans jamais avoir à migrer plus tard"
    why: "Celery ajoute un broker et des workers à surveiller. Pour un besoin ponctuel, ce coût d'exploitation ne se justifie pas toujours."
  - id: declarer-tache
    prompt: "Comment déclare-t-on une tâche Celery ?"
    answer: "En décorant une fonction Python avec @app.task (ou @shared_task)"
    decoys:
      - "En héritant d'une classe Worker et en surchargeant sa méthode handle()"
      - "En déclarant la fonction dans un fichier YAML lu au démarrage des workers"
    why: "Le décorateur enregistre la fonction comme tâche ; @shared_task évite de dépendre d'une instance d'application précise, pratique dans une app Django réutilisable."
  - id: delay
    prompt: "Quel appel exécute la tâche Celery envoyer_email en arrière-plan avec l'argument 42 ?"
    answer: "envoyer_email.delay(42)"
    decoys:
      - "envoyer_email(42)"
      - "await envoyer_email(42)"
      - "envoyer_email.run_later(42)"
    why: "delay() envoie un message au broker. Appeler la fonction directement l'exécute tout de suite dans le processus courant, et run_later n'existe pas."
  - id: apply-async
    prompt: "Quelle méthode d'une tâche Celery accepte des options d'exécution comme countdown ou queue ?"
    answer: "apply_async()"
    decoys:
      - "delay()"
      - "send_task_now()"
      - "schedule()"
    why: "delay() est un raccourci qui ne prend que les arguments de la tâche ; apply_async() accepte en plus les options d'exécution."
  - id: countdown
    prompt: "Comment faire exécuter une tâche Celery dans 10 minutes ?"
    answer: "ma_tache.apply_async(countdown=600)"
    decoys:
      - "Un time.sleep(600) au début de la tâche"
      - "ma_tache.delay(600), le délai en secondes"
    why: "countdown retarde l'exécution sans bloquer de worker. time.sleep occupe un worker pendant dix minutes, et delay(600) passe 600 comme argument de la tâche."
  - id: result-backend
    prompt: "Où Celery conserve-t-il la valeur de retour d'une tâche ?"
    answer: "Dans un result backend optionnel (Redis, base de données…)"
    decoys:
      - "Dans le broker, toujours, à côté du message initial"
      - "Dans la mémoire du processus web qui a lancé la tâche"
    why: "Sans result backend configuré, le résultat n'est pas conservé. Le broker transporte les messages de tâches, il ne sert pas de stockage des résultats."
  - id: async-result
    prompt: "Que renvoie l'appel ma_tache.delay(...) ?"
    answer: "Un AsyncResult, pour suivre l'état et lire le résultat"
    decoys:
      - "La valeur de retour de la tâche, une fois terminée"
      - "Rien : on ne peut plus suivre la tâche après l'envoi"
    why: "delay() rend la main tout de suite avec un AsyncResult (identifiant, état). Lire la valeur de retour demande un result backend."
  - id: get-dans-tache
    prompt: "Pourquoi ne pas appeler result.get() dans une tâche Celery pour attendre une autre tâche ?"
    answer: "Le worker reste bloqué en attente et les workers peuvent s'interbloquer"
    decoys:
      - "result.get() n'existe que dans le processus web, pas dans un worker"
      - "Le résultat de l'autre tâche est toujours effacé avant d'être lu"
    why: "La documentation le déconseille et Celery lève une erreur par défaut : si tous les workers attendent, plus personne n'exécute la tâche attendue. On enchaîne plutôt avec chain ou chord."
  - id: idempotence
    prompt: "Pourquoi une tâche Celery doit-elle idéalement être idempotente ?"
    answer: "Elle peut s'exécuter plusieurs fois (nouvelle tentative, message redélivré)"
    decoys:
      - "Celery refuse d'enregistrer une tâche qui modifie une base de données"
      - "Celery exécute chaque tâche deux fois pour comparer les deux résultats"
    why: "Entre nouvelles tentatives et redélivraisons, une même tâche peut tourner deux fois : elle ne doit pas, par exemple, débiter deux fois un client."
  - id: arguments-id
    prompt: "Pourquoi passer à une tâche Celery l'id d'un objet plutôt que l'objet de l'ORM lui-même ?"
    answer: "Les arguments sont sérialisés, et l'objet peut avoir changé avant l'exécution"
    decoys:
      - "Les tâches Celery n'acceptent que des entiers comme arguments, par conception"
      - "L'ORM de Django verrouille l'objet tant que la tâche n'est pas terminée"
    why: "Le message part en JSON par défaut et la tâche s'exécute plus tard : relire l'objet par son id donne son état à jour. Les arguments ne sont pas limités aux entiers."
  - id: serialiseur
    prompt: "Quel sérialiseur Celery utilise-t-il par défaut depuis la version 4 ?"
    answer: "JSON"
    decoys:
      - "pickle"
      - "XML"
      - "Protocol Buffers"
    why: "Celery 4 a remplacé pickle par JSON comme sérialiseur par défaut : désérialiser du pickle venant du broker permet d'exécuter du code arbitraire."
  - id: self-retry
    prompt: "Dans une tâche Celery, comment relancer l'exécution après une erreur réseau ?"
    answer: "Appeler self.retry(exc=..., countdown=...) dans une tâche bind=True"
    decoys:
      - "Lever une exception RetryLater, qu'interceptent les workers"
      - "Rappeler la fonction elle-même dans un bloc except"
    why: "self.retry() replanifie la tâche avec un délai et un nombre maximal de tentatives ; autoretry_for automatise la même chose. Un appel direct dans except tourne sans contrôle dans le worker."
  - id: bind
    prompt: "Que change l'option bind=True sur une tâche Celery ?"
    answer: "La tâche reçoit son instance en premier argument (self)"
    decoys:
      - "La tâche est liée à un seul worker, toujours le même"
      - "La tâche s'exécute dans la transaction de la requête web"
    why: "Avec bind=True, self donne accès à self.retry() et à self.request (id, nombre de tentatives). L'option ne fixe pas de worker."
  - id: chain
    prompt: "Quelle primitive Celery exécute des tâches l'une après l'autre, chacune recevant le résultat de la précédente ?"
    answer: "chain"
    decoys:
      - "group"
      - "chord"
      - "starmap"
    why: "chain enchaîne en série. group lance en parallèle, chord ajoute une tâche finale après un groupe."
  - id: group
    prompt: "Quelle primitive Celery lance plusieurs tâches en parallèle ?"
    answer: "group"
    decoys:
      - "chain"
      - "beat"
      - "signature"
    why: "group exécute un ensemble de tâches en parallèle. chain les exécute en série, beat planifie, une signature décrit un seul appel de tâche."
  - id: chord
    prompt: "Quelle primitive Celery lance des tâches en parallèle puis une tâche de synthèse quand toutes sont finies ?"
    answer: "chord"
    decoys:
      - "chain"
      - "group"
      - "retry"
    why: "Un chord = un group suivi d'un callback qui reçoit tous les résultats. Il exige un result backend pour savoir quand le groupe est terminé."
  - id: queue-dediee
    prompt: "Comment éviter que des tâches lourdes ralentissent des tâches rapides dans Celery ?"
    answer: "Router les tâches lourdes vers une queue dédiée, servie par ses propres workers"
    decoys:
      - "Augmenter le paramètre priority de toutes les tâches rapides dans le code"
      - "Lancer Celery Beat en plusieurs exemplaires pour répartir la charge"
    why: "On route par tâche (task_routes ou option queue) et on lance des workers avec -Q pour chaque queue. Beat ne fait que planifier, et le multiplier duplique les déclenchements."
  - id: commande-worker
    prompt: "Quelle commande démarre un worker Celery pour l'application projet ?"
    answer: "celery -A projet worker"
    decoys:
      - "celery -A projet beat"
      - "celery -A projet flower"
      - "python manage.py runworker"
    why: "La sous-commande worker démarre un worker ; beat démarre le planificateur. Flower est un outil de supervision installé à part."
  - id: flower
    prompt: "Qu'est-ce que Flower dans l'écosystème Celery ?"
    answer: "Un outil web de supervision des workers et des tâches"
    decoys:
      - "Le broker de messages officiel, développé par l'équipe Celery"
      - "Un planificateur qui remplace Celery Beat pour les tâches cron"
    why: "Flower affiche en temps réel l'état des workers, des tâches et des queues. Les brokers restent RabbitMQ ou Redis, la planification Celery Beat."
  - id: acks-late
    prompt: "Que change l'option acks_late=True sur une tâche Celery ?"
    answer: "Le message est acquitté après l'exécution, et redélivré si le worker meurt en cours"
    decoys:
      - "Le message est acquitté avant l'exécution, pour libérer le broker au plus vite"
      - "Le résultat est renvoyé en retard au client, une fois tous les autres traités"
    why: "Par défaut, le message est acquitté juste avant l'exécution : un worker qui plante perd la tâche. acks_late la protège, à condition qu'elle soit idempotente."
  - id: beat-unique
    prompt: "Pourquoi ne lancer qu'une seule instance de Celery Beat ?"
    answer: "Sinon chaque tâche planifiée serait déclenchée plusieurs fois"
    decoys:
      - "Celery Beat consomme tous les messages du broker dès son démarrage"
      - "Une deuxième instance de Beat arrête automatiquement les workers"
    why: "Chaque instance de Beat envoie ses propres messages au moment prévu : deux instances, deux exécutions. Beat ne consomme pas les tâches, il les publie."
---
