import { test } from "node:test";
import assert from "node:assert/strict";
import { checkEvidenceMove, evidenceRounds, writingRounds, simulateCharging, tokenScores, makeSignal, processSignal, spectrum, dominantBin, assessThreshold, reconstructionError, experimentInfo } from "../src/lib/case-experiments.ts";

test("all six case studies have distinct interactive concepts", () => {
  assert.equal(Object.keys(experimentInfo).length, 6);
  assert.equal(new Set(Object.values(experimentInfo).map(x => x.title)).size, 6);
});
test("evidence puzzles require both sources and reject unsupported actions", () => {
  for (let round=0; round<evidenceRounds.length; round++) {
    const correct=evidenceRounds[round].correct;
    assert.equal(checkEvidenceMove(round,correct,["manual"]).success,false);
    assert.equal(checkEvidenceMove(round,correct,["manual","sensor"]).success,true);
    assert.equal(checkEvidenceMove(round,(correct+1)%3,["manual","sensor"]).success,false);
  }
});
test("writing puzzle uses both authors on each topic", () => {
  for (const topic of new Set(writingRounds.map(x=>x.topic))) assert.deepEqual(new Set(writingRounds.filter(x=>x.topic===topic).map(x=>x.author)),new Set(["Atlas","Comet"]));
});
test("pricing has a reachable goal and conserves arriving drivers", () => {
  assert.equal(simulateCharging(6,6,6).won,true);
  assert.equal(simulateCharging(3,6,6).won,false);
  for(let price=1;price<=10;price++) for(let capacity=3;capacity<=8;capacity++) for(let rival=2;rival<=10;rival++) {
    const r=simulateCharging(price,capacity,rival);
    assert.equal(r.arrivals,r.served+r.queue);
    assert.ok(r.served<=capacity && r.queue>=0 && r.arrivals<=12);
  }
  assert.ok(simulateCharging(8,6,6).arrivals<simulateCharging(3,6,6).arrivals);
});
test("token length changes sequence probability but not constant-token geometric mean", () => {
  const a=tokenScores(3,.9),b=tokenScores(12,.9);
  assert.ok(a.sequence>b.sequence);
  assert.ok(Math.abs(a.geometricMean-b.geometricMean)<1e-12);
  assert.ok(Math.abs(b.geometricMean-.9)<1e-12);
});
test("signal cleanup removes DC and preserves both hidden frequencies across game settings", () => {
  for(const frequency of [3,7]) for(const noise of [0,.65,1]) for(const smooth of [false,true]) {
    const raw=makeSignal(frequency,noise),clean=processSignal(raw,true,smooth);
    assert.equal(dominantBin(spectrum(raw)),0);
    assert.ok(Math.abs(clean.reduce((a,b)=>a+b,0)/clean.length)<1e-12);
    assert.equal(dominantBin(spectrum(clean)),frequency);
  }
});
test("threshold game exposes false alarms, missed anomalies, and a solvable middle", () => {
  assert.ok(assessThreshold(.02).every(x=>x.correct));
  assert.equal(assessThreshold(.3)[2].alarm,false);
  assert.equal(assessThreshold(0)[1].alarm,true);
  assert.equal(reconstructionError(40,2),0);
});
