import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Img from '../components/Img';
import Icon from '../components/Icon';
import { CtaBand, PageHero, SectionHead } from '../components/ui';
import { partnerBenefits, partnerSteps, partnerTypes } from '../data/content';

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

export default function Partners() {
  return (
    <>
      <PageHero
        eyebrow="Distributors & partners"
        title={
          <>
            Let’s grow <span className="text-grad">together.</span>
          </>
        }
        lead="WIKA PPF welcomes distributors, wholesalers, PPF installation studios, detailing centers, dealers and regional partners. We believe sustainable growth comes from product consistency, honest communication, dependable supply and mutual commitment."
        crumbs={[{ name: 'Partners' }]}
        aside={
          <div className="hero-media">
            <Img name="ppf-warehouse-logistics" alt="Warehouse stocked with WIKA PPF rolls for wholesale distribution" sizes="(max-width: 900px) 92vw, 560px" priority />
          </div>
        }
      >
        <div className="btn-row" style={{ marginTop: 32 }}>
          <Link to="/contact/?topic=distribution" className="btn btn-primary">
            Apply to partner <ArrowRight className="arrow" />
          </Link>
        </div>
      </PageHero>

      <section className="section bg-white">
        <div className="container">
          <SectionHead center eyebrow="Who we work with" title="Partnership models for every business." />
          <div className="grid-4">
            {partnerTypes.map((p, i) => (
                <article key={p.title} className="feature-card tall" data-reveal style={d(i * 80)}>
                  <span className="icon-tile">
                    <Icon name={p.icon} />
                  </span>
                  <h3 className="h3">{p.title}</h3>
                  <p>{p.text}</p>
                </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            split
            eyebrow="Why WIKA PPF"
            title="What our partners get."
            text="Our goal is to build partnerships that create value for both the end customer and the distribution network."
          />
          <div className="grid-3">
            {partnerBenefits.map((b, i) => (
              <article className="feature-card" key={b.title} data-reveal style={d((i % 3) * 80)}>
                <span className="icon-tile">
                  <Icon name={b.icon} />
                </span>
                <h3 className="h3">{b.title}</h3>
                <p>{b.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <SectionHead center eyebrow="How it works" title="From first call to first roll." />
          <ol className="steps">
            {partnerSteps.map((s, i) => (
              <li key={s.title} data-reveal style={d(i * 100)}>
                <span className="steps-num">{i + 1}</span>
                <h3 className="h3">{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <figure className="packaging" data-reveal="clip">
            <Img name="wika-ppf-packaging-design" alt="WIKA PPF branded packaging for retail and distribution" sizes="(max-width: 1240px) 100vw, 1200px" />
          </figure>
          <p className="packaging-caption" data-reveal>
            Retail-ready, WIKA-branded packaging — designed to stand out on your shelf and in your studio.
          </p>
        </div>
      </section>

      <CtaBand title="Become a WIKA PPF partner." text="Tell us about your business and market — we’ll send samples, data sheets and partnership details." />
    </>
  );
}
