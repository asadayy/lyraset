import PageEditor from '@/components/admin/PageEditor';

export default async function EditPage({ params }) {
  const { id } = await params;
  return <PageEditor id={id} />;
}
