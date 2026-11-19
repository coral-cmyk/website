// Runs after `vite build`: turns the pre-rendered /404 page into GitHub Pages'
// 404.html and writes sitemap.xml listing every pre-rendered page.
import {
  readdirSync,
  readFileSync,
  statSync,
  copyFileSync,
  rmSync,
  writeFileSync,
  existsSync,
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

// Pages marked noindex (drafts, an empty Journal) stay out of the sitemap.
const urls = pages(out)
  .filter((file) => !readFileSync(file, "utf8").includes('name="robots" content="noindex"'))
  .map((file) => {
    const dir = relative(out, file).split(sep).slice(0, -1).join("/");
    return `${SITE}/${dir ? `${dir}/` : ""}`;
  })
  .sort();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}
</urlset>
`;
writeFileSync(join(out, "sitemap.xml"), xml);
console.log(`[postbuild] 404.html written, sitemap.xml lists ${urls.length} pages`);
