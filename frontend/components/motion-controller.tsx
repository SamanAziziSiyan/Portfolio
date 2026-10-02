"use client";

import { useEffect } from "react";

export function MotionController() {
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(".portfolio section[id]");
    const links = document.querySelectorAll<HTMLAnchorElement>(".section-nav a");
    const sectionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach((link) => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }
    }, { rootMargin: "-18% 0px -67% 0px" });
    sections.forEach((section) => sectionObserver.observe(section));

    const timeline = document.querySelector<HTMLElement>(".timeline");
    const track = timeline?.querySelector<HTMLElement>(".timeline-track");
    const entries = [...(timeline?.querySelectorAll<HTMLElement>(".timeline-entry") ?? [])];
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!timeline || !track) return;
      const target = window.innerHeight * .48;
      const trackRect = track.getBoundingClientRect();
      const fraction = trackRect.height > 0 ? Math.max(0, Math.min(1, (target - trackRect.top) / trackRect.height)) : 0;
      timeline.style.setProperty("--timeline-progress", `${(fraction * 100).toFixed(2)}%`);
      const progressBottom = trackRect.top + fraction * trackRect.height;
      let activeIndex = entries.length ? 0 : -1;
      entries.forEach((entry, index) => {
        if (index === 0) return;
        const node = entry.querySelector<HTMLElement>(".timeline-node");
        if (!node) return;
        const nodeRect = node.getBoundingClientRect();
        if (nodeRect.top + nodeRect.height / 2 <= progressBottom) activeIndex = index;
      });
      entries.forEach((entry, index) => {
        entry.classList.toggle("is-visited", index <= activeIndex);
        entry.classList.toggle("is-active", index === activeIndex);
      });
      timeline.classList.add("is-ready");
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    const timelineObserver = timeline ? new ResizeObserver(schedule) : null;
    if (timeline) timelineObserver?.observe(timeline);
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      sectionObserver.disconnect();
      timelineObserver?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
