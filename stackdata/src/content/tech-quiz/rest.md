---
questions:
  - id: principe
    prompt: "Sur quoi repose le style REST ?"
    answer: "Sur HTTP lui-même : des ressources identifiées par des URL, manipulées avec les méthodes HTTP"
    decoys:
      - "Sur un fichier .proto compilé en code client et serveur"
      - "Sur un langage de requête où le client choisit ses champs, envoyé à un endpoint unique"
    why: "Le .proto est le contrat de gRPC ; choisir ses champs, c'est GraphQL."
  - id: creer
    prompt: "Quelle méthode HTTP sert à créer une ressource ?"
    answer: "POST"
    decoys:
      - "GET"
      - "DELETE"
    why: "GET lit, POST crée, PUT ou PATCH modifient, DELETE supprime."
  - id: statut-404
    prompt: "Que signifie le code de statut 404 ?"
    answer: "La ressource demandée n'existe pas"
    decoys:
      - "La requête a réussi, sans contenu"
      - "Le serveur a planté pendant le traitement"
    why: "200 signale un succès ; les erreurs du serveur sont dans la famille 500."
  - id: sans-etat
    prompt: "Un serveur REST garde-t-il un état de session entre deux requêtes ?"
    answer: "Non : chaque requête porte ce qu'il faut pour être traitée"
    decoys:
      - "Oui : il garde une connexion ouverte par client"
      - "Oui, dans une variable globale propre à chaque utilisateur"
    why: "L'absence d'état entre requêtes est l'un des principes de REST. Une connexion ouverte par client, c'est WebSocket."
  - id: outillage
    prompt: "Quel avantage REST tire-t-il de HTTP côté outillage ?"
    answer: "Le cache des navigateurs et des CDN, les proxys, curl et les journaux fonctionnent tels quels"
    decoys:
      - "Il génère automatiquement le client dans chaque langage à partir d'un fichier de contrat binaire"
      - "Il pousse les mises à jour en temps réel au client"
    why: "Tout l'outillage du web existe déjà. Générer le client, c'est l'apport de gRPC (ou d'OpenAPI)."
  - id: openapi
    prompt: "Que permet le format OpenAPI ?"
    answer: "Décrire une API REST et en générer la documentation et des clients"
    decoys:
      - "Chiffrer les échanges entre client et serveur, en complément de TLS"
      - "Remplacer HTTP par un format binaire"
    why: "OpenAPI est la description standard d'une API REST."
  - id: fielding
    prompt: "Qui a formalisé REST ?"
    answer: "Roy Fielding, dans sa thèse, en 2000"
    decoys:
      - "Tim Berners-Lee, en 1991, avec le web"
      - "Google, en 2015, avec gRPC"
    why: "Tim Berners-Lee a inventé le web ; Google a publié gRPC en 2015."
  - id: pousser
    prompt: "Le serveur doit pousser une information au client dès qu'elle change. REST suffit-il ?"
    answer: "Non : REST suit un modèle requête-réponse ; il faut WebSocket ou des Server-Sent Events"
    decoys:
      - "Oui, avec la méthode HTTP PUSH, prévue pour ça"
      - "Oui, avec le code de statut 302, qui renvoie la mise à jour au client"
    why: "En REST, c'est toujours le client qui demande."
  - id: allers-retours
    prompt: "Un écran assemble beaucoup de ressources différentes. Quel inconvénient REST présente-t-il ?"
    answer: "Plusieurs allers-retours, ou des réponses trop lourdes"
    decoys:
      - "REST ne sait pas renvoyer de JSON"
      - "Une API REST ne peut exposer qu'une seule ressource"
    why: "GraphQL laisse le client choisir ses champs en une seule requête."
  - id: en-pratique
    prompt: "Que désigne souvent « API REST » dans la pratique ?"
    answer: "Une API JSON sur HTTP qui suit ces conventions, sans en appliquer tous les principes"
    decoys:
      - "Une API gRPC exposée en JSON"
      - "Une API qui n'utilise que la méthode GET, toutes les écritures passant par des formulaires"
    why: "La fiche le précise : l'usage courant est plus large que la définition de Fielding."
  - id: idempotence
    prompt: "Que signifie qu'une méthode HTTP est idempotente ?"
    answer: "La répéter a le même effet sur le serveur qu'un seul appel"
    decoys:
      - "Elle ne modifie jamais rien sur le serveur, quel que soit l'appel"
      - "Sa réponse peut toujours être mise en cache par un CDN"
    why: "DELETE est idempotent mais modifie le serveur : ne rien modifier, c'est la propriété « sûre ». La mise en cache est une autre question."
  - id: post-non-idempotent
    prompt: "Laquelle de ces méthodes HTTP n'est pas idempotente ?"
    answer: "POST"
    decoys:
      - "PUT"
      - "DELETE"
    why: "Deux POST identiques peuvent créer deux ressources ; deux PUT identiques laissent la ressource dans le même état, deux DELETE aussi."
  - id: methodes-sures
    prompt: "Quelle paire de méthodes HTTP est dite « sûre », c'est-à-dire sans effet sur le serveur ?"
    answer: "GET et HEAD"
    decoys:
      - "PUT et DELETE"
      - "POST et PATCH"
    why: "GET et HEAD ne font que lire. PUT et DELETE sont idempotents mais modifient le serveur ; POST et PATCH aussi."
  - id: put-patch
    prompt: "Quelle différence entre PUT et PATCH ?"
    answer: "PUT remplace la ressource entière, PATCH n'en modifie qu'une partie"
    decoys:
      - "PUT crée toujours une ressource neuve, PATCH en supprime l'ancienne version"
      - "PUT est réservé aux fichiers, PATCH aux documents au format JSON"
    why: "PUT envoie la représentation complète, PATCH seulement les changements. Aucune des deux n'est liée à un type de contenu."
  - id: statut-201
    prompt: "Quel code de statut est prévu pour signaler la création réussie d'une ressource ?"
    answer: "201 Created"
    decoys:
      - "301 Moved Permanently"
      - "304 Not Modified"
    why: "201 confirme la création. 301 signale une redirection permanente, 304 une version en cache encore valide."
  - id: location
    prompt: "Après un POST qui crée une ressource, quel en-tête de réponse indique l'URL de la nouvelle ressource ?"
    answer: "Location"
    decoys:
      - "Retry-After"
      - "Host"
    why: "Location accompagne un 201 (ou une redirection). Retry-After indique quand réessayer, et Host est un en-tête de requête."
  - id: statut-401-403
    prompt: "Quelle différence entre les codes de statut 401 et 403 ?"
    answer: "401 : non authentifié ; 403 : authentifié, mais pas autorisé"
    decoys:
      - "401 : ressource introuvable ; 403 : serveur surchargé"
      - "401 : requête mal formée ; 403 : méthode non autorisée"
    why: "Une ressource introuvable donne 404, une requête mal formée 400, une méthode refusée 405."
  - id: statut-429
    prompt: "Quel code de statut renvoie une API qui limite le nombre de requêtes d'un client trop insistant ?"
    answer: "429 Too Many Requests"
    decoys:
      - "409 Conflict"
      - "413 Content Too Large"
    why: "429 signale le dépassement d'une limite de débit, souvent avec un en-tête Retry-After. 409 signale un conflit d'état, 413 un corps trop volumineux."
  - id: hateoas
    prompt: "Que désigne le principe HATEOAS de REST ?"
    answer: "Des réponses qui contiennent les liens vers les actions possibles ensuite"
    decoys:
      - "Un format binaire qui remplace le JSON dans les réponses de l'API"
      - "Un protocole d'authentification par jeton, propre aux API REST"
    why: "Le client navigue en suivant les liens fournis par le serveur, comme sur une page web. C'est l'un des principes de Fielding les moins appliqués en pratique."
  - id: nommage-url
    prompt: "Quelle URL suit les conventions REST pour désigner la commande 42 ?"
    answer: "/commandes/42"
    decoys:
      - "/getCommande?id=42"
      - "/commandes/lire/42"
    why: "L'URL nomme la ressource ; l'action est portée par la méthode HTTP (GET), pas par un verbe dans l'URL."
  - id: etag
    prompt: "À quoi sert l'en-tête de réponse ETag ?"
    answer: "Identifier une version de la ressource"
    decoys:
      - "Indiquer la taille du corps de la réponse en octets"
      - "Porter le jeton d'authentification"
    why: "Le client renvoie l'ETag (If-None-Match) pour revalider son cache, ou (If-Match) pour ne pas écraser une modification. La taille, c'est Content-Length."
  - id: statut-304
    prompt: "Le client revalide sa copie en cache avec If-None-Match et elle est toujours à jour. Que répond le serveur ?"
    answer: "304 Not Modified, sans corps"
    decoys:
      - "302 Found, qui redirige vers la même URL"
      - "410 Gone, sans aucun corps"
    why: "304 dit au client de réutiliser sa copie, sans retransférer la ressource. 302 redirige, 410 signale une ressource supprimée définitivement."
  - id: cache-control
    prompt: "Quel en-tête de réponse indique combien de temps une réponse peut être mise en cache ?"
    answer: "Cache-Control, avec max-age"
    decoys:
      - "Content-Type, avec son paramètre charset"
      - "Accept-Encoding, avec gzip"
    why: "Cache-Control: max-age=… fixe la durée de fraîcheur. Content-Type décrit le format du corps, Accept-Encoding les compressions acceptées par le client."
  - id: accept
    prompt: "Quel en-tête de requête indique le format de réponse que le client souhaite recevoir ?"
    answer: "Accept"
    decoys:
      - "Content-Type"
      - "Authorization"
    why: "Accept sert à la négociation de contenu (par exemple application/json). Content-Type décrit le corps envoyé, Authorization porte les identifiants."
  - id: versionnement
    prompt: "Quelle pratique courante permet de faire évoluer une API REST sans casser ses clients existants ?"
    answer: "La versionner, par exemple avec /v1/ dans l'URL"
    decoys:
      - "Changer le format des réponses sans prévenir"
      - "Renommer les champs à chaque nouveau déploiement"
    why: "Une nouvelle version cohabite avec l'ancienne le temps que les clients migrent ; un changement silencieux casse ceux qui dépendent de l'ancien format."
  - id: filtres
    prompt: "Où placer, en REST, le filtre d'une liste, par exemple pour n'obtenir que les commandes payées ?"
    answer: "Dans les paramètres de l'URL : /commandes?statut=payee"
    decoys:
      - "Dans le corps de la requête GET, en JSON"
      - "Dans l'en-tête Host de la requête envoyée"
    why: "Les paramètres de requête restent dans l'URL, donc dans le cache et les journaux. Un corps de GET n'a pas de sens défini en HTTP, et Host désigne le serveur."
  - id: cle-idempotence
    prompt: "Comment permettre au client de rejouer sans risque un POST de paiement après une coupure réseau ?"
    answer: "Avec une clé d'idempotence envoyée par le client et mémorisée par le serveur"
    decoys:
      - "En remplaçant le POST par un GET, dont la réponse est mise en cache"
      - "En renvoyant une erreur 500 au second essai, pour bloquer le doublon"
    why: "Le serveur reconnaît la clé et renvoie le résultat du premier appel au lieu de payer deux fois. Un GET ne doit pas modifier le serveur."
  - id: json-pas-impose
    prompt: "REST impose-t-il le format JSON ?"
    answer: "Non : REST ne fixe aucun format ; JSON est seulement le plus courant"
    decoys:
      - "Oui : la thèse de Fielding impose JSON pour toutes les représentations"
      - "Oui : XML est interdit dans les réponses d'une API REST depuis HTTP/2"
    why: "REST parle de représentations, sans imposer de format ; JSON n'a d'ailleurs été popularisé qu'après la thèse de 2000."
  - id: cors
    prompt: "Un front servi depuis un autre domaine appelle une API REST, et le navigateur bloque la réponse. Que faut-il configurer côté API ?"
    answer: "CORS, avec l'en-tête Access-Control-Allow-Origin"
    decoys:
      - "CSRF, avec un jeton caché dans chaque formulaire"
      - "HSTS, avec l'en-tête Strict-Transport-Security"
    why: "Le navigateur n'expose une réponse d'une autre origine que si l'API l'autorise par CORS. Le jeton CSRF protège contre les requêtes forgées, HSTS impose HTTPS."
  - id: head
    prompt: "À quoi sert la méthode HTTP HEAD ?"
    answer: "Obtenir les en-têtes qu'aurait une réponse GET, sans son corps"
    decoys:
      - "Créer une ressource en tête d'une collection existante"
      - "Supprimer seulement les en-têtes associés à une ressource existante"
    why: "HEAD permet de vérifier qu'une ressource existe, sa taille ou sa version, sans la télécharger."
---
