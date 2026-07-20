'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Lightweight top progress bar shown briefly on route change. App Router
 * doesn't expose navigation-start events, so this animates a quick 0→100 sweep
 * keyed on the committed pathname — a subtle "something happened" cue that
 * never blocks navigation. Hidden under reduced-motion.
 */
export default function RouteProgress() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }
    setVisible(true);
    setScale(0.1);
    const r1 = requestAnimationFrame(() => setScale(0.9));
    const t1 = setTimeout(() => setScale(1), 180);
    const t2 = setTimeout(() => setVisible(false), 420);
    const t3 = setTimeout(() => setScale(0), 460);
    return () => {
      cancelAnimationFrame(r1);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname]);

  return (
    <span
      className="route-progress"
      aria-hidden="true"
      style={{
        transform: `scaleX(${scale})`,
        opacity: visible ? 1 : 0,
        transition: 'transform 0.2s ease-out, opacity 0.2s ease-out',
      }}
    />
  );
}
