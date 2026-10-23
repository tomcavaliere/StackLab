---
name: PHP
kind: langage
layers: []
tags: [typage-dynamique, open-source, web]
difficulty: 1
summary: "Langage de script côté serveur né pour le web : chaque requête exécute le script dans un contexte neuf. Il fait tourner WordPress et une grande partie du web."
---

## Problème résolu

Au milieu des années 1990, rendre une page web dynamique demandait d'écrire des programmes CGI. PHP (Rasmus Lerdorf, 1995) permet d'insérer du code directement dans les pages, exécuté par le serveur à chaque requête. Chaque requête repart d'un état vierge : rien n'est partagé entre deux requêtes, ce qui rend le déploiement simple (on dépose des fichiers) et limite la portée d'une erreur.

Le langage a beaucoup évolué : PHP 7 (2015) a nettement amélioré les performances, PHP 8 (2020) a ajouté un compilateur à la volée (JIT), des types plus stricts et une syntaxe modernisée. Composer gère les dépendances. WordPress, Drupal, Laravel et Symfony sont écrits en PHP, et Facebook l'a été à ses débuts.

## Quand l'utiliser

- Sites et CMS (WordPress, Drupal), leurs thèmes et leurs extensions.
- Applications web avec Laravel ou Symfony, par une équipe qui pratique PHP.
- Hébergement mutualisé bon marché : la plupart des hébergeurs l'exécutent sans configuration.

## Quand l'éviter

- Processus de longue durée et connexions persistantes (WebSockets, workers en continu) : le modèle d'une exécution par requête ne s'y prête pas d'origine ; des serveurs comme FrankenPHP ou Swoole changent ce modèle.
- Data et machine learning : l'écosystème Python domine.
- Application mobile ou code exécuté dans le navigateur : ce n'est pas son terrain.

## Syntaxe

PHP signifie aujourd'hui **« PHP: Hypertext Preprocessor »**, un acronyme récursif. Les versions ont sauté un numéro : PHP 6, un projet centré sur Unicode, a été abandonné, et on est passé directement de PHP 5 à PHP 7.

### Fichiers, variables, chaînes

```php
<?php                                   // ouvre un bloc de code PHP
declare(strict_types=1);                // types scalaires vérifiés strictement (voir plus bas)

$nom = "Ada";                           // toute variable commence par $
$age = 36;
$taille = 1.70;
$actif = true;
$rien = null;

echo "Bonjour $nom\n";                  // guillemets doubles : variables interpolées
echo 'Bonjour $nom';                    // guillemets simples : texte brut
echo "Total : " . ($age * 2) . "\n";    // le POINT concatène les chaînes
```

Dans une page, le code PHP se mêle au HTML : `<p>Bonjour <?= htmlspecialchars($nom) ?></p>`. `<?=` est un raccourci de `<?php echo`.

### Comparaisons et conditions

```php
var_dump(0 == "0");      // true  : == convertit les opérandes avant de comparer
var_dump(0 === "0");     // false : === compare aussi le type, sans conversion

if ($age < 18) {
    echo "mineur";
} elseif ($age < 65) {
    echo "adulte";
} else {
    echo "senior";
}

$tranche = match (true) {               // PHP 8 : match renvoie une valeur
    $age < 18 => "mineur",
    $age < 65 => "adulte",
    default   => "senior",
};
```

À la différence de `switch`, `match` **renvoie une valeur**, compare **strictement** (`===`) et ne « tombe » jamais dans la branche suivante, donc pas de `break` à écrire. `$valeur ?? "défaut"` remplace une valeur absente ou `null`.

### Boucles

```php
for ($i = 0; $i < 3; $i++) { echo $i; }
foreach ($fruits as $fruit) { echo $fruit; }
foreach ($ages as $nom => $age) { echo "$nom : $age\n"; }   // clé et valeur
while ($n < 3) { $n++; }
```

### Tableaux : liste et dictionnaire à la fois

Un `array` PHP est une structure **ordonnée** qui sert à la fois de **liste** (clés 0, 1, 2…) et de **dictionnaire** (clés texte).

```php
$fruits = ["pomme", "kiwi"];
$fruits[] = "poire";                       // ajout à la fin
count($fruits);                            // 3

$ages = ["ada" => 36, "alan" => 41];       // dictionnaire
$ages["grace"] = 85;
isset($ages["linus"]);                     // false

$pairs = array_filter([1, 2, 3, 4], fn($n) => $n % 2 === 0);   // [1 => 2, 3 => 4] : les clés sont gardées
$doubles = array_map(fn($n) => $n * 2, [1, 2, 3]);             // [2, 4, 6]
sort($fruits);                             // trie en place
```

