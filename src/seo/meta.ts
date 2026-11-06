import { asset, site } from '../config/site';
import { products, faqs } from '../data/content';
import { guides } from '../data/guides';
import media from '../data/media.json';

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  type?: 'website' | 'article' | 'product';
  noindex?: boolean;
  /** responsive image (from /public/images) to preload — speeds up the largest paint */
  preload?: { name: string; widths: number[]; sizes: string };
  breadcrumbs?: { name: string; path: string }[];
  jsonLd?: object[];
}

const BASE_KEYWORDS = ['WIKA PPF', 'Wika paint protection film', 'Wika Germany PPF', 'paint protection film', 'PPF'];

export const abs = (p: string) => site.url + p;
/** absolute URL of the largest generated width ≤ 1300px for an image slug */
const img = (slug: string) => {
  const m = (media as Record<string, { widths: number[] }>)[slug];
  const w = m ? Math.max(...m.widths.filter((x) => x <= 1300)) : 1280;
  return abs(`/images/${slug}-${w}.webp`);
};

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': abs('/#organization'),
  name: site.name,
  alternateName: ['WIKA', 'Wika PPF', 'Wika Germany', 'WIKA Paint Protection Film'],
  url: abs('/'),
  logo: abs('/logo.png'),
  image: abs('/og-image.jpg'),
  slogan: site.tagline,
  description:
    'WIKA PPF is a premium automotive paint protection film brand producing transparent TPU, matte TPU and PCU films for installers, detailers, dealers and distributors.',
  email: site.contact.email,
  telephone: site.contact.phone,
  sameAs: Object.values(site.social),
  knowsAbout: ['Paint protection film', 'TPU film', 'Automotive surface protection', 'Self-healing coatings'],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: site.contact.email,
      telephone: site.contact.phone,
      availableLanguage: ['English'],
    },
  ],
};

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': abs('/#website'),
  url: abs('/'),
  name: site.name,
  publisher: { '@id': abs('/#organization') },
  inLanguage: 'en',
};

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...items].map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

function faqLd(list: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: list.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

const staticPages: PageMeta[] = [
  {
    path: '/',
    title: 'WIKA PPF — Premium Paint Protection Film | Self-Healing TPU & Matte PPF',
    description:
      'WIKA PPF makes premium paint protection film: self-healing transparent TPU, matte TPU and PCU films built on German raw materials, with up to 10-year warranty. For installers & distributors.',
    keywords: [...BASE_KEYWORDS, 'car paint protection film', 'TPU PPF', 'clear bra', 'self-healing PPF', 'PPF manufacturer'],
    jsonLd: [organization, website, faqLd(faqs.slice(0, 5))],
    preload: { name: 'white-sports-car-front-ppf', widths: [640, 1100, 1600], sizes: '(max-width: 900px) 92vw, 560px' },
  },
  {
    path: '/products/',
    title: 'Paint Protection Film Products — TPU, Matte & PCU PPF',
    description:
      'Explore the WIKA PPF range: Clear Gloss transparent TPU, Satin Matte TPU and high-impact PCU Pro paint protection films. Specs, finishes and applications.',
    keywords: [...BASE_KEYWORDS, 'TPU PPF', 'matte PPF', 'PCU PPF', 'PPF film roll', 'PPF products'],
    breadcrumbs: [{ name: 'Products', path: '/products/' }],
  },
  {
    path: '/technology/',
    title: 'PPF Technology — Self-Healing Top Coat, TPU & German Adhesive',
    description:
      'How WIKA paint protection film works: multi-layer TPU construction, self-healing top coat, anti-yellowing UV stability, hydrophobic surface and German adhesive technology.',
    keywords: [...BASE_KEYWORDS, 'self-healing PPF', 'anti-yellowing PPF', 'hydrophobic PPF', 'PPF layers', 'TPU film technology'],
    breadcrumbs: [{ name: 'Technology', path: '/technology/' }],
  },
  {
    path: '/manufacturing/',
    title: 'PPF Manufacturing & Quality Control — From Raw Material to Roll',
    description:
      'Inside WIKA PPF production: raw material verification, precision coating, clean-room processing, slitting, 7 quality checkpoints and full batch traceability.',
    keywords: [...BASE_KEYWORDS, 'PPF manufacturer', 'PPF factory', 'paint protection film production', 'PPF quality control'],
    image: img('ppf-coating-production-line'),
    breadcrumbs: [{ name: 'Manufacturing', path: '/manufacturing/' }],
  },
  {
    path: '/partners/',
    title: 'Become a WIKA PPF Distributor, Dealer or Installer Partner',
    description:
      'Partner with WIKA PPF: wholesale paint protection film for distributors, PPF installation studios, detailing centers and dealers. Consistent supply, training and marketing support.',
    keywords: [...BASE_KEYWORDS, 'PPF wholesale', 'PPF distributor', 'PPF supplier', 'paint protection film dealer', 'become PPF distributor'],
    image: img('ppf-warehouse-logistics'),
    breadcrumbs: [{ name: 'Partners', path: '/partners/' }],
  },
  {
    path: '/warranty/',
    title: 'Warranty & Care — Up to 10-Year PPF Warranty',
    description:
      'WIKA PPF warranty and aftercare: up to 10-year coverage on select paint protection film grades, what is covered, how to claim and how to care for your film.',
    keywords: [...BASE_KEYWORDS, 'PPF warranty', '10 year PPF warranty', 'PPF care', 'PPF aftercare'],
    breadcrumbs: [{ name: 'Warranty & Care', path: '/warranty/' }],
  },
  {
    path: '/guides/',
    title: 'Paint Protection Film Guides — PPF Knowledge Hub',
    description:
      'Expert guides on paint protection film: what PPF is, TPU vs PCU vs PVC, PPF vs ceramic coating, and how to wash and maintain PPF.',
    keywords: [...BASE_KEYWORDS, 'PPF guide', 'what is PPF', 'PPF vs ceramic coating', 'TPU vs PVC PPF'],
    breadcrumbs: [{ name: 'Guides', path: '/guides/' }],
  },
  {
    path: '/faq/',
    title: 'Paint Protection Film FAQ — Questions About PPF Answered',
    description:
      'Answers to common questions about paint protection film: self-healing, yellowing, matte PPF, lifespan, washing, ceramic coating over PPF and partnering with WIKA PPF.',
    keywords: [...BASE_KEYWORDS, 'PPF FAQ', 'does PPF self heal', 'how long does PPF last', 'PPF questions'],
    breadcrumbs: [{ name: 'FAQ', path: '/faq/' }],
    jsonLd: [faqLd(faqs)],
  },
  {
    path: '/about/',
    title: 'About WIKA PPF — Advanced Paint Protection Solutions',
    description:
      'WIKA PPF is an automotive surface-protection brand built on quality, innovation and partnership. Discover our vision, mission, values and facilities.',
    keywords: [...BASE_KEYWORDS, 'about WIKA PPF', 'WIKA company', 'PPF brand'],
    image: img('wika-ppf-headquarters'),
    breadcrumbs: [{ name: 'About', path: '/about/' }],
  },
  {
    path: '/contact/',
    title: 'Contact WIKA PPF — Samples, Pricing & Partnerships',
    description:
      'Contact WIKA PPF for product information, film samples, technical data sheets, wholesale pricing and distribution partnerships.',
    keywords: [...BASE_KEYWORDS, 'contact WIKA PPF', 'PPF samples', 'PPF price', 'buy PPF wholesale'],
    breadcrumbs: [{ name: 'Contact', path: '/contact/' }],
    jsonLd: [{ '@context': 'https://schema.org', '@type': 'ContactPage', url: abs('/contact/'), about: { '@id': abs('/#organization') } }],
  },
];

const productPages: PageMeta[] = products.map((p) => ({
  path: `/products/${p.slug}/`,
  title: p.metaTitle,
  description: p.metaDescription,
  keywords: [...BASE_KEYWORDS, ...p.keywords],
  image: img(p.image),
  type: 'product',
  breadcrumbs: [
    { name: 'Products', path: '/products/' },
    { name: p.name, path: `/products/${p.slug}/` },
  ],
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: `${p.name} — ${p.type}`,
      description: p.description[0],
      image: img(p.image),
      brand: { '@type': 'Brand', name: 'WIKA PPF' },
      manufacturer: { '@id': abs('/#organization') },
      category: 'Automotive paint protection film',
      material: p.specs[0][1],
      additionalProperty: p.specs.map(([name, value]) => ({ '@type': 'PropertyValue', name, value })),
    },
  ],
}));

