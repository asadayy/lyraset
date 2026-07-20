'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import Logo from '@/components/Logo';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await signIn('credentials', { redirect: false, email, password });
    setLoading(false);
    if (res?.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      setError('Invalid email or password.');
    }
  }

  return (
    <main className="admin-login">
      <form className="admin-login__card" onSubmit={handleSubmit}>
        <div className="admin-login__brand">
          <Logo height={30} priority />
        </div>
        <h1 style={{ fontSize: '1.4rem', margin: '0 0 0.25rem' }}>Admin sign in</h1>
        <p style={{ color: 'var(--grey-500)', margin: '0 0 1.5rem', fontSize: '0.9rem' }}>
          Manage every piece of content on the site.
        </p>

        <div className="admin-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="admin-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </div>
        <div className="admin-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="admin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        {error && (
          <p className="form-error" role="alert" style={{ marginBottom: '1rem' }}>
            {error}
          </p>
        )}

        <button type="submit" className="admin-btn admin-btn--primary w-100" disabled={loading} style={{ justifyContent: 'center' }}>
          {loading ? 'Signing in…' : (<>Sign In <Icon name="arrow-right" size={16} /></>)}
        </button>
      </form>
    </main>
  );
}
