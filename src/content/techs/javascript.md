---
name: JavaScript
kind: langage
layers: []
tags: [web, typage-dynamique, standard]
difficulty: 1
summary: "Le langage que les navigateurs exécutent nativement ; avec Node.js, il tourne aussi côté serveur."
alternatives:
  - tech: typescript
    note: "JavaScript avec des types vérifiés à la compilation ; préférable dès que le code grossit ou que l'équipe s'agrandit."
---

## Problème résolu

Une page HTML seule ne réagit pas aux actions de l'utilisateur sans être rechargée. JavaScript est le langage que tous les navigateurs exécutent nativement : il modifie la page (le DOM), réagit aux événements et échange avec les serveurs sans rechargement. D'autres langages ne peuvent viser le navigateur qu'en compilant vers JavaScript ou vers WebAssembly.

Le langage est normalisé sous le nom ECMAScript (ECMA-262) et reçoit une nouvelle édition chaque année. Depuis Node.js (2009), il tourne aussi côté serveur : une équipe peut écrire le front et le back dans le même langage.

## Quand l'utiliser

- Tout code exécuté dans le navigateur : c'est incontournable, directement ou via TypeScript qui compile vers lui.
- Petits scripts, prototypes, outillage front.
- Back-end Node.js quand l'équipe est déjà à l'aise en JavaScript.

## Quand l'éviter

- Gros code partagé entre plusieurs développeurs : le typage dynamique laisse passer des erreurs que TypeScript détecte à la compilation.
- Calcul intensif côté serveur : Node.js exécute le JavaScript sur un seul thread principal par processus, et un calcul long y bloque les autres requêtes.
- Traitement de données ou machine learning : l'écosystème Python est bien plus fourni.

## Syntaxe

JavaScript a été créé chez Netscape en 1995, par Brendan Eich. Il n'a guère en commun avec Java que le nom, choisi pour profiter de la popularité de Java à l'époque. Quand l'équipe ou le code grossit, on lui préfère TypeScript, qui ajoute des types vérifiés à la compilation.

### Variables : let, const, var

```js
const nom = "Ada";       // constante : pas de réaffectation
let age = 36;            // variable, limitée au bloc { … } où elle est déclarée
age = 37;
var ancien = true;       // ancienne syntaxe : portée de la fonction entière, à éviter
```

- `let` et `const` sont limités au **bloc**, alors que `var` vaut pour **toute la fonction**.
- `const` interdit la **réaffectation**, pas la modification : `const user = {}; user.nom = "Ada";` est permis.
- Types de base : `string`, `number` (un seul type de nombre, en flottant binaire), `boolean`, `undefined`, `null`, `bigint`, `symbol`, plus les objets (tableaux et fonctions compris).
- `undefined` veut dire « rien n'a été affecté ». `null` est une absence de valeur voulue, posée par le développeur. Bizarrerie historique : `typeof null` renvoie `"object"`.
- Les nombres sont des flottants binaires (IEEE 754), qui ne représentent pas exactement 0,1 : `0.1 + 0.2 === 0.3` vaut `false`. Pour de l'argent, on compte en centimes entiers.

```js
console.log(`${nom} a ${age} ans`);   // gabarit entre accents graves : interpolation
```

### Comparaisons et conditions

```js
1 == "1";     // true  : == convertit les types avant de comparer
1 === "1";    // false : === compare sans conversion, c'est celui à utiliser

if (age < 18) {
  console.log("mineur");
} else if (age < 65) {
  console.log("adulte");
} else {
  console.log("senior");
}
const statut = age >= 18 ? "majeur" : "mineur";   // ternaire
```

- **Valeurs « falsy »** : `false`, `0`, `""`, `null`, `undefined`, `NaN`. Tout le reste est vrai dans un `if`.
- `count || 10` remplace toute valeur falsy, donc aussi `0` et `""`. `count ?? 10` ne remplace que `null` et `undefined` : c'est le bon choix pour une valeur par défaut.
- **Chaînage optionnel** : `user?.address?.city` vaut `undefined`, sans erreur, si `user` ou `address` est absent.

### Boucles

```js
for (let i = 0; i < 3; i++) console.log(i);        // 0, 1, 2
for (const fruit of ["pomme", "kiwi"]) console.log(fruit);   // valeurs d'un tableau
for (const cle in { a: 1, b: 2 }) console.log(cle);          // clés d'un objet
let n = 0;
while (n < 3) n++;
```

### Tableaux

```js
const nombres = [3, 8, 1, 6];
nombres.push(10);                         // ajoute à la fin
nombres.length;                           // 5
nombres.map((x) => x * 2);                // NOUVEAU tableau : [6, 16, 2, 12, 20]
nombres.filter((x) => x % 2 === 0);       // [8, 6, 10]
nombres.reduce((somme, x) => somme + x, 0);   // 28
nombres.find((x) => x > 5);               // 8
[...nombres].sort((a, b) => a - b);       // tri numérique (sans fonction : tri alphabétique !)
const [premier, ...reste] = nombres;      // déstructuration
```