const guidePages: PageMeta[] = guides.map((g) => ({
  path: `/guides/${g.slug}/`,
  title: g.metaTitle,
  description: g.description,
  keywords: [...BASE_KEYWORDS, ...g.keywords],
  image: img(g.image),
  type: 'article',
  breadcrumbs: [
    { name: 'Guides', path: '/guides/' },
    { name: g.title, path: `/guides/${g.slug}/` },
  ],
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: g.title,
      description: g.description,
      image: img(g.image),
      datePublished: g.date,
      dateModified: g.date,
      author: { '@type': 'Organization', name: site.name, url: abs('/') },
      publisher: { '@id': abs('/#organization') },
      mainEntityOfPage: abs(`/guides/${g.slug}/`),
    },
  ],
}));

export const notFoundMeta: PageMeta = {
  path: '/404/',
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found.',
  keywords: [],
  noindex: true,
};

export const allPages: PageMeta[] = [...staticPages, ...productPages, ...guidePages];

export function getMeta(pathname: string): PageMeta {
  const p = pathname.endsWith('/') ? pathname : pathname + '/';
  return allPages.find((m) => m.path === p) ?? notFoundMeta;
}

export function fullTitle(m: PageMeta) {
  return m.path === '/' ? m.title : `${m.title} | WIKA PPF`;
}

/** Builds the <head> HTML for a page (used by the prerender step). */
export function headHtml(m: PageMeta) {
  const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const url = abs(m.path === '/404/' ? '/' : m.path);
  // Social previews (WhatsApp, LinkedIn, Facebook) are most reliable with the branded JPG
  const image = abs('/og-image.jpg');
  const ld = [...(m.jsonLd ?? [])];
  if (m.breadcrumbs?.length) ld.push(breadcrumbLd(m.breadcrumbs));
  return [
    `<title>${esc(fullTitle(m))}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    m.keywords.length ? `<meta name="keywords" content="${esc([...new Set(m.keywords)].join(', '))}" />` : '',
    `<meta name="robots" content="${m.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
    m.noindex ? '' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${m.type === 'article' ? 'article' : 'website'}" />`,
    `<meta property="og:site_name" content="${site.name}" />`,
    `<meta property="og:locale" content="${site.locale}" />`,
    `<meta property="og:title" content="${esc(fullTitle(m))}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    m.preload
      ? `<link rel="preload" as="image" type="image/webp" fetchpriority="high" imagesrcset="${m.preload.widths.map((w) => `${asset(`images/${m.preload!.name}-${w}.webp`)} ${w}w`).join(', ')}" imagesizes="${m.preload.sizes}" />`
      : '',
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(fullTitle(m))}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    ...ld.map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`),
  ]
    .filter(Boolean)
    .join('\n    ');
}
