import Link from "next/link";
import { ArrowLeft } from "lucide-react";
export default function NotFound() { return <main id="main" className="container not-found"><span className="eyebrow">404 / OUTSIDE THE EMBEDDING SPACE</span><h1>A little off course<span>.</span></h1><p>This page doesn’t exist. There’s plenty to explore back at the portfolio.</p><Link href="/" className="button primary"><ArrowLeft size={17} /> Back to home</Link></main>; }
