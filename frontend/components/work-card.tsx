import Image from "next/image";
import type { Project } from "@/lib/data";

export function WorkCard({ project, index }: { project: Project; index: number }) {
  const primary = project.live_url ?? project.repository_url;
  const label = project.live_url ? "View product" : "View source";
  return (
    <article className={`work-card reveal ${project.image_url ? "with-image" : "without-image"}`}>
      {project.image_url && project.image_alt && <div className="work-image">
        <Image src={project.image_url} alt={project.image_alt} width={1050} height={520} sizes="(max-width: 760px) 100vw, 50vw" />
      </div>}
      <div className="work-card-body">
        <div className="work-topline"><span>0{index + 1} / {project.kind}</span><span>{project.evidence_type}</span></div>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        <div className="work-actions">
          {primary && <a className="action-primary" href={primary} target="_blank" rel="noopener noreferrer">{label} <span aria-hidden="true">↗</span></a>}
          {project.live_url && project.repository_url && <a className="action-secondary" href={project.repository_url} target="_blank" rel="noopener noreferrer">Source ↗</a>}
        </div>
        <details className="work-detail">
          <summary>My contribution <span aria-hidden="true">+</span></summary>
          <div className="detail-content"><p>{project.contribution}</p><p className="detail-scope">{project.visibility}</p></div>
        </details>
      </div>
    </article>
  );
}
