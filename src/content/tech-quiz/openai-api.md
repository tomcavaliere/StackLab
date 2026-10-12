---
questions:
  - id: role
    prompt: "Quel problème l'API OpenAI résout-elle pour une application ?"
    answer: "Utiliser des modèles hébergés par appel HTTP, sans GPU ni modèle à exploiter soi-même"
    decoys:
      - "Entraîner gratuitement un modèle sur ses propres données, directement sur les serveurs d'OpenAI"
      - "Télécharger les poids des modèles d'OpenAI pour les exécuter sur ses serveurs"
    why: "L'application envoie une requête et reçoit la réponse ; OpenAI héberge modèles et matériel. Les poids des modèles de l'API ne sont pas téléchargeables, et rien n'est gratuit : on paie à l'usage."
  - id: facturation
    prompt: "Comment l'usage de l'API OpenAI est-il facturé ?"
    answer: "Au nombre de tokens en entrée et en sortie"
    decoys:
      - "Au nombre d'heures de GPU réservées pour son compte, même sans requête"
      - "Par un abonnement fixe par développeur, quel que soit le volume d'appels"
    why: "La facturation se fait à l'usage, au token, entrée et sortie comptées. Pas de GPU réservé ni de forfait par développeur ; les tarifs changent souvent."
  - id: cle-api
    prompt: "Où doit vivre la clé de l'API OpenAI dans une application web ?"
    answer: "Côté serveur, qui appelle l'API pour l'utilisateur"
    decoys:
      - "Dans le code du front, minifié pour qu'elle soit illisible"
      - "Dans le stockage local du navigateur, chiffrée avec le mot de passe de l'utilisateur"
    why: "Tout ce qui est envoyé au navigateur ou dans une application mobile peut être lu, minifié ou non. La clé reste côté serveur, qui fait l'appel."
  - id: function-calling
    prompt: "Avec l'appel de fonctions (function calling), qui exécute la fonction ?"
    answer: "L'application : le modèle demande l'appel, l'application l'exécute et renvoie le résultat"
    decoys:
      - "Les serveurs d'OpenAI, qui exécutent le code de la fonction envoyé avec la requête d'appel"
      - "Le navigateur de l'utilisateur, via un script injecté dans la réponse du modèle"
    why: "Le modèle reçoit la description des outils et répond par une demande d'appel structurée. C'est l'application qui exécute la fonction et lui renvoie le résultat."
  - id: sorties-structurees
    prompt: "À quoi servent les sorties structurées de l'API OpenAI ?"
    answer: "À obtenir une réponse conforme à un schéma JSON fourni"
    decoys:
      - "À recevoir la réponse découpée en paragraphes numérotés pour l'affichage"
      - "À stocker les réponses du modèle dans une base de données gérée par OpenAI"
    why: "On fournit un schéma JSON et la réponse le respecte : le code peut la lire sans analyser du texte libre."
  - id: streaming
    prompt: "Pourquoi activer le streaming de la réponse ?"
    answer: "Pour afficher la réponse au fil de l'eau"
    decoys:
      - "Pour diviser par deux le nombre de tokens facturés à chaque requête"
      - "Pour contourner les limites de débit imposées à son compte"
    why: "Le streaming envoie la réponse par morceaux (server-sent events) dès qu'ils sont générés : l'utilisateur voit le texte arriver. Il ne change ni la facture ni les limites de débit."
  - id: confidentialite
    prompt: "Pourquoi l'API OpenAI peut-elle être écartée pour un projet manipulant des données sensibles ?"
    answer: "Les prompts sont envoyés à un tiers : il faut que son contrat couvre les contraintes"
    decoys:
      - "L'API refuse tout texte contenant des données personnelles repérées par un filtre automatique"
      - "Les réponses sont publiées dans un catalogue public"
    why: "Chaque requête transmet ses données au fournisseur. Selon les contraintes, on lit les conditions de traitement des données, on regarde Azure OpenAI ou un modèle auto-hébergé."
  - id: azure-openai
    prompt: "Une entreprise veut les modèles d'OpenAI mais avec la facturation et la gestion des accès de son cloud Microsoft. Que choisir ?"
    answer: "Azure OpenAI"
    decoys:
      - "Amazon Bedrock"
      - "Ollama sur une machine virtuelle Azure"
    why: "Microsoft propose les familles de modèles d'OpenAI via Azure OpenAI (dans Microsoft Foundry). Ollama exécute des modèles à poids ouverts, pas ceux de l'API OpenAI."
  - id: limites-debit
    prompt: "Quelle contrainte d'exploitation faut-il prévoir avec une API de modèle hébergé comme celle d'OpenAI ?"
    answer: "Des limites de débit en requêtes et en tokens par minute"
    decoys:
      - "Une limite d'une seule requête simultanée par clé d'API"
      - "Une coupure du service la nuit pour la maintenance"
    why: "L'API applique des limites de débit (requêtes et tokens par minute) : au-delà, les requêtes sont refusées et le client doit réessayer plus tard."
  - id: gros-volume
    prompt: "Dans quel cas un modèle ouvert auto-hébergé peut-il devenir préférable à l'API OpenAI ?"
    answer: "Un très gros volume stable, où la facture au token dépasse le coût des GPU"
    decoys:
      - "Un MVP développé par deux personnes qui veulent sortir en un mois avec un budget limité"
      - "Une fonction de résumé appelée quelques dizaines de fois par jour"
    why: "Pour un petit volume ou une petite équipe, l'API est la voie simple. Quand le volume est gros et prévisible, un moteur comme vLLM sur ses GPU peut revenir moins cher, selon les modèles et les tarifs."
---
