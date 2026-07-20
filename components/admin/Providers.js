'use client';

import { SessionProvider } from 'next-auth/react';

/** Wraps the admin area so client components can use useSession/signOut. */
export default function Providers({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
