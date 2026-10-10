---
name: Sentry
kind: service-cloud
layers: [observabilite]
tags: [erreurs, offre-managee]
difficulty: 1
summary: "Suivi des erreurs applicatives : chaque exception est capturée avec sa pile d'appels et son contexte, regroupée et notifiée, côté front comme côté back."
integratesWith:
  - tech: django
    note: "Né comme extension Django ; le SDK Python s'y branche en quelques lignes."
  - tech: react
    note: "Le SDK JavaScript capture les erreurs du navigateur, avec les source maps pour lire le code d'origine."
---

## Problème résolu

En production, une erreur n'est souvent connue que lorsqu'un utilisateur se plaint, et les journaux bruts ne disent ni combien d'utilisateurs sont touchés ni depuis quelle version. Sentry, né en 2008 comme extension Django, capture chaque exception avec sa pile d'appels, la requête, l'utilisateur et la version déployée. Il regroupe les occurrences d'un même problème et alerte l'équipe.

Il couvre aussi le suivi des performances (traces de requêtes) et la relecture de sessions côté front. Il est disponible en SaaS ou en auto-hébergement, sous une licence « source disponible » et non open-source (Functional Source License depuis 2023).

## Quand l'utiliser

- Dès la mise en production, quelle que soit la taille : c'est l'outil d'observabilité le plus rentable pour une petite équipe.
- Applications front et mobile, dont les erreurs n'atteignent jamais les journaux serveur.

## Quand l'éviter

- Métriques d'infrastructure (CPU, mémoire, latence globale) et tableaux de bord : c'est le rôle de Prometheus et Grafana ou d'une plateforme d'observabilité complète.
- Journaux centralisés : Sentry n'est pas un outil de gestion de logs.
- Données personnelles : les erreurs peuvent embarquer des données sensibles ; configurer le filtrage avant l'envoi.

## Pour aller plus loin

- [Documentation officielle](https://docs.sentry.io/)
- [Concepts clés](https://docs.sentry.io/concepts/key-terms/)
