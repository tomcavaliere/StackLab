---
questions:
  - id: base
    prompt: "Sur quelle base de données Supabase est-il bâti ?"
    answer: "PostgreSQL"
    decoys:
      - "MongoDB"
      - "MySQL"
    why: "Chaque projet Supabase est une base PostgreSQL standard."
  - id: api-generee
    prompt: "Comment Supabase fournit-il une API REST ?"
    answer: "Il la génère à partir du schéma de la base, avec PostgREST"
    decoys:
      - "À partir de fichiers OpenAPI écrits à la main par l'équipe"
      - "Il n'en fournit pas : il faut écrire un back-end"
    why: "Créer une table suffit pour pouvoir l'interroger par API."
  - id: rls
    prompt: "Comment écrit-on les autorisations dans Supabase ?"
    answer: "En SQL, avec la Row Level Security de PostgreSQL"
    decoys:
      - "Dans un fichier YAML de rôles, à la racine du projet"
      - "Uniquement dans le code du front"
    why: "La sécurité au niveau des lignes garantit que chaque utilisateur ne voit que ses lignes, même quand le front interroge la base directement."
  - id: rls-risque
    prompt: "Quel est le risque de politiques RLS mal écrites ?"
    answer: "Comme le front interroge la base, une erreur expose directement des données"
    decoys:
      - "La base devient plus lente"
      - "Aucun : Supabase détecte et corrige les politiques mal écrites automatiquement"
    why: "Il n'y a pas de back-end entre le front et la base : les politiques RLS sont la seule barrière."
  - id: briques
    prompt: "Que fournit Supabase en plus de la base ?"
    answer: "L'authentification, le stockage de fichiers, le temps réel et des fonctions serverless"
    decoys:
      - "Un cluster Kubernetes, un registre d'images et un orchestrateur de pipelines"
      - "Un entrepôt colonnaire et un orchestrateur"
    why: "Supabase rassemble les briques d'un back-end de MVP autour de PostgreSQL."
  - id: sortie
    prompt: "Peut-on quitter Supabase facilement ?"
    answer: "Oui : chaque projet est une base PostgreSQL standard, qu'on peut migrer ailleurs"
    decoys:
      - "Non : les données sont stockées dans un format propriétaire, impossible à relire ailleurs"
      - "Non : aucun export n'est prévu"
    why: "On peut se connecter directement à la base et la migrer."
  - id: auto-hebergement
    prompt: "Supabase peut-il être auto-hébergé ?"
    answer: "Oui : le projet est open-source"
    decoys:
      - "Non : c'est un service fermé"
      - "Oui, mais uniquement sur Vercel"
    why: "L'offre hébergée est la plus simple, mais le projet peut tourner sur ses propres serveurs."
  - id: logique-complexe
    prompt: "Une logique métier complexe côté serveur : Supabase seul suffit-il ?"
    answer: "Mal : elle se disperse entre RLS, fonctions SQL et serverless ; un back-end dédié est plus clair"
    decoys:
      - "Très bien : les politiques RLS gèrent toute la logique métier, et restent faciles à tester"
      - "Très bien : Supabase génère le back-end métier"
    why: "La fiche le range dans « Quand l'éviter » : cette logique devient difficile à tester."
  - id: cible
    prompt: "Pour qui Supabase est-il idéal ?"
    answer: "Une petite équipe orientée front qui veut livrer un MVP sans écrire ni opérer de serveur"
    decoys:
      - "Une grande plateforme data analytique"
      - "Une équipe d'exploitation qui veut régler finement chaque paramètre de la base"
    why: "Le front parle directement au back-end hébergé. Les réglages fins de la base dépendent de ce que permet l'offre hébergée."
  - id: seulement-l-auth
    prompt: "Seule l'authentification doit être externalisée, avec du SSO d'entreprise avancé. Que choisir ?"
    answer: "Auth0"
    decoys:
      - "Supabase Storage"
      - "PostgREST"
    why: "Auth0 est spécialisé dans l'identité et le SSO d'entreprise."
  - id: firebase
    prompt: "À quel produit Supabase se présente-t-il comme une alternative open-source ?"
    answer: "Firebase"
    decoys:
      - "Heroku"
      - "Auth0"
    why: "Supabase se décrit comme une alternative open-source à Firebase, avec une base PostgreSQL relationnelle à la place d'une base NoSQL."
  - id: cle-service-role
    prompt: "Pourquoi ne jamais mettre la clé service_role de Supabase dans le code du front ?"
    answer: "Elle contourne la Row Level Security et donne accès à toutes les données"
    decoys:
      - "Elle expire au bout d'une heure et casserait l'application"
      - "Elle ralentit chaque requête du navigateur, car elle déclenche une vérification supplémentaire côté serveur"
    why: "La clé service_role est réservée au serveur : elle ignore les politiques RLS. Le front utilise la clé publique (anon), soumise aux politiques."
  - id: cle-anon
    prompt: "La clé anon de Supabase est visible dans le code du front. Est-ce un problème ?"
    answer: "Non, si la RLS est activée et bien écrite : c'est elle qui protège les données"
    decoys:
      - "Oui : quiconque la lit obtient un accès administrateur à la base"
      - "Non : Supabase chiffre la clé dans le navigateur, elle est donc illisible pour un attaquant"
    why: "La clé anon est publique par conception ; elle ne donne que les droits accordés par les politiques RLS."
  - id: rls-desactivee
    prompt: "Une table du schéma public est créée en SQL, sans activer la RLS. Que risque-t-on avec Supabase ?"
    answer: "Elle est lisible et modifiable via l'API par quiconque a la clé anon"
    decoys:
      - "Rien : la table reste invisible pour l'API tant qu'aucune politique n'est écrite"
      - "La table est supprimée au prochain déploiement"
    why: "Le schéma public est exposé par l'API générée : sans RLS, aucune politique ne filtre les accès. Une fois la RLS activée, sans politique, tout est refusé."
  - id: auth-uid
    prompt: "Quelle fonction utilise-t-on dans une politique RLS Supabase pour désigner l'utilisateur connecté ?"
    answer: "auth.uid()"
    decoys:
      - "current_session_user()"
      - "request.user()"
    why: "auth.uid() renvoie l'identifiant de l'utilisateur tiré du jeton, par exemple dans « user_id = auth.uid() »."
  - id: using-with-check
    prompt: "Dans une politique RLS, quelle est la différence entre USING et WITH CHECK ?"
    answer: "USING filtre les lignes existantes accessibles ; WITH CHECK valide les lignes insérées ou modifiées"
    decoys:
      - "USING s'applique aux administrateurs ; WITH CHECK aux utilisateurs anonymes qui n'ont pas de compte"
      - "USING sert aux tables, WITH CHECK aux vues"
    why: "Sans WITH CHECK adapté, un utilisateur pourrait par exemple insérer une ligne au nom d'un autre, même si USING l'empêche de la lire."
  - id: auth-users
    prompt: "Où Supabase Auth stocke-t-il les comptes utilisateurs ?"
    answer: "Dans la table auth.users de la base PostgreSQL du projet"
    decoys:
      - "Dans un service séparé et fermé, sans aucun accès possible depuis la base"
      - "Dans le localStorage du navigateur de chaque utilisateur"
    why: "Les comptes vivent dans le schéma auth de la même base : on peut les relier à ses tables par clé étrangère et s'y référer dans les politiques."
  - id: supabase-js
    prompt: "Avec supabase-js, comment lire les lignes d'une table « todos » ?"
    answer: "supabase.from('todos').select()"
    decoys:
      - "supabase.query('SELECT * FROM todos')"
      - "supabase.table('todos').findAll()"
    why: "Le client JavaScript construit la requête PostgREST avec from() puis select(), filtres et tri en chaîne."
  - id: rpc
    prompt: "Comment appeler une fonction PostgreSQL depuis le client Supabase ?"
    answer: "Avec rpc(), qui l'expose via l'API générée"
    decoys:
      - "Avec exec(), qui envoie du SQL brut depuis le navigateur"
      - "C'est impossible : seules les tables et les vues sont exposées par l'API"
    why: "PostgREST expose les fonctions de la base ; supabase.rpc('nom', args) les appelle. Le client n'envoie pas de SQL brut."
  - id: edge-functions
    prompt: "Sur quel runtime tournent les Edge Functions de Supabase ?"
    answer: "Deno, avec du TypeScript"
    decoys:
      - "La JVM, avec du Java"
      - "Python, dans des conteneurs Lambda"
    why: "Les Edge Functions sont des fonctions TypeScript exécutées par Deno, utiles pour un webhook ou un appel à une API tierce avec un secret."
  - id: realtime
    prompt: "Comment Supabase Realtime détecte-t-il les changements dans une table ?"
    answer: "En lisant la réplication logique de PostgreSQL"
    decoys:
      - "En interrogeant chaque table toutes les secondes depuis le navigateur"
      - "Grâce à un trigger que le développeur écrit dans chaque application cliente"
    why: "Realtime s'appuie sur la réplication logique de PostgreSQL et pousse les changements aux clients abonnés par WebSocket."
  - id: realtime-broadcast
    prompt: "Outre les changements de la base, que permet Supabase Realtime ?"
    answer: "Broadcast (messages entre clients) et Presence (qui est en ligne)"
    decoys:
      - "L'envoi d'e-mails transactionnels et de SMS"
      - "L'exécution de requêtes analytiques sur de gros volumes, en continu sur un entrepôt colonnaire"
    why: "Realtime propose aussi des canaux de diffusion et le suivi de présence, par exemple pour un curseur partagé ou une liste de connectés."
  - id: storage-politiques
    prompt: "Comment contrôle-t-on l'accès aux fichiers dans Supabase Storage ?"
    answer: "Avec des politiques RLS, comme pour les tables"
    decoys:
      - "Avec des listes d'adresses IP autorisées, saisies dans le tableau de bord"
      - "Tous les fichiers sont publics, sans contrôle possible"
    why: "Les métadonnées des fichiers sont dans le schéma storage de la base : les mêmes politiques RLS décident qui lit ou écrit."
  - id: cli-local
    prompt: "Comment faire tourner Supabase en local pour développer ?"
    answer: "Avec la CLI : supabase start, qui lance la pile dans Docker"
    decoys:
      - "Ce n'est pas possible : il faut toujours un projet hébergé"
      - "En installant un binaire unique qui remplace PostgreSQL, sans Docker ni dépendance"
    why: "La CLI démarre une pile locale complète (base, auth, API, studio) dans des conteneurs Docker."
  - id: migrations
    prompt: "Comment versionner les changements de schéma d'un projet Supabase ?"
    answer: "Avec des fichiers de migration SQL gérés par la CLI"
    decoys:
      - "En exportant chaque soir une capture d'écran du tableau de bord"
      - "C'est inutile : Supabase versionne seul chaque clic fait dans le tableau de bord"
    why: "La CLI crée et applique des migrations SQL, versionnées dans Git, pour reproduire le schéma d'un environnement à l'autre."
  - id: types-generes
    prompt: "Comment obtenir des types TypeScript qui reflètent le schéma de la base Supabase ?"
    answer: "Avec supabase gen types typescript"
    decoys:
      - "En les écrivant à la main à partir de la documentation"
      - "Avec tsc --init, qui lit la base"
    why: "La CLI génère les types depuis le schéma ; le client supabase-js les utilise pour typer les requêtes."
  - id: pgvector
    prompt: "Quelle extension PostgreSQL Supabase met-il en avant pour stocker et chercher des embeddings ?"
    answer: "pgvector"
    decoys:
      - "PostGIS"
      - "pg_cron"
    why: "pgvector ajoute un type vecteur et la recherche par similarité. PostGIS sert aux données géographiques, pg_cron aux tâches planifiées."
  - id: graphql
    prompt: "Supabase propose-t-il une API GraphQL ?"
    answer: "Oui, via l'extension pg_graphql"
    decoys:
      - "Non : seule l'API REST existe"
      - "Oui, mais uniquement avec un serveur Apollo à héberger soi-même"
    why: "En plus de PostgREST, Supabase expose une API GraphQL générée par l'extension pg_graphql, dans la base elle-même."
  - id: connexion-directe
    prompt: "Un back-end Django veut utiliser la base d'un projet Supabase. Est-ce possible ?"
    answer: "Oui : on s'y connecte comme à n'importe quel PostgreSQL"
    decoys:
      - "Non : la base n'est accessible que par l'API REST générée"
      - "Oui, mais uniquement avec un ORM fourni par Supabase pour Python"
    why: "Chaque projet est une base PostgreSQL standard, avec une chaîne de connexion classique ; l'API générée n'est qu'un accès parmi d'autres."
  - id: triggers-metier
    prompt: "Supabase n'a pas de back-end applicatif. Où mettre une règle comme « remplir created_by à chaque insertion » ?"
    answer: "Dans un trigger PostgreSQL ou une valeur par défaut de colonne"
    decoys:
      - "Dans le code du front, en faisant confiance au client pour envoyer la bonne valeur"
      - "Dans le fichier de configuration du tableau de bord"
    why: "La base fait respecter la règle quelle que soit la façon dont la ligne arrive. Le front ne doit pas être la seule garantie."
---
