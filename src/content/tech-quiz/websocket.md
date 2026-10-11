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
---
