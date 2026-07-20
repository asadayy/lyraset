import ResourceEditor from '@/components/admin/ResourceEditor';

export default async function EditJob({ params }) {
  const { id } = await params;
  return <ResourceEditor resourceKey="careers" id={id} />;
}
