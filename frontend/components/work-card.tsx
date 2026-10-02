import Image from "next/image";
import { FiArrowUpRight, FiCode, FiPlus } from "react-icons/fi";
import type { Project } from "@/lib/data";

export function WorkCard({ project, index, boxed = false }: { project: Project; index: number; boxed?: boolean }) {
  const primary = project.live_url ?? project.repository_url;
  const label = project.live_url ? "View product" : "View source";
  return <article className={`work-card ${boxed ? "work-card-boxed" : ""} ${!project.image_url ? "work-card-source" : ""}`}>
    {project.image_url && project.image_alt ? <div className="work-image"><Image src={project.image_url} alt={project.image_alt} fill sizes={boxed ? "(max-width: 800px) 100vw, 45vw" : "(max-width: 800px) 100vw, 50vw"} /></div> : <div className="work-image work-code-art" aria-hidden="true"><FiCode /><span>CODE / SYSTEMS</span></div>}
    <div className="work-card-body flex flex-col gap-4">
      <span className="work-index">{String(index).padStart(2, "0")} / {project.kind}</span>
      <div className="flex flex-col gap-3"><h3>{project.name}</h3><p>{project.summary}</p></div>
      <div className="work-actions flex flex-wrap items-center gap-4">
        {primary && <a className="action-primary inline-flex items-center gap-2" href={primary} target="_blank" rel="noopener noreferrer">{label} <FiArrowUpRight aria-hidden="true" /></a>}
        {project.live_url && project.repository_url && <a className="action-secondary inline-flex items-center gap-1" href={project.repository_url} target="_blank" rel="noopener noreferrer">Source <FiArrowUpRight aria-hidden="true" /></a>}
      </div>
      <details className="work-detail"><summary className="inline-flex items-center gap-2">My contribution <FiPlus aria-hidden="true" /></summary><div className="detail-content flex flex-col gap-2"><p>{project.contribution}</p><span>{project.visibility}</span></div></details>
    </div>
  </article>;
}
