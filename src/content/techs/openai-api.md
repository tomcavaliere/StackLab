---
name: API OpenAI
kind: service-cloud
layers: [ml]
languages: [python, typescript]
tags: [ia-generative, api, offre-managee, inference]
difficulty: 1
summary: "API HTTP qui donne accès aux familles de modèles hébergés d'OpenAI (texte, image, audio, embeddings), facturée à l'usage, sans GPU à gérer."
alternatives:
  - tech: claude-api
    note: "Même modèle d'usage (API hébergée, facturation au token) avec les modèles d'Anthropic ; à comparer sur ses propres cas, pas sur la réputation."
  - tech: ollama
    note: "Modèles à poids ouverts exécutés en local : les données ne sortent pas de la machine, au prix d'une qualité souvent inférieure aux modèles hébergés de pointe."
integratesWith:
  - tech: llm
    note: "L'API donne accès à des LLM hébergés : on paie l'inférence, OpenAI gère les modèles et le matériel."
  - tech: embeddings
    note: "Un point d'accès dédié calcule des embeddings, à stocker ensuite dans une base vectorielle."
---

## Problème résolu

Faire tourner soi-même un grand modèle de langage demande des GPU, de l'exploitation et un modèle de qualité. L'API OpenAI supprime tout cela : l'application envoie une requête HTTP (des messages, des instructions, éventuellement des images ou des fichiers) et reçoit la réponse du modèle. OpenAI héberge les modèles et le matériel ; on paie à l'usage, au nombre de **tokens** en entrée et en sortie (les tarifs changent souvent : voir la page de prix officielle).

Au-delà de la génération de texte, l'API couvre les briques d'une application d'IA : **appel de fonctions** (function calling : le modèle demande à appeler un outil décrit par l'application, qui l'exécute et lui renvoie le résultat), **sorties structurées** (réponse conforme à un schéma JSON fourni), **streaming** de la réponse au fil de l'eau (server-sent events), embeddings, et traitement par lots asynchrone. Des SDK officiels existent notamment en Python et en TypeScript/JavaScript. Les mêmes familles de modèles sont aussi proposées par Microsoft via Azure OpenAI (dans Microsoft Foundry), avec la facturation et la gestion des accès d'Azure.

## Quand l'utiliser

- Ajouter une fonction d'IA générative (résumé, extraction, classification de textes, assistant conversationnel) sans infrastructure ML : quelques lignes avec le SDK suffisent.
- MVP ou petite équipe : pas de GPU à acheter ni à exploiter, coût proportionnel à l'usage réel.
- Besoin de modèles de pointe, multimodaux ou d'embeddings prêts à l'emploi, derrière une API stable.

## Quand l'éviter

- Données qui ne doivent pas sortir de l'entreprise, ou contraintes réglementaires que le contrat du fournisseur ne couvre pas : les prompts sont envoyés à un tiers. Lire les conditions d'utilisation et de conservation des données (et regarder Azure OpenAI ou un modèle auto-hébergé).
- Très gros volume prévisible et stable : la facture au token peut dépasser le coût d'un modèle ouvert auto-hébergé (vLLM). Aucun seuil fiable n'est donné ici : il dépend des modèles, des volumes et des tarifs du moment.
- Besoin d'un fonctionnement hors ligne ou d'une latence garantie : l'application dépend du réseau, de la disponibilité du service et de ses **limites de débit** (requêtes et tokens par minute).

À ne jamais faire : mettre la clé d'API dans le front (navigateur, application mobile). Elle reste côté serveur, qui appelle l'API pour le compte de l'utilisateur.

## Pour aller plus loin

- [Documentation de l'API OpenAI](https://developers.openai.com/api/docs)
- [SDK officiels](https://developers.openai.com/api/docs/libraries)
