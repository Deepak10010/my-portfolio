export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function AdminDashboard() {
  const [projectCount, postCount, publishedCount] = await Promise.all([
    prisma.project.count(),
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
  ]);

  const stats = [
    { label: "Total Projects", value: projectCount, href: "/admin/projects" },
    { label: "Total Posts", value: postCount, href: "/admin/blog" },
    { label: "Published Posts", value: publishedCount, href: "/admin/blog" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back</p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <Card className="transition-shadow hover:shadow-sm">
              <CardHeader className="pb-1">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {s.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{s.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="flex gap-3">
        <Button asChild>
          <Link href="/admin/projects/new">+ New Project</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/admin/blog/new">+ New Post</Link>
        </Button>
      </div>
    </div>
  );
}
