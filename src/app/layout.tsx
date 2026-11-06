import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/content/site-config";
import "./globals.css";
import "./home.css";
import "./portfolio.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url || "http://localhost:3000"),
  title: { default: "Pallab Biswas — AI, Research & Engineering", template: "%s | Pallab Biswas" },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name }],
  openGraph: { title: "Pallab Biswas — AI, Research & Engineering", description: siteConfig.description, type: "website", locale: "en_IN", siteName: "Pallab Biswas", ...(siteConfig.url && { url: siteConfig.url }) },
  twitter: { card: "summary_large_image", title: "Pallab Biswas — AI, Research & Engineering", description: siteConfig.description },
  robots: { index: true, follow: true },
};

const themeScript = `try{var t=localStorage.getItem('portfolio-theme');document.documentElement.dataset.theme=t==='light'?'light':'dark'}catch(e){}`;
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-theme="dark" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body id="top"><a href="#main" className="skip-link">Skip to content</a><Header />{children}<Footer /></body></html>;
}
