---
questions:
  - id: principe
    prompt: "Qu'est-ce qui définit le deep learning ?"
    answer: "Des réseaux de neurones à nombreuses couches"
    decoys:
      - "Des arbres de décision combinés les uns après les autres"
      - "Des règles écrites par des experts, empilées en couches"
    why: "Le deep learning empile de nombreuses couches de neurones, chacune transformant la sortie de la précédente. Les arbres combinés, c'est le gradient boosting."
  - id: representations
    prompt: "Quel avantage clé le deep learning a-t-il sur des images ou du texte ?"
    answer: "Il apprend lui-même ses représentations à partir des données brutes"
    decoys:
      - "Il n'a besoin que de quelques dizaines d'exemples pour bien apprendre"
      - "Ses décisions s'expliquent facilement, règle par règle"
    why: "Personne ne sait écrire des indicateurs utiles à partir de pixels ; le réseau les apprend, des bords aux objets entiers. En revanche, il demande beaucoup de données et reste opaque."
  - id: donnees-tabulaires
    prompt: "Pour prédire la résiliation à partir d'un petit fichier clients en lignes et colonnes, que privilégier d'abord ?"
    answer: "Un gradient boosting comme XGBoost"
    decoys:
      - "Un réseau de neurones profond entraîné depuis zéro"
      - "Un transformer entraîné sur ce fichier"
    why: "Sur de petites données tabulaires, le gradient boosting est souvent aussi bon ou meilleur, plus simple à entraîner et à expliquer. Un réseau profond surapprendrait."
  - id: gpu
    prompt: "Pourquoi l'entraînement d'un réseau de neurones se fait-il sur GPU ?"
    answer: "Ses calculs se font massivement en parallèle"
    decoys:
      - "Les frameworks de deep learning ne savent pas s'exécuter sur un processeur classique"
      - "Le GPU stocke les données d'entraînement de façon plus durable que le disque"
    why: "Un réseau enchaîne d'énormes calculs matriciels, que les GPU exécutent en parallèle. On peut entraîner sur processeur, mais cela devient vite trop lent."
  - id: transformer
    prompt: "Quelle architecture de réseau de neurones est à la base des LLM actuels ?"
    answer: "Le transformer"
    decoys:
      - "Le réseau convolutif"
      - "Le réseau récurrent"
      - "La forêt aléatoire"
    why: "Le transformer, présenté en 2017 dans l'article « Attention Is All You Need », a remplacé les réseaux récurrents pour le texte. Les réseaux convolutifs servent surtout aux images ; la forêt aléatoire n'est pas un réseau de neurones."
  - id: transfer-learning
    prompt: "On a peu d'images étiquetées pour un contrôle qualité. Quelle approche réduit le besoin de données ?"
    answer: "Partir d'un modèle pré-entraîné et l'adapter"
    decoys:
      - "Entraîner depuis zéro un réseau plus profond pour compenser"
      - "Doubler la taille des images pour donner plus de détails au réseau"
    why: "Le transfer learning (ou fine-tuning) réutilise ce qu'un modèle a appris sur de grands volumes et l'ajuste au cas métier. Un réseau plus profond depuis zéro surapprendrait encore plus."
  - id: couches-image
    prompt: "Sur des images, que détectent typiquement les premières couches d'un réseau entraîné ?"
    answer: "Des bords et des textures"
    decoys:
      - "Des objets entiers, déjà reconnus et nommés"
      - "Les étiquettes des images d'entraînement"
    why: "Les représentations se construisent de couche en couche : bords et textures d'abord, puis formes, puis objets entiers dans les dernières couches."
  - id: donnees-non-structurees
    prompt: "Lequel de ces cas relève le plus naturellement du deep learning ?"
    answer: "Transcrire les appels d'un centre de relation client"
    decoys:
      - "Calculer le chiffre d'affaires mensuel par région à partir des ventes"
      - "Bloquer les paiements au-dessus d'un montant fixé par le service risque"
    why: "L'audio est une donnée non structurée, terrain du deep learning. Une agrégation se fait en SQL, et un seuil fixé par le métier est une simple règle."
  - id: explicabilite
    prompt: "Pourquoi éviter le deep learning pour une décision d'octroi de crédit à justifier client par client ?"
    answer: "Il est difficile d'expliquer pourquoi le réseau a décidé"
    decoys:
      - "Il ne sait traiter que des images, du son et du texte"
      - "Il ne produit que des nombres, jamais des décisions oui ou non"
    why: "Un réseau combine des millions de poids : sa décision ne se lit pas règle par règle. Il sait pourtant traiter des données tabulaires et faire de la classification."
  - id: avant-d-entrainer
    prompt: "Avant d'entraîner un réseau pour classer des textes, que vérifier d'abord ?"
    answer: "Si un LLM ou des embeddings existants suffisent déjà"
    decoys:
      - "Si l'on peut se passer de GPU en réduisant le nombre de couches"
      - "Si l'on peut convertir les textes en tableau de mots pour XGBoost"
    why: "Des modèles pré-entraînés couvrent déjà beaucoup de tâches de texte : les utiliser évite de collecter des données et d'entraîner un réseau."
---
