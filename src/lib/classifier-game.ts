export type Sample = { x: number; y: number; label: 0 | 1 };
export type Classifier = { slope: number; bias: number; interaction: boolean };

export const challenges = [
  { title: "The coffee test", subtitle: "Bots took the espresso. Cats took a nap.", hint: "Keep the slope flat and move the boundary between the two groups.", lesson: "A linear boundary separates these two groups with one threshold." },
  { title: "A slanted situation", subtitle: "The cats have discovered espresso. Awkward.", hint: "Try a positive slope near 0.6 and a bias near 20.", lesson: "Changing the weights rotates a linear classifier’s decision boundary." },
  { title: "The XOR plot twist", subtitle: "The cats are trolling your linear model.", hint: "One straight line cannot separate alternating corners. Add the interaction feature.", lesson: "The feature (x − 50)(y − 50) makes this XOR pattern separable. Feature choice changes what a model can represent." },
] as const;

export function createSamples(level: number): Sample[] {
  if (level === 2) {
    return [20, 35, 65, 80].flatMap(x => [20, 35, 65, 80].map(y => ({ x, y, label: ((x - 50) * (y - 50) > 0 ? 1 : 0) as 0 | 1 })));
  }
  return Array.from({ length: 24 }, (_, i) => {
    const label = (i % 2) as 0 | 1;
    const x = 10 + ((i * 31) % 80);
    const center = level === 0 ? 50 : .6 * x + 20;
    const y = center + (label ? 1 : -1) * (11 + (i * 7) % 12);
    return { x, y, label };
  });
}

export function predict(sample: Pick<Sample, "x" | "y">, model: Classifier): 0 | 1 {
  if (model.interaction) return (sample.x - 50) * (sample.y - 50) >= (model.bias - 50) * 20 ? 1 : 0;
  return sample.y >= model.slope * sample.x + model.bias ? 1 : 0;
}

export function evaluateClassifier(samples: Sample[], model: Classifier) {
  const correct = samples.filter(sample => predict(sample, model) === sample.label).length;
  return { correct, total: samples.length, accuracy: Math.round(100 * correct / samples.length) };
}
