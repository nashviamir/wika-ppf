/**
 * ─────────────────────────────────────────────────────────────
 *  WIKA PPF — central site configuration
 *  Edit this one file to update domain, contact details & socials.
 *  Domain & base path are set in .github/workflows/deploy.yml (see README).
 * ─────────────────────────────────────────────────────────────
 */
export const site = {
  name: 'WIKA PPF',
  legalName: 'WIKA PPF',
  shortName: 'WIKA',
  tagline: 'Protecting Excellence. Driving Innovation.',
  // Full public URL of the site, no trailing slash. Set at build time with VITE_SITE_URL
  // (see .github/workflows/deploy.yml); the fallback is the intended custom domain.
  url: (import.meta.env.VITE_SITE_URL as string | undefined) || 'https://www.wikappf.com',
  locale: 'en_US',
  themeColor: '#1438D6',

  contact: {
    // ⚠️ Replace these placeholders with your real details
    email: 'info@wikappf.com',
    phone: '+00 000 000 0000',
    whatsapp: '000000000000', // digits only, international format, used for wa.me links
    address: 'Your registered business address',
    hours: 'Mon – Sat · 9:00 – 18:00',
  },

  social: {
    instagram: 'https://www.instagram.com/',
    linkedin: 'https://www.linkedin.com/',
    youtube: 'https://www.youtube.com/',
  },

  /** Optional: set to a video path in /public (e.g. '/media/wika-factory.mp4') to show the factory film. */
  factoryVideo: '' as string,
} as const;

export const nav = [
  { label: 'Products', to: '/products/' },
  { label: 'Technology', to: '/technology/' },
  { label: 'Manufacturing', to: '/manufacturing/' },
  { label: 'Partners', to: '/partners/' },
  { label: 'Guides', to: '/guides/' },
  { label: 'About', to: '/about/' },
] as const;

/** Path the site is served from ("/" on a custom domain, "/wika-ppf/" on github.io). */
export const BASE = import.meta.env.BASE_URL;
/** Prefix a public-folder asset path with the base path. */
export const asset = (p: string) => BASE + p.replace(/^\//, '');
