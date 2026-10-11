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
---
