'use client';

import { useRef } from 'react';

/**
 * Magnetic hover for primary CTAs (desktop only, ≥992px). The wrapped element
 * eases toward the cursor and springs back on leave — transform-only, so it
 * stays on the compositor. Disabled on touch/narrow viewports and under
 * reduced-motion.
 */
export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null);

  const enabled = () =>
    typeof window !== 'undefined' &&
    window.innerWidth >= 992 &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function onMove(e) {
    const el = ref.current;
    if (!el || !enabled()) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }

  function reset() {
    const el = ref.current;
    if (el) el.style.transform = '';
  }

  return (
    <span
      ref={ref}
      className={`magnetic ${className}`}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ display: 'inline-flex', transition: 'transform 0.25s var(--ease-out)' }}
    >
      {children}
    </span>
  );
}
