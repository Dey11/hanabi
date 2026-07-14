/**
 * Hash a password for ADMIN_PASSWORD_HASH or a client portal password.
 *
 *   bun run scripts/hash-password.ts "my-secret-password"
 */
import bcrypt from "bcryptjs";

const input = process.argv[2];
if (!input) {
  console.error('Usage: bun run scripts/hash-password.ts "<password>"');
  process.exit(1);
}

const hash = await bcrypt.hash(input, 12);
console.log(hash);
