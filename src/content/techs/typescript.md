---
name: TypeScript
kind: langage
layers: []
tags: [web, typage-statique, open-source]
difficulty: 2
summary: "JavaScript avec des types statiques : le compilateur vérifie les types puis les efface, et le code produit est du JavaScript standard."
---

## Problème résolu

Dans un gros projet JavaScript, une faute de frappe dans un nom de propriété ou un argument du mauvais type n'apparaît qu'à l'exécution, parfois en production. TypeScript, créé par Microsoft en 2012, ajoute des annotations de type que le compilateur vérifie avant l'exécution. Les éditeurs s'en servent aussi pour l'autocomplétion et le renommage sûr.

Les types n'existent qu'à la compilation : ils sont effacés et le résultat est du JavaScript ordinaire, qui tourne partout où JavaScript tourne. Tout fichier JavaScript valide est presque toujours du TypeScript valide, ce qui permet une adoption progressive.

## Quand l'utiliser

- Toute application front ou Node.js destinée à durer ou à être partagée entre plusieurs développeurs.
- Quand on veut que le contrat entre front et back (forme des données d'une API) soit vérifié par l'outillage.
- C'est aujourd'hui le choix par défaut de la plupart des frameworks front (React, Vue, Next.js proposent des modèles TypeScript).

## Quand l'éviter

- Script jetable de quelques lignes : la configuration n'en vaut pas la peine.
- Les types ne vérifient rien à l'exécution : des données venues de l'extérieur (requête HTTP, fichier) doivent toujours être validées, par exemple avec une bibliothèque comme Zod.
- Une étape de compilation s'ajoute à la chaîne de build, même si les versions récentes de Node.js savent exécuter directement du TypeScript simple en retirant les types.

## Syntaxe

TypeScript, c'est la syntaxe de JavaScript (boucles, conditions, tableaux, fonctions : voir la fiche JavaScript), plus des **types statiques** vérifiés à la compilation. Sa création a été dirigée par Anders Hejlsberg, déjà à l'origine de C#. En 2025, Microsoft a annoncé réécrire le compilateur en Go pour l'accélérer.

### Annotations et inférence

```ts
let nom: string = "Ada";
let age = 36;                 // pas d'annotation : le type number est DÉDUIT de la valeur
const actif: boolean = true;
const notes: number[] = [12, 15];
const point: [number, number] = [3, 4];   // tuple : longueur et types fixés

function aire(r: number): number {        // paramètres et retour typés
  return Math.PI * r * r;
}
aire("3");   // erreur de compilation : string n'est pas assignable à number
```

L'inférence évite d'annoter partout : on annote surtout les paramètres de fonction et les frontières (API, modules).

### Types objet : type et interface

```ts
interface User {
  id: number;
  nom: string;
  email?: string;              // ? : propriété optionnelle
  readonly creeLe: Date;       // non modifiable après création
}
type Point = { x: number; y: number };   // alias : même usage pour un objet

const u: User = { id: 1, nom: "Ada", creeLe: new Date() };
```

- Le typage est **structurel** : un objet est compatible avec un type s'il en a la **forme**, c'est-à-dire les propriétés et leurs types, quel que soit son nom ou sa classe.
- Deux `interface User` déclarées dans la même portée **fusionnent** : c'est la fusion de déclarations, utile pour compléter le type d'une bibliothèque. Un `type` ne peut pas être déclaré deux fois.

### Unions et rétrécissement

```ts
function formater(x: string | number) {    // soit une chaîne, soit un nombre
  if (typeof x === "string") {
    return x.toUpperCase();                 // ici, le compilateur sait que x est une string
  }
  return x.toFixed(2);                      // ici, un number
}
```

Le **rétrécissement** (narrowing) : après un test (`typeof`, `instanceof`, `in`, comparaison), le compilateur restreint le type dans le bloc.

**Union discriminée** : une propriété commune, souvent `kind`, distingue les cas. La tester restreint le type. Affecter la valeur à une variable de type `never` dans le `default` fait échouer la compilation si un cas n'est pas traité :

```ts
type Forme = { kind: "cercle"; r: number } | { kind: "carre"; c: number };

function aireForme(f: Forme): number {
  switch (f.kind) {
    case "cercle": return Math.PI * f.r ** 2;   // f est un cercle ici
    case "carre":  return f.c ** 2;
    default:
      const jamais: never = f;                   // erreur si on ajoute un cas sans le traiter
      return jamais;
  }
}
```

### any, unknown, null

- `any` désactive toute vérification : à éviter.
- `unknown` accepte n'importe quelle valeur, mais **oblige à vérifier son type** avant usage. C'est le bon type pour une donnée externe.
- Avec `strictNullChecks`, `null` et `undefined` ne sont plus acceptés partout : `string | null` doit être testé avant usage.
- `document.getElementById("app")!` : l'opérateur `!` **affirme** au compilateur que la valeur n'est pas `null`, sans rien vérifier à l'exécution.
- `valeur as User` est une **assertion de type** : à l'exécution, elle ne fait rien. C'est une simple indication pour le compilateur, qui peut donc mentir.

### Génériques

```ts
function premier<T>(items: T[]): T | undefined {
  return items[0];
}
const n = premier([1, 2, 3]);        // T = number, donc n : number | undefined
const s = premier(["a", "b"]);       // T = string
```

Le paramètre `T` relie le type du résultat à celui des éléments reçus, sans perdre l'information comme le ferait `any`.

### Types utilitaires

```ts
type Brouillon = Partial<User>;               // toutes les propriétés deviennent optionnelles
type Apercu = Pick<User, "id" | "nom">;       // seulement ces propriétés
type SansEmail = Omit<User, "email">;
type ParId = Record<number, User>;            // dictionnaire : clé number, valeur User
```

### satisfies

```ts
type Config = { port: number; host?: string };
const config = { port: 3000 } satisfies Config;
config.port;   // vérifié contre Config, mais le type précis { port: number } est gardé
```

`satisfies` vérifie qu'une valeur respecte un type, sans l'élargir à ce type (une annotation `: Config` l'élargirait).

### enum : l'exception à l'effacement

```ts
enum Couleur { Rouge, Vert }          // produit un vrai objet JavaScript dans le code compilé
type CouleurBis = "rouge" | "vert";   // souvent préféré : une union de littéraux, effacée
```

Les types sont **effacés** à la compilation. Un `enum` classique fait exception : il génère un objet présent à l'exécution.

### Projet et outillage

- **`tsconfig.json`** configure le compilateur : version de JavaScript visée, modules, fichiers inclus. L'option **`strict`** active un ensemble de vérifications plus sévères, dont `strictNullChecks`. Elle est recommandée sur tout nouveau projet.
- **`tsc`** est le compilateur officiel. Beaucoup de projets compilent avec **esbuild** ou **SWC**, plus rapides, mais qui se contentent de retirer les types sans les vérifier. On lance alors **`tsc --noEmit`** (en CI par exemple) pour vérifier les types sans produire de fichiers.
- Pour une bibliothèque JavaScript livrée sans types, on installe son paquet **`@types/…`** (`npm install -D @types/lodash`), issu du projet communautaire **DefinitelyTyped**, s'il existe.
- Les types ne vérifient rien à l'exécution. Une donnée externe se valide avec une bibliothèque comme Zod, qui donne en plus le type TypeScript :

```ts
import { z } from "zod";
const UserSchema = z.object({ id: z.number(), nom: z.string() });
type User = z.infer<typeof UserSchema>;            // type déduit du schéma
const user = UserSchema.parse(await r.json());     // lève une erreur si la forme est fausse
```

## Exemples concrets

**Typer la réponse d'une API, et la valider à l'arrivée.**

```ts
interface Depot {
  name: string;
  stargazers_count: number;
}

async function topDepots(utilisateur: string, n = 5): Promise<Depot[]> {
  const r = await fetch(`https://api.github.com/users/${utilisateur}/repos`);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const data: unknown = await r.json();             // unknown : rien n'est garanti
  if (!Array.isArray(data)) throw new Error("réponse inattendue");
  return (data as Depot[])                          // assertion après une vérification minimale
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, n);
}
```

**Modéliser des états avec une union discriminée** : impossible d'oublier un cas.

```ts
type Etat =
  | { statut: "chargement" }
  | { statut: "succes"; donnees: string[] }
  | { statut: "erreur"; message: string };

function rendu(e: Etat): string {
  switch (e.statut) {
    case "chargement": return "Chargement…";
    case "succes":     return e.donnees.join(", ");   // donnees n'existe que dans ce cas
    case "erreur":     return `Erreur : ${e.message}`;
  }
}
```

**Une fonction générique réutilisable** : regrouper n'importe quelle liste par une clé.

```ts
function grouperPar<T, K extends string>(items: T[], cle: (item: T) => K): Record<K, T[]> {
  const out = {} as Record<K, T[]>;
  for (const item of items) (out[cle(item)] ??= []).push(item);
  return out;
}
const parVille = grouperPar([{ nom: "Ada", ville: "Londres" }], (u) => u.ville);
```

## Pour aller plus loin

- [Documentation officielle](https://www.typescriptlang.org/docs/)
- [TypeScript pour les développeurs JavaScript](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
