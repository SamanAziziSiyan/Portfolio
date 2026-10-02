import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ThemeProvider } from "@/components/theme-provider";
import { getLocale } from "@/lib/locale";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const title = locale === "fa" ? "سامان عزیزی سیان — مهندس فول‌استک" : "Saman Azizi Siyan — Full Stack Engineer";
  const description = locale === "fa"
    ? "سامان عزیزی سیان، مهندس فول‌استک با بیش از ۱۰ سال تجربه در ساخت محصولات وب، یکپارچه‌سازی‌ها و ابزارهای توسعه."
    : "Saman Azizi Siyan is a Full Stack Engineer with 10+ years of experience building web products, integrations, and developer tools.";
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
    title: { default: title, template: locale === "fa" ? "%s — سامان عزیزی سیان" : "%s — Saman Azizi Siyan" },
    description,
    alternates: { canonical: "/" },
    openGraph: { type: "website", siteName: "Saman Azizi Siyan", title, description },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} dir={locale === "fa" ? "rtl" : "ltr"} id="top" data-theme="dark" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: `(function(){try{var saved=localStorage.getItem('portfolio-theme');var theme=saved==='dark'||saved==='light'?saved:matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.dataset.theme=theme}catch(e){document.documentElement.dataset.theme='dark'}})();` }} /></head>
      <body>
        <ThemeProvider><SiteHeader locale={locale} /><main id="main">{children}</main><SiteFooter locale={locale} /></ThemeProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "Person", name: "Saman Azizi Siyan",
          jobTitle: locale === "fa" ? "مهندس فول‌استک" : "Full Stack Engineer", url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
          sameAs: ["https://github.com/SamanAziziSiyan", "https://www.linkedin.com/in/saman-azizi-siyan/"],
          knowsAbout: ["PHP", "WordPress", "Laravel", "JavaScript", "TypeScript", "React", "Next.js"],
        }).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
