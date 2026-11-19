import { marked } from "marked";

// Journal posts are Markdown files in src/content/journal/, one per post.
// The file name is the address: "material-palettes.md" -> /journal/material-palettes.
// Full writing rules and header format: docs/journal-writing-brief.md. In short:
//
//   ---
//   title: On material palettes
//   date: 2026-11-19            publish date; the live site shows a post from this day on
//   updated: 2026-12-02         (optional) last meaningful revision
//   excerpt: ≤155 characters; meta description and preview text
//   cover: /assets/xl-apt/850_3625aaa.jpg   (optional; needs a share copy, see AGENTS.md)
//   coverAlt: What the cover photo shows
//   projects: xl-apt, mel-apt   (optional) shown as "Related projects"
//   lang: he                    (optional) Hebrew, right-to-left
//   translationOf: some-slug    (optional) the English post this one translates
//   draft: true                 (optional) only visible in local preview
//   ---
//
// A "## Frequently asked questions" section with "###" questions becomes FAQ
// structured data. Notes for Coral are HTML comments starting with "CORAL:";
// the build refuses to publish a post that still contains one.

export type Faq = { question: string; answer: string };

export type JournalPost = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  updated: string;
  excerpt: string;
  cover?: string | undefined;
  coverAlt: string;
  projects: string[];
  lang: "en" | "he";
  rtl: boolean;
  translationOf?: string | undefined;
  draft: boolean;
  html: string;
  faq: Faq[];
  words: number;
  pendingNotes: number;
};

const files = import.meta.glob<string>("../content/journal/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const DATE = /^\d{4}-\d{2}-\d{2}$/;

const plain = (markdown: string) =>
  markdown
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();

// Questions and answers from the "Frequently asked questions" section.
function extractFaq(body: string): Faq[] {
  const section = body.split(/^##\s+Frequently asked questions\s*$/im)[1];
  if (!section) return [];
  const untilNextH2 = section.split(/^##\s+(?!#)/m)[0] ?? "";
  return untilNextH2
    .split(/^###\s+/m)
    .slice(1)
    .map((block) => {
      const [question = "", ...rest] = block.split("\n");
      return { question: question.trim(), answer: plain(rest.join("\n")) };
    })
    .filter((f) => f.question && f.answer);
}

// Site links get the trailing "/" of their canonical address (no redirect on click
// or crawl); photos in the text load lazily so the cover and first screen come first.
const polish = (html: string) =>
  html
    .replace(
      /href="(\/(?!\/)[^"#?.]*?[^\/"#?])((?:[?#][^"]*)?)"/g,
      (_, path: string, rest: string) => `href="${path}/${rest}"`,
    )
    .replace(/<img (?![^>]*loading=)/g, '<img loading="lazy" decoding="async" ');

function parse(path: string, raw: string): JournalPost {
  const slug = path.split("/").pop()!.replace(/\.md$/, "");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`Journal post ${slug} is missing its --- header`);
  const [, header = "", body = ""] = match;
  const meta = new Map<string, string>();
  for (const line of header.split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i > 0) meta.set(line.slice(0, i).trim(), line.slice(i + 1).trim());
  }
  const title = meta.get("title");
  const date = meta.get("date");
  if (!title || !date || !DATE.test(date)) {
    throw new Error(`Journal post ${slug} needs a title and a date like 2026-11-19`);
  }
  const updated = meta.get("updated") || date;
  if (!DATE.test(updated))
    throw new Error(`Journal post ${slug}: updated must look like 2026-11-19`);
  const lang = meta.get("lang") === "he" ? "he" : "en";
  return {
    slug,
    title,
    date,
    updated,
    excerpt: meta.get("excerpt") ?? "",
    cover: meta.get("cover") || undefined,
    coverAlt: meta.get("coverAlt") ?? "",
    projects: (meta.get("projects") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    lang,
    rtl: lang === "he",
    translationOf: meta.get("translationOf") || undefined,
    draft: meta.get("draft") === "true",
    html: polish(marked.parse(body, { async: false }) as string),
    faq: extractFaq(body),
    words: plain(body).split(" ").length,
    pendingNotes: (body.match(/<!--\s*CORAL:/g) ?? []).length,
  };
}

export const allPosts: JournalPost[] = Object.entries(files)
  .map(([path, raw]) => parse(path, raw))
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));

// The live site shows a post once it is not a draft and its date has arrived
// (a daily automatic rebuild publishes scheduled posts). Local preview shows all.
const today = new Date().toISOString().slice(0, 10);
export const isLive = (p: JournalPost) => !p.draft && p.date <= today;

for (const p of allPosts) {
  if (isLive(p) && p.pendingNotes > 0) {
    throw new Error(
      `Journal post "${p.slug}" is published but still has ${p.pendingNotes} CORAL: note(s) to resolve.`,
    );
  }
}

// Review preview (`npm run build:preview`, deployed to a private address): shows
// drafts and turns Coral's notes into visible boxes so they can be answered in place.
export const PREVIEW = import.meta.env["VITE_PREVIEW"] === "1";

const showNotes = (p: JournalPost): JournalPost => ({
  ...p,
  html: p.html.replace(
    /<!--\s*CORAL:\s*([\s\S]*?)-->/g,
    (_, note: string) =>
      `<aside class="coral-note"><strong>Question for Coral</strong> ${note
        .trim()
        .replace(/^confirm or correct\s*[—-]\s*/i, "")
        .replace(/</g, "&lt;")}</aside>`,
  ),
});

export const posts: JournalPost[] =
  import.meta.env.DEV || PREVIEW ? allPosts.map(showNotes) : allPosts.filter(isLive);

// The other-language version of a post, if both are visible.
export function translationFor(post: JournalPost): JournalPost | undefined {
  return posts.find(
    (p) =>
      p.slug !== post.slug &&
      ((post.translationOf && p.slug === post.translationOf) || p.translationOf === post.slug),
  );
}

export const readingMinutes = (post: JournalPost) => Math.max(1, Math.round(post.words / 220));

export const formatDate = (date: string, lang: "en" | "he" = "en") =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString(lang === "he" ? "he-IL" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
