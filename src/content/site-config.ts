export const siteConfig = {
  name: "Pallab Biswas",
  description: "Dual Degree student at IIT Kharagpur exploring machine learning, language models, and reliable AI systems.",
  // Add only verified public values. Missing links are omitted throughout the UI.
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || undefined,
  email: "pallabbiswas891@gmail.com",
  github: "https://github.com/PallabBiswas3",
  linkedin: "https://www.linkedin.com/in/pallab-biswas-5358b028b/",
  resume: "", // e.g. /resume.pdf after adding the real file to public/
  location: "Kharagpur, India",
};

export const navigation = [
  ["Home", "/#home"], ["Play", "/#play"], ["About", "/#about"], ["Research", "/#research"],
  ["Projects", "/#projects"], ["Skills", "/#skills"], ["Experience", "/#experience"],
  ["Achievements", "/#achievements"], ["Contact", "/#contact"],
] as const;
