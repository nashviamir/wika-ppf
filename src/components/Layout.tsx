import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Mail, Phone } from 'lucide-react';
import Logo from './Logo';
import { InstagramIcon, LinkedinIcon, YoutubeIcon, WhatsappIcon } from './Icon';
import { asset, nav, site } from '../config/site';
import { products } from '../data/content';
import { guides } from '../data/guides';
import { useReveal } from '../hooks/useReveal';
import { getMeta, fullTitle, abs } from '../seo/meta';

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/* ─────────── Keeps <head> in sync on client-side navigation ─────────── */
function useHeadSync(pathname: string) {
  useEffect(() => {
    const m = getMeta(pathname);
    document.title = fullTitle(m);
    const set = (sel: string, attr: string, val: string) => {
      const el = document.head.querySelector(sel);
      if (el) el.setAttribute(attr, val);
    };
    set('meta[name="description"]', 'content', m.description);
    set('meta[property="og:title"]', 'content', fullTitle(m));
    set('meta[property="og:description"]', 'content', m.description);
    set('meta[property="og:url"]', 'content', abs(m.path));
    set('link[rel="canonical"]', 'href', abs(m.path));
  }, [pathname]);
}

/* ─────────── Header ─────────── */
function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const [pill, setPill] = useState<CSSProperties>({ opacity: 0 });

  // sliding "active" pill behind the current nav item
  useIsoLayoutEffect(() => {
    const place = () => {
      const a = navRef.current?.querySelector<HTMLElement>('a.active');
      setPill(a ? { opacity: 1, width: a.offsetWidth, transform: `translateX(${a.offsetLeft}px)` } : { opacity: 0 });
    };
    place();
    document.fonts?.ready.then(place);
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [pathname]);

  // header only changes its background once you leave the top — it never hides
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <header className={`header${scrolled || open ? ' scrolled' : ''}`}>
        <div className="container header-inner">
          <Link to="/" className="logo">
            <Logo />
          </Link>
          <nav className="nav" aria-label="Main" ref={navRef}>
            <span className="pill" style={pill} aria-hidden="true" />
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                {n.label}
              </NavLink>
            ))}
          </nav>
          <div className="header-cta">
            <Link to="/contact/" className="btn btn-ghost btn-sm">
              Contact
            </Link>
            <Link to="/partners/" className="btn btn-primary btn-sm">
              Become a partner <ArrowRight className="arrow" />
            </Link>
            <button
              className="menu-btn"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`} inert={!open} aria-hidden={!open}>
        <nav aria-label="Mobile">
          {[{ label: 'Home', to: '/' }, ...nav, { label: 'Contact', to: '/contact/' }].map((n, i) => (
            <div key={n.to} className="mm-item" style={{ '--i': i } as CSSProperties}>
              <NavLink to={n.to} end={n.to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
                {n.label} <ArrowUpRight />
              </NavLink>
            </div>
          ))}
        </nav>
        <div className="mm-foot">
          <Link to="/partners/" className="btn btn-primary">
            Become a partner <ArrowRight className="arrow" />
          </Link>
          <div className="mm-contacts">
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            <a href={`tel:${site.contact.phone.replace(/\s/g, '')}`}>{site.contact.phone}</a>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────── Footer ─────────── */
function Footer() {
  const year = 2026;
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="logo">
              <Logo />
            </Link>
            <p>
              Premium paint protection film — transparent TPU, matte TPU and PCU — engineered with German raw
              materials. {site.tagline}
            </p>
            <div className="socials">
              <a href={site.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
              </a>
              <a href={site.social.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <LinkedinIcon />
              </a>
              <a href={site.social.youtube} aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <YoutubeIcon />
              </a>
              <a
                href={`https://wa.me/${site.contact.whatsapp}`}
                aria-label="WhatsApp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsappIcon />
              </a>
            </div>
          </div>
          <div>
            <h2>Products</h2>
            <ul>
              {products.map((p) => (
                <li key={p.slug}>
                  <Link to={`/products/${p.slug}/`}>{p.type.replace(' Paint Protection Film', ' PPF')}</Link>
                </li>
              ))}
              <li>
                <Link to="/technology/">PPF Technology</Link>
              </li>
              <li>
                <Link to="/warranty/">Warranty & Care</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Company</h2>
            <ul>
              <li>
                <Link to="/about/">About WIKA PPF</Link>
              </li>
              <li>
                <Link to="/manufacturing/">Manufacturing</Link>
              </li>
              <li>
                <Link to="/partners/">Distributors & Partners</Link>
              </li>
              <li>
                <Link to="/faq/">FAQ</Link>
              </li>
              <li>
                <Link to="/contact/">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Guides</h2>
            <ul>
              {guides.map((g) => (
                <li key={g.slug}>
                  <Link to={`/guides/${g.slug}/`}>{g.title.split(':')[0].replace('The Complete Guide', '').trim()}</Link>
                </li>
              ))}
            </ul>
            <ul style={{ marginTop: 18 }}>
              <li>
                <a href={`mailto:${site.contact.email}`} style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                  <Mail size={15} /> {site.contact.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.contact.phone.replace(/\s/g, '')}`} style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                  <Phone size={15} /> {site.contact.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-word" aria-hidden="true">
        WIKA
      </div>
      <div className="container">
        <div className="footer-bottom">
        <span>
          © {year} {site.legalName}. All rights reserved.
        </span>
        <nav aria-label="Footer">
          <Link to="/warranty/">Warranty</Link>
          <Link to="/faq/">FAQ</Link>
          <a href={asset('sitemap.xml')}>Sitemap</a>
        </nav>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname, hash } = useLocation();
  const first = useRef(true);
  useReveal();
  useHeadSync(pathname);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
