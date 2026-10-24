---
name: LangChain
kind: framework
layers: [ml]
languages: [python, typescript]
tags: [ia-generative, open-source]
difficulty: 2
summary: "Framework Python et TypeScript pour assembler des applications de LLM : interface commune aux modèles, outils, récupération de documents, et agents avec LangGraph."
integratesWith:
  - tech: openai-api
    note: "Intégration officielle : le modèle se change par configuration, la chaîne reste la même."
  - tech: claude-api
    note: "Intégration officielle, même interface que pour les autres fournisseurs."
  - tech: rag
    note: "Chargeurs de documents, découpage, embeddings et interfaces vers les bases vectorielles : les briques d'un RAG."
  - tech: agent-llm
    note: "Les agents de LangChain reposent sur LangGraph, qui modélise leur boucle comme un graphe d'étapes avec état."
---

## Problème résolu

Une application de LLM dépasse vite l'appel unique : il faut formater des prompts, appeler un modèle, lui donner des outils, aller chercher des documents (RAG), enchaîner plusieurs étapes, et pouvoir changer de fournisseur. LangChain fournit ces briques derrière des interfaces communes : un même code peut appeler l'API OpenAI, l'API Claude ou un modèle local via Ollama, et de nombreuses intégrations existent (chargeurs de documents, bases vectorielles, outils).

L'écosystème a trois étages, à ne pas confondre :

- **LangChain** : les composants et l'interface commune aux modèles, en Python et en TypeScript, open-source ;
- **LangGraph** : une bibliothèque, open-source aussi, pour les **agents** et les flux à plusieurs étapes, décrits comme un graphe avec un état, des boucles et des reprises ;
- **LangSmith** : une plateforme commerciale pour tracer, évaluer et surveiller les appels, utilisable aussi sans LangChain.

## Quand l'utiliser

- Application qui combine plusieurs briques (récupération de documents, outils, plusieurs modèles) et gagne à réutiliser des intégrations existantes.
- Besoin de changer de fournisseur de modèle sans réécrire l'application.
- Agent à plusieurs étapes, avec état et reprise : LangGraph donne une structure explicite à la boucle.

## Quand l'éviter

- Cas simple (un prompt, une réponse, éventuellement un outil) : un appel direct au SDK du fournisseur est plus court et plus lisible. C'est la critique la plus fréquente : une couche d'abstraction épaisse, qui complique le débogage quand on ne sait plus ce qui est réellement envoyé au modèle.
- Besoin d'une fonction récente d'un fournisseur : l'abstraction commune peut la proposer en retard, ou moins directement que le SDK officiel.
- Équipe qui veut maîtriser chaque prompt et chaque appel : écrire soi-même la petite boucle d'agent reste une option raisonnable.

## Pour aller plus loin

- [Documentation officielle (LangChain, LangGraph, LangSmith)](https://docs.langchain.com/)
