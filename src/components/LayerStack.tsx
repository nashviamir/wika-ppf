import { useState, type CSSProperties } from 'react';
import { layers } from '../data/content';

/** Exploded, isometric view of the film construction. Hover or tap a layer to inspect it. */
export default function LayerStack() {
  const [active, setActive] = useState(0);


  const all = [...layers, { id: 'paint', name: 'Your vehicle’s paint', thickness: 'OEM clear coat', color: '#0A1330', text: '' }];

  return (
    <div className="layers">
      <div className="layers-visual" aria-hidden="true">
        <div className="layers-iso">
          {all.map((l, i) => (
            <div
              key={l.id}
              className={`layer layer-${l.id}${i === active ? ' active' : ''}`}
              style={{ zIndex: all.length - i, '--o': i - (all.length - 1) / 2 } as CSSProperties}
            >
              <span className="layer-face" />
            </div>
          ))}
        </div>
      </div>
      <ol className="layers-list">
        {layers.map((l, i) => (
          <li key={l.id}>
            <button
              className={i === active ? 'active' : ''}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              aria-pressed={i === active}
            >
              <span className="ll-num" style={{ background: l.color }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="ll-body">
                <span className="ll-title">
                  {l.name} <small>{l.thickness}</small>
                </span>
                <span className="ll-text">{l.text}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

