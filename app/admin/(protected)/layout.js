import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { isDbConfigured } from '@/lib/db';
import AdminShell from '@/components/admin/AdminShell';

/**
 * Protected admin layout (route group — no URL segment). Middleware already
 * gates /admin/** ; we additionally read the session here to personalize the
 * shell and surface whether a database is connected.
 */
export default async function ProtectedAdminLayout({ children }) {
  let session = null;
  try {
    session = await getServerSession(authOptions);
  } catch {
    // ignore — middleware handles redirects
  }

  return (
    <AdminShell dbConfigured={isDbConfigured()} userEmail={session?.user?.email}>
      {children}
    </AdminShell>
  );
}
