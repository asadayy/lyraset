'use client';

import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';

/**
 * Hero headline with per-line mask-reveal (each line slides up from behind a
 * clipping mask, staggered). Uses Framer Motion via LazyMotion so only the DOM
 * animation features ship. Reduced-motion users get the final state instantly.
 *
 * @param {{ lines: string[], className?: string }} props
 */
export default function HeroHeadline({ lines = [], className = '' }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <h1 className={className}>
        {lines.map((l, i) => (
          <span className="hero__line" key={i} style={{ display: 'block' }}>
            {l}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.h1
        className={className}
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
      >
        {lines.map((line, i) => (
          <span className="hero__line-mask" key={i}>
            <m.span
              className="hero__line"
              variants={{
                hidden: { y: '115%' },
                show: { y: '0%', transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              {line}
            </m.span>
          </span>
        ))}
      </m.h1>
    </LazyMotion>
  );
}
