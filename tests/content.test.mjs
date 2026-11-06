import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { getNotes } from "../src/lib/writing.ts";

test("writing stays private until explicitly published with valid metadata", t => {
  const file = path.join(process.cwd(), "src/content/writing/__verification-probe.md");
  assert.equal(fs.existsSync(file), false, "do not replace an existing file");
  t.after(() => { if (fs.existsSync(file)) fs.unlinkSync(file); });
  const body = "\n## A concrete question\n\nA short research note.\n\n## সীমাবদ্ধতা\n\nKnown limitations.\n";
  const write = (published, date = '"2026-11-05"') => fs.writeFileSync(file, `---\ntitle: "Verification probe"\ndescription: "Temporary test fixture"\ndate: ${date}\npublished: ${published}\n---\n${body}`);
  write(false);
  assert.equal(getNotes().some(n => n.slug === "__verification-probe"), false);
  write('"true"');
  assert.equal(getNotes().some(n => n.slug === "__verification-probe"), false, "string true is not publication approval");
  write(true, '"invalid-date"');
  assert.equal(getNotes().some(n => n.slug === "__verification-probe"), false);
  write(true);
  const note = getNotes().find(n => n.slug === "__verification-probe");
  assert.ok(note);
  assert.equal(note.title, "Verification probe");
  assert.equal(note.readingTime, 1);
  assert.deepEqual(note.toc.map(item => item.id), ["a-concrete-question", "সীমাবদ্ধতা"]);
  assert.ok(note.content.includes("Known limitations."));
});
