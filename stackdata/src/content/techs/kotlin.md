---
name: Kotlin
kind: langage
layers: []
tags: [typage-statique, jvm, open-source, mobile]
difficulty: 2
summary: "Langage concis de JetBrains, compatible avec Java et sa JVM : le langage recommandé par Google pour Android, aussi utilisé côté serveur."
alternatives:
  - tech: java
    note: "Même JVM et mêmes bibliothèques, plus verbeux ; vivier de développeurs et historique plus larges."
---

## Problème résolu

Java est robuste mais verbeux, et laisse passer les erreurs de référence nulle jusqu'à l'exécution. Kotlin (JetBrains, version 1.0 en 2016) tourne sur la même JVM et appelle directement le code Java existant, dans les deux sens : une équipe peut l'adopter fichier par fichier. Son système de types distingue les valeurs qui peuvent être nulles de celles qui ne le peuvent pas, sa syntaxe est plus concise, et les coroutines simplifient le code asynchrone.

Google l'a pris en charge pour Android en 2017, puis en a fait le langage recommandé (« Kotlin first ») en 2019 ; Jetpack Compose, la boîte à outils d'interface moderne d'Android, s'écrit en Kotlin. Côté serveur, Spring Boot le prend en charge et Ktor est un framework écrit pour lui. Kotlin Multiplatform permet de partager du code entre Android et iOS.

## Quand l'utiliser

- Application Android native : c'est le choix par défaut.
- Back-end sur la JVM (Spring Boot, Ktor), par une équipe qui veut un code plus concis que Java.
- Moderniser progressivement une base de code Java existante.

## Quand l'éviter

- Application uniquement iOS : Swift est le langage natif d'Apple.
- Une application iOS et Android par une équipe venue du web : React Native réutilise ses compétences React.
- Équipe et outillage entièrement Java, sans besoin de changer : la migration a un coût.

## Syntaxe

Kotlin est développé par JetBrains, l'éditeur d'**IntelliJ IDEA** (Android Studio en est dérivé). Il compile vers le bytecode JVM, mais aussi vers **JavaScript** (Kotlin/JS) et vers du **code natif** (Kotlin/Native, utilisé pour iOS par Kotlin Multiplatform). Les scripts de build Gradle peuvent s'écrire en Kotlin (`build.gradle.kts`) au lieu de Groovy.

### Programme, variables, chaînes

```kotlin
fun main() {                       // point d'entrée, sans classe obligatoire
    val nom = "Ada"                // val : ne peut pas être réaffectée
    var age = 36                   // var : peut l'être
    age += 1
    val taille: Double = 1.70      // type explicite (sinon déduit)
    println("Bonjour $nom, ${age * 2}")   // template : $variable ou ${expression}
}
```

On préfère `val` par défaut, et `var` seulement quand la valeur doit changer.

### Null-safety

Le système de types distingue `String` (jamais `null`) de `String?` (peut être `null`). Le compilateur refuse `nom.length` sur un `String?` tant que le cas `null` n'est pas traité.

```kotlin
val user: User? = trouver(id)
val ville = user?.adresse?.ville       // ?. : null au lieu d'une erreur si un maillon est null
val affichee = ville ?: "inconnue"     // Elvis ?: : valeur par défaut si la gauche vaut null
val longueur = user!!.nom.length       // !! : « je sais que ce n'est pas null » → NullPointerException sinon
```

Quand Kotlin appelle du **code Java**, la garantie n'est pas complète : les types Java ne disent pas s'ils peuvent être nuls. Kotlin les traite comme des « types de plateforme », sans vérification.

### Conditions : if et when sont des expressions

```kotlin
val statut = if (age >= 18) "majeur" else "mineur"

val tranche = when {                   // switch plus puissant
    age < 18 -> "mineur"
    age < 65 -> "adulte"
    else -> "senior"
}
when (x) {
    0, 1 -> println("petit")
    in 2..10 -> println("moyen")       // intervalle
    is String -> println(x.length)     // test de type
    else -> println("autre")
}
```

**Smart cast** : après un test (`is String`, `!= null`), la variable est traitée comme du type vérifié, sans conversion à écrire.

### Boucles et collections

