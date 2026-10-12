---
name: Qdrant
kind: base-de-donnees
layers: [ml]
tags: [open-source, vectoriel, offre-managee]
difficulty: 2
summary: "Base vectorielle open-source dédiée, écrite en Rust : recherche par similarité avec filtres sur les métadonnées, auto-hébergée ou en cloud managé."
alternatives:
  - tech: pinecone
    note: "Service entièrement managé, sans version open-source à auto-héberger : rien à opérer, dépendance fournisseur plus forte."
integratesWith:
  - tech: embeddings
    note: "Qdrant stocke et compare les vecteurs ; un modèle d'embeddings les calcule en amont."
  - tech: rag
    note: "Brique de recherche d'un RAG, avec filtrage par document, client ou date."
  - tech: docker
    note: "Image officielle : le moyen le plus simple de lancer une instance locale ou auto-hébergée."
---

## Problème résolu

Quand la recherche vectorielle devient le cœur d'un produit (RAG à grande échelle, recommandation, recherche sémantique), on veut une base conçue pour ça. Qdrant range des **points** dans des **collections** : chaque point a un ou plusieurs vecteurs et un **payload**, un objet JSON de métadonnées. Une requête cherche les vecteurs les plus proches (index HNSW, recherche approximative) tout en filtrant sur le payload : mot-clé, plage numérique, géolocalisation, texte, combinés en conditions `must` / `should` / `must_not`.

Il propose aussi des vecteurs creux et des requêtes hybrides (combiner une recherche par mots-clés et une recherche sémantique, puis fusionner les classements), ainsi que la quantification, qui réduit la mémoire au prix d'un peu de précision. On l'interroge par une API REST ou gRPC. Licence Apache 2.0 ; auto-hébergé ou en offre managée (Qdrant Cloud).

## Quand l'utiliser

- Volume de vecteurs ou charge de recherche qu'on ne veut pas faire porter à la base transactionnelle.
- Filtrage riche sur les métadonnées pendant la recherche, ou recherche hybride, sans tout assembler soi-même.
- Besoin de garder la main sur les données (auto-hébergement), avec la possibilité de passer au managé plus tard.

## Quand l'éviter

- L'application a déjà PostgreSQL et un volume modeste : pgvector évite une brique de plus.
- Équipe sans capacité à opérer une base de plus : il faut la déployer, la sauvegarder, la surveiller, ou payer l'offre managée.
- Données qui doivent rester cohérentes avec la base métier à chaque instant : les vecteurs vivent dans un autre système, il faut une synchronisation (et accepter un léger décalage), sans jointure SQL possible.

## Pour aller plus loin

- [Documentation officielle](https://qdrant.tech/documentation/)
- [Dépôt GitHub](https://github.com/qdrant/qdrant)
