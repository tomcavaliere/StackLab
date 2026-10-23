// Contrôles du contenu que Zod ne peut pas faire (il ne valide que le frontmatter, sans connaître l'id de l'entrée).
// Lancé par `npm run build`, avant `astro build`.
//  - chaque fiche techno contient les sections imposées du corps Markdown ;
//  - une fiche langage (kind: langage) contient en plus « Syntaxe » et « Exemples concrets » ;
//  - chaque quiz de techno (src/content/tech-quiz/<id>.md) correspond à une fiche existante ;
//  - chaque fichier d'exercices (src/content/exercises/<id>.md) correspond à une fiche langage ; sans playground, à un langage
//    exécutable dans le navigateur (RUNNABLE de src/components/atelier/run.ts).
// Une fiche sans quiz n'est qu'un avertissement : ajouter une techno reste possible avec un seul fichier.
import { existsSync, readdirSync, readFileSync } from 'node:fs';

const TECHS = 'src/content/techs';
const TECH_QUIZ = 'src/content/tech-quiz';
const EXERCISES = 'src/content/exercises';
const REQUIRED = ['Problème résolu', "Quand l'utiliser", "Quand l'éviter", 'Pour aller plus loin'];
const LANGUAGE = ['Syntaxe', 'Exemples concrets'];
const RUNNABLE = ['sql', 'python', 'javascript', 'typescript'];
const markdown = (dir) => readdirSync(dir).filter((f) => f.endsWith('.md'));

const errors = [];
for (const file of markdown(TECHS)) {
  const [, front, ...rest] = readFileSync(`${TECHS}/${file}`, 'utf8').split(/^---\r?$/m);
  const body = rest.join('---');
  const headings = [...body.matchAll(/^## (.+?)\s*$/gm)].map((m) => m[1].replaceAll('’', "'"));
  const required = /^kind:\s*langage\s*$/m.test(front) ? [...REQUIRED, ...LANGUAGE] : REQUIRED;
  const missing = required.filter((section) => !headings.includes(section));
  if (missing.length) {
    errors.push(`${TECHS}/${file} : section(s) manquante(s) ${missing.map((s) => `"## ${s}"`).join(', ')}`);
  }
}

const quizzes = markdown(TECH_QUIZ);
for (const file of quizzes) {
  if (!existsSync(`${TECHS}/${file}`)) {
    errors.push(`${TECH_QUIZ}/${file} : aucune fiche ${TECHS}/${file} (le nom du fichier doit être l'id de la fiche)`);
  }
}

for (const file of existsSync(EXERCISES) ? markdown(EXERCISES) : []) {
  const id = file.slice(0, -3);
  if (!existsSync(`${TECHS}/${file}`) || !/^kind:\s*langage\s*$/m.test(readFileSync(`${TECHS}/${file}`, 'utf8'))) {
    errors.push(`${EXERCISES}/${file} : aucune fiche langage ${TECHS}/${file} (le nom du fichier doit être l'id de la fiche)`);
  } else if (!RUNNABLE.includes(id) && !/^playground:/m.test(readFileSync(`${EXERCISES}/${file}`, 'utf8'))) {
    errors.push(`${EXERCISES}/${file} : ${id} ne s'exécute pas dans le navigateur, il faut un playground`);
  }
}

if (errors.length) {
  console.error(`Contenu invalide :\n${errors.join('\n')}`);
  process.exit(1);
}

const withoutQuiz = markdown(TECHS).filter((f) => !quizzes.includes(f));
if (withoutQuiz.length) {
  console.warn(`Fiches sans quiz (${TECH_QUIZ}/<id>.md) : ${withoutQuiz.map((f) => f.slice(0, -3)).join(', ')}`);
}
