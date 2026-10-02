import { FiArrowUpRight } from "react-icons/fi";
import type { Locale } from "@/lib/locale";
import { translations } from "@/lib/translations";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = translations[locale];
  return <footer className="site-footer flex flex-wrap items-center justify-between gap-5">
    <span>Saman Azizi Siyan <small>© 2026</small></span>
    <p>{t.footerNote}</p>
    <a href="#top" className="inline-flex items-center gap-2">{t.backToTop} <FiArrowUpRight aria-hidden="true" /></a>
  </footer>;
}
