import { useEffect, useRef, useState } from 'react';
import { process } from '../data/content';
import Img from './Img';
import Icon from './Icon';

/** Sticky scrollytelling: the image panel swaps as each production step scrolls into focus. */
export default function ProcessRail() {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="rail">
      <div className="rail-media">
        <div className="rail-sticky">
          {process.map((p, i) => (
            <div key={p.step} className={`rail-img${i === active ? ' on' : ''}`}>
              <Img name={p.image} alt={`${p.title} — WIKA PPF production`} sizes="(max-width: 900px) 100vw, 640px" />
            </div>
          ))}
          <div className="rail-badge">
            <span>{process[active].step}</span>/{String(process.length).padStart(2, '0')}
          </div>
          <div className="rail-progress">
            {process.map((p, i) => (
              <i key={p.step} className={i <= active ? 'on' : ''} />
            ))}
          </div>
        </div>
      </div>
      <ol className="rail-steps">
        {process.map((p, i) => (
          <li
            key={p.step}
            data-i={i}
            ref={(el) => {
              items.current[i] = el;
            }}
            className={i === active ? 'on' : ''}
          >
            <div className="rail-mobile-img">
              <Img name={p.image} alt="" sizes="100vw" />
            </div>
            <div className="rail-step-head">
              <span className="icon-tile">
                <Icon name={p.icon} />
              </span>
              <span className="rail-num">Step {p.step}</span>
            </div>
            <h3 className="h3">{p.title}</h3>
            <p>{p.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
