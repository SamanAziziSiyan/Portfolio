import { FiArrowUpRight } from "react-icons/fi";

export function SiteFooter() {
  return <footer className="site-footer flex flex-wrap items-center justify-between gap-5">
    <span>Saman Azizi Siyan <small>© 2026</small></span>
    <p>Built around work you can visit and code you can inspect.</p>
    <a href="#top" className="inline-flex items-center gap-2">Back to top <FiArrowUpRight aria-hidden="true" /></a>
  </footer>;
}
