---
questions:
  - id: role
    prompt: "Quel rôle Nginx joue-t-il devant une application ?"
    answer: "Reverse proxy : il termine le HTTPS, sert les fichiers statiques et répartit les requêtes entre instances"
    decoys:
      - "Serveur d'application : il exécute directement le code Python ou Ruby, sans Gunicorn ni Puma devant lui"
      - "Base de données en mémoire pour les sessions des utilisateurs"
    why: "Nginx se place devant le serveur d'application (Gunicorn, Puma, Node.js) et lui transmet les requêtes."
  - id: architecture
    prompt: "Pourquoi Nginx tient-il beaucoup de connexions avec peu de mémoire ?"
    answer: "Son architecture événementielle, au lieu d'un processus ou d'un thread par connexion"
    decoys:
      - "Il ferme chaque connexion au bout d'une seconde pour libérer la mémoire plus vite"
      - "Il stocke les connexions sur disque"
    why: "Des serveurs plus anciens consacraient un processus ou un thread à chaque connexion."
  - id: serveur-application
    prompt: "Pourquoi ne pas exposer directement Gunicorn ou Puma sur Internet ?"
    answer: "Le TLS, les connexions lentes, les fichiers statiques et la répartition ne sont pas leur rôle"
    decoys:
      - "Ils ne savent pas répondre en HTTP : il leur faut un traducteur de protocole devant eux"
      - "Ils sont interdits en production"
    why: "Ils parlent HTTP, mais sont faits pour exécuter l'application, pas pour affronter Internet seuls."
  - id: front-statique
    prompt: "Comment servir le build d'une application front (HTML, JavaScript, CSS) ?"
    answer: "Nginx peut le servir directement, sans code serveur"
    decoys:
      - "Il faut obligatoirement un serveur Node.js pour servir du JavaScript"
      - "Il faut un cluster Kubernetes"
    why: "Des fichiers statiques n'ont besoin que d'un serveur web."
  - id: paas
    prompt: "Une application sur Heroku ou Vercel : faut-il ajouter Nginx ?"
    answer: "Non : la plateforme fournit déjà le routage et le HTTPS"
    decoys:
      - "Oui : c'est le seul moyen d'avoir du HTTPS sur une application"
      - "Oui : sinon le JavaScript n'est pas servi"
    why: "Le PaaS joue déjà le rôle de point d'entrée."
  - id: caddy
    prompt: "Quelle alternative à Nginx fournit des certificats HTTPS automatiques par défaut ?"
    answer: "Caddy"
    decoys:
      - "Gunicorn"
      - "Memcached"
    why: "Caddy obtient les certificats sans configuration ; la configuration de Nginx, elle, s'apprend."
  - id: createur
    prompt: "Qui a créé Nginx ?"
    answer: "Igor Sysoev, en 2004"
    decoys:
      - "La fondation Apache, en 1995"
      - "Google, en 2014"
    why: "Nginx a été écrit pour tenir énormément de connexions simultanées."
  - id: f5
    prompt: "À qui appartient l'éditeur NGINX Inc. depuis 2019 ?"
    answer: "F5"
    decoys:
      - "Oracle"
      - "Cloudflare"
    why: "F5 a racheté NGINX Inc. en 2019."
  - id: point-d-entree
    prompt: "Comment Nginx sert-il de point d'entrée unique à plusieurs services ?"
    answer: "En routant les requêtes selon le chemin ou le domaine"
    decoys:
      - "En fusionnant leurs bases de données en une seule"
      - "En compilant les services ensemble"
    why: "/api vers un service, / vers le front, un sous-domaine vers un autre : tout passe par la même porte."
  - id: repartiteur-manage
    prompt: "Un cloud qui propose un répartiteur de charge managé : Nginx reste-t-il indispensable ?"
    answer: "Pas forcément : le répartiteur managé couvre souvent le besoin, sans serveur à maintenir"
    decoys:
      - "Oui : il est obligatoire derrière tout répartiteur de charge, managé ou non"
      - "Oui : un répartiteur managé ne sait pas gérer HTTP"
    why: "La fiche le range dans « Quand l'éviter » : le service managé évite un serveur de plus."
---
