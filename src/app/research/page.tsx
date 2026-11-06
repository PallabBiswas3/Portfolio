import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { research, researchInterests } from "@/content/research";
import { siteConfig } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Research",
  description: "Research in optimizer reliability, factual verification, industrial diagnostics, model attribution, multilingual NLP, and network pricing.",
  ...(siteConfig.url && { alternates: { canonical: `${siteConfig.url}/research` } }),
};

export default function ResearchPage() {
  return <main id="main" className="container index-page research-page">
    <Link className="back-link" href="/#research"><ArrowLeft size={16} /> Back to portfolio</Link>
    <header className="index-header">
      <span className="eyebrow">RESEARCH & EXPERIMENTAL WORK</span>
      <h1>What makes a model<br /><span className="muted">worth trusting?</span></h1>
      <p>I study this question across optimization, language models, and industrial signals. My work connects mathematical assumptions to executable experiments, explicit evaluation protocols, and inspectable system behavior.</p>
    </header>
    <div className="research-principles" aria-label="Research approach">
      <div><span className="eyebrow">01 / FRAME</span><h2>Ask a testable question.</h2><p>Identify the failure mode and distinguish a proposed idea from an implemented method.</p></div>
      <div><span className="eyebrow">02 / COMPARE</span><h2>Make the baseline explicit.</h2><p>Use controlled splits, ablations, and reference methods that test the intended claim.</p></div>
      <div><span className="eyebrow">03 / REPORT</span><h2>Keep the limitations visible.</h2><p>Report negative findings, false alarms, and unfinished work alongside promising observations.</p></div>
    </div>
    <section className="research-detail-list" aria-labelledby="current-research">
      <h2 id="current-research">Research directions & current evidence</h2>
      {research.map((item, i) => <article className="research-detail" key={item.slug}>
        <div className="research-detail-top"><span className="eyebrow">R.{String(i + 1).padStart(2, "0")} / {item.topic}</span><span className="status ongoing"><i />{item.status}</span></div>
        <h2>{item.title}</h2>
        <p className="research-question">{item.question}</p>
        <div className="research-detail-grid"><div><h3>Why it matters</h3><p>{item.motivation}</p></div><div><h3>Method</h3><p>{item.methodology}</p></div></div>
        <div className="research-evidence"><h3>Evidence so far</h3><p>{item.observation}</p><h3>Next research step</h3><p>{item.nextStep}</p></div>
        <div className="research-source-links"><Link className="text-link" href={`/projects/${item.slug}`}>Explore the case study <ArrowUpRight size={16} /></Link>{item.source && <a className="text-link" href={item.source}>Repository evidence <ArrowUpRight size={16} /></a>}</div>
      </article>)}
    </section>
    <section className="research-interest-section"><span className="eyebrow">DIRECTIONS OF INTEREST</span><h2>The questions are connected.</h2><div className="interest-list">{researchInterests.map(item => <span key={item}>{item}</span>)}</div></section>
    <section className="research-notes-panel"><div><h2>Research notes</h2><p>Experimental write-ups and engineering lessons will appear in the notebook.</p><Link className="text-link" href="/writing">Visit the notebook</Link></div><div><h2>Publications</h2><p>These are research projects, implementations, and exploratory studies. No peer-reviewed publication is claimed here.</p></div></section>
  </main>;
}
