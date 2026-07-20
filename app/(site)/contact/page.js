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
              <LeadForm source="contact" buttonLabel="Send Message" />
            </div>

            <div className="contact-card">
              <SectionHeader eyebrow="Detailed Brief" heading="Tell us everything" />
              <LeadForm source="brief" buttonLabel="Send Brief" rows={7} />
            </div>
          </div>

          {/* Info + map */}
          <aside className="contact-info">
            <h3 className="contact-info__heading">Contact Info</h3>
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
            {(settings?.offices || []).map((o) => (
              <div className="contact-info__row" key={o.label}>
                <span className="contact-info__icon"><Icon name="map-pin" size={18} /></span>
                <span>
                  <span className="contact-info__label">{o.label}</span>
                  {o.address}
                </span>
              </div>
            ))}

            <ContactMap offices={settings?.offices || []} />
          </aside>
        </div>
      </section>
    </>
  );
}
