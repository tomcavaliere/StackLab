---
name: Weaviate
kind: base-de-donnees
layers: [ml]
tags: [open-source, vectoriel, offre-managee]
difficulty: 2
summary: "Base vectorielle open-source écrite en Go, avec recherche hybride intégrée et modules qui peuvent calculer les embeddings à l'insertion ; auto-hébergée ou en cloud managé."
alternatives:
  - tech: qdrant
    note: "Positionnement très proche (open-source, filtres, hybride, cloud managé) : le choix se fait souvent sur l'API, l'exploitation et des tests sur ses propres données."
  - tech: pinecone
    note: "Entièrement managé, sans version à auto-héberger."
integratesWith:
  - tech: embeddings
    note: "Des modules de vectorisation appellent un fournisseur d'embeddings à l'insertion et à la requête ; on peut aussi fournir ses propres vecteurs."
  - tech: rag
    note: "Brique de recherche d'un RAG ; Weaviate propose aussi des requêtes qui transmettent directement les résultats à un LLM (recherche générative)."
  - tech: docker
    note: "Image officielle pour une instance locale ou auto-hébergée."
  - tech: kubernetes
    note: "Chart Helm officiel pour un déploiement en cluster."
---

## Problème résolu

Comme les autres bases vectorielles, Weaviate stocke des objets avec leurs vecteurs et cherche les plus proches (index HNSW, recherche approximative), en filtrant sur leurs propriétés. Les objets sont rangés dans des **collections** dont on décrit les propriétés.

Ses particularités :

- **Vectorisation intégrée** : une collection peut être configurée avec un module qui appelle un modèle d'embeddings (d'un fournisseur ou hébergé soi-même). On insère du texte, Weaviate calcule le vecteur ; on cherche avec du texte, il vectorise la question.
- **Recherche hybride** native : elle combine une recherche par mots-clés (BM25) et la recherche vectorielle, avec un paramètre qui règle le poids de chacune.
- **Multi-tenancy** : isoler les données de chaque client dans une même collection, un cas fréquent en SaaS.
- **Recherche générative** : une requête peut transmettre ses résultats à un LLM pour produire une réponse.

On l'interroge par des clients officiels (Python, TypeScript, Go, Java), en GraphQL, REST ou gRPC. Licence BSD-3 ; auto-hébergé ou en offre managée (Weaviate Cloud).

## Quand l'utiliser

- Recherche sémantique ou RAG à un volume qui justifie une base dédiée.
- Besoin de recherche hybride (noms propres, références produits) sans l'assembler soi-même.
- SaaS qui doit isoler les données de nombreux clients.

## Quand l'éviter

- Volume modeste et PostgreSQL déjà présent : pgvector évite un système de plus.
- Équipe sans capacité à opérer une base supplémentaire, et pas de budget pour l'offre managée.
- Données qui doivent rester cohérentes à chaque instant avec la base métier : il faut synchroniser deux systèmes, sans jointure possible.

## Pour aller plus loin

- [Documentation officielle](https://docs.weaviate.io/weaviate)
