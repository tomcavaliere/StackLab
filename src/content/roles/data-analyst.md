---
name: Data analyst
family: data
summary: "Interroge les données pour répondre à des questions métier et en rendre compte."
mission: "Part d'une question (« pourquoi les ventes baissent ? »), va chercher les données dans l'entrepôt, les nettoie, les agrège, puis les présente sous forme de tableaux et de graphiques. Il décrit ce qui s'est passé plus qu'il ne construit de modèle prédictif."
stack:
  - step: Interroger les données
    intro: "L'essentiel du travail passe par des requêtes. SQL est la compétence de base : sans lui, on dépend de quelqu'un d'autre pour accéder aux données."
    techs:
      - { tech: sql, essential: true, why: "Le langage de requête de l'analyste : filtrer, joindre, agréger." }
      - { tech: postgresql, why: "Souvent la base opérationnelle qu'on interroge directement pour une première analyse." }
      - { tech: duckdb, why: "Moteur SQL analytique qui tourne en local, sur des fichiers CSV ou Parquet, sans serveur." }
  - step: Lire dans un entrepôt de données
    intro: "L'entrepôt rassemble les données de toute l'entreprise dans un format pensé pour l'analyse (colonnes, gros volumes) plutôt que pour l'application."
    techs:
      - { tech: bigquery, essential: true, why: "Entrepôt serverless de Google : on écrit du SQL, sans serveur à dimensionner." }
      - { tech: snowflake, why: "Entrepôt cloud qui sépare stockage et calcul : très répandu dans les équipes data." }
      - { tech: clickhouse, why: "Base colonnaire très rapide sur les agrégations de gros volumes." }
  - step: Nettoyer et transformer
    intro: "Les données brutes sont rarement prêtes : doublons, valeurs manquantes, formats différents. Cette étape prend souvent la plus grande partie du temps."
    techs:
      - { tech: dbt, essential: true, why: "Écrit les transformations en SQL versionné et testé : les tables analytiques deviennent fiables et documentées." }
      - { tech: pandas, essential: true, why: "Manipule des tableaux de données en Python quand SQL devient trop contraignant." }
      - { tech: jupyter, why: "Le notebook où l'on enchaîne requêtes, tableaux et graphiques, avec le texte qui explique l'analyse." }
      - { tech: python, why: "Pour automatiser un traitement ou aller là où SQL ne suffit pas." }
  - step: Visualiser et partager
    intro: "Une analyse qui n'est pas comprise ne sert à rien : on choisit le graphique qui répond à la question."
    techs:
      - { tech: grafana, why: "Tableaux de bord sur des séries temporelles et des sources variées ; plus orienté métriques que BI classique." }
---
