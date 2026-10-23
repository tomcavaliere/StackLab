---
name: Ruby
kind: langage
layers: []
tags: [typage-dynamique, open-source]
difficulty: 1
summary: "Langage dynamique pensé pour l'expressivité et le confort du développeur, connu surtout pour Ruby on Rails."
---

## Problème résolu

Ruby (Yukihiro Matsumoto, 1995) cherche à rendre le code agréable à écrire et à lire : tout est objet, la syntaxe est concise et la métaprogrammation permet de créer de petits langages internes, appelés DSL. Rails en tire parti pour décrire une application avec très peu de code.

L'interpréteur de référence (CRuby) a, comme CPython, un verrou global qui limite le parallélisme des threads. Le compilateur à la volée YJIT, développé chez Shopify et intégré depuis Ruby 3.1, améliore les performances des applications Rails en production. Les bibliothèques (gems) s'installent avec Bundler.

## Quand l'utiliser

- Application web avec Ruby on Rails, surtout pour aller vite avec une petite équipe.
- Scripts et outillage quand l'équipe pratique déjà Ruby.

## Quand l'éviter

- Data et machine learning : l'écosystème est très en retrait par rapport à Python.
- Calcul intensif ou services où chaque milliseconde compte : un langage compilé (Go, Java) est plus adapté.
- Recrutement : le vivier de développeurs Ruby est plus restreint que pour JavaScript, Python ou Java.

## Syntaxe

En Ruby, **tout est objet**, y compris les nombres et `nil` : `5.times { … }`, `nil.to_a`. La console interactive **IRB** (`irb`) permet d'essayer chaque ligne.

### Variables, chaînes, symboles

```ruby
nom = "Ada"                    # pas de mot-clé de déclaration
age = 36
PI_APPROX = 3.14               # une majuscule initiale : constante
puts "Bonjour #{nom}"          # interpolation, avec des guillemets DOUBLES seulement
puts 'Bonjour #{nom}'          # guillemets simples : texte brut
```

Un **symbole** comme `:nom` est un identifiant **immuable**, unique en mémoire pour un même nom. On s'en sert comme clé de hash et comme nom de méthode ou d'option.

### Conditions

```ruby
if age < 18
  puts "mineur"
elsif age < 65
  puts "adulte"
else
  puts "senior"
end

puts "majeur" if age >= 18        # modificateur en fin de ligne
puts "mineur" unless age >= 18    # unless = if not

tranche = case age
          when 0...18 then "mineur"
          when 18...65 then "adulte"
          else "senior"
          end
```

Seuls **`false` et `nil`** sont faux dans une condition. `0` et `""` sont vrais, contrairement à JavaScript ou Python.

### Boucles et blocs

```ruby
3.times { |i| puts i }                 # 0, 1, 2
[1, 2, 3].each { |x| puts x }
(1..5).each do |i|                     # do … end : bloc sur plusieurs lignes
  puts i * 2
end
```

`{ |x| puts x }` est un **bloc** : du code passé à la méthode `each`, qui l'appelle pour chaque élément. Ruby préfère ces méthodes à itération aux boucles `for`. Dans une méthode, **`yield`** appelle le bloc reçu :

```ruby
def deux_fois
  yield
  yield
end
deux_fois { puts "coucou" }            # affiche deux fois « coucou »
```

### Tableaux et hashes

```ruby
fruits = ["pomme", "kiwi"]
fruits << "poire"                      # ajout à la fin
fruits.first                           # "pomme"
fruits.include?("kiwi")                # true
[1, 2, 3, 4].select(&:even?)           # [2, 4] ; &:even? = { |n| n.even? }
[1, 2, 3].map { |n| n * 2 }            # [2, 4, 6]
[1, 2, 3].sum                          # 6

ages = { ada: 36, alan: 41 }           # hash avec des clés symboles
ages[:grace] = 85
ages.fetch(:linus, 0)                  # valeur par défaut
ages.each { |nom, age| puts "#{nom} : #{age}" }
```

**Conventions de nommage des méthodes** :
- un **`?`** final signale une méthode qui répond vrai ou faux (`empty?`, `include?`) ;
- un **`!`** final signale une version « dangereuse » : elle modifie l'objet en place (`sort!` contre `sort`, qui renvoie une copie) ou lève une exception au lieu de renvoyer `false` (`save!` dans Rails).

