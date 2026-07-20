'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiGet, apiUpdate } from '@/lib/admin/client';
import { useToast } from '@/components/admin/ToastProvider';
import FieldRenderer from '@/components/admin/FieldRenderer';
import { SECTION_SCHEMAS, SECTION_TYPE_OPTIONS } from '@/lib/admin/sectionSchemas';
import Icon from '@/components/Icon';

/**
 * Pages & Sections editor. A page is an ordered list of section records; here
 * the admin edits any field of any section, toggles visibility, reorders via
 * drag-and-drop, and adds new section instances — no code changes required.
 */
export default function PageEditor({ id }) {
  const router = useRouter();
  const toast = useToast();
  const [page, setPage] = useState(null);
  const [openIdx, setOpenIdx] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [addType, setAddType] = useState('richText');
  const dragFrom = useRef(null);
  const [dragOver, setDragOver] = useState(null);

  useEffect(() => {
    apiGet('pages', id).then((res) => {
      if (res.ok) setPage(res.item);
      else {
        toast(res.error || 'Could not load page', 'error');
        setPage({ sections: [] });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const sections = page?.sections || [];
  const setSections = (next) => setPage((p) => ({ ...p, sections: next }));

  const updateData = (i, name, val) =>
    setSections(sections.map((s, j) => (j === i ? { ...s, data: { ...s.data, [name]: val } } : s)));
  const setField = (i, key, val) =>
    setSections(sections.map((s, j) => (j === i ? { ...s, [key]: val } : s)));
  const remove = (i) => {
    if (!window.confirm('Remove this section?')) return;
    setSections(sections.filter((_, j) => j !== i));
  };
  const add = () => {
    const label = SECTION_SCHEMAS[addType]?.label || addType;
    setSections([...sections, { type: addType, label, visible: true, data: {} }]);
    setOpenIdx(sections.length);
  };

  function onDrop(target) {
    const from = dragFrom.current;
    setDragOver(null);
    if (from == null || from === target) return;
    const next = [...sections];
    const [moved] = next.splice(from, 1);
    next.splice(target, 0, moved);
    setSections(next);
    dragFrom.current = null;
  }

  async function save() {
    setSubmitting(true);
    const payload = { ...page, sections: sections.map((s, i) => ({ ...s, order: i })) };
    const res = await apiUpdate('pages', id, payload);
    setSubmitting(false);
    if (res.ok) toast('Page saved — public site updating', 'success');
    else toast(res.error || 'Save failed', 'error');
  }

  if (page === null) {
    return (
      <div className="admin-panel">
        <div className="skeleton" style={{ height: 40, marginBottom: 12 }} />
        <div className="skeleton" style={{ height: 40, marginBottom: 12 }} />
      </div>
    );
  }

  return (
    <div>
      <Link href="/admin/pages" className="admin-btn admin-btn--ghost admin-btn--sm" style={{ marginBottom: '1rem' }}>
        <Icon name="chevron-left" size={16} /> Back to Pages
      </Link>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ margin: 0 }}>
          Edit page: <span style={{ color: 'var(--blue-600)' }}>/{page.slug}</span>
        </h2>
        <button className="admin-btn admin-btn--primary" onClick={save} disabled={submitting}>
          {submitting ? 'Saving…' : 'Save page'}
        </button>
      </div>

      <div className="section-editor">
        {sections.map((section, i) => {
          const schema = SECTION_SCHEMAS[section.type];
          const isOpen = openIdx === i;
          return (
            <div
              key={i}
              className={`section-editor__item ${dragOver === i ? 'is-dragging' : ''}`}
              draggable
              onDragStart={() => (dragFrom.current = i)}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(i);
              }}
              onDrop={() => onDrop(i)}
            >
              <div className="section-editor__head">
                <span className="section-editor__grip" title="Drag to reorder">
                  <Icon name="menu" size={18} />
                </span>
                <span className="section-editor__type" onClick={() => setOpenIdx(isOpen ? null : i)} style={{ cursor: 'pointer', flex: 1 }}>
                  {schema?.label || section.type}
                  {section.label && section.label !== schema?.label && (
                    <span className="section-editor__badge" style={{ marginLeft: 8 }}>{section.label}</span>
                  )}
                </span>
                <label className="admin-switch" style={{ marginRight: 8 }}>
                  <input type="checkbox" checked={section.visible !== false} onChange={(e) => setField(i, 'visible', e.target.checked)} />
                  <span style={{ fontSize: '0.78rem' }}>{section.visible !== false ? 'Visible' : 'Hidden'}</span>
                </label>
                <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => setOpenIdx(isOpen ? null : i)}>
                  <Icon name={isOpen ? 'chevron-down' : 'chevron-right'} size={16} />
                </button>
                <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => remove(i)}>
                  <Icon name="close" size={14} />
                </button>
              </div>

              {isOpen && (
                <div className="section-editor__body">
                  {schema?.note && <p className="admin-field__hint" style={{ marginTop: '0.75rem' }}>{schema.note}</p>}
                  <div className="admin-grid-2" style={{ marginTop: '0.75rem' }}>
                    {(schema?.fields || []).map((field) => (
                      <FieldRenderer
                        key={field.name}
                        field={field}
                        value={section.data?.[field.name]}
                        onChange={(v) => updateData(i, field.name, v)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="admin-panel" style={{ marginTop: '1rem' }}>
        <div className="admin-panel__title">Add a section</div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <select className="admin-select" value={addType} onChange={(e) => setAddType(e.target.value)} style={{ maxWidth: 260 }}>
            {SECTION_TYPE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <button className="admin-btn admin-btn--ghost" onClick={add}>
            <Icon name="arrow-down" size={16} /> Add section
          </button>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <button className="admin-btn admin-btn--primary" onClick={save} disabled={submitting}>
          {submitting ? 'Saving…' : 'Save page'}
        </button>
      </div>
    </div>
  );
}
