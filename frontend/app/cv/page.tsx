import type { Metadata } from "next";
import { getExperiences } from "@/lib/data";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "CV", description: "Professional experience and selected engineering work by Saman Azizi Siyan.", alternates: { canonical: "/cv" } };

export default async function CvPage() {
  const experiences = await getExperiences();
  return <div className="cv-page page-pad"><span className="eyebrow">CURRICULUM VITAE</span><h1>Saman Azizi Siyan</h1><p>Full Stack Engineer working across commercial WordPress products, PHP/Laravel services, frontend applications, and integrations.</p><div className="cv-actions"><a href="/Saman-Azizi-Siyan-CV.pdf" download>Download PDF ↓</a><a href="/Saman-Azizi-Siyan-CV.pdf" target="_blank" rel="noopener noreferrer">View PDF ↗</a></div><article className="cv-sheet"><h2>Professional experience</h2><p>Company, contract, and independent roles overlap. Dates and scope follow the current professional record.</p>{experiences.map((experience) => <div className="cv-entry" key={`${experience.company}-${experience.role}`}><strong>{experience.company}</strong><span>{experience.role} · {experience.period}</span><p>{experience.summary}</p></div>)}<h3>Selected output</h3><p><a href="https://listdom.net">Listdom</a> · <a href="https://www.rtl-theme.com/blogina-wordpress-theme/">Blogina</a> · <a href="https://www.rtl-theme.com/serione-wordpress-theme/">Serione</a></p><p>Commercial source belongs to its owners. Public source examples are linked from the portfolio.</p></article></div>;
}
