# StackPolitique

Une app web pour comprendre en profondeur les mouvements politiques français : l'histoire, les idées, le programme et les figures de chaque parti, après un tronc commun de notions et d'institutions.

Projet perso, pour un seul utilisateur, protégé par un mot de passe, pensé pour le téléphone. Même méthode que [StackData](../stackdata/README.md), dont le moteur est copié.

## Ce qu'on y trouve

| Page | Contenu |
|---|---|
| **Parcours** (`/`) | Le tronc commun (clivages, institutions, élections, grands courants), puis un parcours par parti, groupés par famille politique, et des comparaisons entre partis. Chaque étape validée ouvre la suivante. |
| **Fiches** (`/fiches`) | Partis, personnalités, courants d'idées, notions, institutions, événements. Chaque fiche cite ses sources, datées ; une source de plus de 3 ans est signalée sur les fiches de parti et de personnalité. |
| **Quiz** (`/quiz`) | Un QCM de 20 questions par fiche, et des thèmes « quel parti défend cette mesure ? ». Sessions de 10 questions. |
| **Révisions** et **Renforcement** | Répétition espacée des questions déjà vues ; les questions jamais vues des étapes validées. |
| **Progression** (`/progression`) | XP, niveaux (de Sympathisant à Sage du Conseil constitutionnel), série, badges, maîtrise par fiche. |

## Démarrer

L'installation est décrite dans le [README de la racine](../README.md). Ensuite, depuis la racine : `npm run dev:politique`, ou depuis ce dossier : `npm run dev`. L'app tourne sur http://localhost:4322/politique/ ; en ligne, sous `/politique`, derrière le portail commun aux deux apps. Sans configuration, la progression va dans `data/stackpolitique.db`.

## Règles de contenu

Neutralité (chaque position est attribuée, aucune n'est jugée), sources datées, recherche web avant toute fiche de parti ou de personnalité : détails et procédures dans [CLAUDE.md](CLAUDE.md), et pas à pas dans les skills Claude Code de `.claude/skills/` (`nouvelle-fiche`, `quiz-fiche`, `quiz-theme`).
