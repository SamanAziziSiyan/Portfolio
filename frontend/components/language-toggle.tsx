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
  const finishTimer = useRef<number | null>(null);
  const t = translations[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
    if (phaseRef.current === "enter") {
      if (fallbackTimer.current !== null) window.clearTimeout(fallbackTimer.current);
      phaseRef.current = "leave";
      setPhase("leave");
      finishTimer.current = window.setTimeout(() => {
        phaseRef.current = "idle";
        setPhase("idle");
      }, 320);
    }
  }, [locale]);

  useEffect(() => () => {
    if (refreshTimer.current !== null) window.clearTimeout(refreshTimer.current);
    if (fallbackTimer.current !== null) window.clearTimeout(fallbackTimer.current);
    if (finishTimer.current !== null) window.clearTimeout(finishTimer.current);
  }, []);

  function switchLanguage() {
    if (phaseRef.current !== "idle") return;
    const next: Locale = locale === "en" ? "fa" : "en";
    document.cookie = `${LANGUAGE_COOKIE}=${next}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    phaseRef.current = "enter";
    setPhase("enter");
    refreshTimer.current = window.setTimeout(() => router.refresh(), 70);
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
