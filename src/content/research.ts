export const researchInterests = ["Large Language Models", "Model Attribution & Fingerprinting", "Multilingual NLP", "Hallucination Detection", "Trustworthy & Explainable AI", "Statistical Machine Learning", "Representation Learning", "LLM Evaluation & Reliability", "Agentic Reinforcement Learning", "Parameter-Efficient Fine-Tuning"];
export const research = [
  {
    title: "What gives a language model away?", topic: "MODEL ATTRIBUTION", status: "Experimental work", slug: "name-that-llm",
    question: "Does generated text carry a recognizable signature of its source language model?",
    motivation: "Attribution is useful only if a model learns source-specific signals instead of shortcuts tied to prompts or topics.",
    methodology: "Study stylometric features, TF-IDF, and DeBERTa representations with prompt-grouped validation; examine prompt nuisance and compare ensemble models.",
    observation: "An earlier ensemble reached approximately 41.6% balanced accuracy in internal evaluation. Dataset size, model roster, fold-level scores, and external replication are not supplied; this is a preliminary observation, not a general benchmark.",
  },
  {
    title: "Confidence, beyond the tokenizer.", topic: "MULTILINGUAL RELIABILITY", status: "Research in progress", slug: "multilingual-hallucination",
    question: "Can hallucination-related confidence signals be compared fairly across languages without being distorted by tokenizer differences?",
    motivation: "Token probabilities depend on how text is segmented. A confidence measure can reflect tokenization properties as well as factual reliability.",
    methodology: "Investigate tokenization bias, probability normalization, calibration, and language-level confounding through cross-lingual evaluation.",
    observation: "Exploratory research. No validated experimental outcome or publication is claimed.",
  },
];
