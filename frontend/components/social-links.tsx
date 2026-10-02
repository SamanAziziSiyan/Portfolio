import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { FiDownload, FiMail } from "react-icons/fi";
import type { Locale } from "@/lib/language";
import { translations } from "@/lib/translations";

export function SocialLinks({ className = "", locale }: { className?: string; locale: Locale }) {
  const t = translations[locale];
  const items = [
    { label: "GitHub", href: "https://github.com/SamanAziziSiyan", icon: FaGithub, external: true, download: false },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/saman-azizi-siyan/", icon: FaLinkedinIn, external: true, download: false },
    { label: t.socialContact, href: "#contact", icon: FiMail, external: false, download: false },
    { label: t.socialDownload, href: "/Saman-Azizi-Siyan-CV.pdf", icon: FiDownload, external: false, download: true },
  ];
  return <nav className={`flex items-center gap-2 ${className}`} aria-label={t.socialsLabel}>
    {items.map(({ label, href, icon: Icon, external, download }) => <a key={href} className="icon-button" href={href} aria-label={label} title={label} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...(download ? { download: true } : {})}><Icon aria-hidden="true" /></a>)}
  </nav>;
}
