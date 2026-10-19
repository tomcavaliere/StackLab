---
questions:
  - id: origine
    prompt: "Quelle entreprise a créé TensorFlow ?"
    answer: "Google"
    decoys:
      - "Meta (Facebook)"
      - "Microsoft"
    why: "TensorFlow vient de Google, open-source depuis 2015. PyTorch vient de Facebook AI Research."
  - id: keras
    prompt: "Quel est le rôle de Keras dans TensorFlow ?"
    answer: "L'API haut niveau pour décrire et entraîner un modèle"
    decoys:
      - "Le serveur qui expose les modèles entraînés derrière une API en production"
      - "Le format de fichier utilisé pour exécuter un modèle sur mobile"
    why: "Depuis TensorFlow 2, Keras est l'API recommandée : on empile des couches, puis fit entraîne. TF Serving sert les modèles, LiteRT les exécute sur mobile."
  - id: keras-3
    prompt: "Qu'a changé Keras 3 ?"
    answer: "Il est multi-backend : le même code tourne sur TensorFlow, JAX ou PyTorch"
    decoys:
      - "Il a été retiré de TensorFlow et remplacé par une API en JavaScript"
      - "Il ne fonctionne plus que sur les TPU de Google Cloud"
    why: "Keras 3 découple l'API de son moteur : TensorFlow, JAX ou PyTorch peuvent exécuter le même modèle."
  - id: tf2-eager
    prompt: "Quel changement majeur TensorFlow 2 (2019) a-t-il apporté ?"
    answer: "L'exécution immédiate par défaut et Keras comme API principale"
    decoys:
      - "L'abandon du GPU au profit du seul CPU"
      - "Le passage à une licence propriétaire réservée à Google Cloud"
    why: "TensorFlow 2 a rendu l'exécution immédiate par défaut, comme PyTorch, et fait de Keras l'API recommandée. Le projet reste open-source et utilise toujours les GPU."
  - id: litert
    prompt: "Qu'est-ce que LiteRT ?"
    answer: "Le nouveau nom de TensorFlow Lite, pour exécuter des modèles sur mobile et embarqué"
    decoys:
      - "Une version allégée de Keras réservée à l'apprentissage des débutants"
      - "Le service managé de Google Cloud pour entraîner des modèles TensorFlow"
    why: "LiteRT (anciennement TensorFlow Lite) fait tourner des modèles sur téléphones et appareils embarqués. C'est l'un des points forts de TensorFlow pour le déploiement."
  - id: tf-serving
    prompt: "À quoi sert TF Serving ?"
    answer: "Servir des modèles entraînés derrière une API"
    decoys:
      - "Entraîner un modèle dans le navigateur de l'utilisateur"
      - "Héberger des notebooks Jupyter partagés entre data scientists"
    why: "TF Serving est le serveur d'inférence de TensorFlow : il expose les modèles en production. Le navigateur, c'est TensorFlow.js."
  - id: navigateur
    prompt: "Faire tourner un modèle directement dans le navigateur : quel outil de l'écosystème TensorFlow ?"
    answer: "TensorFlow.js"
    decoys:
      - "TF Serving"
      - "Keras 3 avec le backend JAX"
    why: "TensorFlow.js exécute des modèles en JavaScript dans le navigateur. TF Serving tourne côté serveur, JAX est un backend Python."
  - id: tendance-recherche
    prompt: "Pour un nouveau projet de recherche en deep learning, quelle tendance observe-t-on ces dernières années ?"
    answer: "PyTorch s'est imposé comme le choix le plus courant"
    decoys:
      - "TensorFlow est devenu l'unique framework accepté dans les publications"
      - "Les deux frameworks ont été abandonnés au profit de scikit-learn"
    why: "Ces dernières années, PyTorch domine les nouveaux projets de recherche et l'écosystème Hugging Face. TensorFlow reste présent, notamment là où il est déjà en place et pour le déploiement."
  - id: quand-le-garder
    prompt: "Dans quel cas TensorFlow reste-t-il un choix naturel ?"
    answer: "Un projet existant en TensorFlow, ou un déploiement mobile et embarqué"
    decoys:
      - "Une analyse de quelques milliers de lignes dans un fichier CSV"
      - "Un simple appel à un modèle de langage hébergé chez un fournisseur externe, via son API"
    why: "L'existant, les compétences et l'outillage de déploiement (LiteRT, TensorFlow.js) justifient TensorFlow. Pour un petit CSV ou un appel d'API, il est surdimensionné."
  - id: tpu
    prompt: "Sur quel matériel spécifique à Google Cloud TensorFlow peut-il entraîner des modèles ?"
    answer: "Les TPU"
    decoys:
      - "Les FPGA"
      - "Les processeurs ARM des téléphones"
    why: "Les TPU sont les accélérateurs conçus par Google pour le machine learning, disponibles dans Google Cloud ; TensorFlow les exploite en plus des CPU et GPU."
  - id: sequential
    prompt: "Avec Keras, que fait un modèle Sequential ?"
    answer: "Il empile des couches, la sortie de l'une alimentant la suivante"
    decoys:
      - "Il entraîne les couches une par une, du début à la fin du réseau, sans retour en arrière"
      - "Il range les prédictions dans l'ordre d'arrivée des requêtes pour les servir en production"
    why: "Sequential est la manière la plus simple de décrire un réseau en ligne droite. L'entraînement, lui, ajuste toutes les couches ensemble, et le service des requêtes est le rôle de TF Serving."
  - id: compile
    prompt: "Dans Keras, que précise l'appel à model.compile ?"
    answer: "La fonction de perte, l'optimiseur et les métriques à suivre"
    decoys:
      - "Le code machine généré pour le GPU, qui rend le modèle enfin exécutable"
      - "Le format de fichier final dans lequel le modèle sera exporté après l'entraînement"
    why: "compile configure l'entraînement : perte, optimiseur, métriques. L'export se fait avec la sauvegarde du modèle, et le placement sur le matériel n'est pas son rôle."
  - id: fit-evaluate
    prompt: "Dans Keras, quelle différence entre fit et evaluate ?"
    answer: "fit entraîne le modèle ; evaluate mesure sa performance sur des données"
    decoys:
      - "fit mesure la performance du modèle ; evaluate l'entraîne sur les données fournies"
      - "fit prépare les données d'entrée ; evaluate déploie le modèle sur un serveur de production"
    why: "fit ajuste les poids, evaluate calcule la perte et les métriques sans les modifier. Le déploiement relève d'autres outils comme TF Serving."
  - id: gradient-tape
    prompt: "À quoi sert tf.GradientTape dans TensorFlow ?"
    answer: "Enregistrer les opérations pour calculer ensuite des gradients"
    decoys:
      - "Écrire les résultats d'entraînement sur disque pour les consulter dans TensorBoard"
      - "Mesurer le temps passé dans chaque couche pour repérer les parties lentes du modèle"
    why: "GradientTape est l'équivalent de la différentiation automatique : il note ce qui est calculé, puis en déduit les gradients. Le suivi visuel, c'est TensorBoard."
  - id: tf-function
    prompt: "Que fait le décorateur tf.function ?"
    answer: "Il transforme une fonction Python en graphe de calcul TensorFlow optimisé"
    decoys:
      - "Il force l'exécution du code ligne à ligne pour faciliter le débogage"
      - "Il convertit la fonction en JavaScript pour l'exécuter dans un navigateur"
    why: "tf.function suit la fonction une fois pour en tirer un graphe plus rapide à exécuter. Le mode ligne à ligne est l'exécution immédiate, et le navigateur relève de TensorFlow.js."
  - id: tf1
    prompt: "Qu'est-ce qui distinguait TensorFlow 1 de TensorFlow 2 ?"
    answer: "Il fallait d'abord construire un graphe statique, puis l'exécuter dans une session"
    decoys:
      - "Il n'était pas open-source et restait réservé aux clients de Google Cloud"
      - "Il ne savait calculer que sur CPU, le GPU n'étant pas encore pris en charge"
    why: "Avant TensorFlow 2, on décrivait le graphe puis on le lançait dans une session, ce qui rendait le débogage pénible. TensorFlow 2 a rendu l'exécution immédiate par défaut."
  - id: savedmodel
    prompt: "Quel est le rôle du format SavedModel de TensorFlow ?"
    answer: "Sauvegarder un modèle entraîné pour le recharger ou le servir plus tard"
    decoys:
      - "Stocker les données d'entraînement dans un format compressé lisible par pandas"
      - "Décrire uniquement la liste des hyperparamètres essayés lors d'une recherche de réglages"
    why: "SavedModel est le format d'export d'un modèle entraîné, notamment utilisé pour le servir avec TF Serving. Les données d'entraînement et les hyperparamètres testés sont d'autres fichiers."
  - id: tf-data
    prompt: "À quoi sert tf.data ?"
    answer: "Construire des pipelines d'entrée : lecture, transformation et mise en lots des données"
    decoys:
      - "Stocker les jeux de données dans une base relationnelle managée de Google Cloud"
      - "Étiqueter automatiquement les exemples avant l'entraînement, sans intervention humaine"
    why: "tf.data alimente le modèle avec des données lues, transformées et regroupées en lots. Ce n'est ni une base de données ni un outil d'étiquetage."
  - id: tensorboard
    prompt: "À quoi sert TensorBoard ?"
    answer: "Visualiser le suivi d'un entraînement : courbes de perte, métriques, graphe du modèle"
    decoys:
      - "Servir le modèle entraîné derrière une API HTTP en production"
      - "Exécuter le modèle sur un téléphone avec une faible empreinte mémoire"
    why: "TensorBoard sert à observer un entraînement. Servir un modèle est le rôle de TF Serving, l'exécuter sur mobile celui de LiteRT."
  - id: early-stopping
    prompt: "À quoi sert le callback EarlyStopping de Keras ?"
    answer: "Arrêter l'entraînement quand la métrique surveillée cesse de s'améliorer"
    decoys:
      - "Arrêter le serveur de modèles quand il ne reçoit plus de requêtes depuis un moment"
      - "Supprimer du réseau les couches dont l'effet sur la sortie est le plus faible"
    why: "Les callbacks s'accrochent à la boucle de fit ; EarlyStopping coupe l'entraînement avant que le modèle ne sur-apprenne. Il n'élague pas le réseau et ne touche pas au serveur."
  - id: tfx
    prompt: "Que vise TFX (TensorFlow Extended) ?"
    answer: "Construire des pipelines de ML de production : données, entraînement, déploiement"
    decoys:
      - "Étendre Keras avec de nouvelles couches expérimentales réservées à la recherche"
      - "Exécuter TensorFlow dans des navigateurs anciens, sans carte graphique ni JavaScript moderne"
    why: "TFX regroupe des composants pour industrialiser les modèles TensorFlow, de la validation des données au déploiement. Le navigateur est le domaine de TensorFlow.js."
  - id: distribute
    prompt: "Comment répartir un entraînement TensorFlow sur plusieurs GPU ?"
    answer: "Avec tf.distribute, qui propose des stratégies de distribution"
    decoys:
      - "Avec TF Serving, qui répartit aussi la charge d'entraînement entre les machines"
      - "Avec LiteRT, qui découpe le modèle entre les cartes graphiques disponibles"
    why: "tf.distribute fournit les stratégies pour entraîner sur plusieurs GPU ou machines. TF Serving et LiteRT servent à déployer, pas à entraîner."
  - id: quantification
    prompt: "Pourquoi réduire la précision des poids (quantification) avant un déploiement avec LiteRT ?"
    answer: "Pour obtenir un modèle plus petit et plus rapide sur un appareil aux ressources limitées"
    decoys:
      - "Pour que le modèle puisse apprendre de nouvelles données directement sur le téléphone de l'utilisateur"
      - "Pour rendre le modèle plus précis qu'avant sur des images prises en basse résolution"
    why: "La quantification stocke les poids avec moins de bits : le modèle pèse moins et tourne plus vite sur mobile ou embarqué, au prix d'une petite perte de précision possible. Elle ne rend pas le modèle meilleur."
  - id: mobile-hors-ligne
    prompt: "Une application mobile doit reconnaître des fleurs sur l'appareil, sans réseau. Quel outil de l'écosystème TensorFlow choisir ?"
    answer: "LiteRT"
    decoys:
      - "TF Serving, déployé sur un serveur distant que l'application interroge"
      - "TensorBoard, qui exécute le modèle et affiche ses résultats à l'écran"
    why: "LiteRT (ex-TensorFlow Lite) exécute les modèles sur l'appareil. TF Serving suppose un serveur et du réseau, TensorBoard n'est qu'un outil de suivi."
  - id: tfjs-donnees
    prompt: "Quel avantage à exécuter un modèle avec TensorFlow.js dans le navigateur ?"
    answer: "Les données de l'utilisateur peuvent rester sur son appareil, sans aller-retour avec un serveur"
    decoys:
      - "L'entraînement y est toujours plus rapide que sur les GPU d'un centre de données"
      - "Le modèle n'a plus besoin d'être entraîné au préalable, il apprend en ligne"
    why: "Le calcul se fait chez l'utilisateur : pas d'envoi de ses données à un serveur. Cela ne rend pas l'entraînement plus rapide et ne dispense pas d'entraîner le modèle."
  - id: keras-applications
    prompt: "Que fournit keras.applications ?"
    answer: "Des architectures connues avec des poids pré-entraînés, pour le transfer learning"
    decoys:
      - "Des applications web prêtes à l'emploi qui exposent un modèle derrière une interface"
      - "Des modèles de langage hébergés, appelés par API et facturés à la requête"
    why: "keras.applications propose des modèles classiques déjà entraînés, que l'on adapte à son cas. Ce n'est ni une application web ni un service hébergé."
  - id: deploiement-vs-pytorch
    prompt: "Sur le déploiement, quel est le positionnement de TensorFlow face à PyTorch ?"
    answer: "Un outillage de déploiement réputé : serveur, mobile, navigateur"
    decoys:
      - "TensorFlow n'a aucun outil de déploiement : tout est à écrire soi-même"
      - "TensorFlow ne sert qu'à la recherche, et PyTorch est le seul à permettre un déploiement"
    why: "TF Serving, LiteRT et TensorFlow.js couvrent serveur, mobile et navigateur : c'est son point fort. PyTorch se déploie aussi, mais l'outillage de TensorFlow est plus ancien et mature sur mobile."
  - id: migration
    prompt: "Une équipe a plusieurs modèles en production avec TensorFlow et TF Serving. Faut-il tout migrer vers PyTorch par principe ?"
    answer: "Non : l'existant, les compétences et l'outillage comptent plus que le choix initial"
    decoys:
      - "Oui : TensorFlow est abandonné et ne reçoit plus aucune mise à jour"
      - "Oui : TF Serving ne sait pas charger les modèles entraînés avec Keras"
    why: "Un projet déjà construit sur TensorFlow n'a pas de raison technique de migrer. TensorFlow reste maintenu, et TF Serving charge des modèles Keras."
  - id: tabulaire
    prompt: "Prédire la résiliation de clients à partir de quelques colonnes d'un fichier : TensorFlow est-il le bon outil ?"
    answer: "Plutôt non : scikit-learn ou XGBoost suffisent, un réseau de neurones est surdimensionné"
    decoys:
      - "Oui : Keras est le seul moyen de faire de la classification en Python"
      - "Oui : plus le modèle est profond, plus le résultat est meilleur sur un tableau de données"
    why: "Sur des données tabulaires simples, les modèles classiques et le gradient boosting font souvent aussi bien, avec moins de code. Un réseau profond y est surdimensionné."
  - id: hf-recherche
    prompt: "Pourquoi les nouveaux projets autour de modèles de langage ouverts partent-ils plutôt sur PyTorch que sur TensorFlow ?"
    answer: "Parce que l'écosystème Hugging Face repose en grande partie sur PyTorch"
    decoys:
      - "Parce que TensorFlow ne sait pas manipuler des tenseurs de grande taille"
      - "Parce que TensorFlow devient payant au-delà d'un certain nombre d'utilisateurs"
    why: "La tendance observée ces dernières années s'explique par l'écosystème : la bibliothèque Transformers et les modèles du Hub s'utilisent surtout avec PyTorch. TensorFlow reste open-source et gratuit."
---
