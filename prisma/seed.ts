import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      { name: "Fiction", slug: "fiction" },
      { name: "Self-Help", slug: "self-help" },
      { name: "Business", slug: "business" },
      { name: "Technology", slug: "technology" },
      { name: "Biography", slug: "biography" },
      { name: "Children", slug: "children" },
      { name: "Mystery", slug: "mystery" },
      { name: "Romance", slug: "romance" },
      { name: "History", slug: "history" },
      { name: "Science", slug: "science" },
    ],
    skipDuplicates: true,
  });

  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  const adminPasswordHash = process.env.SEED_ADMIN_PASSWORD_HASH;

  if (adminEmail && adminPasswordHash) {
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: {},
      create: {
        name: "BookWise Admin",
        email: adminEmail,
        passwordHash: adminPasswordHash,
        role: UserRole.ADMIN,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
