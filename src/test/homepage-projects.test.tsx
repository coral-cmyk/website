import { QueryClient } from "@tanstack/react-query";
import { RouterProvider, createMemoryHistory, createRouter } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { projects } from "@/lib/projects";

// The opening screen now carries a way down to the projects, so the homepage itself
// must offer both the jump link and the tiles below the photo.
async function renderHome() {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ["/"] }),
    context: { queryClient: new QueryClient() },
  });
  await router.load();
  render(<RouterProvider router={router} />);
}

describe("Homepage scroll to projects", () => {
  it("offers a link that jumps from the opening screen down to the projects", async () => {
    await renderHome();

    const cue = screen.getByRole("link", { name: "Scroll down to the projects" });
    expect(cue.getAttribute("href")).toBe("#projects");
    expect(document.getElementById("projects")).not.toBeNull();
  });

  it("shows only CR Suites and HB House, then links to all projects and the studio", async () => {
    await renderHome();
    const names = Array.from(document.querySelectorAll("#projects a[href^='/work/'] h2")).map((h) => h.textContent);
    expect(names).toEqual(["CR SUITES", "HB HOUSE", "NET PROJECT", "MES APT", "HY APT"]);
    expect(screen.getByRole("link", { name: "See all projects" }).getAttribute("href")).toBe("/projects");
    expect(screen.getByRole("link", { name: "The studio" }).getAttribute("href")).toBe("/studio");
    expect(screen.getAllByRole("link", { name: "Contact me" })[0]?.getAttribute("href")).toBe("tel:+972542645228");
  });

  // Coral's order for the scroll: the two flagship projects, then the way to see
  // everything, then the three under construction.
  it("puts the see-all-projects button between the flagship pair and the under-construction row", async () => {
    await renderHome();

    const workLinks = Array.from(document.querySelectorAll("#projects a[href^='/work/']"));
    const firstConstruction = workLinks.find((a) => a.getAttribute("href") === "/work/net-project");
    expect(firstConstruction).toBeDefined();

    const button = screen.getByRole("link", { name: "See all projects" });
    const flagship = workLinks.find((a) => a.getAttribute("href") === "/work/cr-suites");
    expect(flagship).toBeDefined();

    // button comes after CR Suites and before NET PROJECT in the page order
    expect(flagship!.compareDocumentPosition(button) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(button.compareDocumentPosition(firstConstruction!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  // The under-construction row gets its own way into the full list, below the three photos.
  it("offers an under-construction-projects button below the under-construction row", async () => {
    await renderHome();

    const button = screen.getByRole("link", { name: "Under construction projects" });
    expect(button.getAttribute("href")).toBe("/projects");

    const lastConstruction = Array.from(
      document.querySelectorAll("#projects a[href^='/work/']"),
    ).find((a) => a.getAttribute("href") === "/work/hy-apt");
    expect(lastConstruction).toBeDefined();
    expect(
      lastConstruction!.compareDocumentPosition(button) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  // Coral wants the same black rule under the under-construction button as the
  // one that frames the projects button, with the same breathing room around it.
  it("draws a black rule under the under-construction button, spaced like the projects button", async () => {
    await renderHome();

    const construction = screen.getByRole("link", { name: "Under construction projects" });
    const all = screen.getByRole("link", { name: "See all projects" });
    const band = construction.parentElement?.parentElement;
    const allBand = all.parentElement?.parentElement;
    expect(band).not.toBeNull();
    expect(allBand).not.toBeNull();

    // the solid black rule closing the band off at the bottom
    expect(band!.className).toContain("border-b-4");
    expect(band!.className).toContain("border-ink");

    // even spacing: the same breathing room above and below as the projects button
    for (const cls of ["px-6", "py-8"]) {
      expect(band!.className.split(/\s+/)).toContain(cls);
      expect(allBand!.className.split(/\s+/)).toContain(cls);
    }
  });

  // Coral wants air between the opening screen and the flagship pair, held in by
  // a black rule above and the rule the photos already carry below.
  it("opens the projects with a cream band and a black rule above the flagship pair", async () => {
    await renderHome();

    const section = document.getElementById("projects")!;
    const air = section.firstElementChild as HTMLElement;
    expect(air.className).toContain("border-t-4");
    expect(air.className).toContain("border-ink");
    expect(air.className).toContain("bg-background");

    // the second rule comes from the photo row itself
    const flagship = Array.from(
      section.querySelectorAll("a[href^='/work/']"),
    ).find((a) => a.getAttribute("href") === "/work/cr-suites");
    expect(flagship).toBeDefined();
    const row = flagship!.parentElement!;
    expect(row.className).toContain("border-y-4");

    // and the band sits above both photos
    expect(
      air.compareDocumentPosition(flagship!) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});
