---
# Atelier de la fiche Dart : pas d'exécution dans le navigateur ici ; le code se colle dans DartPad, le bac à sable officiel.
playground: https://dartpad.dev/
exercises:
  - id: boucle-conditions
    title: "Boucle et conditions"
    prompt: "Afficher, pour i de 1 à 5, « i : pair » ou « i : impair ». Indice : i.isEven."
    starter: |
      void main() {
        for (var i = 1; i <= 5; i++) {
          print(i);
        }
      }
    solution: |
      void main() {
        for (var i = 1; i <= 5; i++) {
          print('$i : ${i.isEven ? 'pair' : 'impair'}');
        }
      }
    expected: |
      1 : impair
      2 : pair
      3 : impair
      4 : pair
      5 : impair

  - id: null-safety
    title: "Null-safety : ?. et ??"
    prompt: "Afficher la longueur de chaque saisie, ou 0 quand elle vaut null, sans utiliser !."
    starter: |
      void main() {
        final List<String?> saisies = ['Ada', null, 'Grace'];
        for (final s in saisies) {
          print(s!.length);
        }
      }
    solution: |
      void main() {
        final List<String?> saisies = ['Ada', null, 'Grace'];
        for (final s in saisies) {
          print(s?.length ?? 0);
        }
      }
    expected: |
      3
      0
      5

  - id: collections
    title: "Collections : where, map, Map"
    prompt: "Garder les nombres pairs, les mettre au carré et afficher la liste ; puis compter les mots du texte dans une Map et afficher « mot : n » par ordre alphabétique."
    starter: |
      void main() {
        final nombres = [3, 8, 1, 6, 10, 7];
        print(nombres);
        final mots = 'le chat et le chien et le poisson'.split(' ');
        final compte = <String, int>{};
        print(compte);
      }
    solution: |
      void main() {
        final nombres = [3, 8, 1, 6, 10, 7];
        print(nombres.where((n) => n.isEven).map((n) => n * n).toList());
        final mots = 'le chat et le chien et le poisson'.split(' ');
        final compte = <String, int>{};
        for (final m in mots) {
          compte[m] = (compte[m] ?? 0) + 1;
        }
        for (final m in compte.keys.toList()..sort()) {
          print('$m : ${compte[m]}');
        }
      }
    expected: |
      [64, 36, 100]
      chat : 1
      chien : 1
      et : 2
      le : 3
      poisson : 1

  - id: classes
    title: "Classes : constructeur nommé et interface implicite"
    prompt: "Ajouter à Point un constructeur nommé Point.origine() (x = 0, y = 0), puis une classe Carre qui implémente Forme (interface implicite d'une classe abstraite). Afficher l'origine et l'aire d'un carré de côté 3 avec toStringAsFixed(2) : sur le web, Dart affiche 9.0 comme 9."
    starter: |
      abstract class Forme {
        double aire();
      }

      class Point {
        final int x, y;
        const Point(this.x, this.y);
        @override
        String toString() => '($x, $y)';
      }

      void main() {
        print(Point(2, 3));
      }
    solution: |
      abstract class Forme {
        double aire();
      }

      class Point {
        final int x, y;
        const Point(this.x, this.y);
        Point.origine()
            : x = 0,
              y = 0;
        @override
        String toString() => '($x, $y)';
      }

      class Carre implements Forme {
        final double c;
        Carre(this.c);
        @override
        double aire() => c * c;
      }

      void main() {
        print(Point(2, 3));
        print(Point.origine());
        print(Carre(3).aire().toStringAsFixed(2));
      }
    expected: |
      (2, 3)
      (0, 0)
      9.00

  - id: async
    title: "Asynchrone : Future et await"
    prompt: "charger(id) renvoie un Future. Lancer les trois chargements en parallèle avec Future.wait, puis afficher la liste des résultats et « fini »."
    starter: |
      Future<String> charger(int id) async {
        await Future.delayed(Duration(milliseconds: 100 * (4 - id)));
        return 'user $id';
      }

      void main() async {
        print(await charger(1));
      }
    solution: |
      Future<String> charger(int id) async {
        await Future.delayed(Duration(milliseconds: 100 * (4 - id)));
        return 'user $id';
      }

      void main() async {
        final resultats = await Future.wait([charger(1), charger(2), charger(3)]);
        print(resultats);
        print('fini');
      }
    expected: |
      [user 1, user 2, user 3]
      fini

  - id: records
    title: "Cas concret : records et pattern matching (Dart 3)"
    prompt: "Totaliser les ventes par ville en déstructurant chaque record (ville, montant), puis afficher « ville : total » par total décroissant."
    starter: |
      void main() {
        final ventes = [('Lyon', 120), ('Paris', 80), ('Lyon', 60), ('Lille', 200), ('Paris', 90)];
        print(ventes.length);
      }
    solution: |
      void main() {
        final ventes = [('Lyon', 120), ('Paris', 80), ('Lyon', 60), ('Lille', 200), ('Paris', 90)];
        final totaux = <String, int>{};
        for (final (ville, montant) in ventes) {
          totaux[ville] = (totaux[ville] ?? 0) + montant;
        }
        final tri = totaux.entries.toList()..sort((a, b) => b.value.compareTo(a.value));
        for (final e in tri) {
          print('${e.key} : ${e.value}');
        }
      }
    expected: |
      Lille : 200
      Lyon : 180
      Paris : 170
---
