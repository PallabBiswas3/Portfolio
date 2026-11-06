// Small, invented examples for teaching. None of these functions runs a project model.
export const experimentInfo = {
  "sovereign-ai": { title: "Be the evidence detective.", summary: "An AI answer needs a source, permission to read it, and sometimes a human decision. Help a fictional maintenance assistant do all three.", concept: "Grounding, abstention, and approval boundaries" },
  "name-that-llm": { title: "Who wrote that?", summary: "Two fictional writing bots have different habits. Look past the topic and use the way they write to guess the author.", concept: "Stylometry and prompt-related confounding" },
  "ev-dynamic-pricing": { title: "Run the charging café.", summary: "A low price brings a crowd. A high price sends drivers elsewhere. Can you earn enough play credits without creating a long queue?", concept: "Demand, capacity, queues, and pricing trade-offs" },
  "multilingual-hallucination": { title: "Escape the tokenizer trap.", summary: "The same confidence per token can produce very different sequence scores. Explore the arithmetic before judging two fictional translations.", concept: "Tokenization, length effects, and factuality" },
  pbstats: { title: "Find the hidden note.", summary: "There is a repeating signal hiding under an offset and noise. Clean it up, look at its spectrum, and identify the note.", concept: "DC removal, smoothing, and frequency analysis" },
  "tinyml-anomaly-detection": { title: "Guard the robot’s bubble.", summary: "A robot remembers what a calm sensor reading looks like. Tune its alarm so it catches an odd reading without panicking about normal variation.", concept: "Reconstruction error and anomaly thresholds" },
} as const;
export type ExperimentSlug = keyof typeof experimentInfo;

export const evidenceRounds = [
  { question: "The pump is warm. What can the assistant responsibly report?", choices: ["The pump is definitely broken. Replace it.", "The 84°C reading exceeds the 80°C review threshold.", "The pump will fail in exactly one hour."], correct: 1, lesson: "The manual supplies the threshold; the sensor supplies the reading. Together they support a review flag, not a certain diagnosis." },
  { question: "Who manufactured this pump?", choices: ["Probably the company named in a similar report.", "The temperature reading tells us the manufacturer.", "The available evidence does not establish that."], correct: 2, lesson: "A useful assistant can say it does not know. These two sources contain no manufacturer information." },
  { question: "Should the assistant shut the pump down by itself?", choices: ["Request human approval before an operational action.", "Yes. A fluent recommendation is enough permission.", "Yes. Add a citation and skip approval."], correct: 0, lesson: "Evidence supports a recommendation. Authority to take an action is a separate boundary." },
] as const;
export function checkEvidenceMove(round: number, choice: number, sources: string[]) {
  if (!sources.includes("manual") || !sources.includes("sensor")) return { success: false, message: "Inspect both permitted evidence cards first. A plausible answer is not a substitute for checking sources." };
  if (choice !== evidenceRounds[round].correct) return { success: false, message: round === 1 ? "That fact is missing. Guessing would turn an evidence gap into a made-up answer." : "That goes beyond what the evidence or the assistant’s authority supports. Try another answer." };
  return { success: true, message: evidenceRounds[round].lesson };
}

export const writingRounds = [
  { topic: "Making tea", text: "First, gather the essentials. Second, heat the water. Third, steep the leaves and enjoy.", author: "Atlas", explanation: "Numbered transitions and a step-by-step structure match Atlas’s profile." },
  { topic: "Debugging code", text: "Quick take: check the input before blaming the compiler. Done.", author: "Comet", explanation: "The short takeaway and punchy ending match Comet’s profile." },
  { topic: "Making tea", text: "Quick take: hot water, tea leaves, a little patience. Done.", author: "Comet", explanation: "The tea topic appeared earlier, but the author is different. Topic alone is a shortcut." },
  { topic: "Debugging code", text: "First, reproduce the error. Second, inspect the input. Third, test the smallest possible fix.", author: "Atlas", explanation: "This has the same topic as Comet’s earlier sample, but Atlas’s structured style." },
] as const;

export function simulateCharging(price: number, capacity: number, rivalPrice: number) {
  const arrivals = Math.min(12, Math.max(0, Math.round(12 - 1.2 * price + .4 * rivalPrice)));
  const served = Math.min(arrivals, capacity);
  const queue = arrivals - served;
  const revenue = price * served;
  return { arrivals, served, queue, revenue, won: revenue >= 24 && queue <= 2 };
}

export function tokenScores(count: number, probability: number) {
  return { sequence: probability ** count, geometricMean: Math.exp((count * Math.log(probability)) / count) };
}

export function makeSignal(frequency: number, noise = .65, count = 64) {
  return Array.from({ length: count }, (_, i) => 1.4 + Math.sin(2 * Math.PI * frequency * i / count) + noise * (((i * 37 + 17) % 101) / 50 - 1));
}
export function processSignal(values: number[], removeOffset: boolean, smooth: boolean) {
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const centered = values.map(value => value - (removeOffset ? mean : 0));
  return smooth ? centered.map((value, i) => (centered[(i + values.length - 1) % values.length] + value + centered[(i + 1) % values.length]) / 3) : centered;
}
export function spectrum(values: number[], bins = 13) {
  return Array.from({ length: bins }, (_, k) => {
    let real = 0, imaginary = 0;
    values.forEach((value, i) => { real += value * Math.cos(2 * Math.PI * k * i / values.length); imaginary -= value * Math.sin(2 * Math.PI * k * i / values.length); });
    return Math.hypot(real, imaginary) / values.length * (k === 0 ? 1 : 2);
  });
}
export function dominantBin(amplitudes: number[]) { return amplitudes.indexOf(Math.max(...amplitudes)); }

export function reconstructionError(distance: number, jitter: number) {
  return ((distance / 100 - .4) ** 2 + (jitter / 10 - .2) ** 2) / 2;
}
export const sensorExamples = [
  { name: "Calm robot", distance: 40, jitter: 2, abnormal: false },
  { name: "Normal wobble", distance: 44, jitter: 2.5, abnormal: false },
  { name: "Surprise visitor", distance: 10, jitter: 8, abnormal: true },
] as const;
export function assessThreshold(threshold: number) {
  return sensorExamples.map(sample => { const error = reconstructionError(sample.distance, sample.jitter); const alarm = error > threshold; return { ...sample, error, alarm, correct: alarm === sample.abnormal }; });
}
