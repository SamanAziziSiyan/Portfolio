import Image from "next/image";
import type { CSSProperties } from "react";
import { SiDocker, SiLaravel, SiNextdotjs, SiPhp, SiReact, SiTypescript, SiWoocommerce, SiWordpress } from "react-icons/si";

const skills = [
  { name: "PHP", icon: SiPhp },
  { name: "Laravel", icon: SiLaravel },
  { name: "WordPress", icon: SiWordpress },
  { name: "WooCommerce", icon: SiWoocommerce },
  { name: "TypeScript", icon: SiTypescript },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Docker", icon: SiDocker },
];

export function ExpertiseOrbit({ compact = false }: { compact?: boolean }) {
  return <div className={`expertise-orbit ${compact ? "orbit-compact" : ""}`} aria-label="Core expertise around Saman's GitHub profile photo">
    <div className="orbit-ring orbit-ring-outer" aria-hidden="true" />
    <div className="orbit-ring orbit-ring-inner" aria-hidden="true" />
    <div className="orbit-avatar">
      <Image src="/avatar-github.webp" alt="Saman Azizi Siyan, public GitHub profile photograph" fill sizes="(max-width: 640px) 170px, 240px" priority />
    </div>
    <span className="orbit-crosshair orbit-crosshair-top" aria-hidden="true" />
    <span className="orbit-crosshair orbit-crosshair-bottom" aria-hidden="true" />
    <ul className="orbit-skills">
      {skills.map(({ name, icon: Icon }, index) => <li key={name} className={`orbit-skill orbit-skill-${index + 1}`} style={{ "--orbit-delay": `${index * -.65}s` } as CSSProperties}>
        <span className="orbit-icon" tabIndex={0} aria-label={name} title={name}><Icon aria-hidden="true" /></span>
        <span className="sr-only">{name}</span>
      </li>)}
    </ul>
  </div>;
}
