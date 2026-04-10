"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/ImageUpload";

export default function EditProjectPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: "", description: "", techStack: "",
    githubUrl: "", liveUrl: "", imageUrl: "", featured: false,
  });

  useEffect(() => {
    fetch(`/api/projects/${id}`).then((r) => r.json()).then((data) => {
      setForm({
        title: data.title ?? "",
        description: data.description ?? "",
        techStack: (data.techStack ?? []).join(", "),
        githubUrl: data.githubUrl ?? "",
        liveUrl: data.liveUrl ?? "",
        imageUrl: data.imageUrl ?? "",
        featured: data.featured ?? false,
      });
      setFetching(false);
    });
  }, [id]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch(`/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        techStack: form.techStack.split(",").map((t) => t.trim()).filter(Boolean),
      }),
    });

    if (!res.ok) {
      setError((await res.json()).error || "Failed to update");
      setLoading(false);
      return;
    }
    router.push("/admin/projects");
    router.refresh();
  }

  if (fetching) return <p className="text-sm text-muted-foreground">Loading...</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">Edit Project</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="title">Title *</Label>
          <Input id="title" name="title" required value={form.title} onChange={handleChange} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="description">Description *</Label>
          <Textarea id="description" name="description" required rows={3} value={form.description} onChange={handleChange} className="resize-none" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="techStack">Tech Stack (comma-separated)</Label>
          <Input id="techStack" name="techStack" value={form.techStack} onChange={handleChange} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="githubUrl">GitHub URL</Label>
          <Input id="githubUrl" name="githubUrl" type="url" value={form.githubUrl} onChange={handleChange} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="liveUrl">Live URL</Label>
          <Input id="liveUrl" name="liveUrl" type="url" value={form.liveUrl} onChange={handleChange} />
        </div>
        <div className="space-y-1.5">
          <Label>Project Image</Label>
          <ImageUpload
            value={form.imageUrl}
            onChange={(url) => setForm((prev) => ({ ...prev, imageUrl: url }))}
          />
        </div>
        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="rounded border-border" />
          <span className="text-sm font-medium">Featured project</span>
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
