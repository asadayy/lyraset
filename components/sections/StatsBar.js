'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Animated stats bar. Each value counts up (with an easing overshoot) the first
 * time it scrolls into view, then the "+" / suffix lands. Values come from Site
 * Settings. Reduced-motion users see the final numbers immediately.
 */
export default function StatsBar({ stats = [] }) {
  if (!stats.length) return null;
  return (
    <section className="stats-bar section--dark">
      <div className="container-x">
        <div className="stats-bar__grid">
          {stats.map((s, i) => (
            <Stat key={i} stat={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ stat, index }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(stat.prefix ? `${stat.prefix}0` : '0');
  const [landed, setLanded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const target = Number(stat.number) || 0;

    const finish = () => {
      setDisplay(`${stat.prefix || ''}${target}`);
      setLanded(true);
    };

    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      finish();
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const duration = 1400;
        const start = performance.now() + index * 120;
        const tick = (now) => {
          const t = Math.min(1, Math.max(0, (now - start) / duration));
          // easeOutBack for a subtle overshoot
          const c1 = 1.70158;
          const c3 = c1 + 1;
          const eased = t <= 0 ? 0 : 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
          const val = Math.round(eased * target);
          setDisplay(`${stat.prefix || ''}${val}`);
          if (t < 1) requestAnimationFrame(tick);
          else finish();
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [stat, index]);

  return (
    <div className="stats-bar__item" ref={ref}>
      <span className="stats-bar__value">
        {display}
        <span className={`stats-bar__suffix ${landed ? 'is-in' : ''}`}>{stat.suffix}</span>
      </span>
      <span className="stats-bar__label">{stat.label}</span>
    </div>
  );
}
