import ResourceEditor from '@/components/admin/ResourceEditor';

export default async function EditTeamMember({ params }) {
  const { id } = await params;
  return <ResourceEditor resourceKey="team" id={id} />;
}
