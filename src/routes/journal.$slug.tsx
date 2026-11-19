import { useEffect } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { posts, formatDate, readingMinutes, translationFor, PREVIEW } from "@/lib/journal";
import { img, shareImg, projects, SITE_URL, SOCIAL } from "@/lib/projects";
import { JsonLd, canonical, postSchema } from "@/lib/seo";

const LABELS = {
  en: {
    journal: "Journal",
    read: "min read",
    by: "By",
    role: "Interior designer, Coco Atelier",
    related: "Related projects",
    talk: "Planning something similar?",
    talkBody:
      "Tell Coral about your space. A short message on WhatsApp is the quickest way to start.",
    whatsapp: "Message on WhatsApp",
    more: "Continue reading",
    all: "← All entries",
    other: "לגרסה בעברית",
  },
  he: {
    journal: "יומן",
    read: "דקות קריאה",
    by: "מאת",
    role: "מעצבת פנים, Coco Atelier",
    related: "פרויקטים קשורים",
    talk: "מתכננים משהו דומה?",
    talkBody: "ספרו לקורל על החלל שלכם. הודעה קצרה בוואטסאפ היא הדרך המהירה להתחיל.",
    whatsapp: "שליחת הודעה בוואטסאפ",
    more: "להמשך קריאה",
    all: "→ כל הרשומות",
    other: "Read in English",
  },
} as const;

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    const translation = translationFor(post);
    // Three more posts, same language first, newest first.
    const more = [
      ...posts.filter((p) => p.slug !== post.slug && p.lang === post.lang),
      ...posts.filter((p) => p.slug !== post.slug && p.lang !== post.lang),
    ]
      .filter((p) => p.slug !== translation?.slug)
      .slice(0, 3);
    return { post, translation, more };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post)
      return {
        meta: [{ title: "Journal — Coco Atelier" }, { name: "robots", content: "noindex" }],
      };
    const desc = post.excerpt.slice(0, 160);
    const image = post.cover ? shareImg(post.cover) : undefined;
    const translation = loaderData?.translation;
    const english = post.lang === "en" ? post : translation;
    return {
      meta: [
        { title: `${post.title} | Coco Atelier` },
        { name: "description", content: desc },
        { name: "author", content: "Coral Mesika" },
        { property: "og:title", content: post.title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:locale", content: post.lang === "he" ? "he_IL" : "en_US" },
        { property: "article:published_time", content: post.date },
        { property: "article:modified_time", content: post.updated },
        { property: "article:author", content: `${SITE_URL}/studio/` },
        ...(image
          ? [
              { property: "og:image", content: image },
              { property: "og:image:alt", content: post.coverAlt },
              { name: "twitter:image", content: image },
            ]
          : []),
        ...(post.draft ? [{ name: "robots", content: "noindex" }] : []),
      ],
      links: translation
        ? [
            { rel: "alternate", hrefLang: post.lang, href: canonical(`/journal/${post.slug}`) },
            {
              rel: "alternate",
              hrefLang: translation.lang,
              href: canonical(`/journal/${translation.slug}`),
            },
            ...(english
              ? [
                  {
                    rel: "alternate",
                    hrefLang: "x-default",
                    href: canonical(`/journal/${english.slug}`),
                  },
                ]
              : []),
          ]
        : [],
    };
  },
  component: JournalPost,
});

