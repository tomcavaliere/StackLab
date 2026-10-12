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
---
