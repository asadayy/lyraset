import { notFound } from 'next/navigation';
import { getPage, getSettings } from '@/lib/data';
import { buildMetadata } from '@/lib/metadata';
import SectionRenderer from '@/components/sections/SectionRenderer';

export const revalidate = 3600;

export async function generateMetadata() {
  const page = await getPage('privacy');
  return buildMetadata({ seo: page?.seo, path: '/privacy', fallbackTitle: 'Privacy Policy' });
}

export default async function PrivacyPage() {
  const [page, settings] = await Promise.all([getPage('privacy'), getSettings()]);
  if (!page) return notFound();
  return <SectionRenderer sections={page.sections} settings={settings} />;
}
