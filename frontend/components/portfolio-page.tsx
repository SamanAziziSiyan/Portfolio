import { FiArrowUpRight, FiLayers, FiServer, FiSend, FiPlus } from "react-icons/fi";
import { ContactForm } from "@/components/contact-form";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ExpertiseOrbit } from "@/components/expertise-orbit";
import { MotionController } from "@/components/motion-controller";
import { SocialLinks } from "@/components/social-links";
import { WorkCard } from "@/components/work-card";
import { getExperiences, getProducts, getProjects } from "@/lib/data";
import type { Locale } from "@/lib/language";
import { projectText } from "@/lib/portfolio-fa";
import { translations } from "@/lib/translations";

export async function PortfolioPage({ locale }: { locale: Locale }) {
  const [projects, experiences, products] = await Promise.all([getProjects(), getExperiences(), getProducts()]);
  const t = translations[locale];
  const featured = ["blogina", "serione", "clickchin-builder"]
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project) => project !== undefined);
  const listdom = products.find((product) => product.slug === "listdom");
  const additional = projects.filter((project) => !featured.some((item) => item.slug === project.slug));
  const listdomVisual = t.listdomVisual.split("\n");

  return <div className="portfolio page-editorial">
    <MotionController />
    <section className="hero hero-editorial" id="top" aria-labelledby="hero-title">
      <div className="hero-editorial-copy flex flex-col justify-between gap-12">
        <div className="hero-meta flex flex-wrap items-center justify-between gap-4"><span className="section-kicker">{t.heroKicker}</span><span className="meta-note">{t.heroTech}</span></div>
        <div className="flex flex-col gap-5"><p className="hero-overline">{t.heroHello}</p><h1 id="hero-title">{t.heroNameFirst}<br /><em>{t.heroNameLast}</em></h1><div className="flex flex-col gap-2"><p className="hero-role">{t.heroRole}</p><p className="hero-statement">{t.heroStatement}</p></div></div>
        <div className="hero-cta-row flex flex-wrap items-center gap-6"><a className="text-action inline-flex items-center gap-2" href="#work">{t.exploreWork} <FiArrowUpRight aria-hidden="true" /></a><SocialLinks locale={locale} /></div>
      </div>
      <div className="hero-editorial-visual flex items-center justify-center"><ExpertiseOrbit experiences={experiences} locale={locale} /><span className="hero-visual-side" aria-hidden="true">{t.heroSide}</span></div>
    </section>

    <section className="content-section about-section" id="about" aria-labelledby="about-heading"><div className="section-frame"><div className="section-intro flex flex-col gap-4"><span className="section-kicker">{t.aboutKicker}</span><h2 id="about-heading">{t.aboutTitleFirst}<br /><em>{t.aboutTitleSecond}</em></h2></div><div className="section-body flex flex-col gap-8"><p className="section-lead">{t.aboutLead}</p><div className="practice-list flex flex-wrap gap-3"><span>{t.practiceOne}</span><span>{t.practiceTwo}</span><span>{t.practiceThree}</span></div></div></div></section>

    <section className="content-section experience-section" id="experience" aria-labelledby="experience-heading"><div className="section-frame"><div className="section-intro flex flex-col gap-4"><span className="section-kicker">{t.experienceKicker}</span><h2 id="experience-heading">{t.experienceTitleFirst}<br /><em>{t.experienceTitleSecond}</em></h2><p className="section-intro-note">{t.experienceIntro}</p></div><div className="section-body"><ExperienceTimeline experiences={experiences} locale={locale} /></div></div></section>

    <section className="content-section work-section" id="work" aria-labelledby="work-heading"><div className="section-frame"><div className="section-intro flex flex-col gap-4"><span className="section-kicker">{t.workKicker}</span><h2 id="work-heading">{t.workTitle}</h2><p className="section-intro-note">{t.workIntro}</p></div><div className="section-body flex flex-col gap-5">
      {listdom && <article className="listdom-feature"><div className="listdom-copy flex flex-col items-start justify-between gap-6"><span className="work-index">{t.listdomIndex}</span><div className="flex flex-col gap-3"><h3>Listdom<span className="accent-dot">.</span></h3><p>{t.listdomDescription}</p></div><a className="action-primary inline-flex items-center gap-2" href={listdom.url} target="_blank" rel="noopener noreferrer">{t.listdomAction} <FiArrowUpRight aria-hidden="true" /></a></div><div className="listdom-visual" aria-hidden="true"><div className="listdom-visual-inner"><span>LISTDOM</span><div className="listdom-map"><i /><i /><i /><i /><i /></div><strong>{listdomVisual[0]}<br />{listdomVisual[1]}</strong></div></div></article>}
      <div className="work-grid">{featured.map((project, index) => <WorkCard key={project.slug} project={project} index={index + 2} locale={locale} />)}</div>
      <details className="more-work"><summary className="flex items-center justify-between gap-4">{t.moreWork} <FiPlus aria-hidden="true" /></summary><div className="more-work-list flex flex-col">{additional.map((project) => {
        const output = project.live_url ?? project.repository_url;
        const content = projectText(project, locale);
        return <div className="more-work-item flex flex-wrap items-center justify-between gap-4" key={project.slug}><div className="flex flex-col gap-1"><strong>{content.name}</strong><span>{content.kind}</span></div>{output && <a href={output} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1">{project.live_url ? t.viewOutput : t.viewSource} <FiArrowUpRight aria-hidden="true" /></a>}</div>;
      })}</div></details>
    </div></div></section>

    <section className="content-section engineering-section" id="engineering" aria-labelledby="engineering-heading"><div className="section-frame"><div className="section-intro flex flex-col gap-4"><span className="section-kicker">{t.engineeringKicker}</span><h2 id="engineering-heading">{t.engineeringTitleFirst}<br /><em>{t.engineeringTitleSecond}</em></h2></div><div className="section-body flex flex-col gap-8"><p className="section-lead">{t.engineeringLead}</p><div className="system-flow grid gap-3" aria-label={t.flowLabel}><div className="system-node flex flex-col gap-3"><FiLayers aria-hidden="true" /><strong>{t.flowInterface}</strong><small>{t.flowInterfaceTech}</small></div><div className="system-node flex flex-col gap-3"><FiServer aria-hidden="true" /><strong>{t.flowServices}</strong><small>{t.flowServicesTech}</small></div><div className="system-node flex flex-col gap-3"><FiSend aria-hidden="true" /><strong>{t.flowDelivery}</strong><small>{t.flowDeliveryTech}</small></div></div></div></div></section>

    <section className="content-section contact-section" id="contact" aria-labelledby="contact-heading"><div className="section-frame"><div className="section-intro flex flex-col gap-4"><span className="section-kicker">{t.contactKicker}</span><h2 id="contact-heading">{t.contactTitleFirst}<br /><em>{t.contactTitleSecond}</em></h2><p className="section-intro-note">{t.contactIntro}</p></div><div className="section-body contact-layout grid gap-10"><ContactForm locale={locale} /><aside className="contact-aside flex flex-col gap-5"><span className="section-kicker">{t.elsewhere}</span><SocialLinks locale={locale} /><a className="text-action inline-flex items-center gap-2" href="/cv">{t.viewCv} <FiArrowUpRight aria-hidden="true" /></a></aside></div></div></section>
  </div>;
}
