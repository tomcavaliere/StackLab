---
# Atelier de la fiche SQL : exécuté dans le navigateur (SQLite, via sql.js), sur une base neuve à chaque exécution.
exercises:
  - id: filtrer-trier
    title: "Filtrer et trier"
    prompt: "Afficher le nom et l'âge des clients de Lyon, du plus âgé au plus jeune."
    setup: &tables |
      CREATE TABLE clients (id INTEGER PRIMARY KEY, nom TEXT NOT NULL, ville TEXT, age INTEGER, telephone TEXT);
      CREATE TABLE commandes (id INTEGER PRIMARY KEY, client_id INTEGER NOT NULL REFERENCES clients(id), date_commande TEXT, montant NUMERIC);
      INSERT INTO clients VALUES
        (1, 'Alice', 'Lyon', 34, '0601'),
        (2, 'Bruno', 'Paris', 17, NULL),
        (3, 'Chloé', 'Lyon', 52, NULL),
        (4, 'David', 'Marseille', 70, '0604'),
        (5, 'Emma', 'Lyon', 25, '0605');
      INSERT INTO commandes VALUES
        (1, 1, '2026-01-10', 120),
        (2, 1, '2026-02-03', 80),
        (3, 3, '2026-01-21', 200),
        (4, 4, '2026-03-02', 45),
        (5, 1, '2026-03-15', 60),
        (6, 4, '2026-03-20', 300);
    starter: |
      SELECT nom, age
      FROM clients;
    solution: |
      SELECT nom, age
      FROM clients
      WHERE ville = 'Lyon'
      ORDER BY age DESC;
    expected: |
      nom | age
      Chloé | 52
      Alice | 34
      Emma | 25

  - id: tranches-age
    title: "Une valeur selon une condition : CASE"
    prompt: "Pour chaque client (par id), afficher son nom et sa tranche : « mineur » sous 18 ans, « senior » à partir de 65, « adulte » sinon. Nommer la colonne tranche."
    setup: *tables
    starter: |
      SELECT nom
      FROM clients
      ORDER BY id;
    solution: |
      SELECT nom,
             CASE WHEN age < 18 THEN 'mineur'
                  WHEN age >= 65 THEN 'senior'
                  ELSE 'adulte'
             END AS tranche
      FROM clients
      ORDER BY id;
    expected: |
      nom | tranche
      Alice | adulte
      Bruno | mineur
      Chloé | adulte
      David | senior
      Emma | adulte

  - id: sans-telephone
    title: "NULL et COALESCE"
    prompt: "Afficher le nom et le téléphone de chaque client (par id), en écrivant « inconnu » quand le téléphone est absent. Nommer la colonne contact."
    setup: *tables
    starter: |
      SELECT nom, telephone AS contact
      FROM clients
      ORDER BY id;
    solution: |
      SELECT nom, COALESCE(telephone, 'inconnu') AS contact
      FROM clients
      ORDER BY id;
    expected: |
      nom | contact
      Alice | 0601
      Bruno | inconnu
      Chloé | inconnu
      David | 0604
      Emma | 0605

  - id: ca-par-client
    title: "Agréger : GROUP BY et HAVING"
    prompt: "Pour chaque client ayant passé au moins 2 commandes, afficher son client_id, son nombre de commandes (nb) et le total de ses montants (total), par total décroissant."
    setup: *tables
    starter: |
      SELECT client_id, montant
      FROM commandes;
    solution: |
      SELECT client_id, COUNT(*) AS nb, SUM(montant) AS total
      FROM commandes
      GROUP BY client_id
      HAVING COUNT(*) >= 2
      ORDER BY total DESC;
    expected: |
      client_id | nb | total
      4 | 2 | 345
      1 | 3 | 260

  - id: clients-sans-commande
    title: "Jointure : les clients sans commande"
    prompt: "Afficher le nom des clients qui n'ont passé aucune commande, par ordre alphabétique. Indice : LEFT JOIN, puis garder les lignes où la commande est NULL."
    setup: *tables
    starter: |
      SELECT c.nom
      FROM clients c
      JOIN commandes co ON co.client_id = c.id;
    solution: |
      SELECT c.nom
      FROM clients c
      LEFT JOIN commandes co ON co.client_id = c.id
      WHERE co.id IS NULL
      ORDER BY c.nom;
    expected: |
      nom
      Bruno
      Emma

  - id: derniere-commande
    title: "Cas concret : la dernière commande de chaque client"
    prompt: "Pour chaque client qui a commandé, afficher son nom, la date et le montant de sa commande la plus récente, par nom. Indice : ROW_NUMBER() OVER (PARTITION BY … ORDER BY … DESC) dans une CTE."
    setup: *tables
    starter: |
      WITH classees AS (
        SELECT *
        FROM commandes
      )
      SELECT * FROM classees;
    solution: |
      WITH classees AS (
        SELECT co.*, ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY date_commande DESC) AS rang
        FROM commandes co
      )
      SELECT c.nom, cl.date_commande, cl.montant
      FROM classees cl
      JOIN clients c ON c.id = cl.client_id
      WHERE cl.rang = 1
      ORDER BY c.nom;
    expected: |
      nom | date_commande | montant
      Alice | 2026-03-15 | 60
      Chloé | 2026-01-21 | 200
      David | 2026-03-20 | 300
---
