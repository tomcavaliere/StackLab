---
name: Chroma
kind: base-de-donnees
layers: [ml]
languages: [python, typescript]
tags: [open-source, vectoriel, embarque, offre-managee]
difficulty: 1
summary: "Base vectorielle open-source pensée pour démarrer vite : embarquée dans un script Python, en serveur ou en cloud managé, elle stocke documents, embeddings et métadonnées."
alternatives:
  - tech: qdrant
    note: "Base vectorielle orientée production, avec filtrage riche, recherche hybride et quantification ; plus d'exploitation à prévoir."
  - tech: pgvector
    note: "Si PostgreSQL est déjà là : les vecteurs restent à côté des données métier, sans nouveau système."
integratesWith:
  - tech: embeddings
    note: "Peut calculer les embeddings lui-même avec une fonction d'embedding configurée, ou recevoir des vecteurs déjà calculés."
  - tech: rag
    note: "Index de prototype ou de petite application RAG."
  - tech: langchain
    note: "Intégration disponible comme stockage vectoriel."
  - tech: llamaindex
    note: "Intégration disponible comme stockage vectoriel."
---

## Problème résolu

Pour essayer une recherche sémantique ou un RAG, on n'a pas envie de déployer une base de données. Chroma se lance comme une bibliothèque : en Python, un client **en mémoire** ou **persistant** (les données sont écrites dans un dossier local) suffit, sans serveur. On crée une **collection**, on y ajoute des documents avec un id et des métadonnées ; si on ne fournit pas les vecteurs, Chroma les calcule avec la fonction d'embedding de la collection. Une requête renvoie les documents les plus proches, avec un filtre possible sur les métadonnées (`where`) ou sur le contenu du document.

Le même code peut ensuite viser un serveur Chroma (mode client-serveur, par exemple via son image Docker) ou l'offre managée de l'éditeur. Licence Apache 2.0.

## Quand l'utiliser

- Prototype, notebook, démonstration : une base vectorielle en une ligne, sans infrastructure.
- Petite application ou outil interne avec un volume modeste.
- Tests automatisés d'un pipeline RAG : une base locale et jetable.

## Quand l'éviter

- L'application a déjà PostgreSQL : pgvector garde les vecteurs, les métadonnées et les droits d'accès dans une même requête.
- Gros volumes, forte charge ou haute disponibilité : vérifier que le mode déployé (serveur ou cloud) couvre le besoin, ou choisir une base conçue pour la production à grande échelle.
- Le mode embarqué en production multi-instances : les données vivent dans un dossier local, qu'on ne partage pas entre plusieurs serveurs.

## Pour aller plus loin

- [Documentation officielle](https://docs.trychroma.com/)
- [Dépôt GitHub](https://github.com/chroma-core/chroma)
