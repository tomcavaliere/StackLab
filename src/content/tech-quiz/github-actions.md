---
questions:
  - id: fichier
    prompt: "Où décrit-on un workflow GitHub Actions ?"
    answer: "Dans un fichier YAML, sous .github/workflows"
    decoys:
      - "Dans un Dockerfile à la racine du dépôt"
      - "Dans l'interface web uniquement, sans fichier versionné"
    why: "Le workflow est un fichier YAML versionné avec le code : il évolue et se relit comme le reste du dépôt."
  - id: organisation
    prompt: "Comment un workflow est-il organisé ?"
    answer: "En jobs, eux-mêmes composés d'étapes"
    decoys:
      - "En assets reliés par leur lignée"
      - "En Deployments et Services"
    why: "Un workflow décrit des jobs et leurs étapes. Les assets sont un concept de Dagster, Deployments et Services de Kubernetes."
  - id: declencheurs
    prompt: "Qu'est-ce qui peut déclencher un workflow ?"
    answer: "Un push, une pull request, une étiquette ou un planning"
    decoys:
      - "Uniquement un clic manuel dans l'interface"
      - "Uniquement un push sur la branche principale du dépôt"
    why: "Les workflows réagissent aux événements du dépôt, et aussi à un planning."
  - id: runners
    prompt: "Où tournent les jobs ?"
    answer: "Sur des machines hébergées par GitHub (Linux, Windows, macOS) ou sur ses propres serveurs"
    decoys:
      - "Uniquement sur des machines Linux hébergées par GitHub, sans possibilité d'utiliser les siennes"
      - "Sur le poste du développeur qui a poussé le code"
    why: "GitHub fournit des runners sur trois systèmes, et l'on peut brancher ses propres runners auto-hébergés."
  - id: marketplace
    prompt: "À quoi sert la place de marché de GitHub Actions ?"
    answer: "Fournir des actions réutilisables : installer un langage, publier une image Docker, déployer"
    decoys:
      - "Acheter des minutes de calcul supplémentaires quand le quota gratuit est épuisé, à prix réduit"
      - "Vendre l'accès à ses dépôts privés"
    why: "Une action réutilisable évite de réécrire les mêmes étapes dans chaque workflow."
  - id: epingler
    prompt: "Pourquoi épingler une action tierce à un hash de commit ?"
    answer: "Elle s'exécute avec les secrets du dépôt : on évite qu'une nouvelle version malveillante soit utilisée"
    decoys:
      - "Pour qu'elle se télécharge plus vite à chaque exécution"
      - "Parce que GitHub refuse les références par numéro de version dans les workflows publics du dépôt"
    why: "Une étiquette de version peut être déplacée ; un hash de commit, non. C'est la recommandation de sécurité de la fiche."
  - id: gitlab
    prompt: "Le code est hébergé sur GitLab. GitHub Actions est-il le choix naturel ?"
    answer: "Non : la CI intégrée de GitLab est plus naturelle"
    decoys:
      - "Oui : GitHub Actions est obligatoire pour toute CI"
      - "Oui : il lit les dépôts GitLab sans configuration"
    why: "GitHub Actions est d'autant plus simple qu'il est intégré au dépôt GitHub. Ailleurs, la CI de la plateforme d'hébergement s'impose."
  - id: minutes
    prompt: "Builds très longs et très fréquents : qu'est-ce qui devient intéressant ?"
    answer: "Des runners auto-hébergés, car les minutes facturées s'accumulent"
    decoys:
      - "Désactiver les tests sur les pull requests pour gagner du temps"
      - "Réécrire les workflows en JSON"
    why: "Sur machines hébergées, les minutes se paient : à gros volume, faire tourner ses propres runners peut revenir moins cher."
  - id: ci
    prompt: "Qu'est-ce qu'une CI ?"
    answer: "L'exécution automatique du build et des tests (voire du déploiement) à chaque changement"
    decoys:
      - "Une revue de code manuelle, obligatoire et signée, avant chaque fusion dans la branche principale"
      - "Un registre où l'on publie les images Docker"
    why: "La CI évite d'oublier une étape : chaque changement est construit et testé automatiquement."
  - id: usage
    prompt: "Quel est un usage typique de GitHub Actions ?"
    answer: "Lancer les tests sur chaque pull request et déployer automatiquement à la fusion"
    decoys:
      - "Héberger l'application en production, avec un domaine fourni par GitHub"
      - "Stocker les métriques de l'application"
    why: "GitHub Actions exécute des workflows ; il n'héberge pas l'application et ne stocke pas de métriques."
---
