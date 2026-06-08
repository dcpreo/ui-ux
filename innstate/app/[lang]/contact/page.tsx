import { getDictionary } from "@/lib/i18n";
import { toLocale } from "@/lib/locales";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { Mail } from "lucide-react";
import { contactEmail } from "@/lib/data";

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = toLocale(rawLang);
  const dict = await getDictionary(lang);
  const c = dict.contactPage;

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <Reveal className="text-center">
        <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">{c.title}</h1>
        <p className="mt-3 text-foreground/60">{c.subtitle}</p>
        <a
          href={`mailto:${contactEmail}`}
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent/80"
        >
          <Mail size={15} />
          {contactEmail}
        </a>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <ContactForm dict={c} />
      </Reveal>
    </section>
  );
}
