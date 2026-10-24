import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CONFIDENCES, KINDS, LAYERS, PARCOURS_KINDS, ROLE_FAMILIES, SCENARIO_TYPES, SOURCE_TYPES, VERDICTS, ids, type Layer } from './lib/taxonomy';

// reference() d'Astro 7 ne vérifie pas que l'id existe : il le transforme seulement en { id, collection }.
// ref() ajoute ce contrôle, si bien qu'un id sans fichier correspondant fait échouer le build.
// L'id d'une entrée est le nom de son fichier (kebab-case, sans extension).
const ref = (collection: 'techs' | 'scenarios' | 'quiz' | 'roles') =>
  z
    .string()
    .refine((id) => existsSync(`src/content/${collection}/${id}.md`), {
      error: (issue) =>
        `id inconnu "${issue.input}" : le fichier src/content/${collection}/${issue.input}.md n'existe pas`,
    })
    .pipe(reference(collection));

const layer = z.enum(ids(LAYERS));
const linkedTech = z.strictObject({ tech: ref('techs'), note: z.string() });

const techs = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/techs' }),
  schema: z.strictObject({
    name: z.string(),
    kind: z.enum(ids(KINDS)),
    layers: z.array(layer), // vide pour un langage : il n'est pas jouable comme carte
    languages: z.array(ref('techs')).default([]), // langages dans lesquels on écrit du code avec cette techno
    tags: z.array(z.string()).default([]),
    difficulty: z.literal([1, 2, 3]),
    summary: z.string(),
    alternatives: z.array(linkedTech).default([]),
    integratesWith: z.array(linkedTech).default([]),
  }),
});

// Un métier : la pile qu'il utilise, découpée en étapes de son travail. Une techno peut figurer dans
// plusieurs métiers (avec un `why` propre à chacun) : c'est ce recoupement que la page « Par métier » montre.
const roles = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/roles' }),
  schema: z
    .strictObject({
      name: z.string(),
      family: z.enum(ids(ROLE_FAMILIES)),
      summary: z.string(), // une phrase
      mission: z.string(), // ce que fait ce métier au quotidien
      stack: z
        .array(
          z.strictObject({
            step: z.string(), // étape du travail : « Stocker », « Orchestrer »…
            intro: z.string(), // ce qu'on cherche à faire à cette étape
            techs: z
              .array(z.strictObject({ tech: ref('techs'), why: z.string(), essential: z.boolean().default(false) }))
              .min(1),
          }),
        )
        .min(1),
    })
    .superRefine((r, ctx) => {
      const seen = new Set<string>();
      r.stack.forEach((s, i) =>
        s.techs.forEach((t, j) => {
          if (seen.has(t.tech.id)) {
            ctx.addIssue({ code: 'custom', path: ['stack', i, 'techs', j], message: `"${t.tech.id}" figure deux fois dans ce métier` });
          }
          seen.add(t.tech.id);
        }),
      );
    }),
});

const scenarios = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/scenarios' }),
  schema: z.strictObject({
    title: z.string(),
    type: z.enum(ids(SCENARIO_TYPES)),
    brief: z.string(),
    constraints: z.strictObject({
      team: z.string(),
      budget: z.string(),
      volume: z.string(),
      latency: z.string(),
      timeToMarket: z.string(),
    }),
    requiredLayers: z.array(layer).min(1),
    optionalLayers: z.array(layer).default([]),
    verdicts: z.partialRecord(
      layer,
      z.array(z.strictObject({ tech: ref('techs'), verdict: z.enum(ids(VERDICTS)), why: z.string() })),
    ),
    antiPatterns: z
      .array(z.strictObject({ techs: z.array(ref('techs')).min(2), penalty: z.number().int().positive(), why: z.string() }))
      .default([]),
    referenceStack: z.partialRecord(layer, z.array(ref('techs'))),
  })
    .superRefine((s, ctx) => {
      // La stack de référence doit être une réponse valide : couches requises remplies,
      // et chaque tech avec un verdict ideal ou acceptable dans sa couche.
      for (const l of s.requiredLayers) {
        if (!s.referenceStack[l]?.length) {
          ctx.addIssue({ code: 'custom', path: ['referenceStack'], message: `couche requise "${l}" absente` });
        }
      }
      for (const [l, techs] of Object.entries(s.referenceStack) as [Layer, { id: string }[]][]) {
        for (const tech of techs) {
          const verdict = s.verdicts[l]?.find((v) => v.tech.id === tech.id)?.verdict;
          if (verdict !== 'ideal' && verdict !== 'acceptable') {
            ctx.addIssue({
              code: 'custom',
              path: ['referenceStack', l],
              message: `"${tech.id}" n'a pas de verdict ideal ou acceptable dans verdicts.${l}`,
            });
          }
        }
      }
    }),
});

