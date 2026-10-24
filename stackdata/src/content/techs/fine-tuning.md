---
name: Fine-tuning
kind: concept
layers: []
tags: [ia-generative, deep-learning, machine-learning]
difficulty: 3
summary: "Prolonger l'entraînement d'un modèle pré-entraîné sur ses propres exemples, pour l'adapter à un format, un ton ou une tâche précise."
integratesWith:
  - tech: llm
    note: "Le fine-tuning part d'un LLM pré-entraîné et en ajuste les poids (ou des adaptateurs ajoutés)."
  - tech: hugging-face
    note: "Bibliothèques Transformers et PEFT (dont LoRA) pour affiner un modèle ouvert."
  - tech: pytorch
    note: "Framework sur lequel reposent la plupart des outils de fine-tuning de modèles ouverts."
---

## Problème résolu

Une consigne bien écrite ne suffit pas toujours : le modèle ne respecte pas un format de sortie précis, n'adopte pas le ton de la marque, ou il faut lui montrer plus d'exemples que la fenêtre de contexte n'en contient. Le fine-tuning prolonge l'entraînement d'un modèle déjà pré-entraîné sur un jeu d'exemples choisis (entrée → sortie attendue). Le modèle se met à reproduire les régularités de ces exemples, sans qu'on les répète dans chaque prompt.

Réentraîner tous les poids d'un grand modèle coûte cher en calcul et en stockage. Les méthodes dites efficaces en paramètres (PEFT) n'entraînent qu'un petit nombre de paramètres supplémentaires. La plus répandue, **LoRA** (Low-Rank Adaptation, 2021), ajoute de petites matrices d'adaptation à côté des poids d'origine, qui restent gelés. On obtient un adaptateur léger, qu'on peut garder à part (et en avoir plusieurs pour un même modèle de base) ou fusionner dans les poids.

Le vrai coût est souvent ailleurs : constituer un jeu d'exemples propre et représentatif, puis évaluer le modèle obtenu pour vérifier qu'il fait mieux que la consigne de départ et n'a pas perdu en qualité ailleurs. Tous les fournisseurs d'API ne proposent pas le fine-tuning de leurs modèles ; avec un modèle ouvert, on le fait soi-même.

## Quand l'utiliser

- Format de sortie strict ou style maison à reproduire de façon constante, quand la consigne et quelques exemples dans le prompt ne suffisent pas.
- Tâche étroite et répétée en gros volume (classer, extraire) : un petit modèle affiné peut remplacer un grand modèle plus cher, et le prompt raccourcit.
- On dispose déjà d'exemples de qualité, en nombre, et d'un moyen de mesurer le résultat.

## Quand l'éviter

- Pour ajouter des connaissances, surtout si elles changent : le modèle les retient mal, ne peut pas citer sa source, et il faudrait réentraîner à chaque mise à jour. C'est le rôle du RAG.
- Avant d'avoir essayé une meilleure consigne et des exemples dans le prompt : c'est moins cher et souvent suffisant.
- Sans jeu d'évaluation : impossible de savoir si le modèle affiné fait mieux.
- Quand le modèle de base change souvent : chaque nouvelle version demande de refaire l'entraînement.

## Pour aller plus loin

- [Documentation PEFT de Hugging Face](https://huggingface.co/docs/peft/index)
- [Hu et al. (2021), LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685)
