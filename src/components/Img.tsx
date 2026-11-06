import { useEffect, useRef, useState, type CSSProperties } from 'react';
import media from '../data/media.json';
import { asset } from '../config/site';

type MediaKey = keyof typeof media;

interface Props {
  name: string;
  alt: string;
  sizes?: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  /** CSS object-position */
  position?: string;
}

/** Responsive WebP image with blurred placeholder & lazy loading. */
export default function Img({ name, alt, sizes = '100vw', className = '', style, priority, position }: Props) {
  const m = media[name as MediaKey];
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true);
  }, []);

  if (!m) return null;
  const widths = m.widths as number[];
  const srcSet = widths.map((w) => `${asset(`images/${name}-${w}.webp`)} ${w}w`).join(', ');
  const fallback = asset(`images/${name}-${widths[Math.min(1, widths.length - 1)]}.webp`);

  return (
    <div className={`img ${className}`} style={{ backgroundImage: `url(${m.lqip})`, ...style }}>
      <img
        ref={ref}
        src={fallback}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={m.w}
        height={m.h}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={loaded || priority ? 'loaded' : ''}
        onLoad={() => setLoaded(true)}
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  );
}
