import Link from "next/link";
import { getLocale } from "@/lib/locale";
import { translations } from "@/lib/translations";

export default async function NotFound() {
  const t = translations[await getLocale()];
  return <section className="not-found page-pad"><span className="eyebrow">404</span><h1>{t.notFoundTitle}</h1><p>{t.notFoundText}</p><Link className="solid-link" href="/#work">{t.notFoundAction}</Link></section>;
}
