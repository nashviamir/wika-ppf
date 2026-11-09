import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, Droplets, Flame } from 'lucide-react';
import CompareSlider from '../components/CompareSlider';
import LayerStack from '../components/LayerStack';
import Img from '../components/Img';
import CeoMessage from '../components/CeoMessage';
import { KeyMetrics } from '../components/DataSheet';
import Icon from '../components/Icon';
import { Ambient, Counter, CtaBand, Faq, Marquee, SectionHead } from '../components/ui';
import { benefits, faqs, marqueeWords, partnerTypes, products, stats } from '../data/content';
import { guides } from '../data/guides';

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

export default function Home() {
  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="hero">
        <Ambient />
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="chip hero-chip" data-reveal>
              <span className="dot" /> Wika Germany · Premium Paint Protection Film
            </span>
            <h1 className="h-display" data-reveal style={d(80)}>
              Invisible armor for <span className="text-grad">every finish.</span>
            </h1>
            <p className="lead" data-reveal style={d(160)}>
              WIKA PPF engineers self-healing TPU, matte and PCU paint protection films with German raw materials —
              built for professional installers, detailers and distributors who refuse to compromise.
            </p>
            <div className="btn-row" data-reveal style={d(240)}>
              <Link to="/products/" className="btn btn-primary">
                Explore our films <ArrowRight className="arrow" />
              </Link>
              <Link to="/partners/" className="btn btn-ghost">
                Become a distributor
              </Link>
            </div>
            <ul className="hero-trust" data-reveal style={d(320)}>
              <li>
                <Check /> German raw materials
              </li>
              <li>
                <Check /> Self-healing top coat
              </li>
              <li>
                <Check /> Up to 10-year warranty
              </li>
            </ul>
          </div>
          <div className="hero-photo" data-reveal="scale" style={d(200)}>
            <Img
              name="white-sports-car-front-ppf"
              alt="White sports car front end — the kind of high-impact area WIKA paint protection film protects"
              sizes="(max-width: 900px) 92vw, 560px"
              priority
              position="50% 40%"
            />
            <div className="hero-photo-caption">
              <span className="hpc-label">WIKA Clear Gloss</span>
              <span>Invisible, self-healing TPU film — the factory finish stays factory-fresh.</span>
            </div>
            <div className="hero-badge">
              <b>10</b>
              <span>
                year
                <br />
                warranty*
              </span>
            </div>
          </div>
        </div>
      </section>

      <Marquee items={marqueeWords} />

      {/* ───────── COMPARE ───────── */}
      <section className="section">
        <div className="container split-grid">
          <div>
            <SectionHead
              eyebrow="See the difference"
              title={
                <>
                  Chips, scratches & stains <span className="text-grad">hit the film</span> — not your paint.
                </>
              }
              text="Every highway mile throws sand, gravel and debris at your car. WIKA paint protection film takes the hit, so the factory finish underneath stays flawless for years."
            />
            <ul className="check-list" data-reveal>
              <li>
                <Check /> Absorbs stone chips & road debris
              </li>
              <li>
                <Check /> Resists bird droppings, bug acids & tar
              </li>
              <li>
                <Check /> Keeps paint glossy, deep and UV-protected
              </li>
            </ul>
            <div className="diff-points">
              <div className="diff-point warm" data-reveal>
                <span className="dp-icon">
                  <Flame aria-hidden="true" />
                </span>
                <p>
                  <b>Scratch heat repair capability:</b> High-quality PPF surfaces usually have an elastic memory repair coating (heat
                  activated), which can restore the smoothness of sun marks and small scratches caused by daily car washing or minor
                  friction under sunlight, warm water or hot air.
                </p>
              </div>
              <div className="diff-point" data-reveal>
                <span className="dp-icon">
                  <Droplets aria-hidden="true" />
                </span>
                <p>
                  <b>Hydrophobic self-cleaning properties:</b> Some high-end PPF surfaces have excellent hydrophobic coatings, making it
                  difficult for water droplets and dirt to adhere and easy to roll off, making daily car washing and cleaning easier.
                </p>
              </div>
            </div>
          </div>
          <div data-reveal="right">
            <CompareSlider />
          </div>
        </div>
      </section>

      {/* ───────── PRODUCTS ───────── */}
      <section className="section bg-white" id="films">
        <div className="container">
          <SectionHead
            split
            eyebrow="The WIKA PPF range"
            title={
              <>
                Three films. <br />
                One standard of excellence.
              </>
            }
            text="From invisible gloss to stealth satin to maximum impact resistance — every WIKA film is built on the same multi-layer, German-engineered platform."
          >
            <Link to="/products/" className="link-arrow">
              Compare all products <ArrowRight />
            </Link>
          </SectionHead>
          <div className="grid-3">
            {products.map((p, i) => (
                <Link key={p.slug} to={`/products/${p.slug}/`} className={`product-card pc-${p.finish}`} data-reveal style={d(i * 100)}>
                  <div className="pc-media">
                    <Img name={p.image} alt={`${p.name} ${p.type}`} sizes="(max-width: 680px) 92vw, (max-width: 1024px) 46vw, 400px" />
                    <span className="pc-type">{p.short}</span>
                  </div>
                  <div className="pc-body">
                    <h3 className="h3">{p.name}</h3>
                    <p>{p.tagline}</p>
                    <ul>
                      {p.highlights.slice(0, 3).map((h) => (
                        <li key={h.title}>
                          <Check /> {h.title}
                        </li>
                      ))}
                    </ul>
                    <span className="pc-cta">
                      Discover <ArrowUpRight />
                    </span>
                  </div>
                </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── BENEFITS ───────── */}
      <section className="section bg-white">
        <div className="container">
          <SectionHead
            center
            eyebrow="Why WIKA PPF"
            title="Protection you can’t see. Performance you can feel."
            text="Each layer of WIKA film is engineered for a specific job — together they keep vehicles looking brand new, year after year."
          />
          <div className="grid-3">
            {benefits.map((b, i) => (
              <article className="feature-card" key={b.title} data-reveal style={d((i % 3) * 90)}>
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

      {/* ───────── LAYERS ───────── */}
      <section className="section">
        <div className="container">
          <SectionHead
            split
            eyebrow="Engineered in layers"
            title={
              <>
                What’s inside <span className="text-grad">232 microns</span> of protection.
              </>
            }
            text="PPF performance depends on the complete construction — not a single material name. Select a layer to see its role."
          />
          <LayerStack />
        </div>
      </section>

      {/* ───────── STATS ───────── */}
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

      {/* ───────── TESTED PERFORMANCE ───────── */}
      <KeyMetrics />

      {/* ───────── MANUFACTURING ───────── */}
      <section className="section">
        <div className="container">
          <SectionHead
            split
            eyebrow="From resin to roll"
            title="Precision-made in clean, controlled production."
            text="Raw material verification, precision coating, clean-room processing and seven quality checkpoints — every roll is traceable to its batch."
          >
            <Link to="/manufacturing/" className="link-arrow">
              Inside our production <ArrowRight />
            </Link>
          </SectionHead>
          <div className="bento">
            <figure className="bento-a" data-reveal="clip">
              <Img name="ppf-coating-production-line" alt="WIKA PPF precision coating production line" sizes="(max-width: 900px) 92vw, 760px" />
              <figcaption>Precision coating line</figcaption>
            </figure>
            <figure className="bento-b" data-reveal style={d(100)}>
              <Img name="ppf-quality-control-lab" alt="Paint protection film quality control inspection on a light table" sizes="(max-width: 900px) 92vw, 460px" />
              <figcaption>Quality control lab</figcaption>
            </figure>
            <figure className="bento-c" data-reveal style={d(200)}>
              <Img name="ppf-rnd-laboratory" alt="WIKA PPF research and development laboratory" sizes="(max-width: 900px) 92vw, 460px" />
              <figcaption>R&D laboratory</figcaption>
            </figure>
            <figure className="bento-d" data-reveal style={d(100)}>
              <Img name="ppf-cleanroom-coating-hall" alt="Clean-room paint protection film coating hall" sizes="(max-width: 900px) 92vw, 620px" />
              <figcaption>Clean-room coating hall</figcaption>
            </figure>
            <figure className="bento-e" data-reveal style={d(200)}>
              <Img name="ppf-unwinding-station" alt="Operators loading a TPU master roll on the unwinding station" sizes="(max-width: 900px) 92vw, 620px" />
              <figcaption>Master-roll unwinding</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ───────── PARTNERS ───────── */}
      <section className="section partners-teaser">
        <div className="container split-grid">
          <div className="pt-media" data-reveal="left">
            <Img name="ppf-cleanroom-packing" alt="WIKA PPF rolls being packed and labelled for distributors" sizes="(max-width: 900px) 92vw, 600px" />
            <div className="pt-float">
              <b>Wholesale ready</b>
              <span>Single rolls to full pallets</span>
            </div>
          </div>
          <div>
            <SectionHead
              eyebrow="Grow with WIKA"
              title="Built for the businesses that protect cars."
              text="We partner with distributors, installation studios, dealers and regional representatives — with consistent product, dependable supply and real support."
            />
            <div className="pt-list">
              {partnerTypes.map((p, i) => (
                <div key={p.title} data-reveal style={d(i * 80)}>
                  <span className="icon-tile">
                    <Icon name={p.icon} />
                  </span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/partners/" className="btn btn-primary" data-reveal style={{ marginTop: 32 }}>
              Partner with us <ArrowRight className="arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── GUIDES ───────── */}
      <section className="section">
        <div className="container">
          <SectionHead
            split
            eyebrow="Knowledge hub"
            title="Everything you need to know about PPF."
            text="Straight answers about paint protection film materials, care and how it compares to other protection."
          >
            <Link to="/guides/" className="link-arrow">
              All guides <ArrowRight />
            </Link>
          </SectionHead>
          <div className="grid-3">
            {guides.slice(0, 3).map((g, i) => (
              <Link to={`/guides/${g.slug}/`} className="guide-card" key={g.slug} data-reveal style={d(i * 100)}>
                <div className="gc-media">
                  <Img name={g.image} alt={g.title} sizes="(max-width: 680px) 92vw, 400px" />
                </div>
                <div className="gc-body">
                  <span className="gc-meta">
                    {g.category} · {g.readMinutes} min read
                  </span>
                  <h3 className="h3">{g.title}</h3>
                  <p>{g.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="section bg-white">
        <div className="container faq-grid">
          <div>
            <SectionHead eyebrow="FAQ" title="Questions, answered." text="Quick answers about paint protection film and working with WIKA PPF." />
            <Link to="/faq/" className="link-arrow" data-reveal>
              See all questions <ArrowRight />
            </Link>
          </div>
          <Faq items={faqs.slice(0, 5)} />
        </div>
      </section>

      {/* ───────── CEO ───────── */}
      <section className="section">
        <div className="container">
          <CeoMessage compact />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
