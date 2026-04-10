export const dynamic = "force-dynamic";

import Navbar from "@/components/Navbar";
import BlogCard from "@/components/BlogCard";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";
import type { Post } from "@/types";

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-1 text-4xl font-bold">Blog</h1>
        <p className="mb-10 text-muted-foreground">
          Thoughts, tutorials, and musings
        </p>
        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet.</p>
        ) : (
          <>
            <Separator />
            {posts.map((p) => (
              <BlogCard key={p.id} post={p as unknown as Post} />
            ))}
          </>
        )}
      </main>
    </>
  );
}
