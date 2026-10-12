---
questions:
  - id: modele
    prompt: "Comment s'exécute un script PHP classique ?"
    answer: "À chaque requête, dans un contexte neuf : rien n'est partagé entre deux requêtes"
    decoys:
      - "Dans un processus unique et permanent qui garde en mémoire l'état de tous les utilisateurs"
      - "Dans le navigateur du visiteur"
    why: "Chaque requête repart d'un état vierge."
  - id: avantage
    prompt: "Quel avantage PHP tire-t-il de son exécution à chaque requête, dans un contexte neuf ?"
    answer: "Un déploiement simple, et une erreur à la portée limitée"
    decoys:
      - "Des connexions WebSocket persistantes faciles à gérer"
      - "Un cache partagé automatiquement entre les requêtes"
    why: "On dépose des fichiers, et une erreur ne touche que la requête en cours. Les connexions persistantes sont justement son point faible."
  - id: php-7
    prompt: "Qu'a apporté PHP 7, en 2015 ?"
    answer: "Une nette amélioration des performances"
    decoys:
      - "Le passage au typage dynamique, abandonné ensuite"
      - "L'exécution du code PHP dans le navigateur"
    why: "PHP 7 a nettement accéléré le langage ; PHP 8 a ensuite ajouté un compilateur à la volée."
  - id: php-8
    prompt: "Qu'a ajouté PHP 8, en 2020 ?"
    answer: "Un compilateur à la volée (JIT), des types plus stricts et une syntaxe modernisée"
    decoys:
      - "La suppression des classes"
      - "Un moteur de base de données intégré, qui remplace MySQL dans la plupart des hébergements"
    why: "Le langage s'est beaucoup modernisé au fil des versions."
  - id: composer
    prompt: "Quel outil gère les dépendances en PHP ?"
    answer: "Composer"
    decoys:
      - "Bundler"
      - "Cargo"
    why: "Bundler est celui de Ruby, Cargo celui de Rust."
  - id: logiciels
    prompt: "Quels logiciels sont écrits en PHP ?"
    answer: "WordPress, Drupal, Laravel et Symfony"
    decoys:
      - "Django, Airflow, dbt et Celery"
      - "Kubernetes, Docker et Terraform"
    why: "Django, Airflow et dbt sont en Python ; Kubernetes, Docker et Terraform en Go."
  - id: connexions-persistantes
    prompt: "Workers permanents et WebSockets en PHP classique ?"
    answer: "Le modèle d'une exécution par requête ne s'y prête pas d'origine ; FrankenPHP ou Swoole le changent"
    decoys:
      - "C'est le point fort de PHP depuis ses débuts"
      - "C'est impossible, quel que soit le serveur utilisé : le langage ferme toute connexion après chaque réponse"
    why: "Des serveurs comme FrankenPHP ou Swoole gardent l'application en mémoire entre les requêtes."
  - id: hebergement
    prompt: "Pourquoi PHP est-il pratique en hébergement mutualisé ?"
    answer: "La plupart des hébergeurs l'exécutent sans configuration"
    decoys:
      - "Il ne nécessite aucun serveur web"
      - "Il est compilé en un binaire unique, que l'hébergeur copie tel quel"
    why: "C'est l'une des raisons de sa diffusion sur le web."
  - id: createur
    prompt: "Qui a créé PHP ?"
    answer: "Rasmus Lerdorf, en 1995"
    decoys:
      - "Taylor Otwell, en 2011"
      - "Brendan Eich, en 1995"
    why: "Taylor Otwell a créé Laravel, Brendan Eich JavaScript."
  - id: facebook
    prompt: "Quelle grande application a été écrite en PHP à ses débuts ?"
    answer: "Facebook"
    decoys:
      - "Instagram"
      - "Netflix"
    why: "Instagram a démarré avec Django, en Python."
  - id: variable-dollar
    prompt: "Par quel caractère commence le nom d'une variable en PHP ?"
    answer: "$ (par exemple $total)"
    decoys:
      - "@ (par exemple @total)"
      - "% (par exemple %total)"
      - "# (par exemple #total)"
    why: "En PHP, toute variable commence par $. Le @ y sert à masquer les erreurs d'une expression, et # ouvre un commentaire."
  - id: balise-ouverture
    prompt: "Quelle balise ouvre un bloc de code PHP dans un fichier ?"
    answer: "<?php"
    decoys:
      - "<%"
      - "<script lang=\"php\">"
      - "{{php"
    why: "Le code PHP s'insère dans la page entre <?php et ?>. La balise <% est celle d'ERB (Ruby) ou des anciennes pages ASP."
  - id: concatenation
    prompt: "Quel opérateur concatène deux chaînes en PHP ?"
    answer: "Le point (.)"
    decoys:
      - "Le plus (+)"
      - "L'esperluette (&)"
      - "La barre verticale (|)"
    why: "En PHP, \"a\" . \"b\" donne \"ab\". Le + y est réservé à l'addition numérique (et à l'union de tableaux)."
  - id: tableaux
    prompt: "Qu'est-ce qu'un tableau (array) en PHP ?"
    answer: "Une structure ordonnée qui sert à la fois de liste et de dictionnaire"
    decoys:
      - "Une liste de taille fixe, à clés entières uniquement, dont le type des valeurs est déclaré"
      - "Un objet immuable, qu'il faut recréer en entier pour y ajouter un élément"
    why: "Un array PHP accepte des clés entières ou des chaînes et garde l'ordre d'insertion ; on peut l'agrandir à volonté."
  - id: psr
    prompt: "Que sont les PSR en PHP ?"
    answer: "Des recommandations de standards (autoloading, style de code, interfaces) publiées par le PHP-FIG"
    decoys:
      - "Des versions de PHP à support long, maintenues par les hébergeurs mutualisés pendant dix ans"
      - "Des extensions compilées qui ajoutent un typage statique vérifié avant l'exécution du script"
    why: "Les PSR (PHP Standard Recommendations) permettent aux frameworks et bibliothèques de s'interopérer, par exemple via l'autoloading PSR-4."
  - id: autoload
    prompt: "Que fait l'autoloading généré par Composer ?"
    answer: "Il charge le fichier d'une classe au moment où elle est utilisée pour la première fois"
    decoys:
      - "Il met à jour toutes les dépendances du projet à chaque requête reçue par le serveur"
      - "Il compile l'ensemble des fichiers du projet en un seul binaire au moment du déploiement"
    why: "On inclut un seul fichier (vendor/autoload.php) et les classes se chargent à la demande. Composer ne met rien à jour à l'exécution."
  - id: packagist
    prompt: "Quel est le dépôt public par défaut des paquets Composer ?"
    answer: "Packagist"
    decoys:
      - "PyPI"
      - "RubyGems.org"
      - "crates.io"
    why: "PyPI sert Python, RubyGems.org Ruby et crates.io Rust."
  - id: strict-types
    prompt: "Que fait declare(strict_types=1) en tête d'un fichier PHP ?"
    answer: "Les types scalaires déclarés sont vérifiés strictement : une TypeError plutôt qu'une conversion"
    decoys:
      - "Chaque variable du fichier doit être déclarée avec un type, sinon le script refuse de démarrer"
      - "Le fichier est compilé à l'avance par le JIT, ce qui interdit les types dynamiques dans ce fichier"
    why: "Sans cette directive, PHP convertit par exemple \"5\" en 5 pour un paramètre int ; avec, il lève une TypeError. Les variables locales restent non typées."
  - id: egalite-stricte
    prompt: "Quelle différence entre == et === en PHP ?"
    answer: "=== compare aussi le type, sans conversion ; == convertit les opérandes avant de comparer"
    decoys:
      - "== compare les références des objets ; === compare leurs valeurs, champ par champ, sans conversion"
      - "=== est réservé aux chaînes de caractères ; == sert à comparer tous les autres types de valeurs"
    why: "Les conversions de == réservent des surprises ; === est en général le choix sûr."
  - id: opcache
    prompt: "Quel est le rôle d'OPcache ?"
    answer: "Garder en mémoire le bytecode compilé des scripts, pour ne pas les recompiler à chaque requête"
    decoys:
      - "Mettre en cache les pages HTML générées, pour les servir sans exécuter le moindre script PHP"
      - "Partager les variables d'une requête avec les suivantes, pour conserver l'état de chaque utilisateur"
    why: "OPcache évite de recompiler les fichiers, mais chaque requête repart toujours d'un état vierge et ré-exécute le script."
  - id: php-fpm
    prompt: "Qu'est-ce que PHP-FPM ?"
    answer: "Un gestionnaire de processus FastCGI qui exécute PHP derrière un serveur web comme Nginx"
    decoys:
      - "Un framework MVC officiel, maintenu par l'équipe du langage et livré avec chaque version de PHP"
      - "Un gestionnaire de paquets concurrent de Composer, préinstallé chez les hébergeurs mutualisés"
    why: "Nginx n'exécute pas PHP lui-même : il transmet les requêtes à un pool de processus PHP-FPM."
  - id: injection-sql
    prompt: "Comment éviter les injections SQL en PHP avec PDO ?"
    answer: "Avec des requêtes préparées et des paramètres liés"
    decoys:
      - "En passant les valeurs dans htmlspecialchars avant de les concaténer à la requête"
      - "En activant strict_types dans chaque fichier qui accède à la base de données"
    why: "Les paramètres liés séparent la requête des données. htmlspecialchars protège l'affichage HTML, pas le SQL."
  - id: pdo
    prompt: "Qu'est-ce que PDO ?"
    answer: "Une interface d'accès aux bases de données, commune à plusieurs SGBD"
    decoys:
      - "Un ORM complet qui génère les tables à partir des classes PHP du projet"
      - "Un serveur de base de données embarqué, livré avec chaque installation de PHP"
    why: "PDO (PHP Data Objects) offre la même API pour MySQL, PostgreSQL ou SQLite ; ce n'est ni un ORM ni un serveur."
  - id: echappement-html
    prompt: "Quelle fonction échappe une chaîne avant de l'afficher dans une page HTML, contre le XSS ?"
    answer: "htmlspecialchars"
    decoys:
      - "addslashes"
      - "urlencode"
      - "trim"
    why: "htmlspecialchars convertit < > & et les guillemets en entités HTML. addslashes échappe pour des chaînes entre guillemets, urlencode pour une URL."
  - id: enumerations
    prompt: "Quelle fonctionnalité PHP 8.1 a-t-il ajoutée au langage ?"
    answer: "Les énumérations (enum)"
    decoys:
      - "Les classes et les objets"
      - "Les espaces de noms (namespace)"
      - "Les fonctions anonymes (closures)"
    why: "Les enums sont arrivées en PHP 8.1 ; les espaces de noms et les fonctions anonymes datent de PHP 5.3, les classes de bien avant."
  - id: expression-match
    prompt: "Qu'est-ce qui distingue l'expression match (PHP 8) d'un switch ?"
    answer: "Elle renvoie une valeur, compare strictement (===) et ne « tombe » pas dans la branche suivante"
    decoys:
      - "Elle accepte une expression régulière dans chaque branche et compare les valeurs avec =="
      - "Elle évalue toutes les branches en parallèle et garde le premier résultat disponible"
    why: "match est une expression, sans break à écrire, avec une comparaison stricte ; switch compare avec ==."
  - id: php-6
    prompt: "Qu'est-il arrivé à PHP 6 ?"
    answer: "Le projet, centré sur Unicode, a été abandonné : on est passé de PHP 5 à PHP 7"
    decoys:
      - "Il est sorti en 2010, puis a été retiré des hébergeurs à cause de failles de sécurité"
      - "Il a introduit les classes, puis a été renommé PHP 7 quelques jours avant sa sortie"
    why: "PHP 6 n'a jamais été publié ; le numéro a été sauté pour éviter la confusion avec ce projet abandonné."
  - id: acronyme
    prompt: "Que signifie aujourd'hui l'acronyme PHP ?"
    answer: "PHP: Hypertext Preprocessor"
    decoys:
      - "Personal Hosting Platform"
      - "Programmable HTML Parser"
      - "Pre-Hosted Pages"
    why: "C'est un acronyme récursif. À l'origine, PHP voulait dire Personal Home Page."
  - id: laravel-symfony
    prompt: "Que sont Laravel et Symfony ?"
    answer: "Deux frameworks web PHP ; Laravel réutilise plusieurs composants de Symfony"
    decoys:
      - "Deux CMS concurrents de WordPress, pensés pour les sites éditoriaux et les blogs"
      - "Deux serveurs qui gardent l'application PHP en mémoire entre les requêtes, comme Swoole"
    why: "Ce sont les deux grands frameworks applicatifs de PHP. Garder l'application en mémoire, c'est le rôle de FrankenPHP ou Swoole."
  - id: machine-learning
    prompt: "Un produit centré sur la data et le machine learning : PHP est-il un bon choix ?"
    answer: "Non : l'écosystème Python domine ce domaine"
    decoys:
      - "Oui : PHP 8 intègre une bibliothèque de calcul matriciel dans son noyau"
      - "Oui : le JIT de PHP 8 en fait la référence pour entraîner des modèles"
    why: "La fiche range la data et le ML dans « Quand l'éviter ». Le JIT accélère certains calculs, sans créer d'écosystème ML."
---
