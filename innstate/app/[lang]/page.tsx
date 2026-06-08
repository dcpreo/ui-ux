import { getDictionary } from "@/lib/i18n";
import { toLocale } from "@/lib/locales";
import { destinations, deals } from "@/lib/data";
import Hero from "@/components/Hero";
import DestinationCard from "@/components/DestinationCard";
import DealCard from "@/components/DealCard";
import WhySection from "@/components/WhySection";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import CtaSection from "@/components/CtaSection";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = toLocale(rawLang);
  const dict = await getDictionary(lang);

  return (
    <>
      <Hero lang={lang} dict={dict.hero} />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{dict.destinations.title}</h2>
            <p className="mt-2 text-foreground/60">{dict.destinations.subtitle}</p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.slice(0, 6).map((d, i) => (
            <Reveal key={d.slug} delay={i * 0.06}>
              <DestinationCard destination={d} lang={lang} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{dict.deals.title}</h2>
            <p className="mt-2 text-foreground/60">{dict.deals.subtitle}</p>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {deals.slice(0, 3).map((deal, i) => (
              <Reveal key={deal.slug} delay={i * 0.08}>
                <DealCard deal={deal} lang={lang} ctaLabel={dict.deals.request} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <Reveal className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4">
          <div>
            <Counter to={120} suffix="+" />
            <p className="mt-2 text-sm text-foreground/60">Destinations</p>
          </div>
          <div>
            <Counter to={2500} suffix="+" />
            <p className="mt-2 text-sm text-foreground/60">Hotel Partners</p>
          </div>
          <div>
            <Counter to={18000} suffix="+" />
            <p className="mt-2 text-sm text-foreground/60">Inquiries Sent</p>
          </div>
          <div>
            <Counter to={98} suffix="%" />
            <p className="mt-2 text-sm text-foreground/60">Happy Travelers</p>
          </div>
        </Reveal>
      </section>

      <WhySection dict={dict.why} />
      <HowItWorks dict={dict.how} />
      <Testimonials dict={dict.testimonials} />
      <CtaSection lang={lang} dict={dict.cta} />
    </>
  );
}
