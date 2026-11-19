import { Link } from "@tanstack/react-router";
import { projects, img } from "@/lib/projects";

export const FEATURED = ["cr-suites", "hb-house"];

// Homepage scroll: two selected projects side by side, whole and uncropped.
const UPCOMING = ["net-project", "mes-apt", "hy-apt"];

// A solid black rule above and below each row, with the same rule between photos.
const ROW =
  "grid grid-cols-1 gap-0 divide-y-4 divide-ink border-y-4 border-ink md:divide-x-4 md:divide-y-0";

// The three projects under construction, in a row under the featured pair.
export function UpcomingGallery() {
  const list = UPCOMING.map((s) => projects.find((p) => p.slug === s)).filter(
    (p): p is NonNullable<typeof p> => !!p?.cover,
  );
  return (
    <div className={`${ROW} md:grid-cols-3`}>
      {list.map((p) => (
        <Link key={p.slug} to="/work/$slug" params={{ slug: p.slug }} className="group relative block overflow-hidden bg-ink">
          <img src={img(p.cover!, 1200)} alt={p.name} loading="lazy" className="block aspect-[3/2] w-full object-cover opacity-55 transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-40" />
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center text-bone">
            <h2 className="project-title text-2xl md:text-3xl">{p.name}</h2>
            <span className="bg-ink/65 px-4 py-2 eyebrow">Under construction</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function CoverGallery() {
  const featured = FEATURED.map((s) => projects.find((p) => p.slug === s)).filter(
    (p): p is NonNullable<typeof p> => !!p?.cover,
  );
  return (
    <div className={`${ROW} md:grid-cols-2`}>
      {featured.map((p) => (
        <Link
          key={p.slug}
          to="/work/$slug"
          params={{ slug: p.slug }}
          className="group relative block overflow-hidden bg-ink"
        >
          <img
            src={img(p.cover!, 1600)}
            alt={p.name}
            loading="lazy"
            className="block aspect-[3/2] h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.03] group-hover:opacity-60"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 text-bone md:p-10">
            <h2 className="project-title text-3xl md:text-5xl">{p.name}</h2>
            <p className="mt-3 eyebrow">{[p.category, p.location].filter(Boolean).join(" · ")}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
