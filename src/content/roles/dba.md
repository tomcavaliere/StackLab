---
name: Administrateur de bases de données (DBA)
family: data
summary: "Garde les bases de données de l'entreprise rapides, cohérentes et toujours récupérables."
mission: "Installe et configure les moteurs, conçoit les index et aide les développeurs à écrire des requêtes efficaces, règle les transactions et les verrous, met en place la réplication et les sauvegardes, et vérifie qu'une restauration fonctionne vraiment. Son livrable : des bases qui tiennent la charge, ne perdent pas de données et repartent vite après un incident."
stack:
  - step: Parler le langage des bases
    intro: "Tout passe par SQL : lire une requête lente, la réécrire, interroger les tables système."
    techs:
      - { tech: sql, essential: true, why: "Le langage de travail quotidien : requêtes, plans d'exécution, administration." }
  - step: Connaître les moteurs
    intro: "Chaque moteur a ses outils et ses particularités ; un DBA en maîtrise un ou deux en profondeur et sait lire les autres."
    techs:
      - { tech: postgresql, essential: true, why: "Le moteur open-source le plus courant des nouveaux projets, et la cible des migrations." }
      - { tech: mysql, essential: true, why: "Très répandu dans le web, avec une réplication simple à mettre en place." }
      - { tech: oracle-database, why: "Omniprésent dans les grandes entreprises, avec ses outils de haute disponibilité et ses licences complexes." }
      - { tech: sql-server, why: "La base des environnements Microsoft, avec T-SQL, SSMS et Always On." }
      - { tech: sqlite, why: "La base embarquée, pour les tests, les outils et les applications locales." }
  - step: Rendre les requêtes rapides
    intro: "La plupart des lenteurs viennent d'un index manquant, inutilisable ou superflu : on les trouve en lisant les plans d'exécution."
    techs:
      - { tech: indexation, essential: true, why: "Choisir les bons index, lire EXPLAIN, supprimer ceux qui ne servent qu'à ralentir les écritures." }
  - step: Garantir la cohérence
    intro: "Des transactions bien découpées et un niveau d'isolation adapté évitent à la fois les données fausses et les blocages."
    techs:
      - { tech: transactions-acid, essential: true, why: "Régler l'isolation, comprendre les verrous et les interblocages, traquer les transactions trop longues." }
  - step: Assurer la disponibilité et la récupération
    intro: "Une base doit survivre à une panne (réplication) et à une erreur (sauvegarde) : ce sont deux protections différentes."
    techs:
      - { tech: replication, essential: true, why: "Répliques de secours et en lecture, bascule, surveillance du retard." }
      - { tech: sauvegarde-restauration, essential: true, why: "Sauvegardes, archivage du journal, RPO et RTO, et restaurations testées régulièrement." }
  - step: Automatiser et surveiller
    intro: "Les bases se déploient et se surveillent comme le reste de l'infrastructure."
    techs:
      - { tech: aws, why: "Les services managés (RDS) automatisent sauvegardes, répliques et mises à jour." }
      - { tech: prometheus, why: "Métriques des bases : connexions, requêtes lentes, retard de réplication." }
      - { tech: grafana, why: "Tableaux de bord et alertes sur ces métriques." }
---
