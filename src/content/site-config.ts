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

// Keep the primary navigation focused; all other sections remain in the mobile menu.
export const navigation = [
  ["Work", "/#projects"], ["About", "/#about"], ["Research", "/#research"],
  ["Experience", "/#experience"], ["Contact", "/#contact"],
] as const;

export const mobileNavigation = [
  ["Home", "/#home"], ...navigation, ["Play", "/#play"],
  ["Skills", "/#skills"], ["Achievements", "/#achievements"], ["Writing", "/writing"],
] as const;
