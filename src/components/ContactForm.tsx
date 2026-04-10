"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send");
      }
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err: any) {
      setError(err.message);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border bg-card p-8 text-center">
        <p className="font-semibold">Message sent!</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Thanks for reaching out — I'll get back to you soon.
        </p>
        <Button
          variant="link"
          size="sm"
          className="mt-2 text-muted-foreground"
          onClick={() => setStatus("idle")}
        >
          Send another →
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="your@email.com"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="What's on your mind?"
          className="resize-none"
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-destructive">{error}</p>
      )}
      <Button type="submit" disabled={status === "loading"} className="w-full">
        {status === "loading" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
