---
questions:
  - id: definition
    prompt: "Qu'est-ce que le fine-tuning d'un modèle ?"
    answer: "Prolonger son entraînement sur ses propres exemples"
    decoys:
      - "Lui fournir des documents dans le prompt au moment de la question"
      - "Régler sa température et sa longueur de réponse maximale"
    why: "Le fine-tuning ajuste les poids (ou des adaptateurs) d'un modèle pré-entraîné à partir d'exemples. Fournir des documents dans le prompt, c'est le RAG ; la température est un réglage de génération."
  - id: bon-usage
    prompt: "Dans quel cas le fine-tuning est-il le plus pertinent ?"
    answer: "Imposer un format de sortie que la consigne ne suffit pas à obtenir"
    decoys:
      - "Faire connaître au modèle les prix du jour, mis à jour chaque matin"
      - "Permettre au modèle de citer précisément les documents qui fondent sa réponse"
    why: "Le fine-tuning fixe un format, un ton ou une tâche étroite. Des données qui changent chaque jour relèvent du RAG, qui permet aussi de citer les passages."
  - id: connaissances-fraiches
    prompt: "Pourquoi éviter le fine-tuning pour ajouter des connaissances qui changent souvent ?"
    answer: "Il faudrait réentraîner à chaque mise à jour, et le modèle retient mal des faits précis"
    decoys:
      - "Parce qu'un modèle affiné ne peut plus recevoir de documents dans son prompt"
      - "Parce que le fine-tuning efface toutes les connaissances du modèle de base"
    why: "Les faits appris par fine-tuning se retiennent mal et ne se citent pas, et chaque changement demande un nouvel entraînement. Le RAG réindexe simplement le document."
  - id: lora
    prompt: "Que fait la méthode LoRA ?"
    answer: "Elle entraîne de petites matrices ajoutées, les poids d'origine restant gelés"
    decoys:
      - "Elle réentraîne tous les poids du modèle, mais en beaucoup moins d'étapes d'entraînement"
      - "Elle supprime les couches du modèle inutiles pour la tâche visée"
    why: "LoRA (Low-Rank Adaptation) ajoute des matrices d'adaptation de faible rang et n'entraîne qu'elles : bien moins de paramètres à entraîner et à stocker."
  - id: adaptateur
    prompt: "Quel avantage pratique offre un adaptateur LoRA ?"
    answer: "Il est léger et se garde à part du modèle de base"
    decoys:
      - "Il rend le modèle utilisable sans GPU pour l'entraînement"
      - "Il remplace le modèle de base, qu'on peut alors supprimer"
    why: "L'adaptateur est petit : on peut en garder plusieurs pour un même modèle de base, ou le fusionner dans les poids. Le modèle de base reste nécessaire tant qu'on ne fusionne pas."
  - id: cout-cache
    prompt: "Quel est souvent le coût principal d'un projet de fine-tuning ?"
    answer: "Constituer et vérifier le jeu d'exemples"
    decoys:
      - "La licence du format de fichier des poids"
      - "Le stockage des prompts envoyés en production"
    why: "Il faut des exemples propres, représentatifs et en nombre, puis un jeu d'évaluation. C'est ce travail qui coûte, plus que le calcul avec LoRA."
  - id: essayer-avant
    prompt: "Que faut-il essayer avant de se lancer dans un fine-tuning ?"
    answer: "Une meilleure consigne, avec quelques exemples dans le prompt"
    decoys:
      - "Un modèle de base plus petit, en gardant exactement la même consigne"
      - "Une température plus élevée, pour des réponses plus variées et créatives"
    why: "Améliorer la consigne et montrer des exemples dans le prompt est moins cher et suffit souvent. Le fine-tuning vient ensuite, si l'écart persiste."
  - id: evaluation
    prompt: "Pourquoi un jeu d'évaluation est-il indispensable pour un fine-tuning ?"
    answer: "Pour vérifier que le modèle affiné fait mieux que la consigne de départ"
    decoys:
      - "Parce que l'entraînement refuse de démarrer sans lui"
      - "Pour réduire le nombre de tokens facturés à l'entraînement"
    why: "Sans mesure, impossible de savoir si le modèle affiné progresse ou s'il a perdu en qualité ailleurs."
  - id: petit-modele
    prompt: "Pourquoi affiner un petit modèle pour une tâche étroite et répétée ?"
    answer: "Il peut remplacer un grand modèle plus cher, avec un prompt plus court"
    decoys:
      - "Un petit modèle affiné devient meilleur qu'un grand sur toutes les tâches"
      - "Un petit modèle n'a pas besoin de jeu d'exemples pour être affiné"
    why: "Sur une tâche précise en gros volume, un petit modèle affiné peut suffire et coûte moins à faire tourner. Il ne devient pas meilleur partout, et il lui faut des exemples."
  - id: fournisseurs
    prompt: "Peut-on affiner n'importe quel modèle proposé par API ?"
    answer: "Non : tous les fournisseurs ne le proposent pas"
    decoys:
      - "Oui : c'est une fonction standard de toutes les API de LLM"
      - "Oui, mais seulement avec la méthode LoRA"
    why: "Certains fournisseurs ne proposent pas le fine-tuning de leurs modèles par API. Avec un modèle ouvert, on peut l'affiner soi-même, par exemple avec PEFT."
---
