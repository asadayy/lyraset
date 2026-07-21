/* eslint-disable no-console */
/**
 * Create or rotate the admin user directly in MongoDB.
 *
 * Authentication is DB-only (see lib/auth.js) — the admin identity lives in the
 * AdminUser collection, not in environment variables. Use this to provision the
 * first admin or to change the password later, without re-running the full
 * content seed.
 *
 * Usage:
 *   npm run create-admin -- <email> <password>
 *   node --env-file=.env scripts/create-admin.mjs <email> <password>
 *
 * If args are omitted it falls back to ADMIN_EMAIL / ADMIN_PASSWORD env vars.
 * The password is stored only as a bcrypt hash.
 */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import AdminUser from '../models/AdminUser.js';

async function main() {
  const email = (process.argv[2] || process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const password = process.argv[3] || process.env.ADMIN_PASSWORD || '';

  if (!email || !password) {
    console.error('Usage: npm run create-admin -- <email> <password>');
    process.exit(1);
  }
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('✖ MONGODB_URI is not set. Add it to .env (or the environment) first.');
    process.exit(1);
  }

  console.log('→ Connecting to MongoDB…');
  await mongoose.connect(uri);

  const passwordHash = bcrypt.hashSync(password, 12);
  const user = await AdminUser.findOneAndUpdate(
    { email },
    { email, name: 'Admin', passwordHash, role: 'admin' },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log(`✔ Admin ready: ${user.email} (role: ${user.role})`);
  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error('✖ Failed:', err.message);
  process.exit(1);
});
