'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import '@/styles/announcement.scss';

/**
 * Optional promo popup driven by Site Settings → announcement. Appears once per
 * visitor (remembered in localStorage keyed by heading), slides up, and is
 * dismissible. Renders nothing when inactive.
 */
export default function AnnouncementPopup({ announcement }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!announcement?.active) return;
    const key = `lyra-promo:${announcement.heading || 'promo'}`;
    if (localStorage.getItem(key)) return;
    const t = setTimeout(() => setOpen(true), 2500);
    return () => clearTimeout(t);
  }, [announcement]);

  if (!announcement?.active || !open) return null;

  const dismiss = () => {
    localStorage.setItem(`lyra-promo:${announcement.heading || 'promo'}`, '1');
    setOpen(false);
  };

  return (
    <div className="promo-popup" role="dialog" aria-label="Announcement">
      <button className="promo-popup__close" onClick={dismiss} aria-label="Dismiss">
        <Icon name="close" size={18} />
      </button>
      {announcement.heading && <h3 className="promo-popup__heading">{announcement.heading}</h3>}
      {announcement.text && <p className="promo-popup__text">{announcement.text}</p>}
      {announcement.ctaLabel && announcement.ctaHref && (
        <Link href={announcement.ctaHref} className="btn btn-primary btn-sm" onClick={dismiss}>
          {announcement.ctaLabel} <Icon name="arrow-right" size={14} />
        </Link>
      )}
    </div>
  );
}
