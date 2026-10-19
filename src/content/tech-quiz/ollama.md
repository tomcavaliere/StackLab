---
questions:
  - id: role
    prompt: "À quoi sert Ollama ?"
    answer: "À exécuter des modèles à poids ouverts sur sa propre machine"
    decoys:
      - "À appeler les modèles hébergés d'OpenAI avec une seule clé d'API"
      - "À entraîner un grand modèle de langage depuis zéro sur un poste de travail"
    why: "Ollama télécharge et lance des modèles ouverts en local, derrière une API HTTP. Il n'entraîne pas de modèle et n'est pas un client d'API hébergée."
  - id: commandes
    prompt: "Que font `ollama pull` puis `ollama run` ?"
    answer: "Télécharger un modèle, puis le lancer en local"
    decoys:
      - "Publier son modèle sur le Hub, puis l'exposer sur Internet"
      - "Compiler le moteur d'inférence, puis le déployer sur Kubernetes"
    why: "`pull` récupère les poids du modèle, `run` le démarre. Ollama évite justement de compiler soi-même un moteur."
  - id: api-locale
    prompt: "Comment une application parle-t-elle à un modèle lancé avec Ollama ?"
    answer: "Par une API HTTP locale (par défaut sur le port 11434)"
    decoys:
      - "Uniquement par la ligne de commande, Ollama n'expose aucune API"
      - "Par une connexion à la base de données interne d'Ollama"
    why: "Ollama lance un serveur local qui expose une API HTTP, par défaut sur `localhost:11434`."
  - id: compat-openai
    prompt: "Un code écrit pour l'API OpenAI peut-il appeler un modèle servi par Ollama ?"
    answer: "Souvent, en changeant l'URL de base : Ollama implémente une partie de l'API OpenAI"
    decoys:
      - "Non : les formats sont incompatibles et tout le code d'appel est à réécrire"
      - "Oui, mais seulement avec les modèles d'OpenAI que l'on a téléchargés en local"
    why: "Ollama expose des routes compatibles avec une partie de l'API OpenAI. Les modèles d'OpenAI de l'API ne sont pas téléchargeables."
  - id: donnees-sensibles
    prompt: "Pourquoi choisir Ollama pour analyser des documents confidentiels ?"
    answer: "Le modèle tourne en local : les données ne sortent pas"
    decoys:
      - "Ollama chiffre les prompts avant de les envoyer à OpenAI"
      - "Ollama efface automatiquement les documents après chaque réponse envoyée au fournisseur"
    why: "Avec Ollama, aucune requête ne part chez un fournisseur : le modèle s'exécute sur la machine ou le réseau de l'entreprise."
  - id: production-multi
    prompt: "Pourquoi éviter Ollama pour servir un modèle à de nombreux utilisateurs simultanés ?"
    answer: "Il vise la simplicité d'un poste de travail, pas le débit"
    decoys:
      - "Il refuse plus d'un utilisateur, par licence"
      - "Il ne fonctionne que sans GPU, donc trop lentement pour un serveur"
    why: "Ollama est fait pour le local. Pour le débit en production, un moteur comme vLLM (batching continu, gestion fine de la mémoire GPU) est conçu pour ça. Ollama utilise le GPU s'il y en a un."
  - id: quantification
    prompt: "Pourquoi les modèles d'Ollama sont-ils souvent quantifiés ?"
    answer: "Pour tenir dans la mémoire d'un poste, au prix d'une perte de qualité"
    decoys:
      - "Pour améliorer leur qualité par rapport au modèle d'origine"
      - "Pour pouvoir les utiliser sans accepter leur licence"
    why: "La quantification stocke les poids sur moins de bits : le modèle prend moins de mémoire, mais perd un peu en qualité. Elle ne change rien à la licence."
  - id: materiel
    prompt: "Qu'est-ce qui limite la taille du modèle qu'on peut lancer avec Ollama ?"
    answer: "La mémoire disponible (RAM ou VRAM) de la machine"
    decoys:
      - "Le nombre de modèles déjà téléchargés"
      - "Le forfait souscrit auprès d'Ollama"
    why: "Le modèle doit tenir en mémoire ; sur CPU seul, un gros modèle peut en plus être très lent. Pas de forfait pour l'exécution locale."
  - id: qualite
    prompt: "Comment se compare en général un modèle ouvert lancé sur un poste avec Ollama aux modèles hébergés de pointe ?"
    answer: "Souvent en retrait, selon les tâches"
    decoys:
      - "Toujours supérieur, puisqu'il n'y a pas de latence réseau"
      - "Strictement identique, ce sont les mêmes modèles compressés"
    why: "Les modèles qui tiennent sur un poste sont souvent moins bons que les modèles hébergés de pointe ; l'écart dépend des tâches et se mesure sur ses propres cas."
  - id: usage-type
    prompt: "Lequel de ces usages convient le mieux à Ollama ?"
    answer: "Prototyper hors ligne une fonction d'IA, sans clé d'API"
    decoys:
      - "Servir un assistant à des milliers d'utilisateurs en production, sur un cluster de GPU"
      - "Héberger et versionner des jeux de données publics pour toute une communauté"
    why: "Ollama brille en local : prototypage, hors ligne, données qui ne sortent pas. La production à fort trafic relève de vLLM, l'hébergement de jeux de données du Hub de Hugging Face."
  - id: systemes
    prompt: "Sur quels systèmes d'exploitation Ollama fonctionne-t-il ?"
    answer: "macOS, Linux et Windows"
    decoys:
      - "Uniquement Linux, car il dépend d'une pile logicielle serveur"
      - "Uniquement macOS, où il s'appuie sur la puce de l'ordinateur"
    why: "Ollama s'installe sur macOS, Linux et Windows."
  - id: gpu-cpu
    prompt: "Que fait Ollama quand la machine n'a pas de GPU ?"
    answer: "Il se rabat sur le CPU, souvent plus lentement"
    decoys:
      - "Il refuse de lancer le modèle tant qu'un GPU n'est pas installé"
      - "Il envoie les calculs à un serveur distant géré par ses éditeurs"
    why: "Ollama utilise le GPU s'il y en a un et sait se rabattre sur le CPU. Les calculs restent locaux."
  - id: hors-ligne
    prompt: "Une fois le modèle téléchargé, que permet Ollama en matière de connexion ?"
    answer: "Fonctionner hors ligne, sans clé d'API"
    decoys:
      - "Interroger le modèle à travers une connexion permanente au service de l'éditeur"
      - "Fonctionner hors ligne, mais en demandant une clé d'API à chaque requête"
    why: "Le modèle s'exécute sur la machine : pas de clé d'API, pas de facture au token, et le travail hors ligne est possible une fois les poids téléchargés."
  - id: sans-facture
    prompt: "Quel coût disparaît quand on utilise Ollama au lieu d'une API hébergée ?"
    answer: "La facture au token, remplacée par l'usage de sa propre machine"
    decoys:
      - "Le coût de téléchargement des poids, qui ne passe jamais par le réseau"
      - "Tout coût de matériel, le modèle étant exécuté par le fournisseur"
    why: "Il n'y a plus de facture à chaque requête, mais le modèle consomme les ressources de sa machine. Les poids se téléchargent bien."
  - id: bibliotheque
    prompt: "Où Ollama récupère-t-il les modèles qu'il propose avec `ollama pull` ?"
    answer: "Dans sa propre bibliothèque de modèles, ou depuis le Hub"
    decoys:
      - "Uniquement dans la console de l'API OpenAI"
      - "Uniquement depuis un dépôt Git local que l'utilisateur doit remplir lui-même"
    why: "Beaucoup de modèles ouverts sont publiés sur le Hub ; Ollama récupère aussi des modèles depuis sa propre bibliothèque."
  - id: langchain
    prompt: "Quel avantage l'intégration d'Ollama dans LangChain apporte-t-elle ?"
    answer: "Changer de modèle sans réécrire la chaîne"
    decoys:
      - "Transformer automatiquement une chaîne LangChain en serveur de production à fort débit"
      - "Entraîner depuis LangChain un modèle ouvert sur les données de l'application"
    why: "LangChain fournit une intégration Ollama : on remplace un modèle par un autre sans modifier le reste de la chaîne."
  - id: openai-url
    prompt: "Quelle modification suffit souvent pour qu'un client conçu pour l'API OpenAI appelle un modèle d'Ollama ?"
    answer: "Changer l'URL de base"
    decoys:
      - "Convertir le modèle d'Ollama au format de poids d'OpenAI"
      - "Remplacer la bibliothèque cliente par un SDK propriétaire spécifique"
    why: "Ollama implémente une partie de l'API OpenAI : on pointe le client vers `localhost:11434` plutôt que vers l'API hébergée. Il peut manquer des fonctions."
  - id: limites-compat
    prompt: "La compatibilité d'Ollama avec l'API OpenAI est-elle complète ?"
    answer: "Non : elle porte sur une partie de l'API"
    decoys:
      - "Oui : toutes les fonctions et tous les paramètres sont repris à l'identique"
      - "Oui, mais seulement pour les requêtes envoyées depuis un poste Linux"
    why: "Ollama implémente une partie de l'API OpenAI. Avant de migrer, on vérifie que les routes et les options utilisées sont couvertes."
  - id: taille-modele
    prompt: "On veut lancer un très gros modèle sur un ordinateur portable avec Ollama. Qu'est-ce qui coince en priorité ?"
    answer: "La mémoire disponible, et la lenteur sur CPU seul"
    decoys:
      - "La licence d'Ollama, qui limite la taille des modèles exécutables"
      - "Le nombre d'utilisateurs connectés, plafonné à un par machine"
    why: "La taille utilisable dépend de la RAM ou de la VRAM ; un gros modèle sur CPU seul peut être très lent. Ollama ne plafonne pas la taille par licence."
  - id: quantif-compromis
    prompt: "Quel compromis la quantification impose-t-elle à un modèle exécuté en local ?"
    answer: "Moins de mémoire utilisée, au prix d'une perte de qualité"
    decoys:
      - "Plus de qualité, au prix d'une plus grande consommation de mémoire"
      - "Aucun : la quantification est sans perte et réduit seulement le temps de téléchargement"
    why: "Stocker les poids sur moins de bits réduit l'empreinte mémoire mais dégrade un peu la qualité. Cela ne rend pas le modèle identique à l'original."
  - id: prototype-rag
    prompt: "Une équipe prototype un assistant sur documents internes et ne veut pas envoyer ces documents à un fournisseur. Que peut-elle utiliser pour le modèle ?"
    answer: "Ollama avec un modèle ouvert, en local"
    decoys:
      - "L'API d'OpenAI avec une clé d'API dédiée, les données étant chiffrées en transit"
      - "Un cluster vLLM sur GPU, indispensable dès le premier essai"
    why: "Ollama garde données et modèle sur la machine pour un prototype. Un chiffrement en transit n'empêche pas l'envoi au fournisseur ; vLLM est surdimensionné pour un essai."
  - id: qualite-mesure
    prompt: "Avant de remplacer un modèle hébergé de pointe par un modèle servi par Ollama, que faut-il faire ?"
    answer: "Mesurer la qualité sur ses propres cas d'usage"
    decoys:
      - "Rien, car la qualité dépend uniquement de la rapidité de réponse"
      - "Ajouter une couche de chiffrement, qui rapproche les qualités des deux modèles"
    why: "L'écart de qualité dépend des tâches. Seule une mesure sur ses propres cas dit si le modèle local suffit."
  - id: multi-user
    prompt: "Quelques collègues partagent un assistant interne léger servi par Ollama. Est-ce un usage raisonnable ?"
    answer: "Oui : un usage interne léger à quelques utilisateurs convient"
    decoys:
      - "Non : Ollama ne répond jamais à plus d'un client à la fois"
      - "Oui, et il tiendra aussi une montée en charge à plusieurs milliers d'utilisateurs"
    why: "Ollama convient à un usage interne léger. C'est le fort trafic simultané qui demande un moteur comme vLLM."
  - id: pas-entrainer
    prompt: "Ollama sert-il à affiner un modèle sur ses propres données ?"
    answer: "Non : il exécute des modèles, l'affinage se fait avec d'autres outils"
    decoys:
      - "Oui : `ollama run` ajuste les poids du modèle à partir des échanges"
      - "Oui : chaque modèle téléchargé s'améliore avec l'usage local"
    why: "Ollama exécute des modèles déjà entraînés. Pour affiner un modèle ouvert, on utilise par exemple transformers et PEFT."
  - id: exposer-reseau
    prompt: "L'API locale d'Ollama écoute par défaut sur `localhost`. Qu'est-ce que cela implique ?"
    answer: "Elle n'est destinée qu'à la machine, sauf si on l'expose volontairement"
    decoys:
      - "Elle est ouverte par défaut à tous les postes du réseau de l'entreprise"
      - "Elle est publiée sur Internet pour que l'éditeur puisse la superviser"
    why: "Une adresse `localhost` n'est joignable que depuis la machine elle-même. L'ouvrir au réseau est un choix à faire en connaissance de cause."
  - id: nom-vs-hub
    prompt: "Quelle différence y a-t-il entre Ollama et le Hub de Hugging Face ?"
    answer: "Ollama exécute des modèles localement, le Hub héberge modèles et jeux de données"
    decoys:
      - "Ollama héberge des modèles pour la communauté, le Hub les exécute en local"
      - "Ce sont deux noms du même produit, sous deux licences différentes"
    why: "Le Hub est un lieu de publication et de partage ; Ollama est un outil qui télécharge des modèles et les fait tourner sur sa machine."
  - id: debit-vs-simplicite
    prompt: "Qu'est-ce qui distingue vLLM d'Ollama dans leur objectif principal ?"
    answer: "vLLM vise le débit en production, Ollama la simplicité en local"
    decoys:
      - "vLLM vise le local sans GPU, Ollama le débit en production"
      - "vLLM sert des modèles propriétaires, Ollama des modèles à poids ouverts"
    why: "vLLM est conçu pour le débit sur GPU (batching continu, gestion de la mémoire) ; Ollama pour la prise en main rapide sur un poste. Les deux servent des modèles ouverts."
  - id: apprentissage
    prompt: "Pourquoi Ollama est-il un bon outil pour apprendre et comparer des modèles ouverts ?"
    answer: "On télécharge et on essaie un modèle en une commande, sans facture"
    decoys:
      - "Il classe automatiquement les modèles ouverts par qualité mesurée"
      - "Il garantit que tous les modèles testés sont autorisés en usage commercial"
    why: "`ollama pull` puis `ollama run` rendent l'essai simple et gratuit à l'usage. Ollama ne classe pas les modèles et ne change pas leur licence."
  - id: cle-api-absence
    prompt: "Pourquoi le développement avec Ollama est-il commode pour une équipe qui débute ?"
    answer: "Pas de clé d'API à gérer ni de coût par requête pendant les essais"
    decoys:
      - "Les modèles locaux surpassent toujours les modèles hébergés pour un prototype"
      - "Il génère automatiquement le code d'intégration pour toutes les applications"
    why: "Sans clé ni facture au token, on itère librement. La qualité des modèles locaux est souvent en retrait des modèles hébergés de pointe."
  - id: prod-cluster
    prompt: "Un service doit absorber des pics de requêtes simultanées sur un cluster de GPU. Pourquoi Ollama est-il un choix fragile ?"
    answer: "Il n'est pas conçu pour le débit d'un serveur de production"
    decoys:
      - "Il ne s'exécute pas sur des machines équipées de GPU"
      - "Il exige un abonnement différent pour chaque utilisateur connecté"
    why: "Ollama privilégie la simplicité d'un poste de travail. Un moteur comme vLLM, avec batching continu et gestion fine de la mémoire GPU, est fait pour ce cas."
---
