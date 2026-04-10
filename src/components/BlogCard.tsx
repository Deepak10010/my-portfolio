import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import type { Post } from "@/types";

export default function BlogCard({ post }: { post: Post }) {
  return (
    <>
      <article className="group py-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h2 className="mb-1 font-semibold leading-tight transition-colors group-hover:text-muted-foreground">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            {post.excerpt && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {post.excerpt}
              </p>
            )}
          </div>
          {post.publishedAt && (
            <time
              dateTime={post.publishedAt}
              className="shrink-0 text-xs text-muted-foreground"
            >
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          )}
        </div>
      </article>
      <Separator />
    </>
  );
}
