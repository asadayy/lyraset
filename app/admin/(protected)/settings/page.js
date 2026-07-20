import SingletonEditor from '@/components/admin/SingletonEditor';
import { SETTINGS_SCHEMA } from '@/lib/admin/singletons';

export default function AdminSettings() {
  return (
    <SingletonEditor
      resource="site-settings"
      schema={SETTINGS_SCHEMA}
      description="Brand, contact details, offices, socials, stats, announcement bar, footer, and analytics IDs — everything that appears in the site chrome."
    />
  );
}
