import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Droplets, Flame } from 'lucide-react';
import Img from './Img';
import { SectionHead } from './ui';
import { keyMetrics, type DataSheet } from '../data/datasheets';

const d = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

/** Full technical data sheet table for a product page. */
export function DataSheetTable({ sheet }: { sheet: DataSheet }) {
  const multi = sheet.columns.length > 1;
  return (
    <div className="datasheet" data-reveal>
      <div className="ds-head">
        <h3 className="h3">{sheet.title}</h3>
        <p>{sheet.subtitle}</p>
        <p className="ds-swipe">Swipe the table sideways to see all columns →</p>
      </div>
      <div className="table-wrap">
        <table className="compare-table ds-table">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Unit</th>
              {sheet.columns.map((c) => (
                <th scope="col" key={c}>
                  {multi ? c : 'Value'}
                </th>
              ))}
              <th scope="col">Test method</th>
              {sheet.groups.some((g) => g.rows.some((r) => r.note)) && <th scope="col">Remarks</th>}
            </tr>
          </thead>
          {sheet.groups.map((g) => {
            const hasNote = sheet.groups.some((x) => x.rows.some((r) => r.note));
            return (
              <tbody key={g.title}>
                {sheet.groups.length > 1 && (
                  <tr className="ds-group">
                    <th colSpan={3 + sheet.columns.length + (hasNote ? 1 : 0)} scope="rowgroup">
                      {g.title}
                    </th>
                  </tr>
                )}
                {g.rows.map((r) => (
                  <tr key={r.item}>
                    <th scope="row">{r.item}</th>
                    <td className="ds-unit">{r.unit ?? '—'}</td>
                    {r.values.map((v, i) => (
                      <td key={i} className="ds-val">
                        {v}
                      </td>
                    ))}
                    <td className="ds-method">{r.method ?? '—'}</td>
                    {hasNote && <td className="ds-note">{r.note ?? ''}</td>}
                  </tr>
                ))}
              </tbody>
            );
          })}
        </table>
      </div>
      <ul className="ds-notes">
        {sheet.notes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </div>
  );
}

/** "Tested performance" display: headline lab results with their test standards. */
export function KeyMetrics({ link = true }: { link?: boolean }) {
  return (
    <section className="section bg-white">
      <div className="container">
        <SectionHead
          split
          eyebrow="Tested performance"
          title="Numbers from the lab, not the brochure."
          text="Every WIKA film is tested against international standards (ASTM, GB/T and QUV aging). These are the headline results from our transparent film data sheets."
        >
          {link && (
            <div className="metric-links">
              <Link to="/products/transparent-tpu-ppf/#specs" className="link-arrow">
                Clear Gloss TPU data sheet <ArrowRight />
              </Link>
              <Link to="/products/pcu-ppf/#specs" className="link-arrow">
                PCU Pro data sheet <ArrowRight />
              </Link>
            </div>
          )}
        </SectionHead>
        <div className="metrics">
          {keyMetrics.map((m, i) => (
            <div className="metric" key={m.label} data-reveal style={d((i % 4) * 70)}>
              <b>{m.value}</b>
              <span>{m.label}</span>
              <small>{m.method}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const surfaceTech = [
  {
    icon: Flame,
    tone: 'warm',
    image: 'white-car-side-gloss',
    alt: 'Glossy white car door panel kept free of swirl marks',
    title: 'Scratch heat-repair',
    text: 'High-quality PPF surfaces carry an elastic, heat-activated “memory” repair coating. Swirl marks and small scratches from daily car washing or minor friction level out again under sunlight, warm water or hot air — restoring a smooth, glossy surface.',
    points: ['Activated by sunlight, warm water or hot air', 'Removes fine wash marks and light friction scratches', 'No polishing or compounds needed'],
  },
  {
    icon: Droplets,
    tone: 'cool',
    image: 'black-car-front-quarter',
    alt: 'Glossy black sports car front with a clean, reflective finish',
    title: 'Hydrophobic self-cleaning',
    text: 'Premium PPF surfaces have an excellent hydrophobic coating. Water droplets and dirt find it hard to adhere and simply roll off — so the car stays cleaner for longer and daily washing becomes quicker and easier.',
    points: ['Water beads up and rolls off', 'Dirt and contaminants struggle to stick', 'Faster, easier everyday cleaning'],
  },
];

/** Two surface technologies of the top coat: heat repair and hydrophobic self-cleaning. */
export function SurfaceTech() {
  return (
    <section className="section">
      <div className="container">
        <SectionHead
          center
          eyebrow="Top-coat technology"
          title={
            <>
              A surface that <span className="text-grad">repairs and cleans itself.</span>
            </>
          }
          text="The top coat is the part of the film you touch every day. WIKA’s is engineered for two things: recovering from light scratches, and shedding water and dirt."
        />
        <div className="grid-2">
          {surfaceTech.map((t, i) => (
            <article className={`tech-card ${t.tone}`} key={t.title} data-reveal style={d(i * 100)}>
              <div className="tc-media">
                <Img name={t.image} alt={t.alt} sizes="(max-width: 680px) 92vw, 600px" />
                <span className="tc-icon">
                  <t.icon aria-hidden="true" />
                </span>
              </div>
              <div className="tc-body">
                <h3 className="h3">{t.title}</h3>
                <p>{t.text}</p>
                <ul className="check-list">
                  {t.points.map((p) => (
                    <li key={p}>
                      <Check /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
