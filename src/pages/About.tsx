import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Img from '../components/Img';
import CeoMessage from '../components/CeoMessage';
import { Counter, CtaBand, PageHero, SectionHead } from '../components/ui';
import { stats } from '../data/content';
import { site } from '../config/site';

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

const values = [
  ['Integrity', 'Honest communication and claims backed by documentation.'],
  ['Quality', 'Repeatable, verified quality at every production stage.'],
  ['Innovation', 'Continuous material and product development.'],
  ['Partnership', 'Long-term relationships that create value for both sides.'],
  ['Accountability', 'Clear terms, traceable batches and responsive support.'],
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About WIKA PPF"
        title={
          <>
            Protecting excellence. <span className="text-grad">Driving innovation.</span>
          </>
        }
        lead="WIKA PPF is an automotive surface-protection brand focused on paint protection film for vehicle owners, professional installers, distributors and business partners."
        crumbs={[{ name: 'About' }]}
      />

      <section className="section-sm" style={{ paddingTop: 0 }}>
        <div className="container">
          <figure className="wide-media hq" data-reveal="clip">
            <Img name="wika-ppf-headquarters" alt="WIKA headquarters building with WIKA flags" sizes="(max-width: 1240px) 100vw, 1200px" priority position="50% 40%" />
          </figure>
        </div>
      </section>

      <section className="section">
        <div className="container split-grid">
          <div>
            <SectionHead
              eyebrow="Who we are"
              title="A simple promise: protection that respects the original finish."
            />
          </div>
          <div className="prose" data-reveal>
            <p>
              The WIKA PPF brand is built around a clear commitment — help preserve the appearance of automotive finishes through
              carefully selected materials, dependable product performance and responsive customer support.
            </p>
            <p>
              Our films are engineered with German raw materials and produced under documented quality controls, from incoming
              material checks to finished-roll inspection. The result is a range of transparent TPU, matte TPU and PCU paint
              protection films designed around the needs of modern vehicles and the professionals who install them.
            </p>
            <p>
              Today we work with distributors, installation studios, detailing centers and dealers who share our belief that quality,
              consistency and honest partnership are what move an industry forward.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <CeoMessage />
        </div>
      </section>

      <section className="section">
        <div className="container grid-2">
          <article className="vm-card" data-reveal>
            <span className="eyebrow">Our vision</span>
            <p>
              To build WIKA PPF into a recognized and trusted name in the global automotive paint protection market through consistent
              quality, product development and strong business relationships.
            </p>
          </article>
          <article className="vm-card blue" data-reveal style={d(100)}>
            <span className="eyebrow on-dark">Our mission</span>
            <p>
              To offer practical, reliable paint protection solutions that combine advanced materials, professional standards, clear
              product information and outstanding customer service.
            </p>
          </article>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <SectionHead center eyebrow="Our values" title="What drives us." />
          <div className="values">
            {values.map(([t, x], i) => (
              <div key={t} data-reveal style={d(i * 80)}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <h3 className="h3">{t}</h3>
                <p>{x}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="stats" data-reveal="scale">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <b>
                  <Counter to={s.value} suffix={s.suffix} />
                </b>
                <span>{s.label}</span>
                <small>{s.sub}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container split-grid">
          <figure className="rounded-media" data-reveal="clip">
            <Img name="ppf-cleanroom-coating-hall" alt="WIKA PPF clean-room coating hall" sizes="(max-width: 900px) 92vw, 600px" />
          </figure>
          <div>
            <SectionHead
              eyebrow="Our commitment"
              title="Built on five commitments."
            />
            <ul className="check-list big" data-reveal>
              <li>Product quality and consistency</li>
              <li>Advanced material technology</li>
              <li>Reliable product performance</li>
              <li>Professional customer support</li>
              <li>Long-term business partnerships</li>
            </ul>
            <Link to="/manufacturing/" className="btn btn-ghost" data-reveal style={{ marginTop: 28 }}>
              Inside our production <ArrowRight className="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand title={`Let’s build the road ahead.`} text={`For product information, distribution opportunities, technical documentation or business inquiries, contact the ${site.name} team.`} />
    </>
  );
}
