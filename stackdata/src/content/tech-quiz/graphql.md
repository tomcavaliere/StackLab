---
questions:
  - id: principe
    prompt: "Quel est le principe de GraphQL ?"
    answer: "Le client décrit exactement les données voulues et les reçoit en une seule requête"
    decoys:
      - "Le serveur expose une URL par ressource, et le client enchaîne les appels"
      - "Le serveur pousse les données sans que le client les demande"
    why: "Une URL par ressource, c'est REST ; pousser des données, c'est le rôle des subscriptions ou de WebSocket."
  - id: schema
    prompt: "Sur quoi repose une API GraphQL ?"
    answer: "Un schéma typé, qui sert de contrat et de documentation"
    decoys:
      - "Un fichier .proto compilé en binaire, partagé entre client et serveur"
      - "Aucun schéma : chaque requête est libre"
    why: "Le schéma décrit les données exposées ; l'outillage en génère des types pour le front. Le .proto est le contrat de gRPC."
  - id: mutations
    prompt: "Comment écrit-on des données avec GraphQL ?"
    answer: "Avec des mutations"
    decoys:
      - "Avec des requêtes HTTP PUT et DELETE"
      - "Avec des subscriptions"
    why: "Les requêtes lisent, les mutations écrivent, les subscriptions poussent des mises à jour."
  - id: subscriptions
    prompt: "À quoi servent les subscriptions GraphQL ?"
    answer: "Pousser des mises à jour en temps réel"
    decoys:
      - "Facturer les clients de l'API"
      - "Enregistrer de nouveaux utilisateurs"
    why: "Le client s'abonne, le serveur envoie les changements."
  - id: cache-http
    prompt: "Pourquoi GraphQL profite-t-il mal du cache HTTP ?"
    answer: "Les requêtes passent en général par un seul endpoint, en POST"
    decoys:
      - "Les réponses GraphQL sont toujours chiffrées de bout en bout, donc illisibles par un cache"
      - "GraphQL interdit les en-têtes HTTP"
    why: "Le cache des navigateurs et des CDN s'appuie sur des GET vers des URL distinctes."
  - id: n-plus-1
    prompt: "Quel piège de performance guette un serveur GraphQL ?"
    answer: "Le problème N+1 : une requête imbriquée déclenche une avalanche de requêtes en base"
    decoys:
      - "Le schéma est recompilé à chaque requête"
      - "Chaque réponse est forcément plus lourde qu'en REST, quelle que soit la requête envoyée"
    why: "Charger les commentaires de chaque publication un par un multiplie les requêtes en base."
  - id: dataloader
    prompt: "Quelle technique résout le problème N+1 ?"
    answer: "Regrouper les accès, à la manière de DataLoader"
    decoys:
      - "Construire un index inversé"
      - "Ajouter une file dead-letter pour les requêtes en échec"
    why: "Les chargements sont regroupés en une seule requête par type de données."
  - id: origine
    prompt: "Où GraphQL a-t-il été créé ?"
    answer: "Chez Facebook, en 2012, avant d'être publié en 2015"
    decoys:
      - "Chez Google, en 2015, en même temps que gRPC"
      - "Chez Netflix, en 2018, pour ses applications TV"
    why: "La spécification est maintenue par la GraphQL Foundation."
  - id: quand
    prompt: "Quand GraphQL est-il un bon choix ?"
    answer: "Quand plusieurs clients ont des besoins différents sur les mêmes données"
    decoys:
      - "Pour une API CRUD simple, consommée par un seul front"
      - "Pour une API publique dont chaque réponse doit être mise en cache par un CDN"
    why: "Web, mobile, partenaires : chacun demande exactement ses champs. Pour un CRUD simple ou un cache HTTP, REST est plus direct."
  - id: precaution
    prompt: "Quelle précaution prendre côté serveur GraphQL ?"
    answer: "Limiter la profondeur et la complexité des requêtes"
    decoys:
      - "Interdire toute requête imbriquée"
      - "Supprimer le schéma en production pour masquer les données"
    why: "Une requête très imbriquée peut coûter très cher ; on la borne plutôt que de renoncer à l'imbrication."
  - id: resolvers
    prompt: "Dans un serveur GraphQL, quel élément calcule la valeur de chaque champ demandé ?"
    answer: "Le resolver associé à ce champ"
    decoys:
      - "Le routeur HTTP, qui associe une URL à chaque champ"
      - "Le client, qui calcule les champs avant d'envoyer la requête"
    why: "Chaque champ du schéma a une fonction (resolver) qui va chercher sa valeur. GraphQL passe par un seul endpoint, sans URL par champ, et c'est le serveur qui résout."
  - id: introspection
    prompt: "Que permet l'introspection en GraphQL ?"
    answer: "Interroger le schéma lui-même pour connaître ses types et ses champs"
    decoys:
      - "Tracer chaque requête SQL déclenchée par le serveur pendant une requête"
      - "Chiffrer les réponses destinées à un client précis, en plus de TLS"
    why: "Le schéma est interrogeable par une requête GraphQL ; c'est ce qui alimente l'autocomplétion des éditeurs et la génération de types."
  - id: non-null
    prompt: "Que signifie le point d'exclamation dans un type GraphQL comme String! ?"
    answer: "La valeur ne peut pas être null"
    decoys:
      - "Le champ est déprécié et sera retiré"
      - "Le champ contient une liste de chaînes"
    why: "Le ! marque un type non nul. La dépréciation passe par la directive @deprecated, une liste s'écrit entre crochets."
  - id: liste
    prompt: "Comment déclare-t-on, dans un schéma GraphQL, un champ qui renvoie une liste de publications de type Post ?"
    answer: "[Post]"
    decoys:
      - "Post[]"
      - "List<Post>"
    why: "Le langage de schéma de GraphQL écrit les listes entre crochets ; Post[] et List<Post> sont des syntaxes de TypeScript ou de Java."
  - id: erreurs-200
    prompt: "Une requête GraphQL réussit pour certains champs et échoue pour d'autres. Que renvoie le plus souvent le serveur ?"
    answer: "Un statut 200, avec les données obtenues et un champ errors"
    decoys:
      - "Un statut 404 pour chaque champ en échec, sans aucune donnée"
      - "Un statut 500 et aucune donnée, même pour les champs réussis"
    why: "Une réponse GraphQL peut être partielle : data contient ce qui a pu être résolu, errors décrit les échecs. Se fier au seul code HTTP est un piège classique."
  - id: variables
    prompt: "Pourquoi passer les valeurs d'une requête GraphQL par des variables plutôt que dans son texte ?"
    answer: "Le texte de la requête reste fixe et réutilisable ; seules les valeurs changent"
    decoys:
      - "Les variables sont chiffrées par le serveur avant l'exécution de la requête"
      - "Le texte d'une requête GraphQL ne peut contenir ni nombre ni chaîne de caractères"
    why: "Les variables séparent la requête de ses valeurs, comme les requêtes préparées en SQL. Elles ne chiffrent rien, et des valeurs littérales restent possibles."
  - id: fragments
    prompt: "À quoi sert un fragment en GraphQL ?"
    answer: "Réutiliser une même sélection de champs à plusieurs endroits"
    decoys:
      - "Découper une réponse volumineuse en plusieurs paquets HTTP"
      - "Répartir les types du schéma sur plusieurs serveurs distincts"
    why: "Un fragment nomme un ensemble de champs qu'on insère dans plusieurs requêtes. Il n'a aucun effet sur le transport ni sur la répartition du schéma."
  - id: alias
    prompt: "Comment demander deux fois le même champ, avec des arguments différents, dans une seule requête GraphQL ?"
    answer: "Avec des alias, qui donnent un nom distinct à chaque résultat"
    decoys:
      - "C'est impossible : il faut envoyer deux requêtes HTTP séparées"
      - "Avec une directive @repeat placée sur le champ concerné"
    why: "Les alias renomment chaque occurrence du champ dans la réponse, ce qui évite le conflit de noms. La directive @repeat n'existe pas."
  - id: over-fetching
    prompt: "Comment appelle-t-on le fait de recevoir des champs inutiles dans une réponse, ce que GraphQL évite ?"
    answer: "Le sur-chargement (over-fetching)"
    decoys:
      - "Le problème N+1"
      - "L'inondation de requêtes (flooding)"
    why: "Le client ne reçoit que les champs qu'il a demandés. Le problème N+1 concerne les requêtes en base côté serveur, pas le contenu de la réponse."
  - id: deprecated
    prompt: "Comment fait-on habituellement évoluer une API GraphQL sans casser ses clients ?"
    answer: "On ajoute des champs et on marque les anciens avec @deprecated"
    decoys:
      - "On publie un nouvel endpoint /graphql/v2 à chaque changement de champ"
      - "On renomme le schéma entier à chaque version publiée de l'API"
    why: "Ajouter un champ ne gêne aucun client, puisque chacun ne lit que ce qu'il demande ; la directive @deprecated signale les champs à abandonner."
  - id: transport
    prompt: "La spécification GraphQL impose-t-elle un protocole de transport ?"
    answer: "Non, même si HTTP est le transport le plus courant"
    decoys:
      - "Oui : HTTP/2 obligatoire, comme pour gRPC"
      - "Oui : une connexion WebSocket pour toute requête"
    why: "La spécification décrit le langage et l'exécution, pas le transport. HTTP domine ; WebSocket sert surtout aux subscriptions."
  - id: subscriptions-websocket
    prompt: "Sur quel transport passent le plus souvent les subscriptions GraphQL ?"
    answer: "Une connexion WebSocket"
    decoys:
      - "Des requêtes GET mises en cache"
      - "Des appels gRPC en HTTP/2"
    why: "Une subscription demande que le serveur pousse des messages : il faut une connexion persistante, ce que des GET en cache ne permettent pas."
  - id: apollo
    prompt: "Qu'est-ce qu'Apollo, dans l'écosystème GraphQL ?"
    answer: "Une implémentation répandue, côté client et côté serveur"
    decoys:
      - "Le nom de la spécification officielle maintenue par la fondation"
      - "Un format binaire qui remplace le JSON des réponses GraphQL"
    why: "La fiche cite Apollo comme l'une des implémentations les plus répandues ; la spécification est celle de la GraphQL Foundation, et les réponses restent en JSON."
  - id: agregation
    prompt: "Quel rôle GraphQL joue-t-il souvent devant plusieurs services back-end ?"
    answer: "Une couche d'agrégation qui expose un schéma unifié aux clients"
    decoys:
      - "Un équilibreur de charge réseau entre les instances d'un service"
      - "Une base de données qui remplace celles des différents services"
    why: "Le serveur GraphQL appelle les services et assemble la réponse ; il ne répartit pas le trafic réseau et ne stocke pas les données."
  - id: requetes-persistees
    prompt: "Qu'est-ce qu'une requête persistée (persisted query) en GraphQL ?"
    answer: "Une requête enregistrée côté serveur, que le client appelle par un identifiant"
    decoys:
      - "Une requête dont le résultat est écrit en base de données à chaque exécution"
      - "Une requête rejouée automatiquement par le client après une coupure réseau"
    why: "Le client n'envoie plus que l'identifiant : moins d'octets, et le serveur peut n'accepter que les requêtes connues."
  - id: scalaires
    prompt: "Lequel de ces types fait partie des scalaires intégrés de GraphQL ?"
    answer: "ID"
    decoys:
      - "Date"
      - "Decimal"
    why: "Les scalaires intégrés sont Int, Float, String, Boolean et ID. Une date ou un décimal se déclarent comme scalaires personnalisés."
  - id: input
    prompt: "En GraphQL, quel mot-clé déclare le type d'un argument composé, passé par exemple à une mutation ?"
    answer: "input"
    decoys:
      - "type"
      - "scalar"
    why: "Les arguments composés doivent être des types input ; un type objet déclaré avec type ne sert qu'en sortie, et scalar déclare une valeur simple."
  - id: union
    prompt: "Quel mécanisme GraphQL permet à un champ de renvoyer soit un Livre, soit un Film, sans champ commun obligatoire ?"
    answer: "Une union"
    decoys:
      - "Un enum"
      - "Un input"
    why: "Une union regroupe plusieurs types objet possibles. Un enum liste des valeurs fixes, un input ne sert qu'en entrée."
  - id: typename
    prompt: "Quel champ méta indique le type concret d'un objet dans une réponse GraphQL ?"
    answer: "__typename"
    decoys:
      - "__class"
      - "__kind"
    why: "On peut demander __typename sur tout objet, utile avec les unions et les interfaces ; les clients s'en servent aussi pour leur cache."
  - id: pagination
    prompt: "Quelle convention de pagination est répandue en GraphQL ?"
    answer: "Les connexions à curseur (edges, node, pageInfo), issues de Relay"
    decoys:
      - "Le numéro de page placé dans l'URL de l'endpoint GraphQL"
      - "Les en-têtes HTTP Range, comme pour reprendre un téléchargement"
    why: "La spécification Relay des connexions pagine par curseur ; l'endpoint GraphQL étant unique, la pagination passe par les arguments, pas par l'URL ni les en-têtes."
---
