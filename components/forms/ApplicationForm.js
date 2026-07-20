'use client';

import { useRef, useState } from 'react';
import Icon from '@/components/Icon';
import '@/styles/forms.scss';

/**
 * Job application form → POST /api/applications. The CV uploads directly to
 * Cloudinary via a server-signed request (purpose: "cv"), so large files never
 * pass through our serverless function. Honeypot + inline validation + success
 * state included. If Cloudinary isn't configured the CV field degrades
 * gracefully (optional) and the rest still submits.
 *
 * @param {{ roles?: string[], defaultRole?: string, jobSlug?: string }} props
 */
export default function ApplicationForm({ roles = [], defaultRole = '', jobSlug = '' }) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    role: defaultRole || roles[0] || '',
    portfolioUrl: '',
    pitch: '',
    company: '',
  });
  const [cv, setCv] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const fileRef = useRef(null);

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setErrors((x) => ({ ...x, cv: 'CV must be under 5MB.' }));
      return;
    }
    setErrors((x) => ({ ...x, cv: undefined }));
    setUploading(true);
    try {
      // 1) Get a signed upload request from the server.
      const signRes = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ purpose: 'cv', resourceType: 'raw', bytes: file.size }),
      });
      const sign = await signRes.json();
      if (!signRes.ok || !sign.ok) throw new Error(sign.error || 'Upload unavailable');

      // 2) Upload directly to Cloudinary.
      const fd = new FormData();
      fd.append('file', file);
      fd.append('api_key', sign.apiKey);
      fd.append('timestamp', sign.timestamp);
      fd.append('signature', sign.signature);
      fd.append('folder', sign.folder);
      const cldRes = await fetch(
        `https://api.cloudinary.com/v1_1/${sign.cloudName}/raw/upload`,
        { method: 'POST', body: fd }
      );
      const asset = await cldRes.json();
      if (!cldRes.ok) throw new Error('Upload failed');

      setCv({
        url: asset.secure_url,
        publicId: asset.public_id,
        format: asset.format || file.name.split('.').pop(),
        bytes: asset.bytes || file.size,
      });
    } catch (err) {
      setErrors((x) => ({ ...x, cv: err.message || 'Could not upload CV.' }));
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setErrors({});
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, jobSlug, cv: cv || undefined }),
      });
      const data = await res.json();
      if (res.ok && data.ok) setStatus('success');
      else {
        setErrors(data.errors || { form: data.error || 'Something went wrong.' });
        setStatus('error');
      }
    } catch {
      setErrors({ form: 'Network error. Please try again.' });
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="lead-form lead-form--success" role="status" aria-live="polite">
        <span className="lead-form__check">
          <Icon name="check" size={30} />
        </span>
        <h3>Application received!</h3>
        <p>Thanks for applying — we&apos;ll get back to you within five business days.</p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="app-name">Your name <span className="req">*</span></label>
        <input id="app-name" value={values.name} onChange={set('name')} required />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="app-email">Email <span className="req">*</span></label>
        <input id="app-email" type="email" value={values.email} onChange={set('email')} placeholder="you@brand.com" required />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="app-role">Role you&apos;re applying for <span className="req">*</span></label>
        {roles.length > 0 ? (
          <select id="app-role" value={values.role} onChange={set('role')} required>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        ) : (
          <input id="app-role" value={values.role} onChange={set('role')} required />
        )}
        {errors.role && <span className="form-error">{errors.role}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="app-portfolio">Portfolio / LinkedIn (optional)</label>
        <input id="app-portfolio" value={values.portfolioUrl} onChange={set('portfolioUrl')} placeholder="https://linkedin.com/in/you" />
        {errors.portfolioUrl && <span className="form-error">{errors.portfolioUrl}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="app-cv">CV / Résumé (PDF, optional)</label>
        <input id="app-cv" ref={fileRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFile} />
        {uploading && <span className="form-hint">Uploading…</span>}
        {cv && (
          <span className="form-hint form-hint--ok">
            <Icon name="check" size={14} /> CV attached
          </span>
        )}
        {errors.cv && <span className="form-error">{errors.cv}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="app-pitch">Why you, why us? <span className="req">*</span></label>
        <textarea
          id="app-pitch"
          rows={5}
          value={values.pitch}
          onChange={set('pitch')}
          placeholder="A short pitch — what you've done, what excites you about this role, and a link to work you're proud of."
          required
        />
        {errors.pitch && <span className="form-error">{errors.pitch}</span>}
      </div>

      <div className="hp-field" aria-hidden="true">
        <label htmlFor="app-company">Company</label>
        <input id="app-company" tabIndex={-1} autoComplete="off" value={values.company} onChange={set('company')} />
      </div>

      {errors.form && <p className="form-error form-error--summary">{errors.form}</p>}

      <button type="submit" className="btn btn-primary w-100" disabled={status === 'submitting' || uploading}>
        {status === 'submitting' ? (
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
        ) : (
          <>
            Send Application <span className="btn-arrow"><Icon name="arrow-right" size={16} /></span>
          </>
        )}
      </button>

      <p className="lead-form__consent">
        By submitting, you agree we may contact you about this role. We never share your details with
        third parties.
      </p>
    </form>
  );
}
