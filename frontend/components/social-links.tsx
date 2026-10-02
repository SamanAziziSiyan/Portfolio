import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { FiDownload, FiMail } from "react-icons/fi";

const items = [
  { label: "GitHub", href: "https://github.com/SamanAziziSiyan", icon: FaGithub, external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/saman-azizi-siyan/", icon: FaLinkedinIn, external: true },
  { label: "Contact Saman", href: "#contact", icon: FiMail, external: false },
  { label: "Download CV", href: "/Saman-Azizi-Siyan-CV.pdf", icon: FiDownload, external: false, download: true },
] as const;

export function SocialLinks({ className = "" }: { className?: string }) {
  return <nav className={`flex items-center gap-2 ${className}`} aria-label="Social and contact links">
    {items.map(({ label, href, icon: Icon, external, ...rest }) => <a key={label} className="icon-button" href={href} aria-label={label} title={label} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...("download" in rest ? { download: true } : {})}><Icon aria-hidden="true" /></a>)}
  </nav>;
}
