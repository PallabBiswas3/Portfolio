"use client";
import { useId, useState, type ReactNode } from "react";
import { Flag, Lightbulb, RotateCcw, CheckCircle2 } from "lucide-react";

export function ExperimentLayout({ mission, controls, children, feedback, hint, success, onReset, score }: { mission: string; controls: ReactNode; children: ReactNode; feedback: string; hint: string; success: boolean; onReset: () => void; score?: string }) {
  const [showHint, setShowHint] = useState(false);
  const id = useId();
  return <div className="experiment">
    <div className="experiment-mission"><Flag size={16} aria-hidden="true" /><p><strong>Your mission</strong>{mission}</p>{score && <span className={`experiment-score ${success ? "is-complete" : ""}`}>{score}</span>}</div>
    <div className="experiment-layout"><div className="experiment-controls">{controls}</div><div className="experiment-board">{children}</div></div>
    <div className={`experiment-feedback ${success ? "is-complete" : ""}`} role="status">{success && <CheckCircle2 size={17} aria-hidden="true" />}<p>{feedback}</p></div>
    <div className="experiment-tools"><button onClick={() => setShowHint(!showHint)} aria-expanded={showHint} aria-controls={id}><Lightbulb size={14} />{showHint ? "Hide hint" : "Give me a hint"}</button><button onClick={() => { onReset(); setShowHint(false); }}><RotateCcw size={14} />Reset experiment</button></div>
    {showHint && <p id={id} className="experiment-hint">{hint}</p>}
  </div>;
}
export function RangeControl({ label, value, min, max, step = 1, onChange, display }: { label: string; value: number; min: number; max: number; step?: number; onChange: (value: number) => void; display?: string }) {
  const id = useId();
  return <div className="experiment-range"><label htmlFor={id}>{label}<output>{display ?? value}</output></label><input id={id} type="range" min={min} max={max} step={step} value={value} aria-valuetext={display ?? String(value)} onChange={e => onChange(Number(e.target.value))} /></div>;
}
export function Metric({ label, value, detail }: { label: string; value: ReactNode; detail?: string }) { return <div className="experiment-metric"><span>{label}</span><strong>{value}</strong>{detail && <small>{detail}</small>}</div>; }
export function LinePlot({ values, second, label }: { values: number[]; second?: number[]; label: string }) {
  const all = second ? [...values, ...second] : values;
  const min = Math.min(...all) - .15, max = Math.max(...all) + .15;
  const path = (data: number[]) => data.map((value, i) => `${i ? "L" : "M"}${(12 + i * 376 / (data.length - 1)).toFixed(2)} ${(104 - (value - min) * 86 / (max - min)).toFixed(2)}`).join(" ");
  return <svg viewBox="0 0 400 120" role="img" aria-label={label} className="experiment-line-plot"><path d="M12 22H388M12 62H388M12 103H388" className="experiment-grid" />{second && <path d={path(second)} className="experiment-raw-line" />}<path d={path(values)} className="experiment-signal-line" /></svg>;
}
