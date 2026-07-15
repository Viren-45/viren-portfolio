// src/app/(site)/contact/page.tsx
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <main
      className="min-h-screen flex flex-col justify-center px-8 md:px-20 py-32"
      style={{ backgroundColor: "#0D1117" }}
    >
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <ContactHero />
        <ContactForm />
      </div>
    </main>
  );
}
