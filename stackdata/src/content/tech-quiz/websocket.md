---
questions:
  - id: principe
    prompt: "Que permet le protocole WebSocket ?"
    answer: "Une connexion persistante et bidirectionnelle : le serveur peut envoyer des messages à tout moment"
    decoys:
      - "Des requêtes HTTP plus rapides, compressées, mais toujours à l'initiative du client"
      - "Le chiffrement des requêtes d'une API REST"
    why: "Une fois la connexion ouverte, client et serveur s'envoient des messages quand ils veulent."
  - id: polling
    prompt: "Quel problème du HTTP classique WebSocket résout-il ?"
    answer: "Devoir interroger le serveur en boucle pour savoir si quelque chose a changé"
    decoys:
      - "L'obligation d'échanger du JSON entre client et serveur"
      - "L'usage obligatoire des cookies pour identifier chaque requête du client"
    why: "Interroger en boucle gaspille des requêtes et ajoute du délai."
  - id: rfc
    prompt: "Quel document normalise le protocole WebSocket ?"
    answer: "La RFC 6455 (2011)"
    decoys:
      - "ECMA-262"
      - "ISO/IEC 9075"
    why: "ECMA-262 normalise JavaScript, ISO/IEC 9075 SQL."
  - id: etat
    prompt: "Quelle conséquence la connexion persistante a-t-elle côté serveur ?"
    answer: "Le serveur garde chaque client connecté en mémoire : la connexion a un état"
    decoys:
      - "Le serveur n'a plus besoin de mémoire"
      - "Le serveur peut redémarrer à tout moment sans couper personne"
    why: "Contrairement à REST, sans état entre deux requêtes."
  - id: plusieurs-instances
    prompt: "Avec plusieurs instances du serveur, comment relayer un message à tous les destinataires ?"
    answer: "Par un pub/sub, comme celui de Redis"
    decoys:
      - "Par la base SQLite locale de chaque instance"
      - "C'est inutile : chaque instance voit tous les clients"
    why: "Chaque instance ne connaît que ses propres clients ; le pub/sub relaie le message à toutes."
  - id: sse
    prompt: "Un flux à sens unique, du serveur vers le navigateur : que préférer ?"
    answer: "Les Server-Sent Events, plus simples, sur du HTTP ordinaire"
    decoys:
      - "gRPC, appelé directement depuis le navigateur, sans proxy"
      - "Un WebSocket, obligatoirement"
    why: "Le navigateur ne parle pas gRPC nativement ; pour un flux descendant, les SSE suffisent."
  - id: serverless
    prompt: "Un hébergement en fonctions serverless à durée limitée : WebSocket y fonctionne-t-il simplement ?"
    answer: "Non : une connexion persistante demande un processus de longue durée, ou un service managé dédié"
    decoys:
      - "Oui : les fonctions serverless gardent les connexions ouvertes indéfiniment, sans surcoût"
      - "Non : WebSocket est interdit en HTTPS"
    why: "WebSocket fonctionne en HTTPS ; c'est la durée limitée des fonctions qui pose problème."
  - id: usages
    prompt: "Quel est un usage typique de WebSocket ?"
    answer: "Chat, notifications instantanées, édition collaborative"
    decoys:
      - "Le téléchargement d'un rapport mensuel en PDF"
      - "L'envoi d'un formulaire de contact"
    why: "Dès que le serveur doit pousser une information à l'instant où elle change."
  - id: requetes-ponctuelles
    prompt: "Des requêtes ponctuelles du client : faut-il WebSocket ?"
    answer: "Non : une API REST est plus simple et profite du cache HTTP"
    decoys:
      - "Oui : WebSocket est toujours plus rapide qu'une requête HTTP"
      - "Oui, avec gRPC-Web"
    why: "Une connexion persistante n'apporte rien si le client se contente de demander de temps en temps."
  - id: ouverture
    prompt: "Comment s'ouvre une connexion WebSocket ?"
    answer: "En transformant une requête HTTP en connexion persistante"
    decoys:
      - "Par un protocole sans lien avec HTTP, sur un port réservé"
      - "Par un e-mail de confirmation"
    why: "La connexion démarre comme une requête HTTP, puis change de protocole."
  - id: en-tete-upgrade
    prompt: "Quel en-tête de la requête HTTP initiale demande le passage au protocole WebSocket ?"
    answer: "Upgrade: websocket"
    decoys:
      - "Accept: websocket"
      - "Content-Type: websocket"
    why: "Le client demande un changement de protocole avec Upgrade (et Connection: Upgrade). Accept et Content-Type décrivent des formats de contenu."
  - id: statut-101
    prompt: "Quel code de statut le serveur renvoie-t-il pour accepter l'ouverture d'un WebSocket ?"
    answer: "101 Switching Protocols"
    decoys:
      - "200 OK"
      - "201 Created"
    why: "101 confirme le changement de protocole : la connexion cesse alors d'être du HTTP. Un 200 signifierait que le serveur a répondu en HTTP ordinaire."
  - id: wss
    prompt: "Quel schéma d'URL désigne une connexion WebSocket chiffrée par TLS ?"
    answer: "wss://"
    decoys:
      - "ws://"
      - "https+ws://"
    why: "ws:// est la version non chiffrée, comme http:// ; wss:// est l'équivalent de https://."
  - id: methode-get
    prompt: "Avec quelle méthode HTTP/1.1 le client envoie-t-il la requête d'ouverture d'un WebSocket ?"
    answer: "GET"
    decoys:
      - "POST"
      - "PUT"
    why: "La RFC 6455 impose une requête GET portant les en-têtes Upgrade ; aucun corps n'est envoyé."
  - id: sec-websocket-key
    prompt: "À quoi sert l'échange Sec-WebSocket-Key / Sec-WebSocket-Accept pendant l'ouverture ?"
    answer: "Prouver que le serveur a bien compris la demande WebSocket"
    decoys:
      - "Chiffrer tous les messages échangés ensuite, à la place de TLS"
      - "Authentifier l'utilisateur, comme un mot de passe partagé"
    why: "Le serveur calcule Accept à partir de la clé, ce qu'un serveur HTTP ordinaire ne ferait pas. Ce n'est ni du chiffrement ni de l'authentification."
  - id: trames
    prompt: "Comment les données circulent-elles sur une connexion WebSocket ouverte ?"
    answer: "En trames (frames), de texte ou binaires"
    decoys:
      - "En requêtes HTTP complètes, avec leurs en-têtes"
      - "En lignes de texte seul, séparées par des sauts de ligne"
    why: "Après l'ouverture, plus d'en-têtes HTTP : de petites trames, d'où le faible surcoût par message. Le binaire est permis."
  - id: ping-pong
    prompt: "À quoi servent les trames ping et pong d'une connexion WebSocket ?"
    answer: "Vérifier que la connexion est toujours vivante"
    decoys:
      - "Mesurer le débit et ajuster la compression des trames"
      - "Basculer vers un autre serveur sans coupure"
    why: "Un ping appelle un pong : sans réponse, la connexion est considérée comme morte. Ces trames maintiennent aussi l'activité face aux intermédiaires qui ferment les connexions inactives."
  - id: masquage
    prompt: "Quelle règle de la RFC 6455 s'applique aux trames envoyées par le client vers le serveur ?"
    answer: "Elles doivent être masquées"
    decoys:
      - "Elles doivent être compressées"
      - "Elles doivent être en texte, jamais en binaire"
    why: "Le masquage des trames du client protège les proxys intermédiaires contre l'empoisonnement de cache ; il ne remplace pas le chiffrement de TLS."
  - id: reconnexion
    prompt: "Une connexion WebSocket se coupe (réseau mobile, redéploiement du serveur). Qui doit la rouvrir ?"
    answer: "Le client, avec sa propre logique de reconnexion"
    decoys:
      - "Le navigateur, automatiquement, comme avec EventSource"
      - "Le serveur, qui rappelle lui-même le client déconnecté"
    why: "L'API WebSocket du navigateur ne se reconnecte pas seule, contrairement à EventSource (Server-Sent Events). Le serveur ne peut pas ouvrir de connexion vers un navigateur."
  - id: api-navigateur
    prompt: "Quel code JavaScript ouvre une connexion WebSocket dans le navigateur ?"
    answer: "new WebSocket(url)"
    decoys:
      - "new EventSource(url)"
      - "fetch(url, { upgrade: true })"
    why: "EventSource ouvre un flux Server-Sent Events, à sens unique ; fetch ne sait pas ouvrir de WebSocket."
  - id: evenement-message
    prompt: "Quel événement de l'objet WebSocket du navigateur signale l'arrivée d'un message ?"
    answer: "message"
    decoys:
      - "data"
      - "receive"
    why: "On écoute message (ou on définit onmessage) ; les autres événements sont open, close et error."
  - id: sous-protocole
    prompt: "À quoi sert l'en-tête Sec-WebSocket-Protocol à l'ouverture d'un WebSocket ?"
    answer: "Négocier un sous-protocole applicatif, comme STOMP ou MQTT"
    decoys:
      - "Choisir la version de TLS utilisée pour chiffrer la connexion"
      - "Fixer la taille maximale des messages échangés ensuite"
    why: "Le client propose des sous-protocoles, le serveur en retient un : client et serveur savent ainsi comment interpréter les messages."
  - id: format-messages
    prompt: "Le protocole WebSocket définit-il le format des messages applicatifs (types, champs) ?"
    answer: "Non : l'application choisit son format, souvent du JSON"
    decoys:
      - "Oui : du JSON obligatoire, validé par le navigateur à la réception"
      - "Oui : un schéma .proto imposé par la RFC 6455"
    why: "WebSocket transporte du texte ou du binaire sans en connaître le sens ; le format est une convention entre client et serveur."
  - id: origin
    prompt: "Pourquoi le serveur doit-il vérifier l'en-tête Origin à l'ouverture d'un WebSocket ?"
    answer: "CORS ne s'applique pas : un site tiers pourrait s'y connecter avec les cookies du visiteur"
    decoys:
      - "Le navigateur refuse d'envoyer le moindre message tant que le serveur n'a pas lu Origin"
      - "Origin contient la clé TLS du client, nécessaire pour déchiffrer chaque message"
    why: "Le navigateur envoie les cookies à l'ouverture, même depuis une autre origine : sans contrôle d'Origin, c'est la faille de détournement de WebSocket intersite."
  - id: reverse-proxy
    prompt: "Que doit gérer un reverse proxy placé devant un serveur WebSocket ?"
    answer: "Le relais de l'en-tête Upgrade et les connexions de longue durée"
    decoys:
      - "La mise en cache des messages WebSocket pour les clients suivants"
      - "La conversion de chaque message WebSocket en requête REST"
    why: "Sans relais de l'Upgrade, l'ouverture échoue ; avec un délai d'inactivité trop court, le proxy coupe des connexions saines."
  - id: socket-io
    prompt: "Qu'est-ce que Socket.IO par rapport à WebSocket ?"
    answer: "Une bibliothèque à protocole propre, qui utilise WebSocket quand il le peut"
    decoys:
      - "Le nom officiel du protocole décrit par la RFC 6455, publiée en 2011"
      - "Une API native des navigateurs qui remplace WebSocket"
    why: "Socket.IO ajoute reconnexion, salons et repli sur d'autres transports, mais son protocole est le sien : un client Socket.IO ne parle pas à un serveur WebSocket brut."
  - id: code-1000
    prompt: "Quel code de fermeture WebSocket indique une fermeture normale ?"
    answer: "1000"
    decoys:
      - "1006"
      - "200"
    why: "1000 signale une fermeture normale ; 1006 une fermeture anormale, sans trame de fermeture. 200 est un code HTTP."
  - id: tcp
    prompt: "Sur quelle connexion repose un WebSocket une fois ouvert ?"
    answer: "La connexion TCP de la requête HTTP initiale"
    decoys:
      - "Un flux UDP, ouvert pour réduire la latence"
      - "Une nouvelle connexion TCP, sur un autre port"
    why: "Le serveur répond 101 et la même connexion TCP continue en protocole WebSocket : pas de nouveau port, pas d'UDP."
  - id: permessage-deflate
    prompt: "Quelle extension standard de WebSocket compresse les messages ?"
    answer: "permessage-deflate"
    decoys:
      - "gzip-frames"
      - "per-frame-compression"
    why: "permessage-deflate est négociée à l'ouverture par l'en-tête Sec-WebSocket-Extensions ; les deux autres noms n'existent pas."
  - id: long-polling
    prompt: "Quelle technique HTTP servait à simuler le temps réel avant WebSocket ?"
    answer: "Le long polling : la requête reste ouverte jusqu'à un événement"
    decoys:
      - "Le pipelining : toutes les requêtes partent d'un seul coup, sans attendre"
      - "La redirection 302 répétée vers la même page à chaque seconde"
    why: "Le serveur garde la requête en attente et répond dès qu'il a du nouveau, puis le client relance. Le pipelining n'inverse pas l'initiative."
---
