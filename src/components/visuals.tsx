export function NeuralVisual({ compact = false }: { compact?: boolean }) {
  const points = Array.from({ length: 100 }, (_, i) => {
    const phi = Math.acos(1 - 2 * ((i + 0.5) / 100));
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    return { x: 250 + Math.cos(theta) * Math.sin(phi) * 168, y: 230 + Math.cos(phi) * 168, z: Math.sin(theta) * Math.sin(phi) };
  });
  return <svg viewBox="0 0 500 470" className={`neural-visual ${compact ? "compact" : ""}`} fill="none" aria-hidden="true">
    <defs><radialGradient id={compact ? "glow-small" : "glow"}><stop stopColor="#4389ff" stopOpacity=".16" /><stop offset="1" stopColor="#4389ff" stopOpacity="0" /></radialGradient><linearGradient id={compact ? "orbit-small" : "orbit"}><stop stopColor="#638bff" stopOpacity=".1" /><stop offset=".5" stopColor="#8bb0ff" stopOpacity=".7" /><stop offset="1" stopColor="#638bff" stopOpacity=".1" /></linearGradient></defs>
    <circle cx="250" cy="230" r="223" fill={`url(#${compact ? "glow-small" : "glow"})`} />
    <g className="sphere-lines">{points.map((p, i) => points.slice(i + 1).map((q, j) => { const dist = Math.hypot(p.x - q.x, p.y - q.y); return dist < 64 && dist > 23 && Math.abs(p.z - q.z) < .65 ? <path key={`${i}-${j}`} d={`M${p.x.toFixed(2)} ${p.y.toFixed(2)}L${q.x.toFixed(2)} ${q.y.toFixed(2)}`} stroke="#739bfa" strokeWidth=".6" opacity={0.12 + (p.z + 1) * .13} /> : null; }))}</g>
    {[0, 32, -32].map((angle) => <ellipse key={angle} cx="250" cy="230" rx="202" ry="61" transform={`rotate(${angle} 250 230)`} stroke={`url(#${compact ? "orbit-small" : "orbit"})`} strokeWidth=".7" />)}
    {points.map((p, i) => <circle className={i % 13 === 0 ? "pulse-node" : ""} key={i} cx={p.x} cy={p.y} r={p.z > .4 ? 2 : 1.15} fill={p.z > .4 ? "#b4cdff" : "#5a7baa"} opacity={.4 + (p.z + 1) * .3} />)}
    <path d="M29 380h51l9-12 9 27 10-35 10 27 10-7h45M326 91h45l8-7 7 15 9-23 8 16h43" stroke="#7e9eff" opacity=".45" strokeWidth="1" />
    <circle cx="380" cy="112" r="4" fill="#8aafff" /><path d="M380 112h34l12-12h34" stroke="#739bfa" opacity=".5" />
    <text x="18" y="38" fill="#718198" fontSize="9" fontFamily="monospace" letterSpacing="2">LATENT SPACE / 001</text><text x="338" y="426" fill="#718198" fontSize="9" fontFamily="monospace" letterSpacing="1">SIGNAL → INTELLIGENCE</text>
    <path d="M20 60V48h12M480 60V48h-12M20 410v12h12M480 410v12h-12" stroke="#4e617f" strokeWidth=".8" />
  </svg>;
}

