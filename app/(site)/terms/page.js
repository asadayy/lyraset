import { notFound } from 'next/navigation';
import { getPage, getSettings } from '@/lib/data';
import { buildMetadata } from '@/lib/metadata';
import SectionRenderer from '@/components/sections/SectionRenderer';

export const revalidate = 3600;

export async function generateMetadata() {
  const page = await getPage('terms');
  return buildMetadata({ seo: page?.seo, path: '/terms', fallbackTitle: 'Terms of Service' });
}

export default async function TermsPage() {
  const [page, settings] = await Promise.all([getPage('terms'), getSettings()]);
  if (!page) return notFound();
  return <SectionRenderer sections={page.sections} settings={settings} />;
}
