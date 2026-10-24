---
questions:
  - id: role
    prompt: "À quoi sert MCP (Model Context Protocol) ?"
    answer: "Standardiser la connexion des applications d'IA aux outils et sources de données"
    decoys:
      - "Entraîner des modèles de langage sur les documents et les bases de données d'une entreprise"
      - "Mesurer la qualité des réponses d'un modèle de langage"
    why: "MCP définit une interface commune entre applications d'IA et outils ou données. Il n'entraîne ni n'évalue de modèle."
  - id: origine
    prompt: "Qui a publié MCP, et quand ?"
    answer: "Anthropic, en open source, en novembre 2024"
    decoys:
      - "Le W3C, comme recommandation officielle, en 2020"
      - "OpenAI, comme format propriétaire de son API, en 2023"
    why: "Anthropic a publié MCP en open source fin 2024. En décembre 2025, le protocole a été confié à l'Agentic AI Foundation, sous la Linux Foundation."
  - id: analogie
    prompt: "À quoi la documentation de MCP compare-t-elle le protocole ?"
    answer: "À un port USB-C pour les applications d'IA"
    decoys:
      - "À un pare-feu entre le modèle et internet"
      - "À un moteur de recherche interne"
    why: "Comme l'USB-C relie des appareils par une prise standard, MCP relie des applications d'IA à des outils par un protocole standard."
  - id: primitives
    prompt: "Quelles primitives un serveur MCP peut-il exposer ?"
    answer: "Des outils, des ressources et des prompts"
    decoys:
      - "Des modèles, des poids et des jeux d'entraînement"
      - "Des tables, des index et des vues"
    why: "Outils : fonctions à appeler. Ressources : données à fournir en contexte. Prompts : modèles de consignes réutilisables."
  - id: ressource
    prompt: "Dans MCP, à quoi correspond une ressource ?"
    answer: "Des données fournies comme contexte, comme le schéma d'une base"
    decoys:
      - "Une fonction que le modèle appelle pour agir, comme envoyer un message"
      - "La quantité de mémoire allouée au serveur MCP"
    why: "Une ressource apporte du contexte (contenu de fichier, schéma de base). Une action à exécuter, c'est un outil."
  - id: architecture
    prompt: "Comment se répartissent les rôles dans l'architecture MCP ?"
    answer: "L'hôte crée un client MCP par serveur auquel il se connecte"
    decoys:
      - "Le serveur MCP héberge le modèle de langage et répond aux questions"
      - "Chaque outil ouvre sa propre connexion directe au modèle"
    why: "L'hôte est l'application d'IA ; il maintient un client par serveur. Le serveur fournit outils, ressources et prompts, pas le modèle."
  - id: transports
    prompt: "Comment un serveur MCP local communique-t-il le plus souvent avec l'application ?"
    answer: "Par l'entrée et la sortie standard (stdio)"
    decoys:
      - "Par une base de données partagée"
      - "Par des fichiers déposés dans un dossier commun"
    why: "Un serveur local tourne comme un processus sur la même machine et échange par stdio ; un serveur distant passe par HTTP. Les messages suivent JSON-RPC 2.0."
  - id: securite
    prompt: "Quel risque prendre en compte avant d'installer un serveur MCP ?"
    answer: "Il agit avec les droits qu'on lui donne et ses données peuvent contenir une injection de prompt"
    decoys:
      - "Il remplace silencieusement le modèle de l'application par un modèle inconnu, hébergé par l'auteur du serveur"
      - "Il désactive les autres serveurs MCP déjà installés"
    why: "Un serveur exécute du code et renvoie du contenu lu par le modèle. N'installer que des serveurs de confiance, limiter leurs permissions, faire confirmer les actions sensibles."
  - id: interet
    prompt: "Quel gain MCP apporte-t-il quand on a plusieurs applications d'IA et plusieurs outils ?"
    answer: "Un serveur écrit une fois sert à toutes les applications compatibles"
    decoys:
      - "Les outils s'exécutent plus vite qu'avec un appel d'API direct"
      - "Les modèles n'ont plus besoin de descriptions d'outils"
    why: "Sans standard, il faut un connecteur par couple application × outil. Avec MCP, chaque outil a un serveur, réutilisable par chaque application qui parle le protocole."
  - id: quand-eviter
    prompt: "Une seule application appelle un seul service dont on maîtrise le code. MCP est-il nécessaire ?"
    answer: "Non : un outil défini directement dans l'application suffit"
    decoys:
      - "Oui : un LLM ne peut appeler aucun outil sans MCP"
      - "Oui : MCP est obligatoire pour appeler une API REST depuis un agent"
    why: "L'appel d'outils existe sans MCP. Le protocole devient utile quand plusieurs applications doivent réutiliser les mêmes intégrations."
  - id: hote
    prompt: "Dans l'architecture MCP, qu'appelle-t-on l'hôte ?"
    answer: "L'application d'IA qui se connecte aux serveurs MCP"
    decoys:
      - "Le serveur qui expose les outils et héberge le modèle de langage utilisé"
      - "La machine distante sur laquelle les serveurs MCP sont installés par l'administrateur"
    why: "L'hôte est l'application d'IA (assistant, IDE, agent maison) : il crée un client par serveur. Le serveur apporte outils, ressources et prompts, pas le modèle."
  - id: description-outil
    prompt: "Comment un outil exposé par un serveur MCP est-il décrit ?"
    answer: "Par un nom, une description et un schéma JSON des paramètres"
    decoys:
      - "Par son code source, que le client télécharge pour l'exécuter dans l'application"
      - "Par un schéma SQL des tables que l'outil lit ou modifie sur le serveur"
    why: "Comme pour tout appel d'outils, le modèle ne voit que la description : nom, rôle et schéma des paramètres."
  - id: format-messages
    prompt: "Quel format suivent les messages échangés entre client et serveur MCP ?"
    answer: "JSON-RPC 2.0"
    decoys:
      - "SOAP, au-dessus de XML"
      - "Des requêtes SQL envoyées à une base partagée"
    why: "Les messages MCP suivent JSON-RPC 2.0, que ce soit par stdio pour un serveur local ou par HTTP pour un serveur distant."
  - id: serveur-distant
    prompt: "Par quel moyen un client MCP communique-t-il avec un serveur distant ?"
    answer: "Par HTTP"
    decoys:
      - "Par l'entrée et la sortie standard d'un processus lancé sur la même machine"
      - "Par un dossier partagé, où client et serveur déposent leurs messages"
    why: "Un serveur distant passe par HTTP. L'entrée et la sortie standard conviennent à un serveur local, lancé comme processus sur la machine."
  - id: primitive-prompts
    prompt: "À quoi sert la primitive prompts d'un serveur MCP ?"
    answer: "À proposer des modèles de consignes réutilisables"
    decoys:
      - "À poser des questions à l'utilisateur en lieu et place du modèle de langage"
      - "À garder l'historique de tout ce que l'utilisateur a saisi dans l'application"
    why: "Un prompt MCP est un modèle de consigne réutilisable. Ni un interrogatoire de l'utilisateur ni un historique."
  - id: primitive-action
    prompt: "Un serveur MCP doit permettre au modèle de créer un ticket. Quelle primitive utiliser ?"
    answer: "Un outil"
    decoys:
      - "Une ressource, fournie comme contexte avant la réponse"
      - "Un prompt, rédigé comme une consigne réutilisable"
    why: "Agir (créer un ticket) est le rôle d'un outil. Une ressource apporte des données en contexte, un prompt un modèle de consigne."
  - id: primitive-contexte
    prompt: "On veut donner à un assistant le schéma d'une base comme contexte. Quelle primitive MCP ?"
    answer: "Une ressource"
    decoys:
      - "Un outil que le modèle appelle pour exécuter des requêtes d'écriture sur la base"
      - "Un client MCP supplémentaire, relié directement à la base"
    why: "Les ressources fournissent des données de contexte, comme le contenu d'un fichier ou le schéma d'une base. Un client MCP n'est pas une primitive."
  - id: gouvernance
    prompt: "Qu'est-il arrivé à la gouvernance de MCP en décembre 2025 ?"
    answer: "Anthropic l'a confié à l'Agentic AI Foundation, un fonds de la Linux Foundation"
    decoys:
      - "Le W3C l'a repris pour en faire une recommandation officielle du web"
      - "OpenAI l'a racheté pour l'intégrer à ses modèles sous licence propriétaire"
    why: "Publié en open source par Anthropic fin 2024, MCP a été confié fin 2025 à l'Agentic AI Foundation, sous la Linux Foundation."
  - id: nombre-de-connecteurs
    prompt: "Sans standard, combien de connecteurs faut-il écrire pour N applications d'IA et M services ?"
    answer: "Un par couple application et service"
    decoys:
      - "Un par application, quel que soit le nombre de services à brancher"
      - "Un par service, à condition que toutes les applications soient écrites dans le même langage"
    why: "Chaque application doit son connecteur à chaque service, d'où le produit N × M. MCP ramène cela à un serveur par service, réutilisable par tous les clients."
  - id: alternative-rest
    prompt: "Quelle est l'alternative à MCP quand une seule application utilise un seul service ?"
    answer: "Appeler directement l'API REST du service depuis son code"
    decoys:
      - "Fine-tuner le modèle sur la documentation du service pour qu'il l'appelle sans outil"
      - "Ajouter un RAG sur la documentation du service, qui exécutera les appels à sa place"
    why: "Quand on maîtrise le code et qu'un seul service est concerné, un outil défini dans l'application qui appelle l'API est plus simple. Le RAG fournit du contexte, il n'exécute rien."
  - id: sans-llm
    prompt: "Deux programmes classiques, sans LLM, doivent communiquer. MCP est-il le bon choix ?"
    answer: "Non : une API REST ou gRPC suffit"
    decoys:
      - "Oui : MCP remplace REST et gRPC pour toute communication entre programmes"
      - "Oui : MCP est requis dès qu'un programme expose une fonction à distance"
    why: "MCP sert à connecter des applications d'IA à des outils. Sans LLM dans la boucle, les API classiques suffisent."
  - id: serveur-inconnu
    prompt: "Un serveur MCP d'origine inconnue demande des droits étendus sur la machine. Que faire ?"
    answer: "L'éviter : le risque l'emporte sur le gain"
    decoys:
      - "L'installer s'il tourne en local par stdio, le modèle isolant le code du serveur"
      - "L'installer s'il est open source, car la communauté aura forcément audité son code"
    why: "Un serveur exécute du code avec les droits qu'on lui donne. Ni le mode local ni la licence ne garantissent qu'il est sûr."
  - id: precautions
    prompt: "Quelles précautions prendre avec un serveur MCP de confiance ?"
    answer: "Limiter ses permissions et faire confirmer les actions sensibles"
    decoys:
      - "Lui donner un accès administrateur pour qu'il ne soit jamais bloqué dans sa tâche"
      - "Désactiver toute confirmation humaine pour ne pas interrompre le modèle en cours de tâche"
    why: "MCP ne règle pas la sécurité à votre place. Droits minimaux et confirmation humaine limitent les dégâts d'une erreur."
  - id: description-piegee
    prompt: "Pourquoi la description d'un outil MCP peut-elle servir à une attaque ?"
    answer: "Elle arrive dans le contexte du modèle, qui peut suivre des instructions cachées"
    decoys:
      - "L'hôte l'exécute comme un script dès que le serveur MCP se connecte"
      - "Elle est publiée dans un annuaire public où n'importe qui peut la modifier"
    why: "Les descriptions d'outils et les données renvoyées entrent dans le contexte du modèle : c'est le chemin d'une injection de prompt."
  - id: clients-compatibles
    prompt: "Quels produits savent se connecter à des serveurs MCP ?"
    answer: "Les applications et l'API Claude, ainsi que la plateforme d'OpenAI"
    decoys:
      - "Uniquement les produits d'Anthropic, le protocole leur étant réservé"
      - "Aucune API de modèle hébergé, seulement des applications de bureau"
    why: "MCP est un protocole ouvert : Claude (applications et API) et la plateforme d'OpenAI savent s'y connecter."
  - id: separation-du-code
    prompt: "Où se trouve le code d'intégration avec un service quand on utilise MCP ?"
    answer: "Dans le serveur MCP, séparé du code de l'application d'IA"
    decoys:
      - "Dans le modèle, qui apprend l'API du service pendant son entraînement"
      - "Dans chaque client MCP, qui réimplémente l'intégration pour son hôte"
    why: "Le serveur contient l'intégration, une seule fois. L'application d'IA ne contient que la partie cliente standard."
  - id: outil-interne
    prompt: "Une entreprise veut qu'un outil interne soit utilisable par plusieurs assistants et IDE. Que faire ?"
    answer: "Écrire un seul serveur MCP pour cet outil"
    decoys:
      - "Écrire un connecteur spécifique pour chaque assistant et chaque IDE"
      - "Réentraîner chaque assistant sur la documentation de l'outil"
    why: "Un serveur MCP écrit une fois sert à tous les clients compatibles. Réentraîner un assistant ne lui donne pas la capacité d'appeler l'outil."
  - id: serveur-existant
    prompt: "Un agent doit accéder à un service pour lequel un serveur MCP existe déjà. Que faire ?"
    answer: "Brancher ce serveur, sans écrire de connecteur"
    decoys:
      - "Écrire un nouveau serveur, car MCP interdit de réutiliser le serveur d'un tiers"
      - "Copier le code de ce serveur dans le modèle pour qu'il l'appelle plus vite"
    why: "L'un des intérêts de MCP est de réutiliser des serveurs existants. Il reste à les choisir avec prudence."
  - id: securite-non-reglee
    prompt: "MCP règle-t-il la sécurité des outils branchés sur un modèle ?"
    answer: "Non : elle reste à la charge de celui qui déploie"
    decoys:
      - "Oui : chaque serveur est automatiquement isolé dans un bac à sable par le protocole"
      - "Oui : le protocole impose une confirmation humaine pour toute action sensible"
    why: "Un serveur exécute du code avec les droits qu'on lui donne. Droits, confiance et confirmations restent des choix de déploiement."
  - id: un-client-par-serveur
    prompt: "Un hôte est connecté à trois serveurs MCP. Combien de clients MCP crée-t-il ?"
    answer: "Trois : un client par serveur"
    decoys:
      - "Un seul client, partagé entre les trois serveurs"
      - "Six : un côté hôte et un côté modèle pour chaque serveur"
    why: "L'hôte crée un client MCP par serveur auquel il se connecte."
---
