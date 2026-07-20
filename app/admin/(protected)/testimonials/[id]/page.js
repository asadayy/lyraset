import ResourceEditor from '@/components/admin/ResourceEditor';

export default async function EditTestimonial({ params }) {
  const { id } = await params;
  return <ResourceEditor resourceKey="testimonials" id={id} />;
}
