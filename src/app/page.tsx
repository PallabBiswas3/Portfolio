import Link from "next/link";
import type { Metadata } from "next";
import { ArrowDown, ArrowRight, ArrowUpRight, BrainCircuit, Code2, GraduationCap, Mail, Network, Server, Sigma, Sparkles } from "lucide-react";
import { Github } from "@/components/brand-icons";
import { ClassifierGame } from "@/components/classifier-game";
import { Reveal } from "@/components/motion";
import { SectionHeading, Tags, TextLink } from "@/components/ui";
import { ProjectGrid } from "@/components/project/project-grid";
import { siteConfig } from "@/content/site-config";
import { skills } from "@/content/skills";
import { education, experience, community, credentials } from "@/content/experience";
import { achievements, problemSolving } from "@/content/achievements";
import { research, researchInterests } from "@/content/research";
import { getProjectCards } from "@/content/projects";
import { repositoryNotes } from "@/content/open-source";

export const metadata: Metadata = { ...(siteConfig.url && { alternates: { canonical: siteConfig.url } }) };
const skillIcons = { brain: BrainCircuit, network: Network, code: Code2, server: Server, math: Sigma };

export default function Home() {
  const person = { "@context": "https://schema.org", "@type": "Person", name: siteConfig.name, description: siteConfig.description, ...(siteConfig.url && { url: siteConfig.url }), affiliation: { "@type": "CollegeOrUniversity", name: "Indian Institute of Technology Kharagpur" }, sameAs: [siteConfig.github, siteConfig.linkedin].filter(Boolean) };
  return <main id="main">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replace(/</g, "\\u003c") }} />
    <section id="home" className="hero container">
      <div className="hero-topline"><span className="eyebrow"><i className="live-dot" /> AI · RESEARCH · ENGINEERING</span><span className="hero-coordinate">IIT KHARAGPUR / INDIA</span></div>
      <div className="hero-grid">
        <Reveal className="hero-copy">
          <div className="hero-introduction">Hello, I’m Pallab Biswas <span className="small-wave">↗</span></div>
          <h1>Building intelligent<br />systems<span className="accent">.</span><br /><span className="hero-muted">From research to<br />the real world.</span></h1>
          <p className="hero-description">Dual Degree student at <strong>IIT Kharagpur</strong> specializing in Signal Processing and Machine Learning, with a minor in Computer Science. I build across language models, agentic systems, signal processing, and applied ML.</p>
          <div className="hero-buttons"><Link href="#projects" className="button primary">Explore my work <ArrowUpRight size={17} /></Link>{siteConfig.resume ? <a href={siteConfig.resume} className="button" download>Download résumé <ArrowDown size={16} /></a> : <Link className="button secondary" href="#contact">Let’s connect <ArrowRight size={16} /></Link>}<a href={siteConfig.github} className="icon-button" aria-label="GitHub profile"><Github size={20} /></a></div>
          <div className="hero-now"><span className="eyebrow">ON MY DESK</span><p>Agentic RL · Text-to-SQL fine-tuning<br />Evidence-grounded industrial AI</p><a href={siteConfig.linkedin}>Incoming GenAI Research Intern · Pocket FM <ArrowUpRight size={12} /></a></div>
        </Reveal>
        <div id="play" className="hero-play"><ClassifierGame /></div>
      </div>
      <div className="hero-bottom"><div><GraduationCap size={17} /><span>IIT Kharagpur <i>/</i> Electrical Engineering <i>/</i> SPML + CS minor</span></div><a href="#about">SCROLL TO EXPLORE <ArrowDown size={14} /></a></div>
      <div className="work-strip">
        <a href="https://pypi.org/project/PBstats/"><span>OPEN-SOURCE TOOLING</span><strong>PBstats <ArrowUpRight size={14} /></strong><p>Signal processing, packaged for Python.</p></a>
        <Link href="/projects/tinyml-anomaly-detection"><span>FROM MODEL TO DEVICE</span><strong>Python → C++ → ESP32 <ArrowUpRight size={14} /></strong><p>Small networks. Real hardware constraints.</p></Link>
        <Link href="/projects/sovereign-ai"><span>TRUSTWORTHY SYSTEMS</span><strong>Evidence before answers <ArrowUpRight size={14} /></strong><p>Local inference, provenance, and review.</p></Link>
      </div>
    </section>

    <section id="about" className="section container"><Reveal>
      <SectionHeading number="01" label="A LITTLE CONTEXT" title="Curiosity, with an engineering mindset." />
      <div className="about-grid"><div className="about-lead"><p>I’m interested in understanding how intelligent systems work<span className="muted"> — and building reliable implementations of them.</span></p><div className="identity-line"><span className="mini-monogram">PB</span><div><strong>Pallab Biswas</strong><span>AI/ML Researcher · Generative AI Engineer · Software Developer</span></div></div></div><div className="about-detail"><p>My work spans knowledge-graph-enhanced retrieval, LLM fine-tuning, signal analysis, and the engineering around a model. I enjoy taking an idea through experimentation, evaluation, and a usable implementation.</p><p>During a research internship, I worked on FTIR spectral analysis, noise-robust preprocessing, and interpretable classification. I’m now exploring tool-using LLM agents and agentic reinforcement learning alongside my academic BTP work.</p><div className="about-focus"><span>CURRENT FOCUS</span><p>Language models. Meaningful evaluation.<br />AI systems you can reason about.</p></div></div></div>
    </Reveal></section>

    <section id="research" className="section research-section"><div className="container"><Reveal>
      <SectionHeading number="02" label="QUESTIONS WORTH ASKING" title="Research, with a healthy dose of doubt."><p>Understanding what models learn, where they fail, and how to evaluate them.</p></SectionHeading>
      <div className="research-list">{research.map((item, i) => <Link className="research-row" href={`/projects/${item.slug}`} key={item.slug}><span className="research-index">R.0{i + 1}</span><div><div className="eyebrow">{item.topic}</div><h3>{item.title}</h3><p>{item.question}</p></div><div className="research-row-end"><span className="status ongoing"><i />{item.status}</span><ArrowUpRight size={23} /></div></Link>)}</div>
      <div className="research-footer"><div className="interest-list">{researchInterests.slice(0, 4).map(item => <span key={item}>{item}</span>)}</div><TextLink href="/research">Research overview</TextLink></div>
    </Reveal></div></section>

    <section id="projects" className="section container"><Reveal>
      <SectionHeading number="03" label="SELECTED WORK" title="Ideas, made tangible."><p>From research questions to Python packages, embedded models, and deployed systems.</p></SectionHeading>
      <ProjectGrid projects={getProjectCards()} />
      <div className="repository-shelf"><div className="repository-heading"><span className="eyebrow">ALSO IN THE WORKSHOP</span><TextLink href={siteConfig.github}>All public repositories</TextLink></div><div className="repository-grid">{repositoryNotes.map(repo => <article key={repo.name}><span className="eyebrow">{repo.category}</span><h3><a href={repo.url}>{repo.name}<ArrowUpRight size={17} /></a></h3><p>{repo.description}</p><Tags items={repo.tags} /></article>)}</div></div>
    </Reveal></section>

    <section id="skills" className="section skills-section"><div className="container"><Reveal>
      <SectionHeading number="04" label="THE TECHNICAL TOOLKIT" title="Theory meets implementation."><p>The tools change. The fundamentals stay.</p></SectionHeading>
      <div className="skills-list">{skills.map((skill, index) => { const Icon = skillIcons[skill.icon as keyof typeof skillIcons]; return <div className="skill-row" key={skill.title}><div className="skill-heading"><span className="skill-icon"><Icon size={20} /></span><div><h3>{skill.title}</h3><p>{skill.subtitle}</p></div><span className="skill-number">0{index + 1}</span></div><div className="skill-items">{skill.items.map(item => <span key={item}>{item}</span>)}</div></div>; })}</div>
    </Reveal></div></section>

    <section id="experience" className="section container"><Reveal>
      <SectionHeading number="05" label="RESEARCH, EXPERIENCE & EDUCATION" title="Learning deeply. Building deliberately." />
      <div className="education-layout"><div className="education-label"><GraduationCap size={26} /><span>EDUCATION</span>{education.map(item => <div className="education-card" key={item.institution}><h3>{item.institution}</h3><h4>{item.degree}</h4><p>{item.specialization}</p><p>{item.detail}</p></div>)}<div className="credential-list"><span className="eyebrow">LEARNING & RECOGNITION</span>{credentials.map(item => <span key={item}>{item}</span>)}</div></div><div className="timeline">{experience.map(item => <article className="timeline-item" key={item.organization}><div className="timeline-marker" /><span className="eyebrow">{item.period}</span><h3>{item.organization}</h3><h4>{item.role}</h4><p className="timeline-detail">{item.description}</p></article>)}</div></div>
      <div className="community-list"><span className="eyebrow">BEYOND THE CODE</span>{community.map(item => <div key={item.organization}><strong>{item.organization}</strong><span>{item.role}</span><small>{item.period}</small></div>)}</div>
    </Reveal></section>

    <section id="achievements" className="section container achievements-section"><Reveal>
      <SectionHeading number="06" label="PROBLEM-SOLVING MINDSET" title="Good engineering starts with clear thinking." />
      <div className="principles-grid">{problemSolving.map((item, i) => <article key={item.title}><span>0{i + 1}</span><h3>{item.title}</h3><p>{item.detail}</p></article>)}</div>
      <div className="verified-achievements">{achievements.map(item => <article key={item.title}><div><h3>{item.title}</h3><p>{item.detail}</p></div>{item.url && <TextLink href={item.url}>Explore</TextLink>}</article>)}</div>
    </Reveal></section>

    <section className="writing-teaser container"><div><span className="eyebrow"><Sparkles size={14} /> THE NOTEBOOK</span><h2>Thinking out loud. Carefully.</h2><p>Space for research notes, experiments, and engineering lessons.</p></div><TextLink href="/writing">Explore the notebook</TextLink></section>

    <section id="contact" className="contact-section container"><Reveal>
      <div className="eyebrow"><span>07 /</span> LET’S CONNECT</div><div className="contact-grid"><div><h2>Interested in building<br />something <span>intelligent?</span></h2><p>I’m open to meaningful conversations about AI research, machine learning, software engineering, and collaborative technical projects.</p></div><div className="contact-actions"><a href={`mailto:${siteConfig.email}`} className="button primary">Say hello <Mail size={17} /></a><a className="contact-email" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><div className="contact-links"><TextLink href={siteConfig.github}>GitHub</TextLink><TextLink href={siteConfig.linkedin}>LinkedIn</TextLink>{siteConfig.resume && <TextLink href={siteConfig.resume}>Résumé</TextLink>}</div><span className="contact-location"><span className="live-dot" /> {siteConfig.location}</span></div></div>
    </Reveal></section>
  </main>;
}
