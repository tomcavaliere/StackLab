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
  - id: vacuum
    prompt: "À quoi sert la commande VACUUM dans PostgreSQL ?"
    answer: "Récupérer l'espace des anciennes versions de lignes laissées par le MVCC"
    decoys:
      - "Vider entièrement une table de toutes ses lignes, en une seule commande rapide"
      - "Compresser toute la base sur disque pour la rendre plus rapide à sauvegarder"
    why: "Une mise à jour crée une nouvelle version de ligne ; VACUUM rend réutilisable l'espace des versions mortes. Vider une table, c'est TRUNCATE."
  - id: autovacuum
    prompt: "Que fait le démon autovacuum de PostgreSQL ?"
    answer: "Il lance VACUUM et ANALYZE automatiquement selon l'activité des tables"
    decoys:
      - "Il sauvegarde automatiquement la base chaque nuit vers un stockage objet externe"
      - "Il supprime automatiquement les tables qui n'ont plus été lues depuis longtemps"
    why: "autovacuum nettoie les versions mortes et met à jour les statistiques de l'optimiseur sans intervention ; il ne fait ni sauvegarde ni suppression de tables."
  - id: wal
    prompt: "Qu'est-ce que le WAL (Write-Ahead Log) de PostgreSQL ?"
    answer: "Un journal où chaque modification est écrite avant d'être appliquée aux fichiers de données"
    decoys:
      - "Un cache mémoire qui garde les résultats des requêtes fréquentes pour les resservir tels quels"
      - "Un pare-feu applicatif qui filtre les requêtes SQL suspectes avant leur exécution par le moteur"
    why: "Le WAL permet de rejouer les modifications après une panne ; il sert aussi de base à la réplication. PostgreSQL n'a ni cache de résultats ni pare-feu SQL intégré."
  - id: explain-analyze
    prompt: "Quelle commande PostgreSQL exécute une requête et affiche son plan avec les temps réellement mesurés ?"
    answer: "EXPLAIN ANALYZE"
    decoys:
      - "SHOW EXECUTION PLAN"
      - "DESCRIBE STATEMENT"
    why: "EXPLAIN seul affiche le plan estimé ; ANALYZE l'exécute vraiment et ajoute les temps et le nombre de lignes réels. Les deux autres syntaxes n'existent pas dans PostgreSQL."
  - id: psql
    prompt: "Quel est le client en ligne de commande officiel de PostgreSQL ?"
    answer: "psql"
    decoys:
      - "pgsh"
      - "pg_cli"
    why: "psql est livré avec PostgreSQL ; ses méta-commandes comme \\dt (lister les tables) ou \\d (décrire un objet) sont très utilisées."
  - id: pg-dump
    prompt: "Quel outil livré avec PostgreSQL produit une sauvegarde logique d'une base ?"
    answer: "pg_dump"
    decoys:
      - "pg_backup"
      - "pg_export"
    why: "pg_dump exporte une base (en SQL ou dans un format d'archive relu par pg_restore). pg_backup et pg_export n'existent pas."
  - id: identity
    prompt: "Quelle syntaxe standard crée une colonne d'identifiant auto-incrémenté dans un PostgreSQL récent ?"
    answer: "GENERATED ALWAYS AS IDENTITY"
    decoys:
      - "INTEGER AUTO_INCREMENT PRIMARY KEY"
      - "INTEGER AUTOINCREMENT DEFAULT NEXT"
    why: "Les colonnes d'identité, conformes à la norme SQL, existent depuis PostgreSQL 10 (avant, on utilisait serial). AUTO_INCREMENT est la syntaxe de MySQL."
  - id: index-defaut
    prompt: "Quel type d'index PostgreSQL crée-t-il quand on ne précise rien dans CREATE INDEX ?"
    answer: "B-tree"
    decoys:
      - "Hash"
      - "GiST"
      - "SP-GiST"
    why: "Le B-tree couvre l'égalité, les comparaisons et le tri. Hash, GiST et SP-GiST existent aussi, mais il faut les demander avec USING."
  - id: index-gin
    prompt: "Quel type d'index PostgreSQL accélère les recherches à l'intérieur d'une colonne JSONB ou d'un tableau ?"
    answer: "GIN"
    decoys:
      - "BRIN"
      - "B-tree"
    why: "GIN indexe chaque élément d'une valeur composite (clés JSONB, éléments de tableau, mots). Un B-tree indexe la valeur entière ; BRIN résume des plages de blocs."
  - id: on-conflict
    prompt: "Quelle syntaxe PostgreSQL insère une ligne, ou la met à jour si la clé existe déjà ?"
    answer: "INSERT ... ON CONFLICT DO UPDATE"
    decoys:
      - "INSERT ... ON DUPLICATE KEY UPDATE"
      - "REPLACE INTO ... WHERE NOT EXISTS"
    why: "ON CONFLICT est la syntaxe d'« upsert » de PostgreSQL. ON DUPLICATE KEY UPDATE est celle de MySQL."
  - id: returning
    prompt: "Que fait la clause RETURNING ajoutée à un INSERT dans PostgreSQL ?"
    answer: "Elle renvoie des colonnes des lignes insérées, par exemple l'id généré"
    decoys:
      - "Elle annule l'insertion si une contrainte échoue, puis rend la main au client"
      - "Elle renvoie le nombre total de lignes de la table après l'insertion terminée"
    why: "RETURNING évite une seconde requête pour relire l'id ou les valeurs par défaut ; elle marche aussi sur UPDATE et DELETE."
  - id: ddl-transactionnel
    prompt: "Peut-on placer un CREATE TABLE ou un ALTER TABLE dans une transaction PostgreSQL ?"
    answer: "Oui : le DDL est transactionnel et peut être annulé par ROLLBACK"
    decoys:
      - "Non : tout changement de schéma est validé immédiatement, sans retour possible"
      - "Seulement si la table concernée est vide au moment où on la modifie"
    why: "Une migration ratée peut être annulée d'un bloc, ce que tous les moteurs ne permettent pas (MySQL valide implicitement la plupart des DDL)."
  - id: listen-notify
    prompt: "Quel mécanisme intégré permet à PostgreSQL de prévenir des clients connectés qu'un événement a eu lieu ?"
    answer: "LISTEN / NOTIFY"
    decoys:
      - "PUBLISH / SUBSCRIBE"
      - "WATCH / TRIGGER EVENT"
    why: "Un client s'abonne à un canal avec LISTEN, un autre envoie un message avec NOTIFY. La réplication logique utilise PUBLICATION / SUBSCRIPTION, qui est autre chose."
  - id: vue-materialisee
    prompt: "Qu'est-ce qu'une vue matérialisée dans PostgreSQL ?"
    answer: "Le résultat d'une requête stocké sur disque, recalculé par REFRESH"
    decoys:
      - "Une vue recalculée à chaque lecture, sans rien stocker sur le disque"
      - "Une table temporaire supprimée automatiquement à la fin de la session"
    why: "Elle accélère une requête coûteuse au prix de données pas toujours fraîches. Une vue simple, elle, est recalculée à chaque lecture."
  - id: pgbouncer
    prompt: "Pourquoi place-t-on souvent PgBouncer devant PostgreSQL ?"
    answer: "Chaque connexion est un processus serveur coûteux : PgBouncer les mutualise"
    decoys:
      - "Pour chiffrer les données au repos, ce que PostgreSQL ne sait pas faire seul"
      - "Pour répartir les écritures entre plusieurs serveurs principaux en parallèle"
    why: "PostgreSQL crée un processus par connexion ; un pool de connexions permet à de nombreux clients de partager un petit nombre de connexions réelles."
  - id: origine-berkeley
    prompt: "De quel projet universitaire PostgreSQL est-il issu ?"
    answer: "Postgres, à l'université de Californie à Berkeley"
    decoys:
      - "Ingres, développé au MIT dans les années 1990"
      - "System R, au laboratoire de recherche de Stanford"
    why: "Postgres a été lancé à Berkeley par Michael Stonebraker, successeur d'Ingres (aussi à Berkeley). System R était un projet d'IBM."
  - id: licence
    prompt: "Sous quelle licence PostgreSQL est-il distribué ?"
    answer: "La PostgreSQL License, permissive, proche de MIT et BSD"
    decoys:
      - "La GPL, qui impose de publier le code de toute version modifiée"
      - "La SSPL, comme MongoDB, qui encadre les offres en service managé"
    why: "La licence PostgreSQL autorise l'usage, la modification et la redistribution, y compris commerciale, sans obligation de publier le code."
  - id: replication-logique
    prompt: "Que permet la réplication logique de PostgreSQL (publications et abonnements) ?"
    answer: "Répliquer des tables choisies, sous forme de changements de lignes"
    decoys:
      - "Copier les fichiers de données bloc par bloc vers une réplique identique"
      - "Répartir automatiquement les écritures entre plusieurs serveurs principaux"
    why: "La réplication physique (streaming) recopie toute l'instance ; la logique transmet les changements de tables sélectionnées, par exemple vers une autre version majeure."
  - id: schema-namespace
    prompt: "Dans PostgreSQL, qu'est-ce qu'un schéma créé par CREATE SCHEMA ?"
    answer: "Un espace de noms qui regroupe des tables dans une même base"
    decoys:
      - "Un fichier de migration qui décrit l'évolution des tables dans le temps"
      - "Une base de données séparée, avec ses propres fichiers et ses utilisateurs"
    why: "Une base contient un ou plusieurs schémas (public par défaut) ; on peut y ranger des tables homonymes séparées, et joindre des tables de schémas différents."
  - id: partitionnement
    prompt: "Que fait le partitionnement déclaratif d'une table PostgreSQL ?"
    answer: "Il découpe une grande table en partitions, par plage, liste ou hachage"
    decoys:
      - "Il répartit la table sur plusieurs serveurs, sans extension ni configuration"
      - "Il duplique la table sur chaque réplique pour accélérer toutes les lectures"
    why: "Les partitions restent sur le même serveur ; on peut par exemple supprimer un mois entier d'un coup. Répartir sur plusieurs nœuds demande Citus ou un sharding applicatif."
---
