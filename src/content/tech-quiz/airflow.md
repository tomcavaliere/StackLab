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
---
