import { createFileRoute } from "@tanstack/react-router";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { coverOf, ogMeta } from "@/lib/og";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Interior Design Portfolio | Coco Atelier" },
      { name: "description", content: "Interior design projects by Coral Mesika: apartments and homes, hotels and suites, offices and lobbies in Tel Aviv, Greece, Italy and California." },
      { property: "og:title", content: "Projects — Coco Atelier" },
      { property: "og:description", content: "Residential, hospitality and experimental interiors by Coral Mesika." },
      { property: "og:type", content: "website" },
      ...ogMeta("/projects", {
        title: "Projects",
        lines: ["Homes, hotels, offices", "Israel and abroad"],
        photo: coverOf("cr-suites"),
        alt: "Interior design projects by Coco Atelier",
      }),
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <main className="page-enter px-6 pb-32 pt-32 md:px-12">
      <div className="mb-10 border-b pb-4 eyebrow">Projects</div>
      <ProjectsGrid />
    </main>
  );
}
