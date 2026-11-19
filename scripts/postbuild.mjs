// Runs after `vite build`. Works only from the pre-rendered HTML in dist/client:
//  - turns the /404 page into GitHub Pages' 404.html
//  - writes sitemap.xml (with lastmod for Journal posts and hreflang pairs)
//  - writes the Journal RSS feed at /journal/rss.xml
//  - writes /llms.txt, a plain summary of the site for AI search engines
import {
  readdirSync,
  readFileSync,
  statSync,
  copyFileSync,
  rmSync,
  writeFileSync,
  existsSync,
  mkdirSync,
} from "node:fs";
import { join, relative, sep } from "node:path";

const SITE = "https://coco-atelier.com";
const out = "dist/client";

const notFound = join(out, "404", "index.html");
if (!existsSync(notFound)) throw new Error(`Missing ${notFound}; was /404 pre-rendered?`);
copyFileSync(notFound, join(out, "404.html"));
rmSync(join(out, "404"), { recursive: true });

function pages(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return name === "assets" ? [] : pages(p);
    return name === "index.html" ? [p] : [];
  });
}

const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
const escapeXml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function metaOf(html, key) {
  const m =
    html.match(new RegExp(`<meta[^>]*(?:property|name)="${key}"[^>]*content="([^"]*)"`)) ??
    html.match(new RegExp(`<meta[^>]*content="([^"]*)"[^>]*(?:property|name)="${key}"`));
  return m ? decode(m[1]) : "";
}

const all = pages(out).map((file) => {
  const html = readFileSync(file, "utf8");
  const dir = relative(out, file).split(sep).slice(0, -1).join("/");
  const url = `${SITE}/${dir ? `${dir}/` : ""}`;
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
  const alternates = [
    ...html.matchAll(/<link[^>]*rel="alternate"[^>]*hrefLang="([^"]+)"[^>]*href="([^"]+)"/gi),
  ].map((m) => ({ lang: m[1], href: m[2] }));
  return {
    url,
    dir,
    title,
    description: metaOf(html, "description"),
    published: metaOf(html, "article:published_time"),
    modified: metaOf(html, "article:modified_time"),
    lang: html.match(/<html[^>]*lang="([^"]+)"/)?.[1] ?? "en",
    noindex: html.includes('name="robots" content="noindex"'),
    alternates,
    isPost: /^journal\/[^/]+$/.test(dir),
  };
});

// Pages marked noindex (drafts, an empty Journal) stay out of the sitemap and feeds.
const indexable = all.filter((p) => !p.noindex).sort((a, b) => a.url.localeCompare(b.url));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${indexable
  .map((p) => {
    const lastmod = p.modified || p.published;
    const alt = p.alternates
      .map((a) => `\n    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.href}"/>`)
      .join("");
    return `  <url><loc>${p.url}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}${alt}</url>`;
  })
  .join("\n")}
</urlset>
`;
writeFileSync(join(out, "sitemap.xml"), sitemap);

const posts = indexable
  .filter((p) => p.isPost)
  .sort((a, b) => b.published.localeCompare(a.published));

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Coco Atelier Journal</title>
    <link>${SITE}/journal/</link>
    <atom:link href="${SITE}/journal/rss.xml" rel="self" type="application/rss+xml"/>
    <description>Interior design guides and project notes from Coco Atelier, Coral Mesika's studio in Tel Aviv.</description>
    <language>en</language>
${posts
  .map(
    (p) => `    <item>
      <title>${escapeXml(p.title.replace(/ \| Coco Atelier$/, ""))}</title>
      <link>${p.url}</link>
      <guid isPermaLink="true">${p.url}</guid>
      <pubDate>${new Date(`${p.published}T06:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(p.description)}</description>
    </item>`,
  )
  .join("\n")}
  </channel>
</rss>
`;
mkdirSync(join(out, "journal"), { recursive: true });
writeFileSync(join(out, "journal", "rss.xml"), rss);

const section = (heading, list) =>
  list.length
    ? `## ${heading}\n\n${list
        .map(
          (p) =>
            `- [${p.title.replace(/ [|—] Coco Atelier.*$/, "")}](${p.url})${p.description ? `: ${p.description}` : ""}`,
        )
        .join("\n")}\n`
    : "";

const llms = `# Coco Atelier

> Coco Atelier is the interior design and interior architecture studio of Coral Mesika,
> based in Tel Aviv, Israel. It designs residential, hospitality and commercial interiors
> in Israel and internationally, with completed work in Tel Aviv and central Israel,
> Crete and Thessaloniki (Greece), Turin and the Italian Alps (Italy), and Huntington
> Beach (California, USA). Contact: WhatsApp / phone +972 54 264 5228, ${SITE}/contact/

${section(
  "Studio",
  indexable.filter((p) => ["", "studio", "projects", "press", "contact"].includes(p.dir)),
)}
${section(
  "Projects",
  indexable.filter((p) => p.dir.startsWith("work/")),
)}
${section("Journal", posts)}
${section(
  "Other",
  indexable.filter((p) => ["privacy", "accessibility"].includes(p.dir)),
)}`;
writeFileSync(join(out, "llms.txt"), llms.replace(/\n{3,}/g, "\n\n"));

console.log(
  `[postbuild] 404.html, sitemap.xml (${indexable.length} pages), journal/rss.xml (${posts.length} posts), llms.txt`,
);
