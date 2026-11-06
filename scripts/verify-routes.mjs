import assert from "node:assert/strict";

const base = process.env.PORTFOLIO_TEST_ORIGIN || "http://127.0.0.1:3000";
const gameRoutes = new Set(["sovereign-ai", "name-that-llm", "ev-dynamic-pricing", "multilingual-hallucination", "pbstats", "tinyml-anomaly-detection"]);
const routes = ["/projects/controlplane", "/projects/industrial-diagnostics", "/projects/qlora-sqlbench", "/projects/optimizer-reliability", "/", "/research", "/writing", "/projects/sovereign-ai", "/projects/name-that-llm", "/projects/ev-dynamic-pricing", "/projects/multilingual-hallucination", "/projects/pbstats", "/projects/tinyml-anomaly-detection"];
const pages = new Map();
for (const route of routes) {
  const response = await fetch(new URL(route, base));
  assert.equal(response.status, 200, route);
  const html = await response.text();
  assert.match(html, /<h1[\s>]/, `${route} has a primary heading`);
  assert.match(html, /<title>[^<]+<\/title>/, `${route} has a title`);
  assert.doesNotMatch(html, /href="(?:#|undefined|null)"/, `${route} has no empty action links`);
  if (gameRoutes.has(route.split("/").at(-1))) {
    assert.match(html, /id="playground"/, `${route} has a playable explainer`);
    assert.match(html, /Illustrative learning game/, `${route} labels the learning example`);
  }
  pages.set(route, html);
  console.log(`PASS ${route}`);
}
for (const [route, html] of pages) {
  for (const match of html.matchAll(/<a\s[^>]*href="([^"]+)"/g)) {
    const url = new URL(match[1].replaceAll("&amp;", "&"), new URL(route, base));
    if (url.origin !== new URL(base).origin) continue;
    if (url.hash && pages.has(url.pathname)) {
      assert.ok(pages.get(url.pathname).includes(`id="${decodeURIComponent(url.hash.slice(1))}"`), `${route}: anchor ${match[1]} exists`);
    }
    if (!url.hash && !pages.has(url.pathname)) {
      assert.equal((await fetch(url)).status, 200, `${route}: internal link ${match[1]}`);
    }
  }
}
const assets = new Set([...pages.values()].flatMap(html => [...html.matchAll(/(?:src|href)="(\/_next\/[^\"]+)"/g)].map(match => match[1].replaceAll("&amp;", "&"))));
await Promise.all([...assets].map(async asset => assert.equal((await fetch(new URL(asset, base))).status, 200, `asset ${asset}`)));
assert.match(pages.get("/projects/name-that-llm"), /class="katex"/, "the case-study equation renders as mathematical notation");
console.log(`PASS ${assets.size} JavaScript, CSS, and font assets; case-study math rendering`);
for (const route of ["/robots.txt", "/sitemap.xml", "/icon.svg", "/opengraph-image"]) {
  const response = await fetch(new URL(route, base));
  assert.equal(response.status, 200, route);
  console.log(`PASS ${route}`);
}
for (const route of ["/does-not-exist", "/projects/unknown-project", "/writing/_template"]) {
  assert.equal((await fetch(new URL(route, base))).status, 404, route);
  console.log(`PASS ${route} → 404`);
}
assert.doesNotMatch(pages.get("/"), /4911|1450|CGPA|href="tel:/, "unverified rankings and telephone links are not public");
assert.match(pages.get("/"), /Incoming GenAI Research Intern/, "the authorized upcoming role is labeled incoming");
assert.match(pages.get("/"), /Cats vs\. bots/, "the homepage contains the playable ML game");
assert.match(pages.get("/writing"), /No articles are published yet/, "drafts do not appear as published writing");
console.log("All route, anchor, metadata, and draft visibility checks passed.");
