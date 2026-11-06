import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import LayerStack from '../components/LayerStack';
import CompareSlider from '../components/CompareSlider';
import Img from '../components/Img';
import Icon from '../components/Icon';
import { CtaBand, PageHero, SectionHead } from '../components/ui';
import { benefits, filmFeatures } from '../data/content';

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

export default function Technology() {
  return (
    <>
      <PageHero
        eyebrow="Technology"
        title={
          <>
            The science of <span className="text-grad">invisible protection.</span>
          </>
        }
        lead="A WIKA film is a precisely engineered system: a self-healing top coat, a high-clarity urethane core and a German adhesive — each layer tuned for protection, clarity and a perfect install."
        crumbs={[{ name: 'Technology' }]}
      />

      <section className="section-sm" style={{ paddingTop: 0 }}>
        <div className="container">
          <LayerStack />
        </div>
      </section>

      <section className="section">
        <div className="container split-grid">
          <figure className="rounded-media" data-reveal="clip">
            <Img name="white-car-side-gloss" alt="Glossy white car door panel — the kind of surface where self-healing film keeps wash marks away" sizes="(max-width: 900px) 92vw, 600px" />
          </figure>
          <div>
            <SectionHead
              eyebrow="Self-healing top coat"
              title="Light marks recover with heat."
              text="The elastomeric top coat has a ‘shape memory’. Fine swirl marks and light scratches from washing or daily use level out again when the film is warmed — by the sun, a warm engine or warm water."
            />
            <ol className="heal-steps" data-reveal>
              <li>
                <span>01</span>
                <div>
                  <b>Light surface mark</b>
                  <p>A wash swirl or fingernail scratch marks only the top coat — not the film or the paint below.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <b>Heat is applied</b>
                  <p>Sunlight, a warm engine bay or warm water raises the surface temperature.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <b>Surface levels out</b>
                  <p>The top coat flows back to a smooth, glossy finish — no polishing needed. Deep cuts through the film cannot heal.</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <SectionHead
            center
            eyebrow="Engineered features"
            title="Details that make the difference."
            text="Performance comes from the whole construction — and from getting every detail right."
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

      <section className="section">
        <div className="container split-grid">
          <div>
            <SectionHead
              eyebrow="Real-world protection"
              title="Built for roads that aren’t perfect."
              text="Gravel, salt, sand, sap, bug splatter and UV. Our films are designed around the everyday threats that age paint fastest."
            />
            <div className="mini-features">
              {benefits.map((b) => (
                <div key={b.title} data-reveal>
                  <Icon name={b.icon} size={20} />
                  <span>{b.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div data-reveal="right">
            <CompareSlider />
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container split-grid">
          <figure className="rounded-media" data-reveal="clip">
            <Img name="ppf-rnd-laboratory" alt="WIKA PPF R&D laboratory testing paint protection film materials" sizes="(max-width: 900px) 92vw, 600px" />
          </figure>
          <div>
            <SectionHead
              eyebrow="Research & development"
              title="Quality is a process — not just a claim."
              text="New formulations and grades are evaluated in our laboratory for clarity, adhesion, flexibility and durability. Product claims are tied to defined test methods and documented results."
            />
            <Link to="/manufacturing/" className="btn btn-ghost" data-reveal>
              See how films are made <ArrowRight className="arrow" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
