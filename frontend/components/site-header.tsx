"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiFileText } from "react-icons/fi";
import { ThemeToggle } from "@/components/theme-toggle";

const sections = ["About", "Experience", "Work", "Engineering", "Contact"] as const;

export function SiteHeader() {
  const path = usePathname();
  const base = path === "/demo-2" ? "/demo-2" : "/";
  const onPortfolio = path === "/" || path === "/demo-2";
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className={`site-header ${path === "/demo-2" ? "site-header-boxed" : ""}`}>
      <a href={onPortfolio ? "#top" : `${base}#top`} className="brand flex shrink-0 items-center gap-3" aria-label="Saman Azizi Siyan, back to top"><span className="brand-mark">S<span>.</span>A</span><span className="brand-name">SAMAN AZIZI<br />SIYAN</span></a>
      <nav className="section-nav flex items-center gap-1" aria-label="Portfolio sections">
        {sections.map((label) => <a key={label} href={onPortfolio ? `#${label.toLowerCase()}` : `/#${label.toLowerCase()}`}>{label}</a>)}
      </nav>
      <div className="header-actions flex shrink-0 items-center gap-2">
        <nav className="view-switch flex items-center" aria-label="Visual version"><Link href="/#top" aria-label="Full-width version" title="Full-width version" aria-current={path === "/" ? "page" : undefined}>01</Link><Link href="/demo-2#top" aria-label="Boxed version" title="Boxed version" aria-current={path === "/demo-2" ? "page" : undefined}>02</Link></nav>
        <ThemeToggle />
        <a className="icon-button cv-icon" href="/Saman-Azizi-Siyan-CV.pdf" target="_blank" rel="noopener noreferrer" aria-label="View CV PDF" title="View CV PDF"><FiFileText aria-hidden="true" /></a>
      </div>
    </header>
  </>;
}
