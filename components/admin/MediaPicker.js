'use client';

import { useRef, useState } from 'react';
import Icon from '@/components/Icon';
import { useToast } from '@/components/admin/ToastProvider';

/**
 * Media picker: uploads an image/video directly to Cloudinary via a server-
 * signed request, records the asset in the Media Library, and stores the
 * resulting reference (publicId, url, dimensions…) on the parent document.
 * Alt text is required for accessibility.
 *
 * @param {{ value?: object, onChange: (media:object)=>void, resourceType?: string }} props
 */
export default function MediaPicker({ value = {}, onChange, resourceType = 'image' }) {
  const toast = useToast();
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
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
      const cldRes = await fetch(
        `https://api.cloudinary.com/v1_1/${sign.cloudName}/${resourceType}/upload`,
        { method: 'POST', body: fd }
      );
      const asset = await cldRes.json();
      if (!cldRes.ok) throw new Error(asset.error?.message || 'Upload failed');

      const media = {
        publicId: asset.public_id,
        url: asset.secure_url,
        resourceType,
        width: asset.width,
        height: asset.height,
        format: asset.format,
        alt: value.alt || '',
      };
      onChange(media);
      // Record in the media library (best-effort).
      fetch('/api/media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(media),
      }).catch(() => {});
      toast('Media uploaded', 'success');
    } catch (err) {
      toast(err.message || 'Upload failed', 'error');
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  return (
    <div className="media-picker">
      <div className="media-picker__preview">
        {value?.url ? (
          value.resourceType === 'video' ? (
            <video src={value.url} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value.url} alt={value.alt || 'preview'} />
          )
        ) : (
          <div style={{ display: 'grid', placeItems: 'center', height: '100%', color: 'var(--grey-400)' }}>
            <Icon name="video" size={24} />
          </div>
        )}
      </div>
      <div style={{ flex: 1 }}>
        <input
          ref={fileRef}
          type="file"
          accept={resourceType === 'video' ? 'video/*' : 'image/*'}
          onChange={handleFile}
          hidden
        />
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <button
            type="button"
            className="admin-btn admin-btn--ghost admin-btn--sm"
            onClick={() => fileRef.current?.click()}
            disabled={busy}
          >
            {busy ? 'Uploading…' : value?.url ? 'Replace' : 'Upload'}
          </button>
          {value?.url && (
            <button
              type="button"
              className="admin-btn admin-btn--danger admin-btn--sm"
              onClick={() => onChange({})}
            >
              Remove
            </button>
          )}
        </div>
        <input
          className="admin-input"
          placeholder="Alt text (required for accessibility)"
          value={value?.alt || ''}
          onChange={(e) => onChange({ ...value, alt: e.target.value })}
        />
      </div>
    </div>
  );
}
