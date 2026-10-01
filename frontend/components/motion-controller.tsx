"use client";

import { useEffect } from "react";

export function MotionController() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let reveal: IntersectionObserver | undefined;
    if (!reduceMotion) {
      document.documentElement.classList.add("motion-ready");
      const nodes = document.querySelectorAll<HTMLElement>(".reveal");
      reveal = new IntersectionObserver((entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
      nodes.forEach((node) => reveal?.observe(node));
    }

    const sections = document.querySelectorAll<HTMLElement>("main section[id]");
    const links = document.querySelectorAll<HTMLAnchorElement>(".section-nav a[href^='#']");
    const active = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach((link) => {
          const current = link.hash === `#${entry.target.id}`;
          if (current) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }
    }, { rootMargin: "-20% 0px -65% 0px" });
    sections.forEach((section) => active.observe(section));
    return () => { reveal?.disconnect(); active.disconnect(); document.documentElement.classList.remove("motion-ready"); };
  }, []);
  return null;
}
