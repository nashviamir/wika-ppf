import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, Clock, MapPin, Phone } from 'lucide-react';
import Icon from '../components/Icon';
import { PageHero } from '../components/ui';
import { mapsHref, site } from '../config/site';
import type { IconName } from '../data/content';

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

const topics: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'package',
    title: 'Samples & data sheets',
    text: 'Film samples and per-grade technical data sheets for Clear Gloss TPU, Satin Matte TPU and PCU Pro.',
  },
  {
    icon: 'boxes',
    title: 'Wholesale pricing',
    text: 'Volume pricing for single rolls through to full pallets, plus long-term supply planning.',
  },
  {
    icon: 'handshake',
    title: 'Distribution partnership',
    text: 'Regional distribution, dealer development and representation of the WIKA PPF brand in your market.',
  },
  {
    icon: 'wrench',
    title: 'Technical & warranty support',
    text: 'Installation questions, product identification and warranty claims for WIKA films.',
  },
];

const prepare = [
  'Your company name and country or region',
  'Your business type (distributor, installer, dealer…)',
  'The films you are interested in and expected volumes',
  'For warranty questions: product, batch number and installation date',
];

export default function Contact() {
  const { address } = site.contact;
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let’s talk <span className="text-grad">protection.</span>
          </>
        }
        lead="Product information, film samples, technical data sheets, wholesale pricing or partnerships — call our team in Frankfurt or visit us in person."
        crumbs={[{ name: 'Contact' }]}
      />

      <section className="section-sm" style={{ paddingTop: 0 }}>
        <div className="container contact-cards">
          <a href={site.contact.phoneHref} className="contact-card call" data-reveal style={d(0)}>
            <span className="icon-tile">
              <Phone />
            </span>
            <small>Call us</small>
            <b className="cc-big">{site.contact.phone}</b>
            <span className="cc-meta">
              <Clock size={15} aria-hidden="true" /> {site.contact.hours}
            </span>
          </a>
          <a href={mapsHref} target="_blank" rel="noopener noreferrer" className="contact-card" data-reveal style={d(100)}>
            <span className="icon-tile">
              <MapPin />
            </span>
            <small>Visit us</small>
            <address className="cc-big">
              {site.legalName}
              <br />
              {address.street}
              <br />
              {address.postalCode} {address.city}
              <br />
              {address.country}
            </address>
            <span className="cc-meta link-arrow">
              Open in Google Maps <ArrowUpRight />
            </span>
          </a>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container contact-help">
          <div>
            <span className="eyebrow" data-reveal>
              How we can help
            </span>
            <h2 className="h2" data-reveal style={d(80)}>
              One call for products, pricing and partnerships.
            </h2>
            <div className="contact-prepare" data-reveal style={d(160)}>
              <h3 className="h3">Helpful to have ready</h3>
              <ul className="check-list">
                {prepare.map((p) => (
                  <li key={p}>
                    <Check /> {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="contact-topics">
            {topics.map((t, i) => (
              <article className="feature-card compact" key={t.title} data-reveal style={d(i * 80)}>
                <span className="icon-tile">
                  <Icon name={t.icon} />
                </span>
                <div>
                  <h3 className="h3">{t.title}</h3>
                  <p>{t.text}</p>
                </div>
              </article>
            ))}
            <p className="contact-links" data-reveal>
              Looking for partnership details first? See <Link to="/partners/">Partners</Link>, or browse answers in our{' '}
              <Link to="/faq/">FAQ</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
