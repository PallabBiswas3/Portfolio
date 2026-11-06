import type { Project } from "./projects";

// Public repository documentation reviewed 6 November 2026.
export const githubProjects: Project[] = [
  {
    "slug": "controlplane",
    "name": "ControlPlane.ai",
    "title": "Verification depth and release authority are different decisions.",
    "category": "AI GOVERNANCE · FACTUAL VERIFICATION",
    "filter": "AI systems",
    "number": "00",
    "visual": "policy",
    "status": "Implemented gateway",
    "summary": "A policy-driven gateway that combines privacy, grounding, bias, and conversation checks into explainable release decisions.",
    "tags": [
      "Python",
      "FastAPI",
      "NLI",
      "Policy Engine"
    ],
    "repo": "https://github.com/PallabBiswas3/ControlPlane",
    "documentation": "https://github.com/PallabBiswas3/ControlPlane/blob/main/README.md",
    "pipeline": [
      {
        "label": "Inspect",
        "description": "Check prompt, response, context, and conversation for overlapping risks."
      },
      {
        "label": "Verify",
        "description": "Quick deterministic checks, standard retrieval/NLI, or bounded deep evidence seeking."
      },
      {
        "label": "Decide",
        "description": "Apply a versioned policy: allow, warn, redact, request review, or block."
      },
      {
        "label": "Audit",
        "description": "Retain the policy snapshot, findings, and human feedback."
      }
    ],
    "sections": [
      {
        "title": "The problem",
        "paragraphs": [
          "A response can expose private information and make an unsupported claim at the same time. A single safety label cannot express both the evidence problem and the action the application should take."
        ]
      },
      {
        "title": "What I built",
        "paragraphs": [
          "A gateway with parallel detectors, multi-label findings, span-preserving redaction, versioned policy profiles, and CLI, FastAPI, and Streamlit interfaces.",
          "The AdaptiveFact subsystem adds factual verification. Verification depth controls the work performed; the policy engine separately determines whether the answer may be released."
        ]
      },
      {
        "title": "Evaluation and research boundary",
        "paragraphs": [
          "The repository includes a RAGTruth/HaluEval research pipeline and controlled cross-risk evaluation. Its generated development, validation, and blinded-test examples are synthetic reviewer candidates, not adjudicated gold labels.",
          "The next evaluation milestone is independent label review followed by a frozen comparison of verification quality, latency, and release decisions."
        ]
      },
      {
        "title": "Why it matters",
        "paragraphs": [
          "The system exposes supported, suspected, contradicted, and unknown states rather than presenting uncertainty as a confirmed hallucination. A configured detector failure remains visible so consequential policies can require human review."
        ]
      }
    ],
    "note": "Implementation and evaluation scope are documented in the public repository. Synthetic candidate labels do not establish benchmark accuracy."
  },
  {
    "slug": "industrial-diagnostics",
    "name": "Time-Series Diagnostic Agent",
    "title": "From sensor measurements to inspectable diagnostic evidence.",
    "category": "SIGNAL PROCESSING · INDUSTRIAL AI",
    "filter": "AI systems",
    "number": "00",
    "visual": "diagnostics",
    "status": "Six-domain diagnostic pipeline",
    "summary": "A typed diagnostic pipeline for bearings, processes, wind SCADA, batteries, turbofans, and transformers, with provenance and explicit abstention.",
    "tags": [
      "Python",
      "FastAPI",
      "Signal Processing",
      "Uncertainty"
    ],
    "repo": "https://github.com/PallabBiswas3/Time-Series-Diagnostic-Agent",
    "documentation": "https://github.com/PallabBiswas3/Time-Series-Diagnostic-Agent/blob/main/README.md",
    "pipeline": [
      {
        "label": "Validate",
        "description": "Validate domain-specific signals, sampling information, and reference data."
      },
      {
        "label": "Analyze",
        "description": "Run the configured physics, statistical, or registered learned-model workflow."
      },
      {
        "label": "Assess",
        "description": "Produce detection, localization, uncertainty, and evidence-supported decisions."
      },
      {
        "label": "Trace",
        "description": "Record step status, duration, versions, input hashes, and reasons for abstention."
      }
    ],
    "sections": [
      {
        "title": "The problem",
        "paragraphs": [
          "An anomaly score alone does not identify a fault or establish when a machine will fail. Industrial diagnosis needs domain assumptions, healthy references, operating context, and a record of how each conclusion was reached."
        ]
      },
      {
        "title": "What I built",
        "paragraphs": [
          "A common diagnose() API and DiagnosticResult contract spanning six industrial domains. Methods include envelope analysis for bearings, DPCA/CVA process monitoring, wind residuals with CUSUM, and domain-specific battery, turbofan, and transformer workflows.",
          "The API and tool adapter expose the same diagnostic contract. Missing metadata or insufficient evidence can lead to abstention; host authentication and authorization remain the integrating application’s responsibility."
        ]
      },
      {
        "title": "Reported baseline and its limitation",
        "paragraphs": [
          "The README records a 95-event CARE wind run with zero execution failures: recall 0.9111, precision 0.4659, F1 0.6165, and normal-event false-alarm rate 0.9400. These are repository-reported results, not independently reproduced here.",
          "The high false-alarm rate is the central unresolved issue. A healthy-only calibration workflow exists, but no calibrated configuration is shipped: an independent development pool is required before freezing thresholds."
        ]
      },
      {
        "title": "Research direction",
        "paragraphs": [
          "Study how operating-regime shift, threshold calibration, and evidence requirements affect false alarms and missed detections. Keep the historical CARE run frozen and evaluate calibration on an independent split.",
          "Provenance reports preserve pipeline and model versions, dataset/protocol identifiers, checksums, and Git revisions so results can be investigated rather than reduced to one aggregate score."
        ]
      }
    ],
    "note": "A working research pipeline, not validated plant-deployment performance. Learned capabilities require their explicitly registered models."
  },
  {
    "slug": "qlora-sqlbench",
    "name": "QLoRA-SQLBench",
    "title": "Evaluate generated SQL by what it actually executes.",
    "category": "LLM ADAPTATION · TEXT-TO-SQL",
    "filter": "AI systems",
    "number": "00",
    "visual": "sql",
    "status": "Training and evaluation pipeline",
    "summary": "4-bit QLoRA adaptation of Qwen2.5-Coder on Spider, with database-held-out evaluation, SQL execution checks, and schema validation.",
    "tags": [
      "PyTorch",
      "PEFT / QLoRA",
      "Qwen",
      "SQLite"
    ],
    "repo": "https://github.com/PallabBiswas3/LoRA-SQL",
    "documentation": "https://github.com/PallabBiswas3/LoRA-SQL/blob/main/README.md",
    "pipeline": [
      {
        "label": "Prepare",
        "description": "Extract SQLite schemas and use Spider’s cross-domain train/validation split."
      },
      {
        "label": "Adapt",
        "description": "Train LoRA adapters on a 4-bit NF4 base with assistant-only loss masking."
      },
      {
        "label": "Execute",
        "description": "Parse generated SQL and compare results on read-only SQLite databases."
      },
      {
        "label": "Compare",
        "description": "Export base-versus-adapter reports, rank ablations, latency, and GPU memory."
      }
    ],
    "sections": [
      {
        "title": "The problem",
        "paragraphs": [
          "A SQL answer may look plausible while naming nonexistent columns or returning the wrong rows. Text similarity alone misses these failures, and random row splits can conceal poor transfer to new database schemas."
        ]
      },
      {
        "title": "What I built",
        "paragraphs": [
          "A single-GPU-oriented pipeline around Qwen2.5-Coder-1.5B-Instruct: schema extraction, quantized adapter training, baseline and adapter inference, LoRA-rank ablations, and adapter merging.",
          "Assistant-only loss masking focuses supervision on the SQL answer. Evaluation tracks parsing, execution validity, schema references, result-set agreement, inference latency, and peak allocated GPU memory."
        ]
      },
      {
        "title": "Evaluation details",
        "paragraphs": [
          "The evaluator opens SQLite in read-only mode, rejects non-query statements, and bounds execution with a progress handler. It compares canonicalized result sets, respecting ordering when the gold query specifies ORDER BY.",
          "This is a lightweight execution-agreement metric, not the official Spider test-suite score. The repository supplies the pipeline but does not claim measured fine-tuning gains."
        ]
      },
      {
        "title": "Next experiment",
        "paragraphs": [
          "Run the base model and adapter on the same held-out databases, retain per-example failures, and compare correctness against memory and latency costs. Report adapter-rank ablations before attributing any change to model adaptation."
        ]
      }
    ],
    "note": "Pipeline capabilities are documented; no unrun accuracy improvement is claimed."
  },
  {
    "slug": "optimizer-reliability",
    "name": "TrustGeoOpt Research",
    "title": "When can an adaptive optimizer trust its gradient history?",
    "category": "OPTIMIZATION · EXPERIMENTAL METHODS",
    "filter": "Research",
    "number": "00",
    "visual": "optimization",
    "status": "Research foundation",
    "summary": "Reproducible optimizer experiments with noisy and rotating objectives, causal diagnostics, low-rank geometry, and resumable training.",
    "tags": [
      "PyTorch",
      "Optimization",
      "Gradient Geometry",
      "Reproducibility"
    ],
    "repo": "https://github.com/PallabBiswas3/Adam_Research",
    "documentation": "https://github.com/PallabBiswas3/Adam_Research/blob/main/trustgeoopt/README.md",
    "pipeline": [
      {
        "label": "Control",
        "description": "Generate diagonal, rotated, noisy, and time-varying objectives."
      },
      {
        "label": "Compare",
        "description": "Run reference optimizers under explicit configurations and budgets."
      },
      {
        "label": "Observe",
        "description": "Track causal reliability, alignment, Hessian-vector products, and bounded gradient sketches."
      },
      {
        "label": "Reproduce",
        "description": "Preserve failures, source hashes, configuration, RNG state, and checkpoints."
      }
    ],
    "sections": [
      {
        "title": "The research question",
        "paragraphs": [
          "Can diagnostics of gradient history reveal when adaptive optimization becomes unreliable, and is there enough evidence to justify a geometry-aware correction?"
        ]
      },
      {
        "title": "Implemented foundation",
        "paragraphs": [
          "The repository integrates PyTorch optimizer baselines, an AdaBelief reference, and a small factor-capped Shampoo implementation. Synthetic objectives separate true loss from observed noisy gradients.",
          "The experimental infrastructure includes causal reliability statistics, optional Hessian-vector products, bounded rolling gradient SVD, low-rank solves, conventional neural models, and validation-driven selection."
        ]
      },
      {
        "title": "What the evidence currently supports",
        "paragraphs": [
          "The initial pilots establish execution and reproducibility under untuned rates; they do not establish optimizer rankings. CUDA execution has not been verified on the documented CPU workstation.",
          "TrustGeoOpt is a design label. The proposed optimizer and correction variants deliberately raise NotImplementedError until the project’s evidence gates justify implementation."
        ]
      },
      {
        "title": "Next research gate",
        "paragraphs": [
          "Compare diagnostics and random-basis controls on frozen, seed-separated protocols. Record instability, runtime overhead, and negative findings before proposing a correction or claiming an advantage over reference methods."
        ]
      }
    ],
    "note": "Research infrastructure is implemented; the proposed optimizer is not. No novelty or superiority claim is made."
  }
];
