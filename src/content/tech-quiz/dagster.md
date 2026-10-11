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
---
