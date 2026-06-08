"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import DestinationCard from "./DestinationCard";
import type { Destination } from "@/lib/data";
import type { Locale } from "@/lib/i18n";

const regions = ["Middle East", "Europe", "Asia", "Africa"] as const;

export default function DestinationsExplorer({
  destinations,
  lang,
  searchPlaceholder,
  allLabel,
}: {
  destinations: Destination[];
  lang: Locale;
  searchPlaceholder: string;
  allLabel: string;
}) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<string>("all");

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      const matchesQuery = d.name.toLowerCase().includes(query.toLowerCase());
      const matchesRegion = region === "all" || d.region === region;
      return matchesQuery && matchesRegion;
    });
  }, [destinations, query, region]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-foreground outline-none transition-colors duration-200 focus:border-accent"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setRegion("all")}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              region === "all" ? "bg-accent text-white" : "bg-surface text-foreground/70 hover:bg-gray-200"
            }`}
          >
            {allLabel}
          </button>
          {regions.map((r) => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                region === r ? "bg-accent text-white" : "bg-surface text-foreground/70 hover:bg-gray-200"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((d) => (
            <motion.div
              key={d.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              <DestinationCard destination={d} lang={lang} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-sm text-foreground/50">No destinations found.</p>
      )}
    </div>
  );
}
