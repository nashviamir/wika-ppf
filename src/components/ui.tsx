import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Plus } from 'lucide-react';
import { site } from '../config/site';
import { WhatsappIcon } from './Icon';

/* ─────────── Ambient background (static, cheap to paint) ─────────── */
export function Ambient({ grid = true }: { grid?: boolean }) {
  return (
    <div className="ambient" aria-hidden="true">
      {grid && <div className="grid" />}
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />
    </div>
  );
}

/* ─────────── Breadcrumbs ─────────── */
export function Crumbs({ items }: { items: { name: string; to?: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      {items.map((it, i) => (
        <span key={i} style={{ display: 'contents' }}>
          <ChevronRight aria-hidden="true" />
          {it.to && i < items.length - 1 ? (
            <Link to={it.to}>{it.name}</Link>
          ) : (
            <span aria-current="page">{it.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/* ─────────── Inner page hero ─────────── */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs: { name: string; to?: string }[];
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <Ambient />
      <div className={`container${aside ? ' page-hero-split' : ''}`}>
        <div>
          <Crumbs items={crumbs} />
          <span className="eyebrow" data-reveal>
            {eyebrow}
          </span>
          <h1 className="h1" data-reveal style={{ '--d': '80ms' } as CSSProperties}>
            {title}
          </h1>
          {lead && (
            <p className="lead" data-reveal style={{ '--d': '160ms' } as CSSProperties}>
              {lead}
            </p>
          )}
          {children && (
            <div data-reveal style={{ '--d': '240ms' } as CSSProperties}>
              {children}
            </div>
          )}
        </div>
        {aside && (
          <div data-reveal="scale" style={{ '--d': '200ms' } as CSSProperties}>
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────── Section heading ─────────── */
export function SectionHead({
  eyebrow,
  title,
  text,
  center,
  split,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: ReactNode;
  center?: boolean;
  split?: boolean;
  children?: ReactNode;
}) {
  if (split)
    return (
      <div className="section-head split">
        <div style={{ display: 'grid', gap: 18 }}>
          <span className="eyebrow" data-reveal>
            {eyebrow}
          </span>
          <h2 className="h2" data-reveal style={{ '--d': '80ms' } as CSSProperties}>
            {title}
          </h2>
        </div>
        <div style={{ display: 'grid', gap: 20, justifyItems: 'start' }} data-reveal>
          {text && <p className="lead">{text}</p>}
          {children}
        </div>
      </div>
    );
  return (
    <div className={`section-head${center ? ' center' : ''}`}>
      <span className="eyebrow" data-reveal>
        {eyebrow}
      </span>
      <h2 className="h2" data-reveal style={{ '--d': '80ms' } as CSSProperties}>
        {title}
      </h2>
      {text && (
        <p className="lead" data-reveal style={{ '--d': '160ms' } as CSSProperties}>
          {text}
        </p>
      )}
      {children}
    </div>
  );
}

/* ─────────── Marquee ─────────── */
export function Marquee({ items, reverse }: { items: string[]; reverse?: boolean }) {
  const row = (
    <div className="marquee-row" aria-hidden="true">
      {items.map((w, i) => (
        <span key={i}>
          {w}
          <i className="marquee-star">✦</i>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`marquee${reverse ? ' reverse' : ''}`}>
      <span className="sr-only">{items.join(', ')}</span>
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}

/* ─────────── Animated counter ─────────── */
export function Counter({ to, suffix = '', duration = 1600 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setVal(0);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          setVal(Math.round(eased * to));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ─────────── CTA band ─────────── */
export function CtaBand({
  title = 'Ready to protect what drives your business?',
  text = 'Request samples, technical data sheets or wholesale pricing. Our team usually replies within one business day.',
}: {
  title?: ReactNode;
  text?: ReactNode;
}) {
  return (
    <section className="section-sm">
      <div className="container">
        <div className="cta-band" data-reveal="scale">
          <div className="cta-glow" aria-hidden="true" />
          <div className="cta-content">
            <span className="eyebrow on-dark">Let’s work together</span>
            <h2 className="h2">{title}</h2>
            <p>{text}</p>
          </div>
          <div className="btn-row cta-actions">
            <Link to="/contact/" className="btn btn-white">
              Get in touch <ArrowRight className="arrow" />
            </Link>
            <a
              href={`https://wa.me/${site.contact.whatsapp}`}
              className="btn btn-outline-light"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsappIcon /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── FAQ accordion ─────────── */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <div className="faq">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div className={`faq-item${isOpen ? ' open' : ''}`} key={f.q} data-reveal style={{ '--d': `${i * 40}ms` } as CSSProperties}>
            <h3>
              <button
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                id={`${id}-b${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span>{f.q}</span>
                <span className="faq-icon">
                  <Plus />
                </span>
              </button>
            </h3>
            <div className="faq-panel" id={`${id}-${i}`} role="region" aria-labelledby={`${id}-b${i}`}>
              <div>
                <p>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
