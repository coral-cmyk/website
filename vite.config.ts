import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Static build for GitHub Pages: every page is pre-rendered to HTML at build time.
export default defineConfig({
  server: { port: 8080 },
  resolve: { dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-start"] },
  plugins: [
    tsConfigPaths(),
    tanstackStart({
      server: { entry: "server" },
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
        // Only crawl pages; images under /assets are copied as-is from public/.
        filter: ({ path }) => !path.startsWith("/assets/"),
      },
      // Nothing links to /404, so list it explicitly; postbuild turns it into 404.html.
      pages: [{ path: "/404" }],
    }),
    viteReact(),
    tailwindcss(),
  ],
});
