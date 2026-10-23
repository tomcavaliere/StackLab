---
name: Python
kind: langage
layers: []
tags: [typage-dynamique, open-source, data]
difficulty: 1
summary: "Langage généraliste réputé pour sa lisibilité, dominant en data et en machine learning, très utilisé aussi pour les back-ends web."
---

## Problème résolu

Python (Guido van Rossum, 1991) privilégie un code court et lisible, avec une bibliothèque standard très fournie. Son vrai atout est son écosystème : NumPy, pandas, scikit-learn et PyTorch en ont fait le langage de référence de l'analyse de données et du machine learning, tandis que Django, Flask et FastAPI couvrent le développement web.

Le typage est dynamique, avec des annotations de type optionnelles que des outils comme mypy ou les éditeurs vérifient. L'interpréteur de référence, CPython, a un verrou global (GIL) qui empêche plusieurs threads d'exécuter du code Python en parallèle. CPython propose depuis la version 3.13 une variante sans GIL, encore optionnelle.

## Quand l'utiliser

- Data, analyse, machine learning, scripts d'automatisation : l'écosystème n'a pas d'équivalent.
- Back-end web ou API quand l'équipe connaît Python, en particulier si le produit touche aussi à la data.
- Équipe mixte développeurs et data : un langage commun.

## Quand l'éviter

- Calcul intensif écrit en Python pur : l'interpréteur est lent sur les boucles ; les bibliothèques rapides (NumPy, Polars…) déportent le calcul dans du code natif.
- Application mobile ou code exécuté dans le navigateur : ce n'est pas son terrain.
- Distribution d'un binaire autonome : packager une application Python avec ses dépendances reste moins simple qu'avec Go.

## Syntaxe

Python 3 est la seule version vivante : Python 2 n'est plus maintenu depuis le 1er janvier 2020. Le style de code est décrit par la **PEP 8** : indentation de 4 espaces, `snake_case` pour les noms de variables et de fonctions, `PascalCase` pour les classes. L'esprit du langage est résumé par le « Zen of Python », qu'on affiche dans l'interpréteur avec `import this`.

### Variables et types

```python
nom = "Ada"            # str
age = 36               # int (entiers de taille illimitée)
taille = 1.70          # float
actif = True           # bool : True / False
rien = None            # l'absence de valeur
print(f"{nom} a {age} ans")   # f-string : interpolation
```

