/**
 * Builds the before/after pair for the compare slider from ONE real photo, so both
 * sides match pixel-for-pixel:
 *   - unprotected: dull/oxidised paint + swirl marks, wash scratches, stone chips & water-spot etching
 *   - protected:   the same photo with a little extra clarity and gloss
 * Defects are drawn as vector layers and blended with the photo's own luminance, so they
 * show up in the light reflections the way real paint defects do.
 * Run: node scripts/make-compare.mjs
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const src = path.join(root, 'data', 'stock', 'grey-hood-gloss.jpg');
const out = path.join(root, 'public', 'images');

// crop away the badge on the right edge
const CROP = { left: 0, top: 0, width: 1880, height: 1333 };
const W = CROP.width;
const H = CROP.height;

let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
const between = (a, b) => a + rnd() * (b - a);

/* ---------- 1. light-dependent defects (swirls, scratches, water spots) ---------- */
const lines = [];
// swirl marks: thousands of faint, short hairline arcs centred on the light reflections
const centers = [
  [W * 0.56, H * 0.34, 1],
  [W * 0.3, H * 0.6, 0.55],
  [W * 0.84, H * 0.26, 0.5],
];
for (const [cx, cy, weight] of centers) {
  const n = Math.round(2600 * weight);
  for (let i = 0; i < n; i++) {
    const r = between(10, 900) * Math.sqrt(rnd());
    const a0 = between(0, Math.PI * 2);
    const span = between(0.02, 0.12);
    const x0 = cx + Math.cos(a0) * r;
    const y0 = cy + Math.sin(a0) * r * 0.8;
    const x1 = cx + Math.cos(a0 + span) * r;
    const y1 = cy + Math.sin(a0 + span) * r * 0.8;
    lines.push(
      `<path d="M${x0.toFixed(1)} ${y0.toFixed(1)} A${r.toFixed(1)} ${(r * 0.8).toFixed(1)} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}" stroke-width="${between(0.5, 1.1).toFixed(2)}" stroke-opacity="${between(0.18, 0.6).toFixed(2)}"/>`,
    );
  }
}
// a handful of longer, finer wash / key scratches
for (let i = 0; i < 12; i++) {
  const x = between(0.25, 0.9) * W;
  const y = between(0.2, 0.7) * H;
  const len = between(90, 300);
  const ang = between(-0.45, 0.25);
  const bend = between(-16, 16);
  const x2 = x + Math.cos(ang) * len;
  const y2 = y + Math.sin(ang) * len;
  const mx = (x + x2) / 2 + bend;
  const my = (y + y2) / 2 - bend * 0.4;
  lines.push(
    `<path d="M${x.toFixed(1)} ${y.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}" stroke-width="${between(0.9, 1.7).toFixed(2)}" stroke-opacity="${between(0.45, 0.8).toFixed(2)}"/>`,
  );
}
// water-spot etching: soft, faint mineral blotches
const spots = [];
for (let i = 0; i < 55; i++) {
  const x = between(0.2, 0.98) * W;
  const y = between(0.15, 0.7) * H;
  const r = between(3, 11);
  spots.push(`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${r.toFixed(1)}" ry="${(r * between(0.6, 1)).toFixed(1)}" fill-opacity="${between(0.08, 0.24).toFixed(2)}"/>`);
}

// only the painted panels (hood + fender) get defects — not glass, tyre or ground
const paintMask = `<path d="M${W * 0.13} ${H * 0.2} L${W * 0.3} ${H * 0.17} L${W * 0.55} ${H * 0.14} L${W * 0.8} ${H * 0.09} L${W} ${H * 0.05} L${W} ${H * 0.84} L${W * 0.62} ${H * 0.88} L${W * 0.36} ${H * 0.84} L${W * 0.3} ${H * 0.9} L${W * 0.2} ${H * 0.6} L${W * 0.12} ${H * 0.5} Z" fill="#fff" filter="url(#feather)"/>`;

const defectSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <filter id="soft"><feGaussianBlur stdDeviation="0.5"/></filter>
    <filter id="blotch"><feGaussianBlur stdDeviation="2.2"/></filter>
    <filter id="feather"><feGaussianBlur stdDeviation="30"/></filter>
    <mask id="paint">${paintMask}</mask>
  </defs>
  <g mask="url(#paint)">
    <g fill="none" stroke="#fff" stroke-linecap="round" filter="url(#soft)">${lines.join('')}</g>
    <g fill="#fff" filter="url(#blotch)">${spots.join('')}</g>
  </g>
