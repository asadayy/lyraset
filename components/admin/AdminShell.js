'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Icon from '@/components/Icon';

const NAV = [
  {
    section: 'Overview',
    items: [{ label: 'Dashboard', href: '/admin', icon: 'data', exact: true }],
  },
  {
    section: 'Content',
    items: [
      { label: 'Pages & Sections', href: '/admin/pages', icon: 'globe' },
      { label: 'Services', href: '/admin/services', icon: 'sparkles' },
      { label: 'Portfolio', href: '/admin/portfolio', icon: 'brand' },
      { label: 'Categories', href: '/admin/categories', icon: 'chat' },
      { label: 'Team', href: '/admin/team', icon: 'strategy' },
      { label: 'Testimonials', href: '/admin/testimonials', icon: 'quote' },
      { label: 'Careers', href: '/admin/careers', icon: 'briefcase' },
    ],
  },
  {
    section: 'Inbox',
    items: [
      { label: 'Leads', href: '/admin/leads', icon: 'mail' },
      { label: 'Applications', href: '/admin/applications', icon: 'chat' },
    ],
  },
  {
    section: 'Library & Config',
    items: [
      { label: 'Media Library', href: '/admin/media', icon: 'video' },
      { label: 'Site Settings', href: '/admin/settings', icon: 'strategy' },
      { label: 'SEO', href: '/admin/seo', icon: 'trending' },
    ],
  },
];

const TITLES = {
  '/admin': 'Dashboard',
  '/admin/pages': 'Pages & Sections',
  '/admin/services': 'Services',
  '/admin/portfolio': 'Portfolio',
  '/admin/categories': 'Categories',
  '/admin/team': 'Team',
  '/admin/testimonials': 'Testimonials',
  '/admin/careers': 'Careers',
  '/admin/leads': 'Leads',
  '/admin/applications': 'Applications',
  '/admin/media': 'Media Library',
  '/admin/settings': 'Site Settings',
  '/admin/seo': 'SEO',
};

export default function AdminShell({ children, dbConfigured, userEmail }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href, exact) => (exact ? pathname === href : pathname.startsWith(href));
  const title =
    TITLES[pathname] ||
    Object.entries(TITLES).find(([h]) => h !== '/admin' && pathname.startsWith(h))?.[1] ||
    'Admin';

  return (
    <div className="admin">
      <aside className={`admin-sidebar ${open ? 'is-open' : ''}`}>
        <div className="admin-brand">
          <span className="brand__mark" aria-hidden="true" />
          <span className="admin-brand__name">LYRASET</span>
        </div>
        <nav>
          {NAV.map((group) => (
            <div key={group.section}>
              <div className="admin-nav__section">{group.section}</div>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`admin-nav__link ${isActive(item.href, item.exact) ? 'is-active' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  <Icon name={item.icon} size={18} /> {item.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <div className="admin-nav__spacer" />
        <button className="admin-nav__link" onClick={() => signOut({ callbackUrl: '/admin/login' })}>
          <Icon name="arrow-up-right" size={18} /> Logout
        </button>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button className="admin-menu-btn" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
              <Icon name="menu" size={22} />
            </button>
            <h1 className="admin-topbar__title">{title}</h1>
          </div>
          <div className="admin-topbar__actions">
            <span className={`admin-badge ${dbConfigured ? '' : 'admin-badge--warn'}`}>
              {dbConfigured ? 'Live DB' : 'Demo (no DB)'}
            </span>
            <Link href="/" target="_blank" className="admin-btn admin-btn--ghost admin-btn--sm">
              View site <Icon name="arrow-up-right" size={14} />
            </Link>
          </div>
        </header>
        <div className="admin-workspace">
          {!dbConfigured && (
            <div className="admin-demo-banner">
              <strong>Read-only demo.</strong> No database is connected, so content shown here is the
              bundled seed data and edits can&apos;t be saved. Set <code>MONGODB_URI</code> and run{' '}
              <code>npm run seed</code> to enable editing.
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
