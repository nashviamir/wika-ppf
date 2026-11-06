import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Global scroll-reveal: any element with [data-reveal] fades/slides in when it enters the viewport.
 * Content is fully visible in the prerendered HTML (the hidden state only applies when JS runs).
 */
export function useReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).setAttribute('data-in', '');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    const scan = () => {
      document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-in])').forEach((el) => {
        if (reduce) el.setAttribute('data-in', '');
        else io.observe(el);
      });
    };
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.getElementById('root')!, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);
}
