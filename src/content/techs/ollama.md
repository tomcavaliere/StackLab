---
name: Ollama
kind: outil-infra
layers: [ml]
tags: [ia-generative, open-source, inference]
difficulty: 1
summary: "Outil qui télécharge et exécute des modèles de langage à poids ouverts sur sa propre machine, derrière une API HTTP locale."
alternatives:
  - tech: vllm
    note: "Pour servir un modèle ouvert à de nombreux utilisateurs en production sur GPU : vLLM est conçu pour le débit, Ollama pour la simplicité en local."
integratesWith:
  - tech: hugging-face
    note: "Beaucoup de modèles ouverts sont publiés sur le Hub ; Ollama récupère aussi des modèles depuis sa propre bibliothèque."
  - tech: langchain
    note: "LangChain fournit une intégration Ollama : on change de modèle sans réécrire la chaîne."
  - tech: llm
    note: "Ollama exécute des LLM à poids ouverts ; leur qualité dépend du modèle choisi et de sa taille."
---

## Problème résolu

Essayer un modèle de langage sans envoyer ses données à un fournisseur, ou sans payer chaque requête, demandait de compiler des moteurs d'inférence et de gérer des formats de poids. Ollama emballe tout cela : `ollama pull <modèle>` télécharge un modèle à poids ouverts, `ollama run <modèle>` le lance, et un serveur local expose une **API HTTP** (par défaut sur `localhost:11434`). Il fonctionne sous macOS, Linux et Windows, utilise le GPU s'il y en a un et sait se rabattre sur le CPU.

L'API locale implémente aussi une partie de l'API d'OpenAI : un code écrit pour l'API OpenAI peut souvent pointer vers Ollama en changeant l'URL de base. Les modèles sont en général distribués en versions **quantifiées** (poids stockés sur moins de bits), pour tenir dans la mémoire d'un poste de travail au prix d'une perte de qualité.

## Quand l'utiliser

- Développement et prototypage en local : pas de clé d'API, pas de facture au token, fonctionne hors ligne.
- Données sensibles qui ne doivent pas quitter la machine ou le réseau de l'entreprise.
- Apprendre et comparer des modèles ouverts, ou outiller un usage interne léger (quelques utilisateurs).

## Quand l'éviter

- Servir un modèle à de nombreux utilisateurs simultanés en production : Ollama vise la simplicité d'un poste de travail, pas le débit d'un serveur. Un moteur comme vLLM (batching continu, gestion fine de la mémoire GPU) est fait pour ça.
- Besoin de la meilleure qualité possible : les modèles ouverts qui tiennent sur un poste sont souvent en retrait des modèles hébergés de pointe (API OpenAI, API Claude). L'écart dépend des tâches : le mesurer sur ses propres cas.
- Matériel limité : la taille de modèle utilisable dépend directement de la mémoire (RAM ou VRAM) disponible ; un gros modèle sur CPU seul peut être très lent.

## Pour aller plus loin

- [Documentation officielle](https://docs.ollama.com/)
- [Compatibilité avec l'API OpenAI](https://docs.ollama.com/api/openai-compatibility)
