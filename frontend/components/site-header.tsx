"use client";

import { usePathname } from "next/navigation";
import { FiFileText } from "react-icons/fi";
import { ThemeToggle } from "@/components/theme-toggle";

const sections = ["About", "Experience", "Work", "Engineering", "Contact"] as const;

export function SiteHeader() {
  const path = usePathname();
  const onPortfolio = path === "/";
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <a href={onPortfolio ? "#top" : "/#top"} className="brand flex shrink-0 items-center gap-3" aria-label="Saman Azizi Siyan, back to top"><span className="brand-mark">S<span>.</span>A</span><span className="brand-name">SAMAN AZIZI<br />SIYAN</span></a>
      <nav className="section-nav flex items-center gap-1" aria-label="Portfolio sections">
        {sections.map((label) => <a key={label} href={onPortfolio ? `#${label.toLowerCase()}` : `/#${label.toLowerCase()}`}>{label}</a>)}
      </nav>
      <div className="header-actions flex shrink-0 items-center gap-2">
        <ThemeToggle />
        <a className="icon-button cv-icon" href="/Saman-Azizi-Siyan-CV.pdf" target="_blank" rel="noopener noreferrer" aria-label="View CV PDF" title="View CV PDF"><FiFileText aria-hidden="true" /></a>
      </div>
    </header>
  </>;
}
