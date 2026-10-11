---
questions:
  - id: modele
    prompt: "Qu'est-ce qu'un modèle dbt ?"
    answer: "Un fichier qui contient une requête SELECT"
    decoys:
      - "Une classe Python qui décrit une table"
      - "Un fichier YAML de correspondance entre colonnes"
    why: "Chaque modèle est un SELECT ; dbt se charge de créer la table ou la vue correspondante dans l'entrepôt."
  - id: ref
    prompt: "À quoi sert ref('autre_modele') dans un modèle dbt ?"
    answer: "Déclarer une dépendance : dbt en déduit l'ordre d'exécution"
    decoys:
      - "Créer une clé étrangère dans l'entrepôt entre les deux tables"
      - "Importer un fichier CSV dans l'entrepôt"
    why: "ref() relie les modèles entre eux : dbt construit le graphe et crée tables et vues dans le bon ordre."
  - id: elt
    prompt: "dbt est le « T » de quelle approche ?"
    answer: "ELT : les données sont chargées brutes dans l'entrepôt, puis transformées sur place"
    decoys:
      - "ETL : les données sont transformées avant d'être chargées dans l'entrepôt"
      - "CDC : on capture en continu les changements de la base source"
    why: "En ELT, on charge d'abord, puis on transforme dans l'entrepôt, en SQL : c'est exactement ce que fait dbt."
  - id: ingestion
    prompt: "dbt peut-il extraire les données d'une API source vers l'entrepôt ?"
    answer: "Non : dbt ne transforme que ce qui est déjà chargé"
    decoys:
      - "Oui, grâce à ses connecteurs d'ingestion intégrés"
      - "Oui, en appelant l'API depuis la fonction ref()"
    why: "L'ingestion se fait avec d'autres outils ; dbt intervient une fois les données dans l'entrepôt."
  - id: tests
    prompt: "Quels tests dbt propose-t-il sur les modèles ?"
    answer: "Unicité, non-nullité, relations entre tables"
    decoys:
      - "Tests de charge de l'entrepôt"
      - "Tests de bout en bout de l'interface qui affiche les données"
    why: "Les tests dbt vérifient les données produites : une clé unique, une colonne jamais nulle, une relation respectée."
  - id: jinja
    prompt: "Quel moteur de gabarits enrichit le SQL de dbt ?"
    answer: "Jinja"
    decoys:
      - "JSX"
      - "Blade"
    why: "dbt compile un SQL enrichi de modèles Jinja (boucles, variables, macros). JSX est la syntaxe de React, Blade le moteur de gabarits de Laravel."
  - id: ou-tourne-le-calcul
    prompt: "Où s'exécute le calcul des transformations dbt ?"
    answer: "Dans l'entrepôt (Snowflake, BigQuery, PostgreSQL, DuckDB…)"
    decoys:
      - "Sur un cluster Spark fourni et opéré par dbt Labs"
      - "Dans la mémoire du poste qui lance dbt"
    why: "dbt envoie le SQL compilé à l'entrepôt, qui fait le calcul. dbt orchestre et compile."
  - id: hors-entrepot
    prompt: "Des transformations sur des fichiers hors entrepôt, avec une logique que le SQL exprime mal. Que préférer ?"
    answer: "Spark ou du code Python"
    decoys:
      - "dbt, en écrivant toute la logique en Jinja"
      - "dbt, en ajoutant des vues matérialisées"
    why: "dbt vit dans l'entrepôt et parle SQL. Pour des fichiers hors entrepôt ou une logique procédurale, Spark ou Python sont plus adaptés."
  - id: apport
    prompt: "Qu'apporte dbt à une équipe data qui écrit déjà du SQL ?"
    answer: "Les pratiques du génie logiciel : versionnement, revue de code, tests, CI"
    decoys:
      - "Un moteur SQL plus rapide que celui de l'entrepôt"
      - "Une interface graphique pour obtenir du SQL sans le connaître ni l'écrire"
    why: "Sans dbt, les transformations finissent en scripts éparpillés, sans tests ni documentation. dbt les structure en projet versionné."
  - id: distribution
    prompt: "Sous quelle forme dbt est-il distribué ?"
    answer: "dbt Core est open-source ; dbt Labs commercialise une offre hébergée"
    decoys:
      - "Uniquement en SaaS payant"
      - "Comme une fonction intégrée à Snowflake, disponible seulement pour ses clients"
    why: "On peut utiliser dbt Core gratuitement, avec de nombreux adaptateurs (BigQuery, Snowflake, DuckDB…)."
---
