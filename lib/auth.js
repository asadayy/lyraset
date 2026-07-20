import CredentialsProvider from 'next-auth/providers/credentials';
import { getServerSession } from 'next-auth';
import bcrypt from 'bcryptjs';
import { isDbConfigured, connectToDatabase } from '@/lib/db';

/**
 * NextAuth (Credentials) configuration.
 *
 * The admin identity comes from environment variables (ADMIN_EMAIL +
 * ADMIN_PASSWORD_HASH, a bcrypt hash) so authentication works even before a
 * database is provisioned. When a DB is configured, an AdminUser document with
 * a matching email takes precedence, allowing password rotation from data.
 *
 * @type {import('next-auth').AuthOptions}
 */
export const authOptions = {
  session: { strategy: 'jwt', maxAge: 60 * 60 * 8 }, // 8h
  providers: [
    CredentialsProvider({
      name: 'Admin',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = (credentials?.email || '').trim().toLowerCase();
        const password = credentials?.password || '';
        if (!email || !password) return null;

        // Prefer a DB-backed admin user when available.
        if (isDbConfigured()) {
          try {
            await connectToDatabase();
            const { default: AdminUser } = await import('@/models/AdminUser');
            const user = await AdminUser.findOne({ email }).lean();
            if (user?.passwordHash) {
              const ok = await bcrypt.compare(password, user.passwordHash);
              if (ok) return { id: String(user._id), email: user.email, name: user.name || 'Admin' };
              return null;
            }
          } catch {
            // Fall through to env-based auth if the DB lookup fails.
          }
        }

        // Env-based fallback.
        const envEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
        const envHash = process.env.ADMIN_PASSWORD_HASH || '';
        if (envEmail && envHash && email === envEmail) {
          const ok = await bcrypt.compare(password, envHash);
          if (ok) return { id: 'env-admin', email: envEmail, name: 'Admin' };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = 'admin';
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role || 'admin';
        session.user.email = token.email;
      }
      return session;
    },
  },
  // In production NEXTAUTH_SECRET must be set. A dev-only fallback keeps
  // `npm run dev` working out of the box without leaking a usable prod secret.
  secret:
    process.env.NEXTAUTH_SECRET ||
    (process.env.NODE_ENV !== 'production' ? 'lyraset-dev-only-secret-change-me' : undefined),
  pages: { signIn: '/admin/login', error: '/admin/login' },
};

/**
 * Assert an authenticated admin session for a route handler.
 * @returns {Promise<{ ok: true, session: object } | { ok: false }>}
 */
export async function requireAdmin() {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role === 'admin') return { ok: true, session };
  } catch {
    // No/invalid session config (e.g. missing NEXTAUTH_SECRET) → treat as
    // unauthorized rather than a 500.
  }
  return { ok: false };
}
