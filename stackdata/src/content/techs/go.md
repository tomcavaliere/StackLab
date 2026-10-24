---
name: Go
kind: langage
layers: []
tags: [typage-statique, open-source, cloud-native]
difficulty: 2
summary: "Langage compilé et volontairement simple, conçu chez Google, avec la concurrence intégrée : très utilisé pour les services réseau et l'outillage cloud."
---

## Problème résolu

Go (annoncé par Google en 2009, version 1.0 en 2012) vise des programmes serveur rapides à compiler, simples à lire et faciles à déployer. Le compilateur produit un binaire unique, sans dépendance à installer sur la machine cible. Le langage reste petit : peu de mots-clés, un formatage imposé (`gofmt`), et les génériques ne sont arrivés qu'en 2022 (Go 1.18).

La concurrence fait partie du langage : les goroutines sont des tâches légères, ordonnancées par le runtime Go, qui communiquent par des canaux. Un serveur peut ainsi traiter beaucoup de connexions simultanées avec un code séquentiel lisible. Une grande partie de l'outillage cloud est écrite en Go : Docker, Kubernetes, Prometheus et Terraform notamment.

## Quand l'utiliser

- API et services réseau à fort trafic, proxys, microservices.
- Outils en ligne de commande et agents d'infrastructure à distribuer en un seul binaire.
- Équipe qui veut un langage typé, performant et rapide à apprendre.

## Quand l'éviter

- Data science et machine learning : l'écosystème est sans commune mesure avec celui de Python.
- Application web « batteries incluses » avec ORM, administration et authentification : Go laisse assembler soi-même ces briques, là où Django ou Rails les fournissent.
- Interfaces graphiques ou mobile : ce n'est pas son terrain.

## Syntaxe

Go reste volontairement petit : peu de mots-clés, une seule façon de boucler (`for`), et un formatage imposé par `gofmt`. **Promesse de compatibilité** : un programme valide pour Go 1 continue de compiler avec les versions suivantes.

### Programme, paquets, modules

```go
package main                 // un exécutable est dans le paquet main

import (
	"fmt"
	"strings"
)

func main() {                // point d'entrée
	fmt.Println(strings.ToUpper("bonjour"))
}
```

- `go mod init exemple.com/app` crée le fichier **`go.mod`**, qui déclare le module et ses dépendances.
- `go run .` compile et lance le programme, `go build` produit le binaire.
- **Compilation croisée** : on fixe la cible avant `go build`, par exemple `GOOS=linux GOARCH=amd64 go build`. On obtient ainsi depuis Windows ou macOS un binaire pour Linux.
- **Visibilité** : un identifiant qui commence par une **majuscule** (`Println`, `User`) est exporté, donc visible hors de son paquet. En minuscule, il reste privé au paquet.

### Variables et types

```go
var age int = 36
nom := "Ada"                 // := déclare et déduit le type (dans une fonction)
const Max = 10
var compteur int             // pas de valeur : la VALEUR ZÉRO du type, ici 0
var texte string             // "" (chaîne vide)
var p *int                   // nil
```

Une variable déclarée sans valeur reçoit la **valeur zéro** de son type : `0`, `""`, `false`, ou `nil` pour les pointeurs, slices, maps et interfaces. Go refuse de compiler s'il reste une variable ou un import inutilisé.

### Conditions et boucles

```go
if age < 18 {
	fmt.Println("mineur")
} else if age < 65 {
	fmt.Println("adulte")
} else {
	fmt.Println("senior")
}

if n, err := strconv.Atoi("42"); err == nil {   // instruction courte avant la condition
	fmt.Println(n)
}

switch jour {
case "samedi", "dimanche":
	fmt.Println("week-end")                      // pas de break : pas de « chute » au cas suivant
default:
	fmt.Println("semaine")
}

for i := 0; i < 3; i++ { fmt.Println(i) }      // le seul mot-clé de boucle
for n < 100 { n *= 2 }                          // équivalent d'un while
for i, fruit := range fruits { fmt.Println(i, fruit) }
```

### Slices et maps

```go
notes := [3]int{12, 15, 9}          // tableau : taille fixe, rare en pratique
fruits := []string{"pomme", "kiwi"} // SLICE : tableau dynamique
fruits = append(fruits, "poire")    // append renvoie la slice, éventuellement réallouée
len(fruits)                         // 3
fruits[1:3]                         // sous-slice ["kiwi", "poire"]

ages := map[string]int{"ada": 36}
ages["alan"] = 41
age, ok := ages["grace"]            // ok vaut false si la clé est absente (age = 0)
delete(ages, "ada")
```

### Fonctions et erreurs

Une fonction peut renvoyer **plusieurs valeurs**, en général un résultat et une erreur. Go n'a pas d'exceptions pour les cas courants : on renvoie une valeur `error` et l'appelant la teste avec `if err != nil`.

