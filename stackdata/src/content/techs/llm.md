---
name: Grand modèle de langage (LLM)
kind: concept
layers: []
tags: [ia-generative, deep-learning]
difficulty: 2
summary: "Modèle entraîné sur de très grandes quantités de texte à prédire le token suivant : il génère, résume, traduit, extrait ou classe du texte à partir d'une consigne en langage naturel."
alternatives:
  - tech: apprentissage-supervise
    note: "Un modèle classique entraîné sur vos propres exemples étiquetés : moins cher, plus rapide et plus prévisible pour une tâche de classification ou de prédiction bien définie."
integratesWith:
  - tech: openai-api
    note: "Accès par API aux familles de modèles d'OpenAI, facturé au token."
  - tech: claude-api
    note: "Accès par API aux familles de modèles Claude d'Anthropic, facturé au token."
  - tech: ollama
    note: "Faire tourner un modèle ouvert sur sa propre machine, sans envoyer les données à un tiers."
  - tech: vllm
    note: "Servir un modèle ouvert sur ses propres GPU, pour de nombreux utilisateurs."
  - tech: hugging-face
    note: "Catalogue de modèles ouverts à télécharger, avec leurs fiches et leurs licences."
---

## Problème résolu

Beaucoup de tâches portent sur du texte libre : répondre à une question, résumer un document, extraire des champs d'un courriel, rédiger un brouillon, classer un ticket. Les écrire en règles est long et fragile. Un LLM (Large Language Model) est un réseau de neurones de grande taille, pré-entraîné sur un vaste corpus à une seule tâche : prédire le token suivant d'après ceux qui précèdent. Un token est un morceau de texte (un mot, un bout de mot, un caractère) ; le découpage dépend du modèle. Après un entraînement complémentaire (fine-tuning, apprentissage par renforcement à partir de retours humains), le modèle suit des consignes : on lui décrit la tâche en langage naturel, dans un prompt, au lieu de la programmer.

Quelques notions reviennent partout :

- **Fenêtre de contexte** : la quantité de tokens que le modèle peut lire et produire en un appel (consigne, documents fournis, historique, réponse). C'est sa mémoire de travail : ce qui n'y est pas, il ne le voit pas. Sa taille dépend du modèle.
- **Température** : règle le hasard dans le choix des tokens. Basse, des réponses plus conservatrices ; haute, plus variées. Même à température 0, les API ne garantissent pas des sorties identiques pour une même entrée : un LLM n'est pas déterministe.
- **Hallucinations** : le modèle produit le texte le plus plausible, pas le plus vrai. Il peut affirmer avec aplomb un fait, une citation ou une référence inventés. Ses connaissances s'arrêtent à la date de ses données d'entraînement.
- **Coût** : par API, on paie au token, en entrée comme en sortie. Un long document envoyé à chaque requête coûte à chaque requête.

On y accède par l'API d'un fournisseur (OpenAI, Anthropic…) ou en hébergeant soi-même un modèle ouvert (Ollama, vLLM). Pour qu'un LLM réponde sur des données qu'il n'a pas vues, on les lui fournit dans le prompt (RAG) ; pour qu'il agisse, on lui donne des outils (agent).

## Quand l'utiliser

- Tâches sur du langage naturel difficiles à mettre en règles : résumé, reformulation, traduction, extraction de champs depuis du texte libre, classification de demandes.
- Assistant conversationnel ou aide à la rédaction, où un humain relit le résultat.
- Prototype rapide : une consigne bien écrite remplace souvent des semaines de développement d'un modèle spécifique, au moins pour valider l'idée.

## Quand l'éviter

- Calcul exact, comptabilité, règles métier déterministes : un code classique donne toujours le même résultat, juste, pour un coût négligeable. Un LLM peut se tromper sur une addition.
- Réponse qui doit être vraie sans relecture humaine possible (médical, juridique, financier) : les hallucinations ne disparaissent pas, elles se réduisent.
- Données qu'on n'a pas le droit d'envoyer à un tiers : il faut alors un modèle hébergé chez soi, ou renoncer.
- Gros volumes à faible valeur unitaire : le coût au token s'additionne. Un modèle classique entraîné pour une tâche précise est souvent bien moins cher à faire tourner.

## Pour aller plus loin

- [Glossaire de la documentation Claude (tokens, fenêtre de contexte, température…)](https://platform.claude.com/docs/en/about-claude/glossary)
- [Cours LLM de Hugging Face](https://huggingface.co/learn/llm-course)
