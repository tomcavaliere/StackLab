// Contrôles de qualité du contenu, hors build (lancer depuis la racine du projet) :
//   node scripts/check-quality.mjs verdicts            cartes sans verdict dans chaque scénario (par couche)
//   node scripts/check-quality.mjs lengths [ids...]    quiz de techno : part des questions où la bonne réponse est l'option la plus longue
import { readdirSync, readFileSync } from 'node:fs';
import { parse } from 'yaml';

const front = (path) => parse(readFileSync(path, 'utf8').split(/^---\r?$/m)[1]);
const md = (dir) => readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3));
const [mode, ...ids] = process.argv.slice(2);

if (mode === 'verdicts') {
  const techs = Object.fromEntries(md('src/content/techs').map((id) => [id, front(`src/content/techs/${id}.md`)]));
  for (const s of md('src/content/scenarios')) {
    const sc = front(`src/content/scenarios/${s}.md`);
    const layers = [...sc.requiredLayers, ...(sc.optionalLayers ?? [])];
    const missing = [];
    for (const [id, t] of Object.entries(techs)) {
      for (const l of t.layers) {
        if (layers.includes(l) && !sc.verdicts?.[l]?.some((v) => v.tech === id)) missing.push(`${l}:${id}`);
      }
    }
    console.log(`${s} : ${missing.length ? missing.join(' ') : 'OK'}`);
  }
} else if (mode === 'lengths') {
  const files = ids.length ? ids : md('src/content/tech-quiz');
  let total = 0, longest = 0;
  for (const id of files) {
    const { questions } = front(`src/content/tech-quiz/${id}.md`);
    const n = questions.filter((q) => q.decoys.every((d) => q.answer.length > d.length)).length;
    total += questions.length; longest += n;
    const flag = n / questions.length > 0.4 ? '  <-- trop souvent la plus longue' : '';
    console.log(`${id} : ${questions.length} questions, réponse la plus longue ${n} fois (${Math.round((100 * n) / questions.length)} %)${flag}`);
  }
  console.log(`Total : ${longest}/${total} (${Math.round((100 * longest) / total)} %)`);
} else {
  console.log('usage : verdicts | lengths [ids...]');
}
