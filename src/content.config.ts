import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localized = z.object({ es: z.string(), ca: z.string(), en: z.string() });
// Un texto puede ser igual en todos los idiomas (string) o traducido (es/ca/en).
const text = z.union([z.string(), localized]);

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    name: text,
    order: z.number(),
    featured: z.boolean().default(false),
    live: z.boolean().default(false),
    status: localized,
    description: localized,
    badges: z.array(text),
    links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
    closedSource: z.boolean().default(false),
  }),
});

export const collections = { projects };
