/**
 * Static-site generation: renders every route to real HTML so search engines
 * (and users without JS) get full content, titles, meta tags and structured data.
 * Also writes sitemap.xml, robots.txt and 404.html for GitHub Pages.
 */
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8');
const { render, allPages, headHtml, notFoundMeta } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
);

// Site URL comes from the compiled config via the canonical of the home page
const siteUrl = headHtml(allPages[0]).match(/rel="canonical" href="([^"]+)\/"/)[1];

function page(meta, url) {
  const html = render(url);
  return template
    .replace('<!--app-head-->', headHtml(meta))
    .replace('<div id="root"><!--app-html--></div>', `<div id="root" data-path="${meta.path}">${html}</div>`);
}

let count = 0;
for (const meta of allPages) {
  const out = path.join(dist, meta.path, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(meta, meta.path));
  count++;
}

// GitHub Pages serves 404.html for unknown paths
fs.writeFileSync(path.join(dist, '404.html'), page(notFoundMeta, '/404/'));

// sitemap.xml
const today = new Date().toISOString().slice(0, 10);
const priority = (p) => (p === '/' ? '1.0' : p.split('/').filter(Boolean).length === 1 ? '0.8' : '0.7');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .filter((m) => !m.noindex)
  .map(
    (m) => `  <url>
    <loc>${siteUrl}${m.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${m.path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${priority(m.path)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
);

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`✓ Prerendered ${count} pages + 404.html, sitemap.xml, robots.txt`);
