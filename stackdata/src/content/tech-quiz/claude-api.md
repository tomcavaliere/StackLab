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
  - id: contenu-requete
    prompt: "Que peut contenir une requête à l'API Messages de Claude ?"
    answer: "Des messages, une instruction système, éventuellement des images ou des documents"
    decoys:
      - "Un identifiant de modèle à entraîner et un jeu de données étiquetées pour le spécialiser"
      - "Uniquement une chaîne de texte, les images devant passer par une API distincte avec une autre clé"
    why: "L'application envoie des messages, une instruction système et au besoin des images ou des documents, puis reçoit la réponse du modèle. Il n'y a pas d'entraînement à la requête."
  - id: sdk-officiels
    prompt: "Dans quels langages existent des SDK officiels de l'API Claude ?"
    answer: "Python, TypeScript, Java, Go, C#, PHP et Ruby"
    decoys:
      - "Uniquement Python, les autres langages devant écrire leurs requêtes HTTP à la main"
      - "Python et C++ seulement, pour des raisons de performance du client"
    why: "Des SDK officiels couvrent plusieurs langages, dont Python et TypeScript. Dans tous les cas, l'API reste une API HTTP."
  - id: sorties-structurees
    prompt: "À quoi servent les sorties structurées de l'API Claude ?"
    answer: "À obtenir une réponse sous une forme que le code peut lire directement"
    decoys:
      - "À ranger les conversations dans un tableau consultable dans la console d'Anthropic"
      - "À découper automatiquement la réponse en paragraphes numérotés pour l'affichage"
    why: "Une réponse structurée évite d'analyser du texte libre : l'application lit directement les champs attendus."
  - id: streaming
    prompt: "Qu'apporte le streaming de la réponse de l'API Claude ?"
    answer: "Le texte arrive par morceaux, affichable au fil de l'eau"
    decoys:
      - "Une réponse facturée à demi-tarif, car envoyée en différé par morceaux"
      - "Un contournement des limites de débit du compte pendant la durée de l'échange"
    why: "Le streaming sert à afficher la réponse dès qu'elle commence à être générée. Il ne change ni le tarif ni les limites de débit."
  - id: traitement-par-lots
    prompt: "Pour traiter un très grand nombre de requêtes sans attendre chaque réponse, que propose l'API ?"
    answer: "Le traitement par lots asynchrone"
    decoys:
      - "Le streaming, qui accélère toutes les requêtes envoyées en même temps"
      - "La mise en cache du prompt, qui conserve les réponses de la veille pour les rejouer"
    why: "Le traitement par lots envoie beaucoup de requêtes sans attendre chaque réponse. Le streaming affiche une seule réponse au fil de l'eau, et le cache concerne les préfixes de prompt."
  - id: expiration-du-cache
    prompt: "Que devient un préfixe en cache s'il n'est pas réutilisé ?"
    answer: "Il expire après quelques minutes sans usage"
    decoys:
      - "Il est conservé indéfiniment tant que le compte de l'organisation reste actif"
      - "Il est supprimé dès que la requête qui l'a créé est terminée, avant toute réutilisation"
    why: "Le cache expire après quelques minutes sans usage, avec une durée plus longue en option. Il sert donc des requêtes rapprochées dans le temps."
  - id: quoi-mettre-en-cache
    prompt: "Quels éléments marquer pour la mise en cache du prompt ?"
    answer: "Un préfixe stable : instruction système, document de référence, outils"
    decoys:
      - "La fin du prompt, là où la question de l'utilisateur change à chaque requête"
      - "La dernière réponse du modèle, qu'on voudrait réutiliser telle quelle ensuite"
    why: "Seul un début de prompt identique d'une requête à l'autre peut être relu depuis le cache. Ce qui varie à chaque requête doit venir après."
  - id: cache-et-ordre
    prompt: "Deux requêtes contiennent le même document, mais l'une commence par une phrase différente. Le cache du prompt joue-t-il ?"
    answer: "Non : seul un début de prompt identique est relu depuis le cache"
    decoys:
      - "Oui : le cache repère le document où qu'il se trouve dans le prompt"
      - "Oui, tant que la température des deux requêtes est identique"
    why: "Le cache s'applique aux requêtes qui commencent par le même préfixe. Un début différent change le préfixe, donc rien n'est relu."
  - id: serveurs-mcp-distants
    prompt: "Comment l'API Claude donne-t-elle accès à des outils via MCP ?"
    answer: "En se connectant à des serveurs MCP distants"
    decoys:
      - "En important le code des serveurs MCP dans le modèle pendant son entraînement"
      - "En installant chez Anthropic un agent local qui lit les fichiers de l'application"
    why: "L'API peut se connecter à des serveurs MCP distants pour donner des outils au modèle. Aucun code de serveur n'entre dans le modèle."
  - id: verifier-les-prix
    prompt: "Où vérifier le prix des tokens de l'API Claude ?"
    answer: "Sur la page de prix officielle d'Anthropic"
    decoys:
      - "Dans chaque réponse de l'API, sous forme d'un montant garanti pour la requête suivante"
      - "Dans la licence du SDK, qui fixe un tarif unique pour tous les modèles Claude"
    why: "Les tarifs se consultent sur la page de prix officielle, et ils dépendent du modèle. Ils ne sont pas fixés par le SDK."
  - id: conditions-de-donnees
    prompt: "Que vérifier avant d'envoyer des données de clients à l'API Claude ?"
    answer: "Les conditions de traitement et de conservation des données"
    decoys:
      - "Que la température est à 0, ce qui empêche la conservation des échanges chez le fournisseur"
      - "Que la fenêtre de contexte est assez grande pour que le modèle anonymise les données"
    why: "Les prompts partent chez un tiers : il faut que son contrat couvre les contraintes de l'entreprise. Ni la température ni le contexte n'y changent rien."
  - id: gros-volume-stable
    prompt: "Gros volume stable, et un modèle ouvert suffit en qualité. Que comparer avec l'API Claude ?"
    answer: "Le coût d'un modèle ouvert auto-hébergé, par exemple avec vLLM"
    decoys:
      - "Le coût d'un passage au palier d'usage supérieur de l'API, toujours inférieur à des GPU"
      - "Le nombre de SDK disponibles pour chacune des deux options, qui détermine le coût"
    why: "À gros volume stable, héberger un modèle ouvert peut revenir moins cher. Aucun seuil fiable n'est donné : cela dépend des modèles, des volumes et des tarifs."
  - id: donnees-sur-la-machine
    prompt: "Les données ne doivent pas quitter la machine. Quelle alternative à l'API Claude ?"
    answer: "Un modèle à poids ouverts exécuté en local avec Ollama"
    decoys:
      - "Amazon Bedrock, qui fait tourner Claude sur les serveurs de l'entreprise elle-même"
      - "La mise en cache du prompt, qui garde les données localement entre deux requêtes"
    why: "Un modèle ouvert local garde les données sur la machine, au prix d'une qualité souvent en retrait. Bedrock est hébergé par AWS et le cache est chez le fournisseur."
  - id: comparer-les-fournisseurs
    prompt: "Comment choisir entre l'API Claude et l'API d'OpenAI ?"
    answer: "En testant les deux sur ses propres cas"
    decoys:
      - "En prenant la moins chère au token, la qualité étant équivalente pour toutes les tâches"
      - "En prenant celle du fournisseur le plus ancien, qui a vu le plus de données d'entraînement"
    why: "Les deux ont le même modèle d'usage : le choix se fait sur ses propres cas, pas sur la réputation ni sur le seul tarif."
  - id: fonctions-par-plateforme
    prompt: "Un projet utilise Claude via Amazon Bedrock mais lit la documentation de l'API directe. Quel point d'attention ?"
    answer: "Les fonctionnalités disponibles varient selon la plateforme"
    decoys:
      - "Aucun : les trois plateformes proposent toujours exactement les mêmes fonctionnalités"
      - "Les modèles de Bedrock sont des versions réduites, qui ne sont jamais celles de l'API directe"
    why: "Claude est disponible via plusieurs plateformes, avec leur facturation et leurs accès, mais les fonctionnalités ne sont pas toutes présentes partout."
  - id: claude-sur-google-cloud
    prompt: "Une entreprise sur Google Cloud veut utiliser Claude avec la facturation de son compte GCP. Que choisir ?"
    answer: "Claude via Vertex AI"
    decoys:
      - "Azure OpenAI, qui propose aussi les modèles Claude à côté de ceux d'OpenAI"
      - "Claude via Amazon Bedrock, quel que soit le cloud de l'entreprise"
    why: "Vertex AI est la plateforme Google Cloud qui propose Claude, avec la facturation et les accès de GCP. Azure OpenAI propose les modèles d'OpenAI."
  - id: reagir-aux-limites
    prompt: "Des requêtes sont refusées parce que le compte atteint ses limites de débit. Que prévoir dans l'application ?"
    answer: "Réessayer plus tard et lisser les envois"
    decoys:
      - "Passer en streaming, qui n'est pas soumis aux limites de débit du compte"
      - "Raccourcir le nom du modèle dans la requête pour qu'elle compte moins de tokens"
    why: "Les limites portent sur les requêtes et les tokens par minute. L'application doit les anticiper ; le streaming ne les lève pas."
  - id: cle-dans-le-navigateur
    prompt: "Un site appelle Claude depuis le JavaScript du navigateur, avec la clé d'API dans le code. Quel est le problème ?"
    answer: "Tout visiteur peut extraire la clé et appeler l'API aux frais du propriétaire"
    decoys:
      - "Le navigateur bloque les requêtes dont la clé est visible dans le code source de la page"
      - "L'API ne répond qu'une fois par visiteur, car la clé est associée à son adresse IP"
    why: "Ce qui est envoyé au navigateur peut être lu. La clé reste côté serveur, qui appelle l'API pour le compte de l'utilisateur."
  - id: pas-de-latence-garantie
    prompt: "Pourquoi l'API Claude ne convient-elle pas quand il faut une latence garantie ?"
    answer: "L'application dépend du réseau, du service et de ses limites de débit"
    decoys:
      - "Les réponses sont calculées sur l'appareil de l'utilisateur, donc de durée variable"
      - "Chaque requête attend une validation manuelle côté Anthropic avant d'être traitée"
    why: "Le modèle est un service distant : réseau, disponibilité et limites de débit échappent à l'application."
  - id: bon-usage
    prompt: "Quel usage correspond bien à l'API Claude ?"
    answer: "Résumer des documents et en extraire des champs, sans infrastructure ML"
    decoys:
      - "Entraîner de zéro son propre modèle sur ses données et le déployer sur ses GPU"
      - "Servir un modèle ouvert à des milliers d'utilisateurs depuis ses propres serveurs"
    why: "L'API apporte des modèles hébergés pour résumer, extraire ou analyser, sans GPU à gérer. L'entraînement et l'auto-hébergement sont d'autres métiers."
---
