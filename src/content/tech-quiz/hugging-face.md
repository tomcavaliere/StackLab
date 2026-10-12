---
questions:
  - id: hub
    prompt: "Qu'est-ce que le Hub de Hugging Face ?"
    answer: "Des dépôts versionnés de modèles, de jeux de données et de démos"
    decoys:
      - "Un moteur d'inférence pour servir des LLM à fort trafic sur GPU"
      - "Une API hébergée qui donne accès à un unique modèle propriétaire"
    why: "Le Hub héberge des dépôts (sur Git) de modèles, de jeux de données et d'applications de démonstration (Spaces). Servir à fort trafic, c'est le rôle de vLLM."
  - id: transformers
    prompt: "À quoi sert la bibliothèque transformers ?"
    answer: "À charger un modèle du Hub en Python, pour l'inférence ou l'entraînement"
    decoys:
      - "À convertir automatiquement un modèle Python en API REST de production"
      - "À transformer des données tabulaires en tableaux de bord interactifs"
    why: "transformers charge un modèle en quelques lignes (`pipeline` pour l'inférence, `Trainer` pour l'entraînement). Ce n'est pas un serveur de production."
  - id: carte-modele
    prompt: "Que trouve-t-on dans la carte d'un modèle (model card) ?"
    answer: "Usage prévu, limites, biais connus, données d'entraînement et licence"
    decoys:
      - "Le prix par token facturé par Hugging Face pour ce modèle"
      - "Le classement officiel du modèle face à tous les autres"
    why: "La carte documente le modèle : à quoi il sert, ses limites et biais, ses données, sa licence. C'est la première chose à lire avant de l'utiliser."
  - id: licence
    prompt: "Un modèle est téléchargeable librement sur le Hub. Peut-on l'utiliser dans un produit commercial ?"
    answer: "Ça dépend de sa licence, à lire dans la carte du modèle"
    decoys:
      - "Oui : tout ce qui est public sur le Hub est sous licence open-source"
      - "Non : un usage commercial exige toujours un contrat avec Hugging Face"
    why: "Chaque modèle a sa propre licence, parfois restrictive (usage non commercial, conditions à accepter). Téléchargeable ne veut pas dire libre d'usage."
  - id: gated
    prompt: "Que signifie un modèle « gated » sur le Hub ?"
    answer: "Il faut accepter des conditions avant de le télécharger"
    decoys:
      - "Il n'est accessible qu'aux abonnés payants de Hugging Face"
      - "Il ne peut être exécuté que sur les serveurs de Hugging Face"
    why: "Un modèle « gated » demande d'accepter ses conditions (souvent celles de sa licence) avant le téléchargement."
  - id: source-modeles
    prompt: "On veut faire tourner un modèle ouvert avec Ollama ou vLLM, ou l'affiner. Où le cherche-t-on le plus souvent ?"
    answer: "Sur le Hub de Hugging Face"
    decoys:
      - "Dans la console de l'API OpenAI"
      - "Dans la documentation de LangChain"
    why: "Le Hub est le lieu habituel de publication des modèles ouverts ; vLLM les y charge directement. L'API OpenAI ne distribue pas de poids, LangChain n'héberge pas de modèles."
  - id: inference-endpoints
    prompt: "Que proposent les Inference Endpoints de Hugging Face ?"
    answer: "Le déploiement d'un modèle sur une infrastructure dédiée gérée"
    decoys:
      - "Un catalogue gratuit de jeux de données d'évaluation pour comparer les modèles"
      - "Un format de fichier pour stocker les poids d'un modèle de façon sûre"
    why: "Les Inference Endpoints déploient un modèle sur une infrastructure dédiée, gérée par Hugging Face et payante ; Inference Providers donne un accès à la requête."
  - id: fort-trafic
    prompt: "Pourquoi ne pas servir un LLM à fort trafic avec transformers seul ?"
    answer: "Ce n'est pas un serveur optimisé pour le débit"
    decoys:
      - "transformers ne sait pas générer de texte, seulement classer"
      - "transformers ne fonctionne que pendant l'entraînement d'un modèle"
    why: "transformers sait générer du texte, mais n'est pas conçu pour servir beaucoup de requêtes en parallèle. On charge le modèle dans un moteur comme vLLM."
  - id: fine-tuning
    prompt: "Quel est le point de départ habituel pour affiner un modèle sur ses propres données ?"
    answer: "Un modèle pré-entraîné du Hub, affiné avec transformers"
    decoys:
      - "Un modèle de l'API Claude, dont on télécharge les poids"
      - "Un modèle entraîné depuis zéro sur ses seules données"
    why: "Repartir d'un modèle pré-entraîné coûte bien moins cher que de tout entraîner. Les modèles Claude ne sont pas téléchargeables."
  - id: quand-eviter
    prompt: "Dans quel cas Hugging Face n'est-il pas la voie la plus directe ?"
    answer: "Obtenir un modèle de pointe prêt à l'emploi, sans rien gérer"
    decoys:
      - "Trouver un jeu de données public"
      - "Partager un modèle au sein d'une organisation"
    why: "Le Hub excelle pour trouver et partager modèles et jeux de données. Pour un modèle de pointe sans aucune gestion, une API hébergée (OpenAI, Claude) est plus directe."
---
