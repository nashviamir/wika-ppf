import type { CSSProperties } from 'react';
import { Check, Play } from 'lucide-react';
import ProcessRail from '../components/ProcessRail';
import Img from '../components/Img';
import { CtaBand, PageHero, SectionHead } from '../components/ui';
import { qualityChecks } from '../data/content';
import { site } from '../config/site';

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

export default function Manufacturing() {
  return (
    <>
      <PageHero
        eyebrow="Manufacturing"
        title={
          <>
            From resin to roll, <span className="text-grad">precision at every step.</span>
          </>
        }
        lead="Clean, climate-controlled production, documented quality checkpoints and full batch traceability — so every roll of WIKA PPF installs and performs the same."
        crumbs={[{ name: 'Manufacturing' }]}
      />

      <section className="section-sm" style={{ paddingTop: 0 }}>
        <div className="container">
          <figure className="wide-media" data-reveal="clip">
            <Img name="ppf-coating-production-line" alt="WIKA PPF large-scale paint protection film coating line" sizes="(max-width: 1240px) 100vw, 1200px" priority />
            {site.factoryVideo ? (
              <video className="wide-video" src={site.factoryVideo} autoPlay muted loop playsInline aria-label="WIKA PPF factory film" />
            ) : null}
            <figcaption>
              <span className="chip">
                <Play size={14} /> WIKA PPF production line
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Our process"
            title="Seven steps. Zero shortcuts."
            text="Scroll through how a WIKA paint protection film roll is made — from verified raw materials to the moment it ships."
          />
          <ProcessRail />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container split-grid">
          <div>
            <SectionHead
              eyebrow="Quality assurance"
              title="Seven checkpoints on every batch."
              text="A dependable film requires repeatable quality at every stage. These checks are documented and applied consistently across every production batch."
            />
          </div>
          <ol className="qc-list">
            {qualityChecks.map((q, i) => (
              <li key={q} data-reveal style={d(i * 60)}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {q}
                <Check />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead center eyebrow="On the floor" title="A look inside production." />
          <div className="gallery">
            {[
              ['ppf-cleanroom-coating-hall', 'Clean-room PPF coating hall'],
              ['ppf-precision-coating-head', 'Precision coating head applying top coat to TPU film'],
              ['ppf-unwinding-station', 'Operators loading a master roll on the unwinding station'],
              ['tpu-film-production', 'TPU film running through the lamination line'],
              ['ppf-quality-control-lab', 'Film thickness and clarity inspection'],
              ['ppf-warehouse-logistics', 'Finished rolls in the warehouse ready for dispatch'],
            ].map(([n, alt], i) => (
              <figure key={n} data-reveal style={d((i % 3) * 90)}>
                <Img name={n} alt={alt} sizes="(max-width: 680px) 92vw, (max-width: 1024px) 46vw, 400px" />
                <figcaption>{alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="See our quality for yourself." text="Request film samples and data sheets, or arrange a visit with our team." />
    </>
  );
}
