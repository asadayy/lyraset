'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/Icon';
import { whatsappLink } from '@/lib/utils';

/**
 * Floating WhatsApp button — deep-links to wa.me with a prefilled message from
 * Site Settings. Pulses gently once on first view (respects reduced-motion via
 * the CSS keyframe guard). Renders nothing if no WhatsApp number is set.
 */
export default function FloatingWhatsApp({ number, template }) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPulse(true), 1200);
    return () => clearTimeout(t);
  }, []);

  if (!number) return null;
  const href = whatsappLink(number, template);

  return (
    <a
      className={`wa-float ${pulse ? 'pulse-once' : ''}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message us on WhatsApp"
    >
      <span className="wa-float__label">Message us on WhatsApp</span>
      <Icon name="whatsapp" size={28} />
    </a>
  );
}
