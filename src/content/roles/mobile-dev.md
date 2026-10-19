---
name: Développeur mobile
family: dev
summary: "Construit des applications installées sur téléphone, pour iOS et Android."
mission: "Écrit l'application que l'utilisateur installe depuis un store : écrans, gestes, accès à la caméra ou aux notifications, fonctionnement hors ligne. Il doit choisir entre deux applications natives et un code partagé entre les deux plateformes."
stack:
  - step: Choisir comment cibler iOS et Android
    intro: "Le choix structurant : écrire deux applications natives (une par plateforme) ou une seule base de code qui produit les deux."
    techs:
      - { tech: swift, essential: true, why: "Le langage natif d'iOS : accès direct à toutes les fonctions de la plateforme." }
      - { tech: kotlin, essential: true, why: "Le langage natif d'Android, recommandé par Google pour ses applications." }
      - { tech: flutter, essential: true, why: "Un seul code pour iOS et Android, avec son propre moteur de rendu : l'interface est identique partout." }
      - { tech: dart, why: "Le langage de Flutter : on l'apprend avec lui." }
      - { tech: react-native, essential: true, why: "Un seul code en JavaScript qui s'affiche avec les composants natifs de chaque plateforme." }
      - { tech: javascript, why: "Le langage de React Native, partagé avec le monde du web." }
      - { tech: typescript, why: "Les types sur React Native : les mêmes bénéfices que sur le web." }
  - step: Parler au backend
    intro: "Une application mobile consomme une API : réseau lent, coupures et versions anciennes encore installées imposent d'y réfléchir."
    techs:
      - { tech: rest, essential: true, why: "Le format d'API que les applications mobiles appellent le plus souvent." }
      - { tech: graphql, why: "Limite les données transférées en ne demandant que les champs utiles : utile quand le réseau compte." }
      - { tech: websocket, why: "Pour les écrans en temps réel : messagerie, suivi de livraison." }
  - step: Authentifier l'utilisateur
    intro: "Se connecter sur un téléphone doit être fluide et sûr ; les jetons se stockent dans l'espace sécurisé de l'appareil."
    techs:
      - { tech: auth0, why: "Connexion managée avec SSO et connexion sociale, utilisable depuis une application mobile." }
      - { tech: supabase, why: "Un backend prêt (base, authentification, API) pour lancer une application sans écrire son serveur." }
  - step: Livrer et surveiller
    intro: "On ne peut pas corriger une application en la redéployant instantanément : les stores valident et les utilisateurs mettent à jour quand ils veulent."
    techs:
      - { tech: github-actions, why: "Construit et teste l'application à chaque push, pour préparer les versions envoyées aux stores." }
      - { tech: sentry, why: "Remonte les plantages avec le modèle de téléphone et la version, pour les reproduire." }
---
