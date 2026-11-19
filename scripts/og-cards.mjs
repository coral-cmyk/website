// Draws the link-preview cards described by each page's "og-card" meta tag
// (see src/lib/og.ts). Layout: the photo full-bleed under a soft dark shade, the
// bone logo top-left, the name large bottom-left in Playfair Display and up to
// two short lines bottom-right in Manrope. Output: 1200×630 JPEG, well under the
// ~300 KB that WhatsApp accepts.
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import satori from "satori";
import sharp from "sharp";

const require = createRequire(import.meta.url);
const font = (pkg, file) => readFileSync(require.resolve(`${pkg}/files/${file}`));

const FONTS = [
  { name: "Playfair", data: font("@fontsource/playfair-display", "playfair-display-latin-400-normal.woff"), weight: 400 },
  // Hebrew titles (Journal posts in Hebrew): Playfair has no Hebrew letters.
  { name: "Playfair", data: font("@fontsource/frank-ruhl-libre", "frank-ruhl-libre-hebrew-400-normal.woff"), weight: 400 },
  { name: "Manrope", data: font("@fontsource/manrope", "manrope-latin-500-normal.woff"), weight: 500 },
  { name: "Manrope", data: font("@fontsource/manrope", "manrope-latin-600-normal.woff"), weight: 600 },
];

const W = 1200;
const H = 630;
const BONE = "#F1EEE8";

const h = (type, style, children) => ({ type, props: { style, children } });

// Short names stay large; long Journal titles step down so they fit in three lines.
function titleSize(title) {
  const n = title.length;
  if (n <= 14) return 104;
  if (n <= 22) return 88;
  if (n <= 36) return 72;
  return 60;
}

const dataUri = (buf, type) => `data:${type};base64,${buf.toString("base64")}`;

export async function drawCard(card, { photoFile, logoFile }) {
  // Fit the photo to the card first so the drawing step handles a small image.
  const photo = await sharp(photoFile)
    .resize(W, H, { fit: "cover", position: card.photoPosition ?? "attention" })
    .jpeg({ quality: 88 })
    .toBuffer();
  const logo = readFileSync(logoFile);
  const rtl = /[֐-׿]/.test(card.title);
  const size = titleSize(card.title);

  const tree = h(
    "div",
    { width: W, height: H, display: "flex", position: "relative", fontFamily: "Manrope", color: BONE },
    [
      { type: "img", props: { src: dataUri(photo, "image/jpeg"), width: W, height: H, style: { position: "absolute", left: 0, top: 0 } } },
      h("div", {
        position: "absolute",
        left: 0,
        top: 0,
        width: W,
        height: H,
        backgroundImage:
          "linear-gradient(to top, rgba(20,18,16,0.84) 0%, rgba(20,18,16,0.15) 55%, rgba(20,18,16,0.38) 100%)",
      }),
      { type: "img", props: { src: dataUri(logo, "image/png"), width: 130, height: Math.round((130 * 699) / 1358), style: { position: "absolute", left: 56, top: 48 } } },
      h(
        "div",
        {
          position: "absolute",
          left: 56,
          right: 56,
          bottom: 50,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 48,
        },
        [
          h(
            "div",
            {
              display: "flex",
              flexShrink: 1,
              maxWidth: card.lines.length ? 760 : 1088,
              fontFamily: "Playfair",
              fontSize: size,
              lineHeight: size > 80 ? 1 : 1.1,
              letterSpacing: "0.01em",
              direction: rtl ? "rtl" : "ltr",
            },
            card.title,
          ),
          h(
            "div",
            {
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              flexShrink: 0,
              fontSize: 26,
              fontWeight: 500,
              lineHeight: 1.35,
              textAlign: "right",
            },
            card.lines.slice(0, 2).map((line) => h("div", { display: "flex" }, line)),
          ),
        ],
      ),
    ],
  );

  const svg = await satori(tree, { width: W, height: H, fonts: FONTS });
  return sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
}
