import { createFileRoute } from "@tanstack/react-router";
import { SOCIAL } from "@/lib/projects";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Coco Atelier" },
      { name: "description", content: "Start a conversation with Coco Atelier about your residential, hospitality or commercial interior." },
      { property: "og:title", content: "Contact — Coco Atelier" },
      { property: "og:description", content: "Start a conversation about your next space." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const rows = [
    ["WhatsApp", "+972 54 264 5228", SOCIAL.whatsapp],
    ["Instagram", "@coco.atelier", SOCIAL.instagram],
  ];
  return (
    <main className="page-enter min-h-screen px-6 pb-40 pt-36 md:px-12">
      <p className="eyebrow text-muted-foreground">Contact</p>
      <h1 className="serif-display mt-6 leading-[0.95] text-[18vw] md:text-[11vw]">Let's<br />talk space.</h1>
      <p className="mt-12 max-w-xl text-lg text-muted-foreground">
        We take on a limited number of projects each year. Tell us about yours.
      </p>
      <ul className="mt-20 border-t">
        {rows.map(([k, v, href]) => (
          <li key={k} className="border-b">
            <a href={href} target="_blank" rel="noreferrer" className="group flex flex-col items-start gap-3 py-8 md:flex-row md:items-baseline md:justify-between md:gap-6">
              <span className="eyebrow text-muted-foreground">{k}</span>
              <span className="display text-3xl transition-transform duration-500 group-hover:-translate-x-4 md:text-7xl">{v}</span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
