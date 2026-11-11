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
// These public URLs changed in this article update; all others keep the live sitemap timestamp.
const sitemapLastmodByPath = new Map([
  ['/blog/', new Date('2026-11-11T00:00:00.000Z')],
  ['/blog/how-to-winterize-a-mobile-home-or-park-model/', new Date('2026-11-11T00:00:00.000Z')],
]);

export default defineConfig({
  site: 'https://abcoguys.com',
  base,
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      // Preserve the currently published timestamps for unchanged pages.
      lastmod: new Date('2026-11-01T01:28:22.022Z'),
      // Emit canonical site-root URLs rather than the GitHub Pages project base.
      serialize(item) {
        const pageUrl = new URL(item.url);
        const pathname = pageUrl.pathname;
        const route = base !== '/' && pathname.startsWith(base)
          ? `/${pathname.slice(base.length)}`
          : pathname;
        const lastmod = sitemapLastmodByPath.get(route);
        return {
          ...item,
          url: `${pageUrl.origin}${route}`,
          ...(lastmod ? { lastmod } : {}),
        };
      },
    }),
    sitemapRenamer(),
  ],
});
