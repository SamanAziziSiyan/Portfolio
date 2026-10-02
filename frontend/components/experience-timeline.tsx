import Image from "next/image";
import { FiArrowUpRight, FiBriefcase, FiCalendar, FiMapPin, FiPlus } from "react-icons/fi";
import type { Experience } from "@/lib/data";
import type { Locale } from "@/lib/language";
import { experienceText } from "@/lib/portfolio-fa";
import { companyName, translations } from "@/lib/translations";

const logos: Record<string, { src: string; alt: string }> = {
  Webilia: { src: "/companies/webilia.webp", alt: "Webilia company mark" },
  "RTL Theme": { src: "/companies/rtl-theme.webp", alt: "RTL Theme company mark" },
  Dalga: { src: "/companies/dalga.webp", alt: "Dalga supplied company mark" },
  iGame: { src: "/companies/igame.webp", alt: "iGame supplied company mark" },
  "Panjere Studio": { src: "/companies/panjere.webp", alt: "Panjere Studio company mark" },
  "AKAF System": { src: "/companies/akaf.webp", alt: "AKAF System supplied company mark" },
  Radiscar: { src: "/companies/radiscar.webp", alt: "Radiscar supplied company wordmark" },
  "Independent work": { src: "/companies/independent.webp", alt: "Independent work supplied handshake icon" },
};

function CompanyMark({ company, locale }: { company: string; locale: Locale }) {
  const logo = logos[company];
  return <span className={`company-mark ${logo ? "company-mark-image" : ""} ${company === "Independent work" ? "company-mark-independent" : ""} ${company === "Radiscar" ? "company-mark-radiscar" : ""}`}>
    {logo ? <Image src={logo.src} alt={locale === "fa" ? `نشان ${companyName(company, locale)}` : logo.alt} width={company === "Radiscar" ? 64 : 42} height={42} /> : <span aria-label={`${company} initials`}>{company.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}</span>}
  </span>;
}

function roleTitle(experience: Experience) {
  const title = experience.role.replace(/\s*·\s*(contract|freelance)$/i, "");
  return experience.employment_type === "Freelance" ? title.replace(/^Freelance\s+/i, "") : title;
}

export function ExperienceTimeline({ experiences, locale }: { experiences: Experience[]; locale: Locale }) {
  const t = translations[locale];
  return <div className="timeline timeline-editorial">
    <span className="timeline-track" aria-hidden="true"><span className="timeline-track-fill" /></span>
    {experiences.map((experience) => {
      const content = experienceText(experience, locale);
      return <article className="timeline-entry" key={`${experience.company}-${experience.role}`}>
        <span className="timeline-node" aria-hidden="true" />
        <div className="timeline-entry-inner">
          <CompanyMark company={experience.company} locale={locale} />
          <div className="timeline-copy flex min-w-0 flex-col gap-3">
            <div className="timeline-heading flex flex-wrap items-start justify-between gap-3">
              <div className="flex flex-col gap-1"><h3>{content.company}</h3><span className="timeline-role">{locale === "fa" ? content.role : roleTitle(experience)}</span></div>
              <time className="timeline-date inline-flex items-center gap-2" dateTime={experience.start_date}><FiCalendar aria-hidden="true" />{content.period}</time>
            </div>
            <div className="timeline-context flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="inline-flex items-center gap-1.5"><FiMapPin aria-hidden="true" />{content.location}</span>
              <span className="inline-flex items-center gap-1.5"><FiBriefcase aria-hidden="true" />{content.employment_type} · {content.workplace_type}</span>
            </div>
            <p>{content.summary}</p>
            <details className="timeline-detail"><summary className="inline-flex items-center gap-2">{t.scope} <FiPlus aria-hidden="true" /></summary><div className="timeline-extra flex flex-col gap-4"><ul className="flex flex-col gap-2">{content.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>{experience.link && <a href={experience.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 self-start">{t.relatedOutput} <FiArrowUpRight aria-hidden="true" /></a>}</div></details>
          </div>
        </div>
      </article>;
    })}
  </div>;
}
