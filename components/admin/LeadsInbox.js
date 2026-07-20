'use client';

import { useEffect, useState } from 'react';
import { apiList, apiUpdate, apiRemove } from '@/lib/admin/client';
import { useToast } from '@/components/admin/ToastProvider';
import Icon from '@/components/Icon';

const STATUSES = ['new', 'contacted', 'won', 'archived'];

/** Leads inbox: list submissions, change status, add notes, delete, export CSV. */
export default function LeadsInbox() {
  const toast = useToast();
  const [items, setItems] = useState(null);
  const [selected, setSelected] = useState(null);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    apiList('leads').then((res) => setItems(res.items || []));
  }, []);

  async function setStatus(id, status) {
    setItems((prev) => prev.map((x) => (x._id === id ? { ...x, status } : x)));
    const res = await apiUpdate('leads', id, { status });
    if (!res.ok) toast(res.error || 'Update failed', 'error');
  }
  async function saveNotes() {
    if (!selected) return;
    const res = await apiUpdate('leads', selected._id, { notes });
    if (res.ok) {
      toast('Notes saved', 'success');
      setItems((prev) => prev.map((x) => (x._id === selected._id ? { ...x, notes } : x)));
    } else toast(res.error || 'Save failed', 'error');
  }
  async function remove(id) {
    if (!window.confirm('Delete this lead?')) return;
    const res = await apiRemove('leads', id);
    if (res.ok) {
      setItems((prev) => prev.filter((x) => x._id !== id));
      if (selected?._id === id) setSelected(null);
      toast('Deleted', 'success');
    } else toast(res.error || 'Delete failed', 'error');
  }

  if (items === null) {
    return (
      <div className="admin-table-wrap">
        <table className="admin-table">
          <tbody>
            {[0, 1, 2, 3].map((r) => (
              <tr key={r}><td colSpan={5}><div className="skeleton" style={{ height: 18 }} /></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <p style={{ margin: 0, color: 'var(--grey-500)' }}>{items.length} leads</p>
        <a href="/api/leads/export" className="admin-btn admin-btn--ghost">
          <Icon name="arrow-down" size={16} /> Export CSV
        </a>
      </div>

      {items.length === 0 ? (
        <div className="admin-empty">
          <span className="admin-empty__icon"><Icon name="mail" size={24} /></span>
          <p>No leads yet. Submissions from the site&apos;s forms will appear here.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th><th>Name</th><th>Email</th><th>Source</th><th>Status</th><th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((l) => (
                <tr key={l._id}>
                  <td>{new Date(l.createdAt).toLocaleDateString()}</td>
                  <td><strong>{l.name}</strong></td>
                  <td><a href={`mailto:${l.email}`}>{l.email}</a></td>
                  <td>{l.source}{l.serviceSlug ? ` · ${l.serviceSlug}` : ''}</td>
                  <td>
                    <select className={`status-pill status-pill--${l.status}`} value={l.status} onChange={(e) => setStatus(l._id, e.target.value)} style={{ border: 'none', cursor: 'pointer' }}>
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>
                    <div className="admin-row-actions">
                      <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => { setSelected(l); setNotes(l.notes || ''); }}>View</button>
                      <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => remove(l._id)}><Icon name="close" size={14} /></button>
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
            <h3 style={{ margin: 0 }}>{selected.name}</h3>
            <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => setSelected(null)}><Icon name="close" size={14} /></button>
          </div>
          <p style={{ color: 'var(--grey-500)' }}>{selected.email} · {selected.source}{selected.formTitle ? ` · ${selected.formTitle}` : ''}</p>
          {selected.message && <p style={{ whiteSpace: 'pre-wrap' }}>{selected.message}</p>}
          <div className="admin-field">
            <label>Internal notes</label>
            <textarea className="admin-textarea" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          <button className="admin-btn admin-btn--primary" onClick={saveNotes}>Save notes</button>
        </div>
      )}
    </div>
  );
}
