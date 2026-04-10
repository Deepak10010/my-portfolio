export const dynamic = "force-dynamic";

import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import { prisma } from "@/lib/prisma";
import type { Project } from "@/types";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="mb-1 text-4xl font-bold">Projects</h1>
        <p className="mb-12 text-muted-foreground">Things I&apos;ve built</p>
        {projects.length === 0 ? (
          <p className="text-muted-foreground">No projects yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p as unknown as Project} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
