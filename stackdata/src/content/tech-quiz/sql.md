---
questions:
  - id: declaratif
    prompt: "Que signifie « SQL est un langage déclaratif » ?"
    answer: "On décrit le résultat voulu ; le moteur choisit comment l'obtenir"
    decoys:
      - "On décrit pas à pas le parcours des données, table par table"
      - "On doit déclarer chaque variable avant de l'utiliser"
    why: "SQL sépare le quoi (la requête) du comment (le plan d'exécution)."
  - id: optimiseur
    prompt: "Qui choisit le plan d'exécution d'une requête SQL ?"
    answer: "L'optimiseur du moteur"
    decoys:
      - "Le développeur, en l'écrivant dans la requête"
      - "Le client SQL qui envoie la requête"
    why: "Le moteur choisit index, ordre des jointures et algorithmes ; c'est pourquoi une même requête reste valable quand les volumes ou les index changent."
  - id: norme
    prompt: "Quelle norme définit le noyau de SQL ?"
    answer: "ISO/IEC 9075"
    decoys:
      - "ECMA-262"
      - "RFC 6455"
    why: "ECMA-262 est la norme de JavaScript, la RFC 6455 celle de WebSocket."
  - id: dialectes
    prompt: "Une requête écrite pour PostgreSQL fonctionnera-t-elle telle quelle sur tous les moteurs ?"
    answer: "Pas forcément : chaque moteur a son dialecte, et le SQL portable est plus restreint qu'on ne le croit"
    decoys:
      - "Oui : la norme garantit une portabilité totale"
      - "Non : aucune requête n'est jamais portable d'un moteur à l'autre, même un simple SELECT"
    why: "Le noyau normalisé se transpose largement, mais types, fonctions et syntaxe varient d'un moteur à l'autre."
  - id: graphes
    prompt: "Comment parcourir un graphe profond en SQL ?"
    answer: "Avec WITH RECURSIVE, mais cela devient vite illisible"
    decoys:
      - "Avec un GROUP BY sur la colonne parente"
      - "C'est impossible : SQL ne sait pas parcourir de relations"
    why: "C'est possible, mais pour des parcours profonds, une base orientée graphe peut être plus adaptée."
  - id: logique-metier
    prompt: "Où écrire une logique métier procédurale complexe, avec des appels externes ?"
    answer: "Plutôt dans le code applicatif, plus lisible et plus testable"
    decoys:
      - "Toujours en SQL, dans la base, pour la performance"
      - "Dans des vues SQL imbriquées"
    why: "Des règles en cascade et des appels externes s'expriment mal en SQL."
  - id: dbt
    prompt: "Quel outil fait de SQL le langage de base de la transformation dans un entrepôt ?"
    answer: "dbt"
    decoys:
      - "Kafka"
      - "Docker"
    why: "Chaque modèle dbt est une requête SELECT."
  - id: denominateur-commun
    prompt: "Pourquoi SQL est-il un dénominateur commun dans une équipe ?"
    answer: "Développeurs, profils data et analystes peuvent tous lire les mêmes données avec lui"
    decoys:
      - "C'est le seul langage que comprennent tous les navigateurs, sans aucune bibliothèque à installer"
      - "Il remplace les langages applicatifs"
    why: "SQL est partagé par des profils très différents."
  - id: au-dela-du-transactionnel
    prompt: "SQL sert-il seulement aux bases transactionnelles ?"
    answer: "Non : il sert aussi aux entrepôts analytiques et aux moteurs distribués (Spark SQL)"
    decoys:
      - "Oui : l'analytique et les moteurs distribués utilisent d'autres langages de requête"
      - "Oui, sauf quand on utilise dbt"
    why: "Ce qu'on apprend sur une base se transpose aux entrepôts et à Spark SQL."
  - id: jointure
    prompt: "Qu'est-ce qu'une jointure ?"
    answer: "Combiner les lignes de plusieurs tables selon une condition"
    decoys:
      - "Fusionner deux bases de données en une seule, avec leurs tables"
      - "Ajouter une colonne à une table existante"
    why: "Joindre, filtrer, agréger : ce sont les opérations de base de SQL sur des données relationnelles."
  - id: where-having
    prompt: "En SQL, quelle différence entre WHERE et HAVING ?"
    answer: "WHERE filtre les lignes avant le GROUP BY, HAVING filtre les groupes après"
    decoys:
      - "WHERE filtre les groupes après le GROUP BY, HAVING filtre les lignes avant"
      - "Aucune : HAVING est un simple synonyme de WHERE, gardé pour compatibilité"
    why: "HAVING porte sur le résultat des agrégats (HAVING COUNT(*) > 1), ce que WHERE ne peut pas faire puisqu'il agit avant le regroupement."
  - id: egal-null
    prompt: "En SQL, que donne la condition « colonne = NULL » ?"
    answer: "Jamais vrai : il faut écrire IS NULL"
    decoys:
      - "Vrai pour toutes les lignes où la colonne est vide"
      - "Une erreur de syntaxe, refusée par tous les moteurs"
    why: "Une comparaison avec NULL donne « inconnu », jamais vrai : aucune ligne n'est retenue. IS NULL est fait pour ce test."
  - id: left-join
    prompt: "Que garde un LEFT JOIN entre une table A (à gauche) et une table B ?"
    answer: "Toutes les lignes de A, avec NULL dans les colonnes de B quand rien ne correspond"
    decoys:
      - "Seulement les lignes de A qui ont une correspondance dans B, comme un INNER JOIN"
      - "Toutes les lignes de A et de B, avec NULL des deux côtés quand rien ne correspond"
    why: "Le INNER JOIN ne garde que les correspondances ; garder les deux côtés, c'est le FULL OUTER JOIN."
  - id: count-null
    prompt: "Quelle différence entre COUNT(*) et COUNT(colonne) ?"
    answer: "COUNT(colonne) ignore les lignes où la colonne vaut NULL"
    decoys:
      - "COUNT(*) ignore les lignes où au moins une colonne vaut NULL"
      - "Aucune : les deux comptent toujours exactement les mêmes lignes"
    why: "COUNT(*) compte toutes les lignes ; COUNT(colonne) ne compte que les valeurs non NULL de cette colonne."
  - id: ddl
    prompt: "À quelle catégorie de SQL appartiennent CREATE, ALTER et DROP ?"
    answer: "Le DDL (définition des données)"
    decoys:
      - "Le DML (manipulation des données)"
      - "Le DCL (contrôle des accès aux données)"
    why: "Le DDL décrit la structure (tables, index) ; le DML (SELECT, INSERT, UPDATE, DELETE) manipule les lignes ; le DCL (GRANT, REVOKE) gère les droits."
  - id: grant
    prompt: "Quelle commande SQL donne à un utilisateur un droit sur une table ?"
    answer: "GRANT"
    decoys:
      - "ALLOW"
      - "PERMIT ACCESS"
    why: "GRANT SELECT ON commandes TO analyste donne un droit ; REVOKE le retire. ALLOW et PERMIT n'existent pas en SQL."
  - id: fonction-fenetre
    prompt: "Que permet une fonction de fenêtre, écrite avec OVER (...) ?"
    answer: "Calculer sur un ensemble de lignes liées sans les fusionner en une seule"
    decoys:
      - "Limiter le résultat aux N premières lignes une fois le tri appliqué"
      - "Ouvrir une transaction qui ne verrouille qu'un ensemble de lignes"
    why: "Contrairement à GROUP BY, chaque ligne reste dans le résultat avec sa valeur calculée (total cumulé, rang, moyenne mobile)."
  - id: row-number
    prompt: "Quelle expression numérote les lignes d'un résultat à l'intérieur de chaque groupe ?"
    answer: "ROW_NUMBER() OVER (PARTITION BY ...)"
    decoys:
      - "COUNT(*) ... GROUP BY ... ORDER BY ..."
      - "SEQUENCE_ID() OVER (GROUP BY ...)"
    why: "PARTITION BY découpe en groupes, ORDER BY dans OVER fixe l'ordre de numérotation. COUNT avec GROUP BY réduit chaque groupe à une seule ligne."
  - id: cte
    prompt: "À quoi sert une clause WITH (CTE) non récursive ?"
    answer: "Nommer une sous-requête pour la réutiliser et rendre la requête lisible"
    decoys:
      - "Créer une table permanente utilisable par toutes les requêtes suivantes"
      - "Déclarer des variables typées utilisées dans la suite du script SQL"
    why: "La CTE n'existe que le temps de la requête ; elle remplace des sous-requêtes imbriquées par des étapes nommées."
  - id: injection
    prompt: "Comment se protéger de l'injection SQL ?"
    answer: "Avec des requêtes paramétrées, les valeurs étant envoyées à part"
    decoys:
      - "En échappant les apostrophes à la main avant de concaténer la requête"
      - "En chiffrant la requête SQL avant de l'envoyer au serveur de base"
    why: "Avec des paramètres, une valeur n'est jamais interprétée comme du SQL. L'échappement manuel est fragile, et le chiffrement ne change pas ce que le serveur exécute."
  - id: index
    prompt: "À quoi sert un index sur une colonne ?"
    answer: "Trouver des lignes sans lire toute la table, au prix d'écritures plus coûteuses"
    decoys:
      - "Garantir que la colonne ne contient jamais de valeur NULL ni aucun doublon"
      - "Compresser la colonne pour réduire la taille de la table stockée sur disque"
    why: "Chaque écriture doit aussi mettre l'index à jour. L'unicité et l'interdiction de NULL sont des contraintes (UNIQUE, NOT NULL), pas le rôle de l'index."
  - id: ordre-evaluation
    prompt: "Dans quel ordre logique les clauses d'un SELECT sont-elles évaluées ?"
    answer: "FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY"
    decoys:
      - "SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY"
      - "FROM, SELECT, WHERE, ORDER BY, GROUP BY, HAVING"
    why: "On écrit SELECT en premier, mais il est évalué après le regroupement : c'est pourquoi un alias du SELECT n'est pas utilisable dans WHERE."
  - id: distinct
    prompt: "Que fait SELECT DISTINCT ?"
    answer: "Il supprime les lignes en double du résultat"
    decoys:
      - "Il trie le résultat dans l'ordre croissant"
      - "Il supprime les doublons dans la table elle-même"
    why: "DISTINCT agit sur le résultat de la requête, sans modifier la table ; le tri, c'est ORDER BY."
  - id: union-all
    prompt: "Quelle différence entre UNION et UNION ALL ?"
    answer: "UNION supprime les doublons, UNION ALL les garde"
    decoys:
      - "UNION ALL supprime les doublons, UNION les garde"
      - "UNION ajoute des colonnes, UNION ALL des lignes"
    why: "Les deux empilent les lignes de deux requêtes. UNION ALL évite le dédoublonnage, souvent inutile et coûteux."
  - id: delete-sans-where
    prompt: "Que fait « DELETE FROM commandes; », sans clause WHERE ?"
    answer: "Il supprime toutes les lignes ; la table reste en place"
    decoys:
      - "Il supprime la table et sa définition, comme DROP TABLE"
      - "Il refuse de s'exécuter : WHERE est obligatoire sur un DELETE"
    why: "Sans WHERE, la condition porte sur toutes les lignes. La structure de la table, elle, n'est supprimée que par DROP TABLE."
  - id: origine-ibm
    prompt: "D'où vient SQL ?"
    answer: "D'IBM, dans les années 1970, d'après le modèle relationnel de Codd"
    decoys:
      - "D'Oracle, dans les années 1990, pour concurrencer les bases d'IBM"
      - "Du MIT, dans les années 1960, avant l'invention du modèle relationnel"
    why: "SEQUEL, ancêtre de SQL, a été conçu chez IBM pour le prototype System R, sur la base du modèle relationnel d'Edgar F. Codd."
  - id: cle-etrangere
    prompt: "Que garantit une clé étrangère ?"
    answer: "Que la valeur référence une ligne existante d'une autre table"
    decoys:
      - "Que la valeur est unique dans toute la base de données"
      - "Que la colonne est chiffrée avec la clé d'une autre table"
    why: "Elle empêche par exemple une commande de pointer vers un client qui n'existe pas. L'unicité, c'est UNIQUE ou PRIMARY KEY."
  - id: case-when
    prompt: "Quelle expression SQL renvoie une valeur différente selon une condition ?"
    answer: "CASE WHEN ... THEN ... ELSE ... END"
    decoys:
      - "IF ... THEN ... ELSE ... END IF ... FI"
      - "SWITCH ... CASE ... DEFAULT ... END"
    why: "CASE est l'expression conditionnelle de la norme, utilisable dans SELECT, WHERE ou ORDER BY. IF et SWITCH ne sont pas des expressions SQL standard."
  - id: coalesce
    prompt: "Que renvoie COALESCE(a, b, c) ?"
    answer: "La première valeur non NULL parmi a, b et c"
    decoys:
      - "La plus grande valeur parmi a, b et c"
      - "La concaténation de a, b et c en une chaîne"
    why: "COALESCE sert à remplacer un NULL par une valeur par défaut : COALESCE(surnom, prenom)."
  - id: group-by-colonne
    prompt: "Pourquoi « SELECT ville, nom, COUNT(*) FROM clients GROUP BY ville » est-il refusé par la norme ?"
    answer: "nom n'est ni groupé ni agrégé : sa valeur serait ambiguë"
    decoys:
      - "COUNT(*) ne peut pas être combiné avec un GROUP BY"
      - "GROUP BY exige un ORDER BY sur la même colonne"
    why: "Chaque ville regroupe plusieurs clients : le moteur ne saurait pas quel nom afficher. Il faut grouper par nom aussi ou l'agréger."
---
