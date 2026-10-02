"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { SiComposer, SiDocker, SiElementor, SiJavascript, SiLaravel, SiNextdotjs, SiPhp, SiReact, SiTypescript, SiWoocommerce, SiWordpress } from "react-icons/si";
import type { Experience } from "@/lib/data";
import type { Locale } from "@/lib/language";
import { companyName, translations } from "@/lib/translations";

const skills = [
  { name: "PHP", icon: SiPhp, x: 50, y: 6 },
  { name: "Laravel", icon: SiLaravel, x: 68, y: 31 },
  { name: "WordPress", icon: SiWordpress, x: 92, y: 43 },
  { name: "WooCommerce", icon: SiWoocommerce, x: 72, y: 72 },
  { name: "TypeScript", icon: SiTypescript, x: 92, y: 91 },
  { name: "Next.js", icon: SiNextdotjs, x: 31, y: 72 },
  { name: "Docker", icon: SiDocker, x: 48, y: 94 },
  { name: "JavaScript", icon: SiJavascript, x: 9, y: 65 },
  { name: "React", icon: SiReact, x: 29, y: 31 },
  { name: "Elementor", icon: SiElementor, x: 88, y: 15 },
  { name: "Composer", icon: SiComposer, x: 10, y: 17 },
] as const;

function skillPosition(x: number, y: number): CSSProperties {
  return { "--skill-x": `${x}%`, "--skill-y": `${y}%` } as CSSProperties;
}

export function ExpertiseOrbit({ experiences, locale }: { experiences: Experience[]; locale: Locale }) {
  const t = translations[locale];
  const [active, setActive] = useState<string | null>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(false);
  const animationsRef = useRef<Animation[]>([]);

  useEffect(() => {
    const orbit = orbitRef.current;
    if (!orbit) return;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = [...orbit.querySelectorAll<HTMLElement>(".orbit-node")];
    let stopped = false;

    const wander = (node: HTMLElement, x: number, y: number) => {
      if (stopped || motionPreference.matches) return;
      const limit = Math.min(16, orbit.clientWidth * .025);
      const nextX = Math.round((Math.random() * 2 - 1) * limit);
      const nextY = Math.round((Math.random() * 2 - 1) * limit);
      const animation = node.animate([
        { transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` },
        { transform: `translate(-50%, -50%) translate(${nextX}px, ${nextY}px)` },
      ], { duration: 3000 + Math.random() * 4000, easing: "ease-in-out", fill: "forwards" });
      animationsRef.current.push(animation);
      if (activeRef.current) animation.pause();
      animation.onfinish = () => {
        node.style.transform = `translate(-50%, -50%) translate(${nextX}px, ${nextY}px)`;
        animationsRef.current = animationsRef.current.filter((current) => current !== animation);
        animation.cancel();
        wander(node, nextX, nextY);
      };
    };

    const syncMotion = () => {
      if (motionPreference.matches) {
        animationsRef.current.forEach((animation) => animation.cancel());
        animationsRef.current = [];
        nodes.forEach((node) => node.style.removeProperty("transform"));
      } else if (animationsRef.current.length === 0) {
        nodes.forEach((node) => wander(node, 0, 0));
      }
    };

    motionPreference.addEventListener("change", syncMotion);
    syncMotion();
    return () => {
      stopped = true;
      motionPreference.removeEventListener("change", syncMotion);
      animationsRef.current.forEach((animation) => animation.cancel());
      animationsRef.current = [];
      nodes.forEach((node) => node.style.removeProperty("transform"));
    };
  }, []);

  useEffect(() => {
    activeRef.current = active !== null;
    animationsRef.current.forEach((animation) => active ? animation.pause() : animation.play());
  }, [active]);

  const details = skills.map((skill) => ({
    ...skill,
    companies: [...new Set(experiences.filter((experience) => experience.technologies.includes(skill.name)).map((experience) => companyName(experience.company, locale)))],
  }));
  const current = details.find((skill) => skill.name === active);

  return <div ref={orbitRef} className={`expertise-orbit ${active ? "orbit-active" : ""}`} aria-label={t.orbitLabel} onMouseLeave={(event) => { if (!event.currentTarget.contains(document.activeElement)) setActive(null); }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setActive(null); }} onKeyDown={(event) => { if (event.key === "Escape") setActive(null); }}>
    <div className="orbit-ring orbit-ring-outer" aria-hidden="true" />
    <div className="orbit-ring orbit-ring-inner" aria-hidden="true" />
    <div className="orbit-avatar"><Image src="/avatar-github.webp" alt={locale === "fa" ? "تصویر پروفایل سامان عزیزی سیان" : "Saman Azizi Siyan, public GitHub profile photograph"} fill sizes="(max-width: 640px) 170px, 240px" priority /></div>
    <ul className="orbit-skills">
      {details.map(({ name, icon: Icon, x, y, companies }) => <li key={name} className="orbit-skill" style={skillPosition(x, y)}>
        <div className="orbit-node"><button type="button" className="orbit-icon" aria-label={`${name}: ${t.skillUsedAt} ${companies.join("، ")}`} aria-expanded={active === name} aria-controls="orbit-detail" title={`${name} — ${companies.join("، ")}`} onMouseEnter={() => setActive(name)} onFocus={() => setActive(name)} onClick={() => setActive(name)}><Icon aria-hidden="true" /></button></div>
      </li>)}
    </ul>
    <div id="orbit-detail" className="orbit-detail" aria-hidden={!current} aria-live="polite">
      {current && <><div className="orbit-detail-heading"><strong>{current.name}</strong><span>{t.usedAt}</span></div><p>{current.companies.join(" · ")}</p></>}
    </div>
  </div>;
}
