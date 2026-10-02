"use client";

import { usePathname } from "next/navigation";
import { FiFileText } from "react-icons/fi";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import type { Locale } from "@/lib/locale";
import { translations } from "@/lib/translations";

const sections = [
  { id: "about", label: "navAbout" },
  { id: "experience", label: "navExperience" },
  { id: "work", label: "navWork" },
  { id: "engineering", label: "navEngineering" },
  { id: "contact", label: "navContact" },
] as const;

export function SiteHeader({ locale }: { locale: Locale }) {
  const path = usePathname();
  const onPortfolio = path === "/";
  const t = translations[locale];
  return <>
    <a className="skip-link" href="#main">{t.skip}</a>
    <header className="site-header">
      <a href={onPortfolio ? "#top" : "/#top"} className="brand flex shrink-0 items-center gap-3" aria-label={t.backToTopLabel}><span className="brand-mark">S<span>.</span>A</span><span className="brand-name">SAMAN AZIZI<br />SIYAN</span></a>
      <nav className="section-nav flex items-center gap-1" aria-label={t.sectionsLabel}>
        {sections.map(({ id, label }) => <a key={id} href={onPortfolio ? `#${id}` : `/#${id}`}>{t[label]}</a>)}
      </nav>
      <div className="header-actions flex shrink-0 items-center gap-2">
        <LanguageToggle locale={locale} />
        <ThemeToggle locale={locale} />
        <a className="icon-button cv-icon" href="/Saman-Azizi-Siyan-CV.pdf" target="_blank" rel="noopener noreferrer" aria-label={t.cvPdf} title={t.cvPdf}><FiFileText aria-hidden="true" /></a>
      </div>
    </header>
  </>;
}
