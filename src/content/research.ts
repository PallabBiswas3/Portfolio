export const researchInterests = ["Optimization & Gradient Geometry", "Industrial Signal Diagnostics", "Game Theory & Network Dynamics", "Large Language Models", "Model Attribution & Fingerprinting", "Multilingual NLP", "Hallucination Detection", "Trustworthy & Explainable AI", "Statistical Machine Learning", "Representation Learning", "LLM Evaluation & Reliability", "Agentic Reinforcement Learning", "Parameter-Efficient Fine-Tuning"];
export type ResearchStudy = { title: string; topic: string; status: string; slug: string; question: string; motivation: string; methodology: string; observation: string; nextStep: string; source?: string };

export const research: ResearchStudy[] = [
{
  "title": "When does gradient history stop helping?",
  "topic": "ADAPTIVE OPTIMIZATION",
  "status": "Research foundation",
  "slug": "optimizer-reliability",
  "question": "Can causal gradient diagnostics identify unreliable adaptive updates before a geometry-aware correction is justified?",
  "motivation": "Momentum and adaptive scaling summarize past gradients. Noise and changing geometry can make that history misleading.",
  "methodology": "Compare reference optimizers on controlled objectives and conventional networks, using causal diagnostics, low-rank sketches, random-basis controls, and resumable runs.",
  "observation": "Executable infrastructure and initial pilots are documented. The proposed TrustGeoOpt optimizer is deliberately unimplemented; initial runs establish reproducibility, not superiority.",
  "nextStep": "Freeze seed-separated comparisons and measure diagnostic value and computational overhead before implementing a correction.",
  "source": "https://github.com/PallabBiswas3/Adam_Research/blob/main/trustgeoopt/README.md"
},
{
  "title": "How much verification does an answer need?",
  "topic": "FACTUALITY & AI GOVERNANCE",
  "status": "Implemented research pipeline",
  "slug": "controlplane",
  "question": "How should evidence depth and release policy interact when privacy, grounding, and conversation risks overlap?",
  "motivation": "The strength of factual evidence and permission to release a response are separate decisions.",
  "methodology": "Use deterministic checks, retrieval/NLI, and bounded evidence seeking under versioned policies; inspect cross-risk decisions and verification cost.",
  "observation": "ControlPlane integrates the AdaptiveFact research pipeline. Generated benchmark items are synthetic reviewer candidates and require independent adjudication.",
  "nextStep": "Adjudicate labels, freeze the evaluation split, and compare quality, latency, and release decisions at each verification depth.",
  "source": "https://github.com/PallabBiswas3/ControlPlane"
},
{
  "title": "Detect the fault. Control the false alarms.",
  "topic": "INDUSTRIAL SIGNALS & UNCERTAINTY",
  "status": "Baseline documented",
  "slug": "industrial-diagnostics",
  "question": "How can evidence-aware diagnostics remain useful across operating regimes without overwhelming users with false alarms?",
  "motivation": "High recall alone is insufficient if normal operation repeatedly triggers alerts.",
  "methodology": "Combine domain physics, reference-based statistical monitoring, uncertainty, and abstention; calibrate thresholds on an independent healthy development pool.",
  "observation": "The repository reports a 95-event CARE baseline with F1 0.6165 and normal-event false-alarm rate 0.9400. The false-alarm problem remains open; a calibrated configuration is not yet shipped.",
  "nextStep": "Obtain an independent healthy development split, freeze calibration, and report both false alarms and missed faults.",
  "source": "https://github.com/PallabBiswas3/Time-Series-Diagnostic-Agent"
},
{
  "title": "Pricing changes routes. Routes change demand.",
  "topic": "GAME THEORY & NETWORK DYNAMICS",
  "status": "BTP simulation platform",
  "slug": "ev-dynamic-pricing",
  "question": "How do strategic charging-station prices interact with traffic dynamics and drivers’ route choices?",
  "motivation": "Charging stations share a traffic network: a station’s decision changes both its own demand and the alternatives available to drivers.",
  "methodology": "Explore a tri-level model of traffic dynamics, replicator route choice, and station pricing through parameter sweeps and strategic-versus-fixed comparisons.",
  "observation": "BTP_EV implements a dashboard around the source simulation. Historical paper experiments retain a separate equilibrium model; this work builds on the cited model rather than claiming a new one.",
  "nextStep": "Compare scenarios under fixed simulation settings and document the distinction between source-model runs and historical paper reproduction.",
  "source": "https://github.com/PallabBiswas3/BTP_EV"
},
  {
    nextStep: "Publish the prompt-grouped protocol and reproducible artifacts, then test attribution on new prompts and decoding settings.",
    title: "What gives a language model away?", topic: "MODEL ATTRIBUTION", status: "Experimental work", slug: "name-that-llm",
    question: "Does generated text carry a recognizable signature of its source language model?",
    motivation: "Attribution is useful only if a model learns source-specific signals instead of shortcuts tied to prompts or topics.",
    methodology: "Study stylometric features, TF-IDF, and DeBERTa representations with prompt-grouped validation; examine prompt nuisance and compare ensemble models.",
    observation: "An earlier ensemble reached approximately 41.6% balanced accuracy in internal evaluation. Dataset size, model roster, fold-level scores, and external replication are not supplied; this is a preliminary observation, not a general benchmark.",
  },
  {
    nextStep: "Freeze a multilingual pilot with factuality labels and raw-versus-normalized confidence baselines.",
    title: "Confidence, beyond the tokenizer.", topic: "MULTILINGUAL RELIABILITY", status: "Research in progress", slug: "multilingual-hallucination",
    question: "Can hallucination-related confidence signals be compared fairly across languages without being distorted by tokenizer differences?",
    motivation: "Token probabilities depend on how text is segmented. A confidence measure can reflect tokenization properties as well as factual reliability.",
    methodology: "Investigate tokenization bias, probability normalization, calibration, and language-level confounding through cross-lingual evaluation.",
    observation: "Exploratory research. No validated experimental outcome or publication is claimed.",
  },
];
