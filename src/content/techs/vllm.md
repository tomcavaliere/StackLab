---
name: vLLM
kind: moteur-traitement
layers: [ml]
languages: [python]
tags: [ia-generative, open-source, inference]
difficulty: 3
summary: "Moteur open-source d'inférence et de service de LLM sur GPU, conçu pour le débit : PagedAttention, batching continu et API compatible OpenAI."
alternatives:
  - tech: openai-api
    note: "Pas de GPU à exploiter : on paie au token un modèle hébergé, souvent plus simple tant que le volume ou la confidentialité n'imposent pas l'auto-hébergement."
integratesWith:
  - tech: hugging-face
    note: "vLLM charge directement les modèles publiés sur le Hub de Hugging Face, au format de la bibliothèque transformers."
  - tech: kubernetes
    note: "Déploiement courant de serveurs vLLM sur des nœuds GPU, avec mise à l'échelle par le cluster."
---

## Problème résolu

Servir un LLM à beaucoup d'utilisateurs coûte cher en GPU, et un serveur naïf les utilise mal : il traite les requêtes une par une ou par lots figés, et gaspille la mémoire réservée au **cache KV** (les clés et valeurs d'attention gardées pendant la génération). vLLM, né à l'université de Berkeley, attaque ces deux pertes :

- **PagedAttention** : le cache KV est découpé en blocs, alloués à la demande comme des pages de mémoire virtuelle, au lieu d'une grande zone contiguë réservée par requête. Moins de mémoire perdue, donc plus de requêtes en parallèle sur le même GPU.
- **Batching continu** : les requêtes entrent et sortent du lot à chaque étape de génération, sans attendre que la plus longue du lot ait fini.

`vllm serve <modèle>` lance un serveur qui expose une **API compatible OpenAI** : les clients écrits pour l'API OpenAI s'y branchent en changeant l'URL. vLLM sait aussi répartir un gros modèle sur plusieurs GPU. Il vise d'abord les GPU NVIDIA et AMD ; d'autres accélérateurs passent par des extensions.

## Quand l'utiliser

- Servir un modèle à poids ouverts en production, à de nombreux utilisateurs, sur ses propres GPU ou chez un cloud : données qui ne sortent pas, coût du matériel au lieu d'une facture au token.
- Servir un modèle affiné (fine-tuning) en interne.
- Remplacer une API hébergée sans réécrire le client, grâce à la compatibilité OpenAI.

## Quand l'éviter

- Petite équipe sans compétence GPU : il faut provisionner, surveiller et mettre à l'échelle des machines chères. Une API hébergée (OpenAI, Claude) est bien plus simple au départ.
- Usage local ou prototype sur un poste de travail : Ollama s'installe en une commande.
- Volume faible ou irrégulier : des GPU qui tournent à vide coûtent quand même. Aucun seuil de rentabilité fiable n'est donné ici : il dépend du modèle, du matériel et du trafic.

## Pour aller plus loin

- [Documentation officielle](https://docs.vllm.ai/en/latest/)
