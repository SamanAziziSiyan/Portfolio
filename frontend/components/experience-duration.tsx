"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/lib/language";
import { currentMonth, formatExperienceDuration } from "@/lib/experience-duration";

export function ExperienceDuration({ startDate, endDate, initialMonth, locale }: { startDate: string; endDate: string | null; initialMonth: string; locale: Locale }) {
  const [asOfMonth, setAsOfMonth] = useState(initialMonth);

  useEffect(() => {
    if (endDate) return;

    const refresh = () => setAsOfMonth(currentMonth());
    const initialRefresh = window.setTimeout(refresh, 0);
    const timer = window.setInterval(refresh, 60_000);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      window.clearTimeout(initialRefresh);
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [endDate]);

  return <span className="timeline-duration">{formatExperienceDuration(startDate, endDate, asOfMonth, locale)}</span>;
}
