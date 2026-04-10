"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[360px] rounded-lg border border-border bg-muted/30 animate-pulse" />
  ),
});

export default function EditPostPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", content: "", published: false, publishedAt: "",
  });

  useEffect(() => {
    fetch(`/api/blog/${id}`).then((r) => r.json()).then((data) => {
      setForm({
        title: data.title ?? "",
        slug: data.slug ?? "",
        excerpt: data.excerpt ?? "",
        content: data.content ?? "",
        published: data.published ?? false,
        publishedAt: data.publishedAt ?? "",
      });
      setFetching(false);
    });
  }, [id]);

  function handleField(name: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    handleField(name, type === "checkbox" ? checked : value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch(`/api/blog/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      setError((await res.json()).error || "Failed to update");
      setLoading(false);
      return;
    }
    router.push("/admin/blog");
    router.refresh();
  }

  if (fetching) return <p className="text-sm text-muted-foreground">Loading...</p>;

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="title">Title *</Label>
          <Input id="title" name="title" required value={form.title} onChange={handleChange} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="slug">Slug *</Label>
          <Input id="slug" name="slug" required value={form.slug} onChange={handleChange} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Input id="excerpt" name="excerpt" value={form.excerpt} onChange={handleChange} />
        </div>
        <div className="space-y-1.5">
          <Label>Content *</Label>
          <RichTextEditor
            value={form.content}
            onChange={(html) => handleField("content", html)}
          />
        </div>
        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" name="published" checked={form.published} onChange={handleChange} className="rounded border-border" />
          <span className="text-sm font-medium">Published</span>
        </label>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <div className="flex gap-3">
          <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Changes"}</Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
