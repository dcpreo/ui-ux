"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import type { Deal } from "@/lib/data";
import type { Locale } from "@/lib/i18n";

export default function DealCard({
  deal,
  lang,
  ctaLabel,
}: {
  deal: Deal;
  lang: Locale;
  ctaLabel: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm shadow-gray-200/50 transition-shadow duration-300 hover:shadow-xl hover:shadow-gray-300/40"
    >
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={deal.image}
          alt={deal.hotel}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-lg font-semibold text-foreground">{deal.hotel}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-foreground/50">
          <MapPin size={14} />
          {deal.location}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-foreground/60">{deal.description}</p>
        <Link
          href={`/${lang}/contact`}
          className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-surface px-4 py-2 text-sm font-semibold text-accent transition-all duration-300 hover:bg-accent hover:text-white"
        >
          {ctaLabel}
          <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}
