"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

function toSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "", slug: "", excerpt: "", content: "", published: false,
  });

  function handleField(name: string, value: string | boolean) {
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "title" && typeof value === "string") updated.slug = toSlug(value);
      return updated;
    });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    handleField(name, type === "checkbox" ? checked : value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      setError((await res.json()).error || "Failed to create");
      setLoading(false);
      return;
    }
    router.push("/admin/blog");
    router.refresh();
  }

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold">New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="title">Title *</Label>
          <Input id="title" name="title" required value={form.title} onChange={handleChange} placeholder="Post title" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="slug">Slug *</Label>
          <Input id="slug" name="slug" required value={form.slug} onChange={handleChange} placeholder="post-slug" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Input id="excerpt" name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Short summary shown in the blog list" />
        </div>
        <div className="space-y-1.5">
          <Label>Content *</Label>
          <RichTextEditor
            value={form.content}
            onChange={(html) => handleField("content", html)}
            placeholder="Write your post..."
          />
        </div>
        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" name="published" checked={form.published} onChange={handleChange} className="rounded border-border" />
          <span className="text-sm font-medium">Publish immediately</span>
        </label>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <div className="flex gap-3">
          <Button type="submit" disabled={loading}>{loading ? "Creating..." : "Create Post"}</Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
