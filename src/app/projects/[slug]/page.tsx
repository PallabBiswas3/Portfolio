import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ArrowUpRight, Info } from "lucide-react";
import { projects } from "@/content/projects";
import { siteConfig } from "@/content/site-config";
import { Architecture } from "@/components/project/architecture";
import { ProjectVisual } from "@/components/visuals";
import { Tags } from "@/components/ui";
import { ReadingProgress } from "@/components/project/reading-progress";
import { TechnicalMarkdown } from "@/components/technical-markdown";
import { CasePlayground } from "@/components/project/case-playground";

export const dynamicParams = false;
export function generateStaticParams() { return projects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) return {};
  return { title: project.name, description: project.summary, openGraph: { title: `${project.name} — Pallab Biswas`, description: project.summary }, ...(siteConfig.url && { alternates: { canonical: `${siteConfig.url}/projects/${project.slug}` } }) };
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return <main id="main" className="case-study container">
    <ReadingProgress />
    <Link href="/#projects" className="back-link"><ArrowLeft size={16} /> All projects</Link>
    <header className="case-header">
      <div className="eyebrow">PROJECT {project.number} <span>/</span> {project.category}</div>
      <h1>{project.name}<span>.</span></h1>
      <h2>{project.title}</h2><p>{project.summary}</p>
      <div className="case-meta"><Tags items={project.tags} /><span className="status ongoing"><i />{project.status}</span></div>
      <a href="#playground" className="button primary case-play-link">Play the idea <ArrowRight size={16} /></a>
      <div className="case-external">
        {project.repo && <a href={project.repo}>Repository <ArrowUpRight size={16} /></a>}
        {project.demo && <a href={project.demo}>Live demo <ArrowUpRight size={16} /></a>}
        {project.documentation && <a href={project.documentation}>Documentation <ArrowUpRight size={16} /></a>}
      </div>
    </header>
    <div className="case-visual"><ProjectVisual kind={project.visual} /></div>
    <div className="case-body">
      <aside className="case-toc"><span className="eyebrow">IN THIS CASE STUDY</span><a href="#playground">Play the idea</a><a href="#architecture">Architecture</a>{project.sections.map((section, i) => <a key={section.title} href={`#section-${i}`}>{section.title}</a>)}</aside>
      <div className="case-content">
        <div className="content-note"><Info size={18} /><p>{project.note}</p></div>
        <CasePlayground key={project.slug} slug={project.slug} />
        <section id="architecture"><div className="eyebrow">SYSTEM VIEW</div><h2>{project.filter === "Research" ? "The investigation pipeline" : "How the pieces connect"}</h2><p className="muted">A conceptual view of the workflow described in this project.</p><Architecture steps={project.pipeline} /></section>
        {project.sections.map((section, i) => <section id={`section-${i}`} key={section.title} className="prose-section">
          <span className="eyebrow">0{i + 1}</span><h2>{section.title}</h2>
          {section.paragraphs.map(p => <p key={p}>{p}</p>)}
          {section.bullets && <ul>{section.bullets.map(b => <li key={b}>{b}</li>)}</ul>}
          {section.result && <div className="result-block"><span>{section.result.value}<span>{section.result.unit}</span></span><div><strong>{section.result.label}</strong><p>{section.result.context}</p></div></div>}
          {section.markdown && <TechnicalMarkdown>{section.markdown}</TechnicalMarkdown>}
          {section.image && <figure className="case-screenshot"><Image src={section.image.src} alt={section.image.alt} width={section.image.width} height={section.image.height} sizes="(max-width: 900px) 100vw, 850px" /><figcaption>{section.image.caption}</figcaption></figure>}
        </section>)}
      </div>
    </div>
    <Link className="next-project" href={`/projects/${next.slug}`}><div><span className="eyebrow">CONTINUE EXPLORING</span><h2>{next.name}</h2></div><ArrowRight size={32} /></Link>
  </main>;
}
