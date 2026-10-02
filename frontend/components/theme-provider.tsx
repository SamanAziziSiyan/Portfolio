"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type Theme = "dark" | "light";
const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({ theme: "dark", toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const transitionTimer = useRef<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const savedTheme = () => {
      try {
        const saved = window.localStorage.getItem("portfolio-theme");
        return saved === "dark" || saved === "light" ? saved : null;
      } catch { return null; }
    };
    const sync = () => {
      const next = savedTheme() ?? (media.matches ? "light" : "dark");
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };
    sync();
    media.addEventListener("change", sync);
    window.addEventListener("storage", sync);
    return () => {
      media.removeEventListener("change", sync);
      window.removeEventListener("storage", sync);
      if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current);
      document.documentElement.classList.remove("theme-changing");
    };
  }, []);

  const toggle = useCallback(() => {
    document.documentElement.classList.add("theme-changing");
    if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current);
    const current = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { window.localStorage.setItem("portfolio-theme", next); } catch { /* Theme still works when storage is unavailable. */ }
    setTheme(next);
    transitionTimer.current = window.setTimeout(() => document.documentElement.classList.remove("theme-changing"), 460);
  }, []);

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export function useTheme() { return useContext(ThemeContext); }
