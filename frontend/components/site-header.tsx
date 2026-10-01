import Link from "next/link";

const sections = [
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Work", "#work"],
  ["Engineering", "#engineering"],
  ["Contact", "#contact"],
] as const;

export function SiteHeader() {
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <Link href="/#top" className="brand" aria-label="Saman Azizi Siyan, back to top"><span className="brand-mark">S<span>.</span>A</span><span className="brand-name">SAMAN AZIZI<br />SIYAN</span></Link>
      <nav className="section-nav" aria-label="Portfolio sections">
        {sections.map(([label, href]) => <Link key={href} href={`/${href}`}>{label}</Link>)}
      </nav>
      <a className="header-cv" href="/Saman-Azizi-Siyan-CV.pdf" target="_blank" rel="noopener noreferrer">CV <span aria-hidden="true">↗</span></a>
    </header>
  </>;
}