`map` renvoie un **nouveau** tableau, qui contient le résultat de la fonction pour chaque élément. Le tableau d'origine ne change pas.

### Objets

```js
const user = { nom: "Ada", age: 36 };
user.ville = "Londres";                   // ajout d'une propriété
const { nom, age } = user;                // déstructuration
const copie = { ...user, age: 37 };       // copie avec une propriété changée
Object.entries(user);                     // [["nom", "Ada"], ["age", 36], …]
JSON.stringify(user);                     // '{"nom":"Ada",…}'
JSON.parse('{"a":1}');                    // { a: 1 }
```

Le format **JSON** vient de la syntaxe des objets littéraux de JavaScript. Pour un dictionnaire aux clés quelconques, il existe aussi `Map`.

### Fonctions et fermetures

```js
function aire(r) { return Math.PI * r * r; }
const carre = (x) => x * x;               // fonction fléchée
function saluer(nom = "toi") { return `Bonjour ${nom}`; }   // paramètre par défaut

function compteur() {
  let n = 0;
  return () => ++n;                       // la fonction interne garde accès à n
}
const suivant = compteur();
suivant(); suivant();                     // 1, puis 2
```

Une **fermeture** (closure) est une fonction qui garde accès aux variables de la portée où elle a été créée, même après la fin de cette portée.

Une **fonction fléchée** n'a pas son propre `this` : elle reprend celui de la portée où elle est définie. Une fonction classique reçoit un `this` qui dépend de la façon dont elle est appelée.

### Classes et prototypes

```js
class Animal {
  constructor(nom) { this.nom = nom; }
  parler() { return `${this.nom} fait un bruit`; }
}
class Chien extends Animal {
  parler() { return `${this.nom} aboie`; }
}
new Chien("Rex").parler();                // "Rex aboie"
```

`class` est une syntaxe plus lisible, mais l'héritage repose toujours sur les **prototypes**. Chaque objet a un prototype, où il va chercher les propriétés qu'il n'a pas lui-même.

### Asynchrone : boucle d'événements, Promise, async/await

JavaScript exécute le code sur un seul thread. Les opérations lentes (réseau, minuteries) ne bloquent pas : leur suite est mise en file, puis exécutée par la **boucle d'événements** quand le code en cours est terminé. C'est pourquoi `setTimeout(fn, 0)` lance `fn` après la fin du code synchrone, pas immédiatement.

Une **Promise** représente le résultat futur d'une opération asynchrone, qui finira réussie ou échouée. `async`/`await` permet de l'écrire comme du code séquentiel :

```js
async function chargerUser(id) {
  try {
    const r = await fetch(`/api/users/${id}`);   // attend sans bloquer le thread
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return await r.json();
  } catch (e) {
    console.error("échec :", e.message);
  }
}
const [a, b] = await Promise.all([chargerUser(1), chargerUser(2)]);   // en parallèle
```

Un calcul lourd bloque malgré tout ce thread unique : on le confie à un **worker** (Web Worker dans le navigateur, `worker_threads` dans Node.js), qui s'exécute sur un autre thread.

### Modules et npm

```js
// math.js
export function somme(a, b) { return a + b; }
// app.js
import { somme } from "./math.js";
```

`import`/`export` est la syntaxe de modules de la norme depuis ES2015. Dans Node.js, on croise aussi l'ancienne, `require()`. **npm** est le gestionnaire de paquets livré avec Node.js, et aussi son registre public (`npm install express`). Les dépendances d'un projet sont listées dans `package.json`.

### Le DOM

```js
const bouton = document.querySelector("#envoyer");
bouton.addEventListener("click", () => {
  document.querySelector("#message").textContent = "Envoyé !";
});
```

## Exemples concrets

**Appeler une API et afficher le résultat dans la page.**

```js
async function afficherDepots(utilisateur) {
  const liste = document.querySelector("#depots");
  const r = await fetch(`https://api.github.com/users/${utilisateur}/repos`);
  const depots = await r.json();
  liste.innerHTML = "";
  for (const d of depots.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 5)) {
    const li = document.createElement("li");
    li.textContent = `${d.name} : ${d.stargazers_count} ★`;   // textContent : pas d'injection HTML
    liste.append(li);
  }
}
afficherDepots("torvalds");
```

**Regrouper et totaliser des données** : un traitement typique avant un affichage.

```js
const ventes = [
  { ville: "Lyon", montant: 120 },
  { ville: "Paris", montant: 80 },
  { ville: "Lyon", montant: 60 },
];
const parVille = ventes.reduce((acc, v) => {
  acc[v.ville] = (acc[v.ville] ?? 0) + v.montant;
  return acc;
}, {});
console.log(parVille);   // { Lyon: 180, Paris: 80 }
```

**Un mini-serveur HTTP avec Node.js**, sans dépendance.

```js
import { createServer } from "node:http";

createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ chemin: req.url, heure: new Date().toISOString() }));
}).listen(3000, () => console.log("http://localhost:3000"));
```

## Pour aller plus loin

- [Guide JavaScript (MDN)](https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide)
- [Spécification ECMAScript](https://tc39.es/ecma262/)
