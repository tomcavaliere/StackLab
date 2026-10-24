---
# Atelier de la fiche Rust : pas d'exécution dans le navigateur ici ; le code se colle dans le Rust Playground officiel.
playground: https://play.rust-lang.org/
exercises:
  - id: match
    title: "Conditions : match sur des intervalles"
    prompt: "Écrire tranche(age) avec match : « mineur » de 0 à 17, « adulte » de 18 à 64, « senior » sinon."
    starter: |
      fn tranche(age: u32) -> &'static str {
          "?"
      }

      fn main() {
          for age in [12, 40, 70] {
              println!("{}", tranche(age));
          }
      }
    solution: |
      fn tranche(age: u32) -> &'static str {
          match age {
              0..=17 => "mineur",
              18..=64 => "adulte",
              _ => "senior",
          }
      }

      fn main() {
          for age in [12, 40, 70] {
              println!("{}", tranche(age));
          }
      }
    expected: |
      mineur
      adulte
      senior

  - id: possession
    title: "Possession et emprunt"
    prompt: "Ce code ne compile pas : afficher() prend la possession de la String, qui n'est plus utilisable ensuite. Faire emprunter la chaîne (&String ou &str) à afficher() pour pouvoir l'utiliser après."
    starter: |
      fn afficher(s: String) {
          println!("{}", s);
      }

      fn main() {
          let nom = String::from("Ada");
          afficher(nom);
          println!("longueur : {}", nom.len());
      }
    solution: |
      fn afficher(s: &str) {
          println!("{}", s);
      }

      fn main() {
          let nom = String::from("Ada");
          afficher(&nom);
          println!("longueur : {}", nom.len());
      }
    expected: |
      Ada
      longueur : 3

  - id: iterateurs
    title: "Vecteurs et itérateurs"
    prompt: "Garder les nombres pairs, les mettre au carré, collecter dans un Vec, afficher le vecteur ({:?}) puis sa somme."
    starter: |
      fn main() {
          let nombres = vec![3, 8, 1, 6, 10, 7];
          println!("{:?}", nombres);
      }
    solution: |
      fn main() {
          let nombres = vec![3, 8, 1, 6, 10, 7];
          let carres: Vec<i32> = nombres.iter().filter(|n| *n % 2 == 0).map(|n| n * n).collect();
          println!("{:?}", carres);
          println!("{}", carres.iter().sum::<i32>());
      }
    expected: |
      [64, 36, 100]
      200

  - id: result
    title: "Result et l'opérateur ?"
    prompt: "Écrire somme(a, b) qui parse deux textes en i32 avec ? pour propager l'erreur. Afficher le résultat, ou « erreur : … » pour une saisie invalide."
    starter: |
      use std::num::ParseIntError;

      fn somme(a: &str, b: &str) -> Result<i32, ParseIntError> {
          Ok(a.parse::<i32>().unwrap() + b.parse::<i32>().unwrap())
      }

      fn main() {
          for (a, b) in [("20", "22"), ("4", "x")] {
              println!("{:?}", somme(a, b));
          }
      }
    solution: |
      use std::num::ParseIntError;

      fn somme(a: &str, b: &str) -> Result<i32, ParseIntError> {
          let x: i32 = a.parse()?;
          let y: i32 = b.parse()?;
          Ok(x + y)
      }

      fn main() {
          for (a, b) in [("20", "22"), ("4", "x")] {
              match somme(a, b) {
                  Ok(n) => println!("{}", n),
                  Err(e) => println!("erreur : {}", e),
              }
          }
      }
    expected: |
      42
      erreur : invalid digit found in string

  - id: traits
    title: "Structs, enums et traits"
    prompt: "Implémenter le trait Aire pour l'enum Forme (Cercle { r }, Carre(c)), puis afficher l'aire de chaque forme avec 2 décimales ({:.2})."
    starter: |
      trait Aire {
          fn aire(&self) -> f64;
      }

      enum Forme {
          Cercle { r: f64 },
          Carre(f64),
      }

      fn main() {
          let formes = vec![Forme::Cercle { r: 1.0 }, Forme::Carre(3.0)];
          println!("{}", formes.len());
      }
    solution: |
      trait Aire {
          fn aire(&self) -> f64;
      }

      enum Forme {
          Cercle { r: f64 },
          Carre(f64),
      }

      impl Aire for Forme {
          fn aire(&self) -> f64 {
              match self {
                  Forme::Cercle { r } => std::f64::consts::PI * r * r,
                  Forme::Carre(c) => c * c,
              }
          }
      }

      fn main() {
          let formes = vec![Forme::Cercle { r: 1.0 }, Forme::Carre(3.0)];
          for f in &formes {
              println!("{:.2}", f.aire());
          }
      }
    expected: |
      3.14
      9.00

  - id: hashmap
    title: "Cas concret : compter des mots avec une HashMap"
    prompt: "Compter les mots avec entry().or_insert(0), puis afficher « mot : n » par ordre alphabétique (une HashMap n'a pas d'ordre : trier les clés, ou utiliser une BTreeMap)."
    starter: |
      use std::collections::HashMap;

      fn main() {
          let texte = "le chat et le chien et le poisson";
          let compte: HashMap<&str, usize> = HashMap::new();
          println!("{} {:?}", texte, compte);
      }
    solution: |
      use std::collections::HashMap;

      fn main() {
          let texte = "le chat et le chien et le poisson";
          let mut compte: HashMap<&str, usize> = HashMap::new();
          for mot in texte.split_whitespace() {
              *compte.entry(mot).or_insert(0) += 1;
          }
          let mut mots: Vec<_> = compte.keys().copied().collect();
          mots.sort();
          for mot in mots {
              println!("{} : {}", mot, compte[mot]);
          }
      }
    expected: |
      chat : 1
      chien : 1
      et : 2
      le : 3
      poisson : 1
---
