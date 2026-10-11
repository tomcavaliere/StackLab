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
---
