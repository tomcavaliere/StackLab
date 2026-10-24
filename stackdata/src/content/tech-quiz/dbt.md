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
  - id: materialisations
    prompt: "Laquelle de ces listes ne contient que des matérialisations intégrées de dbt ?"
    answer: "view, table, incremental et ephemeral"
    decoys:
      - "view, table, stream et cache"
      - "table, index, partition et trigger"
    why: "La matérialisation dit comment dbt crée le modèle dans l'entrepôt. stream, cache, index ou trigger ne sont pas des matérialisations dbt."
  - id: materialisation-defaut
    prompt: "Sans configuration particulière, sous quelle forme dbt crée-t-il un modèle ?"
    answer: "Une vue"
    decoys:
      - "Une table"
      - "Un modèle éphémère"
      - "Une table incrémentale"
    why: "La matérialisation par défaut est view. On passe en table ou incremental quand la vue devient trop lente à interroger."
  - id: incremental
    prompt: "À quoi sert un modèle dbt incrémental ?"
    answer: "Ne traiter que les lignes nouvelles ou modifiées au lieu de tout reconstruire"
    decoys:
      - "Ajouter une colonne à la table à chaque exécution, pour garder un historique"
      - "Exécuter le modèle en continu dès qu'une ligne arrive dans la source"
    why: "Un modèle incrémental ajoute ou fusionne seulement ce qui a changé depuis la dernière exécution. Il reste un traitement par lots, pas du streaming."
  - id: is-incremental
    prompt: "Dans un modèle dbt incrémental, à quoi sert la macro is_incremental() ?"
    answer: "Ajouter un filtre seulement quand la table existe déjà, hors full refresh"
    decoys:
      - "Vérifier que l'entrepôt cible accepte bien les modèles incrémentaux"
      - "Compter les lignes ajoutées pour les afficher dans le journal d'exécution"
    why: "is_incremental() est vraie quand la table cible existe et que l'on n'a pas demandé de reconstruction : on y place le filtre sur les nouvelles lignes."
  - id: full-refresh
    prompt: "Comment forcer dbt à reconstruire entièrement un modèle incrémental ?"
    answer: "dbt run --full-refresh"
    decoys:
      - "dbt run --rebuild-all"
      - "dbt clean --models"
    why: "--full-refresh recrée la table de zéro. dbt clean supprime les dossiers générés (target/…), sans toucher à l'entrepôt."
  - id: ephemeral
    prompt: "Que devient un modèle dbt matérialisé en ephemeral ?"
    answer: "Rien n'est créé dans l'entrepôt : il est injecté en CTE dans les modèles qui l'utilisent"
    decoys:
      - "Une table temporaire, supprimée automatiquement à la fin de chaque exécution de dbt"
      - "Une vue qui expire et disparaît de l'entrepôt au bout d'un délai configurable"
    why: "Un modèle éphémère n'existe pas dans l'entrepôt : dbt recopie son SQL comme expression de table commune (CTE) chez ses dépendants."
  - id: source
    prompt: "À quoi sert source() dans un modèle dbt ?"
    answer: "Référencer une table brute chargée par un autre outil, déclarée en YAML"
    decoys:
      - "Télécharger une table depuis une base de production vers l'entrepôt"
      - "Afficher le SQL source d'un autre modèle dans la documentation"
    why: "source() pointe vers une table brute déclarée dans un fichier YAML : elle apparaît dans la lignée et peut être testée. dbt ne la charge pas lui-même."
  - id: source-freshness
    prompt: "Que vérifie la commande dbt source freshness ?"
    answer: "Que les données brutes ont été chargées récemment, d'après une colonne de date"
    decoys:
      - "Que le code des modèles a été modifié récemment dans le dépôt Git"
      - "Que les vues de l'entrepôt ont été recompilées depuis la dernière exécution"
    why: "On déclare sur une source une colonne de date de chargement et des seuils d'alerte ; dbt signale les sources dont le dernier chargement est trop ancien."
  - id: seeds
    prompt: "Que sont les seeds dans dbt ?"
    answer: "De petits fichiers CSV versionnés que dbt charge dans l'entrepôt"
    decoys:
      - "Des jeux de données aléatoires générés pour tester les modèles"
      - "Des valeurs initiales des séquences d'identifiants de l'entrepôt"
    why: "Les seeds conviennent aux petites tables de référence (codes pays, correspondances) chargées par dbt seed. Ce n'est pas un outil d'ingestion de gros volumes."
  - id: snapshots
    prompt: "À quoi servent les snapshots de dbt ?"
    answer: "Historiser les changements d'une table source (dimension à évolution lente de type 2)"
    decoys:
      - "Sauvegarder l'entrepôt entier pour pouvoir le restaurer en cas d'erreur grave"
      - "Figer le SQL compilé d'un modèle pour comparer deux versions du projet dbt"
    why: "Un snapshot conserve chaque version d'une ligne avec ses dates de validité, ce que la table source écrase. Ce n'est ni une sauvegarde ni un outil de comparaison de code."
  - id: macro
    prompt: "Qu'est-ce qu'une macro dans dbt ?"
    answer: "Une fonction Jinja réutilisable qui génère du SQL"
    decoys:
      - "Une procédure stockée que dbt installe dans l'entrepôt"
      - "Un raccourci clavier de l'éditeur de dbt Cloud"
    why: "Une macro factorise un morceau de SQL paramétré, appelé depuis les modèles et compilé par dbt. Rien n'est installé dans l'entrepôt."
  - id: dbt-build
    prompt: "Que fait la commande dbt build ?"
    answer: "Elle exécute modèles, tests, seeds et snapshots dans l'ordre du graphe"
    decoys:
      - "Elle compile le SQL des modèles dans target/ sans rien exécuter dans l'entrepôt"
      - "Elle installe les paquets déclarés dans packages.yml avant toute exécution"
    why: "dbt build enchaîne tout, en testant chaque modèle avant de construire ses dépendants. Compiler sans exécuter, c'est dbt compile ; installer les paquets, dbt deps."
  - id: packages
    prompt: "Comment réutiliser dans un projet dbt des macros publiées par la communauté, comme dbt_utils ?"
    answer: "Les déclarer dans packages.yml puis lancer dbt deps"
    decoys:
      - "Les installer avec pip install dbt_utils dans l'environnement"
      - "Copier leurs fichiers dans le dossier target/ du projet"
    why: "dbt deps télécharge les paquets déclarés dans packages.yml. target/ contient des fichiers générés, effacés par dbt clean."
  - id: selection-aval
    prompt: "Que fait dbt run --select mon_modele+ ?"
    answer: "Il exécute mon_modele et tous les modèles en aval"
    decoys:
      - "Il exécute mon_modele et tous les modèles en amont"
      - "Il exécute mon_modele seulement s'il a changé"
    why: "Le + placé après le nom sélectionne les descendants ; placé avant (+mon_modele), il sélectionne les ancêtres."
  - id: sql-compile
    prompt: "Où consulter le SQL réellement envoyé par dbt à l'entrepôt ?"
    answer: "Dans le dossier target/, après dbt compile ou dbt run"
    decoys:
      - "Dans le fichier dbt_project.yml, mis à jour à chaque exécution"
      - "Dans le journal de l'entrepôt uniquement, dbt n'en garde aucune trace"
    why: "dbt écrit le SQL compilé, Jinja résolu, dans target/. C'est le premier endroit à regarder pour déboguer un modèle."
  - id: docs-generate
    prompt: "Que produit dbt docs generate ?"
    answer: "Un site de documentation des modèles, avec leur graphe de lignée"
    decoys:
      - "Un fichier README rédigé automatiquement à partir des noms de colonnes"
      - "Un rapport PDF des résultats des tests, à envoyer aux équipes métier"
    why: "dbt génère un site statique (servi par dbt docs serve) qui reprend descriptions, colonnes, tests et le graphe des dépendances."
  - id: profiles
    prompt: "Où dbt Core trouve-t-il les informations de connexion à l'entrepôt ?"
    answer: "Dans profiles.yml, en général hors du dépôt"
    decoys:
      - "Dans dbt_project.yml, versionné avec le code"
      - "Dans chaque modèle, via un bloc config()"
    why: "profiles.yml (par défaut dans ~/.dbt/) contient hôtes et identifiants, ce qui les garde hors de Git. dbt_project.yml décrit le projet lui-même."
  - id: adaptateur
    prompt: "Qu'est-ce qu'un adaptateur dbt (dbt-postgres, dbt-snowflake…) ?"
    answer: "Un plugin qui permet à dbt de parler à un entrepôt donné"
    decoys:
      - "Un outil qui convertit un projet dbt en DAG Airflow exécutable"
      - "Un connecteur qui charge les données des sources dans l'entrepôt"
    why: "dbt Core est indépendant de l'entrepôt : l'adaptateur fournit la connexion et les particularités du dialecte SQL. Il ne fait pas d'ingestion."
  - id: test-singulier
    prompt: "Comment s'écrit un test dbt personnalisé (test singulier) ?"
    answer: "Une requête SELECT qui renvoie les lignes en erreur : le test échoue si elle en renvoie"
    decoys:
      - "Une fonction Python assert qui reçoit la table entière et lève une exception en cas d'erreur"
      - "Une requête qui renvoie true ou false, le test échouant quand le résultat vaut false"
    why: "Un test dbt cherche les lignes fautives : zéro ligne, le test passe. C'est aussi le principe des tests génériques comme unique ou not_null."
  - id: couche-staging
    prompt: "Dans la structure de projet recommandée par dbt Labs, quel est le rôle de la couche staging ?"
    answer: "Nettoyer et renommer chaque source, avec un modèle par table source"
    decoys:
      - "Agréger les données en indicateurs métier prêts pour les tableaux de bord"
      - "Charger les données des API sources dans l'entrepôt avant transformation"
    why: "Staging prépare des briques propres, une par source ; les jointures viennent en intermediate et les indicateurs métier dans les marts. dbt ne charge pas les sources."
---
