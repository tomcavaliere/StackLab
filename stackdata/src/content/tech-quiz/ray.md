---
questions:
  - id: role
    prompt: "Quel problème Ray résout-il ?"
    answer: "Répartir du code Python sur un cluster, presque sans le réécrire"
    decoys:
      - "Stocker des vecteurs d'embeddings et chercher les plus proches"
      - "Planifier des pipelines de données quotidiens avec reprise sur échec"
    why: "Ray distribue du Python presque tel quel. Le stockage vectoriel et l'orchestration de pipelines relèvent d'autres outils."
  - id: remote
    prompt: "Que devient une fonction décorée avec @ray.remote ?"
    answer: "Une tâche exécutée sur un nœud du cluster, dont l'appel renvoie une référence"
    decoys:
      - "Un endpoint HTTP public appelable depuis n'importe quel navigateur"
      - "Une fonction mise en cache, recalculée seulement si ses arguments changent"
    why: "L'appel renvoie une référence vers le futur résultat, qu'on récupère ensuite ; c'est la base de Ray Core."
  - id: acteur
    prompt: "Qu'est-ce qu'un acteur dans Ray ?"
    answer: "Un processus distant qui garde un état, créé à partir d'une classe"
    decoys:
      - "Un utilisateur humain autorisé à lancer des tâches sur le cluster"
      - "Une tâche sans état relancée automatiquement en cas d'échec"
    why: "Un acteur conserve un état entre les appels, par exemple un modèle chargé en mémoire. Les tâches, elles, sont sans état."
  - id: ressources
    prompt: "Comment Ray sait-il où placer une tâche qui a besoin d'un GPU ?"
    answer: "On déclare les ressources demandées, et l'ordonnanceur choisit un nœud adapté"
    decoys:
      - "Il exécute toutes les tâches sur le premier GPU disponible de la machine locale"
      - "Il faut écrire soi-même l'adresse du nœud dans chaque appel"
    why: "On déclare CPU et GPU par tâche ou acteur ; l'ordonnanceur place le travail là où les ressources sont libres."
  - id: bibliotheques
    prompt: "À quoi sert Ray Tune ?"
    answer: "Optimiser les hyperparamètres en lançant de nombreux essais en parallèle"
    decoys:
      - "Servir un modèle entraîné derrière une API à forte charge"
      - "Régler la fréquence des GPU pour réduire la consommation électrique"
    why: "Ray Tune répartit les essais d'hyperparamètres ; Ray Serve sert les modèles, Ray Train entraîne, Ray Data traite les données."
  - id: serve
    prompt: "Quelle bibliothèque de Ray sert à exposer un modèle pour l'inférence ?"
    answer: "Ray Serve"
    decoys:
      - "Ray Dashboard"
      - "Ray Tune"
    why: "Ray Serve sert les modèles ; Ray Data traite des données en flux, Ray Tune optimise les hyperparamètres."
  - id: vs-spark
    prompt: "Quand préférer Spark à Ray ?"
    answer: "Pour des transformations massives de tableaux en SQL"
    decoys:
      - "Pour entraîner un réseau de neurones PyTorch sur plusieurs GPU"
      - "Pour servir un modèle de langage réparti sur plusieurs nœuds"
    why: "Spark est la référence du traitement de données distribué en SQL ; Ray est plus généraliste et orienté Python et ML (GPU, entraînement, inférence)."
  - id: une-machine
    prompt: "Quelques centaines de milliers de lignes, un modèle sur données tabulaires. Ray ?"
    answer: "Surdimensionné : pandas et scikit-learn suffisent sur une machine"
    decoys:
      - "Indispensable : scikit-learn ne sait pas lire plus de dix mille lignes"
      - "Idéal : un cluster rend toujours l'entraînement plus précis"
    why: "Un cluster se justifie quand la charge dépasse une machine ; sinon, il ajoute de l'exploitation sans gain."
  - id: vs-celery
    prompt: "Envoyer des courriels en arrière-plan depuis une application web : Ray ou une file de tâches ?"
    answer: "Une file de tâches comme Celery, plus simple pour ce besoin"
    decoys:
      - "Ray, seul outil capable d'exécuter du code en arrière-plan"
      - "Ray, car une file de tâches perd les messages au redémarrage"
    why: "Ray vise le calcul distribué avec état et GPU ; les tâches de fond d'une application web sont le terrain des files de tâches."
  - id: kuberay
    prompt: "Comment déploie-t-on couramment un cluster Ray sur Kubernetes ?"
    answer: "Avec KubeRay, qui crée et dimensionne les clusters Ray"
    decoys:
      - "Impossible : Ray ne tourne que sur des machines virtuelles dédiées"
      - "Avec Helm seul, sans aucun opérateur ni ressource dédiée à Ray"
    why: "KubeRay est l'opérateur qui gère des clusters Ray sur Kubernetes ; Anyscale propose aussi une offre managée."
  - id: ray-data
    prompt: "À quoi sert Ray Data ?"
    answer: "Traiter des données en flux, par exemple pour l'inférence par lots ou l'entraînement"
    decoys:
      - "Stocker durablement des tables et les interroger en SQL depuis plusieurs applications"
      - "Surveiller l'état du cluster et afficher l'utilisation de chaque nœud en direct"
    why: "Ray Data est la bibliothèque de traitement de données de Ray. Le stockage SQL relève d'une base, la surveillance d'un tableau de bord."
  - id: ray-train
    prompt: "À quoi sert Ray Train ?"
    answer: "À répartir un entraînement sur plusieurs machines et plusieurs GPU"
    decoys:
      - "À tester de nombreuses combinaisons d'hyperparamètres en parallèle"
      - "À exposer un modèle entraîné derrière une API pour l'inférence"
    why: "Ray Train distribue l'entraînement. Ray Tune cherche les hyperparamètres et Ray Serve sert les modèles."
  - id: recuperer-resultat
    prompt: "Une tâche Ray est lancée et renvoie une référence. Comment obtenir sa valeur ?"
    answer: "En demandant la valeur à partir de la référence, avec ray.get"
    decoys:
      - "En lisant un fichier de résultat que la tâche écrit sur le disque du nœud qui l'a exécutée"
      - "En interrogeant un endpoint HTTP que Ray ouvre automatiquement pour chaque tâche"
    why: "L'appel renvoie tout de suite une référence vers le futur résultat ; on la résout ensuite pour obtenir la valeur."
  - id: parallelisme-taches
    prompt: "On lance cent appels d'une fonction @ray.remote à la suite. Que se passe-t-il ?"
    answer: "Les appels rendent la main aussitôt et les tâches s'exécutent en parallèle, selon les ressources libres"
    decoys:
      - "Chaque appel attend le résultat du précédent, comme pour une fonction ordinaire"
      - "Toutes les tâches tournent sur le nœud de tête, sans jamais passer par les autres"
    why: "Chaque appel renvoie une référence sans attendre. L'ordonnanceur répartit les tâches sur les nœuds disposant des ressources demandées."
  - id: modele-en-memoire
    prompt: "Charger un modèle une seule fois puis répondre à de nombreuses requêtes : tâche ou acteur ?"
    answer: "Un acteur, qui garde le modèle en mémoire entre les appels"
    decoys:
      - "Une tâche, qui conserve son état d'un appel à l'autre sans rien recharger"
      - "Ni l'un ni l'autre : Ray ne sait pas conserver un modèle en mémoire"
    why: "Un acteur est un processus distant avec état. Une tâche est sans état et repartirait de zéro à chaque appel."
  - id: licence
    prompt: "Sous quelle licence Ray est-il distribué ?"
    answer: "Apache 2.0, une licence open-source"
    decoys:
      - "Une licence propriétaire payante par nœud du cluster"
      - "Une licence réservée à la recherche, interdisant l'usage commercial"
    why: "Ray est open-source sous licence Apache 2.0. Anyscale vend une offre managée, mais le code reste libre."
  - id: anyscale
    prompt: "Qui est Anyscale ?"
    answer: "L'entreprise fondée par les créateurs de Ray, qui en propose une offre managée"
    decoys:
      - "Un fournisseur de cloud qui héberge les clusters Ray de ses clients dans ses centres"
      - "Le nom de l'ordonnanceur interne qui place les tâches sur les nœuds"
    why: "Anyscale édite une offre managée de Ray. L'ordonnanceur est un composant de Ray lui-même, et Anyscale n'est pas un cloud."
  - id: pipeline-heterogene
    prompt: "Un pipeline prétraite des images sur CPU puis applique un modèle sur GPU. Que permet Ray ?"
    answer: "Faire tourner les deux étapes dans un même cluster, en demandant CPU ou GPU"
    decoys:
      - "Obliger les deux étapes à utiliser le même type de machine pour rester synchronisées"
      - "Exécuter le prétraitement sur le GPU, plus rapide quelle que soit l'étape"
    why: "On déclare les ressources demandées, et l'ordonnanceur place chaque étape là où elles sont disponibles."
  - id: entrainement-pytorch
    prompt: "Quel lien entre Ray et PyTorch ?"
    answer: "Ray Train répartit un entraînement PyTorch sur plusieurs machines et GPU"
    decoys:
      - "Ray remplace PyTorch, qu'il réimplémente pour les clusters"
      - "PyTorch est requis pour utiliser Ray, qui ne fonctionne qu'avec lui"
    why: "Ray s'associe à PyTorch plutôt qu'il ne le remplace. Il sert aussi hors du deep learning."
  - id: vllm-ray
    prompt: "Pourquoi vLLM peut-il s'appuyer sur Ray ?"
    answer: "Pour répartir un modèle sur plusieurs nœuds"
    decoys:
      - "Pour compresser les poids du modèle avant qu'il soit chargé en mémoire"
      - "Pour stocker les embeddings dans une base vectorielle intégrée à Ray"
    why: "Quand un modèle ne tient pas sur un nœud, Ray répartit son exécution. La compression et le stockage vectoriel ne sont pas son rôle."
  - id: poste-vers-cluster
    prompt: "Qu'est-ce qui attire une équipe ML vers Ray plutôt que vers un autre moteur ?"
    answer: "Passer de son poste au cluster sans changer de langage ni de modèle de programmation"
    decoys:
      - "Écrire toutes les transformations en SQL, comme dans un entrepôt de données"
      - "Réécrire son code en Scala pour profiter de la machine virtuelle Java"
    why: "Avec Ray, on garde du Python ordinaire, décoré pour s'exécuter à distance. SQL et Scala sont plutôt le territoire de Spark."
  - id: sans-equipe-cluster
    prompt: "Aucune équipe n'est disponible pour opérer un cluster Ray. Que faire ?"
    answer: "Passer par une offre managée, ou réduire le besoin"
    decoys:
      - "Installer Ray sur chaque poste de développeur : sans cluster partagé, rien à opérer"
      - "Choisir Spark, qui n'exige aucune exploitation puisqu'il s'administre tout seul"
    why: "Un cluster demande de l'exploitation. Ray sur des postes isolés ne répartit rien, et Spark s'opère aussi."
  - id: tableaux-en-sql
    prompt: "Des transformations massives de données tabulaires, écrites en SQL. Ray est-il le bon choix ?"
    answer: "Plutôt non : un entrepôt de données ou Spark sont plus naturels"
    decoys:
      - "Oui : Ray exécute le SQL plus vite que tout entrepôt, grâce aux acteurs"
      - "Oui : Ray Serve est conçu pour les transformations de tableaux en SQL"
    why: "Ray est généraliste et orienté Python et ML. Le SQL distribué est le terrain des entrepôts et de Spark ; Ray Serve sert des modèles."
  - id: ray-core
    prompt: "Que désigne Ray Core ?"
    answer: "Le socle (tâches, acteurs, ressources) sur lequel s'appuient les bibliothèques de Ray"
    decoys:
      - "Le nœud de tête du cluster, qui exécute seul toutes les tâches"
      - "Le tableau de bord web qui affiche l'état du cluster en temps réel"
    why: "Ray Core fournit les briques de base. Data, Train, Tune et Serve sont construits au-dessus."
  - id: reference-future
    prompt: "Que représente la référence renvoyée par l'appel d'une tâche Ray ?"
    answer: "Le futur résultat de la tâche, qu'on peut aussi passer à d'autres tâches"
    decoys:
      - "L'identifiant du nœud qui exécute la tâche, utile pour la relancer en cas d'échec"
      - "Une adresse HTTP où le résultat sera publié une fois la tâche terminée"
    why: "C'est une promesse de résultat, non une adresse. On peut la transmettre à d'autres tâches pour chaîner les calculs."
  - id: decorer
    prompt: "Que faut-il faire pour distribuer une fonction Python avec Ray ?"
    answer: "La décorer ; le reste du code reste du Python ordinaire"
    decoys:
      - "La réécrire sous forme de requête SQL ou d'opérations sur des DataFrames"
      - "La compiler en bytecode Java avant de l'envoyer au cluster"
    why: "Ray distribue du Python presque tel quel. Le SQL et les DataFrames sont l'approche de Spark."
  - id: multi-gpu-ml
    prompt: "Entraînement multi-GPU et inférence par lots à grande échelle en Python : Spark ou Ray ?"
    answer: "Ray, plus généraliste et orienté Python et ML (GPU, entraînement, inférence)"
    decoys:
      - "Spark, référence du traitement de données distribué en SQL et en DataFrames"
      - "Ni l'un ni l'autre : ces charges ne sont pas distribuables"
    why: "Spark brille sur le SQL et les DataFrames. Ray vise les charges de ML sur GPU, qui sont bel et bien distribuables."
  - id: lot-ou-ligne
    prompt: "Quelles bibliothèques Ray pour l'inférence par lots hors ligne, et pour un service de modèle en ligne ?"
    answer: "Ray Data pour le lot, Ray Serve pour le service en ligne"
    decoys:
      - "Ray Serve pour le lot, Ray Data pour le service en ligne"
      - "Ray Tune pour le lot, Ray Train pour le service en ligne"
    why: "Ray Data traite des données en flux, Ray Serve expose des modèles. Tune optimise les hyperparamètres et Train entraîne."
  - id: cout-adoption
    prompt: "Quel coût cache l'adoption de Ray, malgré une licence libre ?"
    answer: "Un cluster à opérer, ce qui demande une équipe"
    decoys:
      - "Une licence payante par nœud dès que le cluster dépasse quelques machines"
      - "Une réécriture complète du code, qui doit passer en Scala"
    why: "Le code est libre et reste en Python. Le coût réel est l'exploitation d'un cluster, d'où l'intérêt d'une offre managée."
  - id: ray-tune-usage
    prompt: "Des centaines de combinaisons d'hyperparamètres à essayer pour un modèle. Quelle bibliothèque Ray utiliser ?"
    answer: "Ray Tune, qui répartit les essais sur le cluster"
    decoys:
      - "Ray Serve, qui répartit les essais entre plusieurs réplicas du modèle"
      - "Ray Data, qui répartit les essais comme autant de lignes à traiter"
    why: "Ray Tune est la bibliothèque d'optimisation d'hyperparamètres. Serve sert des modèles et Data traite des données en flux."
---
