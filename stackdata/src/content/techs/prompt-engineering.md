---
name: Prompt engineering
kind: concept
layers: []
tags: [ia-generative]
difficulty: 1
summary: "Ensemble de pratiques pour écrire les consignes données à un LLM (rôle, contexte, exemples, format de sortie) et les améliorer en les testant, avant d'envisager des solutions plus lourdes."
alternatives:
  - tech: fine-tuning
    note: "Réentraîner le modèle sur des exemples : à envisager quand de bonnes consignes, testées, ne suffisent plus."
integratesWith:
  - tech: llm
    note: "Le prompt est la seule interface d'un LLM : c'est ce qu'il lit pour accomplir la tâche."
  - tech: rag
    note: "Le RAG ajoute des extraits au prompt ; la consigne dit comment les utiliser et quoi faire si la réponse n'y est pas."
  - tech: evaluation-llm
    note: "On compare des versions de prompt sur un jeu de cas de test, pas sur une impression."
  - tech: agent-llm
    note: "Les descriptions des outils et la consigne système guident les décisions de l'agent."
---

## Problème résolu

Un LLM fait ce qu'on lui demande, pas ce qu'on avait en tête. Une consigne vague donne des réponses vagues, au format imprévisible. Le prompt engineering rend la consigne explicite :

- **Être clair et direct** : décrire la tâche, le public, le résultat attendu, comme à un collègue compétent qui ne connaît pas le contexte.
- **Donner le contexte** : à quoi servira la réponse, quelles contraintes respecter.
- **Montrer des exemples** (few-shot) : quelques entrées avec la sortie attendue fixent le format et le ton mieux qu'une longue description.
- **Structurer** : séparer consigne, documents et exemples (balises, sections) pour que le modèle ne les confonde pas.
- **Fixer le format de sortie** : JSON, liste, longueur ; avec les sorties structurées des API quand le code doit lire la réponse.
- **Prompt système** : un rôle et des règles durables, séparés des messages de l'utilisateur.
- **Laisser raisonner** : pour une tâche complexe, demander de réfléchir étape par étape avant de répondre, ou utiliser le mode de raisonnement du modèle quand il en a un.
- **Découper** : enchaîner plusieurs appels simples plutôt qu'un seul prompt qui fait tout.

Le point essentiel : un prompt est du code. On le versionne, on le teste sur des cas représentatifs, et on mesure l'effet de chaque modification.

## Quand l'utiliser

- Toujours, en premier : c'est le levier le moins cher et le plus rapide pour améliorer les réponses d'un LLM.
- Avant de conclure qu'il faut un fine-tuning ou un modèle plus gros.
- Quand le code doit lire la réponse : fixer un format strict et le vérifier.

## Quand l'éviter

- Le modèle n'a pas l'information : aucune consigne ne la fera apparaître. Il faut la lui fournir (RAG) ou lui donner un outil pour la chercher.
- Sécurité : une consigne « ne révèle jamais X » n'est pas un contrôle d'accès. Les données interdites ne doivent pas être dans le prompt, et les entrées non fiables peuvent tenter de détourner la consigne (injection de prompt).
- Ajuster le prompt au hasard, sans jeu de test : on corrige un cas et on en casse trois autres.

## Pour aller plus loin

- [Guide de prompt engineering (documentation Claude)](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview)
- [Guide de prompt engineering (documentation OpenAI)](https://platform.openai.com/docs/guides/prompt-engineering)
