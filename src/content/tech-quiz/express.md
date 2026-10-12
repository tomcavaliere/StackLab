---
questions:
  - id: apport
    prompt: "Qu'apporte Express au module HTTP de Node.js ?"
    answer: "Un routage par méthode et chemin, et une chaîne de middlewares"
    decoys:
      - "Un ORM et un système de migrations"
      - "Le rendu côté serveur de composants React, avec un routage par fichiers"
    why: "Le module HTTP de Node.js est bas niveau. Express ajoute une couche fine : routes et middlewares. Le reste se choisit à la carte."
  - id: middleware
    prompt: "Qu'est-ce qu'un middleware Express ?"
    answer: "Une fonction qui traite la requête puis passe la main à la suivante"
    decoys:
      - "Un serveur intermédiaire placé entre le navigateur et Node.js"
      - "Un pilote de base de données"
    why: "Journalisation, authentification, analyse du JSON : chaque middleware traite la requête à son tour."
  - id: minimaliste
    prompt: "Comment Express gère-t-il la base de données et la validation ?"
    answer: "Il ne les gère pas : chaque besoin se couvre par un paquet npm choisi par l'équipe"
    decoys:
      - "Avec un ORM intégré et un validateur de schémas"
      - "En générant automatiquement une API REST à partir du schéma de la base de données"
    why: "Express est volontairement minimal : base, validation, authentification sont des choix de l'équipe."
  - id: projet-qui-grossit
    prompt: "Quel risque quand un projet Express grossit avec plusieurs équipes ?"
    answer: "Sans structure imposée, chaque projet finit avec sa propre architecture"
    decoys:
      - "Express limite le nombre de routes par application"
      - "Express cesse de gérer les middlewares au-delà d'une certaine taille"
    why: "La liberté d'Express se paie sur les gros projets : les conventions divergent. NestJS fournit ce cadre."
  - id: nestjs
    prompt: "Quel framework Node.js impose une structure (modules, contrôleurs, services), là où Express n'en impose pas ?"
    answer: "NestJS"
    decoys:
      - "Fastify"
      - "Next.js"
    why: "NestJS impose une architecture et s'exécute d'ailleurs au-dessus d'Express. Fastify met l'accent sur la validation et la performance ; Next.js est un framework full-stack React."
  - id: validation-integree
    prompt: "Besoin de validation et de documentation d'API intégrées, en Node.js. Que suggère la fiche ?"
    answer: "Fastify"
    decoys:
      - "Express 5, qui les intègre désormais"
      - "Le module HTTP de Node.js, sans framework"
    why: "Fastify (ou FastAPI en Python) apporte validation et documentation intégrées. Express 5 reste minimaliste."
  - id: express-5
    prompt: "Quand Express 5 est-il sorti ?"
    answer: "En 2024, après une très longue gestation"
    decoys:
      - "En 2010, avec la première version d'Express"
      - "Jamais : le projet est resté en version 4"
    why: "Express date de 2010 ; sa version 5 n'est sortie qu'en 2024."
  - id: equivalent-python
    prompt: "Quel équivalent Python d'Express la fiche cite-t-elle, avec validation et OpenAPI intégrées ?"
    answer: "FastAPI"
    decoys:
      - "Django"
      - "Celery"
    why: "FastAPI est léger comme Express, mais valide les entrées et génère la documentation OpenAPI. Django est un framework complet ; Celery une file de tâches."
  - id: application-complete
    prompt: "Une application avec beaucoup de pages et de données métier. Express est-il le meilleur choix ?"
    answer: "Non : un framework complet (Django, Rails, Next.js) fait gagner du temps"
    decoys:
      - "Oui : Express impose une structure MVC complète"
      - "Oui : Express fournit une interface d'administration intégrée, générée depuis les modèles"
    why: "Express n'apporte ni ORM, ni admin, ni structure : sur une application riche, tout est à assembler."
  - id: projet-existant
    prompt: "Pourquoi garder Express dans un projet existant ?"
    answer: "C'est le framework Node.js le plus répandu et le plus documenté"
    decoys:
      - "C'est le seul framework Node.js compatible avec TypeScript"
      - "C'est le plus rapide de tous les frameworks web"
    why: "Express s'écrit en JavaScript comme en TypeScript, et n'est pas le plus rapide. Son atout est sa diffusion : documentation, exemples, développeurs."
  - id: fonction-next
    prompt: "Dans un middleware Express, à quoi sert l'appel à next() ?"
    answer: "Passer la main au middleware ou à la route suivante de la chaîne"
    decoys:
      - "Envoyer immédiatement la réponse au client et fermer la connexion"
      - "Relancer la requête depuis le premier middleware, pour la traiter une seconde fois"
    why: "next() fait avancer la requête dans la chaîne. La réponse s'envoie avec res.send ou res.json, et rien ne relance la chaîne."
  - id: ordre-middlewares
    prompt: "Dans quel ordre Express exécute-t-il les middlewares enregistrés avec app.use() ?"
    answer: "Dans l'ordre où ils sont déclarés dans le code"
    decoys:
      - "Par ordre alphabétique du nom de la fonction"
      - "Du plus récent au plus ancien, le dernier déclaré passant toujours en premier"
    why: "La chaîne suit l'ordre de déclaration : un middleware d'authentification doit donc être déclaré avant les routes qu'il protège."
  - id: middleware-erreur
    prompt: "Comment Express reconnaît-il un middleware de gestion d'erreurs ?"
    answer: "À sa signature à quatre paramètres : (err, req, res, next)"
    decoys:
      - "À son nom, qui doit commencer par « error »"
      - "À l'option { errorHandler: true } passée à app.use() au moment de l'enregistrer"
    why: "Express compte les paramètres de la fonction : quatre signifie gestionnaire d'erreurs. Ni le nom ni une option ne jouent ce rôle."
  - id: express-json
    prompt: "Quel est le rôle du middleware express.json() ?"
    answer: "Analyser les corps de requête JSON et les exposer dans req.body"
    decoys:
      - "Convertir automatiquement toutes les réponses en JSON, même celles envoyées avec res.send"
      - "Valider le JSON reçu contre un schéma déclaré dans la route"
    why: "express.json() analyse le corps des requêtes au format JSON. Il ne valide aucun schéma et ne touche pas aux réponses."
  - id: corps-sans-parseur
    prompt: "Une route Express lit req.body sans qu'aucun middleware d'analyse du corps ne soit déclaré. Que contient req.body ?"
    answer: "undefined : le corps n'est pas analysé par défaut"
    decoys:
      - "Le JSON déjà converti en objet, car Express l'analyse toujours"
      - "La chaîne brute du corps de la requête, telle qu'elle a été reçue"
    why: "Express ne lit pas le corps de lui-même : il faut express.json() ou express.urlencoded() pour remplir req.body."
  - id: express-static
    prompt: "À quoi sert express.static() ?"
    answer: "Servir les fichiers statiques d'un dossier (images, CSS, JavaScript)"
    decoys:
      - "Générer un site statique au moment du build, comme le fait Next.js"
      - "Mettre en cache les réponses des routes dynamiques"
    why: "express.static sert les fichiers d'un dossier tels quels. Il ne génère rien au build et ne met pas en cache les routes."
  - id: router
    prompt: "À quoi sert express.Router() ?"
    answer: "Regrouper des routes dans un module, monté ensuite sur un préfixe"
    decoys:
      - "Répartir les requêtes entre plusieurs serveurs, comme un répartiteur de charge"
      - "Remplacer le module HTTP de Node.js"
    why: "Un routeur est une mini-application de routes et de middlewares, montée avec app.use('/api', router). La répartition de charge se fait hors d'Express."
  - id: req-params
    prompt: "Pour la route app.get('/users/:id'), où Express place-t-il la valeur de :id ?"
    answer: "Dans req.params.id"
    decoys:
      - "Dans req.query.id"
      - "Dans req.body.id"
      - "Dans req.headers.id"
    why: "Les segments nommés du chemin vont dans req.params. req.query contient la chaîne de requête (?id=…), req.body le corps."
  - id: req-query
    prompt: "Pour l'URL /articles?page=2, comment lire la valeur de page dans Express ?"
    answer: "req.query.page"
    decoys:
      - "req.params.page"
      - "req.body.page"
      - "req.cookies.page"
    why: "La chaîne de requête est analysée dans req.query. req.params ne contient que les segments nommés du chemin."
  - id: res-json
    prompt: "Que fait res.json(objet) dans une route Express ?"
    answer: "Sérialise l'objet en JSON et l'envoie avec l'en-tête Content-Type adapté"
    decoys:
      - "Écrit l'objet dans un fichier JSON sur le disque du serveur"
      - "Analyse le corps JSON de la requête"
    why: "res.json termine la réponse avec du JSON. L'analyse du corps entrant est le rôle de express.json()."
  - id: requete-pendante
    prompt: "Un middleware Express n'envoie pas de réponse et n'appelle pas next(). Que se passe-t-il ?"
    answer: "La requête reste en attente jusqu'à expiration côté client"
    decoys:
      - "Express passe automatiquement au middleware suivant après le retour de la fonction"
      - "Express renvoie une erreur 500"
    why: "Express n'avance que si next() est appelé : sans réponse ni next(), la requête reste pendante. C'est un piège courant."
  - id: en-tetes-deja-envoyes
    prompt: "Une route Express appelle res.send() deux fois. Que se passe-t-il ?"
    answer: "Une erreur : les en-têtes ont déjà été envoyés"
    decoys:
      - "Les deux contenus sont concaténés dans la même réponse"
      - "Seul le second envoi est transmis, il remplace le premier"
    why: "Une réponse HTTP ne s'envoie qu'une fois : le second appel lève l'erreur « Cannot set headers after they are sent »."
  - id: async-express-5
    prompt: "Qu'apporte Express 5 aux gestionnaires de route async dont la promesse est rejetée ?"
    answer: "Le rejet est transmis automatiquement au gestionnaire d'erreurs"
    decoys:
      - "Rien : il faut toujours entourer chaque gestionnaire d'un try/catch qui appelle next(err)"
      - "Le serveur redémarre automatiquement"
    why: "Express 4 ignorait les promesses rejetées ; Express 5 les transmet au middleware d'erreurs comme un appel à next(err)."
  - id: app-listen
    prompt: "Que fait app.listen(3000) dans une application Express ?"
    answer: "Démarre un serveur HTTP qui écoute sur le port 3000"
    decoys:
      - "Enregistre un middleware qui journalise les 3000 dernières requêtes"
      - "Limite l'application à 3000 requêtes par seconde"
    why: "app.listen crée le serveur HTTP de Node.js et le met à l'écoute. Journalisation et limitation de débit passent par des middlewares."
  - id: cors
    prompt: "Un front sur un autre domaine appelle une API Express et le navigateur bloque la réponse. Quel middleware répandu règle ce cas ?"
    answer: "cors, qui ajoute les en-têtes Access-Control-Allow-*"
    decoys:
      - "helmet, qui désactive la politique de même origine du navigateur"
      - "morgan, qui autorise les domaines qu'il a vus passer dans ses journaux"
    why: "Le blocage vient de la politique CORS du navigateur ; le paquet cors renvoie les en-têtes qui l'autorisent. helmet durcit les en-têtes, morgan journalise."
  - id: helmet
    prompt: "Quel est le rôle du middleware helmet dans une application Express ?"
    answer: "Définir des en-têtes HTTP de sécurité"
    decoys:
      - "Chiffrer la base de données de l'application"
      - "Authentifier les utilisateurs par login et mot de passe, avec des sessions stockées en mémoire"
    why: "helmet positionne des en-têtes comme Content-Security-Policy ou Strict-Transport-Security. L'authentification passe par d'autres paquets (Passport…)."
  - id: morgan
    prompt: "À quoi sert morgan dans l'écosystème Express ?"
    answer: "Journaliser les requêtes HTTP"
    decoys:
      - "Analyser les cookies"
      - "Compresser les réponses en gzip avant de les envoyer au client"
    why: "morgan écrit une ligne de journal par requête. Les cookies se lisent avec cookie-parser, la compression avec compression."
  - id: res-status
    prompt: "Comment renvoyer une réponse 404 avec un message dans Express ?"
    answer: "res.status(404).send('Introuvable')"
    decoys:
      - "res.send(404, 'Introuvable'), la seule forme acceptée par Express 5"
      - "throw 404, qu'Express convertit en réponse"
    why: "res.status fixe le code et se chaîne avec send ou json. Express 5 a justement supprimé la forme res.send(statut, corps)."
  - id: moteur-templates
    prompt: "Comment Express produit-il des pages HTML à partir de gabarits ?"
    answer: "Avec un moteur de templates (Pug, EJS…) configuré, et res.render()"
    decoys:
      - "Avec des composants React rendus côté serveur, intégrés depuis la version 5"
      - "Il ne le peut pas : Express ne sert que du JSON"
    why: "Express délègue le rendu à un moteur de templates choisi par l'équipe. Il n'intègre pas React et sert tout type de contenu."
  - id: montage-prefixe
    prompt: "Que fait app.use('/api', routeur) dans Express ?"
    answer: "Monte le routeur sous le préfixe /api"
    decoys:
      - "Redirige toutes les requêtes vers une autre application nommée api"
      - "Réserve /api aux requêtes authentifiées"
    why: "Une route /users du routeur répond alors sur /api/users. Rien n'est authentifié ou redirigé sans middleware dédié."
---
