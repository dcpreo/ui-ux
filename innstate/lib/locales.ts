export const locales = ["en", "ka", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function toLocale(value: string): Locale {
  return (locales as readonly string[]).includes(value) ? (value as Locale) : defaultLocale;
}

export const localeNames: Record<Locale, string> = {
  en: "EN",
  ka: "ქარ",
  ru: "RU",
};
