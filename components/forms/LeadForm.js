'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';
import '@/styles/forms.scss';

/**
 * Reusable lead-capture form → POST /api/leads. Used by the Work With Us band,
 * the contact page, and per-service audit/consultation cards. Includes a
 * honeypot field, inline validation feedback, an aria-live status region, and a
 * success state that morphs the submit button into a checkmark.
 *
 * @param {object} props
 * @param {string} props.source     - lead source tag (e.g. "contact", "service:seo")
 * @param {string} [props.serviceSlug]
 * @param {string} [props.formTitle]
 * @param {string} [props.buttonLabel]
 * @param {boolean} [props.splitName] - show first/last name instead of single name
 * @param {number} [props.rows]
 * @param {boolean} [props.dark]
 */
export default function LeadForm({
  source = 'contact',
  serviceSlug = '',
  formTitle = '',
  buttonLabel = 'Send Message',
  splitName = false,
  rows = 4,
  dark = false,
}) {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    name: '',
    email: '',
    message: '',
    company: '', // honeypot
  });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setErrors({});

    const name = splitName ? `${values.firstName} ${values.lastName}`.trim() : values.name.trim();
    const payload = {
      name,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      message: values.message,
      source,
      serviceSlug,
      formTitle,
      company: values.company,
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus('success');
      } else {
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
      <div className={`lead-form lead-form--success ${dark ? 'is-dark' : ''}`} role="status" aria-live="polite">
        <span className="lead-form__check">
          <Icon name="check" size={30} />
        </span>
        <h3>Message sent!</h3>
        <p>Thanks — we&apos;ll get back to you within one business day.</p>
      </div>
    );
  }

  return (
    <form className={`lead-form ${dark ? 'is-dark' : ''}`} onSubmit={handleSubmit} noValidate>
      {formTitle && <h3 className="lead-form__title">{formTitle}</h3>}

      {splitName ? (
        <div className="lead-form__row">
          <Field label="First name" name="firstName" value={values.firstName} onChange={set('firstName')} required />
          <Field label="Last name" name="lastName" value={values.lastName} onChange={set('lastName')} />
        </div>
      ) : (
        <Field
          label="Your name"
          name="name"
          value={values.name}
          onChange={set('name')}
          error={errors.name}
          required
        />
      )}

      <Field
        label="Email"
        name="email"
        type="email"
        value={values.email}
        onChange={set('email')}
        error={errors.email}
        placeholder="you@brand.com"
        required
      />

      <div className={`form-field ${errors.message ? 'has-error' : ''}`}>
        <label htmlFor={`${source}-message`}>Message</label>
        <textarea
          id={`${source}-message`}
          rows={rows}
          value={values.message}
          onChange={set('message')}
          placeholder="Tell us about your brand, your goals, and what you're looking for help with."
        />
        {errors.message && <span className="form-error">{errors.message}</span>}
      </div>

      {/* Honeypot — hidden from users, catches bots */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor={`${source}-company`}>Company</label>
        <input
          id={`${source}-company`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={set('company')}
        />
      </div>

      {errors.form && <p className="form-error form-error--summary">{errors.form}</p>}

      <button type="submit" className="btn btn-primary w-100" disabled={status === 'submitting'}>
        {status === 'submitting' ? (
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
        ) : (
          <>
            {buttonLabel}
            <span className="btn-arrow">
              <Icon name="arrow-right" size={16} />
            </span>
          </>
        )}
      </button>

      <p className="lead-form__consent">
        We&apos;ll never share your details. By submitting, you agree we may contact you about your
        project.
      </p>
    </form>
  );
}

function Field({ label, name, type = 'text', value, onChange, error, required, placeholder }) {
  return (
    <div className={`form-field ${error ? 'has-error' : ''}`}>
      <label htmlFor={`f-${name}`}>
        {label} {required && <span className="req">*</span>}
      </label>
      <input
        id={`f-${name}`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}
