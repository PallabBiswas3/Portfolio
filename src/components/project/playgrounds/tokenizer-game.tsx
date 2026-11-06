"use client";
import { useState } from "react";
import { Languages } from "lucide-react";
import { tokenScores } from "@/lib/case-experiments";
import { ExperimentLayout, RangeControl } from "./shared";

export default function TokenizerGame() {
  const [tokens, setTokens] = useState(8);
  const [probability, setProbability] = useState(.9);
  const [normalized, setNormalized] = useState(false);
  const [answer, setAnswer] = useState<boolean | null>(null);
  const first = tokenScores(3, probability), second = tokenScores(tokens, probability);
  const scores = normalized ? [first.geometricMean, second.geometricMean] : [first.sequence, second.sequence];
  const won = normalized && answer === false;
  const feedback = won ? "Trap spotted. Averaging removes this constructed length effect, but equal token confidence does not prove factual correctness or fairness across real languages." : answer === true ? "Confidence is not truth. Even an equally confident pair of answers can both be wrong. Try the other answer." : answer === false ? "Correct: confidence alone cannot establish factuality. Now compare the length-normalized scores as well." : normalized ? "The bars now match because every illustrative token has the same probability. Does that prove either translation is factually correct?" : "Multiplying more probabilities below 1 makes the sequence score smaller. Both examples use the same probability for each token.";
  return <ExperimentLayout mission="Reveal the length effect, switch to a per-token comparison, then answer the factuality question." success={won} score={`${Number(normalized) + Number(answer === false)} / 2 insights`} feedback={feedback} hint="Switch to Geometric mean. The bars become equal in this controlled example. Then choose No: confidence is not evidence of factual correctness." onReset={() => { setTokens(8); setProbability(.9); setNormalized(false); setAnswer(null); }} controls={<><span className="experiment-kicker">CONTROLLED TOKENIZATION SKETCH</span><RangeControl label="Language B token count" value={tokens} min={3} max={12} onChange={setTokens} /><RangeControl label="Probability of each token" value={probability} min={.55} max={.99} step={.01} display={`${Math.round(probability * 100)}% in both languages`} onChange={setProbability} /><fieldset className="experiment-fieldset"><legend>Compare using</legend><button aria-pressed={!normalized} onClick={() => setNormalized(false)}>Sequence probability<span>Multiply all token probabilities</span></button><button aria-pressed={normalized} onClick={() => setNormalized(true)}>Geometric mean<span>Average log probability per token, then exponentiate</span></button></fieldset></>}>
    <div className="experiment-board-label">SAME INTENDED MESSAGE / INVENTED TOKEN SCORES</div>
    <div className="translation-pair">{[{name:"Language A",text:"The sun rises.",count:3},{name:"Language B",text:"সূর্য ওঠে।",count:tokens}].map((item,i) => <article key={item.name}><Languages size={19} /><h3>{item.name}</h3><p>{item.text}</p><div className="token-chips">{Array.from({length:item.count},(_,j)=><span key={j}>t{j+1}</span>)}</div><div className="token-score-label"><span>{normalized ? "Geometric mean" : "Sequence probability"}</span><strong>{(scores[i]*100).toFixed(1)}%</strong></div><div className="experiment-meter"><span style={{width:`${scores[i]*100}%`}} /></div></article>)}</div>
    <fieldset className="experiment-fieldset factuality-question"><legend>Do equal scores prove the translations are factually correct?</legend><div className="experiment-choice-pair"><button aria-pressed={answer === true} onClick={() => setAnswer(true)}>Yes, confidence proves it</button><button aria-pressed={answer === false} onClick={() => setAnswer(false)}>No, we still need factual evidence</button></div></fieldset>
    <p className="experiment-board-note">Token counts and chips are illustrative, not outputs from an actual tokenizer. Per-token averaging is not a validated solution to cross-lingual tokenizer bias; that remains a research question.</p>
  </ExperimentLayout>;
}
