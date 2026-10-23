---
# Atelier de la fiche TypeScript : types retirés (sucrase) puis exécuté comme du JavaScript, SANS vérification des types.
# Les exercices portent donc sur la sortie ; écrire des types justes reste l'objectif, comme si tsc les vérifiait.
exercises:
  - id: retrecissement
    title: "Union et rétrécissement"
    prompt: "formater(x: string | number) renvoie la chaîne en majuscules, ou le nombre avec 2 décimales. Tester le type avec typeof."
    starter: |
      function formater(x: string | number): string {
        return String(x);
      }
      console.log(formater("ada"));
      console.log(formater(3.14159));
    solution: |
      function formater(x: string | number): string {
        if (typeof x === "string") {
          return x.toUpperCase();
        }
        return x.toFixed(2);
      }
      console.log(formater("ada"));
      console.log(formater(3.14159));
    expected: |
      ADA
      3.14

  - id: interface
    title: "Interfaces et propriétés optionnelles"
    prompt: "Écrire presenter(u: User), qui renvoie « nom <email> » si l'email est présent et « nom (pas d'email) » sinon."
    starter: |
      interface User {
        nom: string;
        email?: string;
      }

      function presenter(u: User): string {
        return u.nom;
      }

      console.log(presenter({ nom: "Ada", email: "ada@exemple.fr" }));
      console.log(presenter({ nom: "Alan" }));
    solution: |
      interface User {
        nom: string;
        email?: string;
      }

      function presenter(u: User): string {
        return u.email ? `${u.nom} <${u.email}>` : `${u.nom} (pas d'email)`;
      }

      console.log(presenter({ nom: "Ada", email: "ada@exemple.fr" }));
      console.log(presenter({ nom: "Alan" }));
    expected: |
      Ada <ada@exemple.fr>
      Alan (pas d'email)

  - id: generique
    title: "Génériques"
    prompt: "Écrire dernier<T>(items: T[]): T | undefined, qui renvoie le dernier élément (undefined pour un tableau vide)."
    starter: |
      function dernier<T>(items: T[]): T | undefined {
        return items[0];
      }
      console.log(dernier([1, 2, 3]));
      console.log(dernier(["a", "b"]));
      console.log(dernier([]));
    solution: |
      function dernier<T>(items: T[]): T | undefined {
        return items[items.length - 1];
      }
      console.log(dernier([1, 2, 3]));
      console.log(dernier(["a", "b"]));
      console.log(dernier([]));
    expected: |
      3
      b
      undefined

  - id: union-discriminee
    title: "Union discriminée"
    prompt: "Compléter aire(f) pour le carré (côté c) et le rectangle (l × h), en testant f.kind. Arrondir à 2 décimales à l'affichage."
    starter: |
      type Forme =
        | { kind: "cercle"; r: number }
        | { kind: "carre"; c: number }
        | { kind: "rectangle"; l: number; h: number };

      function aire(f: Forme): number {
        switch (f.kind) {
          case "cercle":
            return Math.PI * f.r ** 2;
          default:
            return 0;
        }
      }

      const formes: Forme[] = [{ kind: "cercle", r: 1 }, { kind: "carre", c: 3 }, { kind: "rectangle", l: 2, h: 5 }];
      for (const f of formes) console.log(f.kind, aire(f).toFixed(2));
    solution: |
      type Forme =
        | { kind: "cercle"; r: number }
        | { kind: "carre"; c: number }
        | { kind: "rectangle"; l: number; h: number };

      function aire(f: Forme): number {
        switch (f.kind) {
          case "cercle":
            return Math.PI * f.r ** 2;
          case "carre":
            return f.c ** 2;
          case "rectangle":
            return f.l * f.h;
          default: {
            const jamais: never = f;
            return jamais;
          }
        }
      }

      const formes: Forme[] = [{ kind: "cercle", r: 1 }, { kind: "carre", c: 3 }, { kind: "rectangle", l: 2, h: 5 }];
      for (const f of formes) console.log(f.kind, aire(f).toFixed(2));
    expected: |
      cercle 3.14
      carre 9.00
      rectangle 10.00

  - id: partial
    title: "Types utilitaires : Partial"
    prompt: "Écrire modifier(u: User, changements: Partial<User>): User, qui renvoie une copie de u avec les changements appliqués, sans modifier u."
    starter: |
      interface User {
        nom: string;
        ville: string;
        age: number;
      }

      function modifier(u: User, changements: Partial<User>): User {
        return u;
      }

      const ada: User = { nom: "Ada", ville: "Londres", age: 36 };
      const plusVieille = modifier(ada, { age: 37 });
      console.log(plusVieille);
      console.log(ada.age);
    solution: |
      interface User {
        nom: string;
        ville: string;
        age: number;
      }

      function modifier(u: User, changements: Partial<User>): User {
        return { ...u, ...changements };
      }

      const ada: User = { nom: "Ada", ville: "Londres", age: 36 };
      const plusVieille = modifier(ada, { age: 37 });
      console.log(plusVieille);
      console.log(ada.age);
    expected: |
      {"nom":"Ada","ville":"Londres","age":37}
      36

  - id: etats
    title: "Cas concret : les états d'un chargement"
    prompt: "Écrire rendu(e: Etat) : « Chargement… », la liste des données séparées par des virgules, ou « Erreur : message »."
    starter: |
      type Etat =
        | { statut: "chargement" }
        | { statut: "succes"; donnees: string[] }
        | { statut: "erreur"; message: string };

      function rendu(e: Etat): string {
        return e.statut;
      }

      const etats: Etat[] = [
        { statut: "chargement" },
        { statut: "succes", donnees: ["Ada", "Alan", "Grace"] },
        { statut: "erreur", message: "HTTP 500" },
      ];
      etats.forEach((e) => console.log(rendu(e)));
    solution: |
      type Etat =
        | { statut: "chargement" }
        | { statut: "succes"; donnees: string[] }
        | { statut: "erreur"; message: string };

      function rendu(e: Etat): string {
        switch (e.statut) {
          case "chargement":
            return "Chargement…";
          case "succes":
            return e.donnees.join(", ");
          case "erreur":
            return `Erreur : ${e.message}`;
        }
      }

      const etats: Etat[] = [
        { statut: "chargement" },
        { statut: "succes", donnees: ["Ada", "Alan", "Grace"] },
        { statut: "erreur", message: "HTTP 500" },
      ];
      etats.forEach((e) => console.log(rendu(e)));
    expected: |
      Chargement…
      Ada, Alan, Grace
      Erreur : HTTP 500
---
