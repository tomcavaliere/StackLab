---
questions:
  - id: probleme
    prompt: "Quel besoin Oracle Database sert-il d'abord ?"
    answer: "Les systèmes critiques des grandes organisations, à très forte charge transactionnelle"
    decoys:
      - "L'analyse de très gros historiques en colonnes, pour des tableaux de bord interactifs sur des années de données"
      - "Le stockage local d'une application mobile hors ligne, sans serveur à administrer ni licence à payer"
    why: "Banque, assurance, télécoms, administrations, progiciels de gestion : c'est le terrain historique d'Oracle."
  - id: anciennete
    prompt: "Depuis quand Oracle Database existe-t-elle ?"
    answer: "Depuis la fin des années 1970 : l'une des premières bases relationnelles commerciales"
    decoys:
      - "Depuis 2010, quand Oracle a racheté Sun et MySQL avec lui pour en faire sa base phare"
      - "Depuis les années 2000, comme réponse commerciale au succès de PostgreSQL dans les entreprises"
    why: "Oracle occupe le terrain des bases d'entreprise depuis des décennies. Le rachat de Sun (et de MySQL) date de 2010, mais c'est une autre base."
  - id: licence
    prompt: "Oracle Database est-elle open-source ?"
    answer: "Non : c'est une base commerciale, avec une édition gratuite limitée pour apprendre"
    decoys:
      - "Oui : le code est libre, seul le support est payant, comme pour la plupart des bases"
      - "Oui, depuis qu'Oracle a racheté MySQL et fusionné les deux bases en un seul produit"
    why: "Oracle se vend sous licence. Une édition gratuite et limitée existe pour apprendre et développer."
  - id: plsql
    prompt: "Qu'est-ce que PL/SQL ?"
    answer: "Le langage procédural d'Oracle, pour les procédures stockées, fonctions et déclencheurs"
    decoys:
      - "L'outil graphique d'administration d'Oracle, pour écrire, lancer et enregistrer des requêtes"
      - "Le dialecte SQL de Microsoft, avec ses variables et ses structures de contrôle"
    why: "PL/SQL s'exécute dans la base. Le dialecte de Microsoft, c'est T-SQL."
  - id: rac
    prompt: "À quoi sert RAC (Real Application Clusters) ?"
    answer: "Faire travailler plusieurs serveurs sur la même base, pour la disponibilité et la montée en charge"
    decoys:
      - "Tenir une base de secours à jour dans un autre datacenter, prête à prendre le relais en cas de panne"
      - "Compresser les tables les plus anciennes pour réduire la place occupée sur les disques"
    why: "RAC partage une même base entre plusieurs serveurs. La base de secours tenue à jour, c'est Data Guard."
  - id: data-guard
    prompt: "Que fait Data Guard ?"
    answer: "Tient à jour une base de secours par réplication, prête à prendre le relais"
    decoys:
      - "Chiffre automatiquement toutes les données et les sauvegardes de la base"
      - "Fait travailler plusieurs serveurs en même temps sur la même base partagée"
    why: "Data Guard maintient une base standby. Plusieurs serveurs sur une même base, c'est RAC."
  - id: options
    prompt: "Partitionnement, compression ou chiffrement avancé : qu'ont souvent en commun ces fonctions d'Oracle ?"
    answer: "Ce sont des options payantes de l'édition Enterprise"
    decoys:
      - "Elles sont incluses gratuitement dans toutes les éditions, y compris l'édition gratuite"
      - "Elles ne sont disponibles que dans le cloud d'Oracle, jamais sur ses propres serveurs"
    why: "Beaucoup de fonctions avancées s'ajoutent à la licence Enterprise, ce qui complique le calcul du coût."
  - id: audit
    prompt: "Quel risque fait courir une option Oracle activée sans la licence correspondante ?"
    answer: "Une facture élevée lors d'un audit de l'éditeur"
    decoys:
      - "Une base qui s'arrête aussitôt et refuse de redémarrer"
      - "La suppression automatique des données concernées"
    why: "Les licences dépendent des processeurs, de l'édition et des options : une option utilisée sans licence peut coûter cher lors d'un audit."
  - id: prix
    prompt: "De quoi dépend le prix d'une licence Oracle ?"
    answer: "Du nombre de processeurs, de l'édition et des options activées"
    decoys:
      - "Uniquement du nombre de tables et d'utilisateurs créés dans la base"
      - "Du volume de données stockées, au gigaoctet près"
    why: "C'est ce qui rend les licences Oracle complexes à prévoir."
  - id: mvcc
    prompt: "Comment Oracle évite-t-elle que les lectures bloquent les écritures ?"
    answer: "Avec un moteur MVCC, comme les autres grandes bases relationnelles"
    decoys:
      - "En interdisant toute lecture pendant qu'une écriture est en cours"
      - "En copiant la base entière avant chaque transaction"
    why: "Le MVCC garde plusieurs versions des lignes : chaque transaction lit une photo cohérente."
  - id: acid
    prompt: "Oracle Database offre-t-elle des transactions ACID ?"
    answer: "Oui, comme toute base relationnelle"
    decoys:
      - "Non, seulement des transactions sur une ligne à la fois"
      - "Seulement dans l'édition Enterprise, en option payante"
    why: "Les transactions ACID sont la base du métier d'Oracle : les systèmes critiques en dépendent."
  - id: cloud
    prompt: "Peut-on utiliser Oracle Database sans gérer ses propres serveurs ?"
    answer: "Oui : dans le cloud d'Oracle (Autonomous Database) ou sur AWS (RDS for Oracle)"
    decoys:
      - "Non : Oracle n'existe qu'installée sur les serveurs du client, jamais en service managé"
      - "Oui, mais uniquement sous forme de conteneur Docker fourni par la communauté"
    why: "Oracle a son service managé, et AWS propose RDS for Oracle, avec la licence incluse ou apportée."
  - id: quand-existant
    prompt: "Pourquoi une entreprise garde-t-elle souvent Oracle, malgré son coût ?"
    answer: "Ses équipes, ses procédures PL/SQL et ses progiciels en dépendent : migrer coûte cher et comporte des risques"
    decoys:
      - "Parce qu'aucune autre base relationnelle ne gère correctement les transactions, les clés étrangères ou les jointures complexes"
      - "Parce qu'Oracle est la seule base que les clouds publics acceptent d'héberger"
    why: "La dépendance au code et aux outils existants pèse plus que la licence dans la décision."
  - id: quand-critique
    prompt: "Dans quel contexte Oracle est-elle un choix défendable pour un nouveau système ?"
    answer: "Un système critique à très forte charge, où l'entreprise exige la haute disponibilité intégrée et le support d'un éditeur"
    decoys:
      - "Une startup de deux développeurs qui veut montrer un MVP en trois mois, avec un budget d'hébergement de quelques dizaines d'euros par mois"
      - "Un petit outil interne utilisé par une dizaine de personnes, sans exigence de disponibilité"
    why: "RAC, Data Guard et le support de l'éditeur ont du sens quand une panne coûte très cher."
  - id: progiciel
    prompt: "Un progiciel de gestion impose Oracle comme base. Que faire ?"
    answer: "Utiliser Oracle : le progiciel est supporté sur cette base"
    decoys:
      - "Le faire tourner sur SQLite pour économiser la licence"
      - "Le faire tourner sur MongoDB, plus moderne"
    why: "Quand l'éditeur du progiciel impose ou recommande Oracle, s'en écarter fait perdre le support."
  - id: startup
    prompt: "Pourquoi éviter Oracle pour une startup au budget limité ?"
    answer: "Les licences et le support coûtent cher, alors que PostgreSQL couvre la plupart des besoins sans licence"
    decoys:
      - "Oracle refuse de vendre des licences aux entreprises de moins de cent salariés"
      - "Oracle ne sait pas stocker les données d'une application web moderne, seulement celles d'un progiciel de gestion"
    why: "Le coût et la complexité des licences ne se justifient pas quand une base open-source suffit."
  - id: dependance
    prompt: "Pourquoi le PL/SQL rend-il une migration hors d'Oracle longue ?"
    answer: "Le code écrit dans la base, propre à Oracle, est à réécrire pour un autre moteur"
    decoys:
      - "Parce que le PL/SQL chiffre les données, qu'il faut déchiffrer avant de migrer"
      - "Parce que le PL/SQL est interdit en dehors des serveurs d'Oracle"
    why: "Procédures, fonctions et déclencheurs en PL/SQL ne tournent pas tels quels sur PostgreSQL ou SQL Server."
  - id: dba
    prompt: "Quel profil d'équipe Oracle demande-t-elle en général ?"
    answer: "Des DBA aux compétences spécialisées"
    decoys:
      - "Aucun : elle s'administre seule"
      - "Seulement des développeurs front"
    why: "L'administration d'Oracle est réputée exigeante. Une petite équipe sans DBA s'en sortira mieux avec une base plus simple."
  - id: migration-cible
    prompt: "Vers quelle base les entreprises migrent-elles le plus souvent quand elles quittent Oracle ?"
    answer: "PostgreSQL"
    decoys:
      - "Redis"
      - "Elasticsearch"
    why: "PostgreSQL est relationnel, open-source et riche en fonctions : c'est la cible la plus fréquente."
  - id: sql-server-alternative
    prompt: "Dans un environnement Microsoft, quelle autre base commerciale remplace naturellement Oracle ?"
    answer: "SQL Server"
    decoys:
      - "MySQL"
      - "SQLite"
    why: "SQL Server est l'autre grande base commerciale, intégrée à Windows, .NET et Azure."
  - id: langage
    prompt: "Dans quel langage interroge-t-on Oracle Database ?"
    answer: "En SQL, complété par PL/SQL pour le code procédural"
    decoys:
      - "En JavaScript uniquement, depuis un pilote propriétaire"
      - "En T-SQL, le langage commun de toutes les bases commerciales"
    why: "Oracle parle SQL. T-SQL est le dialecte de SQL Server."
  - id: carte
    prompt: "Dans le jeu de stack, dans quelle couche se pose la carte Oracle Database ?"
    answer: "La base opérationnelle"
    decoys:
      - "Le stockage analytique"
      - "Le cache et le messaging"
    why: "Oracle stocke les données transactionnelles de l'application, comme PostgreSQL ou MySQL."
  - id: mvp
    prompt: "Pour un MVP à quelques centaines d'utilisateurs et quelques dizaines d'euros d'hébergement par mois, Oracle est…"
    answer: "Surdimensionnée : licence et administration d'une base d'entreprise pour un petit volume"
    decoys:
      - "Idéale : c'est la seule base capable de gérer des réservations concurrentes sans erreur ni doublon"
      - "Inadaptée : une base relationnelle ne peut pas stocker un planning de cours"
    why: "Elle ferait le travail, mais à un coût et une complexité sans rapport avec le besoin."
  - id: edition-gratuite
    prompt: "À quoi sert l'édition gratuite d'Oracle Database ?"
    answer: "Apprendre et développer, avec des limites"
    decoys:
      - "Faire tourner la production sans limite de taille"
      - "Héberger les sauvegardes des bases payantes"
    why: "L'édition gratuite est limitée : elle sert à se former et à développer, pas à remplacer les éditions de production."
  - id: haute-dispo
    prompt: "Quelles fonctions d'Oracle visent la haute disponibilité ?"
    answer: "RAC et Data Guard"
    decoys:
      - "PL/SQL et les déclencheurs"
      - "Le partitionnement et la compression"
    why: "RAC partage la base entre plusieurs serveurs, Data Guard tient une base de secours prête à basculer."
  - id: secteurs
    prompt: "Dans lequel de ces secteurs Oracle est-elle historiquement très présente ?"
    answer: "La banque et l'assurance"
    decoys:
      - "Les applications mobiles grand public"
      - "Les sites vitrines de petites entreprises"
    why: "Les systèmes transactionnels critiques des grandes organisations sont son terrain historique."
  - id: rds
    prompt: "Sur AWS, comment se règle la licence d'Oracle dans RDS for Oracle ?"
    answer: "Elle est incluse dans le prix du service, ou apportée par le client"
    decoys:
      - "Elle est toujours offerte par AWS, sans surcoût"
      - "Il faut acheter une licence AWS spéciale, distincte de celle d'Oracle"
    why: "RDS for Oracle propose les deux modèles : licence incluse ou licence apportée."
  - id: partitionnement
    prompt: "Le partitionnement d'Oracle est-il toujours disponible sans surcoût ?"
    answer: "Non : c'est souvent une option payante de l'édition Enterprise"
    decoys:
      - "Oui : il est inclus dans toutes les éditions, y compris l'édition gratuite"
      - "Oui, mais seulement dans le cloud d'Oracle"
    why: "Comme la compression ou certains chiffrements, il s'ajoute à la licence."
  - id: vs-postgresql
    prompt: "Quel argument principal fait préférer PostgreSQL à Oracle pour un nouveau projet ?"
    answer: "Aucune licence à payer, pour la plupart des mêmes besoins relationnels"
    decoys:
      - "PostgreSQL est la seule des deux à proposer des transactions ACID et des clés étrangères"
      - "Oracle ne sait pas faire de jointures entre plusieurs tables"
    why: "Les deux sont des bases relationnelles complètes ; la différence tient surtout au coût et à la dépendance à l'éditeur."
  - id: equipe-petite
    prompt: "Une équipe de trois développeurs sans DBA hésite à prendre Oracle. Pourquoi a-t-elle raison d'hésiter ?"
    answer: "L'administration demande des compétences spécialisées que l'équipe n'a pas"
    decoys:
      - "Oracle ne fonctionne que si au moins dix développeurs l'utilisent, faute de licence minimale"
      - "Oracle interdit l'accès à la base depuis plus de trois postes"
    why: "Sans DBA, une base plus simple ou un service managé convient mieux."
---
