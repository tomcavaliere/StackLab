// Hors build (`npm run check:exercises`) : exécute la solution de chaque exercice exécutable avec les mêmes moteurs que
// l'atelier (src/components/atelier/run.ts) et la compare à expected. Vérifie aussi que le starter ne passe pas déjà.
// Python et R : paquets npm pyodide et webr, de la même version que celle chargée par le navigateur depuis le CDN.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { parse } from 'yaml';
import initSqlJs from 'sql.js';
import { loadPyodide } from 'pyodide';
import { WebR } from 'webr';
import { transform } from 'sucrase';
import { normalize, PYODIDE_VERSION, runJs, runPython, runR, runSql, runTs, WEBR_VERSION } from '../src/components/atelier/run.ts';

const DIR = 'src/content/exercises';
// Workspaces npm : le paquet est dans node_modules de l'app ou, hissé, dans celui de la racine du dépôt.
const installed = (pkg) =>
  JSON.parse(readFileSync([`node_modules/${pkg}/package.json`, `../node_modules/${pkg}/package.json`].find(existsSync), 'utf8')).version;
for (const [pkg, expected, name] of [['pyodide', PYODIDE_VERSION, 'PYODIDE_VERSION'], ['webr', WEBR_VERSION, 'WEBR_VERSION']]) {
  if (installed(pkg) !== expected) {
    console.error(`${pkg} ${installed(pkg)} installé, mais l'atelier charge ${expected} (${name} dans run.ts)`);
    process.exit(1);
  }
}

let sql, python, r;
async function run(lang, code, setup) {
  if (lang === 'javascript') return runJs(code);
  if (lang === 'typescript') return runTs(code, (c) => transform(c, { transforms: ['typescript'] }).code);
  if (lang === 'sql') return runSql((sql ??= await initSqlJs()), code, setup);
  if (lang === 'r') {
    if (!r) {
      r = new WebR({ interactive: false });
      await r.init();
    }
    return runR(r, code);
  }
  return runPython((python ??= await loadPyodide()), code);
}

const only = process.argv.slice(2);
const errors = [];
let checked = 0;
for (const file of readdirSync(DIR).filter((f) => f.endsWith('.md'))) {
  const lang = file.slice(0, -3);
  if (only.length && !only.includes(lang)) continue;
  const data = parse(readFileSync(`${DIR}/${file}`, 'utf8').split(/^---\r?$/m)[1]);
  if (data.playground) continue;
  for (const x of data.exercises) {
    checked++;
    const got = await run(lang, x.solution, x.setup);
    if (got.error) errors.push(`${DIR}/${file} ${x.id} : la solution échoue : ${got.error}`);
    else if (normalize(got.output) !== normalize(x.expected)) {
      errors.push(`${DIR}/${file} ${x.id} : sortie de la solution différente de expected\n--- obtenu\n${got.output}\n--- attendu\n${x.expected}`);
    }
    const start = await run(lang, x.starter, x.setup);
    if (!start.error && normalize(start.output) === normalize(x.expected)) errors.push(`${DIR}/${file} ${x.id} : le starter donne déjà la sortie attendue`);
  }
}

r?.close(); // sinon le worker de webR garde le processus en vie
if (errors.length) {
  console.error(errors.join('\n\n'));
  process.exit(1);
}
console.log(`${checked} exercices vérifiés`);
