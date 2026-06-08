import { getDictionary } from "@/lib/i18n";
import { toLocale } from "@/lib/locales";
import { deals } from "@/lib/data";
import DealCard from "@/components/DealCard";
import Reveal from "@/components/Reveal";

export default async function DealsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = toLocale(rawLang);
  const dict = await getDictionary(lang);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">{dict.dealsPage.title}</h1>
        <p className="mt-3 text-foreground/60">{dict.dealsPage.subtitle}</p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {deals.map((deal, i) => (
          <Reveal key={deal.slug} delay={i * 0.06}>
            <DealCard deal={deal} lang={lang} ctaLabel={dict.deals.request} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
