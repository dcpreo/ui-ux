import "server-only";
import { locales, defaultLocale, localeNames, type Locale } from "./locales";

export { locales, defaultLocale, localeNames };
export type { Locale };

const dictionaries = {
  en: () => import("@/dictionaries/en.json").then((m) => m.default),
  ka: () => import("@/dictionaries/ka.json").then((m) => m.default),
  ru: () => import("@/dictionaries/ru.json").then((m) => m.default),
};

export const getDictionary = async (locale: Locale) =>
  (dictionaries[locale] ?? dictionaries.en)();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
