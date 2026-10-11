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
---
