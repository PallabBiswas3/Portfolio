"use client";
import { useState } from "react";
import { FileCheck2, LockKeyhole, ArrowRight } from "lucide-react";
import { checkEvidenceMove, evidenceRounds } from "@/lib/case-experiments";
import { ExperimentLayout } from "./shared";

export default function EvidenceGame() {
  const [round, setRound] = useState(0);
  const [sources, setSources] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("Start by inspecting the evidence. The detective hat is optional.");
  const [passed, setPassed] = useState(false);
  const [complete, setComplete] = useState(false);
  function inspect(source: string) { if (!sources.includes(source)) setSources([...sources, source]); }
  function answer(choice: number) { const result = checkEvidenceMove(round, choice, sources); setPassed(result.success); setFeedback(result.message); }
  function reset() { setRound(0); setSources([]); setPassed(false); setComplete(false); setFeedback("Start by inspecting the evidence. The detective hat is optional."); }
  const controls = <>
    <span className="experiment-kicker">FICTIONAL PUMP / YOUR ROLE: REVIEWER</span>
    <h3>Inspect the evidence</h3>
    <button className={`evidence-card ${sources.includes("manual") ? "is-read" : ""}`} aria-pressed={sources.includes("manual")} onClick={() => inspect("manual")}><FileCheck2 size={18} /><span><strong>M1 · Maintenance manual</strong><small>Review the pump if its temperature exceeds 80°C.</small><em>{sources.includes("manual") ? "Inspected" : "Click to inspect"}</em></span></button>
    <button className={`evidence-card ${sources.includes("sensor") ? "is-read" : ""}`} aria-pressed={sources.includes("sensor")} onClick={() => inspect("sensor")}><FileCheck2 size={18} /><span><strong>S1 · Sensor report</strong><small>The latest reading for the fictional pump is 84°C.</small><em>{sources.includes("sensor") ? "Inspected" : "Click to inspect"}</em></span></button>
    <button className="evidence-card is-locked" onClick={() => setFeedback("Access blocked. This reviewer role cannot retrieve the restricted attachment. Its contents remain hidden.")}><LockKeyhole size={18} /><span><strong>R1 · Restricted attachment</strong><small>Not available to your current role.</small></span></button>
  </>;
  return <ExperimentLayout mission="Solve three evidence-and-permission puzzles. Use only what your role can read." controls={controls} feedback={feedback} success={passed || complete} score={complete ? "3 / 3 solved" : `${round + (passed ? 1 : 0)} / 3 solved`} hint="Inspect M1 and S1. Report what they support, admit what is missing, and ask a human before taking an operational action." onReset={reset}>
    <div className="experiment-board-label">QUESTION {round + 1} / 3</div>
    <h3 className="experiment-question">{complete ? "Evidence detective: certified." : evidenceRounds[round].question}</h3>
    {complete ? <div className="experiment-celebration"><FileCheck2 size={36} /><p>You grounded a claim, refused to invent a fact, and respected an approval boundary. The fictional pump thanks you.</p></div> : <div className="experiment-choices">{evidenceRounds[round].choices.map((choice, index) => <button key={choice} disabled={passed} onClick={() => answer(index)}><span>{String.fromCharCode(65 + index)}</span>{choice}</button>)}</div>}
    {passed && !complete && <button className="button primary experiment-next" onClick={() => { if (round === 2) { setComplete(true); setFeedback("Three good decisions. Trustworthy assistance combines evidence, permission, and an honest boundary around uncertainty."); } else { setRound(round + 1); setPassed(false); setFeedback("Keep the same evidence. A new question does not magically add new facts."); } }}>{round === 2 ? "Finish the case" : "Next question"}<ArrowRight size={15} /></button>}
    <p className="experiment-board-note">These answers are authored teaching examples. No LLM or industrial equipment is connected.</p>
  </ExperimentLayout>;
}
