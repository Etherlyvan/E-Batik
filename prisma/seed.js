// prisma/seed.js
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create languages
  const languages = await Promise.all([
    prisma.language.upsert({
      where: { code: 'id' },
      update: {},
      create: {
        code: 'id',
        name: 'Indonesian',
        isDefault: true,
      },
    }),
    prisma.language.upsert({
      where: { code: 'en' },
      update: {},
      create: {
        code: 'en',
        name: 'English',
        isDefault: false,
      },
    }),
  ]);

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@batiksphere.com' },
    update: {},
    create: {
      email: 'admin@batiksphere.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log({ languages, adminUser });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });