# Pallab Biswas — personal portfolio

A complete, dark-first portfolio built with Next.js App Router, React, TypeScript, Tailwind CSS, Motion, and Lucide. Includes ten project case studies, a curated public-repository workshop, a research overview, Markdown writing, light/dark themes, project filters, interactive architecture diagrams, and a playable ML game. No backend service or paid infrastructure is required.

## Run locally

Requires Node.js 20.9 or newer and npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. For a production preview:

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

`package-lock.json` records installed dependency versions. Use `npm ci` for reproducible installation.

`npm test` checks the publication gate for writing, Unicode anchors, and the classifier game’s solvability and XOR constraint (Node.js 22.18+). With the production preview running, `npm run verify:routes` checks all public routes, section anchors, metadata endpoints, and expected 404s. Set `PORTFOLIO_TEST_ORIGIN` to test a different local origin.

## Content and links

All personal content is separate from the UI in `src/content/`:

| File | What it controls |
| --- | --- |
| `site-config.ts` | Name, description, public contact details, résumé, navigation |
| `projects.ts` | Cards, case studies, technology tags, status, architecture stages, repository and demo links |
| `research.ts` | Questions, methods, evidence, next steps, and repository sources |
| `github-projects.ts` | ControlPlane, industrial diagnostics, QLoRA-SQLBench, and optimizer research case studies |
| `skills.ts` | Technical categories and tools |
| `experience.ts` | Education and authorized experience entries |
| `open-source.ts` | Curated, source-linked repository summaries |
| `additional-projects.ts` | PBstats and TinyML case studies |
| `achievements.ts` | Verified achievements and problem-solving themes |
| `writing/*.md` | Published notes and unpublished drafts |

The supplied GitHub and LinkedIn profiles and the email from the profile export are configured in `site-config.ts`. A résumé remains optional. To change public contact details, edit that file:

```ts
email: "your-verified-address@example.com",
github: "https://github.com/your-verified-account",
linkedin: "https://www.linkedin.com/in/your-verified-account/",
resume: "/resume.pdf",
```

These are examples for the maintainer, not values shown on the site. Add the real PDF at `public/resume.pdf` before setting the résumé path. Remove the path to hide the résumé links. Place authentic images in `public/images/`, use descriptive alt text, and use Next.js `Image` with dimensions when adding project screenshots.

To add a project, add a typed object to `projects.ts` with a unique URL-safe slug. The card, static detail route, architecture explorer, next-project link, and sitemap entry derive from that file. Optional `repo`, `demo`, and `documentation` fields activate external links. Update `research.ts` separately when the research summary changes.

Each case-study section also accepts `markdown` (code fences, math, and tables), `result` (`value`, `unit`, `label`, `context`), and an authentic `image` (`src`, `alt`, `width`, `height`, `caption`). Images render through Next.js image optimization. The attribution study includes the balanced-accuracy equation; no benchmark tables or screenshots are fabricated.

## Accuracy and public disclosure

- Case-study narratives combine the supplied brief with public repository documentation reviewed on 5 November 2026. Source links are attached to the corresponding projects.
- Project status does not imply that every described experiment has been completed.
- The approximately 41.6% balanced accuracy is labeled as an earlier internal, preliminary evaluation. Add the dataset, class roster, folds, seeds, confidence intervals, and reproducible artifacts before presenting it as a benchmark.
- Multilingual hallucination detection remains research in progress, with no claimed success, publication, or validated novelty.
- All project visuals are illustrative; none are presented as screenshots or empirical plots. The EV visual has no fabricated benchmark or financial values.
- Unconfirmed rankings, programming ratings, CGPA, scholarships, and department-change claims are omitted. Add only verified achievements to `achievements.ts`.
- Education, the Computer Science minor, FTIR research internship, society/community roles, and selected credentials come from the user-supplied LinkedIn profile export. Its mobile number is not published, and the PDF itself is not copied to public assets.
- Pocket FM is included because the user supplied the public-facing profile headline and requested its content be added. It is explicitly labeled incoming, with expected dates from the original brief; no completed work is claimed.
- Public source confirms the EV frontend is Vite + React + TypeScript. SovereignAI’s current application documentation is kept distinct from diagnostic research-branch results. TinyML timing is labeled repository-reported, not independently remeasured.
- No articles, demo URLs, résumé, publications, or photos were invented. No live repository statistics are displayed.

## Homepage game and density

`src/components/classifier-game.tsx` implements **Cats vs. Bots**, a three-round classifier game in the hero. Visitors adjust slope and bias to separate deterministic synthetic samples. The final XOR round requires an interaction feature; a straight-line classifier cannot reach the win threshold. This is a hand-tuned toy classifier, not a trained model or a project benchmark. No API, GPU, tracking, timer, or network service is involved.

The pure prediction/data logic is in `src/lib/classifier-game.ts`. The game supports native keyboard/touch range inputs, hints, resets, round progression, a win state, and replay. Theme-aware styles and the denser homepage layout are in `src/app/home.css`. Scores apply only to the displayed toy samples.

## Playable case-study explainers

Every `/projects/[slug]` page includes a **Play the idea** section, accessible from the page header and case-study contents. Each has a plain-language mission, feedback, hints, and reset controls:

