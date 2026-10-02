import type { Metadata } from "next";
import { PortfolioPage } from "@/components/portfolio-page";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Boxed portfolio — alternate visual edition",
  description: "An alternate contained presentation of Saman Azizi Siyan's engineering career and selected work.",
  openGraph: { title: "Saman Azizi Siyan — boxed portfolio", description: "An alternate contained presentation of Saman's engineering career and selected work.", url: "/demo-2" },
  alternates: { canonical: "/" },
  robots: { index: false, follow: true },
};

export default function DemoTwo() { return <PortfolioPage boxed />; }
