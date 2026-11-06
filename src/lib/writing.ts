import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const directory = path.join(process.cwd(), "src/content/writing");
export const writingCategories = ["Machine Learning", "Large Language Models", "NLP Research", "Mathematical Foundations", "Algorithms", "Engineering Lessons"];
export type Note = { slug: string; title: string; description: string; date: string; category: string; content: string; readingTime: number; toc: { id: string; title: string }[] };
export function headingId(text: string) { return text.toLowerCase().replace(/[^\p{L}\p{M}\p{N}\s-]/gu, "").trim().replace(/\s+/g, "-"); }
export function getNotes(): Note[] {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory).filter(name => name.endsWith(".md")).flatMap(filename => {
    const { data, content } = matter(fs.readFileSync(path.join(directory, filename), "utf8"));
    if (data.published !== true || typeof data.title !== "string" || typeof data.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(data.date) || Number.isNaN(Date.parse(data.date))) return [];
    return [{ slug: filename.replace(/\.md$/, ""), title: data.title, description: String(data.description || ""), date: data.date, category: String(data.category || "Research Notes"), content, readingTime: Math.max(1, Math.ceil(content.split(/\s+/).length / 220)), toc: [...content.matchAll(/^## (.+)$/gm)].map(match => ({ title: match[1], id: headingId(match[1]) })) }];
  }).sort((a, b) => b.date.localeCompare(a.date));
}
