"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "@/components/theme-provider";
import type { Locale } from "@/lib/locale";
import { translations } from "@/lib/translations";

export function ThemeToggle({ locale }: { locale: Locale }) {
  const { theme, toggle } = useTheme();
  const label = theme === "dark" ? translations[locale].themeLight : translations[locale].themeDark;
  return <button type="button" className="icon-button theme-button" onClick={toggle} aria-label={label} title={label} aria-pressed={theme === "light"}>
    {theme === "dark" ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
  </button>;
}
