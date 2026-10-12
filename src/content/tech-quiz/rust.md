---
questions:
  - id: surete-memoire
    prompt: "Comment Rust garantit-il la sûreté mémoire ?"
    answer: "Par un système de possession et d'emprunt vérifié par le compilateur, sans ramasse-miettes"
    decoys:
      - "Par un ramasse-miettes particulièrement rapide"
      - "Par des vérifications à l'exécution, qui arrêtent le programme dès qu'un accès mémoire est invalide"
    why: "Les accès mémoire invalides sont refusés dès la compilation."
  - id: troisieme-voie
    prompt: "Quelle voie Rust prend-il entre le C et les langages à ramasse-miettes ?"
    answer: "Une sûreté garantie à la compilation, sans runtime ni pauses de ramasse-miettes"
    decoys:
      - "Une gestion manuelle comme en C, avec des avertissements du compilateur"
      - "Un ramasse-miettes comme en Go, avec un typage plus strict"
    why: "Le C laisse les erreurs mémoire passer ; Java et Go les évitent au prix d'un runtime. Rust évite les deux écueils."
  - id: courses-de-donnees
    prompt: "Outre les accès mémoire invalides, quel type de bug le code « sûr » de Rust exclut-il ?"
    answer: "Les courses de données"
    decoys:
      - "Les erreurs de logique métier"
      - "Les boucles infinies"
    why: "Le compilateur empêche deux threads de modifier les mêmes données sans synchronisation. Il ne vérifie pas la logique métier."
  - id: prix
    prompt: "Quel est le prix des garanties de sûreté de Rust ?"
    answer: "Une courbe d'apprentissage réelle : le compilateur refuse beaucoup de programmes"
    decoys:
      - "Des performances bien inférieures à celles de Python, à cause des vérifications"
      - "L'impossibilité d'écrire du code concurrent"
    why: "En retour, le code compilé est rapide et prévisible."
  - id: cargo
    prompt: "Que fait Cargo ?"
    answer: "Il gère le build, les dépendances et les tests"
    decoys:
      - "C'est le ramasse-miettes de Rust, désactivable"
      - "C'est un framework web"
    why: "Rust n'a pas de ramasse-miettes ; Cargo est son outil de build."
  - id: origine
    prompt: "Où Rust est-il né ?"
    answer: "Chez Mozilla, version 1.0 en 2015"
    decoys:
      - "Chez Google, en 2009, comme Go"
      - "Chez Apple, en 2014, comme Swift"
    why: "Google a annoncé Go en 2009, Apple Swift en 2014."
  - id: linux
    prompt: "Où Rust est-il utilisé depuis 2022 ?"
    answer: "Dans le noyau Linux"
    decoys:
      - "Comme langage officiel d'Android, à la place de Kotlin"
      - "Dans le navigateur, à la place de JavaScript"
    why: "Rust est aussi utilisé dans Firefox et dans l'infrastructure de grands acteurs du cloud."
  - id: mvp
    prompt: "Un MVP CRUD à livrer vite : Rust est-il un bon choix ?"
    answer: "Non : le temps d'apprentissage et d'écriture ne se rentabilise pas"
    decoys:
      - "Oui : Rust est le langage le plus rapide à écrire"
      - "Non : Rust ne sait pas servir de requêtes HTTP sans bibliothèque en C"
    why: "Rust sert très bien du HTTP, mais ses garanties coûtent du temps de développement."
  - id: vs-go
    prompt: "Pour un service réseau classique, que conseille la fiche entre Rust et Go ?"
    answer: "Go, qui apporte l'essentiel des performances utiles avec une prise en main bien plus rapide"
    decoys:
      - "Rust, car Go n'a pas de concurrence intégrée"
      - "Rust, car le ramasse-miettes de Go est trop lent pour un service réseau, quel que soit le trafic"
    why: "Go a la concurrence intégrée (goroutines) et suffit souvent pour des services réseau."
  - id: polars
    prompt: "Quelle bibliothèque Python rapide est écrite en Rust ?"
    answer: "Polars"
    decoys:
      - "pandas"
      - "Django"
    why: "Python reste la référence en data, mais certaines de ses bibliothèques rapides sont écrites en Rust."
  - id: regle-emprunt
    prompt: "En Rust, quelles références vers une même valeur peuvent coexister à un instant donné ?"
    answer: "Plusieurs références partagées (&T), ou une seule référence mutable (&mut T)"
    decoys:
      - "Autant de références mutables que de threads qui accèdent à la valeur"
      - "Une seule référence au total, qu'elle soit partagée (&T) ou mutable (&mut T)"
    why: "Lecteurs multiples ou écrivain unique : cette règle empêche qu'une donnée change pendant qu'on la lit ailleurs."
  - id: deplacement
    prompt: "En Rust, que devient la String a après let b = a; ?"
    answer: "Elle est déplacée : a n'est plus utilisable, b en devient propriétaire"
    decoys:
      - "Elle est copiée : a et b possèdent chacune leur propre chaîne"
      - "a et b partagent la même chaîne, avec un compteur de références"
    why: "Une String a un seul propriétaire. Pour une copie, il faut appeler .clone() ; le comptage de références passe par Rc ou Arc."
  - id: drop
    prompt: "En Rust, quand la mémoire d'une valeur est-elle libérée ?"
    answer: "Quand son propriétaire sort de portée, par un appel automatique à drop"
    decoys:
      - "Au prochain passage du ramasse-miettes, qui détecte les valeurs inutilisées"
      - "Quand le programmeur appelle explicitement free sur la valeur"
    why: "Rust n'a pas de ramasse-miettes et n'exige pas de free : la libération est insérée par le compilateur en fin de portée."
  - id: option
    prompt: "Comment Rust représente-t-il une valeur qui peut être absente ?"
    answer: "Avec le type Option<T> : Some(valeur) ou None"
    decoys:
      - "Avec null, comme en Java ou en C#"
      - "Avec une valeur sentinelle comme -1, par convention"
    why: "Rust n'a pas de null dans le code sûr : le compilateur oblige à traiter le cas None."
  - id: result
    prompt: "Comment une fonction Rust signale-t-elle une erreur récupérable ?"
    answer: "En renvoyant un Result<T, E> : Ok(valeur) ou Err(erreur)"
    decoys:
      - "En levant une exception, attrapée plus haut par un bloc try/catch"
      - "En appelant panic!, que l'appelant intercepte ensuite"
    why: "Rust n'a pas d'exceptions. panic! est réservé aux erreurs irrécupérables."
  - id: operateur-question
    prompt: "En Rust, que fait l'opérateur ? placé après un appel qui renvoie un Result ?"
    answer: "Il renvoie l'erreur à l'appelant si c'est un Err, sinon extrait la valeur"
    decoys:
      - "Il ignore l'erreur et continue avec la valeur par défaut du type"
      - "Il transforme l'erreur en panic et arrête immédiatement le programme"
    why: "? propage l'erreur sans écrire de match à chaque appel. Il n'ignore rien et ne provoque pas de panic."
  - id: unwrap
    prompt: "En Rust, quel est le risque d'appeler .unwrap() ?"
    answer: "Un panic si la valeur est None ou Err"
    decoys:
      - "Il libère la mémoire de la valeur avant son utilisation"
      - "Il désactive les vérifications d'emprunt sur la valeur"
    why: "unwrap suppose que tout va bien : pratique en prototype, à éviter là où l'erreur est possible."
  - id: unsafe
    prompt: "En Rust, à quoi sert un bloc unsafe ?"
    answer: "Autoriser des opérations non vérifiables, comme déréférencer un pointeur brut"
    decoys:
      - "Désactiver toutes les vérifications du compilateur, emprunts compris, dans le fichier"
      - "Exécuter le code dans un processus isolé pour en limiter les dégâts"
    why: "unsafe ouvre quelques opérations précises ; le vérificateur d'emprunt reste actif. Le programmeur garantit alors lui-même la sûreté."
  - id: traits
    prompt: "Qu'est-ce qu'un trait en Rust ?"
    answer: "Un ensemble de méthodes qu'un type peut implémenter, proche d'une interface"
    decoys:
      - "Une classe de base abstraite dont un type hérite les champs et les méthodes"
      - "Une macro qui génère les tests unitaires d'un module"
    why: "Rust n'a pas d'héritage de classes : le comportement partagé passe par les traits et les génériques."
  - id: match-exhaustif
    prompt: "En Rust, que vérifie le compilateur sur une expression match ?"
    answer: "Que tous les cas possibles sont couverts"
    decoys:
      - "Que chaque branche renvoie une valeur différente des autres"
      - "Que les cas sont écrits dans l'ordre de déclaration de l'enum"
    why: "Un match non exhaustif ne compile pas : ajouter une variante à un enum signale tous les endroits à mettre à jour."
  - id: crates-io
    prompt: "Où sont publiées les bibliothèques (crates) Rust ?"
    answer: "Sur crates.io"
    decoys:
      - "Sur npmjs.com"
      - "Sur PyPI"
    why: "crates.io est le registre de l'écosystème Rust, utilisé par Cargo. npm sert JavaScript, PyPI Python."
  - id: durees-de-vie
    prompt: "En Rust, à quoi servent les durées de vie (lifetimes), notées 'a ?"
    answer: "Indiquer au compilateur pendant combien de temps une référence reste valide"
    decoys:
      - "Fixer la durée d'exécution maximale d'une fonction avant son arrêt"
      - "Programmer la libération automatique d'une valeur après un délai"
    why: "Les durées de vie permettent de prouver qu'aucune référence ne survit à la valeur qu'elle désigne. Elles n'ont rien à voir avec le temps réel."
  - id: let-mut
    prompt: "En Rust, une variable déclarée avec let est-elle modifiable ?"
    answer: "Non : il faut let mut pour pouvoir la modifier"
    decoys:
      - "Oui : let déclare toujours une variable modifiable"
      - "Oui, mais seulement dans le bloc où elle est déclarée"
    why: "L'immuabilité est le défaut en Rust : la mutabilité doit être demandée explicitement."
  - id: cout-zero
    prompt: "Que signifie le principe des « abstractions à coût zéro » de Rust ?"
    answer: "Une abstraction compile vers un code aussi efficace qu'écrit à la main"
    decoys:
      - "Les bibliothèques publiées sur crates.io sont toutes gratuites"
      - "Les abstractions de haut niveau sont retirées du langage pour gagner en vitesse"
    why: "Itérateurs, génériques ou traits ne coûtent rien à l'exécution par rapport à une boucle écrite à la main."
  - id: webassembly
    prompt: "Quelle cible de compilation permet d'exécuter du Rust dans un navigateur ?"
    answer: "WebAssembly"
    decoys:
      - "La JVM"
      - "Le moteur V8, qui interprète le Rust"
    why: "Rust compile vers WebAssembly, que les navigateurs exécutent. V8 n'interprète pas le code source Rust."
  - id: tokio
    prompt: "Quel runtime asynchrone est le plus répandu pour async/await en Rust ?"
    answer: "Tokio"
    decoys:
      - "asyncio"
      - "Celery"
    why: "La bibliothèque standard de Rust ne fournit pas de runtime asynchrone : Tokio comble ce rôle. asyncio et Celery appartiennent à Python."
  - id: arc-mutex
    prompt: "En Rust, comment partager une donnée modifiable entre plusieurs threads ?"
    answer: "Avec Arc<Mutex<T>>"
    decoys:
      - "Avec Rc<RefCell<T>>"
      - "Avec une static mut sans verrou"
    why: "Arc compte les références de façon atomique, Mutex synchronise l'accès. Rc et RefCell ne sont pas sûrs entre threads : le compilateur les refuse."
  - id: cargo-new
    prompt: "Quelle commande crée un nouveau projet Rust ?"
    answer: "cargo new"
    decoys:
      - "rustc init"
      - "rustup create"
    why: "Cargo crée le projet, son Cargo.toml et un premier fichier source. rustc compile, rustup installe les chaînes d'outils."
  - id: rustup
    prompt: "À quoi sert rustup ?"
    answer: "Installer et mettre à jour les chaînes d'outils Rust"
    decoys:
      - "Publier une crate sur le registre crates.io"
      - "Formater le code source selon le style officiel de Rust"
    why: "rustup gère les versions du compilateur et de Cargo. La publication passe par cargo publish, le formatage par rustfmt."
  - id: clippy
    prompt: "Que fait Clippy dans l'écosystème Rust ?"
    answer: "Il signale les erreurs courantes et le code non idiomatique"
    decoys:
      - "Il formate le code source, comme rustfmt"
      - "Il compile le projet en mode release optimisé"
    why: "Clippy est le linter officiel, lancé par cargo clippy. Le formatage revient à rustfmt."
---
