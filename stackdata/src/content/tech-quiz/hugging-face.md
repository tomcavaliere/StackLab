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
  - id: spaces
    prompt: "À quoi servent les Spaces du Hub de Hugging Face ?"
    answer: "À héberger des applications de démonstration autour d'un modèle"
    decoys:
      - "À réserver des GPU dédiés pour servir un modèle à fort trafic en production"
      - "À stocker des jeux de données volumineux dans un format propriétaire de la plateforme"
    why: "Un Space est une application de démonstration hébergée sur le Hub. Le service dédié est celui des Inference Endpoints ; les jeux de données ont leurs propres dépôts."
  - id: depot-git
    prompt: "Qu'implique le fait que les dépôts du Hub soient versionnés sur Git ?"
    answer: "On peut retrouver l'historique des modifications d'un modèle ou d'un jeu de données"
    decoys:
      - "Les poids sont obligatoirement stockés en clair dans le texte des commits"
      - "Seul le code source du modèle est versionné, jamais les poids ni les données"
    why: "Un dépôt du Hub garde l'historique de ses fichiers, poids compris, comme un dépôt Git. On peut donc s'y référer à une version précise."
  - id: pipeline
    prompt: "À quoi sert `pipeline` dans la bibliothèque transformers ?"
    answer: "Lancer l'inférence d'un modèle en quelques lignes"
    decoys:
      - "Planifier l'entraînement d'un modèle sur plusieurs machines de façon automatique"
      - "Publier un modèle sur le Hub avec sa carte et sa licence"
    why: "`pipeline` charge un modèle et l'applique à une entrée en quelques lignes. L'entraînement passe par `Trainer`."
  - id: trainer
    prompt: "Quel élément de transformers sert à entraîner ou affiner un modèle ?"
    answer: "Trainer"
    decoys:
      - "pipeline, qui est réservé à l'inférence sur des entrées simples"
      - "Spaces, qui lance l'entraînement depuis l'interface web du Hub"
    why: "`Trainer` prend en charge la boucle d'entraînement. `pipeline` n'est prévu que pour l'inférence, et les Spaces hébergent des démonstrations."
  - id: datasets
    prompt: "À quoi sert la bibliothèque `datasets` de Hugging Face ?"
    answer: "Charger des jeux de données depuis le Hub"
    decoys:
      - "Classer automatiquement des tables SQL par niveau de confidentialité"
      - "Annoter à la main des images pour préparer un entraînement supervisé"
    why: "`datasets` charge et manipule les jeux de données publiés sur le Hub, en complément de transformers pour les modèles."
  - id: inference-providers
    prompt: "En quoi Inference Providers diffère-t-il des Inference Endpoints ?"
    answer: "Il donne un accès à la requête, sans infrastructure dédiée à réserver"
    decoys:
      - "Il impose de télécharger le modèle et de l'exécuter sur sa propre machine"
      - "Il n'est destiné qu'aux modèles gated, réservés aux abonnés d'une organisation"
    why: "Les Endpoints déploient un modèle sur une infrastructure dédiée ; Providers permet d'appeler des modèles à la requête. Aucune des deux offres ne se limite aux modèles gated."
  - id: depot-prive
    prompt: "Peut-on garder un modèle ou un jeu de données privé sur le Hub ?"
    answer: "Oui, au sein d'une organisation ou pour soi seul"
    decoys:
      - "Non : tout dépôt du Hub est public dès sa création"
      - "Oui, mais seulement via les Inference Endpoints, qui sont les seuls à gérer l'accès"
    why: "Le Hub permet de partager des modèles et des jeux de données en public ou en privé, par exemple au sein d'une organisation."
  - id: poids-ouverts
    prompt: "Un modèle propriétaire accessible seulement par une API hébergée est-il téléchargeable sur le Hub ?"
    answer: "En général non : le Hub héberge surtout des modèles dont les poids sont publiés"
    decoys:
      - "Oui : le Hub héberge une copie de chaque modèle d'API commerciale majeure"
      - "Oui, mais uniquement dans une version quantifiée prévue pour un usage local"
    why: "Le Hub distribue des modèles à poids ouverts, avec leur licence. Les modèles accessibles seulement par une API ne publient pas leurs poids."
  - id: comparer
    prompt: "Quel usage du Hub aide à choisir entre plusieurs modèles ouverts pour une tâche ?"
    answer: "Lire leurs cartes, leurs licences et leurs limites déclarées"
    decoys:
      - "Prendre le plus téléchargé, qui est forcément le mieux adapté"
      - "Se fier au nom du modèle, qui indique toujours sa langue et sa licence"
    why: "La carte du modèle documente usage prévu, limites, biais et licence. La popularité ne garantit pas l'adéquation à son cas, qu'il faut mesurer."
  - id: gated-licence
    prompt: "Un modèle gated exige d'accepter des conditions avant téléchargement. Que faut-il en conclure pour l'équipe juridique ?"
    answer: "Ces conditions et la licence du modèle sont à relire avant tout usage"
    decoys:
      - "L'acceptation vaut autorisation d'usage commercial, quel que soit le projet"
      - "Aucune vérification n'est nécessaire, Hugging Face ayant déjà validé le modèle"
    why: "Accepter l'accès ne dispense pas de lire la licence, parfois restrictive. Hugging Face héberge le modèle, mais l'usage reste soumis aux conditions de son auteur."
  - id: transformers-vllm
    prompt: "Quel lien existe entre la définition des modèles de transformers et vLLM ?"
    answer: "vLLM charge les modèles du Hub au format de transformers"
    decoys:
      - "vLLM est une extension de transformers, développée par Hugging Face"
      - "vLLM n'accepte que des modèles convertis dans un format qui lui est propre"
    why: "La définition des modèles de transformers est reprise par d'autres outils, dont vLLM, qui sert les modèles du Hub sans les réécrire."
  - id: pytorch
    prompt: "Avec quel framework s'exécutent et s'entraînent la plupart des modèles de transformers ?"
    answer: "PyTorch"
    decoys:
      - "Kubernetes, qui gère la boucle d'entraînement"
      - "PostgreSQL, qui stocke les tenseurs et leurs gradients"
    why: "La plupart des modèles de transformers s'appuient sur PyTorch. Kubernetes ou PostgreSQL ne font pas ces calculs."
  - id: prototypage
    prompt: "Quel usage correspond le mieux à la bibliothèque transformers ?"
    answer: "Prototyper un modèle ou l'affiner en Python"
    decoys:
      - "Absorber un trafic massif de requêtes simultanées sur un serveur de production"
      - "Gérer les files de messages entre deux services backend"
    why: "transformers est un outil de prototypage et d'entraînement en Python. Le fort trafic relève d'un moteur d'inférence comme vLLM."
  - id: cle-api
    prompt: "Qu'est-ce qui distingue l'usage d'un modèle du Hub exécuté chez soi d'une API hébergée comme celle d'OpenAI ?"
    answer: "On gère soi-même le matériel et l'exécution du modèle"
    decoys:
      - "On obtient des réponses de meilleure qualité, car le modèle est plus récent"
      - "On n'a aucune licence à respecter, le modèle étant téléchargé"
    why: "Un modèle téléchargé se charge et s'exécute sur ses propres machines, avec leur coût et leur exploitation. La qualité dépend du modèle, et la licence s'applique toujours."
  - id: embeddings
    prompt: "Peut-on trouver sur le Hub des modèles autres que des LLM de génération de texte ?"
    answer: "Oui : vision, audio, embeddings, entre autres"
    decoys:
      - "Non : le Hub est réservé aux modèles de génération de texte"
      - "Oui, mais seulement des modèles d'images, sans aucun modèle de texte"
    why: "Le Hub héberge des modèles de texte, de vision, d'audio et d'embeddings, ainsi que des jeux de données."
  - id: demarrage-ml
    prompt: "Pourquoi repartir d'un modèle du Hub plutôt que d'entraîner depuis zéro ?"
    answer: "Un modèle pré-entraîné évite l'essentiel du coût de données et de calcul"
    decoys:
      - "Un modèle du Hub est toujours meilleur qu'un modèle entraîné sur ses propres données"
      - "Entraîner depuis zéro est interdit par les licences des modèles du Hub"
    why: "Repartir d'un modèle pré-entraîné et l'affiner coûte bien moins cher. Rien n'interdit d'entraîner depuis zéro, et ce n'est pas toujours moins bon."
  - id: eviter-licence
    prompt: "Dans quel cas ne faut-il pas utiliser un modèle du Hub sans précaution ?"
    answer: "Quand on vise un usage commercial et qu'on n'a pas lu sa licence"
    decoys:
      - "Quand on veut le tester sur son poste pour un prototype"
      - "Quand on veut lire sa carte pour en comprendre les limites"
    why: "Prototyper ou lire une carte ne pose pas de problème. L'usage commercial, lui, dépend de la licence propre à chaque modèle."
  - id: sans-serveur
    prompt: "Comment exécuter un modèle du Hub sans gérer de serveur soi-même ?"
    answer: "Avec les offres payantes d'exécution proposées par Hugging Face"
    decoys:
      - "En téléchargeant le modèle depuis un Space, qui l'exécute gratuitement et sans limite"
      - "En installant transformers, qui fournit à lui seul un serveur optimisé pour le débit"
    why: "Les Inference Endpoints et Inference Providers sont les offres payantes prévues pour cela. transformers seul n'est pas un serveur de production."
  - id: dependance
    prompt: "Un projet de production dépend d'un modèle du Hub. Quelle précaution est utile ?"
    answer: "Vérifier la licence et fixer la version du modèle utilisée"
    decoys:
      - "Aucune : un dépôt du Hub ne change jamais une fois publié"
      - "Utiliser uniquement des modèles sans carte, pour éviter des contraintes d'usage"
    why: "Un dépôt est versionné et peut évoluer : on le référence à une version précise et on lit sa licence avant la mise en production."
  - id: pas-un-moteur
    prompt: "Le Hub de Hugging Face est-il un moteur d'inférence pour servir des modèles ?"
    answer: "Non : c'est une plateforme de dépôts, le service passe par d'autres offres ou outils"
    decoys:
      - "Oui : chaque dépôt de modèle est exécutable directement depuis le Hub, sans autre outil"
      - "Oui, mais seulement pour les modèles de la bibliothèque transformers"
    why: "Le Hub héberge et distribue modèles et jeux de données. Pour les exécuter, on utilise transformers, un moteur comme vLLM, ou les offres payantes (Endpoints, Providers)."
---
