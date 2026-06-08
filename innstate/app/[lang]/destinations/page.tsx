import { getDictionary } from "@/lib/i18n";
import { toLocale } from "@/lib/locales";
import { destinations } from "@/lib/data";
import DestinationsExplorer from "@/components/DestinationsExplorer";
import Reveal from "@/components/Reveal";

export default async function DestinationsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: rawLang } = await params;
  const lang = toLocale(rawLang);
  const dict = await getDictionary(lang);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-bold text-foreground sm:text-5xl">{dict.destinationsPage.title}</h1>
        <p className="mt-3 text-foreground/60">{dict.destinationsPage.subtitle}</p>
      </Reveal>

      <div className="mt-12">
        <DestinationsExplorer
          destinations={destinations}
          lang={lang}
          searchPlaceholder={dict.destinationsPage.searchPlaceholder}
          allLabel={dict.destinationsPage.all}
        />
      </div>
    </section>
  );
}
