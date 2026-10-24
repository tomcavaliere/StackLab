---
questions:
  - id: role
    prompt: "Quel problème Auth0 résout-il ?"
    answer: "Il fournit l'authentification comme un service : connexion, inscription, SSO, double authentification"
    decoys:
      - "Il chiffre automatiquement toutes les données stockées dans la base de l'application, colonne par colonne"
      - "Il protège l'API contre les attaques par déni de service"
    why: "Auth0 évite d'écrire et d'opérer son propre système d'identité : stockage des mots de passe, réinitialisation, MFA, SSO. Le chiffrement en base ou la protection contre le déni de service relèvent d'autres outils."
  - id: jetons-standard
    prompt: "Que reçoit l'application après une connexion réussie via Auth0 ?"
    answer: "Des jetons standard (OAuth 2.0, OpenID Connect)"
    decoys:
      - "Le mot de passe de l'utilisateur, chiffré, à vérifier elle-même"
      - "Une copie complète de la table des utilisateurs"
    why: "L'application redirige vers une page de connexion hébergée et reçoit des jetons qu'elle sait vérifier. Elle ne voit jamais le mot de passe : c'est tout l'intérêt."
  - id: sso-b2b
    prompt: "Un SaaS B2B doit laisser ses clients se connecter avec l'annuaire de leur entreprise. Auth0 convient-il ?"
    answer: "Oui : le SSO d'entreprise est l'un de ses cas d'usage principaux"
    decoys:
      - "Non : Auth0 ne gère que les comptes e-mail et mot de passe"
      - "Non : le SSO d'entreprise impose d'auto-héberger le serveur d'identité"
    why: "La fiche cite le SaaS B2B qui doit proposer du SSO d'entreprise comme premier cas d'usage d'Auth0. Auto-héberger (Keycloak) est une option, pas une obligation."
  - id: tarification
    prompt: "Quel est le principal risque de coût d'Auth0 ?"
    answer: "La tarification augmente avec le nombre d'utilisateurs actifs"
    decoys:
      - "Chaque requête de l'API est facturée au volume de données lues"
      - "Une licence est due pour chaque développeur de l'équipe"
    why: "Avec un très grand nombre d'utilisateurs et un budget serré, la facture par utilisateur actif pèse. C'est l'argument principal de Keycloak, auto-hébergé."
  - id: framework-suffit
    prompt: "Une application Django simple, sans SSO, a besoin de comptes utilisateurs. Que conseille la fiche ?"
    answer: "L'authentification du framework suffit souvent ; Auth0 ajouterait un coût et une dépendance"
    decoys:
      - "Auth0 est indispensable : Django ne sait pas hacher les mots de passe"
      - "Keycloak, pour ne dépendre d'aucun service externe et garder les comptes sur ses propres serveurs"
    why: "Django (django.contrib.auth) et Rails fournissent une authentification solide. Un service externe se justifie par un besoin précis : SSO, MFA, plusieurs applications."
  - id: groupe
    prompt: "À quel groupe appartient Auth0 ?"
    answer: "Okta, qui l'a racheté en 2021"
    decoys:
      - "Salesforce, qui l'a racheté en 2010"
      - "Microsoft, qui l'a intégré à Azure"
    why: "Auth0 fait partie d'Okta depuis 2021. Salesforce a racheté Heroku en 2010."
  - id: souverainete
    prompt: "Une administration exige que les données d'identité restent sur ses propres serveurs. Que choisir ?"
    answer: "Une solution auto-hébergée, comme Keycloak"
    decoys:
      - "Auth0, avec un plan payant plus élevé"
      - "Auth0, en stockant ses jetons dans sa propre base"
    why: "Auth0 est un service hébergé : en cas de contrainte de souveraineté, on vérifie les régions proposées ou on choisit une solution auto-hébergée. Stocker les jetons chez soi ne déplace pas les comptes."
  - id: actions
    prompt: "Comment ajouter de la logique au moment de la connexion, par exemple enrichir le profil ?"
    answer: "Avec les règles et actions d'Auth0"
    decoys:
      - "En modifiant directement la base d'utilisateurs d'Auth0 en SQL"
      - "C'est impossible avec un service d'authentification hébergé"
    why: "Auth0 propose des règles et des actions exécutées pendant la connexion. Sa base n'est pas accessible en SQL."
  - id: plusieurs-applications
    prompt: "Une app web, une app mobile et une API partagent les mêmes comptes. En quoi Auth0 aide-t-il ?"
    answer: "Toutes délèguent la connexion au même service et vérifient les mêmes jetons standard"
    decoys:
      - "Il synchronise chaque nuit les bases d'utilisateurs de chaque application, pour qu'elles restent identiques"
      - "Il remplace l'API par un back-end généré à partir des comptes"
    why: "Un fournisseur d'identité central émet des jetons OpenID Connect que chaque application vérifie : un seul compte, une seule connexion, sans synchronisation."
  - id: risque-securite
    prompt: "Quel est l'argument principal pour externaliser l'authentification ?"
    answer: "Ne pas porter seul le risque sécurité : mots de passe, réinitialisation, MFA, failles à suivre"
    decoys:
      - "Accélérer le temps de réponse de chaque page, puisque la vérification des sessions part sur ses serveurs"
      - "Réduire la taille du JavaScript envoyé au navigateur"
    why: "L'identité est un sujet de sécurité à part entière. Auth0 en porte la complexité ; la performance des pages n'a rien à voir."
  - id: oidc-vs-oauth
    prompt: "Qu'ajoute OpenID Connect à OAuth 2.0 dans un service comme Auth0 ?"
    answer: "Une couche d'identité : un ID token qui dit qui est l'utilisateur"
    decoys:
      - "Le chiffrement des échanges, qu'OAuth 2.0 seul laisse passer en clair sur le réseau"
      - "La gestion des rôles et des permissions métier à l'intérieur de l'application"
    why: "OAuth 2.0 délègue un accès (jeton d'accès) ; OpenID Connect ajoute l'authentification avec l'ID token. Le chiffrement relève de HTTPS, et les permissions métier restent dans l'application."
  - id: id-token-access-token
    prompt: "Avec Auth0, à quoi sert l'access token, par opposition à l'ID token ?"
    answer: "À appeler une API, qui le vérifie avant de répondre"
    decoys:
      - "À afficher le nom et l'e-mail de l'utilisateur dans l'interface du front"
      - "À prouver l'identité de l'utilisateur à l'application cliente, qui le lit pour ouvrir la session"
    why: "L'ID token est destiné à l'application cliente (qui est l'utilisateur) ; l'access token est destiné à l'API (ce qu'on a le droit d'appeler). Envoyer l'ID token à une API est un contresens courant."
  - id: universal-login
    prompt: "Comment s'appelle la page de connexion hébergée par Auth0, vers laquelle l'application redirige ?"
    answer: "Universal Login"
    decoys:
      - "Lock Server, un serveur de connexion à installer à côté de l'application"
      - "Auth0 Gateway"
    why: "Universal Login est la page hébergée par Auth0 : l'application ne manipule jamais le mot de passe. Il n'y a pas de serveur à installer."
  - id: pkce
    prompt: "Quel flux OAuth Auth0 recommande-t-il pour une application monopage ou mobile ?"
    answer: "Authorization Code avec PKCE"
    decoys:
      - "Le flux implicite, qui renvoie le jeton directement dans l'URL"
      - "Client Credentials, avec le secret du client embarqué dans l'application"
    why: "Une SPA ou une app mobile ne peut pas garder de secret : PKCE protège l'échange du code. Le flux implicite est déconseillé, et Client Credentials sert aux échanges machine à machine."
  - id: machine-a-machine
    prompt: "Un service back-end doit appeler une API protégée par Auth0, sans utilisateur. Quel flux utiliser ?"
    answer: "Client Credentials"
    decoys:
      - "Authorization Code avec PKCE, en simulant une connexion utilisateur"
      - "Le flux implicite, en lisant le jeton dans l'URL de redirection"
    why: "Client Credentials est le flux machine à machine : le service s'authentifie avec son identifiant et son secret. Les autres flux supposent un utilisateur et un navigateur."
  - id: verification-jwt
    prompt: "Comment une API vérifie-t-elle un access token JWT émis par Auth0 ?"
    answer: "Elle vérifie sa signature avec les clés publiques du tenant (JWKS), puis l'émetteur, l'audience et l'expiration"
    decoys:
      - "Elle appelle Auth0 à chaque requête pour lui demander si le jeton est valide"
      - "Elle compare le jeton à une copie stockée dans sa propre base"
    why: "Un JWT signé se vérifie localement grâce aux clés publiques exposées par le tenant. Pas besoin d'appel réseau ni de stockage, mais il faut contrôler émetteur, audience et expiration."
  - id: audience
    prompt: "À quoi sert le paramètre audience lors d'une demande de jeton à Auth0 ?"
    answer: "À désigner l'API à laquelle l'access token est destiné"
    decoys:
      - "À choisir la langue de la page de connexion"
      - "À indiquer le nombre maximal d'utilisateurs connectés en même temps sur l'application"
    why: "L'audience identifie l'API cible : l'access token porte cette valeur, et l'API rejette un jeton qui ne lui est pas destiné."
  - id: tenant
    prompt: "Qu'est-ce qu'un tenant dans Auth0 ?"
    answer: "Une instance isolée, avec ses propres applications, utilisateurs et réglages"
    decoys:
      - "Un utilisateur final qui s'est connecté au moins une fois à l'une des applications"
      - "Une région de serveurs choisie au moment de chaque connexion"
    why: "Le tenant est l'espace isolé d'un client Auth0, avec son propre domaine. On en crée souvent un par environnement (développement, production)."
  - id: connections
    prompt: "Que désigne une « connection » dans Auth0 ?"
    answer: "Une source d'identité : base de comptes, fournisseur social ou annuaire d'entreprise"
    decoys:
      - "Une connexion réseau persistante entre l'application et les serveurs d'Auth0, ouverte au démarrage"
      - "Une session utilisateur active"
    why: "Les connections sont les sources d'identité qu'une application propose : comptes e-mail et mot de passe, Google, SAML, Active Directory…"
  - id: rules-vers-actions
    prompt: "Qu'a fait Auth0 de ses anciennes Rules et Hooks ?"
    answer: "Il les a dépréciées au profit des Actions"
    decoys:
      - "Il les a remplacées par des politiques écrites en SQL, exécutées dans sa base d'utilisateurs"
      - "Il les a rendues obligatoires pour chaque application"
    why: "Les Actions sont le mécanisme d'extension actuel, et les Rules et Hooks sont dépréciées. Aucune extension ne s'écrit en SQL."
  - id: langage-actions
    prompt: "Dans quel langage écrit-on une Action Auth0 ?"
    answer: "JavaScript, exécuté sur Node.js"
    decoys:
      - "Python, dans un environnement serverless"
      - "Lua, comme les scripts de Redis"
    why: "Les Actions sont des fonctions JavaScript exécutées par Auth0 dans un environnement Node.js, à des points précis comme la connexion."
  - id: claims-personnalises
    prompt: "Comment ajouter les rôles d'un utilisateur dans le jeton émis par Auth0 ?"
    answer: "Avec une Action qui ajoute un claim personnalisé, au nom préfixé (namespace)"
    decoys:
      - "En éditant le jeton côté front, juste avant de l'envoyer à l'API, pour y glisser les rôles"
      - "C'est impossible : le contenu des jetons Auth0 est figé"
    why: "Une Action de connexion peut ajouter des claims personnalisés. Modifier le jeton côté front casserait sa signature."
  - id: refresh-token
    prompt: "À quoi sert un refresh token obtenu auprès d'Auth0 ?"
    answer: "À obtenir un nouvel access token sans redemander la connexion"
    decoys:
      - "À recharger la page de l'application quand le jeton expire"
      - "À réinitialiser le mot de passe de l'utilisateur qui l'a oublié"
    why: "Les access tokens durent peu ; le refresh token permet d'en obtenir un nouveau. Auth0 propose sa rotation pour limiter l'impact d'un vol."
  - id: management-api
    prompt: "Comment créer ou modifier des utilisateurs Auth0 depuis son propre back-end ?"
    answer: "Avec la Management API d'Auth0"
    decoys:
      - "En se connectant en SQL à la base d'utilisateurs du tenant"
      - "En important chaque nuit un fichier CSV dans le tableau de bord, via la page d'administration"
    why: "La Management API expose les utilisateurs, rôles et réglages du tenant. La base d'Auth0 n'est pas accessible directement."
  - id: passwordless
    prompt: "Que propose la connexion « passwordless » d'Auth0 ?"
    answer: "Se connecter avec un code ou un lien envoyé par e-mail ou SMS"
    decoys:
      - "Se connecter sans aucune vérification, pour les comptes de test"
      - "Stocker le mot de passe dans le navigateur pour ne plus jamais avoir à le saisir"
    why: "Le passwordless remplace le mot de passe par un code à usage unique ou un lien magique. L'identité est toujours vérifiée."
  - id: protection-attaques
    prompt: "Quelle protection Auth0 offre-t-il contre les attaques sur les comptes ?"
    answer: "Détection de force brute et de mots de passe ayant fuité"
    decoys:
      - "Un pare-feu applicatif placé devant toutes les API de l'application"
      - "Un antivirus pour les fichiers envoyés par les utilisateurs"
    why: "Auth0 inclut des protections propres à l'identité (force brute, mots de passe compromis). Protéger les API ou scanner des fichiers relève d'autres outils."
  - id: deconnexion
    prompt: "Une application supprime ses jetons locaux à la déconnexion, mais l'utilisateur est reconnecté aussitôt. Pourquoi ?"
    answer: "La session Auth0 est toujours active : il faut aussi appeler la déconnexion d'Auth0"
    decoys:
      - "Les jetons sont mis en cache par le navigateur pendant 24 heures"
      - "Auth0 interdit toute déconnexion avant l'expiration du refresh token"
    why: "Auth0 garde sa propre session : sans redirection vers son point de déconnexion, Universal Login reconnecte l'utilisateur sans rien demander."
  - id: stockage-jetons-spa
    prompt: "Où le SDK SPA d'Auth0 garde-t-il les jetons par défaut ?"
    answer: "En mémoire"
    decoys:
      - "Dans le localStorage"
      - "Dans un cookie lisible par JavaScript"
    why: "Par défaut, auth0-spa-js garde les jetons en mémoire, à l'abri d'un script injecté qui lirait le localStorage ; le stockage persistant est une option à choisir en connaissance de cause."
  - id: organizations
    prompt: "Quelle fonctionnalité d'Auth0 sert à modéliser les entreprises clientes d'un SaaS B2B ?"
    answer: "Organizations"
    decoys:
      - "Tenants, un par client, créés à chaque inscription"
      - "Les rôles d'administration du tableau de bord Auth0"
    why: "Organizations regroupe les membres, connexions SSO et l'image de marque de chaque client B2B dans un même tenant. Créer un tenant par client ne passe pas à l'échelle."
  - id: mfa
    prompt: "Quels facteurs Auth0 propose-t-il pour la double authentification ?"
    answer: "Codes d'une app d'authentification, push, SMS ou clés WebAuthn"
    decoys:
      - "Uniquement une question secrète choisie à l'inscription"
      - "Uniquement l'adresse IP de l'utilisateur, comparée à celle de sa dernière connexion réussie"
    why: "Auth0 prend en charge plusieurs facteurs, dont les codes OTP, les notifications push et WebAuthn. Une question secrète ou une IP ne sont pas des facteurs solides."
---
