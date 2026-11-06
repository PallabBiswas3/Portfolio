import { test } from "node:test";
import assert from "node:assert/strict";
import { createSamples, evaluateClassifier } from "../src/lib/classifier-game.ts";

test("each linear challenge can be solved by its intended boundary", () => {
  assert.equal(evaluateClassifier(createSamples(0), { slope: 0, bias: 50, interaction: false }).accuracy, 100);
  assert.equal(evaluateClassifier(createSamples(1), { slope: .6, bias: 20, interaction: false }).accuracy, 100);
});
test("XOR requires the interaction feature to reach the win threshold", () => {
  const data = createSamples(2);
  let best = 0;
  for (let slope = -1; slope <= 1; slope += .05) for (let bias = 0; bias <= 100; bias++) best = Math.max(best, evaluateClassifier(data, { slope, bias, interaction: false }).accuracy);
  assert.ok(best < 90, `a straight line should not win XOR; got ${best}%`);
  assert.equal(evaluateClassifier(data, { slope: 0, bias: 50, interaction: true }).accuracy, 100);
});
test("all toy samples remain within the plotted feature range", () => {
  for (let level = 0; level < 3; level++) for (const { x, y } of createSamples(level)) assert.ok(x >= 0 && x <= 100 && y >= 0 && y <= 100);
});
