import type { CSSProperties } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock, Lightbulb } from 'lucide-react';
import Img from '../components/Img';
import { CtaBand, Crumbs, PageHero, SectionHead, Ambient } from '../components/ui';
import { guides, type Block } from '../data/guides';
import { products } from '../data/content';
import NotFound from './NotFound';

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

export default function Guides() {
  const [first, ...rest] = guides;
  return (
    <>
      <PageHero
        eyebrow="Knowledge hub"
        title={
          <>
            Paint protection film, <span className="text-grad">explained.</span>
          </>
        }
        lead="Clear, practical guides on PPF materials, care and how paint protection film compares to other options."
        crumbs={[{ name: 'Guides' }]}
      />
      <section className="section-sm" style={{ paddingTop: 0 }}>
        <div className="container">
          <Link to={`/guides/${first.slug}/`} className="guide-feature" data-reveal>
            <div className="gf-media">
              <Img name={first.image} alt={first.title} sizes="(max-width: 900px) 92vw, 640px" priority />
            </div>
            <div className="gf-body">
              <span className="gc-meta">
                Featured · {first.category} · {first.readMinutes} min read
              </span>
              <h2 className="h2">{first.title}</h2>
              <p className="lead">{first.excerpt}</p>
              <span className="link-arrow">
                Read the guide <ArrowRight />
              </span>
            </div>
          </Link>
          <div className="grid-3" style={{ marginTop: 24 }}>
            {rest.map((g, i) => (
              <Link to={`/guides/${g.slug}/`} className="guide-card" key={g.slug} data-reveal style={d(i * 100)}>
                <div className="gc-media">
                  <Img name={g.image} alt={g.title} sizes="(max-width: 680px) 92vw, 400px" />
                </div>
                <div className="gc-body">
                  <span className="gc-meta">
                    {g.category} · {g.readMinutes} min read
                  </span>
                  <h2 className="h3">{g.title}</h2>
                  <p>{g.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

function renderBlock(b: Block, i: number) {
  switch (b.type) {
    case 'p':
      return <p key={i}>{b.text}</p>;
    case 'h2':
      return <h2 key={i}>{b.text}</h2>;
    case 'h3':
      return <h3 key={i}>{b.text}</h3>;
    case 'ul':
      return (
        <ul key={i}>
          {b.items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      );
    case 'table':
      return (
        <div className="table-wrap" key={i}>
          <table className="compare-table small">
            <thead>
              <tr>
                {b.head.map((h, j) => (
                  <th key={j} scope="col">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map((r) => (
                <tr key={r[0]}>
                  {r.map((c, j) => (j === 0 ? <th key={j} scope="row">{c}</th> : <td key={j}>{c}</td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'callout':
      return (
        <aside className="callout" key={i}>
          <Lightbulb aria-hidden="true" />
          <div>
            <b>{b.title}</b>
            <p>{b.text}</p>
          </div>
        </aside>
      );
  }
}

export function GuideArticle() {
  const { slug } = useParams();
  const g = guides.find((x) => x.slug === slug);
  if (!g) return <NotFound />;
  const more = guides.filter((x) => x.slug !== g.slug).slice(0, 3);
  const date = new Date(g.date + 'T00:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

  return (
    <>
      <article>
        <header className="article-hero">
          <Ambient />
          <div className="container narrow">
            <Crumbs items={[{ name: 'Guides', to: '/guides/' }, { name: g.category }]} />
            <span className="eyebrow">{g.category}</span>
            <h1 className="h1">{g.title}</h1>
            <p className="lead">{g.description}</p>
            <div className="article-meta">
              <span>
                <Calendar size={15} /> <time dateTime={g.date}>{date}</time>
              </span>
              <span>
                <Clock size={15} /> {g.readMinutes} min read
              </span>
              <span>By the WIKA PPF team</span>
            </div>
          </div>
        </header>
        <div className="container narrow">
          <figure className="article-cover" data-reveal="clip">
            <Img name={g.image} alt={g.title} sizes="(max-width: 860px) 92vw, 820px" priority />
          </figure>
          <div className="prose article-body">{g.body.map(renderBlock)}</div>
          <div className="article-products">
            <h2 className="h3">Explore WIKA films</h2>
            <div>
              {products.map((p) => (
                <Link key={p.slug} to={`/products/${p.slug}/`} className="chip">
                  {p.name}
                </Link>
              ))}
            </div>
          </div>
          <Link to="/guides/" className="link-arrow back">
            <ArrowLeft /> All guides
          </Link>
        </div>
      </article>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Keep reading" title="More guides" />
          <div className="grid-3">
            {more.map((m, i) => (
              <Link to={`/guides/${m.slug}/`} className="guide-card" key={m.slug} data-reveal style={d(i * 100)}>
                <div className="gc-media">
                  <Img name={m.image} alt={m.title} sizes="(max-width: 680px) 92vw, 400px" />
                </div>
                <div className="gc-body">
                  <span className="gc-meta">
                    {m.category} · {m.readMinutes} min read
                  </span>
                  <h3 className="h3">{m.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
