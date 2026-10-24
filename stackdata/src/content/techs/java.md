---
name: Java
kind: langage
layers: []
tags: [typage-statique, jvm, open-source]
difficulty: 2
summary: "Langage typé statiquement, compilé vers le bytecode de la JVM : pilier des back-ends d'entreprise et d'une grande partie de l'outillage big data."
---

## Problème résolu

Java (Sun, 1995, aujourd'hui Oracle) compile vers un bytecode exécuté par la machine virtuelle Java (JVM). Le même programme tourne sur tout système qui a une JVM. La JVM compile à la volée le code le plus utilisé (JIT) et gère la mémoire par ramasse-miettes : les performances sont élevées, sans gestion manuelle de la mémoire.

Le typage statique et un outillage très mûr (IDE, profilage, refactoring) rendent les grosses bases de code maintenables par de grandes équipes. Une grande partie de l'écosystème data tourne sur la JVM : Kafka, Hadoop et Spark (écrit en Scala) notamment. Depuis Java 21, les threads virtuels permettent de gérer de très nombreuses tâches concurrentes avec un code bloquant classique.

## Quand l'utiliser

- Back-end d'entreprise à longue durée de vie, grande équipe, besoin de stabilité (versions LTS maintenues sur plusieurs années).
- Services à fort trafic, avec Spring Boot par exemple.
- Écosystème JVM imposé : extensions Kafka, jobs Spark, Android historique.

## Quand l'éviter

- MVP à livrer très vite par une petite équipe : le code est plus verbeux qu'en Python ou en Ruby.
- Fonctions à démarrage très fréquent (serverless) : la JVM démarre plus lentement qu'un binaire Go, sauf compilation native avec GraalVM.
- Équipe sans culture JVM : Kotlin, plus concis, tourne sur la même JVM.

## Syntaxe

- **JDK et JRE** : le JDK (Java Development Kit) contient de quoi exécuter du Java, plus le compilateur `javac` et les outils de développement.
- **OpenJDK** est l'implémentation open source de référence. Les distributions courantes, comme Temurin ou celle d'Oracle, en sont issues.
- **Versions** : une nouvelle version sort tous les six mois depuis 2018, et certaines sont des LTS maintenues plusieurs années (17, 21, 25).
- **Build** : Maven (`pom.xml`) et Gradle (`build.gradle`) gèrent la compilation et les dépendances.
- **Écosystème** : Spring Boot domine le développement de back-ends. Java a aussi été le langage historique d'Android, avant que Google ne recommande Kotlin.

### Programme minimal

```java
public class Main {
    public static void main(String[] args) {      // point d'entrée
        System.out.println("Bonjour");
    }
}
```

Tout code vit dans une classe. `javac Main.java` compile en bytecode (`Main.class`) et `java Main` l'exécute sur la JVM. Depuis Java 11, `java Main.java` fait les deux d'un coup.

### Variables et types

```java
int age = 36;                    // types primitifs : int, long, double, boolean, char…
double taille = 1.70;
boolean actif = true;
String nom = "Ada";              // objet
var ville = "Londres";           // Java 10+ : type déduit (String), qui reste typé statiquement
final int MAX = 10;              // final : affecté une seule fois
```

- `int` est un **type primitif** (une valeur brute). `Integer` est un **objet** qui l'enveloppe. Il en faut un dans les collections (`List<Integer>`), et il peut valoir `null`.
- Accéder à un membre d'une référence qui vaut `null` lève une **`NullPointerException`**.

### Conditions et chaînes

```java
if (age < 18) {
    System.out.println("mineur");
} else if (age < 65) {
    System.out.println("adulte");
} else {
    System.out.println("senior");
}

String tranche = switch (age / 10) {            // switch expression (Java 14+)
    case 0, 1 -> "jeune";
    default -> "adulte";
};

"ada".equals(nom.toLowerCase());               // comparer le CONTENU de deux chaînes : equals()
```

`==` sur deux objets compare les **références** (est-ce le même objet en mémoire ?), pas leur contenu. Pour des `String`, il faut `equals()`.

### Boucles

```java
for (int i = 0; i < 3; i++) { System.out.println(i); }
for (String fruit : List.of("pomme", "kiwi")) { System.out.println(fruit); }   // for-each
while (age < 40) { age++; }
```

### Tableaux et collections

```java
int[] notes = {12, 15, 9};                     // tableau : taille fixe
notes.length;                                   // 3

List<String> fruits = new ArrayList<>();       // liste : taille variable
fruits.add("pomme");
fruits.get(0);
Map<String, Integer> ages = new HashMap<>();   // dictionnaire
ages.put("ada", 36);
ages.getOrDefault("alan", 0);
Set<String> uniques = new HashSet<>(fruits);
```

Les **génériques** (`List<String>`) sont vérifiés à la compilation, puis **effacés** : à l'exécution, la JVM ne voit qu'une `List`.

### Méthodes, classes, interfaces

```java
public class Compte {
    private double solde;                       // encapsulation : accès par méthodes

    public Compte(double soldeInitial) { this.solde = soldeInitial; }   // constructeur

    public void deposer(double montant) { solde += montant; }
    public double getSolde() { return solde; }
}

interface Forme {
    double aire();
    default String decrire() { return "aire " + aire(); }   // méthode par défaut (Java 8+)
}
class Carre implements Forme {
    private final double c;
    Carre(double c) { this.c = c; }
    public double aire() { return c * c; }
}
```

Une classe n'**hérite** (`extends`) que d'**une seule** superclasse, mais elle peut **implémenter** (`implements`) plusieurs interfaces. Depuis Java 8, une interface peut contenir des **méthodes par défaut**, avec une implémentation.

**Records** (finalisés en Java 16) : une classe de données immuable déclarée en une ligne, avec constructeur, accesseurs, `equals`, `hashCode` et `toString` générés.

```java
record Point(int x, int y) {}
var p = new Point(3, 4);
p.x();                                          // 3
```

### Lambdas et streams (Java 8)

```java
List<Integer> nombres = List.of(3, 8, 1, 6);
List<Integer> doubles = nombres.stream()
        .filter(n -> n % 2 == 0)                // lambda
        .map(n -> n * 2)
        .toList();                              // [16, 12]
int somme = nombres.stream().mapToInt(Integer::intValue).sum();
```

### Exceptions

```java
try (var lecteur = new BufferedReader(new FileReader("f.txt"))) {   // try-with-resources
    System.out.println(lecteur.readLine());
} catch (IOException e) {
    System.out.println("lecture impossible : " + e.getMessage());
}

void charger() throws IOException { … }        // déclare une exception vérifiée
```

- Une **exception vérifiée** (checked, comme `IOException`) : le compilateur oblige à l'attraper (`catch`) ou à la déclarer (`throws`).
- Les exceptions non vérifiées (`RuntimeException`, `NullPointerException`…) n'imposent rien.
- **try-with-resources** ferme automatiquement les ressources ouvertes dans ses parenthèses, même en cas d'exception.

### Concurrence

```java
public synchronized void incrementer() { compteur++; }   // un seul thread à la fois, sur un même objet

try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {   // threads virtuels (Java 21)
    for (int i = 0; i < 10_000; i++) {
        executor.submit(() -> appelBloquant());           // code bloquant classique, très nombreuses tâches
    }
}
```

## Exemples concrets

**Compter les mots d'un texte** avec les collections et les streams.

```java
import java.util.*;
import java.util.stream.*;

public class Mots {
    public static void main(String[] args) {
        String texte = "le chat et le chien et le poisson";
        Map<String, Long> compte = Arrays.stream(texte.split(" "))
                .collect(Collectors.groupingBy(m -> m, Collectors.counting()));
        compte.entrySet().stream()
                .sorted(Map.Entry.<String, Long>comparingByValue().reversed())
                .forEach(e -> System.out.println(e.getKey() + " : " + e.getValue()));
    }
}
```

**Un endpoint REST avec Spring Boot** : une classe annotée suffit.

```java
@RestController
@RequestMapping("/api/clients")
public class ClientController {
    private final ClientRepository repo;           // injecté par Spring

    public ClientController(ClientRepository repo) { this.repo = repo; }

    @GetMapping("/{id}")
    public Client trouver(@PathVariable long id) {
        return repo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}
```

**Lire un fichier ligne à ligne** proprement.

```java
try (Stream<String> lignes = Files.lines(Path.of("ventes.csv"))) {
    double total = lignes.skip(1)                               // en-tête
            .mapToDouble(l -> Double.parseDouble(l.split(",")[2]))
            .sum();
    System.out.println("Total : " + total);
}
```

## Pour aller plus loin

- [Tutoriels officiels (dev.java)](https://dev.java/learn/)
- [Documentation du JDK](https://docs.oracle.com/en/java/javase/)
