import { getSettings } from '@/lib/data';
import { buildMetadata } from '@/lib/metadata';
import { whatsappLink } from '@/lib/utils';
import PageHero from '@/components/PageHero';
import LeadForm from '@/components/forms/LeadForm';
import ContactMap from '@/components/ContactMap';
import SectionHeader from '@/components/SectionHeader';
import Icon from '@/components/Icon';
import '@/styles/contact.scss';

export const revalidate = 3600;

export function generateMetadata() {
  return buildMetadata({
    path: '/contact',
    fallbackTitle: 'Contact',
    fallbackDescription:
      "Ready to grow your brand? Drop us a message on WhatsApp, send a quick brief, or email us directly. We respond fast, no fluff.",
  });
}

export default async function ContactPage() {
  const settings = await getSettings();
  const wa = settings?.whatsapp ? whatsappLink(settings.whatsapp, settings.whatsappTemplate) : null;
  const email = settings?.emails?.[0];
  const phone = settings?.phones?.[0];

  return (
    <>
      <PageHero
        eyebrow="Get In Touch"
        title="Ready to grow your brand?"
        subtitle="Drop us a message on WhatsApp, send a quick brief below, or email us directly. We respond fast, no fluff."
      >
        <div className="contact-hero__ctas">
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
              <Icon name="whatsapp" size={18} /> Message Us on WhatsApp
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="btn btn-ghost">
              <Icon name="mail" size={18} /> Send an Email
            </a>
          )}
        </div>
      </PageHero>

      <section className="section">
        <div className="container-x contact-grid">
          {/* Forms */}
          <div className="contact-forms">
            <div className="contact-card">
              <SectionHeader eyebrow="Quick Message" heading="Send us a note" />
              <p className="contact-card__hint">A quick hello or a question — we&apos;ll get right back to you.</p>
              <LeadForm source="contact" buttonLabel="Send Message" />
            </div>

            <div className="contact-card">
              <SectionHeader eyebrow="Detailed Brief" heading="Tell us everything" />
              <p className="contact-card__hint">Share your goals, timeline, and budget for a tailored proposal.</p>
              <LeadForm source="brief" buttonLabel="Send Brief" rows={7} />
            </div>
          </div>

          {/* Info + map */}
          <aside className="contact-info">
            <div className="contact-info__panel">
              <h3 className="contact-info__heading">Contact Info</h3>
              <p className="contact-info__reply">
                <Icon name="check" size={14} /> We reply within one business day
              </p>

              {phone && (
                <a className="contact-info__row" href={`tel:${phone.replace(/\s/g, '')}`}>
                  <span className="contact-info__icon"><Icon name="phone" size={18} /></span>
                  <span>
                    <span className="contact-info__label">Phone</span>
                    {phone}
                  </span>
                </a>
              )}
              {email && (
                <a className="contact-info__row" href={`mailto:${email}`}>
                  <span className="contact-info__icon"><Icon name="mail" size={18} /></span>
                  <span>
                    <span className="contact-info__label">Email</span>
                    {email}
                  </span>
                </a>
              )}

              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-wa contact-info__wa">
                  <Icon name="whatsapp" size={18} /> Message us on WhatsApp
                </a>
              )}

              <ContactMap offices={settings?.offices || []} />

              {(settings?.offices || []).length > 0 && (
                <div className="contact-info__offices">
                  {settings.offices.map((o) => {
                    const query = o.lat && o.lng ? `${o.lat},${o.lng}` : o.address;
                    const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
                    return (
                      <div className="contact-info__office" key={o.label}>
                        <span className="contact-info__icon"><Icon name="map-pin" size={18} /></span>
                        <span>
                          <span className="contact-info__label">{o.label}</span>
                          {o.address}
                          <a className="contact-info__directions" href={mapHref} target="_blank" rel="noopener noreferrer">
                            Get directions <Icon name="arrow-right" size={14} />
                          </a>
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {(settings?.socials || []).length > 0 && (
                <div className="contact-info__socials">
                  {settings.socials.map((s) => (
                    <a key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.platform}>
                      <Icon name={s.platform} size={18} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
