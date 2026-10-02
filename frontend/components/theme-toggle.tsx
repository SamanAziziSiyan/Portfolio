"use client";

import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  return <button type="button" className="icon-button" onClick={toggle} aria-label={`Switch to ${next} mode`} title={`Switch to ${next} mode`} aria-pressed={theme === "light"}>
    {theme === "dark" ? <FiSun aria-hidden="true" /> : <FiMoon aria-hidden="true" />}
  </button>;
}
