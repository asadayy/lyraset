import SingletonEditor from '@/components/admin/SingletonEditor';
import { SEO_SCHEMA } from '@/lib/admin/singletons';

export default function AdminSeo() {
  return (
    <SingletonEditor
      resource="seo"
      schema={SEO_SCHEMA}
      description="Global SEO defaults and Organization structured-data. Per-page overrides live on each service, case study, and job."
    />
  );
}
