---
title: Administration des bases
description: "Index, transactions, réplication, sauvegardes et choix du moteur : quelle réponse pour quel problème d'exploitation ?"
questions:
  - id: requete-lente
    prompt: "Une requête sur une table de 200 millions de lignes lit toute la table pour trouver quelques commandes"
    answer: indexation
    decoy: replication
    why: "Il manque un index utilisable (le plan montre un parcours complet). Des répliques répartiraient la charge, mais chaque requête resterait lente."
  - id: saturation-lectures
    prompt: "Le serveur principal sature sous les lectures des rapports, alors que les requêtes sont déjà bien indexées"
    answer: replication
    decoy: indexation
    why: "Des répliques en lecture absorbent la charge des rapports. Les index sont déjà en place : en ajouter ralentirait les écritures."
  - id: delete-sans-where
    prompt: "Un DELETE sans WHERE a vidé une table de production il y a vingt minutes"
    answer: sauvegarde-restauration
    decoy: replication
    why: "La suppression est déjà arrivée sur toutes les répliques. Seule une restauration à un instant précis ramène la table."
  - id: panne-serveur
    prompt: "Le service doit repartir en quelques minutes si le serveur de base tombe"
    answer: replication
    decoy: sauvegarde-restauration
    why: "Une réplique prête à basculer tient un RTO de quelques minutes. Restaurer une sauvegarde prend bien plus longtemps sur une grosse base."
  - id: virement
    prompt: "Un débit et un crédit doivent être enregistrés ensemble, ou pas du tout"
    answer: transactions-acid
    decoy: replication
    why: "C'est l'atomicité d'une transaction. La réplication copie les données, elle ne rend pas deux écritures indivisibles."
  - id: derniere-place
    prompt: "Deux clients réservent au même moment la dernière place d'un concert"
    answer: transactions-acid
    decoy: indexation
    why: "Un verrou sur la ligne (SELECT … FOR UPDATE) ou le niveau serializable empêche la double vente. Un index n'y change rien."
  - id: email-unique
    prompt: "Garantir qu'aucun client n'ait la même adresse e-mail qu'un autre"
    answer: indexation
    decoy: transactions-acid
    why: "Un index unique refuse les doublons, même avec des insertions simultanées."
  - id: perte-une-journee
    prompt: "Perdre une journée de données est inacceptable, une sauvegarde par nuit ne suffit plus"
    answer: sauvegarde-restauration
    decoy: indexation
    why: "L'archivage continu du journal et la restauration à un instant précis ramènent le RPO à quelques minutes."
  - id: microsoft
    prompt: "Une entreprise équipée en Windows, .NET et Power BI choisit sa base relationnelle"
    answer: sql-server
    decoy: oracle-database
    why: "SQL Server s'intègre à tout l'écosystème Microsoft. Oracle n'y apporterait que des licences plus complexes."
  - id: progiciel-oracle
    prompt: "Un progiciel de gestion bancaire impose sa base, et l'entreprise a déjà des équipes et du PL/SQL"
    answer: oracle-database
    decoy: postgresql
    why: "Quand le progiciel et le code existant dépendent d'Oracle, migrer coûte cher et fait perdre le support de l'éditeur."
  - id: nouveau-projet
    prompt: "Un nouveau projet sans existant cherche une base relationnelle solide, sans licence à payer"
    answer: postgresql
    decoy: oracle-database
    why: "PostgreSQL couvre la plupart des besoins sans licence. Oracle se justifie surtout par l'existant."
  - id: lamp
    prompt: "Un parc d'applications PHP et WordPress existant, avec une réplication simple pour les lectures"
    answer: mysql
    decoy: sql-server
    why: "MySQL est historiquement lié à PHP et WordPress, et sa réplication par binlog est simple à mettre en place."
  - id: tests-embarques
    prompt: "Une base embarquée dans un fichier, pour les tests automatisés d'un outil en ligne de commande"
    answer: sqlite
    decoy: mysql
    why: "SQLite n'a pas de serveur : la base est un fichier, idéal pour des tests et des outils locaux."
  - id: deadlock
    prompt: "Deux traitements s'attendent mutuellement et la base annule l'un des deux"
    answer: transactions-acid
    decoy: sauvegarde-restauration
    why: "C'est un interblocage : comprendre les verrous et faire réessayer l'application. Aucune donnée n'est à restaurer."
  - id: lag-profil
    prompt: "Un utilisateur ne retrouve pas sa modification juste après l'avoir enregistrée, alors que l'écriture a réussi"
    answer: replication
    decoy: transactions-acid
    why: "La lecture a été servie par une réplique asynchrone en retard. On lit sur le primaire ce qui suit une écriture."
  - id: insertions-lentes
    prompt: "Les insertions dans une table de journaux ralentissent depuis qu'on y a ajouté de nombreux index"
    answer: indexation
    decoy: replication
    why: "Chaque index est mis à jour à chaque insertion : supprimer ceux qui ne servent pas. Des répliques rejoueraient les mêmes écritures."
---
