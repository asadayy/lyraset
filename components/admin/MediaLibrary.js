'use client';

import { useEffect, useRef, useState } from 'react';
import { apiList, apiRemove } from '@/lib/admin/client';
import { useToast } from '@/components/admin/ToastProvider';
import Icon from '@/components/Icon';

/** Media Library: browse, filter, upload, copy URL, and delete Cloudinary assets. */
export default function MediaLibrary() {
  const toast = useToast();
  const fileRef = useRef(null);
  const [items, setItems] = useState(null);
  const [filter, setFilter] = useState('all');
  const [busy, setBusy] = useState(false);
  const [demo, setDemo] = useState(false);

  const load = async () => {
    const res = await apiList('media');
    setItems(res.items || []);
    setDemo(res.status === 200 && (res.items || []).length === 0);
  };
  useEffect(() => {
    load();
  }, []);

  const shown = (items || []).filter((m) => filter === 'all' || m.resourceType === filter);

  async function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const resourceType = file.type.startsWith('video')
      ? 'video'
      : file.type === 'application/pdf'
        ? 'raw'
        : 'image';
    setBusy(true);
    try {
      const signRes = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resourceType, folder: 'lyraset', bytes: file.size }),
      });
      const sign = await signRes.json();
      if (!signRes.ok || !sign.ok) throw new Error(sign.error || 'Upload unavailable');
      const fd = new FormData();
      fd.append('file', file);
      fd.append('api_key', sign.apiKey);
      fd.append('timestamp', sign.timestamp);
      fd.append('signature', sign.signature);
      fd.append('folder', sign.folder);
      const cldRes = await fetch(`https://api.cloudinary.com/v1_1/${sign.cloudName}/${resourceType}/upload`, {
        method: 'POST',
        body: fd,
      });
      const asset = await cldRes.json();
      if (!cldRes.ok) throw new Error('Upload failed');
      await fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          publicId: asset.public_id,
          url: asset.secure_url,
          resourceType,
          format: asset.format,
          bytes: asset.bytes,
          width: asset.width,
          height: asset.height,
        }),
      });
      toast('Uploaded', 'success');
      load();
    } catch (err) {
      toast(err.message || 'Upload failed', 'error');
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this asset from Cloudinary? This cannot be undone.')) return;
    const res = await apiRemove('media', id);
    if (res.ok) {
      toast('Deleted', 'success');
      setItems((prev) => prev.filter((x) => x._id !== id));
    } else toast(res.error || 'Delete failed', 'error');
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        <div className="portfolio-filters" style={{ margin: 0 }}>
          {['all', 'image', 'video', 'raw'].map((f) => (
            <button key={f} className={`portfolio-filter ${filter === f ? 'is-active' : ''}`} onClick={() => setFilter(f)}>
              {f === 'raw' ? 'PDF' : f[0].toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <input ref={fileRef} type="file" hidden onChange={handleUpload} accept="image/*,video/*,application/pdf" />
        <button className="admin-btn admin-btn--primary" onClick={() => fileRef.current?.click()} disabled={busy}>
          {busy ? 'Uploading…' : (<><Icon name="arrow-down" size={16} /> Upload media</>)}
        </button>
      </div>

      {items === null ? (
        <div className="media-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton" style={{ aspectRatio: 1, borderRadius: 'var(--radius)' }} />
          ))}
        </div>
      ) : shown.length === 0 ? (
        <div className="admin-empty">
          <span className="admin-empty__icon"><Icon name="video" size={24} /></span>
          <p>{demo ? 'No media yet. Connect Cloudinary + a database, then upload.' : 'No media in this filter.'}</p>
        </div>
      ) : (
        <div className="media-grid">
          {shown.map((m) => (
            <div className="media-tile" key={m._id}>
              <div className="media-tile__thumb">
                {m.resourceType === 'image' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.url} alt={m.alt || m.publicId} loading="lazy" />
                ) : m.resourceType === 'video' ? (
                  <Icon name="play" size={28} />
                ) : (
                  <Icon name="mail" size={28} />
                )}
              </div>
              <div className="media-tile__meta">
                <span>{m.format || m.resourceType}</span>
                <span>{m.bytes ? `${Math.round(m.bytes / 1024)}KB` : ''}</span>
              </div>
              <div style={{ display: 'flex', gap: 4, padding: '0 0.5rem 0.5rem' }}>
                <button
                  className="admin-btn admin-btn--ghost admin-btn--sm"
                  onClick={() => {
                    navigator.clipboard?.writeText(m.url);
                    toast('URL copied', 'success');
                  }}
                  style={{ flex: 1 }}
                >
                  Copy URL
                </button>
                <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => handleDelete(m._id)}>
                  <Icon name="close" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
