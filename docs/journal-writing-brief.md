# Journal writing brief

Read this before writing or editing any Journal article. The plan (topics, order,
target searches) is in `docs/journal-plan.md`.

## Who we are writing for

People searching Google or asking an AI assistant things like "interior designer Tel
Aviv", "renovate a holiday home in Greece as a foreigner", "boutique hotel interior
designer". They are about to spend real money on a home or business and want someone
they can trust. Each article must genuinely answer their question, show that Coco
Atelier has done this kind of work, and make contacting Coral the obvious next step.

## Facts you may use (and nothing else)

- Coco Atelier is the interior design studio of **Coral Mesika**, based in **Tel Aviv**,
  working locally and internationally. Raised in the US. Practice spans residential,
  hospitality and commercial interiors (see `src/routes/studio.tsx` for her own words).
- Recognition (exactly as on the site): A' Design Award — Interior Space & Exhibition
  Design, 2019–2020; YAC Calamity Atelier — Honorary Mention. Press: `src/lib/press.ts`.
- Projects: `src/lib/projects.ts` (name, category, year, size, location, description).
  Describe a project only with what is written there or visible in its photos.
- Contact: WhatsApp / phone (+972 54 264 5228), Instagram @coco.atelier.
- She is an **interior designer / interior architect**, never "architect" alone and never
  "licensed architect" (a protected title in Israel).

Never invent: clients, quotes, testimonials, prices, fees, statistics, timelines stated
as hers, awards, team size, years in practice, services not listed above. General
industry knowledge is fine when written as general ("permits in Tel Aviv usually…"),
not as a claim about Coral. If a sentence needs a fact only Coral can give (her fee
structure, her exact process steps, a project detail), write the best neutral version
and add an HTML comment right after it:
`<!-- CORAL: confirm or correct — what we need to know -->`
The build refuses to publish any article that still contains `CORAL:`.

## Voice

- Calm, precise, confident; the studio's tagline is "quiet drama". Write like an
  experienced designer explaining things to an intelligent client over coffee.
- Mostly second person ("you") for guidance; "we at Coco Atelier" / "in our projects"
  only for things the facts above support. Do not write in Coral's first person ("I").
- Specific over general: name materials, rooms, dimensions, decisions, trade-offs.
- Banned: elevate, nestled, timeless elegance, seamless blend, curated, oasis, haven,
  "in today's fast-paced world", "whether you're… or…", "look no further", "unlock",
  "game-changer", exclamation marks, emoji, rhetorical questions as openers.
- British-neutral English is fine; be consistent within an article.

## Structure (SEO and AI search)

1. **First 2–3 sentences answer the search directly.** AI Overviews, ChatGPT and
   Perplexity quote the clearest direct answer on the page.
2. Then 4–7 `##` sections with descriptive, keyword-natural headings (questions people
   actually ask work well). `###` for sub-points. Short paragraphs (2–4 sentences).
   Use a list or a small table where it truly helps (checklists, comparisons).
3. Mention the target search phrase naturally in the first paragraph, one `##`
   heading and the description — never stuffed.
4. Link to 2–4 relevant pages on the site with relative Markdown links:
   projects `/work/<slug>`, `/projects`, `/studio`, `/contact`, other Journal articles
   `/journal/<slug>` (only ones that exist or are in the same batch).
5. One or two project photos inside the article where relevant:
   `![Descriptive alt text: what the photo shows, in which project](/assets/...)`
   using real files from `public/assets/` (check the file exists).
6. End with `## Frequently asked questions` containing 3–5 `###` questions, each
   answered in 2–4 sentences. These become FAQ structured data.
7. Finish with a short closing paragraph that invites contact (WhatsApp/phone via
   `/contact`), specific to the article's reader. No hard sell.
8. Length: 1,200–1,900 words for broad topics, 900–1,300 for narrow ones.

## File format

One file per article: `src/content/journal/<slug>.md`. The slug is short, lowercase,
hyphenated, keyword-led (e.g. `interior-designer-tel-aviv`). Header:

```
---
title: How to choose an interior designer in Tel Aviv
date: 2026-12-01
excerpt: One or two sentences, ≤155 characters. Used as the meta description and in previews.
cover: /assets/xl-apt/850_3625aaa.jpg
coverAlt: Open living space in XL APT, Tel Aviv, with timber slat partition
projects: xl-apt, mel-apt
draft: true
---
```

- `title` ≤ 60 characters where possible (it is the Google headline).
- `cover` must be a real photo in `public/assets/`; `coverAlt` describes it.
- `projects`: slugs from `src/lib/projects.ts` to show as "Related projects".
- `draft: true` until Coral has reviewed it. `date` is the publish date; the site only
  shows articles whose date has arrived.
- Hebrew version: same header plus `lang: he` and `translationOf: <english-slug>`,
  file named `<english-slug>-he.md`, written natively in Hebrew (not translated
  word-for-word), targeting the Hebrew search terms.
