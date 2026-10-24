// Exécution du code de l'atelier, partagée par le worker du navigateur (runner.worker.ts) et par
// scripts/check-exercises.mjs (qui vérifie les solutions sous Node) : les moteurs sont passés en paramètre.
// Pas de syntaxe propre à TypeScript hors des types : Node importe ce fichier en retirant seulement les types.
import type { Database, SqlJsStatic } from 'sql.js';
import type { PyodideInterface } from 'pyodide';
import type { WebR } from 'webr';

export const RUNNABLE = ['sql', 'python', 'javascript', 'typescript', 'r'];
export type Lang = 'sql' | 'python' | 'javascript' | 'typescript' | 'r';
export const PYODIDE_VERSION = '314.0.7'; // = version du paquet npm pyodide (vérifié par check-exercises)
export const WEBR_VERSION = '0.6.0'; // = version du paquet npm webr (vérifié par check-exercises)
export const TIMEOUT_MS = 10_000;

export interface RunResult {
  output: string;
  error?: string;
}

/** Comparaison avec la sortie attendue : fins de ligne et espaces de fin ignorés. */
export const normalize = (s: string) =>
  s
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) => l.trimEnd())
    .join('\n')
    .trim();

// console.log : chaînes telles quelles, le reste en JSON (tableaux et objets : [1,2,3], {"a":1}).
const show = (v: unknown) => (typeof v === 'string' ? v : v === undefined ? 'undefined' : typeof v === 'function' ? String(v) : JSON.stringify(v));

/** JavaScript : le code est le corps d'une fonction async (await autorisé), console.log capturé. */
export async function runJs(code: string): Promise<RunResult> {
  const lines: string[] = [];
  const log = (...args: unknown[]) => lines.push(args.map(show).join(' '));
  const AsyncFunction = (async () => {}).constructor as new (...args: string[]) => (...a: unknown[]) => Promise<unknown>;
  try {
    await new AsyncFunction('console', code)({ log, info: log, warn: log, error: log });
    return { output: lines.join('\n') };
  } catch (e) {
    return { output: lines.join('\n'), error: e instanceof Error ? `${e.name}: ${e.message}` : String(e) };
  }
}

/** TypeScript : types retirés (sucrase, sans vérification de types), puis exécuté comme du JavaScript. */
export async function runTs(code: string, strip: (code: string) => string): Promise<RunResult> {
  let js: string;
  try {
    js = strip(code);
  } catch (e) {
    return { output: '', error: `Syntaxe : ${e instanceof Error ? e.message : e}` };
  }
  return runJs(js);
}

const cell = (v: unknown) => (v === null ? 'NULL' : v instanceof Uint8Array ? `<${v.length} octets>` : String(v));

/** SQL (SQLite) : base neuve, setup puis le code ; chaque résultat = en-tête puis une ligne par résultat, « a | b ». */
export function runSql(SQL: SqlJsStatic, code: string, setup = ''): RunResult {
  const db: Database = new SQL.Database();
  try {
    if (setup) db.run(setup);
    const results = db.exec(code);
    return { output: results.map((r) => [r.columns.join(' | '), ...r.values.map((row) => row.map(cell).join(' | '))].join('\n')).join('\n\n') };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : String(e) };
  } finally {
    db.close();
  }
}

/** Python (Pyodide) : print capturé ; chaque exécution repart d'un espace de noms vide. */
export async function runPython(py: PyodideInterface, code: string): Promise<RunResult> {
  const lines: string[] = [];
  py.setStdout({ batched: (s) => lines.push(s) });
  py.setStderr({ batched: (s) => lines.push(s) });
  const globals = py.toPy({});
  try {
    await py.runPythonAsync(code, { globals });
    return { output: lines.join('\n') };
  } catch (e) {
    // Le traceback complet cite les fichiers internes de Pyodide : garder la fin, qui nomme l'erreur.
    const message = e instanceof Error ? e.message : String(e);
    const tail = message.trim().split('\n');
    const from = tail.findIndex((l) => l.includes('File "<exec>"'));
    return { output: lines.join('\n'), error: (from >= 0 ? tail.slice(from) : tail.slice(-1)).join('\n') };
  } finally {
    globals.destroy();
  }
}

/** R (webR) : sortie de la console capturée (cat, print, valeurs affichées comme dans la console R) ;
 *  chaque exécution repart d'un environnement global vide. Avertissements et messages vont dans la sortie. */
export async function runR(webR: WebR, code: string): Promise<RunResult> {
  await webR.evalRVoid('rm(list = ls(all.names = TRUE))');
  const shelter = await new webR.Shelter();
  try {
    const { output } = await shelter.captureR(code, {
      withAutoprint: true,
      captureConditions: true,
      throwJsException: false, // une erreur R arrive dans output, après la sortie déjà produite
      captureGraphics: false,
    });
    const lines: string[] = [];
    let error: string | undefined;
    for (const o of output) {
      if (o.type === 'stdout' || o.type === 'stderr') lines.push(o.data);
      else {
        const message: string = await (await o.data.get('message')).toString();
        if (o.type === 'error') error = message;
        else lines.push(o.type === 'warning' ? `Warning: ${message}` : message.trimEnd());
      }
    }
    return { output: lines.join('\n'), error };
  } finally {
    await shelter.purge();
  }
}
