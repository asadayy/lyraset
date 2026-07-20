'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon';

/**
 * Lightweight offices map. Renders a stylized map surface with a pin per office
 * (coordinates from the CMS), each pin dropping in with a bounce on first view.
 * Avoids a heavy third-party map iframe (better Lighthouse); each pin links out
 * to Google Maps for real directions.
 */
export default function ContactMap({ offices = [] }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      (e) => e[0].isIntersecting && (setShown(true), io.disconnect()),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Spread pins horizontally for the stylized surface.
  const positions = offices.map((_, i) =>
    offices.length === 1 ? 50 : 26 + (i * 48) / Math.max(1, offices.length - 1)
  );

  return (
    <div className={`contact-map ${shown ? 'is-shown' : ''}`} ref={ref}>
      <div className="contact-map__grid" aria-hidden="true" />
      {offices.map((o, i) => {
        const q = o.lat && o.lng ? `${o.lat},${o.lng}` : encodeURIComponent(o.address);
        return (
          <a
            key={o.label}
            className="contact-map__pin"
            style={{ left: `${positions[i]}%`, top: `${38 + (i % 2) * 20}%`, '--pin-delay': `${i * 0.15}s` }}
            href={`https://www.google.com/maps/search/?api=1&query=${q}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-map__pin-dot">
              <Icon name="map-pin" size={18} />
            </span>
            <span className="contact-map__pin-label">{o.label}</span>
          </a>
        );
      })}
    </div>
  );
}
