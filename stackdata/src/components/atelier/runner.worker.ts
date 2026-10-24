// Worker de l'atelier : exécute le code hors de la page. L'îlot le termine et le recrée après TIMEOUT_MS (boucle infinie).
// Les moteurs se chargent au premier besoin : sql.js (WebAssembly, livré avec l'app), Pyodide (CDN, ~10 Mo), sucrase.
import initSqlJs, { type SqlJsStatic } from 'sql.js';
import sqlWasm from 'sql.js/dist/sql-wasm-browser.wasm?url';
import type { PyodideInterface } from 'pyodide';
import { PYODIDE_VERSION, runJs, runPython, runSql, runTs, type Lang, type RunResult } from './run';

const PYODIDE = `https://cdn.jsdelivr.net/npm/pyodide@${PYODIDE_VERSION}/`;
let sql: Promise<SqlJsStatic> | undefined;
let python: Promise<PyodideInterface> | undefined;

// R ne passe pas par ce worker : webR a le sien (Atelier.tsx).
async function run(lang: Exclude<Lang, 'r'>, code: string, setup?: string): Promise<RunResult> {
  if (lang === 'javascript') return runJs(code);
  if (lang === 'typescript') {
    const { transform } = await import('sucrase');
    return runTs(code, (c) => transform(c, { transforms: ['typescript'] }).code);
  }
  if (lang === 'sql') {
    sql ??= initSqlJs({ locateFile: () => sqlWasm });
    return runSql(await sql, code, setup);
  }
  python ??= import(/* @vite-ignore */ `${PYODIDE}pyodide.mjs`).then((m) => m.loadPyodide({ indexURL: PYODIDE }));
  return runPython(await python, code);
}

self.onmessage = async (e: MessageEvent<{ lang: Exclude<Lang, 'r'>; code: string; setup?: string }>) => {
  const { lang, code, setup } = e.data;
  try {
    self.postMessage(await run(lang, code, setup));
  } catch (err) {
    self.postMessage({ output: '', error: `Moteur indisponible : ${err}` } satisfies RunResult);
  }
};
