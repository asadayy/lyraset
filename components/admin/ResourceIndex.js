'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { RESOURCES } from '@/lib/admin/resources';
import { apiList, apiRemove } from '@/lib/admin/client';
import { useToast } from '@/components/admin/ToastProvider';
import Icon from '@/components/Icon';

/** Generic list table for a content resource, with New / Edit / Delete. */
export default function ResourceIndex({ resourceKey }) {
  const config = RESOURCES[resourceKey];
  const toast = useToast();
  const [items, setItems] = useState(null);
  const [demo, setDemo] = useState(false);

  const load = async () => {
    const res = await apiList(config.resource);
    setItems(res.items || []);
    setDemo(!!res.demo);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceKey]);

  async function handleDelete(id, label) {
    if (!window.confirm(`Delete "${label}"? This cannot be undone.`)) return;
    const res = await apiRemove(config.resource, id);
    if (res.ok) {
      toast('Deleted', 'success');
      setItems((prev) => prev.filter((x) => x._id !== id));
    } else {
      toast(res.error || 'Delete failed', 'error');
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <p style={{ color: 'var(--grey-500)', margin: 0 }}>
          {items ? `${items.length} ${config.plural.toLowerCase()}` : 'Loading…'}
        </p>
        <Link href={`/admin/${resourceKey}/new`} className="admin-btn admin-btn--primary">
          <Icon name="arrow-down" size={16} /> New {config.label}
        </Link>
      </div>

      {demo && (
        <div className="admin-demo-banner">Showing bundled seed content — editing needs a database.</div>
      )}

      {items === null ? (
        <TableSkeleton cols={config.columns.length} />
      ) : items.length === 0 ? (
        <div className="admin-empty">
          <span className="admin-empty__icon"><Icon name="sparkles" size={24} /></span>
          <p>No {config.plural.toLowerCase()} yet. Create your first one.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                {config.columns.map((c) => (
                  <th key={c.key}>{c.label}</th>
                ))}
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  {config.columns.map((c) => (
                    <td key={c.key}>{renderCell(item[c.key], c.type)}</td>
                  ))}
                  <td>
                    <div className="admin-row-actions">
                      <Link
                        href={`/admin/${resourceKey}/${item._id}`}
                        className="admin-btn admin-btn--ghost admin-btn--sm"
                      >
                        Edit
                      </Link>
                      <button
                        className="admin-btn admin-btn--danger admin-btn--sm"
                        onClick={() => handleDelete(item._id, item.title || item.name || item.author)}
                      >
                        Delete
                      </button>
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

function renderCell(value, type) {
  if (type === 'boolean') {
    return (
      <span className={`status-pill ${value ? 'status-pill--won' : 'status-pill--archived'}`}>
        {value ? 'Yes' : 'No'}
      </span>
    );
  }
  if (value == null || value === '') return <span style={{ color: 'var(--grey-400)' }}>—</span>;
  return String(value);
}

function TableSkeleton({ cols }) {
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <tbody>
          {Array.from({ length: 5 }).map((_, r) => (
            <tr key={r}>
              {Array.from({ length: cols + 1 }).map((__, c) => (
                <td key={c}>
                  <div className="skeleton" style={{ height: 16, width: c === 0 ? '70%' : '50%' }} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
