---
questions:
  - id: paas
    prompt: "Quel modèle Heroku a-t-il popularisé ?"
    answer: "Le PaaS : on pousse son code, la plateforme le construit et l'exécute"
    decoys:
      - "L'IaaS : on loue des machines virtuelles à configurer soi-même"
      - "Le SaaS : on loue un logiciel fini à ses utilisateurs"
    why: "Avec un PaaS, pas de serveurs à gérer : on fournit le code, Heroku s'occupe du reste."
  - id: git-push
    prompt: "Comment déploie-t-on classiquement sur Heroku ?"
    answer: "Avec un git push"
    decoys:
      - "En envoyant une archive ZIP par FTP"
      - "En configurant un cluster Kubernetes"
    why: "Un git push suffit : c'est ce qui a fait le succès d'Heroku."
  - id: buildpacks
    prompt: "Que font les buildpacks ?"
    answer: "Ils détectent le langage et construisent l'application"
    decoys:
      - "Ils sauvegardent la base de données chaque nuit"
      - "Ils répartissent le trafic entre plusieurs régions"
    why: "Le buildpack reconnaît une application Rails, Django ou Node.js et la prépare pour l'exécution."
  - id: dynos
    prompt: "Comment s'appellent les conteneurs qui exécutent l'application sur Heroku ?"
    answer: "Des dynos"
    decoys:
      - "Des pods"
      - "Des runners"
    why: "Les dynos sont les conteneurs d'Heroku ; on en ajoute d'un clic. Les pods sont ceux de Kubernetes, les runners ceux de GitHub Actions."
  - id: add-ons
    prompt: "Que fournissent les add-ons d'Heroku ?"
    answer: "Des services courants tout configurés : Postgres, Redis, e-mails, journaux"
    decoys:
      - "Des extensions du langage de programmation, installées dans chaque dyno au démarrage"
      - "Des thèmes graphiques pour l'application"
    why: "Une base ou un cache s'ajoutent en un clic, déjà branchés à l'application."
  - id: offres-gratuites
    prompt: "Qu'est-il arrivé aux offres gratuites d'Heroku ?"
    answer: "Elles ont été supprimées fin 2022"
    decoys:
      - "Elles ont été étendues à toutes les bases de données"
      - "Elles n'ont jamais existé"
    why: "Heroku a longtemps proposé des offres gratuites, supprimées fin 2022."
  - id: croissance
    prompt: "Forte croissance et gros volumes : quel problème pose Heroku ?"
    answer: "Le coût par ressource devient élevé comparé à un cloud ou à une infrastructure gérée soi-même"
    decoys:
      - "Heroku ne permet pas d'ajouter des instances au-delà d'un seul dyno par application"
      - "Heroku ne prend en charge qu'un seul langage"
    why: "On paie la simplicité : à gros volume, la facture d'un PaaS dépasse celle d'un cloud configuré soi-même."
  - id: nextjs
    prompt: "Une application Next.js seule : Heroku est-il le plus adapté ?"
    answer: "Non : Vercel ou un hébergement statique conviennent mieux"
    decoys:
      - "Oui : Heroku est le seul hébergeur compatible avec Next.js"
      - "Non : Heroku impose de réécrire l'application en Rails"
    why: "Vercel édite Next.js et l'héberge sans configuration. Heroku vise des serveurs qui tournent en continu, dans de nombreux langages."
  - id: proprietaire
    prompt: "Qui possède Heroku ?"
    answer: "Salesforce, depuis 2010"
    decoys:
      - "Amazon"
      - "Okta"
    why: "Salesforce a racheté Heroku en 2010. Okta possède Auth0."
  - id: cible
    prompt: "Pour quelle équipe Heroku est-il fait ?"
    answer: "Une petite équipe sans compétences ops, avec une app web classique et une base relationnelle"
    decoys:
      - "Une équipe plateforme qui veut un contrôle fin du réseau, du matériel et du système d'exploitation"
      - "Une équipe data qui traite des téraoctets chaque nuit"
    why: "Heroku permet de se concentrer sur le produit. Contrôle fin et gros volumes data sortent de son terrain."
---
