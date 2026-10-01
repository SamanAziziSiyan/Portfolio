import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: "Saman Azizi Siyan — Full Stack Engineer", template: "%s — Saman Azizi Siyan" },
  description: "Engineering across PHP, WordPress, Laravel, JavaScript, TypeScript, React, and Next.js. Explore public source, professional work, and the systems connecting them.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Saman Azizi Siyan", title: "Saman Azizi Siyan — Full Stack Engineer", description: "Engineering the whole picture: public code, professional products, and documented decisions." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" id="top">
      <body>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "Person", name: "Saman Azizi Siyan",
          jobTitle: "Full Stack Engineer", url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
          sameAs: ["https://github.com/SamanAziziSiyan", "https://www.linkedin.com/in/saman-azizi-siyan/"],
          knowsAbout: ["PHP", "WordPress", "Laravel", "JavaScript", "TypeScript", "React", "Next.js"],
        }).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
