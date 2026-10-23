---
# Atelier de la fiche PHP : pas d'exécution dans le navigateur ; le code se colle dans 3v4l.org.
playground: https://3v4l.org/
playgroundNote: "bac à sable communautaire, non officiel"
exercises:
  - id: boucle-conditions
    title: "Boucle, conditions, concaténation"
    prompt: "Afficher, pour $i de 1 à 5, « i : pair » ou « i : impair », une ligne chacun. Concaténer avec le point."
    starter: |
      <?php
      for ($i = 1; $i <= 5; $i++) {
          echo $i . "\n";
      }
    solution: |
      <?php
      for ($i = 1; $i <= 5; $i++) {
          echo $i . " : " . ($i % 2 === 0 ? "pair" : "impair") . "\n";
      }
    expected: |
      1 : impair
      2 : pair
      3 : impair
      4 : pair
      5 : impair

  - id: tableaux
    title: "Tableaux : liste et dictionnaire"
    prompt: "Compter les mots du texte dans un tableau associatif, le trier par clé (ksort), puis afficher « mot : n »."
    starter: |
      <?php
      $mots = explode(" ", "le chat et le chien et le poisson");
      $compte = [];
      print_r($compte);
    solution: |
      <?php
      $mots = explode(" ", "le chat et le chien et le poisson");
      $compte = [];
      foreach ($mots as $mot) {
          $compte[$mot] = ($compte[$mot] ?? 0) + 1;
      }
      ksort($compte);
      foreach ($compte as $mot => $n) {
          echo "$mot : $n\n";
      }
    expected: |
      chat : 1
      chien : 1
      et : 2
      le : 3
      poisson : 1

  - id: egalite-stricte
    title: "== ou === ?"
    prompt: "estZero() doit répondre « oui » seulement pour l'entier 0 : ni pour la chaîne « 0 », ni pour null, ni pour false. Corriger la comparaison."
    starter: |
      <?php
      function estZero($v): string {
          return $v == 0 ? "oui" : "non";
      }
      foreach ([0, "0", null, false, 5] as $v) {
          echo estZero($v) . "\n";
      }
    solution: |
      <?php
      function estZero($v): string {
          return $v === 0 ? "oui" : "non";
      }
      foreach ([0, "0", null, false, 5] as $v) {
          echo estZero($v) . "\n";
      }
    expected: |
      oui
      non
      non
      non
      non

  - id: match
    title: "L'expression match (PHP 8)"
    prompt: "Réécrire tranche() avec match (true) : « mineur » sous 18 ans, « adulte » sous 65, « senior » sinon."
    starter: |
      <?php
      function tranche(int $age): string {
          return "?";
      }
      foreach ([12, 40, 70] as $age) {
          echo tranche($age) . "\n";
      }
    solution: |
      <?php
      function tranche(int $age): string {
          return match (true) {
              $age < 18 => "mineur",
              $age < 65 => "adulte",
              default => "senior",
          };
      }
      foreach ([12, 40, 70] as $age) {
          echo tranche($age) . "\n";
      }
    expected: |
      mineur
      adulte
      senior

  - id: classes
    title: "Classes et interfaces"
    prompt: "Écrire la classe Carre (promotion de propriété dans le constructeur) qui implémente Forme, puis afficher l'aire de chaque forme avec number_format(…, 2)."
    starter: |
      <?php
      interface Forme {
          public function aire(): float;
      }

      final class Cercle implements Forme {
          public function __construct(private float $r) {}
          public function aire(): float { return M_PI * $this->r ** 2; }
      }

      $formes = [new Cercle(1)];
      foreach ($formes as $f) {
          echo number_format($f->aire(), 2) . "\n";
      }
    solution: |
      <?php
      interface Forme {
          public function aire(): float;
      }

      final class Cercle implements Forme {
          public function __construct(private float $r) {}
          public function aire(): float { return M_PI * $this->r ** 2; }
      }

      final class Carre implements Forme {
          public function __construct(private float $cote) {}
          public function aire(): float { return $this->cote ** 2; }
      }

      $formes = [new Cercle(1), new Carre(3)];
      foreach ($formes as $f) {
          echo number_format($f->aire(), 2) . "\n";
      }
    expected: |
      3.14
      9.00

  - id: echapper
    title: "Cas concret : afficher une saisie sans faille XSS"
    prompt: "La saisie contient du HTML. L'afficher dans un paragraphe en l'échappant avec htmlspecialchars, pour qu'elle s'affiche comme du texte au lieu de s'exécuter."
    starter: |
      <?php
      $saisie = '<script>alert("pirate")</script>';
      echo "<p>" . $saisie . "</p>\n";
    solution: |
      <?php
      $saisie = '<script>alert("pirate")</script>';
      echo "<p>" . htmlspecialchars($saisie) . "</p>\n";
    expected: |
      <p>&lt;script&gt;alert(&quot;pirate&quot;)&lt;/script&gt;</p>
---
