import { FiArrowUpRight, FiLayers, FiServer, FiSend, FiPlus } from "react-icons/fi";
import { ContactForm } from "@/components/contact-form";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ExpertiseOrbit } from "@/components/expertise-orbit";
import { MotionController } from "@/components/motion-controller";
import { SocialLinks } from "@/components/social-links";
import { WorkCard } from "@/components/work-card";
import { getExperiences, getProducts, getProjects } from "@/lib/data";

export async function PortfolioPage() {
  const [projects, experiences, products] = await Promise.all([getProjects(), getExperiences(), getProducts()]);
  const featured = ["blogina", "serione", "clickchin-builder"]
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project) => project !== undefined);
  const listdom = products.find((product) => product.slug === "listdom");
  const additional = projects.filter((project) => !featured.some((item) => item.slug === project.slug));

  return <div className="portfolio page-editorial">
    <MotionController />
    <section className="hero hero-editorial" id="top" aria-labelledby="hero-title">
        <div className="hero-editorial-copy flex flex-col justify-between gap-12"><div className="hero-meta flex flex-wrap items-center justify-between gap-4"><span className="section-kicker">SAMAN AZIZI SIYAN / ENGINEERING PORTFOLIO</span><span className="meta-note">PHP · WORDPRESS · LARAVEL · REACT</span></div><div className="flex flex-col gap-5"><p className="hero-overline">Hello, I&apos;m</p><h1 id="hero-title">Saman<br /><em>Azizi Siyan.</em></h1><p className="hero-statement">I build and maintain the systems behind useful web products.</p></div><div className="hero-cta-row flex flex-wrap items-center gap-6"><a className="text-action inline-flex items-center gap-2" href="#work">Explore selected work <FiArrowUpRight aria-hidden="true" /></a><SocialLinks /></div></div>
        <div className="hero-editorial-visual flex items-center justify-center"><ExpertiseOrbit experiences={experiences} /><span className="hero-visual-side" aria-hidden="true">PERSON / PRACTICE / PRODUCT</span></div>
    </section>

    <section className="content-section about-section" id="about" aria-labelledby="about-heading"><div className="section-frame"><div className="section-intro flex flex-col gap-4"><span className="section-kicker">01 / ABOUT</span><h2 id="about-heading">Across the stack.<br /><em>Close to the product.</em></h2></div><div className="section-body flex flex-col gap-8"><p className="section-lead">I work where a product&apos;s interface, business rules, data, and deployment meet. My work spans WordPress and WooCommerce, PHP and Laravel, React and Next.js, APIs, integrations, and the long-term care real systems need.</p><div className="practice-list flex flex-wrap gap-3"><span>Build useful features</span><span>Connect moving parts</span><span>Improve what already exists</span></div></div></div></section>

    <section className="content-section experience-section" id="experience" aria-labelledby="experience-heading"><div className="section-frame"><div className="section-intro flex flex-col gap-4"><span className="section-kicker">02 / EXPERIENCE</span><h2 id="experience-heading">The work,<br /><em>over time.</em></h2><p className="section-intro-note">Company, contract, and independent roles overlap. Open a role to see the established scope.</p></div><div className="section-body"><ExperienceTimeline experiences={experiences} /></div></div></section>

    <section className="content-section work-section" id="work" aria-labelledby="work-heading"><div className="section-frame"><div className="section-intro flex flex-col gap-4"><span className="section-kicker">03 / SELECTED WORK</span><h2 id="work-heading">See the result.</h2><p className="section-intro-note">Public products first. Source where it can be inspected.</p></div><div className="section-body flex flex-col gap-5">
      {listdom && <article className="listdom-feature"><div className="listdom-copy flex flex-col items-start justify-between gap-6"><span className="work-index">01 / COMMERCIAL PRODUCT · WEBILIA</span><div className="flex flex-col gap-3"><h3>Listdom<span className="accent-dot">.</span></h3><p>A WordPress directory platform I help develop at Webilia, across core features, add-ons, themes, and tooling.</p></div><a className="action-primary inline-flex items-center gap-2" href={listdom.url} target="_blank" rel="noopener noreferrer">View product <FiArrowUpRight aria-hidden="true" /></a></div><div className="listdom-visual" aria-hidden="true"><div className="listdom-visual-inner"><span>LISTDOM</span><div className="listdom-map"><i /><i /><i /><i /><i /></div><strong>One platform.<br />Many directories.</strong></div></div></article>}
      <div className="work-grid">{featured.map((project, index) => <WorkCard key={project.slug} project={project} index={index + 2} />)}</div>
      <details className="more-work"><summary className="flex items-center justify-between gap-4">More public source and earlier work <FiPlus aria-hidden="true" /></summary><div className="more-work-list flex flex-col">{additional.map((project) => <div className="more-work-item flex flex-wrap items-center justify-between gap-4" key={project.slug}><div className="flex flex-col gap-1"><strong>{project.name}</strong><span>{project.kind}</span></div><a href={project.live_url ?? project.repository_url ?? "#work"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1">{project.live_url ? "View output" : "View source"} <FiArrowUpRight aria-hidden="true" /></a></div>)}</div></details>
    </div></div></section>

    <section className="content-section engineering-section" id="engineering" aria-labelledby="engineering-heading"><div className="section-frame"><div className="section-intro flex flex-col gap-4"><span className="section-kicker">04 / ENGINEERING</span><h2 id="engineering-heading">Make the whole<br /><em>system work.</em></h2></div><div className="section-body flex flex-col gap-8"><p className="section-lead">Good engineering keeps boundaries clear and the product maintainable. I connect the visible experience to the services, content, data, and operations that support it.</p><div className="system-flow grid gap-3" aria-label="Interface connects to services and delivery"><div className="system-node flex flex-col gap-3"><FiLayers aria-hidden="true" /><strong>Interface</strong><small>React · Next.js · WordPress</small></div><div className="system-node flex flex-col gap-3"><FiServer aria-hidden="true" /><strong>Services</strong><small>PHP · Laravel · APIs</small></div><div className="system-node flex flex-col gap-3"><FiSend aria-hidden="true" /><strong>Delivery</strong><small>Data · Docker · CI</small></div></div></div></div></section>

    <section className="content-section contact-section" id="contact" aria-labelledby="contact-heading"><div className="section-frame"><div className="section-intro flex flex-col gap-4"><span className="section-kicker">05 / CONTACT</span><h2 id="contact-heading">Let&apos;s make it<br /><em>work well.</em></h2><p className="section-intro-note">For product engineering, integrations, or an existing system that needs careful work, get in touch.</p></div><div className="section-body contact-layout grid gap-10"><ContactForm /><aside className="contact-aside flex flex-col gap-5"><span className="section-kicker">ELSEWHERE</span><SocialLinks /><a className="text-action inline-flex items-center gap-2" href="/cv">View the CV <FiArrowUpRight aria-hidden="true" /></a></aside></div></div></section>
  </div>;
}
