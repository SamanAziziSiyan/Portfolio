import Image from "next/image";
import { FiArrowUpRight, FiCalendar, FiPlus } from "react-icons/fi";
import type { Experience } from "@/lib/data";

const logos: Record<string, { src: string; alt: string }> = {
  Webilia: { src: "/companies/webilia.webp", alt: "Webilia company mark" },
  "RTL Theme": { src: "/companies/rtl-theme.webp", alt: "RTL Theme company mark" },
  "Panjere Studio": { src: "/companies/panjere.webp", alt: "Panjere Studio company mark" },
};

function CompanyMark({ company }: { company: string }) {
  const logo = logos[company];
  return <span className={`company-mark ${logo ? "company-mark-image" : ""}`}>
    {logo ? <Image src={logo.src} alt={logo.alt} width={42} height={42} /> : <span aria-label={`${company} initials`}>{company.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()}</span>}
  </span>;
}

export function ExperienceTimeline({ experiences, boxed = false }: { experiences: Experience[]; boxed?: boolean }) {
  return <div className={`timeline ${boxed ? "timeline-boxed" : "timeline-editorial"}`}>
    <span className="timeline-track" aria-hidden="true"><span className="timeline-track-fill" /></span>
    {experiences.map((experience, index) => <article className="timeline-entry" key={`${experience.company}-${experience.role}`}>
      <span className="timeline-node" aria-hidden="true" />
      <div className="timeline-entry-inner">
        {boxed && <span className="timeline-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>}
        <CompanyMark company={experience.company} />
        <div className="timeline-copy flex min-w-0 flex-col gap-3">
          <div className="timeline-heading flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-col gap-1"><h3>{experience.company}</h3><span className="timeline-role">{experience.role}</span></div>
            <time className="timeline-date inline-flex items-center gap-2" dateTime={experience.start_date}><FiCalendar aria-hidden="true" />{experience.period}</time>
          </div>
          <p>{experience.summary}</p>
          <details className="timeline-detail"><summary className="inline-flex items-center gap-2">Scope & contributions <FiPlus aria-hidden="true" /></summary><div className="timeline-extra flex flex-col gap-4"><ul className="flex flex-col gap-2">{experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>{experience.link && <a href={experience.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 self-start">Related output or source <FiArrowUpRight aria-hidden="true" /></a>}</div></details>
        </div>
      </div>
    </article>)}
  </div>;
}
