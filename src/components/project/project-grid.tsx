"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { ProjectCardData } from "@/content/projects";
import { ProjectVisual } from "@/components/visuals";
import { Tags } from "@/components/ui";
import { Github } from "@/components/brand-icons";
const filters = ["All work", "AI systems", "Research", "Engineering"] as const;
export function ProjectGrid({ projects }: { projects: ProjectCardData[] }) {
  const [filter, setFilter] = useState<string>("All work");
  const visible = projects.filter(project => filter === "All work" || project.filter === filter);
  return <><div className="project-toolbar"><div className="project-filters" role="group" aria-label="Filter projects">{filters.map(value => <button key={value} onClick={() => setFilter(value)} aria-pressed={filter === value}>{value}{value === "All work" && <span>{String(projects.length).padStart(2,"0")}</span>}</button>)}</div><span className="project-count" aria-live="polite">{visible.length} projects</span></div><div className="project-grid">{visible.map(project => <article className={`project-card ${project.featured ? "featured" : ""}`} key={project.slug}><Link href={`/projects/${project.slug}`} className="project-visual-link" aria-label={`Read ${project.name} case study`}><ProjectVisual kind={project.visual} /></Link><div className="project-card-content"><div className="project-meta"><span>{project.category}</span><span className="project-number">/{project.number}</span></div><div className="project-title-row"><h3><Link href={`/projects/${project.slug}`}>{project.name}</Link></h3><ArrowUpRight size={22} aria-hidden="true" /></div><p>{project.summary}</p><Tags items={project.tags} /><div className="project-card-footer"><span className={`status ${project.status.includes("progress") ? "ongoing" : ""}`}><i />{project.status}</span><div className="project-card-actions">{project.repo && <a href={project.repo} aria-label={`${project.name} source code on GitHub`}><Github size={14} /> Source</a>}<Link href={`/projects/${project.slug}`} aria-label={`Read ${project.name} case study`}>Case study <ArrowRight size={15} /></Link></div></div></div></article>)}</div>{visible.length === 0 && <p>No projects in this category.</p>}</>;
}