Le typage est **dynamique** (une variable n'a pas de type déclaré) mais **fort** : Python ne convertit pas en silence. `"1" + 1` lève une `TypeError`, il faut écrire `int("1") + 1` ou `"1" + str(1)`. Les annotations sont optionnelles et ne changent rien à l'exécution : `def aire(r: float) -> float:`. Ce sont mypy ou l'éditeur qui les vérifient.

### Blocs et conditions

Les blocs sont délimités par l'**indentation**, sans accolades. La ligne qui ouvre un bloc finit par `:`.

```python
if age < 18:
    print("mineur")
elif age < 65:
    print("adulte")
else:
    print("senior")

statut = "majeur" if age >= 18 else "mineur"   # expression conditionnelle
```

Opérateurs logiques : `and`, `or`, `not`. Pour tester l'appartenance : `in` (`"a" in "abc"`, `3 in [1, 2, 3]`).

### Boucles

```python
for i in range(3):              # 0, 1, 2
    print(i)

for i, fruit in enumerate(["pomme", "kiwi"]):   # index et valeur
    print(i, fruit)

n = 0
while n < 3:
    n += 1                      # pas de n++ en Python
```

`break` sort de la boucle, `continue` passe au tour suivant.

### Listes, tuples, ensembles

```python
fruits = ["pomme", "kiwi"]      # liste : modifiable
fruits.append("poire")
fruits[0]                       # "pomme" ; fruits[-1] : le dernier
fruits[1:3]                     # tranche : ["kiwi", "poire"]
len(fruits)                     # 3

point = (3, 4)                  # tuple : immuable (ne se modifie plus après création)
x, y = point                    # déballage

uniques = {1, 2, 2, 3}          # set : {1, 2, 3}, sans doublons
```

Une **liste** se modifie (ajout, suppression, réaffectation d'un élément). Un **tuple** est immuable, ce qui en fait une clé de dictionnaire possible.

**Compréhensions** : elles construisent une liste en une ligne. `[x * 2 for x in range(3)]` donne `[0, 2, 4]`, et `[x for x in nombres if x % 2 == 0]` garde les nombres pairs.

### Dictionnaires

```python
ages = {"ada": 36, "alan": 41}
ages["grace"] = 85              # ajout ou mise à jour
ages.get("linus", 0)            # valeur par défaut si la clé manque
for nom, age in ages.items():
    print(nom, age)
```

Depuis Python 3.7, un `dict` conserve l'**ordre d'insertion** de ses clés.

### Fonctions

```python
def saluer(nom, poli=True):     # paramètre avec valeur par défaut
    return f"Bonjour {nom}" if poli else f"Salut {nom}"

saluer("Ada")                   # "Bonjour Ada"
saluer(nom="Ada", poli=False)   # arguments nommés
carre = lambda x: x * x         # fonction anonyme d'une expression
```

**Piège classique** : la valeur par défaut est créée **une seule fois**, à la définition de la fonction. Avec `def f(x=[])`, la même liste est partagée par tous les appels et grossit à chaque fois. Il faut écrire `def f(x=None):` puis `if x is None: x = []`.

### Classes et duck typing

```python
class Compte:
    def __init__(self, titulaire, solde=0):   # constructeur ; self = l'objet
        self.titulaire = titulaire
        self.solde = solde

    def deposer(self, montant):
        self.solde += montant

c = Compte("Ada")
c.deposer(100)
```

**Duck typing** : « si ça marche comme un canard… ». Un objet convient s'il a les méthodes attendues, quelle que soit sa classe. Une fonction qui appelle `.read()` accepte un fichier comme n'importe quel objet qui a une méthode `read`. `@dataclass` (module `dataclasses`) génère pour sa part le constructeur d'une classe qui ne sert qu'à porter des données.

### Erreurs

```python
try:
    n = int("abc")
except ValueError as e:
    print("pas un nombre :", e)
finally:
    print("toujours exécuté")

raise ValueError("montant négatif")   # lever une erreur
```

`with open("f.txt") as f:` ouvre une ressource et garantit sa fermeture, même en cas d'erreur.

### Générateurs : yield

```python
def compte_a_rebours(n):
    while n > 0:
        yield n          # produit une valeur, puis se met en pause
        n -= 1

for i in compte_a_rebours(3):   # 3, 2, 1
    print(i)
```

`yield` fait de la fonction un **générateur**, qui produit ses valeurs à la demande au lieu de construire toute la liste en mémoire. C'est utile pour lire un gros fichier ligne à ligne.

### Modules, paquets, environnements

- `import math` ou `from datetime import date` : on importe un module de la bibliothèque standard ou un paquet installé.
- Le bloc `if __name__ == "__main__":` ne s'exécute que si le fichier est lancé directement (`python script.py`), pas quand un autre fichier l'importe.
- **pip** installe les paquets depuis **PyPI**, l'index public : `pip install requests`.
- Un **environnement virtuel** (`python -m venv .venv`) isole les dépendances d'un projet de celles du système et des autres projets.
- **`pyproject.toml`** est le fichier standard d'un projet moderne : métadonnées, dépendances, outil de build. Il remplace `setup.py` et complète `requirements.txt`.

### Concurrence : threads, processus, asyncio

- **Threads** : à cause du GIL, ils n'accélèrent pas le calcul en Python pur. Ils restent utiles pour attendre des entrées-sorties.
- **`multiprocessing`** : plusieurs processus, chacun avec son interpréteur et son GIL. C'est la manière de répartir un calcul en Python pur sur plusieurs cœurs.
- **`asyncio`** : gérer beaucoup d'entrées-sorties concurrentes (requêtes réseau, base de données) dans un seul thread, avec `async def` et `await`.

```python
import asyncio

async def tache(n):
    await asyncio.sleep(1)      # attend sans bloquer les autres tâches
    return n

async def main():
    print(await asyncio.gather(tache(1), tache(2)))   # [1, 2] en ~1 s, pas 2

asyncio.run(main())
```

### Sous le capot

- **CPython**, l'implémentation de référence, compile le script en **bytecode** (les fichiers `.pyc`), puis l'interprète dans sa machine virtuelle.
- Il libère la mémoire par **comptage de références**, complété par un ramasse-miettes qui détecte les cycles (deux objets qui se référencent).
- **PyPy** est une autre implémentation de Python, avec un compilateur à la volée (JIT), souvent plus rapide sur le code Python pur.

## Exemples concrets

**Lire un CSV et agréger** (bibliothèque standard seule : pour de gros volumes, pandas ou Polars).

```python
import csv
from collections import defaultdict

ca = defaultdict(float)                 # dict dont les valeurs manquantes valent 0.0
with open("ventes.csv", newline="") as f:
    for ligne in csv.DictReader(f):      # chaque ligne = dict {colonne: valeur}
        ca[ligne["ville"]] += float(ligne["montant"])

for ville, total in sorted(ca.items(), key=lambda kv: kv[1], reverse=True):
    print(f"{ville:<10} {total:>10.2f}")
```

**Appeler une API JSON** (paquet `requests`, à installer avec pip).

```python
import requests

r = requests.get("https://api.github.com/repos/python/cpython", timeout=10)
r.raise_for_status()                     # erreur si code HTTP 4xx/5xx
depot = r.json()                         # dict Python
print(depot["full_name"], depot["stargazers_count"])
```

**Un petit script en ligne de commande** : arguments, fichiers, point d'entrée.

```python
import argparse
from pathlib import Path

def main():
    p = argparse.ArgumentParser(description="Compte les lignes des fichiers .py")
    p.add_argument("dossier")
    args = p.parse_args()
    total = sum(len(f.read_text().splitlines()) for f in Path(args.dossier).rglob("*.py"))
    print(f"{total} lignes")

if __name__ == "__main__":
    main()
```

## Pour aller plus loin

- [Tutoriel officiel](https://docs.python.org/fr/3/tutorial/)
- [Documentation Python](https://docs.python.org/3/)
