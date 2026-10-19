---
name: Data engineer
family: data
summary: "Construit les pipelines qui amènent des données fiables jusqu'à ceux qui les analysent."
mission: "Collecte les données de sources très différentes, les transporte, les transforme et les charge dans un entrepôt. Il rend les pipelines fiables, relançables et surveillés, pour que les analystes et les data scientists travaillent sur des données propres."
stack:
  - step: Écrire le code des pipelines
    intro: "Deux langages couvrent presque tout : Python pour la logique, SQL pour les transformations sur les tables."
    techs:
      - { tech: python, essential: true, why: "Le langage des scripts d'ingestion et de la plupart des outils de pipeline." }
      - { tech: sql, essential: true, why: "Exprime la plupart des transformations directement dans l'entrepôt." }
  - step: Collecter et transporter
    intro: "Les données naissent dans des applications. Pour les récupérer en continu plutôt que par export ponctuel, on passe par un flux d'événements."
    techs:
      - { tech: kafka, essential: true, why: "Journal d'événements : les applications publient, les pipelines lisent le flux à leur rythme." }
      - { tech: postgresql, why: "Souvent la source : la base opérationnelle de l'application qu'on extrait." }
  - step: Stocker en brut
    intro: "On garde d'abord les données telles qu'elles arrivent, pour pouvoir rejouer un traitement si on découvre une erreur."
    techs:
      - { tech: aws-s3, essential: true, why: "Stockage objet bon marché et durable : la base d'un data lake de fichiers bruts." }
  - step: Transformer
    intro: "Passer du brut à des tables propres et jointes. Le choix de l'outil dépend du volume : un script suffit pour quelques Go, un cluster pour beaucoup plus."
    techs:
      - { tech: spark, essential: true, why: "Moteur distribué pour traiter de très gros volumes en parallèle sur plusieurs machines." }
      - { tech: dbt, essential: true, why: "Les transformations dans l'entrepôt, en SQL versionné et testé." }
      - { tech: pandas, why: "Pratique pour de petits volumes ; limité par la mémoire d'une seule machine." }
      - { tech: duckdb, why: "SQL analytique en local, utile pour prototyper ou traiter des volumes moyens sans cluster." }
  - step: Charger l'entrepôt
    intro: "L'entrepôt est le point de rendez-vous : les analystes et data scientists y lisent des tables stables."
    techs:
      - { tech: snowflake, why: "Entrepôt cloud séparant stockage et calcul." }
      - { tech: bigquery, why: "Entrepôt serverless de Google Cloud." }
      - { tech: clickhouse, why: "Base colonnaire pour des agrégations très rapides sur de gros volumes." }
  - step: Orchestrer
    intro: "Un pipeline est une chaîne de tâches qui dépendent les unes des autres. L'orchestrateur les lance dans l'ordre, relance celles qui échouent et alerte."
    techs:
      - { tech: airflow, essential: true, why: "L'orchestrateur le plus répandu : des graphes de tâches écrits en Python et planifiés." }
      - { tech: dagster, why: "Orchestrateur centré sur les données produites (les « assets ») plutôt que sur les tâches." }
  - step: Industrialiser
    intro: "Un pipeline tourne sans surveillance humaine : il doit être déployé de façon reproductible."
    techs:
      - { tech: docker, why: "Empaquette un job avec ses dépendances pour qu'il tourne partout pareil." }
      - { tech: kubernetes, why: "Exécute les jobs en conteneurs sur un cluster, avec reprise en cas de panne." }
      - { tech: terraform, why: "Décrit l'infrastructure en code : entrepôt, buckets et clusters se recréent à l'identique." }
      - { tech: github-actions, why: "Teste et déploie le code des pipelines à chaque changement." }
  - step: Surveiller
    intro: "Un pipeline silencieux qui s'arrête est pire qu'un pipeline qui échoue bruyamment."
    techs:
      - { tech: prometheus, why: "Collecte des métriques (durées, volumes, échecs) pour déclencher des alertes." }
      - { tech: grafana, why: "Affiche ces métriques en tableaux de bord." }
---
