---
# Atelier de la fiche Python : exécuté dans le navigateur (Pyodide, CPython compilé en WebAssembly). print() = la sortie.
exercises:
  - id: fizzbuzz
    title: "Boucle et conditions : FizzBuzz"
    prompt: "Afficher les nombres de 1 à 15, un par ligne, en remplaçant les multiples de 3 par Fizz, ceux de 5 par Buzz, et ceux de 3 et de 5 par FizzBuzz."
    starter: |
      for i in range(1, 16):
          print(i)
    solution: |
      for i in range(1, 16):
          if i % 15 == 0:
              print("FizzBuzz")
          elif i % 3 == 0:
              print("Fizz")
          elif i % 5 == 0:
              print("Buzz")
          else:
              print(i)
    expected: |
      1
      2
      Fizz
      4
      Buzz
      Fizz
      7
      8
      Fizz
      Buzz
      11
      Fizz
      13
      14
      FizzBuzz

  - id: comprehension
    title: "Listes et compréhensions"
    prompt: "À partir de nombres, afficher la liste des carrés des nombres pairs, puis leur somme."
    starter: |
      nombres = [3, 8, 1, 6, 10, 7]
      carres = []
      print(carres)
    solution: |
      nombres = [3, 8, 1, 6, 10, 7]
      carres = [n * n for n in nombres if n % 2 == 0]
      print(carres)
      print(sum(carres))
    expected: |
      [64, 36, 100]
      200

  - id: compter-mots
    title: "Dictionnaires : compter des mots"
    prompt: "Compter les occurrences de chaque mot du texte, puis afficher « mot : nombre » du plus fréquent au moins fréquent (à égalité, dans l'ordre alphabétique)."
    starter: |
      texte = "le chat et le chien et le poisson"
      compte = {}
      for mot in texte.split():
          pass
      print(compte)
    solution: |
      texte = "le chat et le chien et le poisson"
      compte = {}
      for mot in texte.split():
          compte[mot] = compte.get(mot, 0) + 1
      for mot, n in sorted(compte.items(), key=lambda kv: (-kv[1], kv[0])):
          print(f"{mot} : {n}")
    expected: |
      le : 3
      et : 2
      chat : 1
      chien : 1
      poisson : 1

  - id: defaut-mutable
    title: "Fonctions : le piège de la valeur par défaut"
    prompt: "Ce code affiche ['a'] puis ['a', 'b'] : la liste par défaut est partagée entre les appels. Corriger ajouter() pour que chaque appel sans liste reparte d'une liste vide."
    starter: |
      def ajouter(element, liste=[]):
          liste.append(element)
          return liste

      print(ajouter("a"))
      print(ajouter("b"))
    solution: |
      def ajouter(element, liste=None):
          if liste is None:
              liste = []
          liste.append(element)
          return liste

      print(ajouter("a"))
      print(ajouter("b"))
    expected: |
      ['a']
      ['b']

  - id: classe-compte
    title: "Classes et erreurs"
    prompt: "Compléter la classe Compte : retirer() lève une ValueError(\"solde insuffisant\") si le montant dépasse le solde. Le programme doit afficher 70 puis le message de l'erreur."
    starter: |
      class Compte:
          def __init__(self, solde=0):
              self.solde = solde

          def retirer(self, montant):
              self.solde -= montant

      c = Compte(100)
      c.retirer(30)
      print(c.solde)
      try:
          c.retirer(500)
      except ValueError as e:
          print(e)
    solution: |
      class Compte:
          def __init__(self, solde=0):
              self.solde = solde

          def retirer(self, montant):
              if montant > self.solde:
                  raise ValueError("solde insuffisant")
              self.solde -= montant

      c = Compte(100)
      c.retirer(30)
      print(c.solde)
      try:
          c.retirer(500)
      except ValueError as e:
          print(e)
    expected: |
      70
      solde insuffisant

  - id: generateur
    title: "Générateurs : yield"
    prompt: "Écrire le générateur fibonacci(n) qui produit les n premiers termes de la suite de Fibonacci (0, 1, 1, 2…), puis les afficher sur une ligne, séparés par des espaces."
    starter: |
      def fibonacci(n):
          return []

      print(*fibonacci(10))
    solution: |
      def fibonacci(n):
          a, b = 0, 1
          for _ in range(n):
              yield a
              a, b = b, a + b

      print(*fibonacci(10))
    expected: |
      0 1 1 2 3 5 8 13 21 34

  - id: ventes-par-ville
    title: "Cas concret : agréger des ventes"
    prompt: "Calculer le chiffre d'affaires par ville à partir de la liste ventes, puis afficher « ville : total » par total décroissant."
    starter: |
      ventes = [
          {"ville": "Lyon", "montant": 120},
          {"ville": "Paris", "montant": 80},
          {"ville": "Lyon", "montant": 60},
          {"ville": "Lille", "montant": 200},
          {"ville": "Paris", "montant": 90},
      ]
    solution: |
      ventes = [
          {"ville": "Lyon", "montant": 120},
          {"ville": "Paris", "montant": 80},
          {"ville": "Lyon", "montant": 60},
          {"ville": "Lille", "montant": 200},
          {"ville": "Paris", "montant": 90},
      ]
      ca = {}
      for v in ventes:
          ca[v["ville"]] = ca.get(v["ville"], 0) + v["montant"]
      for ville, total in sorted(ca.items(), key=lambda kv: kv[1], reverse=True):
          print(f"{ville} : {total}")
    expected: |
      Lille : 200
      Lyon : 180
      Paris : 170
---
