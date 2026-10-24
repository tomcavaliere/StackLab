---
# Atelier de la fiche Java : pas d'exécution dans le navigateur ; le code se colle dans le playground officiel (dev.java).
playground: https://dev.java/playground/
exercises:
  - id: boucle-conditions
    title: "Boucle et conditions"
    prompt: "Afficher, pour i de 1 à 5, « i : pair » ou « i : impair »."
    starter: |
      public class Main {
          public static void main(String[] args) {
              for (int i = 1; i <= 5; i++) {
                  System.out.println(i);
              }
          }
      }
    solution: |
      public class Main {
          public static void main(String[] args) {
              for (int i = 1; i <= 5; i++) {
                  System.out.println(i + " : " + (i % 2 == 0 ? "pair" : "impair"));
              }
          }
      }
    expected: |
      1 : impair
      2 : pair
      3 : impair
      4 : pair
      5 : impair

  - id: comparer-chaines
    title: "Chaînes : == ou equals() ?"
    prompt: "Ce programme affiche « différents » alors que les deux chaînes ont le même contenu. Corriger la comparaison."
    starter: |
      public class Main {
          public static void main(String[] args) {
              String a = "ada";
              String b = new String("ada");
              System.out.println(a == b ? "identiques" : "différents");
          }
      }
    solution: |
      public class Main {
          public static void main(String[] args) {
              String a = "ada";
              String b = new String("ada");
              System.out.println(a.equals(b) ? "identiques" : "différents");
          }
      }
    expected: |
      identiques

  - id: map-compter
    title: "Collections : compter avec une Map"
    prompt: "Compter les occurrences de chaque mot dans une HashMap, puis afficher « mot : n » dans l'ordre alphabétique (une TreeMap trie ses clés)."
    starter: |
      import java.util.*;

      public class Main {
          public static void main(String[] args) {
              String[] mots = "le chat et le chien et le poisson".split(" ");
              Map<String, Integer> compte = new HashMap<>();
              System.out.println(compte);
          }
      }
    solution: |
      import java.util.*;

      public class Main {
          public static void main(String[] args) {
              String[] mots = "le chat et le chien et le poisson".split(" ");
              Map<String, Integer> compte = new HashMap<>();
              for (String m : mots) {
                  compte.put(m, compte.getOrDefault(m, 0) + 1);
              }
              for (Map.Entry<String, Integer> e : new TreeMap<>(compte).entrySet()) {
                  System.out.println(e.getKey() + " : " + e.getValue());
              }
          }
      }
    expected: |
      chat : 1
      chien : 1
      et : 2
      le : 3
      poisson : 1

  - id: interface-forme
    title: "Classes et interfaces"
    prompt: "Écrire les classes Carre et Cercle qui implémentent l'interface Forme, décommenter les deux add, et afficher l'aire de chaque forme avec 2 décimales (Locale.ROOT : un point décimal, pas une virgule)."
    starter: |
      import java.util.*;

      public class Main {
          public static void main(String[] args) {
              List<Forme> formes = new ArrayList<>();
              // formes.add(new Carre(3));
              // formes.add(new Cercle(1));
              for (Forme f : formes) {
                  System.out.printf(Locale.ROOT, "%.2f%n", f.aire());
              }
          }
      }

      interface Forme {
          double aire();
      }
    solution: |
      import java.util.*;

      public class Main {
          public static void main(String[] args) {
              List<Forme> formes = new ArrayList<>();
              formes.add(new Carre(3));
              formes.add(new Cercle(1));
              for (Forme f : formes) {
                  System.out.printf(Locale.ROOT, "%.2f%n", f.aire());
              }
          }
      }

      interface Forme {
          double aire();
      }

      class Carre implements Forme {
          private final double c;
          Carre(double c) { this.c = c; }
          public double aire() { return c * c; }
      }

      class Cercle implements Forme {
          private final double r;
          Cercle(double r) { this.r = r; }
          public double aire() { return Math.PI * r * r; }
      }
    expected: |
      9.00
      3.14

  - id: exception
    title: "Exceptions"
    prompt: "Integer.parseInt lève une NumberFormatException sur un texte qui n'est pas un nombre. Attraper l'exception pour afficher « pas un nombre : abc » au lieu de planter, puis « fin »."
    starter: |
      public class Main {
          public static void main(String[] args) {
              String saisie = "abc";
              int n = Integer.parseInt(saisie);
              System.out.println(n * 2);
              System.out.println("fin");
          }
      }
    solution: |
      public class Main {
          public static void main(String[] args) {
              String saisie = "abc";
              try {
                  int n = Integer.parseInt(saisie);
                  System.out.println(n * 2);
              } catch (NumberFormatException e) {
                  System.out.println("pas un nombre : " + saisie);
              }
              System.out.println("fin");
          }
      }
    expected: |
      pas un nombre : abc
      fin

  - id: streams
    title: "Cas concret : filtrer et totaliser avec les streams"
    prompt: "Avec un stream, garder les commandes de plus de 50 €, afficher leurs montants triés par ordre croissant, puis leur total."
    starter: |
      import java.util.*;
      import java.util.stream.*;

      public class Main {
          public static void main(String[] args) {
              List<Integer> montants = Arrays.asList(120, 30, 75, 50, 200, 10);
              System.out.println(montants);
          }
      }
    solution: |
      import java.util.*;
      import java.util.stream.*;

      public class Main {
          public static void main(String[] args) {
              List<Integer> montants = Arrays.asList(120, 30, 75, 50, 200, 10);
              List<Integer> gros = montants.stream()
                      .filter(m -> m > 50)
                      .sorted()
                      .collect(Collectors.toList());
              System.out.println(gros);
              System.out.println(gros.stream().mapToInt(Integer::intValue).sum());
          }
      }
    expected: |
      [75, 120, 200]
      395
---
