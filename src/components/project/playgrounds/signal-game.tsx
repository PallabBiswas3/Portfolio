"use client";
import { useState } from "react";
import { AudioLines, ArrowRight } from "lucide-react";
import { dominantBin, makeSignal, processSignal, spectrum } from "@/lib/case-experiments";
import { ExperimentLayout, LinePlot, RangeControl } from "./shared";

export default function SignalGame() {
  const [round, setRound] = useState(0);
  const [noise, setNoise] = useState(.65);
  const [removeOffset, setRemoveOffset] = useState(false);
  const [smooth, setSmooth] = useState(false);
  const [answer, setAnswer] = useState<number | null>(null);
  const [message, setMessage] = useState("The tallest bar may be an offset, not the repeating note. Try centering the signal.");
  const frequency = round === 0 ? 3 : 7;
  const raw = makeSignal(frequency, noise);
  const processed = processSignal(raw, removeOffset, smooth);
  const amplitudes = spectrum(processed);
  const peak = dominantBin(amplitudes);
  const solved = removeOffset && answer === frequency;
  function reset() { setRound(0); setNoise(.65); setRemoveOffset(false); setSmooth(false); setAnswer(null); setMessage("The tallest bar may be an offset, not the repeating note. Try centering the signal."); }
  function choose(value: number) { setAnswer(value); setMessage(!removeOffset ? "Center the signal first. The large zero-frequency bar is a constant offset, not the hidden oscillation." : value === frequency ? "Note found. The peak’s position tells you how many cycles fit in this observation window. The zero-frequency offset has been removed." : "Not quite. Read the tallest nonzero-frequency bar after removing the offset; its horizontal position is the note."); }
  return <ExperimentLayout mission="Remove the constant offset and identify the hidden note in two synthetic signals." success={solved} score={`Signal ${round + 1} / 2`} feedback={message} hint="Enable Remove DC offset. On the first signal, choose 3 cycles; on the second, choose 7 cycles. Smoothing is optional and can also attenuate signal detail." onReset={reset} controls={<><span className="experiment-kicker">BUILD A TINY PROCESSING PIPELINE</span><RangeControl label="Noise level" value={noise} min={0} max={1} step={.05} display={noise.toFixed(2)} onChange={value => { setNoise(value); setAnswer(null); }} /><label className="experiment-checkbox"><input type="checkbox" checked={removeOffset} onChange={e => { setRemoveOffset(e.target.checked); setAnswer(null); setMessage(e.target.checked ? "The mean is removed. Now read the frequency of the tallest spectrum bar." : "The offset is back. Notice how the zero-frequency component grows."); }} /><span><strong>Remove DC offset</strong><small>Subtract the average value.</small></span></label><label className="experiment-checkbox"><input type="checkbox" checked={smooth} onChange={e => { setSmooth(e.target.checked); setAnswer(null); }} /><span><strong>Three-sample smoothing</strong><small>Average nearby samples; it can also soften the desired signal.</small></span></label><div className="signal-pipeline"><span>RAW</span><ArrowRight size={12} /><span>{removeOffset ? "CENTER" : "KEEP OFFSET"}</span><ArrowRight size={12} /><span>SPECTRUM</span></div></>}>
    <div className="experiment-board-label"><AudioLines size={15} /> 64 INVENTED SAMPLES / ONE OBSERVATION WINDOW</div>
    <div className="signal-chart-caption"><span>Processed signal</span><span>Original signal</span></div><LinePlot values={processed} second={raw} label="Synthetic signal before and after the selected processing steps" />
    <div className="spectrum-heading"><strong>One-sided amplitude spectrum</strong><span>Current peak: {peak} {peak === 0 ? "(DC offset)" : "cycles"}</span></div>
    <svg className="experiment-spectrum" viewBox="0 0 400 135" role="img" aria-label={`Amplitude spectrum. The tallest bar is at ${peak} cycles per observation window.`}>{amplitudes.map((amplitude,i)=>{const height=amplitude/Math.max(1.6,...amplitudes)*95;return <g key={i}><rect x={13+i*29} y={(110-height).toFixed(2)} width="15" height={Math.max(.5,height).toFixed(2)} rx="2" className={i===peak?"spectrum-peak":"spectrum-bar"} /><text x={20.5+i*29} y="127" textAnchor="middle">{i}</text></g>;})}</svg>
    <fieldset className="experiment-fieldset"><legend>Which note is hiding here?</legend><div className="experiment-choice-pair three-choices">{[0,3,7].map(value=><button key={value} aria-pressed={answer===value} onClick={()=>choose(value)}>{value===0?"Only an offset":`${value} cycles`}</button>)}</div></fieldset>
    {solved && <button className="button primary experiment-next" onClick={()=>{setRound(round===0?1:0);setAnswer(null);setRemoveOffset(false);setSmooth(false);setMessage("New signal, same idea. Remove the offset, inspect the spectrum, and find the note.");}}>{round===0?"Try the second signal":"Play the first signal again"}<ArrowRight size={15} /></button>}
    <p className="experiment-board-note">A small direct Fourier transform illustrates frequency analysis. Frequencies are cycles per window, not Hz; noise and signals are synthetic. These controls do not execute PBstats itself.</p>
  </ExperimentLayout>;
}
