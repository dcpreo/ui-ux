"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import type { Locale, Dictionary } from "@/lib/i18n";

export default function CtaSection({ lang, dict }: { lang: Locale; dict: Dictionary["cta"] }) {
  return (
    <section className="px-6 py-20">
      <Reveal className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-accent px-8 py-16 text-center shadow-xl shadow-blue-500/20 sm:px-16">
          <motion.div
            className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{dict.title}</h2>
          <Link
            href={`/${lang}/contact`}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-accent shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
          >
            {dict.button}
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
