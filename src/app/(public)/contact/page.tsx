import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import { Separator } from "@/components/ui/separator";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-1 text-4xl font-bold">Contact</h1>
        <p className="mb-8 text-muted-foreground">
          Have a project in mind? I&apos;d love to hear from you.
        </p>
        <Separator className="mb-10" />
        <div className="max-w-md">
          <ContactForm />
        </div>
      </main>
    </>
  );
}
