import Providers from '@/components/admin/Providers';
import ToastProvider from '@/components/admin/ToastProvider';
import '@/styles/admin.scss';

export const metadata = {
  title: 'Admin · LYRASET',
  robots: { index: false, follow: false },
};

/** Root admin layout — auth session context + toast notifications. */
export default function AdminRootLayout({ children }) {
  return (
    <Providers>
      <ToastProvider>{children}</ToastProvider>
    </Providers>
  );
}
