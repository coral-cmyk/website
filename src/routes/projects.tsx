import { createFileRoute } from "@tanstack/react-router";
import { ProjectsGrid } from "@/components/ProjectsGrid";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Coco Atelier" },
      { name: "description", content: "Residential, hospitality and experimental interiors by Coral Mesika." },
      { property: "og:title", content: "Projects — Coco Atelier" },
      { property: "og:description", content: "Residential, hospitality and experimental interiors by Coral Mesika." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
