import { Search, Send, MailCheck } from "lucide-react";
import Reveal from "./Reveal";
import type { Dictionary } from "@/lib/i18n";

const icons = [Search, Send, MailCheck];

export default function HowItWorks({ dict }: { dict: Dictionary["how"] }) {
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{dict.title}</h2>
        </Reveal>

        <div className="relative mt-14 grid gap-8 sm:grid-cols-3">
          <div className="absolute top-7 left-0 right-0 hidden h-px bg-gray-200 sm:block" />
          {dict.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <Reveal key={step.title} delay={i * 0.1} className="relative text-center">
                <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-accent shadow-md shadow-gray-200/60 ring-4 ring-surface">
                  <Icon size={22} />
                </div>
                <span className="mt-4 inline-block font-display text-sm font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 font-display font-semibold text-foreground">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-foreground/60">{step.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
