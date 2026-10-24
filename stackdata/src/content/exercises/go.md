---
# Atelier de la fiche Go : pas d'exécution dans le navigateur ; le code se colle dans le Go Playground officiel.
playground: https://go.dev/play/
exercises:
  - id: boucle-conditions
    title: "Boucle et conditions"
    prompt: "Afficher, pour i de 1 à 5, « i : pair » ou « i : impair ». Rappel : for est le seul mot-clé de boucle."
    starter: |
      package main

      import "fmt"

      func main() {
      	for i := 1; i <= 5; i++ {
      		fmt.Println(i)
      	}
      }
    solution: |
      package main

      import "fmt"

      func main() {
      	for i := 1; i <= 5; i++ {
      		if i%2 == 0 {
      			fmt.Println(i, ": pair")
      		} else {
      			fmt.Println(i, ": impair")
      		}
      	}
      }
    expected: |
      1 : impair
      2 : pair
      3 : impair
      4 : pair
      5 : impair

  - id: slices-maps
    title: "Slices et maps"
    prompt: "Compter les mots dans une map, puis afficher « mot : n » par ordre alphabétique (une map Go n'a pas d'ordre : trier les clés avec sort.Strings)."
    starter: |
      package main

      import (
      	"fmt"
      	"strings"
      )

      func main() {
      	mots := strings.Fields("le chat et le chien et le poisson")
      	compte := map[string]int{}
      	fmt.Println(mots, compte)
      }
    solution: |
      package main

      import (
      	"fmt"
      	"sort"
      	"strings"
      )

      func main() {
      	mots := strings.Fields("le chat et le chien et le poisson")
      	compte := map[string]int{}
      	for _, m := range mots {
      		compte[m]++
      	}
      	cles := []string{}
      	for m := range compte {
      		cles = append(cles, m)
      	}
      	sort.Strings(cles)
      	for _, m := range cles {
      		fmt.Printf("%s : %d\n", m, compte[m])
      	}
      }
    expected: |
      chat : 1
      chien : 1
      et : 2
      le : 3
      poisson : 1

  - id: erreurs
    title: "Fonctions et erreurs : if err != nil"
    prompt: "diviser doit renvoyer une erreur « division par zéro » quand b vaut 0. Dans main, afficher le résultat, ou « erreur : … » si err n'est pas nil."
    starter: |
      package main

      import "fmt"

      func diviser(a, b float64) (float64, error) {
      	return a / b, nil
      }

      func main() {
      	for _, b := range []float64{4, 0} {
      		res, _ := diviser(10, b)
      		fmt.Println(res)
      	}
      }
    solution: |
      package main

      import (
      	"errors"
      	"fmt"
      )

      func diviser(a, b float64) (float64, error) {
      	if b == 0 {
      		return 0, errors.New("division par zéro")
      	}
      	return a / b, nil
      }

      func main() {
      	for _, b := range []float64{4, 0} {
      		res, err := diviser(10, b)
      		if err != nil {
      			fmt.Println("erreur :", err)
      			continue
      		}
      		fmt.Println(res)
      	}
      }
    expected: |
      2.5
      erreur : division par zéro

  - id: interfaces
    title: "Structures, méthodes et interfaces"
    prompt: "Ajouter les méthodes Aire() aux structures Carre et Cercle pour qu'elles satisfassent l'interface Forme (implicitement), puis afficher l'aire de chaque forme avec 2 décimales."
    starter: |
      package main

      import (
      	"fmt"
      	"math"
      )

      type Forme interface {
      	Aire() float64
      }

      type Carre struct{ C float64 }
      type Cercle struct{ R float64 }

      func main() {
      	_ = math.Pi
      	formes := []Forme{}
      	for _, f := range formes {
      		fmt.Printf("%.2f\n", f.Aire())
      	}
      }
    solution: |
      package main

      import (
      	"fmt"
      	"math"
      )

      type Forme interface {
      	Aire() float64
      }

      type Carre struct{ C float64 }
      type Cercle struct{ R float64 }

      func (c Carre) Aire() float64  { return c.C * c.C }
      func (c Cercle) Aire() float64 { return math.Pi * c.R * c.R }

      func main() {
      	formes := []Forme{Carre{3}, Cercle{1}}
      	for _, f := range formes {
      		fmt.Printf("%.2f\n", f.Aire())
      	}
      }
    expected: |
      9.00
      3.14

  - id: goroutines
    title: "Goroutines et WaitGroup"
    prompt: "Calculer les carrés de 1 à 5 dans 5 goroutines, attendre leur fin avec un sync.WaitGroup, puis afficher la somme (protéger la somme partagée avec un sync.Mutex)."
    starter: |
      package main

      import (
      	"fmt"
      )

      func main() {
      	somme := 0
      	for i := 1; i <= 5; i++ {
      		go func() {
      			somme += i * i
      		}()
      	}
      	fmt.Println(somme)
      }
    solution: |
      package main

      import (
      	"fmt"
      	"sync"
      )

      func main() {
      	var (
      		wg    sync.WaitGroup
      		mu    sync.Mutex
      		somme int
      	)
      	for i := 1; i <= 5; i++ {
      		wg.Add(1)
      		go func() {
      			defer wg.Done()
      			mu.Lock()
      			somme += i * i
      			mu.Unlock()
      		}()
      	}
      	wg.Wait()
      	fmt.Println(somme)
      }
    expected: |
      55

  - id: canaux
    title: "Cas concret : un pipeline avec des canaux"
    prompt: "Une goroutine envoie les nombres de 1 à 6 dans un canal puis le ferme ; main lit le canal avec range et affiche le total des nombres pairs reçus."
    starter: |
      package main

      import "fmt"

      func main() {
      	nombres := make(chan int)
      	go func() {
      		// envoyer 1 à 6 avant de fermer le canal
      		close(nombres)
      	}()
      	total := 0
      	for n := range nombres {
      		_ = n
      	}
      	fmt.Println(total)
      }
    solution: |
      package main

      import "fmt"

      func main() {
      	nombres := make(chan int)
      	go func() {
      		for i := 1; i <= 6; i++ {
      			nombres <- i
      		}
      		close(nombres)
      	}()
      	total := 0
      	for n := range nombres {
      		if n%2 == 0 {
      			total += n
      		}
      	}
      	fmt.Println(total)
      }
    expected: |
      12
---
