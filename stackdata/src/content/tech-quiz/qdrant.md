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
  - id: langage-rust
    prompt: "Dans quel langage Qdrant est-il écrit ?"
    answer: "En Rust"
    decoys:
      - "En Go"
      - "En Java"
    why: "Qdrant est écrit en Rust. Weaviate, autre base vectorielle open-source, est écrit en Go."
  - id: licence
    prompt: "Sous quelle licence Qdrant est-il distribué ?"
    answer: "Apache 2.0, qui autorise l'usage commercial et l'auto-hébergement"
    decoys:
      - "Une licence propriétaire : gratuite en local, payante dès qu'un cluster dépasse un serveur"
      - "AGPL, qui impose de publier le code de tout service qui s'appuie sur la base"
    why: "La licence Apache 2.0 permet d'auto-héberger Qdrant sans contrainte de ce type. Une offre managée existe en plus, Qdrant Cloud."
  - id: identifiant-point
    prompt: "Comment un point est-il identifié dans une collection Qdrant ?"
    answer: "Par un identifiant, entier non signé ou UUID, que l'appelant fournit"
    decoys:
      - "Par le hachage de son vecteur, calculé automatiquement par la collection"
      - "Par un numéro de ligne attribué à l'insertion et que personne ne peut modifier"
    why: "Chaque point a un id (entier ou UUID). Réécrire un point avec le même id le remplace."
  - id: vecteurs-multiples
    prompt: "À quoi sert de donner plusieurs vecteurs à un même point Qdrant ?"
    answer: "Représenter un objet de plusieurs façons, par exemple texte et image, ou dense et creux"
    decoys:
      - "Garder l'historique des versions successives du vecteur du point"
      - "Répliquer le vecteur sur plusieurs nœuds pour tolérer les pannes"
    why: "Un point peut porter plusieurs vecteurs, ce qui sert notamment à la recherche hybride, mêlant vecteurs denses et creux."
  - id: creation-collection
    prompt: "Que fixe-t-on à la création d'une collection Qdrant ?"
    answer: "La taille des vecteurs et la mesure de distance à utiliser"
    decoys:
      - "Le schéma complet du payload, avec le type obligatoire de chaque champ"
      - "La liste des utilisateurs autorisés à interroger chaque point"
    why: "Une collection déclare la dimension de ses vecteurs et sa mesure de distance. Le payload est un JSON libre."
  - id: approximatif
    prompt: "Pourquoi la recherche de Qdrant est-elle dite approximative ?"
    answer: "L'index HNSW parcourt un graphe sans tout comparer, donc quelques voisins peuvent manquer"
    decoys:
      - "Les vecteurs sont arrondis à l'insertion, ce qui rend toute comparaison imprécise"
      - "Le serveur renvoie des résultats tirés au hasard parmi les points d'une collection"
    why: "HNSW est rapide parce qu'il n'explore qu'une partie des points. C'est la contrepartie classique des index approximatifs."
  - id: index-payload
    prompt: "Pourquoi créer un index sur un champ du payload ?"
    answer: "Pour accélérer le filtrage sur ce champ pendant la recherche"
    decoys:
      - "Pour que ce champ soit converti en vecteur et pris en compte dans la similarité"
      - "Pour rendre ce champ obligatoire dans chaque point de la collection"
    why: "Un index de payload accélère les conditions de filtre sur le champ concerné. Le payload n'intervient pas dans le calcul de la similarité."
  - id: filtre-geo
    prompt: "Quel filtre de payload permet de ne garder que les points proches d'un lieu ?"
    answer: "Un filtre géographique, par rayon ou par zone"
    decoys:
      - "Un filtre de plage numérique appliqué directement sur le vecteur"
      - "Un filtre de mot-clé sur l'adresse IP du client qui interroge"
    why: "Qdrant filtre sur des mots-clés, des plages numériques, de la géolocalisation ou du texte."
  - id: exclure-client
    prompt: "Comment exclure d'une recherche Qdrant les points d'un client donné ?"
    answer: "Avec une condition must_not sur le champ client du payload"
    decoys:
      - "Avec une clause should vide sur ce client, qui supprime ses points de la collection"
      - "Avec une requête DELETE FROM ... WHERE exécutée avant chaque recherche"
    why: "must_not écarte les points qui satisfont la condition, sans les supprimer. Qdrant ne parle pas SQL."
  - id: vecteurs-creux
    prompt: "Que représentent les vecteurs creux de Qdrant ?"
    answer: "Des poids sur des termes précis, utiles pour la recherche par mots-clés"
    decoys:
      - "Des vecteurs denses dont on a supprimé les dimensions les moins informatives"
      - "Des vecteurs dont la mémoire est libérée tant qu'on ne les interroge pas"
    why: "Un vecteur creux ne garde que quelques valeurs non nulles, associées à des termes. Combiné aux vecteurs denses, il permet la recherche hybride."
  - id: rrf
    prompt: "Que fait une fusion de type Reciprocal Rank Fusion dans une recherche hybride ?"
    answer: "Elle combine les classements de plusieurs recherches selon le rang de chaque résultat"
    decoys:
      - "Elle additionne les vecteurs de deux recherches avant de relancer une requête unique"
      - "Elle fusionne les points quasi identiques de la collection pour supprimer les doublons"
    why: "Après une recherche par mots-clés et une recherche sémantique, la fusion produit un classement unique à partir des rangs obtenus dans chacune."
  - id: quantification-quand
    prompt: "Quand la quantification est-elle utile dans Qdrant ?"
    answer: "Quand la mémoire devient le facteur limitant avec beaucoup de vecteurs"
    decoys:
      - "Quand on exige un rappel parfait sur chaque requête, sans aucune perte"
      - "Quand les vecteurs ont moins de dimensions que le modèle d'embeddings"
    why: "Elle compresse les vecteurs pour économiser de la mémoire, au prix d'un peu de précision : à éviter si la perte n'est pas acceptable."
  - id: porte-managee
    prompt: "Quelle souplesse de déploiement Qdrant offre-t-il en cas de croissance ?"
    answer: "Démarrer en auto-hébergé puis passer à Qdrant Cloud, sans changer de produit"
    decoys:
      - "Basculer vers Pinecone sans réindexer, les deux bases partageant le même format"
      - "Convertir la collection en table PostgreSQL pour la gérer ensuite en SQL"
    why: "Le même logiciel existe en auto-hébergé et en offre managée. Passer à un autre produit demande de réindexer."
  - id: synchronisation
    prompt: "Comment garder Qdrant cohérent avec une base relationnelle qui contient les données métier ?"
    answer: "Propager chaque création, modification et suppression, en acceptant un léger décalage"
    decoys:
      - "Activer la réplication native de Qdrant vers PostgreSQL, qui garantit la cohérence"
      - "Utiliser des transactions SQL qui couvrent les deux systèmes à la fois"
    why: "Les vecteurs vivent dans un autre système : il faut une synchronisation, sans jointure SQL possible."
  - id: role-rag
    prompt: "Quel est le rôle de Qdrant dans un RAG ?"
    answer: "Retrouver les passages proches de la question, filtrés par document, client ou date"
    decoys:
      - "Découper les documents en passages de taille adaptée avant leur indexation"
      - "Rédiger la réponse finale en citant les passages qu'il juge les plus proches"
    why: "Qdrant est la brique de recherche : il stocke les vecteurs et filtre sur le payload. Découpage et génération se font ailleurs."
  - id: multi-clients
    prompt: "Comment isoler les données de nombreux clients dans une seule collection Qdrant ?"
    answer: "Avec un champ client dans le payload et un filtre sur ce champ à chaque requête"
    decoys:
      - "Avec un namespace par client, comme dans Pinecone, créé à l'insertion"
      - "Avec un schéma PostgreSQL par client, relié à la collection par une clé étrangère"
    why: "Qdrant filtre sur le payload : l'isolement tient au filtre, qui doit donc être appliqué à chaque requête."
  - id: petite-equipe
    prompt: "Une petite équipe sans compétence d'exploitation veut de la recherche vectorielle. Quelles options la fiche évoque-t-elle ?"
    answer: "L'offre managée Qdrant Cloud, ou pgvector si PostgreSQL est déjà là"
    decoys:
      - "Auto-héberger quand même : l'image Docker rend inutiles sauvegarde et surveillance"
      - "Passer à Pinecone obligatoirement, Qdrant n'ayant aucune offre managée"
    why: "Auto-héberger exige de déployer, sauvegarder et surveiller. Qdrant a une offre managée, et pgvector évite toute brique de plus."
  - id: controle-donnees
    prompt: "Qu'est-ce qui distingue Qdrant de Pinecone sur le contrôle des données ?"
    answer: "Qdrant tourne sur ses propres serveurs, donc les données restent chez soi"
    decoys:
      - "Qdrant chiffre toujours les données avant de les envoyer, Pinecone ne le fait jamais"
      - "Pinecone permet d'auditer son code source, contrairement à Qdrant"
    why: "Qdrant est open-source et auto-hébergeable. Pinecone est un service piloté par l'éditeur, sans version à installer chez soi."
  - id: filtre-date
    prompt: "Comment limiter une recherche Qdrant aux documents publiés après une date ?"
    answer: "Avec un filtre de plage sur un champ de date du payload"
    decoys:
      - "En recalculant le vecteur de la question avec la date ajoutée à la fin du texte"
      - "En triant tous les points par date avant de lancer la recherche vectorielle"
    why: "Le payload porte les métadonnées (date, client, document) et les conditions de plage s'appliquent pendant la recherche."
  - id: mesure-distance
    prompt: "Quelle mesure de distance choisir pour une collection de vecteurs issus d'un modèle d'embeddings ?"
    answer: "Celle que recommande la documentation du modèle, souvent le cosinus"
    decoys:
      - "Toujours la distance euclidienne, qui convient à tous les modèles"
      - "Aucune : Qdrant détecte seul la mesure à partir des premiers vecteurs insérés"
    why: "La mesure se déclare à la création de la collection et doit être cohérente avec le modèle d'embeddings."
---
