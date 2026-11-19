import { marked } from "marked";

// Journal posts are Markdown files in src/content/journal/, one per post.
// The file name is the address: "material-palettes.md" -> /journal/material-palettes.
// Each file starts with a small header between --- lines:
//
//   ---
//   title: On material palettes
//   date: 2026-11-19
//   excerpt: One or two sentences shown on the Journal page and in link previews.
//   cover: /assets/journal/material-palettes.jpg   (optional)
//   lang: he                                      (optional; Hebrew posts read right-to-left)
//   draft: true                                   (optional; shown only in `npm run dev`)
//   ---
//
// Everything below the header is the post, written in Markdown.

export type JournalPost = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  excerpt: string;
  cover?: string | undefined;
  rtl: boolean;
  draft: boolean;
  html: string;
};

const files = import.meta.glob<string>("../content/journal/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

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
  if (!title || !date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`Journal post ${slug} needs a title and a date like 2026-11-19`);
  }
  return {
    slug,
    title,
    date,
    excerpt: meta.get("excerpt") ?? "",
    cover: meta.get("cover") || undefined,
    rtl: meta.get("lang") === "he",
    draft: meta.get("draft") === "true",
    html: marked.parse(body, { async: false }) as string,
  };
}

const all = Object.entries(files)
  .map(([path, raw]) => parse(path, raw))
  .sort((a, b) => b.date.localeCompare(a.date));

// Drafts appear while previewing locally but never on the live site.
export const posts: JournalPost[] = import.meta.env.DEV ? all : all.filter((p) => !p.draft);

export const formatDate = (date: string) =>
  new Date(`${date}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
