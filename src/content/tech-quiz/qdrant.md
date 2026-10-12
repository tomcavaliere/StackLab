---
questions:
  - id: role
    prompt: "Qu'est-ce que Qdrant ?"
    answer: "Une base vectorielle open-source dédiée, écrite en Rust"
    decoys:
      - "Une extension de PostgreSQL pour stocker des vecteurs"
      - "Un service managé propriétaire, sans version auto-hébergeable"
    why: "Qdrant est une base à part, sous licence Apache 2.0, auto-hébergeable ou en offre managée. L'extension PostgreSQL, c'est pgvector ; le service managé propriétaire, Pinecone."
  - id: payload
    prompt: "Dans Qdrant, qu'est-ce que le payload d'un point ?"
    answer: "Un objet JSON de métadonnées associé au vecteur, sur lequel on peut filtrer"
    decoys:
      - "Le texte d'origine, que Qdrant convertit lui-même en vecteur à chaque requête"
      - "La liste des voisins précalculés du point, mise à jour à chaque insertion"
    why: "Chaque point porte un ou plusieurs vecteurs et un payload JSON (document, client, date…). Les requêtes filtrent sur ce payload pendant la recherche."
  - id: organisation
    prompt: "Comment Qdrant organise-t-il les données ?"
    answer: "Des points rangés dans des collections"
    decoys:
      - "Des lignes rangées dans des tables reliées par clés étrangères"
      - "Des documents rangés dans des index inversés"
    why: "Une collection regroupe des points, chacun avec ses vecteurs et son payload. Tables et clés étrangères relèvent du relationnel, l'index inversé des moteurs de recherche comme Elasticsearch."
  - id: filtres
    prompt: "Comment combine-t-on plusieurs conditions de filtre dans une requête Qdrant ?"
    answer: "Avec des clauses must, should et must_not"
    decoys:
      - "Avec une clause WHERE en SQL standard"
      - "Avec un script JavaScript exécuté côté serveur"
    why: "Le filtrage de Qdrant s'exprime en clauses must (tout doit être vrai), should (au moins une) et must_not (aucune), sur des mots-clés, des plages, de la géolocalisation ou du texte."
  - id: hybride
    prompt: "Qu'apporte la recherche hybride de Qdrant ?"
    answer: "Elle combine recherche par mots-clés et recherche sémantique, puis fusionne les classements"
    decoys:
      - "Elle répartit automatiquement chaque collection entre un cloud public et un serveur local selon la charge"
      - "Elle mélange vecteurs et requêtes SQL dans une même transaction"
    why: "Avec des vecteurs creux (mots-clés) et denses (sens), une requête peut interroger les deux et fusionner les résultats, par exemple par Reciprocal Rank Fusion."
  - id: quantification
    prompt: "À quoi sert la quantification dans Qdrant ?"
    answer: "Réduire la mémoire des vecteurs, au prix d'un peu de précision"
    decoys:
      - "Compter les requêtes pour facturer l'usage"
      - "Chiffrer les vecteurs avec une clé gérée par l'utilisateur avant leur écriture sur disque"
    why: "Les vecteurs sont stockés sous une forme compressée : moins de mémoire et souvent plus de vitesse, contre une légère perte de précision. Rien à voir avec la facturation ou le chiffrement."
  - id: api
    prompt: "Comment une application interroge-t-elle Qdrant ?"
    answer: "Par une API REST ou gRPC, ou par ses SDK"
    decoys:
      - "Uniquement en SQL, via le protocole réseau de PostgreSQL"
      - "Uniquement par fichiers déposés dans un stockage objet"
    why: "Qdrant expose une API REST (avec une spécification OpenAPI) et une interface gRPC, utilisées par ses clients officiels. Il ne parle pas SQL."
  - id: inconvenient
    prompt: "Quel est le principal coût d'ajouter Qdrant à une stack qui a déjà PostgreSQL ?"
    answer: "Une base de plus à opérer et à garder synchronisée avec les données métier"
    decoys:
      - "Une licence commerciale obligatoire au-delà d'un seul serveur"
      - "L'obligation de migrer toutes les données métier dans Qdrant"
    why: "Les vecteurs vivent dans un autre système : il faut le déployer, le sauvegarder, le surveiller, et le resynchroniser quand les données changent, sans jointure SQL. La licence est Apache 2.0."
  - id: quand-choisir
    prompt: "Quand préférer Qdrant à pgvector ?"
    answer: "Quand le volume ou le filtrage dépasse ce qu'on veut confier à la base transactionnelle"
    decoys:
      - "Dès qu'une application stocke quelques centaines de vecteurs"
      - "Quand les vecteurs doivent être joints en SQL aux commandes clients et aux factures de la base"
    why: "Une base dédiée se justifie pour une charge vectorielle importante ou un filtrage et une recherche hybride riches. Pour quelques vecteurs, ou pour des jointures SQL, pgvector est plus simple."
  - id: deploiement
    prompt: "Quelles options de déploiement Qdrant offre-t-il ?"
    answer: "Auto-hébergé (par exemple avec Docker) ou en offre managée Qdrant Cloud"
    decoys:
      - "Seulement en offre managée, le code n'étant pas publié et aucune image Docker fournie"
      - "Seulement embarqué dans le processus de l'application, sans serveur"
    why: "Le code est open-source : on le lance soi-même, l'image Docker étant le plus simple, ou on prend l'offre managée. On garde ainsi la main sur les données, avec une porte vers le managé."
---