```kotlin
for (i in 0 until 3) println(i)        // 0, 1, 2 (1..3 inclut 3)
for ((i, fruit) in fruits.withIndex()) println("$i $fruit")
repeat(3) { println("coucou") }

val fruits = listOf("pomme", "kiwi")             // liste en lecture seule
val panier = mutableListOf("pomme")              // liste modifiable
panier.add("poire")
val ages = mapOf("ada" to 36, "alan" to 41)      // to : crée une paire
ages["ada"]                                      // 36 (Int?, null si absent)
listOf(3, 8, 1, 6).filter { it % 2 == 0 }.map { it * 2 }   // [16, 12] ; it = le paramètre implicite
```

### Fonctions et extensions

```kotlin
fun saluer(nom: String, poli: Boolean = true): String =       // paramètre par défaut, corps en expression
    if (poli) "Bonjour $nom" else "Salut $nom"

saluer("Ada")
saluer(nom = "Ada", poli = false)                             // argument nommé

fun String.crier() = uppercase() + " !"                       // fonction d'extension
"bonjour".crier()                                             // "BONJOUR !"
```

- Les **paramètres par défaut et nommés** évitent d'écrire plusieurs surcharges d'une même fonction, comme en Java.
- Une **fonction d'extension** ajoute une méthode à une classe existante, même `String`, sans la modifier ni en hériter.

**Fonctions de portée** : `let`, `apply`, `also`, `run` et `with` exécutent un bloc dans le contexte d'un objet.

```kotlin
val longueur = nom?.let { it.length } ?: 0               // let : seulement si non null
val c = Client().apply { nom = "Ada"; ville = "Londres" } // apply : configurer puis renvoyer l'objet
```

### Classes

```kotlin
data class Point(val x: Int, val y: Int)       // equals, hashCode, toString, copy générés
val p = Point(3, 4)
val q = p.copy(y = 0)                          // Point(x=3, y=0)

open class Animal(val nom: String) {           // open : héritable (une classe est FINALE par défaut)
    open fun parler() = "$nom fait un bruit"
}
class Chien(nom: String) : Animal(nom) {
    override fun parler() = "$nom aboie"
}

object Config { val url = "https://api.exemple.fr" }   // object : un singleton (instance unique)

sealed class Resultat {                         // classe scellée : sous-classes connues
    data class Ok(val valeur: Int) : Resultat()
    data class Erreur(val message: String) : Resultat()
}
fun afficher(r: Resultat) = when (r) {          // when exhaustif : pas de else nécessaire
    is Resultat.Ok -> "ok : ${r.valeur}"
    is Resultat.Erreur -> "erreur : ${r.message}"
}
```

### Coroutines

```kotlin
suspend fun chargerUser(id: Int): User {       // suspend : peut se suspendre sans bloquer le thread
    delay(100)                                 // attend sans bloquer
    return api.user(id)
}

runBlocking {
    val a = async { chargerUser(1) }           // en parallèle
    val b = async { chargerUser(2) }
    println(listOf(a.await(), b.await()))
}
```

Une fonction **`suspend`** ne peut être appelée que depuis une coroutine ou une autre fonction `suspend`. Un **`Flow`** est un flux asynchrone de valeurs émises au fil du temps : positions GPS, messages, résultats paginés.

## Exemples concrets

**Modéliser et traiter des commandes** : data class, collections, regroupement.

```kotlin
data class Commande(val client: String, val montant: Double)

fun main() {
    val commandes = listOf(Commande("Ada", 40.0), Commande("Alan", 25.0), Commande("Ada", 15.0))
    commandes.groupBy { it.client }
        .mapValues { (_, liste) -> liste.sumOf { it.montant } }
        .entries.sortedByDescending { it.value }
        .forEach { (client, total) -> println("$client : $total") }
}
```

**Un écran Jetpack Compose** : l'interface Android décrite en Kotlin.

```kotlin
@Composable
fun Compteur() {
    var n by remember { mutableStateOf(0) }       // état qui redessine l'écran quand il change
    Column(Modifier.padding(16.dp)) {
        Text("Cliqué $n fois")
        Button(onClick = { n++ }) { Text("+1") }
    }
}
```

**Une route Ktor** côté serveur.

```kotlin
fun main() {
    embeddedServer(Netty, port = 8080) {
        routing {
            get("/bonjour/{nom}") {
                call.respondText("Bonjour ${call.parameters["nom"] ?: "inconnu"}")
            }
        }
    }.start(wait = true)
}
```

## Pour aller plus loin

- [Documentation officielle](https://kotlinlang.org/docs/home.html)
- [Kotlin pour Android](https://developer.android.com/kotlin)
