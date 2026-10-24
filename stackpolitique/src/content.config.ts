import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { FAMILIES, KINDS, PARCOURS_KINDS, SOURCE_TYPES, ids } from './lib/taxonomy';

// reference() d'Astro 7 ne vérifie pas que l'id existe : il le transforme seulement en { id, collection }.
// ref() ajoute ce contrôle, si bien qu'un id sans fichier correspondant fait échouer le build.
// L'id d'une entrée est le nom de son fichier (kebab-case, sans extension).
const ref = (collection: 'fiches' | 'quiz') =>
  z
    .string()
    .refine((id) => existsSync(`src/content/${collection}/${id}.md`), {
      error: (issue) =>
        `id inconnu "${issue.input}" : le fichier src/content/${collection}/${issue.input}.md n'existe pas`,
    })
    .pipe(reference(collection));

// Toute fiche s'appuie sur au moins une source datée ; une source de plus de 3 ans est signalée sur la page.
// Page non datée (site officiel, vie-publique.fr) : date de consultation, avec note: "page non datée, date de consultation".
const source = z.strictObject({
  url: z.url(),
  title: z.string(),
  date: z.coerce.date(),
  type: z.enum(ids(SOURCE_TYPES)),
  note: z.string().optional(),
});

const fiches = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/fiches' }),
  schema: z
    .strictObject({
      name: z.string(),
      kind: z.enum(ids(KINDS)),
      family: z.enum(ids(FAMILIES)).optional(), // parti seulement
      party: ref('fiches').optional(), // personnalité : son parti (le build vérifie que c'est une fiche kind: parti)
      tags: z.array(z.string()).default([]),
      difficulty: z.literal([1, 2, 3]),
      summary: z.string(),
      liens: z.array(z.strictObject({ fiche: ref('fiches'), note: z.string() })).default([]), // affichés dans les deux sens
      sources: z.array(source).min(1),
      lastResearched: z.coerce.date(), // date de la recherche qui a servi à écrire la fiche
    })
    .superRefine((f, ctx) => {
      if (f.kind === 'parti' && !f.family) ctx.addIssue({ code: 'custom', path: ['family'], message: 'family obligatoire pour un parti' });
      if (f.kind !== 'parti' && f.family) ctx.addIssue({ code: 'custom', path: ['family'], message: 'family réservé aux partis' });
      if (f.kind !== 'personnalite' && f.party) ctx.addIssue({ code: 'custom', path: ['party'], message: 'party réservé aux personnalités' });
    }),
});

// L'id d'une question identifie son historique en base : ne jamais le renommer.
const questionId = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, { error: 'id de question en kebab-case ASCII minuscule' });

function checkUniqueIds(questions: { id: string }[], ctx: z.RefinementCtx) {
  const seen = new Set<string>();
  questions.forEach((q, i) => {
    if (seen.has(q.id)) {
      ctx.addIssue({ code: 'custom', path: ['questions', i, 'id'], message: `id de question "${q.id}" en double` });
    }
    seen.add(q.id);
  });
}

// Un thème de quiz : des questions courtes, chacune avec 2 fiches (en général 2 partis) dont une seule est la bonne.
const quiz = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/quiz' }),
  schema: z
    .strictObject({
      title: z.string(),
      description: z.string(),
      questions: z
        .array(
          z.strictObject({
            id: questionId,
            prompt: z.string(),
            answer: ref('fiches'),
            decoy: ref('fiches'),
            why: z.string(),
          }),
        )
        .min(5),
    })
    .superRefine((t, ctx) => {
      checkUniqueIds(t.questions, ctx);
      t.questions.forEach((q, i) => {
        if (q.answer.id === q.decoy.id) {
          ctx.addIssue({ code: 'custom', path: ['questions', i, 'decoy'], message: `"decoy" identique à "answer" (${q.answer.id})` });
        }
      });
    }),
});

// Le quiz d'une fiche : src/content/quiz-fiche/<id de la fiche>.md (l'existence de la fiche est vérifiée par
// scripts/check-content.mjs). QCM sur ce que la fiche documente : une bonne réponse et 1 à 3 leurres, en texte libre.
const ficheQuiz = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/quiz-fiche' }),
  schema: z
    .strictObject({
      questions: z
        .array(
          z.strictObject({
            id: questionId,
            prompt: z.string(),
            answer: z.string(),
            decoys: z.array(z.string()).min(1).max(3),
            why: z.string(),
          }),
        )
        .min(5),
    })
    .superRefine((t, ctx) => {
      checkUniqueIds(t.questions, ctx);
      t.questions.forEach((q, i) => {
        if (new Set([q.answer, ...q.decoys]).size !== q.decoys.length + 1) {
          ctx.addIssue({ code: 'custom', path: ['questions', i, 'decoys'], message: 'options en double (leurre identique à la réponse ou à un autre leurre)' });
        }
      });
    }),
});

// Les parcours : un seul fichier (src/content/parcours/parcours.md), pour que les contrôles voient tous les parcours à la fois.
// Un parcours s'ouvre quand ses `requires` sont terminés ; chaque unité enchaîne ses leçons (fiche + quiz de la fiche),
// puis ses thèmes. Règles : CLAUDE.md, « Parcours ».
const mdIds = (dir: string) =>
  (existsSync(dir) ? readdirSync(dir) : [])
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.slice(0, -3));
// Fiches citées par un thème (answer et decoy), lues dans le fichier brut : Zod ne voit pas les autres collections.
const themeFiches = (id: string) =>
  [...readFileSync(`src/content/quiz/${id}.md`, 'utf8').matchAll(/^\s+(?:answer|decoy):\s*(\S+)/gm)].map((m) => m[1]);

