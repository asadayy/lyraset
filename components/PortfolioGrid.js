'use client';

import { useState } from 'react';
import CaseStudyCard from '@/components/cards/CaseStudyCard';

/**
 * Filterable portfolio grid. Category filter is client-side; the layout
 * animates via CSS transitions (FLIP choreography is layered in the animation
 * pass). Categories + items come from the CMS.
 */
export default function PortfolioGrid({ items = [], categories = [] }) {
  const [active, setActive] = useState('all');
  const filtered = active === 'all' ? items : items.filter((i) => i.categorySlug === active);

  return (
    <>
      {categories.length > 0 && (
        <div className="portfolio-filters" role="tablist" aria-label="Filter work by category">
          <button
            className={`portfolio-filter ${active === 'all' ? 'is-active' : ''}`}
            onClick={() => setActive('all')}
            role="tab"
            aria-selected={active === 'all'}
          >
            All Work
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              className={`portfolio-filter ${active === c.slug ? 'is-active' : ''}`}
              onClick={() => setActive(c.slug)}
              role="tab"
              aria-selected={active === c.slug}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}

      <div className="portfolio-grid">
        {filtered.map((c, i) => (
          <CaseStudyCard key={c.slug} item={c} priority={i === 0} />
        ))}
      </div>
      {filtered.length === 0 && <p className="lead-muted">No projects in this category yet.</p>}
    </>
  );
}
