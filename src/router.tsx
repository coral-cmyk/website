import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    // GitHub Pages serves every page at a folder address ending in "/", and the
    // canonical URLs and sitemap use that form. Links must match, or every click
    // and every Google crawl goes through a 301 redirect.
    trailingSlash: "always",
  });

  return router;
};
