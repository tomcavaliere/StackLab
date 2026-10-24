---
# Atelier de la fiche R : exécuté dans le navigateur par webR (R compilé en WebAssembly), sortie comparée à expected.
exercises:
  - id: variables-types
    title: "Variables et types"
    prompt: "Afficher « Ada a 36 ans », puis, sur une deuxième ligne, la classe de la variable age. Rappel : cat() affiche ses arguments séparés par des espaces, class() donne la classe."
    starter: |
      nom <- "Ada"
      age <- 36
      cat(nom, "\n")
    solution: |
      nom <- "Ada"
      age <- 36
      cat(nom, "a", age, "ans\n")
      cat(class(age), "\n")
    expected: |
      Ada a 36 ans
      numeric

  - id: vecteurs
    title: "Vecteurs"
    prompt: "Avec x <- c(4, 8, 15, 16, 23, 42), afficher sur trois lignes : les valeurs supérieures à 10, la moyenne de x, puis x sans son premier élément. Sans boucle : indexation par condition et indice négatif."
    starter: |
      x <- c(4, 8, 15, 16, 23, 42)
      cat(x, "\n")
    solution: |
      x <- c(4, 8, 15, 16, 23, 42)
      cat(x[x > 10], "\n")
      cat(mean(x), "\n")
      cat(x[-1], "\n")
    expected: |
      15 16 23 42
      18
      8 15 16 23 42

  - id: valeurs-manquantes
    title: "Valeurs manquantes"
    prompt: "Le vecteur notes contient une valeur manquante. Afficher la moyenne des notes renseignées, puis le nombre de valeurs manquantes. Rappel : NA se propage, na.rm = TRUE l'ignore, is.na() teste chaque élément."
    starter: |
      notes <- c(12, NA, 15, 9)
      cat(mean(notes), "\n")
    solution: |
      notes <- c(12, NA, 15, 9)
      cat(mean(notes, na.rm = TRUE), "\n")
      cat(sum(is.na(notes)), "\n")
    expected: |
      12
      1

  - id: conditions
    title: "Conditions vectorisées"
    prompt: "Classer chaque température : « froid » sous 15, « doux » de 15 à moins de 28, « chaud » au-delà. Afficher les quatre résultats sur une ligne. if ne teste qu'une valeur : utiliser ifelse(), qui travaille sur tout le vecteur."
    starter: |
      temperatures <- c(12, 25, 31, 18)
      cat(temperatures, "\n")
    solution: |
      temperatures <- c(12, 25, 31, 18)
      classe <- ifelse(temperatures < 15, "froid", ifelse(temperatures < 28, "doux", "chaud"))
      cat(classe, "\n")
    expected: |
      froid doux chaud doux

  - id: boucles-apply
    title: "Boucles et sapply"
    prompt: "Pour i de 1 à 5, afficher « i : pair » ou « i : impair » (%% donne le reste de la division). Puis afficher sur une ligne les carrés de 1 à 5, avec sapply() et sans boucle."
    starter: |
      for (i in 1:5) {
        cat(i, "\n")
      }
    solution: |
      for (i in 1:5) {
        if (i %% 2 == 0) {
          cat(i, ": pair\n")
        } else {
          cat(i, ": impair\n")
        }
      }
      cat(sapply(1:5, function(i) i^2), "\n")
    expected: |
      1 : impair
      2 : pair
      3 : impair
      4 : pair
      5 : impair
      1 4 9 16 25

  - id: total-par-ville
    title: "Cas concret : total TTC par ville"
    prompt: "Écrire une fonction ttc(m, taux = 0.2) qui renvoie le montant TTC, ajouter une colonne ttc au data frame ventes, puis afficher le total TTC par ville, une ligne « ville : total » par ville. aggregate(ttc ~ ville, data = ventes, FUN = sum) renvoie un data frame trié par ville."
    starter: |
      ventes <- data.frame(
        ville = c("Lyon", "Nantes", "Lyon", "Paris", "Nantes"),
        montant = c(100, 50, 30, 200, 70)
      )
      print(nrow(ventes))
    solution: |
      ventes <- data.frame(
        ville = c("Lyon", "Nantes", "Lyon", "Paris", "Nantes"),
        montant = c(100, 50, 30, 200, 70)
      )
      ttc <- function(m, taux = 0.2) m * (1 + taux)
      ventes$ttc <- ttc(ventes$montant)
      totaux <- aggregate(ttc ~ ville, data = ventes, FUN = sum)
      for (i in seq_len(nrow(totaux))) {
        cat(totaux$ville[i], ":", totaux$ttc[i], "\n")
      }
    expected: |
      Lyon : 156
      Nantes : 144
      Paris : 240
---
