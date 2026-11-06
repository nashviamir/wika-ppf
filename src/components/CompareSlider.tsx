import { useCallback, useRef, useState } from 'react';
import { MoveHorizontal } from 'lucide-react';
import Img from './Img';

/**
 * Before / after slider built from one real photo: the left side shows the paint as it ages
 * without protection (swirl marks, wash scratches, stone chips), the right side the same panel
 * kept glossy under WIKA PPF. Both images line up pixel-for-pixel.
 */
export default function CompareSlider() {
  const wrap = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const setFromX = useCallback((clientX: number) => {
    const el = wrap.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  return (
    <figure className="compare-fig">
      <div
        className="compare"
        ref={wrap}
        onPointerDown={(e) => {
          dragging.current = true;
          (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
          setFromX(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && setFromX(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
        style={{ '--pos': `${pos}%` } as React.CSSProperties}
      >
        <div className="cmp-layer">
          <Img name="compare-protected" alt="Car hood protected with WIKA PPF: clear, deep gloss with no swirls or chips" sizes="(max-width: 900px) 92vw, 680px" />
        </div>
        <div className="cmp-layer cmp-before">
          <Img name="compare-unprotected" alt="The same car hood without paint protection: swirl marks, scratches and stone chips" sizes="(max-width: 900px) 92vw, 680px" />
        </div>
        <span className="cmp-tag left">Without protection</span>
        <span className="cmp-tag right">With WIKA PPF</span>
        <div className="cmp-handle" aria-hidden="true">
          <span>
            <MoveHorizontal />
          </span>
        </div>
        <input
          className="cmp-range"
          type="range"
          min={0}
          max={100}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Compare unprotected paint with paint protected by WIKA PPF"
        />
      </div>
      <figcaption>Drag to compare the same hood after a few years of daily driving.</figcaption>
    </figure>
  );
}
