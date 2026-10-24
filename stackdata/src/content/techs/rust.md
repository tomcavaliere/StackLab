---
name: Rust
kind: langage
layers: []
tags: [typage-statique, open-source]
difficulty: 3
summary: "Langage compilé aux performances proches du C, qui garantit la sûreté mémoire à la compilation, sans ramasse-miettes."
alternatives:
  - tech: go
    note: "Plus simple et bien plus rapide à apprendre, avec un ramasse-miettes : souvent suffisant pour des services réseau."
---

## Problème résolu

En C et en C++, le programmeur gère la mémoire à la main : une erreur (accès après libération, dépassement de tampon) produit des plantages et une grande partie des failles de sécurité. Les langages à ramasse-miettes (Java, Go) évitent ces erreurs, mais ajoutent un runtime et des pauses. Rust (né chez Mozilla, version 1.0 en 2015) prend une troisième voie : un système de possession et d'emprunt, vérifié par le compilateur, garantit qu'aucun accès mémoire invalide ni aucune course de données n'est possible dans le code dit « sûr ».

Le prix est une courbe d'apprentissage réelle : le compilateur refuse beaucoup de programmes tant que les règles de possession ne sont pas respectées. En retour, le code compilé est rapide et prévisible. Cargo gère build, dépendances et tests. Rust est utilisé dans Firefox, dans le noyau Linux depuis 2022, et dans l'infrastructure de grands acteurs du cloud.

## Quand l'utiliser

- Logiciel système, moteurs, bases de données, proxys : là où l'on aurait écrit du C ou du C++.
- Composants où performance et sûreté comptent ensemble : traitement de données intensif, cryptographie, calcul exécuté dans le navigateur via WebAssembly.
- Outils en ligne de commande rapides, distribués en un binaire.

## Quand l'éviter

- MVP ou application CRUD : le temps d'apprentissage et d'écriture ne se rentabilise pas.
- Service réseau classique : Go apporte l'essentiel des performances utiles, avec une prise en main bien plus rapide.
- Data science et machine learning exploratoire : Python reste la référence, même si des bibliothèques Python rapides sont écrites en Rust (Polars, par exemple).

## Syntaxe

Outils :
- **rustup** installe et met à jour les chaînes d'outils Rust (compilateur, Cargo).
- **`cargo new mon_projet`** crée un projet, `cargo run` le compile et le lance, et `cargo test` lance les tests.
- Les bibliothèques (**crates**) sont publiées sur **crates.io** et déclarées dans `Cargo.toml`.
- **Clippy** (`cargo clippy`) signale les erreurs courantes et le code non idiomatique.

Principe : les **abstractions à coût zéro**. Itérateurs, génériques et traits compilent vers un code aussi efficace que s'il avait été écrit à la main.

### Variables et types

```rust
fn main() {
    let nom = "Ada";              // immuable par défaut
    let mut age = 36;             // let mut : modifiable
    age += 1;
    let taille: f64 = 1.70;       // types : i32, u64, f64, bool, char, &str, String…
    println!("{nom} a {age} ans, {:.1} m", taille);   // println! est une macro (le !)
}
```

Une variable déclarée avec `let` n'est **pas** modifiable : il faut `let mut`. `"texte"` est un `&str`, une chaîne empruntée et figée. `String::from("texte")` ou `"texte".to_string()` crée une `String` possédée, qu'on peut faire grandir.

### Conditions, boucles, match

```rust
let tranche = if age < 18 { "mineur" } else if age < 65 { "adulte" } else { "senior" };   // if est une expression

for i in 0..3 { println!("{i}"); }          // 0, 1, 2 (0..=3 inclut 3)
for fruit in &fruits { println!("{fruit}"); }
let mut n = 0;
while n < 3 { n += 1; }
loop { break; }                              // boucle infinie, quittée par break

match age {
    0..=17 => println!("mineur"),
    18..=64 => println!("adulte"),
    _ => println!("senior"),                 // _ : tous les autres cas
}
```

Le compilateur vérifie qu'un `match` **couvre tous les cas possibles**.

### Vecteurs et HashMap

```rust
let mut fruits = vec!["pomme", "kiwi"];      // Vec : tableau dynamique
fruits.push("poire");
fruits.len();                                // 3
let pairs: Vec<i32> = vec![3, 8, 1, 6].into_iter().filter(|n| n % 2 == 0).map(|n| n * 2).collect();   // [16, 12]

use std::collections::HashMap;
let mut ages = HashMap::new();
ages.insert("ada", 36);
*ages.entry("alan").or_insert(0) += 1;       // insérer ou modifier
```

### Possession, déplacement, emprunt

Les trois règles que le compilateur vérifie :

1. Chaque valeur a **un seul propriétaire**. Quand il **sort de portée**, la mémoire est libérée automatiquement, par un appel à `drop`.
2. Une affectation **déplace** la valeur. Après `let b = a;` sur une `String`, `a` n'est plus utilisable et `b` en devient propriétaire. (Les types simples comme `i32` sont copiés, pas déplacés.)
3. On peut **emprunter** une valeur par référence. À un instant donné, on a soit **plusieurs références partagées** (`&T`, lecture seule), soit **une seule référence mutable** (`&mut T`). C'est cette règle qui exclut les courses de données.

