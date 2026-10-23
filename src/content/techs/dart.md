---
name: Dart
kind: langage
layers: []
tags: [typage-statique, open-source, mobile]
difficulty: 1
summary: "Langage typé de Google, compilé en code natif ou pour le web : utilisé avant tout pour écrire des applications Flutter."
---

## Problème résolu

Dart (Google, annoncé en 2011) visait d'abord le web, comme alternative à JavaScript. Il a trouvé sa place avec Flutter, qui avait besoin d'un langage capable de deux modes : une compilation à la volée en développement, pour le rechargement à chaud, et une compilation anticipée en code natif pour des applications rapides en production. Il compile aussi vers JavaScript et WebAssembly pour le web.

Sa syntaxe est familière aux développeurs Java, C# ou JavaScript. Depuis Dart 3 (2023), la sûreté vis-à-vis de null est obligatoire : une variable ne peut contenir null que si son type le déclare.

## Quand l'utiliser

- Application Flutter : c'est son langage.
- Code partagé entre mobile, web et bureau, via Flutter.

## Quand l'éviter

- Back-end, data ou outillage : c'est possible, mais l'écosystème est bien plus réduit que celui de Go, Java ou Python.
- Développement web classique : JavaScript et TypeScript restent la norme.

## Syntaxe

Dart est **typé statiquement**, et **toute valeur est un objet**, y compris les nombres et `null`. Sa syntaxe à accolades rappelle Java, C# et JavaScript. Il reste peu utilisé hors de Flutter, ce qui restreint le vivier de développeurs à recruter. Les paquets s'installent avec **pub** (`dart pub add http`), depuis le dépôt **pub.dev**, et sont déclarés dans `pubspec.yaml`.

### Programme, variables, chaînes

```dart
void main() {                     // l'exécution commence dans main(), une fonction de premier niveau
  var nom = 'Ada';                // type déduit : String
  int age = 36;
  double taille = 1.70;
  final creeLe = DateTime.now();  // final : affectée UNE fois, à l'exécution
  const max = 10;                 // const : fixée dès la COMPILATION
  dynamic x = 3;                  // dynamic : vérification statique désactivée pour x
  x = 'texte';
  print('Bonjour $nom, ${age * 2}');   // interpolation : $variable ou ${expression}
}
```

`dart compile exe main.dart` produit un **exécutable natif autonome**. `dart run` lance le programme en mode développement, avec la compilation à la volée.

### Null-safety

Depuis Dart 3, la sûreté vis-à-vis de `null` est obligatoire : `String` ne vaut jamais `null`, `String?` le peut.

```dart
String? saisie = lireSaisie();
int longueur = saisie?.length ?? 0;   // ?. accès sûr, ?? valeur de droite si la gauche vaut null
String sure = saisie!;                // ! : affirme que ce n'est pas null, lève une erreur sinon

late String config;                   // late : sera initialisée plus tard, avant sa première lecture
config = charger();
```

### Conditions et boucles

```dart
if (age < 18) {
  print('mineur');
} else if (age < 65) {
  print('adulte');
} else {
  print('senior');
}
final statut = age >= 18 ? 'majeur' : 'mineur';

for (var i = 0; i < 3; i++) print(i);
for (final fruit in ['pomme', 'kiwi']) print(fruit);
while (age < 40) age++;
```

### Collections

```dart
final fruits = ['pomme', 'kiwi'];          // List<String>
fruits.add('poire');
fruits.length;                             // 3
final ages = {'ada': 36, 'alan': 41};      // Map<String, int>
ages['grace'] = 85;
ages['linus'];                             // null (le type de lecture est int?)
final uniques = {1, 2, 2, 3};              // Set : {1, 2, 3}
final pairs = [3, 8, 1, 6].where((n) => n.isEven).map((n) => n * 2).toList();   // [16, 12]
final liste = [1, if (admin) 2, for (final n in [3, 4]) n * 10];             // if et for dans une liste
```

### Fonctions

```dart
int carre(int x) => x * x;                         // corps en expression
String saluer(String nom, {bool poli = true}) =>   // {…} : paramètres NOMMÉS
    poli ? 'Bonjour $nom' : 'Salut $nom';
saluer('Ada', poli: false);
String presenter(String nom, [String? ville]) =>   // […] : paramètre positionnel optionnel
    ville == null ? nom : '$nom ($ville)';
```

