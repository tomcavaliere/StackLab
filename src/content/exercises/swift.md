---
# Atelier de la fiche Swift : pas d'exécution dans le navigateur ; le code se colle dans SwiftFiddle.
playground: https://swiftfiddle.com/
playgroundNote: "bac à sable communautaire, non officiel ; sur Mac, un Playground Xcode fait la même chose"
exercises:
  - id: switch
    title: "Conditions : switch sur des intervalles"
    prompt: "Écrire tranche(_:) avec un switch : « mineur » sous 18 ans, « adulte » sous 65, « senior » sinon."
    starter: |
      func tranche(_ age: Int) -> String {
          return "?"
      }

      for age in [12, 40, 70] {
          print(tranche(age))
      }
    solution: |
      func tranche(_ age: Int) -> String {
          switch age {
          case ..<18: return "mineur"
          case 18..<65: return "adulte"
          default: return "senior"
          }
      }

      for age in [12, 40, 70] {
          print(tranche(age))
      }
    expected: |
      mineur
      adulte
      senior

  - id: optionnels
    title: "Optionnels : if let, guard, ??"
    prompt: "Int(texte) renvoie un Int? (nil si le texte n'est pas un nombre). Écrire doubler(_:), qui renvoie le double, ou nil ; afficher le résultat avec ?? « invalide »."
    starter: |
      func doubler(_ texte: String) -> Int? {
          return Int(texte)! * 2
      }

      for t in ["21", "abc"] {
          print(doubler(t)!)
      }
    solution: |
      func doubler(_ texte: String) -> Int? {
          guard let n = Int(texte) else { return nil }
          return n * 2
      }

      for t in ["21", "abc"] {
          if let d = doubler(t) {
              print(d)
          } else {
              print("invalide")
          }
      }
    expected: |
      42
      invalide

  - id: collections
    title: "Tableaux et dictionnaires"
    prompt: "Compter les mots du texte dans un dictionnaire [String: Int], puis afficher « mot : n » par ordre alphabétique."
    starter: |
      let mots = "le chat et le chien et le poisson".split(separator: " ").map(String.init)
      var compte: [String: Int] = [:]
      print(compte)
    solution: |
      let mots = "le chat et le chien et le poisson".split(separator: " ").map(String.init)
      var compte: [String: Int] = [:]
      for mot in mots {
          compte[mot, default: 0] += 1
      }
      for mot in compte.keys.sorted() {
          print("\(mot) : \(compte[mot]!)")
      }
    expected: |
      chat : 1
      chien : 1
      et : 2
      le : 3
      poisson : 1

  - id: struct-ou-class
    title: "struct (valeur) ou class (référence) ?"
    prompt: "Exécuter ce code et prévoir la sortie, puis changer « struct » en « class » : qu'est-ce qui change ? La solution montre la version class."
    starter: |
      struct Point {
          var x = 0
      }

      var a = Point()
      var b = a
      b.x = 5
      print(a.x, b.x)
    solution: |
      class Point {
          var x = 0
      }

      var a = Point()
      var b = a
      b.x = 5
      print(a.x, b.x)
    expected: |
      5 5

  - id: protocole-enum
    title: "Protocoles et enums à valeurs associées"
    prompt: "Faire adopter le protocole Forme à l'enum (cas cercle(rayon:) et carre(cote:)) en implémentant aire(), puis afficher l'aire de chaque forme arrondie à 2 décimales."
    starter: |
      import Foundation

      protocol Forme {
          func aire() -> Double
      }

      enum Figure {
          case cercle(rayon: Double)
          case carre(cote: Double)
      }

      let figures: [Figure] = [.cercle(rayon: 1), .carre(cote: 3)]
      print(figures.count)
    solution: |
      import Foundation

      protocol Forme {
          func aire() -> Double
      }

      enum Figure: Forme {
          case cercle(rayon: Double)
          case carre(cote: Double)

          func aire() -> Double {
              switch self {
              case .cercle(let r): return Double.pi * r * r
              case .carre(let c): return c * c
              }
          }
      }

      let figures: [Figure] = [.cercle(rayon: 1), .carre(cote: 3)]
      for f in figures {
          print(String(format: "%.2f", f.aire()))
      }
    expected: |
      3.14
      9.00

  - id: erreurs
    title: "Cas concret : une fonction qui peut échouer (throws)"
    prompt: "retirer(_:) doit lever ErreurCompte.soldeInsuffisant si le montant dépasse le solde. Appeler avec do / try / catch et afficher « refusé » en cas d'erreur, puis le solde final."
    starter: |
      enum ErreurCompte: Error {
          case soldeInsuffisant
      }

      var solde = 100

      func retirer(_ montant: Int) {
          solde -= montant
      }

      retirer(30)
      retirer(500)
      print(solde)
    solution: |
      enum ErreurCompte: Error {
          case soldeInsuffisant
      }

      var solde = 100

      func retirer(_ montant: Int) throws {
          guard montant <= solde else { throw ErreurCompte.soldeInsuffisant }
          solde -= montant
      }

      for montant in [30, 500] {
          do {
              try retirer(montant)
          } catch {
              print("refusé")
          }
      }
      print(solde)
    expected: |
      refusé
      70
---
