import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getNotes } from "@/lib/writing";
import { siteConfig } from "@/content/site-config";
import { ReadingProgress } from "@/components/project/reading-progress";
import { TechnicalMarkdown } from "@/components/technical-markdown";
export const dynamicParams = false;
export function generateStaticParams() { return getNotes().map(note => ({ slug: note.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const note = getNotes().find(n => n.slug === slug); if (!note) return {}; return { title: note.title, description: note.description, openGraph: { type: "article", publishedTime: note.date, title: note.title, description: note.description }, ...(siteConfig.url && { alternates: { canonical: `${siteConfig.url}/writing/${slug}` } }) }; }
export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNotes().find(n => n.slug === slug);
  if (!note) notFound();
  return <main id="main" className="container case-study"><ReadingProgress /><Link href="/writing" className="back-link"><ArrowLeft size={16} /> All notes</Link><header className="case-header"><span className="eyebrow">{note.category} / {note.readingTime} MIN READ</span><h1>{note.title}</h1><p>{note.description}</p><time dateTime={note.date}>{new Intl.DateTimeFormat("en-IN", { dateStyle: "long", timeZone: "UTC" }).format(new Date(note.date))}</time></header><div className="case-body"><aside className="case-toc"><span className="eyebrow">IN THIS NOTE</span>{note.toc.map(item => <a href={`#${item.id}`} key={item.id}>{item.title}</a>)}</aside><article><TechnicalMarkdown>{note.content}</TechnicalMarkdown></article></div></main>;
}
