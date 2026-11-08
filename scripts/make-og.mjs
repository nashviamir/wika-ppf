/**
 * Generates a 1200×630 social-share card (Open Graph / Twitter) for every page:
 * the page's own photo on the right, brand + section + headline on the left.
 *
 * Runs during `npm run build` (after the SSR build). Existing cards in public/og are kept,
 * so CI reuses the committed cards; run `npm run og` to regenerate all of them after
 * changing page titles or images.
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const force = process.argv.includes('--force');
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js');
if (!fs.existsSync(ssrEntry)) {
  console.error('make-og: run the SSR build first (npm run build or npm run og)');
  process.exit(1);
}
const { allPages, notFoundMeta, ogSlug } = await import(pathToFileURL(ssrEntry).href);
const media = JSON.parse(fs.readFileSync(path.join(root, 'src', 'data', 'media.json'), 'utf-8'));

const outDirs = [path.join(root, 'public', 'og')];
if (fs.existsSync(path.join(root, 'dist'))) outDirs.push(path.join(root, 'dist', 'og'));
outDirs.forEach((d) => fs.mkdirSync(d, { recursive: true }));

const W = 1200;
const H = 630;
const PHOTO_X = 650;

const xml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// rough glyph-width model for bold sans-serif, used for line wrapping
function textWidth(str, size) {
  let w = 0;
  for (const ch of str) {
    if (ch === ' ') w += 0.28;
    else if ('il.,:;’\'!|'.includes(ch)) w += 0.3;
    else if ('mwMW'.includes(ch)) w += 0.88;
    else if (ch >= 'A' && ch <= 'Z') w += 0.7;
    else w += 0.57;
  }
  return w * size;
}
function wrap(text, size, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (textWidth(test, size) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

async function card(meta) {
  const slug = ogSlug(meta);
  const targets = outDirs.map((d) => path.join(d, `${slug}.jpg`));
  const publicFile = targets[0];
  if (!force && fs.existsSync(publicFile)) {
    targets.slice(1).forEach((t) => fs.copyFileSync(publicFile, t));
    return 'kept';
  }

  const m = media[meta.og.image];
  if (!m) throw new Error(`make-og: unknown image "${meta.og.image}" for ${meta.path}`);
  const src = path.join(root, 'public', 'images', `${meta.og.image}-${Math.max(...m.widths)}.webp`);
  const photo = await sharp(src).resize(W - PHOTO_X, H, { fit: 'cover', position: 'attention' }).toBuffer();

  // headline: up to 3 lines, shrinking the size if needed
  let size = 60;
  let lines = wrap(meta.og.headline, size, 520);
  while (lines.length > 3 && size > 40) {
    size -= 4;
    lines = wrap(meta.og.headline, size, 520);
  }
  const lineH = Math.round(size * 1.08);
  const headTop = 330 - ((lines.length - 1) * lineH) / 2;

  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>
      <linearGradient id="fade" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stop-color="#ffffff" stop-opacity="1"/>
        <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="bar" x1="0" x2="1">
        <stop offset="0" stop-color="#E8202E"/><stop offset=".35" stop-color="#1438D6"/><stop offset="1" stop-color="#19B8FF"/>
      </linearGradient>
    </defs>
    <rect x="${PHOTO_X - 2}" y="0" width="90" height="${H}" fill="url(#fade)"/>
    <!-- logo -->
    <path d="M84 70C110 57 150 54 186 64 154 59 118 61 84 70Z" fill="#E8202E"/>
    <text x="70" y="106" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="40" fill="#1438D6" transform="skewX(-12) translate(22 0)">WIKA</text>
    <rect x="200" y="78" width="62" height="30" rx="7" fill="#0A1330"/>
    <text x="231" y="99" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="16" letter-spacing="2" fill="#ffffff">PPF</text>
    <!-- kicker -->
    <rect x="72" y="${headTop - size - 42}" width="28" height="4" rx="2" fill="#E8202E"/>
    <text x="112" y="${headTop - size - 34}" font-family="Arial, sans-serif" font-weight="700" font-size="19" letter-spacing="3" fill="#1438D6">${xml(meta.og.kicker.toUpperCase())}</text>
    <!-- headline -->
    ${lines
      .map(
        (l, i) =>
          `<text x="70" y="${headTop + i * lineH}" font-family="Arial, sans-serif" font-weight="700" font-size="${size}" letter-spacing="-1" fill="#0A1330">${xml(l)}</text>`,
      )
      .join('\n    ')}
    <!-- footer -->
    <text x="72" y="568" font-family="Arial, sans-serif" font-size="20" fill="#5F6B88">Premium Paint Protection Film · Germany</text>
    <rect x="0" y="${H - 8}" width="${W}" height="8" fill="url(#bar)"/>
  </svg>`;

  const buf = await sharp({ create: { width: W, height: H, channels: 3, background: '#ffffff' } })
    .composite([
      { input: photo, left: PHOTO_X, top: 0 },
      { input: Buffer.from(overlay), left: 0, top: 0 },
    ])
    .jpeg({ quality: 84, mozjpeg: true })
    .toBuffer();
  targets.forEach((t) => fs.writeFileSync(t, buf));
  return 'written';
}

let written = 0;
let kept = 0;
for (const meta of [...allPages, notFoundMeta]) {
  (await card(meta)) === 'written' ? written++ : kept++;
}
console.log(`✓ Social cards: ${written} generated, ${kept} kept`);
