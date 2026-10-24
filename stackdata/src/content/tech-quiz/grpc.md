---
questions:
  - id: contrat
    prompt: "Où décrit-on le contrat d'un service gRPC ?"
    answer: "Dans un fichier .proto, avec Protocol Buffers"
    decoys:
      - "Dans un schéma GraphQL"
      - "Dans un fichier OpenAPI en JSON, partagé entre les équipes"
    why: "Le fichier .proto décrit services et messages. Le schéma GraphQL et OpenAPI sont les contrats de GraphQL et de REST."
  - id: generation
    prompt: "Que produit l'outillage gRPC à partir du contrat ?"
    answer: "Le client et le serveur, dans chaque langage"
    decoys:
      - "Le schéma de la base de données"
      - "Une interface web d'administration pour chaque service"
    why: "Appeler un autre service ressemble alors à appeler une fonction typée."
  - id: binaire
    prompt: "Comment les messages gRPC sont-ils sérialisés ?"
    answer: "En binaire, plus compact que du JSON"
    decoys:
      - "En JSON lisible, compressé avec gzip"
      - "En XML"
    why: "Protocol Buffers sérialise en binaire : moins d'octets à transporter et à analyser."
  - id: http2
    prompt: "Sur quel transport gRPC s'appuie-t-il ?"
    answer: "HTTP/2, qui multiplexe les appels sur une même connexion"
    decoys:
      - "HTTP/1.0, avec une connexion par appel"
      - "SMTP, comme le courrier électronique, pour profiter des files d'attente"
    why: "Plusieurs appels partagent une connexion, sans attendre les uns après les autres."
  - id: streaming
    prompt: "Que permet le streaming de gRPC ?"
    answer: "Des flux continus de messages, dans les deux sens, sur le même appel"
    decoys:
      - "La diffusion de vidéos"
      - "La réplication d'une base de données entre plusieurs datacenters, en continu"
    why: "Télémétrie, mises à jour en direct : un service peut envoyer et recevoir un flux de messages."
  - id: navigateur
    prompt: "Un navigateur peut-il appeler directement un service gRPC ?"
    answer: "Non : il faut gRPC-Web et un proxy"
    decoys:
      - "Oui, nativement, comme avec fetch"
      - "Oui, mais uniquement en HTTP/1.1"
    why: "Le navigateur ne parle pas gRPC nativement."
  - id: api-publique
    prompt: "API publique pour des partenaires : gRPC ou REST ?"
    answer: "REST et JSON, plus accessibles"
    decoys:
      - "gRPC, plus simple à appeler pour un partenaire"
      - "gRPC, car tout langage lit le binaire sans outil"
    why: "Tout client sait faire une requête HTTP et lire du JSON ; gRPC demande de générer du code à partir du .proto."
  - id: debogage
    prompt: "Pourquoi le débogage à la main est-il plus difficile avec gRPC ?"
    answer: "Les messages binaires ne se lisent pas avec curl : il faut des outils dédiés"
    decoys:
      - "gRPC ne renvoie jamais de code d'erreur : un appel raté ne laisse aucune trace"
      - "Les appels sont chiffrés deux fois"
    why: "Un échange REST se lit à l'œil nu ; un message Protocol Buffers, non."
  - id: usage
    prompt: "Quel est l'usage typique de gRPC ?"
    answer: "La communication interne entre microservices, surtout écrits en plusieurs langages"
    decoys:
      - "Une API publique appelée directement depuis le navigateur des visiteurs"
      - "L'envoi d'e-mails"
    why: "Contrats stricts, code généré, appels fréquents : gRPC brille entre services."
  - id: origine
    prompt: "D'où vient gRPC ?"
    answer: "De Google, open-source depuis 2015, aujourd'hui projet de la CNCF"
    decoys:
      - "De Facebook, en même temps que GraphQL"
      - "De la fondation Apache, en 2011, en même temps que Kafka et pour les mêmes usages"
    why: "GraphQL vient de Facebook ; gRPC de Google."
  - id: quatre-types
    prompt: "Combien de types d'appels gRPC distingue-t-on selon le streaming ?"
    answer: "Quatre : unaire, flux serveur, flux client, bidirectionnel"
    decoys:
      - "Deux : synchrone et asynchrone, sans autre distinction"
      - "Trois : lecture, écriture et suppression, comme en REST"
    why: "Chaque côté peut envoyer un seul message ou un flux, d'où quatre combinaisons. Synchrone ou asynchrone dépend de l'API générée, pas du type d'appel."
  - id: unaire
    prompt: "Qu'est-ce qu'un appel gRPC unaire ?"
    answer: "Une requête, une réponse, comme un appel de fonction"
    decoys:
      - "Un message envoyé sans attendre de réponse du serveur"
      - "Un flux ouvert tant que le client reste connecté"
    why: "L'appel unaire est le cas le plus simple : un message dans chaque sens. Un flux ouvert relève du streaming."
  - id: numeros-champs
    prompt: "Dans un message .proto, à quoi servent les numéros comme = 1 ou = 2 après chaque champ ?"
    answer: "Ils identifient le champ dans l'encodage binaire"
    decoys:
      - "Ils fixent l'ordre d'affichage dans la documentation"
      - "Ils donnent la valeur par défaut de chaque champ"
    why: "Le message binaire ne contient pas le nom des champs, seulement leur numéro. Les valeurs par défaut dépendent du type, pas de ce numéro."
  - id: reutiliser-numero
    prompt: "Pourquoi ne faut-il pas réattribuer à un nouveau champ le numéro d'un champ supprimé d'un .proto ?"
    answer: "D'anciens clients décoderaient la valeur comme l'ancien champ"
    decoys:
      - "Le compilateur refuse tout numéro qui a déjà servi dans un fichier"
      - "Les numéros servent de clé primaire dans la base du service"
    why: "Le numéro est la seule identité du champ sur le fil : un client compilé avec l'ancien .proto lirait la nouvelle donnée sous l'ancien sens. Le compilateur, lui, ne connaît pas l'historique."
  - id: reserved
    prompt: "Quel mot-clé d'un fichier .proto empêche de réutiliser le numéro ou le nom d'un champ supprimé ?"
    answer: "reserved"
    decoys:
      - "deprecated"
      - "final"
    why: "reserved fait échouer la compilation si le numéro ou le nom revient. L'option deprecated signale un champ encore présent, sans rien interdire."
  - id: protoc
    prompt: "Quel outil compile un fichier .proto en code pour chaque langage ?"
    answer: "protoc, le compilateur de Protocol Buffers"
    decoys:
      - "javac, muni d'une extension dédiée à gRPC"
      - "graphql-codegen, comme pour un schéma GraphQL"
    why: "protoc, avec les plugins de chaque langage, génère messages, clients et serveurs. graphql-codegen part d'un schéma GraphQL."
  - id: deadline
    prompt: "Comment un client gRPC évite-t-il d'attendre indéfiniment la réponse d'un service lent ?"
    answer: "En fixant une deadline sur l'appel"
    decoys:
      - "En passant l'appel en streaming"
      - "En rejouant l'appel en HTTP/1.1"
    why: "La deadline borne la durée de l'appel ; une fois dépassée, l'appel échoue côté client et peut être abandonné côté serveur."
  - id: deadline-exceeded
    prompt: "Quel code de statut gRPC signale qu'un appel a dépassé sa deadline ?"
    answer: "DEADLINE_EXCEEDED"
    decoys:
      - "REQUEST_TIMEOUT"
      - "UNAVAILABLE"
    why: "DEADLINE_EXCEEDED est le code dédié. UNAVAILABLE signale un service injoignable ; REQUEST_TIMEOUT n'existe pas en gRPC (408 est un code HTTP)."
  - id: codes-statut
    prompt: "Comment un service gRPC signale-t-il une erreur à l'appelant ?"
    answer: "Par un code de statut gRPC, comme NOT_FOUND"
    decoys:
      - "Par un code HTTP 404 ou 500, comme une API REST"
      - "Par un message en texte libre, sans aucun code"
    why: "gRPC a ses propres codes de statut, transmis avec un message ; le code HTTP de la réponse ne porte pas l'erreur métier."
  - id: metadonnees
    prompt: "Comment transmettre un jeton d'authentification avec un appel gRPC ?"
    answer: "Dans les métadonnées de l'appel, l'équivalent des en-têtes"
    decoys:
      - "Dans le fichier .proto, en clair, partagé entre services"
      - "Dans le nom de la méthode appelée, en suffixe du service"
    why: "Les métadonnées sont des paires clé-valeur envoyées avec l'appel, comme des en-têtes HTTP. Un secret n'a rien à faire dans un contrat partagé."
  - id: nouveau-champ
    prompt: "Ajouter un nouveau champ à un message .proto casse-t-il les clients compilés avec l'ancienne version ?"
    answer: "Non : un ancien client ignore les champs qu'il ne connaît pas"
    decoys:
      - "Oui : il faut régénérer et redéployer tous les clients en même temps"
      - "Oui, sauf si le nouveau champ porte le numéro 0"
    why: "Protocol Buffers est conçu pour cette évolution : les champs inconnus sont ignorés au décodage. Le numéro 0 n'est d'ailleurs pas autorisé."
  - id: mot-cle-rpc
    prompt: "Dans un fichier .proto, quel mot-clé déclare une méthode d'un service ?"
    answer: "rpc"
    decoys:
      - "func"
      - "method"
    why: "Une méthode s'écrit rpc Nom(Requete) returns (Reponse) dans un bloc service."
  - id: mot-cle-stream
    prompt: "Comment indique-t-on un flux de messages dans la signature d'une méthode .proto ?"
    answer: "Avec le mot-clé stream devant le type du message"
    decoys:
      - "Avec des crochets [] après le type du message"
      - "Avec l'option streaming = true sur le service entier"
    why: "stream se place devant le type de la requête, de la réponse ou des deux, ce qui donne les trois formes de streaming."
  - id: repartition-charge
    prompt: "Pourquoi un répartiteur de charge de niveau connexion (L4) répartit-il mal les appels gRPC ?"
    answer: "Les appels partagent une connexion HTTP/2 durable, qui reste sur une instance"
    decoys:
      - "gRPC masque l'adresse des instances, que le répartiteur ne peut plus voir"
      - "Un répartiteur L4 rejette tout trafic binaire qui n'est pas du JSON"
    why: "Le multiplexage concentre beaucoup d'appels sur une seule connexion : il faut répartir appel par appel (L7) ou côté client."
  - id: reflexion
    prompt: "Quel mécanisme permet à un outil d'appeler un service gRPC sans disposer de son fichier .proto ?"
    answer: "La réflexion serveur, si le service l'active"
    decoys:
      - "L'introspection GraphQL, exposée sur le même port"
      - "Le fichier OpenAPI que gRPC publie automatiquement"
    why: "Avec la réflexion, le serveur décrit lui-même ses services et messages. gRPC ne publie pas d'OpenAPI, et l'introspection est propre à GraphQL."
  - id: grpcurl
    prompt: "Quel outil joue pour gRPC le rôle de curl en ligne de commande ?"
    answer: "grpcurl"
    decoys:
      - "wget"
      - "netcat"
    why: "grpcurl encode et décode les messages Protocol Buffers ; wget et netcat ne savent pas le faire."
  - id: transcodage
    prompt: "Comment exposer un service gRPC en JSON sur HTTP pour des clients REST ?"
    answer: "Par un transcodage, avec un outil comme grpc-gateway"
    decoys:
      - "En renommant le fichier .proto en fichier .json"
      - "En configurant le service pour répondre en HTTP/1.0"
    why: "Un proxy de transcodage traduit les requêtes JSON en appels gRPC et inversement ; changer d'extension ou de version HTTP ne change pas le format."
  - id: protobuf-seul
    prompt: "Protocol Buffers est-il réservé à gRPC ?"
    answer: "Non : c'est un format de sérialisation utilisable seul"
    decoys:
      - "Oui : il n'existe qu'à l'intérieur d'un appel gRPC"
      - "Oui, et il ne sait encoder que des chaînes de texte"
    why: "Protocol Buffers sert aussi à stocker ou à échanger des messages hors gRPC, et encode nombres, booléens, listes et messages imbriqués."
  - id: sigle-rpc
    prompt: "Que signifie le « RPC » de gRPC ?"
    answer: "Remote Procedure Call : appel de procédure à distance"
    decoys:
      - "Real-time Push Channel : canal de poussée en temps réel"
      - "Resource Path Convention : convention de chemins de ressources"
    why: "gRPC fait ressembler un appel réseau à un appel de fonction locale. Les chemins de ressources sont l'affaire de REST."
  - id: health-check
    prompt: "Comment vérifier de façon standard qu'un service gRPC est en état de répondre ?"
    answer: "Par le protocole de health checking défini par gRPC"
    decoys:
      - "Par une requête GET sur /health, imposée par gRPC"
      - "Par la réflexion serveur, qui renvoie l'état du service"
    why: "gRPC définit un service de santé standard (grpc.health.v1) que les orchestrateurs savent interroger. La réflexion décrit les services, pas leur état."
---
