import Link from "next/link";
import Logo from "./Logo";
import SocialIcons from "./SocialIcons";
import LanguageSwitcher from "./LanguageSwitcher";
import { contactEmail } from "@/lib/data";
import type { Locale, Dictionary } from "@/lib/i18n";

export default function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const links = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/destinations`, label: dict.nav.destinations },
    { href: `/${lang}/deals`, label: dict.nav.deals },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="border-t border-gray-100 bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo lang={lang} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground/60">
            Discover hotel deals worldwide and submit your inquiry in seconds.
          </p>
          <SocialIcons className="mt-5" />
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm text-foreground">{dict.footer.quickLinks}</h4>
          <ul className="mt-4 space-y-2.5">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-foreground/60 transition-colors hover:text-accent">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm text-foreground">{dict.footer.contact}</h4>
          <p className="mt-4 text-sm text-foreground/60">
            <a href={`mailto:${contactEmail}`} className="transition-colors hover:text-accent">
              {contactEmail}
            </a>
          </p>
        </div>

        <div>
          <h4 className="font-display font-semibold text-sm text-foreground">Language</h4>
          <div className="mt-4">
            <LanguageSwitcher lang={lang} />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200/60 px-6 py-6 text-center text-xs text-foreground/50">
        © {new Date().getFullYear()} Innstate. {dict.footer.rights}
      </div>
    </footer>
  );
}
