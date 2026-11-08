/**
 * Converts the raw photos in /data into optimized, responsive WebP files in /public/images.
 * Run with: npm run optimize-media
 *
 * Each entry: source file in /data, output slug, optional crop (in source pixels), output widths.
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const src = path.join(root, 'data');
const out = path.join(root, 'public', 'images');
fs.mkdirSync(out, { recursive: true });

const W = [640, 1280, 1920];

const media = [
  { file: 'company front.jpeg', slug: 'wika-ppf-headquarters', widths: [640, 1080] },
  { file: 'ceo.jpeg', slug: 'wika-ppf-ceo', widths: [640, 1080] },
  { file: 'Gemini_Generated_Image_a03ojya03ojya03o.jpg', slug: 'ppf-cleanroom-packing', widths: W },
  { file: 'Gemini_Generated_Image_ay59hsay59hsay59.jpg', slug: 'ppf-rnd-laboratory', widths: W },
  { file: 'Gemini_Generated_Image_c13ogoc13ogoc13o.jpg', slug: 'ppf-quality-control-lab', widths: W },
  { file: 'Gemini_Generated_Image_j349qj349qj349qj.jpg', slug: 'ppf-slitting-rewinding-line', widths: W },
  { file: 'Gemini_Generated_Image_tlzzm8tlzzm8tlzz.jpg', slug: 'ppf-coating-production-line', widths: W },
  { file: 'Gemini_Generated_Image_uhwbuyuhwbuyuhwb.jpg', slug: 'tpu-film-production', widths: W },
  { file: 'Gemini_Generated_Image_vxd8jnvxd8jnvxd8.jpg', slug: 'ppf-warehouse-logistics', widths: W },
  // Real car photography (Unsplash License — see data/stock/CREDITS.md)
  { file: 'stock/hero-white-car-front.jpg', slug: 'white-sports-car-front-ppf', widths: [640, 1100, 1600] },
  { file: 'stock/gloss-yellow-bodywork.jpg', slug: 'gloss-yellow-car-bodywork', crop: { left: 0, top: 500, width: 2000, height: 2000 }, widths: [640, 1100] },
  { file: 'stock/matte-grey-supercar.jpg', slug: 'matte-grey-supercar', crop: { left: 0, top: 1250, width: 2000, height: 1500 }, widths: [640, 1100, 1600] },
  { file: 'stock/red-sports-car-front.jpg', slug: 'red-sports-car-front', widths: [640, 1100, 1600] },
  { file: 'stock/white-car-side.jpg', slug: 'white-car-side-gloss', widths: [640, 1100, 1600] },
  { file: 'stock/black-car-front-quarter.jpg', slug: 'black-car-front-quarter', crop: { left: 0, top: 500, width: 2000, height: 2000 }, widths: [640, 1100] },
  { file: 'WhatsApp Image 2026-11-05 at 9.20.27 PM.jpeg', slug: 'wika-ppf-packaging-design', widths: [800, 1600] },
  // Real production floor photos
  { file: 'WhatsApp Image 2026-11-05 at 9.46.49 PM.jpeg', slug: 'ppf-unwinding-station', crop: { left: 0, top: 0, width: 1075, height: 600 }, widths: [640, 1075] },
  { file: 'WhatsApp Image 2026-11-05 at 9.47.11 PM.jpeg', slug: 'ppf-cleanroom-coating-hall', crop: { left: 0, top: 0, width: 1080, height: 690 }, widths: [640, 1080] },
  { file: 'WhatsApp Image 2026-11-05 at 9.47.22 PM.jpeg', slug: 'ppf-precision-coating-head', widths: [640, 1080] },
];

const manifest = {};
for (const m of media) {
  const input = path.join(src, m.file);
  if (!fs.existsSync(input)) {
    console.warn('missing', m.file);
    continue;
  }
  let base = sharp(input).rotate();
  if (m.crop) base = base.extract(m.crop);
  const buf = await base.toBuffer();
  const meta = await sharp(buf).metadata();
  const widths = m.widths.filter((w) => w <= meta.width);
  for (const w of widths) {
    await sharp(buf)
      .resize({ width: w })
      .webp({ quality: w > 1300 ? 74 : 78, effort: 5 })
      .toFile(path.join(out, `${m.slug}-${w}.webp`));
  }
  // small blurred placeholder (base64) for progressive loading
  const lqip = await sharp(buf).resize({ width: 24 }).blur(1.2).webp({ quality: 40 }).toBuffer();
  manifest[m.slug] = {
    w: meta.width,
    h: meta.height,
    widths,
    lqip: `data:image/webp;base64,${lqip.toString('base64')}`,
  };
  console.log('✓', m.slug, widths.join(','));
}

fs.writeFileSync(path.join(root, 'src', 'data', 'media.json'), JSON.stringify(manifest, null, 2));
console.log('manifest written');
