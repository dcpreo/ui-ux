"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { locales, localeNames, type Locale } from "@/lib/locales";

export default function LanguageSwitcher({ lang }: { lang: Locale }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function switchTo(locale: Locale) {
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/") || "/");
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent cursor-pointer"
        aria-label="Switch language"
      >
        <Globe size={16} />
        {localeNames[lang]}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-lg shadow-gray-200/50 animate-in fade-in zoom-in-95">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => switchTo(l)}
              className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-surface ${
                l === lang ? "text-accent font-semibold" : "text-foreground"
              }`}
            >
              {localeNames[l]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
