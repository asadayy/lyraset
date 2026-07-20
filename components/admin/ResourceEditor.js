'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RESOURCES } from '@/lib/admin/resources';
import { apiGet, apiCreate, apiUpdate } from '@/lib/admin/client';
import { useToast } from '@/components/admin/ToastProvider';
import ResourceForm from '@/components/admin/ResourceForm';
import Icon from '@/components/Icon';

/**
 * Create/edit screen for a content resource. `id === "new"` is create mode;
 * otherwise it loads the record, renders the schema form, and saves via the
 * admin API (which revalidates the affected public pages on success).
 */
export default function ResourceEditor({ resourceKey, id }) {
  const config = RESOURCES[resourceKey];
  const router = useRouter();
  const toast = useToast();
  const isNew = id === 'new';
  const [initial, setInitial] = useState(isNew ? config.defaults || {} : null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isNew) return;
    apiGet(config.resource, id).then((res) => {
      if (res.ok) setInitial(res.item);
      else {
        toast(res.error || 'Could not load', 'error');
        setInitial({});
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function handleSubmit(value) {
    setSubmitting(true);
    const res = isNew
      ? await apiCreate(config.resource, value)
      : await apiUpdate(config.resource, id, value);
    setSubmitting(false);
    if (res.ok) {
      toast('Saved', 'success');
      router.push(`/admin/${resourceKey}`);
      router.refresh();
    } else {
      toast(res.error || 'Save failed', 'error');
    }
  }

  return (
    <div>
      <Link href={`/admin/${resourceKey}`} className="admin-btn admin-btn--ghost admin-btn--sm" style={{ marginBottom: '1rem' }}>
        <Icon name="chevron-left" size={16} /> Back to {config.plural}
      </Link>
      <h2 style={{ margin: '0 0 1.25rem' }}>
        {isNew ? `New ${config.label}` : `Edit ${config.label}`}
      </h2>

      {initial === null ? (
        <div className="admin-panel">
          <div className="skeleton" style={{ height: 20, width: '40%', marginBottom: 16 }} />
          <div className="skeleton" style={{ height: 44, marginBottom: 12 }} />
          <div className="skeleton" style={{ height: 44, marginBottom: 12 }} />
          <div className="skeleton" style={{ height: 88 }} />
        </div>
      ) : (
        <ResourceForm
          schema={config.schema}
          initial={initial}
          onSubmit={handleSubmit}
          onCancel={() => router.push(`/admin/${resourceKey}`)}
          submitting={submitting}
        />
      )}
    </div>
  );
}
