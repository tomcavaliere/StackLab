---
name: Pinecone
kind: base-de-donnees
layers: [ml]
tags: [vectoriel, offre-managee, serverless]
difficulty: 1
summary: "Base vectorielle entièrement managée (SaaS) : on envoie des vecteurs et on interroge par similarité, sans serveur à opérer."
integratesWith:
  - tech: embeddings
    note: "Pinecone stocke et compare les vecteurs ; il peut aussi les calculer lui-même avec des modèles qu'il héberge (embedding intégré)."
  - tech: rag
    note: "Brique de recherche d'un RAG, avec filtrage par métadonnées et un namespace par client."
  - tech: langchain
    note: "Intégration documentée comme magasin de vecteurs."
---

## Problème résolu

Ajouter une recherche vectorielle à un produit sans opérer de base : Pinecone est un service hébergé. On crée un index, on y écrit des vecteurs avec des métadonnées, et on interroge par similarité via une API et des SDK. Le service gère le stockage, la montée en charge et la disponibilité.

On peut filtrer sur les métadonnées pendant la recherche, cloisonner les données par **namespace** (typiquement un par client), combiner vecteurs denses et creux pour une recherche hybride, et même lui confier le calcul des embeddings avec des modèles hébergés par Pinecone. Le logiciel n'est pas open-source : on ne l'installe pas chez soi. Une option de déploiement dans son propre compte cloud (BYOC) existe, mais le service reste piloté par Pinecone.

## Quand l'utiliser

- Équipe sans compétence ou sans envie d'opérer une base vectorielle, qui veut aller vite.
- Recherche vectorielle multi-clients, avec un cloisonnement simple par namespace.
- Prototype ou MVP d'IA où le temps de mise en production compte plus que le contrôle de l'infrastructure.

## Quand l'éviter

- Données qui ne doivent pas sortir de votre infrastructure (contraintes réglementaires ou contractuelles) : elles sont confiées à un tiers (à nuancer avec l'option BYOC, à étudier au cas par cas).
- Volume modeste et PostgreSQL déjà en place : pgvector suffit, sans fournisseur ni facture de plus.
- Crainte de dépendance fournisseur : pas de version auto-hébergeable vers laquelle se replier, une migration demande de réindexer ailleurs. Les coûts suivent l'usage : à estimer sur la grille tarifaire officielle, aucun chiffre n'est donné ici.

## Pour aller plus loin

- [Documentation officielle](https://docs.pinecone.io/)
