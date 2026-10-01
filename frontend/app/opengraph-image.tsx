import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 70, background: "#132620", color: "#f2f1e9", fontFamily: "Georgia" }}><div style={{ fontSize: 25, letterSpacing: 5, color: "#c9e7d4" }}>SAMAN AZIZI SIYAN / ENGINEERING PORTFOLIO</div><div style={{ display: "flex", flexDirection: "column", fontSize: 100, lineHeight: 1.05, letterSpacing: -4 }}><span>Engineering</span><span>the whole picture<span style={{ color: "#ca593e" }}>.</span></span></div><div style={{ fontSize: 25, color: "#c9e7d4" }}>PHP · WORDPRESS · LARAVEL · TYPESCRIPT · NEXT.JS</div></div>, size);
}
