---
name: FastAPI
kind: framework
layers: [backend-api]
languages: [python]
tags: [open-source, api, async]
difficulty: 1
summary: "Framework Python pour construire des API à partir des annotations de type : validation des entrées et documentation OpenAPI sont générées automatiquement."
integratesWith:
  - tech: postgresql
    note: "Via SQLAlchemy ou SQLModel ; FastAPI ne fournit pas d'ORM lui-même."
---

## Problème résolu

Écrire une API, c'est valider chaque entrée, convertir les types, renvoyer des erreurs claires et documenter les routes, souvent à la main et en double. FastAPI (Sebastián Ramírez, 2018) part des annotations de type Python : on déclare les paramètres et les modèles (avec Pydantic), et le framework valide les requêtes, sérialise les réponses et génère une documentation OpenAPI interactive.

Il repose sur Starlette et la norme ASGI, et prend en charge `async`/`await` : un même processus peut attendre de nombreuses entrées-sorties (base, appels HTTP) en parallèle. C'est aussi un choix courant pour servir des modèles de machine learning.

## Quand l'utiliser

- API REST ou JSON en Python, en particulier pour un front séparé ou des clients mobiles.
- Exposer un modèle de ML ou un traitement data en service web.
- Équipe qui veut une documentation d'API à jour sans effort.

## Quand l'éviter

- Application avec beaucoup de pages, de comptes utilisateurs et de back-office : il faut assembler soi-même ORM, migrations, authentification et administration, que Django fournit.
- Calcul intensif dans les requêtes : l'asynchrone accélère l'attente d'entrées-sorties, pas le calcul.
- Mélanger code bloquant et `async` sans précaution bloque la boucle d'événements et dégrade tout le service.

## Pour aller plus loin

- [Documentation officielle](https://fastapi.tiangolo.com/fr/)
- [Concurrence et async / await](https://fastapi.tiangolo.com/fr/async/)
