import { withAuth } from 'next-auth/middleware';

/**
 * Protect the admin area. Unauthenticated visitors to any /admin route (except
 * the login page) are redirected to /admin/login. Mutating API routes are
 * additionally guarded server-side via requireAdmin() in each handler.
 */
export default withAuth({
  pages: { signIn: '/admin/login' },
  callbacks: {
    authorized: ({ token }) => token?.role === 'admin',
  },
});

export const config = {
  // Match every /admin route except the login page itself.
  matcher: ['/admin', '/admin/((?!login$).+)'],
};
