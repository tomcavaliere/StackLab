---
name: Heroku
kind: plateforme
layers: [cloud]
tags: [paas, offre-managee]
difficulty: 1
summary: "Plateforme as a Service : on pousse son code, Heroku le construit et l'exécute, avec base et services managés en add-ons, sans gérer de serveurs."
---

## Problème résolu

Une petite équipe veut mettre en ligne une application Rails, Django ou Node.js sans devenir administrateur système. Heroku (2007, racheté par Salesforce en 2010) a popularisé le modèle PaaS : un `git push` suffit, des buildpacks détectent le langage et construisent l'application, qui tourne dans des conteneurs appelés dynos. On ajoute des instances d'un clic.

Les add-ons fournissent les services courants tout configurés : Heroku Postgres, Redis, envoi d'e-mails, journalisation. Les offres gratuites ont été supprimées fin 2022.

## Quand l'utiliser

- MVP ou petite application web dans un langage classique, avec une base relationnelle.
- Équipe sans compétences ops qui veut se concentrer sur le produit.
- Prototypes et environnements de démonstration.

## Quand l'éviter

- Forte croissance ou gros volumes : le coût par ressource devient élevé comparé à un cloud ou à une infrastructure gérée soi-même.
- Besoins d'infrastructure spécifiques (réseau, matériel, services data) : le PaaS limite le contrôle.
- Application front ou Next.js seule : Vercel ou un hébergement statique est plus adapté.

## Pour aller plus loin

- [Documentation officielle](https://devcenter.heroku.com/)
- [Comment fonctionne Heroku](https://devcenter.heroku.com/articles/how-heroku-works)
