import ResourceEditor from '@/components/admin/ResourceEditor';

export default async function EditCategory({ params }) {
  const { id } = await params;
  return <ResourceEditor resourceKey="categories" id={id} />;
}
