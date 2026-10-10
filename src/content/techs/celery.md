---
name: Celery
kind: framework
layers: [cache-messaging]
languages: [python]
tags: [open-source, file-de-messages]
difficulty: 2
summary: "File de tâches distribuée pour Python : l'application délègue les traitements lents (e-mails, images, exports) à des workers en arrière-plan."
integratesWith:
  - tech: redis
    note: "Peut servir de broker et de stockage des résultats."
---

## Problème résolu

Une requête web ne doit pas faire attendre l'utilisateur pendant l'envoi d'un e-mail, le redimensionnement d'une photo ou la génération d'un export. Celery permet de déclarer une fonction Python comme tâche et de l'appeler de façon asynchrone : l'appel dépose un message dans un broker (RabbitMQ ou Redis), et des processus workers séparés l'exécutent.

Il gère les nouvelles tentatives, les délais, les chaînes de tâches et, avec Celery Beat, les tâches planifiées. L'intégration avec Django est documentée et très répandue.

## Quand l'utiliser

- Application Python (Django, Flask, FastAPI) avec des traitements à sortir du cycle requête-réponse.
- Tâches planifiées simples à côté de l'application.

## Quand l'éviter

- Orchestration de pipelines de données avec dépendances entre étapes, reprises et historique : un orchestrateur (Airflow, Dagster) est fait pour ça.
- Application non Python : chaque écosystème a son équivalent (Sidekiq en Ruby, BullMQ en Node.js).
- Quelques tâches rares : un broker et des workers à opérer pour un besoin que le framework couvre parfois déjà.

## Pour aller plus loin

- [Documentation officielle](https://docs.celeryq.dev/en/stable/)
- [Premiers pas avec Celery](https://docs.celeryq.dev/en/stable/getting-started/first-steps-with-celery.html)
