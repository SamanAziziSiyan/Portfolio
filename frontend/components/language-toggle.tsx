"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LANGUAGE_COOKIE, type Locale } from "@/lib/language";
import { translations } from "@/lib/translations";

type Phase = "idle" | "enter" | "leave";

export function LanguageToggle({ locale }: { locale: Locale }) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");
  const refreshTimer = useRef<number | null>(null);
  const fallbackTimer = useRef<number | null>(null);
  const revealTimer = useRef<number | null>(null);
  const finishTimer = useRef<number | null>(null);
  const startedAt = useRef(0);
  const previousOverflow = useRef<string | null>(null);
  const t = translations[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
    if (phaseRef.current === "enter") {
      if (fallbackTimer.current !== null) window.clearTimeout(fallbackTimer.current);
      const fontsReady = locale === "fa"
        ? Promise.all([document.fonts.load("600 48px Pinar"), document.fonts.load("400 16px IRANSansX")])
        : Promise.resolve();
      void fontsReady.catch(() => { /* Keep the transition usable if a font request fails. */ }).then(() => {
        if (phaseRef.current !== "enter") return;
        const remaining = Math.max(0, 420 - (performance.now() - startedAt.current));
        revealTimer.current = window.setTimeout(() => {
          phaseRef.current = "leave";
          setPhase("leave");
          finishTimer.current = window.setTimeout(() => {
            phaseRef.current = "idle";
            setPhase("idle");
            document.documentElement.style.overflow = previousOverflow.current ?? "";
            previousOverflow.current = null;
          }, 420);
        }, remaining);
      });
    }
  }, [locale]);

  useEffect(() => () => {
    if (refreshTimer.current !== null) window.clearTimeout(refreshTimer.current);
    if (fallbackTimer.current !== null) window.clearTimeout(fallbackTimer.current);
    if (revealTimer.current !== null) window.clearTimeout(revealTimer.current);
    if (finishTimer.current !== null) window.clearTimeout(finishTimer.current);
    phaseRef.current = "idle";
    if (previousOverflow.current !== null) document.documentElement.style.overflow = previousOverflow.current;
  }, []);

  function switchLanguage() {
    if (phaseRef.current !== "idle") return;
    const next: Locale = locale === "en" ? "fa" : "en";
    previousOverflow.current = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.cookie = `${LANGUAGE_COOKIE}=${next}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    phaseRef.current = "enter";
    startedAt.current = performance.now();
    setPhase("enter");
    refreshTimer.current = window.setTimeout(() => router.refresh(), 220);
    fallbackTimer.current = window.setTimeout(() => {
      if (phaseRef.current === "enter") window.location.reload();
    }, 8000);
  }

  return <>
    <button type="button" className="icon-button language-button" onClick={switchLanguage} disabled={phase !== "idle"} aria-label={t.languageSwitch} title={t.languageSwitch} aria-busy={phase !== "idle"}>
      <span dir="auto">{t.languageShort}</span>
    </button>
    {phase !== "idle" && <div className={`language-transition language-transition-${phase}`} role="status" aria-live="polite">
      <div className="language-transition-inner"><span className="language-transition-mark">S<span>.</span>A</span><span>{t.switchingLanguage}</span><span className="language-transition-track"><span /></span></div>
    </div>}
  </>;
}
