// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/** @param {string | undefined} value */
function normalizeBase(value) {
  if (!value || value === '/') return '/';
  return `/${value.replace(/^\/+|\/+$/g, '')}/`;
}

// Custom integration to rename sitemap-0.xml to sitemap.xml
function sitemapRenamer() {
  return {
    name: 'sitemap-renamer',
    hooks: {
      'astro:build:done': async (/** @type {{ dir: URL }} */ { dir }) => {
        const distDir = fileURLToPath(dir);
        const sitemapIndex = path.join(distDir, 'sitemap-index.xml');
        const sitemap0 = path.join(distDir, 'sitemap-0.xml');
        const sitemapFinal = path.join(distDir, 'sitemap.xml');

        // Remove the index file if it exists
        if (fs.existsSync(sitemapIndex)) {
          fs.unlinkSync(sitemapIndex);
        }

        // Rename sitemap-0.xml to sitemap.xml
        if (fs.existsSync(sitemap0)) {
          fs.renameSync(sitemap0, sitemapFinal);
        }
      },
    },
  };
}

const configuredBase = process.env.SITE_BASE;
const defaultBase = process.env.GITHUB_ACTIONS === 'true' ? '/abco/' : '/';
const base = normalizeBase(configuredBase ?? defaultBase);

export default defineConfig({
  site: 'https://abcoguys.com',
  base,
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
    sitemapRenamer(),
  ],
});
