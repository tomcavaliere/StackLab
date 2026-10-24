---
questions:
  - id: role
    prompt: "Qu'est-ce que Chroma ?"
    answer: "Une base vectorielle open-source, utilisable comme simple bibliothèque"
    decoys:
      - "Un modèle d'embeddings open-source pour vectoriser des images en couleur"
      - "Un framework pour assembler des agents à base de modèles de langage"
    why: "Chroma stocke documents, embeddings et métadonnées et cherche les plus proches. Il peut calculer des embeddings, mais n'est pas lui-même un modèle."
  - id: sans-serveur
    prompt: "Comment démarrer Chroma dans un script Python sans déployer de serveur ?"
    answer: "Avec un client en mémoire ou persistant, qui écrit dans un dossier local"
    decoys:
      - "Impossible : il faut toujours lancer le conteneur Docker de Chroma"
      - "En créant un compte sur l'offre managée, seule option disponible"
    why: "Chroma s'utilise embarqué : un client en mémoire (jetable) ou persistant (dossier local). Le mode serveur et le cloud viennent ensuite."
  - id: collection
    prompt: "Dans Chroma, où range-t-on les documents et leurs vecteurs ?"
    answer: "Dans une collection"
    decoys:
      - "Dans une table, dont on déclare les colonnes en SQL au préalable"
      - "Dans un bucket de stockage objet"
    why: "Les données vivent dans des collections : chaque élément a un id, un document, un vecteur et des métadonnées."
  - id: embeddings-auto
    prompt: "On ajoute des documents à une collection Chroma sans fournir de vecteurs. Que se passe-t-il ?"
    answer: "Chroma les calcule avec la fonction d'embedding de la collection"
    decoys:
      - "L'ajout échoue : les vecteurs doivent toujours être fournis par l'appelant"
      - "Les documents sont stockés sans vecteur et seule la recherche par mots-clés marche"
    why: "Chaque collection a une fonction d'embedding, utilisée quand on ne passe pas de vecteurs. On peut aussi fournir ses propres vecteurs."
  - id: filtre-where
    prompt: "Comment limiter une recherche Chroma aux documents d'un service précis ?"
    answer: "Avec un filtre where sur les métadonnées"
    decoys:
      - "En créant un nouveau modèle d'embeddings dédié à chaque service"
      - "En ajoutant le nom du service à la fin du texte de la question posée"
    why: "Les métadonnées se filtrent pendant la requête (where), ce qui évite de mélanger les documents de services différents."
  - id: tests
    prompt: "Pourquoi Chroma est-il pratique pour les tests automatisés d'un pipeline RAG ?"
    answer: "On crée une base locale et jetable en mémoire, sans infrastructure"
    decoys:
      - "Il génère automatiquement les questions de test à partir des documents"
      - "Il simule les réponses du LLM pour éviter de payer les appels"
    why: "Un client en mémoire se crée et disparaît avec le test. Chroma ne génère ni questions ni réponses."
  - id: postgres-deja-la
    prompt: "L'application a déjà PostgreSQL et des droits d'accès par utilisateur. Pourquoi préférer pgvector à Chroma ?"
    answer: "Vecteurs, métadonnées et droits se filtrent dans une même requête"
    decoys:
      - "Chroma ne sait pas stocker plus de quelques centaines de documents"
      - "pgvector calcule de meilleurs embeddings que Chroma"
    why: "Avec pgvector, pas de second système à synchroniser : les droits d'accès sont dans la même base. Aucune limite de quelques centaines de documents chez Chroma, et la qualité des embeddings dépend du modèle, pas de la base."
  - id: multi-instances
    prompt: "Quel est le piège du mode embarqué persistant de Chroma derrière plusieurs serveurs d'API ?"
    answer: "Les données vivent dans un dossier local, non partagé entre les serveurs"
    decoys:
      - "Il efface la collection à chaque redémarrage du processus Python"
      - "Il n'accepte qu'une seule requête par seconde"
    why: "Le client persistant écrit dans un dossier local : plusieurs instances auraient chacune leur copie. Il faut alors le mode serveur ou le cloud."
  - id: licence
    prompt: "Sous quelle licence la base Chroma est-elle distribuée ?"
    answer: "Apache 2.0"
    decoys:
      - "Licence propriétaire, réservée aux clients de l'offre cloud"
      - "AGPL, qui impose de publier le code de l'application qui l'utilise"
    why: "Chroma est open-source sous licence Apache 2.0 ; l'offre cloud de l'éditeur est un service en plus."
  - id: production-grande-echelle
    prompt: "Gros volume, forte charge et haute disponibilité exigée : quelle attitude avoir avec Chroma ?"
    answer: "Vérifier que le mode déployé couvre le besoin, ou choisir une base conçue pour ce cas"
    decoys:
      - "Rester en mode embarqué : il se répartit seul sur plusieurs machines"
      - "Aucune précaution : la haute disponibilité est incluse dans la bibliothèque"
    why: "Chroma brille pour démarrer vite ; à grande échelle, il faut valider le mode serveur ou cloud, ou comparer avec des bases orientées production."
  - id: memoire-ou-persistant
    prompt: "Quelle différence entre le client en mémoire et le client persistant de Chroma ?"
    answer: "Le persistant écrit dans un dossier local, alors que l'autre disparaît avec le processus"
    decoys:
      - "Le persistant envoie les données vers l'offre managée, le client en mémoire reste purement local"
      - "Le client en mémoire accepte les filtres sur métadonnées, le persistant ne filtre que sur l'id"
    why: "Le client en mémoire est jetable (tests, démonstrations). Le client persistant garde les données dans un dossier local, retrouvé au redémarrage."
  - id: ajout-element
    prompt: "Que fournit-on pour chaque élément ajouté à une collection Chroma ?"
    answer: "Un id unique, un document ou un vecteur, des métadonnées en option"
    decoys:
      - "Un schéma SQL qui décrit chaque champ, déclaré avant le premier ajout"
      - "Une URL vers le modèle d'embeddings qui a servi au calcul du vecteur"
    why: "Chaque élément a un id, un document, un vecteur (calculé par Chroma si on n'en fournit pas) et des métadonnées facultatives."
  - id: resultat-requete
    prompt: "Que renvoie une requête de recherche à une collection Chroma ?"
    answer: "Les documents les plus proches de la question, avec leurs métadonnées"
    decoys:
      - "Une réponse rédigée par un LLM à partir des documents trouvés"
      - "Uniquement les vecteurs bruts des plus proches voisins, sans les documents"
    why: "Chroma retrouve des documents, il ne génère aucun texte. La réponse du LLM est une autre étape du RAG."
  - id: filtre-contenu
    prompt: "À quoi sert un filtre sur le contenu du document dans une requête Chroma ?"
    answer: "Garder les documents dont le texte contient une chaîne donnée"
    decoys:
      - "Modifier le texte des documents trouvés avant de les renvoyer à l'appelant"
      - "Choisir le modèle d'embeddings qui servira à calculer la distance"
    why: "En plus du filtre sur les métadonnées, une requête peut filtrer sur le texte des documents."
  - id: meme-fonction-embedding
    prompt: "Pourquoi utiliser la même fonction d'embedding à l'écriture et à la requête ?"
    answer: "Pour que les vecteurs de la question et des documents soient comparables"
    decoys:
      - "Pour que Chroma accepte d'ouvrir la collection sans lever d'erreur de version ni de licence"
      - "Pour que les métadonnées restent synchronisées avec les vecteurs"
    why: "Deux modèles produisent des espaces de vecteurs différents : comparer leurs vecteurs n'a pas de sens."
  - id: meme-code
    prompt: "Le prototype tourne en mode embarqué. Que prévoit Chroma pour passer plus tard à un serveur ?"
    answer: "Le même code peut viser un serveur Chroma ou l'offre managée, en changeant de client"
    decoys:
      - "Il faut réécrire les requêtes dans un langage dédié au mode serveur"
      - "C'est impossible : un projet commencé en mode embarqué ne migre vers aucun autre mode"
    why: "Le code d'accès aux collections reste le même ; on change surtout la façon de se connecter."
  - id: mode-serveur
    prompt: "Comment lancer Chroma en mode client-serveur ?"
    answer: "Avec son image Docker, que les clients interrogent ensuite sur le réseau"
    decoys:
      - "Avec un paquet système qui installe un service PostgreSQL dédié aux vecteurs"
      - "En le déployant comme fonction serverless facturée à la requête, seule voie prévue"
    why: "Le mode serveur se lance par exemple avec l'image Docker de Chroma. Les clients se connectent alors à lui comme à n'importe quel service."
  - id: integrations
    prompt: "Que permet l'intégration de Chroma avec LangChain ou LlamaIndex ?"
    answer: "L'utiliser comme stockage vectoriel d'un pipeline d'indexation et de recherche"
    decoys:
      - "Héberger les modèles de langage appelés par ces frameworks sur le serveur Chroma"
      - "Remplacer ces frameworks, Chroma sachant lui-même orchestrer les appels au LLM"
    why: "Ces frameworks traitent Chroma comme un magasin de vecteurs. Ni l'hébergement de modèles ni l'orchestration ne lui reviennent."
  - id: role-rag
    prompt: "Quel est le rôle de Chroma dans un RAG ?"
    answer: "Retrouver les passages les plus proches de la question, à petite échelle"
    decoys:
      - "Superviser la qualité des réponses du LLM et leur attribuer une note de pertinence"
      - "Orchestrer les appels successifs au LLM et aux outils externes de l'application"
    why: "Chroma est l'index d'un prototype ou d'une petite application RAG. Supervision et orchestration sont d'autres briques."
  - id: notebook
    prompt: "Pourquoi Chroma convient-il bien à un notebook de démonstration ?"
    answer: "Il s'importe comme une bibliothèque et ne demande ni serveur ni compte"
    decoys:
      - "Il fournit des cellules de notebook préconfigurées avec visualisation intégrée"
      - "Il exécute les cellules sur des GPU gérés par l'éditeur"
    why: "Un client en mémoire se crée en une ligne, sans infrastructure. Chroma n'est pas un environnement de notebook."
  - id: vs-qdrant
    prompt: "Que gagne-t-on avec Qdrant par rapport à Chroma ?"
    answer: "Une base orientée production, avec filtrage riche, recherche hybride et quantification"
    decoys:
      - "La possibilité de tourner embarqué dans un script Python, sans aucun serveur à lancer"
      - "Une licence open-source permissive, que Chroma ne propose pas à ses utilisateurs"
    why: "Qdrant demande plus d'exploitation mais vise la production. Le mode embarqué est un atout de Chroma, et les deux sont open-source (Apache 2.0)."
  - id: outil-interne
    prompt: "Pour quel projet Chroma est-il un bon candidat ?"
    answer: "Un outil interne qui indexe un volume modeste de documents"
    decoys:
      - "Un moteur de recherche public à très forte charge, avec haute disponibilité exigée"
      - "Un entrepôt de vecteurs partagé en production par des dizaines de services"
    why: "Chroma excelle pour démarrer vite, à petite échelle. Les besoins de forte charge se vérifient avant de s'engager."
  - id: role-metadonnees
    prompt: "À quoi servent les métadonnées d'un élément dans Chroma ?"
    answer: "Décrire l'élément (source, service, date) pour filtrer ensuite la recherche"
    decoys:
      - "Remplacer le vecteur d'un élément quand le modèle d'embeddings est momentanément indisponible"
      - "Stocker l'historique des requêtes qui ont renvoyé cet élément"
    why: "Les métadonnées se filtrent avec where pendant la requête, ce qui évite de mélanger les documents de sources différentes."
  - id: corriger-document
    prompt: "Comment corriger un document déjà présent dans une collection Chroma ?"
    answer: "En ciblant son id avec une opération de mise à jour ou d'upsert"
    decoys:
      - "En supprimant la collection entière puis en la recréant, seule voie prévue"
      - "En ajoutant un nouvel élément portant le même id, ce qui crée un doublon"
    why: "L'id identifie l'élément : on le met à jour ou on l'upserte, sans recréer la collection."
  - id: changer-modele
    prompt: "On change de modèle d'embeddings pour une collection Chroma déjà remplie. Que faut-il faire ?"
    answer: "Recalculer les vecteurs des documents, car ceux de deux modèles ne sont pas comparables"
    decoys:
      - "Rien : Chroma convertit lui-même les anciens vecteurs vers l'espace du nouveau modèle"
      - "Seulement vider le cache de la collection, les anciens vecteurs restant utilisables"
    why: "Chaque modèle a son propre espace de vecteurs : il faut réindexer, par exemple dans une nouvelle collection."
  - id: instance-unique
    prompt: "Dans quel cas le mode embarqué persistant reste-t-il raisonnable en production ?"
    answer: "Une petite application à une seule instance, avec un volume modeste"
    decoys:
      - "Plusieurs instances d'API qui partagent le même dossier réseau en écriture"
      - "Une application qui exige une disponibilité continue pendant les mises à jour"
    why: "Les données vivent dans un dossier local, qu'on ne partage pas entre plusieurs serveurs. À plusieurs instances, il faut le mode serveur ou le cloud."
  - id: quand-serveur
    prompt: "Quand passer du mode embarqué au mode serveur ou au cloud ?"
    answer: "Quand plusieurs services ou instances doivent partager les mêmes données"
    decoys:
      - "Dès qu'on veut filtrer sur les métadonnées, une fonction absente du mode embarqué"
      - "Dès qu'on veut que les embeddings soient calculés automatiquement"
    why: "Filtres et embeddings automatiques existent déjà en mode embarqué. Le serveur ou le cloud devient utile pour partager les données."
  - id: plusieurs-collections
    prompt: "Pourquoi créer plusieurs collections dans une même base Chroma ?"
    answer: "Séparer des corpus distincts, chacun avec sa propre fonction d'embedding"
    decoys:
      - "Répartir automatiquement un même corpus sur plusieurs machines pour tenir la charge"
      - "Obtenir une copie de sauvegarde toujours synchronisée avec chaque corpus"
    why: "Une collection regroupe des éléments cohérents, avec sa fonction d'embedding. Ce n'est ni du partitionnement ni une sauvegarde."
  - id: langages
    prompt: "Avec quels langages la fiche associe-t-elle Chroma ?"
    answer: "Python et TypeScript"
    decoys:
      - "SQL uniquement, via un pilote"
      - "Java et C#, avec des clients officiels"
    why: "Chroma s'utilise surtout depuis Python (client embarqué) et TypeScript. Il n'a pas d'interface SQL."
  - id: vecteurs-fournis
    prompt: "Quand fournir ses propres vecteurs plutôt que laisser Chroma les calculer ?"
    answer: "Quand on veut un modèle précis, calculé à part ou par un fournisseur choisi"
    decoys:
      - "Quand les documents contiennent des métadonnées, que Chroma ne vectorise jamais"
      - "Quand la collection dépasse quelques documents, Chroma refusant de vectoriser au-delà"
    why: "La fonction d'embedding de la collection est un choix par défaut ; on peut passer des vecteurs déjà calculés, avec le modèle de son choix."
---
