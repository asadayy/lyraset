'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Lightweight scroll-reveal wrapper (fade + rise, once).
 *
 * Uses IntersectionObserver + CSS transitions rather than a JS animation
 * library, so it adds almost no bundle weight and never blocks LCP. The richer,
 * choreographed motion (hero, slider, counters) uses Framer Motion / GSAP.
 * Reduced-motion users get the final state instantly (see animations.scss).
 *
 * @param {{ as?: any, className?: string, delay?: number, y?: number, children: React.ReactNode }} props
 */
export default function Reveal({ as: Tag = 'div', className = '', delay = 0, y = 22, children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'is-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s`, '--reveal-y': `${y}px` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
