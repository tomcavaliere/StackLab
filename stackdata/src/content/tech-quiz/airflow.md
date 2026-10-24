---
questions:
  - id: dag
    prompt: "Comment Airflow représente-t-il un pipeline ?"
    answer: "Un DAG de tâches (graphe orienté acyclique), écrit en Python"
    decoys:
      - "Un fichier YAML de jobs exécutés dans l'ordre du fichier"
      - "Une file de messages que des workers consomment au fil de l'eau"
    why: "Un pipeline Airflow est un DAG décrit en Python : les tâches et leurs dépendances forment un graphe sans cycle. Une file de messages consommée par des workers, c'est le modèle de Celery."
  - id: role-du-scheduler
    prompt: "Que fait le scheduler d'Airflow ?"
    answer: "Il déclenche les DAG selon leur planning, respecte les dépendances et relance les tâches en échec"
    decoys:
      - "Il exécute lui-même les calculs lourds sur les données, en mémoire, pour ne pas solliciter l'entrepôt"
      - "Il répartit les conteneurs de l'application sur les nœuds d'un cluster"
    why: "Le scheduler déclenche et surveille ; le calcul lourd est délégué à Spark, dbt ou l'entrepôt. Placer des conteneurs sur un cluster, c'est le rôle de Kubernetes."
  - id: calcul-lourd
    prompt: "Un DAG doit agréger plusieurs centaines de gigaoctets. Où faire ce calcul ?"
    answer: "Le déléguer à Spark, dbt ou l'entrepôt, qu'Airflow pilote"
    decoys:
      - "Dans une tâche Python d'Airflow, pour tout garder au même endroit"
      - "Dans la base de métadonnées d'Airflow, déjà disponible"
    why: "Airflow orchestre : il déclenche et enchaîne. Faire le calcul lourd dans Airflow lui-même figure dans « Quand l'éviter » ; sa base de métadonnées ne sert qu'à son propre fonctionnement."
  - id: pas-de-temps-reel
    prompt: "Pourquoi Airflow ne convient-il pas au traitement d'événements en temps réel ?"
    answer: "Il planifie des lots : ce n'est pas un moteur de streaming"
    decoys:
      - "Il ne sait déclencher un DAG qu'à heure fixe, jamais sur un événement"
      - "Il ne conserve aucun historique des exécutions passées"
    why: "Airflow déclenche des lots, sur un calendrier ou un événement, et garde l'historique de chaque exécution. Pour traiter un flux continu à faible latence, il faut un moteur de streaming."
  - id: deux-scripts
    prompt: "Deux scripts à lancer chaque nuit, sans dépendance entre eux. Faut-il Airflow ?"
    answer: "Non : un cron ou le planificateur de l'entrepôt suffit"
    decoys:
      - "Oui : dès qu'un script est planifié, il faut un orchestrateur"
      - "Non : Airflow refuse les DAG de moins de trois tâches"
    why: "Airflow apporte un scheduler et une base de métadonnées à opérer. Pour deux tâches simples, cette exploitation coûte plus qu'elle ne rapporte."
  - id: apport-vs-cron
    prompt: "Qu'apporte Airflow par rapport à des tâches cron isolées ?"
    answer: "Les dépendances entre étapes, la reprise des échecs et un historique consultable"
    decoys:
      - "Une exécution plus rapide de chaque script, grâce à un moteur de calcul distribué intégré"
      - "Le stockage des données produites par chaque tâche"
    why: "Avec des crons isolés, personne ne sait quelle étape a échoué ni quoi relancer. Airflow ordonne les étapes, relance les échecs et garde l'historique dans son interface web ; il ne rend pas les scripts plus rapides."
  - id: operateurs
    prompt: "À quoi servent les opérateurs d'Airflow ?"
    answer: "Des briques prêtes à l'emploi pour piloter Spark, dbt, les entrepôts ou les services cloud"
    decoys:
      - "Des comptes utilisateurs dotés de droits d'administration sur les DAG"
      - "Des fonctions SQL ajoutées à l'entrepôt pour transformer les données sans passer par un script externe"
    why: "Un opérateur encapsule l'appel à un système externe : lancer un job Spark, une commande dbt, une requête dans l'entrepôt. C'est ce qui permet à Airflow d'orchestrer sans calculer lui-même."
  - id: origine
    prompt: "Où Airflow est-il né ?"
    answer: "Chez Airbnb, en 2014, avant d'être confié à la fondation Apache"
    decoys:
      - "Chez LinkedIn, en 2011, par l'équipe qui a créé Kafka au même moment"
      - "À l'AMPLab de Berkeley, en 2009, dans le même laboratoire que Spark"
    why: "Airflow vient d'Airbnb. Kafka est né chez LinkedIn, Spark à l'AMPLab de Berkeley."
  - id: vs-dagster
    prompt: "Quelle est la différence de fond entre Airflow et Dagster ?"
    answer: "Airflow raisonne en tâches à lancer, Dagster en données produites (assets)"
    decoys:
      - "Airflow décrit ses pipelines en Java, Dagster en Python"
      - "Airflow ne s'utilise qu'en offre managée, Dagster en auto-hébergement"
    why: "Les deux s'écrivent en Python et s'auto-hébergent. Dagster fait de l'asset (table, fichier, modèle) l'unité de base, là où Airflow enchaîne des tâches."
  - id: offre-managee
    prompt: "Lequel de ces services est une version managée d'Airflow ?"
    answer: "Google Cloud Composer"
    decoys:
      - "Google Dataproc"
      - "Amazon MSK"
    why: "Cloud Composer (comme Amazon MWAA ou Astronomer) héberge Airflow. Dataproc est le Spark managé de Google, MSK le Kafka managé d'AWS."
  - id: dag-run
    prompt: "Dans Airflow, comment s'appelle une exécution donnée d'un DAG ?"
    answer: "Un DAG run"
    decoys:
      - "Un job flow"
      - "Un pipeline build"
      - "Une task queue"
    why: "Chaque déclenchement d'un DAG crée un DAG run, qui regroupe les task instances de cette exécution. « Job flow » et « pipeline build » ne sont pas des concepts Airflow."
  - id: xcom
    prompt: "Quel mécanisme d'Airflow permet à deux tâches d'échanger de petites valeurs ?"
    answer: "Les XCom, enregistrés par défaut dans la base de métadonnées"
    decoys:
      - "Les variables d'environnement du worker, partagées entre toutes les tâches du DAG"
      - "Un volume disque partagé, monté automatiquement sur chaque tâche du DAG"
    why: "XCom (« cross-communication ») sert à passer de petites valeurs entre tâches. Les tâches peuvent tourner sur des machines différentes : ni l'environnement ni un disque ne sont partagés d'office."
  - id: xcom-gros-volume
    prompt: "Pourquoi ne pas faire transiter un gros jeu de données entre deux tâches Airflow via XCom ?"
    answer: "Par défaut, XCom écrit dans la base de métadonnées, prévue pour de petits messages"
    decoys:
      - "XCom chiffre chaque valeur, ce qui rend tout transfert volumineux impossible à relire"
      - "XCom ne fonctionne qu'entre tâches qui tournent sur le même worker physique"
    why: "Les gros volumes doivent passer par un stockage externe (objet, entrepôt), la tâche suivante recevant seulement leur emplacement. XCom n'est ni chiffré par nature ni limité à un worker."
  - id: catchup
    prompt: "Que fait le paramètre catchup d'un DAG Airflow ?"
    answer: "Il lance les exécutions manquées depuis la date de début"
    decoys:
      - "Il relance sans limite les tâches en échec jusqu'à leur réussite"
      - "Il resynchronise le code du DAG depuis le dépôt Git à chaque exécution"
    why: "Avec catchup activé, Airflow crée un DAG run pour chaque intervalle passé non exécuté depuis start_date. Les relances d'échecs relèvent de retries."
  - id: idempotence
    prompt: "Pourquoi une tâche Airflow doit-elle être idempotente ?"
    answer: "Elle peut être relancée (reprise, backfill) et doit alors produire le même résultat"
    decoys:
      - "Airflow refuse de planifier une tâche qui écrit dans une base de données externe"
      - "Une tâche non idempotente ne peut pas être affichée dans l'interface web d'Airflow"
    why: "Reprises et backfills réexécutent des tâches : si une relance duplique des lignes, l'historique devient faux. Airflow n'interdit ni l'écriture externe ni l'affichage."
  - id: backfill
    prompt: "Comment recalculer un DAG Airflow sur une période passée ?"
    answer: "Lancer un backfill sur l'intervalle de dates voulu"
    decoys:
      - "Changer l'horloge du serveur puis redémarrer le scheduler"
      - "Supprimer la base de métadonnées pour repartir de zéro"
    why: "Le backfill crée des DAG runs pour des intervalles passés. Toucher l'horloge ou effacer la base de métadonnées casse l'historique au lieu de le compléter."
  - id: executor
    prompt: "Quel composant d'Airflow détermine comment et où les tâches s'exécutent (localement, via Celery, dans Kubernetes) ?"
    answer: "L'executor"
    decoys:
      - "Le webserver"
      - "Le DAG processor"
      - "La base de métadonnées"
    why: "L'executor (LocalExecutor, CeleryExecutor, KubernetesExecutor…) définit le mode d'exécution des tâches. Le webserver sert l'interface, le DAG processor analyse les fichiers de DAG."
  - id: kubernetes-executor
    prompt: "Que fait le KubernetesExecutor d'Airflow ?"
    answer: "Il lance chaque tâche dans son propre pod Kubernetes"
    decoys:
      - "Il déploie le scheduler d'Airflow sur Kubernetes, les tâches restant dans son processus"
      - "Il transforme chaque DAG en Deployment Kubernetes qui tourne en permanence"
    why: "Avec le KubernetesExecutor, une tâche = un pod créé à la demande puis détruit, ce qui isole ses dépendances. Il ne crée pas de Deployment permanent par DAG."
  - id: celery-executor
    prompt: "Quel rôle Celery peut-il jouer dans une installation Airflow ?"
    answer: "Répartir les tâches sur un pool de workers, via le CeleryExecutor"
    decoys:
      - "Remplacer le scheduler d'Airflow, Celery Beat déclenchant alors les DAG"
      - "Stocker l'historique des exécutions à la place de la base de métadonnées"
    why: "Le CeleryExecutor envoie les tâches dans un broker, consommé par des workers Celery. Le scheduler et la base de métadonnées d'Airflow restent indispensables."
  - id: taskflow
    prompt: "Qu'apporte l'API TaskFlow d'Airflow (décorateurs @dag et @task) ?"
    answer: "Écrire les tâches comme des fonctions Python, les valeurs de retour passant par XCom"
    decoys:
      - "Écrire les DAG en YAML, Airflow générant ensuite le code Python correspondant"
      - "Exécuter les tâches en streaming, sans passer par le scheduler d'Airflow"
    why: "Avec TaskFlow, appeler une fonction @task avec la sortie d'une autre crée la dépendance et le passage par XCom implicitement. Les DAG restent du Python planifié par le scheduler."
  - id: sensor
    prompt: "À quoi sert un sensor dans Airflow ?"
    answer: "Attendre qu'une condition soit remplie (fichier arrivé, partition prête) avant de continuer"
    decoys:
      - "Mesurer le temps CPU consommé par chaque tâche pour l'afficher dans l'interface"
      - "Détecter les modifications du code d'un DAG et le redéployer automatiquement"
    why: "Un sensor est un opérateur qui vérifie une condition jusqu'à ce qu'elle soit vraie, puis laisse passer la suite du DAG. Il ne mesure rien et ne déploie rien."
  - id: deferrable
    prompt: "Quel est l'intérêt d'un opérateur différable (deferrable) dans Airflow ?"
    answer: "Libérer le slot de worker pendant une longue attente, confiée au triggerer"
    decoys:
      - "Reporter automatiquement la tâche au lendemain si le cluster est trop chargé"
      - "Exécuter la tâche plus tard sur une machine moins chère, choisie par le scheduler"
    why: "Une tâche différée se suspend et confie son attente au triggerer, un processus asynchrone, au lieu d'occuper un worker pour rien. Elle ne se reporte pas d'elle-même au lendemain."
  - id: connections
    prompt: "Où ranger les identifiants d'une base de données utilisée par des tâches Airflow ?"
    answer: "Dans une Connection Airflow, ou un gestionnaire de secrets branché"
    decoys:
      - "En dur dans le fichier Python du DAG, versionné avec le reste du code"
      - "Dans un XCom poussé par la première tâche de chaque exécution"
    why: "Les Connections centralisent hôte, identifiants et paramètres, et peuvent venir d'un gestionnaire de secrets. En dur dans le code ou dans un XCom, les secrets fuient dans Git ou la base."
  - id: code-niveau-module
    prompt: "Pourquoi éviter un appel à une API ou à une base au niveau supérieur d'un fichier de DAG ?"
    answer: "Le fichier est réanalysé régulièrement : ce code s'exécuterait à chaque analyse"
    decoys:
      - "Python interdit les appels réseau en dehors d'une fonction dans un module importé"
      - "Le scheduler n'exécute que les fonctions décorées et ignore le reste du fichier"
    why: "Airflow réinterprète périodiquement les fichiers de DAG pour détecter les changements ; un code lourd au niveau module ralentit cette analyse et sollicite la source à chaque passage."
  - id: decouverte-dags
    prompt: "Comment Airflow découvre-t-il les DAG à planifier ?"
    answer: "En analysant les fichiers Python du dossier de DAG"
    decoys:
      - "En lisant un registre que l'on met à jour par une commande airflow register"
      - "En interrogeant un dépôt d'images de conteneurs pour y trouver des DAG"
    why: "Airflow parcourt le dossier de DAG configuré et importe les fichiers Python pour y trouver des objets DAG. Il n'y a pas de commande d'enregistrement manuelle."
  - id: operateur-bitshift
    prompt: "Dans un DAG Airflow, que signifie l'écriture extraire >> charger ?"
    answer: "La tâche charger s'exécute après la tâche extraire"
    decoys:
      - "La tâche extraire transmet ses données à charger par un flux continu"
      - "Les deux tâches s'exécutent en parallèle, sur deux workers distincts"
    why: "L'opérateur >> déclare une dépendance d'ordre. Il ne transporte aucune donnée : un éventuel passage de valeur se fait via XCom ou un stockage externe."
  - id: trigger-rule
    prompt: "Par défaut, quand une tâche Airflow est-elle exécutée ?"
    answer: "Quand toutes ses tâches amont ont réussi (all_success)"
    decoys:
      - "Dès que l'une de ses tâches amont a réussi (one_success)"
      - "Quand toutes ses tâches amont sont terminées, quel qu'en soit le résultat (all_done)"
    why: "La trigger rule par défaut est all_success. one_success et all_done existent mais doivent être choisies explicitement, par exemple pour une tâche de nettoyage."
  - id: retries
    prompt: "Comment faire relancer automatiquement une tâche Airflow qui échoue ?"
    answer: "Avec ses paramètres retries et retry_delay"
    decoys:
      - "Avec catchup=True sur le DAG qui la contient"
      - "Avec un sensor placé juste après la tâche"
    why: "retries fixe le nombre de nouvelles tentatives et retry_delay l'attente entre elles. catchup concerne les intervalles passés, un sensor attend une condition."
  - id: base-metadonnees
    prompt: "Quelle base utiliser comme base de métadonnées d'Airflow en production ?"
    answer: "PostgreSQL ou MySQL"
    decoys:
      - "SQLite, la base proposée par défaut"
      - "Redis, pour sa faible latence"
    why: "SQLite convient pour essayer Airflow en local mais pas pour la production. Redis peut servir de broker au CeleryExecutor, pas de base de métadonnées."
  - id: pool
    prompt: "Comment limiter le nombre de tâches Airflow qui sollicitent en même temps une API fragile ?"
    answer: "Les affecter à un pool doté d'un nombre limité de slots"
    decoys:
      - "Leur donner une priority_weight plus faible que les autres tâches"
      - "Les placer dans un DAG séparé avec catchup désactivé"
    why: "Un pool plafonne le nombre de tâches simultanées qui l'utilisent. priority_weight ordonne les tâches en attente sans limiter leur nombre, catchup n'a pas de rapport."
---
