import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site-config";
import { projects } from "@/content/projects";
import { getNotes } from "@/lib/writing";
export default function sitemap(): MetadataRoute.Sitemap { if (!siteConfig.url) return []; return ["", "/research", "/writing", ...projects.map(p => `/projects/${p.slug}`), ...getNotes().map(n => `/writing/${n.slug}`)].map(route => ({ url: `${siteConfig.url}${route}`, changeFrequency: "monthly" as const, priority: route === "" ? 1 : .7 })); }
