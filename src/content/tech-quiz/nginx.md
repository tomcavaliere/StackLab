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
  - id: proxy-pass
    prompt: "Quelle directive Nginx transmet les requêtes d'un bloc location à un serveur d'application ?"
    answer: "proxy_pass"
    decoys:
      - "root"
      - "try_files"
      - "return"
    why: "proxy_pass relaie la requête vers une adresse ou un groupe upstream. root et try_files servent des fichiers, return renvoie une réponse directe."
  - id: upstream
    prompt: "À quoi sert un bloc upstream dans la configuration de Nginx ?"
    answer: "Définir un groupe de serveurs entre lesquels répartir les requêtes"
    decoys:
      - "Déclarer le serveur DNS utilisé pour résoudre les noms de domaine des sites"
      - "Indiquer le dépôt d'où télécharger les mises à jour de Nginx"
    why: "proxy_pass vise ensuite le nom du groupe, et Nginx répartit les requêtes entre ses serveurs."
  - id: repartition-par-defaut
    prompt: "Quelle méthode de répartition Nginx applique-t-il par défaut entre les serveurs d'un upstream ?"
    answer: "Le tourniquet (round-robin), pondérable serveur par serveur"
    decoys:
      - "Le serveur qui a le moins de connexions actives à cet instant"
      - "Un hachage de l'adresse IP du client, pour garder le même serveur"
    why: "Le tourniquet est la méthode par défaut. least_conn et ip_hash existent, mais doivent être activés explicitement."
  - id: bloc-server
    prompt: "Comment Nginx sert-il plusieurs sites sur la même adresse IP ?"
    answer: "Avec un bloc server par site, choisi d'après le domaine demandé (server_name)"
    decoys:
      - "Avec un processus Nginx distinct par site, chacun écoutant sur son propre port"
      - "Impossible : il faut réserver une adresse IP publique différente pour chaque site"
    why: "Nginx compare le domaine de la requête aux server_name de ses blocs server : ce sont les hôtes virtuels."
  - id: bloc-location
    prompt: "Quel bloc de la configuration de Nginx associe un traitement à un chemin d'URL ?"
    answer: "location"
    decoys:
      - "server_name"
      - "upstream"
      - "listen"
    why: "location /api/ peut partir vers l'application, location / vers des fichiers statiques. server_name choisit le site, listen le port, upstream définit un groupe de serveurs."
  - id: try-files-spa
    prompt: "Pour une application monopage (SPA), quelle directive renvoie index.html quand le fichier demandé n'existe pas ?"
    answer: "try_files"
    decoys:
      - "proxy_pass"
      - "limit_req"
      - "gzip"
    why: "try_files $uri /index.html essaie le fichier demandé, puis se rabat sur index.html : le routage côté client prend le relais."
  - id: nginx-t
    prompt: "Quelle commande vérifie la syntaxe de la configuration de Nginx avant de la recharger ?"
    answer: "nginx -t"
    decoys:
      - "nginx -v"
      - "nginx -s stop"
    why: "nginx -t teste la configuration sans toucher au serveur en marche. -v affiche la version, -s stop arrête Nginx."
  - id: rechargement
    prompt: "Que fait la commande nginx -s reload ?"
    answer: "Elle relit la configuration et remplace les workers en douceur, sans couper le service"
    decoys:
      - "Elle arrête Nginx immédiatement puis le redémarre, en coupant toutes les connexions en cours"
      - "Elle vide le cache disque et recharge en mémoire tous les fichiers statiques du site"
    why: "Le processus maître démarre de nouveaux workers avec la nouvelle configuration ; les anciens terminent leurs requêtes avant de s'arrêter."
  - id: maitre-et-workers
    prompt: "Comment sont organisés les processus de Nginx ?"
    answer: "Un processus maître qui lit la configuration, et des workers qui traitent les connexions"
    decoys:
      - "Un nouveau processus créé pour chaque connexion entrante, puis détruit dès sa fermeture"
      - "Un seul processus multithread, avec un thread réservé à chaque client connecté"
    why: "Chaque worker gère de nombreuses connexions grâce à sa boucle d'événements, au lieu d'un processus ou d'un thread par connexion."
  - id: en-tetes-transmis
    prompt: "Pourquoi transmettre les en-têtes Host et X-Forwarded-For (proxy_set_header) à l'application derrière Nginx ?"
    answer: "Pour qu'elle connaisse le domaine demandé et l'adresse du client, pas ceux du proxy"
    decoys:
      - "Pour chiffrer les en-têtes échangés entre Nginx et l'application, sur le réseau interne"
      - "Pour que l'application réponde directement au client, sans repasser par Nginx"
    why: "Sans eux, l'application voit toutes les requêtes venir de Nginx. Ces en-têtes ne chiffrent rien et la réponse repasse toujours par le proxy."
  - id: limit-req
    prompt: "Quelle fonctionnalité de Nginx limite le nombre de requêtes par client ?"
    answer: "limit_req, avec une zone déclarée par limit_req_zone"
    decoys:
      - "client_max_body_size, qui borne la taille du corps envoyé"
      - "worker_connections, réglé dans le bloc events"
    why: "limit_req applique un débit maximal par clé (souvent l'adresse IP). client_max_body_size limite la taille d'une requête, worker_connections le nombre de connexions par worker."
  - id: erreur-413
    prompt: "Un envoi de gros fichier à travers Nginx échoue avec une erreur 413 : quelle directive ajuster ?"
    answer: "client_max_body_size"
    decoys:
      - "proxy_read_timeout"
      - "worker_processes"
    why: "413 signifie « corps de requête trop gros » : la limite par défaut de Nginx est basse et se relève avec client_max_body_size."
  - id: erreur-502
    prompt: "Que signifie une erreur 502 Bad Gateway renvoyée par Nginx ?"
    answer: "Nginx n'a pas obtenu de réponse valide du serveur d'application derrière lui"
    decoys:
      - "La configuration de Nginx contient une erreur de syntaxe détectée au démarrage"
      - "Le navigateur du client a envoyé une requête HTTP mal formée ou incomplète"
    why: "Le serveur d'application est arrêté, injoignable ou a planté : le proxy ne peut rien relayer. Une erreur de syntaxe empêche Nginx de démarrer, une requête mal formée donne une 400."
  - id: gzip
    prompt: "Quelle directive active la compression des réponses texte dans Nginx ?"
    answer: "gzip on;"
    decoys:
      - "sendfile on;"
      - "tcp_nodelay on;"
    why: "gzip compresse HTML, CSS, JavaScript ou JSON avant l'envoi. sendfile et tcp_nodelay optimisent la transmission, sans compresser."
  - id: websockets
    prompt: "Que faut-il configurer pour faire passer des WebSockets à travers Nginx ?"
    answer: "HTTP/1.1 vers l'application et la transmission des en-têtes Upgrade et Connection"
    decoys:
      - "Rien de possible : Nginx refuse les WebSockets, il faut placer un autre proxy devant"
      - "Un bloc stream distinct, en TCP brut sur le port 443, sans aucune configuration HTTP"
    why: "La connexion WebSocket commence par une requête HTTP de mise à niveau : Nginx doit relayer ces en-têtes pour que l'application l'accepte."
  - id: proxy-cache
    prompt: "À quoi sert la directive proxy_cache de Nginx ?"
    answer: "Garder en cache des réponses de l'application pour servir les suivantes sans la solliciter"
    decoys:
      - "Mettre en cache les résultats des requêtes SQL que l'application envoie à sa base de données"
      - "Conserver les sessions des utilisateurs connectés entre deux redémarrages de Nginx"
    why: "Nginx stocke des réponses HTTP complètes : il ne voit pas les requêtes SQL et ne gère pas de sessions applicatives."
  - id: certificat-gratuit
    prompt: "Comment obtient-on couramment un certificat HTTPS gratuit pour Nginx ?"
    answer: "Avec Let's Encrypt, par un client comme Certbot"
    decoys:
      - "Nginx en génère un, reconnu des navigateurs, au premier démarrage"
      - "Avec un fichier .htaccess placé à la racine du site"
    why: "Nginx n'obtient pas de certificat seul, contrairement à Caddy : Certbot le demande à Let's Encrypt et peut adapter la configuration."
  - id: pas-de-htaccess
    prompt: "Nginx lit-il des fichiers .htaccess répartis dans les dossiers, comme Apache ?"
    answer: "Non : la configuration est centralisée, chargée au démarrage ou au rechargement"
    decoys:
      - "Oui : il les relit à chaque requête, dans chaque répertoire traversé par le chemin"
      - "Oui, mais uniquement pour les fichiers statiques, jamais pour les requêtes relayées"
    why: "Nginx ne consulte aucun fichier de configuration par répertoire : c'est plus rapide, mais toute règle passe par la configuration centrale."
  - id: controleur-ingress
    prompt: "Quel rôle Nginx joue-t-il souvent dans un cluster Kubernetes ?"
    answer: "Contrôleur Ingress : il route le trafic HTTP entrant vers les Services"
    decoys:
      - "Planificateur : il choisit sur quel nœud du cluster placer chaque nouveau Pod"
      - "Stockage de l'état du cluster, en remplacement de la base etcd"
    why: "Un contrôleur Ingress basé sur Nginx applique les règles des objets Ingress. Le placement est fait par le scheduler, l'état est stocké dans etcd."
  - id: php-fpm
    prompt: "Comment Nginx fait-il tourner une application PHP ?"
    answer: "Il ne l'exécute pas : il transmet les requêtes à PHP-FPM via FastCGI"
    decoys:
      - "Avec un module PHP chargé dans chaque worker, comme mod_php pour Apache"
      - "Il compile tout le code PHP en fichiers statiques au moment du démarrage"
    why: "Nginx n'embarque pas d'interpréteur : comme pour Gunicorn ou Puma, il relaie vers un processus applicatif séparé, ici avec fastcgi_pass."
---
