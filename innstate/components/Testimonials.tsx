"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "./Reveal";
import type { Dictionary } from "@/lib/i18n";

export default function Testimonials({ dict }: { dict: Dictionary["testimonials"] }) {
  const [index, setIndex] = useState(0);
  const items = dict.items;

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 5000);
    return () => clearInterval(t);
  }, [items.length]);

  return (
    <section className="mx-auto max-w-3xl px-6 py-20 text-center">
      <Reveal>
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{dict.title}</h2>
      </Reveal>

      <div className="relative mt-10 min-h-[200px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm shadow-gray-200/50"
          >
            <Quote className="mx-auto text-accent/30" size={28} />
            <p className="mt-4 text-base leading-relaxed text-foreground/70 sm:text-lg">
              “{items[index].text}”
            </p>
            <p className="mt-5 font-display font-semibold text-foreground">{items[index].name}</p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-foreground/60 transition-colors hover:border-accent hover:text-accent"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-accent" : "w-1.5 bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => setIndex((i) => (i + 1) % items.length)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-foreground/60 transition-colors hover:border-accent hover:text-accent"
            aria-label="Next testimonial"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