```rust
let a = String::from("bonjour");
let b = a;                        // déplacement
// println!("{a}");               // erreur de compilation : a a été déplacée

fn longueur(s: &String) -> usize { s.len() }   // emprunt partagé : ne prend pas la possession
fn ajouter(s: &mut String) { s.push('!'); }    // emprunt mutable

let mut c = String::from("salut");
println!("{}", longueur(&c));
ajouter(&mut c);
let copie = c.clone();            // copie explicite quand on veut garder les deux
```

Les **durées de vie** (lifetimes, notées `'a`) indiquent au compilateur combien de temps une référence reste valide. Il les déduit le plus souvent, et on ne les écrit qu'en cas d'ambiguïté : `fn plus_long<'a>(x: &'a str, y: &'a str) -> &'a str`.

### Option et Result : pas de null, pas d'exceptions

```rust
fn trouver(id: u32) -> Option<String> {        // Some(valeur) ou None : pas de null
    if id == 1 { Some("Ada".to_string()) } else { None }
}
match trouver(2) {
    Some(nom) => println!("{nom}"),
    None => println!("inconnu"),
}
let nom = trouver(2).unwrap_or("inconnu".to_string());

fn lire_age(s: &str) -> Result<u32, std::num::ParseIntError> {   // Ok(valeur) ou Err(erreur)
    let n: u32 = s.trim().parse()?;            // ? : renvoie l'erreur à l'appelant si c'est un Err
    Ok(n)
}
```

- Une erreur **récupérable** se renvoie dans un `Result<T, E>`.
- L'opérateur **`?`** propage l'erreur à l'appelant si c'est un `Err`, et extrait la valeur sinon.
- **`.unwrap()`** extrait la valeur, mais provoque un **panic** (arrêt du programme) si c'est un `None` ou un `Err`. On le réserve aux tests et aux prototypes.

### Structs, enums, traits

```rust
struct Rectangle { largeur: f64, hauteur: f64 }

impl Rectangle {                               // méthodes
    fn aire(&self) -> f64 { self.largeur * self.hauteur }
}

enum Forme {                                   // chaque variante peut porter des données
    Cercle { r: f64 },
    Carre(f64),
}

trait Decrire {                                // trait : méthodes qu'un type peut implémenter
    fn decrire(&self) -> String;
}
impl Decrire for Rectangle {
    fn decrire(&self) -> String { format!("rectangle d'aire {}", self.aire()) }
}

#[derive(Debug, Clone, PartialEq)]             // implémentations générées
struct Point { x: i32, y: i32 }
```

Un **trait** est proche d'une interface. Il sert aussi de contrainte sur les génériques : `fn afficher<T: Decrire>(x: &T)`.

### Concurrence et async

```rust
use std::sync::{Arc, Mutex};
use std::thread;

let compteur = Arc::new(Mutex::new(0));        // Arc : partage entre threads ; Mutex : accès exclusif
let mut fils = vec![];
for _ in 0..4 {
    let c = Arc::clone(&compteur);
    fils.push(thread::spawn(move || *c.lock().unwrap() += 1));
}
for f in fils { f.join().unwrap(); }
```

- Pour partager une donnée **modifiable** entre threads, on utilise **`Arc<Mutex<T>>`**. Le compilateur refuse les autres partages non sûrs.
- `async`/`await` existe dans le langage, mais il faut un **runtime asynchrone** pour l'exécuter. Le plus répandu est **Tokio**.

### unsafe et WebAssembly

- Un bloc **`unsafe { … }`** autorise des opérations que le compilateur ne peut pas vérifier : déréférencer un pointeur brut, appeler du C. Le reste du code garde ses garanties.
- Rust compile vers **WebAssembly** (`wasm32-unknown-unknown`) pour s'exécuter dans un navigateur.

## Exemples concrets

**Compter les mots d'un fichier** : erreurs propagées avec `?`, HashMap, tri.

```rust
use std::collections::HashMap;
use std::fs;

fn main() -> Result<(), std::io::Error> {
    let texte = fs::read_to_string("texte.txt")?;          // erreur d'E/S renvoyée par main
    let mut compte: HashMap<&str, usize> = HashMap::new();
    for mot in texte.split_whitespace() {
        *compte.entry(mot).or_insert(0) += 1;
    }
    let mut tri: Vec<_> = compte.into_iter().collect();
    tri.sort_by(|a, b| b.1.cmp(&a.1));
    for (mot, n) in tri.iter().take(5) {
        println!("{mot} : {n}");
    }
    Ok(())
}
```

**Une API HTTP avec Axum** (sur Tokio).

```rust
use axum::{routing::get, extract::Path, Json, Router};
use serde_json::{json, Value};

async fn bonjour(Path(nom): Path<String>) -> Json<Value> {
    Json(json!({ "message": format!("Bonjour {nom}") }))
}

#[tokio::main]
async fn main() {
    let app = Router::new().route("/bonjour/{nom}", get(bonjour));
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
```

**Un outil en ligne de commande** : arguments et code de sortie.

```rust
use std::env;
use std::process::ExitCode;

fn main() -> ExitCode {
    let args: Vec<String> = env::args().skip(1).collect();
    let Some(nombre) = args.first() else {
        eprintln!("usage : carre <nombre>");
        return ExitCode::FAILURE;
    };
    match nombre.parse::<i64>() {
        Ok(n) => { println!("{}", n * n); ExitCode::SUCCESS }
        Err(e) => { eprintln!("pas un nombre : {e}"); ExitCode::FAILURE }
    }
}
```

## Pour aller plus loin

- [The Rust Programming Language (le « Book »)](https://doc.rust-lang.org/book/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
