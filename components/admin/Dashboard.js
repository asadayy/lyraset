'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiList } from '@/lib/admin/client';
import Icon from '@/components/Icon';

/** Admin dashboard: content counts, latest leads/applications, quick links. */
export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    Promise.all([
      apiList('services'),
      apiList('case-studies'),
      apiList('team'),
      apiList('jobs'),
      apiList('leads'),
      apiList('applications'),
    ]).then(([services, caseStudies, team, jobs, leads, applications]) => {
      setData({
        counts: {
          Services: services.items?.length || 0,
          'Case studies': caseStudies.items?.length || 0,
          Team: team.items?.length || 0,
          Jobs: jobs.items?.length || 0,
          Leads: leads.items?.length || 0,
          Applications: applications.items?.length || 0,
        },
        recentLeads: (leads.items || []).slice(0, 5),
        recentApps: (applications.items || []).slice(0, 5),
      });
    });
  }, []);

  const links = [
    { label: 'Edit Home page', href: '/admin/pages', icon: 'globe' },
    { label: 'Add a service', href: '/admin/services/new', icon: 'sparkles' },
    { label: 'Add a case study', href: '/admin/portfolio/new', icon: 'brand' },
    { label: 'Site settings', href: '/admin/settings', icon: 'strategy' },
  ];

  if (!data) {
    return (
      <div className="admin-stats">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton" style={{ height: 96, borderRadius: 'var(--radius-lg)' }} />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="admin-stats">
        {Object.entries(data.counts).map(([label, value]) => (
          <div className="admin-stat" key={label}>
            <div className="admin-stat__value">{value}</div>
            <div className="admin-stat__label">{label}</div>
          </div>
        ))}
      </div>

      <div className="admin-panel">
        <div className="admin-panel__title">Quick actions</div>
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="admin-btn admin-btn--ghost">
              <Icon name={l.icon} size={16} /> {l.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="admin-grid-2">
        <div className="admin-panel">
          <div className="admin-panel__title">Latest leads</div>
          {data.recentLeads.length === 0 ? (
            <p style={{ color: 'var(--grey-500)' }}>No leads yet.</p>
          ) : (
            data.recentLeads.map((l) => (
              <div key={l._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--grey-200)' }}>
                <span><strong>{l.name}</strong> · {l.source}</span>
                <span className={`status-pill status-pill--${l.status}`}>{l.status}</span>
              </div>
            ))
          )}
          <Link href="/admin/leads" className="admin-btn admin-btn--ghost admin-btn--sm" style={{ marginTop: '0.75rem' }}>
            View all leads <Icon name="arrow-right" size={14} />
          </Link>
        </div>

        <div className="admin-panel">
          <div className="admin-panel__title">Latest applications</div>
          {data.recentApps.length === 0 ? (
            <p style={{ color: 'var(--grey-500)' }}>No applications yet.</p>
          ) : (
            data.recentApps.map((a) => (
              <div key={a._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--grey-200)' }}>
                <span><strong>{a.name}</strong> · {a.role}</span>
                <span className={`status-pill status-pill--${a.status}`}>{a.status}</span>
              </div>
            ))
          )}
          <Link href="/admin/applications" className="admin-btn admin-btn--ghost admin-btn--sm" style={{ marginTop: '0.75rem' }}>
            View all applications <Icon name="arrow-right" size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
