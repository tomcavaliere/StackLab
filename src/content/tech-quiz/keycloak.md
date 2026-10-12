---
questions:
  - id: role
    prompt: "Qu'est-ce que Keycloak ?"
    answer: "Un serveur d'identité open-source, à opérer soi-même"
    decoys:
      - "Un service d'authentification hébergé, facturé par utilisateur"
      - "Une bibliothèque de chiffrement pour Java"
    why: "Keycloak fournit comptes, rôles, SSO et MFA, mais c'est un serveur à faire tourner et à maintenir. Le service hébergé facturé par utilisateur, c'est Auth0."
  - id: protocoles
    prompt: "Quels protocoles Keycloak prend-il en charge ?"
    answer: "OpenID Connect, OAuth 2.0 et SAML 2.0"
    decoys:
      - "Uniquement LDAP et Kerberos, pour les annuaires d'entreprise"
      - "AMQP et MQTT, les protocoles de messagerie"
    why: "Ce sont les protocoles standard du SSO. AMQP et MQTT sont des protocoles de messagerie."
  - id: federation
    prompt: "Avec quoi Keycloak peut-il se fédérer ?"
    answer: "Un annuaire LDAP ou Active Directory, et des fournisseurs d'identité externes"
    decoys:
      - "Uniquement des comptes Google"
      - "Uniquement une base MongoDB d'utilisateurs, synchronisée chaque nuit avec l'annuaire"
    why: "Un seul point de connexion branché sur l'annuaire de l'entreprise ou des fournisseurs externes : c'est un de ses usages principaux."
  - id: licence
    prompt: "Sous quelle licence Keycloak est-il distribué ?"
    answer: "Apache 2.0"
    decoys:
      - "SSPL"
      - "Une licence propriétaire Red Hat"
    why: "Keycloak, initié par Red Hat, est open-source sous licence Apache 2.0."
  - id: cncf
    prompt: "Quel statut Keycloak a-t-il obtenu en 2023 ?"
    answer: "Projet en incubation à la CNCF"
    decoys:
      - "Racheté par Okta"
      - "Intégré au cœur de Kubernetes"
    why: "Keycloak a rejoint la CNCF en 2023. Okta a racheté Auth0."
  - id: souverainete
    prompt: "Une entreprise doit garder l'identité chez elle pour des raisons réglementaires. Keycloak convient-il ?"
    answer: "Oui : c'est l'un de ses cas d'usage principaux"
    decoys:
      - "Non : Keycloak est un service hébergé aux États-Unis"
      - "Non : Keycloak ne gère pas le SSO"
    why: "Auto-hébergé, Keycloak garde les données d'identité sur les serveurs de l'entreprise."
  - id: cout
    prompt: "Pourquoi Keycloak devient-il intéressant avec un très grand nombre d'utilisateurs ?"
    answer: "Il n'y a pas de facture par utilisateur actif, contrairement à un service hébergé"
    decoys:
      - "Il est plus rapide qu'Auth0 à chaque connexion, car il tourne sur le même serveur que l'application"
      - "Il ne nécessite aucune base de données"
    why: "Le coût d'un service hébergé suit le nombre d'utilisateurs ; Keycloak coûte son exploitation."
  - id: exploitation
    prompt: "Que demande l'exploitation correcte de Keycloak ?"
    answer: "Une base de données, de la haute disponibilité et des mises à jour de sécurité suivies"
    decoys:
      - "Rien de particulier : il se met à jour seul et se réplique automatiquement entre serveurs"
      - "Un abonnement à Auth0"
    why: "C'est un composant critique : s'il tombe ou n'est pas à jour, toutes les applications sont touchées."
  - id: mvp
    prompt: "Un MVP d'une petite équipe sans compétences ops : Keycloak est-il un bon choix ?"
    answer: "Plutôt non : c'est un serveur de plus à sécuriser, pour un besoin que le framework couvre souvent"
    decoys:
      - "Oui : c'est le service d'identité le plus simple à configurer, avec très peu de concepts à apprendre"
      - "Oui : il remplace la base de données de l'application"
    why: "Sans compétences ops, un service hébergé (Auth0, Supabase Auth) est plus sûr qu'un Keycloak mal tenu à jour."
  - id: configuration
    prompt: "Quels concepts de configuration de Keycloak demandent un vrai temps d'apprentissage ?"
    answer: "Les realms, les clients et les flux"
    decoys:
      - "Les dynos, les buildpacks et les add-ons"
      - "Les DAG et les opérateurs"
    why: "La configuration de Keycloak est riche. Dynos et buildpacks sont des concepts d'Heroku, DAG et opérateurs d'Airflow."
  - id: realm
    prompt: "Qu'est-ce qu'un realm dans Keycloak ?"
    answer: "Un espace isolé qui regroupe ses utilisateurs, ses applications et ses rôles"
    decoys:
      - "Une instance de base de données dédiée à un seul utilisateur"
      - "Un nœud du cluster Keycloak, placé dans une région géographique donnée"
    why: "Chaque realm est cloisonné : ses comptes, clients et réglages ne se mélangent pas à ceux d'un autre realm du même serveur."
  - id: realm-master
    prompt: "Pourquoi éviter de mettre les utilisateurs de ses applications dans le realm master de Keycloak ?"
    answer: "Il sert à administrer le serveur ; les applications vont dans des realms dédiés"
    decoys:
      - "Il est limité à un seul utilisateur et ne peut pas en accueillir d'autres"
      - "Il est supprimé à chaque redémarrage du serveur, avec tous ses comptes"
    why: "Le realm master contient les comptes d'administration de Keycloak. Séparer les applications dans leurs realms limite l'impact d'une erreur de configuration."
  - id: client
    prompt: "Que représente un « client » dans Keycloak ?"
    answer: "Une application ou un service qui délègue l'authentification à Keycloak"
    decoys:
      - "Un utilisateur final qui possède un compte dans le realm"
      - "Une entreprise qui paie un abonnement de support"
    why: "Un client est une application enregistrée (web, mobile, API) qui demande des jetons à Keycloak. Les utilisateurs sont une autre notion."
  - id: client-public-confidentiel
    prompt: "Quelle est la différence entre un client public et un client confidentiel dans Keycloak ?"
    answer: "Le confidentiel peut garder un secret côté serveur ; le public, comme une SPA, ne le peut pas"
    decoys:
      - "Le public est visible par tous les utilisateurs du realm ; le confidentiel est caché aux non-administrateurs"
      - "Le public est gratuit ; le confidentiel demande une licence Red Hat"
    why: "Une application qui tourne dans le navigateur ou sur un téléphone ne peut pas cacher de secret : c'est un client public, qui utilise PKCE."
  - id: roles-realm-client
    prompt: "Quelle différence Keycloak fait-il entre rôles de realm et rôles de client ?"
    answer: "Les premiers valent pour tout le realm, les seconds sont propres à une application"
    decoys:
      - "Les premiers sont réservés aux administrateurs, les seconds aux utilisateurs finaux du realm"
      - "Aucune : ce sont deux noms pour le même objet"
    why: "Un rôle de realm (par exemple « employé ») est global ; un rôle de client (par exemple « éditeur » d'une app) n'a de sens que pour cette application."
  - id: identity-brokering
    prompt: "Comment Keycloak permet-il de se connecter avec un compte Google ou un autre fournisseur OIDC ou SAML ?"
    answer: "Par l'identity brokering : il délègue la connexion à ce fournisseur"
    decoys:
      - "En important chaque nuit les comptes du fournisseur dans sa base, avec leurs mots de passe"
      - "Il ne le permet pas : seule la connexion par mot de passe est prise en charge"
    why: "Keycloak sert d'intermédiaire : il redirige vers le fournisseur externe puis émet ses propres jetons. Les mots de passe externes ne sont jamais copiés."
  - id: langage
    prompt: "Dans quel langage Keycloak est-il écrit ?"
    answer: "Java"
    decoys:
      - "Go"
      - "TypeScript"
    why: "Keycloak est une application Java, extensible par des modules Java (SPI)."
  - id: quarkus
    prompt: "Sur quel framework Keycloak repose-t-il dans ses versions récentes ?"
    answer: "Quarkus, qui a remplacé WildFly"
    decoys:
      - "Spring Boot, qui a remplacé Tomcat"
      - "Micronaut, qui a remplacé Jetty"
    why: "Depuis la version 17 (2022), la distribution par défaut de Keycloak repose sur Quarkus ; elle tournait auparavant sur le serveur d'applications WildFly."
  - id: start-dev
    prompt: "Quelle est la différence entre « kc.sh start-dev » et « kc.sh start » ?"
    answer: "start-dev lance un mode de développement permissif ; start exige une configuration de production"
    decoys:
      - "start-dev démarre un cluster complet de plusieurs nœuds ; start ne lance qu'un seul nœud isolé"
      - "Aucune : start-dev est un ancien alias de start"
    why: "Le mode développement accepte HTTP et une base embarquée. Le mode production refuse de démarrer sans une configuration sûre (HTTPS, nom d'hôte)."
  - id: base-production
    prompt: "Quelle base de données utiliser pour Keycloak en production ?"
    answer: "Une base externe comme PostgreSQL ; la base embarquée sert au développement"
    decoys:
      - "Aucune : Keycloak garde tout en mémoire et n'a pas besoin de persistance entre deux redémarrages"
      - "La base H2 embarquée suffit, à condition de la sauvegarder"
    why: "En mode développement, Keycloak utilise une base H2 embarquée, inadaptée à la production. Il faut une base externe, comme PostgreSQL, MySQL ou MariaDB."
  - id: themes
    prompt: "Comment personnaliser l'apparence des pages de connexion de Keycloak ?"
    answer: "Avec des thèmes, à base de templates FreeMarker, de CSS et de traductions"
    decoys:
      - "En réécrivant les pages de connexion dans le code de chaque application cliente du realm"
      - "C'est impossible : les pages de connexion sont figées"
    why: "Keycloak sert lui-même ses pages de connexion ; les thèmes permettent de les adapter à la charte de l'entreprise."
  - id: spi
    prompt: "Comment ajouter à Keycloak un mode d'authentification qu'il ne propose pas ?"
    answer: "En écrivant un fournisseur Java branché sur ses SPI"
    decoys:
      - "En installant un plugin npm dans le répertoire de configuration"
      - "En modifiant les jetons dans chaque application après la connexion, avant de les vérifier"
    why: "Keycloak s'étend par ses interfaces de fournisseurs (SPI) : authentificateurs, stockage d'utilisateurs, événements…"
  - id: flux-authentification
    prompt: "Que configure-t-on dans les flux d'authentification (authentication flows) de Keycloak ?"
    answer: "L'enchaînement des étapes de connexion : mot de passe, OTP, conditions"
    decoys:
      - "Le débit réseau maximal alloué à chaque utilisateur pendant la connexion"
      - "L'ordre de démarrage des nœuds du cluster"
    why: "Les flux décrivent les étapes et leurs conditions, par exemple exiger un OTP seulement pour certains rôles."
  - id: required-actions
    prompt: "À quoi servent les « required actions » de Keycloak ?"
    answer: "À imposer une étape au prochain login : nouveau mot de passe, vérification d'e-mail, OTP"
    decoys:
      - "À lister les mises à jour de sécurité que l'administrateur doit appliquer au serveur au plus vite"
      - "À bloquer définitivement un compte après plusieurs échecs"
    why: "Une required action s'exécute à la prochaine connexion de l'utilisateur, par exemple pour forcer un nouveau mot de passe après une réinitialisation."
  - id: protocol-mappers
    prompt: "Comment ajouter un attribut de l'utilisateur, comme son service, dans les jetons émis par Keycloak ?"
    answer: "Avec un protocol mapper sur le client ou un client scope"
    decoys:
      - "En modifiant le jeton côté application, juste avant de vérifier sa signature"
      - "En créant un nouveau realm par attribut"
    why: "Les protocol mappers définissent quels claims figurent dans les jetons. Modifier un jeton signé le rendrait invalide."
  - id: service-account
    prompt: "Un service back-end doit obtenir un jeton Keycloak sans utilisateur. Que configurer ?"
    answer: "Un client confidentiel avec un compte de service (flux client credentials)"
    decoys:
      - "Un utilisateur fictif dont le mot de passe est écrit en dur dans le code source du service"
      - "Un client public avec PKCE"
    why: "Le compte de service d'un client confidentiel permet le flux client credentials, sans faux utilisateur ni mot de passe en dur."
  - id: adaptateurs
    prompt: "Qu'est-il advenu des adaptateurs clients propres à Keycloak (pour Java, Node.js…) ?"
    answer: "Ils sont dépréciés : on utilise des bibliothèques OpenID Connect standard"
    decoys:
      - "Ils sont devenus obligatoires pour toute application qui se connecte au serveur Keycloak"
      - "Ils ont été fusionnés dans le noyau de Kubernetes"
    why: "Keycloak parlant des protocoles standard, ses adaptateurs maison ont été dépréciés au profit des bibliothèques OIDC des frameworks."
  - id: cluster-infinispan
    prompt: "Sur quoi Keycloak s'appuie-t-il pour partager les sessions entre les nœuds d'un cluster ?"
    answer: "Des caches distribués Infinispan"
    decoys:
      - "Un fichier partagé sur un disque NFS"
      - "Des cookies qui contiennent toute la session côté navigateur, sans état côté serveur"
    why: "Keycloak garde sessions et caches dans Infinispan, répliqué entre les nœuds pour la haute disponibilité."
  - id: operator
    prompt: "Comment déployer et gérer Keycloak sur Kubernetes de façon outillée ?"
    answer: "Avec l'opérateur Keycloak"
    decoys:
      - "Avec le chart Helm officiel d'Auth0"
      - "Ce n'est pas possible : Keycloak ne tourne que sur des machines virtuelles"
    why: "Keycloak fournit un opérateur Kubernetes qui gère le déploiement et l'import de realms. Auth0 est un service hébergé, sans chart Helm."
  - id: support-commercial
    prompt: "Comment obtenir un support commercial pour Keycloak ?"
    answer: "Via la distribution Red Hat build of Keycloak, ex-Red Hat SSO"
    decoys:
      - "Via Okta, qui maintient Keycloak depuis le rachat d'Auth0 en 2021"
      - "Ce n'est pas possible : aucun éditeur ne propose de support"
    why: "Red Hat vend une version supportée de Keycloak, autrefois appelée Red Hat Single Sign-On. Okta possède Auth0, pas Keycloak."
---
