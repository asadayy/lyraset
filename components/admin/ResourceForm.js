'use client';

import { useState } from 'react';
import FieldRenderer from '@/components/admin/FieldRenderer';
import Icon from '@/components/Icon';

/**
 * Renders an editor form from a field schema. Fields flow in a two-column grid;
 * `full` fields span the row. State is owned here and lifted on submit.
 */
export default function ResourceForm({ schema, initial = {}, onSubmit, onCancel, submitting }) {
  const [value, setValue] = useState(initial);
  const set = (name, v) => setValue((prev) => ({ ...prev, [name]: v }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
      }}
    >
      <div className="admin-panel">
        <div className="admin-grid-2">
          {schema.map((field) => (
            <FieldRenderer
              key={field.name}
              field={field}
              value={value[field.name]}
              onChange={(v) => set(field.name, v)}
            />
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', position: 'sticky', bottom: 0 }}>
        <button type="submit" className="admin-btn admin-btn--primary" disabled={submitting}>
          {submitting ? 'Saving…' : (<>Save <Icon name="check" size={16} /></>)}
        </button>
        {onCancel && (
          <button type="button" className="admin-btn admin-btn--ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