### Méthodes

```ruby
def saluer(nom, poli: true)            # argument nommé avec valeur par défaut
  poli ? "Bonjour #{nom}" : "Salut #{nom}"   # pas de return : la dernière expression est renvoyée
end
saluer("Ada", poli: false)
```

Une méthode sans `return` explicite renvoie la valeur de la **dernière expression** évaluée.

### Classes, modules, métaprogrammation

```ruby
class Compte
  attr_reader :solde                   # génère la méthode solde (lecture)

  def initialize(solde = 0)            # constructeur
    @solde = solde                     # @ : variable d'instance
  end

  def deposer(montant)
    @solde += montant
    self                               # pour chaîner les appels
  end
end

module Affichable                      # module = mixin
  def afficher = puts(to_s)
end
class Compte
  include Affichable                   # classe ROUVERTE : on lui ajoute le module
end
```

- **Mixins** : Ruby n'a pas d'héritage multiple. Il partage du comportement entre classes en **incluant des modules**. `Comparable` et `Enumerable` en sont des exemples standard.
- **Classes ouvertes** (monkey patching) : on peut rouvrir une classe existante, même `String`, pour y ajouter des méthodes. C'est puissant mais risqué, puisque tout le programme en est affecté.
- **`method_missing`** intercepte les appels à des méthodes qui n'existent pas, pour y répondre dynamiquement. Avec `define_method`, c'est la base des DSL comme ceux de Rails (`has_many :commandes`).
- **Duck typing** : on juge un objet aux méthodes auxquelles il répond (`respond_to?(:each)`), pas à sa classe.

### Erreurs

```ruby
begin
  Integer("abc")
rescue ArgumentError => e
  puts "pas un nombre : #{e.message}"
ensure
  puts "toujours exécuté"
end

raise ArgumentError, "montant négatif"
```

### Projet, gems, outils

- Les bibliothèques s'appellent des **gems** et sont publiées sur **RubyGems.org**.
- Le **`Gemfile`** liste les gems d'un projet, et **Bundler** les installe (`bundle install`). Le fichier **`Gemfile.lock`** fige les versions exactes installées, pour que toute l'équipe et la production aient les mêmes.
- Tests : **RSpec** est un framework au style descriptif (`describe`, `it`, `expect(...).to eq(...)`). Minitest est livré avec Ruby.
- **Types** : RBS (format standard depuis Ruby 3.0) ou Sorbet, vérifiés par des outils à part. Ruby lui-même ne les vérifie pas.
- **Parallélisme** : Ruby 3 a introduit les **Ractors**, qui exécutent du code en parallèle malgré le verrou global, chacun avec ses propres objets.

## Exemples concrets

**Lire un CSV et totaliser par ville** (bibliothèque standard).

```ruby
require "csv"

totaux = Hash.new(0)                                  # valeur par défaut 0
CSV.foreach("ventes.csv", headers: true) do |ligne|
  totaux[ligne["ville"]] += ligne["montant"].to_f
end
totaux.sort_by { |_, total| -total }.each do |ville, total|
  puts format("%-10s %10.2f", ville, total)
end
```

**Un modèle et une requête Rails** : la métaprogrammation au service d'un code court.

```ruby
class Client < ApplicationRecord
  has_many :commandes                     # génère client.commandes, etc.
  validates :email, presence: true, uniqueness: true
  scope :actifs, -> { where(actif: true) }
end

Client.actifs.joins(:commandes).where(commandes: { statut: "payee" }).distinct.count
```

**Un script avec un bloc et yield** : mesurer la durée d'une opération.

```ruby
def chrono(nom)
  debut = Time.now
  resultat = yield
  puts "#{nom} : #{(Time.now - debut).round(3)} s"
  resultat
end

somme = chrono("somme") { (1..1_000_000).sum }
```

## Pour aller plus loin

- [Documentation officielle](https://www.ruby-lang.org/fr/documentation/)
- [Ruby en 20 minutes](https://www.ruby-lang.org/fr/documentation/quickstart/)
