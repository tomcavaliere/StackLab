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
---
