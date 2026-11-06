import { additionalProjects } from "./additional-projects";

export type StudySection = {
  title: string; paragraphs: string[]; bullets?: string[];
  markdown?: string;
  result?: { value: string; unit: string; label: string; context: string };
  image?: { src: string; alt: string; width: number; height: number; caption: string };
};
export type Project = {
  slug: string; name: string; title: string; category: string; filter: "AI systems" | "Research" | "Engineering";
  summary: string; status: string; tags: string[]; number: string; visual: "sovereign" | "attribution" | "pricing" | "language" | "signal" | "chip";
  repo?: string; demo?: string; documentation?: string; featured?: boolean;
  pipeline: { label: string; description: string }[];
  sections: StudySection[]; note: string;
};

export type ProjectCardData = Pick<Project, "slug" | "name" | "category" | "filter" | "summary" | "status" | "tags" | "number" | "visual" | "featured" | "repo">;

export function getProjectCards(): ProjectCardData[] {
  return projects.map(({ slug, name, category, filter, summary, status, tags, number, visual, featured, repo }) => ({ slug, name, category, filter, summary, status, tags, number, visual, featured, repo }));
}

export const projects: Project[] = [
  {
    slug: "sovereign-ai", name: "SovereignAI", title: "Private, evidence-grounded industrial intelligence.",
    category: "TRUSTWORTHY AI · LLM SYSTEMS", filter: "AI systems", number: "01", visual: "sovereign", featured: true,
    status: "Locally deployable prototype", summary: "An industrial AI workbench connecting permissioned GraphRAG, local inference, evidence capsules, and human approval boundaries.",
    tags: ["FastAPI", "GraphRAG", "vLLM / Ollama", "Next.js"],
    repo: "https://github.com/PallabBiswas3/SovereignAI", documentation: "https://github.com/PallabBiswas3/SovereignAI/blob/main/docs/CURRENT_FEATURES.md",
    note: "Public architecture and current-feature documentation are linked here. Recorded synthetic development checks are configuration-specific and do not establish plant-deployment acceptance.",
    pipeline: [
      { label: "Evidence", description: "Documents and time-series observations supply the industrial context. Preserve source identity and the scope of each observation." },
      { label: "GraphRAG", description: "Authorization is checked before retrieval. Relevant knowledge and relationships connect a question to its supporting material." },
      { label: "Local LLM", description: "A provider-neutral route selects local vLLM or Ollama inference. Missing services return explicit unavailable states." },
      { label: "Validation", description: "Evidence Capsules and provenance tracking connect response claims to their supporting evidence." },
      { label: "Governance", description: "The ControlPlane defines operational boundaries, including human approval and oversight before consequential actions." },
      { label: "Interface", description: "A Next.js interface exposes the response alongside the evidence and review context needed to interpret it." },
    ],
    sections: [
      { title: "The problem", paragraphs: ["Industrial assessment requires answers that can be traced to documents and observations. A fluent response alone is insufficient when information is sensitive and decisions need review.", "SovereignAI brings retrieval, local inference, evidence tracking, and governance into one system architecture. Its focus is the relationship between an answer, its source, and the boundary of permitted action."] },
      { title: "Technical approach", paragraphs: ["The described system combines GraphRAG retrieval with document and time-series evidence. Ollama supplies local model inference, while Evidence Capsules preserve supporting context and provenance.", "The ControlPlane separates generation from authority. Human approval and oversight are explicit parts of the workflow; generating a suggestion does not by itself authorize an operational action."] },
      { title: "Implementation", paragraphs: ["A Next.js workbench connects to a FastAPI backend, local model providers, SQLite-backed provenance and audit records, and permissioned tools. The agent follows plan, act, observe, and verify states with review boundaries for high-risk actions.", "Generated Python executes in a networkless Docker sandbox rather than on the host. The workbench also supports local OCR/vision routes and run-linked DOCX, XLSX, and PPTX artifacts."], bullets: ["Authorization-before-retrieval GraphRAG", "Tamper-verifiable Evidence Capsules", "Local vLLM and Ollama model routing", "Explicit unavailable states for missing runtime services"] },
      { title: "Validation approach", paragraphs: ["The public current-features record separates promoted application behavior from diagnostic research branches and reports synthetic development checks for explicitly recorded configurations.", "Those records should be read with their date, source baseline, and synthetic data context. They are not guarantees of calibrated diagnostic confidence, operational acceptance, or plant-deployment safety."] },
      { title: "Observations & trade-offs", paragraphs: ["Local inference provides control over where data is processed, while making hardware capacity and model selection deployment concerns. Graph retrieval adds useful relationship context but also creates indexing and evidence-maintenance work.", "An evidence link makes an answer inspectable; it does not automatically make it correct. The source, retrieval scope, and claim-to-evidence relationship still need evaluation."] },
      { title: "Limitations & next steps", paragraphs: ["The repository documents runtime dependencies and separates application releases from ongoing diagnostic research. Public source and current boundaries are available; a deployment still needs appropriate local models, services, and acceptance criteria for its intended use."] },
    ],
  },
  {
    slug: "name-that-llm", name: "Name That LLM", title: "Finding the fingerprint in generated text.",
    category: "ML RESEARCH · MODEL ATTRIBUTION", filter: "Research", number: "02", visual: "attribution", featured: true,
    status: "Experimental research", summary: "Investigating whether stylistic and representation-level signals reveal which language model generated a piece of text.",
    tags: ["DeBERTa", "TF-IDF", "SVM", "Stylometry"],
    note: "The 41.6% figure is an earlier internal evaluation supplied in the brief. It is editable, preliminary, and not an independently reproduced or directly comparable benchmark.",
    pipeline: [
      { label: "Generated text", description: "Text samples are labeled by source model. Prompt identity is a possible confound and must remain visible in evaluation design." },
      { label: "Features", description: "Character and word stylometry, TF-IDF features, and DeBERTa embeddings provide complementary views of the same text." },
      { label: "Classifiers", description: "Support Vector Machines and ensemble classification test the predictive value of each representation." },
      { label: "Grouped evaluation", description: "Prompt-grouped cross-validation studies whether predictions survive separation of prompt groups." },
      { label: "Analysis", description: "Prompt nuisance analysis, statistical significance testing, and ablations belong to the research scope; completion is not implied for every experiment." },
    ],
    sections: [
      { title: "Research question", paragraphs: ["Does model-generated text contain stable source-model signatures? More specifically, can attribution use stylistic and representational information without merely identifying the prompt or topic?", "This makes the project an evaluation problem as much as a classification problem. A high score is meaningful only under a split that tests the intended form of generalization."] },
      { title: "Representations & models", paragraphs: ["The project studies TF-IDF, character- and word-level analysis, and DeBERTa embeddings. Support Vector Machines and ensemble classification connect these representations to a model-attribution task.", "Stylometry offers interpretable surface features, while contextual embeddings can encode more complex regularities. Comparing them helps distinguish representation quality from downstream classifier effects."] },
      { title: "Dataset & experimental setup", paragraphs: ["Prompt-grouped cross-validation is part of the methodology: samples sharing a prompt belong together when forming evaluation groups. This helps probe prompt-related shortcuts.", "The supplied material does not specify dataset size, source-model roster, class counts, seeds, or full fold definitions. These details must accompany any future reproducible result; they are not inferred here."], bullets: ["Baseline comparisons across feature families", "Prompt nuisance and confounding analysis", "Ablation studies and significance testing in the research scope", "Explicit separation of preliminary observations and established results"] },
      { title: "Results & observations", paragraphs: ["An earlier ensemble achieved approximately 41.6% balanced accuracy in internal evaluation. Balanced accuracy averages recall across classes, reducing the influence of unequal class sizes.", "The evaluation protocol and underlying artifacts are not sufficiently specified here to establish external comparability, confidence intervals, or generalization to unseen source models. No statistical significance claim is made."], result: { value: "41.6", unit: "%", label: "Approximate balanced accuracy", context: "Earlier ensemble · internal evaluation · preliminary" }, markdown: "For $K$ source-model classes, balanced accuracy is:\n\n$$\n\\operatorname{BA} = \\frac{1}{K} \\sum_{k=1}^{K} \\frac{TP_k}{TP_k + FN_k}\n$$\n\nHere $TP_k$ and $FN_k$ are the true-positive and false-negative counts for class $k$. The number of classes and class-level recalls are needed to interpret the score." },
      { title: "Technical challenges", paragraphs: ["Prompt and topic can masquerade as model identity. Embeddings may encode both, and an ensemble can amplify a shortcut as easily as a useful signal.", "Grouped splits, representation comparisons, and ablations are therefore central to interpreting a score. They should be documented alongside training choices and sample provenance."] },
      { title: "Limitations & research directions", paragraphs: ["Open questions include robustness to unseen prompts, changes in decoding settings, and transfer across model families. Future work should report fold-level variability, dataset provenance, and independently reproducible baselines.", "Experiments listed as research directions are not presented as completed findings."] },
    ],
  },
  {
    slug: "ev-dynamic-pricing", name: "EV Dynamic Pricing", title: "From simulation to a cloud-accessible application.",
    category: "APPLIED AI · CLOUD ENGINEERING", filter: "Engineering", number: "03", visual: "pricing", status: "Deployed prototype",
    summary: "An interactive platform for exploring EV charging prices through simulation, optimization, and monitored cloud workflows.",
    tags: ["FastAPI", "React / Vite", "TypeScript", "Simulation"],
    repo: "https://github.com/PallabBiswas3/BTP_EV", documentation: "https://github.com/PallabBiswas3/BTP_EV/blob/main/README.md",
    note: "The public repository verifies a FastAPI backend and Vite + React + TypeScript dashboard. Cloud deployment is described in the original project brief; a public demo URL is not configured. The visual is illustrative.",
    pipeline: [
      { label: "Configuration", description: "A Vite + React + TypeScript dashboard configures networks, imports validated CSV scenarios, and exposes simulation parameters." },
      { label: "API", description: "An API connects the interface to the Python backend and coordinates computational work." },
      { label: "Simulation", description: "Simulation and optimization explore dynamic pricing strategies for EV charging infrastructure." },
      { label: "Monitoring", description: "Asynchronous workflows expose progress and operational controls for expensive simulations." },
      { label: "Cloud Run", description: "Docker packages the application for Google Cloud Run. Resource allocation and runtime limits influence execution behavior." },
    ],
    sections: [
      { title: "The problem", paragraphs: ["Dynamic EV charging prices depend on assumptions about demand and operating conditions. Exploring those assumptions requires an interface, repeatable simulations, and a backend that can support computationally expensive work.", "This project brings the pricing experiment into a working cloud-accessible application, connecting modeling decisions to practical software operations."] },
      { title: "Technical approach", paragraphs: ["The FastAPI backend wraps a tri-level model: traffic dynamics, replicator route choice, and charging-station pricing. The dashboard uses Vite, React, TypeScript, React Flow network diagrams, and Recharts.", "The client submits simulation jobs and polls their progress. Views cover route choice, station analysis, EV-adoption sweeps, strategic-versus-fixed comparisons, and paper-reproduction experiments."] },
      { title: "Implementation & deployment", paragraphs: ["The supplied engineering account describes a working application deployed with Docker on Google Cloud Run. Backend execution and resource allocation were optimization concerns, along with operational controls for expensive runs.", "The application also provided a setting to explore performance differences between local and cloud execution. Specific infrastructure settings and benchmark measurements are not available here."] },
      { title: "Validation approach", paragraphs: ["No benchmark table or measured savings is supplied. Appropriate verification includes simulation reproducibility, invalid-input handling, progress-state correctness, cancellation behavior where implemented, and cloud resource limits.", "A useful local-to-cloud comparison would fix the workload and report runtime, memory, concurrency, and cold-start conditions. This describes a comparison protocol, not a completed benchmark."] },
      { title: "Engineering trade-offs", paragraphs: ["Long simulations need an interaction model that stays useful while work continues. Asynchronous workflows make progress visible but require careful state handling between the interface and backend.", "Cloud resource allocation can change runtime and cost. A pricing strategy evaluated in simulation should not be treated as a guarantee of real-world financial outcomes."] },
      { title: "Limitations & next steps", paragraphs: ["The live demo remains hidden until a public URL is verified. The public repository supplies frontend, backend, and methodology documentation. Expensive default runs and differences between source simulation and historical paper experiments need explicit interpretation."] },
    ],
  },
  {
    slug: "multilingual-hallucination", name: "Multilingual Hallucination", title: "Can confidence travel fairly across languages?",
    category: "MULTILINGUAL NLP · LLM RELIABILITY", filter: "Research", number: "04", visual: "language", status: "Research in progress",
    summary: "Exploring tokenization-invariant confidence signals for factual reliability across languages with different tokenization properties.",
    tags: ["Multilingual NLP", "Calibration", "Uncertainty"],
    note: "Exploratory research in progress. No experimental success, validated novelty, publication, or completed cross-lingual benchmark is claimed.",
    pipeline: [
      { label: "Languages", description: "Cross-lingual evaluation must account for language properties and comparable task conditions." },
      { label: "Tokenization", description: "Different tokenizers and languages can produce different segmentation lengths for comparable content." },
      { label: "Confidence", description: "Token probabilities provide internal confidence information, but raw comparisons can mix segmentation effects with reliability." },
      { label: "Normalization", description: "Candidate normalization approaches need to be studied for their sensitivity to tokenization and language-level confounding." },
      { label: "Evaluation", description: "Assess calibration and hallucination detection using factuality labels and language-aware analysis. These are research directions." },
    ],
    sections: [
      { title: "The research question", paragraphs: ["Can hallucination-related confidence signals be compared fairly across languages without being distorted by tokenizer differences?", "The motivation is to distinguish evidence about factual correctness from variation introduced by text segmentation. A method that appears reliable in one language may behave differently in another."] },
      { title: "Conceptual approach", paragraphs: ["This exploratory work studies multilingual language models, token probabilities, calibration, and uncertainty. Tokenization bias and language-level confounding are central concerns.", "A tokenization-invariant signal is a research goal. It is not an established property of an implemented detector in this project."] },
      { title: "Experimental work in scope", paragraphs: ["The investigation calls for comparable factual tasks, transparent language selection, and careful accounting for tokenization differences. Dataset choices and experimental outcomes have not been supplied."], bullets: ["Compare raw confidence signals and candidate normalizations", "Separate language effects from factuality effects", "Study cross-lingual calibration and detection", "Report failures and uncertainty alongside aggregate metrics"] },
      { title: "Current status", paragraphs: ["Research in progress. No validated results, benchmark figures, or publication are available for this portfolio. Proposed comparisons and ablations should be read as directions for investigation."] },
      { title: "Challenges & trade-offs", paragraphs: ["Comparable questions do not necessarily produce comparable token sequences. Language, script, response length, and segmentation can all complicate confidence comparisons.", "Normalization may remove a tokenization artifact while also discarding a useful signal. Evaluating that trade-off requires factuality labels and analysis within as well as across languages."] },
      { title: "Limitations & next steps", paragraphs: ["The next milestone is a documented evaluation protocol with language coverage, factuality annotation criteria, and baseline definitions. Claims about novelty or effectiveness require evidence beyond the current exploratory brief."] },
    ],
  },
  ...additionalProjects,
];