const kebab = (what: string) => z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, { error: `id ${what} en kebab-case ASCII minuscule` });

const parcours = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/parcours' }),
  schema: z
    .strictObject({
      parcours: z
        .array(
          z.strictObject({
            id: kebab('de parcours'),
            kind: z.enum(ids(PARCOURS_KINDS)),
            title: z.string(),
            intro: z.string(),
            party: ref('fiches').optional(), // parcours d'un parti : la fiche du parti, qui doit figurer dans ses leçons
            requires: z.array(kebab('de parcours')).default([]), // parcours à terminer avant d'ouvrir celui-ci
            units: z
              .array(
                z.strictObject({
                  id: kebab("d'unité"),
                  title: z.string(),
                  intro: z.string(),
                  lessons: z.array(ref('fiches')).default([]), // vide possible (comparaison : des thèmes seulement)
                  themes: z.array(ref('quiz')).default([]),
                }),
              )
              .min(1),
          }),
        )
        .min(1),
    })
    .superRefine((p, ctx) => {
      const issue = (path: (string | number)[], message: string) => ctx.addIssue({ code: 'custom', path: ['parcours', ...path], message });
      const index = new Map<string, number>();
      p.parcours.forEach((c, i) => {
        if (index.has(c.id)) issue([i, 'id'], `parcours "${c.id}" en double`);
        else index.set(c.id, i);
      });
      if (p.parcours.filter((c) => c.kind === 'tronc').length !== 1) issue([], 'il faut exactement un parcours "kind: tronc"');

      // Parcours requis, directement ou non ; cycles signalés.
      const ancestors = (i: number) => {
        const out = new Set<string>();
        const todo = [...p.parcours[i].requires];
        while (todo.length) {
          const r = todo.pop()!;
          if (r === p.parcours[i].id) {
            issue([i, 'requires'], `cycle : "${r}" se requiert lui-même`);
            break;
          }
          if (out.has(r) || !index.has(r)) continue;
          out.add(r);
          todo.push(...p.parcours[index.get(r)!].requires);
        }
        return out;
      };

      const allLessons = new Set<string>();
      const allThemes = new Set<string>();
      p.parcours.forEach((c, i) => {
        if (c.kind === 'parti' && !c.party) issue([i, 'party'], 'party obligatoire pour un parcours de parti');
        if (c.kind !== 'parti' && c.party) issue([i, 'party'], 'party réservé aux parcours de parti');
        if (c.party && !c.units.some((u) => u.lessons.some((l) => l.id === c.party!.id))) {
          issue([i, 'party'], `la fiche du parti "${c.party.id}" doit figurer dans les leçons de son parcours`);
        }
        c.requires.forEach((r, j) => {
          if (!index.has(r)) issue([i, 'requires', j], `parcours "${r}" inconnu`);
        });

        // Ce qui est vu avant ce parcours : les leçons et thèmes de ses parcours requis.
        const lessons = new Map<string, string>(); // fiche -> "parcours / unité"
        const themes = new Set<string>();
        for (const a of ancestors(i)) {
          for (const u of p.parcours[index.get(a)!].units) {
            u.lessons.forEach((l) => lessons.set(l.id, `${a} / ${u.id}`));
            u.themes.forEach((t) => themes.add(t.id));
          }
        }
        const units = new Set<string>();
        c.units.forEach((u, k) => {
          const at = (...rest: (string | number)[]) => [i, 'units', k, ...rest];
          if (units.has(u.id)) issue(at('id'), `unité "${u.id}" en double`);
          units.add(u.id);
          if (!u.lessons.length && !u.themes.length) issue(at(), `unité "${u.id}" vide : il faut au moins une leçon ou un thème`);
          u.lessons.forEach(({ id }, j) => {
            if (lessons.has(id)) issue(at('lessons', j), `"${id}" figure deux fois dans ce parcours ou ses parcours requis (déjà dans "${lessons.get(id)}")`);
            if (!existsSync(`src/content/quiz-fiche/${id}.md`)) issue(at('lessons', j), `"${id}" n'a pas de quiz (src/content/quiz-fiche/${id}.md)`);
            lessons.set(id, `${c.id} / ${u.id}`);
            allLessons.add(id);
          });
          u.themes.forEach(({ id }, j) => {
            if (themes.has(id)) issue(at('themes', j), `thème "${id}" en double dans ce parcours ou ses parcours requis`);
            themes.add(id);
            allThemes.add(id);
            const later = [...new Set(themeFiches(id))].filter((t) => !lessons.has(t));
            if (later.length) issue(at('themes', j), `le thème "${id}" cite ${later.join(', ')}, pas encore vue(s) à cette unité (ni dans les parcours requis)`);
          });
        });
      });

      const missing = (dir: string, seen: Set<string>) => mdIds(dir).filter((id) => !seen.has(id));
      const absent = [
        ['fiche(s)', missing('src/content/fiches', allLessons)],
        ['thème(s)', missing('src/content/quiz', allThemes)],
      ] as const;
      for (const [what, list] of absent) if (list.length) issue([], `${what} dans aucun parcours : ${list.join(', ')}`);
    }),
});

export const collections = { fiches, quiz, ficheQuiz, parcours };
