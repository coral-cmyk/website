import { createFileRoute } from "@tanstack/react-router";

import { PRESS } from "@/lib/press";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "Press — Coco Atelier by Coral Mesika" },
      { name: "description", content: "Selected press coverage of Coco Atelier and Coral Mesika, from Portfolio, Home Adore, Design Interviews, Best Design Israel and the A' Design Award." },
      { property: "og:title", content: "Press — Coco Atelier" },
      { property: "og:description", content: "Selected press coverage of Coco Atelier and Coral Mesika." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Press,
});

function Press() {
  return (
    <main className="page-enter px-6 pt-36 md:px-12">
      <h1 className="serif-display mt-6 leading-[0.95] text-[16vw] md:text-[9vw]">Press</h1>

      <section className="mt-20 border-b border-ink/15">
        {PRESS.map((item) => (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="group grid gap-2 border-t border-ink/15 py-8 md:grid-cols-12 md:items-baseline md:gap-6"
          >
            <span className="display text-3xl leading-none md:col-span-5 md:text-[2.6rem]">
              <span className="link-line">{item.publication}</span>
            </span>
            <span
              dir={item.rtl ? "rtl" : undefined}
              className="text-left text-lg leading-snug text-muted-foreground md:col-span-5"
            >
              {item.title}
            </span>
            <span className="eyebrow text-muted-foreground md:col-span-2 md:text-right">{item.kind}</span>
          </a>
        ))}
      </section>
      <div className="h-40" />
    </main>
  );
}
