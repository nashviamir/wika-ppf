import type { CSSProperties } from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import Icon from '../components/Icon';
import { CtaBand, PageHero, SectionHead } from '../components/ui';
import { careTips, installSteps } from '../data/content';

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

const covered = [
  'Yellowing or discoloration under normal use',
  'Cracking, blistering or bubbling of the film',
  'Delamination or adhesive failure',
  'Loss of self-healing performance in the top coat',
];
const excluded = [
  'Improper installation or unapproved installation methods',
  'Accidents, collisions, vandalism or misuse',
  'Damage from abrasive polishing or harsh chemicals',
  'Film applied over repainted or damaged paint',
];

export default function Warranty() {
  return (
    <>
      <PageHero
        eyebrow="Warranty & care"
        title={
          <>
            Confidence through <span className="text-grad">clear terms.</span>
          </>
        }
        lead="WIKA PPF stands behind its films with warranty coverage of up to 10 years on select grades — and simple care guidance to keep them looking new."
        crumbs={[{ name: 'Warranty & Care' }]}
        aside={
          <div className="warranty-badge">
            <div className="wb-ring" aria-hidden="true" />
            <ShieldCheck className="wb-icon" aria-hidden="true" />
            <b>10</b>
            <span>Year warranty</span>
            <small>Up to, on select grades*</small>
          </div>
        }
      />

      <section className="section bg-white">
        <div className="container grid-2">
          <div className="terms-card ok" data-reveal>
            <h2 className="h3">What’s typically covered</h2>
            <ul>
              {covered.map((c) => (
                <li key={c}>
                  <Check /> {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="terms-card no" data-reveal style={d(100)}>
            <h2 className="h3">What’s typically excluded</h2>
            <ul>
              {excluded.map((c) => (
                <li key={c}>
                  <span>×</span> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container">
          <p className="footnote">
            *Warranty duration and coverage vary by product grade and country, and are defined in the official written warranty document
            supplied with the product. Keep your installation invoice — it’s required to make a claim.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead center eyebrow="Aftercare" title="Four habits for a film that lasts." />
          <div className="grid-4">
            {careTips.map((c, i) => (
              <article className="feature-card" key={c.title} data-reveal style={d(i * 80)}>
                <span className="icon-tile">
                  <Icon name={c.icon} />
                </span>
                <h3 className="h3">{c.title}</h3>
                <p>{c.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container split-grid">
          <div>
            <SectionHead
              eyebrow="For installers"
              title="Installation best practices."
              text="The quality of a finished PPF installation depends on both the film and the process. We support professional installers with clear guidance."
            />
          </div>
          <ol className="qc-list">
            {installSteps.map((s, i) => (
              <li key={s} data-reveal style={d(i * 60)}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                {s}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead center eyebrow="Making a claim" title="A simple, documented process." />
          <ol className="steps">
            {[
              ['Contact your installer', 'Your authorized installer or seller is the first point of contact.'],
              ['Share the details', 'Product & batch ID, installation date, photos and a description of the issue.'],
              ['Assessment', 'The installer’s assessment and documentation are reviewed by our team.'],
              ['Resolution', 'Decisions follow the written warranty terms for the relevant product.'],
            ].map(([t, x], i) => (
              <li key={t} data-reveal style={d(i * 100)}>
                <span className="steps-num">{i + 1}</span>
                <h3 className="h3">{t}</h3>
                <p>{x}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title="Questions about coverage?" text="Our team can share full warranty documents for each product grade." />
    </>
  );
}
