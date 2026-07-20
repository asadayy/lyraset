import ResourceEditor from '@/components/admin/ResourceEditor';

export default async function EditService({ params }) {
  const { id } = await params;
  return <ResourceEditor resourceKey="services" id={id} />;
}
