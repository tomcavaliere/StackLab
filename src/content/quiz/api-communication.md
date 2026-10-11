---
title: API & communication
description: "REST, GraphQL, gRPC, WebSocket, messages : comment les clients et les services se parlent."
questions:
  - id: api-publique-partenaires
    prompt: "Une API publique, simple à appeler depuis n'importe quel langage par des partenaires"
    answer: rest
    decoy: grpc
    why: "REST s'appuie sur HTTP et JSON : tout langage sait faire une requête, et les réponses se lisent. gRPC transporte du binaire et demande du code généré à partir d'un contrat .proto."
  - id: ecran-en-une-requete
    prompt: "Un écran mobile qui affiche un profil, ses publications et leurs commentaires, en une seule requête"
    answer: graphql
    decoy: rest
    why: "Avec GraphQL, le client décrit exactement les champs voulus, imbrications comprises, en un appel. En REST, il faudrait plusieurs allers-retours ou un endpoint sur mesure."
  - id: appels-internes-polyglottes
    prompt: "Des appels internes très fréquents entre microservices écrits dans plusieurs langages, avec un contrat strict"
    answer: grpc
    decoy: graphql
    why: "gRPC génère client et serveur dans chaque langage à partir d'un contrat .proto, et sérialise en binaire sur HTTP/2. GraphQL vise des clients d'interface qui choisissent leurs champs."
  - id: chat-en-direct
    prompt: "Un chat où chaque message arrive instantanément chez les autres participants"
    answer: websocket
    decoy: rest
    why: "La connexion WebSocket reste ouverte dans les deux sens : le serveur pousse chaque message dès qu'il arrive. En REST, le client devrait interroger le serveur en boucle."
  - id: cache-http-catalogue
    prompt: "Des réponses de catalogue mises en cache par les navigateurs et le CDN"
    answer: rest
    decoy: graphql
    why: "En REST, chaque ressource a son URL et le cache HTTP s'applique tel quel. GraphQL passe en général par un seul endpoint en POST, qui contourne ce cache."
  - id: appel-depuis-le-navigateur
    prompt: "Une API appelée directement depuis le navigateur, sans proxy intermédiaire"
    answer: rest
    decoy: grpc
    why: "Les navigateurs ne parlent pas gRPC nativement : il faut gRPC-Web et un proxy. Une API REST s'appelle avec fetch."
  - id: flux-continu-entre-services
    prompt: "Un service envoie des mesures en continu à un autre et reçoit des consignes sur le même appel"
    answer: grpc
    decoy: rest
    why: "gRPC gère le streaming dans les deux sens sur HTTP/2. REST suit un modèle requête-réponse."
  - id: service-momentanement-arrete
    prompt: "Prévenir la facturation de chaque commande, même si son service est momentanément arrêté"
    answer: rabbitmq
    decoy: rest
    why: "Le message attend dans la file de RabbitMQ jusqu'à ce que la facturation le traite et l'acquitte. Un appel REST échoue si le service ne répond pas."
  - id: relire-l-historique
    prompt: "Publier chaque changement de commande pour que de futurs services puissent relire tout l'historique"
    answer: kafka
    decoy: websocket
    why: "Kafka conserve un journal durable et rejouable. WebSocket pousse des messages à des clients connectés, sans rien conserver."
  - id: crud-un-seul-front
    prompt: "Une API CRUD de back-office, consommée par un seul front"
    answer: rest
    decoy: graphql
    why: "Pour des ressources simples et un seul client, REST est plus direct à écrire, à mettre en cache et à sécuriser. GraphQL se justifie quand de nombreux clients ont des besoins variés."
  - id: clients-aux-besoins-varies
    prompt: "Une API commune au web et au mobile, qui veulent chacun des champs différents des mêmes données"
    answer: graphql
    decoy: grpc
    why: "GraphQL expose un schéma typé dans lequel chaque client choisit ses champs. gRPC impose des messages fixés par le contrat et vise les échanges entre services."
  - id: position-du-livreur
    prompt: "Afficher en direct la position du livreur sur la carte du client"
    answer: websocket
    decoy: rest
    why: "Le serveur pousse chaque nouvelle position sur la connexion ouverte. En REST, l'application devrait interroger le serveur sans arrêt."
  - id: relayer-entre-instances
    prompt: "Relayer un message aux clients WebSocket connectés à plusieurs instances du serveur"
    answer: redis
    decoy: memcached
    why: "Chaque instance ne connaît que ses propres connexions : le pub/sub de Redis relaie le message à toutes. Memcached n'a pas de pub/sub."
---