</svg>`;

/* ---------- 2. stone chips (visible regardless of light) ---------- */
const chips = [];
function chip(x, y, size) {
  const pts = Array.from({ length: 6 }, (_, k) => {
    const a = (k / 6) * Math.PI * 2 + between(-0.4, 0.4);
    const r = size * between(0.55, 1.1);
    return [x + Math.cos(a) * r, y + Math.sin(a) * r * between(0.6, 1)];
  });
  const poly = (s) =>
    pts.map(([px, py]) => `${(x + (px - x) * s).toFixed(1)},${(y + (py - y) * s).toFixed(1)}`).join(' ');
  // dark broken edge with a pale primer centre
  chips.push(`<polygon points="${poly(1)}" fill="#15171b" fill-opacity="0.7"/>`);
  chips.push(`<polygon points="${poly(0.55)}" fill="#b9bdc4" fill-opacity="0.85"/>`);
}
// concentrated on the leading edge of the hood (the impact zone)
for (let i = 0; i < 85; i++) {
  const t = rnd();
  const x = W * (0.36 + t * 0.62);
  const yEdge = H * (0.8 - t * 0.06);
  const y = yEdge - Math.abs(between(-1, 1)) ** 2.5 * H * 0.2;
  chip(x, y, between(1.3, 3.4));
}
for (let i = 0; i < 18; i++) chip(between(0.35, 0.95) * W, between(0.25, 0.6) * H, between(0.8, 1.6));
const chipSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><filter id="b"><feGaussianBlur stdDeviation="0.3"/></filter></defs><g filter="url(#b)">${chips.join('')}</g></svg>`;

/* ---------- 3. compose ---------- */
const base = await sharp(src).extract(CROP).removeAlpha().toBuffer();

// luminance mask (defects are most visible where light reflects)
const lum = await sharp(base).greyscale().gamma(2.2).normalise().raw().toBuffer();
const defects = await sharp(Buffer.from(defectSvg)).ensureAlpha().raw().toBuffer();
const alpha = Buffer.alloc(W * H);
for (let i = 0; i < W * H; i++) {
  const a = defects[i * 4 + 3] / 255;
  const l = lum[i] / 255;
  alpha[i] = Math.min(255, Math.round(255 * a * (0.06 + 0.94 * Math.pow(l, 1.6))));
}
const defectLayer = await sharp({ create: { width: W, height: H, channels: 3, background: '#ffffff' } })
  .joinChannel(alpha, { raw: { width: W, height: H, channels: 1 } })
  .png()
  .toBuffer();

const before = await sharp(base)
  // oxidised / tired paint: flatter, slightly hazy and less saturated
  .linear(0.86, 14)
  .modulate({ saturation: 0.82, brightness: 0.98 })
  .composite([
    { input: { create: { width: W, height: H, channels: 4, background: { r: 170, g: 175, b: 182, alpha: 0.07 } } } },
    { input: defectLayer },
    { input: Buffer.from(chipSvg) },
  ])
  .toBuffer();

const after = await sharp(base)
  .linear(1.07, -6)
  .modulate({ saturation: 1.08, brightness: 1.02 })
  .sharpen({ sigma: 0.8, m1: 0.6, m2: 1.2 })
  .toBuffer();

// final framing: zoom into the hood so the defects read at display size
const FRAME = { left: 400, top: 40, width: 1460, height: 1035 };
const beforeF = await sharp(before).extract(FRAME).toBuffer();
const afterF = await sharp(after).extract(FRAME).toBuffer();

fs.mkdirSync(out, { recursive: true });
for (const [name, buf] of [
  ['compare-unprotected', beforeF],
  ['compare-protected', afterF],
]) {
  for (const w of [640, 1000, 1460]) {
    await sharp(buf).resize({ width: w }).webp({ quality: 82 }).toFile(path.join(out, `${name}-${w}.webp`));
  }
}
console.log('compare images written', W, 'x', H);

// register both images in the media manifest used by <Img>
const manifestPath = path.join(root, 'src', 'data', 'media.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
for (const [name, buf] of [
  ['compare-unprotected', beforeF],
  ['compare-protected', afterF],
]) {
  const lqip = await sharp(buf).resize({ width: 24 }).blur(1.2).webp({ quality: 40 }).toBuffer();
  manifest[name] = { w: FRAME.width, h: FRAME.height, widths: [640, 1000, 1460], lqip: `data:image/webp;base64,${lqip.toString('base64')}` };
}
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
