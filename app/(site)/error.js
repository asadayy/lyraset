'use client';

import Link from 'next/link';

/** Themed error boundary for the public site. */
export default function SiteError({ reset }) {
  return (
    <main
      className="section section--dark"
      style={{ minHeight: '70vh', display: 'grid', placeItems: 'center' }}
    >
      <div className="container-x text-center">
        <span className="eyebrow" style={{ justifyContent: 'center' }}>
          Something went wrong
        </span>
        <h1 className="display-xl" style={{ margin: '1rem 0' }}>
          A gremlin got in.
        </h1>
        <p className="lead-muted" style={{ maxWidth: '46ch', margin: '0 auto 2rem' }}>
          We hit an unexpected error. Try again, or head back home.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-lg" onClick={() => reset()}>
            Try Again
          </button>
          <Link href="/" className="btn btn-ghost btn-lg">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
