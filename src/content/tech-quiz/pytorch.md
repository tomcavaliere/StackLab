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
  - id: nn-module
    prompt: "Quel est le rôle d'une classe qui hérite de torch.nn.Module ?"
    answer: "Décrire un réseau ou un bloc de réseau : ses couches et son calcul vers l'avant"
    decoys:
      - "Charger un jeu de données depuis le disque et le découper en lots pour l'entraînement"
      - "Planifier l'ordre des mises à jour des poids pendant la descente de gradient"
    why: "nn.Module est la brique de base des modèles : elle porte les couches (donc les paramètres) et la méthode forward. Le découpage en lots relève du DataLoader, la mise à jour des poids de l'optimiseur."
  - id: boucle-entrainement
    prompt: "Quelle est la séquence habituelle de la boucle d'entraînement PyTorch pour un lot de données ?"
    answer: "Prédire, calculer la perte, rétropropager avec backward, puis mettre à jour avec l'optimiseur"
    decoys:
      - "Mettre à jour les poids avec l'optimiseur, puis calculer la perte et seulement ensuite les gradients"
      - "Calculer les gradients avec backward, puis relancer la prédiction sans toucher aux poids du modèle"
    why: "On enchaîne forward, perte, backward (qui remplit les gradients) puis optimizer.step (qui modifie les poids). Inverser l'ordre ferait mettre à jour les poids avec des gradients absents ou périmés."
  - id: zero-grad
    prompt: "Pourquoi appeler optimizer.zero_grad() à chaque itération d'entraînement ?"
    answer: "Parce que les gradients s'accumulent par défaut d'un backward à l'autre"
    decoys:
      - "Parce que les poids du modèle doivent être remis à zéro avant chaque nouveau lot de données"
      - "Parce que sans cela le GPU garderait en mémoire les données du lot précédent et saturerait"
    why: "backward ajoute les nouveaux gradients à ceux déjà stockés : sans remise à zéro, ils se cumuleraient d'un lot à l'autre. Les poids, eux, ne sont jamais remis à zéro."
  - id: dataloader
    prompt: "À quoi sert un DataLoader PyTorch ?"
    answer: "Fournir les données par lots, mélangées si besoin, à la boucle d'entraînement"
    decoys:
      - "Télécharger les modèles pré-entraînés depuis le Hub de Hugging Face avant l'entraînement"
      - "Convertir un modèle entraîné pour l'exécuter ensuite sur un téléphone ou un appareil embarqué"
    why: "Le DataLoader pioche dans un Dataset et fabrique des lots, avec mélange et chargement en parallèle possibles. Il ne télécharge pas de modèles et n'exporte rien."
  - id: no-grad
    prompt: "Pourquoi utiliser torch.no_grad() quand on ne fait que prédire ?"
    answer: "Pour ne pas enregistrer les opérations dont on n'a pas besoin de gradient, ce qui économise mémoire et calcul"
    decoys:
      - "Pour désactiver les couches de dropout et de normalisation pendant les prédictions du modèle"
      - "Pour forcer le calcul sur CPU afin d'obtenir des résultats strictement reproductibles d'une fois sur l'autre"
    why: "no_grad coupe l'enregistrement des opérations pour autograd : moins de mémoire et de calcul en inférence. Le comportement du dropout se règle avec model.eval(), un autre mécanisme."
  - id: eval-mode
    prompt: "Que change model.eval() avant de faire des prédictions ?"
    answer: "Certaines couches, comme le dropout, passent en mode prédiction"
    decoys:
      - "Le modèle est évalué automatiquement sur le jeu de test et la précision s'affiche à l'écran"
      - "Les gradients cessent d'être calculés, exactement comme avec torch.no_grad()"
    why: "eval() fait passer en mode inférence les couches qui se comportent différemment à l'entraînement (dropout, normalisation par lots). Il ne calcule aucune métrique et ne coupe pas autograd, ce que fait no_grad."
  - id: device
    prompt: "Comment fait-on calculer un modèle PyTorch sur un GPU NVIDIA ?"
    answer: "En déplaçant le modèle et les tenseurs vers le périphérique cuda, avec .to"
    decoys:
      - "En installant simplement PyTorch : tous les tenseurs sont alors placés sur le GPU sans rien écrire"
      - "En compilant le modèle avec torch.compile, qui choisit lui-même le matériel à la place du code"
    why: "Le placement est explicite : modèle et données doivent être sur le même périphérique (cpu, cuda…). torch.compile accélère un modèle mais ne choisit pas son matériel."
  - id: meme-peripherique
    prompt: "Un modèle PyTorch est sur GPU mais le lot d'entrée est resté sur CPU. Que se passe-t-il à l'appel du modèle ?"
    answer: "Une erreur : les tenseurs doivent être sur le même périphérique"
    decoys:
      - "PyTorch déplace automatiquement le lot sur le GPU, sans rien signaler au passage"
      - "Le calcul s'exécute sur CPU et le modèle repasse silencieusement dessus pour la suite"
    why: "PyTorch ne déplace pas les données à votre place : mélanger CPU et GPU lève une erreur explicite. Il faut envoyer le lot au même périphérique que le modèle."
  - id: state-dict
    prompt: "Que contient le state_dict d'un modèle PyTorch ?"
    answer: "Les paramètres appris (poids) du modèle, par nom de couche"
    decoys:
      - "Le code source de la classe du modèle, prêt à être rechargé sans autre fichier"
      - "L'historique de la perte mesurée à chaque époque de l'entraînement, courbe comprise"
    why: "Le state_dict associe chaque couche à ses tenseurs de paramètres : on le sauvegarde puis on le recharge dans un modèle de même architecture, qu'il faut donc redéfinir en code."
  - id: requires-grad
    prompt: "Pourquoi mettre requires_grad à False sur les couches d'un modèle pré-entraîné ?"
    answer: "Pour les figer : leurs poids ne sont plus mis à jour pendant l'entraînement"
    decoys:
      - "Pour les supprimer du modèle et obtenir un réseau plus petit à l'arrivée"
      - "Pour les déplacer sur le CPU afin de libérer de la mémoire sur le GPU"
    why: "Sans gradient, autograd ne calcule rien pour ces paramètres et l'optimiseur ne les modifie pas : on n'entraîne ainsi que les dernières couches. Les couches restent dans le modèle."
  - id: fine-tuning
    prompt: "On reprend un modèle pré-entraîné et on poursuit son entraînement sur ses propres données avec PyTorch. De quoi parle-t-on ?"
    answer: "De fine-tuning (ou transfer learning)"
    decoys:
      - "De quantification, qui réduit la précision des nombres stockés dans les poids"
      - "De distillation, où un petit modèle apprend à imiter les sorties d'un grand modèle"
    why: "Reprendre un modèle déjà entraîné et l'ajuster à ses données, c'est le fine-tuning. La quantification réduit la précision des poids, la distillation fait imiter un grand modèle par un petit."
  - id: ddp
    prompt: "Comment répartir l'entraînement d'un modèle PyTorch sur plusieurs GPU ?"
    answer: "Avec le parallélisme de données de torch.distributed, comme DistributedDataParallel"
    decoys:
      - "Avec scikit-learn, dont les estimateurs se répartissent d'eux-mêmes sur les cartes graphiques"
      - "En lançant plusieurs fois le même script, chaque copie écrasant les poids de la précédente"
    why: "DistributedDataParallel garde une copie du modèle par GPU et synchronise les gradients entre elles. scikit-learn tourne essentiellement sur CPU, et des copies indépendantes ne s'entraînent pas ensemble."
  - id: autocast
    prompt: "À quoi sert la précision mixte (torch.autocast) ?"
    answer: "Utiliser des nombres moins précis là où c'est sûr, pour accélérer et économiser de la mémoire"
    decoys:
      - "Mélanger deux modèles différents dans un même entraînement pour moyenner leurs prédictions"
      - "Alterner entre calcul sur CPU et sur GPU pour répartir automatiquement la charge de travail"
    why: "Autocast choisit, opération par opération, une précision réduite quand elle est sûre : le calcul va plus vite et prend moins de mémoire. Ce n'est ni un mélange de modèles ni une répartition CPU/GPU."
  - id: lightning
    prompt: "Que fait PyTorch Lightning par rapport à PyTorch ?"
    answer: "Il structure le code et prend en charge la boucle d'entraînement"
    decoys:
      - "Il remplace PyTorch par un moteur de calcul concurrent, compatible avec ses modèles"
      - "Il ajoute un modèle de langage prêt à l'emploi pour générer du code d'entraînement"
    why: "Lightning est une bibliothèque construite sur PyTorch : elle range le code et automatise la boucle d'entraînement. PyTorch reste le moteur de calcul."
  - id: torchvision
    prompt: "Quelle bibliothèque de l'écosystème PyTorch fournit des jeux de données et des modèles pour l'image ?"
    answer: "torchvision"
    decoys:
      - "LiteRT, la bibliothèque qui exécute les modèles de vision sur mobile"
      - "Keras, la bibliothèque d'images de l'écosystème TensorFlow"
    why: "torchvision accompagne PyTorch avec des jeux de données, des transformations et des modèles de vision. LiteRT et Keras appartiennent à l'écosystème TensorFlow."
  - id: numpy
    prompt: "Quel lien entre les tenseurs PyTorch et les tableaux NumPy ?"
    answer: "On passe facilement de l'un à l'autre, et ils peuvent partager la même mémoire sur CPU"
    decoys:
      - "Aucun : les deux formats sont incompatibles et il faut passer par un fichier intermédiaire"
      - "Les tenseurs PyTorch remplacent NumPy et ne savent plus lire les tableaux NumPy existants"
    why: "torch.from_numpy et .numpy() convertissent sans copie pour les tenseurs sur CPU : modifier l'un modifie l'autre. Les deux bibliothèques se combinent bien."
  - id: eager-debug
    prompt: "Que permet l'exécution immédiate de PyTorch quand on met au point un modèle ?"
    answer: "Poser un point d'arrêt ou un print dans le calcul et inspecter les valeurs des tenseurs"
    decoys:
      - "Voir le graphe complet du modèle avant de lancer le premier calcul, sans exécuter de code"
      - "Relancer automatiquement l'entraînement depuis la dernière sauvegarde en cas d'erreur"
    why: "Le graphe se construit pendant l'exécution du code Python : on peut donc déboguer comme n'importe quel programme. Rien n'est figé à l'avance, et la reprise après erreur n'est pas automatique."
  - id: vllm
    prompt: "Quel framework de deep learning est derrière des serveurs d'inférence de modèles de langage comme vLLM ?"
    answer: "PyTorch"
    decoys:
      - "scikit-learn, qui fournit les estimateurs servis par le serveur"
      - "XGBoost, qui calcule les prédictions de chaque jeton généré"
    why: "Une grande partie de l'écosystème des modèles de langage, dont vLLM, repose sur PyTorch. scikit-learn et XGBoost sont faits pour des données tabulaires."
  - id: equipe-demunie
    prompt: "Une équipe sans GPU ni expérience du deep learning veut classer des tickets de support par thème. Quelle démarche limite le risque ?"
    answer: "Partir d'un modèle pré-entraîné ou d'une API avant d'envisager d'entraîner un réseau soi-même"
    decoys:
      - "Entraîner un réseau profond depuis zéro sur des processeurs, quitte à attendre très longtemps"
      - "Acheter d'abord du matériel GPU, puis chercher ensuite quel problème il pourrait résoudre"
    why: "Le coût d'entrée de PyTorch (matériel, compétences, suivi) est élevé : un modèle déjà entraîné ou une API évite de l'assumer. Entraîner de zéro sans GPU est lent, et acheter du matériel sans besoin précis est risqué."
  - id: surapprentissage-signal
    prompt: "Pendant un entraînement PyTorch, la perte baisse sur le jeu d'entraînement mais remonte sur le jeu de validation. Que signale-t-on ?"
    answer: "Un surapprentissage : le réseau mémorise l'entraînement au lieu de généraliser"
    decoys:
      - "Un GPU défaillant, qui corrompt les gradients à chaque époque"
      - "Une fuite de mémoire dans le DataLoader, qui ralentit la validation"
    why: "Une perte qui diverge entre entraînement et validation est le signe classique du surapprentissage : il faut plus de données, une régularisation ou un arrêt plus précoce. Un défaut matériel ne ferait pas baisser la perte d'entraînement."
---
