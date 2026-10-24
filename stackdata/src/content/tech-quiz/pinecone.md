---
questions:
  - id: role
    prompt: "Qu'est-ce que Pinecone ?"
    answer: "Une base vectorielle entièrement managée, proposée en SaaS"
    decoys:
      - "Une base vectorielle open-source, à installer et à exploiter sur ses propres serveurs"
      - "Une extension de PostgreSQL pour la recherche par similarité"
    why: "Pinecone est un service hébergé : on crée un index et on l'utilise via une API, sans base à opérer. Le logiciel n'est pas open-source."
  - id: open-source
    prompt: "Peut-on installer Pinecone en open-source sur ses propres serveurs ?"
    answer: "Non : le logiciel n'est pas publié, le service est piloté par Pinecone"
    decoys:
      - "Oui : la même version que le cloud, sous licence Apache 2.0"
      - "Oui : une édition communautaire limitée à un seul nœud"
    why: "Pinecone n'a pas de version auto-hébergeable. Une option de déploiement dans son propre compte cloud (BYOC) existe, mais elle reste gérée par Pinecone."
  - id: namespaces
    prompt: "À quoi servent les namespaces d'un index Pinecone ?"
    answer: "À cloisonner les données dans un index, typiquement un par client"
    decoys:
      - "À versionner les modèles d'embeddings utilisés pour calculer les vecteurs de l'index"
      - "À répartir l'index entre plusieurs régions du cloud"
    why: "Un namespace sépare les données d'un même index : les requêtes d'un client ne voient que les siennes. C'est la façon simple de faire du multi-clients."
  - id: rien-a-operer
    prompt: "Quel est le principal argument pour choisir Pinecone ?"
    answer: "Rien à opérer : stockage, montée en charge et disponibilité sont gérés"
    decoys:
      - "Les vecteurs restent dans la base métier, ce qui permet des jointures SQL directes"
      - "Le code source est modifiable pour l'adapter à son produit"
    why: "Le service s'occupe de l'infrastructure : une petite équipe peut ajouter une recherche vectorielle sans compétence d'exploitation. Les jointures SQL, c'est pgvector."
  - id: donnees-sensibles
    prompt: "Données qui ne doivent pas quitter votre infrastructure : pourquoi Pinecone pose-t-il problème ?"
    answer: "Les données sont confiées à un service tiers qui les héberge et les gère"
    decoys:
      - "Pinecone refuse tout vecteur accompagné de métadonnées, ce qui interdit le filtrage"
      - "Pinecone publie les index sur un catalogue public par défaut"
    why: "Avec un SaaS, vecteurs et métadonnées sont stockés par le fournisseur. Pour des contraintes réglementaires fortes, on regarde l'auto-hébergement (Qdrant, pgvector), ou l'option BYOC au cas par cas."
  - id: embedding-integre
    prompt: "Que permet l'embedding intégré de Pinecone ?"
    answer: "Envoyer du texte : Pinecone calcule les vecteurs avec un modèle qu'il héberge"
    decoys:
      - "Embarquer Pinecone dans le processus de l'application, sans passer par le réseau ni par une API"
      - "Intégrer l'index directement dans une base PostgreSQL existante"
    why: "Avec un modèle hébergé par Pinecone, on écrit et on interroge avec du texte : le calcul des embeddings se fait côté service, plus besoin de l'appeler à part."
  - id: alternative-postgres
    prompt: "L'application a déjà PostgreSQL et quelques milliers de documents à indexer. Pourquoi Pinecone est-il sans doute superflu ?"
    answer: "pgvector suffit, sans fournisseur ni facture de plus"
    decoys:
      - "Pinecone ne sait pas indexer moins d'un million de vecteurs"
      - "Pinecone ne fonctionne qu'avec des bases NoSQL"
    why: "Pour un volume modeste, l'extension pgvector dans la base existante évite un service, un contrat et une synchronisation de plus."
  - id: dependance
    prompt: "Pourquoi parle-t-on de dépendance fournisseur avec Pinecone ?"
    answer: "Sans version auto-hébergeable, en partir demande de réindexer dans une autre base"
    decoys:
      - "Ses index ne s'interrogent qu'avec les modèles d'embeddings d'un seul éditeur de LLM"
      - "Son contrat interdit d'utiliser une autre base vectorielle en parallèle"
    why: "On ne peut pas reprendre Pinecone chez soi : pour changer, il faut réécrire les vecteurs dans une autre base et adapter le code. Les vecteurs eux-mêmes viennent du modèle de son choix."
  - id: filtres
    prompt: "Peut-on filtrer une recherche Pinecone sur autre chose que la similarité ?"
    answer: "Oui, sur les métadonnées associées aux vecteurs"
    decoys:
      - "Non, seule la distance entre vecteurs compte"
      - "Oui, mais seulement sur la date d'insertion du vecteur dans l'index"
    why: "Chaque vecteur porte des métadonnées (document, langue, date…) et la requête peut filtrer dessus pendant la recherche."
  - id: cas-type
    prompt: "Dans quel cas Pinecone est-il un bon choix ?"
    answer: "Un MVP d'IA monté par une petite équipe pressée, sans contrainte de localisation des données"
    decoys:
      - "Une banque dont les données ne doivent jamais quitter ses propres serveurs ni son réseau"
      - "Une application qui doit joindre les vecteurs aux factures en SQL"
    why: "Pinecone échange le contrôle contre la rapidité de mise en œuvre. Données confinées ou jointures SQL orientent vers l'auto-hébergement ou pgvector."
  - id: upsert
    prompt: "Quelle opération écrit ou met à jour un vecteur dans un index Pinecone à partir de son identifiant ?"
    answer: "L'upsert : il insère le vecteur s'il est nouveau et le remplace si l'identifiant existe"
    decoys:
      - "Un INSERT SQL, qui échoue systématiquement quand l'identifiant existe déjà dans l'index"
      - "Un commit, qui valide un lot de vecteurs avant qu'ils deviennent visibles pour les requêtes"
    why: "L'upsert crée ou remplace un vecteur selon son id. Pinecone s'utilise par API et par SDK, pas en SQL."
  - id: dimension-fixe
    prompt: "Qu'est-ce qui est fixé à la création d'un index Pinecone qui reçoit des vecteurs fournis par l'appelant ?"
    answer: "La dimension des vecteurs, qui doit être celle du modèle d'embeddings"
    decoys:
      - "Le nombre exact de vecteurs qu'il contiendra, réservé à l'avance par le service"
      - "La liste des champs de métadonnées autorisés, qui ne pourra plus être étendue"
    why: "Un index attend des vecteurs de dimension fixe, celle du modèle d'embeddings. Le nombre de vecteurs n'est pas réservé et les métadonnées restent libres."
  - id: metrique
    prompt: "Que définit la métrique d'un index Pinecone (cosinus, euclidienne, produit scalaire) ?"
    answer: "La mesure de proximité entre deux vecteurs, qui sert à classer les résultats"
    decoys:
      - "La stratégie de sauvegarde de l'index, entre cliché complet et copie incrémentale"
      - "Le nombre de réplicas qui répondent aux requêtes en lecture sur cet index"
    why: "La métrique dit ce que « proche » veut dire pour l'index. On la choisit en cohérence avec le modèle d'embeddings (voir sa documentation)."
  - id: hybride-dense-creux
    prompt: "Que combine la recherche hybride de Pinecone ?"
    answer: "Des vecteurs denses (le sens) et des vecteurs creux (les mots exacts)"
    decoys:
      - "Des vecteurs et des requêtes SQL, exécutés dans une même transaction"
      - "Deux régions du cloud, interrogées en parallèle pour réduire la latence"
    why: "Le dense capte la proximité de sens, le creux les termes exacts (références, noms propres) ; les combiner améliore la pertinence."
  - id: vecteurs-externes
    prompt: "On n'utilise pas les modèles d'embeddings hébergés par Pinecone. Qui calcule alors les vecteurs ?"
    answer: "L'application, en appelant le modèle d'embeddings de son choix avant d'écrire"
    decoys:
      - "Pinecone, avec un modèle par défaut choisi selon la langue de chaque document"
      - "L'index lui-même, lors de la première requête qui porte sur chaque document"
    why: "Pinecone stocke et compare des vecteurs. Sans embedding intégré, l'application les produit, avec le même modèle à l'écriture et à la requête."
  - id: byoc
    prompt: "Que propose l'option BYOC de Pinecone ?"
    answer: "Un déploiement dans son propre compte cloud, le service restant piloté par Pinecone"
    decoys:
      - "Le téléchargement du logiciel pour l'installer sur ses propres serveurs et l'exploiter soi-même"
      - "Une édition communautaire open-source, maintenue par des contributeurs et sous licence permissive"
    why: "Avec BYOC (bring your own cloud), l'infrastructure est dans le compte cloud du client mais Pinecone reste l'opérateur : ce n'est pas de l'auto-hébergement."
  - id: couts
    prompt: "Comment estimer le coût de Pinecone pour un projet ?"
    answer: "À partir de la grille tarifaire officielle, car les coûts suivent l'usage"
    decoys:
      - "Par un prix fixe annuel pour chaque index, quel que soit le volume de données stocké"
      - "Par une licence perpétuelle payée une fois, avec une maintenance facturée à part"
    why: "Pinecone est facturé selon l'usage. La fiche ne donne aucun chiffre et renvoie à la grille officielle."
  - id: hebergement-vs-qdrant
    prompt: "Quelle différence d'hébergement sépare Pinecone de Qdrant ?"
    answer: "Qdrant peut s'auto-héberger, Pinecone n'existe qu'en service piloté par l'éditeur"
    decoys:
      - "Pinecone s'auto-héberge grâce à une image Docker officielle, alors que Qdrant n'existe qu'en SaaS"
      - "Les deux sont des extensions de PostgreSQL, activées dans une base déjà en place"
    why: "Qdrant est open-source (Apache 2.0), auto-hébergeable ou managé. Pinecone n'a pas de version à installer chez soi, hors option BYOC."
  - id: langchain
    prompt: "Que fait l'intégration de Pinecone avec LangChain ?"
    answer: "Elle l'expose comme magasin de vecteurs dans une chaîne de recherche ou de RAG"
    decoys:
      - "Elle héberge les modèles de langage appelés par LangChain, à la place d'un fournisseur"
      - "Elle convertit automatiquement chaque chaîne LangChain en requête SQL pour l'index"
    why: "LangChain traite Pinecone comme un magasin de vecteurs parmi d'autres : il y écrit les passages et y recherche les plus proches."
  - id: role-rag
    prompt: "Quel est le rôle de Pinecone dans un RAG ?"
    answer: "Retrouver les passages les plus proches de la question, pour les transmettre au LLM"
    decoys:
      - "Rédiger la réponse finale à partir des passages, à la place du modèle de langage"
      - "Découper les documents en passages et décider de la taille idéale de chacun"
    why: "Pinecone est la brique de recherche : il ne génère pas de texte et ne découpe pas les documents."
  - id: changer-modele
    prompt: "On change de modèle d'embeddings pour un corpus déjà indexé dans Pinecone. Que faut-il faire ?"
    answer: "Recalculer et réécrire tous les vecteurs : ceux de deux modèles ne sont pas comparables"
    decoys:
      - "Rien : l'index convertit lui-même les anciens vecteurs au premier appel du nouveau modèle"
      - "Seulement modifier la métrique de l'index, les anciens vecteurs restant valides"
    why: "Chaque modèle produit son propre espace de vecteurs. Il faut réindexer le corpus, souvent dans un nouvel index."
  - id: metadonnees-rag
    prompt: "Que met-on typiquement dans les métadonnées d'un vecteur pour un RAG ?"
    answer: "L'identifiant du document source, la langue, la date, parfois le passage lui-même"
    decoys:
      - "Le vecteur de chaque mot du passage, pour affiner la comparaison avec la requête"
      - "Le journal des requêtes passées, pour mémoriser les questions déjà posées"
    why: "Les métadonnées servent à filtrer (client, langue, date) et à retrouver la source. La comparaison, elle, se fait sur le vecteur."
  - id: reste-a-faire
    prompt: "Même avec Pinecone, que reste-t-il à la charge de l'équipe ?"
    answer: "Découper les documents, choisir le modèle d'embeddings et écrire le code d'ingestion"
    decoys:
      - "Dimensionner les serveurs, appliquer les correctifs et planifier la reprise après incident"
      - "Répliquer les données entre zones et surveiller la disponibilité de chaque nœud"
    why: "Le service gère l'infrastructure, la montée en charge et la disponibilité. Le pipeline de données reste à l'équipe."
  - id: complement-sql
    prompt: "Pinecone peut-il remplacer la base relationnelle qui contient les données métier ?"
    answer: "Non : il sert la recherche par similarité, pas les transactions ni les jointures"
    decoys:
      - "Oui : avec les métadonnées, il gère aussi les transactions et les jointures entre collections"
      - "Oui, mais seulement pour les données qui n'ont jamais besoin d'être modifiées"
    why: "Pinecone complète la base métier. Pour garder vecteurs et tables dans une seule base, avec jointures SQL, c'est pgvector."
  - id: vecteurs-creux
    prompt: "Pourquoi ajouter des vecteurs creux à une recherche sémantique ?"
    answer: "Pour retrouver les termes exacts, comme une référence produit ou un nom propre"
    decoys:
      - "Pour réduire la dimension des vecteurs denses et économiser de la mémoire dans l'index"
      - "Pour traduire la question dans la langue des documents avant de la comparer à eux"
    why: "La recherche sémantique rate parfois une chaîne rare que seul le terme exact permet de retrouver : c'est le rôle des vecteurs creux."
  - id: prise-en-main
    prompt: "Pourquoi Pinecone est-il classé parmi les technos à prise en main rapide ?"
    answer: "Il suffit de créer un index, puis d'écrire et d'interroger par une API et des SDK"
    decoys:
      - "Le moteur s'installe en local et fonctionne sans compte ni connexion réseau"
      - "Il se configure en SQL, langage que la plupart des développeurs connaissent déjà"
    why: "Aucun serveur à installer ni à régler : le service est hébergé. Il n'y a ni installation locale ni SQL."
  - id: filtre-pendant
    prompt: "Pourquoi filtrer sur les métadonnées pendant la recherche plutôt qu'après, dans l'application ?"
    answer: "Pour obtenir directement les k meilleurs résultats parmi ceux qui respectent le filtre"
    decoys:
      - "Pour éviter de calculer des vecteurs pour les documents que le filtre écarte ensuite"
      - "Pour que la distance entre vecteurs soit calculée sur les seules métadonnées"
    why: "Filtrer après risquerait de ne laisser que quelques résultats utiles parmi les k renvoyés. Les vecteurs, eux, sont déjà calculés à l'écriture."
  - id: supprimer-client
    prompt: "Un client quitte le service et ses données doivent disparaître. Qu'apporte un namespace par client ?"
    answer: "On retire toutes ses données par une opération ciblée sur son seul namespace"
    decoys:
      - "Il faut réindexer les autres clients, car les namespaces partagent un même graphe de voisinage"
      - "Les vecteurs du client sont purgés seuls dès qu'une requête n'en renvoie plus aucun"
    why: "Le cloisonnement par namespace permet de supprimer ou vider les données d'un client sans toucher aux autres."
  - id: index-et-namespace
    prompt: "Quelle est la relation entre un index Pinecone et ses namespaces ?"
    answer: "Un index contient des namespaces, qui partagent sa dimension et sa métrique"
    decoys:
      - "Chaque namespace est un index indépendant, avec sa propre dimension et sa propre métrique"
      - "Un namespace regroupe plusieurs index qui se répartissent la charge de lecture"
    why: "Les namespaces cloisonnent les données à l'intérieur d'un même index, dont ils héritent la configuration."
  - id: serverless
    prompt: "Que signifie « serverless » pour un index Pinecone ?"
    answer: "Aucun serveur à dimensionner ou à gérer : la capacité suit l'usage"
    decoys:
      - "Le code de l'index s'exécute dans le navigateur de l'utilisateur, sans passer par le réseau"
      - "L'index est stocké dans un fichier local que l'application lit directement"
    why: "Le service ajuste les ressources selon l'usage, d'où des coûts qui suivent l'usage. Rien ne tourne dans le navigateur ni en local."
---
