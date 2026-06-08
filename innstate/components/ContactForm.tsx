"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm({ dict }: { dict: Dictionary["contactPage"] }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const fields: { name: string; label: string; type: string; span?: boolean }[] = [
    { name: "fullName", label: dict.fullName, type: "text" },
    { name: "email", label: dict.email, type: "email" },
    { name: "phone", label: dict.phone, type: "tel" },
    { name: "destination", label: dict.destination, type: "text" },
    { name: "dates", label: dict.dates, type: "text" },
    { name: "guests", label: dict.guests, type: "number" },
  ];

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center rounded-3xl border border-gray-100 bg-white p-12 text-center shadow-sm shadow-gray-200/50"
      >
        <CheckCircle2 className="text-accent" size={44} />
        <p className="mt-4 max-w-sm text-base font-medium text-foreground">{dict.success}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-200/50 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.name} className="flex flex-col gap-1.5">
            <label htmlFor={f.name} className="text-sm font-medium text-foreground/80">
              {f.label}
            </label>
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              required={f.name === "fullName" || f.name === "email"}
              className="rounded-xl border border-gray-200 bg-surface/60 px-4 py-2.5 text-sm text-foreground outline-none transition-colors duration-200 focus:border-accent focus:bg-white"
            />
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium text-foreground/80">
          {dict.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="resize-none rounded-xl border border-gray-200 bg-surface/60 px-4 py-2.5 text-sm text-foreground outline-none transition-colors duration-200 focus:border-accent focus:bg-white"
        />
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        disabled={status === "loading"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl disabled:opacity-70 sm:w-auto"
      >
        <AnimatePresence mode="wait" initial={false}>
          {status === "loading" ? (
            <motion.span key="loading" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Loader2 size={16} className="animate-spin" />
              {dict.submit}
            </motion.span>
          ) : (
            <motion.span key="idle" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Send size={16} />
              {dict.submit}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {status === "error" && (
        <p className="mt-3 text-sm text-red-500">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
