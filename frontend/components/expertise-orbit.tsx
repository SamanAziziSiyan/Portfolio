"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { SiDocker, SiJavascript, SiLaravel, SiNextdotjs, SiPhp, SiTypescript, SiWoocommerce, SiWordpress } from "react-icons/si";
import type { Experience } from "@/lib/data";

const skills = [
  { name: "PHP", icon: SiPhp, ring: "outer", angle: 0, duration: 64, direction: 1 },
  { name: "Laravel", icon: SiLaravel, ring: "inner", angle: 45, duration: 52, direction: -1 },
  { name: "WordPress", icon: SiWordpress, ring: "outer", angle: 90, duration: 64, direction: 1 },
  { name: "WooCommerce", icon: SiWoocommerce, ring: "inner", angle: 135, duration: 52, direction: -1 },
  { name: "TypeScript", icon: SiTypescript, ring: "outer", angle: 180, duration: 64, direction: 1 },
  { name: "Next.js", icon: SiNextdotjs, ring: "inner", angle: 225, duration: 52, direction: -1 },
  { name: "Docker", icon: SiDocker, ring: "outer", angle: 270, duration: 64, direction: 1 },
  { name: "JavaScript", icon: SiJavascript, ring: "inner", angle: 315, duration: 52, direction: -1 },
] as const;

function orbitalStyle(angle: number, duration: number, direction: number): CSSProperties {
  return {
    "--start-angle": `${angle}deg`,
    "--end-angle": `${angle + 360 * direction}deg`,
    "--counter-start": `${-angle}deg`,
    "--counter-end": `${-angle - 360 * direction}deg`,
    "--orbit-duration": `${duration}s`,
  } as CSSProperties;
}

export function ExpertiseOrbit({ experiences }: { experiences: Experience[] }) {
  const [active, setActive] = useState<string | null>(null);
  const details = skills.map((skill) => ({
    ...skill,
    companies: [...new Set(experiences.filter((experience) => experience.technologies.includes(skill.name)).map((experience) => experience.company))],
  }));
  const current = details.find((skill) => skill.name === active);

  return <div className={`expertise-orbit ${active ? "orbit-active" : ""}`} aria-label="Core expertise around Saman's GitHub profile photo" onMouseLeave={() => setActive(null)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setActive(null); }} onKeyDown={(event) => { if (event.key === "Escape") setActive(null); }}>
    <div className="orbit-ring orbit-ring-outer" aria-hidden="true" />
    <div className="orbit-ring orbit-ring-inner" aria-hidden="true" />
    <div className="orbit-avatar"><Image src="/avatar-github.webp" alt="Saman Azizi Siyan, public GitHub profile photograph" fill sizes="(max-width: 640px) 170px, 240px" priority /></div>
    <ul className="orbit-skills">
      {details.map(({ name, icon: Icon, ring, angle, duration, direction, companies }) => <li key={name} className={`orbit-skill orbit-${ring}`} style={orbitalStyle(angle, duration, direction)}>
        <div className="orbit-node"><button type="button" className="orbit-icon" aria-label={`${name}: used at ${companies.join(", ")}`} aria-expanded={active === name} aria-controls="orbit-detail" title={`${name} — ${companies.join(", ")}`} onMouseEnter={() => setActive(name)} onFocus={() => setActive(name)} onClick={() => setActive(name)}><Icon aria-hidden="true" /></button></div>
      </li>)}
    </ul>
    <div id="orbit-detail" className="orbit-detail" aria-hidden={!current} aria-live="polite">
      {current && <><div className="orbit-detail-heading"><strong>{current.name}</strong><span>USED AT</span></div><p>{current.companies.join(" · ")}</p></>}
    </div>
  </div>;
}
