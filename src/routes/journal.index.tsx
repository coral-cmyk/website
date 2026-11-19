import { createFileRoute, Link } from "@tanstack/react-router";
import { posts, formatDate, readingMinutes, type JournalPost, PREVIEW } from "@/lib/journal";
import { img } from "@/lib/projects";
import { ogMeta, coverOf } from "@/lib/og";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "Journal — Interior Design Notes from Tel Aviv | Coco Atelier" },
      {
        name: "description",
        content:
          "Guides and project notes from Coco Atelier, Coral Mesika's interior design studio in Tel Aviv: renovation, hospitality, offices and homes in Israel and abroad.",
      },
      { property: "og:title", content: "Journal — Coco Atelier" },
      {
        property: "og:description",
        content: "Interior design guides and project notes from Coral Mesika's studio in Tel Aviv.",
      },
      { property: "og:type", content: "website" },
      ...ogMeta("/journal", {
        title: "Journal",
        lines: ["Notes from the studio", "Coco Atelier"],
        photo: coverOf("cr-suites"),
        alt: "The Coco Atelier Journal",
      }),
      // Keep an empty Journal out of search results until the first post is published.
      ...(posts.length === 0 ? [{ name: "robots", content: "noindex" }] : []),
    ],
    links: [
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "Coco Atelier Journal",
        href: "/journal/rss.xml",
      },
    ],
  }),
  component: Journal,
});

function Meta({ post }: { post: JournalPost }) {
  return (
    <span className="eyebrow block text-muted-foreground">
      {formatDate(post.date, post.lang)}
      <span className="mx-2">·</span>
      {readingMinutes(post)} {post.lang === "he" ? "דק׳" : "min"}
      {post.lang === "he" && <span className="mx-2">· עברית</span>}
      {post.draft && <span className="mx-2">· Draft</span>}
    </span>
  );
}

function Journal() {
  const [lead, ...rest] = posts;
  return (
    <main className="page-enter px-6 pt-36 md:px-12">
      {PREVIEW && (
        <p className="mb-10 inline-block bg-[#fff3c4] px-4 py-2 text-sm text-[#3a2f00]">
          Review preview with drafts. Not the live site; nothing here is public yet.
        </p>
      )}
      <header className="grid gap-6 md:grid-cols-12 md:items-end">
        <h1 className="serif-display leading-[0.95] text-[16vw] md:col-span-7 md:text-[9vw]">
          Journal
        </h1>
        <p className="max-w-md text-lg leading-relaxed text-muted-foreground md:col-span-5 md:pb-4">
          Notes from the studio on designing homes, hotels and workplaces, in Tel Aviv and wherever
          the work takes us.
        </p>
      </header>

      {!lead && (
        <p className="mt-16 text-lg text-muted-foreground">The first entry is on its way.</p>
      )}

      {lead && (
        <Link
          to="/journal/$slug"
          params={{ slug: lead.slug }}
          dir={lead.rtl ? "rtl" : undefined}
          className="group mt-20 grid gap-8 border-t border-ink/15 pt-10 md:grid-cols-12 md:gap-12"
        >
          {lead.cover && (
            <span className="img-zoom block md:col-span-7">
              <img
                src={img(lead.cover)}
                alt={lead.coverAlt}
                className="aspect-[3/2] w-full object-cover"
                fetchPriority="high"
              />
            </span>
          )}
          <span className={`block ${lead.cover ? "md:col-span-5" : "md:col-span-8"}`}>
            <Meta post={lead} />
            <span className="display mt-5 block text-4xl leading-[1.05] md:text-6xl">
              <span className="link-line">{lead.title}</span>
            </span>
            {lead.excerpt && (
              <span className="mt-6 block max-w-xl text-lg leading-relaxed text-muted-foreground">
                {lead.excerpt}
              </span>
            )}
            <span className="eyebrow mt-8 block">{lead.lang === "he" ? "לקריאה ←" : "Read →"}</span>
          </span>
        </Link>
      )}

      {rest.length > 0 && (
        <ul className="mt-24 grid gap-x-10 gap-y-20 border-t border-ink/15 pt-12 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <li key={post.slug} dir={post.rtl ? "rtl" : undefined}>
              <Link to="/journal/$slug" params={{ slug: post.slug }} className="group block">
                {post.cover && (
                  <span className="img-zoom block">
                    <img
                      src={img(post.cover)}
                      alt={post.coverAlt}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </span>
                )}
                <span className="mt-6 block">
                  <Meta post={post} />
                </span>
                <span className="display mt-3 block text-3xl leading-[1.08]">
                  <span className="link-line">{post.title}</span>
                </span>
                {post.excerpt && (
                  <span className="mt-4 block leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <div className="h-40" />
    </main>
  );
}
