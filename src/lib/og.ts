import { SITE_URL, sharePath, projects } from "@/lib/projects";

// Link-preview cards (the picture shown when a page is shared on WhatsApp,
// Facebook, LinkedIn, iMessage…). Each page describes its card here; the build
// (scripts/og-cards.mjs, called from postbuild) draws it as a 1200×630 JPEG at
// /og/<page>.jpg: the photo full-bleed, the bone logo top-left, the name large
// bottom-left and up to two short lines bottom-right.

export type OgCard = {
  // Large text, bottom-left: a project name, a page name or a post title.
  title: string;
  // One or two short lines, bottom-right.
  lines: string[];
  // The photo behind the card: any cover/photo id used on the site.
  photo: string;
  // Describes the card for people using screen readers.
  alt: string;
};

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

// The opening photo of the site (XL APT), also used by pages without a photo of their own.
export const HERO_PHOTO = projects.find((p) => p.slug === "xl-apt")?.cover ?? "";

export const HOME_CARD: OgCard = {
  title: "Interior design",
  lines: ["by Coral Mesika", "Tel Aviv / International"],
  photo: HERO_PHOTO,
  alt: "Coco Atelier, interior design by Coral Mesika: the XL APT in Tel Aviv",
};

// A project's cover photo, for pages that borrow one.
export const coverOf = (slug: string) => projects.find((p) => p.slug === slug)?.cover || HERO_PHOTO;

// "/" -> "home", "/work/xl-apt" -> "work/xl-apt"
export const ogKey = (pathname: string) => pathname.replace(/^\/+|\/+$/g, "") || "home";

export const ogImageUrl = (pathname: string) => `${SITE_URL}/og/${ogKey(pathname)}.jpg`;

// Meta tags for a page's card. The "og-card" tag carries the card's content to
// the build, which draws the image and then removes that tag from the page.
export function ogMeta(pathname: string, card: OgCard) {
  const url = ogImageUrl(pathname);
  const data = { key: ogKey(pathname), ...card, photo: sharePath(card.photo) };
  return [
    { property: "og:image", content: url },
    { property: "og:image:width", content: String(OG_WIDTH) },
    { property: "og:image:height", content: String(OG_HEIGHT) },
    { property: "og:image:type", content: "image/jpeg" },
    { property: "og:image:alt", content: card.alt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: url },
    { name: "twitter:image:alt", content: card.alt },
    { name: "og-card", content: JSON.stringify(data) },
  ];
}
