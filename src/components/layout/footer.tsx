import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function Footer() {
  return <footer className="site-footer container"><div><Link className="footer-name" href="/#home">Pallab Biswas<span>.</span></Link><p>Research-minded. Engineering-driven.</p></div><div className="footer-links"><Link href="/research">Research <ArrowUpRight size={13} /></Link><Link href="/writing">Writing <ArrowUpRight size={13} /></Link><a href="#top">Back to top ↑</a></div><span className="copyright">© {new Date().getFullYear()} Pallab Biswas</span></footer>;
}
