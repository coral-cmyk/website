## Hosting

- The site is fully static: `npm run build` pre-renders every page into `dist/client`, and GitHub Actions (`.github/workflows/deploy.yml`) publishes it to GitHub Pages on every push to `main`. Keep `main` building and its tests passing.
- Images live in `public/assets/`; each `src/assets/**/*.asset.json` record points at its file there via `url`. Add new images the same way.
- Link previews: every project cover needs a small copy in `public/assets/share/` (run `sh scripts/make-share-images.sh <cover path>` on a Mac and add the path to `scripts/share-images.txt`). `src/test/share-images.test.ts` fails if one is missing.
- Journal (blog): one Markdown file per post in `src/content/journal/` (see the header format in `src/lib/journal.ts`; `example-post.md` is a draft template). Post photos go in `public/assets/journal/`; a post with a `cover` also needs a share copy (`sh scripts/make-share-images.sh /assets/journal/<file>`, then add the path to `scripts/share-images.txt`). The Journal link sits in the footer (not the top menu) and appears automatically once a non-draft post exists. Never invent posts; write only what Coral provides.
- No server code runs in production, so features that need a backend (form submissions, server functions) need a separate service.

## Rules

- Project order and construction status live in the shared project records; new projects keep missing details empty to avoid invented content.
- The landing photo is selected by the XL APT slug, independently of project order, so rearranging the Projects page preserves the approved opening screen.

- Drawings (floor plans) are stored in their own asset folder and listed on a project's `plans` field, never mixed into `images`, so the photo gallery stays photographic and each drawing renders centered at a readable size instead of stretching to full width.

- The site header carries the logo image (light or dark cut-out), never a typed wordmark — except on the landing page, where the big logo in the opening screen is the only logo and the header shows the menu alone. Each project sets `lightTop` on its record: `true` when the top of that cover photo is bright and even enough to carry the dark logo, `false` when it is dark or busy, in which case the header shows the light logo over a shaded strip. Set it from the actual cover image, not by default — the wrong value makes the logo unreadable or leaves a visible smudge across the photo.