| Case study | Interaction | Concept |
| --- | --- | --- |
| SovereignAI | Inspect permitted sources, answer three questions, encounter a restricted attachment | Grounding, honest abstention, and human approval |
| Name That LLM | Guess which fictional bot wrote four hand-authored examples | Style signals versus topic shortcuts |
| EV Dynamic Pricing | Tune price, charging capacity, and a rival’s price | Demand, queues, and revenue trade-offs |
| Multilingual Hallucination | Change toy token counts, compare sequence probability with geometric mean, answer a factuality question | Length effects and why confidence does not establish correctness |
| PBstats | Remove an offset, optionally smooth, and identify two synthetic frequencies | Signal cleanup and frequency analysis |
| TinyML Anomaly Detector | Inspect sensor presets and tune a threshold against three reference cases | Reconstruction-error scoring, false alarms, and missed anomalies |

These are browser-local teaching games with invented data and simplified rules, not live models, benchmarks, or replicas of the projects. In particular, geometric-mean normalization is not claimed as a validated cross-lingual solution; the TinyML sketch uses a fixed typical pattern rather than a trained autoencoder; and the EV game does not execute an equilibrium solver or calculate financial profit.

`src/components/project/case-playground.tsx` selects a separately bundled game for each case study. Components and styles live under `src/components/project/playgrounds/`. Pure toy-model functions and editable explainer titles are in `src/lib/case-experiments.ts`; their meaningful behavioral tests are in `tests/case-experiments.test.mjs`. All controls use native buttons, checkboxes, and range inputs, with named controls, focus indicators, and status feedback. No new dependency or external service is required.

## Writing

Copy `src/content/writing/_template.md` to a unique URL-safe filename such as `evaluation-notes.md`. Replace its content with your original article and edit the frontmatter:

```yaml
title: "A verified technical note"
description: "What this note explains"
date: "2026-11-05"
category: "Machine Learning"
published: false
```

Set `published: true` only when ready. Keep the date quoted as an ISO date string. Drafts and invalid frontmatter do not receive routes, cards, or sitemap entries. There are no published sample articles by default.

The Markdown renderer supports fenced code with syntax highlighting, GFM tables, internal links, inline and block math via KaTeX, publication dates, estimated reading time, and a table of contents from unique plain-text `##` headings. Raw HTML is not enabled. Filenames become shareable `/writing/[slug]` URLs. Rebuild after changing content.

## SEO and environment

No environment variables are required to run locally. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the real HTTPS production origin (no trailing slash). This enables canonical links and sitemap URLs without inventing a domain. Without it, the sitemap is empty and canonical URLs are omitted. Next.js generates `robots.txt`, `sitemap.xml`, an Open Graph image, and the favicon. Person structured data uses only supplied personal information and configured social URLs.

## Deploy to Vercel

1. Put this project in your own Git repository and import it into Vercel.
2. Select **Next.js**. Use `npm ci` as the install command and `npm run build` as the build command. Keep the default output setting.
3. Set `NEXT_PUBLIC_SITE_URL` to your production domain in the Vercel environment settings.
4. Deploy. If the domain changes, update the variable and redeploy.
5. Verify the homepage, six `/projects/*` routes, `/research`, `/writing`, `/sitemap.xml`, `/robots.txt`, and the configured résumé and profile URLs.

This project requires no database, authentication, server credentials, or contact-form provider. The optional email action uses `mailto:`.

## Design and accessibility

CSS tokens in `src/app/globals.css` define both themes, spacing, typography, and responsive layouts. Geist fonts are bundled locally by the `geist` package, so builds do not need Google Fonts. The header switches to mobile navigation below 900px; grids collapse for narrow viewports. Interactive controls have accessible names, visible focus indicators, keyboard support, and semantic state attributes. Reduced-motion preferences disable CSS animation and smooth scrolling and are respected by Motion components. Architecture explorers use native buttons and announce updated descriptions.

## Project structure

```text
src/app/                 Routes, metadata, styles, icons
src/components/layout/   Shared header and footer
src/components/project/  Project filters, architecture, reading progress
src/components/          Visuals and reusable layout primitives
src/content/             Editable portfolio data and Markdown
src/lib/writing.ts       Draft-aware Markdown loading and reading metadata
```

The project is intentionally local and Vercel-ready. No public hosting or external publication is performed by creating these files.

## Work and research content review — 6 November 2026

The work section now contains ten case studies, led by repository-backed systems. Four added studies link to their public source documentation: ControlPlane, Time-Series-Diagnostic-Agent, LoRA-SQL, and Adam_Research/trustgeoopt. New studies use conceptual workflow illustrations; the original six retain their interactive games. The case-study template only offers a game link when one exists.

The research overview separates question, motivation, method, current evidence, and next step. Source-reported CARE figures retain the high false-alarm rate; QLoRA has no claimed accuracy gain; TrustGeoOpt is explicitly a research foundation with an unimplemented proposed optimizer. Existing attribution and multilingual studies remain exploratory.

The repository shelf highlights Graph-RAG, FTIR_Spectra, LDMSeg-ViT, Factor_Alpha, ARC-AGI team coursework, and Edge_AI_System. These are curated descriptions of public documentation and artifacts, not independently reproduced performance results. Private repositories are not used for new public content.

## LinkedIn profile review — 6 November 2026

The public profile at https://www.linkedin.com/in/pallab-biswas-5358b028b/ confirms IIT Kharagpur education dates (2023–2028) and lists MATLAB, MATLAB Onramp, Simulink Onramp, GEOINT Remote Sensing & Imagery Analysis, Summer Analytics 2024, and JBNSTS Junior Scholar. Training entries preserve the profile’s listed issuer and issuance month. JBNSTS is presented separately as recognition.

Most current role titles and descriptions are hidden in the publicly retrievable profile. Existing experience entries retain the previously supplied profile-export details; the new FTIR bullet list summarizes that existing description and links related public notebooks. No additional employment, performance claims, or follower statistics were inferred from hidden profile fields.
