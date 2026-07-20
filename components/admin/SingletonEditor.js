'use client';

import { useEffect, useState } from 'react';
import { apiGetSingleton, apiPutSingleton } from '@/lib/admin/client';
import { useToast } from '@/components/admin/ToastProvider';
import ResourceForm from '@/components/admin/ResourceForm';

/**
 * Editor for a singleton document (Site Settings / SEO defaults). Loads the
 * record, renders the schema form, and PUTs on save (revalidating all pages).
 */
export default function SingletonEditor({ resource, schema, description }) {
  const toast = useToast();
  const [initial, setInitial] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    apiGetSingleton(resource).then((res) => setInitial(res.item || {}));
  }, [resource]);

  async function handleSubmit(value) {
    setSubmitting(true);
    const res = await apiPutSingleton(resource, value);
    setSubmitting(false);
    if (res.ok) toast('Saved — public pages will update shortly', 'success');
    else toast(res.error || 'Save failed', 'error');
  }

  if (initial === null) {
    return (
      <div className="admin-panel">
        <div className="skeleton" style={{ height: 44, marginBottom: 12 }} />
        <div className="skeleton" style={{ height: 44, marginBottom: 12 }} />
        <div className="skeleton" style={{ height: 88 }} />
      </div>
    );
  }

  return (
    <div>
      {description && <p style={{ color: 'var(--grey-500)', marginTop: 0 }}>{description}</p>}
      <ResourceForm schema={schema} initial={initial} onSubmit={handleSubmit} submitting={submitting} />
    </div>
  );
}
