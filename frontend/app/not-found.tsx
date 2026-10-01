import Link from "next/link";

export default function NotFound() {
  return <section className="not-found page-pad"><span className="eyebrow">404 / NOT FOUND</span><h1>This path has moved.</h1><p>The portfolio is now one page.</p><Link className="solid-link" href="/#work">See selected work ↗</Link></section>;
}
