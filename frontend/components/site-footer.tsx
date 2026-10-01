import Link from "next/link";

export function SiteFooter() {
  return <footer className="site-footer">
    <span>Saman Azizi Siyan <small>© 2026</small></span>
    <p>Built around work you can visit and code you can inspect.</p>
    <Link href="/#top">Back to top ↑</Link>
  </footer>;
}
