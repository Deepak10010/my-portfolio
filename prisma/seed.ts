import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed sample projects
  await prisma.project.upsert({
    where: { id: "seed-project-1" },
    update: {},
    create: {
      id: "seed-project-1",
      title: "My Portfolio",
      description: "Personal portfolio built with Next.js, Prisma, and shadcn/ui.",
      techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
      githubUrl: "https://github.com/deepakdodera/my-portfolio",
      featured: true,
    },
  });

  // Seed sample blog post
  await prisma.post.upsert({
    where: { slug: "hello-world" },
    update: {},
    create: {
      title: "Hello World",
      slug: "hello-world",
      excerpt: "My first blog post.",
      content: "<p>Welcome to my blog! This is the first post.</p>",
      published: true,
      publishedAt: new Date(),
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
