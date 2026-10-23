---
# Atelier de la fiche JavaScript : exécuté dans le navigateur (worker). console.log = la sortie ; tableaux et objets s'affichent en JSON.
exercises:
  - id: boucle-conditions
    title: "Boucle et conditions"
    prompt: "Pour i de 1 à 6, afficher « i est pair » ou « i est impair », un par ligne."
    starter: |
      for (let i = 1; i <= 6; i++) {
        console.log(i);
      }
    solution: |
      for (let i = 1; i <= 6; i++) {
        console.log(`${i} est ${i % 2 === 0 ? "pair" : "impair"}`);
      }
    expected: |
      1 est impair
      2 est pair
      3 est impair
      4 est pair
      5 est impair
      6 est pair

  - id: map-filter-reduce
    title: "Tableaux : map, filter, reduce"
    prompt: "À partir de prix (en euros HT), afficher le tableau des prix TTC (× 1.2) des articles à plus de 10 € HT, puis leur somme."
    starter: |
      const prix = [5, 20, 12.5, 8, 50];
      const ttc = prix;
      console.log(ttc);
    solution: |
      const prix = [5, 20, 12.5, 8, 50];
      const ttc = prix.filter((p) => p > 10).map((p) => p * 1.2);
      console.log(ttc);
      console.log(ttc.reduce((s, p) => s + p, 0));
    expected: |
      [24,15,60]
      99

  - id: valeur-par-defaut
    title: "Valeurs par défaut : || ou ?? ?"
    prompt: "La fonction doit remplacer seulement une quantité absente (null ou undefined) par 1 : une quantité 0 doit rester 0. Corriger la fonction."
    starter: |
      function quantite(q) {
        return q || 1;
      }
      console.log(quantite(undefined), quantite(null), quantite(0), quantite(5));
    solution: |
      function quantite(q) {
        return q ?? 1;
      }
      console.log(quantite(undefined), quantite(null), quantite(0), quantite(5));
    expected: |
      1 1 0 5

  - id: fermeture
    title: "Fonctions : une fermeture"
    prompt: "Écrire creerCompteur(depart) qui renvoie une fonction : chaque appel renvoie la valeur suivante (depart + 1, depart + 2…). Deux compteurs doivent être indépendants."
    starter: |
      function creerCompteur(depart) {
        return () => depart;
      }
      const a = creerCompteur(0);
      const b = creerCompteur(10);
      console.log(a(), a(), b(), a());
    solution: |
      function creerCompteur(depart) {
        let n = depart;
        return () => ++n;
      }
      const a = creerCompteur(0);
      const b = creerCompteur(10);
      console.log(a(), a(), b(), a());
    expected: |
      1 2 11 3

  - id: classes
    title: "Classes et héritage"
    prompt: "Compléter la classe Carre, qui hérite de Rectangle : son constructeur ne prend qu'un côté. Afficher l'aire et la description des deux formes."
    starter: |
      class Rectangle {
        constructor(largeur, hauteur) {
          this.largeur = largeur;
          this.hauteur = hauteur;
        }
        aire() {
          return this.largeur * this.hauteur;
        }
        decrire() {
          return `${this.constructor.name} d'aire ${this.aire()}`;
        }
      }

      class Carre extends Rectangle {}

      console.log(new Rectangle(2, 5).decrire());
      console.log(new Carre(3).decrire());
    solution: |
      class Rectangle {
        constructor(largeur, hauteur) {
          this.largeur = largeur;
          this.hauteur = hauteur;
        }
        aire() {
          return this.largeur * this.hauteur;
        }
        decrire() {
          return `${this.constructor.name} d'aire ${this.aire()}`;
        }
      }

      class Carre extends Rectangle {
        constructor(cote) {
          super(cote, cote);
        }
      }

      console.log(new Rectangle(2, 5).decrire());
      console.log(new Carre(3).decrire());
    expected: |
      Rectangle d'aire 10
      Carre d'aire 9

  - id: async-await
    title: "Asynchrone : Promise et async/await"
    prompt: "attendre(ms, valeur) renvoie une Promise résolue après ms millisecondes. Lancer les trois chargements EN PARALLÈLE avec Promise.all, puis afficher le tableau des résultats et « fini »."
    starter: |
      const attendre = (ms, valeur) => new Promise((ok) => setTimeout(() => ok(valeur), ms));

      const resultats = [await attendre(300, "a")];
      console.log(resultats);
    solution: |
      const attendre = (ms, valeur) => new Promise((ok) => setTimeout(() => ok(valeur), ms));

      const resultats = await Promise.all([attendre(300, "a"), attendre(100, "b"), attendre(200, "c")]);
      console.log(resultats);
      console.log("fini");
    expected: |
      ["a","b","c"]
      fini

  - id: regrouper
    title: "Cas concret : regrouper des commandes"
    prompt: "Calculer le total des commandes par client avec reduce, puis afficher « client : total » par total décroissant."
    starter: |
      const commandes = [
        { client: "Ada", montant: 40 },
        { client: "Alan", montant: 25 },
        { client: "Ada", montant: 15 },
        { client: "Grace", montant: 70 },
        { client: "Alan", montant: 50 },
      ];
    solution: |
      const commandes = [
        { client: "Ada", montant: 40 },
        { client: "Alan", montant: 25 },
        { client: "Ada", montant: 15 },
        { client: "Grace", montant: 70 },
        { client: "Alan", montant: 50 },
      ];
      const totaux = commandes.reduce((acc, c) => {
        acc[c.client] = (acc[c.client] ?? 0) + c.montant;
        return acc;
      }, {});
      for (const [client, total] of Object.entries(totaux).sort((a, b) => b[1] - a[1])) {
        console.log(`${client} : ${total}`);
      }
    expected: |
      Alan : 75
      Grace : 70
      Ada : 55
---
