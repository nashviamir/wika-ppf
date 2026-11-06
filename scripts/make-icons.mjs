/** Generates favicon, app icons and the logo PNG used in structured data. Run: node scripts/make-icons.mjs */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const pub = path.resolve(import.meta.dirname, '..', 'public');

// Icon mark: rounded blue tile with italic W and the red swoosh
const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#2F6BFF"/><stop offset="1" stop-color="#1438D6"/></linearGradient></defs>
  <rect width="64" height="64" rx="16" fill="url(#g)"/>
  <path d="M14 21C26 13.5 41 12 54 16.5 41 14.8 27 16 14 21Z" fill="#FF3B47"/>
  <path d="M12.5 24h7.2l2.6 15.6L29.4 24h5.8l2.2 15.6L44.9 24h7.1L40.6 50h-6.4l-2.3-15.3L24.7 50h-6.4L12.5 24Z" fill="#fff"/>
</svg>`;
fs.writeFileSync(path.join(pub, 'favicon.svg'), mark);
await sharp(Buffer.from(mark)).resize(32, 32).png().toFile(path.join(pub, 'favicon-32.png'));
await sharp(Buffer.from(mark)).resize(180, 180).png().toFile(path.join(pub, 'apple-touch-icon.png'));
await sharp(Buffer.from(mark)).resize(192, 192).png().toFile(path.join(pub, 'icon-192.png'));
await sharp(Buffer.from(mark)).resize(512, 512).png().toFile(path.join(pub, 'icon-512.png'));

// Square logo for Google's Organization rich result (min 112x112)
const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
  <rect width="600" height="600" fill="#fff"/>
  <path d="M150 232C230 192 360 184 470 214 360 202 250 206 150 232Z" fill="#E8202E"/>
  <text x="300" y="350" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="150" fill="#1438D6" transform="skewX(-12) translate(70 0)">WIKA</text>
  <rect x="220" y="390" width="160" height="58" rx="14" fill="#0A1330"/>
  <text x="300" y="431" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="34" letter-spacing="6" fill="#fff">PPF</text>
</svg>`;
await sharp(Buffer.from(logo)).png().toFile(path.join(pub, 'logo.png'));

fs.writeFileSync(
  path.join(pub, 'site.webmanifest'),
  JSON.stringify(
    {
      name: 'WIKA PPF — Premium Paint Protection Film',
      short_name: 'WIKA PPF',
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      theme_color: '#1438D6',
      background_color: '#F5F7FB',
      display: 'standalone',
      start_url: '/',
    },
    null,
    2,
  ),
);
console.log('icons written');
