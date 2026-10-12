---
name: MCP (Model Context Protocol)
kind: concept
layers: []
tags: [ia-generative, standard, open-source]
difficulty: 2
summary: "Protocole ouvert qui standardise la connexion des applications d'IA à des outils et à des sources de données : un serveur MCP écrit une fois sert à tous les clients compatibles."
alternatives:
  - tech: rest
    note: "Appeler directement l'API REST du service depuis son code : suffit quand une seule application, dont on maîtrise le code, utilise un seul service."
integratesWith:
  - tech: claude-api
    note: "Les applications Claude et l'API Claude savent se connecter à des serveurs MCP."
  - tech: openai-api
    note: "La plateforme d'OpenAI prend aussi en charge les serveurs MCP."
---

## Problème résolu

Sans standard, chaque application d'IA (assistant, IDE, agent maison) doit écrire son propre connecteur pour chaque source : un pour GitHub, un pour la base de données, un pour le Drive… soit autant d'intégrations que de couples application × service. Le Model Context Protocol, publié en open source par Anthropic en novembre 2024, définit une interface commune. Sa documentation le compare à un port USB-C pour les applications d'IA.

L'architecture est client-serveur. L'**hôte** (l'application d'IA) crée un **client** MCP par **serveur** MCP auquel il se connecte. Un serveur expose trois types de primitives :

- **Outils** (tools) : des fonctions que le modèle peut appeler (requête en base, appel d'API, opération sur des fichiers), décrites par un nom, une description et un schéma JSON des paramètres ;
- **Ressources** (resources) : des données à fournir comme contexte (contenu d'un fichier, schéma d'une base) ;
- **Prompts** : des modèles de consignes réutilisables.

Les messages suivent JSON-RPC 2.0. Un serveur local tourne sur la machine et communique par l'entrée et la sortie standard (stdio) ; un serveur distant passe par HTTP. En décembre 2025, Anthropic a confié MCP à l'Agentic AI Foundation, un fonds de la Linux Foundation.

MCP ne règle pas la sécurité à votre place. Un serveur MCP exécute du code avec les droits qu'on lui donne : n'installer que des serveurs de confiance, limiter leurs permissions, faire confirmer les actions sensibles. Les descriptions d'outils et les données qu'il renvoie arrivent dans le contexte du modèle et peuvent servir à une injection de prompt.

## Quand l'utiliser

- Rendre un outil ou une source de données interne utilisable par plusieurs applications d'IA (assistant de bureau, IDE, agents maison) sans écrire un connecteur pour chacune.
- Donner à un agent l'accès à des services pour lesquels des serveurs MCP existent déjà.
- Séparer le code d'intégration (dans le serveur) du code de l'application d'IA.

## Quand l'éviter

- Une seule application, un seul service, et on maîtrise le code : un appel d'outil défini directement dans l'application, qui appelle l'API, est plus simple.
- Pas de LLM dans la boucle : pour faire communiquer deux programmes classiques, une API REST ou gRPC suffit.
- Serveur d'origine inconnue avec des droits étendus : le risque l'emporte sur le gain.

## Pour aller plus loin

- [Documentation officielle de MCP](https://modelcontextprotocol.io/docs/getting-started/intro)
- [Architecture de MCP (hôte, client, serveur, primitives)](https://modelcontextprotocol.io/docs/learn/architecture)
