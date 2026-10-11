// Contrôles du contenu que Zod ne peut pas faire (il ne valide que le frontmatter, sans connaître l'id de l'entrée).
// Lancé par `npm run build`, avant `astro build`.
//  - chaque fiche techno contient les sections imposées du corps Markdown ;
//  - chaque quiz de techno (src/content/tech-quiz/<id>.md) correspond à une fiche existante.
// Une fiche sans quiz n'est qu'un avertissement : ajouter une techno reste possible avec un seul fichier.
import { existsSync, readdirSync, readFileSync } from 'node:fs';

const TECHS = 'src/content/techs';
const TECH_QUIZ = 'src/content/tech-quiz';
const REQUIRED = ['Problème résolu', "Quand l'utiliser", "Quand l'éviter", 'Pour aller plus loin'];
const markdown = (dir) => readdirSync(dir).filter((f) => f.endsWith('.md'));

const errors = [];
for (const file of markdown(TECHS)) {
  const body = readFileSync(`${TECHS}/${file}`, 'utf8').split(/^---\r?$/m).slice(2).join('---');
  const headings = [...body.matchAll(/^## (.+?)\s*$/gm)].map((m) => m[1].replaceAll('’', "'"));
  const missing = REQUIRED.filter((section) => !headings.includes(section));
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

if (errors.length) {
  console.error(`Contenu invalide :\n${errors.join('\n')}`);
  process.exit(1);
}

const withoutQuiz = markdown(TECHS).filter((f) => !quizzes.includes(f));
if (withoutQuiz.length) {
  console.warn(`Fiches sans quiz (${TECH_QUIZ}/<id>.md) : ${withoutQuiz.map((f) => f.slice(0, -3)).join(', ')}`);
}