function JournalPost() {
  const { post, translation, more } = Route.useLoaderData();
  const t = LABELS[post.lang];
  const related = post.projects
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [post.slug]);

  return (
    <main className="page-enter px-6 pt-36 md:px-12" dir={post.rtl ? "rtl" : undefined}>
      {PREVIEW && (
        <p className="mb-10 inline-block bg-[#fff3c4] px-4 py-2 text-sm text-[#3a2f00]">
          Review preview with drafts. Not the live site; nothing here is public yet.
        </p>
      )}
      <JsonLd data={postSchema(post)} />
      <article lang={post.lang}>
        <header className="max-w-5xl">
          <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-2 text-muted-foreground">
            <Link to="/journal" className="link-line">
              {t.journal}
            </Link>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDate(post.date, post.lang)}</time>
            <span aria-hidden="true">·</span>
            <span>
              {readingMinutes(post)} {t.read}
            </span>
            {post.draft && <span>· Draft</span>}
            {translation && (
              <Link
                to="/journal/$slug"
                params={{ slug: translation.slug }}
                className="link-line ms-auto normal-case tracking-normal"
              >
                {t.other}
              </Link>
            )}
          </p>
          <h1 className="serif-display mt-8 text-[11vw] leading-[1.02] md:text-7xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
              {post.excerpt}
            </p>
          )}
          <p className="mt-10 text-sm">
            {t.by}{" "}
            <Link to="/studio" className="link-line font-medium">
              Coral Mesika
            </Link>
            <span className="text-muted-foreground"> — {t.role}</span>
          </p>
        </header>

        {post.cover && (
          <figure className="mt-14 md:mt-20">
            <img
              src={img(post.cover)}
              alt={post.coverAlt}
              className="max-h-[85vh] w-full object-cover"
              fetchPriority="high"
            />
          </figure>
        )}

        <div className="mt-16 grid gap-16 md:mt-24 lg:grid-cols-12">
          <div
            className="journal-prose lg:col-span-7"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="space-y-12 lg:sticky lg:top-28">
              {related.length > 0 && (
                <section>
                  <p className="eyebrow text-muted-foreground">{t.related}</p>
                  <ul className="mt-6 space-y-6">
                    {related.map((p) => (
                      <li key={p.slug}>
                        <Link
                          to="/work/$slug"
                          params={{ slug: p.slug }}
                          className="group grid grid-cols-[6rem_1fr] items-center gap-4"
                        >
                          <span className="img-zoom block">
                            {p.cover && (
                              <img
                                src={img(p.cover)}
                                alt=""
                                loading="lazy"
                                className="aspect-square w-full object-cover"
                              />
                            )}
                          </span>
                          <span>
                            <span className="project-title block text-xl">
                              <span className="link-line">{p.name}</span>
                            </span>
                            <span className="eyebrow mt-1 block text-[0.6rem] text-muted-foreground">
                              {p.category} — {p.location}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              <section className="border-t border-ink/15 pt-8">
                <p className="serif-display text-2xl leading-snug">{t.talk}</p>
                <p className="mt-3 leading-relaxed text-muted-foreground">{t.talkBody}</p>
                <a
                  href={SOCIAL.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="eyebrow mt-6 inline-block border border-ink px-5 py-3 transition-colors hover:bg-ink hover:text-bone"
                >
                  {t.whatsapp}
                </a>
              </section>
            </div>
          </aside>
        </div>
      </article>

      {more.length > 0 && (
        <section className="mt-32 border-t border-ink/15 pt-10">
          <div className="flex items-baseline justify-between">
            <h2 className="eyebrow">{t.more}</h2>
            <Link to="/journal" className="eyebrow link-line text-muted-foreground">
              {t.all}
            </Link>
          </div>
          <ul className="mt-10 grid gap-12 md:grid-cols-3">
            {more.map((p) => (
              <li key={p.slug} dir={p.rtl ? "rtl" : "ltr"}>
                <Link to="/journal/$slug" params={{ slug: p.slug }} className="group block">
                  {p.cover && (
                    <span className="img-zoom block">
                      <img
                        src={img(p.cover)}
                        alt=""
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover"
                      />
                    </span>
                  )}
                  <span className="eyebrow mt-5 block text-muted-foreground">
                    {formatDate(p.date, p.lang)}
                  </span>
                  <span className="display mt-3 block text-2xl leading-tight">
                    <span className="link-line">{p.title}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <div className="h-40" />
    </main>
  );
}
