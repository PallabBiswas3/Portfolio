"use client";
import { useId, useState } from "react";
import { ArrowRight, Layers3 } from "lucide-react";
export function Architecture({ steps }: { steps: { label: string; description: string }[] }) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  return <div className="architecture"><div className="architecture-top"><Layers3 size={17} /><span>Architecture explorer</span><small>Select a stage to explore</small></div><div className="architecture-steps" role="group" aria-label="Architecture stages">{steps.map((step, index) => <div className="architecture-step" key={step.label}><button aria-pressed={selected === index} aria-controls={id} onClick={() => setSelected(index)}><span>0{index + 1}</span>{step.label}</button>{index < steps.length - 1 && <ArrowRight aria-hidden="true" size={15} />}</div>)}</div><div id={id} className="architecture-description" aria-live="polite"><span>0{selected + 1} / {steps[selected].label}</span><p>{steps[selected].description}</p></div></div>;
}
