---
questions:
  - id: asset
    prompt: "Quelle est l'unité de base de Dagster ?"
    answer: "L'asset : une donnée produite (table, fichier, modèle)"
    decoys:
      - "La tâche : un script à lancer à une heure donnée"
      - "Le conteneur : une image à déployer sur un cluster"
    why: "Dagster décrit ce qui est produit, pas seulement ce qu'il faut lancer : chaque asset a ses dépendances, sa lignée et son état."
  - id: deductions
    prompt: "Que déduit Dagster des assets déclarés et de leurs dépendances ?"
    answer: "Le graphe, la lignée, et ce qu'il faut recalculer"
    decoys:
      - "Le schéma de la base de production"
      - "Les droits d'accès de chaque utilisateur sur chaque table"
    why: "En déclarant chaque asset et ce dont il dépend, Dagster sait d'où vient une table et ce qui est périmé quand une source change."
  - id: dev-local
    prompt: "Sur quoi Dagster met-il l'accent ?"
    answer: "Le développement local et les tests : un pipeline se teste comme du code ordinaire"
    decoys:
      - "Le traitement d'événements en temps réel, à faible latence"
      - "L'exécution du calcul lourd à l'intérieur de l'orchestrateur, sans entrepôt ni cluster"
    why: "Un pipeline Dagster se lance et se teste sur un poste. Comme Airflow, il orchestre des lots et délègue le calcul lourd."
  - id: avec-dbt
    prompt: "Comment Dagster s'intègre-t-il à dbt ?"
    answer: "Chaque modèle dbt devient un asset, avec sa lignée et son état"
    decoys:
      - "Dagster remplace dbt et exécute lui-même le SQL des modèles"
      - "dbt lance Dagster à la fin de chaque modèle"
    why: "Les modèles dbt apparaissent comme des assets Dagster : on voit leur lignée et leur fraîcheur dans le même graphe que le reste du pipeline."
  - id: migration
    prompt: "Une organisation a déjà des centaines de DAG Airflow qui fonctionnent. Faut-il migrer vers Dagster ?"
    answer: "Rarement rentable : migrer coûte cher pour un gain parfois limité"
    decoys:
      - "Oui : Airflow n'est plus maintenu"
      - "Oui : Dagster exécute les DAG Airflow sans aucun changement"
    why: "Airflow reste très répandu et maintenu (version 3.0 en 2025). La fiche range « organisation déjà outillée sur Airflow » dans « Quand l'éviter »."
  - id: langage
    prompt: "En quel langage déclare-t-on les assets Dagster ?"
    answer: "Python"
    decoys:
      - "YAML"
      - "SQL"
    why: "Les assets et leurs dépendances se déclarent en Python, comme les DAG d'Airflow."
  - id: offre-hebergee
    prompt: "Comment s'appelle l'offre hébergée de Dagster ?"
    answer: "Dagster+"
    decoys:
      - "Cloud Composer"
      - "Astronomer"
    why: "Dagster+ est l'offre de Dagster Labs. Cloud Composer et Astronomer hébergent Airflow."
  - id: question-cle
    prompt: "À quelle question Dagster répond-il mieux qu'un orchestrateur centré sur les tâches ?"
    answer: "Cette table est-elle à jour, et d'où vient-elle ?"
    decoys:
      - "Combien de conteneurs faut-il démarrer ce soir ?"
      - "Quel utilisateur s'est connecté en dernier ?"
    why: "C'est la promesse des assets : fraîcheur et lignée de chaque donnée produite."
  - id: argument-airflow
    prompt: "Quel argument plaide pour Airflow plutôt que Dagster ?"
    answer: "Un écosystème d'intégrations et un vivier de recrutement plus anciens et plus larges"
    decoys:
      - "Airflow est le seul des deux à gérer les dépendances entre les étapes d'un pipeline"
      - "Dagster ne sait pas planifier une exécution récurrente"
    why: "Les deux gèrent dépendances et planification. Airflow a pour lui son ancienneté : plus d'intégrations existantes, plus de gens qui le connaissent."
  - id: cron
    prompt: "Deux ou trois tâches simples à planifier. Faut-il Dagster ?"
    answer: "Non : un cron suffit"
    decoys:
      - "Oui, avec Dagster+ pour ne rien héberger"
      - "Oui, couplé à Airflow pour plus de sûreté"
    why: "Un orchestrateur se justifie quand les étapes, les dépendances et les données se multiplient."
  - id: decorateur-asset
    prompt: "Quel décorateur Python déclare un asset dans Dagster ?"
    answer: "@asset"
    decoys:
      - "@task"
      - "@dag"
      - "@pipeline"
    why: "@asset transforme une fonction en asset Dagster. @task et @dag sont des décorateurs d'Airflow (API TaskFlow)."
  - id: dependance-parametre
    prompt: "Comment un asset Dagster déclare-t-il qu'il dépend d'un autre asset ?"
    answer: "En nommant l'asset amont comme paramètre de sa fonction (ou via deps)"
    decoys:
      - "En écrivant amont >> aval à la fin du fichier, comme dans un DAG"
      - "En listant les dépendances dans un fichier YAML séparé du code Python"
    why: "Dagster lit la signature de la fonction : un paramètre qui porte le nom d'un asset crée la dépendance, deps sert quand on n'a pas besoin de sa valeur. La syntaxe >> est celle d'Airflow."
  - id: materialiser
    prompt: "Que signifie « matérialiser » un asset dans Dagster ?"
    answer: "Exécuter sa fonction pour produire ou rafraîchir la donnée"
    decoys:
      - "Créer une vue matérialisée dans l'entrepôt, quelle que soit la fonction"
      - "Copier l'asset sur disque local pour le consulter hors connexion"
    why: "Une matérialisation calcule l'asset et enregistre l'événement (date, métadonnées). La vue matérialisée est un objet SQL distinct, que Dagster ne crée pas d'office."
  - id: op
    prompt: "Qu'est-ce qu'un op dans Dagster ?"
    answer: "Une unité de calcul, qui ne déclare pas en soi de donnée produite"
    decoys:
      - "Un opérateur humain chargé de valider chaque exécution avant son lancement"
      - "Un connecteur prêt à l'emploi vers un service cloud, comme les opérateurs Airflow"
    why: "L'op est la brique de calcul de Dagster, proche d'une tâche ; l'asset y ajoute la notion de donnée produite. Ce n'est ni une validation humaine ni un connecteur."
  - id: job
    prompt: "Qu'est-ce qu'un job dans Dagster ?"
    answer: "Une sélection d'assets ou d'ops exécutée ensemble, que l'on peut planifier"
    decoys:
      - "Un conteneur Kubernetes que Dagster démarre au lancement et garde ensuite en service"
      - "Un compte de service qui porte les droits d'accès à l'entrepôt de données"
    why: "Un job désigne ce qui s'exécute ensemble ; schedules et sensors déclenchent des jobs. Ce n'est ni un conteneur ni une identité."
  - id: schedule
    prompt: "Comment exécuter un job Dagster chaque jour à 6 h ?"
    answer: "Avec un schedule défini par une expression cron"
    decoys:
      - "Avec un IO manager configuré pour se réveiller à 6 h"
      - "Avec une partition quotidienne, qui suffit seule à déclencher le job"
    why: "Un schedule déclenche un job selon une expression cron. Une partition découpe un asset sans rien déclencher, un IO manager gère le stockage."
  - id: sensor
    prompt: "À quoi sert un sensor dans Dagster ?"
    answer: "Déclencher une exécution en réaction à un événement (fichier arrivé, asset mis à jour)"
    decoys:
      - "Mesurer la consommation mémoire de chaque asset pendant sa matérialisation"
      - "Bloquer toute exécution tant qu'un administrateur n'a pas validé le code"
    why: "Un sensor surveille une condition externe et lance une exécution quand elle est remplie, là où un schedule suit l'horloge."
  - id: partitions
    prompt: "À quoi servent les partitions d'un asset Dagster ?"
    answer: "Découper l'asset (par jour, par client…) pour ne recalculer que les tranches concernées"
    decoys:
      - "Répartir l'asset sur plusieurs disques pour accélérer sa lecture par l'entrepôt"
      - "Séparer le code de l'asset en plusieurs fichiers Python pour le rendre lisible"
    why: "Une partition est une tranche logique de l'asset : on matérialise ou on rejoue seulement les jours ou clients voulus. Le stockage physique reste l'affaire de l'entrepôt."
  - id: backfill
    prompt: "Comment recalculer dans Dagster un asset partitionné par jour sur les trois derniers mois ?"
    answer: "Lancer un backfill sur ces partitions"
    decoys:
      - "Supprimer l'asset puis attendre le prochain schedule"
      - "Modifier la date système du démon Dagster"
    why: "Un backfill matérialise une plage de partitions. Supprimer l'asset ne recalcule que la partition courante au prochain déclenchement."
  - id: resource
    prompt: "Qu'est-ce qu'une resource dans Dagster ?"
    answer: "Un objet injecté dans les assets (client d'entrepôt, d'API), remplaçable en test"
    decoys:
      - "Un quota de CPU et de mémoire réservé à chaque asset sur le cluster de calcul"
      - "Un fichier de données brutes déposé dans le dossier du projet avant exécution"
    why: "Les resources isolent l'accès aux systèmes externes : en test, on injecte une version factice. Ce n'est pas un quota matériel."
  - id: io-manager
    prompt: "Que fait un IO manager dans Dagster ?"
    answer: "Il décide où et comment la sortie d'un asset est stockée, puis relue en aval"
    decoys:
      - "Il gère les entrées clavier de l'interface web et les droits des utilisateurs"
      - "Il limite le débit réseau des assets qui appellent des API externes"
    why: "L'IO manager écrit la valeur retournée par un asset (fichier, table…) et la recharge pour les assets aval, ce qui sépare le calcul du stockage."
  - id: definitions
    prompt: "Quel objet Dagster regroupe les assets, jobs, schedules, sensors et resources d'un projet ?"
    answer: "Definitions"
    decoys:
      - "DagBag"
      - "Manifest"
      - "Pipeline"
    why: "Un objet Definitions expose au chargement tout ce que contient le code. DagBag est la collection de DAG d'Airflow, manifest.json un fichier produit par dbt."
  - id: dagit
    prompt: "Sous quel nom l'interface web de Dagster était-elle connue avant de devenir « Dagster UI » ?"
    answer: "Dagit"
    decoys:
      - "Dagview"
      - "Dagboard"
      - "Dagweb"
    why: "L'interface web s'appelait Dagit ; elle a été renommée Dagster UI. Les autres noms n'ont jamais existé."
  - id: dagster-dev
    prompt: "Quelle commande lance l'interface et le démon de Dagster sur un poste de développement ?"
    answer: "dagster dev"
    decoys:
      - "dagster serve"
      - "dagster up"
      - "airflow standalone"
    why: "dagster dev démarre l'interface web et le démon en local. airflow standalone joue un rôle comparable pour Airflow."
  - id: daemon
    prompt: "Quel processus Dagster fait tourner les schedules et les sensors ?"
    answer: "Le démon Dagster (dagster-daemon)"
    decoys:
      - "Le serveur web de l'interface"
      - "Un worker Celery fourni par Dagster"
    why: "Le démon évalue schedules, sensors et backfills en continu. Sans lui, l'interface fonctionne mais rien ne se déclenche tout seul."
  - id: asset-checks
    prompt: "À quoi servent les asset checks de Dagster ?"
    answer: "Vérifier la qualité d'un asset (valeurs nulles, doublons…) après sa matérialisation"
    decoys:
      - "Vérifier que le code Python de l'asset respecte les règles de style du projet"
      - "Vérifier que l'utilisateur a le droit de lancer la matérialisation de l'asset"
    why: "Un asset check est un contrôle de données attaché à un asset, dont le résultat s'affiche à côté de lui. Le style du code et les droits relèvent d'autres outils."
  - id: test-unitaire
    prompt: "Comment tester un asset Dagster dans un test unitaire ?"
    answer: "Appeler directement sa fonction Python, avec des resources factices"
    decoys:
      - "Le déployer sur Dagster+ puis observer sa prochaine matérialisation"
      - "Écrire un DAG Airflow de test qui appelle l'asset à heure fixe"
    why: "Un asset reste une fonction : on l'appelle dans pytest en lui injectant de fausses resources. C'est l'accent de Dagster sur les tests."
  - id: multi-asset
    prompt: "Comment déclarer dans Dagster une seule fonction qui produit plusieurs assets à la fois ?"
    answer: "Avec le décorateur @multi_asset"
    decoys:
      - "En retournant une liste depuis une fonction @asset"
      - "Avec le décorateur @asset_group"
    why: "@multi_asset déclare plusieurs sorties, chacune étant un asset distinct dans le graphe. Une liste retournée par @asset reste un seul asset."
  - id: dagster-dbt
    prompt: "Quelle bibliothèque charge un projet dbt dans Dagster pour en faire des assets ?"
    answer: "dagster-dbt"
    decoys:
      - "dbt-dagster, un adaptateur de dbt Labs"
      - "dbt-airflow-bridge"
    why: "dagster-dbt lit le projet dbt et crée un asset par modèle. Les adaptateurs dbt, eux, servent à parler à un entrepôt."
  - id: mode-hybride
    prompt: "Dans le mode hybride de Dagster+, où s'exécute le code des pipelines ?"
    answer: "Dans l'infrastructure du client, Dagster+ hébergeant le plan de contrôle"
    decoys:
      - "Entièrement chez Dagster Labs, le client n'hébergeant rien du tout"
      - "Sur le poste du développeur, qui doit rester allumé pendant chaque exécution"
    why: "Dagster+ propose un mode serverless, où Dagster Labs exécute aussi le code, et un mode hybride, où un agent exécute le code chez le client."
---
