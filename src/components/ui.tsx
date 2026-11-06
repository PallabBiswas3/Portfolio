import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function SectionHeading({ number, label, title, children }: { number: string; label: string; title: string; children?: ReactNode }) {
  return <div className="section-heading"><div className="eyebrow"><span>{number} /</span> {label}</div><div className="heading-row"><h2>{title}</h2>{children && <div className="section-intro">{children}</div>}</div></div>;
}
export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return <Link className={`text-link ${className}`} href={href}>{children}<ArrowUpRight size={16} aria-hidden="true" /></Link>;
}
export function Tags({ items }: { items: string[] }) { return <div className="tags">{items.map(item => <span key={item}>{item}</span>)}</div>; }
