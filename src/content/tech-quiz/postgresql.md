---
questions:
  - id: acid
    prompt: "Que garantissent les transactions ACID de PostgreSQL ?"
    answer: "Pas d'écriture à moitié faite en cas de panne, pas de lecture incohérente entre utilisateurs"
    decoys:
      - "Que chaque requête s'exécute en moins d'une milliseconde"
      - "Que les données sont répliquées en permanence sur plusieurs datacenters, sans configuration"
    why: "ACID porte sur la fiabilité des écritures et la cohérence des lectures concurrentes, pas sur la vitesse ni la réplication."
  - id: mvcc
    prompt: "Que permet le MVCC de PostgreSQL ?"
    answer: "Les lectures ne bloquent pas les écritures"
    decoys:
      - "Répartir automatiquement les écritures sur plusieurs nœuds"
      - "Compresser les tables en colonnes"
    why: "Chaque transaction voit une version cohérente des données : lecteurs et écrivains ne s'attendent pas."
  - id: jsonb
    prompt: "Comment PostgreSQL gère-t-il des données semi-structurées ?"
    answer: "Avec des colonnes JSONB"
    decoys:
      - "Il ne les gère pas : il faut MongoDB à côté"
      - "En créant une table par attribut possible"
    why: "JSONB couvre une partie des besoins « document » sans ajouter de base."
  - id: postgis
    prompt: "À quoi sert l'extension PostGIS ?"
    answer: "Au géospatial"
    decoys:
      - "Aux vecteurs d'embeddings"
      - "À la recherche plein texte"
    why: "PostGIS gère les données géographiques. Les vecteurs, c'est pgvector ; la recherche plein texte est intégrée à PostgreSQL."
  - id: pgvector
    prompt: "Quelle extension stocke des vecteurs d'embeddings ?"
    answer: "pgvector"
    decoys:
      - "PostGIS"
      - "Citus"
    why: "pgvector ajoute un type vecteur et la recherche par similarité. Citus répartit les données sur plusieurs nœuds."
  - id: analytique
    prompt: "Pourquoi PostgreSQL n'est-il pas idéal pour l'analytique sur des années d'historique ?"
    answer: "Il stocke par lignes et vise le transactionnel ; un moteur colonnaire est conçu pour ça"
    decoys:
      - "Il ne sait pas exécuter de GROUP BY"
      - "Il limite chaque table à un million de lignes, au-delà desquelles les requêtes échouent"
    why: "Une agrégation sur quelques colonnes relit des lignes entières. La fiche ne donne volontairement aucun seuil chiffré : il dépend du matériel, du schéma et des requêtes."
  - id: ecritures-reparties
    prompt: "Écritures massives à répartir sur de nombreux nœuds : qu'offre la réplication native ?"
    answer: "Des répliques en lecture, pas de répartition des écritures : il faut Citus ou un sharding applicatif"
    decoys:
      - "Une répartition automatique des écritures sur tous les nœuds, sans extension ni configuration particulière"
      - "Rien : PostgreSQL ne sait pas se répliquer"
    why: "La réplication native multiplie les lectures possibles ; les écritures passent par le serveur principal."
  - id: choix-par-defaut
    prompt: "Quel est le statut de PostgreSQL pour une nouvelle application web ?"
    answer: "Le choix par défaut raisonnable, tant qu'aucune contrainte précise ne pousse ailleurs"
    decoys:
      - "Un choix réservé aux très gros volumes, trop lourd pour une application qui démarre"
      - "Une base à éviter pour un SaaS"
    why: "Base principale d'une application, d'une API ou d'un SaaS : PostgreSQL est polyvalent et évite d'opérer plusieurs systèmes."
  - id: integrite
    prompt: "À quel niveau PostgreSQL protège-t-il la cohérence des données ?"
    answer: "Au niveau de la base : types, contraintes, clés étrangères"
    decoys:
      - "Uniquement dans le code applicatif, la base ne vérifiant rien"
      - "Dans un cache placé devant la base"
    why: "Le schéma protège les données même si plusieurs applications, ou un bug, écrivent dedans."
  - id: cache-ou-file
    prompt: "Utiliser PostgreSQL comme cache ou comme file de messages ?"
    answer: "Faisable, mais Redis ou Kafka font ce travail plus simplement"
    decoys:
      - "Impossible : PostgreSQL ne sait gérer que des tables relationnelles classiques"
      - "Recommandé : c'est son usage principal"
    why: "On peut le faire, mais des outils dédiés sont conçus pour ça. La fiche le range dans « Quand l'éviter »."
---
