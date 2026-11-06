"use client";
import { useState } from "react";
import { Bot, ShieldCheck, TriangleAlert } from "lucide-react";
import { assessThreshold, reconstructionError, sensorExamples } from "@/lib/case-experiments";
import { ExperimentLayout, Metric, RangeControl } from "./shared";

export default function AnomalyGame() {
  const [distance, setDistance] = useState(40);
  const [jitter, setJitter] = useState(2);
  const [threshold, setThreshold] = useState(.3);
  const error = reconstructionError(distance,jitter);
  const alarm = error > threshold;
  const cases = assessThreshold(threshold);
  const correct = cases.filter(sample=>sample.correct).length;
  const won = correct === cases.length;
  return <ExperimentLayout mission="Find an alarm threshold that labels all three reference cases correctly. Inspect readings with the presets or sliders." success={won} score={`${correct} / 3 reference cases`} feedback={won ? "Bubble protected. Your threshold catches the surprise visitor and tolerates the normal wobble. A real deployment needs broader validation than these three invented cases." : cases[1].alarm ? "Too jumpy! The robot is calling a normal wobble an anomaly. Raise the threshold to reduce false alarms." : "Too relaxed! The surprise visitor slips through. Lower the threshold to catch a larger reconstruction error."} hint="Try a threshold around 0.02. A very low threshold can flag harmless variation; a very high one can miss a real deviation." onReset={()=>{setDistance(40);setJitter(2);setThreshold(.3);}} controls={<><span className="experiment-kicker">INSPECT A SENSOR READING</span><div className="experiment-presets">{sensorExamples.map(sample=><button key={sample.name} onClick={()=>{setDistance(sample.distance);setJitter(sample.jitter);}}>{sample.name}</button>)}</div><RangeControl label="Distance" value={distance} min={0} max={100} display={`${distance} cm`} onChange={setDistance} /><RangeControl label="Jitter" value={jitter} min={0} max={10} step={.5} display={jitter.toFixed(1)} onChange={setJitter} /><RangeControl label="Alarm threshold" value={threshold} min={0} max={.35} step={.005} display={threshold.toFixed(3)} onChange={setThreshold} /><p className="experiment-control-note">Lower threshold → more sensitive. Higher threshold → fewer alarms, including some you may want to catch.</p></>}>
    <div className="experiment-board-label">MEASURED READING VS A FIXED TYPICAL PATTERN</div>
    <div className={`robot-status ${alarm?"is-alarm":""}`}><Bot size={43} /><div><h3>{alarm?"Something looks unusual.":"Inside the calm bubble."}</h3><p>{alarm?"A deviation flag is not a diagnosis.":"This reading falls below your alarm threshold."}</p></div>{alarm?<TriangleAlert size={24}/>:<ShieldCheck size={24}/>}</div>
    <div className="feature-comparison">{[{name:"Normalized distance",value:distance/100,typical:.4},{name:"Normalized jitter",value:jitter/10,typical:.2}].map(feature=><div key={feature.name}><strong>{feature.name}</strong><div><span>Measured</span><i style={{width:`${feature.value*100}%`}} /></div><div className="typical-feature"><span>Typical</span><i style={{width:`${feature.typical*100}%`}} /></div></div>)}</div>
    <div className="experiment-metrics two-metrics"><Metric label="Mean squared difference" value={error.toFixed(4)} /><Metric label="Alarm threshold" value={threshold.toFixed(3)} detail={alarm?"error exceeds threshold":"error is within threshold"} /></div>
    <div className="sensor-reference-cases">{cases.map(sample=><article key={sample.name} className={sample.correct?"is-correct":"is-miss"}><strong>{sample.name}</strong><span>{sample.alarm?"Alarm":"No alarm"}</span><small>{sample.correct?"Correct in this toy set":sample.abnormal?"Missed anomaly":"False alarm"}</small></article>)}</div>
    <p className="experiment-board-note">This two-feature sketch compares against a fixed typical pattern, not a trained autoencoder. The project uses four normalized features and a learned reconstruction; this game only illustrates error scoring and threshold trade-offs.</p>
  </ExperimentLayout>;
}
