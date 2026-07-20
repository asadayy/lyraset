'use client';

import { useEffect, useState } from 'react';
import { apiList, apiUpdate, apiRemove } from '@/lib/admin/client';
import { useToast } from '@/components/admin/ToastProvider';
import Icon from '@/components/Icon';

const STATUSES = ['new', 'reviewed', 'shortlisted', 'rejected'];

/** Applications inbox: review candidates, preview CV, set status, delete. */
export default function ApplicationsInbox() {
  const toast = useToast();
  const [items, setItems] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    apiList('applications').then((res) => setItems(res.items || []));
  }, []);

  async function setStatus(id, status) {
    setItems((prev) => prev.map((x) => (x._id === id ? { ...x, status } : x)));
    const res = await apiUpdate('applications', id, { status });
    if (!res.ok) toast(res.error || 'Update failed', 'error');
  }
  async function remove(id) {
    if (!window.confirm('Delete this application?')) return;
    const res = await apiRemove('applications', id);
    if (res.ok) {
      setItems((prev) => prev.filter((x) => x._id !== id));
      if (selected?._id === id) setSelected(null);
      toast('Deleted', 'success');
    } else toast(res.error || 'Delete failed', 'error');
  }

  if (items === null) {
    return (
      <div className="admin-table-wrap">
        <table className="admin-table"><tbody>{[0, 1, 2].map((r) => (<tr key={r}><td colSpan={5}><div className="skeleton" style={{ height: 18 }} /></td></tr>))}</tbody></table>
      </div>
    );
  }

  return (
    <div>
      <p style={{ marginTop: 0, color: 'var(--grey-500)' }}>{items.length} applications</p>
      {items.length === 0 ? (
        <div className="admin-empty">
          <span className="admin-empty__icon"><Icon name="briefcase" size={24} /></span>
          <p>No applications yet. Career submissions will appear here.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr><th>Date</th><th>Name</th><th>Role</th><th>CV</th><th>Status</th><th style={{ textAlign: 'right' }}>Actions</th></tr>
            </thead>
            <tbody>
              {items.map((a) => (
                <tr key={a._id}>
                  <td>{new Date(a.createdAt).toLocaleDateString()}</td>
                  <td><strong>{a.name}</strong><br /><a href={`mailto:${a.email}`} style={{ fontSize: '0.82rem' }}>{a.email}</a></td>
                  <td>{a.role}</td>
                  <td>
                    {a.cv?.url ? (
                      <a href={a.cv.url} target="_blank" rel="noopener noreferrer" className="admin-btn admin-btn--ghost admin-btn--sm">
                        <Icon name="arrow-down" size={14} /> CV
                      </a>
                    ) : <span style={{ color: 'var(--grey-400)' }}>—</span>}
                  </td>
                  <td>
                    <select className={`status-pill status-pill--${a.status}`} value={a.status} onChange={(e) => setStatus(a._id, e.target.value)} style={{ border: 'none', cursor: 'pointer' }}>
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>
                    <div className="admin-row-actions">
                      <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => setSelected(a)}>View</button>
                      <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => remove(a._id)}><Icon name="close" size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="admin-panel" style={{ marginTop: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0 }}>{selected.name} · {selected.role}</h3>
            <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => setSelected(null)}><Icon name="close" size={14} /></button>
          </div>
          <p style={{ color: 'var(--grey-500)' }}>
            {selected.email}
            {selected.portfolioUrl && (<> · <a href={selected.portfolioUrl} target="_blank" rel="noopener noreferrer">Portfolio</a></>)}
          </p>
          {selected.pitch && <p style={{ whiteSpace: 'pre-wrap' }}>{selected.pitch}</p>}
          {selected.cv?.url && (
            <a href={selected.cv.url} target="_blank" rel="noopener noreferrer" className="admin-btn admin-btn--primary">
              <Icon name="arrow-down" size={16} /> Download CV
            </a>
          )}
        </div>
      )}
    </div>
  );
}
