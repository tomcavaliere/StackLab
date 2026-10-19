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
  - id: embeddings
    prompt: "À quoi sert le point d'accès embeddings de l'API OpenAI ?"
    answer: "À transformer du texte en vecteurs, à stocker dans une base vectorielle"
    decoys:
      - "À compresser les prompts pour réduire le nombre de tokens facturés à chaque requête"
      - "À entraîner un modèle sur ses documents, directement dans le cloud d'OpenAI"
    why: "Un embedding représente un texte par un vecteur, ce qui permet une recherche par similarité dans une base vectorielle. Il ne compresse pas les prompts."
  - id: au-dela-du-texte
    prompt: "Quels types de contenus l'API OpenAI traite-t-elle en plus du texte ?"
    answer: "Des images, de l'audio et des embeddings"
    decoys:
      - "Uniquement du texte, les autres modalités relevant de produits sans API"
      - "Des vidéos et des fichiers exécutables, que le modèle lance sur les serveurs d'OpenAI"
    why: "L'API couvre le texte, l'image, l'audio et les embeddings. Elle n'exécute pas de fichiers envoyés par l'application."
  - id: traitement-par-lots
    prompt: "Pour traiter un gros volume de requêtes sans attendre chaque réponse, que propose l'API OpenAI ?"
    answer: "Le traitement par lots asynchrone"
    decoys:
      - "Le streaming, qui accélère toutes les requêtes envoyées simultanément"
      - "Les sorties structurées, qui regroupent plusieurs requêtes en une seule"
    why: "Le traitement par lots est asynchrone : on envoie beaucoup de requêtes et on récupère les réponses plus tard. Le streaming affiche une réponse au fil de l'eau."
  - id: sdk-officiels
    prompt: "Comment appelle-t-on l'API OpenAI depuis un langage courant ?"
    answer: "Avec un SDK officiel, notamment en Python et en TypeScript"
    decoys:
      - "Uniquement par des requêtes HTTP écrites à la main, aucun SDK n'existant"
      - "Avec un SDK réservé à C++, les autres langages devant passer par un intermédiaire"
    why: "Des SDK officiels existent notamment en Python et en TypeScript/JavaScript. Ils appellent la même API HTTP."
  - id: interet-du-schema
    prompt: "Pourquoi fournir un schéma JSON plutôt que demander du JSON en texte libre ?"
    answer: "La réponse respecte le schéma, sans analyse de texte libre"
    decoys:
      - "Le schéma réduit le nombre de tokens facturés en entrée, car il remplace la consigne"
      - "Le schéma permet au modèle d'accéder directement à la base de données de l'application"
    why: "Avec une sortie structurée, la réponse est conforme au schéma fourni : le code la lit sans deviner où sont les champs."
  - id: transport-streaming
    prompt: "Quel mécanisme transporte le streaming d'une réponse de l'API OpenAI ?"
    answer: "Des server-sent events"
    decoys:
      - "Un fichier de log que l'application relit régulièrement pour y trouver la suite"
      - "Une connexion gRPC bidirectionnelle obligatoire, ouverte vers le GPU qui génère"
    why: "La réponse est envoyée par morceaux en server-sent events dès qu'ils sont générés, ce qui permet de l'afficher au fil de l'eau."
  - id: tarifs-qui-bougent
    prompt: "Pourquoi ne pas figer les tarifs de l'API dans une estimation de budget ?"
    answer: "Les tarifs changent souvent : il faut consulter la page officielle"
    decoys:
      - "Ils dépendent de la température choisie dans chaque requête"
      - "Ils sont négociés à chaque requête selon l'heure et la charge des serveurs"
    why: "La facturation au token est stable dans son principe, mais les tarifs évoluent. La page de prix officielle fait foi."
  - id: donnees-sensibles-pistes
    prompt: "Un projet veut les modèles d'OpenAI mais manipule des données sensibles. Quelles pistes regarder ?"
    answer: "Azure OpenAI ou un modèle auto-hébergé, après lecture des conditions"
    decoys:
      - "Activer le streaming, qui évite de conserver les données chez le fournisseur"
      - "Chiffrer le prompt avec sa propre clé avant de l'envoyer au modèle pour qu'il le lise"
    why: "Les prompts partent chez un tiers. Selon les contraintes, on lit les conditions de traitement des données, on regarde Azure OpenAI ou un modèle auto-hébergé."
  - id: ce-que-change-azure
    prompt: "Qu'est-ce qui change avec Azure OpenAI par rapport à l'API OpenAI directe ?"
    answer: "La facturation et la gestion des accès sont celles d'Azure"
    decoys:
      - "Les modèles sont remplacés par des modèles ouverts exécutés sur la machine de l'entreprise"
      - "Les poids des modèles deviennent téléchargeables pour être exécutés chez soi"
    why: "Microsoft propose les mêmes familles de modèles dans Azure, avec la facturation et les accès d'Azure. Les poids restent chez le fournisseur."
  - id: avantage-mvp
    prompt: "Pourquoi l'API convient-elle à un MVP ?"
    answer: "Pas de GPU à acheter ni à exploiter, et un coût proportionnel à l'usage"
    decoys:
      - "Elle fixe un forfait mensuel qui plafonne la facture quel que soit l'usage"
      - "Elle garantit des réponses strictement identiques d'un appel à l'autre"
    why: "L'API évite l'infrastructure ML et se paie à l'usage réel. Sa facturation est au token, sans plafond, et ses sorties ne sont pas garanties identiques."
  - id: contenu-appel-fonction
    prompt: "Que contient l'appel de fonction renvoyé par le modèle ?"
    answer: "Le nom de la fonction et les arguments à lui passer"
    decoys:
      - "Le code de la fonction, généré pour l'occasion et prêt à être exécuté par l'application"
      - "Le résultat final de la fonction, calculé par le modèle sur les serveurs d'OpenAI"
    why: "Le modèle demande un appel d'après la description des outils : nom et arguments. L'application exécute la fonction et renvoie le résultat."
  - id: modele-ouvert-compromis
    prompt: "Quel est le compromis d'un modèle ouvert exécuté avec Ollama, face à l'API OpenAI ?"
    answer: "Les données restent sur la machine, mais la qualité est souvent inférieure"
    decoys:
      - "La qualité est supérieure aux modèles hébergés de pointe, mais les données partent chez un tiers"
      - "Le coût est nul, mais les données sont publiées dans un catalogue public de modèles"
    why: "Ollama fait tourner des modèles à poids ouverts en local : rien ne sort de la machine, mais la qualité est souvent en retrait des modèles hébergés de pointe."
  - id: comparer-avec-claude
    prompt: "Comment choisir entre l'API OpenAI et l'API Claude ?"
    answer: "En testant les deux sur ses propres cas"
    decoys:
      - "En retenant la plus ancienne, qui a le plus d'utilisateurs et donc la meilleure qualité"
      - "En retenant la moins chère au token, la qualité étant la même pour toutes les tâches"
    why: "Les deux suivent le même modèle d'usage. Le choix se fait par des tests sur ses propres cas, pas sur la réputation."
  - id: reagir-au-refus
    prompt: "L'API refuse des requêtes parce que les limites de débit sont atteintes. Quelle réaction est saine ?"
    answer: "Réessayer plus tard, en espaçant les envois"
    decoys:
      - "Renvoyer immédiatement la même requête en boucle jusqu'à ce qu'elle soit acceptée"
      - "Créer une clé d'API par requête pour répartir la charge"
    why: "Les limites portent sur les requêtes et les tokens par minute. Marteler l'API aggrave le problème."
  - id: usage-hors-ligne
    prompt: "Dans quel cas éviter l'API OpenAI ?"
    answer: "Une application qui doit fonctionner hors ligne"
    decoys:
      - "Une fonction qui résume des courriels, appelée quelques fois par jour"
      - "Un MVP dont personne ne connaît encore le volume d'usage"
    why: "L'application dépend du réseau et de la disponibilité du service. Les deux autres cas sont des usages typiques de l'API."
  - id: cle-dans-l-application
    prompt: "La clé de l'API a été livrée dans une application mobile. Quel est le risque ?"
    answer: "Quiconque l'extrait peut appeler l'API aux frais du propriétaire"
    decoys:
      - "L'application est refusée par les boutiques d'applications, qui interdisent toute clé"
      - "L'API limite alors le compte à un seul appareil, ce qui bloque les autres utilisateurs"
    why: "Tout ce qui est livré sur l'appareil peut être extrait. La clé reste côté serveur."
  - id: seuil-auto-hebergement
    prompt: "Existe-t-il un volume précis au-delà duquel auto-héberger un modèle revient toujours moins cher ?"
    answer: "Non : cela dépend des modèles, des volumes et des tarifs du moment"
    decoys:
      - "Oui : dès que le volume dépasse celui d'un MVP, l'auto-hébergement est toujours moins cher"
      - "Oui : OpenAI publie un seuil identique pour tous ses modèles"
    why: "Aucun seuil fiable ne se donne : tarifs, modèles et volumes changent. Il faut comparer sur son propre cas."
  - id: servir-un-modele
    prompt: "Quel outil sert un modèle ouvert sur ses propres GPU pour de nombreux utilisateurs ?"
    answer: "vLLM"
    decoys:
      - "Langfuse"
      - "LlamaIndex"
    why: "vLLM est un moteur d'inférence pour modèles ouverts. Langfuse observe des applications LLM et LlamaIndex aide à les construire autour de données."
  - id: analyse-d-image
    prompt: "Une application doit extraire des champs depuis la photo d'un reçu. Comment l'API OpenAI peut-elle aider ?"
    answer: "On envoie l'image avec les messages à un modèle qui la comprend"
    decoys:
      - "Impossible : il faut d'abord une API d'OCR séparée, puis envoyer le texte au modèle"
      - "Possible uniquement via Azure OpenAI, l'API directe n'acceptant que du texte"
    why: "Les requêtes peuvent contenir des images ou des fichiers en plus des messages, et l'API propose des modèles multimodaux."
  - id: tache-adaptee
    prompt: "Quelle tâche convient bien à l'API OpenAI ?"
    answer: "Classer des demandes clients écrites en texte libre"
    decoys:
      - "Garantir qu'une même question donne toujours exactement la même réponse"
      - "Appliquer à l'identique une règle métier déterministe sur des millions de lignes"
    why: "Classer du texte libre est le terrain des LLM. Un résultat identique garanti et une règle déterministe relèvent d'un code classique."
---
