import bcrypt from 'bcryptjs';
import { prisma } from '../utils/prisma';

async function main() {
  const email = process.env.INITIAL_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.INITIAL_ADMIN_PASSWORD;

  if (!email || !password || password.length < 16) {
    throw new Error('Set INITIAL_ADMIN_EMAIL and an INITIAL_ADMIN_PASSWORD of at least 16 characters.');
  }

  const existingAdmin = await prisma.user.findUnique({ where: { email } });
  if (existingAdmin) return;

  await prisma.user.create({
    data: {
      email,
      fullName: process.env.INITIAL_ADMIN_NAME?.trim() || 'Hospital Administrator',
      passwordHash: await bcrypt.hash(password, 12),
      role: 'ADMIN',
    },
  });

  console.log(`Initial administrator created for ${email}.`);
}

main()
  .catch((error: unknown) => {
    console.error('Initial administrator setup failed.', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });