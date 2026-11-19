import { SITE_URL, SOCIAL, projects, shareImg, STUDIO_PORTRAIT } from "@/lib/projects";
import type { JournalPost } from "@/lib/journal";

// Structured data (schema.org JSON-LD). Google uses it for rich results; AI search
// engines use it to understand who the studio is, what it does and where.

export const STUDIO_ID = `${SITE_URL}/#studio`;
export const CORAL_ID = `${SITE_URL}/studio/#coral-mesika`;

// Countries and cities where the studio has completed work (src/lib/projects.ts).
const AREAS_SERVED = [
  "Tel Aviv",
  "Israel",
  "Greece",
  "Crete",
  "Thessaloniki",
  "Italy",
  "Turin",
  "California",
  "United States",
  "Europe",
];

export const canonical = (pathname: string) => {
  const path = pathname === "/" || pathname.endsWith("/") ? pathname : `${pathname}/`;
  return `${SITE_URL}${path}`;
};

export function studioSchema() {
  const cover = projects.find((p) => p.slug === "xl-apt")?.cover;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": STUDIO_ID,
        name: "Coco Atelier",
        alternateName: "Coco Atelier — Interior Design by Coral Mesika",
        description:
          "Interior design and interior architecture studio in Tel Aviv. Residential, hospitality and commercial interiors in Israel and internationally.",
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/assets/coco-atelier-ink.png`,
        ...(cover ? { image: shareImg(cover) } : {}),
        telephone: "+972-54-264-5228",
        address: { "@type": "PostalAddress", addressLocality: "Tel Aviv", addressCountry: "IL" },
        areaServed: AREAS_SERVED.map((name) => ({ "@type": "Place", name })),
        knowsAbout: [
          "Interior design",
          "Interior architecture",
          "Residential interior design",
          "Hospitality interior design",
          "Office interior design",
          "Apartment renovation",
        ],
        founder: { "@id": CORAL_ID },
        sameAs: [SOCIAL.instagram],
      },
      {
        "@type": "Person",
        "@id": CORAL_ID,
        name: "Coral Mesika",
        jobTitle: "Interior Designer",
        url: `${SITE_URL}/studio/`,
        image: shareImg(STUDIO_PORTRAIT),
        worksFor: { "@id": STUDIO_ID },
        award: [
          "A' Design Award — Interior Space & Exhibition Design, 2019–2020",
          "YAC Calamity Atelier — Honorary Mention",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "Coco Atelier",
        url: `${SITE_URL}/`,
        publisher: { "@id": STUDIO_ID },
        inLanguage: ["en", "he"],
      },
    ],
  };
}

export function postSchema(post: JournalPost) {
  const url = canonical(`/journal/${post.slug}`);
  const graph: Record<string, unknown>[] = [
    {
      "@type": "BlogPosting",
      "@id": `${url}#article`,
      mainEntityOfPage: url,
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.updated,
      inLanguage: post.lang,
      wordCount: post.words,
      ...(post.cover ? { image: shareImg(post.cover) } : {}),
      author: {
        "@id": CORAL_ID,
        "@type": "Person",
        name: "Coral Mesika",
        url: `${SITE_URL}/studio/`,
      },
      publisher: { "@id": STUDIO_ID },
      isPartOf: { "@type": "Blog", name: "Coco Atelier Journal", url: `${SITE_URL}/journal/` },
      about: post.projects
        .map((slug) => projects.find((p) => p.slug === slug))
        .filter(Boolean)
        .map((p) => ({
          "@type": "CreativeWork",
          name: p!.name,
          url: canonical(`/work/${p!.slug}`),
        })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Coco Atelier", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/journal/` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
  if (post.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: post.faq.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

export function JsonLd({ data }: { data: unknown }) {
  // "<" is escaped so text inside the data can never close the script tag.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
