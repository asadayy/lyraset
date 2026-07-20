'use client';

/**
 * Catastrophic (root layout) error boundary. Must render its own <html>/<body>.
 * Kept intentionally minimal and dependency-free.
 */
export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: '#0A1628',
          color: '#fff',
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <div>
          <h1 style={{ fontSize: '2rem', margin: '0 0 0.5rem' }}>Something went wrong</h1>
          <p style={{ opacity: 0.7, margin: '0 0 1.5rem' }}>
            We hit an unexpected error. Please try again.
          </p>
          <button
            onClick={() => reset()}
            style={{
              background: '#1B6FF2',
              color: '#fff',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '999px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
