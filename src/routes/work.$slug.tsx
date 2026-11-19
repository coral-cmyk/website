import { useEffect } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { projects, img, shareImg, galleryImages, gallerySpans } from "@/lib/projects";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const i = projects.findIndex((p) => p.slug === params.slug);
    const project = projects[i];
    const next = projects[(i + 1) % projects.length];
    if (!project || !next) throw notFound();
    return { project, next };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    if (!p) return { meta: [{ title: "Project — Coco Atelier" }, { name: "robots", content: "noindex" }] };
    const desc = (p.text[0] || `${p.name}${p.underConstruction ? " — under construction" : ""}, an interior project by Coco Atelier, Coral Mesika.`).slice(0, 155);
    const image = p.cover ? shareImg(p.cover) : "";
    return {
      meta: [
        { title: `${p.name}${p.category ? ` — ${p.category}` : ""} | Coco Atelier` },
        { name: "description", content: desc },
        { property: "og:title", content: `${p.name} — Coco Atelier` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(image ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : []),
      ],
    };
  },
  notFoundComponent: () => (
    <main className="flex min-h-screen items-center justify-center">
      <Link to="/projects" className="display text-5xl link-line">Back to projects</Link>
    </main>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { project: p, next } = Route.useLoaderData();
  const gallery = galleryImages(p);
  const spans = gallerySpans(gallery.length);
  const navigate = useNavigate();
  // Escape key returns to the Projects page.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") navigate({ to: "/projects" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);
  return (
    <main className="page-enter">
      <section className="cover-height relative overflow-hidden bg-ink">
        {p.cover ? <img src={img(p.cover, 2400)} alt={p.name} className="h-full w-full object-cover opacity-85" /> : null}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
        <Link
          to="/projects"
          className={`absolute left-6 top-24 z-20 eyebrow link-line md:left-12 md:top-28 ${
            p.cover && p.lightTop ? "text-ink" : "text-bone"
          }`}
        >
          ← Projects
        </Link>
        <div className="absolute inset-x-0 bottom-0 px-6 pb-10 text-bone md:px-12">
          <p className="eyebrow animate-rise">{p.underConstruction ? "Under construction" : p.category}{p.subtitle ? ` — ${p.subtitle}` : ""}</p>
          <h1 className="project-title mt-4 text-[13vw] animate-rise md:text-[8vw]">{p.name}</h1>
        </div>
      </section>

      <section className="grid gap-12 px-6 py-24 md:grid-cols-12 md:px-12 md:py-36">
        <dl className="space-y-6 md:col-span-3">
          {[["Year", p.year], ["Size", p.size], ["Scope", p.detail ?? ""], ["Location", p.location]].filter(([, v]) => v).map(([k, v]) => (
            <div key={k} className="border-t pt-3">
              <dt className="eyebrow text-muted-foreground">{k}</dt>
              <dd className="mt-1 text-lg">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="space-y-6 md:col-span-7 md:col-start-6">
          <p className="display text-3xl leading-[1.15] md:text-5xl">{p.text[0]}</p>
          {p.text.slice(1).map((t, i) => (
            <p key={i} className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{t}</p>
          ))}
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="grid grid-cols-1 gap-4 px-6 md:grid-cols-2 md:gap-6 md:px-12">
          {gallery.map((src, i) => {
            const wide = spans[i] === 2;
            return (
              <div key={src} className={`overflow-hidden bg-card ${wide ? "md:col-span-2" : ""}`}>
                <img src={img(src, wide ? 2400 : 1400)} alt={`${p.name} ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
              </div>
            );
          })}
        </section>
      )}

      {p.plans && p.plans.length > 0 && (
        <section className="px-6 pt-16 md:px-12">
          <div className="mx-auto max-w-5xl">
            <p className="eyebrow text-center text-muted-foreground">Plan</p>
            <div className="mt-6 space-y-6">
              {p.plans.map((src, i) => (
                <a key={src} href={img(src, 2400)} target="_blank" rel="noopener noreferrer" className="group block">
                  <img
                    src={img(src, 1400)}
                    alt={`${p.name} plan ${i + 1}`}
                    loading="lazy"
                    className="h-auto w-full cursor-zoom-in border border-border/60 object-contain"
                  />
                  <p className="mt-3 text-center text-xs tracking-[0.18em] text-muted-foreground/70 uppercase">
                    Open full size
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <Link to="/work/$slug" params={{ slug: next.slug }} className="group mt-32 block border-t px-6 py-24 md:px-12">
        <p className="eyebrow text-muted-foreground">Next project</p>
        <p className="project-title mt-4 text-5xl transition-transform duration-700 group-hover:translate-x-6 md:text-[7vw]">{next.name} →</p>
      </Link>
    </main>
  );
}
