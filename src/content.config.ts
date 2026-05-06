// ─── content.config.ts ──────────────────────────────────────────────────────────
// Defines Astro content collections — currently just the `blog` collection.
//
// The `blog` collection reads every .md file from src/content/blog/
// and validates its frontmatter against the Zod schema below.
//
// REQUIRED FRONTMATTER in each blog post:
//   title        → string  (page title + card heading)
//   description  → string  (meta description + card excerpt)
//   pubDate      → date    (used for sorting; e.g. 2025-04-15)
//
// OPTIONAL FRONTMATTER:
//   author       → string  (defaults to "ABCO Team" if omitted)
//   tags         → string[] (displayed as label chips on cards)
//   image        → string  (path to hero image, not yet used in templates)
//   imageAlt     → string  (alt text for the image above)
//
// TO ADD A NEW COLLECTION (e.g. portfolio):
//   1. Create src/content/portfolio/*.md
//   2. Define a new collection below (copy the `blog` block)
//   3. Export it from `collections`
// ─────────────────────────────────────────────────────────────────────────────
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('ABCO Team'),
    tags: z.array(z.string()).optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

export const collections = { blog };