export function ProjectVisual({ kind }: { kind: "sovereign" | "attribution" | "pricing" | "language" | "signal" | "chip" | "policy" | "sql" | "diagnostics" | "optimization" }) {
  const workflows = {
    policy: { label: "POLICY-DRIVEN RELEASE", steps: ["Inspect", "Verify", "Decide", "Audit"], detail: "Evidence depth ≠ release authority" },
    sql: { label: "EXECUTION-GROUNDED EVALUATION", steps: ["Schema", "QLoRA", "Query", "Execute"], detail: "Held-out databases · read-only execution" },
    diagnostics: { label: "INDUSTRIAL DIAGNOSTICS", steps: ["Signal", "Analyze", "Assess", "Trace"], detail: "Six domains · one typed result contract" },
    optimization: { label: "OPTIMIZER RESEARCH FOUNDATION", steps: ["Control", "Compare", "Observe", "Repeat"], detail: "Reference baselines · causal diagnostics" },
  };
  if (kind in workflows) {
    const workflow = workflows[kind as keyof typeof workflows];
    return <div className="workflow-visual" aria-label={`Conceptual workflow: ${workflow.label}`}><span className="eyebrow">{workflow.label}</span><ol>{workflow.steps.map((step, i) => <li key={step}><span>0{i + 1}</span>{step}</li>)}</ol><p>{workflow.detail}</p><small>CONCEPTUAL WORKFLOW</small></div>;
  }
  if (kind === "signal") return <div className="mini-visual signal-visual" aria-label="Illustrative signal processing workflow"><div className="visual-caption">PBSTATS / SIGNAL → SPECTRUM <span>ILLUSTRATION</span></div><svg viewBox="0 0 400 100" fill="none" aria-hidden="true"><path d={Array.from({length:160},(_,i)=>`${i===0?"M":"L"}${i*2.5} ${(50+Math.sin(i*.28)*21+Math.sin(i*.86)*8).toFixed(2)}`).join(" ")} stroke="var(--accent)" strokeWidth="1.5" /><path d="M0 50H400" stroke="var(--line)" strokeDasharray="3 4" /></svg><span className="signal-code">.remove_dc().standardize().fft()</span></div>;
  if (kind === "chip") return <div className="mini-visual chip-visual" aria-label="Illustrative embedded autoencoder architecture"><span className="eyebrow">ESP32 / PURE C++ INFERENCE</span><div className="chip-network">{[4,8,2,8,4].map((n,i)=><div key={i}><span>{Array.from({length:n},(_,j)=><i key={j} />)}</span><small>{n}</small></div>)}</div><span className="signal-code">ENCODE → RECONSTRUCT → DETECT</span></div>;
  if (kind === "sovereign") return <div className="project-visual sovereign-visual" aria-label="Illustrative retrieval and evidence architecture"><div className="visual-caption">SYSTEM ARCHITECTURE <span>ILLUSTRATION</span></div><div className="system-path"><div className="system-source"><span>01</span>Knowledge<br />& evidence</div><i /><div className="system-core"><span className="core-ring">S</span><small>LOCAL INTELLIGENCE</small></div><i /><div className="system-source"><span>02</span>Grounded<br />response</div></div><div className="visual-bottom"><span><i /> PRIVATE BY DESIGN</span><span>RETRIEVE · REASON · VERIFY</span></div></div>;
  if (kind === "attribution") return <div className="project-visual attribution-visual" aria-label="Illustrative text feature extraction"><div className="visual-caption">MODEL FINGERPRINT <span>ILLUSTRATION</span></div><div className="fingerprint-layout"><div className="text-sample"><span>input.text</span><p>The patterns hidden<br />between the words<span className="cursor">_</span></p><div className="token-line"><i /><i /><i /><i /><i /></div><small>STYLOMETRY → REPRESENTATION</small></div><svg viewBox="0 0 160 140" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${15 + i * 5} 124C${-35 + i * 8} ${40 + i * 3},${170 - i * 2} ${-30 + i * 8},${140 - i * 5} ${120 - i * 3}`} fill="none" stroke={`hsl(${215 + i * 3} 70% ${54 + i * 2}%)`} opacity=".65" strokeWidth="1" />)}</svg></div><div className="visual-bottom"><span>CHARACTER · WORD · EMBEDDING</span><span>f(x) → model</span></div></div>;
  if (kind === "pricing") return <div className="mini-visual pricing-visual" aria-label="Illustrative simulation workflow"><svg viewBox="0 0 400 125" fill="none" aria-hidden="true"><path d="M0 95H400M0 60H400M0 25H400" stroke="currentColor" opacity=".1" /><path d="M0 100C40 100 50 70 80 75S120 40 155 55 205 12 240 36 280 80 315 45 360 48 400 15" stroke="#7fa8ff" strokeWidth="2" /><path d="M0 110C60 95 90 110 145 80S230 95 275 62 345 78 400 55" stroke="#8b85cf" strokeDasharray="4 5" /></svg><span>PRICING · SIMULATION · CLOUD</span></div>;
  return <div className="mini-visual language-visual" aria-label="Illustrative multilingual tokenization"><div><span>Language</span><i>lan</i><i>guage</i></div><div><span>ভাষা</span><i>ভা</i><i>ষা</i></div><div><span>言語</span><i>言</i><i>語</i></div><small>DIFFERENT TOKENS. COMPARABLE CONFIDENCE?</small></div>;
}
