import SiteHeader from '@/components/layout/SiteHeader';
import Footer from '@/components/layout/Footer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import Analytics from '@/components/Analytics';
import { getSettings, getServices } from '@/lib/data';

/**
 * Public site chrome (route group — no URL segment). Fetches Site Settings +
 * services once and shares them with the header, footer, and WhatsApp button.
 */
export default async function SiteLayout({ children }) {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader settings={settings} services={services} />
      <main id="main">{children}</main>
      <Footer settings={settings} services={services} />
      <FloatingWhatsApp number={settings?.whatsapp} template={settings?.whatsappTemplate} />
      <Analytics ga4Id={settings?.ga4Id} metaPixelId={settings?.metaPixelId} />
    </>
  );
}
