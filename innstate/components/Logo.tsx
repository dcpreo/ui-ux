import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export default function Logo({ lang, className = "" }: { lang: Locale; className?: string }) {
  return (
    <Link href={`/${lang}`} className={`flex items-center gap-2 group ${className}`} aria-label="Innstate home">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white font-display font-bold text-lg transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
        I
      </span>
      <span className="font-display font-bold text-xl tracking-tight text-foreground">
        Innstate
      </span>
    </Link>
  );
}
