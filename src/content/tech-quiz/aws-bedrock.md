---
questions:
  - id: role
    prompt: "Qu'est-ce qu'Amazon Bedrock ?"
    answer: "Un service AWS qui donne accès à des modèles de fondation de plusieurs éditeurs"
    decoys:
      - "Un service AWS pour entraîner ses propres modèles sur des instances à GPU"
      - "Une base vectorielle managée d'AWS pour stocker et comparer des embeddings de texte"
    why: "Bedrock sert des modèles prêts à l'emploi par API. L'entraînement de ses propres modèles relève de SageMaker."
  - id: vs-sagemaker
    prompt: "Quelle différence entre Bedrock et SageMaker ?"
    answer: "Bedrock sert des modèles prêts à l'emploi, SageMaker entraîne et héberge les siens"
    decoys:
      - "Bedrock est réservé au texte, SageMaker aux images et à la vidéo"
      - "Bedrock est la nouvelle version de SageMaker, qui va disparaître à terme du catalogue"
    why: "Bedrock vise l'usage de modèles de fondation par API ; SageMaker couvre tout le cycle d'un modèle qu'on entraîne et déploie soi-même."
  - id: converse
    prompt: "À quoi sert l'API Converse de Bedrock ?"
    answer: "Offrir une interface commune pour converser avec différents modèles"
    decoys:
      - "Traduire les conversations entre deux langues sans modèle de langage"
      - "Enregistrer les conversations des utilisateurs dans S3 pour l'audit"
    why: "Converse uniformise les échanges (messages, outils) : on change de modèle sans réécrire l'appel."
  - id: knowledge-bases
    prompt: "Que gèrent les Knowledge Bases de Bedrock ?"
    answer: "Un RAG managé, de l'indexation de documents à la récupération des passages"
    decoys:
      - "Le fine-tuning automatique du modèle sur les documents de l'entreprise"
      - "Un annuaire des modèles disponibles avec leurs prix par région"
    why: "Les Knowledge Bases indexent des documents (par exemple dans S3) et récupèrent les passages pertinents : le modèle n'est pas réentraîné."
  - id: guardrails
    prompt: "À quoi servent les Guardrails de Bedrock ?"
    answer: "Filtrer les entrées et les sorties des modèles selon des règles configurées"
    decoys:
      - "Limiter le nombre d'appels par seconde et par utilisateur pour maîtriser la facture"
      - "Empêcher la suppression accidentelle des modèles du compte"
    why: "Les Guardrails bloquent des sujets interdits, masquent des données personnelles, filtrent des contenus, en entrée comme en sortie."
  - id: authentification
    prompt: "Comment s'authentifie-t-on auprès de Bedrock ?"
    answer: "Avec les identités et droits IAM du compte AWS"
    decoys:
      - "Avec une clé d'API distincte demandée à chaque éditeur de modèle"
      - "Avec un compte personnel créé sur le site de l'éditeur choisi"
    why: "Bedrock est un service AWS : droits IAM, facturation et journalisation sont ceux du compte, quel que soit l'éditeur du modèle."
  - id: interet-aws
    prompt: "Pour quelle organisation Bedrock est-il le plus naturel ?"
    answer: "Une organisation déjà sur AWS, qui veut les LLM dans le même cadre de sécurité"
    decoys:
      - "Une start-up sans cloud, qui veut éviter toute dépendance fournisseur"
      - "Une équipe de recherche qui veut entraîner son propre LLM depuis zéro sur ses GPU"
    why: "Son intérêt est l'intégration à AWS (IAM, réseau, facturation). Sans AWS, l'API directe d'un éditeur est plus simple."
  - id: catalogue
    prompt: "Que faut-il vérifier avant de choisir un modèle sur Bedrock ?"
    answer: "Qu'il est disponible dans la région visée, car le catalogue varie"
    decoys:
      - "Rien : tous les modèles du marché sont disponibles partout sur Bedrock"
      - "Qu'il est écrit en Python, seul langage pris en charge par le service"
    why: "Le catalogue évolue et dépend de la région ; c'est important quand les données doivent rester dans une zone géographique."
  - id: nouveautes
    prompt: "Pourquoi appeler directement l'éditeur d'un modèle plutôt que Bedrock ?"
    answer: "Les nouvelles fonctionnalités peuvent y arriver avant Bedrock"
    decoys:
      - "Bedrock interdit d'appeler un modèle depuis du code applicatif"
      - "Les modèles servis par Bedrock sont des versions réduites des originaux"
    why: "Le décalage éventuel des fonctionnalités récentes est à vérifier au cas par cas ; les modèles eux-mêmes ne sont pas des versions réduites."
  - id: rag-confidentiel
    prompt: "Assistant sur des documents confidentiels, dans une entreprise sur AWS : quel intérêt de Bedrock ?"
    answer: "Les appels restent dans le compte AWS, la région et les droits déjà contrôlés"
    decoys:
      - "Bedrock rend les modèles incapables d'halluciner sur ces documents"
      - "Bedrock dispense de filtrer les documents selon les droits des employés"
    why: "Bedrock répond au besoin de savoir où partent les données. Il n'empêche pas les hallucinations, et le filtrage par droits reste à faire dans la recherche."
  - id: agents
    prompt: "À quoi servent les Agents de Bedrock ?"
    answer: "Un modèle appelle des actions (fonctions, API) pour accomplir une tâche"
    decoys:
      - "Des programmes installés sur les serveurs pour surveiller leur consommation de ressources"
      - "Des conseillers humains AWS qui configurent les modèles pour le compte du client"
    why: "Les Agents laissent un modèle déclencher des actions. Ils ne supervisent pas d'infrastructure."
  - id: fine-tuning
    prompt: "Peut-on personnaliser un modèle sur Bedrock avec ses propres données ?"
    answer: "Oui, pour certains modèles, avec des données lues dans S3"
    decoys:
      - "Non, jamais : les modèles de Bedrock ne se personnalisent d'aucune façon"
      - "Oui, pour tous les modèles, sans condition ni stockage particulier"
    why: "La personnalisation (fine-tuning) existe pour certains modèles seulement, et les données viennent de S3."
  - id: source-kb
    prompt: "Où sont lus les documents indexés par les Knowledge Bases ?"
    answer: "Dans S3"
    decoys:
      - "Dans les disques locaux des postes des employés"
      - "Dans la mémoire du modèle, sans stockage séparé"
    why: "Les Knowledge Bases indexent des documents stockés dans S3 puis récupèrent les passages pertinents."
  - id: evaluation-modeles
    prompt: "Bedrock aide-t-il à évaluer des modèles ?"
    answer: "Oui, l'évaluation de modèles fait partie de ses fonctions"
    decoys:
      - "Non, il ne fait qu'exécuter des appels sans aucune mesure possible"
      - "Seulement via SageMaker, jamais depuis Bedrock lui-même"
    why: "Autour des modèles, Bedrock propose aussi de l'évaluation, à côté de la personnalisation, des agents et des garde-fous."
  - id: donnees-chez-aws
    prompt: "Quel besoin de confidentialité Bedrock cherche-t-il à satisfaire ?"
    answer: "Utiliser des LLM sans envoyer ses données hors de son environnement cloud"
    decoys:
      - "Rendre anonymes toutes les données avant leur envoi, sans configuration"
      - "Interdire à l'éditeur du modèle de savoir que son modèle est utilisé"
    why: "Les appels restent dans le cadre du compte AWS ; l'anonymisation reste à configurer avec les Guardrails."
  - id: facturation
    prompt: "Quel avantage de facturation offre Bedrock à une entreprise déjà sur AWS ?"
    answer: "Une facturation sur le compte AWS, sans contrat par éditeur"
    decoys:
      - "L'utilisation gratuite des modèles tant que le compte AWS reste actif"
      - "Une facture séparée de chaque éditeur, regroupée en fin d'année"
    why: "Bedrock évite de signer un contrat avec chaque éditeur : tout passe par le compte AWS."
  - id: pas-de-gpu
    prompt: "Faut-il gérer des GPU pour utiliser les modèles de Bedrock ?"
    answer: "Non : le service est managé"
    decoys:
      - "Oui : il faut réserver ses propres instances à GPU avant le premier appel"
      - "Oui, mais uniquement pour les modèles de texte, pas pour les autres"
    why: "L'intérêt de Bedrock est de ne pas gérer d'infrastructure d'inférence."
  - id: sans-aws
    prompt: "Une équipe n'a aucun service AWS. Que privilégier pour appeler un LLM ?"
    answer: "L'API directe d'un éditeur, plus simple à adopter"
    decoys:
      - "Bedrock, car il est le seul moyen d'accéder aux modèles de fondation"
      - "SageMaker, car il remplace l'API d'un éditeur de modèles"
    why: "Sans AWS, Bedrock ajoute un compte et des droits à gérer pour peu de bénéfice."
  - id: equivalent-gcp
    prompt: "Quel est l'équivalent de Bedrock chez Google Cloud ?"
    answer: "Vertex AI"
    decoys:
      - "BigQuery"
      - "Cloud Storage"
    why: "Vertex AI donne accès aux modèles Gemini et tiers dans l'écosystème Google Cloud. BigQuery est un entrepôt de données, Cloud Storage un stockage objet."
  - id: poids-ouverts
    prompt: "Quand un modèle à poids ouverts très spécifique justifie-t-il de quitter Bedrock ?"
    answer: "Quand il faut le servir avec un contrôle fin, via SageMaker ou un serveur auto-hébergé"
    decoys:
      - "Dès que le modèle est en open source, Bedrock refusant tous les modèles ouverts"
      - "Jamais : Bedrock donne le même contrôle que l'hébergement par soi-même"
    why: "Bedrock sert des modèles prêts à l'emploi ; pour le contrôle fin d'un modèle précis, SageMaker ou un serveur d'inférence donnent plus de prise."
  - id: petite-equipe
    prompt: "Une petite équipe veut un RAG sans le construire. Quelle brique de Bedrock ?"
    answer: "Les Knowledge Bases"
    decoys:
      - "Les Guardrails"
      - "L'API Converse"
    why: "Les Knowledge Bases gèrent indexation et récupération. Les Guardrails filtrent les échanges, Converse uniformise les appels."
  - id: editeurs
    prompt: "Quels éditeurs de modèles trouve-t-on sur Bedrock ?"
    answer: "Plusieurs, comme Anthropic, Meta, Mistral ou Amazon, selon la région"
    decoys:
      - "Uniquement Amazon, qui réserve la plateforme à ses propres modèles"
      - "Uniquement Anthropic, avec lequel AWS a un accord exclusif"
    why: "Le catalogue réunit plusieurs éditeurs et varie selon la région, d'où la vérification avant de choisir."
  - id: changer-modele
    prompt: "Comment changer de modèle sans changer de fournisseur cloud ?"
    answer: "Viser un autre modèle de Bedrock, l'API Converse restant commune"
    decoys:
      - "Ouvrir un nouveau compte AWS dédié à chaque éditeur de modèle"
      - "Réécrire tout le code d'appel avec le SDK propre à l'éditeur"
    why: "Une même API pour plusieurs éditeurs permet de comparer ou de changer de modèle dans le même cadre."
  - id: portee-guardrails
    prompt: "Où s'appliquent les Guardrails de Bedrock ?"
    answer: "Sur les entrées comme sur les sorties du modèle"
    decoys:
      - "Uniquement sur les sorties, après la génération de la réponse"
      - "Uniquement sur les documents indexés par les Knowledge Bases"
    why: "Les filtres de sujets interdits et de données personnelles agissent des deux côtés de l'échange."
  - id: services-communs
    prompt: "Quels éléments Bedrock partage-t-il avec les autres services AWS ?"
    answer: "Droits IAM, réseau privé, journalisation et facturation"
    decoys:
      - "Les modèles, qui sont réutilisables tels quels dans tous les services AWS"
      - "Les clés d'API, que l'on crée une fois pour tous les éditeurs"
    why: "L'intégration au compte AWS est l'argument principal de Bedrock."
  - id: agent-vs-kb
    prompt: "Quelle différence entre un Agent et une Knowledge Base de Bedrock ?"
    answer: "L'Agent déclenche des actions, la Knowledge Base récupère des passages"
    decoys:
      - "L'Agent récupère des passages, la Knowledge Base déclenche des actions"
      - "Ils sont identiques : seul le nom diffère selon la région"
    why: "Un agent agit via des fonctions ou des API ; une base de connaissances fournit au modèle des passages de documents."
  - id: comparer-modeles
    prompt: "Comment comparer plusieurs modèles de fondation sur Bedrock ?"
    answer: "Les appeler par la même API, dans le même compte"
    decoys:
      - "Ouvrir un compte chez chaque éditeur pour obtenir sa clé"
      - "Les entraîner chacun sur ses données, avec ses propres GPU"
    why: "Une API commune et un compte unique permettent de comparer sans changer de cadre."
  - id: fournisseur-direct
    prompt: "Qu'implique d'appeler OpenAI ou un autre éditeur directement, plutôt que via Bedrock ?"
    answer: "Les appels, les droits et la facture sortent du compte AWS"
    decoys:
      - "Les modèles deviennent des versions réduites des originaux"
      - "L'API refuse les clés d'accès qui n'ont pas été émises par AWS"
    why: "Passer en direct ne change pas le modèle mais sort du cadre IAM, réseau et facturation d'AWS."
  - id: modele-fondation
    prompt: "Qu'est-ce qu'un modèle de fondation ?"
    answer: "Un grand modèle préentraîné, utilisable pour de nombreuses tâches"
    decoys:
      - "Un modèle de base de données relationnelle fourni par AWS"
      - "Un petit modèle entraîné par l'entreprise pour une seule tâche"
    why: "Bedrock donne accès à de tels modèles par API, sans qu'on ait à les entraîner."
  - id: plus-de-controle
    prompt: "Quand passe-t-on de Bedrock à SageMaker ?"
    answer: "Quand il faut entraîner ou héberger son propre modèle avec plus de contrôle"
    decoys:
      - "Quand l'application doit simplement appeler un modèle de langage prêt à l'emploi"
      - "Quand les documents doivent être indexés dans S3 pour un assistant"
    why: "Bedrock sert des modèles prêts à l'emploi ; SageMaker donne plus de prise sur l'entraînement et l'hébergement."
---
