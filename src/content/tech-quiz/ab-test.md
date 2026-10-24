---
questions:
  - id: probleme
    prompt: "Pourquoi comparer un « avant » et un « après » ne suffit-il pas à mesurer l'effet d'un changement ?"
    answer: "L'écart mélange l'effet du changement avec tout le reste : saison, campagne marketing, concurrent"
    decoys:
      - "Parce qu'il faut au moins trois périodes de mesure pour calculer une moyenne fiable"
      - "Parce que les données d'avant sont toujours effacées quand on met en ligne une nouvelle version du site"
    why: "Tout ce qui change entre les deux périodes peut expliquer l'écart. L'A/B test compare les deux versions en même temps, sur des groupes tirés au hasard."
  - id: definition
    prompt: "Qu'est-ce qu'un A/B test ?"
    answer: "Une expérience qui répartit au hasard les utilisateurs entre l'existant (A) et une variante (B)"
    decoys:
      - "Une comparaison entre les résultats de deux mois consécutifs, avant et après un changement"
      - "Un sondage où l'on demande aux utilisateurs quelle version ils préfèrent"
    why: "La répartition aléatoire et simultanée est le cœur de la méthode."
  - id: controle
    prompt: "Comment appelle-t-on le groupe A, qui voit la version existante ?"
    answer: "Le groupe de contrôle"
    decoys:
      - "Le groupe de garde-fou"
      - "Le groupe pilote"
    why: "Le groupe de contrôle sert de point de comparaison pour la variante B."
  - id: causalite
    prompt: "Pourquoi un A/B test permet-il de parler d'effet causal ?"
    answer: "Grâce au hasard, la seule différence systématique entre les groupes est le changement"
    decoys:
      - "Parce qu'il porte toujours sur un très grand nombre d'utilisateurs, ce qui élimine le hasard"
      - "Parce que la métrique est mesurée deux fois, avant et après"
    why: "La répartition aléatoire équilibre en moyenne tout le reste. Un écart de métrique est donc attribuable au changement."
  - id: simultane
    prompt: "Pourquoi les deux versions tournent-elles en même temps ?"
    answer: "Pour que la saison, les campagnes et les événements touchent les deux groupes de la même façon"
    decoys:
      - "Pour diviser par deux la durée totale du test, quel que soit le trafic disponible sur le site"
      - "Pour que chaque utilisateur puisse voir les deux versions et choisir la meilleure"
    why: "Tout ce qui se passe pendant le test arrive aux deux groupes : seule la version diffère."
  - id: hypothese
    prompt: "Par quoi commence un A/B test ?"
    answer: "Formuler l'hypothèse, par exemple « le nouveau bouton augmente le taux d'achat »"
    decoys:
      - "Mettre la variante en ligne pour tous, puis observer les métriques pendant un mois"
      - "Regarder les résultats des premiers jours pour choisir la métrique la plus favorable"
    why: "L'hypothèse et la métrique se fixent avant de lancer, sinon on adapte la question au résultat."
  - id: metrique-principale
    prompt: "Pourquoi choisir la métrique principale avant de lancer le test ?"
    answer: "C'est elle qui décidera : la choisir après coup reviendrait à chercher jusqu'à trouver"
    decoys:
      - "Parce que les outils d'expérimentation ne mesurent qu'une seule métrique à la fois"
      - "Parce qu'une métrique choisie après le lancement n'est plus enregistrée"
    why: "Choisir la métrique au vu des résultats, c'est le problème des tests multiples : on finit par trouver un écart par hasard."
  - id: garde-fou
    prompt: "À quoi servent les métriques de garde-fou ?"
    answer: "Vérifier que la variante ne dégrade pas autre chose, comme le temps de chargement"
    decoys:
      - "Remplacer la métrique principale quand elle n'est pas significative à la fin du test"
      - "Bloquer automatiquement les utilisateurs qui voient les deux versions"
    why: "Une variante peut améliorer la métrique principale tout en dégradant les désinscriptions ou la performance."
  - id: taille-echantillon
    prompt: "Quand calculer la taille d'échantillon d'un A/B test ?"
    answer: "Avant de lancer, à partir de l'effet minimal détectable, du seuil et de la puissance"
    decoys:
      - "Pendant le test, en s'arrêtant dès que le résultat devient significatif sur la métrique principale"
      - "Après le test, pour savoir combien d'utilisateurs ont participé"
    why: "La taille d'échantillon fixe la durée du test. S'arrêter dès que c'est significatif gonfle les faux positifs."
  - id: emd
    prompt: "Qu'est-ce que l'effet minimal détectable ?"
    answer: "Le plus petit effet qui vaudrait la peine d'être détecté"
    decoys:
      - "L'effet observé le premier jour du test"
      - "Le plus grand effet jamais mesuré dans l'entreprise, qui sert de référence"
    why: "Plus l'effet visé est petit, plus il faut d'utilisateurs pour le distinguer du hasard."
  - id: unite
    prompt: "À quel niveau répartit-on, en général, les utilisateurs d'un A/B test sur un site ?"
    answer: "Par utilisateur, de façon stable : il voit toujours la même version"
    decoys:
      - "Par page vue : chaque affichage tire une version au hasard, même pour un utilisateur déjà vu"
      - "Par jour : tout le monde voit A les jours pairs et B les jours impairs"
    why: "Un utilisateur qui changerait de version d'une page à l'autre brouillerait la mesure. Alterner par jour mêlerait l'effet du jour."
  - id: semaines
    prompt: "Pourquoi faire tourner un test sur des semaines complètes ?"
    answer: "Le comportement varie selon les jours de la semaine"
    decoys:
      - "Les outils ne savent compter que par semaine"
      - "Pour que chaque groupe ait exactement le même nombre d'utilisateurs"
    why: "Un test lancé un lundi et arrêté un jeudi ne verrait pas le comportement du week-end."
  - id: analyse-taux
    prompt: "Quel test utiliser pour comparer des taux de conversion entre A et B ?"
    answer: "Un test du χ² ou un test de proportions"
    decoys:
      - "Un t apparié"
      - "Une régression logistique sur un seul groupe"
    why: "Un taux est une proportion. Pour une moyenne (comme le panier), on utiliserait un t de Student."
  - id: analyse-moyenne
    prompt: "Quel test utiliser pour comparer le panier moyen entre A et B ?"
    answer: "Un t de Student"
    decoys:
      - "Un test du χ²"
      - "Un t apparié"
    why: "Deux groupes indépendants et une moyenne : t de Student. Les groupes ne sont pas appariés, ce ne sont pas les mêmes utilisateurs."
  - id: intervalle
    prompt: "Pourquoi donner l'intervalle de confiance de l'effet en plus de la p-value ?"
    answer: "Il dit de combien la variante change la métrique, et avec quelle précision"
    decoys:
      - "Il remplace le test : sans lui, la p-value ne peut pas être calculée sur des taux de conversion"
      - "Il indique la durée restante avant la fin du test"
    why: "La décision dépend de la taille de l'effet, pas seulement de son existence."
  - id: peeking
    prompt: "Pourquoi ne pas arrêter un test dès que le résultat devient significatif ?"
    answer: "À force de vérifier, on passe sous le seuil par hasard : les faux positifs gonflent"
    decoys:
      - "Parce que les résultats significatifs disparaissent toujours au bout de quelques jours"
      - "Parce que les outils effacent les données des tests arrêtés en avance"
    why: "C'est le peeking. On attend la taille d'échantillon prévue, ou on utilise une méthode conçue pour le suivi continu."
  - id: segments
    prompt: "Le test n'est pas significatif, mais il l'est pour « les utilisateurs mobiles de Bretagne ». Que faire ?"
    answer: "S'en méfier : à force de découper en segments, on trouve un écart par hasard"
    decoys:
      - "Déployer la variante pour ce segment : le résultat est prouvé"
      - "Refaire le test uniquement sur ce segment, en le présentant comme le résultat principal"
    why: "Multiplier les segments et les métriques, c'est le problème des tests multiples. Un tel résultat est au mieux une piste à tester à part."
  - id: srm
    prompt: "On attend une répartition 50/50 et on observe un écart net (par exemple 55/45). Que conclure ?"
    answer: "La répartition ou la collecte a un bug : les résultats ne sont pas fiables"
    decoys:
      - "La variante B est moins attractive, puisqu'elle a moins d'utilisateurs"
      - "Rien : un écart de répartition n'a aucune importance pour l'analyse"
    why: "C'est un sample ratio mismatch. Il trahit souvent un bug de répartition ou de mesure, qui fausse la comparaison."
  - id: nouveaute
    prompt: "Qu'est-ce que l'effet de nouveauté ?"
    answer: "Les utilisateurs cliquent sur ce qui est nouveau, puis l'effet retombe"
    decoys:
      - "Les nouveaux utilisateurs voient toujours la variante B, les anciens la version A"
      - "Une variante récente est toujours meilleure qu'une ancienne"
    why: "Un gain mesuré les premiers jours peut s'effacer. Il faut une durée suffisante pour le voir."
  - id: aa
    prompt: "À quoi sert un test A/A ?"
    answer: "Vérifier que la chaîne de mesure ne trouve pas d'écart là où il n'y en a pas"
    decoys:
      - "Tester deux variantes nouvelles entre elles, sans groupe de contrôle ni version existante"
      - "Rejouer un ancien A/B test pour confirmer son résultat"
    why: "Les deux groupes voient la même version : un écart significatif signale un problème de répartition ou de mesure."
  - id: faible-trafic
    prompt: "Un site a peu de visiteurs. Pourquoi un A/B test peut-il être une mauvaise idée ?"
    answer: "Atteindre la taille d'échantillon prendrait des mois : le test ne conclurait pas"
    decoys:
      - "Les A/B tests sont interdits sous un certain nombre de visiteurs par jour, pour des raisons légales"
      - "Le hasard ne fonctionne pas avec peu d'utilisateurs"
    why: "Avec peu de trafic, seuls de très gros effets sont détectables dans un délai raisonnable."
  - id: long-terme
    prompt: "Pourquoi un A/B test mesure-t-il mal l'effet d'un changement sur la fidélité à un an ?"
    answer: "La durée d'un test ne capte pas un effet qui ne se voit qu'à long terme"
    decoys:
      - "La fidélité n'est pas une métrique qu'un test statistique peut comparer"
      - "Les utilisateurs fidèles sont exclus des A/B tests par principe"
    why: "Un test dure quelques semaines ; un effet sur un an lui échappe."
  - id: ethique
    prompt: "Dans quel cas ne pas faire d'A/B test, même avec assez de trafic ?"
    answer: "Quand la variante pourrait nuire à une partie des utilisateurs"
    decoys:
      - "Quand la variante ne concerne que la couleur d'un bouton ou un texte"
      - "Quand la métrique principale est un taux de conversion"
    why: "On ne teste pas au hasard ce qui pourrait nuire : raisons éthiques ou légales."
  - id: interference
    prompt: "Pourquoi un A/B test est-il délicat sur une place de marché où acheteurs et vendeurs interagissent ?"
    answer: "Les groupes s'influencent : B change aussi l'expérience de A"
    decoys:
      - "Les places de marché n'ont jamais assez de trafic pour un test"
      - "Les vendeurs doivent donner leur accord écrit pour chaque test"
    why: "Si les vendeurs de B attirent les acheteurs de A, la comparaison est faussée."
  - id: usage
    prompt: "Pour quel type de décision l'A/B test est-il fait ?"
    answer: "Mesurer l'effet d'un changement de produit : interface, prix, recommandation, e-mail"
    decoys:
      - "Décrire le profil moyen des clients actuels, sans rien changer au produit"
      - "Prédire le chiffre d'affaires du prochain trimestre à partir de l'historique"
    why: "L'A/B test mesure l'effet d'un changement. Décrire, c'est le rôle des statistiques descriptives ; prédire, celui d'un modèle."
  - id: desaccord
    prompt: "Deux équipes ne sont pas d'accord sur la meilleure page d'accueil. Que propose un A/B test ?"
    answer: "Trancher par des données plutôt que par des opinions"
    decoys:
      - "Garder la version de l'équipe la plus nombreuse"
      - "Afficher les deux pages côte à côte à chaque utilisateur"
    why: "Avec assez de trafic, l'expérience mesure laquelle des deux pages fait vraiment mieux."
  - id: test-hypothese
    prompt: "Quel lien entre un A/B test et un test d'hypothèse ?"
    answer: "L'analyse d'un A/B test est un test d'hypothèse : l'écart dépasse-t-il le hasard ?"
    decoys:
      - "Aucun : l'A/B test se décide en regardant quelle courbe monte le plus haut"
      - "Le test d'hypothèse remplace l'A/B test quand on n'a pas de groupe de contrôle"
    why: "H0 : la variante n'a pas d'effet. La p-value et l'intervalle de confiance décident."
  - id: description
    prompt: "Avant de conclure un A/B test, que regarder dans chaque groupe ?"
    answer: "Les effectifs, la distribution de la métrique et les valeurs atypiques"
    decoys:
      - "Seulement la p-value finale : le reste n'apporte rien à la décision"
      - "Le nom des utilisateurs de chaque groupe"
    why: "Une distribution très asymétrique ou quelques valeurs extrêmes (un très gros panier) peuvent changer la conclusion."
  - id: reference
    prompt: "Quel livre fait référence sur les expériences en ligne contrôlées ?"
    answer: "Trustworthy Online Controlled Experiments, de Kohavi, Tang et Xu"
    decoys:
      - "R for Data Science, de Wickham, Çetinkaya-Rundel et Grolemund"
      - "Pro Git, de Chacon et Straub"
    why: "C'est l'ouvrage de référence sur les A/B tests en ligne. R for Data Science porte sur R, Pro Git sur Git."
  - id: avant-apres-vs-ab
    prompt: "Le taux d'achat a monté le mois du nouveau bouton. Un A/B test aurait-il apporté quelque chose ?"
    answer: "Oui : il aurait séparé l'effet du bouton de celui de la saison ou des campagnes"
    decoys:
      - "Non : la hausse du taux d'achat suffit à prouver l'effet du bouton"
      - "Non : un A/B test ne mesure que les taux de clics sur un bouton, jamais les achats"
    why: "Sans groupe de contrôle simultané, impossible de savoir ce qui revient au bouton."
---
