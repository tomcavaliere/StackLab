---
questions:
  - id: role
    prompt: "Que fournit l'API Claude d'Anthropic ?"
    answer: "Un accès HTTP aux modèles Claude hébergés par Anthropic"
    decoys:
      - "Les poids des modèles Claude, à télécharger pour les exécuter sur ses propres GPU"
      - "Un moteur d'inférence open-source pour servir n'importe quel modèle ouvert"
    why: "Anthropic héberge les modèles ; l'application envoie une requête à l'API Messages et reçoit la réponse. Les poids ne sont pas distribués ; servir un modèle ouvert, c'est le rôle de vLLM."
  - id: prompt-caching
    prompt: "Qu'apporte la mise en cache du prompt (prompt caching) de l'API Claude ?"
    answer: "Un préfixe de prompt répété est relu depuis le cache, plus vite et moins cher"
    decoys:
      - "Les réponses du modèle sont gardées et renvoyées telles quelles à une question identique"
      - "Le prompt est stocké chez Anthropic pour entraîner une version personnalisée du modèle"
    why: "On marque un préfixe stable (instruction système, document, outils) ; les requêtes qui commencent par le même préfixe le lisent depuis le cache. Ce n'est pas un cache des réponses, ni de l'entraînement."
  - id: cache-cas-type
    prompt: "Quel cas profite le plus de la mise en cache du prompt ?"
    answer: "Un long document de référence envoyé à chaque question"
    decoys:
      - "Des questions courtes et toutes différentes, sans contexte commun"
      - "Une seule requête isolée, lancée une fois par mois"
    why: "Le cache sert quand le même préfixe revient souvent : long contexte répété. Des requêtes sans préfixe commun ou très espacées n'en profitent pas, le cache expirant après quelques minutes sans usage."
  - id: tool-use
    prompt: "Comment se déroule l'appel d'outils (tool use) avec l'API Claude ?"
    answer: "Le modèle demande un outil décrit par l'application, qui l'exécute et lui renvoie le résultat"
    decoys:
      - "Anthropic exécute sur ses serveurs, dans un bac à sable, le code de l'outil envoyé avec la requête"
      - "Le modèle se connecte lui-même à la base de données de l'application"
    why: "L'application décrit ses outils ; le modèle répond par une demande d'appel ; l'application exécute l'outil et renvoie son résultat dans la conversation."
  - id: mcp
    prompt: "Quel est le lien entre Anthropic et MCP (Model Context Protocol) ?"
    answer: "Anthropic a lancé ce protocole ouvert pour brancher outils et données"
    decoys:
      - "MCP est le format propriétaire des poids des modèles Claude"
      - "MCP est le nom du programme d'abonnement entreprise d'Anthropic pour les grands comptes"
    why: "MCP est un protocole ouvert lancé par Anthropic pour connecter des outils et des sources de données à un modèle ; l'API peut se connecter à des serveurs MCP distants."
  - id: clouds
    prompt: "Par quels clouds peut-on aussi accéder aux modèles Claude ?"
    answer: "Amazon Bedrock, Google Cloud (Vertex AI) et Microsoft Foundry"
    decoys:
      - "Uniquement par l'API d'Anthropic, aucun cloud ne les propose"
      - "Uniquement par Azure OpenAI, aux côtés des modèles d'OpenAI"
    why: "Claude est disponible via l'API directe et via les plateformes d'AWS, Google Cloud et Microsoft, avec leur facturation et leurs droits d'accès ; les fonctionnalités varient selon la plateforme."
  - id: passer-par-le-cloud
    prompt: "Pourquoi une entreprise passerait-elle par Amazon Bedrock plutôt que par l'API directe d'Anthropic ?"
    answer: "Pour garder facturation et droits d'accès dans son compte AWS"
    decoys:
      - "Parce que Bedrock donne accès à des modèles Claude gratuits"
      - "Parce que Bedrock est le seul moyen d'utiliser l'appel d'outils"
    why: "Passer par la plateforme de son cloud regroupe la facture et la gestion des accès (IAM). Les fonctionnalités y sont parfois disponibles plus tard que sur l'API directe, pas l'inverse."
  - id: cle-front
    prompt: "Une application mobile appelle l'API Claude. Où placer la clé d'API ?"
    answer: "Sur un serveur, que l'application mobile appelle"
    decoys:
      - "Dans le code de l'application, obscurcie à la compilation"
      - "Dans un fichier de configuration téléchargé au premier lancement de l'application"
    why: "Tout ce qui est livré sur l'appareil peut être extrait. La clé reste côté serveur, qui appelle l'API pour l'utilisateur."
  - id: hors-ligne
    prompt: "Dans quel cas l'API Claude n'est-elle pas adaptée ?"
    answer: "Une application qui doit fonctionner sans connexion réseau"
    decoys:
      - "Une application qui doit répondre en streaming"
      - "Un agent qui doit enchaîner plusieurs outils de suite avant de répondre"
    why: "L'API est un service distant : sans réseau, pas de réponse. Le streaming et l'appel d'outils, eux, font partie de ce qu'elle propose. Hors ligne, on regarde un modèle local (Ollama)."
  - id: limites-debit
    prompt: "Comment l'API Claude encadre-t-elle le volume d'appels d'un compte ?"
    answer: "Par des limites de requêtes et de tokens par minute, selon un palier d'usage"
    decoys:
      - "Par un nombre fixe de conversations par jour et par clé d'API, sans aucun palier d'usage"
      - "Par une file d'attente unique où toutes les requêtes passent une par une"
    why: "Chaque organisation a des limites de débit (requêtes et tokens par minute) et de dépenses, qui augmentent par paliers avec l'usage."
---
