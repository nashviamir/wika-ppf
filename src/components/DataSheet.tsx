import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
