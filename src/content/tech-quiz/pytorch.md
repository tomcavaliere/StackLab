---
questions:
  - id: role
    prompt: "À quoi sert PyTorch ?"
    answer: "Construire et entraîner des réseaux de neurones profonds"
    decoys:
      - "Manipuler des tableaux de données tabulaires, comme pandas"
      - "Servir des pages web générées côté serveur en Python"
    why: "PyTorch est un framework de deep learning : tenseurs, gradients, couches, optimiseurs. La manipulation de tables est le rôle de pandas."
  - id: tenseur
    prompt: "Qu'est-ce qu'un tenseur dans PyTorch ?"
    answer: "Un tableau de nombres multidimensionnel, qui peut être calculé sur GPU"
    decoys:
      - "Une table de base de données dont chaque colonne a un nom et un type"
      - "Un fichier de configuration qui décrit l'architecture d'un réseau"
    why: "Le tenseur est la donnée de base du deep learning : un tableau à n dimensions (images, lots de phrases…) sur lequel PyTorch calcule, sur CPU ou GPU."
  - id: autograd
    prompt: "Que fait autograd ?"
    answer: "Il calcule automatiquement les gradients"
    decoys:
      - "Il choisit automatiquement l'architecture du réseau la mieux adaptée aux données"
      - "Il convertit automatiquement un modèle PyTorch au format TensorFlow pour la production"
    why: "Pour entraîner un réseau, il faut le gradient de l'erreur par rapport à chaque paramètre : autograd le calcule à partir des opérations effectuées. Il ne conçoit pas le réseau."
  - id: eager
    prompt: "Que signifie l'exécution immédiate (eager) de PyTorch ?"
    answer: "Le graphe se construit pendant que le code Python s'exécute"
    decoys:
      - "Le modèle est compilé une fois pour toutes avant la première exécution, puis figé"
      - "Les calculs sont envoyés à un serveur distant qui les exécute plus tard"
    why: "Chaque opération s'exécute tout de suite : on peut utiliser boucles, conditions et le débogueur Python habituel. La compilation (torch.compile) est une option ajoutée en 2.0, pas le mode de base."
  - id: torch-compile
    prompt: "À quoi sert torch.compile, apparu avec PyTorch 2.0 ?"
    answer: "Compiler un modèle pour l'accélérer"
    decoys:
      - "Transformer un modèle PyTorch en application mobile autonome"
      - "Vérifier les types des tenseurs avant l'exécution"
    why: "torch.compile optimise l'exécution d'un modèle tout en gardant le code en mode immédiat. Ce n'est ni un empaqueteur mobile ni un vérificateur de types."
  - id: tabulaire-simple
    prompt: "Prédire le prix d'un appartement à partir d'une vingtaine de colonnes : PyTorch est-il le bon choix ?"
    answer: "Plutôt non : scikit-learn ou XGBoost font souvent aussi bien avec beaucoup moins de code"
    decoys:
      - "Oui : un réseau de neurones profond est toujours plus précis qu'un modèle classique, quelle que soit la taille des données"
      - "Oui : c'est le seul outil Python capable de faire une régression"
    why: "Sur des données tabulaires simples, les modèles classiques et le gradient boosting sont souvent au niveau, plus rapides et plus simples. PyTorch y est surdimensionné."
  - id: hugging-face
    prompt: "Quel lien entre PyTorch et Hugging Face ?"
    answer: "Une grande partie des modèles du Hub et la bibliothèque Transformers s'utilisent avec PyTorch"
    decoys:
      - "Hugging Face est l'entreprise qui développe et maintient PyTorch"
      - "Hugging Face est un format de fichier qui remplace les tenseurs PyTorch"
    why: "L'écosystème Hugging Face repose largement sur PyTorch. PyTorch, lui, vient de Facebook AI Research et vit à la PyTorch Foundation."
  - id: gouvernance
    prompt: "Qui héberge le projet PyTorch depuis 2022 ?"
    answer: "La PyTorch Foundation, au sein de la Linux Foundation"
    decoys:
      - "Google, qui l'a racheté pour le fusionner avec TensorFlow"
      - "Hugging Face"
    why: "Né chez Facebook AI Research en 2016, PyTorch a été confié en 2022 à la PyTorch Foundation, rattachée à la Linux Foundation."
  - id: api-hebergee
    prompt: "Une application veut résumer des textes avec un grand modèle de langage hébergé. Faut-il PyTorch ?"
    answer: "Non : un appel à l'API du fournisseur suffit"
    decoys:
      - "Oui : il faut réentraîner le modèle localement avant chaque appel"
      - "Oui : PyTorch est nécessaire pour envoyer une requête HTTP à un modèle"
    why: "Un modèle hébergé s'appelle par une API ; PyTorch ne sert que si l'on entraîne ou fait tourner un modèle soi-même."
  - id: cout-entree
    prompt: "Quel est le principal frein à l'adoption de PyTorch dans une petite équipe ?"
    answer: "Le coût d'entrée : GPU, compétences en deep learning, suivi des entraînements"
    decoys:
      - "Sa licence, qui interdit tout usage commercial"
      - "Il ne fonctionne qu'avec le langage C++"
    why: "PyTorch est open-source et s'utilise surtout en Python ; ce qui coûte, c'est le matériel et l'expertise nécessaires pour entraîner et suivre des modèles profonds."
---
