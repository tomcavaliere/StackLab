---
questions:
  - id: role
    prompt: "À quoi sert Ollama ?"
    answer: "À exécuter des modèles à poids ouverts sur sa propre machine"
    decoys:
      - "À appeler les modèles hébergés d'OpenAI avec une seule clé d'API"
      - "À entraîner un grand modèle de langage depuis zéro sur un poste de travail"
    why: "Ollama télécharge et lance des modèles ouverts en local, derrière une API HTTP. Il n'entraîne pas de modèle et n'est pas un client d'API hébergée."
  - id: commandes
    prompt: "Que font `ollama pull` puis `ollama run` ?"
    answer: "Télécharger un modèle, puis le lancer en local"
    decoys:
      - "Publier son modèle sur le Hub, puis l'exposer sur Internet"
      - "Compiler le moteur d'inférence, puis le déployer sur Kubernetes"
    why: "`pull` récupère les poids du modèle, `run` le démarre. Ollama évite justement de compiler soi-même un moteur."
  - id: api-locale
    prompt: "Comment une application parle-t-elle à un modèle lancé avec Ollama ?"
    answer: "Par une API HTTP locale (par défaut sur le port 11434)"
    decoys:
      - "Uniquement par la ligne de commande, Ollama n'expose aucune API"
      - "Par une connexion à la base de données interne d'Ollama"
    why: "Ollama lance un serveur local qui expose une API HTTP, par défaut sur `localhost:11434`."
  - id: compat-openai
    prompt: "Un code écrit pour l'API OpenAI peut-il appeler un modèle servi par Ollama ?"
    answer: "Souvent, en changeant l'URL de base : Ollama implémente une partie de l'API OpenAI"
    decoys:
      - "Non : les formats sont incompatibles et tout le code d'appel est à réécrire"
      - "Oui, mais seulement avec les modèles d'OpenAI que l'on a téléchargés en local"
    why: "Ollama expose des routes compatibles avec une partie de l'API OpenAI. Les modèles d'OpenAI de l'API ne sont pas téléchargeables."
  - id: donnees-sensibles
    prompt: "Pourquoi choisir Ollama pour analyser des documents confidentiels ?"
    answer: "Le modèle tourne en local : les données ne sortent pas"
    decoys:
      - "Ollama chiffre les prompts avant de les envoyer à OpenAI"
      - "Ollama efface automatiquement les documents après chaque réponse envoyée au fournisseur"
    why: "Avec Ollama, aucune requête ne part chez un fournisseur : le modèle s'exécute sur la machine ou le réseau de l'entreprise."
  - id: production-multi
    prompt: "Pourquoi éviter Ollama pour servir un modèle à de nombreux utilisateurs simultanés ?"
    answer: "Il vise la simplicité d'un poste de travail, pas le débit"
    decoys:
      - "Il refuse plus d'un utilisateur, par licence"
      - "Il ne fonctionne que sans GPU, donc trop lentement pour un serveur"
    why: "Ollama est fait pour le local. Pour le débit en production, un moteur comme vLLM (batching continu, gestion fine de la mémoire GPU) est conçu pour ça. Ollama utilise le GPU s'il y en a un."
  - id: quantification
    prompt: "Pourquoi les modèles d'Ollama sont-ils souvent quantifiés ?"
    answer: "Pour tenir dans la mémoire d'un poste, au prix d'une perte de qualité"
    decoys:
      - "Pour améliorer leur qualité par rapport au modèle d'origine"
      - "Pour pouvoir les utiliser sans accepter leur licence"
    why: "La quantification stocke les poids sur moins de bits : le modèle prend moins de mémoire, mais perd un peu en qualité. Elle ne change rien à la licence."
  - id: materiel
    prompt: "Qu'est-ce qui limite la taille du modèle qu'on peut lancer avec Ollama ?"
    answer: "La mémoire disponible (RAM ou VRAM) de la machine"
    decoys:
      - "Le nombre de modèles déjà téléchargés"
      - "Le forfait souscrit auprès d'Ollama"
    why: "Le modèle doit tenir en mémoire ; sur CPU seul, un gros modèle peut en plus être très lent. Pas de forfait pour l'exécution locale."
  - id: qualite
    prompt: "Comment se compare en général un modèle ouvert lancé sur un poste avec Ollama aux modèles hébergés de pointe ?"
    answer: "Souvent en retrait, selon les tâches"
    decoys:
      - "Toujours supérieur, puisqu'il n'y a pas de latence réseau"
      - "Strictement identique, ce sont les mêmes modèles compressés"
    why: "Les modèles qui tiennent sur un poste sont souvent moins bons que les modèles hébergés de pointe ; l'écart dépend des tâches et se mesure sur ses propres cas."
  - id: usage-type
    prompt: "Lequel de ces usages convient le mieux à Ollama ?"
    answer: "Prototyper hors ligne une fonction d'IA, sans clé d'API"
    decoys:
      - "Servir un assistant à des milliers d'utilisateurs en production, sur un cluster de GPU"
      - "Héberger et versionner des jeux de données publics pour toute une communauté"
    why: "Ollama brille en local : prototypage, hors ligne, données qui ne sortent pas. La production à fort trafic relève de vLLM, l'hébergement de jeux de données du Hub de Hugging Face."
---
