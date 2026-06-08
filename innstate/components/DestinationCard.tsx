"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Destination } from "@/lib/data";
import type { Locale } from "@/lib/i18n";

export default function DestinationCard({ destination, lang }: { destination: Destination; lang: Locale }) {
  return (
    <motion.div whileTap={{ scale: 0.97 }}>
      <Link
        href={`/${lang}/destinations`}
        className="group relative block h-72 overflow-hidden rounded-3xl shadow-sm shadow-gray-200/60 transition-shadow duration-300 hover:shadow-xl hover:shadow-gray-300/40"
      >
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/70" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="font-display text-xl font-semibold text-white">{destination.name}</p>
          <p className="mt-0.5 text-xs text-white/70">{destination.region}</p>
        </div>
        <span className="absolute top-4 right-4 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white/90 text-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          →
        </span>
      </Link>
    </motion.div>
  );
}
