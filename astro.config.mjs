// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/** @param {string | undefined} value */
function normalizeBase(value) {
  if (!value || value === '/') return '/';
  return `/${value.replace(/^\/+|\/+$/g, '')}/`;
}

const configuredBase = process.env.SITE_BASE;
const defaultBase = process.env.GITHUB_ACTIONS === 'true' ? '/abco/' : '/';
const base = normalizeBase(configuredBase ?? defaultBase);

export default defineConfig({
  site: 'https://abcoguys.com',
  base,
  integrations: [sitemap()],
});
