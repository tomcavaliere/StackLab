---
name: Auth0
kind: service-cloud
layers: [auth]
tags: [identite, sso, offre-managee]
difficulty: 1
summary: "Service d'authentification hébergé (groupe Okta) : connexion, inscription, SSO et double authentification sans écrire ni opérer son propre système d'identité."
alternatives:
  - tech: keycloak
    note: "Open-source et auto-hébergé : pas de facture par utilisateur, mais un serveur de plus à opérer."
---

## Problème résolu

Gérer soi-même l'identité, c'est stocker les mots de passe correctement, gérer la réinitialisation, la double authentification (MFA), la connexion via Google ou un annuaire d'entreprise (SSO), et suivre les failles de sécurité. Auth0, racheté par Okta en 2021, fournit tout cela comme un service : l'application redirige vers une page de connexion hébergée et reçoit en retour des jetons standard (OAuth 2.0, OpenID Connect).

Des SDK existent pour la plupart des frameworks front et back. Des règles et des actions permettent d'ajouter de la logique au moment de la connexion.

## Quand l'utiliser

- SaaS B2B qui doit proposer du SSO d'entreprise à ses clients.
- Équipe qui ne veut pas porter le risque sécurité de l'authentification.
- Plusieurs applications (web, mobile, API) qui partagent les mêmes comptes.

## Quand l'éviter

- Application simple dont le framework fournit déjà une authentification solide (Django, Rails) : un service externe ajoute un coût et une dépendance.
- Très grand nombre d'utilisateurs avec un budget serré : la tarification augmente avec le nombre d'utilisateurs actifs.
- Contraintes de souveraineté ou d'hébergement des données : vérifier les régions proposées, ou choisir une solution auto-hébergée.

## Pour aller plus loin

- [Documentation officielle](https://auth0.com/docs)
- [Introduction à OpenID Connect (Auth0)](https://auth0.com/docs/authenticate/protocols/openid-connect-protocol)
