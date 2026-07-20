import Link from 'next/link';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <main className="section section--dark" style={{ minHeight: '100vh', display: 'grid', placeItems: 'center' }}>
      <div className="container-x text-center">
        <span className="eyebrow" style={{ justifyContent: 'center' }}>
          Error 404
        </span>
        <h1 className="display-hero" style={{ margin: '1rem 0' }}>
          Lost in space.
        </h1>
        <p className="lead-muted" style={{ maxWidth: '46ch', margin: '0 auto 2rem' }}>
          The page you&apos;re looking for drifted off the map. Let&apos;s get you back on course.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-primary btn-lg">
            Back to Home
          </Link>
          <Link href="/contact" className="btn btn-ghost btn-lg">
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
