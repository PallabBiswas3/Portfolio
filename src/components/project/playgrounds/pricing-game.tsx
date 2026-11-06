"use client";
import { useState } from "react";
import { CarFront, Zap } from "lucide-react";
import { simulateCharging } from "@/lib/case-experiments";
import { ExperimentLayout, Metric, RangeControl } from "./shared";

export default function PricingGame() {
  const [price, setPrice] = useState(3);
  const [capacity, setCapacity] = useState(6);
  const [rival, setRival] = useState(6);
  const result = simulateCharging(price, capacity, rival);
  return <ExperimentLayout mission="Earn at least 24 play credits while keeping the queue at two drivers or fewer." score={result.won ? "Goal reached" : "Try a trade-off"} success={result.won} feedback={result.won ? "Nice balance. You earned enough without letting the queue take over. Try changing the other station’s price to see why a good decision depends on its surroundings." : result.queue > 2 ? "Your charging café is popular… a little too popular. Raise the price or add capacity to reduce the queue." : "A quiet station is not always a successful one. Try attracting more drivers or adjusting what each charging session earns."} hint="With the other station at 6 credits, try your price at 6 and capacity at 6. Then explore what changes when the rival gets cheaper." onReset={() => { setPrice(3); setCapacity(6); setRival(6); }} controls={<><span className="experiment-kicker">YOU RUN STATION A</span><RangeControl label="Your price" value={price} min={1} max={10} display={`${price} play credits`} onChange={setPrice} /><RangeControl label="Available chargers" value={capacity} min={3} max={8} onChange={setCapacity} /><RangeControl label="Other station’s price" value={rival} min={2} max={10} display={`${rival} play credits`} onChange={setRival} /><p className="experiment-control-note">The invented demand rule sends fewer drivers to you as your price rises, and more as the other station gets expensive.</p></>}>
    <div className="experiment-board-label">ONE TOY ARRIVAL WINDOW / 12 POTENTIAL DRIVERS</div>
    <div className="charging-station"><div className="charging-station-heading"><Zap size={22} /><h3>Your charging café</h3><span>{result.arrivals} arrivals</span></div><div className="charging-bays">{Array.from({ length: capacity }, (_, i) => <div className={i < result.served ? "is-occupied" : ""} key={i}><CarFront size={24} /><small>{i < result.served ? "Charging" : "Available"}</small></div>)}</div><div className="charging-queue"><span>QUEUE</span>{result.queue ? Array.from({ length: result.queue }, (_, i) => <CarFront size={21} key={i} />) : <p>No waiting drivers. Excellent parking karma.</p>}</div></div>
    <div className="experiment-metrics"><Metric label="Charging" value={`${result.served} / ${capacity}`} /><Metric label="Waiting" value={result.queue} detail="target: no more than 2" /><Metric label="Revenue" value={result.revenue} detail="play credits; target ≥24" /></div>
    <p className="experiment-board-note">A simplified demand-and-capacity game. Revenue is not profit, and this is not the repository’s traffic, replicator, or equilibrium solver.</p>
  </ExperimentLayout>;
}
