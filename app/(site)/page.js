import { notFound } from 'next/navigation';
import { getPage, getSettings } from '@/lib/data';
import SectionRenderer from '@/components/sections/SectionRenderer';
import { buildMetadata } from '@/lib/metadata';
import { OrganizationJsonLd } from '@/components/JsonLd';

export const revalidate = 3600;

export async function generateMetadata() {
  const page = await getPage('home');
  return buildMetadata({ seo: page?.seo, path: '/' });
}

export default async function HomePage() {
  const [page, settings] = await Promise.all([getPage('home'), getSettings()]);
  if (!page) return notFound();

  return (
    <>
      <OrganizationJsonLd />
      <SectionRenderer sections={page.sections} settings={settings} />
    </>
  );
}
