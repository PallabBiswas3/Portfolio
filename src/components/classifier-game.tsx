"use client";

import { useId, useState } from "react";
import { ArrowRight, Bot, Cat, Lightbulb, RotateCcw, Sparkles } from "lucide-react";
import { challenges, createSamples, evaluateClassifier, predict } from "@/lib/classifier-game";

export function ClassifierGame() {
  const [level, setLevel] = useState(0);
  const [slope, setSlope] = useState(0);
  const [bias, setBias] = useState(15);
  const [interaction, setInteraction] = useState(false);
  const [hint, setHint] = useState(false);
  const [finished, setFinished] = useState(false);
  const id = useId();
  const samples = createSamples(level);
  const model = { slope, bias, interaction };
  const { correct, total, accuracy } = evaluateClassifier(samples, model);
  const solved = accuracy >= 90;
  const challenge = challenges[level];
  const px = (x: number) => 27 + x * 3.06;
  const py = (y: number) => 193 - y * 1.6;

  function reset(next = level) {
    setLevel(next); setSlope(0); setBias(15); setInteraction(false); setHint(false); setFinished(false);
  }
  function advance() {
    if (!solved) return;
    if (level < challenges.length - 1) reset(level + 1);
    else setFinished(true);
  }

  return <div className="classifier-game" aria-labelledby={`${id}-title`}>
    <div className="game-top"><span><span className="live-dot" /> THE TINY CLASSIFIER</span><span>PLAY / 0{level + 1}</span></div>
    <div className="game-heading"><div><h2 id={`${id}-title`}>Cats vs. bots<span>.</span></h2><p>Be the model. Tune the boundary. Outsmart the cats.</p></div><span className="game-mascot"><Bot size={27} /></span></div>
    <div className="game-round"><strong>{challenge.title}</strong><span>{level + 1} / 3</span></div>
    <p className="game-story">{challenge.subtitle}</p>
    <div className="game-plot-wrap">
      <svg className="game-plot" viewBox="0 0 360 225" role="img" aria-label={`${total} synthetic samples. Circles are cats; squares are bots. Red rings mark classification mistakes. The shaded area is predicted as bot.`}>
        <defs><clipPath id={`${id}-clip`}><rect x="27" y="33" width="306" height="160" rx="3" /></clipPath></defs>
        <g clipPath={`url(#${id}-clip)`}>
          {Array.from({ length: 100 }, (_, i) => { const x = (i % 10) * 10; const y = Math.floor(i / 10) * 10; return <rect key={i} x={px(x)} y={py(y + 10)} width="30.7" height="16.1" fill={predict({ x: x + 5, y: y + 5 }, model) ? "var(--game-bot-fill)" : "var(--game-cat-fill)"} />; })}
          {[0, 25, 50, 75, 100].map(value => <g key={value}><line x1={px(value)} y1="33" x2={px(value)} y2="193" className="game-grid-line" /><line x1="27" y1={py(value)} x2="333" y2={py(value)} className="game-grid-line" /></g>)}
          {!interaction && <line x1={px(0)} y1={py(bias)} x2={px(100)} y2={py(slope * 100 + bias)} className="game-boundary" />}
          {interaction && bias === 50 && <><line x1={px(50)} y1="33" x2={px(50)} y2="193" className="game-boundary" /><line x1="27" y1={py(50)} x2="333" y2={py(50)} className="game-boundary" /></>}
          {samples.map((sample, i) => <g key={i}>{predict(sample, model) !== sample.label && <circle cx={px(sample.x)} cy={py(sample.y)} r="7.5" className="game-mistake" />}{sample.label ? <rect x={px(sample.x) - 3.5} y={py(sample.y) - 3.5} width="7" height="7" rx="1" className="game-bot-point" /> : <circle cx={px(sample.x)} cy={py(sample.y)} r="3.8" className="game-cat-point" />}</g>)}
        </g>
        <text x="27" y="20" className="game-axis-label">CHAOS LEVEL ↑</text><text x="333" y="213" textAnchor="end" className="game-axis-label">COFFEE INTAKE →</text>
      </svg>
      <div className="game-legend"><span><Cat size={12} /><i className="cat-key" /> Cats</span><span><Bot size={12} /><i className="bot-key" /> Bots</span><span><i className="mistake-key" /> Mistake</span></div>
    </div>
    <div className="game-controls">
      <div className={`game-slider ${interaction ? "is-disabled" : ""}`}><label htmlFor={`${id}-slope`}>Slope <output>{slope.toFixed(2)}</output></label><input id={`${id}-slope`} type="range" min="-1" max="1" step="0.05" value={slope} disabled={interaction || finished} onChange={event => setSlope(Number(event.target.value))} /></div>
      <div className="game-slider"><label htmlFor={`${id}-bias`}>{interaction ? "Feature threshold" : "Bias"} <output>{interaction ? (bias - 50) * 20 : bias}</output></label><input id={`${id}-bias`} type="range" min="0" max="100" step="1" value={bias} aria-valuetext={interaction ? `Interaction threshold ${(bias - 50) * 20}` : `Bias ${bias}`} disabled={finished} onChange={event => setBias(Number(event.target.value))} /></div>
    </div>
    {level === 2 && <button className="game-feature" aria-pressed={interaction} disabled={finished} onClick={() => { setInteraction(!interaction); setBias(50); }}><Sparkles size={13} />{interaction ? "Interaction feature enabled: (x − 50)(y − 50)" : "Plot twist? Add an interaction feature"}</button>}
    <div className="game-score"><div><strong>{accuracy}<span>%</span></strong><span>{correct}/{total} classified correctly</span></div><div className="game-score-track" role="progressbar" aria-label="Toy classification accuracy" aria-valuemin={0} aria-valuemax={100} aria-valuenow={accuracy}><span style={{ width: `${accuracy}%` }} /></div></div>
    <div className={`game-feedback ${solved ? "solved" : ""}`} aria-live="polite">{finished ? "Certified cat whisperer. No GPUs were harmed." : solved ? challenge.lesson : hint ? challenge.hint : "Aim for 90%. The red rings are very polite complaints."}</div>
    <div className="game-actions"><button className="game-hint" onClick={() => setHint(!hint)} aria-pressed={hint}><Lightbulb size={13} />{hint ? "Hide hint" : "Need a hint?"}</button><button className="icon-button" onClick={() => reset(finished ? 0 : level)} aria-label={finished ? "Play again from the first round" : "Reset this round"}><RotateCcw size={14} /></button><button className="button small game-next" disabled={!solved} onClick={finished ? () => reset(0) : advance}>{finished ? "Play again" : level === 2 ? "Claim cat degree" : "Next round"}<ArrowRight size={13} /></button></div>
    <p className="game-disclaimer">Synthetic toy data · hand-tuned classifier · runs in your browser</p>
  </div>;
}
