---
name: Swift
kind: langage
layers: []
tags: [typage-statique, open-source, mobile]
difficulty: 2
summary: "Le langage d'Apple pour iOS, macOS et ses autres plateformes : typé, compilé, avec SwiftUI pour décrire l'interface."
alternatives:
  - tech: react-native
    note: "Une seule application pour iOS et Android, en React, au prix d'un accès moins direct aux API natives."
---

## Problème résolu

Pendant des décennies, les applications Apple s'écrivaient en Objective-C, un langage ancien, à la syntaxe déroutante et peu protecteur. Swift (Apple, 2014) le remplace : typage statique, inférence de types, optionnels qui obligent à traiter explicitement l'absence de valeur, et gestion automatique de la mémoire par comptage de références (ARC), sans ramasse-miettes. Il reste interopérable avec le code Objective-C existant.

SwiftUI (2019) décrit l'interface de façon déclarative, un peu à la manière de React. Swift est open-source depuis 2015 et tourne aussi sous Linux, mais son usage reste très concentré sur les plateformes Apple.

## Quand l'utiliser

- Application iOS ou macOS native : c'est le langage de référence, avec un accès immédiat aux nouvelles API d'Apple.
- Application où l'expérience native et la performance sur iPhone priment (graphismes, caméra, capteurs).

## Quand l'éviter

- Application attendue aussi sur Android : il faudra une seconde application en Kotlin, ou un framework multiplateforme (React Native, Flutter).
- Petite équipe qui doit livrer vite sur les deux plateformes.
- Back-end : possible (Vapor), mais l'écosystème est réduit par rapport à Go, Java ou Node.js.

## Syntaxe