### Classes, interfaces, mixins

```dart
class Point {
  final double x, y;
  const Point(this.x, this.y);           // this.x : affecte directement le champ
  Point.origine() : x = 0, y = 0;        // constructeur NOMMÉ
  double get norme => sqrt(x * x + y * y);   // accesseur
}

class _Cache {}                          // _ en tête : privé à la BIBLIOTHÈQUE (le fichier)

abstract class Forme { double aire(); }
class Carre implements Forme {           // toute classe définit une interface implicite
  final double c;
  Carre(this.c);
  @override
  double aire() => c * c;
}

mixin Journalise {                       // mixin : membres réutilisables dans plusieurs classes
  void log(String m) => print('[${runtimeType}] $m');
}
class Service with Journalise {}         // with : intègre le mixin
```

- Un **constructeur nommé** (`Point.origine()`) donne plusieurs constructeurs à une classe, chacun avec son nom.
- Dart n'a pas de mot-clé `interface` : **toute classe définit une interface implicite**, qu'une autre classe peut implémenter avec `implements`.
- Pas de `public` ni de `private` : un nom qui commence par `_` est **privé à sa bibliothèque**.

### Records et pattern matching (Dart 3)

```dart
(String, int) identite() => ('Ada', 36);         // record : plusieurs valeurs sans classe
final (nom, age) = identite();                   // déstructuration

String decrire(Object o) => switch (o) {         // switch expression avec motifs
  int n when n < 0 => 'entier négatif',
  int() => 'entier',
  String s => 'texte de ${s.length} caractères',
  _ => 'autre',
};
```

### Asynchrone : Future, async/await, Stream, isolates

- Un **`Future`** représente une valeur disponible plus tard, issue d'une opération asynchrone.
- **`await`**, dans une fonction `async`, attend la fin d'un `Future` sans bloquer la boucle d'événements.
- Un **`Stream`** est une suite d'événements asynchrones, reçus au fil du temps : clics, messages d'un WebSocket, lignes d'un fichier.

```dart
Future<String> chargerNom(int id) async {
  await Future.delayed(Duration(milliseconds: 100));
  return 'utilisateur $id';
}

void main() async {
  print(await chargerNom(1));
  await for (final n in Stream.fromIterable([1, 2, 3])) print(n);
}
```

Au sein d'un **isolate**, le code asynchrone s'exécute sur une **boucle d'événements à un seul thread**. Pour du vrai parallélisme, Dart lance d'autres **isolates**, qui **ne partagent pas leur mémoire** et communiquent par messages. C'est ce qu'on fait dans Flutter pour un calcul lourd, avec `Isolate.run(...)`.

## Exemples concrets

**Un widget Flutter** : l'interface décrite en Dart.

```dart
class Compteur extends StatefulWidget {
  const Compteur({super.key});
  @override
  State<Compteur> createState() => _CompteurState();
}

class _CompteurState extends State<Compteur> {
  int n = 0;
  @override
  Widget build(BuildContext context) => Column(children: [
        Text('Cliqué $n fois'),
        ElevatedButton(onPressed: () => setState(() => n++), child: const Text('+1')),
      ]);
}
```

**Appeler une API JSON** (paquet `http` de pub.dev).

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

Future<List<String>> depots(String utilisateur) async {
  final r = await http.get(Uri.parse('https://api.github.com/users/$utilisateur/repos'));
  if (r.statusCode != 200) throw Exception('HTTP ${r.statusCode}');
  final data = jsonDecode(r.body) as List<dynamic>;
  return [for (final d in data) d['name'] as String];
}
```

**Regrouper des données** avec les collections.

```dart
final ventes = [('Lyon', 120), ('Paris', 80), ('Lyon', 60)];
final parVille = <String, int>{};
for (final (ville, montant) in ventes) {
  parVille[ville] = (parVille[ville] ?? 0) + montant;
}
print(parVille);   // {Lyon: 180, Paris: 80}
```

## Pour aller plus loin

- [Visite du langage](https://dart.dev/language)
- [Sûreté vis-à-vis de null](https://dart.dev/null-safety)
