"use client";
import { useState } from "react";
import { ArrowRight, Fingerprint } from "lucide-react";
import { writingRounds } from "@/lib/case-experiments";
import { ExperimentLayout } from "./shared";

export default function FingerprintGame() {
  const [round, setRound] = useState(0);
  const [guess, setGuess] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [complete, setComplete] = useState(false);
  const sample = writingRounds[round];
  function choose(author: string) { if (guess) return; setGuess(author); if (author === sample.author) setScore(score + 1); }
  function reset() { setRound(0); setGuess(null); setScore(0); setComplete(false); }
  const feedback = complete ? "Topics repeat across both authors. A useful fingerprint should follow the writing style when the topic changes; these exaggerated toy styles do not establish real model-attribution performance." : guess ? `${guess === sample.author ? "Good detective work." : "A deliberate curveball."} ${sample.explanation}` : "Read the profiles, then choose an author. A shared subject is not necessarily a shared author.";
  return <ExperimentLayout mission="Attribute four short samples to the fictional bot that wrote them. Watch out for topic shortcuts." feedback={feedback} success={complete || guess === sample.author} score={`${score} / 4 correct`} hint="Atlas likes First / Second / Third. Comet likes a short Quick take and Done. The same topic can belong to either bot." onReset={reset} controls={<><span className="experiment-kicker">FICTIONAL WRITING PROFILES</span><div className="author-profile"><span>A</span><h3>Atlas</h3><p>Likes numbered steps, explicit transitions, and a structured explanation.</p></div><div className="author-profile comet"><span>C</span><h3>Comet</h3><p>Likes short takeaways, compact sentences, and a punchy ending.</p></div><p className="experiment-control-note">Real model fingerprints are subtler and can change with prompts, sampling, and editing.</p></>}>
    <div className="experiment-board-label">{complete ? "CASE CLOSED" : `SAMPLE ${round + 1} / 4`}<span>TOPIC: {sample.topic}</span></div>
    <Fingerprint className="experiment-feature-icon" size={28} />
    {complete ? <><h3 className="experiment-question">You found {score} of 4 fingerprints.</h3><p className="experiment-final-copy">The real research question is harder: do source-specific signals survive new prompts, topics, and generation settings?</p></> : <>
      <blockquote className="writing-sample">“{sample.text}”</blockquote>
      <div className="experiment-choice-pair">{["Atlas", "Comet"].map(author => <button key={author} disabled={guess !== null} className={guess === author ? "is-selected" : ""} onClick={() => choose(author)}>Bot {author}</button>)}</div>
      {guess && <button className="button primary experiment-next" onClick={() => { if (round === writingRounds.length - 1) setComplete(true); else { setRound(round + 1); setGuess(null); } }}>{round === 3 ? "See what you learned" : "Next sample"}<ArrowRight size={15} /></button>}
    </>}
    <p className="experiment-board-note">Manually authored text and invented authors. This is a style-recognition puzzle, not a real LLM classifier.</p>
  </ExperimentLayout>;
}
