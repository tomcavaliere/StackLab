---
name: Agent LLM
kind: concept
layers: []
tags: [ia-generative]
difficulty: 3
summary: "Système où un LLM décide lui-même, en boucle, quels outils appeler (recherche, API, code) et avec quels arguments, jusqu'à accomplir une tâche."
integratesWith:
  - tech: llm
    note: "Le LLM est le moteur de décision de la boucle."
  - tech: mcp
    note: "Protocole standard pour brancher des outils et des sources de données sur l'agent."
  - tech: claude-api
    note: "API avec appel d'outils (tool use) : le modèle renvoie un appel structuré, l'application l'exécute."
  - tech: openai-api
    note: "API avec appel de fonctions (function calling) sur le même principe."
  - tech: langchain
    note: "Fournit des briques pour écrire la boucle d'agent et brancher des outils."
---

## Problème résolu

Un LLM seul ne fait que produire du texte : il ne consulte pas une base, n'appelle pas une API, ne lance pas de code. Avec l'**appel d'outils** (tool use, function calling), l'application décrit au modèle des outils disponibles : un nom, une description et un schéma JSON des paramètres. Quand le modèle juge qu'un outil l'aide, il ne répond pas en texte : il renvoie un appel structuré (tel outil, tels arguments). L'application exécute l'outil et renvoie le résultat au modèle, qui décide de la suite.

Un agent, c'est cette boucle répétée : modèle → appel d'outil → résultat → modèle → … jusqu'à ce que le modèle estime la tâche terminée. C'est le modèle, pas le code, qui choisit l'enchaînement des étapes. À l'inverse, dans un **workflow**, le code fixe les étapes à l'avance et appelle le LLM à des points précis.

Cette autonomie a un prix :

- **Erreurs en cascade** : une mauvaise lecture à l'étape 2 fausse toutes les suivantes.
- **Coût et latence** : chaque tour de boucle renvoie tout l'historique au modèle ; le nombre de tours n'est pas connu d'avance.
- **Injection de prompt** : un document, une page web ou un résultat d'outil peut contenir des instructions que le modèle risque de suivre. Plus l'agent a d'outils puissants (envoyer un courriel, écrire en base), plus le risque compte : droits minimaux, confirmation humaine pour les actions irréversibles.

## Quand l'utiliser

- Tâches ouvertes dont les étapes ne se prévoient pas : explorer un code, enquêter sur un incident, rechercher puis recouper des informations.
- Le modèle doit choisir parmi beaucoup d'outils selon la situation.
- Un humain peut suivre et corriger, ou les actions sont réversibles (environnement de test, brouillons).

## Quand l'éviter

- Les étapes sont connues : un workflow fixe (récupérer, puis résumer, puis classer) est plus prévisible, moins cher et plus facile à tester. Commencer par la solution la plus simple, et n'ajouter de l'autonomie que si elle apporte un gain mesuré.
- Un seul appel au LLM, avec les bonnes données dans le prompt, suffit.
- Actions sensibles sans supervision possible (paiement, suppression de données) : le risque d'erreur ou d'injection est trop élevé.

## Pour aller plus loin

- [Anthropic : Building effective agents (workflows et agents)](https://www.anthropic.com/engineering/building-effective-agents)
- [Documentation Claude : appel d'outils (tool use)](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview)
