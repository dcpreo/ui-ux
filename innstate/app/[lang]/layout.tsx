import type { Metadata } from "next";
import { getDictionary, locales, type Locale } from "@/lib/i18n";
import { toLocale } from "@/lib/locales";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = toLocale(rawLang);
  const titles: Record<Locale, string> = {
    en: "Innstate — Find Better Hotel Deals Worldwide",
    ka: "Innstate — საუკეთესო სასტუმროების შეთავაზებები მსოფლიოში",
    ru: "Innstate — Лучшие предложения отелей по всему миру",
  };
  const descriptions: Record<Locale, string> = {
    en: "Discover hotel deals, cheap hotel offers and travel deals worldwide. Submit an inquiry and get exclusive hotel discounts from trusted partners.",
    ka: "აღმოაჩინეთ სასტუმროების შეთავაზებები, იაფი შეთავაზებები და მოგზაურობის შეთავაზებები მთელ მსოფლიოში.",
    ru: "Откройте для себя предложения отелей, выгодные предложения и туристические предложения по всему миру.",
  };

  return {
    title: titles[lang],
    description: descriptions[lang],
    alternates: {
      languages: { en: "/en", ka: "/ka", ru: "/ru" },
    },
    keywords: [
      "hotel deals",
      "cheap hotel offers",
      "travel deals worldwide",
      "hotel discounts",
      "global hotel search",
    ],
    openGraph: {
      title: titles[lang],
      description: descriptions[lang],
      type: "website",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang = toLocale(rawLang);
  const dict = await getDictionary(lang);

  return (
    <div lang={lang} className="flex min-h-screen flex-col">
      <LoadingScreen />
      <Header lang={lang} dict={dict.nav} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} dict={dict} />
    </div>
  );
}
