import Image from "next/image";
import { FiArrowUpRight, FiCode, FiPlus } from "react-icons/fi";
import type { Project } from "@/lib/data";
import type { Locale } from "@/lib/language";
import { projectText } from "@/lib/portfolio-fa";
import { translations } from "@/lib/translations";

export function WorkCard({ project, index, locale }: { project: Project; index: number; locale: Locale }) {
  const t = translations[locale];
  const content = projectText(project, locale);
  const primary = project.live_url ?? project.repository_url;
  const label = project.live_url ? t.listdomAction : t.viewSource;
  return <article className={`work-card ${!project.image_url ? "work-card-source" : ""}`}>
    {project.image_url && project.image_alt ? <div className="work-image"><Image src={project.image_url} alt={locale === "fa" ? `نمای قالب ${content.name}` : project.image_alt} fill sizes="(max-width: 800px) 100vw, 50vw" /></div> : <div className="work-image work-code-art" aria-hidden="true"><FiCode /><span>{t.codeSystems}</span></div>}
    <div className="work-card-body flex flex-col gap-4">
      <span className="work-index">{String(index).padStart(2, "0")} / {content.kind}</span>
      <div className="flex flex-col gap-3"><h3>{content.name}</h3><p>{content.summary}</p></div>
      <div className="work-actions flex flex-wrap items-center gap-4">
        {primary && <a className="action-primary inline-flex items-center gap-2" href={primary} target="_blank" rel="noopener noreferrer">{label} <FiArrowUpRight aria-hidden="true" /></a>}
        {project.live_url && project.repository_url && <a className="action-secondary inline-flex items-center gap-1" href={project.repository_url} target="_blank" rel="noopener noreferrer">{t.source} <FiArrowUpRight aria-hidden="true" /></a>}
      </div>
      <details className="work-detail"><summary className="inline-flex items-center gap-2">{t.myContribution} <FiPlus aria-hidden="true" /></summary><div className="detail-content flex flex-col gap-2"><p>{content.contribution}</p><span>{content.visibility}</span></div></details>
    </div>
  </article>;
}