### Fonctions et types

```php
function aire(float $r): float {           // types des paramètres et du retour
    return M_PI * $r ** 2;
}

function saluer(string $nom, bool $poli = true): string {
    return $poli ? "Bonjour $nom" : "Salut $nom";
}
saluer(nom: "Ada", poli: false);           // arguments nommés (PHP 8)
$carre = fn($x) => $x * $x;                // fonction fléchée
```

Sans `declare(strict_types=1)`, PHP convertit si possible : `aire("3")` passe. Avec, un type scalaire faux lève une **`TypeError`** au lieu d'une conversion silencieuse.

### Classes, interfaces, enums

```php
interface Forme {
    public function aire(): float;
}

final class Carre implements Forme {
    public function __construct(private float $cote) {}   // promotion : déclare et affecte la propriété
    public function aire(): float { return $this->cote ** 2; }
}

$c = new Carre(3);
echo $c->aire();                            // -> pour accéder aux membres d'un objet

enum Statut: string {                       // énumérations : PHP 8.1
    case Brouillon = 'brouillon';
    case Publie = 'publie';
}
Statut::Publie->value;                      // "publie"
```

### Erreurs

```php
try {
    if ($montant < 0) throw new InvalidArgumentException("montant négatif");
} catch (InvalidArgumentException $e) {
    echo "Erreur : " . $e->getMessage();
} finally {
    echo "fin";
}
```

### Sécurité : base de données et affichage

- **PDO** est l'interface d'accès aux bases de données, commune à plusieurs SGBD : MySQL, PostgreSQL, SQLite…
- Contre l'**injection SQL**, on utilise des **requêtes préparées** avec des paramètres liés. Les valeurs ne sont jamais collées dans le texte SQL.
- Contre le **XSS**, toute donnée affichée dans une page passe par **`htmlspecialchars`**, qui échappe `<`, `>`, `&` et les guillemets.

```php
$pdo = new PDO("mysql:host=localhost;dbname=app", $user, $mdp);
$stmt = $pdo->prepare("SELECT nom FROM clients WHERE ville = :ville");
$stmt->execute(["ville" => $_GET["ville"] ?? ""]);
foreach ($stmt as $ligne) {
    echo "<li>" . htmlspecialchars($ligne["nom"]) . "</li>";
}
```

### Écosystème et exécution

- **Composer** gère les dépendances (`composer require monolog/monolog`), déclarées dans `composer.json`. Son dépôt public par défaut est **Packagist**.
- **Autoloading** : Composer génère un chargeur (`require 'vendor/autoload.php';`) qui charge le fichier d'une classe au moment où elle sert pour la première fois. Plus besoin de `require` à la main.
- Les **PSR** sont des recommandations de standards publiées par le **PHP-FIG** : autoloading (PSR-4), style de code (PSR-12), interfaces communes (journalisation, HTTP…).
- En production, PHP tourne souvent derrière Nginx via **PHP-FPM**, un gestionnaire de processus FastCGI. **OPcache** garde en mémoire le bytecode compilé des scripts, pour ne pas les recompiler à chaque requête.
- **Laravel** et **Symfony** sont les deux grands frameworks web. Laravel réutilise plusieurs composants de Symfony.

## Exemples concrets

**Un formulaire de contact** : lecture de la saisie, validation, réaffichage échappé.

```php
<?php
$erreurs = [];
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($_POST["email"] ?? "");
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $erreurs[] = "Email invalide";
    }
}
?>
<form method="post">
  <input name="email" value="<?= htmlspecialchars($_POST["email"] ?? "") ?>">
  <button>Envoyer</button>
  <?php foreach ($erreurs as $e): ?>
    <p class="erreur"><?= htmlspecialchars($e) ?></p>
  <?php endforeach; ?>
</form>
```

**Une petite API JSON** sans framework.

```php
<?php
header("Content-Type: application/json");
$pdo = new PDO("sqlite:app.db");
$stmt = $pdo->prepare("SELECT id, nom FROM produits WHERE prix <= ? ORDER BY prix");
$stmt->execute([(float) ($_GET["max"] ?? 100)]);
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
```

**Une route Laravel**, pour comparer avec la version sans framework.

```php
// routes/web.php
Route::get('/produits', function (Request $request) {
    return Produit::where('prix', '<=', $request->query('max', 100))->orderBy('prix')->get();
});
```

## Pour aller plus loin

- [Documentation officielle](https://www.php.net/manual/fr/)
- [PHP: The Right Way](https://phptherightway.com/)
