---
questions:
  - id: role
    prompt: "Qu'est-ce que Weaviate ?"
    answer: "Une base vectorielle open-source, auto-hébergée ou en cloud managé"
    decoys:
      - "Un modèle de langage open-source spécialisé dans la recherche"
      - "Un moteur de recherche plein texte sans aucune notion de vecteur ni de similarité"
    why: "Weaviate stocke des objets avec leurs vecteurs et cherche les plus proches, avec filtres et recherche hybride. Ce n'est ni un modèle ni un simple moteur plein texte."
  - id: vectorisation
    prompt: "Que permettent les modules de vectorisation de Weaviate ?"
    answer: "Calculer les vecteurs en appelant un modèle d'embeddings"
    decoys:
      - "Compresser les vecteurs pour qu'ils tiennent dans un index de mots-clés"
      - "Convertir les documents PDF en texte avant de les découper en morceaux"
    why: "Configuré avec un module, Weaviate vectorise le texte inséré et la question, en appelant un fournisseur ou un modèle auto-hébergé."
  - id: hybride
    prompt: "Que combine la recherche hybride de Weaviate ?"
    answer: "Une recherche par mots-clés (BM25) et une recherche vectorielle"
    decoys:
      - "Deux modèles d'embeddings différents, dont on moyenne les vecteurs"
      - "Une recherche dans Weaviate et une recherche dans PostgreSQL"
    why: "BM25 trouve les termes exacts (références, noms propres), la recherche vectorielle trouve le sens ; un paramètre règle le poids de chacune."
  - id: alpha
    prompt: "Pourquoi régler le poids des mots-clés dans une recherche hybride ?"
    answer: "Pour favoriser les termes exacts ou le sens, selon les questions posées"
    decoys:
      - "Pour réduire la taille de l'index sur disque et accélérer les insertions"
      - "Pour choisir le modèle de langage qui rédigera la réponse finale"
    why: "Des questions pleines de références produits profitent des mots-clés, des questions vagues de la recherche sémantique."
  - id: multi-tenancy
    prompt: "À quoi sert la multi-tenancy de Weaviate ?"
    answer: "Isoler les données de chaque client dans une même collection"
    decoys:
      - "Répartir les requêtes d'un même client sur plusieurs modèles de langage"
      - "Partager un même index entre plusieurs entreprises clientes sans séparation"
    why: "En SaaS, chaque client (tenant) a ses données isolées, sans créer une collection par client."
  - id: generative
    prompt: "Que fait la recherche générative de Weaviate ?"
    answer: "Elle transmet les résultats de la requête à un LLM qui produit une réponse"
    decoys:
      - "Elle génère des documents fictifs pour enrichir l'index de la collection"
      - "Elle génère automatiquement le schéma de la collection à partir des données"
    why: "Après la recherche, Weaviate peut envoyer les objets trouvés à un LLM avec une consigne : un RAG en une requête."
  - id: index
    prompt: "Quel type d'index Weaviate utilise-t-il pour la recherche vectorielle ?"
    answer: "HNSW, pour une recherche approximative des plus proches voisins"
    decoys:
      - "B-tree, pour une recherche exacte comme dans une base relationnelle"
      - "Un index inversé, pour une recherche exacte par mots"
    why: "HNSW est un index en graphe qui trouve vite des voisins proches, au prix d'une recherche approximative."
  - id: vs-pgvector
    prompt: "Volume modeste et PostgreSQL déjà présent : pourquoi ne pas ajouter Weaviate ?"
    answer: "pgvector évite un système de plus à opérer et à synchroniser"
    decoys:
      - "Weaviate refuse de fonctionner à côté d'une base PostgreSQL"
      - "Weaviate ne sait pas filtrer sur les métadonnées des objets"
    why: "Une base dédiée se justifie par le volume ou les besoins de recherche ; sinon, pgvector garde tout dans la base existante."
  - id: interfaces
    prompt: "Comment interroge-t-on Weaviate ?"
    answer: "Par des clients officiels, en GraphQL, REST ou gRPC"
    decoys:
      - "Uniquement en SQL, par un pilote JDBC"
      - "Uniquement par son interface web d'administration"
    why: "Weaviate a des clients Python, TypeScript, Go et Java, et des API GraphQL, REST et gRPC. Pas de SQL."
  - id: coherence
    prompt: "Quel inconvénient à placer les vecteurs dans Weaviate et les données métier dans une base relationnelle ?"
    answer: "Deux systèmes à synchroniser, sans jointure possible entre eux"
    decoys:
      - "Les vecteurs deviennent illisibles pour le modèle de langage"
      - "Weaviate supprime les objets dont la ligne disparaît dans la base"
    why: "Les vecteurs vivent dans un autre système : il faut propager chaque modification et accepter un léger décalage."
  - id: licence
    prompt: "Sous quelle licence Weaviate est-il distribué ?"
    answer: "BSD-3, une licence permissive qui autorise l'usage commercial"
    decoys:
      - "Une licence propriétaire, gratuite en local et payante seulement pour le cloud"
      - "AGPL, qui impose de publier le code de tout service qui s'appuie sur la base"
    why: "Weaviate est open-source sous licence BSD-3, auto-hébergé ou en offre managée (Weaviate Cloud)."
  - id: langage-go
    prompt: "Dans quel langage Weaviate est-il écrit ?"
    answer: "En Go"
    decoys:
      - "En Rust"
      - "En Java"
    why: "Weaviate est écrit en Go. Qdrant, base vectorielle voisine, est écrit en Rust."
  - id: collections-proprietes
    prompt: "Comment Weaviate organise-t-il les objets ?"
    answer: "En collections, dont on décrit les propriétés"
    decoys:
      - "En tables reliées par des clés étrangères, créées en SQL"
      - "En index inversés, sans notion de propriété"
    why: "Une collection regroupe des objets, chacun avec ses propriétés et son vecteur. Le SQL et les clés étrangères relèvent du relationnel."
  - id: vecteurs-fournis
    prompt: "Peut-on utiliser Weaviate sans module de vectorisation ?"
    answer: "Oui, en fournissant ses propres vecteurs, calculés ailleurs"
    decoys:
      - "Non : sans module, aucun objet ne peut être inséré dans une collection"
      - "Oui, mais seulement pour la recherche par mots-clés, jamais pour les vecteurs"
    why: "La vectorisation intégrée est facultative : on peut insérer des objets avec des vecteurs déjà calculés."
  - id: vectorise-question
    prompt: "Avec un module de vectorisation, que se passe-t-il quand on cherche avec du texte ?"
    answer: "Weaviate vectorise la question avec le même modèle que celui des objets"
    decoys:
      - "Il compare la question aux objets mot par mot, sans passer par un vecteur"
      - "Il traduit la question en anglais avant la recherche, quel que soit le modèle"
    why: "Comparer des vecteurs n'a de sens qu'avec le même modèle : le module calcule le vecteur de la question comme il l'a fait à l'insertion."
  - id: bm25
    prompt: "À quoi sert BM25 dans la recherche hybride de Weaviate ?"
    answer: "Classer les objets selon la présence et la rareté des termes de la requête"
    decoys:
      - "Mesurer la distance cosinus entre deux vecteurs denses de grande dimension"
      - "Compresser l'index HNSW pour qu'il tienne dans la mémoire"
    why: "BM25 est la partie mots-clés : il favorise les objets qui contiennent les termes de la requête, surtout s'ils sont rares."
  - id: nom-propre
    prompt: "Pourquoi une recherche purement vectorielle rate-t-elle parfois un nom propre ou une référence produit ?"
    answer: "Le vecteur capte le sens général, pas l'identité exacte d'une chaîne rare"
    decoys:
      - "Weaviate ignore les caractères non alphabétiques à l'indexation"
      - "Les références sont toujours tronquées avant d'être vectorisées"
    why: "C'est la raison d'être de la recherche hybride : BM25 retrouve les termes exacts, le vecteur le sens."
  - id: saas
    prompt: "Dans quel type de produit la multi-tenancy de Weaviate est-elle fréquente ?"
    answer: "Un SaaS qui héberge les données de nombreux clients"
    decoys:
      - "Un script d'analyse lancé une fois sur un seul jeu de données"
      - "Une application mobile qui fonctionne hors ligne, sans serveur"
    why: "Chaque client (tenant) a ses données isolées dans la même collection."
  - id: generative-simplifie
    prompt: "En quoi la recherche générative de Weaviate simplifie-t-elle un RAG ?"
    answer: "La recherche et l'appel au LLM se font dans une seule requête"
    decoys:
      - "Le LLM est entraîné sur les objets de la collection à chaque requête"
      - "Les objets sont résumés à l'insertion, sans qu'aucun modèle soit appelé"
    why: "Weaviate transmet les objets trouvés à un LLM avec une consigne. Il n'entraîne rien."
  - id: helm
    prompt: "Comment déploie-t-on Weaviate en cluster ?"
    answer: "Avec le chart Helm officiel, sur Kubernetes"
    decoys:
      - "Uniquement par un script d'installation sur machine virtuelle, sans conteneur"
      - "En l'activant comme extension d'un cluster PostgreSQL existant"
    why: "Un chart Helm officiel existe pour Kubernetes, et une image Docker pour une instance locale."
  - id: vs-qdrant
    prompt: "Comment départager Weaviate et Qdrant, au positionnement très proche ?"
    answer: "Par l'API, l'exploitation et des tests sur ses propres données"
    decoys:
      - "Weaviate est le seul des deux à proposer un cloud managé"
      - "Qdrant est le seul des deux à filtrer sur les métadonnées"
    why: "Les deux sont open-source, filtrent, proposent l'hybride et un cloud managé. Le choix se fait sur le terrain."
  - id: vs-pinecone
    prompt: "Quelle différence d'hébergement entre Weaviate et Pinecone ?"
    answer: "Weaviate peut s'auto-héberger, Pinecone est entièrement managé"
    decoys:
      - "Pinecone s'auto-héberge avec une image Docker officielle, alors que Weaviate n'existe qu'en SaaS"
      - "Les deux sont des extensions de PostgreSQL, activées dans une base déjà en place"
    why: "Weaviate existe en auto-hébergé et en cloud managé. Pinecone n'a pas de version à installer chez soi."
  - id: weaviate-cloud
    prompt: "À quoi sert Weaviate Cloud ?"
    answer: "À obtenir Weaviate hébergé et exploité par l'éditeur, sans serveur à gérer"
    decoys:
      - "À sauvegarder gratuitement les bases auto-hébergées dans un stockage objet"
      - "À calculer les embeddings à la place des modules de vectorisation"
    why: "C'est l'offre managée, pour les équipes sans capacité à opérer une base de plus."
  - id: filtres-proprietes
    prompt: "Peut-on filtrer sur les propriétés des objets pendant une recherche vectorielle ?"
    answer: "Oui, la recherche s'accompagne de filtres sur les propriétés"
    decoys:
      - "Non : un filtre n'est possible qu'avec la recherche par mots-clés BM25"
      - "Seulement sur l'identifiant de l'objet, pas sur ses propriétés"
    why: "Weaviate cherche les vecteurs les plus proches tout en filtrant sur les propriétés des objets."
  - id: exploitation
    prompt: "Que demande l'auto-hébergement de Weaviate à une équipe ?"
    answer: "Déployer, sauvegarder, surveiller et mettre à jour une base de plus"
    decoys:
      - "Écrire soi-même l'index HNSW, qui n'est pas fourni avec le logiciel"
      - "Obtenir une licence commerciale avant tout usage en production"
    why: "Sans capacité d'exploitation ni budget pour l'offre managée, une base de plus est un coût à évaluer."
  - id: quand-choisir
    prompt: "Dans quel cas Weaviate est-il un bon choix ?"
    answer: "Recherche sémantique ou RAG à un volume qui justifie une base dédiée, avec besoin d'hybride"
    decoys:
      - "Quelques milliers de lignes dans une application qui a déjà PostgreSQL"
      - "Des données qui doivent rester cohérentes à chaque instant avec la base métier"
    why: "Pour un volume modeste avec PostgreSQL, pgvector suffit. Une cohérence stricte avec la base métier est un point faible des bases dédiées."
  - id: changer-modele
    prompt: "On change de modèle de vectorisation d'une collection Weaviate déjà remplie. Que faut-il faire ?"
    answer: "Revectoriser les objets : les vecteurs de deux modèles ne sont pas comparables"
    decoys:
      - "Rien : Weaviate convertit lui-même les anciens vecteurs vers l'espace du nouveau modèle"
      - "Seulement recréer l'index HNSW, les anciens vecteurs restant valides"
    why: "Chaque modèle a son espace de vecteurs. Il faut recalculer les vecteurs, par exemple dans une nouvelle collection."
  - id: approximation
    prompt: "Qu'implique la recherche approximative de l'index HNSW de Weaviate sur les résultats ?"
    answer: "Quelques vrais voisins peuvent manquer, en échange de la vitesse"
    decoys:
      - "Les résultats changent de façon aléatoire à chaque exécution de la même requête"
      - "Seuls les objets insérés avant la création de l'index sont retrouvés"
    why: "HNSW parcourt un graphe sans tout comparer. C'est le compromis classique entre rappel et vitesse."
  - id: poids-mots-cles
    prompt: "Que donne un réglage de la recherche hybride qui ne laisse de poids qu'aux mots-clés ?"
    answer: "Une recherche BM25 pure, sans composante vectorielle"
    decoys:
      - "Une recherche vectorielle pure, sans composante par mots-clés"
      - "Une recherche exacte qui compare chaque objet à la requête, un à un"
    why: "Le paramètre de l'hybride répartit le poids entre mots-clés (BM25) et vecteurs. À l'extrême, on retrouve l'une des deux recherches seule."
  - id: donnees-chez-soi
    prompt: "Des données qui doivent rester dans votre infrastructure : Weaviate peut-il convenir ?"
    answer: "Oui en auto-hébergement, à condition que le module de vectorisation ne passe pas par un fournisseur externe"
    decoys:
      - "Non : seule l'offre managée existe, aucune installation chez soi n'est possible"
      - "Oui sans réserve, même si un module envoie les textes à un fournisseur externe"
    why: "Les modules appellent un fournisseur d'embeddings ou un modèle hébergé soi-même : le texte ne quitte l'infrastructure que dans le second cas."
---
