import { Globe2, Sparkles, Zap, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";
import type { Dictionary } from "@/lib/i18n";

const icons = [Globe2, Sparkles, Zap, ShieldCheck];

export default function WhySection({ dict }: { dict: Dictionary["why"] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{dict.title}</h2>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {dict.items.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="group h-full rounded-3xl border border-gray-100 bg-white p-6 shadow-sm shadow-gray-200/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-gray-300/40">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 font-display font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/60">{item.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
