---
questions:
  - id: probleme
    prompt: "Quel besoin SQL Server sert-il d'abord ?"
    answer: "Une base relationnelle intégrée à l'écosystème Microsoft, avec les outils et le support d'un seul éditeur"
    decoys:
      - "Un entrepôt colonnaire serverless, facturé à la requête, pour analyser des années d'historique"
      - "Une base clé-valeur en mémoire, pour des sessions, des compteurs et des classements qui expirent tout seuls"
    why: "Windows Server, Active Directory, .NET, Power BI : SQL Server s'intègre à tout cet environnement."
  - id: editeur
    prompt: "Qui édite SQL Server ?"
    answer: "Microsoft"
    decoys:
      - "Oracle"
      - "La fondation PostgreSQL"
    why: "SQL Server est la base relationnelle commerciale de Microsoft."
  - id: linux
    prompt: "SQL Server tourne-t-il sous Linux ?"
    answer: "Oui, depuis la version 2017, et aussi en conteneur"
    decoys:
      - "Non : il reste réservé à Windows Server"
      - "Seulement dans Azure, jamais sur un serveur Linux à soi"
    why: "Longtemps réservé à Windows, SQL Server tourne sous Linux depuis 2017."
  - id: tsql
    prompt: "Qu'est-ce que T-SQL ?"
    answer: "Le dialecte SQL de Microsoft, avec procédures stockées, variables et structures de contrôle"
    decoys:
      - "Le langage procédural d'Oracle, pour les déclencheurs et les fonctions stockées"
      - "Un langage de requête graphique, sans code, propre à SQL Server Management Studio"
    why: "T-SQL (Transact-SQL) est le dialecte de SQL Server. Le langage procédural d'Oracle, c'est PL/SQL."
  - id: top
    prompt: "Comment écrit-on « les 10 premières lignes » en T-SQL ?"
    answer: "SELECT TOP 10 …"
    decoys:
      - "SELECT … LIMIT 10"
      - "SELECT FIRST(10) …"
    why: "TOP est une syntaxe propre à SQL Server ; PostgreSQL et MySQL écrivent LIMIT 10."
  - id: ssms
    prompt: "À quoi sert SSMS ?"
    answer: "C'est l'outil graphique d'administration et de requêtes de SQL Server"
    decoys:
      - "C'est le service de rapports de SQL Server, qui publie des tableaux mis en page"
      - "C'est le service de chargement de données, qui alimente la base depuis d'autres sources"
    why: "SQL Server Management Studio sert à administrer et interroger. Les rapports, c'est SSRS ; le chargement, SSIS."
  - id: ssis
    prompt: "Quel service de SQL Server sert à l'intégration et au chargement de données ?"
    answer: "SSIS"
    decoys:
      - "SSRS"
      - "SSAS"
    why: "SSIS pour l'intégration, SSRS pour les rapports, SSAS pour les cubes analytiques."
  - id: ssrs
    prompt: "Quel service de SQL Server produit des rapports ?"
    answer: "SSRS"
    decoys:
      - "SSIS"
      - "SSMS"
    why: "SQL Server Reporting Services publie des rapports. SSIS charge les données, SSMS est l'outil d'administration."
  - id: ssas
    prompt: "À quoi sert SSAS ?"
    answer: "Aux cubes analytiques"
    decoys:
      - "Aux sauvegardes automatiques"
      - "À l'authentification des utilisateurs"
    why: "SQL Server Analysis Services construit des modèles et des cubes pour l'analyse."
  - id: always-on
    prompt: "À quoi servent les groupes de disponibilité Always On ?"
    answer: "Des répliques prêtes à prendre le relais, et lisibles pour décharger le serveur principal"
    decoys:
      - "Des sauvegardes complètes faites chaque nuit et conservées sur un autre site, hors d'atteinte des attaques"
      - "Une mise en veille automatique de la base quand personne ne l'interroge"
    why: "Always On assure la haute disponibilité et peut servir des lectures sur les répliques. Ce n'est pas une sauvegarde."
  - id: express
    prompt: "Qu'est-ce que l'édition Express de SQL Server ?"
    answer: "Une édition gratuite, mais limitée"
    decoys:
      - "L'édition la plus rapide, payante"
      - "Une version allégée réservée à Azure"
    why: "Express est gratuite et limitée. Les éditions de production complètes (Standard, Enterprise) sont payantes."
  - id: developer
    prompt: "À quoi est réservée l'édition Developer de SQL Server ?"
    answer: "Au développement et aux tests, gratuitement"
    decoys:
      - "À la production des petites entreprises, gratuitement"
      - "Aux développeurs .NET, contre un abonnement"
    why: "L'édition Developer est gratuite mais ne doit pas servir en production."
  - id: editions-payantes
    prompt: "Quelles éditions de SQL Server sont payantes ?"
    answer: "Standard et Enterprise"
    decoys:
      - "Express et Developer"
      - "Aucune : toutes sont gratuites"
    why: "Express et Developer sont gratuites ; la production complète passe par Standard ou Enterprise."
  - id: azure
    prompt: "Comment utiliser SQL Server sans gérer de serveur ?"
    answer: "Avec Azure SQL Database, ou Amazon RDS for SQL Server"
    decoys:
      - "En l'installant dans le navigateur, sans serveur du tout"
      - "En passant par Excel, qui embarque un moteur SQL Server complet"
    why: "Microsoft le propose en service managé dans Azure, et AWS le propose dans RDS."
  - id: acid
    prompt: "SQL Server offre-t-il des transactions ACID ?"
    answer: "Oui, avec le SQL standard"
    decoys:
      - "Non, seulement des écritures ligne par ligne"
      - "Seulement dans Azure"
    why: "C'est une base relationnelle complète : transactions ACID, contraintes, jointures."
  - id: quand-microsoft
    prompt: "Dans quel cas SQL Server est-il un choix naturel ?"
    answer: "Applications .NET, authentification Windows, reporting Power BI, hébergement Azure"
    decoys:
      - "Une startup sous Linux qui veut éviter toute licence et tout éditeur commercial"
      - "Une application mobile hors ligne qui stocke ses données sur le téléphone"
    why: "L'intégration avec l'écosystème Microsoft est son principal atout."
  - id: quand-existant
    prompt: "Une entreprise a déjà ses bases, ses équipes et ses processus sur SQL Server. Faut-il changer pour un nouveau projet ?"
    answer: "Pas forcément : rester sur SQL Server réutilise les compétences et les outils en place"
    decoys:
      - "Oui : SQL Server ne peut plus accueillir de nouvelles bases au-delà de la première installée sur un serveur"
      - "Oui, car SQL Server ne gère pas les clés étrangères"
    why: "L'existant (équipes, outils, procédures) pèse lourd dans le choix d'une base."
  - id: outils-integres
    prompt: "Quel avantage SQL Server a-t-il quand on veut chargement de données et rapports chez le même éditeur ?"
    answer: "SSIS et SSRS sont fournis avec la base"
    decoys:
      - "Il les télécharge automatiquement depuis le CRAN"
      - "Il remplace les rapports par des notebooks Jupyter intégrés"
    why: "SSIS (intégration) et SSRS (rapports) font partie de l'offre SQL Server."
  - id: budget
    prompt: "Pourquoi éviter SQL Server pour un nouveau projet hors Microsoft au budget serré ?"
    answer: "Les éditions de production sont payantes, alors que PostgreSQL ou MySQL ne coûtent rien en licence"
    decoys:
      - "SQL Server ne sait pas répondre à plus de dix requêtes par seconde, quelle que soit l'édition"
      - "SQL Server oblige à acheter des serveurs physiques Microsoft pour chaque base créée, même en développement"
    why: "Le coût de licence ne se justifie pas quand une base open-source fait le travail et que rien ne pousse vers Microsoft."
  - id: portabilite
    prompt: "Pourquoi utiliser beaucoup de T-SQL lie-t-il une application à SQL Server ?"
    answer: "La syntaxe et les procédures propres à SQL Server sont à réécrire pour un autre moteur"
    decoys:
      - "Parce que le T-SQL chiffre les données de façon propriétaire, illisibles ailleurs"
      - "Parce que le T-SQL ne tourne que si l'application est écrite en C#"
    why: "SELECT TOP, les procédures en T-SQL et les outils propres à l'éditeur ne se portent pas tels quels."
  - id: equipe-linux
    prompt: "Une équipe travaille sous Linux avec des outils libres. Que penser de SQL Server ?"
    answer: "Possible, mais l'outillage et l'expérience de l'équipe sont plus riches côté PostgreSQL"
    decoys:
      - "Impossible : SQL Server ne s'installe que sous Windows"
      - "Idéal : SQL Server est la base libre de référence sous Linux, livrée avec la plupart des distributions"
    why: "SQL Server tourne sous Linux, mais rien ne le recommande particulièrement dans cet environnement."
  - id: alternative
    prompt: "Quelle base open-source remplace le plus naturellement SQL Server hors de l'écosystème Microsoft ?"
    answer: "PostgreSQL"
    decoys:
      - "Redis"
      - "Cassandra"
    why: "PostgreSQL est relationnel, sans licence, et tourne sur n'importe quel système et n'importe quel cloud."
  - id: carte
    prompt: "Dans le jeu de stack, dans quelle couche se pose la carte SQL Server ?"
    answer: "La base opérationnelle"
    decoys:
      - "Le traitement data"
      - "L'orchestration"
    why: "SQL Server stocke les données transactionnelles de l'application."
  - id: mvp
    prompt: "Pour un MVP sur un PaaS bon marché, sans lien avec Microsoft, SQL Server est…"
    answer: "Surdimensionné : licence payante, rarement proposé par les PaaS bon marché"
    decoys:
      - "Idéal : c'est la base proposée par défaut par tous les PaaS bon marché"
      - "Inadapté : SQL Server ne gère pas les comptes utilisateurs"
    why: "L'édition gratuite Express est limitée et les éditions de production sont payantes : PostgreSQL est plus simple ici."
  - id: always-on-sauvegarde
    prompt: "Les répliques Always On remplacent-elles les sauvegardes ?"
    answer: "Non : elles protègent d'une panne, pas d'une erreur qui se réplique"
    decoys:
      - "Oui : une réplique est une sauvegarde à jour en permanence"
      - "Oui, si les répliques sont dans un autre datacenter"
    why: "Une suppression par erreur arrive aussitôt sur les répliques. Il faut des sauvegardes à part."
  - id: lectures
    prompt: "Comment soulager le serveur principal SQL Server d'une forte charge de lectures ?"
    answer: "Envoyer des lectures vers des répliques Always On lisibles"
    decoys:
      - "Passer en édition Express, plus légère et donc plus rapide en lecture"
      - "Désactiver les transactions ACID"
    why: "Les répliques d'un groupe de disponibilité peuvent servir des lectures."
  - id: power-bi
    prompt: "Avec quel outil de reporting Microsoft SQL Server s'intègre-t-il naturellement ?"
    answer: "Power BI"
    decoys:
      - "Grafana"
      - "Jupyter"
    why: "Power BI fait partie de l'écosystème Microsoft auquel SQL Server est intégré."
  - id: conteneur
    prompt: "Peut-on lancer SQL Server dans un conteneur, pour le développement ?"
    answer: "Oui, il tourne aussi en conteneur"
    decoys:
      - "Non, il exige un serveur Windows physique"
      - "Seulement dans Azure"
    why: "Depuis son arrivée sous Linux, SQL Server s'exécute aussi en conteneur."
  - id: langage
    prompt: "Dans quel langage interroge-t-on SQL Server ?"
    answer: "En SQL, avec le dialecte T-SQL"
    decoys:
      - "En PL/SQL, le langage commun aux bases commerciales"
      - "En GraphQL"
    why: "T-SQL est le SQL de Microsoft. PL/SQL est le langage procédural d'Oracle."
  - id: vs-oracle
    prompt: "Qu'ont en commun SQL Server et Oracle Database ?"
    answer: "Ce sont les deux grandes bases relationnelles commerciales, sous licence"
    decoys:
      - "Ce sont deux bases open-source, éditées par la même fondation"
      - "Ce sont deux entrepôts colonnaires serverless, facturés à la requête sur les données lues"
    why: "Les deux sont commerciales ; SQL Server s'impose dans les environnements Microsoft."
---
