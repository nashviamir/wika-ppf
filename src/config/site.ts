/**
 * ─────────────────────────────────────────────────────────────
 *  WIKA PPF — central site configuration
 *  Edit this one file to update the company's contact details.
 *  Domain & base path are set in .github/workflows/deploy.yml (see README).
 * ─────────────────────────────────────────────────────────────
 */
export const site = {
  name: 'WIKA PPF',
  legalName: 'WIKA PPF GmbH',
  shortName: 'WIKA',
  tagline: 'Protecting Excellence. Driving Innovation.',
  // Full public URL of the site, no trailing slash. Set at build time with VITE_SITE_URL
  // (see .github/workflows/deploy.yml); the fallback is the current GitHub Pages address.
  url: (import.meta.env.VITE_SITE_URL as string | undefined) || 'https://nashviamir.github.io/wika-ppf',
  locale: 'en_US',
  themeColor: '#1438D6',

  contact: {
    /**
     * Fictional details for now. The phone number is from the Bundesnetzagentur
     * "drama numbers" block (069 90009 000–999), which is never assigned to anyone.
     */
    phone: '+49 69 90009 240',
    phoneHref: 'tel:+496990009240',
    address: {
      street: 'Carl-Benz-Straße 21',
      postalCode: '60386',
      city: 'Frankfurt am Main',
      country: 'Germany',
      countryCode: 'DE',
    },
    hours: 'Mon – Fri · 8:00 – 17:00 CET',
    /** schema.org opening hours (used in structured data) */
    openingHours: { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '17:00' },
  },

  ceo: {
    title: 'Chief Executive Officer',
  },

  /** Optional: set to a video path in /public (e.g. '/media/wika-factory.mp4') to show the factory film. */
  factoryVideo: '' as string,
} as const;

/** One-line postal address, e.g. "Carl-Benz-Straße 21, 60386 Frankfurt am Main, Germany" */
export const addressLine = `${site.contact.address.street}, ${site.contact.address.postalCode} ${site.contact.address.city}, ${site.contact.address.country}`;
/** Google Maps search link for the address */
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLine)}`;

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
