---
name: Hugging Face
kind: plateforme
layers: [ml]
languages: [python]
tags: [ia-generative, machine-learning, open-source, offre-managee]
difficulty: 2
summary: "Plateforme où se publient et se téléchargent modèles et jeux de données ouverts (le Hub), et éditeur de la bibliothèque Python transformers."
integratesWith:
  - tech: pytorch
    note: "La plupart des modèles de transformers s'exécutent et s'entraînent avec PyTorch."
  - tech: fine-tuning
    note: "Point de départ habituel : un modèle pré-entraîné du Hub, affiné avec transformers sur ses propres données."
---

## Problème résolu

Réutiliser un modèle publié par d'autres demandait de retrouver ses poids, son code et ses conditions d'utilisation, chaque laboratoire ayant ses propres formats. Hugging Face centralise :

- **le Hub** : des dépôts versionnés (sur Git) de modèles, de jeux de données et d'applications de démonstration (Spaces). Chaque modèle a sa **carte de modèle** (model card) : usage prévu, limites, biais connus, données d'entraînement, et sa **licence**. Certains modèles sont « gated » : il faut accepter des conditions avant de les télécharger ;
- **transformers** : une bibliothèque Python qui charge un modèle du Hub en quelques lignes, pour l'inférence (`pipeline`) comme pour l'entraînement (`Trainer`). Sa définition des modèles est reprise par d'autres outils, dont des moteurs d'inférence comme vLLM ;
- des bibliothèques voisines (`datasets` pour les jeux de données…) et des offres payantes pour exécuter des modèles sans gérer de serveur (Inference Endpoints, dédiés ; Inference Providers, à la requête).

C'est souvent là qu'on va chercher le modèle ouvert qu'on fera tourner avec Ollama ou vLLM, ou qu'on affinera.

## Quand l'utiliser

- Trouver, comparer et télécharger un modèle à poids ouverts (texte, vision, audio, embeddings) ou un jeu de données public.
- Prototyper ou affiner un modèle en Python avec transformers.
- Partager ses propres modèles ou jeux de données, publics ou privés, au sein d'une organisation.

## Quand l'éviter

- Besoin d'un modèle de pointe prêt à l'emploi sans rien gérer : une API hébergée (OpenAI, Claude) est plus directe.
- Usage commercial sans lecture de la licence : « téléchargeable » ne veut pas dire « libre d'usage ». Chaque modèle a sa licence, parfois restrictive (usage non commercial, conditions d'acceptation) ; c'est à vérifier dans la carte du modèle.
- Servir un LLM à fort trafic : transformers seul n'est pas un serveur optimisé pour le débit ; on charge le modèle du Hub dans un moteur comme vLLM.

## Pour aller plus loin

- [Documentation du Hub](https://huggingface.co/docs/hub/index)
- [Documentation de transformers](https://huggingface.co/docs/transformers/index)
