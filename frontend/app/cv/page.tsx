import type { Metadata } from "next";
import { getExperiences } from "@/lib/data";
import { getLocale } from "@/lib/locale";
import { experienceText } from "@/lib/portfolio-fa";
import { translations } from "@/lib/translations";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return {
    title: locale === "fa" ? "رزومه" : "CV",
    description: locale === "fa" ? "سوابق حرفه‌ای و نمونه‌کارهای منتخب سامان عزیزی سیان." : "Professional experience and selected engineering work by Saman Azizi Siyan.",
    alternates: { canonical: "/cv" },
  };
}

export default async function CvPage() {
  const [experiences, locale] = await Promise.all([getExperiences(), getLocale()]);
  const t = translations[locale];
  return <div className="cv-page page-pad">
    <span className="eyebrow">{t.cvEyebrow}</span>
    <h1>{locale === "fa" ? "سامان عزیزی سیان" : "Saman Azizi Siyan"}</h1>
    <p>{t.cvIntro}</p>
    <div className="cv-actions"><a href="/Saman-Azizi-Siyan-CV.pdf" download>{t.cvDownload}</a><a href="/Saman-Azizi-Siyan-CV.pdf" target="_blank" rel="noopener noreferrer">{t.cvView}</a></div>
    <article className="cv-sheet"><h2>{t.cvExperience}</h2><p>{t.cvNote}</p>
      {experiences.map((experience) => {
        const content = experienceText(experience, locale);
        return <div className="cv-entry" key={`${experience.company}-${experience.role}`}><strong>{content.company}</strong><span>{content.role} · {content.period}</span><p>{content.summary}</p></div>;
      })}
      <h3>{t.cvOutputs}</h3><p><a href="https://listdom.net">Listdom</a> · <a href="https://www.rtl-theme.com/blogina-wordpress-theme/">Blogina</a> · <a href="https://www.rtl-theme.com/serione-wordpress-theme/">Serione</a></p><p>{t.cvRights}</p>
    </article>
  </div>;
}
