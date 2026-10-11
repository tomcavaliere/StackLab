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
---
