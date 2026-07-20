'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { apiList } from '@/lib/admin/client';
import Icon from '@/components/Icon';

export default function AdminPages() {
  const [pages, setPages] = useState(null);
  const [demo, setDemo] = useState(false);

  useEffect(() => {
    apiList('pages').then((res) => {
      setPages(res.items || []);
      setDemo(!!res.demo);
    });
  }, []);

  return (
    <div>
      <p style={{ color: 'var(--grey-500)', marginTop: 0 }}>
        Each page is a stack of sections. Edit any field, toggle visibility, reorder by dragging, or
        add new sections — no code required.
      </p>
      {demo && <div className="admin-demo-banner">Showing bundled seed pages — editing needs a database.</div>}

      {pages === null ? (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <tbody>
              {[0, 1, 2].map((r) => (
                <tr key={r}>
                  <td><div className="skeleton" style={{ height: 16, width: '60%' }} /></td>
                  <td><div className="skeleton" style={{ height: 16, width: '40%' }} /></td>
                  <td><div className="skeleton" style={{ height: 16, width: '30%' }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Page</th>
                <th>Slug</th>
                <th>Sections</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((p) => (
                <tr key={p._id}>
                  <td><strong>{p.title || p.slug}</strong></td>
                  <td>/{p.slug}</td>
                  <td>{p.sections?.length || 0}</td>
                  <td>
                    <div className="admin-row-actions">
                      <Link href={`/admin/pages/${p._id}`} className="admin-btn admin-btn--ghost admin-btn--sm">
                        Edit sections <Icon name="arrow-right" size={14} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
