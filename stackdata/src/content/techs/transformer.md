---
name: Transformer
kind: concept
layers: []
tags: [deep-learning, ia-generative]
difficulty: 3
summary: "Architecture de réseau de neurones fondée sur le mécanisme d'attention, qui traite tous les tokens d'une séquence en parallèle : la base des LLM et de la plupart des modèles d'embeddings de texte."
integratesWith:
  - tech: deep-learning
    note: "Une architecture de deep learning parmi d'autres (réseaux convolutifs, récurrents), devenue dominante pour le texte."
  - tech: llm
    note: "Les LLM sont des transformers de très grande taille, le plus souvent de type décodeur."
  - tech: embeddings
    note: "Les modèles d'embeddings de texte sont en général des transformers de type encodeur."
  - tech: pytorch
    note: "Le cadre le plus courant pour implémenter, entraîner et affiner des transformers."
  - tech: hugging-face
    note: "La bibliothèque Transformers et le Hub donnent accès à de très nombreux modèles pré-entraînés."
---

## Problème résolu

Pour comprendre un mot, il faut tenir compte des autres mots de la phrase, parfois éloignés. Les réseaux récurrents qui dominaient avant 2017 lisaient le texte mot à mot : lents à entraîner (pas de parallélisme sur la séquence) et peu doués pour les dépendances lointaines. L'article *Attention Is All You Need* (Vaswani et al., 2017) propose le transformer, qui repose sur l'**attention** :

- le texte est découpé en **tokens**, chacun transformé en vecteur ; une **information de position** est ajoutée, car l'attention seule ignore l'ordre ;
- dans chaque couche, chaque token calcule, pour chaque autre token, un poids d'attention (à partir de vecteurs appelés requête, clé et valeur), puis combine leurs informations selon ces poids ;
- plusieurs **têtes d'attention** en parallèle captent différents types de relations ; on empile de nombreuses couches.

Trois familles :

- **encodeur** (type BERT) : lit tout le texte dans les deux sens ; pour classer, extraire, calculer des embeddings ;
- **décodeur** (type GPT, la plupart des LLM actuels) : prédit le token suivant en ne regardant que les précédents ; pour générer ;
- **encodeur-décodeur** (type T5, comme l'architecture d'origine) : pour transformer un texte en un autre (traduction, résumé).

Coût à connaître : l'attention compare chaque token à tous les autres, donc son coût croît avec le carré de la longueur de la séquence. C'est une des raisons pour lesquelles la fenêtre de contexte a une limite et pour lesquelles un long prompt coûte cher.

## Quand l'utiliser

- Comprendre ce que font les LLM et les modèles d'embeddings : contexte, tokens, coût des longs prompts.
- Choisir un modèle : un encodeur pour classer ou chercher, un décodeur pour générer.
- Affiner (fine-tuning) un modèle pré-entraîné pour une tâche de texte : on part presque toujours d'un transformer existant.

## Quand l'éviter

- Données tabulaires (colonnes de chiffres et de catégories) : les modèles d'arbres comme le gradient boosting restent en général plus simples et au moins aussi bons.
- Entraîner un transformer depuis zéro : il faut énormément de données et de calcul ; on part d'un modèle pré-entraîné.
- Petite tâche de texte bien définie avec peu de moyens : un modèle classique sur des caractéristiques simples peut suffire, à comparer avant tout.

## Pour aller plus loin

- [Vaswani et al. (2017), Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [Cours Hugging Face : comment fonctionnent les transformers](https://huggingface.co/learn/llm-course/chapter1/4)
