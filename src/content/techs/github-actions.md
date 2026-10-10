---
name: GitHub Actions
kind: service-cloud
layers: [ci-cd]
tags: [ci, offre-managee]
difficulty: 1
summary: "Intégration et déploiement continus intégrés à GitHub : des workflows YAML déclenchés par les événements du dépôt (push, pull request, planning…)."
---

## Problème résolu

Lancer les tests et déployer à la main, c'est oublier une étape un jour sur deux. Une CI exécute automatiquement build, tests et déploiement à chaque changement. GitHub Actions (disponible pour la CI/CD depuis fin 2019) l'intègre au dépôt : un fichier YAML dans `.github/workflows` décrit des jobs et leurs étapes, déclenchés par un push, une pull request, une étiquette ou un planning.

Les jobs tournent sur des machines hébergées par GitHub (Linux, Windows, macOS) ou sur ses propres serveurs. Une place de marché fournit des actions réutilisables : installer un langage, publier une image Docker, déployer sur un cloud.

## Quand l'utiliser

- Code hébergé sur GitHub : c'est la CI la plus directe à mettre en place.
- Tests automatiques sur chaque pull request, déploiement automatique à la fusion.
- Petites et moyennes équipes qui ne veulent pas opérer de serveur de CI.

## Quand l'éviter

- Code hébergé ailleurs (GitLab, Bitbucket) : leur CI intégrée est plus naturelle.
- Builds très longs ou très fréquents sur machines hébergées : les minutes facturées s'accumulent ; des runners auto-hébergés deviennent alors intéressants.
- Actions tierces non vérifiées : elles s'exécutent avec les secrets du dépôt. Les épingler à une version précise (hash de commit).

## Pour aller plus loin

- [Documentation officielle](https://docs.github.com/fr/actions)
- [Renforcement de la sécurité](https://docs.github.com/fr/actions/security-for-github-actions/security-guides/security-hardening-for-github-actions)
