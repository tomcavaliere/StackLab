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
  - id: forme-exemples
    prompt: "Sous quelle forme se présentent les données d'un fine-tuning classique d'un modèle de langage ?"
    answer: "Des paires entrée → sortie attendue"
    decoys:
      - "Un index de passages découpés, que le modèle consulte à chaque requête"
      - "Un fichier de poids déjà entraîné qu'on fusionne avec celui du modèle de base"
      - "Un ensemble de règles métier écrites que le modèle applique à la lettre"
    why: "Le modèle apprend à reproduire des exemples d'entrée et de sortie attendue. L'index de passages relève du RAG ; le modèle ne suit pas de règles écrites à la lettre."
  - id: peft-definition
    prompt: "Que signifie PEFT dans le contexte du fine-tuning ?"
    answer: "Les méthodes efficaces en paramètres, qui n'entraînent qu'un petit nombre de paramètres"
    decoys:
      - "Un format de fichier standard pour stocker les poids d'un modèle sur disque"
      - "Un protocole d'évaluation fixant les jeux de test à utiliser pour comparer des modèles"
    why: "PEFT (Parameter-Efficient Fine-Tuning) regroupe les méthodes comme LoRA, qui évitent de réentraîner tous les poids. Ce n'est ni un format de fichier ni un protocole d'évaluation."
  - id: poids-geles
    prompt: "Avec LoRA, que deviennent les poids d'origine du modèle de base pendant l'entraînement ?"
    answer: "Ils restent gelés"
    decoys:
      - "Ils sont mis à jour un par un, mais avec un pas d'apprentissage très réduit"
      - "Ils sont remplacés par les matrices d'adaptation dès la première étape d'entraînement"
      - "Ils sont copiés dans un nouveau modèle, entièrement réentraîné ensuite à part"
    why: "LoRA n'entraîne que les petites matrices ajoutées à côté ; les poids de base ne bougent pas, ce qui limite le calcul et le stockage."
  - id: plusieurs-adaptateurs
    prompt: "Quel intérêt y a-t-il à garder les adaptateurs LoRA séparés du modèle de base ?"
    answer: "Plusieurs adaptateurs peuvent servir à un même modèle de base"
    decoys:
      - "L'adaptateur s'applique automatiquement à n'importe quel modèle de base, quelle que soit sa famille"
      - "Le modèle de base peut ainsi être supprimé une fois l'adaptateur entraîné et validé"
    why: "Un adaptateur est petit : on peut en garder un par tâche ou par client pour un même modèle de base. Il reste lié au modèle pour lequel il a été entraîné, et ne le remplace pas."
  - id: fusion
    prompt: "Que signifie fusionner un adaptateur LoRA dans les poids ?"
    answer: "Intégrer l'adaptation au modèle pour n'avoir qu'un seul jeu de poids"
    decoys:
      - "Combiner deux modèles de base différents pour en faire un modèle plus grand"
      - "Compresser l'adaptateur pour qu'il tienne dans la fenêtre de contexte du prompt"
    why: "La fusion ajoute l'adaptation aux poids d'origine : on obtient un modèle autonome. La fenêtre de contexte n'a rien à voir avec les poids."
  - id: rag-vs-ft
    prompt: "Une équipe veut qu'un assistant réponde avec les procédures internes, révisées chaque semaine. Quelle approche privilégier ?"
    answer: "Le RAG : on réindexe les documents, sans réentraîner"
    decoys:
      - "Le fine-tuning, en relançant un entraînement chaque semaine sur les nouvelles procédures"
      - "Le fine-tuning une seule fois : le modèle retient durablement toutes les procédures apprises"
    why: "Les connaissances qui changent relèvent du RAG, qui permet aussi de citer la source. Le fine-tuning retient mal les faits précis et obligerait à réentraîner à chaque révision."
  - id: citer-sources
    prompt: "Pourquoi un modèle affiné ne peut-il pas citer la source d'un fait appris pendant l'entraînement ?"
    answer: "Le fait est dilué dans les poids, sans lien avec un document identifiable"
    decoys:
      - "Parce que le fine-tuning désactive volontairement la génération de références"
      - "Parce que la licence du modèle de base interdit toute citation de sources"
    why: "Les poids ne gardent aucune trace du document d'origine. Avec le RAG, les passages récupérés sont connus et peuvent être cités."
  - id: oubli
    prompt: "Quel risque guette un modèle affiné de façon trop étroite, que l'évaluation doit détecter ?"
    answer: "Une perte de qualité sur d'autres tâches que celle visée"
    decoys:
      - "L'impossibilité définitive de réentraîner le modèle une seconde fois"
      - "Une obligation de payer la licence du modèle de base une deuxième fois"
    why: "Un modèle spécialisé peut régresser en dehors de son domaine d'entraînement. Un jeu d'évaluation couvrant aussi les autres usages le révèle."
  - id: qualite-donnees
    prompt: "Des exemples d'entraînement contiennent des erreurs et des formats incohérents. Que risque-t-on ?"
    answer: "Que le modèle reproduise ces défauts de façon régulière"
    decoys:
      - "Rien : le pré-entraînement du modèle corrige les erreurs des exemples"
      - "Que l'entraînement refuse de démarrer tant que les exemples ne sont pas valides"
    why: "Le modèle imite ce qu'on lui montre, erreurs comprises. Le travail sur le jeu d'exemples (propre, représentatif) pèse donc plus que le calcul."
  - id: ordre-methodes
    prompt: "Dans quel ordre faut-il en général envisager les moyens d'adapter un modèle à son besoin ?"
    answer: "D'abord la consigne et les exemples dans le prompt, puis le RAG ou le fine-tuning si l'écart persiste"
    decoys:
      - "D'abord le fine-tuning, puis la consigne pour corriger les derniers écarts"
      - "D'abord l'entraînement depuis zéro, puis le fine-tuning pour finir de l'ajuster"
    why: "Améliorer la consigne est le moins cher. On passe ensuite au RAG (connaissances) ou au fine-tuning (format, ton, tâche étroite) selon la nature de l'écart."
  - id: prompt-court
    prompt: "Quel bénéfice un fine-tuning peut-il apporter sur la longueur des prompts en production ?"
    answer: "Moins d'exemples et de consignes à répéter dans chaque requête"
    decoys:
      - "La fenêtre de contexte du modèle devient plus grande une fois affiné"
      - "Le modèle n'a plus besoin de recevoir la question de l'utilisateur"
    why: "Le comportement attendu est appris par le modèle au lieu d'être répété dans chaque prompt. La taille de la fenêtre est fixée par le modèle de base et ne change pas."
  - id: ton-marque
    prompt: "Quel besoin le fine-tuning couvre-t-il bien ?"
    answer: "Reproduire de façon constante le ton et le style de la marque"
    decoys:
      - "Donner au modèle l'accès aux commandes du jour de chaque client"
      - "Garantir qu'aucune réponse du modèle ne contiendra jamais d'erreur factuelle"
    why: "Un style est une régularité que les exemples enseignent bien. Les données du jour relèvent du RAG, et aucun fine-tuning ne garantit l'absence d'erreurs."
  - id: modele-change
    prompt: "Pourquoi le fine-tuning s'accommode-t-il mal d'un modèle de base qui change souvent ?"
    answer: "Chaque nouvelle version demande de refaire l'entraînement"
    decoys:
      - "Les nouvelles versions interdisent par contrat les adaptateurs sur les modèles précédents"
      - "L'adaptateur d'une ancienne version dégrade les nouvelles, qu'on ne peut plus utiliser"
    why: "L'adaptation est liée aux poids du modèle sur lequel elle a été entraînée : un autre modèle de base impose de recommencer, et donc de rejouer l'évaluation."
  - id: jeu-test
    prompt: "Pourquoi garder une partie des exemples de côté, hors de l'entraînement ?"
    answer: "Pour mesurer le modèle sur des cas qu'il n'a pas vus"
    decoys:
      - "Pour économiser de la mémoire GPU pendant l'entraînement du modèle"
      - "Pour que l'adaptateur LoRA puisse être fusionné plus rapidement ensuite"
    why: "Évaluer sur les exemples d'entraînement flatterait le modèle, qui peut les avoir mémorisés. Un jeu réservé mesure s'il généralise."
  - id: biblio-peft
    prompt: "Quelle bibliothèque Hugging Face fournit des implémentations de LoRA pour affiner un modèle ouvert ?"
    answer: "PEFT"
    decoys:
      - "Datasets, qui charge et transforme les jeux de données d'entraînement"
      - "Spaces, qui héberge des applications de démonstration des modèles"
    why: "PEFT propose LoRA et d'autres méthodes efficaces en paramètres. Datasets et Spaces servent respectivement aux données et aux démonstrations."
  - id: framework
    prompt: "Sur quel framework reposent la plupart des outils de fine-tuning de modèles ouverts ?"
    answer: "PyTorch"
    decoys:
      - "Redis, qui stocke les poids pendant l'entraînement"
      - "Kubernetes, qui exécute directement les calculs de gradient"
    why: "PyTorch fournit le calcul de gradients utilisé par transformers et PEFT. Kubernetes peut orchestrer des machines d'entraînement, sans faire les calculs lui-même."
  - id: donnees-confidentielles
    prompt: "Pourquoi affiner un modèle ouvert en interne peut-il séduire une entreprise soucieuse de confidentialité ?"
    answer: "Les exemples d'entraînement restent sur son infrastructure"
    decoys:
      - "Le modèle affiné devient automatiquement conforme à toutes les réglementations"
      - "Les exemples sont supprimés par l'entraînement et ne peuvent plus fuiter"
    why: "Avec un modèle ouvert, tout se passe chez soi. Cela ne dispense ni de la conformité ni de la prudence : un modèle peut garder des traces de ses exemples."
  - id: tache-etroite
    prompt: "Parmi ces tâches, laquelle justifie le mieux d'affiner un petit modèle ?"
    answer: "Classer en gros volume des tickets selon une grille de catégories fixe"
    decoys:
      - "Répondre à des questions ouvertes sur l'actualité du jour"
      - "Raisonner sur des problèmes très variés sans cadre prédéfini"
    why: "Une tâche étroite, répétée, avec des exemples étiquetés, se prête bien à un petit modèle affiné. Les questions d'actualité demandent du RAG, et le raisonnement très large un grand modèle."
  - id: sans-eval
    prompt: "Une équipe a lancé un fine-tuning sans jeu d'évaluation. Quel est le problème principal ?"
    answer: "Elle ne peut pas savoir si le modèle fait mieux que le prompt de départ"
    decoys:
      - "Le modèle affiné ne pourra pas être déployé sans ce jeu de test"
      - "Les poids obtenus sont automatiquement considérés comme invalides par PEFT"
    why: "Le jeu d'évaluation sert à comparer avec la consigne de départ et à repérer les régressions. Rien ne l'impose techniquement, d'où le risque de s'en passer."
  - id: calcul-lora
    prompt: "Pourquoi LoRA réduit-il le coût de calcul et de stockage d'un fine-tuning ?"
    answer: "Seul un petit nombre de paramètres ajoutés est entraîné et sauvegardé"
    decoys:
      - "Le modèle de base est remplacé par une version plus petite pendant l'entraînement"
      - "Les exemples d'entraînement sont compressés avant d'être lus par le modèle"
    why: "Entraîner de petites matrices d'adaptation, plutôt que tous les poids, réduit le calcul, et l'adaptateur obtenu est léger à stocker."
---
