import Link from 'next/link';
import Icon from '@/components/Icon';
import '@/styles/footer.scss';

/**
 * Site footer — every string comes from Site Settings (CMS-editable): brand,
 * tagline, phones, emails, both offices, socials, and the credit line.
 * Server component (no interactivity).
 */
export default function Footer({ settings, services = [] }) {
  const brand = settings?.brandName || 'LYRASET';
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container-x">
        <div className="site-footer__grid">
          {/* Brand */}
          <div className="site-footer__brand">
            <Link href="/" className="brand">
              <span className="brand__mark" aria-hidden="true" />
              <span className="brand__name">{brand}</span>
            </Link>
            <p className="site-footer__tagline">{settings?.footerTagline || settings?.tagline}</p>
            <Link href="/contact" className="btn btn-primary">
              Work With Us <span className="btn-arrow"><Icon name="arrow-right" size={16} /></span>
            </Link>
            <div className="site-footer__socials">
              {(settings?.socials || []).map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.platform}
                >
                  <Icon name={s.platform} size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="site-footer__col">
            <h3 className="site-footer__heading">Company</h3>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/portfolio">Portfolio</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* What We Offer */}
          <div className="site-footer__col">
            <h3 className="site-footer__heading">What We Offer</h3>
            <ul>
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`}>{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="site-footer__col site-footer__contact">
            <h3 className="site-footer__heading">Contact</h3>
            {settings?.phones?.[0] && (
              <a className="site-footer__line" href={`tel:${settings.phones[0].replace(/\s/g, '')}`}>
                <Icon name="phone" size={16} /> {settings.phones[0]}
              </a>
            )}
            {settings?.emails?.[0] && (
              <a className="site-footer__line" href={`mailto:${settings.emails[0]}`}>
                <Icon name="mail" size={16} /> {settings.emails[0]}
              </a>
            )}
            {(settings?.offices || []).map((o) => (
              <div className="site-footer__office" key={o.label}>
                <Icon name="map-pin" size={16} />
                <span>
                  <strong>{o.label}</strong>
                  <br />
                  {o.address}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>
            © {year} {brand}. All rights reserved.
          </p>
          <div className="site-footer__bottom-links">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            {settings?.footerCredit && <span className="site-footer__credit">{settings.footerCredit}</span>}
          </div>
        </div>
      </div>
    </footer>
  );
}