const companies = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/companies' }),
  schema: z.strictObject({
    company: z.string(),
    product: z.string(),
    need: z.string(),
    scenario: ref('scenarios').optional(), // scénario du mode « devine la stack »
    lastResearched: z.coerce.date(),
    stack: z.partialRecord(
      layer,
      z.array(
        z
          .strictObject({
            tech: ref('techs'),
            source: z.url(),
            sourceTitle: z.string(),
            sourceDate: z.coerce.date(),
            sourceType: z.enum(ids(SOURCE_TYPES)),
            confidence: z.enum(ids(CONFIDENCES)),
            note: z.string().optional(),
          })
          .refine((e) => e.sourceType !== 'offre-emploi' || e.confidence === 'indice', {
            error: "une offre d'emploi seule ne peut donner que la confiance 'indice'",
            path: ['confidence'],
          }),
      ),
    ),
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

// Un thème de quiz : des questions courtes, chacune avec 2 technos dont une seule est la bonne.
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
            answer: ref('techs'),
            decoy: ref('techs'),
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

// Le quiz d'une techno : src/content/tech-quiz/<id de la fiche>.md (l'existence de la fiche est vérifiée par
// scripts/check-content.mjs). QCM sur la techno elle-même : une bonne réponse et 1 à 3 leurres, en texte libre.
const techQuiz = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/tech-quiz' }),
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
// ses thèmes, puis ses scénarios. Règles : CLAUDE.md, « Parcours ».
const mdIds = (dir: string) =>
  readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.slice(0, -3));
// Technos citées par un thème (answer et decoy), lues dans le fichier brut : Zod ne voit pas les autres collections.
const themeTechs = (id: string) =>
  [...readFileSync(`src/content/quiz/${id}.md`, 'utf8').matchAll(/^\s+(?:answer|decoy):\s*(\S+)/gm)].map((m) => m[1]);
// Technos `essential: true` d'un métier, lues de la même façon (une techno par ligne).
const essentialTechs = (role: string) =>
  readFileSync(`src/content/roles/${role}.md`, 'utf8')
    .split('\n')
    .filter((l) => /essential:\s*true/.test(l))
    .map((l) => l.match(/tech:\s*([a-z0-9-]+)/)?.[1])
    .filter((t): t is string => !!t);

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
            role: ref('roles').optional(), // métier : la pile décrite dans src/content/roles
            requires: z.array(kebab('de parcours')).default([]), // parcours à terminer avant d'ouvrir celui-ci
            units: z
              .array(
                z.strictObject({
                  id: kebab("d'unité"),
                  title: z.string(),
                  intro: z.string(),
                  lessons: z.array(ref('techs')).min(1),
                  themes: z.array(ref('quiz')).default([]),
                  scenarios: z.array(ref('scenarios')).default([]),
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
      const allScenarios = new Set<string>();
      p.parcours.forEach((c, i) => {
        if (c.kind === 'metier' && !c.role) issue([i, 'role'], 'role obligatoire pour un parcours métier');
        if (c.kind !== 'metier' && c.role) issue([i, 'role'], 'role réservé aux parcours métier');
        c.requires.forEach((r, j) => {
          if (!index.has(r)) issue([i, 'requires', j], `parcours "${r}" inconnu`);
        });

        // Ce qui est vu avant ce parcours : les leçons, thèmes et scénarios de ses parcours requis.
        const lessons = new Map<string, string>(); // tech -> "parcours / unité"
        const themes = new Set<string>();
        const scenarios = new Set<string>();
        for (const a of ancestors(i)) {
          for (const u of p.parcours[index.get(a)!].units) {
            u.lessons.forEach((l) => lessons.set(l.id, `${a} / ${u.id}`));
            u.themes.forEach((t) => themes.add(t.id));
            u.scenarios.forEach((s) => scenarios.add(s.id));
          }
        }
        const units = new Set<string>();
        c.units.forEach((u, k) => {
          const at = (...rest: (string | number)[]) => [i, 'units', k, ...rest];
          if (units.has(u.id)) issue(at('id'), `unité "${u.id}" en double`);
          units.add(u.id);
          u.lessons.forEach(({ id }, j) => {
            if (lessons.has(id)) issue(at('lessons', j), `"${id}" figure deux fois dans ce parcours ou ses parcours requis (déjà dans "${lessons.get(id)}")`);
            if (!existsSync(`src/content/tech-quiz/${id}.md`)) issue(at('lessons', j), `"${id}" n'a pas de quiz (src/content/tech-quiz/${id}.md)`);
            lessons.set(id, `${c.id} / ${u.id}`);
            allLessons.add(id);
          });
          u.themes.forEach(({ id }, j) => {
            if (themes.has(id)) issue(at('themes', j), `thème "${id}" en double dans ce parcours ou ses parcours requis`);
            themes.add(id);
            allThemes.add(id);
            const later = [...new Set(themeTechs(id))].filter((t) => !lessons.has(t));
            if (later.length) issue(at('themes', j), `le thème "${id}" cite ${later.join(', ')}, pas encore vu(s) à cette unité (ni dans les parcours requis)`);
          });
          u.scenarios.forEach(({ id }, j) => {
            if (scenarios.has(id)) issue(at('scenarios', j), `scénario "${id}" en double dans ce parcours ou ses parcours requis`);
            scenarios.add(id);
            allScenarios.add(id);
          });
        });
        if (c.role) {
          const absent = essentialTechs(c.role.id).filter((t) => !lessons.has(t));
          if (absent.length) issue([i, 'role'], `technos essentielles du métier "${c.role.id}" absentes du parcours et de ses parcours requis : ${absent.join(', ')}`);
        }
      });

      const missing = (dir: string, seen: Set<string>) => mdIds(dir).filter((id) => !seen.has(id));
      const absent = [
        ['fiche(s)', missing('src/content/techs', allLessons)],
        ['thème(s)', missing('src/content/quiz', allThemes)],
        ['scénario(s)', missing('src/content/scenarios', allScenarios)],
      ] as const;
      for (const [what, list] of absent) if (list.length) issue([], `${what} dans aucun parcours : ${list.join(', ')}`);
    }),
});

