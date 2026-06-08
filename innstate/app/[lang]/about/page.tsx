import { getDictionary } from "@/lib/i18n";
import { toLocale } from "@/lib/locales";
import Reveal from "@/components/Reveal";
import { Compass, Sparkles, Target, Globe2, HeartHandshake } from "lucide-react";

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = toLocale(rawLang);
  const dict = await getDictionary(lang);
  const a = dict.about;

  const blocks = [
    { icon: Compass, ...a.what },
    { icon: Sparkles, ...a.offer },
    { icon: Target, ...a.focus },
    { icon: Globe2, ...a.global },
    { icon: HeartHandshake, ...a.customer },
  ];

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">{a.title}</h1>
        <p className="mt-4 text-base leading-relaxed text-foreground/60 sm:text-lg">{a.intro}</p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2">
        {blocks.map((b, i) => (
          <Reveal key={b.title} delay={i * 0.07}>
            <div className="h-full rounded-3xl border border-gray-100 bg-white p-7 shadow-sm shadow-gray-200/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                <b.icon size={20} />
              </div>
              <h3 className="mt-4 font-display font-semibold text-lg text-foreground">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/60">{b.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
