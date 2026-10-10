// Vérifie que chaque fiche techno contient les sections imposées du corps Markdown.
// Zod ne valide que le frontmatter : ce contrôle-là est lancé par `npm run build`, avant `astro build`.
import { readdirSync, readFileSync } from 'node:fs';

const DIR = 'src/content/techs';
const REQUIRED = ['Problème résolu', "Quand l'utiliser", "Quand l'éviter", 'Pour aller plus loin'];

const errors = [];
for (const file of readdirSync(DIR).filter((f) => f.endsWith('.md'))) {
  const body = readFileSync(`${DIR}/${file}`, 'utf8').split(/^---\r?$/m).slice(2).join('---');
  const headings = [...body.matchAll(/^## (.+?)\s*$/gm)].map((m) => m[1].replaceAll('’', "'"));
  const missing = REQUIRED.filter((section) => !headings.includes(section));
  if (missing.length) {
    errors.push(`${DIR}/${file} : section(s) manquante(s) ${missing.map((s) => `"## ${s}"`).join(', ')}`);
  }
}

if (errors.length) {
  console.error(`Sections imposées manquantes :\n${errors.join('\n')}`);
  process.exit(1);
}
