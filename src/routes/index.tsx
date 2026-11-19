import { createFileRoute, Link } from "@tanstack/react-router";
import { projects, img, shareImg } from "@/lib/projects";
import { CoverGallery, UpcomingGallery } from "@/components/CoverGallery";
import logoBone from "@/assets/coco-atelier-bone.png.asset.json";

const portrait = img("b294f9_803c17fa25404efea46495707e7367db~mv2.jpg", 1200);
const heroUrl = img(projects.find((p) => p.slug === "xl-apt")?.cover ?? "", 2400);
const heroShare = shareImg(projects.find((p) => p.slug === "xl-apt")?.cover ?? "");

// One button style for the three calls to action on this page. On a phone the
// letter-spacing tightens and the wording is held on a single line; on a computer
// it opens back out to the wide spacing used everywhere else.
const CTA =
  "inline-block whitespace-nowrap border border-ink px-4 py-3.5 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-ink transition-colors hover:bg-ink hover:text-bone md:px-8 md:py-4 md:text-[0.7rem] md:tracking-[0.32em]";

// The cream band a call to action sits in. Both bands on this page are built from
// it, so the space around each button is identical.
const BAND = "bg-background px-6 py-8";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Coco Atelier" },
      { name: "description", content: "Residential, hospitality and experimental interiors. A studio of material, geometry and quiet drama." },
      { property: "og:title", content: "Coco Atelier" },
      { property: "og:description", content: "Interior Design by Coral Mesika" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: heroShare },
      { name: "twitter:image", content: heroShare },
    ],
  }),
  component: Index,
});

export function Index() {
  return (
    <main>
      <section className="screen-height relative w-full overflow-hidden bg-ink">
        <img src={heroUrl} alt="Coco Atelier interior" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/30" />
        <div className="relative flex h-full flex-col justify-end px-6 pb-16 text-bone md:px-12">
          <p className="eyebrow animate-rise">Tel Aviv / International</p>
          <h1 className="mt-6 animate-rise" style={{ animationDelay: "0.15s" }}>
            <img
              src={logoBone.url}
              alt="Coco Atelier — Interior Design by Coral Mesika"
              className="h-auto max-h-[44vh] w-[62vw] max-w-full object-contain object-left md:w-[40vw]"
            />
          </h1>
          <div className="mt-8 eyebrow">
            <span>Interior Design by Coral Mesika</span>
          </div>
        </div>
        <a
          href="#projects"
          aria-label="Scroll down to the projects"
          className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-3 text-bone/80 transition-colors hover:text-bone"
        >
          <span className="eyebrow">Projects</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true" className="animate-drift h-4 w-4">
            <path d="M12 3v18M5 14l7 7 7-7" />
          </svg>
        </a>
      </section>

      <section id="projects" className="scroll-mt-0 bg-ink">
        {/* Air between the opening screen and the flagship pair: a cream band
            closed above by its own rule and below by the rule the photos carry. */}
        <div className={`${BAND} border-t-4 border-ink`} />
        <CoverGallery />
        <div className={BAND}>
          <div className="flex justify-center">
            <Link to="/projects" className={CTA}>
              See all projects
            </Link>
          </div>
        </div>
        <UpcomingGallery />
        <div className={`${BAND} border-b-4 border-ink`}>
          <div className="flex justify-center">
            <Link to="/projects" className={CTA}>
              Under construction projects
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 pt-16 md:px-12 md:pb-32 md:pt-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-20">
          <img src={portrait} alt="Coral Mesika, founder of Coco Atelier" loading="lazy" className="w-full object-cover" />
          <div>
          <p className="eyebrow text-muted-foreground">About Coco</p>
          <p className="serif-display mt-8 text-2xl leading-[1.3] md:text-[2.2rem]">
            Raised in the States and based in Tel Aviv, the city closest to my heart, I work
            locally and internationally, creating spaces shaped by a thoughtful balance of
            function, aesthetics, and experience.
          </p>
          <div className="mt-12 flex justify-center">
            <Link to="/studio" className={CTA}>
              The studio
            </Link>
          </div>
          </div>
        </div>
      </section>
    </main>
  );
}
