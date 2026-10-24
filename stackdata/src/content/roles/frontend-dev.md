---
name: Développeur frontend
family: dev
summary: "Construit ce que l'utilisateur voit et touche dans le navigateur."
mission: "Transforme des maquettes en interfaces qui réagissent aux clics, affichent des données venues d'une API et restent rapides. Il se soucie de l'expérience de l'utilisateur et de ce qui arrive quand le réseau ou le backend échoue."
stack:
  - step: Écrire le code du navigateur
    intro: "Le navigateur n'exécute que du JavaScript : tout le reste s'y ramène. TypeScript ajoute des types pour attraper les erreurs avant l'exécution."
    techs:
      - { tech: javascript, essential: true, why: "Le seul langage que le navigateur exécute nativement : la base de tout le frontend." }
      - { tech: typescript, essential: true, why: "Des types sur le JavaScript : les erreurs de forme de données se voient à l'écriture plutôt qu'en production." }
  - step: Construire l'interface
    intro: "Un framework découpe l'écran en composants réutilisables et met l'affichage à jour quand les données changent. On en maîtrise un d'abord, les autres se comparent ensuite."
    techs:
      - { tech: react, essential: true, why: "La bibliothèque de composants la plus répandue : l'interface est une fonction de l'état." }
      - { tech: vue, why: "Alternative à React, réputée plus guidée : le modèle de composants reste le même." }
      - { tech: angular, why: "Framework complet et très structuré, fréquent dans les grandes équipes et les applications d'entreprise." }
      - { tech: svelte, why: "Compile les composants au build plutôt que d'embarquer un moteur de rendu dans le navigateur." }
      - { tech: nextjs, why: "Ajoute à React le routage, le rendu côté serveur et des routes d'API : le cadre d'un site complet." }
  - step: Parler au backend
    intro: "L'interface ne stocke rien d'important : elle demande et envoie des données à un serveur. Le choix du style d'échange détermine ce que le frontend doit écrire."
    techs:
      - { tech: rest, essential: true, why: "Le style d'API que le frontend appelle le plus souvent : une URL par ressource, des verbes HTTP." }
      - { tech: graphql, why: "Le frontend décrit lui-même les champs dont il a besoin, ce qui évite d'enchaîner plusieurs appels." }
      - { tech: websocket, why: "Une connexion ouverte pour que le serveur pousse des mises à jour (chat, notifications, temps réel)." }
  - step: Gérer la connexion des utilisateurs
    intro: "Le frontend déclenche la connexion mais ne doit jamais en être la garantie : la vérification se fait côté serveur."
    techs:
      - { tech: auth0, why: "Un service managé de connexion : pages de login, SSO et jetons sans écrire soi-même la gestion des mots de passe." }
  - step: Livrer et surveiller
    intro: "Un frontend se déploie souvent et se casse chez des utilisateurs dont on ne voit pas l'écran : il faut automatiser la livraison et remonter les erreurs."
    techs:
      - { tech: vercel, why: "Héberge un frontend en poussant le code, avec une URL de prévisualisation par branche." }
      - { tech: github-actions, why: "Lance lint, tests et build à chaque push, avant tout déploiement." }
      - { tech: sentry, why: "Remonte les erreurs JavaScript vécues par les vrais utilisateurs, avec le contexte pour les reproduire." }
---
