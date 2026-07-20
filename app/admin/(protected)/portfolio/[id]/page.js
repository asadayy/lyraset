import ResourceEditor from '@/components/admin/ResourceEditor';

export default async function EditCaseStudy({ params }) {
  const { id } = await params;
  return <ResourceEditor resourceKey="portfolio" id={id} />;
}
