---
name: LlamaIndex
kind: framework
layers: [ml]
languages: [python, typescript]
tags: [ia-generative, open-source]
difficulty: 2
summary: "Framework Python et TypeScript centré sur la connexion d'un LLM à vos données : chargement, découpage, indexation et interrogation de documents pour construire un RAG."
alternatives:
  - tech: langchain
    note: "Plus généraliste (outils, agents, nombreuses intégrations) ; LlamaIndex est plus directement orienté vers l'indexation et l'interrogation de documents."
integratesWith:
  - tech: rag
    note: "Son cas d'usage principal : chaque étape d'un RAG y a une brique prête (chargeurs, découpage, index, récupération, synthèse)."
  - tech: embeddings
    note: "Calcule les embeddings des morceaux via le modèle configuré, d'un fournisseur ou local."
  - tech: qdrant
    note: "Un des nombreux stockages vectoriels pris en charge pour l'index."
  - tech: pgvector
    note: "L'index peut vivre dans PostgreSQL avec l'extension pgvector."
---

## Problème résolu

Construire un RAG demande toujours les mêmes étapes : lire des documents de formats variés (PDF, pages web, Notion, base SQL…), les découper en morceaux, calculer leurs embeddings, les ranger dans un index, puis, à chaque question, récupérer les bons morceaux et demander au LLM une réponse qui les cite. LlamaIndex fournit ces étapes sous forme de composants :

- **Readers** (chargeurs) : transforment une source en `Document` ;
- **Node parsers** : découpent les documents en **nodes** (morceaux), avec leurs métadonnées ;
- **Index** : le plus courant est le `VectorStoreIndex`, qui s'appuie sur un stockage vectoriel en mémoire ou externe ;
- **Retrievers** et **query engines** : récupèrent les nodes pertinents et font rédiger la réponse par le LLM ; un **chat engine** ajoute l'historique de conversation.

Quelques lignes suffisent pour un premier prototype, et chaque étape peut ensuite être remplacée (autre découpage, reclassement des résultats, autre base). Le framework propose aussi des agents et des workflows à plusieurs étapes. L'éditeur commercialise en plus des services managés (dont l'analyse de documents complexes) ; la bibliothèque, elle, est open-source.

## Quand l'utiliser

- RAG ou recherche sur une base documentaire : c'est le cœur du framework.
- Documents hétérogènes à ingérer depuis plusieurs sources, avec des connecteurs déjà écrits.
- Prototyper vite, puis remplacer pièce par pièce les étapes qui donnent de mauvais résultats.

## Quand l'éviter

- Pipeline très simple (quelques documents, une requête à la base vectorielle, un appel au modèle) : écrit à la main, il reste court et entièrement lisible.
- Application d'agents généralistes sans documents à interroger : d'autres frameworks y sont plus centrés.
- Besoin de maîtriser chaque prompt envoyé : les composants de haut niveau ajoutent leurs propres consignes, qu'il faut savoir inspecter.

## Pour aller plus loin

- [Documentation officielle (Python)](https://developers.llamaindex.ai/python/framework/)
