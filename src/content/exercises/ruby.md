---
# Atelier de la fiche Ruby : pas d'exécution dans le navigateur ici ; le code se colle dans le playground officiel (Ruby en WebAssembly).
playground: https://try.ruby-lang.org/playground/
exercises:
  - id: boucle-conditions
    title: "Blocs et conditions"
    prompt: "Pour i de 1 à 5 (avec (1..5).each), afficher « i : pair » ou « i : impair ». Indice : i.even?"
    starter: |
      (1..5).each do |i|
        puts i
      end
    solution: |
      (1..5).each do |i|
        puts "#{i} : #{i.even? ? 'pair' : 'impair'}"
      end
    expected: |
      1 : impair
      2 : pair
      3 : impair
      4 : pair
      5 : impair

  - id: map-select
    title: "Tableaux : select, map, sum"
    prompt: "Garder les nombres pairs, les mettre au carré, afficher le tableau (p) puis sa somme."
    starter: |
      nombres = [3, 8, 1, 6, 10, 7]
      p nombres
    solution: |
      nombres = [3, 8, 1, 6, 10, 7]
      carres = nombres.select(&:even?).map { |n| n * n }
      p carres
      puts carres.sum
    expected: |
      [64, 36, 100]
      200

  - id: hash-compter
    title: "Hashes : compter des mots"
    prompt: "Compter les mots avec Hash.new(0), puis afficher « mot : n » du plus fréquent au moins fréquent (à égalité, par ordre alphabétique)."
    starter: |
      texte = "le chat et le chien et le poisson"
      compte = Hash.new(0)
      p compte
    solution: |
      texte = "le chat et le chien et le poisson"
      compte = Hash.new(0)
      texte.split.each { |mot| compte[mot] += 1 }
      compte.sort_by { |mot, n| [-n, mot] }.each { |mot, n| puts "#{mot} : #{n}" }
    expected: |
      le : 3
      et : 2
      chat : 1
      chien : 1
      poisson : 1

  - id: yield
    title: "Méthodes et yield"
    prompt: "Écrire repeter(n), qui appelle n fois le bloc reçu en lui passant le numéro du tour (1, 2, 3…)."
    starter: |
      def repeter(n)
      end

      repeter(3) { |tour| puts "tour #{tour}" }
    solution: |
      def repeter(n)
        (1..n).each { |tour| yield tour }
      end

      repeter(3) { |tour| puts "tour #{tour}" }
    expected: |
      tour 1
      tour 2
      tour 3

  - id: classes-mixins
    title: "Classes et mixins"
    prompt: "Compléter la classe Produit : inclure le module Comparable et définir <=> sur le prix, pour que sort, min et max fonctionnent."
    starter: |
      class Produit
        attr_reader :nom, :prix

        def initialize(nom, prix)
          @nom = nom
          @prix = prix
        end

        def to_s
          "#{nom} (#{prix} €)"
        end
      end

      produits = [Produit.new("stylo", 2), Produit.new("cahier", 5), Produit.new("gomme", 1)]
      puts produits.sort.map(&:to_s).join(", ")
      puts produits.max
    solution: |
      class Produit
        include Comparable
        attr_reader :nom, :prix

        def initialize(nom, prix)
          @nom = nom
          @prix = prix
        end

        def <=>(autre)
          prix <=> autre.prix
        end

        def to_s
          "#{nom} (#{prix} €)"
        end
      end

      produits = [Produit.new("stylo", 2), Produit.new("cahier", 5), Produit.new("gomme", 1)]
      puts produits.sort.map(&:to_s).join(", ")
      puts produits.max
    expected: |
      gomme (1 €), stylo (2 €), cahier (5 €)
      cahier (5 €)

  - id: erreurs
    title: "Cas concret : lire des saisies, gérer les erreurs"
    prompt: "Convertir chaque saisie avec Integer(…). Une saisie invalide lève une ArgumentError : l'attraper avec rescue pour afficher « ignoré : … », puis afficher le total des nombres valides."
    starter: |
      saisies = ["12", "abc", "30", "4x"]
      total = 0
      saisies.each do |s|
        total += Integer(s)
      end
      puts total
    solution: |
      saisies = ["12", "abc", "30", "4x"]
      total = 0
      saisies.each do |s|
        begin
          total += Integer(s)
        rescue ArgumentError
          puts "ignoré : #{s}"
        end
      end
      puts total
    expected: |
      ignoré : abc
      ignoré : 4x
      42
---
