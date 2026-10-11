---
questions:
  - id: role
    prompt: "Qu'est-ce que Vercel ?"
    answer: "Un hébergement pour applications front et full-stack JavaScript"
    decoys:
      - "Un cloud généraliste de machines virtuelles, comme EC2"
      - "Une base de données serverless"
    why: "Vercel automatise build, CDN, certificats et environnements de test des applications front."
  - id: push
    prompt: "Que déclenche un push Git sur un projet relié à Vercel ?"
    answer: "Un build et un déploiement"
    decoys:
      - "Rien, sans configuration manuelle"
      - "Une revue de code automatique"
    why: "Chaque push est construit et déployé."
  - id: preversion
    prompt: "Qu'obtient chaque branche sur Vercel ?"
    answer: "Sa propre URL de préversion"
    decoys:
      - "Son propre cluster"
      - "Sa propre base de données"
    why: "On fait valider chaque changement sur une URL dédiée avant la fusion."
  - id: serverless
    prompt: "Où s'exécute le code serveur (rendu, routes d'API) sur Vercel ?"
    answer: "Dans des fonctions serverless"
    decoys:
      - "Sur un serveur dédié toujours allumé"
      - "Dans le navigateur du visiteur"
    why: "Les pages sont servies depuis un réseau mondial ; le code serveur s'exécute en fonctions serverless."
  - id: longue-duree
    prompt: "Workers, serveurs WebSocket, tâches planifiées lourdes : Vercel est-il adapté ?"
    answer: "Non : les fonctions serverless ont des durées d'exécution limitées"
    decoys:
      - "Oui : c'est son usage principal"
      - "Oui, grâce aux préversions par branche qui restent allumées en continu"
    why: "Les processus de longue durée demandent un PaaS généraliste ou un cloud."
  - id: nextjs
    prompt: "Quel lien Vercel a-t-il avec Next.js ?"
    answer: "Vercel édite Next.js"
    decoys:
      - "Vercel est un fork de Next.js"
      - "Aucun lien"
    why: "L'intégration avec Next.js est la plus poussée, mais d'autres frameworks front sont pris en charge."
  - id: ancien-nom
    prompt: "Quel était l'ancien nom de Vercel ?"
    answer: "ZEIT"
    decoys:
      - "Heroku"
      - "Netlify"
    why: "Heroku et Netlify sont d'autres plateformes d'hébergement."
  - id: cdn
    prompt: "Comment les pages sont-elles servies par Vercel ?"
    answer: "Depuis un réseau mondial (CDN)"
    decoys:
      - "Depuis un seul serveur, dans une seule région"
      - "Depuis le poste du développeur"
    why: "Un CDN rapproche les pages des visiteurs."
  - id: autre-langage
    prompt: "Back-end principal en Java, avec une base à côté : Vercel convient-il ?"
    answer: "Mal : un PaaS généraliste ou un cloud est plus adapté"
    decoys:
      - "Très bien : Vercel est optimisé pour les applications Java"
      - "Très bien : Vercel héberge aussi la base"
    why: "Vercel vise les applications front et full-stack JavaScript ; Heroku exécute des serveurs en continu, dans de nombreux langages."
  - id: couts
    prompt: "Fort trafic avec un budget serré : quel point surveiller sur Vercel ?"
    answer: "La facturation à l'usage, qui peut monter vite"
    decoys:
      - "La limite de deux branches de préversion par projet"
      - "Les certificats HTTPS, payants"
    why: "La fiche le range dans « Quand l'éviter » : à surveiller."
---
