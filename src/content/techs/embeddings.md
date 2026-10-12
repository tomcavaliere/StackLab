---
name: Embeddings
kind: concept
layers: []
tags: [ia-generative, machine-learning]
difficulty: 2
summary: "Représentation d'un texte (ou d'une image) sous forme de vecteur de nombres, calculée par un modèle, telle que deux contenus de sens proche donnent des vecteurs proches."
alternatives:
  - tech: elasticsearch
    note: "Recherche par mots-clés (index inversé) : exacte sur les termes, sans modèle à faire tourner, mais aveugle aux synonymes et aux reformulations."
integratesWith:
  - tech: pgvector
    note: "Stocker les vecteurs dans PostgreSQL et chercher les plus proches en SQL."
  - tech: qdrant
    note: "Base vectorielle dédiée, avec filtres sur les métadonnées."
  - tech: pinecone
    note: "Base vectorielle managée."
  - tech: openai-api
    note: "Propose des modèles d'embeddings accessibles par API."
  - tech: hugging-face
    note: "Catalogue de modèles d'embeddings ouverts, à faire tourner soi-même."
---

## Problème résolu

Une recherche par mots-clés ne trouve pas « résilier mon abonnement » quand le document parle de « mettre fin au contrat ». Pour comparer des textes par leur sens, on les fait passer dans un modèle d'embeddings : il renvoie pour chaque texte un vecteur, une liste de nombres de taille fixe (la dimension dépend du modèle). Le modèle est entraîné pour que des textes de sens voisin donnent des vecteurs proches dans cet espace.

On mesure la proximité de deux vecteurs, le plus souvent par la **similarité cosinus** (l'angle entre eux). Chercher les documents les plus proches d'une question revient alors à chercher les vecteurs les plus proches de celui de la question : c'est le rôle d'une base vectorielle (pgvector, Qdrant, Pinecone), qui utilise des index approchés pour ne pas comparer la question à chaque vecteur.

Règle à ne pas oublier : **le même modèle pour indexer et pour interroger**. Les vecteurs de deux modèles différents ne vivent pas dans le même espace et ne se comparent pas. Changer de modèle oblige à recalculer tout l'index.

## Quand l'utiliser

- Recherche sémantique : retrouver des documents par le sens, base de la récupération dans un RAG.
- Classification légère : comparer un texte à des exemples ou à des libellés de catégories, et prendre le plus proche.
- Déduplication et regroupement : repérer des tickets, des fiches produit ou des questions quasi identiques formulées différemment.
- Recommandation de contenus « similaires à celui-ci ».

## Quand l'éviter

- Recherche de termes exacts : référence produit, numéro de facture, nom propre rare. La recherche par mots-clés est plus fiable ; on combine souvent les deux (recherche hybride).
- Filtres structurés (date, prix, statut) : c'est une clause `WHERE`, pas une question de proximité de sens.
- Résultat qui doit s'expliquer : la proximité de deux vecteurs ne se justifie pas terme à terme comme une correspondance de mots-clés.

## Pour aller plus loin

- [Guide des embeddings de la documentation OpenAI](https://developers.openai.com/api/docs/guides/embeddings)
- [Cours LLM de Hugging Face](https://huggingface.co/learn/llm-course)
