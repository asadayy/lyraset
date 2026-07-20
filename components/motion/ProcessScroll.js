'use client';

import { useEffect } from 'react';

/**
 * Draws each process timeline's progress line as the user scrolls, using GSAP +
 * ScrollTrigger (dynamically imported, client-only, so it never delays LCP).
 * Animates only `height` on a thin absolutely-positioned bar. No-ops under
 * reduced-motion.
 */
export default function ProcessScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let ctx;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        document.querySelectorAll('[data-process-timeline]').forEach((section) => {
          const bar = section.querySelector('[data-process-progress]');
          if (!bar) return;
          gsap.fromTo(
            bar,
            { height: '0%' },
            {
              height: '100%',
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top 65%',
                end: 'bottom 75%',
                scrub: true,
              },
            }
          );
        });
        ScrollTrigger.refresh();
      });
    })();

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, []);

  return null;
}
