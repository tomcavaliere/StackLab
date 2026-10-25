---
name: nouvelle-fiche
description: Écrire une ou plusieurs fiches StackPolitique (src/content/fiches/<id>.md) : parti, personnalité, courant d'idées, notion, institution ou événement, avec recherche web, sources datées et quiz. À utiliser quand l'utilisateur demande « ajoute une fiche », « ajoute le parti X », « écris la fiche de Y », « fais le parcours de tel parti ».
---

# Écrire une fiche StackPolitique

La procédure de référence est « Procédure : ajouter une fiche » dans `stackpolitique/CLAUDE.md`. Ce skill la déroule.

Toutes les commandes se lancent en bash depuis le dossier `stackpolitique/`, avec ce préfixe (le venv est à la racine du dépôt) : `export PATH="$PWD/../.venv/Scripts:$PWD/../.venv/bin:$PATH"` (`Scripts` sous Windows, `bin` sous macOS).

## 1. Cadrer

- **id** : nom du fichier, kebab-case ASCII minuscule (`la-france-insoumise`, `jean-luc-melenchon`). Vérifier qu'il n'existe pas : `ls src/content/fiches/`.
- **kind** (`src/lib/taxonomy.ts`) : `parti`, `personnalite`, `courant`, `notion`, `institution`, `evenement`.
- **Plusieurs fiches à la fois** (un parcours de parti) : fixer d'abord la liste des ids et des kinds, pour que les fiches puissent se citer (`party`, `liens`).

## 2. Rechercher (obligatoire pour un parti ou une personnalité)

La politique bouge : dirigeants, alliances, programmes, mandats. **Ne rien écrire de mémoire sur l'actualité.**

1. Chercher sur le web, dans cet ordre : programme officiel et site du parti ; institutions (Assemblée nationale, Sénat, Conseil constitutionnel, ministère de l'Intérieur pour les résultats) ; vie-publique.fr ; presse de référence (pour les faits datés : élections internes, nominations, ruptures).
2. Noter chaque fait avec sa source et sa date. Résultats électoraux : uniquement des chiffres officiels, avec l'élection et l'année.
3. **Pas de résumé à valider** : écrire directement. La traçabilité passe par la fiche elle-même : chaque fait écrit doit venir d'une source listée dans `sources` (titre, type, date). Un fait qu'aucune source retenue ne confirme n'est pas écrit. Ce qui est incertain ou contesté est dit dans la fiche, et repris dans le compte rendu final à l'utilisateur.

## 3. Écrire

- **Modèles** : `src/content/fiches/clivage-gauche-droite.md` (notion), `cinquieme-republique.md` (institution).
- **Frontmatter** : `name`, `kind`, `family` (parti seulement, vocabulaire `FAMILIES`), `party` (personnalité : id de la fiche de son parti), `tags`, `difficulty` (1 à 3), `summary` (une phrase), `liens: [{ fiche, note }]` (affichés dans les deux sens avec la même note : ne déclarer qu'un côté, et écrire une note qui se lit depuis les deux fiches), `sources` (au moins une : `{ url, title, date, type, note? }`), `lastResearched` (date du jour).
- **Source non datée** (page de site officiel, texte consolidé) : date de consultation et `note: "page non datée, date de consultation"`. Date connue seulement au mois : le 1er du mois, et le dire dans `note`.
- **Sections `##` imposées** (le build les vérifie) :
  - parti : `Origines et histoire`, `Idées et valeurs`, `Programme`, `Figures`, `Électorat et résultats`, `Pour aller plus loin` ;
  - personnalité : `Parcours`, `Positions`, `Rôle aujourd'hui`, `Pour aller plus loin` ;
  - courant, notion, institution, événement : `De quoi s'agit-il`, `Pourquoi c'est important`, `Idées reçues`, `Pour aller plus loin`.
- **Programme** : citer le dernier programme publié et son année (« dans son programme pour les législatives de 2024, le parti propose… »). Grandes mesures par thème (économie, travail et retraites, écologie, immigration, Europe, institutions, sécurité), pour que les comparaisons soient possibles.
- **Classification** (`family`) : nomenclature usuelle (ministère de l'Intérieur, science politique). Si le parti la conteste, le dire dans la fiche, avec sa position.
- **Style** : phrases courtes et concrètes, ton pédagogique. Typographie française (espace avant « : ; ? ! », guillemets « »).

## 4. Neutralité et exactitude

- **Attribuer chaque position** : « le parti propose », « selon son programme », « X affirme ». Jamais de jugement éditorial (« irréaliste », « courageux », « dangereux »).
- **Les critiques sont attribuées** à qui les formule (un adversaire, une institution, un économiste nommé), et la réponse du parti est donnée quand elle existe.
- **Même structure et même profondeur pour tous les partis.** Relire la fiche d'un parti déjà écrit pour garder le même niveau de détail.
- Aucun chiffre inventé (sondages, effectifs, coûts). En cas de doute, l'écrire ou ne rien mettre.
- Signaler à l'utilisateur, en fin de travail, ce qui n'a pas pu être vérifié.

## 5. Quiz, parcours, validation

- Écrire le quiz avec le skill `quiz-fiche` (20 questions, chaque réponse dans la fiche).
- Placer la fiche dans `src/content/parcours/parcours.md` : notion, institution ou courant commun dans le tronc commun ; fiche d'un parti et de ses personnalités dans le parcours du parti (`kind: parti`, `party: <id>`, `requires: [tronc-commun]`). Le build échoue si une fiche n'est dans aucun parcours ou figure deux fois dans un parcours et ceux qu'il requiert.
- `npm run build` doit passer sans avertissement « Fiches sans quiz ».
- Si le serveur de dev tourne, il ne revalide pas une fiche dont la cible vient d'apparaître : réenregistrer le fichier.
