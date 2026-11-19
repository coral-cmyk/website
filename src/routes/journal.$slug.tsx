import { useEffect } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { posts, formatDate } from "@/lib/journal";
import { img, shareImg } from "@/lib/projects";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const i = posts.findIndex((p) => p.slug === params.slug);
    const post = posts[i];
    if (!post) throw notFound();
    // "Next" walks back in time, so readers move from newest to oldest.
    return { post, next: posts[i + 1] };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post)
      return {
        meta: [{ title: "Journal — Coco Atelier" }, { name: "robots", content: "noindex" }],
      };
    const desc = post.excerpt.slice(0, 155);
    return {
      meta: [
        { title: `${post.title} | Coco Atelier Journal` },
        { name: "description", content: desc },
        { property: "og:title", content: post.title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: post.date },
        ...(post.cover
          ? [
              { property: "og:image", content: shareImg(post.cover) },
              { name: "twitter:image", content: shareImg(post.cover) },
            ]
          : []),
        ...(post.draft ? [{ name: "robots", content: "noindex" }] : []),
      ],
    };
  },
  component: JournalPost,
});

function JournalPost() {
  const { post, next } = Route.useLoaderData();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [post.slug]);

  return (
    <main className="page-enter px-6 pt-36 md:px-12">
      <article dir={post.rtl ? "rtl" : undefined} lang={post.rtl ? "he" : undefined}>
        <header className="max-w-4xl">
          <p className="eyebrow text-muted-foreground">
            <Link to="/journal" className="link-line">
              Journal
            </Link>
            <span className="mx-3">·</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.draft && <span className="ml-3">· Draft</span>}
          </p>
          <h1 className="serif-display mt-6 text-5xl leading-[1.02] md:text-7xl">{post.title}</h1>
          {post.excerpt && (
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
          )}
        </header>

        {post.cover && (
          <img src={img(post.cover)} alt="" className="mt-16 max-h-[80vh] w-full object-cover" />
        )}

        <div className="journal-prose mt-16" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>

      <nav className="mt-28 flex flex-col gap-6 border-t border-ink/15 pt-8 md:flex-row md:items-baseline md:justify-between">
        <Link to="/journal" className="eyebrow link-line">
          ← All entries
        </Link>
        {next && (
          <Link to="/journal/$slug" params={{ slug: next.slug }} className="group text-right">
            <span className="eyebrow block text-muted-foreground">Next</span>
            <span className="display mt-2 block text-3xl md:text-4xl">
              <span className="link-line">{next.title}</span>
            </span>
          </Link>
        )}
      </nav>
      <div className="h-40" />
    </main>
  );
}