// Exercices de code d'une fiche langage (src/content/exercises/<id de la fiche>.md), pour l'atelier de la fiche.
// Sans playground, l'exercice s'exécute dans le navigateur (SQL, Python, JavaScript, TypeScript, R) et sa sortie est vérifiée :
// expected est alors obligatoire. La correspondance avec la fiche est vérifiée par scripts/check-content.mjs.
const exercises = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/exercises' }),
  schema: z
    .strictObject({
      playground: z.url().optional(), // bac à sable externe pour les langages qu'on n'exécute pas dans le navigateur
      playgroundNote: z.string().optional(), // ex. « bac à sable communautaire, non officiel »
      exercises: z
        .array(
          z.strictObject({
            id: questionId,
            title: z.string(),
            prompt: z.string(),
            setup: z.string().optional(), // SQL : tables et lignes créées avant le code
            starter: z.string(),
            solution: z.string(),
            expected: z.string().optional(), // sortie attendue (stdout ; SQL : en-tête puis lignes « a | b »)
          }),
        )
        .min(1),
    })
    .superRefine((e, ctx) => {
      const seen = new Set<string>();
      e.exercises.forEach((x, i) => {
        if (seen.has(x.id)) ctx.addIssue({ code: 'custom', path: ['exercises', i, 'id'], message: `id d'exercice "${x.id}" en double` });
        seen.add(x.id);
        if (!e.playground && x.expected === undefined) {
          ctx.addIssue({ code: 'custom', path: ['exercises', i, 'expected'], message: 'expected obligatoire pour un exercice exécuté dans le navigateur' });
        }
      });
    }),
});

export const collections = { techs, roles, scenarios, companies, quiz, techQuiz, parcours, exercises };