Swift a été lancé chez Apple par **Chris Lattner**, également créateur de LLVM. Le code d'une application iPhone est **compilé à l'avance** en code machine natif, via LLVM. On le développe dans **Xcode**, l'IDE d'Apple. Les **Playgrounds** (dans Xcode, ou l'app Swift Playgrounds) permettent de tester du code et de voir le résultat immédiatement. Les dépendances passent par **Swift Package Manager**, le gestionnaire officiel.

### Variables et types

```swift
let nom = "Ada"              // let : constante
var age = 36                 // var : variable modifiable
age += 1
let n = 42                   // type déduit : Int (inférence)
let taille: Double = 1.70    // type explicite
print("Bonjour \(nom), \(age) ans")   // interpolation : \(expression)
```

On préfère `let`, et le compilateur signale une `var` jamais modifiée.

### Optionnels

Un `String?` peut contenir une chaîne **ou `nil`**. Un `String` ne vaut jamais `nil`. Le compilateur oblige à traiter l'absence de valeur avant d'utiliser un optionnel.

```swift
let saisie: String? = lireSaisie()

if let texte = saisie {               // déballe : le bloc ne s'exécute que s'il y a une valeur
    print(texte.count)
}

func traiter(_ saisie: String?) {
    guard let texte = saisie else {   // guard : sortir TÔT si la condition n'est pas remplie
        return
    }
    print(texte)                      // ici, texte est un String (non optionnel)
}

let longueur = saisie?.count ?? 0     // ?. chaînage optionnel, ?? valeur par défaut
let forcee = saisie!                  // déballage forcé : PLANTE à l'exécution si nil
```

### Conditions et switch

```swift
if age < 18 {
    print("mineur")
} else if age < 65 {
    print("adulte")
} else {
    print("senior")
}

switch age {
case 0..<18: print("mineur")          // intervalle semi-ouvert
case 18..<65: print("adulte")
default: print("senior")              // pas de break : pas de chute au cas suivant
}
```

Le compilateur vérifie qu'un `switch` est **exhaustif** : tous les cas possibles doivent être traités, ou couverts par `default`.

### Boucles et collections

```swift
for i in 0..<3 { print(i) }           // 0, 1, 2 ; 1...3 inclut 3
for (i, fruit) in fruits.enumerated() { print(i, fruit) }
while age < 40 { age += 1 }

var fruits = ["pomme", "kiwi"]        // tableau [String] ; var pour pouvoir le modifier
fruits.append("poire")
fruits.count                          // 3
var ages = ["ada": 36, "alan": 41]    // dictionnaire [String: Int]
ages["grace"] = 85
ages["linus"]                         // nil : la lecture renvoie un optionnel
let pairs = [3, 8, 1, 6].filter { $0 % 2 == 0 }.map { $0 * 2 }   // [16, 12] ; $0 = premier argument
```

### Fonctions et closures

```swift
func saluer(_ nom: String, poli: Bool = true) -> String {   // _ : pas d'étiquette à l'appel
    poli ? "Bonjour \(nom)" : "Salut \(nom)"
}
saluer("Ada", poli: false)

let carre = { (x: Int) -> Int in x * x }   // closure
```

Une **closure** est un bloc de code qui capture les variables de son contexte, comme les blocs de Ruby ou les fonctions fléchées de JavaScript.

### Struct, class, enum, protocole

```swift
struct Point {                        // struct : type VALEUR (copiée à l'affectation)
    var x: Double, y: Double
}
var a = Point(x: 0, y: 0)
var b = a                             // copie
b.x = 5                               // a.x vaut toujours 0

class Compte {                        // class : type RÉFÉRENCE (partagé)
    var solde = 0.0
    func deposer(_ m: Double) { solde += m }
}

enum Resultat {                       // chaque cas peut porter ses propres valeurs associées
    case succes(donnees: [String])
    case erreur(code: Int, message: String)
}
switch r {
case .succes(let donnees): print(donnees)
case .erreur(let code, _): print("erreur \(code)")
}

protocol Forme {                      // protocole : exigences qu'un type s'engage à fournir
    func aire() -> Double
}
struct Carre: Forme {
    let cote: Double
    func aire() -> Double { cote * cote }
}
```

### Erreurs

```swift
enum ErreurRetrait: Error { case soldeInsuffisant }

func retirer(_ m: Double, de solde: Double) throws -> Double {   // throws : peut échouer
    guard m <= solde else { throw ErreurRetrait.soldeInsuffisant }
    return solde - m
}

do {
    let reste = try retirer(500, de: 100)   // try à l'appel
    print(reste)
} catch {
    print("échec : \(error)")
}
```

### Mémoire : ARC et cycles

L'**ARC** (comptage automatique de références) libère un objet quand plus rien ne le référence. Mais il ne résout pas seul les **cycles de références fortes** : A garde B, B garde A, et aucun des deux n'est libéré. On casse le cycle avec une référence **`weak`** (optionnelle, mise à `nil` quand l'objet disparaît) ou **`unowned`** :

```swift
class Employe {
    weak var manager: Manager?        // ne retient pas le manager
}
```

### Concurrence : async/await et acteurs

Swift 5.5 (2021) a introduit **async/await** et les **acteurs**. Un `actor` est un type qui protège son état des accès concurrents simultanés : un seul appelant à la fois modifie ses propriétés.

```swift
actor Compteur {
    private var valeur = 0
    func incrementer() -> Int { valeur += 1; return valeur }
}

func charger() async throws -> Data {
    let (data, _) = try await URLSession.shared.data(from: URL(string: "https://exemple.fr")!)
    return data
}
```

### Interfaces : UIKit et SwiftUI

Avant SwiftUI (2019), on construisait les interfaces iOS avec **UIKit**, de façon impérative (contrôleurs, vues, délégués). UIKit reste très présent dans les applications existantes.

## Exemples concrets

**Un écran SwiftUI** : une liste filtrable, décrite de façon déclarative.

```swift
import SwiftUI

struct ListeFruits: View {
    @State private var recherche = ""                 // état local : l'écran se redessine quand il change
    let fruits = ["Pomme", "Kiwi", "Poire", "Prune"]

    var body: some View {
        NavigationStack {
            List(fruits.filter { recherche.isEmpty || $0.contains(recherche) }, id: \.self) { fruit in
                Text(fruit)
            }
            .searchable(text: $recherche)
            .navigationTitle("Fruits")
        }
    }
}
```

**Décoder une réponse JSON** avec `Codable`.

```swift
struct Depot: Codable {
    let name: String
    let stargazersCount: Int
}

let decodeur = JSONDecoder()
decodeur.keyDecodingStrategy = .convertFromSnakeCase      // stargazers_count → stargazersCount
let (data, _) = try await URLSession.shared.data(from: URL(string: "https://api.github.com/users/apple/repos")!)
let depots = try decodeur.decode([Depot].self, from: data)
print(depots.sorted { $0.stargazersCount > $1.stargazersCount }.prefix(3).map(\.name))
```

**Valider une saisie avec guard et throws.**

```swift
enum ErreurSaisie: Error { case vide, tropCourte(min: Int) }

func validerMotDePasse(_ mdp: String?) throws -> String {
    guard let mdp, !mdp.isEmpty else { throw ErreurSaisie.vide }
    guard mdp.count >= 12 else { throw ErreurSaisie.tropCourte(min: 12) }
    return mdp
}
```

## Pour aller plus loin

- [The Swift Programming Language](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/)
- [Tutoriels SwiftUI (Apple)](https://developer.apple.com/tutorials/swiftui)
