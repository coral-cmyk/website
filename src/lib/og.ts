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
  // Homepage style: the photo with the large COCO ATELIER logo, as on the site's
  // opening screen, and no text (title and lines are ignored).
  logoOnly?: boolean;
};

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

// The opening photo of the site (XL APT), also used by pages without a photo of their own.
export const HERO_PHOTO = projects.find((p) => p.slug === "xl-apt")?.cover ?? "";

export const HOME_CARD: OgCard = {
  title: "Coco Atelier",
  lines: [],
  photo: HERO_PHOTO,
  alt: "Coco Atelier logo over the XL APT in Tel Aviv",
  logoOnly: true,
};

// A project's cover photo, for pages that borrow one.
export const coverOf = (slug: string) => projects.find((p) => p.slug === slug)?.cover || HERO_PHOTO;

// "/" -> "home", "/work/xl-apt" -> "work/xl-apt"
export const ogKey = (pathname: string) => pathname.replace(/^\/+|\/+$/g, "") || "home";

export const ogImageUrl = (pathname: string) => `${SITE_URL}/og/${ogKey(pathname)}.jpg`;

// Short, stable fingerprint of a card's content (and of the card design version).
const CARD_DESIGN = 2;
function cardVersion(card: OgCard) {
  const text = JSON.stringify([CARD_DESIGN, card]);
  let hash = 5381;
  for (let i = 0; i < text.length; i++) hash = ((hash << 5) + hash + text.charCodeAt(i)) >>> 0;
  return hash.toString(36);
}

// Meta tags for a page's card. The "og-card" tag carries the card's content to
// the build, which draws the image and then removes that tag from the page.
export function ogMeta(pathname: string, card: OgCard) {
  // The version changes whenever the card does, so WhatsApp and others that cache
  // previews by image address fetch the new picture instead of the old one.
  const url = `${ogImageUrl(pathname)}?v=${cardVersion(card)}`;
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
