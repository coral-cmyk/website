import { Link } from "@tanstack/react-router";
import { projects, img } from "@/lib/projects";

// The project tiles, shared by the Projects page and the bottom of the opening screen.
export function ProjectsGrid() {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-3">
      {projects.map((p) => (
        <Link key={p.slug} to="/work/$slug/" params={{ slug: p.slug }} className="group block">
          <div className="img-zoom relative aspect-[4/3] bg-ink">
            {p.cover ? <img src={img(p.cover, 1400)} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-opacity duration-500 ease-out group-hover:opacity-60" /> : null}
            {p.underConstruction && !p.cover ? <div className="pointer-events-none absolute inset-0 bg-background/55" /> : null}
            {p.underConstruction && p.cover ? (
              <>
                <div className="pointer-events-none absolute inset-0 bg-ink/45" />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                  <span className="eyebrow bg-ink/65 px-5 py-2.5 text-background">UNDER CONSTRUCTION</span>
                </div>
              </>
            ) : null}
          </div>
          <div className="mt-5">
            <h2 className="project-title text-3xl transition-opacity duration-500 group-hover:opacity-60">{p.name}</h2>
          </div>
          {p.category || p.detail || p.location ? (
            <p className="mt-2 eyebrow text-muted-foreground">
              {[p.category, p.detail, p.location].filter(Boolean).join(" · ")}
            </p>
          ) : null}
        </Link>
      ))}
    </div>
  );
}
