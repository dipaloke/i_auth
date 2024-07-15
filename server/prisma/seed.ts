import { prisma } from "../src/utils/db";
import bcrypt from "bcryptjs"

async function main() {
  const hashedPassword = await bcrypt.hash('password', 10);
  await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
