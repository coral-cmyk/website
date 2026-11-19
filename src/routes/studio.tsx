import { createFileRoute, Link } from "@tanstack/react-router";
import { img } from "@/lib/projects";

const portrait = img("b294f9_803c17fa25404efea46495707e7367db~mv2.jpg", 1400);

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio — Coco Atelier by Coral Mesika" },
      { name: "description", content: "Coco Atelier is Coral Mesika's interior design practice — residential, hospitality, and commercial interiors, made locally in Tel Aviv and internationally." },
      { property: "og:title", content: "Studio — Coco Atelier" },
      { property: "og:description", content: "Residential, hospitality, and commercial interiors by Coral Mesika — Tel Aviv and international." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: portrait },
      { name: "twitter:image", content: portrait },
    ],
  }),
  component: Studio,
});

function Studio() {
  return (
    <main className="page-enter px-6 pt-36 md:px-12">
      <p className="eyebrow text-muted-foreground">The Studio</p>
      <h1 className="serif-display mt-6 leading-[0.95] text-[18vw] md:text-[11vw]">Quiet<br />drama.</h1>
      <section className="mt-24 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <img src={portrait} alt="Coral Mesika, founder of Coco Atelier" className="w-full object-cover" />
          <p className="mt-4 eyebrow text-muted-foreground">Coral Mesika — Founder</p>
        </div>
        <div className="space-y-8 md:col-span-6 md:col-start-7">
          <p className="eyebrow text-muted-foreground">About Coco</p>
          <p className="serif-display text-2xl leading-[1.25] md:text-[2rem]">
            Raised in the States and based in Tel Aviv, the city closest to my heart, I work
            locally and internationally, creating spaces shaped by a thoughtful balance of
            function, aesthetics, and experience.
          </p>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              My practice spans residential, hospitality, and commercial interiors, with an
              approach rooted in curiosity, exploration, and an understanding of the
              relationship between people and the spaces they inhabit.
            </p>
            <p>
              I believe design extends beyond form. It is a way of questioning the familiar,
              reinterpreting our surroundings, and creating new possibilities for how we live,
              work, and interact.
            </p>
            <p>
              Each project is an opportunity to explore the dialogue between precision and
              intuition, simplicity and complexity, structure and freedom.
            </p>
            <p>
              Ultimately, my intention is to create spaces that feel effortless yet considered,
              distinctive yet timeless — spaces that enrich the everyday experience.
            </p>
          </div>
          <div className="border-t pt-6">
            <p className="eyebrow text-muted-foreground">Recognition</p>
            <p className="mt-3 text-lg">A' Design Award — Interior Space &amp; Exhibition Design, 2019–2020</p>
            <p className="text-lg">YAC Calamity Atelier — Honorary Mention</p>
          </div>
          <Link to="/contact" className="inline-block eyebrow link-line">Begin a project →</Link>
        </div>
      </section>
      <div className="h-40" />
    </main>
  );
}
