---
questions:
  - id: index-inverse
    prompt: "Sur quelle structure repose la recherche d'Elasticsearch ?"
    answer: "Un index inversé : pour chaque mot, la liste des documents qui le contiennent"
    decoys:
      - "Un arbre B qui trie tous les documents par date d'ajout, puis les parcourt un par un"
      - "Un ensemble trié en mémoire, comme dans Redis"
    why: "L'index inversé trouve instantanément les documents qui contiennent un mot."
  - id: lucene
    prompt: "Sur quelle bibliothèque Elasticsearch est-il bâti ?"
    answer: "Apache Lucene"
    decoys:
      - "Apache Spark"
      - "SQLite"
    why: "Lucene fournit l'indexation et la recherche ; Elasticsearch les distribue sur un cluster."
  - id: vs-like
    prompt: "Qu'apporte Elasticsearch par rapport à un LIKE '%…%' en SQL ?"
    answer: "L'analyse de la langue, le classement par pertinence, la tolérance aux fautes et les agrégations"
    decoys:
      - "Uniquement une exécution plus rapide du même LIKE"
      - "Des transactions qui portent sur plusieurs documents, avec un verrouillage plus fin qu'en SQL"
    why: "Racines, accents, synonymes, pertinence, fautes de frappe : un LIKE ne fait rien de tout ça."
  - id: pas-base-principale
    prompt: "Pourquoi ne pas faire d'Elasticsearch la base principale ?"
    answer: "Pas de transactions entre documents, et un document n'est trouvable qu'après un court délai"
    decoys:
      - "Il ne sait pas stocker de JSON : chaque document doit être converti en texte brut avant l'indexation"
      - "Il ne peut pas filtrer les résultats"
    why: "La base de référence reste transactionnelle ; Elasticsearch en est une copie à synchroniser."
  - id: elk
    prompt: "Que désigne le « E » de la pile ELK ?"
    answer: "Elasticsearch, avec Logstash et Kibana"
    decoys:
      - "Express, avec Lambda et Kafka"
      - "Elastic Cloud, avec Lucene et Kibana"
    why: "La pile ELK centralise et fouille les journaux de nombreux services."
  - id: opensearch
    prompt: "Pourquoi AWS a-t-il créé OpenSearch ?"
    answer: "Elastic a quitté la licence Apache en 2021 ; OpenSearch en est un fork"
    decoys:
      - "Pour remplacer DynamoDB"
      - "Parce qu'Elastic a été racheté par Google, qui a fermé le code source"
    why: "Le changement de licence a conduit AWS à forker le projet."
  - id: licence-2024
    prompt: "Quelle licence Elastic a-t-il ajoutée en option en 2024 ?"
    answer: "AGPL"
    decoys:
      - "MIT"
      - "Domaine public"
    why: "Après avoir quitté la licence Apache en 2021, Elastic a ajouté l'AGPL comme option en 2024."
  - id: recherche-simple
    prompt: "Recherche simple sur un volume modeste : que suggère la fiche ?"
    answer: "La recherche plein texte de PostgreSQL, sans second système"
    decoys:
      - "Un cluster Elasticsearch d'au moins trois nœuds, dès le premier jour"
      - "Redis, avec ses ensembles triés"
    why: "Un second système doit être opéré et synchronisé ; pour un besoin simple, PostgreSQL suffit souvent."
  - id: facettes
    prompt: "Comment calcule-t-on les compteurs des filtres à facettes (par marque, par prix) ?"
    answer: "Avec des agrégations"
    decoys:
      - "Avec des jointures"
      - "Avec une tâche planifiée qui recompte chaque nuit"
    why: "Les agrégations calculent ces compteurs à la volée, pour chaque recherche."
  - id: shards
    prompt: "Comment les documents sont-ils répartis sur un cluster Elasticsearch ?"
    answer: "En shards, répliqués"
    decoys:
      - "Dans un seul fichier partagé par tous les nœuds"
      - "Par ordre alphabétique, sur des serveurs dédiés"
    why: "Les shards répartissent la charge, les répliques protègent contre la perte d'un nœud."
  - id: synchronisation
    prompt: "Comment Elasticsearch s'articule-t-il avec la base principale ?"
    answer: "C'est une copie, alimentée à partir d'elle et à synchroniser"
    decoys:
      - "Il la remplace entièrement"
      - "Il en devient la source de vérité, et la base principale le recopie"
    why: "La fiche le présente en complément de la base principale, alimenté à partir d'elle."
  - id: mapping
    prompt: "Qu'est-ce que le mapping d'un index Elasticsearch ?"
    answer: "La définition des champs et de leurs types, qui décide de leur indexation"
    decoys:
      - "La liste des nœuds du cluster qui hébergent les shards de cet index"
      - "La correspondance entre l'index et la table SQL dont il est la copie"
    why: "Le mapping dit qu'un champ est du texte, un mot-clé, une date, un nombre… et donc comment le chercher. Le placement des shards et la synchronisation sont d'autres sujets."
  - id: text-ou-keyword
    prompt: "Quelle différence entre un champ text et un champ keyword dans Elasticsearch ?"
    answer: "text est analysé pour le plein texte ; keyword est gardé tel quel pour filtrer, trier, agréger"
    decoys:
      - "text est limité à une seule langue ; keyword accepte toutes les langues mais ignore les accents"
      - "text est stocké sur disque ; keyword est gardé uniquement en mémoire pour répondre plus vite"
    why: "Un champ text est découpé en termes normalisés ; un keyword reste une valeur exacte, adaptée aux identifiants, statuts ou facettes."
  - id: analyseur
    prompt: "Que fait un analyseur (analyzer) dans Elasticsearch ?"
    answer: "Il découpe le texte en termes et les normalise (minuscules, racines…)"
    decoys:
      - "Il mesure le temps des requêtes lentes et propose les index à créer"
      - "Il vérifie l'orthographe des documents et rejette ceux qui ont des fautes"
    why: "L'analyseur s'applique au texte indexé comme au texte cherché, pour que « Chaussures » trouve « chaussure ». Il ne fait ni profilage ni contrôle d'orthographe."
  - id: bm25
    prompt: "Quel algorithme de pertinence Elasticsearch utilise-t-il par défaut ?"
    answer: "BM25"
    decoys:
      - "PageRank"
      - "TF-IDF classique"
    why: "BM25, un raffinement de TF-IDF, est le score par défaut de Lucene et donc d'Elasticsearch. PageRank classe des pages web d'après leurs liens."
  - id: term-sur-text
    prompt: "Pourquoi une requête term sur un champ text ne trouve-t-elle souvent rien ?"
    answer: "term n'analyse pas la valeur cherchée, alors que le texte indexé l'a été"
    decoys:
      - "term ne fonctionne que sur les nombres et les dates, jamais sur le texte"
      - "term ne cherche que dans le premier shard de l'index, pas dans les autres"
    why: "« Chaussure Rouge » cherché tel quel ne correspond à aucun terme indexé, stocké en minuscules et découpé. Pour du texte, on utilise match, qui analyse la recherche."
  - id: query-dsl
    prompt: "Sous quelle forme écrit-on le plus souvent une recherche dans l'API d'Elasticsearch ?"
    answer: "En JSON, avec le Query DSL"
    decoys:
      - "En CQL, comme avec Cassandra"
      - "En XML, avec un schéma XSD"
    why: "Le Query DSL décrit la requête en JSON (match, bool, range…). Elasticsearch propose aussi d'autres langages, mais ni CQL ni XML."
  - id: requete-bool
    prompt: "À quoi sert la requête bool d'Elasticsearch ?"
    answer: "À combiner des clauses must, should, must_not et filter"
    decoys:
      - "À tester si un champ booléen d'un document vaut vrai"
      - "À convertir le score de pertinence en vrai ou en faux"
    why: "bool assemble plusieurs conditions : obligatoires, souhaitées, exclues ou de filtrage. Elle n'a rien de spécifique aux champs booléens."
  - id: filter-ou-must
    prompt: "Dans une requête bool, quelle différence entre une clause filter et une clause must ?"
    answer: "filter ne calcule pas de score et peut être mise en cache"
    decoys:
      - "filter s'applique après la pagination, must avant elle"
      - "filter rend la condition facultative, must l'impose"
    why: "Les deux excluent les documents qui ne correspondent pas, mais seule must contribue au score. Pour un critère oui/non (statut, plage de prix), filter est plus efficace."
  - id: refresh
    prompt: "Quelle opération rend visibles à la recherche les documents récemment indexés dans Elasticsearch ?"
    answer: "Le refresh, qui ouvre un nouveau segment"
    decoys:
      - "Le snapshot, qui copie l'index vers un dépôt"
      - "Le reindex, qui reconstruit l'index entier"
    why: "Les documents deviennent cherchables au refresh suivant, périodique par défaut : c'est le court délai qui fait parler de quasi temps réel. Snapshot sert aux sauvegardes, reindex à copier un index."
  - id: mise-a-jour
    prompt: "Que se passe-t-il en interne quand on met à jour un document Elasticsearch ?"
    answer: "L'ancienne version est marquée supprimée et une nouvelle est indexée"
    decoys:
      - "Le document est modifié en place dans le segment Lucene qui le contient"
      - "La mise à jour est refusée : un document indexé ne peut qu'être supprimé"
    why: "Les segments Lucene sont immuables : une mise à jour est une suppression logique plus une réindexation. L'API update existe, mais fait exactement cela."
  - id: changer-type-champ
    prompt: "Comment changer le type d'un champ déjà indexé dans Elasticsearch ?"
    answer: "Créer un nouvel index avec le bon mapping, puis réindexer"
    decoys:
      - "Lancer une commande ALTER sur le champ, appliquée à chaud"
      - "Redémarrer le cluster, qui relit le mapping au démarrage"
    why: "Les données déjà indexées l'ont été selon l'ancien type : il faut les réindexer. On peut ajouter un champ au mapping, mais pas changer le type d'un champ existant."
  - id: alias
    prompt: "À quoi sert un alias d'index dans Elasticsearch ?"
    answer: "À offrir un nom stable, qu'on peut basculer vers un autre index"
    decoys:
      - "À traduire le nom des champs dans une autre langue pour les utilisateurs"
      - "À dupliquer un index en continu vers un second cluster de secours"
    why: "L'application interroge l'alias ; après une réindexation, on le fait pointer vers le nouvel index sans changer le code ni interrompre le service."
  - id: mapping-dynamique
    prompt: "Par défaut, que fait Elasticsearch d'un champ inconnu dans un document indexé ?"
    answer: "Il devine son type et l'ajoute au mapping"
    decoys:
      - "Il rejette le document entier avec une erreur"
      - "Il l'ignore et ne le stocke pas dans l'index"
    why: "C'est le mapping dynamique : pratique pour démarrer, mais il peut deviner un mauvais type ou multiplier les champs. En production, on fixe souvent le mapping."
  - id: logstash
    prompt: "Dans la pile ELK, quel est le rôle de Logstash ?"
    answer: "Collecter, transformer et envoyer les journaux vers Elasticsearch"
    decoys:
      - "Afficher les journaux dans des tableaux de bord interactifs"
      - "Stocker et indexer les journaux à la place d'Elasticsearch"
    why: "Logstash ingère et prépare les données ; Elasticsearch les indexe ; Kibana les affiche."
  - id: shards-primaires
    prompt: "Peut-on changer librement le nombre de shards primaires d'un index Elasticsearch existant ?"
    answer: "Non : il est fixé à la création ; le changer passe par une réindexation ou les API split et shrink"
    decoys:
      - "Oui : Elasticsearch l'ajuste automatiquement selon le volume, sans aucune intervention"
      - "Oui : il suffit de modifier ce réglage de l'index, les données sont redistribuées à chaud"
    why: "Le shard d'un document dépend du nombre de shards primaires : le changer déplacerait tout. Le nombre de répliques, lui, se modifie à chaud."
  - id: noeud-maitre
    prompt: "Quel est le rôle du nœud maître élu dans un cluster Elasticsearch ?"
    answer: "Gérer l'état du cluster : index, mappings, placement des shards"
    decoys:
      - "Recevoir toutes les écritures, les autres nœuds ne servant qu'aux lectures"
      - "Exécuter seul toutes les recherches, puis renvoyer les résultats aux autres"
    why: "Le maître tient l'état du cluster et décide où vivent les shards. Les écritures et les recherches sont réparties sur les nœuds de données."
  - id: recherche-vectorielle
    prompt: "Quel type de recherche Elasticsearch propose-t-il en plus du plein texte, utile pour la recherche sémantique ?"
    answer: "Une recherche des plus proches voisins sur des vecteurs (kNN)"
    decoys:
      - "Une recherche par jointures SQL entre plusieurs index"
      - "Une recherche par expressions régulières sur les fichiers bruts"
    why: "Avec des champs vectoriels, Elasticsearch trouve les documents dont l'embedding est le plus proche de celui de la requête, et peut combiner ce score avec le plein texte."
  - id: pagination-profonde
    prompt: "Pourquoi éviter from/size pour paginer très loin dans les résultats Elasticsearch ?"
    answer: "Chaque shard doit trier tous les résultats précédents ; on préfère search_after"
    decoys:
      - "from/size renvoie des résultats dans un ordre aléatoire au-delà de la première page"
      - "from/size verrouille l'index en écriture pendant toute la durée de la lecture"
    why: "Pour la page 1 000, chaque shard trie et renvoie tous les résultats qui précèdent : le coût grandit avec la profondeur. search_after repart du dernier résultat vu."
  - id: api-rest
    prompt: "Comment une application dialogue-t-elle avec Elasticsearch ?"
    answer: "Par une API REST en HTTP, avec du JSON"
    decoys:
      - "Par un protocole binaire propriétaire, sans HTTP"
      - "Par JDBC uniquement, comme une base relationnelle"
    why: "Indexer, chercher et administrer passent par des requêtes HTTP (PUT, GET, POST…) en JSON ; les clients officiels enveloppent cette API."
---
