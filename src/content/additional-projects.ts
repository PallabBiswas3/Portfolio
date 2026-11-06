import type { Project } from "./projects";

export const additionalProjects: Project[] = [
  {
    slug: "pbstats", name: "PBstats", title: "Signal processing, with a fluent Python API.",
    category: "SIGNAL PROCESSING · OPEN SOURCE", filter: "Engineering", number: "05", visual: "signal",
    status: "Published Python package", summary: "A signal-aware Python toolkit for cleaning, transforming, profiling, and visualizing data through reusable processing pipelines.",
    tags: ["Python", "NumPy", "SciPy", "PyWavelets"], repo: "https://github.com/PallabBiswas3/PEstats", documentation: "https://pypi.org/project/PBstats/",
    note: "Public source and package metadata are linked below. Features are documented in the repository; no performance multiplier or benchmark claim is reproduced here.",
    pipeline: [
      { label: "Signal", description: "Wrap sampled measurements and their sampling rate in a Data object." },
      { label: "Preprocess", description: "Compose cleaning, normalization, imputation, and outlier-handling operations." },
      { label: "Transform", description: "Explore FFT, STFT, Hilbert, and continuous wavelet representations." },
      { label: "Measure", description: "Inspect signal-aware metrics such as RMS, SNR, energy, and peak frequency." },
      { label: "Reuse", description: "Save and reload processing workflows as JSON, and run batch processing with reports." },
    ],
    sections: [
      { title: "The problem", paragraphs: ["Signal-processing work often repeats the same cleaning, transformation, and inspection steps across many recordings. Keeping those steps explicit makes experiments easier to inspect and reuse.", "PBstats organizes signal analysis around a Data object and chainable operations, connecting preprocessing to frequency and time-frequency views."] },
      { title: "Technical approach", paragraphs: ["The package separates core Data and Pipeline logic from preprocessing, transforms, statistics, and visualization. Its dependencies include NumPy, SciPy, pandas, PyWavelets, scikit-learn, matplotlib, and statsmodels."], bullets: ["FFT and STFT for spectral inspection", "Hilbert transform for envelope and phase", "Continuous wavelet transforms", "Signal-aware metrics and statistical diagnostics"] },
      { title: "A documented usage pattern", paragraphs: ["This example follows the repository’s documented fluent API. The input is an illustrative synthetic signal, not a measured project result."], markdown: "```python\nfrom PBstats import Data\nimport numpy as np\n\nfs = 1000\nt = np.linspace(0, 1, fs)\nsignal = np.sin(2 * np.pi * 50 * t)\n\n(Data(signal, fs=fs, label=\"50 Hz example\")\n .remove_dc()\n .standardize()\n .fft()\n .plot_spectrum())\n```" },
      { title: "Implementation details", paragraphs: ["The repository documents vectorized forward/backward imputation, handling for constant and zero-variance signals, and JSON-based reusable pipelines. The package metadata identifies release 0.1.1 and Python 3.10 or newer.", "A PyPI distribution is available, making the project usable beyond a standalone notebook."] },
      { title: "Validation & trade-offs", paragraphs: ["Numerical processing needs meaningful checks for sampling rates, units, constant data, and transformation assumptions. The repository’s performance language is not treated here as an independently reproduced benchmark.", "A fluent API makes analysis concise, while requiring care that operation order and any in-place behavior remain understandable to callers."] },
      { title: "Limitations & next steps", paragraphs: ["Future documentation can pair runnable examples with explicit numerical tolerances, reference outputs, and versioned performance experiments. The public repository and package page are the authoritative resources for the current implementation."] },
    ],
  },
  {
    slug: "tinyml-anomaly-detection", name: "TinyML Anomaly Detector", title: "A neural network small enough for the sensor.",
    category: "EDGE AI · EMBEDDED ENGINEERING", filter: "AI systems", number: "06", visual: "chip",
    status: "Embedded prototype", summary: "An ESP32 anomaly detector with a hand-written C++ autoencoder, exported model weights, and reconstruction-error scoring on ultrasonic sensor features.",
    tags: ["ESP32", "C++", "Keras", "Autoencoder"], repo: "https://github.com/PallabBiswas3/TinyMl_Anomaly_Detection", documentation: "https://github.com/PallabBiswas3/TinyMl_Anomaly_Detection/blob/main/README.md",
    note: "Architecture checked against the public inference implementation. Hardware timings in the repository are author-reported and are not independently remeasured by this portfolio.",
    pipeline: [
      { label: "Sensor", description: "HC-SR04 measurements produce distance, jitter, rate-of-change, and variance features." },
      { label: "Normalize", description: "Firmware applies feature-wise normalization using exported minimum and maximum constants." },
      { label: "Encode", description: "A pure C++ dense forward pass maps four features through 8 hidden units to a 2-dimensional latent vector." },
      { label: "Decode", description: "The decoder maps 2 → 8 → 4, using ReLU hidden activations and a sigmoid reconstruction output." },
      { label: "Score", description: "Mean squared reconstruction error is compared with a configured anomaly threshold. Firmware records inference time using micros()." },
    ],
    sections: [
      { title: "The problem", paragraphs: ["Embedded anomaly detection must work within the memory and compute budget of a microcontroller. Shipping a full inference runtime is not always necessary for a small, fixed network.", "This project explores a compact autoencoder whose learned weights are exported from Python and used directly by ESP32 firmware."] },
      { title: "Technical approach", paragraphs: ["The model consumes four features: distance, jitter, rate of change, and variance. It reconstructs the normalized feature vector using a 4 → 8 → 2 → 8 → 4 dense network.", "The C++ source implements matrix multiplication, bias addition, ReLU, sigmoid, normalization, and MSE scoring directly, without a TensorFlow runtime."] },
      { title: "Implementation", paragraphs: ["The firmware declares static encoder and decoder weight arrays, uses stack-local hidden activations, and times its forward pass with micros(). Python training exports the model constants for deployment.", "A simulation mode provides normal, close-object, and high-jitter scenarios. These synthetic scenarios exercise the workflow and should be distinguished from a field-validation dataset."], markdown: "The anomaly score is the mean squared reconstruction error over four normalized features:\n\n$$\nE(x) = \\frac{1}{4} \\sum_{j=1}^{4} (x_j - \\hat{x}_j)^2\n$$\n\nA sample is flagged when $E(x)$ exceeds the configured threshold." },
      { title: "Validation & observations", paragraphs: ["The public README reports approximately 19 μs inference on an ESP32-D0WDQ5 at 240 MHz, with a 5 Hz sampling rate. That is a repository-reported hardware measurement, not a timing reproduced here.", "Inference latency and sensor sampling rate measure different parts of the system. A fast forward pass alone does not establish detection accuracy or the frequency of physical events the complete sensor loop can resolve."] },
      { title: "Engineering trade-offs", paragraphs: ["Exporting fixed arrays keeps the forward pass small and inspectable, while placing responsibility for numerical consistency and model updates on the training-to-firmware pipeline.", "An autoencoder’s reconstruction error is a useful signal, but the threshold and training distribution determine its behavior. An unusual signal is not automatically a diagnosis of a specific physical fault."] },
      { title: "Limitations & next steps", paragraphs: ["Broader validation would compare normal and anomalous sensor runs under documented operating conditions, report false alarms and missed detections, and verify that Python and firmware inference agree within a stated tolerance."] },
    ],
  },
];
