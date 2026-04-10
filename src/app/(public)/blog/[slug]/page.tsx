export const dynamic = "force-dynamic";

import Navbar from "@/components/Navbar";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug, published: true },
  });

  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <article>
          <header className="mb-10">
            <h1 className="mb-3 text-4xl font-bold tracking-tight">
              {post.title}
            </h1>
            {post.publishedAt && (
              <time
                dateTime={post.publishedAt.toISOString()}
                className="text-sm text-muted-foreground"
              >
                {post.publishedAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
          </header>
          <div
            className="rich-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  );
}
