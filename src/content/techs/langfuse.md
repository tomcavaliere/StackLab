---
name: Langfuse
kind: outil-infra
layers: [observabilite]
languages: [python, typescript]
tags: [ia-generative, open-source, offre-managee]
difficulty: 2
summary: "Plateforme open-source d'observabilité des applications de LLM : traces de chaque appel au modèle, coûts, latences, gestion des prompts et évaluations."
alternatives:
  - tech: sentry
    note: "Remonte les erreurs et les performances de l'application, sans voir le contenu des prompts ni la qualité des réponses."
integratesWith:
  - tech: langchain
    note: "Intégration par callback : chaque étape de la chaîne devient un élément de la trace."
  - tech: llamaindex
    note: "Intégration disponible pour tracer l'indexation et les requêtes."
  - tech: openai-api
    note: "Un wrapper du SDK OpenAI trace les appels sans changer le code métier."
  - tech: evaluation-llm
    note: "Jeux de données, scores et LLM juge pour évaluer les réponses enregistrées."
  - tech: docker
    note: "Auto-hébergement documenté avec Docker Compose ou Kubernetes."
---

## Problème résolu

Une application de LLM se trompe sans lever d'erreur : la réponse est fausse, hors sujet, trop lente ou trop chère, mais le code a renvoyé HTTP 200. Les outils d'observabilité classiques (journaux, métriques, erreurs) ne voient pas ce qui compte : le prompt réellement envoyé, les passages récupérés par le RAG, les appels d'outils d'un agent, les tokens consommés.

Langfuse enregistre des **traces** : une trace correspond à une requête de l'utilisateur et contient ses étapes (récupération, appels au modèle, appels d'outils), avec entrées, sorties, latence, tokens et coût. On instrumente l'application avec ses SDK (Python, TypeScript), ses intégrations (LangChain, LlamaIndex, SDK OpenAI…) ou via OpenTelemetry. Par-dessus les traces :

- **gestion des prompts** : versionner les prompts hors du code et savoir quelle version a produit quelle réponse ;
- **évaluations** : scores ajoutés aux traces (retour utilisateur, annotation humaine, LLM juge) et jeux de données pour comparer des versions ;
- tableaux de bord de coûts, de latence et de qualité.

Open-source (cœur sous licence MIT), auto-hébergeable ou en offre managée.

## Quand l'utiliser

- Application de LLM en production : comprendre une mauvaise réponse demande de voir la trace complète.
- Agent ou RAG à plusieurs étapes : savoir laquelle échoue (la récupération ou la rédaction).
- Suivi des coûts par fonctionnalité ou par utilisateur.

## Quand l'éviter

- Prototype qui fait un seul appel au modèle : afficher la requête et la réponse dans les journaux suffit.
- Données trop sensibles pour être recopiées : les traces contiennent les prompts et les réponses. Auto-héberger, masquer les champs sensibles, ou ne pas tracer le contenu.
- Remplacer l'observabilité classique : Langfuse ne surveille ni les serveurs ni les erreurs du reste de l'application.

## Pour aller plus loin

- [Documentation officielle](https://langfuse.com/docs)
- [Dépôt GitHub](https://github.com/langfuse/langfuse)
