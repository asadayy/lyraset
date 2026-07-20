/* eslint-disable no-console */
/**
 * Generate a bcrypt hash for an admin password.
 * Usage: node scripts/hash-password.js "your-strong-password"
 * Paste the output into ADMIN_PASSWORD_HASH in .env.
 */
const bcrypt = require('bcryptjs');

const pw = process.argv[2];
if (!pw) {
  console.error('Usage: node scripts/hash-password.js "your-password"');
  process.exit(1);
}

const hash = bcrypt.hashSync(pw, 12);
console.log('\nADMIN_PASSWORD_HASH=' + hash + '\n');
