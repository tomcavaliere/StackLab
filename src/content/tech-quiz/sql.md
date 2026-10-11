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
---
