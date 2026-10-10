---
name: Keycloak
kind: plateforme
layers: [auth]
tags: [open-source, identite, sso, cncf]
difficulty: 3
summary: "Serveur d'identité open-source, initié par Red Hat et hébergé par la CNCF : SSO, OpenID Connect, SAML et fédération d'annuaires, à opérer soi-même."
---

## Problème résolu

Une organisation qui a plusieurs applications veut un seul point de connexion (SSO), branché sur son annuaire (LDAP, Active Directory) ou sur des fournisseurs externes, sans dépendre d'un service payé à l'utilisateur. Keycloak est un serveur d'identité complet : comptes, rôles, double authentification, connexion sociale, protocoles OpenID Connect, OAuth 2.0 et SAML 2.0.

Il est open-source (licence Apache 2.0) et a rejoint la CNCF comme projet en incubation en 2023. Les applications délèguent la connexion à Keycloak et reçoivent des jetons standard, comme avec un service hébergé.

## Quand l'utiliser

- Entreprise qui doit garder l'identité chez elle (souveraineté, réglementation) ou fédérer plusieurs annuaires.
- Nombreux utilisateurs, où une tarification par utilisateur actif coûterait cher.
- Équipe ops capable de l'exploiter : base de données, haute disponibilité, mises à jour de sécurité.

## Quand l'éviter

- MVP ou petite équipe : c'est un serveur de plus à sécuriser et à maintenir, souvent pour un besoin que le framework couvre déjà.
- Pas de compétences ops : un service hébergé (Auth0, Supabase Auth) est plus sûr qu'un Keycloak mal tenu à jour.
- La configuration (realms, clients, flux) est riche et demande un vrai temps d'apprentissage.

## Pour aller plus loin

- [Documentation officielle](https://www.keycloak.org/documentation)
- [Guides de démarrage](https://www.keycloak.org/guides)
