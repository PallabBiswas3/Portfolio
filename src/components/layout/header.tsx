"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { Github, Linkedin } from "@/components/brand-icons";
import { navigation, siteConfig } from "@/content/site-config";

export function Header() {
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const sync = () => setLight(document.documentElement.dataset.theme === "light");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) { if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); } }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  function toggleTheme() {
    const theme = light ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem("portfolio-theme", theme); } catch { /* Theme still works without storage. */ }
    setLight(!light);
  }
  return <header className="site-header"><div className="header-inner">
    <Link href="/#home" className="wordmark" onClick={() => setOpen(false)} aria-label="Pallab Biswas home"><span className="monogram">p<span>·</span>b</span><span>Pallab Biswas<span className="wordmark-dot">.</span></span></Link>
    <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([name, href]) => <Link key={name} href={href}>{name}</Link>)}</nav>
    <div className="header-actions">{siteConfig.github && <a className="icon-button social-nav" href={siteConfig.github} aria-label="GitHub profile"><Github size={17} /></a>}{siteConfig.linkedin && <a className="icon-button social-nav" href={siteConfig.linkedin} aria-label="LinkedIn profile"><Linkedin size={17} /></a>}
    <button className="icon-button theme-button" onClick={toggleTheme} aria-label={light ? "Switch to dark theme" : "Switch to light theme"}>{light ? <Moon size={17} /> : <Sun size={17} />}</button>
    {siteConfig.resume && <a className="button small resume-nav" href={siteConfig.resume} download>Résumé <ArrowUpRight size={14} /></a>}
    <button ref={menuButton} className="icon-button menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"}>{open ? <X size={21} /> : <Menu size={21} />}</button></div>
  </div><nav id="mobile-navigation" className={`mobile-nav ${open ? "is-open" : ""}`} aria-label="Mobile navigation" inert={!open}>{navigation.map(([name, href], i) => <Link href={href} key={name} onClick={() => setOpen(false)}><span>{String(i + 1).padStart(2,"0")}</span>{name}<ArrowUpRight size={17} /></Link>)}<Link href="/writing" onClick={() => setOpen(false)}><span>{String(navigation.length + 1).padStart(2,"0")}</span>Writing<ArrowUpRight size={17} /></Link></nav></header>;
}
