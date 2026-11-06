"use client";
import dynamic from "next/dynamic";
import { experimentInfo, type ExperimentSlug } from "@/lib/case-experiments";
import "./playgrounds/playgrounds.css";

const loading = () => <div className="experiment-loading" role="status">Preparing the interactive example…</div>;
const games = {
  "sovereign-ai": dynamic(() => import("./playgrounds/evidence-game"), { loading }),
  "name-that-llm": dynamic(() => import("./playgrounds/fingerprint-game"), { loading }),
  "ev-dynamic-pricing": dynamic(() => import("./playgrounds/pricing-game"), { loading }),
  "multilingual-hallucination": dynamic(() => import("./playgrounds/tokenizer-game"), { loading }),
  pbstats: dynamic(() => import("./playgrounds/signal-game"), { loading }),
  "tinyml-anomaly-detection": dynamic(() => import("./playgrounds/anomaly-game"), { loading }),
};
export function CasePlayground({ slug }: { slug: string }) {
  if (!(slug in experimentInfo)) return null;
  const key = slug as ExperimentSlug;
  const info = experimentInfo[key];
  const Game = games[key];
  return <section id="playground" className="case-playground" aria-labelledby="playground-title"><header className="playground-header"><div className="eyebrow">PLAY THE IDEA <span>HANDS-ON / IN YOUR BROWSER</span></div><h2 id="playground-title">{info.title}</h2><p>{info.summary}</p></header><Game /><footer className="playground-footer"><strong>What this explains: {info.concept}.</strong><p>Illustrative learning game with invented data and simplified rules. This is not the project’s model, a live system, or an experimental result.</p></footer></section>;
}
