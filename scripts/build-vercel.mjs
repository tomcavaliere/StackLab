// Build du projet Vercel unique : construit les deux apps, puis assemble leurs sorties (Build Output API, version 3) en une
// seule, à la racine, dans .vercel/output :
//   /            -> fonction « index » : le portail (portal/)
//   /data/...    -> fonction « data » : StackData (base: '/data')
//   /politique/... -> fonction « politique » : StackPolitique (base: '/politique')
// Chaque app produit <app>/.vercel/output/{config.json, static/, functions/_render.func/}. Ses assets y sont rangés sous
// static/_astro alors que ses pages les appellent sous /<base>/_astro : on les recopie donc sous static/<base>/.
// Le script échoue si cette structure n'est pas celle attendue (par exemple après une mise à jour de @astrojs/vercel).
import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const APPS = [
  { dir: 'stackdata', base: 'data' },
  { dir: 'stackpolitique', base: 'politique' },
];
const OUT = '.vercel/output';

function need(path, what) {
  if (!existsSync(path)) throw new Error(`build-vercel : ${what} introuvable (${path}). La sortie de @astrojs/vercel a-t-elle changé ?`);
}

for (const { dir } of APPS) execSync(`npm run build -w ${dir}`, { stdio: 'inherit' });

rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, 'static'), { recursive: true });

for (const { dir, base } of APPS) {
  const out = join(dir, '.vercel/output');
  const func = join(out, 'functions/_render.func');
  need(join(out, 'static/_astro'), `assets de ${dir}`);
  need(join(func, '.vc-config.json'), `fonction de ${dir}`);
  const { handler } = JSON.parse(readFileSync(join(func, '.vc-config.json'), 'utf8'));
  need(join(func, handler), `point d'entrée de ${dir}`);
  cpSync(join(out, 'static'), join(OUT, 'static', base), { recursive: true });
  cpSync(func, join(OUT, 'functions', `${base}.func`), { recursive: true, verbatimSymlinks: true });
}

const portal = join(OUT, 'functions/index.func');
mkdirSync(portal, { recursive: true });
cpSync('portal/handler.mjs', join(portal, 'handler.mjs'));
cpSync('portal/index.html', join(portal, 'index.html'));
writeFileSync(
  join(portal, '.vc-config.json'),
  JSON.stringify({ runtime: 'nodejs24.x', handler: 'handler.mjs', launcherType: 'Nodejs' }, null, 2),
);

// Chaque app route elle-même ses pages sous son préfixe : il suffit d'envoyer tout le préfixe à sa fonction.
const config = {
  version: 3,
  routes: [
    ...APPS.map(({ base }) => ({
      src: `^/${base}/_astro/(.*)$`,
      headers: { 'cache-control': 'public, max-age=31536000, immutable' },
      continue: true,
    })),
    { handle: 'filesystem' },
    { src: '^/$', dest: 'index' },
    ...APPS.map(({ base }) => ({ src: `^/${base}(?:/.*)?$`, dest: base })),
    { src: '^/.*$', status: 308, headers: { Location: '/' } },
  ],
};
writeFileSync(join(OUT, 'config.json'), JSON.stringify(config, null, 2));
console.log(`build-vercel : ${OUT} assemblé (portail, ${APPS.map((a) => `/${a.base}`).join(', ')})`);
