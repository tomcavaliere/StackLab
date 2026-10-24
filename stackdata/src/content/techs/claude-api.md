---
name: API Claude (Anthropic)
kind: service-cloud
layers: [ml]
languages: [python, typescript]
tags: [ia-generative, api, offre-managee, inference]
difficulty: 1
summary: "API HTTP qui donne accès aux familles de modèles Claude d'Anthropic, facturée au token, avec appel d'outils, mise en cache du prompt et prise en charge de MCP."
alternatives:
  - tech: openai-api
    note: "Même modèle d'usage avec les modèles d'OpenAI ; le choix se fait en testant les deux sur ses propres cas."
  - tech: ollama
    note: "Modèles à poids ouverts en local : les données ne sortent pas de la machine, mais la qualité est souvent en retrait des modèles hébergés de pointe."
integratesWith:
  - tech: mcp
    note: "Anthropic est à l'origine de MCP ; l'API peut se connecter à des serveurs MCP distants pour donner des outils au modèle."
  - tech: llm
    note: "L'API donne accès à des LLM hébergés : on paie l'inférence, Anthropic gère les modèles et le matériel."
---

## Problème résolu

Comme pour toute API de modèle hébergé, l'application envoie une requête HTTP (l'API Messages : des messages, une instruction système, éventuellement des images ou des documents) et reçoit la réponse du modèle, sans GPU à gérer. Anthropic héberge les familles de modèles Claude ; la facturation se fait au nombre de **tokens** en entrée et en sortie (tarifs sur la page de prix officielle).

L'API fournit les briques d'une application d'IA : **appel d'outils** (tool use : l'application décrit des outils, le modèle demande à en appeler un, l'application l'exécute et renvoie le résultat), **sorties structurées**, **streaming** de la réponse, traitement par lots asynchrone. Deux points la distinguent :

- **Mise en cache du prompt** (prompt caching) : un préfixe de prompt répété (longue instruction système, document de référence, définitions d'outils) est marqué pour être mis en cache. Les requêtes suivantes qui commencent par le même préfixe le relisent depuis le cache, plus vite et moins cher. Le cache expire après quelques minutes sans usage (durée plus longue en option).
- **MCP** (Model Context Protocol), protocole ouvert lancé par Anthropic pour brancher des outils et des sources de données sur un modèle.

Des SDK officiels existent en Python, TypeScript, Java, Go, C#, PHP et Ruby. Claude est aussi disponible via les clouds : Amazon Bedrock, Google Cloud (Vertex AI) et Microsoft Foundry, avec leur facturation et leur gestion des accès (les fonctionnalités disponibles varient selon la plateforme).

## Quand l'utiliser

- Ajouter une fonction d'IA générative (résumé, extraction, analyse de documents, assistant, agent qui utilise des outils) sans infrastructure ML.
- Prompts longs et répétés (même contexte envoyé à chaque requête) : la mise en cache du prompt réduit coût et latence.
- Entreprise déjà engagée chez AWS, Google Cloud ou Azure : passer par la plateforme du cloud garde la facturation et les droits d'accès au même endroit.

## Quand l'éviter

- Données qui ne doivent pas sortir de l'entreprise, ou contraintes que le contrat du fournisseur ne couvre pas : les prompts partent chez un tiers. Lire les conditions de traitement et de conservation des données.
- Gros volume stable où un modèle ouvert auto-hébergé suffit en qualité : vLLM peut revenir moins cher. Aucun seuil fiable n'est donné ici.
- Fonctionnement hors ligne ou latence garantie : l'application dépend du réseau, du service et de ses **limites de débit** (requêtes et tokens par minute, par palier d'usage).

Comme pour toute API de ce type : la clé d'API reste côté serveur, jamais dans le front.

## Pour aller plus loin

- [Documentation de l'API Claude](https://platform.claude.com/docs/en/intro)
- [Mise en cache du prompt](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)
- [Vue d'ensemble de l'API (SDK, plateformes cloud, limites)](https://platform.claude.com/docs/en/api/overview)
