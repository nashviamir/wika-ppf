import type { CSSProperties } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import Img from '../components/Img';
import Icon from '../components/Icon';
import { CtaBand, PageHero, SectionHead } from '../components/ui';
import { filmFeatures, products } from '../data/content';
import NotFound from './NotFound';

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

const compareRows: [string, string, string, string][] = [
  ['Finish', 'High gloss', 'Satin / matte', 'Gloss'],
  ['Base material', 'Aliphatic TPU', 'Aliphatic TPU', 'Paint protection urethane'],
  ['Self-healing top coat', '●', '●', 'Grade dependent'],
  ['Anti-yellowing / UV stable', '●', '●', '●'],
  ['Hydrophobic & stain resistant', '●', '●', '●'],
  ['Stone-chip resistance', 'High', 'High', 'Maximum'],
  ['Best for', 'Full body & daily drivers', 'Matte paint & stealth looks', 'High-impact & performance'],
  ['Warranty', 'Up to 10 years*', 'Up to 10 years*', 'Grade dependent*'],
];

export default function Products() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title={
          <>
            Paint protection film for <span className="text-grad">every finish.</span>
          </>
        }
        lead="Transparent TPU, matte TPU and PCU films — engineered on one German-material platform with multi-layer anti-wrinkle construction, a Grade-A top coat and installer-friendly adhesive."
        crumbs={[{ name: 'Products' }]}
      />

      <section className="section-sm" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid-3">
            {products.map((p, i) => (
                <Link key={p.slug} to={`/products/${p.slug}/`} className={`product-card pc-${p.finish}`} data-reveal style={d(i * 100)}>
                  <div className="pc-media">
                    <Img name={p.image} alt={`${p.name} ${p.type}`} sizes="(max-width: 680px) 92vw, 400px" />
                    <span className="pc-type">{p.short}</span>
                  </div>
                  <div className="pc-body">
                    <h2 className="h3">{p.name}</h2>
                    <p>{p.tagline}</p>
                    <ul>
                      {p.highlights.map((h) => (
                        <li key={h.title}>
                          <Check /> {h.title}
                        </li>
                      ))}
                    </ul>
                    <span className="pc-cta">
                      Full details <ArrowUpRight />
                    </span>
                  </div>
                </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <SectionHead center eyebrow="Compare" title="Find the right film at a glance." />
          <div className="table-wrap" data-reveal>
            <table className="compare-table">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Property</span>
                  </th>
                  {products.map((p) => (
                    <th scope="col" key={p.slug}>
                      <Link to={`/products/${p.slug}/`}>
                        <small>{p.short}</small>
                        {p.name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map(([k, ...v]) => (
                  <tr key={k}>
                    <th scope="row">{k}</th>
                    {v.map((x, i) => (
                      <td key={i}>{x === '●' ? <Check className="tick" aria-label="Yes" /> : x}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="footnote">*Warranty period and coverage vary by product grade and region. See the written warranty terms supplied with the product.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            center
            eyebrow="Shared DNA"
            title="Built into every WIKA film."
            text="Whatever the finish, all WIKA paint protection films share the same premium construction."
          />
          <div className="grid-4">
            {filmFeatures.map((f, i) => (
              <article className="feature-card" key={f.title} data-reveal style={d(i * 80)}>
                <span className="icon-tile">
                  <Icon name={f.icon} />
                </span>
                <h3 className="h3">{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm bg-white">
        <div className="container">
          <figure className="packaging" data-reveal="clip">
            <Img name="wika-ppf-packaging-design" alt="WIKA PPF premium TPU paint protection film packaging box design" sizes="(max-width: 1240px) 100vw, 1200px" />
          </figure>
          <p className="packaging-caption" data-reveal>
            Every roll ships in WIKA-branded protective packaging with batch labels for full traceability.
          </p>
        </div>
      </section>

      <CtaBand title="Want samples or technical data sheets?" text="Qualified distributors and installers can request film samples and per-grade data sheets." />
    </>
  );
}

export function ProductDetail() {
  const { slug } = useParams();
  const p = products.find((x) => x.slug === slug);
  if (!p) return <NotFound />;
  const others = products.filter((x) => x.slug !== p.slug);

  return (
    <>
      <PageHero
        eyebrow={p.type}
        title={p.name}
        lead={p.tagline}
        crumbs={[{ name: 'Products', to: '/products/' }, { name: p.name }]}
        aside={
          <div className={`pd-visual pc-${p.finish}`}>
            <Img name={p.image} alt={`${p.name} — ${p.type}`} sizes="(max-width: 900px) 92vw, 560px" priority />
            <span className="pd-badge" style={{ background: p.accent }}>
              {p.short}
            </span>
          </div>
        }
      >
        <div className="btn-row" style={{ marginTop: 32 }}>
          <Link to="/contact/" className="btn btn-primary">
            Request samples <ArrowRight className="arrow" />
          </Link>
          <a href="#specs" className="btn btn-ghost">
            View specifications
          </a>
        </div>
      </PageHero>

      <section className="section-sm" style={{ paddingTop: 0 }}>
        <div className="container pd-grid">
          <div className="prose" data-reveal>
            <h2 className="h2">Overview</h2>
            {p.description.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
            <h3 className="h3" style={{ marginTop: 32 }}>
              Ideal for
            </h3>
            <ul className="check-list">
              {p.idealFor.map((x) => (
                <li key={x}>
                  <Check /> {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="pd-highlights">
            {p.highlights.map((h, i) => (
              <article className="feature-card compact" key={h.title} data-reveal style={d(i * 80)}>
                <span className="icon-tile">
                  <Icon name={h.icon} />
                </span>
                <div>
                  <h3 className="h3">{h.title}</h3>
                  <p>{h.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white" id="specs">
        <div className="container">
          <SectionHead eyebrow="Specifications" title="Technical information" />
          <div className="spec-table" data-reveal>
            {p.specs.map(([k, v]) => (
              <div key={k}>
                <span>{k}</span>
                <b>{v}</b>
              </div>
            ))}
          </div>
          <p className="footnote">
            Values are typical and may vary by grade. Final specifications are confirmed in the technical data sheet for each SKU. *Warranty
            terms vary by product grade and region.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Explore more" title="Other WIKA films" />
          <div className="grid-2">
            {others.map((o, i) => (
              <Link to={`/products/${o.slug}/`} className={`product-row pc-${o.finish}`} key={o.slug} data-reveal style={d(i * 100)}>
                <div className="pr-media">
                  <Img name={o.image} alt={o.name} sizes="240px" />
                      </div>
                <div>
                  <small>{o.type}</small>
                  <h3 className="h3">{o.name}</h3>
                  <p>{o.tagline}</p>
                </div>
                <ArrowUpRight className="pr-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={`Interested in ${p.name}?`} />
    </>
  );
}
