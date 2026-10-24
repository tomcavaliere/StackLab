---
questions:
  - id: role
    prompt: "Qu'est-ce que RabbitMQ ?"
    answer: "Un courtier de messages : des files que des consommateurs traitent puis acquittent"
    decoys:
      - "Un journal d'événements conservé et rejouable sur une longue période, lu par chaque consommateur à son rythme"
      - "Un cache clé-valeur en mémoire"
    why: "Les producteurs déposent des messages, les consommateurs les traitent et les acquittent. Le journal rejouable, c'est Kafka."
  - id: acquittement
    prompt: "Quand un message est-il retiré de la file ?"
    answer: "Une fois acquitté par le consommateur"
    decoys:
      - "Dès qu'il est lu"
      - "Jamais : il est conservé selon une durée de rétention"
    why: "Tant qu'il n'est pas acquitté, le message reste à traiter."
  - id: consommateur-plante
    prompt: "Que devient un message si le consommateur plante avant de l'acquitter ?"
    answer: "Il est redistribué"
    decoys:
      - "Il est perdu"
      - "Il est envoyé à tous les consommateurs à la fois"
    why: "Un message non acquitté est remis à disposition : c'est la garantie de livraison de RabbitMQ."
  - id: dead-letter
    prompt: "Où peuvent partir les messages en échec ?"
    answer: "Dans une file dédiée (dead-letter)"
    decoys:
      - "Dans un topic Kafka dédié aux erreurs"
      - "Dans les journaux du système"
    why: "La file dead-letter recueille les messages qui échouent, pour les analyser ou les rejouer."
  - id: routage
    prompt: "Quels modes de routage RabbitMQ propose-t-il ?"
    answer: "Un consommateur par message, diffusion à tous, routage par clé ou par motif"
    decoys:
      - "Uniquement premier arrivé, premier servi"
      - "Uniquement par partition, comme Kafka, avec une position de lecture par consommateur"
    why: "Le routage riche est l'un des atouts de RabbitMQ face à Kafka."
  - id: protocole
    prompt: "Quel est le protocole historique de RabbitMQ ?"
    answer: "AMQP 0-9-1"
    decoys:
      - "HTTP/3"
      - "gRPC"
    why: "RabbitMQ parle historiquement AMQP 0-9-1."
  - id: erlang
    prompt: "En quel langage RabbitMQ est-il écrit ?"
    answer: "Erlang"
    decoys:
      - "Java"
      - "Go"
    why: "RabbitMQ (2007) est écrit en Erlang ; Kafka tourne sur la JVM."
  - id: celery
    prompt: "Quel lien RabbitMQ a-t-il avec Celery ?"
    answer: "C'est le broker historique et recommandé de Celery"
    decoys:
      - "Celery est une interface graphique pour RabbitMQ"
      - "RabbitMQ exécute lui-même le code des tâches Celery"
    why: "RabbitMQ transporte les tâches ; ce sont les workers Celery qui les exécutent."
  - id: gros-flux
    prompt: "Un très gros flux d'événements à conserver et rejouer pour de nombreux consommateurs indépendants. Que choisir ?"
    answer: "Kafka, conçu pour ça"
    decoys:
      - "RabbitMQ, avec une file classique à rétention infinie"
      - "RabbitMQ, car un message acquitté reste disponible pour les autres"
    why: "Dans une file classique, un message acquitté sort de la file. La fiche oriente vers Kafka pour ce besoin."
  - id: streams
    prompt: "Qu'existe-t-il dans RabbitMQ depuis la version 3.9 ?"
    answer: "Des streams rejouables"
    decoys:
      - "Un moteur SQL intégré"
      - "Le mode KRaft"
    why: "Les streams permettent de relire des messages. Le mode KRaft est celui de Kafka 4.0."
  - id: exchange
    prompt: "En AMQP 0-9-1, à quoi un producteur RabbitMQ envoie-t-il ses messages ?"
    answer: "À un exchange, qui les route vers des files"
    decoys:
      - "Directement à un consommateur désigné par son nom"
      - "À une partition choisie par hachage de la clé du message"
    why: "Le producteur publie sur un exchange ; ce sont les règles de liaison qui décident des files de destination. Les partitions sont le modèle de Kafka."
  - id: binding
    prompt: "Qu'est-ce qu'un binding dans RabbitMQ ?"
    answer: "Une règle qui relie un exchange à une file"
    decoys:
      - "Une connexion TCP ouverte entre un client et le broker"
      - "L'accusé de réception envoyé après le traitement d'un message"
    why: "Le binding indique à l'exchange vers quelles files acheminer les messages, avec éventuellement une clé de liaison. La connexion et l'acquittement sont d'autres notions."
  - id: fanout
    prompt: "Quel type d'exchange RabbitMQ copie chaque message dans toutes les files qui lui sont liées ?"
    answer: "fanout"
    decoys:
      - "direct"
      - "topic"
      - "headers"
    why: "L'exchange fanout ignore la clé de routage et diffuse à toutes ses files. direct compare la clé exacte, topic la compare à des motifs, headers regarde les en-têtes."
  - id: diese-topic
    prompt: "Dans une clé de liaison d'exchange topic, que représente « # » ?"
    answer: "Zéro, un ou plusieurs mots"
    decoys:
      - "Exactement un mot"
      - "Uniquement le dernier mot de la clé"
      - "Un nombre entier quelconque"
    why: "Les clés sont des mots séparés par des points : « # » remplace zéro ou plusieurs mots, « * » exactement un."
  - id: exchange-direct
    prompt: "Comment un exchange direct de RabbitMQ choisit-il ses files de destination ?"
    answer: "Celles dont la clé de liaison égale la clé de routage"
    decoys:
      - "Toutes les files liées, sans regarder la clé du message"
      - "La file qui a le moins de messages en attente à cet instant"
    why: "L'exchange direct fait une comparaison exacte des clés. Diffuser à toutes les files, c'est fanout ; RabbitMQ ne choisit pas la file selon sa charge."
  - id: exchange-defaut
    prompt: "Que fait l'exchange par défaut de RabbitMQ (au nom vide) ?"
    answer: "Il route vers la file qui porte le nom de la clé de routage"
    decoys:
      - "Il supprime tous les messages qui n'ont pas de destinataire explicite"
      - "Il diffuse chaque message à toutes les files du virtual host"
    why: "Chaque file est liée automatiquement à l'exchange par défaut sous son propre nom : publier avec la clé « emails » envoie dans la file « emails »."
  - id: prefetch
    prompt: "À quoi sert le prefetch (basic.qos) d'un consommateur RabbitMQ ?"
    answer: "Limiter les messages non acquittés confiés à un consommateur"
    decoys:
      - "Précharger les messages sur disque avant que le producteur les publie"
      - "Fixer la durée de vie maximale des messages dans la file"
    why: "Le prefetch plafonne le nombre de messages en cours chez un consommateur, ce qui répartit mieux le travail entre workers. La durée de vie relève du TTL."
  - id: survivre-redemarrage
    prompt: "Pour qu'un message d'une file classique survive au redémarrage du broker, que faut-il ?"
    answer: "Une file durable et un message persistant"
    decoys:
      - "Un exchange fanout lié à au moins deux files"
      - "L'acquittement automatique côté consommateur"
    why: "Une file non durable disparaît au redémarrage, et un message non persistant n'est pas écrit sur disque. Le type d'exchange et le mode d'acquittement n'y changent rien."
  - id: quorum-queue
    prompt: "Qu'est-ce qu'une quorum queue dans RabbitMQ ?"
    answer: "Une file répliquée sur plusieurs nœuds avec Raft"
    decoys:
      - "Une file qui attend qu'une majorité de consommateurs ait lu chaque message"
      - "Une file temporaire supprimée dès que son client se déconnecte"
    why: "Les quorum queues répliquent leur contenu par l'algorithme de consensus Raft : une majorité de nœuds doit confirmer une écriture. Le quorum porte sur les nœuds, pas sur les consommateurs."
  - id: auto-ack
    prompt: "Quel risque prend un consommateur RabbitMQ en mode d'acquittement automatique ?"
    answer: "Perdre un message s'il plante pendant son traitement"
    decoys:
      - "Recevoir chaque message deux fois, une fois par acquittement envoyé"
      - "Bloquer toute la file tant qu'il n'a pas répondu au broker"
    why: "En auto-ack, le message est considéré comme acquitté dès sa livraison : si le consommateur plante ensuite, il n'est pas redistribué. L'acquittement manuel après traitement évite cette perte."
  - id: nack
    prompt: "Comment un consommateur RabbitMQ refuse-t-il un message pour qu'il soit remis dans la file ?"
    answer: "basic.nack ou basic.reject avec requeue"
    decoys:
      - "basic.qos avec requeue"
      - "basic.cancel sur le message"
      - "basic.ack avec un délai"
    why: "nack et reject refusent un message ; avec requeue il revient dans la file, sans requeue il part en dead-letter si elle est configurée. qos règle le prefetch, cancel arrête un abonnement."
  - id: ttl
    prompt: "Que permet le TTL d'un message ou d'une file RabbitMQ ?"
    answer: "Faire expirer les messages après un délai"
    decoys:
      - "Dupliquer les messages après un délai vers toutes les files liées"
      - "Ralentir le producteur quand la file dépasse un délai d'attente"
    why: "Un message expiré est retiré de la file, ou envoyé vers une dead-letter si elle est configurée. Le TTL ne duplique rien et ne freine pas le producteur."
  - id: management
    prompt: "Que fournit le plugin de management de RabbitMQ ?"
    answer: "Une interface web et une API HTTP d'administration"
    decoys:
      - "Un moteur de requêtes SQL sur le contenu des files"
      - "La réplication automatique des files vers un cluster Kafka"
    why: "Le plugin de management affiche files, exchanges, connexions et débits, et expose une API HTTP pour les automatiser. Il n'y a pas de SQL sur les files."
  - id: port
    prompt: "Quel est le port AMQP par défaut de RabbitMQ ?"
    answer: "5672"
    decoys:
      - "15672"
      - "9092"
      - "6379"
    why: "AMQP écoute sur 5672 ; 15672 est le port de l'interface de management. 9092 est celui de Kafka, 6379 celui de Redis."
  - id: vhost
    prompt: "Qu'est-ce qu'un virtual host (vhost) dans RabbitMQ ?"
    answer: "Un espace isolé de files, d'exchanges et de droits"
    decoys:
      - "Une machine virtuelle qui héberge un nœud du cluster RabbitMQ"
      - "Un nom DNS attribué automatiquement à chaque file pour y accéder"
    why: "Un vhost cloisonne logiquement un broker : ses files, exchanges et permissions sont séparés de ceux des autres vhosts. Ce n'est ni une VM ni un nom DNS."
  - id: autres-protocoles
    prompt: "Quels autres protocoles RabbitMQ sait-il parler, en plus d'AMQP ?"
    answer: "MQTT et STOMP"
    decoys:
      - "SMTP et IMAP"
      - "gRPC et GraphQL"
      - "Le protocole natif de Kafka"
    why: "Des plugins officiels ajoutent MQTT (objets connectés) et STOMP. SMTP et IMAP sont des protocoles de messagerie électronique, gRPC et GraphQL des styles d'API."
  - id: workers-concurrents
    prompt: "Deux workers consomment la même file RabbitMQ. Comment se partagent-ils les messages ?"
    answer: "Chaque message va à un seul des deux"
    decoys:
      - "Chacun reçoit une copie de chaque message"
      - "Le premier traite tout, le second attend qu'il tombe en panne"
    why: "Une file distribue ses messages entre ses consommateurs (consommateurs concurrents). Pour que chacun reçoive tout, il faut une file par worker, liée à un exchange fanout."
  - id: cookie-erlang
    prompt: "Comment les nœuds d'un cluster RabbitMQ s'authentifient-ils entre eux ?"
    answer: "Par un secret partagé, le cookie Erlang"
    decoys:
      - "Par un registre ZooKeeper partagé"
      - "Par une clé d'API générée dans l'interface web"
    why: "Les nœuds communiquent par la distribution Erlang, qui exige le même cookie sur chaque nœud. ZooKeeper était le coordinateur historique de Kafka."
  - id: files-miroir
    prompt: "Quel type de file remplace les files classiques miroir, retirées dans RabbitMQ 4.0 ?"
    answer: "Les quorum queues"
    decoys:
      - "Les files exclusives"
      - "Les exchanges fanout"
      - "Les files paresseuses (lazy)"
    why: "Le mirroring des files classiques, déprécié depuis longtemps, a disparu en 4.0 : la réplication passe par les quorum queues (ou les streams). Une file exclusive appartient à une seule connexion."
  - id: publisher-confirms
    prompt: "Comment un producteur RabbitMQ sait-il que le broker a bien pris en charge son message ?"
    answer: "Grâce aux publisher confirms"
    decoys:
      - "Grâce à l'acquittement du consommateur, relayé au producteur"
      - "Grâce au code HTTP 200 renvoyé par le broker"
    why: "Avec les publisher confirms, le broker confirme au producteur chaque message accepté. L'acquittement du consommateur n'est jamais transmis au producteur, et AMQP n'est pas HTTP."
---
