---
questions:
  - id: documents
    prompt: "Comment MongoDB stocke-t-il les données ?"
    answer: "En documents (BSON, proche de JSON), sans imposer la même structure à tous"
    decoys:
      - "En tables à schéma strict, reliées par des clés étrangères vérifiées par la base"
      - "En paires clé-valeur opaques, comme Memcached"
    why: "Un profil, un article, un événement se stockent tels quels, d'un bloc, dans un document."
  - id: sharding
    prompt: "Quelle répartition des données MongoDB intègre-t-il ?"
    answer: "Le sharding : un partitionnement horizontal sur plusieurs serveurs"
    decoys:
      - "Aucune : il faut un outil externe comme Vitess"
      - "Une simple copie de toute la base sur chaque serveur, sans découpage des données"
    why: "Le sharding est fourni par la base. Vitess ajoute un sharding au-dessus de MySQL."
  - id: replica-sets
    prompt: "Comment MongoDB assure-t-il la réplication ?"
    answer: "Avec des replica sets"
    decoys:
      - "Avec des partitions Kafka"
      - "Il ne réplique pas les données"
    why: "Un replica set est un groupe de serveurs qui portent les mêmes données."
  - id: atomicite
    prompt: "Quelles écritures sont atomiques dans MongoDB, sans transaction ?"
    answer: "Les écritures sur un seul document"
    decoys:
      - "Toutes les écritures d'une même collection"
      - "Aucune écriture n'est atomique"
    why: "Le modèle vise à ce que la plupart des écritures tiennent dans un seul document, atomique."
  - id: transactions
    prompt: "Que dit la documentation officielle des transactions multi-documents ?"
    answer: "Elles existent depuis la 4.0 mais coûtent plus cher, et ne remplacent pas un schéma bien pensé"
    decoys:
      - "Elles n'existent pas, il faut les simuler dans l'application"
      - "Elles sont aussi rapides qu'une écriture simple, et la documentation conseille de les utiliser partout"
    why: "Elles sont possibles, mais un schéma où l'écriture tient dans un document reste la bonne approche."
  - id: donnees-reliees
    prompt: "Des données très reliées, avec beaucoup de jointures et de contraintes d'intégrité. MongoDB convient-il ?"
    answer: "Mal : on finit par réimplémenter le relationnel dans le code"
    decoys:
      - "Très bien : les documents gèrent les clés étrangères comme une base relationnelle"
      - "Très bien : le sharding remplace les jointures"
    why: "Quand tout est relié, une base relationnelle comme PostgreSQL protège la cohérence en base."
  - id: schema-souple
    prompt: "« Schéma souple » veut-il dire « pas de schéma » ?"
    answer: "Non : sans discipline ou validation de schéma, les documents dérivent"
    decoys:
      - "Oui : MongoDB interdit toute validation de schéma"
      - "Oui : tous les documents d'une collection sont forcément identiques"
    why: "MongoDB propose une validation de schéma ; sans elle, le code de lecture doit gérer toutes les variantes."
  - id: licence
    prompt: "Sous quelle licence est le serveur MongoDB depuis fin 2018 ?"
    answer: "La SSPL, non reconnue comme open-source par l'OSI"
    decoys:
      - "Apache 2.0, comme la plupart des projets de la fondation Apache"
      - "AGPLv3, comme Grafana depuis 2021"
    why: "La SSPL pèse surtout si l'on veut proposer MongoDB comme service hébergé à des tiers."
  - id: reporting-sql
    prompt: "Reporting en SQL ad hoc : MongoDB est-il pratique ?"
    answer: "Peu : son langage de requête et son pipeline d'agrégation ne sont pas du SQL"
    decoys:
      - "Très : MongoDB parle le SQL standard"
      - "Très : il génère automatiquement des vues SQL à partir de chaque collection"
    why: "Les analystes qui pratiquent SQL devront apprendre l'agrégation de MongoDB, ou exporter les données."
  - id: usage
    prompt: "Quel cas d'usage correspond bien à MongoDB ?"
    answer: "Un catalogue de produits hétérogènes, lus et écrits comme un bloc"
    decoys:
      - "Une comptabilité avec des contraintes d'intégrité strictes"
      - "Un entrepôt analytique de plusieurs téraoctets"
    why: "Structure variable et accès par bloc : c'est le terrain du modèle document."
---
