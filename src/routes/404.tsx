import { createFileRoute } from "@tanstack/react-router";
import { NotFoundPage } from "@/components/NotFoundPage";

// Pre-rendered at build time and copied to dist/client/404.html, which
// GitHub Pages serves for any URL that doesn't exist.
export const Route = createFileRoute("/404")({
  head: () => ({
    meta: [{ title: "Page not found — Coco Atelier" }, { name: "robots", content: "noindex" }],
  }),
  component: NotFoundPage,
});
