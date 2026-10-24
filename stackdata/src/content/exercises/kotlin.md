---
# Atelier de la fiche Kotlin : pas d'exécution dans le navigateur ici ; le code se colle dans le Kotlin Playground officiel.
playground: https://play.kotlinlang.org/
exercises:
  - id: when
    title: "Conditions : when est une expression"
    prompt: "Écrire tranche(age) avec when : « mineur » sous 18 ans, « adulte » sous 65, « senior » sinon."
    starter: |
      fun tranche(age: Int): String = "?"

      fun main() {
          for (age in listOf(12, 40, 70)) println(tranche(age))
      }
    solution: |
      fun tranche(age: Int): String = when {
          age < 18 -> "mineur"
          age < 65 -> "adulte"
          else -> "senior"
      }

      fun main() {
          for (age in listOf(12, 40, 70)) println(tranche(age))
      }
    expected: |
      mineur
      adulte
      senior

  - id: null-safety
    title: "Null-safety : ?. et ?:"
    prompt: "Afficher la ville de chaque utilisateur, ou « inconnue » si l'utilisateur ou son adresse est null, sans !! ni if."
    starter: |
      data class Adresse(val ville: String)
      data class User(val nom: String, val adresse: Adresse?)

      fun ville(u: User?): String = u!!.adresse!!.ville

      fun main() {
          val users = listOf(User("Ada", Adresse("Londres")), User("Alan", null), null)
          users.forEach { println(ville(it)) }
      }
    solution: |
      data class Adresse(val ville: String)
      data class User(val nom: String, val adresse: Adresse?)

      fun ville(u: User?): String = u?.adresse?.ville ?: "inconnue"

      fun main() {
          val users = listOf(User("Ada", Adresse("Londres")), User("Alan", null), null)
          users.forEach { println(ville(it)) }
      }
    expected: |
      Londres
      inconnue
      inconnue

  - id: collections
    title: "Collections : filter, map, sum"
    prompt: "Garder les nombres pairs, les mettre au carré, afficher la liste puis sa somme."
    starter: |
      fun main() {
          val nombres = listOf(3, 8, 1, 6, 10, 7)
          println(nombres)
      }
    solution: |
      fun main() {
          val nombres = listOf(3, 8, 1, 6, 10, 7)
          val carres = nombres.filter { it % 2 == 0 }.map { it * it }
          println(carres)
          println(carres.sum())
      }
    expected: |
      [64, 36, 100]
      200

  - id: data-class
    title: "Data class et copy"
    prompt: "Créer une copie de ada avec age = 37 grâce à copy(), puis afficher les deux objets et le résultat de ada == Personne(\"Ada\", 36)."
    starter: |
      data class Personne(val nom: String, val age: Int)

      fun main() {
          val ada = Personne("Ada", 36)
          println(ada)
      }
    solution: |
      data class Personne(val nom: String, val age: Int)

      fun main() {
          val ada = Personne("Ada", 36)
          val plusVieille = ada.copy(age = 37)
          println(ada)
          println(plusVieille)
          println(ada == Personne("Ada", 36))
      }
    expected: |
      Personne(nom=Ada, age=36)
      Personne(nom=Ada, age=37)
      true

  - id: sealed
    title: "Classe scellée et when exhaustif"
    prompt: "Compléter afficher(r) pour les deux cas de Resultat, sans branche else : le when doit couvrir toutes les sous-classes."
    starter: |
      sealed class Resultat {
          data class Ok(val valeur: Int) : Resultat()
          data class Erreur(val message: String) : Resultat()
      }

      fun afficher(r: Resultat): String = "?"

      fun main() {
          listOf(Resultat.Ok(42), Resultat.Erreur("délai dépassé")).forEach { println(afficher(it)) }
      }
    solution: |
      sealed class Resultat {
          data class Ok(val valeur: Int) : Resultat()
          data class Erreur(val message: String) : Resultat()
      }

      fun afficher(r: Resultat): String = when (r) {
          is Resultat.Ok -> "ok : ${r.valeur}"
          is Resultat.Erreur -> "erreur : ${r.message}"
      }

      fun main() {
          listOf(Resultat.Ok(42), Resultat.Erreur("délai dépassé")).forEach { println(afficher(it)) }
      }
    expected: |
      ok : 42
      erreur : délai dépassé

  - id: regrouper
    title: "Cas concret : extension et regroupement"
    prompt: "Écrire l'extension List<Commande>.totalParClient(), qui renvoie une Map client → total, puis afficher « client : total » par total décroissant."
    starter: |
      data class Commande(val client: String, val montant: Int)

      fun main() {
          val commandes = listOf(
              Commande("Ada", 40), Commande("Alan", 25), Commande("Ada", 15),
              Commande("Grace", 70), Commande("Alan", 50),
          )
          println(commandes.size)
      }
    solution: |
      data class Commande(val client: String, val montant: Int)

      fun List<Commande>.totalParClient(): Map<String, Int> =
          groupBy { it.client }.mapValues { (_, liste) -> liste.sumOf { it.montant } }

      fun main() {
          val commandes = listOf(
              Commande("Ada", 40), Commande("Alan", 25), Commande("Ada", 15),
              Commande("Grace", 70), Commande("Alan", 50),
          )
          commandes.totalParClient().entries
              .sortedByDescending { it.value }
              .forEach { (client, total) -> println("$client : $total") }
      }
    expected: |
      Alan : 75
      Grace : 70
      Ada : 55
---
