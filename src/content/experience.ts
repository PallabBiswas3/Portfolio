export const education = [{
  institution: "Indian Institute of Technology Kharagpur",
  degree: "Dual Degree · Electrical Engineering",
  specialization: "Signal Processing and Machine Learning (SPML)",
  detail: "2023–2028 · B.Tech + M.Tech, with a minor in Computer Science. A foundation in mathematical methods, signals, statistical learning, and intelligent systems.",
}];
// Profile details supplied by Pallab in the LinkedIn PDF export, 5 November 2026.
type Experience = { organization: string; role: string; period: string; description: string; highlights?: string[]; workUrl?: string; workLabel?: string };
export const experience: Experience[] = [
  { organization: "Pocket FM", role: "Incoming GenAI Research Intern", period: "INCOMING · EXPECTED MAY–NOVEMBER 2027", description: "Selected for an upcoming GenAI internship, with interests in language models, NLP, and end-to-end AI systems. The role has not started; no completed work is claimed." },
  { organization: "Department of Artificial Intelligence", role: "Research Intern", period: "MARCH–JUNE 2025", description: "Developed a region-wise FTIR spectral-analysis pipeline. Explored baseline correction, PCA, EMD, EMSC, derivatives, simulated noise, and Hilbert-transform-based Complex-OLS, with classification and SHAP-based interpretation.", highlights: ["Spectral preprocessing: baseline correction, EMSC, and derivatives", "Noise analysis and representation methods: PCA, EMD, and Complex-OLS", "Classification and interpretation with SHAP"], workUrl: "https://github.com/PallabBiswas3/FTIR_Spectra", workLabel: "Explore related FTIR notebooks" },
  { organization: "Electrical Engineering Society", role: "Subhead", period: "OCTOBER 2024–MARCH 2026", description: "Held a student leadership role in the Electrical Engineering Society at IIT Kharagpur." },
];
export const community = [
  { organization: "National Service Scheme", role: "Student Volunteer", period: "2023–2025" },
  { organization: "National Students’ Space Challenge", role: "Junior Coordinator → Subhead", period: "2023–2024" },
  { organization: "Space Technology Students’ Society", role: "Associate → Junior Executive Member", period: "2024" },
  { organization: "Pregrad", role: "AI & ML Mentorship Trainee", period: "2024" },
];
// Credential names, issuers, and issue months visible on the public LinkedIn profile,
// checked 6 November 2026. Dates below are issuance dates, not course durations.
export const credentials = [
  { name: "MATLAB", issuer: "MathWorks", issued: "March 2025", dateTime: "2025-03", area: "Scientific computing" },
  { name: "MATLAB Onramp", issuer: "MathWorks", issued: "October 2024", dateTime: "2024-10", area: "Numerical computing foundations" },
  { name: "Simulink Onramp", issuer: "MathWorks", issued: "October 2024", dateTime: "2024-10", area: "Modeling and simulation" },
  { name: "GEOINT Professional — Remote Sensing & Imagery Analysis (CGP-R)", issuer: "Indian Institute of Remote Sensing (IIRS), ISRO", issued: "September 2024", dateTime: "2024-09", area: "Remote sensing" },
  { name: "Summer Analytics 2024", issuer: "Consulting & Analytics Club, IIT Guwahati", issued: "April 2024", dateTime: "2024-04", area: "Analytics" },
];