```go
func diviser(a, b float64) (float64, error) {
	if b == 0 {
		return 0, errors.New("division par zéro")
	}
	return a / b, nil
}

res, err := diviser(10, 0)
if err != nil {
	fmt.Println("erreur :", err)
	return
}
```

- **`defer`** reporte un appel à la sortie de la fonction englobante, quel que soit le chemin de sortie. C'est la façon de fermer une ressource : `f, err := os.Open(nom)` puis `defer f.Close()`.
- **`panic` et `recover`** : `panic` interrompt le programme, sauf si un `recover` placé dans une fonction différée l'intercepte. C'est réservé aux situations exceptionnelles (un bug, un état impossible). Le cas courant passe par `error`.

### Structures, méthodes, interfaces

Go n'a **ni classes ni héritage**. Il a des structures, avec des méthodes, qu'on **compose par embarquement**.

```go
type Animal struct{ Nom string }

func (a Animal) Decrire() string { return "je suis " + a.Nom }   // méthode (récepteur a)

type Chien struct {
	Animal                    // embarquement : Chien reçoit les champs et méthodes d'Animal
	Race string
}

func (c *Chien) Renommer(n string) { c.Nom = n }   // récepteur pointeur : modifie l'original

type Descriptible interface{ Decrire() string }

var d Descriptible = Chien{Animal{"Rex"}, "berger"}   // aucun « implements » à écrire
```

Un type implémente une interface **implicitement**, dès qu'il possède les méthodes demandées. **Génériques** (Go 1.18, 2022) : `func Max[T int | float64](a, b T) T`.

### Concurrence : goroutines, canaux, select

```go
go envoyerMail(u)                      // le mot-clé go lance l'appel dans une nouvelle goroutine

resultats := make(chan int)            // canal : les goroutines communiquent par lui
go func() { resultats <- calcul() }()  // envoi
v := <-resultats                       // réception (bloque jusqu'à ce qu'une valeur arrive)

select {                               // attend sur plusieurs canaux : la première opération prête gagne
case v := <-resultats:
	fmt.Println(v)
case <-time.After(2 * time.Second):
	fmt.Println("délai dépassé")
}
```

- **`sync.WaitGroup`** attend la fin de plusieurs goroutines : `wg.Add(1)` avant chaque lancement, `wg.Done()` à la fin, `wg.Wait()` pour attendre.
- **`sync.Mutex`** protège une variable partagée sans passer par un canal : `mu.Lock()`, puis `defer mu.Unlock()`.
- **Courses de données** : le détecteur intégré les repère à l'exécution, avec `go test -race` ou `go run -race`.
- Le paquet **`context`** propage l'annulation, les délais et les valeurs d'une requête entre goroutines. Un serveur HTTP annule ainsi le travail quand le client se déconnecte.
- **Mémoire** : un ramasse-miettes intégré au runtime la libère, sans `free` à écrire.

### Tests

```go
// calcul_test.go
func TestDiviser(t *testing.T) {
	if _, err := diviser(1, 0); err == nil {
		t.Error("une erreur était attendue")
	}
}
```

Les tests vont dans des fichiers `_test.go`, écrits avec le paquet `testing`, et se lancent avec `go test ./...`.

## Exemples concrets

**Un serveur HTTP JSON**, avec la bibliothèque standard seule.

```go
package main

import (
	"encoding/json"
	"net/http"
)

type Reponse struct {
	Message string `json:"message"`   // tag : nom du champ en JSON
}

func main() {
	http.HandleFunc("GET /bonjour/{nom}", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(Reponse{Message: "Bonjour " + r.PathValue("nom")})
	})
	http.ListenAndServe(":8080", nil)
}
```

**Appeler plusieurs URL en parallèle**, avec des goroutines et un WaitGroup.

```go
func statuts(urls []string) map[string]int {
	var (
		wg  sync.WaitGroup
		mu  sync.Mutex
		res = map[string]int{}
	)
	for _, u := range urls {
		wg.Add(1)
		go func() {
			defer wg.Done()
			r, err := http.Get(u)
			code := 0
			if err == nil {
				code = r.StatusCode
				r.Body.Close()
			}
			mu.Lock()
			res[u] = code
			mu.Unlock()
		}()
	}
	wg.Wait()
	return res
}
```

**Lire un fichier ligne à ligne** et compter les lignes qui contiennent « ERROR ».

```go
f, err := os.Open("app.log")
if err != nil {
	log.Fatal(err)
}
defer f.Close()

n := 0
sc := bufio.NewScanner(f)
for sc.Scan() {
	if strings.Contains(sc.Text(), "ERROR") {
		n++
	}
}
fmt.Println(n, "erreurs")
```

## Pour aller plus loin

- [A Tour of Go](https://go.dev/tour/)
- [Effective Go](https://go.dev/doc/effective_go)
