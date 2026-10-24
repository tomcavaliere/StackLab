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
  - id: export-pret
    prompt: "Prévenir instantanément l'utilisateur, dans son navigateur, que son export est prêt"
    answer: websocket
    decoy: grpc
    why: "Sur une connexion WebSocket ouverte, le serveur pousse la notification dès que l'export est terminé. Le navigateur ne parle pas gRPC nativement : il faudrait gRPC-Web et un proxy."
  - id: debogage-avec-curl
    prompt: "Une API que les développeurs testent et déboguent à la main, en lisant les réponses"
    answer: rest
    decoy: grpc
    why: "Une API REST renvoie en général du JSON lisible, qu'on interroge avec curl ou le navigateur. Les messages binaires de gRPC ne se lisent pas sans outils dédiés."
  - id: edition-collaborative
    prompt: "Un éditeur de documents où chacun voit en direct les modifications des autres"
    answer: websocket
    decoy: kafka
    why: "WebSocket garde une connexion bidirectionnelle avec chaque navigateur pour envoyer et recevoir les modifications. Kafka relie des services entre eux ; il ne parle pas aux navigateurs."
  - id: passerelle-devant-services
    prompt: "Une passerelle unique que le front interroge pour obtenir en une requête des données venant de plusieurs services"
    answer: graphql
    decoy: grpc
    why: "GraphQL sert souvent de couche d'agrégation devant plusieurs back-ends, et le client y choisit ses champs. gRPC relie les services entre eux, mais le navigateur ne le parle pas nativement."
  - id: documentation-et-clients-generes
    prompt: "Décrire une API dans un format standard, pour en générer la documentation et les clients des partenaires"
    answer: rest
    decoy: websocket
    why: "Le format OpenAPI décrit une API REST et permet d'en générer documentation et clients. WebSocket ouvre une connexion où circulent des messages libres, sans ce contrat de ressources et de méthodes."
  - id: instances-interchangeables
    prompt: "Ajouter des instances de l'API derrière un répartiteur, sans se soucier de l'instance à laquelle chaque client parle"
    answer: rest
    decoy: websocket
    why: "En REST, le serveur ne garde pas d'état de session entre deux requêtes : n'importe quelle instance peut répondre. Une connexion WebSocket a un état, gardé en mémoire par l'instance qui la tient."
  - id: fonctions-a-duree-limitee
    prompt: "Une API hébergée sur des fonctions serverless à durée d'exécution limitée"
    answer: rest
    decoy: websocket
    why: "Chaque requête REST est traitée puis terminée, ce qui convient à une fonction courte. Une connexion WebSocket persistante demande un processus de longue durée, ou un service managé dédié."
  - id: reagir-sans-etre-appele
    prompt: "Quand une commande est passée, le stock, la facturation et l'analytique réagissent chacun de leur côté, sans que le service des commandes les appelle"
    answer: kafka
    decoy: grpc
    why: "Le service des commandes publie l'événement dans un topic Kafka et chaque service le consomme à son rythme. Avec gRPC, il devrait appeler lui-même chaque service et connaître leur liste."
  - id: worker-qui-plante
    prompt: "Confier des traitements à un groupe de workers : si l'un plante en cours de route, son travail est confié à un autre"
    answer: rabbitmq
    decoy: grpc
    why: "Dans RabbitMQ, un message non acquitté est redistribué à un autre consommateur. Un appel gRPC est direct : si le service plante, l'appelant reçoit une erreur et doit gérer lui-même la reprise."
  - id: messages-en-echec
    prompt: "Mettre de côté les messages qui échouent à répétition, pour les analyser plus tard"
    answer: rabbitmq
    decoy: rest
    why: "RabbitMQ peut envoyer les messages en échec dans une file dédiée (dead-letter). Un appel REST en échec est perdu si l'appelant ne le conserve pas lui-même."
  - id: champs-inutiles-mobile
    prompt: "Une application mobile sur réseau lent qui ne veut recevoir que les champs qu'elle affiche"
    answer: graphql
    decoy: rest
    why: "En GraphQL, la requête décrit exactement les champs voulus et la réponse ne contient rien d'autre. Un endpoint REST renvoie sa représentation complète, souvent avec des champs inutiles."
  - id: reponse-immediate-entre-services
    prompt: "Un service interne doit obtenir immédiatement la réponse d'un autre, avec des messages compacts et typés"
    answer: grpc
    decoy: kafka
    why: "gRPC fait un appel direct, avec réponse, en messages binaires définis par un contrat .proto. Kafka découple producteurs et consommateurs : il n'y a pas de réponse immédiate à attendre."
  - id: jeu-multijoueur-navigateur
    prompt: "Un jeu multijoueur dans le navigateur, où les actions des joueurs s'échangent en continu dans les deux sens"
    answer: websocket
    decoy: grpc
    why: "WebSocket est fait pour une connexion bidirectionnelle persistante avec le navigateur. gRPC sait faire du streaming dans les deux sens, mais entre services : le navigateur ne le parle pas nativement."
  - id: abonne-deconnecte
    prompt: "Un service arrêté une journée doit retrouver, à son retour, tous les événements publiés pendant son absence"
    answer: kafka
    decoy: redis
    why: "Kafka conserve les messages selon sa durée de rétention, et chaque consommateur reprend à sa position de lecture. Le pub/sub de Redis ne délivre un message qu'aux abonnés connectés à ce moment-là."
  - id: types-du-front-generes
    prompt: "Générer les types du front à partir d'un schéma qui décrit toutes les données exposées et leurs relations"
    answer: graphql
    decoy: websocket
    why: "Le schéma typé de GraphQL sert de contrat et de documentation, et l'outillage en génère des types pour le front. WebSocket transporte des messages sans imposer de schéma."
  - id: lisser-un-pic
    prompt: "Absorber un pic de demandes : le front les dépose, un service les traite à son rythme"
    answer: rabbitmq
    decoy: rest
    why: "Les messages s'accumulent dans la file de RabbitMQ et les consommateurs les traitent à leur rythme. En appel REST direct, le service doit tout absorber au moment du pic, ou les requêtes échouent."
  - id: champs-ajoutes-sans-version
    prompt: "Faire évoluer une API mobile en ajoutant des champs, sans multiplier les versions d'endpoints"
    answer: graphql
    decoy: rest
    why: "En GraphQL, chaque client ne reçoit que les champs qu'il demande : un champ ajouté au schéma ne change rien pour les anciens. En REST, changer la représentation d'une ressource pousse souvent à créer une nouvelle version."
---
