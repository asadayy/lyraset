import { displayFont, bodyFont } from './fonts';
import '@/styles/globals.scss';
import '@/styles/animations.scss';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'LYRASET — International Marketing Agency',
    template: '%s · LYRASET',
  },
  description:
    'Where strategy meets creativity to drive growth, engagement, and real business results.',
};

export const viewport = {
  themeColor: '#0A1628',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>{children}</body>
    </html>
  );
}
