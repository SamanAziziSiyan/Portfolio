import { ContactForm } from "@/components/contact-form";
import { MotionController } from "@/components/motion-controller";
import { WorkCard } from "@/components/work-card";
import { getExperiences, getProducts, getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [projects, experiences, products] = await Promise.all([getProjects(), getExperiences(), getProducts()]);
  const featured = ["blogina", "serione", "clickchin-builder"]
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project) => project !== undefined);
  const listdom = products.find((product) => product.slug === "listdom");
  const additional = projects.filter((project) => !featured.some((item) => item.slug === project.slug));

  return <>
    <MotionController />
    <section className="hero page-pad" id="top" aria-labelledby="hero-title">
      <div className="hero-top"><span className="eyebrow">FULL STACK ENGINEER</span><span className="hero-coordinate">PHP / WORDPRESS / LARAVEL / NEXT.JS</span></div>
      <div className="hero-core">
        <p className="hero-intro">Hello, I&apos;m</p>
        <h1 id="hero-title">Saman<br /><em>Azizi Siyan.</em></h1>
        <p className="hero-statement">I build and maintain the systems behind useful web products.</p>
      </div>
      <div className="hero-bottom"><div className="hero-links"><a className="solid-link" href="#work">See selected work <span aria-hidden="true">↘</span></a><a href="https://github.com/SamanAziziSiyan" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/saman-azizi-siyan/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div><p>Commercial WordPress products, Laravel services, and modern web interfaces — across company, contract, and independent work.</p></div>
      <div className="hero-orbit" aria-hidden="true"><span>PRODUCT</span><span>CODE</span><span>SYSTEMS</span></div>
    </section>

    <section className="section about-section page-pad" id="about" aria-labelledby="about-heading">
      <div className="section-label">01 / ABOUT</div>
      <div className="section-main reveal"><h2 id="about-heading">Across the stack.<br /><em>Close to the product.</em></h2><p className="section-lead">I work where a product&apos;s interface, business rules, data, and deployment meet. My work spans WordPress and WooCommerce, PHP and Laravel, React and Next.js, APIs, integrations, and the long-term care real systems need.</p><div className="practice-list"><span>Build useful features</span><span>Connect moving parts</span><span>Improve what already exists</span></div></div>
    </section>

    <section className="section experience-section page-pad" id="experience" aria-labelledby="experience-heading">
      <div className="section-label">02 / EXPERIENCE</div>
      <div className="section-main"><div className="section-heading reveal"><h2 id="experience-heading">The work,<br /><em>over time.</em></h2><p>Roles overlap where contract and independent work ran alongside employment. Select a role for the fuller scope.</p></div>
        <div className="timeline">{experiences.map((experience, index) => <article className={`timeline-entry reveal ${index === 0 ? "current-role" : ""}`} key={`${experience.company}-${experience.role}`}>
          <div className="timeline-time"><span className="timeline-dot" aria-hidden="true" /><time>{experience.period}</time></div>
          <div className="timeline-body"><div className="timeline-title"><h3>{experience.company}</h3><span>{experience.role}</span></div><p>{experience.summary}</p><details><summary>Scope and contributions <span aria-hidden="true">+</span></summary><div className="timeline-extra"><ul>{experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>{experience.link && <a href={experience.link} target="_blank" rel="noopener noreferrer">Related output or source ↗</a>}</div></details></div>
        </article>)}</div>
      </div>
    </section>

    <section className="section work-section page-pad" id="work" aria-labelledby="work-heading">
      <div className="section-label">03 / SELECTED WORK</div>
      <div className="section-main"><div className="section-heading reveal"><h2 id="work-heading">See the result.</h2><p>Public products first. Source links are shown when the work can be inspected.</p></div>
        {listdom && <article className="listdom-feature reveal"><div><span className="work-index">01 / COMMERCIAL PRODUCT</span><h3>Listdom<span className="orange-dot">.</span></h3><p>A WordPress directory platform I help develop at Webilia, across core features, add-ons, themes, and tooling.</p><div className="work-actions"><a className="action-primary" href={listdom.url} target="_blank" rel="noopener noreferrer">View product <span aria-hidden="true">↗</span></a></div><small>Professional contribution at Webilia · proprietary source</small></div><div className="listdom-graphic" aria-hidden="true"><span>Directory</span><span>Integrations</span><span>Experience</span></div></article>}
        <div className="work-grid">{featured.map((project, index) => <WorkCard project={project} index={index + 1} key={project.slug} />)}</div>
        <details className="more-work reveal"><summary>More public source and earlier work <span aria-hidden="true">+</span></summary><div className="more-work-list">{additional.map((project) => <div className="more-work-item" key={project.slug}><div><strong>{project.name}</strong><span>{project.kind} · {project.evidence_type}</span></div><a href={project.live_url ?? project.repository_url ?? "#work"} target="_blank" rel="noopener noreferrer">{project.live_url ? "View output" : "View source"} ↗</a></div>)}</div></details>
      </div>
    </section>

    <section className="section engineering-section page-pad" id="engineering" aria-labelledby="engineering-heading">
      <div className="section-label">04 / ENGINEERING</div>
      <div className="section-main reveal"><h2 id="engineering-heading">Make the whole<br /><em>system work.</em></h2><p className="section-lead">Good engineering keeps boundaries clear and the product maintainable. I connect the visible experience to the services, content, data, and operations that support it.</p><div className="system-flow" aria-label="Interface connects to services, data, and operations"><div><span>01</span><strong>Interface</strong><small>React · Next.js · WordPress</small></div><div><span>02</span><strong>Services</strong><small>PHP · Laravel · APIs</small></div><div><span>03</span><strong>Delivery</strong><small>Data · Docker · CI</small></div></div></div>
    </section>

    <section className="section contact-section page-pad" id="contact" aria-labelledby="contact-heading"><div className="section-label">05 / CONTACT</div><div className="section-main"><div className="section-heading reveal"><h2 id="contact-heading">Let&apos;s make it<br /><em>work well.</em></h2><p>For product engineering, integrations, or an existing system that needs careful work, get in touch.</p></div><div className="contact-layout"><ContactForm /><aside className="contact-aside"><span>ELSEWHERE</span><a href="https://github.com/SamanAziziSiyan" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/saman-azizi-siyan/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="/Saman-Azizi-Siyan-CV.pdf" target="_blank" rel="noopener noreferrer">View CV ↗</a><a href="/Saman-Azizi-Siyan-CV.pdf" download>Download CV ↓</a></aside></div></div></section>
  </>;
}
