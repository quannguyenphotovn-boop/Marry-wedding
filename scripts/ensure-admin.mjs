import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const email = process.env.ADMIN_SEED_EMAIL;
const password = process.env.ADMIN_SEED_PASSWORD;

if (!email || !password) {
  console.log("ADMIN_SEED_EMAIL/ADMIN_SEED_PASSWORD not set, skipping admin seed.");
  process.exit(0);
}

const prisma = new PrismaClient();

const existing = await prisma.adminUser.findUnique({ where: { email } });
if (existing) {
  console.log(`Admin user ${email} already exists, skipping.`);
} else {
  await prisma.adminUser.create({
    data: {
      email,
      name: "Quản trị viên MARRY WEDDING",
      passwordHash: await bcrypt.hash(password, 12),
    },
  });
  console.log(`Created admin user: ${email}`);
}

await prisma.$disconnect();
