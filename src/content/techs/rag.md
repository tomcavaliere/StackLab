---
name: RAG (génération augmentée par la recherche)
kind: concept
layers: []
tags: [ia-generative]
difficulty: 2
summary: "Technique qui cherche d'abord les passages pertinents dans vos documents, puis les place dans le prompt d'un LLM pour qu'il réponde à partir d'eux, en citant ses sources."
alternatives:
  - tech: fine-tuning
    note: "Réentraîner le modèle : adapté pour un format, un ton ou une tâche étroite, pas pour des connaissances qui changent souvent."
integratesWith:
  - tech: llm
    note: "Le LLM rédige la réponse à partir des passages récupérés."
  - tech: embeddings
    note: "Les embeddings des morceaux et de la question permettent de retrouver les passages proches par le sens."
  - tech: pgvector
    note: "Stocker et chercher les vecteurs dans PostgreSQL, à côté des données de l'application."
  - tech: qdrant
    note: "Base vectorielle dédiée pour l'index des morceaux."
  - tech: pinecone
    note: "Base vectorielle managée pour l'index des morceaux."
  - tech: elasticsearch
    note: "Recherche par mots-clés, à combiner avec la recherche vectorielle (recherche hybride)."
  - tech: langchain
    note: "Fournit des briques prêtes pour découper, indexer, récupérer et assembler le prompt."
---

## Problème résolu

Un LLM ne connaît que ses données d'entraînement : ni vos documents internes, ni ce qui a changé depuis. Et lui coller toute la documentation dans chaque prompt coûte cher, voire dépasse sa fenêtre de contexte. Le RAG (Retrieval-Augmented Generation, décrit dans un article de 2020 de Lewis et al.) sépare le travail en deux :

1. **Indexation**, à l'avance : on découpe les documents en morceaux (chunks), on calcule l'embedding de chaque morceau et on le range dans une base vectorielle.
2. **À chaque question** : on calcule l'embedding de la question, on récupère les morceaux les plus proches, on les insère dans le prompt avec la consigne « réponds à partir de ces extraits », et le LLM rédige la réponse. On peut lui demander de citer les morceaux utilisés, ce qui permet de vérifier.

Mettre à jour les connaissances revient à réindexer un document, sans toucher au modèle. La qualité dépend surtout de la récupération : si le bon passage n'est pas retrouvé, le modèle ne peut pas l'inventer (ou pire, il invente). D'où plusieurs leviers : la taille et le découpage des morceaux, la **recherche hybride** (mots-clés + vecteurs, pour les noms propres, codes produits et termes exacts que la recherche sémantique rate) et le reclassement (reranking) des résultats. On évalue la récupération à part, sur un jeu de questions dont on connaît les bons passages, avant de juger les réponses.

## Quand l'utiliser

- Assistant qui répond sur une base documentaire : documentation produit, procédures internes, contrats, tickets de support.
- Connaissances qui changent souvent : il suffit de réindexer, le modèle reste le même.
- Besoin de traçabilité : la réponse peut citer les passages sur lesquels elle s'appuie.

## Quand l'éviter

- Le corpus est petit et stable : il tient peut-être directement dans la fenêtre de contexte, sans index ni base vectorielle.
- Le besoin porte sur le style, le format ou une tâche étroite répétée : c'est le terrain du fine-tuning ou d'une bonne consigne, pas de la recherche.
- Questions qui exigent d'agréger toute une base (« combien de contrats signés en mars ? ») : récupérer quelques morceaux n'y répond pas ; une requête SQL, si.
- Documents de mauvaise qualité ou contradictoires : le RAG les restitue fidèlement, erreurs comprises.

## Pour aller plus loin

- [Glossaire de la documentation Claude : RAG](https://platform.claude.com/docs/en/about-claude/glossary)
- [Lewis et al. (2020), Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401)
