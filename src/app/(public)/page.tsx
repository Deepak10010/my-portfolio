export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import type { Project } from "@/types";

export default async function HomePage() {
  const featured = await prisma.project.findMany({
    where: { featured: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-6">
        {/* Hero */}
        <section className="grid items-center gap-12 py-24 md:grid-cols-[1fr_auto] md:py-32">
          <div>
            <p className="mb-3 text-sm text-muted-foreground">Hi, I&apos;m</p>
            <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl">
              Deepak Doddera
            </h1>
            <p className="mb-8 max-w-xl text-xl text-muted-foreground">
              A software developer building things for the web.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/projects">View Projects</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto h-48 w-48 overflow-hidden rounded-full border-4 border-border shadow-lg md:h-64 md:w-64">
            <Image
              src="/profile.jpg"
              alt="Deepak Doddera"
              fill
              priority
              sizes="(max-width: 768px) 192px, 256px"
              className="object-cover"
            />
          </div>
        </section>

        {/* Featured projects */}
        {featured.length > 0 && (
          <section className="pb-24">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Featured Projects</h2>
              <Button asChild variant="ghost" size="sm">
                <Link href="/projects">View all →</Link>
              </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((p) => (
                <ProjectCard key={p.id} project={p as unknown as Project} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
