import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

const baseUrl = "https://innstate.example.com";
const pages = ["", "/destinations", "/deals", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: page === "" ? 1 : 0.7,
      });
    }
  }
  return entries;
}
