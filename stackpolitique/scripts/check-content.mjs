// Contrôles du contenu que Zod ne peut pas faire (il ne valide que le frontmatter, sans connaître l'id de l'entrée).
// Lancé par `npm run build`, avant `astro build`.
//  - chaque fiche contient les sections imposées du corps Markdown, selon son kind ;
//  - le `party` d'une personnalité est une fiche kind: parti ;
//  - chaque quiz de fiche (src/content/quiz-fiche/<id>.md) correspond à une fiche existante.
// Une fiche sans quiz, ou un quiz de moins de 20 questions, n'est qu'un avertissement.
import { existsSync, readdirSync, readFileSync } from 'node:fs';

const FICHES = 'src/content/fiches';
const FICHE_QUIZ = 'src/content/quiz-fiche';
const QUIZ_SIZE = 20;
const COMMON = ["De quoi s'agit-il", "Pourquoi c'est important", 'Idées reçues', 'Pour aller plus loin'];
const SECTIONS = {
  parti: ['Origines et histoire', 'Idées et valeurs', 'Programme', 'Figures', 'Électorat et résultats', 'Pour aller plus loin'],
  personnalite: ['Parcours', 'Positions', "Rôle aujourd'hui", 'Pour aller plus loin'],
  courant: COMMON,
  notion: COMMON,
  institution: COMMON,
  evenement: COMMON,
};
const markdown = (dir) => (existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith('.md')) : []);
const field = (front, name) => front.match(new RegExp(`^${name}:\\s*(\\S+)\\s*$`, 'm'))?.[1];

const errors = [];
const kinds = {};
for (const file of markdown(FICHES)) {
  const [, front] = readFileSync(`${FICHES}/${file}`, 'utf8').split(/^---\r?$/m);
  kinds[file.slice(0, -3)] = field(front, 'kind');
}
for (const file of markdown(FICHES)) {
  const [, front, ...rest] = readFileSync(`${FICHES}/${file}`, 'utf8').split(/^---\r?$/m);
  const body = rest.join('---');
  const headings = [...body.matchAll(/^## (.+?)\s*$/gm)].map((m) => m[1].replaceAll('’', "'"));
  const missing = (SECTIONS[field(front, 'kind')] ?? []).filter((section) => !headings.includes(section));
  if (missing.length) {
    errors.push(`${FICHES}/${file} : section(s) manquante(s) ${missing.map((s) => `"## ${s}"`).join(', ')}`);
  }
  const party = field(front, 'party');
  if (party && kinds[party] && kinds[party] !== 'parti') {
    errors.push(`${FICHES}/${file} : party "${party}" n'est pas une fiche kind: parti (kind: ${kinds[party]})`);
  }
}

const quizzes = markdown(FICHE_QUIZ);
const small = [];
for (const file of quizzes) {
  if (!existsSync(`${FICHES}/${file}`)) {
    errors.push(`${FICHE_QUIZ}/${file} : aucune fiche ${FICHES}/${file} (le nom du fichier doit être l'id de la fiche)`);
  }
  const n = readFileSync(`${FICHE_QUIZ}/${file}`, 'utf8').match(/^\s*- id:/gm)?.length ?? 0;
  if (n < QUIZ_SIZE) small.push(`${file.slice(0, -3)} (${n})`);
}

if (errors.length) {
  console.error(`Contenu invalide :\n${errors.join('\n')}`);
  process.exit(1);
}

const withoutQuiz = markdown(FICHES).filter((f) => !quizzes.includes(f));
if (withoutQuiz.length) {
  console.warn(`Fiches sans quiz (${FICHE_QUIZ}/<id>.md) : ${withoutQuiz.map((f) => f.slice(0, -3)).join(', ')}`);
}
if (small.length) console.warn(`Quiz de moins de ${QUIZ_SIZE} questions : ${small.join(', ')}`);
