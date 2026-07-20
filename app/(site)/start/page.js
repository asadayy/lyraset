import { notFound } from 'next/navigation';
import { getPage, getSettings } from '@/lib/data';
import { buildMetadata } from '@/lib/metadata';
import SectionRenderer from '@/components/sections/SectionRenderer';

export const revalidate = 3600;

export async function generateMetadata() {
  const page = await getPage('start');
  return buildMetadata({ seo: page?.seo, path: '/start', fallbackTitle: "Glad You're Here" });
}

export default async function StartPage() {
  const [page, settings] = await Promise.all([getPage('start'), getSettings()]);
  if (!page) return notFound();
  return <SectionRenderer sections={page.sections} settings={settings} />;
}
