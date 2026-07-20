import { notFound } from 'next/navigation';
import { getPage, getSettings } from '@/lib/data';
import { buildMetadata } from '@/lib/metadata';
import SectionRenderer from '@/components/sections/SectionRenderer';

export const revalidate = 3600;

export async function generateMetadata() {
  const page = await getPage('about');
  return buildMetadata({ seo: page?.seo, path: '/about', fallbackTitle: 'About' });
}

export default async function AboutPage() {
  const [page, settings] = await Promise.all([getPage('about'), getSettings()]);
  if (!page) return notFound();
  return <SectionRenderer sections={page.sections} settings={settings} />;
}
