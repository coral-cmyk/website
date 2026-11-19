import { createFileRoute, Link } from "@tanstack/react-router";
import { posts, formatDate } from "@/lib/journal";
import { img } from "@/lib/projects";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "Journal — Coco Atelier by Coral Mesika" },
      {
        name: "description",
        content: "Notes from Coco Atelier, Coral Mesika's interior design studio in Tel Aviv.",
      },
      { property: "og:title", content: "Journal — Coco Atelier" },
      {
        property: "og:description",
        content: "Notes from Coco Atelier, interior design by Coral Mesika.",
      },
      { property: "og:type", content: "website" },
      // Keep an empty Journal out of search results until the first post is published.
      ...(posts.length === 0 ? [{ name: "robots", content: "noindex" }] : []),
    ],
  }),
  component: Journal,
});

function Journal() {
  const [lead, ...rest] = posts;
  return (
    <main className="page-enter px-6 pt-36 md:px-12">
      <h1 className="serif-display mt-6 leading-[0.95] text-[16vw] md:text-[9vw]">Journal</h1>

      {!lead && (
        <p className="mt-16 text-lg text-muted-foreground">The first entry is on its way.</p>
      )}

      {lead && (
        <Link
          to="/journal/$slug"
          params={{ slug: lead.slug }}
          className="group mt-20 grid gap-8 border-t border-ink/15 pt-10 md:grid-cols-12 md:gap-12"
        >
          {lead.cover && (
            <div className="img-zoom md:col-span-7">
              <img src={img(lead.cover)} alt="" className="aspect-[3/2] w-full object-cover" />
            </div>
          )}
          <div
            dir={lead.rtl ? "rtl" : undefined}
            className={lead.cover ? "md:col-span-5" : "md:col-span-8"}
          >
            <p className="eyebrow text-muted-foreground">
              {formatDate(lead.date)}
              {lead.draft && " · Draft"}
            </p>
            <h2 className="display mt-5 text-4xl leading-[1.05] md:text-6xl">
              <span className="link-line">{lead.title}</span>
            </h2>
            {lead.excerpt && (
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                {lead.excerpt}
              </p>
            )}
            <p className="eyebrow mt-8">Read →</p>
          </div>
        </Link>
      )}

      {rest.length > 0 && (
        <section className="mt-24 border-b border-ink/15">
          {rest.map((post) => (
            <Link
              key={post.slug}
              to="/journal/$slug"
              params={{ slug: post.slug }}
              dir={post.rtl ? "rtl" : undefined}
              className="group grid gap-2 border-t border-ink/15 py-8 md:grid-cols-12 md:items-baseline md:gap-6"
            >
              <span className="eyebrow text-muted-foreground md:col-span-3">
                {formatDate(post.date)}
                {post.draft && " · Draft"}
              </span>
              <span className="display text-3xl leading-none md:col-span-5 md:text-[2.6rem]">
                <span className="link-line">{post.title}</span>
              </span>
              <span className="text-lg leading-snug text-muted-foreground md:col-span-4">
                {post.excerpt}
              </span>
            </Link>
          ))}
        </section>
      )}
      <div className="h-40" />
    </main>
  );
}
